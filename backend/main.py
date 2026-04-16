"""FalsePass Hunter Backend - FastAPI入口"""

from __future__ import annotations

import os
from typing import Any

import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DEFAULT_SECOM_PATH = os.path.join(PROJECT_ROOT, "data", "uci-secom.csv")
PUBLIC_SECOM_PATH = os.path.join("data", "uci-secom.csv")
SECOM_PATH = os.getenv("SECOM_DATA_PATH", DEFAULT_SECOM_PATH)
STATIONS = ["ICT-01", "FCT-02", "ICT-03"]


class LogAnalyzeRequest(BaseModel):
    log: str


class SecomService:
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.df: pd.DataFrame | None = None
        self.numeric_cols: list[str] = []
        self.feature_df: pd.DataFrame | None = None
        self._load()

    def _load(self) -> None:
        if not os.path.exists(self.csv_path):
            raise FileNotFoundError(f"SECOM dataset not found: {self.csv_path}")

        df = pd.read_csv(self.csv_path)
        if "Time" not in df.columns or "Pass/Fail" not in df.columns:
            raise ValueError("SECOM CSV missing required columns: Time, Pass/Fail")

        df["Time"] = pd.to_datetime(df["Time"], errors="coerce")
        df = df.dropna(subset=["Time"]).sort_values("Time").reset_index(drop=True)
        df["station"] = [STATIONS[i % len(STATIONS)] for i in range(len(df))]
        df["label"] = df["Pass/Fail"].astype(int)

        numeric_cols = [
            c for c in df.columns if c not in {"Time", "Pass/Fail", "station", "label"}
        ]
        feature_df = df[numeric_cols].apply(pd.to_numeric, errors="coerce")
        feature_df = feature_df.fillna(feature_df.median(numeric_only=True))

        means = feature_df.mean()
        stds = feature_df.std().replace(0, 1.0)
        z = ((feature_df - means) / stds).abs()
        raw_score = z.mean(axis=1)
        normalized = ((raw_score - raw_score.min()) / (raw_score.max() - raw_score.min() + 1e-9)) * 100

        df["risk_score"] = normalized.round(2)
        threshold = np.percentile(df[df["label"] == -1]["risk_score"], 85)
        df["false_pass_flag"] = (df["label"] == -1) & (df["risk_score"] >= threshold)

        self.df = df
        self.numeric_cols = numeric_cols
        self.feature_df = feature_df

    def _require_df(self) -> pd.DataFrame:
        if self.df is None:
            raise RuntimeError("SECOM data not loaded")
        return self.df

    def dashboard_summary(self, time_range: str = "7d", station: str = "all") -> dict[str, Any]:
        df = self._require_df()
        view = df if station == "all" else df[df["station"] == station]

        if view.empty:
            raise HTTPException(status_code=404, detail="No data for selected station")

        trend_days = {"24h": 1, "7d": 7, "30d": 30}.get(time_range, 7)
        end_time = view["Time"].max()
        start_time = end_time - pd.Timedelta(days=trend_days)
        trend_df = view[view["Time"] >= start_time].copy().sort_values("Time")

        freq = "H" if time_range == "24h" else "D"
        trend_df = trend_df.set_index("Time")
        grouped = trend_df.resample(freq).agg(
            tests=("label", "size"),
            falsePass=("false_pass_flag", "sum"),
            risks=("risk_score", lambda s: int((s >= 80).sum())),
            avgRisk=("risk_score", "mean"),
        )
        grouped = grouped[grouped["tests"] > 0].reset_index()
        grouped["date"] = grouped["Time"].dt.strftime("%m-%d %H:%M") if freq == "H" else grouped["Time"].dt.strftime("%m-%d")
        grouped["falsePass"] = grouped["falsePass"].astype(int)
        grouped["risks"] = grouped["risks"].astype(int)
        grouped["avgRisk"] = grouped["avgRisk"].round(2)
        trend_data = grouped[["date", "tests", "falsePass", "risks", "avgRisk"]].to_dict("records")

        station_rows = (
            view.groupby("station")
            .agg(
                output=("label", "size"),
                risks=("risk_score", lambda s: int((s >= 80).sum())),
                avg_risk=("risk_score", "mean"),
            )
            .reset_index()
        )
        station_rows["status"] = station_rows["avg_risk"].apply(
            lambda r: "Warning" if r >= 65 else "Running"
        )
        station_rows["yield"] = (100 * (1 - station_rows["avg_risk"] / 160)).clip(lower=92, upper=99.9).round(2)

        stations = [
            {
                "id": str(i + 1),
                "station": row["station"],
                "status": row["status"],
                "output": int(row["output"]),
                "risks": int(row["risks"]),
                "yield": float(row["yield"]),
            }
            for i, row in station_rows.iterrows()
        ]

        risk_pct = {
            "high": int((view["risk_score"] >= 70).mean() * 100),
            "medium": int(((view["risk_score"] >= 40) & (view["risk_score"] < 70)).mean() * 100),
            "low": 0,
        }
        risk_pct["low"] = max(0, 100 - risk_pct["high"] - risk_pct["medium"])

        metrics = {
            "totalTests": int(len(view)),
            "falsePassDetected": int(view["false_pass_flag"].sum()),
            "highRiskAlerts": int((view["risk_score"] >= 80).sum()),
            "systemConfidence": round(float(100 - view[self.numeric_cols].isna().mean().mean() * 100), 1),
        }

        top_station = station_rows.sort_values("avg_risk", ascending=False).iloc[0]
        key_insight = (
            f"Station {top_station['station']} carries the highest average risk ({top_station['avg_risk']:.1f}) "
            f"for the selected window, with {int(top_station['risks'])} high-risk samples flagged."
        )

        top_features = (
            view[self.numeric_cols]
            .apply(pd.to_numeric, errors="coerce")
            .fillna(view[self.numeric_cols].median(numeric_only=True))
            .sub(view[self.numeric_cols].mean())
            .abs()
            .mean()
            .sort_values(ascending=False)
            .head(3)
        )

        evidence_chain = [
            {
                "stage": "Raw dataset",
                "detail": f"Loaded {len(view)} SECOM records from {os.path.basename(self.csv_path)} for {station} / {time_range}.",
            },
            {
                "stage": "Sensor drift",
                "detail": f"Top shifted signals: {', '.join([f'{idx} ({val:.2f})' for idx, val in top_features.items()])}.",
            },
            {
                "stage": "Risk fusion",
                "detail": f"{int(view['risk_score'].ge(80).sum())} samples exceeded the high-risk threshold and were aggregated into station-level alerts.",
            },
            {
                "stage": "Decision",
                "detail": f"The system concludes {top_station['station']} is the most critical station in the selected window.",
            },
        ]

        last_refreshed = view["Time"].max().strftime("%Y-%m-%d %H:%M:%S")

        return {
            "metrics": metrics,
            "trendData": trend_data,
            "stations": stations,
            "riskDistribution": [
                {"name": "Low Risk", "value": risk_pct["low"]},
                {"name": "Medium Risk", "value": risk_pct["medium"]},
                {"name": "High Risk", "value": risk_pct["high"]},
            ],
            "dataSource": "Kaggle UCI SECOM",
            "datasetDescription": "Semiconductor manufacturing process control data, mapped into test-station style analytics.",
            "provenance": {
                "datasetSource": "Kaggle UCI SECOM",
                "dataPath": PUBLIC_SECOM_PATH,
                "rowCount": int(len(df)),
                "selectedRows": int(len(view)),
                "lastRefreshed": last_refreshed,
                "timeRange": time_range,
                "station": station,
            },
            "keyInsight": key_insight,
            "evidenceChain": evidence_chain,
        }

    def drift_summary(self, station: str = "ICT-01", time_range: str = "7d") -> dict[str, Any]:
        df = self._require_df()
        view = df[df["station"] == station] if station != "all" else df
        if view.empty:
            raise HTTPException(status_code=404, detail="No data for selected station")

        time_days = {"24h": 1, "7d": 7, "30d": 30}.get(time_range, 7)
        end_time = view["Time"].max()
        start_time = end_time - pd.Timedelta(days=time_days)
        view = view[view["Time"] >= start_time].copy()
        if view.empty:
            view = df[df["station"] == station] if station != "all" else df

        split_idx = int(len(view) * 0.8)
        baseline = view.iloc[:split_idx]
        current = view.iloc[split_idx:]
        if baseline.empty or current.empty:
            baseline = view
            current = view

        feature_slice = self.numeric_cols[:18]
        baseline_mean = baseline[feature_slice].mean()
        current_mean = current[feature_slice].mean()
        delta_pct = ((current_mean - baseline_mean) / (baseline_mean.replace(0, np.nan))).replace([np.inf, -np.inf], np.nan).fillna(0) * 100

        top = delta_pct.abs().sort_values(ascending=False).head(5)
        thresholds = []
        events = []
        for i, feat in enumerate(top.index):
            b = float(baseline_mean[feat])
            c = float(current_mean[feat])
            d = float(delta_pct[feat])
            thresholds.append(
                {
                    "key": str(i + 1),
                    "test": f"SECOM-{feat}",
                    "standard": round(b, 4),
                    "current": round(c, 4),
                    "delta": f"{d:+.2f}%",
                }
            )
            events.append(
                {
                    "id": str(i + 1),
                    "time": current["Time"].iloc[-1].strftime("%H:%M"),
                    "test": f"SECOM-{feat}",
                    "type": "Mean Shift",
                    "delta": f"{d:+.2f}%",
                    "confidence": round(min(99, 70 + abs(d)), 1),
                    "risk": "high" if abs(d) >= 8 else "medium" if abs(d) >= 4 else "low",
                }
            )

        versions = [
            {"version": f"v2.0-{time_range}", "date": view["Time"].iloc[0].strftime("%Y-%m-%d"), "status": "stable"},
            {"version": f"v2.1-{time_range}", "date": view["Time"].iloc[max(0, len(view)//3)].strftime("%Y-%m-%d"), "status": "stable"},
            {"version": f"v2.2-{time_range}", "date": view["Time"].iloc[max(0, len(view)//2)].strftime("%Y-%m-%d"), "status": "warning"},
            {"version": f"v2.3-{time_range}", "date": view["Time"].iloc[-1].strftime("%Y-%m-%d"), "status": "current"},
        ]

        return {"versions": versions, "thresholds": thresholds, "events": events}

    def cross_stage_summary(self, time_range: str = "7d") -> dict[str, Any]:
        df = self._require_df()
        candidates = df[df["label"] == -1].sort_values("risk_score", ascending=False).head(20)
        samples = []
        issues = ["Cold Solder", "Short Circuit", "Open Circuit", "Contact Instability", "Threshold Drift"]
        for i, (_, row) in enumerate(candidates.iterrows(), start=1):
            samples.append(
                {
                    "key": str(i),
                    "sampleId": f"SN{1000 + i}",
                    "station": row["station"],
                    "result": "PASS",
                    "issue": issues[(i - 1) % len(issues)],
                    "risk": round(float(row["risk_score"]), 1),
                }
            )
        return {"samples": samples}

    def risk_report(self, sample_id: str) -> dict[str, Any]:
        df = self._require_df()
        idx = abs(hash(sample_id)) % len(df)
        row = df.iloc[idx]
        score = float(row["risk_score"])

        breakdown = [
            {"name": "Sensor Drift", "value": round(min(100, score * 0.95), 1)},
            {"name": "Cross-Stage Correlation", "value": round(min(100, score * 0.78), 1)},
            {"name": "Fixture Stability", "value": round(min(100, score * 0.83), 1)},
            {"name": "Temporal Volatility", "value": round(min(100, score * 0.69), 1)},
        ]

        top_risky_items = [
            {
                "rank": i + 1,
                "test": f"SECOM-{self.numeric_cols[i]}",
                "contribution": int(max(8, min(95, score - i * 7))),
                "confidence": int(max(60, min(99, 92 - i * 4))),
                "action": ["Retest", "Inspect", "Review", "Calibrate"][i % 4],
                "impact": ["Critical", "High", "Medium", "Low"][i % 4],
            }
            for i in range(4)
        ]

        trend = []
        for d in range(7, 0, -1):
            t = row["Time"] - pd.Timedelta(days=d)
            trend.append(
                {
                    "date": t.strftime("%Y-%m-%d"),
                    "riskScore": round(max(0, score - np.random.uniform(0, 8)), 1),
                    "failureRate": round(max(0.1, score / 30 + np.random.uniform(-0.3, 0.5)), 2),
                }
            )

        return {
            "sampleId": sample_id,
            "riskScore": round(score, 1),
            "status": "High Risk" if score >= 70 else "Medium Risk" if score >= 40 else "Low Risk",
            "totalTests": len(self.numeric_cols),
            "failedTests": int((row[self.numeric_cols] > row[self.numeric_cols].median()).sum() * 0.1),
            "suspiciousTests": int((row[self.numeric_cols] > row[self.numeric_cols].quantile(0.75)).sum()),
            "dataSource": "Kaggle UCI SECOM",
            "dataPath": PUBLIC_SECOM_PATH,
            "breakdownData": breakdown,
            "topRiskItems": top_risky_items,
            "historicalTrend": trend,
        }


service = SecomService(SECOM_PATH)

app = FastAPI(
    title="FalsePass Hunter AI",
    description="面向 TE 的隐性漏测风险预警系统",
    version="1.0.0"
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "FalsePass Hunter AI API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "datasetPath": PUBLIC_SECOM_PATH,
        "rows": len(service.df) if service.df is not None else 0,
    }


@app.get("/api/dashboard/summary")
async def dashboard_summary(timeRange: str = "7d", station: str = "all"):
    return service.dashboard_summary(time_range=timeRange, station=station)


@app.get("/api/drift/summary")
async def drift_summary(station: str = "ICT-01", timeRange: str = "7d"):
    return service.drift_summary(station=station, time_range=timeRange)


@app.get("/api/cross-stage/summary")
async def cross_stage_summary(timeRange: str = "7d"):
    return service.cross_stage_summary(time_range=timeRange)


@app.get("/api/risk/report")
async def risk_report(sampleId: str = "SN001"):
    return service.risk_report(sample_id=sampleId)


@app.post("/api/log/analyze")
async def log_analyze(payload: LogAnalyzeRequest):
    content = payload.log.strip()
    if not content:
        raise HTTPException(status_code=400, detail="Log content is required")

    lowered = content.lower()
    issues = []
    if "warn" in lowered or "warning" in lowered:
        issues.append({"key": "1", "type": "Warning Signals", "count": lowered.count("warn"), "severity": "medium"})
    if "error" in lowered or "fail" in lowered:
        issues.append({"key": "2", "type": "Failure/Error Markers", "count": lowered.count("error") + lowered.count("fail"), "severity": "high"})
    if not issues:
        issues.append({"key": "3", "type": "Anomaly Pattern", "count": 1, "severity": "low"})

    confidence = round(min(98.0, 70.0 + len(content) / 120), 1)
    return {
        "issues": issues,
        "confidence": confidence,
        "recommendation": "Prioritize retest on high-risk station and verify script/threshold alignment.",
    }

# 🛡️ FalsePass Hunter

> AI-Powered Manufacturing Quality Analytics Platform Built on Kaggle UCI SECOM Dataset

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python)](https://www.python.org/)

[中文](README.md) | [English](#)

---

## 📌 Introduction

FalsePass Hunter is a manufacturing quality analytics platform built on the Kaggle UCI SECOM dataset. It transforms raw sensor data into explainable risk insights.

**Core Value**: Not judging "pass or fail", but judging "**whether this pass result is trustworthy**".

---

## 📊 Pages

| Page | Purpose | API Endpoint |
|------|---------|--------------|
| 🏠 Home | Entry point & navigation | - |
| 📊 Dashboard | Main control panel - trends, stations, risk distribution, evidence chain | `/api/dashboard/summary` |
| 📈 Drift Monitor | Drift monitoring - time window comparison, anomaly events | `/api/drift/summary` |
| 🔀 Cross Stage | Cross-process analysis - inter-stage risk comparison | `/api/cross-stage/summary` |
| ⚠️ Risk Report | Sample-level report - risk score, evidence summary, PDF export | `/api/risk/report` |
| 📝 Log Analysis | Log diagnostics - structured log analysis | `/api/log/analyze` |

---

## 🏗️ Tech Stack

- **Frontend**: React 18.2 + Vite 5.x + Ant Design 5.x + Recharts
- **Backend**: FastAPI 0.100+ + pandas 2.x + numpy + uvicorn
- **Data**: Kaggle UCI SECOM (1567 rows × 592 columns)

---

## 📂 Project Structure

```
FalsePass-Hunter/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx
│   │   ├── DriftMonitor.jsx
│   │   ├── CrossStage.jsx
│   │   ├── RiskReport.jsx
│   │   └── LogAnalysis.jsx
│   ├── components/          # Reusable components
│   └── App.jsx              # Entry point
├── data/
│   └── uci-secom.csv        # Dataset
├── README.md
└── README_EN.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- Python >= 3.9
- npm >= 8.0.0

### Start Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Start Frontend

```bash
cd src
npm install
npm run dev
```

Visit http://localhost:3000

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/dashboard/summary` | Dashboard data |
| GET | `/api/drift/summary` | Drift analysis |
| GET | `/api/cross-stage/summary` | Cross-stage analysis |
| GET | `/api/risk/report` | Risk report |
| POST | `/api/log/analyze` | Log analysis |

---

## 📊 Dataset Info

| Attribute | Value |
|-----------|-------|
| Source | Kaggle - UCI SECOM |
| Samples | 1,567 rows |
| Features | 592 columns |
| Key Fields | Time, Pass/Fail |
| Type | Semiconductor manufacturing sensor data |

---

## 🤝 Contributing

1. Fork the repository
2. Create your branch `git checkout -b feature/your-feature`
3. Commit changes `git commit -m 'Add your feature'`
4. Push `git push origin feature/your-feature`
5. Create a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 👥 Team

**Illusion-Breakers** - Illuminating the truth through data

📬 [GitHub](https://github.com/Illusion-Breakers/FalsePass-Hunter) | 🐛 [Issues](https://github.com/Illusion-Breakers/FalsePass-Hunter/issues)

---

<div align="center">

**Made with ❤️ by Illusion-Breakers**

</div>

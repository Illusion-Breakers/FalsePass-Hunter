# FalsePass Hunter AI 🔍

## Hidden False Pass Detection System for Test Engineering

**[中文](./README.md) | English**

---

## 📋 Overview

### The False Pass Problem

In semiconductor and electronics manufacturing, test engineering faces a critical challenge: **false pass detection**. Traditional test systems answer "does this product pass?", but cannot answer "is this pass result trustworthy?"

**The Problem:**
- ICT/FCT tests show all PASS ✓
- Product fails in post-stage or at customer ✗
- Difficult root cause analysis
- Potential product liability

**Root Causes:**
1. Test script/threshold drift (outdated parameters)
2. Fixture degradation (aging, contact stress)
3. Environmental changes (temperature, humidity)
4. Golden sample/waveform expiration
5. Process variation and operator inconsistency

### Our Solution

FalsePass Hunter AI implements a **credibility assessment framework**:

- **Non-disruptive** - Works with existing ICT/FCT workflows
- **Risk Score** - Adds "is this pass trustworthy?" scoring layer
- **Closed-loop** - Links test passes to downstream rework to retrain models
- **Hybrid Analysis** - Combines numerical drift detection + text analysis (logs, notes, versions)
- **Actionable** - Recommends specific corrective actions (add test, retest, maintenance)

---

## 🏗️ Core Analysis Modules

### 1. Drift Monitor
Tracks divergence of 5 critical dimensions from historical baseline:
- Test script version evolution
- Threshold value adjustments
- Reference waveform age
- Environmental parameters (temp, humidity)
- Statistical distribution shifts (mean, stdev, coverage)

**Output:** Drift Score (0-100) with anomaly detection

---

### 2. Cross-Stage Validator
Two-layer correlation analysis:

**Layer 1:** Test Pass → Post-stage Rework Link
- Statistical metrics: pass rate, rework rate, correlation coefficient
- Time series: 24h / 7d / 30d trends
- Anomaly detection: probability vs frequency

**Layer 2:** Product-level Traceability
- Same-batch / same-station product comparison
- Rework reason distribution (chip, solder, contact)
- Reverse traceability to original test items

**Output:** Cross-Stage Risk Score with credibility metrics

---

### 3. Log Reasoning Agent
Processes unstructured text (engineering logs, error messages, maintenance notes):

- Version history parsing
- Error code classification (Error codes → symptom mapping)
- Keyword extraction ("contact issue", "reference waveform", "compensation value")
- Multi-modal correlation (numerical drift + text signal synchronization)

**Output:** Text-based risk factors weighted into final score

---

### 4. Risk Scorer
Multi-source risk scoring model:

```
Final Risk Score = 
  w1 × Drift_Score +
  w2 × CrossStage_Score +
  w3 × Text_Risk_Factor +
  w4 × Fixture_Health_Index +
  w5 × Temporal_Anomaly_Score
```

- **0-20:** Low Risk (Green) → Normal pass, no action
- **21-50:** Medium Risk (Yellow) → Enhanced monitoring recommended
- **51-80:** High Risk (Orange) → Retest or additional testing advised
- **81-100:** Critical Risk (Red) → Immediate investigation required

---

### 5. Action Copilot
Generates structured recommendations based on risk score and root cause analysis:

| Risk Source | Recommended Action | Priority |
|-------------|-------------------|----------|
| Script drift | Review script version, normalize parameters | P1 |
| Threshold shift | Update reference values, validate samples | P1 |
| Fixture issues | Fixture inspection, contact cleaning, component replacement | P2 |
| Environmental anomaly | ECT adjustment, apply compensation | P2 |
| Golden sample expiration | Update reference waveforms, rebuild feature library | P2 |

---

## 📊 Real-Time Dashboard

### Key Metrics
- **Daily Test Volume** - Pass/Fail/Retest counts by station
- **False Pass Detection** - High-risk products flagged
- **Critical Alerts** - Stations requiring immediate attention
- **System Confidence** - Overall AI model confidence score

### Visualizations
- **Production Line Map** - Risk heat map and yield trends
- **Drift Timeline** - Script, threshold, and environmental parameter changes
- **Cross-Stage Flow** - Sankey diagram showing test-to-rework correlation
- **Fixture Health** - Remaining life prediction and failure warnings
- **Risk Distribution** - High-risk samples categorized by root cause

### Interactive Features
- Time range selection (24h / 7d / 30d)
- Station/product line filtering
- Dynamic risk threshold adjustment
- CSV/PDF report export

---

## 🎨 Technology Stack

### Frontend
- **React 18.3** - Modern UI framework with hooks and concurrent rendering
- **Ant Design 5** - Enterprise-grade component library
- **Recharts 2.10** - Responsive data visualization library
- **React Router v6** - Client-side routing
- **Vite 5.4** - Next-generation build tool

### Backend (Planned)
- **FastAPI** - High-performance async Python framework
- **PyTorch** - ML model training and inference
- **SQLAlchemy** - Database ORM
- **LLM APIs** - Natural language log analysis

### Data Layer
- **PostgreSQL** - Structured test data and history
- **TimescaleDB** - Time-series data (environmental data, drift metrics)
- **Redis** - In-memory cache for real-time metrics

---

## 📁 Project Structure

```
FalsePass-Hunter/
├── src/                           # React Frontend
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── Dashboard.jsx          # Real-time monitoring dashboard
│   │   ├── DriftMonitor.jsx       # Drift analysis
│   │   ├── CrossStage.jsx         # Cross-stage correlation analysis
│   │   ├── RiskReport.jsx         # Report generation
│   │   └── LogAnalysis.jsx        # Log reasoning (planned)
│   ├── components/
│   │   ├── MainLayout.jsx         # Main layout wrapper
│   │   ├── StatCard.jsx           # Metric cards
│   │   ├── TrendChart.jsx         # Trend visualization
│   │   ├── RiskGauge.jsx          # Risk gauge component
│   │   └── index.js
│   ├── data/
│   │   ├── api.js                 # API client
│   │   └── mockData.js            # Mock data for demo
│   ├── styles/
│   │   ├── global.css             # Global styles
│   │   ├── home.css               # Home page styles
│   │   └── variables.css          # CSS variables (colors, spacing)
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   ├── index.html                 # HTML template
│   ├── package.json               # Dependencies
│   └── vite.config.js             # Build configuration
│
├── backend/                       # Python Backend (WIP)
│   ├── main.py                    # FastAPI application
│   └── requirements.txt           # Python dependencies
│
├── docs/                          # Documentation
├── data/                          # Data directory
├── README.md                      # Chinese documentation
├── README_EN.md                   # English documentation
├── DEPLOYMENT_GUIDE.md            # Deployment guide
└── .gitignore                     # Git ignore rules
```

---

## Getting Started

### Prerequisites
- Node.js 16+
- Python 3.9+ (for backend)
- Git

### Frontend Development

```bash
cd src
npm install
npm run dev
```

Frontend runs at `http://localhost:3001`

**Available commands:**
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run preview` - Preview production build

### Backend Setup (In Development)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API documentation: `http://localhost:8000/docs`

---

## Data Integration

### Supported Data Sources
- **UCI SECOM Dataset** - Semiconductor manufacturing process control data
- **WM-811K** - Wafer defect classification dataset
- **Enterprise ICT/FCT logs** - Direct test equipment integration
- **Rework and return records** - Post-stage quality data

### API Specifications

**Upload test results:**
```bash
POST /api/v1/test-results
{
  "station_id": "ICT-01",
  "batch_id": "BATCH-2024-001",
  "timestamp": "2024-04-15T10:30:00Z",
  "test_items": [
    {"name": "Voltage", "value": 4.98, "min": 4.75, "max": 5.25, "pass": true},
    {"name": "Current", "value": 0.52, "min": 0.40, "max": 0.60, "pass": true}
  ],
  "script_version": "v2.3.1",
  "environment": {"temperature": 22.5, "humidity": 45}
}
```

**Get risk assessment:**
```bash
GET /api/v1/risk-score/{product_id}

{
  "product_id": "PRD-0001",
  "risk_score": 72,
  "risk_level": "high",
  "root_causes": [
    {"cause": "script_drift", "weight": 0.35},
    {"cause": "threshold_shift", "weight": 0.28}
  ],
  "recommendations": ["Review script v2.3.1", "Update threshold +2%"]
}
```

---

## Feature Comparison

| Feature | FalsePass Hunter | Traditional Test Systems |
|---------|-----------------|--------------------------|
| Pass/Fail detection | ✓ | ✓ |
| Risk credibility scoring | ✓ | ✗ |
| Drift monitoring | ✓ | Manual |
| Cross-stage rework correlation | ✓ | Post-analysis only |
| Unstructured log analysis | ✓ | ✗ |
| Fixture predictive maintenance | ✓ | Periodic maintenance |
| Automatic improvement suggestions | ✓ | Manual engineering |

---

## Development Status

### ✅ Completed
- [x] Frontend dashboard (React + Ant Design)
- [x] Real-time data visualization
- [x] Multi-dimensional risk display
- [x] PDF/CSV report export
- [x] Responsive design

### 🔄 In Progress
- [ ] Backend API (FastAPI)
- [ ] ML model training
- [ ] Database schema and integration
- [ ] LLM-powered log analysis

### 📋 Planned
- [ ] Kafka event streaming
- [ ] Alert notification system (Email/Slack)
- [ ] Model interpretability features
- [ ] Role-based access control
- [ ] Multi-language UI

---

## Contributing

We welcome community contributions. Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add your feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Create a Pull Request

---

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Contact

**Illusion-Breakers Team**  
GitHub: [github.com/Illusion-Breakers](https://github.com/Illusion-Breakers)

---

## References

1. Wilamowski, B. M., et al. (2002). "IC Test and Diagnosis Methodology." IEEE Transactions on Industrial Electronics.
2. Asada, T., et al. (2010). "False Reject Analysis in Wafer Test." IEEE VLSI Test Symposium.
3. SEMI E10 Standards - Process Test Data Exchange
4. IPC-9261 - Electronic Test Equipment Wire and Cable Performance

---

**Last Updated:** April 15, 2024  
**Version:** 1.0-MVP

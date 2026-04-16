<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License">
</p>

<h1 align="center">🛡️ FalsePass Hunter</h1>

<p align="center">
  <strong>AI-Powered Manufacturing Quality Analytics Platform Built on Kaggle UCI SECOM Dataset</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#api-documentation">API Docs</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <a href="README.md">中文文档</a>
</p>

---

## 📖 About

FalsePass Hunter is a manufacturing quality analytics platform built on the **Kaggle UCI SECOM** dataset. It transforms raw sensor data into explainable, actionable risk insights, helping engineers identify potential "false pass" samples.

### 🔑 Key Features

- ✅ **Real Data Driven** — Built on Kaggle UCI SECOM semiconductor dataset (1567 rows × 592 columns)
- ✅ **Multi-dimensional Analysis** — 5 analysis views: Dashboard, Drift Monitor, Cross Stage, Risk Report, Log Analysis
- ✅ **Explainability** — Evidence Chain tracking for traceable conclusions
- ✅ **Real-time Alerts** — Drift monitoring and anomaly detection
- ✅ **Report Export** — PDF risk reports for documentation
- ✅ **Full-stack Architecture** — React + FastAPI, easy to extend

### 🎯 Use Cases

- Smart manufacturing quality monitoring
- Semiconductor/electronics production line analysis
- Sensor data anomaly detection
- Industrial big data visualization
- AI-assisted decision support

---

## 🚀 Quick Start

### Prerequisites

| Software | Version |
|----------|---------|
| Node.js | >= 16.0.0 |
| Python | >= 3.9 |
| npm | >= 8.0.0 |

### 1. Clone the Repository

```bash
git clone https://github.com/Illusion-Breakers/FalsePass-Hunter.git
cd FalsePass-Hunter
```

### 2. Install and Start Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Verify: Visit http://localhost:8000/api/health

### 3. Install and Start Frontend

```bash
cd src
npm install
npm run dev
```

Verify: Visit http://localhost:3000

---

## 📊 Modules

| Module | Description | API Endpoint |
|--------|-------------|--------------|
| 🏠 **Home** | Entry point and navigation | - |
| 📊 **Dashboard** | Main control panel - production status, risk distribution, evidence chain | `GET /api/dashboard/summary` |
| 📈 **Drift Monitor** | Monitor parameter drift with time window comparison | `GET /api/drift/summary` |
| 🔀 **Cross Stage** | Cross-process analysis for risk propagation | `GET /api/cross-stage/summary` |
| ⚠️ **Risk Report** | Sample-level risk assessment with PDF export | `GET /api/risk/report` |
| 📝 **Log Analysis** | Structured log analysis for key events | `POST /api/log/analyze` |

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Data Layer    │────▶│   Backend       │────▶│   Frontend      │
│   uci-secom.csv │     │   FastAPI       │     │   React         │
│   1567×592      │     │   pandas/numpy  │     │   Ant Design    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18.2, Vite 5.x, Ant Design 5.x, Recharts, html2pdf.js |
| **Backend** | FastAPI 0.100+, pandas 2.x, numpy, uvicorn |
| **Data** | Kaggle UCI SECOM |

---

## 📂 Project Structure

```
FalsePass-Hunter/
├── backend/                    # Backend service
│   ├── main.py                 # FastAPI application
│   └── requirements.txt        # Python dependencies
├── src/                        # Frontend source
│   ├── pages/                  # Page components
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── DriftMonitor.jsx    # Drift monitoring
│   │   ├── CrossStage.jsx      # Cross-stage analysis
│   │   ├── RiskReport.jsx      # Risk report
│   │   └── LogAnalysis.jsx     # Log analysis
│   ├── components/             # Reusable components
│   ├── data/                   # Frontend data config
│   ├── styles/                 # Global styles
│   └── App.jsx                 # Entry point
├── data/                       # Datasets
│   └── uci-secom.csv           # UCI SECOM data
├── README.md                   # Chinese docs
├── README_EN.md                # English docs
└── LICENSE                     # MIT License
```

---

## 🔌 API Documentation

### Endpoints Overview

| Method | Endpoint | Description | Parameters |
|:-------|:---------|:------------|:-----------|
| `GET` | `/api/health` | Health check | - |
| `GET` | `/api/dashboard/summary` | Dashboard summary | `station`, `timeRange` |
| `GET` | `/api/drift/summary` | Drift analysis | `station`, `timeRange` |
| `GET` | `/api/cross-stage/summary` | Cross-stage analysis | - |
| `GET` | `/api/risk/report` | Risk report | `sampleId` |
| `POST` | `/api/log/analyze` | Log analysis | `{ logText }` |

### Response Example

<details>
<summary><code>GET /api/dashboard/summary</code> Response Structure</summary>

```json
{
  "metrics": {
    "totalTested": 1567,
    "falsePass": 42,
    "riskAlerts": 15,
    "confidence": 0.94
  },
  "trendData": [],
  "stations": [],
  "riskDistribution": {
    "low": 850,
    "medium": 500,
    "high": 217
  },
  "provenance": "data/uci-secom.csv",
  "evidenceChain": {}
}
```

</details>

---

## 📊 Dataset Information

This project uses the **Kaggle UCI SECOM** dataset, a real semiconductor manufacturing sensor dataset.

| Attribute | Details |
|-----------|---------|
| Source | Kaggle - UCI SECOM |
| Samples | 1,567 rows |
| Features | 592 columns |
| Key Fields | `Time` (timestamp), `Pass/Fail` (test result) |
| Data Type | Numerical sensor readings |

### Data Validation

```bash
cd backend
python -c "import pandas as pd; df = pd.read_csv('data/uci-secom.csv'); print(f'Rows: {len(df)}, Cols: {len(df.columns)}')"
# Output: Rows: 1567, Cols: 592
```

---

## 🧪 Testing & Validation

### Backend Health Check

```bash
curl http://localhost:8000/api/health
```

### Frontend Build

```bash
cd src
npm run build
```

---

## 🤝 Contributing

We welcome contributions! If you find bugs or have improvements:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 Push to branch (`git push origin feature/AmazingFeature`)
5. 📝 Create a Pull Request

### Development Setup

```bash
# Clone
git clone https://github.com/Illusion-Breakers/FalsePass-Hunter.git
cd FalsePass-Hunter

# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd ../src
npm install
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👥 Team & Contact

| Resource | Link |
|----------|------|
| **GitHub** | [Illusion-Breakers/FalsePass-Hunter](https://github.com/Illusion-Breakers/FalsePass-Hunter) |
| **Issues** | [Report an issue](https://github.com/Illusion-Breakers/FalsePass-Hunter/issues) |
| **Discussion** | [Start a discussion](https://github.com/Illusion-Breakers/FalsePass-Hunter/discussions) |

**Team**: Illusion-Breakers  
**Mission**: Illuminating the truth through data

---

<div align="center">

**Made with ❤️ by Illusion-Breakers**

[⬆️ Back to Top](#-falsepass-hunter)

</div>

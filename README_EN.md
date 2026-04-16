# 🛡️ FalsePass Hunter

> 🚀 **AI-Powered Manufacturing Quality Analytics Platform Built on Kaggle UCI SECOM Dataset**

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Kaggle](https://img.shields.io/badge/Dataset-UCI%20SECOM-20BEFF?style=for-the-badge&logo=kaggle&logoColor=white)](https://www.kaggle.com/datasets)
[![GitHub stars](https://img.shields.io/github/stars/Illusion-Breakers/FalsePass-Hunter?style=for-the-badge&logo=github)](https://github.com/Illusion-Breakers/FalsePass-Hunter)

[📖 Docs](#-documentation) • [🚀 Quick Start](#-quick-start) • [📊 Features](#-features) • [🏗️ Architecture](#️-architecture) • [👥 Team](#-team)

</div>

---

## 📖 Table of Contents

<details>
<summary>Click to expand</summary>

- [✨ Features](#-features)
- [🎯 Pages](#-pages)
- [🏗️ Architecture](#️-architecture)
- [📂 Structure](#-structure)
- [🚀 Quick Start](#-quick-start)
- [🔌 API](#-api)
- [📊 Data](#-data)
- [🛠️ Tech Stack](#️-tech-stack)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Team](#-team)

</details>

---

## ✨ Features

**🎯 Real Data Driven** — Built on Kaggle UCI SECOM dataset  
**📈 Visual Analytics** — Multi-dimensional risk visualization  
**🔍 Explainability** — Evidence Chain tracking  
**🔔 Real-time Alerts** — Drift monitoring & anomaly detection  
**📄 Report Export** — PDF risk report generation  
**🌐 Cross-platform** — React + FastAPI full-stack

---

## 🎯 Pages

**🏠 Home** — Entry point & navigation  
**📊 Dashboard** — Main control panel (`/api/dashboard/summary`)  
**📈 Drift Monitor** — Drift analysis (`/api/drift/summary`)  
**🔀 Cross Stage** — Cross-process analysis (`/api/cross-stage/summary`)  
**⚠️ Risk Report** — Sample-level report (`/api/risk/report`)  
**📝 Log Analysis** — Log diagnostics (`/api/log/analyze`)

---

## 🏗️ Architecture

```
                         ╔════════════════════════════════════════╗
                         ║         FalsePass Hunter               ║
                         ╚════════════════════════════════════════╝
                                      │
                                      │ Data Source
                                      ▼
                         ┌────────────────────────┐
                         │  data/uci-secom.csv    │
                         │   1567 rows × 592 cols │
                         │   Time + Pass/Fail     │
                         └───────────┬────────────┘
                                     │
                                     │ FastAPI Processing
                                     ▼
                    ┌────────────────────────────────┐
                    │        backend/main.py         │
                    │   ┌────────────────────────┐   │
                    │   │  RESTful API Endpoints │   │
                    │   │  /api/health           │   │
                    │   │  /api/dashboard/...    │   │
                    │   │  /api/drift/...        │   │
                    │   │  /api/cross-stage/...  │   │
                    │   │  /api/risk/...         │   │
                    │   │  /api/log/...          │   │
                    │   └────────────────────────┘   │
                    └────────────┬───────────────────┘
                                 │
                                 │ JSON Response
                                 ▼
                    ┌────────────────────────────────┐
                    │       React Frontend           │
                    │  ┌────┬────┬────┬────┬────┐   │
                    │  │📊  │📈  │🔀  │⚠️  │📝  │   │
                    │  │Home│Drift│Cross│Risk│Log │   │
                    │  └────┴────┴────┴────┴────┘   │
                    └────────────┬───────────────────┘
                                 │
                                 │ Output
                                 ▼
              ┌──────────────────────────────────────┐
              │  Visualizations / PDF Export         │
              └──────────────────────────────────────┘
```

---

## 📂 Project Structure

```
FalsePass-Hunter/
│
├── 📄 README.md            # Chinese docs
├── 📄 README_EN.md         # English docs
├── 📄 LICENSE              # MIT License
│
├── 📦 data/
│   └── uci-secom.csv       # Kaggle UCI SECOM Dataset
│
├── 🔧 backend/
│   ├── main.py             # FastAPI app
│   └── requirements.txt    # Python deps
│
└── ⚛️ src/
    ├── pages/              # Page components
    │   ├── Dashboard.jsx
    │   ├── DriftMonitor.jsx
    │   ├── CrossStage.jsx
    │   ├── RiskReport.jsx
    │   └── LogAnalysis.jsx
    ├── components/         # Reusable components
    ├── data/               # Frontend data
    ├── styles/             # Styles
    └── App.jsx             # Entry point
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- Python >= 3.9
- npm >= 8.0.0

### Install & Run

```bash
# Clone
git clone https://github.com/Illusion-Breakers/FalsePass-Hunter.git
cd FalsePass-Hunter

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend (new terminal)
cd src
npm install
npm run dev
```

> 🎉 Open `http://localhost:3000`

---

## 🔌 API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/dashboard/summary` | GET | Dashboard data |
| `/api/drift/summary` | GET | Drift analysis |
| `/api/cross-stage/summary` | GET | Cross-stage analysis |
| `/api/risk/report` | GET | Risk report |
| `/api/log/analyze` | POST | Log analysis |

---

## 📊 Data

**Source**: Kaggle - UCI SECOM  
**Samples**: 1,567 rows  
**Features**: 592 columns  
**Key Fields**: `Time`, `Pass/Fail`  
**Type**: Semiconductor manufacturing sensor data

---

## 🛠️ Tech Stack

**Frontend**: React 18.2 • Vite 5.x • Ant Design 5.x • Recharts  
**Backend**: FastAPI 0.100+ • pandas 2.x • numpy • uvicorn  
**Data**: Kaggle UCI SECOM

---

## 🤝 Contributing

1. 🍴 Fork the repo
2. 🌿 Create branch `git checkout -b feature/AmazingFeature`
3. 💾 Commit `git commit -m 'Add AmazingFeature'`
4. 🚀 Push `git push origin feature/AmazingFeature`
5. 📝 Create PR

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 👥 Team

<div align="center">

**🎨 Illusion-Breakers**

*Illuminating the truth through data*

</div>

---

## 📬 Contact

- GitHub: [Illusion-Breakers/FalsePass-Hunter](https://github.com/Illusion-Breakers/FalsePass-Hunter)
- Issues: Submit issues
- Discussions: Start discussions

---

<div align="center">

**Made with ❤️ by Illusion-Breakers**

</div>

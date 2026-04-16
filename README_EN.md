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
<summary>Click to expand full table of contents</summary>

- [✨ Features](#-features)
- [🎯 Page Overview](#-page-overview)
- [🏗️ Architecture](#️-architecture)
- [📂 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🔌 API Documentation](#-api-documentation)
- [📊 Data Information](#-data-information)
- [🧪 Testing & Validation](#-testing--validation)
- [🛠️ Tech Stack](#️-tech-stack)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Team](#-team)
- [📬 Contact](#-contact)

</details>

---

## ✨ Features

| 🎯 Real Data Driven | 📈 Visual Analytics | 🔍 Explainability |
|:---:|:---:|:---:|
| Built on Kaggle UCI SECOM dataset | Multi-dimensional risk visualization | Evidence Chain tracking |

| 🔔 Real-time Alerts | 📄 Report Export | 🌐 Cross-platform |
|:---:|:---:|:---:|
| Drift monitoring & anomaly detection | PDF risk report generation | React + FastAPI full-stack |

---

## 🎯 Page Overview

| Page | Purpose | Core API | Output |
|------|---------|----------|--------|
| 🏠 **Home** | Entry point & navigation | - | Quick navigation |
| 📊 **Dashboard** | Main control panel | `/api/dashboard/summary` | Trends, station overview, risk distribution, evidence chain |
| 📈 **Drift Monitor** | Drift monitoring | `/api/drift/summary` | Time-window drift comparison, anomaly events |
| 🔀 **Cross Stage** | Cross-process analysis | `/api/cross-stage/summary` | Inter-stage risk comparison, correlation analysis |
| ⚠️ **Risk Report** | Sample-level report | `/api/risk/report` | Risk score, evidence summary, PDF export |
| 📝 **Log Analysis** | Log diagnostics | `/api/log/analyze` | Structured log analysis results |

---

## 🏗️ Architecture

```
┌──────────────────┐
│  data/uci-secom.csv│
│   (1567×592 data) │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  FastAPI Backend │
│     (main.py)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  React Frontend  │
│  (6 Analysis Pages)│
└──────────────────┘
```

**Data Flow:** CSV Source → FastAPI Processing → React UI → Visualizations / PDF Export

---

## 📂 Project Structure

```
FalsePass-Hunter/
├── 📄 README.md                 # Chinese documentation
├── 📄 README_EN.md              # English documentation
├── 📄 LICENSE                   # MIT License
├── 📦 data/
│   └── uci-secom.csv            # Kaggle UCI SECOM Dataset (1567×592)
├── 🔧 backend/
│   ├── main.py                  # FastAPI main application
│   └── requirements.txt         # Python dependencies
└── ⚛️ src/
    ├── pages/                   # Page components
    │   ├── Dashboard.jsx        # 📊 Main Dashboard
    │   ├── DriftMonitor.jsx     # 📈 Drift Monitor
    │   ├── CrossStage.jsx       # 🔀 Cross Stage Analysis
    │   ├── RiskReport.jsx       # ⚠️ Risk Report
    │   └── LogAnalysis.jsx      # 📝 Log Analysis
    ├── components/              # Reusable components
    ├── data/                    # Frontend data configuration
    ├── styles/                  # Style files
    └── App.jsx                  # Application entry point
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- Python >= 3.9
- npm >= 8.0.0

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Illusion-Breakers/FalsePass-Hunter.git
cd FalsePass-Hunter
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3️⃣ Start Backend Server

```bash
uvicorn main:app --reload --port 8000
```

> ✅ Verify backend at `http://localhost:8000/api/health`

### 4️⃣ Install Frontend Dependencies

```bash
cd ../src
npm install
```

### 5️⃣ Start Frontend Dev Server

```bash
npm run dev
```

> 🎉 Access the application at `http://localhost:3000`

---

## 🔌 API Documentation

### Endpoints Overview

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/api/health` | Health check | - |
| `GET` | `/api/dashboard/summary` | Dashboard data | `station`, `timeRange` |
| `GET` | `/api/drift/summary` | Drift analysis | `station`, `timeRange` |
| `GET` | `/api/cross-stage/summary` | Cross-stage analysis | - |
| `GET` | `/api/risk/report` | Risk report | `sampleId` |
| `POST` | `/api/log/analyze` | Log analysis | `{ logText }` |

### Response Example

<details>
<summary>Dashboard Summary Response Structure</summary>

```json
{
  "metrics": {
    "totalTested": 1567,
    "falsePass": 42,
    "riskAlerts": 15,
    "confidence": 0.94
  },
  "trendData": [...],
  "stations": [...],
  "riskDistribution": {
    "low": 850,
    "medium": 500,
    "high": 217
  },
  "provenance": "data/uci-secom.csv",
  "evidenceChain": {...}
}
```

</details>

---

## 📊 Data Information

### UCI SECOM Dataset

| Attribute | Value |
|-----------|-------|
| **Source** | Kaggle - UCI SECOM |
| **Samples** | 1,567 rows |
| **Features** | 592 columns |
| **Key Fields** | `Time`, `Pass/Fail` |
| **Data Type** | Semiconductor manufacturing sensor data |

### Data Validation

```bash
# Verify data integrity
cd backend
python -c "import pandas as pd; df = pd.read_csv('data/uci-secom.csv'); print(f'Rows: {len(df)}, Cols: {len(df.columns)}')"
```

---

## 🧪 Testing & Validation

### Backend Health Check

```bash
curl http://localhost:8000/api/health
```

### Frontend Build Test

```bash
cd src
npm run build
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18.2 • Vite 5.x • Ant Design 5.x • Recharts • html2pdf.js |
| **Backend** | FastAPI 0.100+ • pandas 2.x • numpy • uvicorn |
| **Data** | Kaggle UCI SECOM |

---

## 🤝 Contributing

We welcome contributions of all kinds!

1. 🍴 Fork the repository
2. 🌿 Create a feature branch `git checkout -b feature/AmazingFeature`
3. 💾 Commit your changes `git commit -m 'Add some AmazingFeature'`
4. 🚀 Push to the branch `git push origin feature/AmazingFeature`
5. 📝 Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

<div align="center">

**🎨 Illusion-Breakers**

*Illuminating the truth through data*

</div>

---

## 📬 Contact

- 📧 **GitHub**: [Illusion-Breakers/FalsePass-Hunter](https://github.com/Illusion-Breakers/FalsePass-Hunter)
- 🐛 **Issues**: Submit issues on the Issues page
- 💬 **Discussions**: Feel free to start discussions

---

<div align="center">

**Made with ❤️ by Illusion-Breakers**

[⬆️ Back to Top](#-falsepass-hunter)

</div>

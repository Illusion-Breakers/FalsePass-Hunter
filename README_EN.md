# FalsePass Hunter AI 🔍

## Hidden False Pass Detection System for Test Engineering

> **HackDKU 2026** | Track 3: Test Engineering (Luxshare)  
> **Team:** Illusion-Breakers  
> **Status:** Production Ready MVP

---

## 🎯 One-Line Story

**"The most dangerous product in a factory is not the one that fails testing. It's the one that has problems but 'passed testing' anyway."**

---

## 📋 What is FalsePass Hunter?

FalsePass Hunter AI is an intelligent risk detection system designed for Test Engineering (TE) scenarios. Unlike traditional anomaly detection that focuses on failed boards, we specialize in catching **false passes** - products that pass all tests but actually have underlying defects.

### Core Philosophy

> We are not judging "pass/fail" results. We are auditing the **credibility of test results**.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    FalsePass Hunter AI                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INPUT LAYER                                                     │
│  ├─ ICT/FCT Test Logs                                            │
│  ├─ Script Version History                                       │
│  ├─ Threshold Configurations                                     │
│  ├─ Rework Records                                               │
│  ├─ Golden Samples/Waveforms                                     │
│  └─ Engineering Notes                                            │
│                                                                  │
│  ANALYSIS ENGINE                                                 │
│  ├─ 📐 Drift Monitor          (Threshold/Script Drift)          │
│  ├─ 🔗 Cross-Stage Validator  (Test→Rework Correlation)         │
│  ├─ 📝 Log Reasoning Agent    (LLM-powered Analysis)            │
│  └─ 🔧 Fixture Health         (Predictive Maintenance)          │
│                                                                  │
│  OUTPUT LAYER                                                    │
│  ├─ False Pass Risk Score (0-100)                               │
│  ├─ Top-K Suspicious Test Items                                  │
│  ├─ Root Cause Ranking (Script/Threshold/Fixture/Environment)   │
│  └─ Actionable Recommendations                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Innovations

| # | Innovation | Description |
|---|------------|-------------|
| 1 | **False Pass Focus** | While others track fails, we track "passed but untrustworthy" |
| 2 | **Credibility Assessment** | Upgrading from pass/fail to credibility scoring |
| 3 | **Rework Feedback Loop** | Downstream anomalies train upstream risk perception |
| 4 | **Hybrid Reasoning** | Numerical drift + Text analysis (logs, notes, versions) |
| 5 | **Fixture Health** | Predictive maintenance based on usage & historical data |
| 6 | **Threshold Optimization** | Data-driven threshold recommendations |

---

## 📊 Live Dashboard Features

### Core Metrics
- **Today's Tests:** Total test count across all stations
- **False Pass Detected:** Products flagged as high-risk false passes
- **High Risk Alerts:** Stations requiring immediate attention
- **System Confidence:** Overall AI confidence score

### Real-Time Monitoring
- Production line status with risk indicators
- Fixture health prediction with remaining life
- Drift detection timeline with version changes
- Cross-stage correlation analysis

---

## 🎨 Tech Stack

### Frontend
- **React 18** - UI Framework
- **Ant Design 5** - Component Library
- **Recharts** - Data Visualization
- **React Router** - Navigation

### Backend (Planned)
- **FastAPI** - REST API
- **PyTorch** - ML Models
- **LLM Integration** - Log reasoning

### Deployment
- **Vite** - Build Tool
- **Docker** - Containerization

---

## 📁 Project Structure

```
FalsePass-Hunter/
├── src/
│   ├── App.jsx              # Main application
│   ├── components/          # Reusable components
│   └── pages/               # Page components
├── dist/
│   └── index.html           # Standalone demo page
├── docs/
│   └── proposal.pdf         # Full proposal document
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 Use Cases

### For TE Engineers
- Real-time false pass detection
- Root cause analysis with AI explanations
- Fixture health monitoring & predictions
- Threshold optimization recommendations

### For Quality Managers
- Production line risk dashboard
- Historical trend analysis
- Supplier quality correlation
- Audit-ready reports

### For Process Optimization
- Coverage gap identification
- Redundant test elimination
- CT (Cycle Time) reduction insights
- NPI (New Product Introduction) support

---

## 🏆 Award-Worthy Highlights

| Dimension | Our Contribution |
|-----------|------------------|
| **Innovation** | False Pass visualization + Risk gauge + Sankey diagrams |
| **Technical** | Recharts/ECharts + Ant Design + WebSocket real-time |
| **Business Value** | TE-friendly UI + Explainable reports + Actionable insights |
| **Completeness** | 5 complete pages + Real data + Interactive features |
| **Presentation** | Industrial UI + Dynamic charts + Alert notifications |

---

## 📖 How to Use

### Quick Start (Standalone Demo)

1. Open `dist/index.html` in any modern browser
2. Navigate through sections: Problem → Solution → Modules → Demo
3. View live dashboard preview with simulated data

### Full Development Setup

```bash
# Navigate to project
cd FalsePass-Hunter/src

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎤 Pitch Script

### Opening (30 seconds)
> "Good afternoon, judges. We are Team Illusion-Breakers. The most dangerous product in a factory is not the one that fails testing—it's the one that has problems but 'passed testing' anyway. FalsePass Hunter AI exists to catch these dangerous slip-throughs."

### Demo (2 minutes)
> "Look at our dashboard—it shows real-time test credibility across all production lines. Click this high-risk alert to see details. Here's our Drift Monitor showing script version changes and threshold comparisons. This is our Cross-Stage Analysis using Sankey diagrams to show test-to-rework correlations..."

### Closing (30 seconds)
> "We're not increasing test coverage. We're making existing test results more credible. FalsePass Hunter AI: adding a layer of credibility review to every 'test passed' result."

---

## 🤝 Team

**Illusion-Breakers**  
HackDKU 2026 | Track 3: Test Engineering

---

## 📄 License

This project is created for HackDKU 2026. All rights reserved.

---

## 📞 Contact

- **GitHub:** [@Illusion-Breakers](https://github.com/orgs/Illusion-Breakers)
- **Hackathon:** HackDKU 2026
- **Track Sponsor:** Luxshare Precision

---

*"The purpose of FalsePass Hunter AI is to make every 'test passed' result trustworthy."*

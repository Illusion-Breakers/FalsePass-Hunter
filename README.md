# 🛡️ FalsePass Hunter

> 🚀 **基于 Kaggle UCI SECOM 数据集的智能制造质量分析平台**

<div align="center">

[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Kaggle](https://img.shields.io/badge/Dataset-UCI%20SECOM-20BEFF?style=for-the-badge&logo=kaggle&logoColor=white)](https://www.kaggle.com/datasets)
[![GitHub stars](https://img.shields.io/github/stars/Illusion-Breakers/FalsePass-Hunter?style=for-the-badge&logo=github)](https://github.com/Illusion-Breakers/FalsePass-Hunter)

[📖 文档](#-文档) • [🚀 快速开始](#-快速开始) • [📊 功能特性](#-功能特性) • [🏗️ 项目架构](#️-项目架构) • [👥 团队](#-团队)

</div>

---

## 📖 目录

<details>
<summary>点击展开完整目录</summary>

- [✨ 功能特性](#-功能特性)
- [🎯 页面总览](#-页面总览)
- [🏗️ 项目架构](#️-项目架构)
- [📂 项目结构](#-项目结构)
- [🚀 快速开始](#-快速开始)
- [🔌 API 文档](#-api-文档)
- [📊 数据说明](#-数据说明)
- [🧪 测试与验证](#-测试与验证)
- [🛠️ 技术栈](#️-技术栈)
- [🤝 贡献指南](#-贡献指南)
- [📄 许可证](#-许可证)
- [👥 团队](#-团队)
- [📬 联系我们](#-联系我们)

</details>

---

## ✨ 功能特性

**🎯 真实数据驱动** — 基于 Kaggle UCI SECOM 真实制造数据  
**📈 可视化分析** — 多维度图表展示风险趋势  
**🔍 可解释性** — Evidence Chain 证据链追踪  
**🔔 实时告警** — 漂移监控与异常检测  
**📄 报告导出** — PDF 格式风险报告  
**🌐 跨平台** — React + FastAPI 全栈架构

---

## 🎯 页面总览

**🏠 Home** — 项目入口和导航  
**📊 Dashboard** — 主驾驶舱 (`/api/dashboard/summary`)  
**📈 Drift Monitor** — 漂移监控 (`/api/drift/summary`)  
**🔀 Cross Stage** — 跨工序分析 (`/api/cross-stage/summary`)  
**⚠️ Risk Report** — 单样本报告 (`/api/risk/report`)  
**📝 Log Analysis** — 日志分析 (`/api/log/analyze`)

---

## 🏗️ 项目架构

```
                         ╔════════════════════════════════════════╗
                         ║         FalsePass Hunter               ║
                         ╚════════════════════════════════════════╝
                                      │
                                      │ 数据源
                                      ▼
                         ┌────────────────────────┐
                         │  data/uci-secom.csv    │
                         │   1567 行 × 592 列      │
                         │   Time + Pass/Fail     │
                         └───────────┬────────────┘
                                     │
                                     │ FastAPI 处理
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
                                 │ JSON 响应
                                 ▼
                    ┌────────────────────────────────┐
                    │       React Frontend           │
                    │  ┌────┬────┬────┬────┬────┐   │
                    │  │📊  │📈  │🔀  │⚠️  │📝  │   │
                    │  │Home│Drift│Cross│Risk│Log │   │
                    │  └────┴────┴────┴────┴────┘   │
                    └────────────┬───────────────────┘
                                 │
                                 │ 输出
                                 ▼
              ┌──────────────────────────────────────┐
              │  可视化图表 / PDF 导出 / 证据链       │
              └──────────────────────────────────────┘
```

---

## 📂 项目结构

```
FalsePass-Hunter/
│
├── 📄 README.md            # 中文说明文档
├── 📄 README_EN.md         # English documentation
├── 📄 LICENSE              # MIT License
│
├── 📦 data/
│   └── uci-secom.csv       # Kaggle UCI SECOM 数据集
│
├── 🔧 backend/
│   ├── main.py             # FastAPI 主应用
│   └── requirements.txt    # Python 依赖
│
└── ⚛️ src/
    ├── pages/              # 页面组件
    │   ├── Dashboard.jsx
    │   ├── DriftMonitor.jsx
    │   ├── CrossStage.jsx
    │   ├── RiskReport.jsx
    │   └── LogAnalysis.jsx
    ├── components/         # 可复用组件
    ├── data/               # 前端数据配置
    ├── styles/             # 样式文件
    └── App.jsx             # 应用入口
```

---

## 🚀 快速开始

### 前置要求

- Node.js >= 16.0.0
- Python >= 3.9
- npm >= 8.0.0

### 1️⃣ 克隆项目

```bash
git clone https://github.com/Illusion-Breakers/FalsePass-Hunter.git
cd FalsePass-Hunter
```

### 2️⃣ 安装后端依赖

```bash
cd backend
pip install -r requirements.txt
```

### 3️⃣ 启动后端服务

```bash
uvicorn main:app --reload --port 8000
```

### 4️⃣ 安装前端依赖

```bash
cd ../src
npm install
npm run dev
```

> 🎉 访问 `http://localhost:3000`

---

## 🔌 API 文档

| 端点 | 方法 | 描述 |
|------|------|------|
| `/api/health` | GET | 健康检查 |
| `/api/dashboard/summary` | GET | 驾驶舱数据 |
| `/api/drift/summary` | GET | 漂移分析 |
| `/api/cross-stage/summary` | GET | 跨工序分析 |
| `/api/risk/report` | GET | 风险报告 |
| `/api/log/analyze` | POST | 日志分析 |

---

## 📊 数据说明

**数据来源**: Kaggle - UCI SECOM  
**样本数**: 1,567 行  
**特征数**: 592 列  
**关键字段**: `Time`, `Pass/Fail`  
**数据类型**: 半导体制造传感器数据

---

## 🛠️ 技术栈

**Frontend**: React 18.2 • Vite 5.x • Ant Design 5.x • Recharts  
**Backend**: FastAPI 0.100+ • pandas 2.x • numpy • uvicorn  
**Data**: Kaggle UCI SECOM

---

## 🤝 贡献指南

1. 🍴 Fork 本仓库
2. 🌿 创建分支 `git checkout -b feature/AmazingFeature`
3. 💾 提交 `git commit -m 'Add AmazingFeature'`
4. 🚀 推送 `git push origin feature/AmazingFeature`
5. 📝 创建 Pull Request

---

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件

---

## 👥 团队

<div align="center">

**🎨 Illusion-Breakers**

*用代码照亮数据的真相*

</div>

---

## 📬 联系

- GitHub: [Illusion-Breakers/FalsePass-Hunter](https://github.com/Illusion-Breakers/FalsePass-Hunter)
- Issue: 提交问题
- Discussion: 发起讨论

---

<div align="center">

**Made with ❤️ by Illusion-Breakers**

</div>

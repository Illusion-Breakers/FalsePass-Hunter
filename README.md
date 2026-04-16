# 🛡️ FalsePass Hunter

> 基于 Kaggle UCI SECOM 数据集的智能制造质量分析平台

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?logo=python)](https://www.python.org/)

[中文](#) | [English](README_EN.md)

---

## 📌 项目简介

FalsePass Hunter 是一个智能制造质量分析平台，基于 Kaggle UCI SECOM 真实数据集，将原始传感器数据转化为可解释的风险洞察。

**核心价值**：不是判断"这块板过没过"，而是判断"**这次通过到底可不可信**"。

---

## 📊 页面功能

| 页面 | 作用 | API 端点 |
|------|------|----------|
| 🏠 Home | 项目入口和导航 | - |
| 📊 Dashboard | 主驾驶舱 - 趋势图、站点概览、风险分布、证据链 | `/api/dashboard/summary` |
| 📈 Drift Monitor | 漂移监控 - 时间窗口漂移对比、异常事件 | `/api/drift/summary` |
| 🔀 Cross Stage | 跨工序分析 - 工序间风险对比、关联分析 | `/api/cross-stage/summary` |
| ⚠️ Risk Report | 单样本报告 - 风险评分、证据摘要、PDF 导出 | `/api/risk/report` |
| 📝 Log Analysis | 日志分析 - 结构化日志分析结果 | `/api/log/analyze` |

---

## 🏗️ 技术架构

- **前端**：React 18.2 + Vite 5.x + Ant Design 5.x + Recharts
- **后端**：FastAPI 0.100+ + pandas 2.x + numpy + uvicorn
- **数据**：Kaggle UCI SECOM (1567 行 × 592 列)

---

## 📂 项目结构

```
FalsePass-Hunter/
├── backend/
│   ├── main.py              # FastAPI 主应用
│   └── requirements.txt     # Python 依赖
├── src/
│   ├── pages/               # 页面组件
│   │   ├── Dashboard.jsx
│   │   ├── DriftMonitor.jsx
│   │   ├── CrossStage.jsx
│   │   ├── RiskReport.jsx
│   │   └── LogAnalysis.jsx
│   ├── components/          # 可复用组件
│   └── App.jsx              # 应用入口
├── data/
│   └── uci-secom.csv        # 数据集
├── README.md
└── README_EN.md
```

---

## 🚀 快速开始

### 前置要求

- Node.js >= 16.0.0
- Python >= 3.9
- npm >= 8.0.0

### 启动后端

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 启动前端

```bash
cd src
npm install
npm run dev
```

访问 http://localhost:3000

---

## 🔌 API 端点

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/dashboard/summary` | 驾驶舱数据 |
| GET | `/api/drift/summary` | 漂移分析 |
| GET | `/api/cross-stage/summary` | 跨工序分析 |
| GET | `/api/risk/report` | 风险报告 |
| POST | `/api/log/analyze` | 日志分析 |

---

## 📊 数据集说明

| 属性 | 值 |
|------|-----|
| 来源 | Kaggle - UCI SECOM |
| 样本数 | 1,567 行 |
| 特征数 | 592 列 |
| 关键字段 | Time, Pass/Fail |
| 数据类型 | 半导体制造传感器数据 |

---

## 🤝 贡献指南

1. Fork 本仓库
2. 创建分支 `git checkout -b feature/your-feature`
3. 提交更改 `git commit -m 'Add your feature'`
4. 推送 `git push origin feature/your-feature`
5. 创建 Pull Request

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 👥 团队

**Illusion-Breakers** - 用代码照亮数据的真相

📬 [GitHub](https://github.com/Illusion-Breakers/FalsePass-Hunter) | 🐛 [Issues](https://github.com/Illusion-Breakers/FalsePass-Hunter/issues)

---

<div align="center">

**Made with ❤️ by Illusion-Breakers**

</div>

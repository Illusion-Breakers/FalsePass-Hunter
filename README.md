<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License">
</p>

<h1 align="center">🛡️ FalsePass Hunter</h1>

<p align="center">
  <strong>基于 Kaggle UCI SECOM 数据集的智能制造质量分析平台</strong>
</p>

<p align="center">
  <a href="#-功能特性">功能特性</a> •
  <a href="#-快速开始">快速开始</a> •
  <a href="#-api-文档">API 文档</a> •
  <a href="#-项目结构">项目结构</a> •
  <a href="#-贡献指南">贡献指南</a>
</p>

<p align="center">
  <a href="README_EN.md">English Documentation</a>
</p>

---

## 📖 关于本项目

FalsePass Hunter 是一个面向智能制造领域的质量分析平台，基于 **Kaggle UCI SECOM** 真实数据集构建。本项目旨在将原始传感器数据转化为可解释、可操作的风险洞察，帮助工程师识别潜在的"虚假通过"（False Pass）样本。

### 🔑 核心特性

- ✅ **真实数据驱动** — 基于 Kaggle UCI SECOM 半导体制造数据集（1567 行 × 592 列）
- ✅ **多维度分析** — 提供 Dashboard、Drift Monitor、Cross Stage 等 5 个分析视角
- ✅ **可解释性** — Evidence Chain 证据链追踪，让每个结论都有据可查
- ✅ **实时告警** — 漂移监控与异常检测，及时发现产线异常
- ✅ **报告导出** — 支持 PDF 格式风险报告，便于汇报和归档
- ✅ **全栈架构** — React + FastAPI，前后端分离，易于扩展

### 🎯 适用场景

- 智能制造质量监控系统
- 半导体/电子制造产线分析
- 传感器数据异常检测
- 工业大数据可视化
- AI 辅助决策支持

---

## 🚀 快速开始

### 前置要求

| 软件 | 版本要求 |
|------|----------|
| Node.js | >= 16.0.0 |
| Python | >= 3.9 |
| npm | >= 8.0.0 |

### 1. 克隆项目

```bash
git clone https://github.com/Illusion-Breakers/FalsePass-Hunter.git
cd FalsePass-Hunter
```

### 2. 安装后端依赖并启动

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

验证后端：访问 http://localhost:8000/api/health

### 3. 安装前端依赖并启动

```bash
cd src
npm install
npm run dev
```

验证前端：访问 http://localhost:3000

---

## 📊 功能模块

| 模块 | 描述 | API 端点 |
|------|------|----------|
| 🏠 **Home** | 项目入口和导航 | - |
| 📊 **Dashboard** | 主驾驶舱，展示整体生产状态、风险分布、证据链 | `GET /api/dashboard/summary` |
| 📈 **Drift Monitor** | 监控测试参数漂移，支持时间窗口对比 | `GET /api/drift/summary` |
| 🔀 **Cross Stage** | 跨工序分析，识别工序间风险传递 | `GET /api/cross-stage/summary` |
| ⚠️ **Risk Report** | 单样本风险评估，支持 PDF 导出 | `GET /api/risk/report` |
| 📝 **Log Analysis** | 日志结构化分析，提取关键事件 | `POST /api/log/analyze` |

---

## 🏗️ 技术架构

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   数据层         │────▶│   后端层         │────▶│   前端层         │
│   uci-secom.csv │     │   FastAPI       │     │   React         │
│   1567×592      │     │   pandas/numpy  │     │   Ant Design    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 技术栈详情

| 层级 | 技术选型 |
|------|----------|
| **前端** | React 18.2, Vite 5.x, Ant Design 5.x, Recharts, html2pdf.js |
| **后端** | FastAPI 0.100+, pandas 2.x, numpy, uvicorn |
| **数据** | Kaggle UCI SECOM |

---

## 📂 项目结构

```
FalsePass-Hunter/
├── backend/                    # 后端服务
│   ├── main.py                 # FastAPI 主应用
│   └── requirements.txt        # Python 依赖
├── src/                        # 前端源码
│   ├── pages/                  # 页面组件
│   │   ├── Dashboard.jsx       # 主驾驶舱
│   │   ├── DriftMonitor.jsx    # 漂移监控
│   │   ├── CrossStage.jsx      # 跨工序分析
│   │   ├── RiskReport.jsx      # 风险报告
│   │   └── LogAnalysis.jsx     # 日志分析
│   ├── components/             # 可复用组件
│   ├── data/                   # 前端数据配置
│   ├── styles/                 # 全局样式
│   └── App.jsx                 # 应用入口
├── data/                       # 数据集
│   └── uci-secom.csv           # UCI SECOM 数据
├── README.md                   # 中文文档
├── README_EN.md                # 英文文档
└── LICENSE                     # MIT 许可证
```

---

## 🔌 API 文档

### 端点总览

| 方法 | 端点 | 描述 | 参数 |
|:-----|:-----|:-----|:-----|
| `GET` | `/api/health` | 健康检查 | - |
| `GET` | `/api/dashboard/summary` | 驾驶舱汇总数据 | `station`, `timeRange` |
| `GET` | `/api/drift/summary` | 漂移分析汇总 | `station`, `timeRange` |
| `GET` | `/api/cross-stage/summary` | 跨工序分析 | - |
| `GET` | `/api/risk/report` | 单样本风险报告 | `sampleId` |
| `POST` | `/api/log/analyze` | 日志分析 | `{ logText }` |

### 响应示例

<details>
<summary><code>GET /api/dashboard/summary</code> 响应结构</summary>

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

## 📊 数据集说明

本项目使用 **Kaggle UCI SECOM** 数据集，这是一个来自半导体制造过程的真实传感器数据。

| 属性 | 详情 |
|------|------|
| 来源 | Kaggle - UCI SECOM |
| 样本数量 | 1,567 行 |
| 特征数量 | 592 列 |
| 关键字段 | `Time` (时间戳), `Pass/Fail` (测试结果) |
| 数据类型 | 数值型传感器读数 |

### 数据验证

```bash
cd backend
python -c "import pandas as pd; df = pd.read_csv('data/uci-secom.csv'); print(f'Rows: {len(df)}, Cols: {len(df.columns)}')"
# 输出：Rows: 1567, Cols: 592
```

---

## 🧪 测试与验证

### 后端健康检查

```bash
curl http://localhost:8000/api/health
```

### 前端构建

```bash
cd src
npm run build
```

---

## 🤝 贡献指南

我们欢迎各种形式的贡献！如果你发现 Bug 或有改进建议，请：

1. 🍴 Fork 本仓库
2. 🌿 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 💾 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 推送到分支 (`git push origin feature/AmazingFeature`)
5. 📝 创建 Pull Request

### 开发环境设置

```bash
# 克隆
git clone https://github.com/Illusion-Breakers/FalsePass-Hunter.git
cd FalsePass-Hunter

# 后端
cd backend
pip install -r requirements.txt

# 前端
cd ../src
npm install
```

---

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

---

## 👥 团队与联系

| 项目 | 链接 |
|------|------|
| **GitHub** | [Illusion-Breakers/FalsePass-Hunter](https://github.com/Illusion-Breakers/FalsePass-Hunter) |
| **Issues** | [提交问题](https://github.com/Illusion-Breakers/FalsePass-Hunter/issues) |
| **Discussion** | [发起讨论](https://github.com/Illusion-Breakers/FalsePass-Hunter/discussions) |

**团队**: Illusion-Breakers  
**理念**: 用代码照亮数据的真相

---

<div align="center">

**Made with ❤️ by Illusion-Breakers**

[⬆️ 返回顶部](#-falsepass-hunter)

</div>

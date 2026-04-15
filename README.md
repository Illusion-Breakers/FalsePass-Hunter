# FalsePass Hunter AI 🔍

**面向 TE（Test Engineering）的隐性漏测风险预警系统**

[English](./README_EN.md) | **简体中文**

---

## 项目概述

### 问题定义

在半导体、电子产品制造中，测试工程（TE）阶段面临一个关键难题：**假通过（False Pass）问题**。传统测试系统关注的是"产品是否通过测试"，但无法识别"已通过的测试结果是否可信"。

**现象：**
- ICT/FCT 测试全部通过 ✓
- 产品进入后工位或客户端 ✗
- 出现异常、返修或失效
- 问题根源追溯困难

**根本原因：**
1. 测试脚本/阈值未及时更新（Drift）
2. 夹具老化/接触不良（Fixture Degradation）
3. 测试环境变化（Temperature、Humidity）
4. 黄金样本/参考波形已过期
5. 工程师操作差异或配置错误

### 解决方案

FalsePass Hunter AI 建立了一个**可信度评估体系**：

- **不改变**现有的 ICT/FCT 测试流程
- **增加**一层"这次通过是否可信"的风险评分
- **关联**测试通过与后续返修的相关性，反向训练模型
- **融合**数值漂移检测 + 文本分析（日志、备注、版本）
- **提供**可执行的改进建议（加测、复测、维护）

---

## 核心功能模块

### 1. **Drift Monitor（漂移监控）**
监控测试系统的五个关键维度与历史基线的偏离：
- 测试脚本版本变化
- 测试阈值调整
- 参考波形更新时间
- 测试环境参数（温度、湿度）
- 统计分布（均值、标准差、覆盖率）

**输出:** Drift Score (0-100)，自动识别异常变化点

---

### 2. **Cross-Stage Validator（跨阶段验证器）**
建立两层关联分析：

**第一层：** 测试通过样本 → 后工位返修数据
- 统计特性：通过率、返修率、关联系数
- 时间序列：24小时/7天/30天趋势
- 异常检测：概率异常与频率异常

**第二层：** 产品级追踪
- 同批/同工位产品对比
- 返修原因分布（芯片、焊接、接触等）
- 反向溯源至原始测试项

**输出:** Cross-Stage Risk Score，可信度评分

---

### 3. **Log Reasoning Agent（日志推理引擎）**
处理非结构化文本数据（工程日志、异常输出、维修备注）：

- 版本记录解析
- 异常代码识别（Error codes → 行为映射）
- 关键词提取（"接触不良"、"参考波形"、"补偿值"）
- 多模态关联（数值漂移 + 文本信号的同步性）

**输出:** Text-based Risk Factors，权重化为最终分数

---

### 4. **Risk Scorer（风险分数器）**
融合多源数据的风险评分模型：

```
Final Risk Score = 
  w1 × Drift_Score +
  w2 × CrossStage_Score +
  w3 × Text_Risk_Factor +
  w4 × Fixture_Health_Index +
  w5 × Temporal_Anomaly_Score
```

- **0-20：** 低风险（绿色）→ 正常通过
- **21-50：** 中风险（黄色）→ 建议加强监测
- **51-80：** 高风险（橙色）→ 建议复测或补测
- **81-100：** 极高风险（红色）→ 需要立即处理

---

### 5. **Action Copilot（行动助手）**
根据风险分数与根因分析，生成结构化建议：

| 风险源 | 建议行动 | 优先级 |
|--------|---------|--------|
| 测试脚本偏移 | 审视脚本版本、重新标准化 | P1 |
| 阈值漂移 | 更新阈值参考值、抽样验证 | P1 |
| 夹具问题 | 夹具点检、接触面清理、更换零件 | P2 |
| 环境异常 | 调整 ECT、补偿系数 | P2 |
| 黄金样本过期 | 更新参考波形、重建特征库 | P2 |

---

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│               FalsePass Hunter AI - System Flow              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  INPUT SOURCES                                               │
│  ├─ ICT/FCT Test Results (CSV/JSON from test equipment)     │
│  ├─ Script Version & Threshold Logs                         │
│  ├─ Golden Sample/Reference Waveform Database               │
│  ├─ Environmental Data (Temp, Humidity, Press)              │
│  ├─ Rework & Return Records (后工位数据)                     │
│  └─ Engineering Notes & Error Logs (LLM Input)               │
│                                                              │
├─────────┬─────────┬─────────┬──────────┬─────────────────┤
│         │         │         │          │                  │
│  ANALYSIS ENGINES (Parallel Processing)                     │
│         │         │         │          │                  │
│    Drift        Cross       Log       Fixture   Temporal   │
│   Monitor       Stage      Reason    Health    Anomaly    │
│  & Threshold   Validator    Agent    Monitor   Detector   │
│                                                             │
│         │         │         │          │                  │
├─────────┴─────────┴─────────┴──────────┴─────────────────┤
│                                                              │
│  RISK FUSION ENGINE                                          │
│  → Weighted combination of all signals                       │
│  → False Pass Risk Score (0-100)                             │
│  → Top-K suspicious items ranked by impact                   │
│  → Root cause ranking                                        │
│                                                              │
│  OUTPUT                                                      │
│  ├─ Risk Dashboard (Real-time visualization)                │
│  ├─ Detailed Risk Report (Exportable)                       │
│  ├─ Action Recommendations (Prioritized)                    │
│  ├─ Trend Analysis (24h/7d/30d)                             │
│  └─ Alert Notifications (Critical cases)                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 实时仪表盘功能

### 📊 核心指标卡片
- **今日测试数量** - 各工位通过/失败/复测统计
- **假通过检出** - 系统识别的可疑样本数
- **高风险告警** - 需要立即处理的异常
- **系统置信度** - 模型平均置信度分数

### 📈 主要可视化
- **生产线实时图** - 各工位的风险热力图和产率趋势
- **Drift 时间序列** - 脚本、阈值、环境参数的变化轨迹
- **跨阶段关联图** - Sankey 图展示测试→返修的流向
- **夹具健康度** - 使用寿命预测和故障预警
- **风险分布直方图** - 高风险样本按根因分类

### 🎚️ 交互功能
- 时间范围选择（24小时/7天/30天）
- 工位/产品线过滤
- 风险阈值动态调整
- 导出为 CSV/PDF 报告

---

## 技术栈

### 前端
- **React 18.3** - UI 框架，支持 Hooks 和并发渲染
- **Ant Design 5** - 企业级 UI 组件库
- **Recharts 2.10** - 响应式数据可视化
- **React Router v6** - 应用路由管理
- **Vite 5.4** - 高性能构建工具

### 后端（规划中）
- **FastAPI** - 高性能 Python Web 框架，支持异步
- **PyTorch** - 机器学习模型训练与推理
- **SQLAlchemy** - ORM 数据库抽象
- **LLM API** - 日志分析和自然语言处理

### 数据存储
- **PostgreSQL** - 结构化测试数据与历史记录
- **TimescaleDB** - 时间序列数据（环境参数、漂移指标）
- **Redis** - 实时指标缓存与快速查询

---

## 快速开始

### 环境要求
- Node.js 16+
- Python 3.9+
- Git

### 前端开发

```bash
cd src
npm install
npm run dev
```

前端应用将运行在 `http://localhost:3001`

**可用命令：**
- `npm run dev` - 开发服务器（热重载）
- `npm run build` - 生产构建
- `npm run preview` - 预览构建产物

### 后端部署（开发中）

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API 文档访问: `http://localhost:8000/docs`

---

## 项目结构

```
FalsePass-Hunter/
├── src/                           # React 前端应用
│   ├── components/
│   │   ├── MainLayout.jsx         # 主布局（侧边栏+内容区）
│   │   ├── StatCard.jsx           # 数据卡片组件
│   │   ├── TrendChart.jsx         # 趋势图表
│   │   ├── RiskGauge.jsx          # 风险仪表盘
│   │   └── index.js
│   ├── pages/
│   │   ├── Home.jsx               # 项目主页
│   │   ├── Dashboard.jsx          # 实时监控仪表盘
│   │   ├── DriftMonitor.jsx       # 漂移监控分析
│   │   ├── CrossStage.jsx         # 跨阶段关联分析
│   │   ├── RiskReport.jsx         # 风险报告生成
│   │   └── LogAnalysis.jsx        # 日志分析（规划中）
│   ├── data/
│   │   ├── api.js                 # API 调用
│   │   └── mockData.js            # 模拟数据
│   ├── styles/
│   │   ├── global.css             # 全局样式
│   │   ├── home.css               # Home 页面样式
│   │   └── variables.css          # CSS 变量
│   ├── App.jsx                    # 主应用组件
│   ├── main.jsx                   # 入口文件
│   ├── index.html                 # HTML 模板
│   ├── package.json               # 项目依赖
│   └── vite.config.js             # Vite 构建配置
│
├── backend/                       # Python 后端（开发中）
│   ├── main.py                    # FastAPI 主应用
│   └── requirements.txt           # Python 依赖
│
├── docs/                          # 文档目录
├── data/                          # 数据目录
├── README.md                      # 中文项目说明
├── README_EN.md                   # 英文项目说明
├── DEPLOYMENT_GUIDE.md            # 部署指南
└── .gitignore                     # Git 忽略规则
```

---

## 核心特性对比

| 功能 | FalsePass Hunter | 传统测试系统 |
|------|------------------|-------------|
| 产品通过/失败判断 | ✓ | ✓ |
| 风险可信度评分 | ✓ | ✗ |
| 漂移监控 | ✓ | 手工 |
| 跨阶段返修关联 | ✓ | 事后分析 |
| 日志文本分析 | ✓ | ✗ |
| 夹具预测维护 | ✓ | 定期维护 |
| 可执行改进建议 | ✓ | 需要人工判断 |

---

## 开发状态

### ✅ 已完成
- [x] 前端仪表盘框架（React + Ant Design）
- [x] 实时数据展示与交互
- [x] 多维度风险可视化
- [x] PDF/CSV 报告导出
- [x] 响应式设计与主题支持

### 🔄 进行中
- [ ] 后端 API 开发（FastAPI）
- [ ] 机器学习模型训练
- [ ] 数据库设计与集成
- [ ] LLM 日志分析模块

### 📋 规划中
- [ ] Kafka 实时数据流
- [ ] 告警通知系统（Email/Slack）
- [ ] 模型可解释性增强
- [ ] 用户权限管理

---

## 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'Add your feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

---

## 许可证

本项目采用 MIT 许可证。

---

## 联系方式

**Illusion-Breakers 团队**  
GitHub: [github.com/Illusion-Breakers](https://github.com/Illusion-Breakers)

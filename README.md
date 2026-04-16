# FalsePass Hunter AI 🔍

> **面向 TE（Test Engineering）的隐性漏测风险预警系统**

[![HackDKU 2026](https://img.shields.io/badge/HackDKU-2026-blue)](https://hackdku.com)
[![Track](https://img.shields.io/badge/Track-3-green)](https://hackdku.com)
[![Team](https://img.shields.io/badge/Team-Illusion--Breakers-orange)](https://github.com/Illusion-Breakers)

---

## 一句话故事

> 工厂里最危险的产品，不是测试没过的那一块，而是**明明有问题却"测试通过了"的那一块**。

FalsePass Hunter AI 专门捕捉这些最危险的漏网之鱼，给每一次"测试通过"加上可信度审查。

---

## 🎯 核心价值

不是判断"这块板过没过"，而是判断"**这次通过到底可不可信**"

---

## 📦 五大模块

| 模块 | 功能 |
|------|------|
| **Drift Monitor** | 监控测试脚本、阈值、波形与 Golden Baseline 的偏移 |
| **Cross-Stage Validator** | 关联测试通过样本与后续返修/后工位异常 |
| **Log Reasoning Agent** | LLM 读取报错文本、工程备注、版本说明 |
| **Risk Scorer** | 合成 False Pass 风险分数 |
| **Action Copilot** | 给出动作建议（加测/复测/夹具点检） |

---

## 🚀 快速启动

### 前端启动
```bash
cd src
npm install
npm run dev
```
访问 `http://localhost:3000`

### 后端启动（开发中）
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📁 项目结构

```
FalsePass-Hunter/
├── src/                    # React 前端
│   ├── components/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx       # 总览仪表盘
│   │   ├── DriftMonitor.jsx    # 漂移监控
│   │   ├── CrossStage.jsx      # 跨阶段分析
│   │   └── RiskReport.jsx      # 风险报告
│   ├── App.jsx
│   └── main.jsx
├── backend/                # FastAPI 后端（开发中）
└── docs/                   # 文档
```

---

## 🏆 得奖标准对齐

| 维度 | 实现 |
|------|------|
| **创新性** | False Pass 可视化 + 风险仪表盘 + 桑基图 |
| **技术实现** | Recharts + Ant Design + FastAPI |
| **商业价值** | TE 工程师友好 + 可解释性报告 |
| **完成度** | 4 个完整页面 + 交互功能 |
| **展示效果** | 工业风 UI + 动态图表 + 告警通知 |

---

## 💡 Pitch 话术

**开场 (30 秒)**
> "工厂里最危险的产品，不是测试没过的那一块，而是明明有问题却'测试通过了'的那一块。FalsePass Hunter AI，专门捕捉这些最危险的漏网之鱼。"

**结尾 (30 秒)**
> "我们不是在增加测试覆盖率，我们是在让已有的测试结果更可信。给每一次'测试通过'加上一层可信度审查。"

---

*Built with ❤️ by Illusion-Breakers for HackDKU 2026*

# HackDKU 2026 提交指南 📝

## FalsePass Hunter AI - 完整部署与提交流程

---

## 📌 一、提交内容清单

根据 HackDKU 比赛要求，你需要准备以下内容：

| 项目 | 用途 | 状态 |
|------|------|------|
| **GitHub 仓库** | 存放源代码，评委审查代码 | ⬜ 待创建 |
| **在线 Demo** | 评委可点击试用的网站 | ⬜ 待部署 |
| **演示视频** | 2-3 分钟项目介绍视频 | ⬜ 待录制 |
| **Devpost 提交** | 正式比赛报名表 | ⬜ 待填写 |

---

## 🚀 二、GitHub 仓库创建步骤

### 步骤 1：创建 GitHub 仓库

1. 访问 [github.com/new](https://github.com/new)
2. 填写信息：
   - **Repository name**: `FalsePass-Hunter`
   - **Description**: `🔍 Hidden False Pass Detection System for Test Engineering | HackDKU 2026`
   - **Public** ✅ (必须公开，评委需要看到)
   - 不要初始化（不要勾选 README/.gitignore/license）

3. 点击 **Create repository**

### 步骤 2：推送代码到 GitHub

在项目根目录（`C:\Users\30906\Desktop\FalsePass-Hunter`）执行：

```bash
# 初始化 git
git init

# 添加所有文件
git add .

# 创建第一个提交
git commit -m "Initial commit: FalsePass Hunter AI MVP

- Complete English landing page with dashboard preview
- 5 core modules: Drift Monitor, Cross-Stage Validator, Log Reasoning, Risk Scorer, Action Copilot
- HackDKU 2026 Track 3 (Luxshare TE) submission

Co-Authored-By: Illusion-Breakers Team"

# 重命名分支为 main
git branch -M main

# 关联远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/FalsePass-Hunter.git

# 推送到 GitHub
git push -u origin main
```

### 步骤 3：验证 GitHub 仓库

访问 `https://github.com/YOUR_USERNAME/FalsePass-Hunter` 确认文件已上传成功

---

## 🌐 三、Netlify 部署在线 Demo

### 方案 A：Netlify Drop（最快，30 秒上线）

1. 访问 [app.netlify.com/drop](https://app.netlify.com/drop)
2. 把 `dist/` 文件夹整个拖进去
3. 等待上传完成（约 30 秒）
4. 获得链接：`https://random-name-12345.netlify.app`
5. 点击 **Site settings** → **Change site name** 改为 `falsedrop-hunter`

### 方案 B：Netlify 关联 GitHub（自动部署）

1. 访问 [app.netlify.com](https://app.netlify.com)
2. 点击 **Add new site** → **Import an existing project**
3. 选择 **GitHub** 并授权
4. 选择 `FalsePass-Hunter` 仓库
5. 填写构建设置：
   - **Branch to deploy**: `main`
   - **Base directory**: `dist`
   - **Build command**: (留空)
   - **Publish directory**: `dist`
6. 点击 **Deploy site**

### 验证 Demo 链接

访问你的 Netlify 链接，确认：
- ✅ 页面正常显示
- ✅ 图表能渲染
- ✅ 导航能点击

---

## 📹 四、演示视频录制指南

### 视频结构（2-3 分钟）

| 时间段 | 内容 | 要点 |
|--------|------|------|
| 0:00-0:30 | 开场 & 问题定义 | 讲清楚 False Pass 的危害 |
| 0:30-1:30 | Demo 演示 | 展示 Dashboard 和核心功能 |
| 1:30-2:00 | 技术架构 | 简述 5 大模块 |
| 2:00-2:30 | 创新点 & 结尾 | 强调区别于传统方案 |

### 录制工具推荐

- **Windows**: OBS Studio (免费) 或 Xbox Game Bar (Win+G)
- **旁白**: 用手机录音机后期配音
- **剪辑**: 剪映/CapCut（可选，简单剪辑即可）

### 视频上传

1. 上传到 **YouTube** 或 **Bilibili**
2. 标题：`FalsePass Hunter AI | HackDKU 2026 | Illusion-Breakers`
3. 设置为 **公开** 或 **不公开列表**（不能私密）
4. 复制视频链接

---

## 📝 五、Devpost 提交表单填写

### 访问提交页面

1. 查看比赛邮件/通知，找到 Devpost 提交链接
2. 或访问 HackDKU 2026 的 Devpost 页面

### 填写内容模板

```
项目名称：
FalsePass Hunter AI - Hidden False Pass Detection System

项目简介（1-2 句）：
给每一次"测试通过"加上可信度审查。我们不做普通的异常检测，
而是专门捕捉那些"明明有问题却顺利流过测试站"的危险产品。

详细描述：
【问题】
在 Test Engineering 场景，传统方案只关注"哪些板没有通过测试"。
但真正昂贵的问题是：测试脚本覆盖不完整、阈值过宽、夹具老化、
版本漂移等导致的"假通过"产品。

【方案】
FalsePass Hunter AI 包含 5 大核心模块：
1. Drift Monitor - 监控测试脚本、阈值、波形与 Golden Baseline 的偏移
2. Cross-Stage Validator - 关联测试通过样本与后续返修/后工位异常
3. Log Reasoning Agent - LLM 读取报错文本、工程备注、版本说明
4. Risk Scorer - 综合数值异常、版本变化、历史回流信息
5. Action Copilot - 给出下一步动作建议

【创新点】
1. 盯住 False Pass 而非 Fail - 切口更尖锐
2. 测试可信度而非测试结果 - 从分类升级为评估
3. 返修知识反哺测试 - 后工位结果训练前段风险感知
4. 数值 + 文本混合推理 - 既看波形也看日志

【技术栈】
- Frontend: React 18, Ant Design 5, Recharts
- Backend: FastAPI (planned)
- Deployment: Vite, Netlify

【团队成员】
Illusion-Breakers (4 人)

【项目链接】
GitHub 仓库：https://github.com/YOUR_USERNAME/FalsePass-Hunter
在线 Demo：https://falsedrop-hunter.netlify.app
演示视频：https://youtube.com/watch?v=XXXXX 或 https://bilibili.com/video/BV1XXXXXX
```

### 必传附件

- ✅ GitHub 仓库链接
- ✅ 在线 Demo 链接
- ✅ 演示视频链接
- ✅ 项目截图（可选，建议上传 Dashboard 截图）

---

## ⏰ 六、时间线检查清单

### 4.13 23:59 前（项目描述提交）
- ⬜ GitHub 仓库创建并推送代码
- ⬜ 完成 Google Forms 项目描述

### 4.18 12:00 前（最终提交）
- ⬜ Devpost 完整表单填写
- ⬜ 演示视频上传
- ⬜ 所有链接验证有效

### 4.18 13:00（Presentation）
- ⬜ 准备演示脚本
- ⬜ 测试演示环境
- ⬜ 准备 Q&A

---

## 🎯 七、评委审查清单

评委通常会看这些，确保你的项目满足：

| 审查项 | 评委期望 | 你的项目 |
|--------|----------|----------|
| **代码质量** | 有清晰的代码结构和注释 | ✅ 使用 React 组件化 |
| **技术深度** | 不是简单 UI，有 AI/算法 | ✅ 5 大 AI 模块设计 |
| **创新性** | 区别于现有方案 | ✅ False Pass 切口独特 |
| **完整性** | 功能可用，不是 PPT 项目 | ✅ 完整 Dashboard+Demo |
| **商业价值** | 解决真实问题 | ✅ TE 痛点明确 |

---

## 📧 八、常见问题

### Q1: GitHub 仓库必须公开吗？
**A**: 是的。评委需要能看到你的代码。如果介意，可以在比赛结束后转为私有。

### Q2: Demo 必须连接真实后端吗？
**A**: 不需要。Hackathon 演示用 Mock 数据完全没问题，关键是展示功能和创意。

### Q3: 演示视频必须露脸吗？
**A**: 不需要。屏幕录制 + 旁白即可，重点是把产品讲清楚。

### Q4: Devpost 可以多次修改吗？
**A**: 可以。在截止时间前都能修改，建议先提交占位，后续完善。

### Q5: 如果 Netlify 被墙怎么办？
**A**: 评委一般在海外，Netlify 访问正常。如果担心，可同时准备 Vercel 作为备选。

---

## 🆘 需要帮助？

如果你在部署过程中遇到问题，请告诉我具体问题：
- GitHub 推送失败？
- Netlify 部署出错？
- Devpost 找不到提交入口？

我会帮你解决！

---

*最后更新：2026-04-15 | FalsePass Hunter AI | HackDKU 2026*

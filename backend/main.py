"""
FalsePass Hunter Backend - FastAPI入口
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="FalsePass Hunter AI",
    description="面向 TE 的隐性漏测风险预警系统",
    version="1.0.0"
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "FalsePass Hunter AI API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

# TODO: 实现以下 API
# - GET /api/dashboard/summary - 仪表盘汇总
# - POST /api/drift/detect - 漂移检测
# - POST /api/cross-stage/analyze - 跨阶段分析
# - POST /api/log/analyze - 日志分析
# - POST /api/risk/score - 风险评分

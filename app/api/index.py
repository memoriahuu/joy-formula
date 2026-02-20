# app/api/index.py
import sys
import os

# 添加项目根目录到 Python 路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import cards, chat, insights, auth, exploration  # 同级导入保持

app = FastAPI()

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "API is working"}

# 注册路由
app.include_router(cards.router, prefix="/api/cards", tags=["cards"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(insights.router, prefix="/api/insights", tags=["insights"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(exploration.router, prefix="/api/exploration", tags=["exploration"])

handler = app
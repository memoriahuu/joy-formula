# api/index.py
import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 添加项目根目录到 Python 路径
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# 现在从 app.api 导入（因为根目录下有 app/ 文件夹）
from app.api import cards, chat, insights, auth, exploration

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
app.include_router(cards.router)
app.include_router(chat.router)
app.include_router(insights.router)
app.include_router(auth.router)
app.include_router(exploration.router)

handler = app
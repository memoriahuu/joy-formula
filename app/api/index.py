# app/api/index.py
import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 将项目根目录添加到Python路径，确保可以使用绝对导入（如果你不想用相对导入）
# sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# 使用相对导入导入同级路由模块
from . import cards, chat, insights, auth, exploration

app = FastAPI()

# 配置CORS，允许前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境建议替换为你的前端域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 健康检查端点
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "API is working"}

# 注册所有路由，注意前缀已经包含/api，所以路由定义时不要重复
app.include_router(cards.router)      # cards.py 中已定义 prefix="/api/cards"
app.include_router(chat.router)       # chat.py 中已定义 prefix="/api/chat"
app.include_router(insights.router)   # insights.py 中已定义 prefix="/api/insights"
app.include_router(auth.router)       # auth.py 中已定义 prefix="/api/auth"
app.include_router(exploration.router) # exploration.py 中已定义 prefix="/api/exploration"

# Vercel Python 运行时需要这个变量
handler = app
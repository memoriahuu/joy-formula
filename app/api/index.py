# 创建 api/index.py 文件
cat > api/index.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

# 导入你的路由
from . import cards, chat, insights, auth, exploration

app.include_router(cards.router, prefix="/api/cards", tags=["cards"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(insights.router, prefix="/api/insights", tags=["insights"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(exploration.router, prefix="/api/exploration", tags=["exploration"])

# Vercel 需要这个
handler = app
EOF
# api/index.py
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import cards, chat, insights, auth, exploration

app = FastAPI()

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

app.include_router(cards.router)
app.include_router(chat.router)
app.include_router(insights.router)
app.include_router(auth.router)
app.include_router(exploration.router)

# 关键：Vercel Python 运行时需要这个变量
handler = app
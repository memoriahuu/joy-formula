# JoyFormula Backend - Claude Code Development Instructions

## 项目概述
JoyFormula 是一个基于 AI 的快乐心理健康产品，帮助用户结构化记录快乐瞬间，并通过 AI 分析生成个性化的"快乐定律"。

**核心公式**：快乐 = 场景 + 人物 + 事情 + 诱因 + 感官/感受

## 技术栈
- **框架**: FastAPI (Python)
- **数据库**: SQLite (Hackathon 阶段，后续可无缝切换 PostgreSQL)
- **ORM**: SQLAlchemy
- **AI SDK**: 支持多个 AI 提供商切换
  - Anthropic Claude API
  - OpenAI API
  - Google Gemini API
- **测试界面**: 命令行交互式 CLI + FastAPI Swagger UI

## 项目结构
```
joyformula-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI 应用入口
│   ├── config.py               # 配置管理
│   ├── database.py             # 数据库连接
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py            # User 模型
│   │   ├── joy_card.py        # JoyCard 模型
│   │   ├── joy_insight.py     # JoyInsight 模型
│   │   └── chat_session.py    # ChatSession 模型
│   ├── schemas/               # Pydantic schemas (API 输入输出)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── joy_card.py
│   │   ├── joy_insight.py
│   │   └── chat.py
│   ├── api/                   # API 路由
│   │   ├── __init__.py
│   │   ├── auth.py           # 认证（Hackathon 阶段简化版）
│   │   ├── chat.py           # 对话管理
│   │   ├── cards.py          # 卡片 CRUD
│   │   ├── insights.py       # 定律生成
│   │   └── exploration.py    # 快乐盲盒
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_service.py     # AI 服务统一接口
│   │   ├── chat_service.py   # 对话逻辑
│   │   ├── card_service.py   # 卡片业务逻辑
│   │   └── insight_service.py # 定律生成逻辑
│   └── cli/
│       ├── __init__.py
│       └── interactive.py    # 命令行交互式界面
├── alembic/                   # 数据库迁移（可选）
├── tests/                     # 测试（可选）
├── .env.example              # 环境变量模板
├── requirements.txt
└── README.md
```

---

## 第一阶段：核心功能实现

### 1. 环境配置 (config.py)

```python
from pydantic_settings import BaseSettings
from typing import Literal

class Settings(BaseSettings):
    # 数据库
    DATABASE_URL: str = "sqlite:///./joyformula.db"
    
    # AI 提供商配置
    AI_PROVIDER: Literal["anthropic", "openai", "gemini", "custom"] = "anthropic"
    
    # API Keys
    ANTHROPIC_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    
    # 自定义 AI 端点（用于 Defy 或其他）
    CUSTOM_AI_ENDPOINT: str = ""
    CUSTOM_AI_API_KEY: str = ""
    
    # 简化认证（Hackathon 阶段）
    SIMPLE_AUTH: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()
```

### 2. 数据库模型 (models/)

#### models/user.py
```python
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_identifier = Column(String, unique=True, nullable=False)  # 简化版ID
    display_name = Column(String, default="用户")
    created_at = Column(DateTime, default=datetime.utcnow)
    last_active = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    joy_cards = relationship("JoyCard", back_populates="user", cascade="all, delete-orphan")
    joy_insights = relationship("JoyInsight", back_populates="user", cascade="all, delete-orphan")
    chat_sessions = relationship("ChatSession", back_populates="user", cascade="all, delete-orphan")
```

#### models/joy_card.py
```python
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class JoyCard(Base):
    __tablename__ = "joy_cards"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    # 原始输入
    raw_input = Column(Text, nullable=False)
    
    # 快乐公式字段
    formula_scene = Column(String)      # 场景
    formula_people = Column(String)     # 人物
    formula_event = Column(String)      # 事情
    formula_trigger = Column(String)    # 诱因
    formula_sensation = Column(String)  # 感官/感受
    
    # 卡片摘要
    card_summary = Column(String)
    
    # 对话历史（JSON格式存储）
    conversation_history = Column(JSON)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    user = relationship("User", back_populates="joy_cards")
```

#### models/joy_insight.py
```python
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database import Base

class JoyInsight(Base):
    __tablename__ = "joy_insights"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    # 定律内容
    insight_text = Column(Text, nullable=False)
    pattern_type = Column(String)  # 模式分类标签
    
    # 证据（关联的卡片和引用）
    evidence_cards = Column(JSON)  # [{"card_id": "...", "quote": "..."}]
    
    # 状态
    is_confirmed = Column(Boolean, default=False)
    is_rejected = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    user = relationship("User", back_populates="joy_insights")
```

#### models/chat_session.py
```python
from sqlalchemy import Column, String, DateTime, ForeignKey, JSON, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
import enum
from app.database import Base

class SessionStatus(str, enum.Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    ABANDONED = "abandoned"

class SessionType(str, enum.Enum):
    CARD_CREATION = "card_creation"
    EXPLORATION = "exploration"

class ChatSession(Base):
    __tablename__ = "chat_sessions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    joy_card_id = Column(String, ForeignKey("joy_cards.id"), nullable=True)
    
    session_type = Column(Enum(SessionType), default=SessionType.CARD_CREATION)
    status = Column(Enum(SessionStatus), default=SessionStatus.ACTIVE)
    
    # 消息历史
    messages = Column(JSON, default=list)  # [{"role": "user"/"assistant", "content": "..."}]
    
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    
    # 关系
    user = relationship("User", back_populates="chat_sessions")
```

### 3. AI 服务统一接口 (services/ai_service.py)

```python
from typing import List, Dict, Optional
from app.config import settings
import json

class AIService:
    """统一的 AI 服务接口，支持多个提供商切换"""
    
    def __init__(self, provider: Optional[str] = None):
        self.provider = provider or settings.AI_PROVIDER
        self._init_client()
    
    def _init_client(self):
        """初始化对应的 AI 客户端"""
        if self.provider == "anthropic":
            import anthropic
            self.client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
            self.model = "claude-sonnet-4-20250514"
        
        elif self.provider == "openai":
            import openai
            self.client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
            self.model = "gpt-4o"
        
        elif self.provider == "gemini":
            import google.generativeai as genai
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.client = genai.GenerativeModel('gemini-2.0-flash-exp')
            self.model = "gemini-2.0-flash-exp"
        
        elif self.provider == "custom":
            # 用于 Defy 或其他自定义端点
            import requests
            self.client = requests.Session()
            self.custom_endpoint = settings.CUSTOM_AI_ENDPOINT
            self.custom_api_key = settings.CUSTOM_AI_API_KEY
    
    def chat(self, system_prompt: str, messages: List[Dict[str, str]], 
             temperature: float = 0.7, max_tokens: int = 2000) -> str:
        """
        统一的对话接口
        
        Args:
            system_prompt: 系统提示词
            messages: 消息历史 [{"role": "user"/"assistant", "content": "..."}]
            temperature: 温度参数
            max_tokens: 最大token数
        
        Returns:
            AI 的回复文本
        """
        try:
            if self.provider == "anthropic":
                response = self.client.messages.create(
                    model=self.model,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    system=system_prompt,
                    messages=messages
                )
                return response.content[0].text
            
            elif self.provider == "openai":
                formatted_messages = [{"role": "system", "content": system_prompt}] + messages
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=formatted_messages,
                    temperature=temperature,
                    max_tokens=max_tokens
                )
                return response.choices[0].message.content
            
            elif self.provider == "gemini":
                # Gemini 处理
                chat = self.client.start_chat(history=[])
                # 将 system prompt 和消息合并
                full_prompt = f"{system_prompt}\n\n"
                for msg in messages:
                    full_prompt += f"{msg['role']}: {msg['content']}\n"
                response = chat.send_message(full_prompt)
                return response.text
            
            elif self.provider == "custom":
                # 自定义端点（Defy）
                payload = {
                    "system": system_prompt,
                    "messages": messages,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
                headers = {
                    "Authorization": f"Bearer {self.custom_api_key}",
                    "Content-Type": "application/json"
                }
                response = self.client.post(self.custom_endpoint, json=payload, headers=headers)
                return response.json()["response"]  # 根据实际返回格式调整
        
        except Exception as e:
            print(f"AI API 调用失败: {str(e)}")
            raise

# 全局 AI 服务实例
ai_service = AIService()
```

### 4. Joy Coach Prompt (services/chat_service.py)

```python
from typing import Dict, List, Optional
from app.services.ai_service import ai_service
import json
import re

# Joy Coach 系统提示词
JOY_COACH_SYSTEM_PROMPT = """你是 Joy Coach，一位温柔但专业的快乐引导者。你的使命是帮助用户识别和结构化他们的快乐瞬间。

## 核心原则
1. 低摩擦：不要一次问太多问题，最多追问1-2个关键信息
2. 具象化：引导用户描述具体细节，而非抽象感受
3. 温柔：使用鼓励性语言，让用户感到被理解
4. 自然：像朋友聊天一样，不要太正式

## 快乐公式结构
快乐 = 场景 + 人物 + 事情 + 诱因 + 感官/感受

## 对话策略
- 阶段1：接收用户的快乐分享，识别已有要素
- 阶段2：针对性追问缺失的关键要素(最多2个问题)
- 阶段3：确认并生成快乐卡片

## 追问示例
- 场景缺失："这件事发生在哪里呢？室内还是室外？"
- 人物缺失："当时有谁和你在一起吗？"
- 诱因缺失："是什么让你突然感到这份快乐的？"
- 感官缺失："你记得当时有什么特别的感觉吗？比如声音、气味、或身体的感受？"

## 输出格式
当你认为收集到足够信息后（至少有3个要素），以以下JSON格式输出，用```json包裹：

```json
{
  "stage": "complete",
  "formula": {
    "scene": "场景描述",
    "people": "人物描述",
    "event": "事情描述",
    "trigger": "诱因描述",
    "sensation": "感官/感受描述"
  },
  "card_summary": "一句话总结这个快乐瞬间"
}
```

如果信息不够，继续温柔地追问，不要输出JSON。"""


class ChatService:
    """对话服务：处理与用户的交互逻辑"""
    
    @staticmethod
    def start_conversation() -> Dict:
        """开始新的对话"""
        return {
            "initial_message": "嗨！今天有什么让你感到快乐的小事吗？可以随便和我说说 😊"
        }
    
    @staticmethod
    def process_message(conversation_history: List[Dict], user_message: str) -> Dict:
        """
        处理用户消息并返回AI回复
        
        Returns:
            {
                "assistant_reply": "AI的回复",
                "is_complete": True/False,
                "formula": {...} if is_complete else None
            }
        """
        # 添加用户消息到历史
        messages = conversation_history + [{"role": "user", "content": user_message}]
        
        # 调用AI
        ai_reply = ai_service.chat(
            system_prompt=JOY_COACH_SYSTEM_PROMPT,
            messages=messages,
            temperature=0.7
        )
        
        # 检查是否包含完整的公式（检测JSON输出）
        formula_data = ChatService._extract_formula(ai_reply)
        
        return {
            "assistant_reply": ai_reply,
            "is_complete": formula_data is not None,
            "formula": formula_data,
            "updated_history": messages + [{"role": "assistant", "content": ai_reply}]
        }
    
    @staticmethod
    def _extract_formula(ai_reply: str) -> Optional[Dict]:
        """从AI回复中提取公式JSON"""
        # 查找JSON代码块
        json_match = re.search(r'```json\s*(\{.*?\})\s*```', ai_reply, re.DOTALL)
        if not json_match:
            return None
        
        try:
            data = json.loads(json_match.group(1))
            if data.get("stage") == "complete" and "formula" in data:
                return data
        except json.JSONDecodeError:
            return None
        
        return None
```

### 5. 定律生成服务 (services/insight_service.py)

```python
from typing import List, Dict
from app.services.ai_service import ai_service
from app.models.joy_card import JoyCard
import json
import re

INSIGHT_GENERATION_PROMPT = """分析以下用户的快乐卡片，识别其中的模式和规律，生成"快乐定律"。

## 卡片数据
{cards_json}

## 分析要求
1. 识别重复出现的场景、人物、事件类型
2. 发现用户快乐的深层需求(如：表达欲、掌控感、亲密感、创造力、探索欲)
3. 用简洁、有洞察力的语言总结模式（像一个专业心理咨询师）

## 输出格式
以JSON格式输出1-3个快乐定律，用```json包裹：

```json
{
  "insights": [
    {
      "insight": "快乐定律的核心洞察(1-2句话，要有洞察力)",
      "evidence": [
        {"card_id": "卡片ID", "quote": "用户原话摘录"},
        {"card_id": "卡片ID", "quote": "用户原话摘录"}
      ],
      "pattern_type": "模式类型标签(如：社交连接、创造表达、自我掌控)"
    }
  ]
}
```"""


class InsightService:
    """快乐定律生成服务"""
    
    @staticmethod
    def generate_insights(cards: List[JoyCard]) -> List[Dict]:
        """
        基于用户的快乐卡片生成定律
        
        Args:
            cards: 用户的快乐卡片列表
        
        Returns:
            生成的定律列表
        """
        if len(cards) < 5:
            raise ValueError("需要至少5张卡片才能生成定律")
        
        # 构建卡片数据
        cards_data = []
        for card in cards:
            cards_data.append({
                "id": card.id,
                "summary": card.card_summary,
                "raw_input": card.raw_input,
                "formula": {
                    "scene": card.formula_scene,
                    "people": card.formula_people,
                    "event": card.formula_event,
                    "trigger": card.formula_trigger,
                    "sensation": card.formula_sensation
                }
            })
        
        cards_json = json.dumps(cards_data, ensure_ascii=False, indent=2)
        prompt = INSIGHT_GENERATION_PROMPT.format(cards_json=cards_json)
        
        # 调用AI
        ai_reply = ai_service.chat(
            system_prompt="你是一位专业的心理学专家，擅长从数据中发现人类行为模式。",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,
            max_tokens=3000
        )
        
        # 提取JSON
        insights = InsightService._extract_insights(ai_reply)
        return insights
    
    @staticmethod
    def _extract_insights(ai_reply: str) -> List[Dict]:
        """从AI回复中提取定律JSON"""
        json_match = re.search(r'```json\s*(\{.*?\})\s*```', ai_reply, re.DOTALL)
        if not json_match:
            return []
        
        try:
            data = json.loads(json_match.group(1))
            return data.get("insights", [])
        except json.JSONDecodeError:
            return []
```

### 6. 快乐盲盒服务 (services/exploration_service.py)

```python
from typing import List, Dict
from app.services.ai_service import ai_service
from app.models.joy_card import JoyCard
from app.models.joy_insight import JoyInsight
import json
import re

EXPLORATION_PROMPT = """用户当前能量值：{energy_level} / 10

用户的快乐定律：
{insights_json}

用户的历史快乐卡片（最近5条）：
{cards_json}

根据用户当前状态和历史规律，推荐3个可执行的快乐探索行动。

## 推荐原则
- 能量值低(1-4)：推荐低门槛、即时满足的活动，不要太消耗精力
- 能量值中(5-7)：推荐符合用户模式的常规活动
- 能量值高(8-10)：推荐新的探索方向，可以突破舒适区

## 输出格式
以JSON格式输出，用```json包裹：

```json
{
  "recommendations": [
    {
      "title": "行动标题（简短有吸引力）",
      "description": "具体建议（50字以内，可执行）",
      "related_insight": "关联的快乐定律文本（如果有）",
      "energy_match": "为什么适合当前能量值（20字以内）"
    }
  ]
}
```"""


class ExplorationService:
    """快乐盲盒探索服务"""
    
    @staticmethod
    def recommend(energy_level: int, insights: List[JoyInsight], 
                  recent_cards: List[JoyCard]) -> List[Dict]:
        """
        基于能量值和历史数据推荐快乐行动
        
        Args:
            energy_level: 用户当前能量值 1-10
            insights: 用户的快乐定律
            recent_cards: 最近的快乐卡片
        
        Returns:
            推荐列表
        """
        # 构建数据
        insights_data = [{"insight": i.insight_text, "type": i.pattern_type} 
                         for i in insights if not i.is_rejected]
        
        cards_data = [{"summary": c.card_summary, "raw": c.raw_input} 
                      for c in recent_cards[:5]]
        
        prompt = EXPLORATION_PROMPT.format(
            energy_level=energy_level,
            insights_json=json.dumps(insights_data, ensure_ascii=False, indent=2),
            cards_json=json.dumps(cards_data, ensure_ascii=False, indent=2)
        )
        
        # 调用AI
        ai_reply = ai_service.chat(
            system_prompt="你是一位生活教练，擅长根据人的状态给出实用的建议。",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.9,
            max_tokens=2000
        )
        
        # 提取推荐
        recommendations = ExplorationService._extract_recommendations(ai_reply)
        return recommendations
    
    @staticmethod
    def _extract_recommendations(ai_reply: str) -> List[Dict]:
        """从AI回复中提取推荐JSON"""
        json_match = re.search(r'```json\s*(\{.*?\})\s*```', ai_reply, re.DOTALL)
        if not json_match:
            return []
        
        try:
            data = json.loads(json_match.group(1))
            return data.get("recommendations", [])
        except json.JSONDecodeError:
            return []
```

### 7. API 路由实现

#### api/auth.py (简化版认证)
```python
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse

router = APIRouter(prefix="/api/auth", tags=["认证"])

def get_current_user(x_user_id: str = Header(...), db: Session = Depends(get_db)) -> User:
    """
    简化版认证：通过 X-User-ID header 获取用户
    Hackathon 阶段使用，后续替换为 Firebase Auth
    """
    user = db.query(User).filter(User.user_identifier == x_user_id).first()
    if not user:
        # 自动创建用户
        user = User(user_identifier=x_user_id, display_name=f"用户_{x_user_id}")
        db.add(user)
        db.commit()
        db.refresh(user)
    
    return user

@router.get("/me", response_model=UserResponse)
def get_current_user_info(user: User = Depends(get_current_user)):
    """获取当前用户信息"""
    return user
```

#### api/chat.py
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.chat_session import ChatSession, SessionStatus, SessionType
from app.models.joy_card import JoyCard
from app.schemas.chat import ChatStartResponse, ChatMessageRequest, ChatMessageResponse
from app.services.chat_service import ChatService
from app.api.auth import get_current_user

router = APIRouter(prefix="/api/chat", tags=["对话"])

@router.post("/start", response_model=ChatStartResponse)
def start_chat(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """开始新的对话"""
    # 创建新会话
    session = ChatSession(
        user_id=user.id,
        session_type=SessionType.CARD_CREATION,
        messages=[]
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    
    # 获取初始消息
    result = ChatService.start_conversation()
    
    # 保存初始消息
    session.messages = [{"role": "assistant", "content": result["initial_message"]}]
    db.commit()
    
    return {
        "session_id": session.id,
        "initial_message": result["initial_message"]
    }

@router.post("/message", response_model=ChatMessageResponse)
def send_message(
    request: ChatMessageRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """发送消息"""
    # 获取会话
    session = db.query(ChatSession).filter(
        ChatSession.id == request.session_id,
        ChatSession.user_id == user.id
    ).first()
    
    if not session:
        raise HTTPException(status_code=404, detail="会话不存在")
    
    if session.status != SessionStatus.ACTIVE:
        raise HTTPException(status_code=400, detail="会话已结束")
    
    # 处理消息
    result = ChatService.process_message(session.messages, request.message)
    
    # 更新会话
    session.messages = result["updated_history"]
    
    # 如果公式完成，创建卡片
    card_data = None
    if result["is_complete"]:
        formula = result["formula"]["formula"]
        card = JoyCard(
            user_id=user.id,
            raw_input=request.message,
            formula_scene=formula.get("scene"),
            formula_people=formula.get("people"),
            formula_event=formula.get("event"),
            formula_trigger=formula.get("trigger"),
            formula_sensation=formula.get("sensation"),
            card_summary=result["formula"]["card_summary"],
            conversation_history=session.messages
        )
        db.add(card)
        session.status = SessionStatus.COMPLETED
        session.joy_card_id = card.id
        db.commit()
        db.refresh(card)
        
        card_data = {
            "id": card.id,
            "summary": card.card_summary,
            "formula": {
                "scene": card.formula_scene,
                "people": card.formula_people,
                "event": card.formula_event,
                "trigger": card.formula_trigger,
                "sensation": card.formula_sensation
            }
        }
    else:
        db.commit()
    
    return {
        "assistant_reply": result["assistant_reply"],
        "is_complete": result["is_complete"],
        "card_data": card_data
    }
```

#### api/cards.py
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.user import User
from app.models.joy_card import JoyCard
from app.schemas.joy_card import JoyCardResponse, JoyCardListResponse
from app.api.auth import get_current_user

router = APIRouter(prefix="/api/cards", tags=["快乐卡片"])

@router.get("", response_model=JoyCardListResponse)
def get_cards(
    skip: int = 0,
    limit: int = 20,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """获取卡片列表"""
    cards = db.query(JoyCard).filter(
        JoyCard.user_id == user.id
    ).order_by(JoyCard.created_at.desc()).offset(skip).limit(limit).all()
    
    total = db.query(JoyCard).filter(JoyCard.user_id == user.id).count()
    
    return {
        "cards": cards,
        "total": total
    }

@router.get("/{card_id}", response_model=JoyCardResponse)
def get_card(
    card_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """获取单个卡片"""
    card = db.query(JoyCard).filter(
        JoyCard.id == card_id,
        JoyCard.user_id == user.id
    ).first()
    
    if not card:
        raise HTTPException(status_code=404, detail="卡片不存在")
    
    return card

@router.delete("/{card_id}")
def delete_card(
    card_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """删除卡片"""
    card = db.query(JoyCard).filter(
        JoyCard.id == card_id,
        JoyCard.user_id == user.id
    ).first()
    
    if not card:
        raise HTTPException(status_code=404, detail="卡片不存在")
    
    db.delete(card)
    db.commit()
    
    return {"message": "删除成功"}
```

#### api/insights.py
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.joy_card import JoyCard
from app.models.joy_insight import JoyInsight
from app.schemas.joy_insight import JoyInsightResponse, GenerateInsightsResponse
from app.services.insight_service import InsightService
from app.api.auth import get_current_user

router = APIRouter(prefix="/api/insights", tags=["快乐定律"])

@router.post("/generate", response_model=GenerateInsightsResponse)
def generate_insights(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """生成快乐定律"""
    # 获取用户的所有卡片
    cards = db.query(JoyCard).filter(JoyCard.user_id == user.id).all()
    
    if len(cards) < 5:
        raise HTTPException(
            status_code=400, 
            detail=f"需要至少5张卡片才能生成定律，当前有{len(cards)}张"
        )
    
    # 生成定律
    try:
        insights_data = InsightService.generate_insights(cards)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"生成失败: {str(e)}")
    
    # 保存定律
    created_insights = []
    for insight_data in insights_data:
        insight = JoyInsight(
            user_id=user.id,
            insight_text=insight_data["insight"],
            pattern_type=insight_data.get("pattern_type"),
            evidence_cards=insight_data.get("evidence", [])
        )
        db.add(insight)
        created_insights.append(insight)
    
    db.commit()
    
    for insight in created_insights:
        db.refresh(insight)
    
    return {
        "insights": created_insights,
        "message": f"成功生成{len(created_insights)}条快乐定律"
    }

@router.get("", response_model=list[JoyInsightResponse])
def get_insights(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """获取定律列表"""
    insights = db.query(JoyInsight).filter(
        JoyInsight.user_id == user.id
    ).order_by(JoyInsight.created_at.desc()).all()
    
    return insights

@router.put("/{insight_id}/confirm")
def confirm_insight(
    insight_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """确认定律"""
    insight = db.query(JoyInsight).filter(
        JoyInsight.id == insight_id,
        JoyInsight.user_id == user.id
    ).first()
    
    if not insight:
        raise HTTPException(status_code=404, detail="定律不存在")
    
    insight.is_confirmed = True
    insight.is_rejected = False
    db.commit()
    
    return {"message": "已确认"}

@router.put("/{insight_id}/reject")
def reject_insight(
    insight_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """否决定律"""
    insight = db.query(JoyInsight).filter(
        JoyInsight.id == insight_id,
        JoyInsight.user_id == user.id
    ).first()
    
    if not insight:
        raise HTTPException(status_code=404, detail="定律不存在")
    
    insight.is_rejected = True
    insight.is_confirmed = False
    db.commit()
    
    return {"message": "已否决"}
```

#### api/exploration.py
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.joy_card import JoyCard
from app.models.joy_insight import JoyInsight
from app.schemas.exploration import ExplorationRequest, ExplorationResponse
from app.services.exploration_service import ExplorationService
from app.api.auth import get_current_user

router = APIRouter(prefix="/api/exploration", tags=["快乐盲盒"])

@router.post("/recommend", response_model=ExplorationResponse)
def get_recommendations(
    request: ExplorationRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """获取快乐探索推荐"""
    # 获取定律和卡片
    insights = db.query(JoyInsight).filter(
        JoyInsight.user_id == user.id
    ).all()
    
    recent_cards = db.query(JoyCard).filter(
        JoyCard.user_id == user.id
    ).order_by(JoyCard.created_at.desc()).limit(5).all()
    
    if not insights and len(recent_cards) < 3:
        raise HTTPException(
            status_code=400,
            detail="数据不足，需要至少3张快乐卡片或1条快乐定律"
        )
    
    # 生成推荐
    try:
        recommendations = ExplorationService.recommend(
            energy_level=request.energy_level,
            insights=insights,
            recent_cards=recent_cards
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"推荐失败: {str(e)}")
    
    return {
        "energy_level": request.energy_level,
        "recommendations": recommendations
    }
```

### 8. 命令行交互界面 (cli/interactive.py)

```python
"""
命令行交互式界面 - 用于快速测试核心逻辑
"""
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from app.database import SessionLocal, init_db
from app.models.user import User
from app.models.joy_card import JoyCard
from app.models.joy_insight import JoyInsight
from app.models.chat_session import ChatSession, SessionStatus, SessionType
from app.services.chat_service import ChatService
from app.services.insight_service import InsightService
from app.services.exploration_service import ExplorationService
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt, IntPrompt
from rich.table import Table
from rich import print as rprint

console = Console()

class JoyFormulaCLI:
    def __init__(self):
        self.db = SessionLocal()
        self.user = None
        self.current_session = None
    
    def start(self):
        """启动CLI"""
        console.print(Panel.fit(
            "[bold cyan]🎉 欢迎使用 JoyFormula[/bold cyan]\n"
            "[dim]基于 AI 的快乐心理健康助手[/dim]",
            border_style="cyan"
        ))
        
        # 获取或创建用户
        user_id = Prompt.ask("\n请输入你的用户ID", default="demo_user")
        self.user = self.db.query(User).filter(User.user_identifier == user_id).first()
        
        if not self.user:
            self.user = User(user_identifier=user_id, display_name=f"用户_{user_id}")
            self.db.add(self.user)
            self.db.commit()
            console.print(f"[green]✓[/green] 创建新用户: {user_id}")
        else:
            console.print(f"[green]✓[/green] 欢迎回来，{self.user.display_name}!")
        
        self.main_menu()
    
    def main_menu(self):
        """主菜单"""
        while True:
            console.print("\n" + "="*50)
            console.print("[bold]主菜单[/bold]")
            console.print("1. 📝 创建快乐卡片（和Joy Coach聊天）")
            console.print("2. 📚 查看我的快乐卡片")
            console.print("3. 💡 生成快乐定律")
            console.print("4. 🎁 快乐盲盒推荐")
            console.print("5. 🔄 切换AI提供商")
            console.print("0. 退出")
            
            choice = Prompt.ask("\n请选择", choices=["0", "1", "2", "3", "4", "5"])
            
            if choice == "0":
                console.print("[yellow]再见！希望你每天都快乐 😊[/yellow]")
                break
            elif choice == "1":
                self.create_joy_card()
            elif choice == "2":
                self.view_cards()
            elif choice == "3":
                self.generate_insights()
            elif choice == "4":
                self.explore_joy()
            elif choice == "5":
                self.switch_ai_provider()
    
    def create_joy_card(self):
        """创建快乐卡片"""
        console.print("\n[bold cyan]开始和Joy Coach对话[/bold cyan]")
        console.print("[dim]提示：直接分享让你快乐的事，AI会引导你完善细节[/dim]\n")
        
        # 创建会话
        session = ChatSession(
            user_id=self.user.id,
            session_type=SessionType.CARD_CREATION
        )
        self.db.add(session)
        self.db.commit()
        
        # 初始消息
        initial = ChatService.start_conversation()
        session.messages = [{"role": "assistant", "content": initial["initial_message"]}]
        self.db.commit()
        
        console.print(f"[bold green]Joy Coach:[/bold green] {initial['initial_message']}\n")
        
        # 对话循环
        while session.status == SessionStatus.ACTIVE:
            user_input = Prompt.ask("[bold blue]你[/bold blue]")
            
            if user_input.lower() in ['退出', 'quit', 'exit']:
                session.status = SessionStatus.ABANDONED
                self.db.commit()
                console.print("[yellow]对话已结束[/yellow]")
                break
            
            # 处理消息
            result = ChatService.process_message(session.messages, user_input)
            
            # 更新会话
            session.messages = result["updated_history"]
            
            # 显示回复
            console.print(f"\n[bold green]Joy Coach:[/bold green] {result['assistant_reply']}\n")
            
            # 如果完成
            if result["is_complete"]:
                formula = result["formula"]["formula"]
                card = JoyCard(
                    user_id=self.user.id,
                    raw_input=user_input,
                    formula_scene=formula.get("scene"),
                    formula_people=formula.get("people"),
                    formula_event=formula.get("event"),
                    formula_trigger=formula.get("trigger"),
                    formula_sensation=formula.get("sensation"),
                    card_summary=result["formula"]["card_summary"],
                    conversation_history=session.messages
                )
                self.db.add(card)
                session.status = SessionStatus.COMPLETED
                session.joy_card_id = card.id
                self.db.commit()
                
                # 显示卡片
                console.print("\n" + "="*50)
                console.print(Panel(
                    f"[bold]{card.card_summary}[/bold]\n\n"
                    f"🎬 场景: {card.formula_scene}\n"
                    f"👥 人物: {card.formula_people}\n"
                    f"📌 事情: {card.formula_event}\n"
                    f"✨ 诱因: {card.formula_trigger}\n"
                    f"💫 感受: {card.formula_sensation}",
                    title="[bold green]✓ 快乐卡片生成成功[/bold green]",
                    border_style="green"
                ))
                break
            else:
                self.db.commit()
        
        Prompt.ask("\n按回车返回主菜单")
    
    def view_cards(self):
        """查看卡片"""
        cards = self.db.query(JoyCard).filter(
            JoyCard.user_id == self.user.id
        ).order_by(JoyCard.created_at.desc()).all()
        
        if not cards:
            console.print("[yellow]你还没有快乐卡片，去创建第一张吧！[/yellow]")
            return
        
        console.print(f"\n[bold]你有 {len(cards)} 张快乐卡片[/bold]\n")
        
        table = Table(show_header=True, header_style="bold cyan")
        table.add_column("#", width=3)
        table.add_column("摘要", width=40)
        table.add_column("创建时间", width=20)
        
        for idx, card in enumerate(cards, 1):
            table.add_row(
                str(idx),
                card.card_summary[:37] + "..." if len(card.card_summary) > 40 else card.card_summary,
                card.created_at.strftime("%Y-%m-%d %H:%M")
            )
        
        console.print(table)
        
        # 查看详情
        detail = Prompt.ask("\n输入编号查看详情（回车返回）", default="")
        if detail.isdigit() and 1 <= int(detail) <= len(cards):
            card = cards[int(detail) - 1]
            console.print(Panel(
                f"[bold]{card.card_summary}[/bold]\n\n"
                f"🎬 场景: {card.formula_scene}\n"
                f"👥 人物: {card.formula_people}\n"
                f"📌 事情: {card.formula_event}\n"
                f"✨ 诱因: {card.formula_trigger}\n"
                f"💫 感受: {card.formula_sensation}\n\n"
                f"[dim]原始记录: {card.raw_input}[/dim]",
                title=f"[bold cyan]卡片 #{detail}[/bold cyan]",
                border_style="cyan"
            ))
            Prompt.ask("\n按回车继续")
    
    def generate_insights(self):
        """生成定律"""
        cards = self.db.query(JoyCard).filter(JoyCard.user_id == self.user.id).all()
        
        if len(cards) < 5:
            console.print(f"[yellow]需要至少5张卡片才能生成定律，当前有{len(cards)}张[/yellow]")
            return
        
        console.print(f"\n[bold]基于你的 {len(cards)} 张卡片生成快乐定律...[/bold]")
        
        try:
            with console.status("[bold green]AI 正在分析你的快乐模式..."):
                insights_data = InsightService.generate_insights(cards)
            
            # 保存定律
            for insight_data in insights_data:
                insight = JoyInsight(
                    user_id=self.user.id,
                    insight_text=insight_data["insight"],
                    pattern_type=insight_data.get("pattern_type"),
                    evidence_cards=insight_data.get("evidence", [])
                )
                self.db.add(insight)
            
            self.db.commit()
            
            console.print(f"\n[bold green]✓ 成功生成 {len(insights_data)} 条快乐定律[/bold green]\n")
            
            # 显示定律
            for idx, insight_data in enumerate(insights_data, 1):
                console.print(Panel(
                    f"[bold]{insight_data['insight']}[/bold]\n\n"
                    f"[dim]模式类型: {insight_data.get('pattern_type', '未分类')}[/dim]",
                    title=f"[bold cyan]定律 #{idx}[/bold cyan]",
                    border_style="cyan"
                ))
        
        except Exception as e:
            console.print(f"[red]生成失败: {str(e)}[/red]")
        
        Prompt.ask("\n按回车返回主菜单")
    
    def explore_joy(self):
        """快乐盲盒"""
        insights = self.db.query(JoyInsight).filter(JoyInsight.user_id == self.user.id).all()
        recent_cards = self.db.query(JoyCard).filter(
            JoyCard.user_id == self.user.id
        ).order_by(JoyCard.created_at.desc()).limit(5).all()
        
        if not insights and len(recent_cards) < 3:
            console.print("[yellow]数据不足，需要至少3张快乐卡片或1条快乐定律[/yellow]")
            return
        
        console.print("\n[bold cyan]🎁 快乐盲盒[/bold cyan]")
        energy = IntPrompt.ask("你现在的能量值是多少？", default=5, show_default=True)
        
        if not 1 <= energy <= 10:
            console.print("[red]能量值请输入1-10之间的数字[/red]")
            return
        
        console.print(f"\n[bold]基于你的能量值 {energy}/10 生成推荐...[/bold]")
        
        try:
            with console.status("[bold green]AI 正在为你定制快乐方案..."):
                recommendations = ExplorationService.recommend(
                    energy_level=energy,
                    insights=insights,
                    recent_cards=recent_cards
                )
            
            console.print(f"\n[bold green]✓ 为你准备了 {len(recommendations)} 个快乐探索方案[/bold green]\n")
            
            for idx, rec in enumerate(recommendations, 1):
                console.print(Panel(
                    f"[bold]{rec['title']}[/bold]\n\n"
                    f"{rec['description']}\n\n"
                    f"[dim]适合原因: {rec.get('energy_match', '基于你的历史快乐模式')}[/dim]",
                    title=f"[bold cyan]推荐 #{idx}[/bold cyan]",
                    border_style="cyan"
                ))
        
        except Exception as e:
            console.print(f"[red]推荐失败: {str(e)}[/red]")
        
        Prompt.ask("\n按回车返回主菜单")
    
    def switch_ai_provider(self):
        """切换AI提供商"""
        from app.config import settings
        from app.services.ai_service import ai_service
        
        console.print("\n[bold]当前AI提供商:[/bold]", settings.AI_PROVIDER)
        console.print("\n可用选项:")
        console.print("1. anthropic (Claude)")
        console.print("2. openai (GPT)")
        console.print("3. gemini (Google)")
        console.print("4. custom (自定义端点)")
        
        choice = Prompt.ask("选择提供商", choices=["1", "2", "3", "4"])
        
        provider_map = {
            "1": "anthropic",
            "2": "openai",
            "3": "gemini",
            "4": "custom"
        }
        
        new_provider = provider_map[choice]
        settings.AI_PROVIDER = new_provider
        ai_service.__init__(new_provider)
        
        console.print(f"[green]✓ 已切换到 {new_provider}[/green]")
        Prompt.ask("\n按回车返回主菜单")


def main():
    # 初始化数据库
    init_db()
    
    # 启动CLI
    cli = JoyFormulaCLI()
    try:
        cli.start()
    except KeyboardInterrupt:
        console.print("\n[yellow]程序已退出[/yellow]")
    except Exception as e:
        console.print(f"\n[red]错误: {str(e)}[/red]")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
```

---

## 第二阶段：补充文件

### database.py
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """FastAPI dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """初始化数据库"""
    from app.models import user, joy_card, joy_insight, chat_session
    Base.metadata.create_all(bind=engine)
```

### main.py
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.api import auth, chat, cards, insights, exploration

# 初始化数据库
init_db()

app = FastAPI(
    title="JoyFormula API",
    description="基于AI的快乐心理健康产品后端",
    version="1.0.0"
)

# CORS配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hackathon阶段允许所有来源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(cards.router)
app.include_router(insights.router)
app.include_router(exploration.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to JoyFormula API",
        "docs": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
```

### requirements.txt
```txt
fastapi==0.115.0
uvicorn[standard]==0.32.0
sqlalchemy==2.0.36
pydantic==2.10.3
pydantic-settings==2.6.1
python-dotenv==1.0.1

# AI SDKs (根据需要安装)
anthropic==0.39.0
openai==1.55.3
google-generativeai==0.8.3

# CLI工具
rich==13.9.4
```

### .env.example
```env
# 数据库
DATABASE_URL=sqlite:///./joyformula.db

# AI提供商选择 (anthropic/openai/gemini/custom)
AI_PROVIDER=anthropic

# API Keys
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here

# 自定义AI端点（用于Defy或其他）
CUSTOM_AI_ENDPOINT=https://your-custom-endpoint.com/api/chat
CUSTOM_AI_API_KEY=your_custom_key_here

# 认证
SIMPLE_AUTH=true
```

---

## 使用说明

### 1. 快速启动

```bash
# 1. 安装依赖
pip install -r requirements.txt

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 填入你的 API keys

# 3. 运行命令行界面（最快速测试）
python -m app.cli.interactive

# 4. 或者启动API服务器
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# 访问 http://localhost:8000/docs 查看API文档
```

### 2. 命令行界面使用流程

1. 输入用户ID（如：alice）
2. 选择功能：
   - 创建快乐卡片：和AI对话，自动生成卡片
   - 查看卡片：浏览所有卡片
   - 生成定律：5张卡片后可用
   - 快乐盲盒：输入能量值获取推荐

### 3. API测试流程（前端对接时）

访问 `http://localhost:8000/docs`，使用Swagger UI测试：

1. 在每个请求的header中添加 `X-User-ID: alice`
2. POST `/api/chat/start` 开始对话
3. POST `/api/chat/message` 发送消息
4. GET `/api/cards` 查看生成的卡片
5. POST `/api/insights/generate` 生成定律
6. POST `/api/exploration/recommend` 获取推荐

### 4. 切换AI提供商

在CLI中选择"切换AI提供商"，或在 `.env` 中修改 `AI_PROVIDER`：
- `anthropic`: Claude (推荐)
- `openai`: GPT-4
- `gemini`: Google Gemini
- `custom`: 自定义端点（用于Defy）

### 5. Pydantic Schemas（需要补充）

在 `app/schemas/` 中创建对应的schemas文件，定义API的输入输出格式。示例：

```python
# app/schemas/chat.py
from pydantic import BaseModel
from typing import Optional, List, Dict

class ChatStartResponse(BaseModel):
    session_id: str
    initial_message: str

class ChatMessageRequest(BaseModel):
    session_id: str
    message: str

class ChatMessageResponse(BaseModel):
    assistant_reply: str
    is_complete: bool
    card_data: Optional[Dict] = None
```

---

## 下一步行动

### Hackathon期间（优先级排序）
1. ✅ 完成核心对话逻辑 - 2小时
2. ✅ 实现卡片CRUD - 1小时
3. ✅ 实现定律生成 - 1.5小时
4. ✅ 实现快乐盲盒 - 1小时
5. ✅ 命令行界面测试 - 0.5小时
6. 补充Pydantic schemas - 0.5小时
7. 前端联调 - 根据前端进度

### Hackathon之后
1. 添加Firebase认证
2. 切换到PostgreSQL
3. 部署到云服务（Railway/Fly.io）
4. 添加更多数据分析功能
5. 性能优化和监控

---

## 注意事项

1. **AI API成本**：测试时使用较小的模型，控制token消耗
2. **数据库**：SQLite文件会在项目根目录生成，注意备份
3. **环境变量**：不要提交 `.env` 到git
4. **错误处理**：当前实现了基础错误处理，生产环境需要增强
5. **Token限制**：Claude/GPT都有上下文长度限制，对话过长时需要截断历史

---

## 故障排查

**问题1**: AI API调用失败
- 检查 `.env` 中的API key是否正确
- 确认网络连接
- 查看终端的错误日志

**问题2**: 数据库错误
- 删除 `joyformula.db` 重新初始化
- 检查SQLAlchemy模型定义

**问题3**: 命令行界面无法启动
- 确认已安装 `rich` 库
- 检查Python路径配置

---

## 开发建议

1. **先跑通CLI**：命令行界面最快验证逻辑
2. **使用Swagger测试API**：前端未完成时的最佳工具
3. **小步迭代**：每完成一个功能就测试一次
4. **保存示例数据**：生成几张好的卡片和定律作为Demo展示

祝Hackathon顺利！🎉

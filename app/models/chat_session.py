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

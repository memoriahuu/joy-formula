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
    language = Column(String, default="en")  # "zh" | "en"
    created_at = Column(DateTime, default=datetime.utcnow)
    last_active = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # 关系
    joy_cards = relationship("JoyCard", back_populates="user", cascade="all, delete-orphan")
    joy_insights = relationship("JoyInsight", back_populates="user", cascade="all, delete-orphan")
    chat_sessions = relationship("ChatSession", back_populates="user", cascade="all, delete-orphan")

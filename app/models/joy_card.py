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

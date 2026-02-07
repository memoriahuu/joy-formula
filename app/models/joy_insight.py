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

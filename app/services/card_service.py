from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.joy_card import JoyCard


class CardService:
    """卡片业务逻辑"""

    @staticmethod
    def get_user_cards(db: Session, user_id: str, skip: int = 0, limit: int = 20) -> List[JoyCard]:
        """获取用户的卡片列表"""
        return db.query(JoyCard).filter(
            JoyCard.user_id == user_id
        ).order_by(JoyCard.created_at.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def get_card(db: Session, card_id: str, user_id: str) -> Optional[JoyCard]:
        """获取单个卡片"""
        return db.query(JoyCard).filter(
            JoyCard.id == card_id,
            JoyCard.user_id == user_id
        ).first()

    @staticmethod
    def count_user_cards(db: Session, user_id: str) -> int:
        """统计用户卡片数量"""
        return db.query(JoyCard).filter(JoyCard.user_id == user_id).count()

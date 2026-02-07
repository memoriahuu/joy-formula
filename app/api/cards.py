from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
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

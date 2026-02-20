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

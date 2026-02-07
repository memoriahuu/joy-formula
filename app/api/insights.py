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

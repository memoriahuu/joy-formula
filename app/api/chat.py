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

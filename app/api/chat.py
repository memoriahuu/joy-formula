from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.chat_session import ChatSession, SessionStatus, SessionType
from app.models.joy_card import JoyCard
from app.schemas.chat import (
    ChatStartResponse, ChatMessageRequest, ChatMessageResponse,
    ChatCompleteRequest, ChatCompleteResponse
)
from app.services.chat_service import ChatService
from app.api.auth import get_current_user

router = APIRouter(prefix="/api/chat", tags=["对话"])


@router.post("/start", response_model=ChatStartResponse)
def start_chat(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """开始新的对话"""
    session = ChatSession(
        user_id=user.id,
        session_type=SessionType.CARD_CREATION,
        messages=[]
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    result = ChatService.start_conversation()

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
    """发送消息（检测到公式时生成草稿卡片，但不结束会话）"""
    session = db.query(ChatSession).filter(
        ChatSession.id == request.session_id,
        ChatSession.user_id == user.id
    ).first()

    if not session:
        raise HTTPException(status_code=404, detail="会话不存在")

    if session.status != SessionStatus.ACTIVE:
        raise HTTPException(status_code=400, detail="会话已结束")

    result = ChatService.process_message(session.messages, request.message)
    session.messages = result["updated_history"]

    # 如果检测到公式，创建/更新草稿卡片（但不结束会话）
    card_data = None
    has_card_draft = False
    if result["is_complete"]:
        formula = result["formula"]["formula"]
        all_user_inputs = "\n".join(
            msg["content"] for msg in session.messages if msg["role"] == "user"
        )

        # 查找已有的草稿卡片
        existing_card = None
        if session.joy_card_id:
            existing_card = db.query(JoyCard).filter(JoyCard.id == session.joy_card_id).first()

        if existing_card:
            existing_card.raw_input = all_user_inputs
            existing_card.formula_scene = formula.get("scene")
            existing_card.formula_people = formula.get("people")
            existing_card.formula_event = formula.get("event")
            existing_card.formula_trigger = formula.get("trigger")
            existing_card.formula_sensation = formula.get("sensation")
            existing_card.card_summary = result["formula"]["card_summary"]
            existing_card.conversation_history = session.messages
            card = existing_card
        else:
            card = JoyCard(
                user_id=user.id,
                raw_input=all_user_inputs,
                formula_scene=formula.get("scene"),
                formula_people=formula.get("people"),
                formula_event=formula.get("event"),
                formula_trigger=formula.get("trigger"),
                formula_sensation=formula.get("sensation"),
                card_summary=result["formula"]["card_summary"],
                conversation_history=session.messages
            )
            db.add(card)
            db.flush()
            session.joy_card_id = card.id

        has_card_draft = True
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

    db.commit()

    return {
        "assistant_reply": result["assistant_reply"],
        "has_card_draft": has_card_draft or session.joy_card_id is not None,
        "is_complete": False,
        "card_data": card_data
    }


ALLOWED_AUDIO_TYPES = {
    "audio/wav", "audio/x-wav", "audio/wave",
    "audio/mp3", "audio/mpeg",
    "audio/mp4", "audio/m4a", "audio/x-m4a",
    "audio/webm",
    "audio/ogg",
}
MAX_AUDIO_SIZE = 25 * 1024 * 1024  # 25MB


@router.post("/voice-message", response_model=ChatMessageResponse)
async def send_voice_message(
    session_id: str = Form(...),
    audio: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """发送语音消息（音频直接传给 Gemini，一次性获取转录+回复）"""
    # 验证音频格式
    content_type = audio.content_type or ""
    if content_type not in ALLOWED_AUDIO_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"不支持的音频格式: {content_type}。支持: wav, mp3, m4a, webm, ogg"
        )

    # 读取音频并验证大小
    audio_bytes = await audio.read()
    if len(audio_bytes) > MAX_AUDIO_SIZE:
        raise HTTPException(status_code=400, detail="音频文件过大，最大支持 25MB")

    # 验证会话
    session = db.query(ChatSession).filter(
        ChatSession.id == session_id,
        ChatSession.user_id == user.id
    ).first()

    if not session:
        raise HTTPException(status_code=404, detail="会话不存在")

    if session.status != SessionStatus.ACTIVE:
        raise HTTPException(status_code=400, detail="会话已结束")

    # 调用语音处理（单次 Gemini API 调用）
    result = ChatService.process_voice_message(
        session.messages, audio_bytes, content_type
    )
    session.messages = result["updated_history"]

    # 复用与文本消息相同的卡片创建逻辑
    card_data = None
    has_card_draft = False
    if result["is_complete"]:
        formula = result["formula"]["formula"]
        all_user_inputs = "\n".join(
            msg["content"] for msg in session.messages if msg["role"] == "user"
        )

        existing_card = None
        if session.joy_card_id:
            existing_card = db.query(JoyCard).filter(JoyCard.id == session.joy_card_id).first()

        if existing_card:
            existing_card.raw_input = all_user_inputs
            existing_card.formula_scene = formula.get("scene")
            existing_card.formula_people = formula.get("people")
            existing_card.formula_event = formula.get("event")
            existing_card.formula_trigger = formula.get("trigger")
            existing_card.formula_sensation = formula.get("sensation")
            existing_card.card_summary = result["formula"]["card_summary"]
            existing_card.conversation_history = session.messages
            card = existing_card
        else:
            card = JoyCard(
                user_id=user.id,
                raw_input=all_user_inputs,
                formula_scene=formula.get("scene"),
                formula_people=formula.get("people"),
                formula_event=formula.get("event"),
                formula_trigger=formula.get("trigger"),
                formula_sensation=formula.get("sensation"),
                card_summary=result["formula"]["card_summary"],
                conversation_history=session.messages
            )
            db.add(card)
            db.flush()
            session.joy_card_id = card.id

        has_card_draft = True
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

    db.commit()

    return {
        "assistant_reply": result["assistant_reply"],
        "has_card_draft": has_card_draft or session.joy_card_id is not None,
        "is_complete": False,
        "card_data": card_data,
        "transcribed_text": result["transcribed_text"]
    }


@router.post("/complete", response_model=ChatCompleteResponse)
def complete_chat(
    request: ChatCompleteRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """用户主动结束对话，保存卡片"""
    session = db.query(ChatSession).filter(
        ChatSession.id == request.session_id,
        ChatSession.user_id == user.id
    ).first()

    if not session:
        raise HTTPException(status_code=404, detail="会话不存在")

    if session.status != SessionStatus.ACTIVE:
        raise HTTPException(status_code=400, detail="会话已结束")

    if not session.joy_card_id:
        raise HTTPException(status_code=400, detail="还没有生成卡片草稿，请继续对话")

    # 最终更新卡片
    card = db.query(JoyCard).filter(JoyCard.id == session.joy_card_id).first()
    card.raw_input = "\n".join(
        msg["content"] for msg in session.messages if msg["role"] == "user"
    )
    card.conversation_history = session.messages

    session.status = SessionStatus.COMPLETED
    db.commit()
    db.refresh(card)

    return {
        "message": "卡片已保存",
        "card_data": {
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
    }

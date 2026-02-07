from pydantic import BaseModel
from typing import Optional, Dict


class ChatStartResponse(BaseModel):
    session_id: str
    initial_message: str


class ChatMessageRequest(BaseModel):
    session_id: str
    message: str


class ChatMessageResponse(BaseModel):
    assistant_reply: str
    has_card_draft: bool
    is_complete: bool
    card_data: Optional[Dict] = None
    transcribed_text: Optional[str] = None


class ChatCompleteRequest(BaseModel):
    session_id: str


class ChatCompleteResponse(BaseModel):
    message: str
    card_data: Optional[Dict] = None

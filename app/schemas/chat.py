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
    is_complete: bool
    card_data: Optional[Dict] = None

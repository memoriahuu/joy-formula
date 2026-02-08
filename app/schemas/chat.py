from pydantic import BaseModel
from typing import Optional, Dict


class ChatStartResponse(BaseModel):
    session_id: str
    initial_message: str


class ChatMessageRequest(BaseModel):
    session_id: str
    message: str


class ChatMessageResponse(BaseModel):
    ai_response: str
    is_complete: bool
    card: Optional[Dict] = None


class ChatCompleteRequest(BaseModel):
    session_id: str


class ChatCompleteResponse(BaseModel):
    message: str
    card_data: Optional[Dict] = None

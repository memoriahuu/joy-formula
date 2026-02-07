from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Dict


class JoyInsightResponse(BaseModel):
    id: str
    user_id: str
    insight_text: str
    pattern_type: Optional[str] = None
    evidence_cards: Optional[List[Dict]] = None
    is_confirmed: bool
    is_rejected: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class GenerateInsightsResponse(BaseModel):
    insights: List[JoyInsightResponse]
    message: str

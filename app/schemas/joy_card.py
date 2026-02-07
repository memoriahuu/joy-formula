from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class FormulaData(BaseModel):
    scene: Optional[str] = None
    people: Optional[str] = None
    event: Optional[str] = None
    trigger: Optional[str] = None
    sensation: Optional[str] = None


class JoyCardResponse(BaseModel):
    id: str
    user_id: str
    raw_input: str
    formula_scene: Optional[str] = None
    formula_people: Optional[str] = None
    formula_event: Optional[str] = None
    formula_trigger: Optional[str] = None
    formula_sensation: Optional[str] = None
    card_summary: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class JoyCardListResponse(BaseModel):
    cards: List[JoyCardResponse]
    total: int

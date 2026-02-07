from pydantic import BaseModel, Field
from typing import List, Optional


class ExplorationRequest(BaseModel):
    energy_level: int = Field(..., ge=1, le=10, description="用户当前能量值 1-10")


class RecommendationItem(BaseModel):
    title: str
    description: str
    related_insight: Optional[str] = None
    energy_match: Optional[str] = None


class ExplorationResponse(BaseModel):
    energy_level: int
    recommendations: List[RecommendationItem]

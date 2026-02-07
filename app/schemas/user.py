from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class UserResponse(BaseModel):
    id: str
    user_identifier: str
    display_name: Optional[str] = None
    created_at: datetime
    last_active: datetime

    class Config:
        from_attributes = True

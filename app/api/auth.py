from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse

router = APIRouter(prefix="/api/auth", tags=["认证"])


def get_current_user(x_user_id: str = Header(...), db: Session = Depends(get_db)) -> User:
    """
    简化版认证：通过 X-User-ID header 获取用户
    Hackathon 阶段使用，后续替换为 Firebase Auth
    """
    user = db.query(User).filter(User.user_identifier == x_user_id).first()
    if not user:
        # 自动创建用户
        user = User(user_identifier=x_user_id, display_name=f"用户_{x_user_id}")
        db.add(user)
        db.commit()
        db.refresh(user)

    return user


@router.get("/me", response_model=UserResponse)
def get_current_user_info(user: User = Depends(get_current_user)):
    """获取当前用户信息"""
    return user

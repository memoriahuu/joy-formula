from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """初始化数据库"""
    from app.models import user, joy_card, joy_insight, chat_session
    Base.metadata.create_all(bind=engine)

    # SQLite: create_all 不会给已存在的表加新列，手动补齐
    if "sqlite" in settings.DATABASE_URL:
        from sqlalchemy import text, inspect
        insp = inspect(engine)
        columns = [c["name"] for c in insp.get_columns("users")]
        if "language" not in columns:
            with engine.connect() as conn:
                conn.execute(text("ALTER TABLE users ADD COLUMN language VARCHAR DEFAULT 'en'"))
                conn.commit()

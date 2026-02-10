import os
from sqlalchemy import create_engine, text, inspect
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# --- 修改开始：环境适配 ---
db_url = settings.DATABASE_URL

# 如果在 Vercel 环境且使用 SQLite
if os.environ.get("VERCEL") and db_url.startswith("sqlite"):
    # 将数据库指向唯一的权限可写目录 /tmp
    db_url = "sqlite:////tmp/joyformula.db"

engine = create_engine(
    db_url,
    connect_args={"check_same_thread": False} if "sqlite" in db_url else {}
)
# --- 修改结束 ---

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """初始化数据库"""
    # 如果是 Vercel 生产环境，SQLite 的改动是无法持久化的
    # 但为了让程序不报错崩溃，我们依然允许它在 /tmp 下执行
    from app.models import user, joy_card, joy_insight, chat_session
    
    try:
        Base.metadata.create_all(bind=engine)

        if "sqlite" in db_url:
            insp = inspect(engine)
            # 检查表是否存在，防止首次运行报错
            if "users" in insp.get_table_names():
                columns = [c["name"] for c in insp.get_columns("users")]
                if "language" not in columns:
                    with engine.connect() as conn:
                        conn.execute(text("ALTER TABLE users ADD COLUMN language VARCHAR DEFAULT 'en'"))
                        conn.commit()

            if "joy_insights" in insp.get_table_names():
                insight_columns = [c["name"] for c in insp.get_columns("joy_insights")]
                with engine.connect() as conn:
                    if "statement" not in insight_columns:
                        conn.execute(text("ALTER TABLE joy_insights ADD COLUMN statement TEXT"))
                    if "keywords" not in insight_columns:
                        conn.execute(text("ALTER TABLE joy_insights ADD COLUMN keywords JSON"))
                    conn.commit()
    except Exception as e:
        print(f"Database init skipped or failed: {e}")
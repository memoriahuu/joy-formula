from pydantic_settings import BaseSettings
from typing import Literal


class Settings(BaseSettings):
    # 数据库
    DATABASE_URL: str = "sqlite:///./joyformula.db"

    # AI 提供商配置
    AI_PROVIDER: Literal["anthropic", "openai", "gemini", "custom"] = "anthropic"

    # API Keys
    ANTHROPIC_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""

    # 自定义 AI 端点（用于 Defy 或其他）
    CUSTOM_AI_ENDPOINT: str = ""
    CUSTOM_AI_API_KEY: str = ""

    # 简化认证（Hackathon 阶段）
    SIMPLE_AUTH: bool = True

    class Config:
        env_file = ".env"


settings = Settings()

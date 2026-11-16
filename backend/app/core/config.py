"""AEGIS Application Settings and Configuration."""

from pathlib import Path
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

# Project root path (D:\AEGIS)
ROOT_DIR = Path(__file__).resolve().parent.parent.parent.parent
ENV_FILE = ROOT_DIR / ".env"


class Settings(BaseSettings):
    """AEGIS application configuration settings."""

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE) if ENV_FILE.exists() else ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Application
    APP_ENV: str = Field(default="development", description="Runtime environment")
    APP_NAME: str = Field(default="AEGIS", description="Application name")
    APP_HOST: str = Field(default="127.0.0.1", description="Backend host")
    APP_PORT: int = Field(default=8000, description="Backend port")
    DEBUG: bool = Field(default=True, description="Debug mode")

    # Frontend
    FRONTEND_PORT: int = Field(default=3005, description="Frontend port")
    CORS_ORIGINS: List[str] = Field(
        default=[
            "http://localhost:3005",
            "http://127.0.0.1:3005",
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        description="Allowed CORS origins",
    )

    # Database
    DATABASE_URL: str = Field(
        default="sqlite:///./aegis.db",
        description="Database connection URL",
    )

    # Policy Engine (OPA)
    OPA_URL: str = Field(
        default="http://127.0.0.1:8181",
        description="Open Policy Agent service base URL",
    )
    OPA_POLICY_PATH: str = Field(
        default="v1/data/aegis/authz",
        description="OPA policy evaluation endpoint path",
    )

    # Gemini AI
    GEMINI_ENABLED: bool = Field(default=False, description="Enable Gemini advisory analysis")
    GEMINI_API_KEY: str = Field(default="", description="Google Gemini API key")
    GEMINI_MODEL: str = Field(default="gemini-3.8-flash", description="Gemini model identifier")
    GEMINI_TIMEOUT_SECONDS: float = Field(default=5.0, description="Gemini request timeout")
    GEMINI_MAX_RETRIES: int = Field(default=1, description="Gemini maximum retry attempts")

    # Security & Logging
    ADMIN_SECRET: str = Field(
        default="dev-secret-key-aegis-must-be-changed-in-production-32chars",
        description="Secret key for administrative operations and tokens",
    )
    TOKEN_EXPIRE_HOURS: int = Field(default=24, description="Session and token lifetime in hours")
    LOG_LEVEL: str = Field(default="INFO", description="Log level")


settings = Settings()

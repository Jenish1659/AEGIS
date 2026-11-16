"""Unit tests for AEGIS application configuration."""

from app.core.config import settings


def test_settings_loaded():
    """Verify application settings load correctly with required attributes."""
    assert settings.APP_NAME == "AEGIS"
    assert settings.FRONTEND_PORT == 3005
    assert settings.APP_PORT == 8000
    assert "http://localhost:3005" in settings.CORS_ORIGINS
    assert "http://127.0.0.1:3005" in settings.CORS_ORIGINS
    assert settings.DATABASE_URL.startswith("sqlite")
    assert settings.OPA_URL.startswith("http")

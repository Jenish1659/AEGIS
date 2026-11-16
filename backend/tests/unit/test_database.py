"""Unit tests for database session connectivity."""

from sqlalchemy import text

from app.database.session import SessionLocal, engine


def test_sqlite_engine_connection():
    """Verify SQLite engine can connect and execute a basic query."""
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        scalar = result.scalar()
        assert scalar == 1


def test_sqlite_session_transaction():
    """Verify SQLAlchemy session creates and rolls back safely."""
    db = SessionLocal()
    try:
        result = db.execute(text("SELECT 'AEGIS' as name"))
        row = result.mappings().one()
        assert row["name"] == "AEGIS"
    finally:
        db.close()

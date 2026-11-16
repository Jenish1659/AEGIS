"""Health check API endpoints."""

from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter(tags=["Health"])


class HealthData(BaseModel):
    """Health check payload."""

    status: str = Field(default="healthy", description="Application service status")
    application: str = Field(default="AEGIS", description="Application name")


class HealthResponse(BaseModel):
    """Standard health check response model."""

    success: bool = Field(default=True, description="Request success indicator")
    data: HealthData = Field(default_factory=HealthData, description="Health payload")


@router.get("/health", response_model=HealthResponse)
async def get_health() -> HealthResponse:
    """Return application health status without exposing sensitive environment data."""
    return HealthResponse(
        success=True,
        data=HealthData(status="healthy", application="AEGIS"),
    )

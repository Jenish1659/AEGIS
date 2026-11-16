"""Central API router mounting all versioned endpoints."""

from fastapi import APIRouter

from app.api.health import router as health_router

api_router = APIRouter(prefix="/api/v1")

# Mount health routes
api_router.include_router(health_router)

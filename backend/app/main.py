"""AEGIS Application Entry Point."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.logging import logger


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application startup and shutdown lifecycle management."""
    logger.info("Initializing AEGIS Security Gateway (Environment: %s)", settings.APP_ENV)
    yield
    logger.info("Shutting down AEGIS Security Gateway")


def create_app() -> FastAPI:
    """Build and configure the FastAPI application instance."""
    app = FastAPI(
        title="AEGIS — Task-Aware Runtime Security Gateway",
        description="Verify Every Action. Enforce Least Privilege.",
        version="0.1.0",
        lifespan=lifespan,
        docs_url="/docs" if settings.DEBUG else None,
        redoc_url="/redoc" if settings.DEBUG else None,
    )

    # Configure CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Mount API v1 router
    app.include_router(api_router)

    @app.get("/", tags=["Root"])
    async def root():
        """Root endpoint returning basic gateway status."""
        return {
            "name": settings.APP_NAME,
            "version": "0.1.0",
            "tagline": "Verify Every Action. Enforce Least Privilege.",
            "health": "/api/v1/health",
            "docs": "/docs" if settings.DEBUG else "disabled",
        }

    return app


app = create_app()

"""Structured application logging configuration."""

import logging
import sys

from app.core.config import settings


def setup_logging() -> logging.Logger:
    """Configure and return root application logger."""
    log_format = "%(asctime)s | %(levelname)-8s | %(name)s:%(funcName)s:%(lineno)d | %(message)s"
    date_format = "%Y-%m-%dT%H:%M:%SZ"

    log_level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)

    logging.basicConfig(
        level=log_level,
        format=log_format,
        datefmt=date_format,
        handlers=[
            logging.StreamHandler(sys.stdout),
        ],
    )

    logger = logging.getLogger("aegis")
    logger.setLevel(log_level)
    return logger


logger = setup_logging()

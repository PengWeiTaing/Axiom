"""Audit log and file cleanup helpers."""
from __future__ import annotations

import logging
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

from core.database import get_db_connection

logger = logging.getLogger("axiom.receiver")


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def write_audit_log(
    action: str,
    target_type: str,
    target_id: int | None = None,
    detail: str | None = None,
) -> None:
    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT INTO audit_log (action, target_type, target_id, detail, created_at) VALUES (?, ?, ?, ?, ?)",
            (action, target_type, target_id, detail, utc_now().isoformat(timespec="seconds")),
        )
        conn.commit()
    except sqlite3.Error:
        logger.exception("failed to write audit log: %s %s %s", action, target_type, target_id)
    finally:
        conn.close()


def cleanup_file(file_path: Path) -> None:
    try:
        file_path.unlink(missing_ok=True)
    except OSError:
        logger.exception("failed to clean up file after database error: %s", file_path)

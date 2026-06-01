"""Database connection, schema initialization, and FTS5 helpers."""
from __future__ import annotations

import logging
import sqlite3
from pathlib import Path

from core.config import (
    ARCHIVE_PATH,
    DB_PATH,
    INBOX_PATH,
    REVIEWS_PATH,
)

logger = logging.getLogger("axiom.receiver")


def ensure_storage_dirs() -> None:
    """服务接收请求前，先确保本地存储目录存在。"""
    INBOX_PATH.mkdir(parents=True, exist_ok=True)
    ARCHIVE_PATH.mkdir(parents=True, exist_ok=True)
    REVIEWS_PATH.mkdir(parents=True, exist_ok=True)
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def ensure_items_table_columns_v2(conn: sqlite3.Connection) -> None:
    """V2 columns added after initial schema."""
    existing = {row[1] for row in conn.execute("PRAGMA table_info(items)").fetchall()}
    if "file_sha256" not in existing:
        conn.execute("ALTER TABLE items ADD COLUMN file_sha256 TEXT")


def ensure_tasks_table_columns(conn: sqlite3.Connection) -> None:
    existing = {row[1] for row in conn.execute("PRAGMA table_info(tasks)").fetchall()}
    if "estimated_minutes" not in existing:
        conn.execute("ALTER TABLE tasks ADD COLUMN estimated_minutes INTEGER")


def ensure_items_lifeline_id(conn: sqlite3.Connection) -> None:
    exists = conn.execute(
        "SELECT 1 FROM sqlite_master WHERE type='table' AND name='items'"
    ).fetchone()
    if not exists:
        return
    cols = {row[1] for row in conn.execute("PRAGMA table_info(items)")}
    if "lifeline_id" not in cols:
        conn.execute("ALTER TABLE items ADD COLUMN lifeline_id TEXT")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_items_lifeline_id ON items(lifeline_id)")


def ensure_tasks_lifeline_id(conn: sqlite3.Connection) -> None:
    exists = conn.execute(
        "SELECT 1 FROM sqlite_master WHERE type='table' AND name='tasks'"
    ).fetchone()
    if not exists:
        return
    cols = {row[1] for row in conn.execute("PRAGMA table_info(tasks)")}
    if "lifeline_id" not in cols:
        conn.execute("ALTER TABLE tasks ADD COLUMN lifeline_id TEXT")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_tasks_lifeline_id ON tasks(lifeline_id)")


def ensure_memories_lifeline_id(conn: sqlite3.Connection) -> None:
    exists = conn.execute(
        "SELECT 1 FROM sqlite_master WHERE type='table' AND name='memories'"
    ).fetchone()
    if not exists:
        return
    cols = {row[1] for row in conn.execute("PRAGMA table_info(memories)")}
    if "lifeline_id" not in cols:
        conn.execute("ALTER TABLE memories ADD COLUMN lifeline_id TEXT")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_memories_lifeline_id ON memories(lifeline_id)")


def ensure_decisions_lifeline_id(conn: sqlite3.Connection) -> None:
    exists = conn.execute(
        "SELECT 1 FROM sqlite_master WHERE type='table' AND name='decisions'"
    ).fetchone()
    if not exists:
        return
    cols = {row[1] for row in conn.execute("PRAGMA table_info(decisions)")}
    if "lifeline_id" not in cols:
        conn.execute("ALTER TABLE decisions ADD COLUMN lifeline_id TEXT")
    conn.execute("CREATE INDEX IF NOT EXISTS idx_decisions_lifeline_id ON decisions(lifeline_id)")


def ensure_items_table_columns(conn: sqlite3.Connection) -> None:
    existing_columns = {
        row[1]
        for row in conn.execute("PRAGMA table_info(items)").fetchall()
    }
    required_columns = {
        "original_name": "TEXT",
        "mime_type": "TEXT",
        "size_bytes": "INTEGER",
        "derived_text": "TEXT",
        "transcript_text": "TEXT",
        "processing_override": "TEXT",
    }
    for column_name, column_type in required_columns.items():
        if column_name in existing_columns:
            continue
        conn.execute(f"ALTER TABLE items ADD COLUMN {column_name} {column_type}")


def init_db(db_path: Path = DB_PATH) -> None:
    """创建当前 Axiom SQLite 表结构。"""
    db_path.parent.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(str(db_path))
    try:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                content TEXT,
                file_path TEXT,
                source TEXT,
                created_at TEXT NOT NULL,
                original_name TEXT,
                mime_type TEXT,
                size_bytes INTEGER,
                derived_text TEXT,
                transcript_text TEXT,
                processing_override TEXT
            )
            """
        )
        ensure_items_table_columns(conn)
        ensure_items_table_columns_v2(conn)
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS user_preferences (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at)"
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_items_type ON items(type)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_items_source ON items(source)")
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS automation_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                job_id TEXT NOT NULL,
                run_date TEXT NOT NULL,
                status TEXT NOT NULL,
                return_code INTEGER,
                message TEXT,
                artifact_path TEXT,
                stdout_tail TEXT,
                stderr_tail TEXT,
                started_at TEXT NOT NULL,
                finished_at TEXT,
                duration_ms INTEGER
            )
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_automation_runs_started_at
            ON automation_runs(started_at)
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_automation_runs_job_id
            ON automation_runs(job_id)
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_automation_runs_status
            ON automation_runs(status)
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS memories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL DEFAULT 'fact',
                content TEXT NOT NULL,
                detail TEXT,
                status TEXT NOT NULL DEFAULT 'candidate',
                source_item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
                source_text TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_memories_category ON memories(category)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_memories_status ON memories(status)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_memories_created_at ON memories(created_at)"
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                detail TEXT,
                status TEXT NOT NULL DEFAULT 'todo',
                priority TEXT NOT NULL DEFAULT 'medium',
                memory_id INTEGER REFERENCES memories(id) ON DELETE SET NULL,
                due_date TEXT,
                estimated_minutes INTEGER,
                completed_at TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date)"
        )
        ensure_tasks_table_columns(conn)
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS items_vectors (
                item_id INTEGER PRIMARY KEY REFERENCES items(id) ON DELETE CASCADE,
                embedding BLOB NOT NULL,
                model TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS workflows (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                trigger_type TEXT NOT NULL,
                trigger_config TEXT,
                action_type TEXT NOT NULL,
                action_config TEXT,
                enabled INTEGER DEFAULT 1,
                last_run TEXT,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS schema_migrations (
                version INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                applied_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS module_state (
                name TEXT PRIMARY KEY,
                enabled INTEGER NOT NULL DEFAULT 1,
                installed_at TEXT NOT NULL DEFAULT ''
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS audit_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                action TEXT NOT NULL,
                target_type TEXT NOT NULL,
                target_id INTEGER,
                detail TEXT,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action)"
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at)"
        )

        # FTS5 full-text search (standalone mode, CJK-tokenized)
        conn.execute(
            """
            CREATE VIRTUAL TABLE IF NOT EXISTS items_fts USING fts5(
                content,
                original_name,
                derived_text,
                transcript_text,
                tokenize='unicode61 remove_diacritics 0'
            )
            """
        )
        fts_backfill(conn)

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS decisions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                context TEXT,
                decision TEXT NOT NULL,
                reasoning TEXT,
                expected_outcome TEXT,
                actual_outcome TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_decisions_status ON decisions(status)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_decisions_created_at ON decisions(created_at)")

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS lifelines (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                parent_id TEXT,
                order_index INTEGER DEFAULT 0,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_lifelines_parent ON lifelines(parent_id)")

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS associations (
                id TEXT PRIMARY KEY,
                from_kind TEXT NOT NULL,
                from_id TEXT NOT NULL,
                to_kind TEXT NOT NULL,
                to_id TEXT NOT NULL,
                relation_type TEXT NOT NULL,
                confidence REAL NOT NULL DEFAULT 0.5,
                status TEXT NOT NULL DEFAULT 'pending',
                evidence TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
            """
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_assoc_from ON associations(from_id)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_assoc_to ON associations(to_id)")

        from core.graph.migrations import ensure_graph_tables
        ensure_graph_tables(conn)

        ensure_items_lifeline_id(conn)
        ensure_tasks_lifeline_id(conn)
        ensure_memories_lifeline_id(conn)
        ensure_decisions_lifeline_id(conn)

        conn.commit()
    finally:
        conn.close()


def init_app_storage() -> None:
    ensure_storage_dirs()
    init_db()


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH), timeout=30)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA foreign_keys=ON")
    return conn


def has_cjk(text: str) -> bool:
    """检查文本是否包含 CJK 字符。"""
    for ch in text:
        cp = ord(ch)
        if (0x4E00 <= cp <= 0x9FFF or 0x3400 <= cp <= 0x4DBF
                or 0xF900 <= cp <= 0xFAFF or 0x3040 <= cp <= 0x30FF):
            return True
    return False


def cjk_tokenize(text: str | None) -> str | None:
    """在 CJK 字符之间插入空格，使 FTS5 unicode61 能正确分词。"""
    if not text:
        return text
    result = []
    for ch in text:
        if has_cjk(ch):
            result.append(" ")
            result.append(ch)
            result.append(" ")
        else:
            result.append(ch)
    return "".join(result).strip()


def fts_sync_item(item_id: int, content: str | None, original_name: str | None,
                  derived_text: str | None, transcript_text: str | None) -> None:
    """同步单条 items 到 FTS5（先删后插）。"""
    conn = get_db_connection()
    try:
        conn.execute("DELETE FROM items_fts WHERE rowid = ?", (item_id,))
        conn.execute(
            "INSERT INTO items_fts(rowid, content, original_name, derived_text, transcript_text) VALUES (?, ?, ?, ?, ?)",
            (item_id,
             cjk_tokenize(content),
             cjk_tokenize(original_name),
             cjk_tokenize(derived_text),
             cjk_tokenize(transcript_text)),
        )
        conn.commit()
    except sqlite3.Error:
        logger.exception("fts_sync_item failed for id=%s", item_id)
    finally:
        conn.close()


def fts_delete_item(item_id: int) -> None:
    """从 FTS5 中删除单条。"""
    conn = get_db_connection()
    try:
        conn.execute("DELETE FROM items_fts WHERE rowid = ?", (item_id,))
        conn.commit()
    except sqlite3.Error:
        logger.exception("fts_delete_item failed for id=%s", item_id)
    finally:
        conn.close()


def fts_backfill(conn: sqlite3.Connection) -> None:
    """回填所有已有 items 到 FTS5。"""
    existing = conn.execute("SELECT COUNT(*) FROM items_fts").fetchone()[0]
    if existing > 0:
        return
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT id, content, original_name, derived_text, transcript_text FROM items").fetchall()
    for r in rows:
        conn.execute(
            "INSERT INTO items_fts(rowid, content, original_name, derived_text, transcript_text) VALUES (?, ?, ?, ?, ?)",
            (r["id"], cjk_tokenize(r["content"]), cjk_tokenize(r["original_name"]),
             cjk_tokenize(r["derived_text"]), cjk_tokenize(r["transcript_text"])),
        )

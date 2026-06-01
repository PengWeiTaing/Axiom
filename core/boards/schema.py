"""Learning Board v0.1 — DB schema 与建表。"""
from __future__ import annotations

import sqlite3

BOARD_SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS boards (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL DEFAULT 'default',
    title TEXT NOT NULL,
    source_type TEXT NOT NULL CHECK (source_type IN ('goal','memory','task','decision','lifeline','cosmos','manual')),
    source_ref_id TEXT,
    status TEXT NOT NULL DEFAULT 'ready' CHECK (status IN ('draft','ready','archived')),
    board_version INTEGER NOT NULL DEFAULT 1,
    generation_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS board_refs (
    board_id TEXT NOT NULL,
    ref_kind TEXT NOT NULL CHECK (ref_kind IN ('memory','task','decision','lifeline','cosmos')),
    ref_id TEXT NOT NULL,
    ref_role TEXT NOT NULL,
    created_at TEXT NOT NULL,
    PRIMARY KEY (board_id, ref_kind, ref_id, ref_role),
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS widgets (
    id TEXT PRIMARY KEY,
    board_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('concept_map','function_visualizer','quiz_card','example_card')),
    title TEXT NOT NULL,
    spec_version TEXT NOT NULL,
    spec_json TEXT NOT NULL,
    source_refs_json TEXT,
    locked_by_user INTEGER NOT NULL DEFAULT 0,
    pinned_by_user INTEGER NOT NULL DEFAULT 0,
    generation_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS board_nodes (
    board_id TEXT NOT NULL,
    widget_id TEXT NOT NULL,
    user_id TEXT NOT NULL DEFAULT 'default',
    x REAL NOT NULL,
    y REAL NOT NULL,
    w REAL NOT NULL,
    h REAL NOT NULL,
    z_index INTEGER NOT NULL DEFAULT 0,
    size_family TEXT NOT NULL DEFAULT 'M' CHECK (size_family IN ('S','M','L','XL')),
    collapsed INTEGER NOT NULL DEFAULT 0,
    hidden INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (board_id, widget_id, user_id),
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
    FOREIGN KEY (widget_id) REFERENCES widgets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS widget_user_state (
    user_id TEXT NOT NULL DEFAULT 'default',
    widget_id TEXT NOT NULL,
    state_json TEXT NOT NULL DEFAULT '{}',
    state_version INTEGER NOT NULL DEFAULT 1,
    local_revision INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (user_id, widget_id),
    FOREIGN KEY (widget_id) REFERENCES widgets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS widget_events (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL DEFAULT 'default',
    board_id TEXT NOT NULL,
    widget_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    event_payload_json TEXT NOT NULL,
    client_ts TEXT,
    server_ts TEXT NOT NULL,
    idempotency_key TEXT,
    FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
    FOREIGN KEY (widget_id) REFERENCES widgets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mastery (
    user_id TEXT NOT NULL DEFAULT 'default',
    concept_key TEXT NOT NULL,
    cosmos_ref_id TEXT,
    score REAL NOT NULL DEFAULT 0.0,
    evidence_count INTEGER NOT NULL DEFAULT 0,
    recent_correct_rate REAL NOT NULL DEFAULT 0.0,
    hint_rate REAL NOT NULL DEFAULT 0.0,
    avg_latency_ms REAL,
    last_reviewed_at TEXT,
    next_review_at TEXT,
    updated_at TEXT NOT NULL,
    PRIMARY KEY (user_id, concept_key)
);

CREATE TABLE IF NOT EXISTS review_queue (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL DEFAULT 'default',
    concept_key TEXT NOT NULL,
    board_id TEXT,
    priority INTEGER NOT NULL DEFAULT 50,
    reason TEXT NOT NULL CHECK (reason IN ('low_mastery','wrong_answer','due_review','manual_pin')),
    scheduled_for TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','done','skipped')),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS board_generations (
    id TEXT PRIMARY KEY,
    board_id TEXT,
    prompt_template_version TEXT NOT NULL,
    model_id TEXT NOT NULL,
    seed INTEGER,
    temperature REAL NOT NULL DEFAULT 0.1,
    input_snapshot_hash TEXT NOT NULL,
    raw_output TEXT NOT NULL,
    normalized_output TEXT NOT NULL,
    validator_report_json TEXT NOT NULL,
    created_at TEXT NOT NULL
);

-- FTS5 板内搜索
CREATE TABLE IF NOT EXISTS widget_search_source (
    rowid INTEGER PRIMARY KEY AUTOINCREMENT,
    widget_id TEXT NOT NULL UNIQUE,
    board_id TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL DEFAULT '',
    tags TEXT DEFAULT ''
);

CREATE VIRTUAL TABLE IF NOT EXISTS board_search USING fts5(
    title,
    body,
    tags,
    content='widget_search_source',
    content_rowid='rowid'
);
"""

# 触发器：保持 FTS5 外部内容表同步
BOARD_FTS_TRIGGERS_SQL = """
CREATE TRIGGER IF NOT EXISTS widget_search_ai AFTER INSERT ON widget_search_source BEGIN
    INSERT INTO board_search(rowid, title, body, tags)
    VALUES (new.rowid, new.title, new.body, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS widget_search_ad AFTER DELETE ON widget_search_source BEGIN
    INSERT INTO board_search(board_search, rowid, title, body, tags)
    VALUES ('delete', old.rowid, old.title, old.body, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS widget_search_au AFTER UPDATE ON widget_search_source BEGIN
    INSERT INTO board_search(board_search, rowid, title, body, tags)
    VALUES ('delete', old.rowid, old.title, old.body, old.tags);
    INSERT INTO board_search(rowid, title, body, tags)
    VALUES (new.rowid, new.title, new.body, new.tags);
END;
"""


def init_board_tables(conn: sqlite3.Connection) -> None:
    """创建 Learning Board 全部表结构。"""
    conn.executescript(BOARD_SCHEMA_SQL)
    try:
        conn.executescript(BOARD_FTS_TRIGGERS_SQL)
    except sqlite3.OperationalError:
        pass
    conn.commit()


def ensure_board_tables(conn: sqlite3.Connection) -> None:
    """幂等创建：先探测 boards 表是否存在，不存在则全量初始化。"""
    row = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='boards'"
    ).fetchone()
    if row is None:
        init_board_tables(conn)

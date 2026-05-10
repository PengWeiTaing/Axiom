"""减脂模块数据模型。"""

JIANZHI_ENTRY_TYPES = {"weight", "food", "exercise", "measurement", "note"}
JIANZHI_ENTRY_TYPE_LABELS = {
    "weight": "体重",
    "food": "饮食",
    "exercise": "运动",
    "measurement": "围度",
    "note": "备注",
}

JIANZHI_TABLES = {
    "module_jianzhi_entries": """
        CREATE TABLE IF NOT EXISTS module_jianzhi_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id INTEGER REFERENCES items(id) ON DELETE SET NULL,
            entry_type TEXT NOT NULL,
            entry_data TEXT NOT NULL DEFAULT '{}',
            recorded_at TEXT NOT NULL,
            source TEXT NOT NULL DEFAULT 'web_app',
            created_at TEXT NOT NULL
        )
    """,
}

JIANZHI_INDEXES = [
    "CREATE INDEX IF NOT EXISTS idx_jianzhi_entry_type ON module_jianzhi_entries(entry_type)",
    "CREATE INDEX IF NOT EXISTS idx_jianzhi_recorded_at ON module_jianzhi_entries(recorded_at)",
]


def ensure_indexes(conn) -> None:
    for sql in JIANZHI_INDEXES:
        conn.execute(sql)


def insert_entry(conn, entry_type: str, entry_data: dict, recorded_at: str,
                 source: str = "web_app", item_id: int | None = None) -> int:
    import json
    now = __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat(timespec="seconds")
    cursor = conn.execute(
        "INSERT INTO module_jianzhi_entries (item_id, entry_type, entry_data, recorded_at, source, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        (item_id, entry_type, json.dumps(entry_data, ensure_ascii=False), recorded_at, source, now),
    )
    return cursor.lastrowid


def row_to_entry(row) -> dict:
    import json
    return {
        "id": row["id"],
        "item_id": row["item_id"],
        "entry_type": row["entry_type"],
        "entry_type_label": JIANZHI_ENTRY_TYPE_LABELS.get(row["entry_type"], row["entry_type"]),
        "entry_data": json.loads(row["entry_data"]) if row["entry_data"] else {},
        "recorded_at": row["recorded_at"],
        "source": row["source"],
        "created_at": row["created_at"],
    }


def query_entries(conn, entry_type: str | None = None, date_from: str | None = None,
                  date_to: str | None = None, limit: int = 50, offset: int = 0):
    conditions = []
    params = []
    if entry_type:
        conditions.append("entry_type = ?")
        params.append(entry_type)
    if date_from:
        conditions.append("recorded_at >= ?")
        params.append(date_from)
    if date_to:
        conditions.append("recorded_at < ?")
        params.append(date_to)
    where = ("WHERE " + " AND ".join(conditions)) if conditions else ""
    return conn.execute(
        f"SELECT * FROM module_jianzhi_entries {where} ORDER BY recorded_at DESC LIMIT ? OFFSET ?",
        params + [limit, offset],
    ).fetchall()


def query_weight_trend(conn, days: int = 30):
    return conn.execute(
        """
        SELECT id, entry_data, recorded_at FROM module_jianzhi_entries
        WHERE entry_type = 'weight' AND recorded_at >= date('now', ?)
        ORDER BY recorded_at ASC
        """,
        (f"-{days} days",),
    ).fetchall()


def query_stats(conn) -> dict:
    total = conn.execute("SELECT COUNT(*) FROM module_jianzhi_entries").fetchone()[0]
    type_rows = conn.execute(
        "SELECT entry_type, COUNT(*) AS count FROM module_jianzhi_entries GROUP BY entry_type"
    ).fetchall()
    latest_weight_row = conn.execute(
        "SELECT entry_data, recorded_at FROM module_jianzhi_entries WHERE entry_type = 'weight' ORDER BY recorded_at DESC LIMIT 1"
    ).fetchone()
    import json
    return {
        "total": total,
        "by_type": {r["entry_type"]: r["count"] for r in type_rows},
        "latest_weight": json.loads(latest_weight_row["entry_data"]) if latest_weight_row else None,
        "latest_weight_date": latest_weight_row["recorded_at"] if latest_weight_row else None,
    }

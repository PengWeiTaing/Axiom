"""System stats, preferences, backlog, and overview helpers."""
from __future__ import annotations

import logging
import sqlite3
from datetime import timedelta
from pathlib import Path

from core.artifacts import (
    artifact_sort_key,
    build_artifact_counts,
    build_artifact_latest_summary,
    build_artifact_summary_payload,
    list_review_artifacts,
)
from core.config import (
    AXIOM_ROOT,
    ITEM_LIST_SELECT_FIELDS,
    ITEM_PROCESSING_STATE_SQL,
    ITEM_TEXT_SOURCE_SQL,
    ITEM_TYPE_AUDIO,
    ITEM_TYPE_DOCUMENT,
    ITEM_TYPE_IMAGE,
    ITEM_TYPE_TEXT,
)
from core.database import get_db_connection
from core.items import (
    build_item_filter_conditions,
    describe_processing_note,
    get_item_primary_text,
    get_storage_area,
    get_type_label,
    join_conditions,
    local_date_now,
    row_to_item,
    utc_now,
)

logger = logging.getLogger("axiom.receiver")


def rows_to_count_map(rows: list[sqlite3.Row], key_name: str) -> dict:
    return {row[key_name] or "unknown": row["count"] for row in rows}


def count_storage_areas(rows: list[sqlite3.Row]) -> dict:
    counts: dict[str, int] = {}
    for row in rows:
        storage = get_storage_area(row["file_path"]) or "unknown"
        counts[storage] = counts.get(storage, 0) + 1
    return counts


def build_stats_payload() -> dict:
    conn = get_db_connection()
    try:
        summary = conn.execute(
            """
            SELECT
                COUNT(*) AS total,
                MIN(created_at) AS first_created_at,
                MAX(created_at) AS latest_created_at
            FROM items
            """
        ).fetchone()
        type_rows = conn.execute(
            """
            SELECT type, COUNT(*) AS count
            FROM items
            GROUP BY type
            ORDER BY type
            """
        ).fetchall()
        source_rows = conn.execute(
            """
            SELECT source, COUNT(*) AS count
            FROM items
            GROUP BY source
            ORDER BY source
            """
        ).fetchall()
        text_source_rows = conn.execute(
            f"""
            SELECT {ITEM_TEXT_SOURCE_SQL} AS text_source, COUNT(*) AS count
            FROM items
            GROUP BY text_source
            ORDER BY text_source
            """
        ).fetchall()
        processing_rows = conn.execute(
            f"""
            SELECT {ITEM_PROCESSING_STATE_SQL} AS processing_state, COUNT(*) AS count
            FROM items
            GROUP BY processing_state
            ORDER BY processing_state
            """
        ).fetchall()
        processing_override_rows = conn.execute(
            """
            SELECT processing_override, COUNT(*) AS count
            FROM items
            WHERE processing_override IS NOT NULL AND processing_override != ''
            GROUP BY processing_override
            ORDER BY processing_override
            """
        ).fetchall()
        storage_rows = conn.execute(
            """
            SELECT file_path
            FROM items
            WHERE file_path IS NOT NULL AND file_path != ''
            """
        ).fetchall()
        memory_total = conn.execute("SELECT COUNT(*) FROM memories").fetchone()[0]
        memory_candidate = conn.execute(
            "SELECT COUNT(*) FROM memories WHERE status = 'candidate'"
        ).fetchone()[0]
        memory_confirmed = conn.execute(
            "SELECT COUNT(*) FROM memories WHERE status = 'confirmed'"
        ).fetchone()[0]
        memory_category_rows = conn.execute(
            """
            SELECT category, COUNT(*) AS count
            FROM memories
            WHERE status = 'confirmed'
            GROUP BY category
            ORDER BY category
            """
        ).fetchall()
        task_total = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        task_todo = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE status = 'todo'"
        ).fetchone()[0]
        task_done = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE status = 'done'"
        ).fetchone()[0]

        today = local_date_now()
        daily_counts = [
            conn.execute(
                "SELECT COUNT(*) FROM items WHERE date(created_at) = ?",
                ((today - timedelta(days=i)).isoformat(),),
            ).fetchone()[0]
            for i in range(6, -1, -1)
        ]
    finally:
        conn.close()

    return {
        "total": summary["total"],
        "first_created_at": summary["first_created_at"],
        "latest_created_at": summary["latest_created_at"],
        "by_type": rows_to_count_map(type_rows, "type"),
        "by_source": rows_to_count_map(source_rows, "source"),
        "by_text_source": rows_to_count_map(text_source_rows, "text_source"),
        "by_processing_state": rows_to_count_map(processing_rows, "processing_state"),
        "by_processing_override": rows_to_count_map(processing_override_rows, "processing_override"),
        "by_storage": count_storage_areas(storage_rows),
        "memory_total": memory_total,
        "memory_candidate": memory_candidate,
        "memory_confirmed": memory_confirmed,
        "memory_by_category": rows_to_count_map(memory_category_rows, "category"),
        "streak": compute_streak(),
        "task_total": task_total,
        "task_todo": task_todo,
        "task_done": task_done,
        "daily_counts": daily_counts,
    }


def ensure_migration(version: int, name: str) -> None:
    """确保 schema 迁移已应用。"""
    conn = get_db_connection()
    try:
        existing = conn.execute(
            "SELECT version FROM schema_migrations WHERE version = ?", (version,)
        ).fetchone()
        if not existing:
            conn.execute(
                "INSERT INTO schema_migrations (version, name, applied_at) VALUES (?, ?, ?)",
                (version, name, utc_now().isoformat(timespec="seconds")),
            )
            conn.commit()
            logger.info("applied migration %s: %s", version, name)
    finally:
        conn.close()


def get_preference(key: str, default: str = "") -> str:
    """读取用户偏好。"""
    conn = get_db_connection()
    try:
        row = conn.execute("SELECT value FROM user_preferences WHERE key = ?", (key,)).fetchone()
        return row["value"] if row else default
    finally:
        conn.close()


def set_preference(key: str, value: str) -> None:
    """写入用户偏好。"""
    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT OR REPLACE INTO user_preferences (key, value, updated_at) VALUES (?, ?, ?)",
            (key, value, utc_now().isoformat(timespec="seconds")),
        )
        conn.commit()
    finally:
        conn.close()


def learn_user_patterns() -> dict:
    """从数据中学习用户行为模式。"""
    conn = get_db_connection()
    try:
        hours = conn.execute(
            "SELECT CAST(strftime('%H', created_at) AS INTEGER) as h, COUNT(*) as cnt FROM items GROUP BY h ORDER BY cnt DESC LIMIT 3"
        ).fetchall()
        peak_hours = [r["h"] for r in hours] if hours else []

        types = conn.execute(
            "SELECT type, COUNT(*) as cnt FROM items GROUP BY type ORDER BY cnt DESC"
        ).fetchall()
        top_type = types[0]["type"] if types else "text"

        total_tasks = conn.execute("SELECT COUNT(*) FROM tasks").fetchone()[0]
        done_tasks = conn.execute("SELECT COUNT(*) FROM tasks WHERE status='done'").fetchone()[0]
        completion_rate = round(done_tasks / max(total_tasks, 1) * 100)

        mem_cats = conn.execute(
            "SELECT category, COUNT(*) as cnt FROM memories WHERE status='confirmed' GROUP BY category ORDER BY cnt DESC LIMIT 3"
        ).fetchall()
        top_categories = [r["category"] for r in mem_cats] if mem_cats else []

        weekly = conn.execute(
            "SELECT COUNT(*) / 4.0 FROM items WHERE created_at >= date('now', '-28 days')"
        ).fetchone()[0]

        return {
            "peak_hours": peak_hours,
            "top_type": top_type,
            "task_completion_rate": completion_rate,
            "top_memory_categories": top_categories,
            "avg_weekly_items": round(weekly, 1),
        }
    finally:
        conn.close()


def compute_streak() -> int:
    """计算连续记录天数。"""
    conn = get_db_connection()
    try:
        today = local_date_now()
        streak = 0
        for i in range(365):
            check_date = (today - timedelta(days=i)).isoformat()
            count = conn.execute(
                "SELECT COUNT(*) FROM items WHERE date(created_at) = ?",
                (check_date,),
            ).fetchone()[0]
            if count > 0:
                streak += 1
            elif i == 0:
                continue  # today can be 0, streak continues from yesterday
            else:
                break
    finally:
        conn.close()
    return streak


def fetch_recent_item_rows(limit: int) -> list[sqlite3.Row]:
    conn = get_db_connection()
    try:
        return conn.execute(
            f"""
            SELECT {ITEM_LIST_SELECT_FIELDS}
            FROM items
            ORDER BY id DESC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()
    finally:
        conn.close()


def fetch_pending_item_rows(item_type: str, limit: int) -> list[sqlite3.Row]:
    conditions, params = build_item_filter_conditions(
        item_type,
        None,
        None,
        None,
        None,
        "pending",
    )
    where_clause = join_conditions(conditions, "WHERE")

    conn = get_db_connection()
    try:
        return conn.execute(
            f"""
            SELECT {ITEM_LIST_SELECT_FIELDS}
            FROM items
            {where_clause}
            ORDER BY id DESC
            LIMIT ?
            """,
            (*params, limit),
        ).fetchall()
    finally:
        conn.close()


def fetch_next_pending_item_row(
    item_type: str | None = None,
    exclude_item_id: int | None = None,
) -> sqlite3.Row | None:
    conditions, params = build_item_filter_conditions(
        item_type,
        None,
        None,
        None,
        None,
        "pending",
    )
    if exclude_item_id is not None:
        conditions.append("id <> ?")
        params.append(exclude_item_id)
    where_clause = join_conditions(conditions, "WHERE")

    conn = get_db_connection()
    try:
        return conn.execute(
            f"""
            SELECT {ITEM_LIST_SELECT_FIELDS}
            FROM items
            {where_clause}
            ORDER BY id DESC
            LIMIT 1
            """,
            params,
        ).fetchone()
    finally:
        conn.close()


def get_processing_backlog_title(item_type: str) -> str:
    if item_type == ITEM_TYPE_DOCUMENT:
        return "文档待补正文"
    if item_type == ITEM_TYPE_AUDIO:
        return "音频待补转写"
    if item_type == ITEM_TYPE_IMAGE:
        return "图片待补说明"
    return "文本待补内容"


def get_processing_backlog_description(item_type: str) -> str:
    if item_type == ITEM_TYPE_DOCUMENT:
        return "优先补 PDF / Word 正文，后续搜索、回顾和导出都会直接消费正文。"
    if item_type == ITEM_TYPE_AUDIO:
        return "优先补音频转写，后续搜索、回顾和自动化会直接消费转写文本。"
    if item_type == ITEM_TYPE_IMAGE:
        return "优先补图片说明，后续搜索、回顾和描述自动化会直接读取说明文本。"
    return "补齐文本内容，避免记录只剩空壳索引。"


def build_processing_backlog_payload(group_limit: int = 3) -> dict:
    ordered_types = [
        ITEM_TYPE_DOCUMENT,
        ITEM_TYPE_AUDIO,
        ITEM_TYPE_IMAGE,
        ITEM_TYPE_TEXT,
    ]

    conn = get_db_connection()
    try:
        type_rows = conn.execute(
            f"""
            SELECT type, COUNT(*) AS count
            FROM items
            WHERE ({ITEM_PROCESSING_STATE_SQL}) = 'pending'
            GROUP BY type
            ORDER BY CASE type
                WHEN 'document' THEN 0
                WHEN 'audio' THEN 1
                WHEN 'image' THEN 2
                WHEN 'text' THEN 3
                ELSE 4
            END
            """
        ).fetchall()
    finally:
        conn.close()

    counts_by_type = rows_to_count_map(type_rows, "type")
    next_overall_row = fetch_next_pending_item_row()
    groups = []

    for item_type in ordered_types:
        count = counts_by_type.get(item_type, 0)
        if count <= 0:
            continue

        rows = fetch_pending_item_rows(item_type, group_limit)
        next_item_row = rows[0] if rows else fetch_next_pending_item_row(item_type)
        groups.append(
            {
                "type": item_type,
                "type_label": get_type_label(item_type),
                "title": get_processing_backlog_title(item_type),
                "description": get_processing_backlog_description(item_type),
                "processing_note": describe_processing_note(item_type, "pending"),
                "count": count,
                "items": [row_to_item(row) for row in rows],
                "next_item": row_to_item(next_item_row) if next_item_row else None,
                "filters": {
                    "type": item_type,
                    "processing_state": "pending",
                },
            }
        )

    total_pending = sum(counts_by_type.values())
    return {
        "generated_at": utc_now().isoformat(timespec="seconds"),
        "total": total_pending,
        "group_limit": group_limit,
        "by_type": counts_by_type,
        "next_overall": row_to_item(next_overall_row) if next_overall_row else None,
        "groups": groups,
    }


def summarize_text(value: str | None, max_chars: int) -> str:
    if not value:
        return ""

    text = " ".join(part.strip() for part in str(value).splitlines() if part.strip())
    if len(text) <= max_chars:
        return text
    return text[: max_chars - 3].rstrip() + "..."


def build_overview_payload(recent_limit: int, preview_chars: int) -> dict:
    recent_rows = fetch_recent_item_rows(recent_limit)
    artifacts = list_review_artifacts()
    latest_overall = max(artifacts, key=artifact_sort_key) if artifacts else None
    backlog_limit = max(1, min(recent_limit, 3))

    return {
        "service": "axiom-receiver",
        "generated_at": utc_now().isoformat(timespec="seconds"),
        "recent": {
            "limit": recent_limit,
            "items": [row_to_item(row) for row in recent_rows],
        },
        "stats": build_stats_payload(),
        "processing_backlog": build_processing_backlog_payload(backlog_limit),
        "artifacts": {
            "preview_chars": preview_chars,
            "total": len(artifacts),
            "counts": build_artifact_counts(artifacts),
            "latest_overall": build_artifact_summary_payload(latest_overall, preview_chars),
            "latest": build_artifact_latest_summary(artifacts, preview_chars),
        },
    }


def build_overview_text(payload: dict, preview_chars: int) -> str:
    stats = payload["stats"]
    recent = payload["recent"]
    backlog = payload["processing_backlog"]
    artifacts = payload["artifacts"]
    latest = artifacts["latest"]
    lines = [
        "Axiom 总览",
        f"生成时间: {payload['generated_at']}",
        "",
        "数据统计",
        f"- 总条目: {stats['total']}",
        f"- 文本: {stats['by_type'].get('text', 0)}",
        f"- 图片: {stats['by_type'].get('image', 0)}",
        f"- 文档: {stats['by_type'].get('document', 0)}",
        f"- 音频: {stats['by_type'].get('audio', 0)}",
        f"- 已就绪: {stats['by_processing_state'].get('ready', 0)}",
        f"- 待处理: {stats['by_processing_state'].get('pending', 0)}",
        f"- inbox: {stats['by_storage'].get('inbox', 0)}",
        f"- archive: {stats['by_storage'].get('archive', 0)}",
        f"- 记忆: {stats.get('memory_confirmed', 0)} 已确认",
        f"- 待确认记忆: {stats.get('memory_candidate', 0)}",
        f"- 任务: {stats.get('task_todo', 0)} 待办 / {stats.get('task_done', 0)} 已完成",
        "",
        "最近记录",
    ]

    if recent["items"]:
        for index, item in enumerate(recent["items"], start=1):
            content = summarize_text(item.get("content"), preview_chars) or "(无内容)"
            lines.append(
                f"{index}. [{item['type']}] {content} | {item['created_at']} | {item.get('source') or 'unknown'}"
            )
    else:
        lines.append("- 暂无记录")

    lines.extend(["", "处理积压"])
    if backlog["total"] <= 0:
        lines.append("- 当前没有待补正文 / 转写 / 描述项")
    else:
        lines.append(f"- 总待处理: {backlog['total']}")
        for group in backlog["groups"]:
            latest_item = group["items"][0] if group["items"] else None
            item_preview = summarize_text(
                get_item_primary_text(latest_item) if latest_item else "",
                preview_chars,
            ) or (latest_item.get("original_name") if latest_item else "")
            suffix = ""
            if latest_item:
                suffix = f" | 最近: {item_preview or '(无内容)'}"
            lines.append(f"- {group['title']}: {group['count']}{suffix}")

    lines.extend(["", "自动化产物", f"- 总数: {artifacts['total']}"])

    latest_overall = artifacts.get("latest_overall")
    if latest_overall:
        overall_preview = summarize_text(latest_overall.get("preview"), preview_chars) or "(无预览)"
        lines.append(
            f"- 最新产物: {latest_overall['group']} {latest_overall.get('window') or latest_overall.get('mode') or ''} {latest_overall.get('report_date') or ''} {overall_preview}".strip()
        )

    artifact_sections = [
        ("Review 日报", latest["review"]["daily"]),
        ("Review 周报", latest["review"]["weekly"]),
        ("Inbox 报告", latest["inbox"]),
        ("Inbox 动作预演", latest["inbox-actions"]["dry-run"]),
        ("Inbox 动作执行", latest["inbox-actions"]["apply"]),
        ("动作历史日报", latest["inbox-action-history"]["daily"]),
        ("动作历史周报", latest["inbox-action-history"]["weekly"]),
        ("音频转写报告", latest["audio-transcripts"]),
        ("图片描述报告", latest["image-descriptions"]),
    ]
    for label, artifact in artifact_sections:
        if artifact is None:
            continue
        preview = summarize_text(artifact.get("preview"), preview_chars) or "(无预览)"
        report_date = artifact.get("report_date") or artifact.get("generated_name") or ""
        lines.append(f"- {label}: {report_date} {preview}".rstrip())

    return "\n".join(lines) + "\n"


def resolve_stored_file_path(file_path_value: str | None) -> Path | None:
    if not file_path_value:
        return None

    file_path = Path(file_path_value).expanduser()
    if not file_path.is_absolute():
        file_path = AXIOM_ROOT / file_path
    return file_path.resolve()

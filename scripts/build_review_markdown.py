#!/usr/bin/env python3
"""
生成 Axiom 的日回顾 / 周回顾 Markdown 底稿。
当前阶段只做时间窗口计算、汇总和分组展示，不接 AI。
"""

from __future__ import annotations

import argparse
import sqlite3
import sys
from collections import Counter
from datetime import date, datetime, time, timedelta, timezone
from pathlib import Path
from types import SimpleNamespace


SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import export_items_markdown as export_tools  # noqa: E402


WINDOW_NAMES = {
    "day": "Daily Review",
    "week": "Weekly Review",
}


def parse_utc_offset(value: str) -> timezone:
    text = value.strip()
    try:
        sample = datetime.fromisoformat(f"2000-01-01T00:00:00{text}")
    except ValueError as exc:
        raise ValueError("utc-offset 必须是类似 +08:00 的格式") from exc

    if sample.tzinfo is None:
        raise ValueError("utc-offset 必须带时区偏移")

    return sample.tzinfo


def parse_anchor_date(value: str | None, local_tz: timezone) -> date:
    if not value:
        return datetime.now(local_tz).date()

    try:
        return date.fromisoformat(value)
    except ValueError as exc:
        raise ValueError("date 必须是 YYYY-MM-DD") from exc


def apply_days_offset(anchor_date: date, days_offset: int) -> date:
    return anchor_date + timedelta(days=days_offset)


def build_window(
    window: str,
    anchor_date: date,
    local_tz: timezone,
) -> tuple[datetime, datetime]:
    if window == "day":
        start_date = anchor_date
    else:
        start_date = anchor_date - timedelta(days=6)

    start_local = datetime.combine(start_date, time.min, tzinfo=local_tz)
    end_local = datetime.combine(anchor_date, time.max, tzinfo=local_tz)
    return start_local, end_local


def to_local_datetime(created_at: str, local_tz: timezone) -> datetime:
    dt = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(local_tz)


def build_query_args(args: argparse.Namespace, start_utc: str, end_utc: str) -> SimpleNamespace:
    return SimpleNamespace(
        root=args.root,
        deploy_root=args.deploy_root,
        created_from=start_utc,
        created_to=end_utc,
        item_type=args.item_type,
        storage=args.storage,
        source=args.source,
        sort="oldest",
        limit=args.limit,
    )


def fetch_memory_rows(root: Path, start_utc: str, end_utc: str) -> list[sqlite3.Row]:
    """读取指定时间窗口内的记忆行。"""
    db_path = root / "db" / "axiom.db"
    if not db_path.exists():
        return []
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    try:
        return conn.execute(
            """
            SELECT id, category, content, detail, status, source_item_id, created_at, updated_at
            FROM memories
            WHERE created_at >= ? AND created_at < ?
            ORDER BY created_at DESC
            """,
            (start_utc, end_utc),
        ).fetchall()
    finally:
        conn.close()


def fetch_task_summary(root: Path, start_utc: str, end_utc: str) -> dict:
    """读取指定窗口内的任务完成统计。"""
    db_path = root / "db" / "axiom.db"
    if not db_path.exists():
        return {"done": 0, "created": 0, "todo": 0}
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    try:
        done = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE status = 'done' AND completed_at >= ? AND completed_at < ?",
            (start_utc, end_utc),
        ).fetchone()[0]
        created = conn.execute(
            "SELECT COUNT(*) FROM tasks WHERE created_at >= ? AND created_at < ?",
            (start_utc, end_utc),
        ).fetchone()[0]
        todo = conn.execute("SELECT COUNT(*) FROM tasks WHERE status = 'todo'").fetchone()[0]
        done_rows = conn.execute(
            "SELECT id, title, priority, completed_at FROM tasks WHERE status = 'done' AND completed_at >= ? AND completed_at < ? ORDER BY completed_at DESC LIMIT 30",
            (start_utc, end_utc),
        ).fetchall()
        return {"done": done, "created": created, "todo": todo, "done_rows": done_rows}
    finally:
        conn.close()


TASK_PRIORITY_LABELS = {"high": "高", "medium": "中", "low": "低"}


def fetch_candidate_memories(root: Path) -> list[sqlite3.Row]:
    """读取所有待确认的记忆。"""
    db_path = root / "db" / "axiom.db"
    if not db_path.exists():
        return []
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    try:
        return conn.execute(
            """
            SELECT id, category, content, detail, status, source_item_id, created_at, updated_at
            FROM memories
            WHERE status = 'candidate'
            ORDER BY created_at DESC
            LIMIT 20
            """
        ).fetchall()
    finally:
        conn.close()


MEMORY_CATEGORY_LABELS = {
    "fact": "事实",
    "preference": "偏好",
    "goal": "目标",
    "relationship": "人际关系",
    "event": "事件",
}
MEMORY_STATUS_LABELS = {
    "candidate": "待确认",
    "confirmed": "已确认",
    "archived": "已归档",
}


def build_markdown(
    args: argparse.Namespace,
    start_local: datetime,
    end_local: datetime,
    rows: list,
    memory_rows: list | None = None,
    candidate_rows: list | None = None,
    task_summary: dict | None = None,
) -> str:
    generated_at = datetime.now(timezone.utc).isoformat()
    local_tz = parse_utc_offset(args.utc_offset)
    grouped_rows: dict[str, list] = {}
    type_counter = Counter(row["type"] or "unknown" for row in rows)
    source_counter = Counter(row["source"] or "unknown" for row in rows)
    storage_counter = Counter()

    for row in rows:
        local_created_at = to_local_datetime(row["created_at"], local_tz)
        day_key = local_created_at.date().isoformat()
        grouped_rows.setdefault(day_key, []).append((local_created_at, row))

        resolved_path = export_tools.resolve_file_path(
            args.root,
            row["file_path"],
            args.deploy_root,
        )
        storage = export_tools.detect_storage(args.root, resolved_path) or "unknown"
        storage_counter[storage] += 1

    lines: list[str] = [
        f"# Axiom {WINDOW_NAMES[args.window]}",
        "",
        f"- generated_at: {generated_at}",
        f"- window: {args.window}",
        f"- local_timezone: {args.utc_offset}",
        f"- anchor_date: {args.date}",
        f"- days_offset: {args.days_offset}",
        f"- local_range: {start_local.isoformat()} -> {end_local.isoformat()}",
        f"- utc_range: {args.created_from} -> {args.created_to}",
        f"- total: {len(rows)}",
        f"- type: {args.item_type or 'None'}",
        f"- storage: {args.storage or 'None'}",
        f"- source: {args.source or 'None'}",
        "",
        "## Summary",
        "",
        "- by_type: " + (", ".join(f"{key}={value}" for key, value in sorted(type_counter.items())) or "None"),
        "- by_source: " + (", ".join(f"{key}={value}" for key, value in sorted(source_counter.items())) or "None"),
        "- by_storage: " + (", ".join(f"{key}={value}" for key, value in sorted(storage_counter.items())) or "None"),
        "",
    ]

    if task_summary:
        lines.extend(
            [
                f"- tasks_created: {task_summary['created']}",
                f"- tasks_done: {task_summary['done']}",
                f"- tasks_todo_remaining: {task_summary['todo']}",
                "",
            ]
        )

    lines.extend(
        [
            "## Days",
            "",
        ]
    )

    if not rows:
        lines.append("_No items matched._")
        return "\n".join(lines) + "\n"

    for day_key in sorted(grouped_rows):
        day_rows = grouped_rows[day_key]
        day_type_counter = Counter(row["type"] or "unknown" for _, row in day_rows)
        lines.extend(
            [
                f"### {day_key}",
                "",
                f"- total: {len(day_rows)}",
                "- by_type: " + ", ".join(f"{key}={value}" for key, value in sorted(day_type_counter.items())),
                "",
            ]
        )

        for index, (local_created_at, row) in enumerate(day_rows, start=1):
            resolved_path = export_tools.resolve_file_path(
                args.root,
                row["file_path"],
                args.deploy_root,
            )
            storage = export_tools.detect_storage(args.root, resolved_path) or "unknown"
            file_size = resolved_path.stat().st_size if resolved_path and resolved_path.exists() else None
            content = export_tools.pick_primary_text(row) or "_空_"
            derived_preview = export_tools.summarize_inline_text(export_tools.read_row_text(row, "derived_text"))
            transcript_preview = export_tools.summarize_inline_text(export_tools.read_row_text(row, "transcript_text"))

            lines.extend(
                [
                    f"{index}. `[item {row['id']}]` `{local_created_at.strftime('%H:%M:%S')}` `{row['type']}` `{storage}` `{row['source'] or 'None'}`",
                    f"   text_source: {export_tools.describe_primary_text_source(row)}",
                    f"   content: {content}",
                    f"   file_path: {row['file_path'] or 'None'}",
                    f"   file_size_bytes: {file_size if file_size is not None else 'None'}",
                ]
            )
            if derived_preview:
                lines.append(f"   derived_text: {derived_preview}")
            if transcript_preview:
                lines.append(f"   transcript_text: {transcript_preview}")
            lines.append("")

    if task_summary and task_summary.get("done_rows"):
        lines.extend(
            [
                "## 已完成任务",
                "",
                f"- 本窗口完成: {task_summary['done']} 条",
                f"- 仍有待办: {task_summary['todo']} 条",
                "",
            ]
        )
        for r in task_summary["done_rows"]:
            p_label = TASK_PRIORITY_LABELS.get(r["priority"], r["priority"])
            lines.append(f"- [✓] [{p_label}] {r['title']}")
        lines.append("")

    if memory_rows:
        lines.extend(
            [
                "## 新增记忆",
                "",
                f"- 本窗口内新增记忆: {len(memory_rows)} 条",
                "",
            ]
        )
        confirmed = [r for r in memory_rows if r["status"] == "confirmed"]
        new_candidates = [r for r in memory_rows if r["status"] == "candidate"]
        if confirmed:
            lines.append("### 已确认")
            lines.append("")
            for r in confirmed:
                cat_label = MEMORY_CATEGORY_LABELS.get(r["category"], r["category"])
                lines.append(f"- [{cat_label}] {r['content']}")
            lines.append("")
        if new_candidates:
            lines.append("### 新增候选（待确认）")
            lines.append("")
            for r in new_candidates:
                cat_label = MEMORY_CATEGORY_LABELS.get(r["category"], r["category"])
                lines.append(f"- [{cat_label}] {r['content']}")
            lines.append("")

    if candidate_rows and len(candidate_rows) > 0:
        pending = [r for r in candidate_rows if not memory_rows or r["id"] not in {m["id"] for m in memory_rows}]
        if pending:
            lines.extend(
                [
                    "## 待确认记忆",
                    "",
                    f"- 当前有 {len(pending)} 条记忆尚未确认",
                    "",
                ]
            )
            for r in pending[:10]:
                cat_label = MEMORY_CATEGORY_LABELS.get(r["category"], r["category"])
                lines.append(f"- [{cat_label}] {r['content']}")
            lines.append("")

    lines.extend(
        [
            "## Notes",
            "",
            "- 这是一份人工回顾底稿，后续可继续接 AI 摘要或分类。",
            "- 当前脚本基于现有 created_at 时间范围过滤，不修改任何数据。",
            "",
        ]
    )
    return "\n".join(lines) + "\n"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build a daily or weekly Axiom review markdown draft.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=export_tools.default_root(),
        help="Axiom root directory.",
    )
    parser.add_argument(
        "--deploy-root",
        default=export_tools.DEFAULT_DEPLOY_ROOT,
        help="Deployment root used in stored file paths.",
    )
    parser.add_argument(
        "--window",
        choices=["day", "week"],
        default="day",
        help="Review window. day = one local day, week = latest 7 local days.",
    )
    parser.add_argument(
        "--date",
        help="Anchor local date in YYYY-MM-DD. Defaults to today in the chosen timezone.",
    )
    parser.add_argument(
        "--days-offset",
        type=int,
        default=0,
        help="Shift the anchor date by N days. Example: -1 means yesterday.",
    )
    parser.add_argument(
        "--utc-offset",
        default="+08:00",
        help="Local timezone offset, default +08:00.",
    )
    parser.add_argument(
        "--type",
        dest="item_type",
        choices=sorted(export_tools.ITEM_TYPES),
        help="Optional item type filter.",
    )
    parser.add_argument(
        "--storage",
        choices=sorted(export_tools.STORAGE_TYPES),
        help="Optional storage filter.",
    )
    parser.add_argument(
        "--source",
        help="Optional source filter.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Optional row limit.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Write markdown to file instead of stdout.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")

    local_tz = parse_utc_offset(args.utc_offset)
    anchor_date = parse_anchor_date(args.date, local_tz)
    anchor_date = apply_days_offset(anchor_date, args.days_offset)
    start_local, end_local = build_window(args.window, anchor_date, local_tz)

    args.date = anchor_date.isoformat()
    args.root = args.root.expanduser().resolve()
    args.created_from = start_local.astimezone(timezone.utc).isoformat()
    args.created_to = end_local.astimezone(timezone.utc).isoformat()
    args.start_local = start_local
    args.end_local = end_local
    return args


def main() -> int:
    try:
        args = parse_args()
        query_args = build_query_args(args, args.created_from, args.created_to)
        rows = export_tools.read_rows(query_args, args.root)
        memory_rows = fetch_memory_rows(args.root, args.created_from, args.created_to)
        candidate_rows = fetch_candidate_memories(args.root)
        task_summary = fetch_task_summary(args.root, args.created_from, args.created_to)
        markdown = build_markdown(args, args.start_local, args.end_local, rows, memory_rows, candidate_rows, task_summary)
    except (FileNotFoundError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(markdown, encoding="utf-8", newline="\n")
    else:
        print(markdown, end="")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

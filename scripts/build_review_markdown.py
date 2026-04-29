#!/usr/bin/env python3
"""
生成 Axiom 的日回顾 / 周回顾 Markdown 底稿。
当前阶段只做时间窗口计算、汇总和分组展示，不接 AI。
"""

from __future__ import annotations

import argparse
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


def build_markdown(
    args: argparse.Namespace,
    start_local: datetime,
    end_local: datetime,
    rows: list,
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
        "## Days",
        "",
    ]

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
            content = (row["content"] or "").strip() or "_空_"

            lines.extend(
                [
                    f"{index}. `[item {row['id']}]` `{local_created_at.strftime('%H:%M:%S')}` `{row['type']}` `{storage}` `{row['source'] or 'None'}`",
                    f"   content: {content}",
                    f"   file_path: {row['file_path'] or 'None'}",
                    f"   file_size_bytes: {file_size if file_size is not None else 'None'}",
                    "",
                ]
            )

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
        markdown = build_markdown(args, args.start_local, args.end_local, rows)
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

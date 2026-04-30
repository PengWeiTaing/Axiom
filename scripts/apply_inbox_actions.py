#!/usr/bin/env python3
"""
按规则执行 Axiom inbox 处理动作。
默认 dry-run，只归档“归档候选”；显式加 --apply 才会真正改动数据。
"""

from __future__ import annotations

import argparse
import os
import sqlite3
import sys
from dataclasses import dataclass
from datetime import datetime, time, timezone
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import build_inbox_processing_report as report_tools  # noqa: E402
import export_items_markdown as export_tools  # noqa: E402


@dataclass
class ExecutionEntry:
    item_id: int
    item_type: str
    action: str
    content_preview: str
    source_path: str
    target_path: str | None
    status: str
    message: str


def build_unique_file_path(target_dir: Path, filename: str) -> Path:
    target_dir.mkdir(parents=True, exist_ok=True)
    candidate = target_dir / filename
    source_path = Path(filename)
    counter = 1

    while candidate.exists():
        candidate = target_dir / f"{source_path.stem}_{counter}{source_path.suffix}"
        counter += 1

    return candidate


def build_archive_path(root: Path, now: datetime, source_path: Path) -> Path:
    archive_dir = (root / "data" / "archive" / now.strftime("%Y%m")).resolve()
    return build_unique_file_path(archive_dir, source_path.name)


def update_item_file_path(root: Path, item_id: int, file_path: Path) -> None:
    conn = sqlite3.connect(str(root / "db" / "axiom.db"))
    try:
        conn.execute(
            """
            UPDATE items
            SET file_path = ?
            WHERE id = ?
            """,
            (str(file_path), item_id),
        )
        conn.commit()
    finally:
        conn.close()


def should_execute_action(action: str, include_describe_then_archive: bool) -> bool:
    if action == "归档候选":
        return True
    if include_describe_then_archive and action == "补描述后归档":
        return True
    return False


def build_query_args(args: argparse.Namespace) -> argparse.Namespace:
    return report_tools.build_query_args(args)


def build_execution_entries(
    args: argparse.Namespace,
    items: list[report_tools.ProcessingItem],
) -> list[ExecutionEntry]:
    entries: list[ExecutionEntry] = []
    now = datetime.now(timezone.utc)
    only_ids = set(args.only_ids or [])
    exclude_ids = set(args.exclude_ids or [])

    for item in items:
        if only_ids and item.item_id not in only_ids:
            continue
        if item.item_id in exclude_ids:
            continue
        if not should_execute_action(item.action, args.include_describe_then_archive):
            continue

        source_path = export_tools.resolve_file_path(
            args.root,
            item.file_path,
            args.deploy_root,
        )

        if source_path is None:
            entries.append(
                ExecutionEntry(
                    item_id=item.item_id,
                    item_type=item.item_type,
                    action=item.action,
                    content_preview=item.content_preview,
                    source_path=item.file_path,
                    target_path=None,
                    status="skipped",
                    message="无法解析文件路径",
                )
            )
            continue

        target_path = build_archive_path(args.root, now, source_path)
        entries.append(
            ExecutionEntry(
                item_id=item.item_id,
                item_type=item.item_type,
                action=item.action,
                content_preview=item.content_preview,
                source_path=str(source_path),
                target_path=str(target_path),
                status="pending",
                message="等待执行",
            )
        )

    return entries


def execute_entries(args: argparse.Namespace, entries: list[ExecutionEntry]) -> None:
    if args.max_items is not None and len(entries) > args.max_items:
        raise ValueError(
            f"命中 {len(entries)} 个候选条目，超过 --max-items={args.max_items}"
        )

    if not args.apply:
        for entry in entries:
            entry.status = "dry-run"
            entry.message = "仅预览，不改动数据"
        return

    inbox_root = (args.root / "data" / "inbox").resolve()

    for entry in entries:
        source_path = Path(entry.source_path)
        target_path = Path(entry.target_path) if entry.target_path else None

        if target_path is None:
            entry.status = "skipped"
            entry.message = "缺少目标路径"
            continue

        if not source_path.exists():
            entry.status = "skipped"
            entry.message = "源文件不存在"
            continue

        try:
            source_path.resolve().relative_to(inbox_root)
        except ValueError:
            entry.status = "skipped"
            entry.message = "源文件不在 inbox 中"
            continue

        target_path.parent.mkdir(parents=True, exist_ok=True)
        try:
            os.replace(source_path, target_path)
            update_item_file_path(args.root, entry.item_id, target_path)
        except Exception as exc:
            if target_path.exists() and not source_path.exists():
                try:
                    os.replace(target_path, source_path)
                except OSError:
                    pass
            entry.status = "failed"
            entry.message = str(exc)
            continue

        entry.status = "applied"
        entry.message = "已归档"


def build_markdown(args: argparse.Namespace, entries: list[ExecutionEntry]) -> str:
    generated_at = datetime.now(timezone.utc).isoformat()
    status_counts: dict[str, int] = {}
    for entry in entries:
        status_counts[entry.status] = status_counts.get(entry.status, 0) + 1

    lines: list[str] = [
        "# Axiom Inbox 执行报告",
        "",
        f"- generated_at: {generated_at}",
        f"- mode: {'apply' if args.apply else 'dry-run'}",
        f"- report_date: {args.date}",
        f"- days_offset: {args.days_offset}",
        f"- stale_days: {args.stale_days}",
        f"- include_describe_then_archive: {args.include_describe_then_archive}",
        f"- only_ids: {args.only_ids or 'None'}",
        f"- exclude_ids: {args.exclude_ids or 'None'}",
        f"- max_items: {args.max_items if args.max_items is not None else 'None'}",
        f"- total_candidates: {len(entries)}",
        "- by_status: " + (", ".join(f"{key}={value}" for key, value in sorted(status_counts.items())) or "None"),
        "",
        "## Entries",
        "",
    ]

    if not entries:
        lines.append("_没有命中可执行动作。_")
        return "\n".join(lines) + "\n"

    for index, entry in enumerate(entries, start=1):
        lines.extend(
            [
                f"{index}. `[item {entry.item_id}]` `{entry.item_type}` `{entry.action}` `{entry.status}`",
                f"   content: {entry.content_preview}",
                f"   from: {entry.source_path}",
                f"   to: {entry.target_path or 'None'}",
                f"   message: {entry.message}",
                "",
            ]
        )

    lines.extend(
        [
            "## 说明",
            "",
            "- 默认只执行 `归档候选`，不会自动处理需要补描述的图片。",
            "- 若要把 `补描述后归档` 也纳入执行范围，需要显式加 `--include-describe-then-archive`。",
            "",
        ]
    )
    return "\n".join(lines) + "\n"


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Apply safe inbox actions based on the processing report.",
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
        "--date",
        help="Report local date in YYYY-MM-DD. Defaults to today in the chosen timezone.",
    )
    parser.add_argument(
        "--days-offset",
        type=int,
        default=0,
        help="Shift the report date by N days. Example: -1 means yesterday.",
    )
    parser.add_argument(
        "--utc-offset",
        default="+08:00",
        help="Local timezone offset, default +08:00.",
    )
    parser.add_argument(
        "--stale-days",
        type=int,
        default=3,
        help="Items staying in inbox for this many days or more become archive candidates.",
    )
    parser.add_argument(
        "--type",
        dest="item_type",
        choices=sorted(export_tools.ITEM_TYPES),
        help="Optional item type filter.",
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
        "--include-describe-then-archive",
        action="store_true",
        help="Also execute items tagged as 补描述后归档.",
    )
    parser.add_argument(
        "--only-id",
        dest="only_ids",
        action="append",
        type=int,
        help="Only execute the selected item id. Repeat this flag for multiple ids.",
    )
    parser.add_argument(
        "--exclude-id",
        dest="exclude_ids",
        action="append",
        type=int,
        help="Skip the selected item id. Repeat this flag for multiple ids.",
    )
    parser.add_argument(
        "--max-items",
        type=int,
        help="Abort when matched candidates exceed this count.",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Really apply archive actions. Default is dry-run.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Write markdown report to file instead of stdout.",
    )
    return parser


def finalize_args(args: argparse.Namespace, parser: argparse.ArgumentParser) -> argparse.Namespace:
    args.root = args.root.expanduser().resolve()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")
    if args.stale_days <= 0:
        parser.error("--stale-days must be greater than 0")
    if args.only_ids and any(item_id <= 0 for item_id in args.only_ids):
        parser.error("--only-id must be greater than 0")
    if args.exclude_ids and any(item_id <= 0 for item_id in args.exclude_ids):
        parser.error("--exclude-id must be greater than 0")
    if args.max_items is not None and args.max_items <= 0:
        parser.error("--max-items must be greater than 0")

    local_tz = report_tools.review_tools.parse_utc_offset(args.utc_offset)
    report_date = report_tools.review_tools.parse_anchor_date(args.date, local_tz)
    report_date = report_tools.review_tools.apply_days_offset(report_date, args.days_offset)
    report_end_local = datetime.combine(report_date, time.max, tzinfo=local_tz)

    args.date = report_date.isoformat()
    args.created_to = report_end_local.astimezone(timezone.utc).isoformat()
    args.local_tz = local_tz
    return args


def parse_args() -> argparse.Namespace:
    parser = build_parser()
    args = parser.parse_args()
    return finalize_args(args, parser)


def main() -> int:
    try:
        args = parse_args()
        rows = export_tools.read_rows(build_query_args(args), args.root)
        items = report_tools.build_processing_items(args, rows)
        entries = build_execution_entries(args, items)
        execute_entries(args, entries)
        markdown = build_markdown(args, entries)
    except (FileNotFoundError, ValueError, sqlite3.Error) as exc:
        print(str(exc), file=sys.stderr)
        return 1

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(markdown, encoding="utf-8", newline="\n")
    else:
        print(markdown, end="")

    if args.apply and any(entry.status == "failed" for entry in entries):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

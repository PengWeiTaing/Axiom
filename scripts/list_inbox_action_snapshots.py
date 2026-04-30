#!/usr/bin/env python3
"""
读取并汇总 Axiom inbox action snapshots。
当前阶段只读文件系统中的历史快照，不直接访问运行中的 receiver。
"""

from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import export_items_markdown as export_tools  # noqa: E402


SNAPSHOT_MODES = {"dry-run", "apply"}


@dataclass
class SnapshotEntry:
    item_id: int
    item_type: str
    action: str
    status: str
    content_preview: str
    source_path: str
    target_path: str
    message: str


@dataclass
class SnapshotRecord:
    path: Path
    mode: str
    report_date: str
    generated_at: str
    total_candidates: int
    by_status: str
    consistency_ok: str | None
    db_file_count: str | None
    inbox_file_count: str | None
    archive_file_count: str | None
    storage_file_count: str | None
    entries: list[SnapshotEntry]


def parse_report_date(text: str, field_name: str) -> str:
    try:
        return datetime.fromisoformat(text).date().isoformat()
    except ValueError as exc:
        raise ValueError(f"{field_name} 必须是 YYYY-MM-DD") from exc


def parse_snapshot(path: Path) -> SnapshotRecord:
    mode = path.parents[2].name
    report_date = path.parent.name

    lines = path.read_text(encoding="utf-8").splitlines()
    metadata: dict[str, str] = {}
    entries: list[SnapshotEntry] = []
    in_entries = False
    current_entry: SnapshotEntry | None = None

    for line in lines:
        if line.startswith("- "):
            key, _, value = line[2:].partition(": ")
            metadata[key] = value
            continue

        if line == "## Entries":
            in_entries = True
            continue

        if line.startswith("## ") and line != "## Entries":
            in_entries = False
            current_entry = None
            continue

        if not in_entries:
            continue

        if line and line[0].isdigit() and ". `[item " in line:
            parts = line.split("`")
            current_entry = SnapshotEntry(
                item_id=int(parts[1].removeprefix("[item ").removesuffix("]")),
                item_type=parts[3],
                action=parts[5],
                status=parts[7],
                content_preview="",
                source_path="",
                target_path="",
                message="",
            )
            entries.append(current_entry)
            continue

        if current_entry is None:
            continue

        stripped = line.strip()
        if stripped.startswith("content: "):
            current_entry.content_preview = stripped.removeprefix("content: ")
        elif stripped.startswith("from: "):
            current_entry.source_path = stripped.removeprefix("from: ")
        elif stripped.startswith("to: "):
            current_entry.target_path = stripped.removeprefix("to: ")
        elif stripped.startswith("message: "):
            current_entry.message = stripped.removeprefix("message: ")

    return SnapshotRecord(
        path=path,
        mode=mode,
        report_date=report_date,
        generated_at=metadata.get("generated_at", ""),
        total_candidates=int(metadata.get("total_candidates", "0")),
        by_status=metadata.get("by_status", "None"),
        consistency_ok=metadata.get("consistency_ok"),
        db_file_count=metadata.get("db_file_count"),
        inbox_file_count=metadata.get("inbox_file_count"),
        archive_file_count=metadata.get("archive_file_count"),
        storage_file_count=metadata.get("storage_file_count"),
        entries=entries,
    )


def iter_snapshot_files(root: Path, mode: str | None) -> list[Path]:
    base_dir = root / "data" / "reviews" / "inbox-actions"
    if not base_dir.exists():
        return []

    matched_modes = [mode] if mode else sorted(SNAPSHOT_MODES)
    paths: list[Path] = []
    for mode_name in matched_modes:
        mode_dir = base_dir / mode_name
        if not mode_dir.exists():
            continue
        paths.extend(sorted(mode_dir.rglob("*.md")))
    return paths


def filter_records(args: argparse.Namespace, records: list[SnapshotRecord]) -> list[SnapshotRecord]:
    filtered = records

    if args.date:
        filtered = [record for record in filtered if record.report_date == args.date]

    if args.date_from:
        filtered = [record for record in filtered if record.report_date >= args.date_from]

    if args.date_to:
        filtered = [record for record in filtered if record.report_date <= args.date_to]

    if args.item_id is not None:
        filtered = [
            record
            for record in filtered
            if any(entry.item_id == args.item_id for entry in record.entries)
        ]

    if args.status:
        filtered = [
            record
            for record in filtered
            if any(entry.status == args.status for entry in record.entries)
        ]

    sort_reverse = args.sort == "newest"
    filtered = sorted(
        filtered,
        key=lambda record: (record.report_date, record.generated_at, str(record.path)),
        reverse=sort_reverse,
    )

    if args.latest_per_date:
        latest_map: dict[tuple[str, str], SnapshotRecord] = {}
        for record in filtered:
            latest_map.setdefault((record.mode, record.report_date), record)
        filtered = list(latest_map.values())
        filtered = sorted(
            filtered,
            key=lambda record: (record.report_date, record.generated_at, str(record.path)),
            reverse=sort_reverse,
        )

    if args.limit is not None:
        filtered = filtered[: args.limit]

    return filtered


def build_markdown(args: argparse.Namespace, root: Path, records: list[SnapshotRecord]) -> str:
    generated_at = datetime.now(timezone.utc).isoformat()
    lines = [
        "# Axiom Inbox Action History",
        "",
        f"- generated_at: {generated_at}",
        f"- root: {root}",
        f"- mode: {args.mode or 'None'}",
        f"- date: {args.date or 'None'}",
        f"- date_from: {args.date_from or 'None'}",
        f"- date_to: {args.date_to or 'None'}",
        f"- item_id: {args.item_id if args.item_id is not None else 'None'}",
        f"- status: {args.status or 'None'}",
        f"- latest_per_date: {args.latest_per_date}",
        f"- details: {args.details}",
        f"- total_snapshots: {len(records)}",
        "",
        "## Snapshots",
        "",
    ]

    if not records:
        lines.append("_No snapshots matched._")
        return "\n".join(lines) + "\n"

    for index, record in enumerate(records, start=1):
        lines.extend(
            [
                f"### {index}. {record.mode} {record.report_date}",
                "",
                f"- generated_at: {record.generated_at or 'None'}",
                f"- snapshot_path: {record.path}",
                f"- total_candidates: {record.total_candidates}",
                f"- by_status: {record.by_status}",
                f"- consistency_ok: {record.consistency_ok or 'None'}",
                f"- db_file_count: {record.db_file_count or 'None'}",
                f"- inbox_file_count: {record.inbox_file_count or 'None'}",
                f"- archive_file_count: {record.archive_file_count or 'None'}",
                f"- storage_file_count: {record.storage_file_count or 'None'}",
            ]
        )

        if args.details:
            lines.extend(["- entries:", ""])
            if not record.entries:
                lines.append("  - None")
            else:
                for entry in record.entries:
                    lines.extend(
                        [
                            f"  - item {entry.item_id} | {entry.item_type} | {entry.action} | {entry.status}",
                            f"    content: {entry.content_preview or 'None'}",
                            f"    from: {entry.source_path or 'None'}",
                            f"    to: {entry.target_path or 'None'}",
                            f"    message: {entry.message or 'None'}",
                        ]
                    )
        lines.append("")

    return "\n".join(lines) + "\n"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="List saved inbox action snapshots.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=export_tools.default_root(),
        help="Axiom root directory.",
    )
    parser.add_argument(
        "--mode",
        choices=sorted(SNAPSHOT_MODES),
        help="Optional snapshot mode filter.",
    )
    parser.add_argument(
        "--date",
        help="Exact report date in YYYY-MM-DD.",
    )
    parser.add_argument(
        "--date-from",
        dest="date_from",
        help="Lower bound report date in YYYY-MM-DD.",
    )
    parser.add_argument(
        "--date-to",
        dest="date_to",
        help="Upper bound report date in YYYY-MM-DD.",
    )
    parser.add_argument(
        "--item-id",
        type=int,
        help="Only include snapshots containing this item id.",
    )
    parser.add_argument(
        "--status",
        help="Only include snapshots containing this entry status, such as dry-run or applied.",
    )
    parser.add_argument(
        "--sort",
        choices=["newest", "oldest"],
        default="newest",
        help="Sort order. Default: newest.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Maximum number of snapshots to show.",
    )
    parser.add_argument(
        "--latest-per-date",
        action="store_true",
        help="Only keep the latest snapshot for each mode + report date.",
    )
    parser.add_argument(
        "--details",
        action="store_true",
        help="Show per-entry details for each snapshot.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Write markdown to file instead of stdout.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")
    if args.item_id is not None and args.item_id <= 0:
        parser.error("--item-id must be greater than 0")

    if args.date:
        args.date = parse_report_date(args.date, "date")
    if args.date_from:
        args.date_from = parse_report_date(args.date_from, "date_from")
    if args.date_to:
        args.date_to = parse_report_date(args.date_to, "date_to")
    if args.date_from and args.date_to and args.date_from > args.date_to:
        parser.error("date_from cannot be later than date_to")

    args.root = args.root.expanduser().resolve()
    return args


def main() -> int:
    try:
        args = parse_args()
        records = [parse_snapshot(path) for path in iter_snapshot_files(args.root, args.mode)]
        records = filter_records(args, records)
        markdown = build_markdown(args, args.root, records)
    except ValueError as exc:
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

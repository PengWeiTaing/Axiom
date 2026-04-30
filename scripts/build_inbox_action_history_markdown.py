#!/usr/bin/env python3
"""
生成 Axiom inbox action history 的日 / 周汇总 Markdown。
当前阶段基于已保存的 action snapshots 聚合，不直接改动任何数据。
"""

from __future__ import annotations

import argparse
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import build_review_markdown as review_tools  # noqa: E402
import list_inbox_action_snapshots as snapshot_tools  # noqa: E402


WINDOW_NAMES = {
    "day": "Daily Inbox Action History",
    "week": "Weekly Inbox Action History",
}


def build_records(args: argparse.Namespace) -> list[snapshot_tools.SnapshotRecord]:
    records = [
        snapshot_tools.parse_snapshot(path)
        for path in snapshot_tools.iter_snapshot_files(args.root, args.mode)
    ]
    return snapshot_tools.filter_records(args, records)


def build_markdown(
    args: argparse.Namespace,
    start_local: datetime,
    end_local: datetime,
    records: list[snapshot_tools.SnapshotRecord],
) -> str:
    generated_at = datetime.now(timezone.utc).isoformat()
    mode_counter = Counter(record.mode for record in records)
    candidate_counter = Counter()
    status_counter = Counter()
    date_counter = Counter(record.report_date for record in records)
    grouped: dict[str, list[snapshot_tools.SnapshotRecord]] = {}

    for record in records:
        grouped.setdefault(record.report_date, []).append(record)
        for entry in record.entries:
            candidate_counter[entry.action] += 1
            status_counter[entry.status] += 1

    lines = [
        f"# Axiom {WINDOW_NAMES[args.window]}",
        "",
        f"- generated_at: {generated_at}",
        f"- window: {args.window}",
        f"- anchor_date: {args.date}",
        f"- days_offset: {args.days_offset}",
        f"- local_timezone: {args.utc_offset}",
        f"- local_range: {start_local.isoformat()} -> {end_local.isoformat()}",
        f"- report_date_range: {args.date_from} -> {args.date_to}",
        f"- mode: {args.mode or 'None'}",
        f"- item_id: {args.item_id if args.item_id is not None else 'None'}",
        f"- status: {args.status or 'None'}",
        f"- latest_per_date: {args.latest_per_date}",
        f"- total_snapshots: {len(records)}",
        "",
        "## Summary",
        "",
        "- by_mode: " + (", ".join(f"{key}={value}" for key, value in sorted(mode_counter.items())) or "None"),
        "- by_report_date: " + (", ".join(f"{key}={value}" for key, value in sorted(date_counter.items())) or "None"),
        "- by_action: " + (", ".join(f"{key}={value}" for key, value in sorted(candidate_counter.items())) or "None"),
        "- by_status: " + (", ".join(f"{key}={value}" for key, value in sorted(status_counter.items())) or "None"),
        "",
        "## Days",
        "",
    ]

    if not records:
        lines.append("_No action snapshots matched._")
        return "\n".join(lines) + "\n"

    for report_date in sorted(grouped):
        day_records = grouped[report_date]
        day_mode_counter = Counter(record.mode for record in day_records)
        day_action_counter = Counter()
        day_status_counter = Counter()

        for record in day_records:
            for entry in record.entries:
                day_action_counter[entry.action] += 1
                day_status_counter[entry.status] += 1

        lines.extend(
            [
                f"### {report_date}",
                "",
                f"- total_snapshots: {len(day_records)}",
                "- by_mode: " + (", ".join(f"{key}={value}" for key, value in sorted(day_mode_counter.items())) or "None"),
                "- by_action: " + (", ".join(f"{key}={value}" for key, value in sorted(day_action_counter.items())) or "None"),
                "- by_status: " + (", ".join(f"{key}={value}" for key, value in sorted(day_status_counter.items())) or "None"),
                "",
            ]
        )

        for index, record in enumerate(day_records, start=1):
            lines.extend(
                [
                    f"{index}. `{record.mode}` `{record.generated_at or 'None'}` candidates={record.total_candidates}",
                    f"   snapshot_path: {record.path}",
                    f"   consistency_ok: {record.consistency_ok or 'None'}",
                    f"   by_status: {record.by_status}",
                    "",
                ]
            )

            if args.details:
                if not record.entries:
                    lines.append("   entries: None")
                    lines.append("")
                    continue

                for entry in record.entries:
                    lines.extend(
                        [
                            f"   - item {entry.item_id} | {entry.item_type} | {entry.action} | {entry.status}",
                            f"     content: {entry.content_preview or 'None'}",
                            f"     from: {entry.source_path or 'None'}",
                            f"     to: {entry.target_path or 'None'}",
                            f"     message: {entry.message or 'None'}",
                        ]
                    )
                lines.append("")

    lines.extend(
        [
            "## Notes",
            "",
            "- 这是对已保存 action snapshots 的聚合视图，不会重新执行任何 inbox 动作。",
            "- 若要查看单份快照全文，可直接打开对应 snapshot_path。",
            "",
        ]
    )
    return "\n".join(lines) + "\n"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build a daily or weekly inbox action history summary.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=snapshot_tools.export_tools.default_root(),
        help="Axiom root directory.",
    )
    parser.add_argument(
        "--window",
        choices=["day", "week"],
        default="day",
        help="History window. day = one local day, week = latest 7 local days.",
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
        "--mode",
        choices=sorted(snapshot_tools.SNAPSHOT_MODES),
        help="Optional snapshot mode filter.",
    )
    parser.add_argument(
        "--item-id",
        type=int,
        help="Only include snapshots containing this item id.",
    )
    parser.add_argument(
        "--status",
        help="Only include snapshots containing this entry status.",
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
        "--limit",
        type=int,
        help="Maximum number of snapshots to include after filtering.",
    )
    parser.add_argument(
        "--sort",
        choices=["newest", "oldest"],
        default="newest",
        help="Sort order. Default: newest.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Write markdown to a file instead of stdout.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")
    if args.item_id is not None and args.item_id <= 0:
        parser.error("--item-id must be greater than 0")

    local_tz = review_tools.parse_utc_offset(args.utc_offset)
    anchor_date = review_tools.parse_anchor_date(args.date, local_tz)
    anchor_date = review_tools.apply_days_offset(anchor_date, args.days_offset)
    start_local, end_local = review_tools.build_window(args.window, anchor_date, local_tz)

    args.date = anchor_date.isoformat()
    args.date_from = start_local.date().isoformat()
    args.date_to = end_local.date().isoformat()
    args.start_local = start_local
    args.end_local = end_local
    args.root = args.root.expanduser().resolve()
    return args


def main() -> int:
    try:
        args = parse_args()
        records = build_records(args)
        markdown = build_markdown(args, args.start_local, args.end_local, records)
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

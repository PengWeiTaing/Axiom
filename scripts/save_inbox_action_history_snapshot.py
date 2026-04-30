#!/usr/bin/env python3
"""
保存 Axiom inbox action history 的日 / 周汇总快照。
当前阶段只负责基于已有 action snapshots 生成与落盘。
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import build_inbox_action_history_markdown as history_tools  # noqa: E402


def build_output_path(root: Path, window: str, anchor_date: str) -> Path:
    year = anchor_date[:4]
    if window == "day":
        return root / "data" / "reviews" / "inbox-action-history" / "daily" / year / f"{anchor_date}.md"
    return root / "data" / "reviews" / "inbox-action-history" / "weekly" / year / f"{anchor_date}.md"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate and save a daily or weekly inbox action history snapshot.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=history_tools.snapshot_tools.export_tools.default_root(),
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
        choices=sorted(history_tools.snapshot_tools.SNAPSHOT_MODES),
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
        help="Optional explicit output path. Defaults to data/reviews/inbox-action-history/<window>/<year>/<date>.md",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing snapshot file.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")
    if args.item_id is not None and args.item_id <= 0:
        parser.error("--item-id must be greater than 0")

    local_tz = history_tools.review_tools.parse_utc_offset(args.utc_offset)
    anchor_date = history_tools.review_tools.parse_anchor_date(args.date, local_tz)
    anchor_date = history_tools.review_tools.apply_days_offset(anchor_date, args.days_offset)
    start_local, end_local = history_tools.review_tools.build_window(args.window, anchor_date, local_tz)

    args.date = anchor_date.isoformat()
    args.date_from = start_local.date().isoformat()
    args.date_to = end_local.date().isoformat()
    args.start_local = start_local
    args.end_local = end_local
    args.root = args.root.expanduser().resolve()

    if args.output is None:
        args.output = build_output_path(args.root, args.window, args.date)
    else:
        args.output = args.output.expanduser().resolve()

    return args


def main() -> int:
    try:
        args = parse_args()
        if args.output.exists() and not args.force:
            print(f"snapshot already exists: {args.output}", file=sys.stderr)
            return 1

        records = history_tools.build_records(args)
        markdown = history_tools.build_markdown(args, args.start_local, args.end_local, records)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(markdown, encoding="utf-8", newline="\n")
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    print(f"saved inbox action history snapshot: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

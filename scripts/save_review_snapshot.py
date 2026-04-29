#!/usr/bin/env python3
"""
将日回顾或周回顾底稿保存到 Axiom 数据目录。
当前阶段只负责生成与落盘，不做定时调度。
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import build_review_markdown as review_tools  # noqa: E402


def build_output_path(root: Path, window: str, anchor_date: str) -> Path:
    year = anchor_date[:4]
    if window == "day":
        return root / "data" / "reviews" / "daily" / year / f"{anchor_date}.md"
    return root / "data" / "reviews" / "weekly" / year / f"{anchor_date}.md"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate and save a daily or weekly review snapshot.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=review_tools.export_tools.default_root(),
        help="Axiom root directory.",
    )
    parser.add_argument(
        "--deploy-root",
        default=review_tools.export_tools.DEFAULT_DEPLOY_ROOT,
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
        "--utc-offset",
        default="+08:00",
        help="Local timezone offset, default +08:00.",
    )
    parser.add_argument(
        "--type",
        dest="item_type",
        choices=sorted(review_tools.export_tools.ITEM_TYPES),
        help="Optional item type filter.",
    )
    parser.add_argument(
        "--storage",
        choices=sorted(review_tools.export_tools.STORAGE_TYPES),
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
        help="Optional explicit output path. Defaults to data/reviews/<window>/<year>/<date>.md",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing snapshot file.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")

    local_tz = review_tools.parse_utc_offset(args.utc_offset)
    anchor_date = review_tools.parse_anchor_date(args.date, local_tz)
    start_local, end_local = review_tools.build_window(args.window, anchor_date, local_tz)

    args.date = anchor_date.isoformat()
    args.root = args.root.expanduser().resolve()
    args.created_from = start_local.astimezone(review_tools.timezone.utc).isoformat()
    args.created_to = end_local.astimezone(review_tools.timezone.utc).isoformat()
    args.start_local = start_local
    args.end_local = end_local

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

        query_args = review_tools.build_query_args(args, args.created_from, args.created_to)
        rows = review_tools.export_tools.read_rows(query_args, args.root)
        markdown = review_tools.build_markdown(args, args.start_local, args.end_local, rows)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(markdown, encoding="utf-8", newline="\n")
    except (FileNotFoundError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1

    print(f"saved review snapshot: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

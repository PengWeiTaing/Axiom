#!/usr/bin/env python3
"""
保存 Axiom inbox 处理报告快照。
当前阶段只负责生成与落盘，不自动改动 inbox 条目。
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import build_inbox_processing_report as processing_tools  # noqa: E402


def build_output_path(root: Path, report_date: str) -> Path:
    year = report_date[:4]
    return root / "data" / "reviews" / "inbox" / year / f"{report_date}.md"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate and save a rule-based inbox processing snapshot.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=processing_tools.export_tools.default_root(),
        help="Axiom root directory.",
    )
    parser.add_argument(
        "--deploy-root",
        default=processing_tools.export_tools.DEFAULT_DEPLOY_ROOT,
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
        choices=sorted(processing_tools.export_tools.ITEM_TYPES),
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
        "--output",
        type=Path,
        help="Optional explicit output path. Defaults to data/reviews/inbox/<year>/<date>.md",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing snapshot file.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")
    if args.stale_days <= 0:
        parser.error("--stale-days must be greater than 0")

    local_tz = processing_tools.review_tools.parse_utc_offset(args.utc_offset)
    report_date = processing_tools.review_tools.parse_anchor_date(args.date, local_tz)
    report_date = processing_tools.review_tools.apply_days_offset(report_date, args.days_offset)
    report_end_local = processing_tools.datetime.combine(
        report_date,
        processing_tools.time.max,
        tzinfo=local_tz,
    )

    args.date = report_date.isoformat()
    args.root = args.root.expanduser().resolve()
    args.created_to = report_end_local.astimezone(processing_tools.timezone.utc).isoformat()

    if args.output is None:
        args.output = build_output_path(args.root, args.date)
    else:
        args.output = args.output.expanduser().resolve()

    return args


def main() -> int:
    try:
        args = parse_args()
        if args.output.exists() and not args.force:
            print(f"snapshot already exists: {args.output}", file=sys.stderr)
            return 1

        rows = processing_tools.export_tools.read_rows(
            processing_tools.build_query_args(args),
            args.root,
        )
        items = processing_tools.build_processing_items(args, rows)
        markdown = processing_tools.build_markdown(args, items)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(markdown, encoding="utf-8", newline="\n")
    except (FileNotFoundError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1

    print(f"saved inbox processing snapshot: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

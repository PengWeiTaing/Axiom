#!/usr/bin/env python3
"""
统一执行并记录 Axiom 自动化任务。
供 systemd timer 或手动命令行调用，复用 receiver 中的运行历史与锁逻辑。
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run an Axiom automation job and persist the execution record.",
    )
    parser.add_argument(
        "--job-id",
        required=True,
        help="Automation job id defined in core.receiver.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=Path("/opt/axiom"),
        help="Axiom root directory. Default: /opt/axiom",
    )
    parser.add_argument(
        "--date",
        help="Anchor local date in YYYY-MM-DD. Defaults to today in the chosen timezone.",
    )
    parser.add_argument(
        "--days-offset",
        type=int,
        default=0,
        help="Shift the anchor local date by N days. Example: -1 means yesterday.",
    )
    parser.add_argument(
        "--utc-offset",
        default=os.environ.get("AXIOM_LOCAL_UTC_OFFSET", "+08:00"),
        help="Local timezone offset, default +08:00.",
    )
    parser.add_argument(
        "--skip-when-unavailable",
        action="store_true",
        help="If the job runtime is unavailable, record a skipped run and exit 0.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    os.environ["AXIOM_ROOT"] = str(args.root.expanduser().resolve())
    os.environ["AXIOM_LOCAL_UTC_OFFSET"] = args.utc_offset

    from core import receiver  # noqa: WPS433

    if args.job_id not in receiver.AUTOMATION_JOBS:
        print(f"unknown job id: {args.job_id}", file=sys.stderr)
        return 1

    try:
        run_date = receiver.resolve_run_date_value(
            args.date,
            days_offset=args.days_offset,
            utc_offset_text=args.utc_offset,
        )
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    payload, status = receiver.execute_logged_automation_job(
        args.job_id,
        run_date,
        skip_when_unavailable=args.skip_when_unavailable,
    )
    print(json.dumps(payload, ensure_ascii=False, indent=2))

    if status == 200:
        return 0
    if status == 409:
        return 2
    if status == 504:
        return 124
    return 1


if __name__ == "__main__":
    raise SystemExit(main())

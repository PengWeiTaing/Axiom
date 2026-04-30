#!/usr/bin/env python3
"""
保存 Axiom inbox 执行动作快照。
当前阶段负责把 dry-run / apply 结果标准化落盘，并附带一致性检查摘要。
"""

from __future__ import annotations

import argparse
import sys
from datetime import datetime
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import apply_inbox_actions as action_tools  # noqa: E402
import check_consistency as consistency_tools  # noqa: E402


def build_output_path(
    root: Path,
    report_date: str,
    mode: str,
    generated_local_at: datetime,
) -> Path:
    year = report_date[:4]
    filename = generated_local_at.strftime("%Y%m%d_%H%M%S_%f") + ".md"
    return root / "data" / "reviews" / "inbox-actions" / mode / year / report_date / filename


def append_post_check(markdown: str, report: dict) -> str:
    lines = [markdown.rstrip(), "", "## Post Checks", ""]
    lines.extend(
        [
            f"- consistency_ok: {report['ok']}",
            f"- db_file_count: {report['db_file_count']}",
            f"- inbox_file_count: {report['inbox_file_count']}",
            f"- archive_file_count: {report['archive_file_count']}",
            f"- storage_file_count: {report['storage_file_count']}",
        ]
    )

    if report["missing_files"]:
        lines.append("- missing_files:")
        lines.extend(f"  - {path}" for path in report["missing_files"])

    if report["orphan_files"]:
        lines.append("- orphan_files:")
        lines.extend(f"  - {path}" for path in report["orphan_files"])

    if report["missing_path_rows"]:
        lines.append("- missing_path_rows:")
        lines.extend(
            f"  - id={row['id']} type={row['type']} file_path={row['file_path']}"
            for row in report["missing_path_rows"]
        )

    return "\n".join(lines) + "\n"


def parse_args() -> argparse.Namespace:
    parser = action_tools.build_parser()
    parser.description = "Run inbox actions and save a standard markdown snapshot."
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite the output file when --output already exists.",
    )
    args = parser.parse_args()
    args = action_tools.finalize_args(args, parser)

    generated_local_at = datetime.now(args.local_tz)
    args.generated_local_at = generated_local_at
    args.mode = "apply" if args.apply else "dry-run"

    if args.output is None:
        args.output = build_output_path(args.root, args.date, args.mode, generated_local_at)
    else:
        args.output = args.output.expanduser().resolve()

    return args


def main() -> int:
    try:
        args = parse_args()
        if args.output.exists() and not args.force:
            print(f"snapshot already exists: {args.output}", file=sys.stderr)
            return 1

        rows = action_tools.export_tools.read_rows(action_tools.build_query_args(args), args.root)
        items = action_tools.report_tools.build_processing_items(args, rows)
        entries = action_tools.build_execution_entries(args, items)
        action_tools.execute_entries(args, entries)
        markdown = action_tools.build_markdown(args, entries)
        consistency_report = consistency_tools.build_report(args.root, args.deploy_root)
        markdown = append_post_check(markdown, consistency_report)

        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(markdown, encoding="utf-8", newline="\n")
    except (FileNotFoundError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1

    print(f"saved inbox action snapshot: {args.output}")

    if args.apply and any(entry.status == "failed" for entry in entries):
        return 1
    return 0 if consistency_report["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""
生成 Axiom inbox 的非 AI 处理报告。
当前阶段只做规则判断和 Markdown 输出，不直接改动数据。
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import Counter
from dataclasses import dataclass
from datetime import date, datetime, time, timezone
from pathlib import Path
from types import SimpleNamespace


SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

import build_review_markdown as review_tools  # noqa: E402
import export_items_markdown as export_tools  # noqa: E402


ACTION_ORDER = [
    "补描述后归档",
    "补描述",
    "归档候选",
    "继续保留",
    "检查空内容",
]

DATETIME_LIKE_PATTERNS = [
    re.compile(r"^\d{4}[-/]\d{1,2}[-/]\d{1,2}(?:[ T]\d{1,2}:\d{2}(?::\d{2})?)?$"),
    re.compile(r"^\d{4}年\d{1,2}月\d{1,2}日(?:\s*(?:上午|下午)\d{1,2}:\d{2})?$"),
    re.compile(r"^\d{4}.\d{1,2}.\d{1,2}.*\d{1,2}:\d{2}$"),
]
IMAGE_FILE_SUFFIXES = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".heif"}


@dataclass
class ProcessingItem:
    item_id: int
    item_type: str
    source: str
    created_at: str
    local_created_at: str
    age_days: int
    content_preview: str
    file_path: str
    file_size_bytes: int | None
    action: str
    reasons: list[str]


def preview_content(text: str, limit: int = 120) -> str:
    cleaned = " ".join(text.strip().split())
    if not cleaned:
        return "_空_"
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[: limit - 3] + "..."


def is_weak_image_description(content: str) -> bool:
    text = content.strip()
    if not text:
        return True

    suffix = Path(text).suffix.lower()
    if suffix in IMAGE_FILE_SUFFIXES:
        return True

    return any(pattern.fullmatch(text) for pattern in DATETIME_LIKE_PATTERNS)


def decide_action(
    item_type: str,
    content: str,
    age_days: int,
    stale_days: int,
) -> tuple[str, list[str]]:
    has_content = bool(content.strip())
    is_stale = age_days >= stale_days
    weak_image_description = item_type == "image" and is_weak_image_description(content)

    if weak_image_description and is_stale:
        return "补描述后归档", ["图片描述偏弱", f"已在 inbox 停留 {age_days} 天"]

    if weak_image_description:
        return "补描述", ["图片描述偏弱"]

    if not has_content:
        return "检查空内容", ["内容为空"]

    if is_stale:
        return "归档候选", [f"已在 inbox 停留 {age_days} 天"]

    return "继续保留", [f"仍在最近 {stale_days} 天窗口内"]


def build_query_args(args: argparse.Namespace) -> SimpleNamespace:
    return SimpleNamespace(
        root=args.root,
        deploy_root=args.deploy_root,
        created_from=None,
        created_to=args.created_to,
        item_type=args.item_type,
        storage="inbox",
        source=args.source,
        sort="oldest",
        limit=args.limit,
    )


def build_processing_items(args: argparse.Namespace, rows: list) -> list[ProcessingItem]:
    local_tz = review_tools.parse_utc_offset(args.utc_offset)
    report_date = date.fromisoformat(args.date)
    items: list[ProcessingItem] = []

    for row in rows:
        local_created = review_tools.to_local_datetime(row["created_at"], local_tz)
        age_days = (report_date - local_created.date()).days
        effective_text = export_tools.pick_primary_text(row)
        action, reasons = decide_action(
            row["type"] or "unknown",
            effective_text,
            age_days,
            args.stale_days,
        )

        resolved_path = export_tools.resolve_file_path(
            args.root,
            row["file_path"],
            args.deploy_root,
        )
        file_size = resolved_path.stat().st_size if resolved_path and resolved_path.exists() else None

        items.append(
            ProcessingItem(
                item_id=row["id"],
                item_type=row["type"] or "unknown",
                source=row["source"] or "unknown",
                created_at=row["created_at"],
                local_created_at=local_created.isoformat(),
                age_days=age_days,
                content_preview=preview_content(effective_text),
                file_path=row["file_path"] or "None",
                file_size_bytes=file_size,
                action=action,
                reasons=reasons,
            )
        )

    return items


def build_action_command(
    args: argparse.Namespace,
    *,
    script_name: str,
    apply: bool,
    include_describe_then_archive: bool = False,
    only_ids: list[int] | None = None,
) -> str:
    command_parts = [
        "python",
        f"scripts/{script_name}",
        "--date",
        args.date,
        "--utc-offset",
        args.utc_offset,
        "--stale-days",
        str(args.stale_days),
    ]

    if args.item_type:
        command_parts.extend(["--type", args.item_type])
    if args.source:
        command_parts.extend(["--source", args.source])
    if args.limit:
        command_parts.extend(["--limit", str(args.limit)])
    if include_describe_then_archive:
        command_parts.append("--include-describe-then-archive")
    for item_id in only_ids or []:
        command_parts.extend(["--only-id", str(item_id)])
    if apply:
        command_parts.append("--apply")

    return " ".join(command_parts)


def build_markdown(args: argparse.Namespace, items: list[ProcessingItem]) -> str:
    generated_at = datetime.now(timezone.utc).isoformat()
    action_counter = Counter(item.action for item in items)
    type_counter = Counter(item.item_type for item in items)
    source_counter = Counter(item.source for item in items)

    grouped: dict[str, list[ProcessingItem]] = {}
    for item in items:
        grouped.setdefault(item.action, []).append(item)

    archive_candidate_ids = [item.item_id for item in grouped.get("归档候选", [])]
    describe_then_archive_ids = [item.item_id for item in grouped.get("补描述后归档", [])]

    lines: list[str] = [
        "# Axiom Inbox 处理报告",
        "",
        f"- generated_at: {generated_at}",
        f"- report_date: {args.date}",
        f"- days_offset: {args.days_offset}",
        f"- local_timezone: {args.utc_offset}",
        f"- stale_days: {args.stale_days}",
        f"- created_to: {args.created_to}",
        f"- total: {len(items)}",
        f"- type: {args.item_type or 'None'}",
        f"- source: {args.source or 'None'}",
        "",
        "## 汇总",
        "",
        "- by_action: " + (", ".join(f"{key}={value}" for key, value in sorted(action_counter.items())) or "None"),
        "- by_type: " + (", ".join(f"{key}={value}" for key, value in sorted(type_counter.items())) or "None"),
        "- by_source: " + (", ".join(f"{key}={value}" for key, value in sorted(source_counter.items())) or "None"),
        "",
        "## 分组",
        "",
    ]

    if not items:
        lines.append("_当前 inbox 没有命中条目。_")
        return "\n".join(lines) + "\n"

    for action in ACTION_ORDER:
        action_items = grouped.get(action, [])
        if not action_items:
            continue

        lines.extend(
            [
                f"### {action}",
                "",
                f"- total: {len(action_items)}",
                "",
            ]
        )

        for index, item in enumerate(action_items, start=1):
            reason_text = "；".join(item.reasons)
            lines.extend(
                [
                    f"{index}. `[item {item.item_id}]` `{item.item_type}` `{item.source}` `{item.local_created_at}`",
                    f"   age_days: {item.age_days}",
                    f"   reason: {reason_text}",
                    f"   content: {item.content_preview}",
                    f"   file_path: {item.file_path}",
                    f"   file_size_bytes: {item.file_size_bytes if item.file_size_bytes is not None else 'None'}",
                    "",
                ]
            )

    lines.extend(
        [
            "## 建议命令",
            "",
            "- 先做安全预览：",
            f"  `{build_action_command(args, script_name='save_inbox_action_snapshot.py', apply=False)}`",
        ]
    )

    if archive_candidate_ids:
        lines.extend(
            [
                "- 预览当前全部归档候选：",
                f"  `{build_action_command(args, script_name='save_inbox_action_snapshot.py', apply=False, only_ids=archive_candidate_ids)}`",
                "- 真正执行当前全部归档候选：",
                f"  `{build_action_command(args, script_name='save_inbox_action_snapshot.py', apply=True)}`",
            ]
        )

    if describe_then_archive_ids:
        lines.extend(
            [
                "- 若确认“补描述后归档”也可直接归档，先预览：",
                f"  `{build_action_command(args, script_name='save_inbox_action_snapshot.py', apply=False, include_describe_then_archive=True, only_ids=describe_then_archive_ids)}`",
            ]
        )

    selected_ids = archive_candidate_ids + describe_then_archive_ids
    if selected_ids:
        only_id_parts = " ".join(f"--only-id {item_id}" for item_id in selected_ids)
        lines.extend(
            [
                "- 若只想处理其中几个 item，可按 id 组合：",
                f"  `python scripts/save_inbox_action_snapshot.py --date {args.date} --utc-offset {args.utc_offset} --stale-days {args.stale_days} {only_id_parts}`",
            ]
        )

    lines.append("")
    lines.extend(
        [
            "## 说明",
            "",
            "- 这是规则化处理报告，只给出建议动作，不会自动改动存储状态。",
            "- 当前默认只检查 storage=inbox 的条目。",
            "- 若想给执行再加一层保险，可在建议命令后手动补 `--max-items 1` 这类限制。",
            "",
        ]
    )
    return "\n".join(lines) + "\n"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build a rule-based inbox processing report.",
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
        "--output",
        type=Path,
        help="Write markdown to file instead of stdout.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")
    if args.stale_days <= 0:
        parser.error("--stale-days must be greater than 0")

    local_tz = review_tools.parse_utc_offset(args.utc_offset)
    report_date = review_tools.parse_anchor_date(args.date, local_tz)
    report_date = review_tools.apply_days_offset(report_date, args.days_offset)
    report_end_local = datetime.combine(report_date, time.max, tzinfo=local_tz)

    args.date = report_date.isoformat()
    args.root = args.root.expanduser().resolve()
    args.created_to = report_end_local.astimezone(timezone.utc).isoformat()
    return args


def main() -> int:
    try:
        args = parse_args()
        rows = export_tools.read_rows(build_query_args(args), args.root)
        items = build_processing_items(args, rows)
        markdown = build_markdown(args, items)
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

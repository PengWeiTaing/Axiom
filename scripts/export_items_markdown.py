#!/usr/bin/env python3
"""
按时间窗口和基础过滤条件导出 Axiom 条目，生成一份可读的 Markdown。
当前阶段只做文件索引层导出，不接 AI，不改数据库结构。
"""

from __future__ import annotations

import argparse
import os
import sqlite3
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath


DEFAULT_DEPLOY_ROOT = "/opt/axiom"
ITEM_TYPES = {"text", "image"}
STORAGE_TYPES = {"inbox", "archive"}


def default_root() -> Path:
    env_root = os.environ.get("AXIOM_ROOT")
    if env_root:
        return Path(env_root).expanduser().resolve()

    vps_root = Path("/opt/axiom")
    if vps_root.exists():
        return vps_root.resolve()

    return Path(__file__).resolve().parents[1]


def parse_datetime_filter(
    value: str,
    field_name: str,
    *,
    end_of_day: bool = False,
) -> str:
    text = value.strip()
    if not text:
        raise ValueError(f"{field_name} 不能为空")

    try:
        if len(text) == 10:
            dt = datetime.fromisoformat(text)
            if end_of_day:
                dt = dt.replace(hour=23, minute=59, second=59, microsecond=999999)
            else:
                dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)
        else:
            dt = datetime.fromisoformat(text.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValueError(f"{field_name} 必须是 ISO 时间或 YYYY-MM-DD") from exc

    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)

    return dt.astimezone(timezone.utc).isoformat()


def resolve_file_path(
    root: Path,
    file_path: str | None,
    deploy_root: str = DEFAULT_DEPLOY_ROOT,
) -> Path | None:
    if not file_path:
        return None

    raw_path = file_path.strip()
    normalized_path = raw_path.replace("\\", "/")
    normalized_deploy_root = deploy_root.rstrip("/")

    if (
        normalized_path == normalized_deploy_root
        or normalized_path.startswith(f"{normalized_deploy_root}/")
    ):
        relative_text = normalized_path[len(normalized_deploy_root) :].lstrip("/")
        relative_parts = PurePosixPath(relative_text).parts
        return (root / Path(*relative_parts)).resolve()

    path = Path(raw_path).expanduser()
    if path.is_absolute():
        return path.resolve()

    return (root / path).resolve()


def detect_storage(root: Path, resolved_path: Path | None) -> str | None:
    if resolved_path is None:
        return None

    inbox_path = (root / "data" / "inbox").resolve()
    archive_path = (root / "data" / "archive").resolve()

    try:
        resolved_path.relative_to(inbox_path)
        return "inbox"
    except ValueError:
        pass

    try:
        resolved_path.relative_to(archive_path)
        return "archive"
    except ValueError:
        return None


def build_where_clause(args: argparse.Namespace, root: Path) -> tuple[str, list[str]]:
    conditions: list[str] = []
    params: list[str] = []

    if args.item_type:
        conditions.append("type = ?")
        params.append(args.item_type)

    if args.source:
        conditions.append("source = ?")
        params.append(args.source)

    if args.created_from:
        conditions.append("created_at >= ?")
        params.append(args.created_from)

    if args.created_to:
        conditions.append("created_at <= ?")
        params.append(args.created_to)

    if args.storage:
        storage_path = str((root / "data" / args.storage).resolve())
        conditions.append("(file_path = ? OR file_path LIKE ?)")
        params.extend([storage_path, f"{storage_path}{os.sep}%"])

    if not conditions:
        return "", params

    return "WHERE " + " AND ".join(conditions), params


def read_rows(args: argparse.Namespace, root: Path) -> list[sqlite3.Row]:
    db_path = root / "db" / "axiom.db"
    if not db_path.exists():
        raise FileNotFoundError(f"数据库不存在: {db_path}")

    order_clause = "created_at ASC, id ASC" if args.sort == "oldest" else "created_at DESC, id DESC"
    where_clause, params = build_where_clause(args, root)
    limit_clause = ""
    if args.limit:
        limit_clause = "LIMIT ?"
        params.append(args.limit)

    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    try:
        rows = conn.execute(
            f"""
            SELECT id, type, content, file_path, source, created_at
            FROM items
            {where_clause}
            ORDER BY {order_clause}
            {limit_clause}
            """,
            params,
        ).fetchall()
    finally:
        conn.close()

    return list(rows)


def format_multiline_block(text: str) -> list[str]:
    if not text.strip():
        return ["", "_空_"]

    return [""] + [line for line in text.splitlines()]


def build_markdown(args: argparse.Namespace, root: Path, rows: list[sqlite3.Row]) -> str:
    generated_at = datetime.now(timezone.utc).isoformat()
    type_counter = Counter(row["type"] or "unknown" for row in rows)
    source_counter = Counter(row["source"] or "unknown" for row in rows)
    storage_counter = Counter(
        detect_storage(root, resolve_file_path(root, row["file_path"], args.deploy_root)) or "unknown"
        for row in rows
    )

    lines: list[str] = [
        "# Axiom Export",
        "",
        "- generated_at: " + generated_at,
        "- root: " + str(root),
        "- total: " + str(len(rows)),
        "- sort: " + args.sort,
        "- created_from: " + (args.created_from or "None"),
        "- created_to: " + (args.created_to or "None"),
        "- type: " + (args.item_type or "None"),
        "- storage: " + (args.storage or "None"),
        "- source: " + (args.source or "None"),
        "",
        "## Summary",
        "",
        "- by_type: " + (", ".join(f"{key}={value}" for key, value in sorted(type_counter.items())) or "None"),
        "- by_source: " + (", ".join(f"{key}={value}" for key, value in sorted(source_counter.items())) or "None"),
        "- by_storage: " + (", ".join(f"{key}={value}" for key, value in sorted(storage_counter.items())) or "None"),
        "",
        "## Items",
        "",
    ]

    if not rows:
        lines.append("_No items matched._")
        return "\n".join(lines) + "\n"

    for index, row in enumerate(rows, start=1):
        resolved_path = resolve_file_path(root, row["file_path"], args.deploy_root)
        storage = detect_storage(root, resolved_path) or "unknown"
        file_size = resolved_path.stat().st_size if resolved_path and resolved_path.exists() else None
        content = row["content"] or ""

        lines.extend(
            [
                f"### {index}. item {row['id']}",
                "",
                f"- created_at: {row['created_at']}",
                f"- type: {row['type']}",
                f"- source: {row['source'] or 'None'}",
                f"- storage: {storage}",
                f"- file_path: {row['file_path'] or 'None'}",
                f"- file_size_bytes: {file_size if file_size is not None else 'None'}",
                "- content:",
            ]
        )
        lines.extend(format_multiline_block(content))
        lines.append("")

    return "\n".join(lines) + "\n"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Export Axiom items to Markdown by time window and basic filters.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=default_root(),
        help="Axiom root directory. Defaults to AXIOM_ROOT, /opt/axiom, or local repo.",
    )
    parser.add_argument(
        "--deploy-root",
        default=DEFAULT_DEPLOY_ROOT,
        help="Map DB file paths under this deployment root to --root. Default: /opt/axiom.",
    )
    parser.add_argument(
        "--created-from",
        dest="created_from",
        help="Lower bound time, ISO format or YYYY-MM-DD.",
    )
    parser.add_argument(
        "--created-to",
        dest="created_to",
        help="Upper bound time, ISO format or YYYY-MM-DD.",
    )
    parser.add_argument(
        "--type",
        dest="item_type",
        choices=sorted(ITEM_TYPES),
        help="Filter by item type.",
    )
    parser.add_argument(
        "--storage",
        choices=sorted(STORAGE_TYPES),
        help="Filter by storage area.",
    )
    parser.add_argument(
        "--source",
        help="Filter by source.",
    )
    parser.add_argument(
        "--sort",
        choices=["oldest", "newest"],
        default="oldest",
        help="Sort order. Default: oldest.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Maximum number of rows to export.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Write markdown to a file instead of stdout.",
    )
    args = parser.parse_args()

    if args.limit is not None and args.limit <= 0:
        parser.error("--limit must be greater than 0")

    if args.created_from:
        args.created_from = parse_datetime_filter(args.created_from, "created_from")

    if args.created_to:
        args.created_to = parse_datetime_filter(
            args.created_to,
            "created_to",
            end_of_day=(len(args.created_to.strip()) == 10),
        )

    if args.created_from and args.created_to and args.created_from > args.created_to:
        parser.error("created_from cannot be later than created_to")

    return args


def main() -> int:
    try:
        args = parse_args()
        root = args.root.expanduser().resolve()
        rows = read_rows(args, root)
        markdown = build_markdown(args, root, rows)
    except (FileNotFoundError, ValueError, sqlite3.Error) as exc:
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

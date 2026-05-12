#!/usr/bin/env python3
"""
检查 Axiom v0.1 的文件和数据库索引是否一致。

当前检查范围：
- 数据库 items.file_path 指向的文件是否存在
- data/inbox 和 data/archive 下的文件是否都有数据库记录
"""

from __future__ import annotations

import argparse
import json
import os
import sqlite3
import sys
from pathlib import Path, PurePosixPath


DEFAULT_DEPLOY_ROOT = "/opt/axiom"


def default_root() -> Path:
    env_root = os.environ.get("AXIOM_ROOT")
    if env_root:
        return Path(env_root).expanduser().resolve()

    vps_root = Path("/opt/axiom")
    if vps_root.exists():
        return vps_root.resolve()

    return Path(__file__).resolve().parents[1]


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


def read_db_file_paths(
    db_path: Path,
    root: Path,
    deploy_root: str,
) -> tuple[set[Path], list[dict]]:
    if not db_path.exists():
        raise FileNotFoundError(f"数据库不存在: {db_path}")

    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    try:
        rows = conn.execute(
            """
            SELECT id, type, file_path
            FROM items
            WHERE file_path IS NOT NULL AND file_path != ''
            """
        ).fetchall()
    finally:
        conn.close()

    db_files: set[Path] = set()
    missing_path_rows: list[dict] = []

    for row in rows:
        resolved_path = resolve_file_path(root, row["file_path"], deploy_root)
        if resolved_path is None:
            missing_path_rows.append(
                {
                    "id": row["id"],
                    "type": row["type"],
                    "file_path": row["file_path"],
                }
            )
            continue
        db_files.add(resolved_path)

    return db_files, missing_path_rows


def read_storage_files(storage_path: Path) -> set[Path]:
    if not storage_path.exists():
        return set()

    return {
        path.resolve()
        for path in storage_path.rglob("*")
        if path.is_file() and not path.name.endswith(".tmp")
    }


def build_report(root: Path, deploy_root: str = DEFAULT_DEPLOY_ROOT) -> dict:
    root = root.resolve()
    db_path = root / "db" / "axiom.db"
    inbox_path = root / "data" / "inbox"
    archive_path = root / "data" / "archive"

    db_files, missing_path_rows = read_db_file_paths(db_path, root, deploy_root)
    inbox_files = read_storage_files(inbox_path)
    archive_files = read_storage_files(archive_path)
    storage_files = inbox_files | archive_files

    missing_files = sorted(
        str(path) for path in db_files if not path.exists()
    )
    orphan_files = sorted(
        str(path) for path in storage_files if path not in db_files
    )

    # FTS5 index check
    fts_ok = True
    fts_count = 0
    items_count = 0
    try:
        conn = sqlite3.connect(str(db_path))
        conn.row_factory = sqlite3.Row
        items_count = conn.execute("SELECT COUNT(*) FROM items").fetchone()[0]
        fts_count = conn.execute("SELECT COUNT(*) FROM items_fts").fetchone()[0]
        conn.close()
        fts_ok = items_count == fts_count
    except sqlite3.OperationalError:
        pass

    return {
        "ok": not missing_files and not orphan_files and not missing_path_rows and fts_ok,
        "root": str(root),
        "db_path": str(db_path),
        "inbox_path": str(inbox_path),
        "archive_path": str(archive_path),
        "deploy_root": deploy_root,
        "db_file_count": len(db_files),
        "inbox_file_count": len(inbox_files),
        "archive_file_count": len(archive_files),
        "storage_file_count": len(storage_files),
        "missing_files": missing_files,
        "orphan_files": orphan_files,
        "missing_path_rows": missing_path_rows,
        "fts_ok": fts_ok,
        "fts_count": fts_count,
        "items_count": items_count,
    }


def print_text_report(report: dict) -> None:
    print(f"Root: {report['root']}")
    print(f"Deploy root mapping: {report['deploy_root']}")
    print(f"DB files: {report['db_file_count']}")
    print(f"Inbox files: {report['inbox_file_count']}")
    print(f"Archive files: {report['archive_file_count']}")

    fts_status = "OK" if report.get("fts_ok") else f"MISMATCH (items:{report.get('items_count',0)} fts:{report.get('fts_count',0)})"
    print(f"FTS5 index: {fts_status}")

    if report["ok"]:
        print("Consistency check passed.")
        return

    print("Consistency check found issues.")

    if report["missing_path_rows"]:
        print("Rows without file_path:")
        for row in report["missing_path_rows"]:
            print(f"  - id={row['id']} type={row['type']}")

    if report["missing_files"]:
        print("DB records whose files are missing:")
        for path in report["missing_files"]:
            print(f"  - {path}")

    if report["orphan_files"]:
        print("Storage files without DB records:")
        for path in report["orphan_files"]:
            print(f"  - {path}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Check Axiom file/database consistency.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=default_root(),
        help="Axiom root directory. Defaults to AXIOM_ROOT, /opt/axiom, or local repo.",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print machine-readable JSON.",
    )
    parser.add_argument(
        "--deploy-root",
        default=DEFAULT_DEPLOY_ROOT,
        help="Map DB paths under this deployment root to --root. Default: /opt/axiom.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    try:
        report = build_report(args.root.expanduser(), args.deploy_root)
    except FileNotFoundError as exc:
        if args.json:
            print(
                json.dumps(
                    {"ok": False, "error": str(exc)},
                    ensure_ascii=False,
                    indent=2,
                )
            )
        else:
            print(str(exc), file=sys.stderr)
        return 2

    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print_text_report(report)

    return 0 if report["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

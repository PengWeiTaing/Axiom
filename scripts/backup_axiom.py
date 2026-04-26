#!/usr/bin/env python3
"""
Create a small, self-contained backup for Axiom v0.1.

The backup includes:
- db/axiom.db, copied through SQLite's backup API when present
- data/inbox/
- data/archive/
- a manifest.json describing what was included
"""

import argparse
import json
import os
import shutil
import sqlite3
import sys
import tempfile
import zipfile
from datetime import datetime
from pathlib import Path


BACKUP_PREFIX = "axiom_backup"


def default_root() -> Path:
    """Prefer the VPS path, but fall back to the local repo for development."""
    env_root = os.environ.get("AXIOM_ROOT")
    if env_root:
        return Path(env_root).expanduser().resolve()

    vps_root = Path("/opt/axiom")
    if vps_root.exists():
        return vps_root.resolve()

    return Path(__file__).resolve().parents[1]


def make_unique_backup_path(backup_dir: Path, timestamp: str) -> Path:
    backup_path = backup_dir / f"{BACKUP_PREFIX}_{timestamp}.zip"
    counter = 1

    while backup_path.exists():
        backup_path = backup_dir / f"{BACKUP_PREFIX}_{timestamp}_{counter}.zip"
        counter += 1

    return backup_path


def backup_sqlite_database(source_path: Path, target_path: Path) -> None:
    """Create a consistent SQLite snapshot without reading a half-written file."""
    target_path.parent.mkdir(parents=True, exist_ok=True)

    source_uri = f"{source_path.resolve().as_uri()}?mode=ro"
    source_conn = sqlite3.connect(source_uri, uri=True)
    target_conn = sqlite3.connect(target_path)

    try:
        source_conn.backup(target_conn)
    finally:
        target_conn.close()
        source_conn.close()


def copy_directory(source_path: Path, target_path: Path) -> None:
    target_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(source_path, target_path)


def write_manifest(
    manifest_path: Path,
    root: Path,
    backup_path: Path,
    included: list[str],
    missing: list[str],
    warnings: list[str],
) -> None:
    manifest = {
        "created_at": datetime.now().isoformat(timespec="seconds"),
        "root": str(root),
        "backup_file": str(backup_path),
        "included": included,
        "missing": missing,
        "warnings": warnings,
    }

    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def zip_directory(source_dir: Path, backup_path: Path) -> None:
    with zipfile.ZipFile(backup_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for path in source_dir.rglob("*"):
            relative_path = path.relative_to(source_dir).as_posix()
            if path.is_dir():
                archive.write(path, f"{relative_path}/")
            elif path.is_file():
                archive.write(path, relative_path)


def prune_old_backups(backup_dir: Path, keep: int) -> list[Path]:
    if keep <= 0:
        return []

    backups = sorted(
        backup_dir.glob(f"{BACKUP_PREFIX}_*.zip"),
        key=lambda path: path.stat().st_mtime,
        reverse=True,
    )
    removed: list[Path] = []

    for old_backup in backups[keep:]:
        old_backup.unlink()
        removed.append(old_backup)

    return removed


def create_backup(root: Path, backup_dir: Path, keep: int, dry_run: bool) -> int:
    root = root.resolve()
    backup_dir = backup_dir.resolve()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = make_unique_backup_path(backup_dir, timestamp)

    targets = [
        ("db/axiom.db", root / "db" / "axiom.db", "sqlite"),
        ("data/inbox", root / "data" / "inbox", "directory"),
        ("data/archive", root / "data" / "archive", "directory"),
    ]

    included: list[str] = []
    missing: list[str] = []
    warnings: list[str] = []

    for relative_name, source_path, _target_type in targets:
        if source_path.exists():
            included.append(relative_name)
        else:
            missing.append(relative_name)

    if not included:
        print(f"No backup targets found under: {root}", file=sys.stderr)
        return 1

    if dry_run:
        print(f"Backup root: {root}")
        print(f"Backup file: {backup_path}")
        print("Would include:")
        for item in included:
            print(f"  - {item}")
        if missing:
            print("Missing:")
            for item in missing:
                print(f"  - {item}")
        return 0

    backup_dir.mkdir(parents=True, exist_ok=True)

    # Keep staging outside the archive and remove it automatically after zipping.
    with tempfile.TemporaryDirectory(prefix=f"{BACKUP_PREFIX}_staging_") as temp_dir:
        staging_dir = Path(temp_dir)

        for relative_name, source_path, target_type in targets:
            if not source_path.exists():
                continue

            target_path = staging_dir / relative_name
            try:
                if target_type == "sqlite":
                    backup_sqlite_database(source_path, target_path)
                else:
                    copy_directory(source_path, target_path)
            except Exception as exc:
                warnings.append(f"Failed to back up {relative_name}: {exc}")

        write_manifest(
            staging_dir / "manifest.json",
            root,
            backup_path,
            included,
            missing,
            warnings,
        )
        zip_directory(staging_dir, backup_path)

    removed = prune_old_backups(backup_dir, keep)

    print(f"Backup created: {backup_path}")
    print("Included:")
    for item in included:
        print(f"  - {item}")
    if missing:
        print("Missing:")
        for item in missing:
            print(f"  - {item}")
    if warnings:
        print("Warnings:")
        for warning in warnings:
            print(f"  - {warning}")
    if removed:
        print("Removed old backups:")
        for old_backup in removed:
            print(f"  - {old_backup}")

    return 0 if not warnings else 2


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Back up Axiom db and data files.")
    parser.add_argument(
        "--root",
        type=Path,
        default=default_root(),
        help="Axiom root directory. Defaults to AXIOM_ROOT, /opt/axiom, or local repo.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=None,
        help="Backup output directory. Defaults to <root>/backup.",
    )
    parser.add_argument(
        "--keep",
        type=int,
        default=0,
        help="Keep only the newest N zip backups. 0 means do not prune.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be backed up without writing a zip file.",
    )

    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = args.root.expanduser()
    backup_dir = args.output_dir.expanduser() if args.output_dir else root / "backup"

    return create_backup(root, backup_dir, args.keep, args.dry_run)


if __name__ == "__main__":
    raise SystemExit(main())

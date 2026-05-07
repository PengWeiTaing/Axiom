#!/usr/bin/env python3
"""
Backfill transcript_text for existing audio items from sidecar transcript files.

This script is meant for audio items that were uploaded before transcript support
was added, or for cases where transcript sidecar files were prepared later.
"""

from __future__ import annotations

import argparse
import json
import os
import sqlite3
import sys
from pathlib import Path, PurePosixPath


REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from core.receiver import (  # noqa: E402
    ITEM_TYPE_AUDIO,
    build_audio_transcript_sidecar_candidates,
    extract_audio_transcript_text_from_file,
    init_db,
)


DEFAULT_DEPLOY_ROOT = "/opt/axiom"


def default_root() -> Path:
    env_root = os.environ.get("AXIOM_ROOT")
    if env_root:
        return Path(env_root).expanduser().resolve()

    vps_root = Path(DEFAULT_DEPLOY_ROOT)
    if vps_root.exists():
        return vps_root.resolve()

    return REPO_ROOT


def resolve_db_path(root: Path) -> Path:
    env_db_path = os.environ.get("AXIOM_DB_PATH")
    if env_db_path:
        return Path(env_db_path).expanduser().resolve()
    return (root / "db" / "axiom.db").resolve()


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


def build_query(item_ids: list[int] | None, limit: int | None) -> tuple[str, list[object]]:
    query = """
        SELECT id, file_path, original_name, mime_type, transcript_text
        FROM items
        WHERE type = ? AND file_path IS NOT NULL AND file_path != ''
        ORDER BY id
    """
    params: list[object] = [ITEM_TYPE_AUDIO]

    if item_ids:
        placeholders = ",".join("?" for _ in item_ids)
        query = query.replace(
            "ORDER BY id",
            f"AND id IN ({placeholders}) ORDER BY id",
        )
        params.extend(item_ids)

    if limit is not None:
        query += " LIMIT ?"
        params.append(limit)

    return query, params


def find_transcript_sidecar(
    file_path: Path,
    original_name: str | None,
    transcript_dir: Path | None,
) -> Path | None:
    for candidate in build_audio_transcript_sidecar_candidates(
        file_path,
        original_name=original_name,
        transcript_dir=transcript_dir,
    ):
        if candidate.exists() and candidate.is_file():
            return candidate
    return None


def backfill_audio_transcript(
    root: Path,
    deploy_root: str = DEFAULT_DEPLOY_ROOT,
    transcript_dir: Path | None = None,
    item_ids: list[int] | None = None,
    limit: int | None = None,
    force: bool = False,
    dry_run: bool = False,
) -> dict:
    root = root.expanduser().resolve()
    db_path = resolve_db_path(root)
    init_db(db_path)

    if transcript_dir is not None:
        transcript_dir = transcript_dir.expanduser().resolve()

    conn = sqlite3.connect(str(db_path), timeout=30)
    conn.row_factory = sqlite3.Row

    summary = {
        "root": str(root),
        "db_path": str(db_path),
        "deploy_root": deploy_root,
        "transcript_dir": str(transcript_dir) if transcript_dir is not None else None,
        "force": force,
        "dry_run": dry_run,
        "scanned": 0,
        "updated": 0,
        "would_update": 0,
        "skipped_existing": 0,
        "skipped_missing_audio": 0,
        "skipped_missing_sidecar": 0,
        "skipped_unextractable": 0,
        "skipped_unchanged": 0,
        "failed": 0,
        "updated_ids": [],
        "matched_sidecars": {},
        "errors": [],
    }

    try:
        query, params = build_query(item_ids, limit)
        rows = conn.execute(query, params).fetchall()

        for row in rows:
            summary["scanned"] += 1
            current_text = (row["transcript_text"] or "").strip()
            if current_text and not force:
                summary["skipped_existing"] += 1
                continue

            resolved_audio_path = resolve_file_path(root, row["file_path"], deploy_root)
            if resolved_audio_path is None or not resolved_audio_path.exists():
                summary["skipped_missing_audio"] += 1
                continue

            sidecar_path = find_transcript_sidecar(
                resolved_audio_path,
                row["original_name"],
                transcript_dir,
            )
            if sidecar_path is None:
                summary["skipped_missing_sidecar"] += 1
                continue

            try:
                transcript_text = extract_audio_transcript_text_from_file(
                    sidecar_path,
                    sidecar_path.name,
                )
            except Exception as exc:  # pragma: no cover - defensive guard
                summary["failed"] += 1
                summary["errors"].append({"id": row["id"], "message": str(exc)})
                continue

            if not transcript_text:
                summary["skipped_unextractable"] += 1
                continue

            if transcript_text == current_text:
                summary["skipped_unchanged"] += 1
                continue

            summary["would_update"] += 1
            summary["matched_sidecars"][str(row["id"])] = str(sidecar_path)
            if dry_run:
                continue

            conn.execute(
                "UPDATE items SET transcript_text = ? WHERE id = ?",
                (transcript_text, row["id"]),
            )
            summary["updated"] += 1
            summary["updated_ids"].append(row["id"])

        if not dry_run:
            conn.commit()
    finally:
        conn.close()

    return summary


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Backfill transcript_text for existing audio items from sidecar transcript files.",
    )
    parser.add_argument(
        "--root",
        type=Path,
        default=default_root(),
        help="Axiom root directory.",
    )
    parser.add_argument(
        "--deploy-root",
        default=DEFAULT_DEPLOY_ROOT,
        help="Deployment root used in stored file paths.",
    )
    parser.add_argument(
        "--transcript-dir",
        type=Path,
        help="Optional directory that stores transcript sidecar files.",
    )
    parser.add_argument(
        "--item-id",
        dest="item_ids",
        type=int,
        action="append",
        help="Only process the given item id. Can be passed multiple times.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        help="Optional row limit after filtering.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Re-import even when transcript_text already exists.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview how many rows would be updated without writing changes.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    summary = backfill_audio_transcript(
        root=args.root,
        deploy_root=args.deploy_root,
        transcript_dir=args.transcript_dir,
        item_ids=args.item_ids,
        limit=args.limit,
        force=args.force,
        dry_run=args.dry_run,
    )
    print(json.dumps(summary, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()

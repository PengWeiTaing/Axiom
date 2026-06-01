"""Review artifact scanning, filtering, and preview helpers."""
from __future__ import annotations

from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import quote

from core.config import (
    ARTIFACT_MODES,
    ARTIFACT_WINDOWS,
    AXIOM_ROOT,
    REVIEWS_PATH,
)


def _is_path_under(path: Path, parent: Path) -> bool:
    try:
        path.relative_to(parent)
        return True
    except ValueError:
        return False


def _isoformat_timestamp(timestamp: float) -> str:
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).isoformat(timespec="seconds")


def build_artifact_file_url(relative_path: Path) -> str:
    relative_text = quote(relative_path.as_posix(), safe="/")
    return f"/artifacts/file/{relative_text}"


def resolve_review_artifact_path(artifact_path_value: str) -> Path:
    artifact_path = (AXIOM_ROOT / artifact_path_value).resolve()
    if not _is_path_under(artifact_path, REVIEWS_PATH):
        raise ValueError("artifact 路径不允许访问")
    return artifact_path


def build_artifact_payload(file_path: Path) -> dict | None:
    try:
        relative_path = file_path.resolve().relative_to(AXIOM_ROOT)
    except ValueError:
        return None

    parts = relative_path.parts
    if len(parts) < 5 or parts[:2] != ("data", "reviews") or file_path.suffix.lower() != ".md":
        return None

    stat_result = file_path.stat()
    payload = {
        "name": file_path.name,
        "relative_path": relative_path.as_posix(),
        "file_url": build_artifact_file_url(relative_path),
        "size_bytes": stat_result.st_size,
        "modified_at": _isoformat_timestamp(stat_result.st_mtime),
    }

    group_dir = parts[2]
    if group_dir in ARTIFACT_WINDOWS and len(parts) == 5:
        payload.update(
            {
                "group": "review",
                "window": group_dir,
                "mode": None,
                "report_date": Path(parts[4]).stem,
            }
        )
        return payload

    if group_dir == "inbox" and len(parts) == 5:
        payload.update(
            {
                "group": "inbox",
                "window": None,
                "mode": None,
                "report_date": Path(parts[4]).stem,
            }
        )
        return payload

    if group_dir == "inbox-actions" and len(parts) == 7:
        mode = parts[3]
        if mode not in ARTIFACT_MODES:
            return None
        payload.update(
            {
                "group": "inbox-actions",
                "window": None,
                "mode": mode,
                "report_date": parts[5],
                "generated_name": Path(parts[6]).stem,
            }
        )
        return payload

    if group_dir == "inbox-action-history" and len(parts) == 6:
        window = parts[3]
        if window not in ARTIFACT_WINDOWS:
            return None
        payload.update(
            {
                "group": "inbox-action-history",
                "window": window,
                "mode": None,
                "report_date": Path(parts[5]).stem,
            }
        )
        return payload

    if group_dir == "audio-transcripts" and len(parts) == 5:
        payload.update(
            {
                "group": "audio-transcripts",
                "window": None,
                "mode": None,
                "report_date": Path(parts[4]).stem,
            }
        )
        return payload

    if group_dir == "image-descriptions" and len(parts) == 5:
        payload.update(
            {
                "group": "image-descriptions",
                "window": None,
                "mode": None,
                "report_date": Path(parts[4]).stem,
            }
        )
        return payload

    if group_dir == "system-status" and len(parts) == 5:
        payload.update(
            {
                "group": "system-status",
                "window": None,
                "mode": None,
                "report_date": Path(parts[4]).stem,
            }
        )
        return payload

    return None


def list_review_artifacts() -> list[dict]:
    if not REVIEWS_PATH.exists():
        return []

    artifacts: list[dict] = []
    for file_path in REVIEWS_PATH.rglob("*.md"):
        if not file_path.is_file():
            continue
        payload = build_artifact_payload(file_path)
        if payload is not None:
            artifacts.append(payload)
    return artifacts


def artifact_sort_key(artifact: dict) -> tuple[str, str]:
    return artifact["modified_at"], artifact["relative_path"]


def artifact_matches_filters(
    artifact: dict,
    *,
    group: str | None,
    window: str | None,
    mode: str | None,
    date_from: date | None,
    date_to: date | None,
) -> bool:
    if group and artifact["group"] != group:
        return False
    if window and artifact.get("window") != window:
        return False
    if mode and artifact.get("mode") != mode:
        return False

    report_date_text = artifact.get("report_date")
    if date_from or date_to:
        if not report_date_text:
            return False
        try:
            report_date = date.fromisoformat(report_date_text)
        except ValueError:
            return False
        if date_from and report_date < date_from:
            return False
        if date_to and report_date > date_to:
            return False

    return True


def select_latest_artifact(
    artifacts: list[dict],
    *,
    group: str,
    window: str | None = None,
    mode: str | None = None,
) -> dict | None:
    matches = [
        artifact
        for artifact in artifacts
        if artifact["group"] == group
        and (window is None or artifact.get("window") == window)
        and (mode is None or artifact.get("mode") == mode)
    ]
    if not matches:
        return None
    return max(matches, key=artifact_sort_key)


def extract_markdown_preview(file_path: Path, max_chars: int) -> str:
    text = file_path.read_text(encoding="utf-8")
    preview_lines: list[str] = []
    skip_metadata = True

    for raw_line in text.splitlines():
        stripped = raw_line.strip()
        if not stripped:
            continue
        if stripped.startswith("# "):
            continue
        if skip_metadata and stripped.startswith("- ") and ":" in stripped:
            continue

        cleaned = stripped.lstrip("#").strip()
        if cleaned:
            preview_lines.append(cleaned)
            skip_metadata = False

        preview = " ".join(preview_lines).strip()
        if len(preview) >= max_chars:
            break

    preview = " ".join(preview_lines).strip()
    if len(preview) > max_chars:
        return preview[: max_chars - 3].rstrip() + "..."
    return preview


def build_artifact_summary_payload(artifact: dict | None, preview_chars: int) -> dict | None:
    if artifact is None:
        return None

    payload = dict(artifact)
    try:
        file_path = resolve_review_artifact_path(artifact["relative_path"])
        if file_path.is_file():
            payload["preview"] = extract_markdown_preview(file_path, preview_chars)
        else:
            payload["preview"] = ""
    except (OSError, UnicodeError, ValueError):
        payload["preview"] = ""

    return payload


def build_artifact_summary_from_path(
    artifact_path_value: str | None,
    preview_chars: int,
) -> dict | None:
    if not artifact_path_value:
        return None

    try:
        file_path = resolve_review_artifact_path(artifact_path_value)
    except ValueError:
        return None

    if not file_path.is_file():
        return {
            "relative_path": artifact_path_value,
            "file_url": build_artifact_file_url(Path(artifact_path_value)),
            "missing": True,
        }

    artifact = build_artifact_payload(file_path)
    if artifact is None:
        return {
            "relative_path": artifact_path_value,
            "file_url": build_artifact_file_url(Path(artifact_path_value)),
        }
    return build_artifact_summary_payload(artifact, preview_chars)


def build_artifact_counts(artifacts: list[dict]) -> dict:
    counts = {
        "review": {"daily": 0, "weekly": 0},
        "inbox": 0,
        "inbox-actions": {"dry-run": 0, "apply": 0},
        "inbox-action-history": {"daily": 0, "weekly": 0},
        "audio-transcripts": 0,
        "image-descriptions": 0,
        "system-status": 0,
    }

    for artifact in artifacts:
        group = artifact["group"]
        if group == "review":
            counts["review"][artifact["window"]] += 1
        elif group == "inbox":
            counts["inbox"] += 1
        elif group == "inbox-actions":
            counts["inbox-actions"][artifact["mode"]] += 1
        elif group == "inbox-action-history":
            counts["inbox-action-history"][artifact["window"]] += 1
        elif group == "audio-transcripts":
            counts["audio-transcripts"] += 1
        elif group == "image-descriptions":
            counts["image-descriptions"] += 1
        elif group == "system-status":
            counts["system-status"] += 1

    return counts


def build_artifact_latest_summary(artifacts: list[dict], preview_chars: int) -> dict:
    return {
        "review": {
            "daily": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="review", window="daily"),
                preview_chars,
            ),
            "weekly": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="review", window="weekly"),
                preview_chars,
            ),
        },
        "inbox": build_artifact_summary_payload(
            select_latest_artifact(artifacts, group="inbox"),
            preview_chars,
        ),
        "inbox-actions": {
            "dry-run": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="inbox-actions", mode="dry-run"),
                preview_chars,
            ),
            "apply": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="inbox-actions", mode="apply"),
                preview_chars,
            ),
        },
        "inbox-action-history": {
            "daily": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="inbox-action-history", window="daily"),
                preview_chars,
            ),
            "weekly": build_artifact_summary_payload(
                select_latest_artifact(artifacts, group="inbox-action-history", window="weekly"),
                preview_chars,
            ),
        },
        "audio-transcripts": build_artifact_summary_payload(
            select_latest_artifact(artifacts, group="audio-transcripts"),
            preview_chars,
        ),
        "image-descriptions": build_artifact_summary_payload(
            select_latest_artifact(artifacts, group="image-descriptions"),
            preview_chars,
        ),
        "system-status": build_artifact_summary_payload(
            select_latest_artifact(artifacts, group="system-status"),
            preview_chars,
        ),
    }

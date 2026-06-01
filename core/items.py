"""Item file, payload, and persistence helpers."""
from __future__ import annotations

import mimetypes
import os
import sqlite3
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from uuid import uuid4

from flask import request

from core.config import (
    ARCHIVE_PATH,
    AUDIO_EXTENSIONS,
    AXIOM_ROOT,
    DOCUMENT_EXTENSIONS,
    DOCUMENT_MIME_TYPES,
    IMAGE_EXTENSIONS,
    INBOX_PATH,
    ITEM_DETAIL_SELECT_FIELDS,
    ITEM_PROCESSING_LABELS,
    ITEM_PROCESSING_OVERRIDE_LABELS,
    ITEM_PROCESSING_STATE_SQL,
    ITEM_TEXT_SOURCE_LABELS,
    ITEM_TYPE_AUDIO,
    ITEM_TYPE_DOCUMENT,
    ITEM_TYPE_IMAGE,
    ITEM_TYPE_TEXT,
    MIME_TYPE_EXTENSION_MAP,
    STORAGE_AREAS,
    UPLOAD_TYPE_LABELS,
)
from core.database import get_db_connection
from core.text_extract import normalize_extracted_text


def _get_request_field(name: str, default: str = "") -> str:
    if request.is_json:
        data = request.get_json(silent=True) or {}
        value = data.get(name)
        if value is not None:
            return str(value)

    value = request.values.get(name)
    if value is not None:
        return str(value)
    return default


def build_item_filter_conditions(
    item_type: str | None,
    storage: str | None,
    source: str | None,
    created_from: str | None,
    created_to: str | None,
    processing_state: str | None = None,
    processing_override: str | None = None,
) -> tuple[list[str], list[str]]:
    conditions: list[str] = []
    params: list[str] = []

    if item_type:
        conditions.append("type = ?")
        params.append(item_type)

    if storage:
        storage_path = str(STORAGE_AREAS[storage])
        conditions.append("(file_path = ? OR file_path LIKE ?)")
        params.extend([storage_path, f"{storage_path}{os.sep}%"])

    if source:
        conditions.append("source = ?")
        params.append(source)

    if created_from:
        conditions.append("created_at >= ?")
        params.append(created_from)

    if created_to:
        conditions.append("created_at <= ?")
        params.append(created_to)

    if processing_state:
        conditions.append(f"({ITEM_PROCESSING_STATE_SQL}) = ?")
        params.append(processing_state)

    if processing_override:
        conditions.append("processing_override = ?")
        params.append(processing_override)

    return conditions, params


def join_conditions(conditions: list[str], prefix: str) -> str:
    if not conditions:
        return ""
    return f"{prefix} " + " AND ".join(conditions)


def normalize_mime_type(value: str | None) -> str:
    return str(value or "").split(";", 1)[0].strip().lower()


def get_file_extension(filename: str | Path | None) -> str:
    if filename is None:
        return ""
    return Path(str(filename)).suffix.lower()


def format_allowed_extensions(extensions: set[str]) -> str:
    return ", ".join(sorted(extensions))


def build_upload_error_message() -> str:
    groups = [
        f"图片: {format_allowed_extensions(IMAGE_EXTENSIONS)}",
        f"文档: {format_allowed_extensions(DOCUMENT_EXTENSIONS)}",
        f"音频: {format_allowed_extensions(AUDIO_EXTENSIONS)}",
    ]
    return "只支持以下文件类型: " + "；".join(groups)


def detect_upload_item_type(extension: str, mime_type: str) -> str | None:
    if extension in IMAGE_EXTENSIONS or mime_type.startswith("image/"):
        return ITEM_TYPE_IMAGE
    if extension in DOCUMENT_EXTENSIONS or mime_type in DOCUMENT_MIME_TYPES:
        return ITEM_TYPE_DOCUMENT
    if extension in AUDIO_EXTENSIONS or mime_type.startswith("audio/"):
        return ITEM_TYPE_AUDIO
    return None


def normalize_original_name(filename: str, item_type: str, mime_type: str) -> str:
    raw_name = str(filename or "").strip().replace("\\", "/")
    normalized_name = Path(raw_name).name.strip()
    fallback_extension = MIME_TYPE_EXTENSION_MAP.get(mime_type, "")

    if not normalized_name:
        normalized_name = item_type

    if not get_file_extension(normalized_name) and fallback_extension:
        normalized_name = f"{normalized_name}{fallback_extension}"

    return normalized_name


def build_binary_file_path(now: datetime, original_name: str) -> Path:
    extension = get_file_extension(original_name) or ".bin"
    return build_inbox_file_path(now, extension)


def build_download_name(
    original_name: str | None,
    file_path: str | Path | None,
    item_id: int,
) -> str:
    if original_name:
        return original_name
    if file_path:
        return Path(str(file_path)).name
    return f"item-{item_id}"


def get_type_label(item_type: str) -> str:
    return UPLOAD_TYPE_LABELS.get(item_type, item_type)


def build_file_url(item_id: int) -> str:
    return f"/file/{item_id}"


def get_storage_area(file_path: str | Path | None) -> str | None:
    if not file_path:
        return None

    path = Path(file_path).expanduser()
    if not path.is_absolute():
        path = AXIOM_ROOT / path
    path = path.resolve()

    if is_path_under(path, INBOX_PATH):
        return "inbox"
    if is_path_under(path, ARCHIVE_PATH):
        return "archive"
    if is_path_under(path, AXIOM_ROOT):
        return "root"
    return "external"


def strip_item_text(value: str | None) -> str:
    if value is None:
        return ""
    return str(value).strip()


def describe_primary_text_source(
    item_type: str,
    content: str | None,
    original_name: str | None,
    derived_text: str | None,
    transcript_text: str | None,
) -> str:
    normalized_content = strip_item_text(content)
    normalized_original_name = strip_item_text(original_name)
    normalized_derived_text = strip_item_text(derived_text)
    normalized_transcript_text = strip_item_text(transcript_text)

    if item_type == ITEM_TYPE_DOCUMENT and normalized_derived_text:
        return "derived_text"
    if item_type == ITEM_TYPE_AUDIO and normalized_transcript_text:
        return "transcript_text"
    if normalized_content:
        return "content"
    if normalized_derived_text:
        return "derived_text"
    if normalized_transcript_text:
        return "transcript_text"
    if normalized_original_name:
        return "original_name"
    return "empty"


def get_item_primary_text(item: dict | None) -> str:
    if not item:
        return ""

    item_type = str(item.get("type") or "")
    content = strip_item_text(item.get("content"))
    original_name = strip_item_text(item.get("original_name"))
    derived_text = strip_item_text(item.get("derived_text_preview") or item.get("derived_text"))
    transcript_text = strip_item_text(
        item.get("transcript_text_preview") or item.get("transcript_text")
    )
    text_source = describe_primary_text_source(
        item_type,
        content,
        original_name,
        derived_text,
        transcript_text,
    )

    if text_source == "derived_text":
        return derived_text
    if text_source == "transcript_text":
        return transcript_text
    if text_source == "content":
        return content
    if text_source == "original_name":
        return original_name
    return ""


def describe_processing_state(
    item_type: str,
    content: str | None,
    original_name: str | None,
    derived_text: str | None,
    transcript_text: str | None,
    processing_override: str | None = None,
) -> str:
    if processing_override == "ready":
        return "ready"

    normalized_content = strip_item_text(content)
    normalized_original_name = strip_item_text(original_name)
    normalized_derived_text = strip_item_text(derived_text)
    normalized_transcript_text = strip_item_text(transcript_text)

    if item_type == ITEM_TYPE_DOCUMENT:
        return "ready" if normalized_derived_text else "pending"
    if item_type == ITEM_TYPE_AUDIO:
        return "ready" if normalized_transcript_text else "pending"
    if item_type == ITEM_TYPE_IMAGE:
        return "ready" if normalized_content and normalized_content != normalized_original_name else "pending"
    return "ready" if normalized_content else "pending"


def describe_processing_note(
    item_type: str,
    processing_state: str,
    processing_override: str | None = None,
) -> str:
    if processing_override == "ready":
        return "已手动标记完成"
    if item_type == ITEM_TYPE_DOCUMENT:
        return "正文已就绪" if processing_state == "ready" else "待补正文"
    if item_type == ITEM_TYPE_AUDIO:
        return "转写已就绪" if processing_state == "ready" else "待补转写"
    if item_type == ITEM_TYPE_IMAGE:
        return "说明已就绪" if processing_state == "ready" else "待补说明"
    if item_type == ITEM_TYPE_TEXT:
        return "文本已就绪"
    return "内容已就绪" if processing_state == "ready" else "待补内容"


def build_item_payload(
    item_id: int,
    item_type: str,
    content: str | None,
    file_path: str | Path | None,
    source: str | None,
    created_at: str,
    original_name: str | None = None,
    mime_type: str | None = None,
    size_bytes: int | None = None,
    derived_text_preview: str | None = None,
    derived_text: str | None = None,
    transcript_text_preview: str | None = None,
    transcript_text: str | None = None,
    processing_override: str | None = None,
) -> dict:
    extension = get_file_extension(original_name or file_path)
    normalized_preview = normalize_extracted_text(derived_text_preview)
    normalized_derived_text = normalize_extracted_text(derived_text)
    normalized_transcript_preview = normalize_extracted_text(transcript_text_preview)
    normalized_transcript_text = normalize_extracted_text(transcript_text)
    text_source = describe_primary_text_source(
        item_type,
        content,
        original_name,
        normalized_derived_text,
        normalized_transcript_text,
    )
    processing_state = describe_processing_state(
        item_type,
        content,
        original_name,
        normalized_derived_text,
        normalized_transcript_text,
        processing_override,
    )
    item = {
        "id": item_id,
        "type": item_type,
        "type_label": get_type_label(item_type),
        "content": content,
        "file_path": str(file_path) if file_path else None,
        "file_url": build_file_url(item_id) if file_path else None,
        "download_name": build_download_name(original_name, file_path, item_id) if file_path else None,
        "storage": get_storage_area(file_path),
        "source": source,
        "created_at": created_at,
        "original_name": original_name,
        "mime_type": mime_type,
        "size_bytes": size_bytes,
        "extension": extension.lstrip(".") if extension else None,
        "derived_text_available": bool(normalized_preview or normalized_derived_text),
        "derived_text_preview": normalized_preview or normalized_derived_text,
        "transcript_text_available": bool(normalized_transcript_preview or normalized_transcript_text),
        "transcript_text_preview": normalized_transcript_preview or normalized_transcript_text,
        "text_source": text_source,
        "text_source_label": ITEM_TEXT_SOURCE_LABELS[text_source],
        "processing_state": processing_state,
        "processing_label": ITEM_PROCESSING_LABELS[processing_state],
        "processing_note": describe_processing_note(item_type, processing_state, processing_override),
        "processing_override": processing_override,
        "processing_override_label": ITEM_PROCESSING_OVERRIDE_LABELS.get(processing_override),
        "processing_is_overridden": bool(processing_override),
    }
    if derived_text is not None:
        item["derived_text"] = normalized_derived_text
    if transcript_text is not None:
        item["transcript_text"] = normalized_transcript_text
    return item


def row_to_item(row: sqlite3.Row, include_score: bool = False) -> dict:
    row_keys = set(row.keys())
    item = build_item_payload(
        row["id"],
        row["type"],
        row["content"],
        row["file_path"],
        row["source"],
        row["created_at"],
        row["original_name"] if "original_name" in row.keys() else None,
        row["mime_type"] if "mime_type" in row.keys() else None,
        row["size_bytes"] if "size_bytes" in row.keys() else None,
        row["derived_text_preview"] if "derived_text_preview" in row_keys else None,
        row["derived_text"] if "derived_text" in row_keys else None,
        row["transcript_text_preview"] if "transcript_text_preview" in row_keys else None,
        row["transcript_text"] if "transcript_text" in row_keys else None,
        row["processing_override"] if "processing_override" in row_keys else None,
    )
    if include_score and "score" in row.keys():
        item["score"] = row["score"]
    return item


def is_path_under(path: Path, parent: Path) -> bool:
    try:
        path.resolve().relative_to(parent.resolve())
    except ValueError:
        return False
    return True


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def local_date_now() -> date:
    offset_str = os.environ.get("AXIOM_LOCAL_UTC_OFFSET", "+08:00")
    tz = timezone(timedelta(hours=int(offset_str[0:3]), minutes=int(offset_str[4:6])))
    return datetime.now(tz).date()


def build_inbox_file_path(now: datetime, extension: str) -> Path:
    timestamp = now.strftime("%Y%m%d_%H%M%S_%f")
    return INBOX_PATH / f"{timestamp}_{uuid4().hex[:8]}{extension}"


def build_unique_file_path(target_dir: Path, filename: str) -> Path:
    target_dir.mkdir(parents=True, exist_ok=True)
    candidate = target_dir / filename
    source_path = Path(filename)
    counter = 1

    while candidate.exists():
        candidate = target_dir / f"{source_path.stem}_{counter}{source_path.suffix}"
        counter += 1

    return candidate


def build_text_file_path(now: datetime) -> Path:
    return build_inbox_file_path(now, ".txt")


def read_upload_content(original_name: str, item_type: str) -> str:
    for field_name in ("content", "caption", "title", "description"):
        value = _get_request_field(field_name).strip()
        if value:
            return value
    return original_name or item_type


def parse_uploaded_file(uploaded_file) -> dict:
    raw_name = uploaded_file.filename.strip()
    mime_type = normalize_mime_type(
        getattr(uploaded_file, "mimetype", None)
        or getattr(uploaded_file, "content_type", None)
    )
    extension = get_file_extension(raw_name)
    item_type = detect_upload_item_type(extension, mime_type)
    if item_type is None:
        raise ValueError(build_upload_error_message())

    original_name = normalize_original_name(raw_name, item_type, mime_type)
    normalized_extension = get_file_extension(original_name)
    if item_type == ITEM_TYPE_IMAGE and normalized_extension not in IMAGE_EXTENSIONS:
        raise ValueError(build_upload_error_message())
    if item_type == ITEM_TYPE_DOCUMENT and normalized_extension not in DOCUMENT_EXTENSIONS:
        raise ValueError(build_upload_error_message())
    if item_type == ITEM_TYPE_AUDIO and normalized_extension not in AUDIO_EXTENSIONS:
        raise ValueError(build_upload_error_message())

    if not mime_type:
        mime_type = mimetypes.guess_type(original_name)[0] or ""

    return {
        "item_type": item_type,
        "original_name": original_name,
        "mime_type": mime_type or None,
    }


def build_archive_file_path(now: datetime, file_path: Path) -> Path:
    archive_dir = ARCHIVE_PATH / now.strftime("%Y%m")
    return build_unique_file_path(archive_dir, file_path.name)


def build_restore_file_path(file_path: Path) -> Path:
    return build_unique_file_path(INBOX_PATH, file_path.name)


def write_text_file_atomic(file_path: Path, text: str) -> None:
    """先写临时文件，再替换成正式文件，避免留下半截 txt。"""
    tmp_path = file_path.with_name(f"{file_path.name}.{uuid4().hex}.tmp")
    try:
        with tmp_path.open("w", encoding="utf-8", newline="\n") as file:
            file.write(text)
            file.flush()
            os.fsync(file.fileno())
        os.replace(tmp_path, file_path)
    except Exception:
        tmp_path.unlink(missing_ok=True)
        raise


def compute_file_sha256(file_path: Path) -> str | None:
    """计算文件的 SHA256 哈希。"""
    import hashlib

    try:
        sha = hashlib.sha256()
        with open(file_path, "rb") as f:
            for chunk in iter(lambda: f.read(8192), b""):
                sha.update(chunk)
        return sha.hexdigest()
    except Exception:
        return None


def write_binary_file_atomic(file_path: Path, uploaded_file) -> None:
    """图片先写入临时文件，再替换为正式文件。"""
    tmp_path = file_path.with_name(f"{file_path.name}.{uuid4().hex}.tmp")
    try:
        with tmp_path.open("wb") as file:
            uploaded_file.save(file)
            file.flush()
            os.fsync(file.fileno())
        if tmp_path.stat().st_size == 0:
            raise ValueError("uploaded file is empty")
        os.replace(tmp_path, file_path)
    except Exception:
        tmp_path.unlink(missing_ok=True)
        raise


def insert_item(
    item_type: str,
    content: str,
    file_path: Path,
    source: str,
    created_at: str,
    original_name: str | None = None,
    mime_type: str | None = None,
    size_bytes: int | None = None,
    derived_text: str | None = None,
    transcript_text: str | None = None,
    processing_override: str | None = None,
) -> int:
    conn = get_db_connection()
    try:
        cursor = conn.execute(
            """
            INSERT INTO items (
                type,
                content,
                file_path,
                source,
                created_at,
                original_name,
                mime_type,
                size_bytes,
                derived_text,
                transcript_text,
                processing_override
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                item_type,
                content,
                str(file_path),
                source,
                created_at,
                original_name,
                mime_type,
                size_bytes,
                derived_text,
                transcript_text,
                processing_override,
            ),
        )
        conn.commit()
        return int(cursor.lastrowid)
    finally:
        conn.close()


def insert_text_item(text: str, file_path: Path, source: str, created_at: str) -> int:
    return insert_item(ITEM_TYPE_TEXT, text, file_path, source, created_at)


def get_item_by_id(item_id: int) -> sqlite3.Row | None:
    conn = get_db_connection()
    try:
        return conn.execute(
            f"""
            SELECT {ITEM_DETAIL_SELECT_FIELDS}
            FROM items
            WHERE id = ?
            """,
            (item_id,),
        ).fetchone()
    finally:
        conn.close()


def get_items_by_ids(item_ids: list[int]) -> list[sqlite3.Row]:
    if not item_ids:
        return []

    placeholders = ", ".join("?" for _ in item_ids)
    conn = get_db_connection()
    try:
        rows = conn.execute(
            f"""
            SELECT {ITEM_DETAIL_SELECT_FIELDS}
            FROM items
            WHERE id IN ({placeholders})
            """,
            item_ids,
        ).fetchall()
    finally:
        conn.close()

    rows_by_id = {int(row["id"]): row for row in rows}
    return [rows_by_id[item_id] for item_id in item_ids if item_id in rows_by_id]


def update_item_file_path(item_id: int, file_path: Path) -> None:
    conn = get_db_connection()
    try:
        conn.execute(
            """
            UPDATE items
            SET file_path = ?
            WHERE id = ?
            """,
            (str(file_path), item_id),
        )
        conn.commit()
    finally:
        conn.close()


def update_item_content_source_text_fields(
    item_id: int,
    content: str | None,
    source: str | None,
    derived_text: str | None,
    transcript_text: str | None,
    processing_override: str | None,
) -> None:
    conn = get_db_connection()
    try:
        conn.execute(
            """
            UPDATE items
            SET content = ?, source = ?, derived_text = ?, transcript_text = ?, processing_override = ?
            WHERE id = ?
            """,
            (content, source, derived_text, transcript_text, processing_override, item_id),
        )
        conn.commit()
    finally:
        conn.close()


def update_items_processing_override(item_ids: list[int], processing_override: str | None) -> None:
    if not item_ids:
        return

    placeholders = ", ".join("?" for _ in item_ids)
    conn = get_db_connection()
    try:
        conn.execute(
            f"""
            UPDATE items
            SET processing_override = ?
            WHERE id IN ({placeholders})
            """,
            (processing_override, *item_ids),
        )
        conn.commit()
    finally:
        conn.close()

from __future__ import annotations

import hmac
import html
import json
import logging
import mimetypes
import os
import re
import sqlite3
import subprocess
import sys
import zipfile
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote
from uuid import uuid4
from xml.etree import ElementTree as ET

from flask import Flask, jsonify, render_template, request, send_file
from werkzeug.exceptions import HTTPException

try:
    from pypdf import PdfReader
except ImportError:  # pragma: no cover - deployment should install requirements.txt
    PdfReader = None

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


# ===== 基础配置 =====
# 默认保持 VPS 目录结构；环境变量用于本地测试或后续部署覆盖。
AXIOM_ROOT = Path(os.environ.get("AXIOM_ROOT", "/opt/axiom")).resolve()
PROJECT_ROOT = Path(__file__).resolve().parents[1]
INBOX_PATH = Path(os.environ.get("AXIOM_INBOX_PATH", AXIOM_ROOT / "data" / "inbox")).resolve()
ARCHIVE_PATH = Path(os.environ.get("AXIOM_ARCHIVE_PATH", AXIOM_ROOT / "data" / "archive")).resolve()
DB_PATH = Path(os.environ.get("AXIOM_DB_PATH", AXIOM_ROOT / "db" / "axiom.db")).resolve()
SECRET_KEY = os.environ.get("AXIOM_SECRET_KEY", os.environ.get("AXIOM_KEY", "axiom123"))
LOG_PATH = os.environ.get("AXIOM_LOG_PATH", "")
MAX_UPLOAD_BYTES = int(os.environ.get("AXIOM_MAX_UPLOAD_BYTES", str(20 * 1024 * 1024)))
LOCAL_UTC_OFFSET = os.environ.get("AXIOM_LOCAL_UTC_OFFSET", "+08:00")
AUTOMATION_TIMEOUT_SECONDS = int(os.environ.get("AXIOM_AUTOMATION_TIMEOUT_SECONDS", "90"))
AUTOMATION_LOCK_PATH = AXIOM_ROOT / "runtime" / "automation_run.lock"
app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_BYTES

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 10
MAX_PAGE_SIZE = 50

DEFAULT_SOURCE = "ios_shortcut"
ITEM_TYPE_TEXT = "text"
ITEM_TYPE_IMAGE = "image"
ITEM_TYPE_DOCUMENT = "document"
ITEM_TYPE_AUDIO = "audio"
ITEM_TYPES = {ITEM_TYPE_TEXT, ITEM_TYPE_IMAGE, ITEM_TYPE_DOCUMENT, ITEM_TYPE_AUDIO}
STORAGE_AREAS = {"inbox": INBOX_PATH, "archive": ARCHIVE_PATH}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".heif"}
DOCUMENT_EXTENSIONS = {".pdf", ".doc", ".docx"}
AUDIO_EXTENSIONS = {".aac", ".caf", ".flac", ".m4a", ".mp3", ".ogg", ".wav", ".webm"}
TRANSCRIPT_EXTENSIONS = {".md", ".srt", ".txt", ".vtt"}
TRANSCRIPT_TEXT_ENCODINGS = ("utf-8-sig", "utf-16", "utf-16-le", "utf-16-be", "gb18030")
DOCUMENT_MIME_TYPES = {
    "application/msword",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
UPLOAD_TYPE_LABELS = {
    ITEM_TYPE_TEXT: "文本",
    ITEM_TYPE_IMAGE: "图片",
    ITEM_TYPE_DOCUMENT: "文档",
    ITEM_TYPE_AUDIO: "音频",
}
MIME_TYPE_EXTENSION_MAP = {
    "application/msword": ".doc",
    "application/pdf": ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "audio/aac": ".aac",
    "audio/flac": ".flac",
    "audio/mp4": ".m4a",
    "audio/mpeg": ".mp3",
    "audio/ogg": ".ogg",
    "audio/webm": ".webm",
    "audio/wav": ".wav",
    "audio/x-m4a": ".m4a",
    "audio/x-wav": ".wav",
    "image/gif": ".gif",
    "image/heic": ".heic",
    "image/heif": ".heif",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}
TRANSCRIPT_TIMESTAMP_PATTERN = re.compile(
    r"^\s*(?:\d{1,2}:)?\d{1,2}:\d{2}(?:[.,]\d{1,3})?\s*-->\s*"
    r"(?:\d{1,2}:)?\d{1,2}:\d{2}(?:[.,]\d{1,3})?(?:\s+.*)?$"
)
TRANSCRIPT_TAG_PATTERN = re.compile(r"</?[^>]+>")
ITEM_BASE_SELECT_FIELDS = """
    id,
    type,
    content,
    file_path,
    source,
    created_at,
    original_name,
    mime_type,
    size_bytes
"""
ITEM_LIST_SELECT_FIELDS = f"""
    {ITEM_BASE_SELECT_FIELDS},
    CASE
        WHEN COALESCE(TRIM(derived_text), '') != '' THEN SUBSTR(derived_text, 1, 600)
        ELSE NULL
    END AS derived_text_preview,
    CASE
        WHEN COALESCE(TRIM(transcript_text), '') != '' THEN SUBSTR(transcript_text, 1, 600)
        ELSE NULL
    END AS transcript_text_preview
"""
ITEM_DETAIL_SELECT_FIELDS = f"""
    {ITEM_LIST_SELECT_FIELDS},
    derived_text,
    transcript_text
"""
REVIEWS_PATH = Path(os.environ.get("AXIOM_REVIEWS_PATH", AXIOM_ROOT / "data" / "reviews")).resolve()
ARTIFACT_GROUPS = {"review", "inbox", "inbox-actions", "inbox-action-history"}
ARTIFACT_WINDOWS = {"daily", "weekly"}
ARTIFACT_MODES = {"dry-run", "apply"}
AUTOMATION_RUN_STATUSES = {"running", "success", "failed", "timeout"}
DOCX_NAMESPACE = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
AUTOMATION_JOBS = {
    "review_day": {
        "label": "生成今日日回顾",
        "description": "按本地日期生成 1 天窗口的 review 快照。",
        "script_name": "save_review_snapshot.py",
        "artifact_group": "review",
        "artifact_window": "daily",
        "artifact_mode": None,
        "build_args": lambda run_date: ["--window", "day", "--date", run_date, "--force"],
        "manual_enabled": True,
    },
    "review_week": {
        "label": "生成本周回顾",
        "description": "按锚点日期回看最近 7 天，生成 weekly review。",
        "script_name": "save_review_snapshot.py",
        "artifact_group": "review",
        "artifact_window": "weekly",
        "artifact_mode": None,
        "build_args": lambda run_date: ["--window", "week", "--date", run_date, "--force"],
        "manual_enabled": True,
    },
    "inbox_report": {
        "label": "生成 Inbox 报告",
        "description": "基于当前 inbox 规则生成处理建议，不改动真实数据。",
        "script_name": "save_inbox_processing_snapshot.py",
        "artifact_group": "inbox",
        "artifact_window": None,
        "artifact_mode": None,
        "build_args": lambda run_date: ["--date", run_date, "--force"],
        "manual_enabled": True,
    },
    "inbox_action_dry_run": {
        "label": "生成 Inbox 动作预演",
        "description": "运行安全 dry-run，只生成 action snapshot，不执行真实归档。",
        "script_name": "save_inbox_action_snapshot.py",
        "artifact_group": "inbox-actions",
        "artifact_window": None,
        "artifact_mode": "dry-run",
        "build_args": lambda run_date: ["--date", run_date],
        "manual_enabled": True,
    },
    "inbox_action_history_day": {
        "label": "生成 Inbox 动作历史日报",
        "description": "基于已有 action snapshot 生成当日动作历史汇总。",
        "script_name": "save_inbox_action_history_snapshot.py",
        "artifact_group": "inbox-action-history",
        "artifact_window": "daily",
        "artifact_mode": None,
        "build_args": lambda run_date: ["--window", "day", "--date", run_date, "--details", "--force"],
        "manual_enabled": False,
    },
    "inbox_action_history_week": {
        "label": "生成 Inbox 动作历史周报",
        "description": "基于已有 action snapshot 生成最近 7 天动作历史汇总。",
        "script_name": "save_inbox_action_history_snapshot.py",
        "artifact_group": "inbox-action-history",
        "artifact_window": "weekly",
        "artifact_mode": None,
        "build_args": lambda run_date: ["--window", "week", "--date", run_date, "--details", "--force"],
        "manual_enabled": False,
    },
}


def configure_logging() -> None:
    log_level = os.environ.get("AXIOM_LOG_LEVEL", "INFO").upper()
    log_format = "%(asctime)s %(levelname)s [%(name)s] %(message)s"
    handlers: list[logging.Handler] = [logging.StreamHandler()]

    if LOG_PATH:
        log_path = Path(LOG_PATH).expanduser().resolve()
        log_path.parent.mkdir(parents=True, exist_ok=True)
        handlers.append(logging.FileHandler(log_path, encoding="utf-8"))

    logging.basicConfig(level=log_level, format=log_format, handlers=handlers)


configure_logging()
logger = logging.getLogger("axiom.receiver")


# ===== 响应工具 =====
def ok_response(payload: dict | None = None, status: int = 200):
    body = {"ok": True}
    if payload:
        body.update(payload)
    return jsonify(body), status


def error_response(status: int, code: str, message: str):
    return jsonify({"ok": False, "error": {"code": code, "message": message}}), status


# ===== 存储与数据库 =====
def ensure_storage_dirs() -> None:
    """服务接收请求前，先确保本地存储目录存在。"""
    INBOX_PATH.mkdir(parents=True, exist_ok=True)
    ARCHIVE_PATH.mkdir(parents=True, exist_ok=True)
    REVIEWS_PATH.mkdir(parents=True, exist_ok=True)
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def ensure_items_table_columns(conn: sqlite3.Connection) -> None:
    existing_columns = {
        row[1]
        for row in conn.execute("PRAGMA table_info(items)").fetchall()
    }
    required_columns = {
        "original_name": "TEXT",
        "mime_type": "TEXT",
        "size_bytes": "INTEGER",
        "derived_text": "TEXT",
        "transcript_text": "TEXT",
    }
    for column_name, column_type in required_columns.items():
        if column_name in existing_columns:
            continue
        conn.execute(f"ALTER TABLE items ADD COLUMN {column_name} {column_type}")


def init_db(db_path: Path = DB_PATH) -> None:
    """创建 v0.1 阶段最小表结构。"""
    db_path.parent.mkdir(parents=True, exist_ok=True)

    conn = sqlite3.connect(str(db_path))
    try:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                content TEXT,
                file_path TEXT,
                source TEXT,
                created_at TEXT NOT NULL,
                original_name TEXT,
                mime_type TEXT,
                size_bytes INTEGER,
                derived_text TEXT,
                transcript_text TEXT
            )
            """
        )
        ensure_items_table_columns(conn)
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at)"
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_items_type ON items(type)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_items_source ON items(source)")
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS automation_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                job_id TEXT NOT NULL,
                run_date TEXT NOT NULL,
                status TEXT NOT NULL,
                return_code INTEGER,
                message TEXT,
                artifact_path TEXT,
                stdout_tail TEXT,
                stderr_tail TEXT,
                started_at TEXT NOT NULL,
                finished_at TEXT,
                duration_ms INTEGER
            )
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_automation_runs_started_at
            ON automation_runs(started_at)
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_automation_runs_job_id
            ON automation_runs(job_id)
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_automation_runs_status
            ON automation_runs(status)
            """
        )
        conn.commit()
    finally:
        conn.close()


def init_app_storage() -> None:
    ensure_storage_dirs()
    init_db()


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH), timeout=30)
    conn.row_factory = sqlite3.Row
    return conn


# ===== 请求工具 =====
def get_request_field(name: str, default: str = "") -> str:
    """按 JSON、form、query string 的顺序读取字段。"""
    if request.is_json:
        data = request.get_json(silent=True) or {}
        value = data.get(name)
        if value is not None:
            return str(value)

    value = request.values.get(name)
    if value is not None:
        return str(value)

    return default


def get_request_body_data() -> dict:
    """读取本次请求的 body，供更新类 POST 接口使用。"""
    if request.is_json:
        data = request.get_json(silent=True)
        if data is None:
            raise ValueError("JSON body 无效")
        if not isinstance(data, dict):
            raise ValueError("JSON body 必须是对象")
        return data
    return request.form.to_dict(flat=True)


def read_optional_body_field(body: dict, name: str) -> tuple[bool, str]:
    if name not in body:
        return False, ""
    value = body.get(name)
    if value is None:
        return True, ""
    return True, str(value)


def get_request_key() -> str:
    return get_request_field("key") or request.headers.get("X-Axiom-Key", "")


def check_key(key: str) -> bool:
    """使用固定时间比较校验共享 key。"""
    if not SECRET_KEY:
        logger.warning("AXIOM_SECRET_KEY is empty")
        return False
    return hmac.compare_digest(str(key), SECRET_KEY)


def require_key():
    if check_key(get_request_key()):
        return None
    return error_response(403, "unauthorized", "key 无效")


def parse_positive_int(
    value: str | None,
    field_name: str,
    default: int,
    max_value: int | None = None,
) -> int:
    if value is None or value == "":
        number = default
    else:
        try:
            number = int(value)
        except ValueError as exc:
            raise ValueError(f"{field_name} 必须是整数") from exc

    if number <= 0:
        raise ValueError(f"{field_name} 必须大于 0")

    if max_value is not None and number > max_value:
        return max_value

    return number


def read_pagination(default_page_size: int = DEFAULT_PAGE_SIZE) -> tuple[int, int]:
    page = parse_positive_int(
        request.args.get("page"),
        "page",
        DEFAULT_PAGE,
    )

    # 兼容 /recent?limit=10，同时把 page_size 作为标准分页参数。
    page_size_value = request.args.get("page_size")
    if page_size_value is None:
        page_size_value = request.args.get("limit")

    page_size = parse_positive_int(
        page_size_value,
        "page_size",
        default_page_size,
        MAX_PAGE_SIZE,
    )

    return page, page_size


def read_item_type_filter() -> str | None:
    item_type = request.args.get("type", "").strip().lower()
    if not item_type:
        return None
    if item_type not in ITEM_TYPES:
        allowed = "、".join(sorted(ITEM_TYPES))
        raise ValueError(f"type 只能是 {allowed}")
    return item_type


def read_storage_filter() -> str | None:
    storage = request.args.get("storage", "").strip().lower()
    if not storage:
        return None
    if storage not in STORAGE_AREAS:
        allowed = "、".join(sorted(STORAGE_AREAS))
        raise ValueError(f"storage 只能是 {allowed}")
    return storage


def read_source_filter() -> str | None:
    source = request.args.get("source", "").strip()
    return source or None


def parse_date_filter(value: str, field_name: str) -> date:
    text = value.strip()
    if not text:
        raise ValueError(f"{field_name} 不能为空")
    try:
        return date.fromisoformat(text)
    except ValueError as exc:
        raise ValueError(f"{field_name} 必须是 YYYY-MM-DD") from exc


def parse_utc_offset_value(offset_text: str) -> timezone:
    text = offset_text.strip()
    if len(text) != 6 or text[0] not in {"+", "-"} or text[3] != ":":
        raise ValueError("utc offset 必须是 ±HH:MM")

    try:
        hours = int(text[1:3])
        minutes = int(text[4:6])
    except ValueError as exc:
        raise ValueError("utc offset 必须是 ±HH:MM") from exc

    if hours > 23 or minutes > 59:
        raise ValueError("utc offset 超出范围")

    delta = timedelta(hours=hours, minutes=minutes)
    if text[0] == "-":
        delta = -delta
    return timezone(delta)


def resolve_run_date_value(
    run_date: str | None,
    *,
    days_offset: int = 0,
    utc_offset_text: str = LOCAL_UTC_OFFSET,
) -> str:
    if run_date:
        anchor_date = parse_date_filter(run_date, "date")
    else:
        local_tz = parse_utc_offset_value(utc_offset_text)
        anchor_date = datetime.now(local_tz).date()
    return (anchor_date + timedelta(days=days_offset)).isoformat()


def current_local_date_iso() -> str:
    return resolve_run_date_value(None)


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


def read_created_range() -> tuple[str | None, str | None]:
    created_from_value = request.args.get("created_from", "").strip()
    created_to_value = request.args.get("created_to", "").strip()

    created_from = None
    if created_from_value:
        created_from = parse_datetime_filter(created_from_value, "created_from")

    created_to = None
    if created_to_value:
        created_to = parse_datetime_filter(
            created_to_value,
            "created_to",
            end_of_day=(len(created_to_value) == 10),
        )

    if created_from and created_to and created_from > created_to:
        raise ValueError("created_from 不能晚于 created_to")

    return created_from, created_to


def read_artifact_group_filter() -> str | None:
    group = request.args.get("group", "").strip().lower()
    if not group:
        return None
    if group not in ARTIFACT_GROUPS:
        allowed = "、".join(sorted(ARTIFACT_GROUPS))
        raise ValueError(f"group 只能是 {allowed}")
    return group


def read_artifact_window_filter() -> str | None:
    window = request.args.get("window", "").strip().lower()
    if not window:
        return None
    if window not in ARTIFACT_WINDOWS:
        allowed = "、".join(sorted(ARTIFACT_WINDOWS))
        raise ValueError(f"window 只能是 {allowed}")
    return window


def read_artifact_mode_filter() -> str | None:
    mode = request.args.get("mode", "").strip().lower()
    if not mode:
        return None
    if mode not in ARTIFACT_MODES:
        allowed = "、".join(sorted(ARTIFACT_MODES))
        raise ValueError(f"mode 只能是 {allowed}")
    return mode


def read_artifact_date_range() -> tuple[date | None, date | None]:
    date_from_value = request.args.get("date_from", "").strip()
    date_to_value = request.args.get("date_to", "").strip()

    date_from = parse_date_filter(date_from_value, "date_from") if date_from_value else None
    date_to = parse_date_filter(date_to_value, "date_to") if date_to_value else None

    if date_from and date_to and date_from > date_to:
        raise ValueError("date_from 不能晚于 date_to")

    return date_from, date_to


def read_preview_chars(default: int = 240) -> int:
    return parse_positive_int(
        request.args.get("preview_chars"),
        "preview_chars",
        default,
        1000,
    )


def read_recent_limit(default: int = 10) -> int:
    return parse_positive_int(
        request.args.get("recent_limit"),
        "recent_limit",
        default,
        MAX_PAGE_SIZE,
    )


def read_optional_run_date(body: dict) -> str:
    run_date = str(body.get("date") or "").strip()
    return resolve_run_date_value(run_date or None)


def read_automation_job_filter() -> str | None:
    job_id = request.args.get("job", "").strip()
    return job_id or None


def read_automation_status_filter() -> str | None:
    status = request.args.get("status", "").strip().lower()
    if not status:
        return None
    if status not in AUTOMATION_RUN_STATUSES:
        allowed = "、".join(sorted(AUTOMATION_RUN_STATUSES))
        raise ValueError(f"status 只能是 {allowed}")
    return status


def build_item_filter_conditions(
    item_type: str | None,
    storage: str | None,
    source: str | None,
    created_from: str | None,
    created_to: str | None,
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


def build_artifact_file_url(relative_path: Path) -> str:
    relative_text = quote(relative_path.as_posix(), safe="/")
    return f"/artifacts/file/{relative_text}"


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
) -> dict:
    extension = get_file_extension(original_name or file_path)
    normalized_preview = normalize_extracted_text(derived_text_preview)
    normalized_derived_text = normalize_extracted_text(derived_text)
    normalized_transcript_preview = normalize_extracted_text(transcript_text_preview)
    normalized_transcript_text = normalize_extracted_text(transcript_text)
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
    )
    if include_score and "score" in row.keys():
        item["score"] = row["score"]
    return item


def escape_like(value: str) -> str:
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


def is_path_under(path: Path, parent: Path) -> bool:
    try:
        path.resolve().relative_to(parent.resolve())
    except ValueError:
        return False
    return True


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def isoformat_timestamp(timestamp: float) -> str:
    return datetime.fromtimestamp(timestamp, tz=timezone.utc).isoformat(timespec="seconds")


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
        value = get_request_field(field_name).strip()
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


def normalize_extracted_text(text: str | None) -> str | None:
    if not text:
        return None

    paragraphs = [part.strip() for part in str(text).replace("\r", "\n").split("\n") if part.strip()]
    if not paragraphs:
        return None
    return "\n\n".join(paragraphs)


def decode_text_file_bytes(raw_bytes: bytes) -> str:
    for encoding in TRANSCRIPT_TEXT_ENCODINGS:
        try:
            return raw_bytes.decode(encoding)
        except UnicodeDecodeError:
            continue
    raise ValueError("暂不支持当前 transcript_file 编码，请改成 UTF-8、UTF-16 或常见文本编码后重试")


def normalize_audio_transcript_text(
    text: str | None,
    extension: str | None = None,
) -> str | None:
    if not text:
        return None

    normalized_extension = (extension or "").strip().lower()
    plain_text = str(text).replace("\r\n", "\n").replace("\r", "\n")
    if normalized_extension not in {".srt", ".vtt"}:
        return normalize_extracted_text(plain_text)

    cleaned_lines: list[str] = []
    skip_note_block = False
    for raw_line in plain_text.split("\n"):
        stripped_line = raw_line.strip()

        if skip_note_block:
            if not stripped_line:
                skip_note_block = False
            continue

        if not stripped_line:
            cleaned_lines.append("")
            continue
        if normalized_extension == ".vtt" and stripped_line.upper() == "WEBVTT":
            continue
        if normalized_extension == ".vtt" and stripped_line.startswith("NOTE"):
            skip_note_block = True
            continue
        if stripped_line.isdigit():
            continue
        if TRANSCRIPT_TIMESTAMP_PATTERN.match(stripped_line):
            continue

        cleaned_text = html.unescape(TRANSCRIPT_TAG_PATTERN.sub("", stripped_line)).strip()
        if cleaned_text:
            cleaned_lines.append(cleaned_text)

    return normalize_extracted_text("\n".join(cleaned_lines))


def extract_audio_transcript_text_from_bytes(
    raw_bytes: bytes,
    original_name: str | None = None,
) -> str | None:
    if not raw_bytes:
        return None

    text = decode_text_file_bytes(raw_bytes)
    extension = get_file_extension(original_name)
    return normalize_audio_transcript_text(text, extension)


def extract_audio_transcript_text_from_file(
    file_path: Path,
    original_name: str | None = None,
) -> str | None:
    extension = get_file_extension(original_name or file_path)
    if extension not in TRANSCRIPT_EXTENSIONS:
        return None
    return extract_audio_transcript_text_from_bytes(file_path.read_bytes(), original_name or file_path.name)


def extract_audio_transcript_text_from_upload(uploaded_file) -> str | None:
    raw_name = uploaded_file.filename.strip()
    extension = get_file_extension(raw_name)
    if extension not in TRANSCRIPT_EXTENSIONS:
        supported = ", ".join(sorted(TRANSCRIPT_EXTENSIONS))
        raise ValueError(f"transcript_file 只支持 {supported}")

    raw_bytes = uploaded_file.read()
    if not raw_bytes:
        raise ValueError("transcript_file 不能为空")

    try:
        return extract_audio_transcript_text_from_bytes(raw_bytes, raw_name)
    finally:
        try:
            uploaded_file.stream.seek(0)
        except (AttributeError, OSError):
            pass


def build_audio_transcript_sidecar_candidates(
    file_path: Path,
    original_name: str | None = None,
    transcript_dir: Path | None = None,
) -> list[Path]:
    candidate_dirs: list[Path] = [file_path.parent]
    if transcript_dir is not None:
        resolved_dir = transcript_dir.expanduser().resolve()
        if resolved_dir not in candidate_dirs:
            candidate_dirs.append(resolved_dir)

    candidate_names: list[str] = []
    stem = Path(original_name).stem if original_name else file_path.stem
    full_name = Path(original_name).name if original_name else file_path.name
    for extension in sorted(TRANSCRIPT_EXTENSIONS):
        candidate_names.append(f"{stem}{extension}")
        candidate_names.append(f"{full_name}{extension}")

    deduped_names: list[str] = []
    for name in candidate_names:
        if name not in deduped_names:
            deduped_names.append(name)

    candidates: list[Path] = []
    for directory in candidate_dirs:
        for name in deduped_names:
            candidates.append((directory / name).resolve())
    return candidates


def extract_docx_text(file_path: Path) -> str | None:
    with zipfile.ZipFile(file_path) as archive:
        with archive.open("word/document.xml") as document_xml:
            root = ET.parse(document_xml).getroot()

    paragraphs: list[str] = []
    for paragraph in root.findall(".//w:p", DOCX_NAMESPACE):
        parts = [
            node.text
            for node in paragraph.findall(".//w:t", DOCX_NAMESPACE)
            if node.text
        ]
        text = "".join(parts).strip()
        if text:
            paragraphs.append(text)

    if paragraphs:
        return normalize_extracted_text("\n\n".join(paragraphs))

    parts = [
        node.text
        for node in root.findall(".//w:t", DOCX_NAMESPACE)
        if node.text
    ]
    return normalize_extracted_text("\n".join(parts))


def extract_pdf_text(file_path: Path) -> str | None:
    if PdfReader is None:
        logger.warning("pypdf is not installed, skip pdf text extraction: file=%s", file_path.name)
        return None

    reader = PdfReader(str(file_path))
    page_texts = [page.extract_text() or "" for page in reader.pages]
    return normalize_extracted_text("\n\n".join(page_texts))


def extract_document_text(file_path: Path, original_name: str | None) -> str | None:
    extension = get_file_extension(original_name or file_path)
    if extension == ".docx":
        try:
            return extract_docx_text(file_path)
        except (KeyError, OSError, ET.ParseError, zipfile.BadZipFile):
            logger.warning("failed to extract docx text: file=%s", file_path.name, exc_info=True)
            return None

    try:
        if extension == ".pdf":
            return extract_pdf_text(file_path)
    except Exception:
        logger.warning("failed to extract pdf text: file=%s", file_path.name, exc_info=True)
        return None

    return None


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
                transcript_text
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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


def update_item_content_source_and_transcript(
    item_id: int,
    content: str | None,
    source: str | None,
    transcript_text: str | None,
) -> None:
    conn = get_db_connection()
    try:
        conn.execute(
            """
            UPDATE items
            SET content = ?, source = ?, transcript_text = ?
            WHERE id = ?
            """,
            (content, source, transcript_text, item_id),
        )
        conn.commit()
    finally:
        conn.close()


def encode_tail_lines(lines: list[str]) -> str:
    return json.dumps(lines, ensure_ascii=False)


def decode_tail_lines(value: str | None) -> list[str]:
    if not value:
        return []
    try:
        parsed = json.loads(value)
    except json.JSONDecodeError:
        return []
    if not isinstance(parsed, list):
        return []
    return [str(item) for item in parsed if str(item).strip()]


def create_automation_run(job_id: str, run_date: str, started_at: str) -> int:
    conn = get_db_connection()
    try:
        cursor = conn.execute(
            """
            INSERT INTO automation_runs (
                job_id,
                run_date,
                status,
                started_at
            )
            VALUES (?, ?, ?, ?)
            """,
            (job_id, run_date, "running", started_at),
        )
        conn.commit()
        return int(cursor.lastrowid)
    finally:
        conn.close()


def finalize_automation_run(
    run_id: int,
    *,
    status: str,
    return_code: int | None,
    message: str,
    artifact_path: str | None,
    stdout_tail: list[str],
    stderr_tail: list[str],
    finished_at: str,
    duration_ms: int,
) -> None:
    conn = get_db_connection()
    try:
        conn.execute(
            """
            UPDATE automation_runs
            SET
                status = ?,
                return_code = ?,
                message = ?,
                artifact_path = ?,
                stdout_tail = ?,
                stderr_tail = ?,
                finished_at = ?,
                duration_ms = ?
            WHERE id = ?
            """,
            (
                status,
                return_code,
                message,
                artifact_path,
                encode_tail_lines(stdout_tail),
                encode_tail_lines(stderr_tail),
                finished_at,
                duration_ms,
                run_id,
            ),
        )
        conn.commit()
    finally:
        conn.close()


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


def row_to_automation_run(row: sqlite3.Row, preview_chars: int = 240) -> dict:
    job = AUTOMATION_JOBS.get(row["job_id"])
    stdout_tail = decode_tail_lines(row["stdout_tail"])
    stderr_tail = decode_tail_lines(row["stderr_tail"])
    return {
        "id": row["id"],
        "job_id": row["job_id"],
        "job_label": job["label"] if job else row["job_id"],
        "manual_enabled": job.get("manual_enabled", False) if job else False,
        "run_date": row["run_date"],
        "status": row["status"],
        "return_code": row["return_code"],
        "message": row["message"] or "",
        "started_at": row["started_at"],
        "finished_at": row["finished_at"],
        "duration_ms": row["duration_ms"],
        "stdout_tail": stdout_tail,
        "stderr_tail": stderr_tail,
        "artifact": build_artifact_summary_from_path(row["artifact_path"], preview_chars),
    }


def fetch_automation_run_rows(
    *,
    page: int,
    page_size: int,
    job_id: str | None,
    status: str | None,
) -> tuple[int, list[sqlite3.Row]]:
    conditions: list[str] = []
    params: list[str] = []
    if job_id:
        conditions.append("job_id = ?")
        params.append(job_id)
    if status:
        conditions.append("status = ?")
        params.append(status)

    where_clause = join_conditions(conditions, "WHERE")
    offset = (page - 1) * page_size

    conn = get_db_connection()
    try:
        total = conn.execute(
            f"SELECT COUNT(*) AS total FROM automation_runs {where_clause}",
            params,
        ).fetchone()["total"]
        rows = conn.execute(
            f"""
            SELECT
                id,
                job_id,
                run_date,
                status,
                return_code,
                message,
                artifact_path,
                stdout_tail,
                stderr_tail,
                started_at,
                finished_at,
                duration_ms
            FROM automation_runs
            {where_clause}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
            """,
            (*params, page_size, offset),
        ).fetchall()
    finally:
        conn.close()

    return total, rows


def get_automation_run_by_id(run_id: int) -> sqlite3.Row | None:
    conn = get_db_connection()
    try:
        return conn.execute(
            """
            SELECT
                id,
                job_id,
                run_date,
                status,
                return_code,
                message,
                artifact_path,
                stdout_tail,
                stderr_tail,
                started_at,
                finished_at,
                duration_ms
            FROM automation_runs
            WHERE id = ?
            """,
            (run_id,),
        ).fetchone()
    finally:
        conn.close()


def rows_to_count_map(rows: list[sqlite3.Row], key_name: str) -> dict:
    return {row[key_name] or "unknown": row["count"] for row in rows}


def count_storage_areas(rows: list[sqlite3.Row]) -> dict:
    counts: dict[str, int] = {}
    for row in rows:
        storage = get_storage_area(row["file_path"]) or "unknown"
        counts[storage] = counts.get(storage, 0) + 1
    return counts


def build_stats_payload() -> dict:
    conn = get_db_connection()
    try:
        summary = conn.execute(
            """
            SELECT
                COUNT(*) AS total,
                MIN(created_at) AS first_created_at,
                MAX(created_at) AS latest_created_at
            FROM items
            """
        ).fetchone()
        type_rows = conn.execute(
            """
            SELECT type, COUNT(*) AS count
            FROM items
            GROUP BY type
            ORDER BY type
            """
        ).fetchall()
        source_rows = conn.execute(
            """
            SELECT source, COUNT(*) AS count
            FROM items
            GROUP BY source
            ORDER BY source
            """
        ).fetchall()
        storage_rows = conn.execute(
            """
            SELECT file_path
            FROM items
            WHERE file_path IS NOT NULL AND file_path != ''
            """
        ).fetchall()
    finally:
        conn.close()

    return {
        "total": summary["total"],
        "first_created_at": summary["first_created_at"],
        "latest_created_at": summary["latest_created_at"],
        "by_type": rows_to_count_map(type_rows, "type"),
        "by_source": rows_to_count_map(source_rows, "source"),
        "by_storage": count_storage_areas(storage_rows),
    }


def fetch_recent_item_rows(limit: int) -> list[sqlite3.Row]:
    conn = get_db_connection()
    try:
        return conn.execute(
            f"""
            SELECT {ITEM_LIST_SELECT_FIELDS}
            FROM items
            ORDER BY id DESC
            LIMIT ?
            """,
            (limit,),
        ).fetchall()
    finally:
        conn.close()


def summarize_text(value: str | None, max_chars: int) -> str:
    if not value:
        return ""

    text = " ".join(part.strip() for part in str(value).splitlines() if part.strip())
    if len(text) <= max_chars:
        return text
    return text[: max_chars - 3].rstrip() + "..."


def build_overview_payload(recent_limit: int, preview_chars: int) -> dict:
    recent_rows = fetch_recent_item_rows(recent_limit)
    artifacts = list_review_artifacts()
    latest_overall = max(artifacts, key=artifact_sort_key) if artifacts else None

    return {
        "service": "axiom-receiver",
        "generated_at": utc_now().isoformat(timespec="seconds"),
        "recent": {
            "limit": recent_limit,
            "items": [row_to_item(row) for row in recent_rows],
        },
        "stats": build_stats_payload(),
        "artifacts": {
            "preview_chars": preview_chars,
            "total": len(artifacts),
            "counts": build_artifact_counts(artifacts),
            "latest_overall": build_artifact_summary_payload(latest_overall, preview_chars),
            "latest": build_artifact_latest_summary(artifacts, preview_chars),
        },
    }


def build_overview_text(payload: dict, preview_chars: int) -> str:
    stats = payload["stats"]
    recent = payload["recent"]
    artifacts = payload["artifacts"]
    latest = artifacts["latest"]
    lines = [
        "Axiom 总览",
        f"生成时间: {payload['generated_at']}",
        "",
        "数据统计",
        f"- 总条目: {stats['total']}",
        f"- 文本: {stats['by_type'].get('text', 0)}",
        f"- 图片: {stats['by_type'].get('image', 0)}",
        f"- 文档: {stats['by_type'].get('document', 0)}",
        f"- 音频: {stats['by_type'].get('audio', 0)}",
        f"- inbox: {stats['by_storage'].get('inbox', 0)}",
        f"- archive: {stats['by_storage'].get('archive', 0)}",
        "",
        "最近记录",
    ]

    if recent["items"]:
        for index, item in enumerate(recent["items"], start=1):
            content = summarize_text(item.get("content"), preview_chars) or "(无内容)"
            lines.append(
                f"{index}. [{item['type']}] {content} | {item['created_at']} | {item.get('source') or 'unknown'}"
            )
    else:
        lines.append("- 暂无记录")

    lines.extend(["", "自动化产物", f"- 总数: {artifacts['total']}"])

    latest_overall = artifacts.get("latest_overall")
    if latest_overall:
        overall_preview = summarize_text(latest_overall.get("preview"), preview_chars) or "(无预览)"
        lines.append(
            f"- 最新产物: {latest_overall['group']} {latest_overall.get('window') or latest_overall.get('mode') or ''} {latest_overall.get('report_date') or ''} {overall_preview}".strip()
        )

    artifact_sections = [
        ("Review 日报", latest["review"]["daily"]),
        ("Review 周报", latest["review"]["weekly"]),
        ("Inbox 报告", latest["inbox"]),
        ("Inbox 动作预演", latest["inbox-actions"]["dry-run"]),
        ("Inbox 动作执行", latest["inbox-actions"]["apply"]),
        ("动作历史日报", latest["inbox-action-history"]["daily"]),
        ("动作历史周报", latest["inbox-action-history"]["weekly"]),
    ]
    for label, artifact in artifact_sections:
        if artifact is None:
            continue
        preview = summarize_text(artifact.get("preview"), preview_chars) or "(无预览)"
        report_date = artifact.get("report_date") or artifact.get("generated_name") or ""
        lines.append(f"- {label}: {report_date} {preview}".rstrip())

    return "\n".join(lines) + "\n"


def resolve_stored_file_path(file_path_value: str | None) -> Path | None:
    if not file_path_value:
        return None

    file_path = Path(file_path_value).expanduser()
    if not file_path.is_absolute():
        file_path = AXIOM_ROOT / file_path
    return file_path.resolve()


def resolve_review_artifact_path(artifact_path_value: str) -> Path:
    artifact_path = (AXIOM_ROOT / artifact_path_value).resolve()
    if not is_path_under(artifact_path, REVIEWS_PATH):
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
        "modified_at": isoformat_timestamp(stat_result.st_mtime),
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


def build_artifact_counts(artifacts: list[dict]) -> dict:
    counts = {
        "review": {"daily": 0, "weekly": 0},
        "inbox": 0,
        "inbox-actions": {"dry-run": 0, "apply": 0},
        "inbox-action-history": {"daily": 0, "weekly": 0},
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
    }


def iter_automation_job_items(*, manual_only: bool = False):
    for job_id, job in AUTOMATION_JOBS.items():
        if manual_only and not job.get("manual_enabled", True):
            continue
        yield job_id, job


def build_automation_job_payload(job_id: str, job: dict) -> dict:
    return {
        "id": job_id,
        "label": job["label"],
        "description": job["description"],
        "artifact_group": job["artifact_group"],
        "artifact_window": job["artifact_window"],
        "artifact_mode": job["artifact_mode"],
        "manual_enabled": job.get("manual_enabled", True),
        "destructive": False,
        "default_date": current_local_date_iso(),
    }


def build_automation_command(job_id: str, run_date: str) -> list[str]:
    job = AUTOMATION_JOBS[job_id]
    command = [
        sys.executable,
        str(PROJECT_ROOT / "scripts" / job["script_name"]),
        "--root",
        str(AXIOM_ROOT),
        "--utc-offset",
        LOCAL_UTC_OFFSET,
    ]
    command.extend(job["build_args"](run_date))
    return command


def tail_output_lines(value: str, max_lines: int = 12) -> list[str]:
    return [line for line in value.splitlines() if line.strip()][-max_lines:]


def select_latest_artifact_for_job(job_id: str, run_date: str, preview_chars: int) -> dict | None:
    job = AUTOMATION_JOBS[job_id]
    matches = [
        artifact
        for artifact in list_review_artifacts()
        if artifact["group"] == job["artifact_group"]
        and artifact.get("window") == job["artifact_window"]
        and artifact.get("mode") == job["artifact_mode"]
        and artifact.get("report_date") == run_date
    ]
    if not matches:
        return None
    latest = max(matches, key=artifact_sort_key)
    return build_artifact_summary_payload(latest, preview_chars)


def acquire_automation_lock(job_id: str, run_date: str) -> bool:
    AUTOMATION_LOCK_PATH.parent.mkdir(parents=True, exist_ok=True)
    flags = os.O_CREAT | os.O_EXCL | os.O_WRONLY
    try:
        fd = os.open(str(AUTOMATION_LOCK_PATH), flags)
    except FileExistsError:
        return False

    with os.fdopen(fd, "w", encoding="utf-8") as file:
        file.write(
            "\n".join(
                [
                    f"job={job_id}",
                    f"date={run_date}",
                    f"pid={os.getpid()}",
                    f"started_at={utc_now().isoformat(timespec='seconds')}",
                ]
            )
            + "\n"
        )
    return True


def release_automation_lock() -> None:
    AUTOMATION_LOCK_PATH.unlink(missing_ok=True)


def derive_automation_message(
    status: str,
    stdout_tail: list[str],
    stderr_tail: list[str],
) -> str:
    if status == "success":
        return "completed"
    if stderr_tail:
        return stderr_tail[-1]
    if stdout_tail:
        return stdout_tail[-1]
    if status == "timeout":
        return "自动化任务执行超时"
    return "自动化任务执行失败"


def run_automation_job(job_id: str, run_date: str) -> subprocess.CompletedProcess[str]:
    command = build_automation_command(job_id, run_date)
    return subprocess.run(
        command,
        cwd=str(PROJECT_ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        timeout=AUTOMATION_TIMEOUT_SECONDS,
        check=False,
    )


def execute_logged_automation_job(job_id: str, run_date: str) -> tuple[dict, int]:
    job_payload = build_automation_job_payload(job_id, AUTOMATION_JOBS[job_id])

    if not acquire_automation_lock(job_id, run_date):
        return (
            {
                "ok": False,
                "error": {
                    "code": "automation_busy",
                    "message": "当前已有自动化任务在运行，请稍后重试",
                },
                "job": job_payload,
                "date": run_date,
            },
            409,
        )

    started_at_dt = utc_now()
    started_at = started_at_dt.isoformat(timespec="seconds")
    try:
        run_id = create_automation_run(job_id, run_date, started_at)
    except sqlite3.Error:
        release_automation_lock()
        logger.exception("failed to create automation run record: job=%s date=%s", job_id, run_date)
        return (
            {
                "ok": False,
                "error": {
                    "code": "database_write_failed",
                    "message": "数据库写入失败",
                },
                "job": job_payload,
                "date": run_date,
            },
            500,
        )

    try:
        result = run_automation_job(job_id, run_date)
    except subprocess.TimeoutExpired as exc:
        finished_at_dt = utc_now()
        finished_at = finished_at_dt.isoformat(timespec="seconds")
        duration_ms = max(0, int((finished_at_dt - started_at_dt).total_seconds() * 1000))
        stdout_tail = tail_output_lines(exc.stdout or "")
        stderr_tail = tail_output_lines(exc.stderr or "")
        message = derive_automation_message("timeout", stdout_tail, stderr_tail)
        finalize_automation_run(
            run_id,
            status="timeout",
            return_code=None,
            message=message,
            artifact_path=None,
            stdout_tail=stdout_tail,
            stderr_tail=stderr_tail,
            finished_at=finished_at,
            duration_ms=duration_ms,
        )
        logger.exception("automation job timed out: job=%s date=%s", job_id, run_date)
        run_row = get_automation_run_by_id(run_id)
        return (
            {
                "ok": False,
                "error": {
                    "code": "automation_timeout",
                    "message": "自动化任务执行超时",
                },
                "job": job_payload,
                "date": run_date,
                "stdout_tail": stdout_tail,
                "stderr_tail": stderr_tail,
                "run": row_to_automation_run(run_row) if run_row else None,
            },
            504,
        )
    except Exception as exc:
        finished_at_dt = utc_now()
        finished_at = finished_at_dt.isoformat(timespec="seconds")
        duration_ms = max(0, int((finished_at_dt - started_at_dt).total_seconds() * 1000))
        message = str(exc).strip() or "自动化任务执行失败"
        finalize_automation_run(
            run_id,
            status="failed",
            return_code=None,
            message=message,
            artifact_path=None,
            stdout_tail=[],
            stderr_tail=[message],
            finished_at=finished_at,
            duration_ms=duration_ms,
        )
        logger.exception("automation job crashed: job=%s date=%s", job_id, run_date)
        run_row = get_automation_run_by_id(run_id)
        return (
            {
                "ok": False,
                "error": {
                    "code": "automation_failed",
                    "message": message,
                },
                "job": job_payload,
                "date": run_date,
                "stdout_tail": [],
                "stderr_tail": [message],
                "run": row_to_automation_run(run_row) if run_row else None,
            },
            500,
        )
    finally:
        release_automation_lock()

    stdout_tail = tail_output_lines(result.stdout)
    stderr_tail = tail_output_lines(result.stderr)
    artifact = select_latest_artifact_for_job(job_id, run_date, preview_chars=240)
    artifact_path = artifact["relative_path"] if artifact else None
    status = "success" if result.returncode == 0 else "failed"
    message = derive_automation_message(status, stdout_tail, stderr_tail)
    finished_at_dt = utc_now()
    finished_at = finished_at_dt.isoformat(timespec="seconds")
    duration_ms = max(0, int((finished_at_dt - started_at_dt).total_seconds() * 1000))
    finalize_automation_run(
        run_id,
        status=status,
        return_code=result.returncode,
        message=message,
        artifact_path=artifact_path,
        stdout_tail=stdout_tail,
        stderr_tail=stderr_tail,
        finished_at=finished_at,
        duration_ms=duration_ms,
    )
    run_row = get_automation_run_by_id(run_id)

    if result.returncode != 0:
        logger.warning(
            "automation job failed: job=%s date=%s code=%s stderr=%s",
            job_id,
            run_date,
            result.returncode,
            "\n".join(stderr_tail),
        )
        return (
            {
                "ok": False,
                "error": {
                    "code": "automation_failed",
                    "message": message,
                },
                "job": job_payload,
                "date": run_date,
                "return_code": result.returncode,
                "stdout_tail": stdout_tail,
                "stderr_tail": stderr_tail,
                "run": row_to_automation_run(run_row) if run_row else None,
            },
            500,
        )

    logger.info("automation job completed: job=%s date=%s", job_id, run_date)
    return (
        {
            "ok": True,
            "message": "completed",
            "job": job_payload,
            "date": run_date,
            "return_code": result.returncode,
            "stdout_tail": stdout_tail,
            "stderr_tail": stderr_tail,
            "artifact": artifact,
            "run": row_to_automation_run(run_row) if run_row else None,
        },
        200,
    )


def cleanup_file(file_path: Path) -> None:
    try:
        file_path.unlink(missing_ok=True)
    except OSError:
        logger.exception("failed to clean up file after database error: %s", file_path)


# ===== 路由 =====
@app.route("/app", methods=["GET"], strict_slashes=False)
def app_shell():
    return render_template("app.html")


@app.route("/sw.js", methods=["GET"])
def service_worker():
    static_root = Path(app.static_folder or "").resolve()
    return send_file(static_root / "sw.js", mimetype="application/javascript")


@app.route("/health", methods=["GET"])
def health_check():
    conn = None
    try:
        conn = get_db_connection()
        conn.execute("SELECT 1")
    except sqlite3.Error:
        logger.exception("health check failed")
        return error_response(500, "database_error", "数据库不可用")
    finally:
        if conn is not None:
            conn.close()

    return ok_response(
        {
            "service": "axiom-receiver",
            "db": "ok",
            "inbox": "ok" if INBOX_PATH.exists() else "missing",
        }
    )


@app.route("/stats", methods=["GET"])
def stats():
    auth_error = require_key()
    if auth_error:
        return auth_error

    return ok_response(build_stats_payload())


@app.route("/overview", methods=["GET"])
def overview():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        recent_limit = read_recent_limit()
        preview_chars = read_preview_chars()
    except ValueError as exc:
        return error_response(400, "invalid_overview_param", str(exc))

    return ok_response(build_overview_payload(recent_limit, preview_chars))


@app.route("/overview/text", methods=["GET"])
def overview_text():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        recent_limit = read_recent_limit()
        preview_chars = read_preview_chars()
    except ValueError as exc:
        return error_response(400, "invalid_overview_param", str(exc))

    payload = build_overview_payload(recent_limit, preview_chars)
    body = build_overview_text(payload, preview_chars)
    return app.response_class(body, mimetype="text/plain")


@app.route("/add", methods=["GET", "POST"])
def add_note():
    auth_error = require_key()
    if auth_error:
        return auth_error

    text = get_request_field("text")
    if not text.strip():
        return error_response(400, "empty_text", "text 不能为空")

    source = get_request_field("source", DEFAULT_SOURCE).strip() or DEFAULT_SOURCE
    now = utc_now()
    created_at = now.isoformat(timespec="seconds")
    file_path = build_text_file_path(now)

    try:
        write_text_file_atomic(file_path, text)
    except OSError:
        logger.exception("failed to write inbox file")
        return error_response(500, "file_write_failed", "文件写入失败")

    try:
        item_id = insert_text_item(text, file_path, source, created_at)
    except sqlite3.Error:
        cleanup_file(file_path)
        logger.exception("failed to insert item into database")
        return error_response(500, "database_write_failed", "数据库写入失败")

    logger.info("saved text item id=%s file=%s", item_id, file_path.name)
    return ok_response(
        {
            "message": f"saved: {file_path.name}",
            "item": build_item_payload(
                item_id,
                ITEM_TYPE_TEXT,
                text,
                file_path,
                source,
                created_at,
            ),
        }
    )


@app.route("/upload", methods=["POST"])
def upload_file():
    auth_error = require_key()
    if auth_error:
        return auth_error

    transcript_file = request.files.get("transcript_file")
    uploaded_file = (
        request.files.get("file")
        or request.files.get("image")
        or request.files.get("document")
        or request.files.get("audio")
    )
    if uploaded_file is None or not uploaded_file.filename:
        return error_response(400, "empty_file", "file 不能为空")

    try:
        upload_info = parse_uploaded_file(uploaded_file)
    except ValueError as exc:
        return error_response(400, "invalid_file_type", str(exc))

    source = get_request_field("source", DEFAULT_SOURCE).strip() or DEFAULT_SOURCE
    item_type = upload_info["item_type"]
    original_name = upload_info["original_name"]
    mime_type = upload_info["mime_type"]
    content = read_upload_content(original_name, item_type)
    derived_text = None
    transcript_text = None
    if item_type == ITEM_TYPE_AUDIO:
        transcript_text = normalize_audio_transcript_text(
            get_request_field(
                "transcript_text",
                get_request_field("transcript", ""),
            ).strip()
        )
        if transcript_text is None and transcript_file is not None and transcript_file.filename:
            try:
                transcript_text = extract_audio_transcript_text_from_upload(transcript_file)
            except ValueError as exc:
                return error_response(400, "invalid_transcript_file", str(exc))

    now = utc_now()
    created_at = now.isoformat(timespec="seconds")
    file_path = build_binary_file_path(now, original_name)

    try:
        write_binary_file_atomic(file_path, uploaded_file)
    except ValueError:
        return error_response(400, "empty_file", "file 不能为空")
    except OSError:
        logger.exception("failed to write uploaded file")
        return error_response(500, "file_write_failed", "文件写入失败")

    size_bytes = file_path.stat().st_size
    if item_type == ITEM_TYPE_DOCUMENT:
        derived_text = extract_document_text(file_path, original_name)

    try:
        item_id = insert_item(
            item_type,
            content,
            file_path,
            source,
            created_at,
            original_name=original_name,
            mime_type=mime_type,
            size_bytes=size_bytes,
            derived_text=derived_text,
            transcript_text=transcript_text,
        )
    except sqlite3.Error:
        cleanup_file(file_path)
        logger.exception("failed to insert uploaded item into database")
        return error_response(500, "database_write_failed", "数据库写入失败")

    type_label = get_type_label(item_type)
    logger.info("saved %s item id=%s file=%s", item_type, item_id, file_path.name)
    return ok_response(
        {
            "message": f"saved: {file_path.name}",
            "item": build_item_payload(
                item_id,
                item_type,
                content,
                file_path,
                source,
                created_at,
                original_name,
                mime_type,
                size_bytes,
                derived_text=derived_text,
                transcript_text=transcript_text,
            ),
            "type_label": type_label,
        }
    )


@app.route("/item/<int:item_id>", methods=["GET"])
def get_item(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    return ok_response({"item": row_to_item(row)})


@app.route("/automation/jobs", methods=["GET"])
def list_automation_jobs():
    auth_error = require_key()
    if auth_error:
        return auth_error

    jobs = [build_automation_job_payload(job_id, job) for job_id, job in iter_automation_job_items(manual_only=True)]
    history_jobs = [build_automation_job_payload(job_id, job) for job_id, job in iter_automation_job_items()]
    return ok_response({"jobs": jobs, "history_jobs": history_jobs})


@app.route("/automation/runs", methods=["GET"])
def list_automation_runs():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        page, page_size = read_pagination(default_page_size=8)
        job_id = read_automation_job_filter()
        status = read_automation_status_filter()
    except ValueError as exc:
        return error_response(400, "invalid_automation_filter", str(exc))

    total, rows = fetch_automation_run_rows(
        page=page,
        page_size=page_size,
        job_id=job_id,
        status=status,
    )
    total_pages = (total + page_size - 1) // page_size
    return ok_response(
        {
            "job": job_id,
            "status": status,
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "items": [row_to_automation_run(row) for row in rows],
        }
    )


@app.route("/automation/run", methods=["POST"])
def run_automation():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        body = get_request_body_data()
    except ValueError as exc:
        return error_response(400, "invalid_request_body", str(exc))

    job_id = str(body.get("job") or "").strip()
    if not job_id:
        return error_response(400, "missing_job", "job 不能为空")
    if job_id not in AUTOMATION_JOBS:
        return error_response(400, "invalid_job", "job 不存在")
    if not AUTOMATION_JOBS[job_id].get("manual_enabled", True):
        return error_response(400, "manual_job_disabled", "job 不支持手动触发")

    try:
        run_date = read_optional_run_date(body)
    except ValueError as exc:
        return error_response(400, "invalid_run_date", str(exc))
    payload, status = execute_logged_automation_job(job_id, run_date)
    return jsonify(payload), status


@app.route("/item/<int:item_id>/update", methods=["POST"])
def update_item(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    try:
        body = get_request_body_data()
    except ValueError as exc:
        return error_response(400, "invalid_request_body", str(exc))

    content_provided, raw_content = read_optional_body_field(body, "content")
    source_provided, raw_source = read_optional_body_field(body, "source")
    transcript_provided, raw_transcript_text = read_optional_body_field(body, "transcript_text")

    if transcript_provided and row["type"] != ITEM_TYPE_AUDIO:
        return error_response(400, "invalid_transcript_target", "transcript_text 目前只支持 audio item")

    if not content_provided and not source_provided and not transcript_provided:
        return error_response(400, "missing_update_fields", "至少要提供 content、source 或 transcript_text")

    next_content = row["content"]
    if content_provided:
        if row["type"] == ITEM_TYPE_TEXT:
            if not raw_content.strip():
                return error_response(400, "empty_text", "text 不能为空")
            next_content = raw_content
        else:
            next_content = raw_content.strip()

    next_source = row["source"]
    if source_provided:
        cleaned_source = raw_source.strip()
        if not cleaned_source:
            return error_response(400, "empty_source", "source 不能为空")
        next_source = cleaned_source

    next_transcript_text = row["transcript_text"] if "transcript_text" in row.keys() else None
    if transcript_provided:
        next_transcript_text = normalize_extracted_text(raw_transcript_text)

    updated_fields: list[str] = []
    if next_content != row["content"]:
        updated_fields.append("content")
    if next_source != row["source"]:
        updated_fields.append("source")
    if next_transcript_text != row["transcript_text"]:
        updated_fields.append("transcript_text")

    if not updated_fields:
        return ok_response(
            {
                "message": "unchanged",
                "updated_fields": [],
                "item": row_to_item(row),
            }
        )

    file_path: Path | None = None
    rollback_content = row["content"] or ""
    content_written = False

    if row["type"] == ITEM_TYPE_TEXT and "content" in updated_fields:
        file_path = resolve_stored_file_path(row["file_path"])
        if file_path is None:
            return error_response(404, "file_not_found", "文本文件不存在")
        if not is_path_under(file_path, AXIOM_ROOT):
            logger.warning("blocked update outside root: item_id=%s path=%s", item_id, file_path)
            return error_response(403, "forbidden_file_path", "文件路径不允许访问")
        if not file_path.is_file():
            return error_response(404, "file_not_found", "文本文件不存在")

        try:
            write_text_file_atomic(file_path, next_content or "")
            content_written = True
        except OSError:
            logger.exception("failed to rewrite text file: item_id=%s", item_id)
            return error_response(500, "file_write_failed", "文本文件更新失败")

    try:
        update_item_content_source_and_transcript(
            item_id,
            next_content,
            next_source,
            next_transcript_text,
        )
    except sqlite3.Error:
        if content_written and file_path is not None:
            try:
                write_text_file_atomic(file_path, rollback_content)
            except OSError:
                logger.exception("failed to rollback text file after db error: item_id=%s", item_id)
        logger.exception("failed to update item in database: item_id=%s", item_id)
        return error_response(500, "database_write_failed", "数据库写入失败")

    updated_row = get_item_by_id(item_id)
    logger.info("updated item id=%s fields=%s", item_id, ",".join(updated_fields))
    return ok_response(
        {
            "message": "updated",
            "updated_fields": updated_fields,
            "item": row_to_item(updated_row),
        }
    )


@app.route("/file/<int:item_id>", methods=["GET"])
def get_item_file(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    file_path = resolve_stored_file_path(row["file_path"])
    if file_path is None:
        return error_response(404, "file_not_found", "文件不存在")

    if not is_path_under(file_path, AXIOM_ROOT):
        logger.warning("blocked file access outside root: item_id=%s path=%s", item_id, file_path)
        return error_response(403, "forbidden_file_path", "文件路径不允许访问")

    if not file_path.is_file():
        return error_response(404, "file_not_found", "文件不存在")

    download_name = build_download_name(
        row["original_name"] if "original_name" in row.keys() else None,
        file_path,
        row["id"],
    )
    return send_file(file_path, download_name=download_name)


@app.route("/artifacts", methods=["GET"])
def list_artifacts():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        page, page_size = read_pagination()
        group = read_artifact_group_filter()
        window = read_artifact_window_filter()
        mode = read_artifact_mode_filter()
        date_from, date_to = read_artifact_date_range()
    except ValueError as exc:
        return error_response(400, "invalid_artifact_filter", str(exc))

    sort = request.args.get("sort", "newest").strip().lower()
    if sort not in {"newest", "oldest"}:
        return error_response(400, "invalid_sort", "sort 只能是 newest 或 oldest")

    artifacts = [
        artifact
        for artifact in list_review_artifacts()
        if artifact_matches_filters(
            artifact,
            group=group,
            window=window,
            mode=mode,
            date_from=date_from,
            date_to=date_to,
        )
    ]

    artifacts.sort(
        key=lambda artifact: (artifact["modified_at"], artifact["relative_path"]),
        reverse=(sort == "newest"),
    )

    total = len(artifacts)
    offset = (page - 1) * page_size
    page_items = artifacts[offset : offset + page_size]
    total_pages = (total + page_size - 1) // page_size

    return ok_response(
        {
            "group": group,
            "window": window,
            "mode": mode,
            "date_from": date_from.isoformat() if date_from else None,
            "date_to": date_to.isoformat() if date_to else None,
            "sort": sort,
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "items": page_items,
        }
    )


@app.route("/artifacts/summary", methods=["GET"])
def artifact_summary():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        group = read_artifact_group_filter()
        window = read_artifact_window_filter()
        mode = read_artifact_mode_filter()
        date_from, date_to = read_artifact_date_range()
        preview_chars = read_preview_chars()
    except ValueError as exc:
        return error_response(400, "invalid_artifact_filter", str(exc))

    artifacts = [
        artifact
        for artifact in list_review_artifacts()
        if artifact_matches_filters(
            artifact,
            group=group,
            window=window,
            mode=mode,
            date_from=date_from,
            date_to=date_to,
        )
    ]

    latest_overall = max(artifacts, key=artifact_sort_key) if artifacts else None

    return ok_response(
        {
            "group": group,
            "window": window,
            "mode": mode,
            "date_from": date_from.isoformat() if date_from else None,
            "date_to": date_to.isoformat() if date_to else None,
            "preview_chars": preview_chars,
            "total": len(artifacts),
            "counts": build_artifact_counts(artifacts),
            "latest_overall": build_artifact_summary_payload(latest_overall, preview_chars),
            "latest": build_artifact_latest_summary(artifacts, preview_chars),
        }
    )


@app.route("/artifacts/file/<path:artifact_path>", methods=["GET"])
def get_artifact_file(artifact_path: str):
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        file_path = resolve_review_artifact_path(artifact_path)
    except ValueError:
        logger.warning("blocked artifact access outside reviews: path=%s", artifact_path)
        return error_response(403, "forbidden_artifact_path", "artifact 路径不允许访问")

    if not file_path.is_file():
        return error_response(404, "artifact_not_found", "artifact 不存在")

    if file_path.suffix.lower() != ".md":
        return error_response(400, "invalid_artifact_type", "当前只支持读取 markdown artifact")

    return send_file(file_path, download_name=file_path.name, mimetype="text/markdown")


@app.route("/archive/<int:item_id>", methods=["POST"])
def archive_item(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    file_path = resolve_stored_file_path(row["file_path"])
    if file_path is None:
        return error_response(404, "file_not_found", "文件不存在")

    if not is_path_under(file_path, AXIOM_ROOT):
        logger.warning("blocked archive outside root: item_id=%s path=%s", item_id, file_path)
        return error_response(403, "forbidden_file_path", "文件路径不允许访问")

    if is_path_under(file_path, ARCHIVE_PATH):
        return ok_response({"message": "already archived", "item": row_to_item(row)})

    if not file_path.is_file():
        return error_response(404, "file_not_found", "文件不存在")

    archive_path = build_archive_file_path(utc_now(), file_path)
    try:
        os.replace(file_path, archive_path)
        update_item_file_path(item_id, archive_path)
    except OSError:
        logger.exception("failed to archive item: item_id=%s", item_id)
        return error_response(500, "archive_failed", "归档失败")

    updated_row = get_item_by_id(item_id)
    logger.info("archived item id=%s file=%s", item_id, archive_path.name)
    return ok_response({"message": "archived", "item": row_to_item(updated_row)})


@app.route("/restore/<int:item_id>", methods=["POST"])
def restore_item(item_id: int):
    auth_error = require_key()
    if auth_error:
        return auth_error

    row = get_item_by_id(item_id)
    if row is None:
        return error_response(404, "item_not_found", "item 不存在")

    file_path = resolve_stored_file_path(row["file_path"])
    if file_path is None:
        return error_response(404, "file_not_found", "文件不存在")

    if not is_path_under(file_path, AXIOM_ROOT):
        logger.warning("blocked restore outside root: item_id=%s path=%s", item_id, file_path)
        return error_response(403, "forbidden_file_path", "文件路径不允许访问")

    if is_path_under(file_path, INBOX_PATH):
        return ok_response({"message": "already restored", "item": row_to_item(row)})

    if not is_path_under(file_path, ARCHIVE_PATH):
        return error_response(400, "invalid_storage", "当前文件不在 archive 中")

    if not file_path.is_file():
        return error_response(404, "file_not_found", "文件不存在")

    restore_path = build_restore_file_path(file_path)
    try:
        os.replace(file_path, restore_path)
        update_item_file_path(item_id, restore_path)
    except OSError:
        logger.exception("failed to restore item: item_id=%s", item_id)
        return error_response(500, "restore_failed", "恢复失败")

    updated_row = get_item_by_id(item_id)
    logger.info("restored item id=%s file=%s", item_id, restore_path.name)
    return ok_response({"message": "restored", "item": row_to_item(updated_row)})


@app.route("/recent", methods=["GET"])
def recent_items():
    auth_error = require_key()
    if auth_error:
        return auth_error

    try:
        page, page_size = read_pagination()
    except ValueError as exc:
        return error_response(400, "invalid_pagination", str(exc))

    sort = request.args.get("sort", "newest").strip().lower()
    if sort not in {"newest", "oldest"}:
        return error_response(400, "invalid_sort", "sort 只能是 newest 或 oldest")

    try:
        item_type = read_item_type_filter()
    except ValueError as exc:
        return error_response(400, "invalid_type", str(exc))

    try:
        storage = read_storage_filter()
    except ValueError as exc:
        return error_response(400, "invalid_storage", str(exc))

    try:
        created_from, created_to = read_created_range()
    except ValueError as exc:
        return error_response(400, "invalid_created_range", str(exc))

    source = read_source_filter()
    filter_conditions, filter_params = build_item_filter_conditions(
        item_type,
        storage,
        source,
        created_from,
        created_to,
    )
    where_clause = join_conditions(filter_conditions, "WHERE")

    order_clause = "id DESC" if sort == "newest" else "id ASC"
    offset = (page - 1) * page_size

    conn = get_db_connection()
    try:
        total = conn.execute(
            f"SELECT COUNT(*) AS total FROM items {where_clause}",
            filter_params,
        ).fetchone()["total"]
        rows = conn.execute(
            f"""
            SELECT {ITEM_LIST_SELECT_FIELDS}
            FROM items
            {where_clause}
            ORDER BY {order_clause}
            LIMIT ? OFFSET ?
            """,
            (*filter_params, page_size, offset),
        ).fetchall()
    finally:
        conn.close()

    total_pages = (total + page_size - 1) // page_size
    return ok_response(
        {
            "sort": sort,
            "type": item_type,
            "storage": storage,
            "source": source,
            "created_from": created_from,
            "created_to": created_to,
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "items": [row_to_item(row) for row in rows],
        }
    )


@app.route("/search", methods=["GET"])
def search_items():
    auth_error = require_key()
    if auth_error:
        return auth_error

    query = request.args.get("q", "").strip()
    if not query:
        return error_response(400, "empty_query", "q 不能为空")

    try:
        page, page_size = read_pagination()
    except ValueError as exc:
        return error_response(400, "invalid_pagination", str(exc))

    sort = request.args.get("sort", "relevance").strip().lower()
    if sort not in {"relevance", "newest", "oldest"}:
        return error_response(400, "invalid_sort", "sort 只能是 relevance、newest 或 oldest")

    try:
        item_type = read_item_type_filter()
    except ValueError as exc:
        return error_response(400, "invalid_type", str(exc))

    try:
        storage = read_storage_filter()
    except ValueError as exc:
        return error_response(400, "invalid_storage", str(exc))

    try:
        created_from, created_to = read_created_range()
    except ValueError as exc:
        return error_response(400, "invalid_created_range", str(exc))

    source = read_source_filter()
    escaped_query = escape_like(query)
    exact_match = query
    prefix_match = f"{escaped_query}%"
    fuzzy_match = f"%{escaped_query}%"
    offset = (page - 1) * page_size

    if sort == "newest":
        order_clause = "id DESC"
    elif sort == "oldest":
        order_clause = "id ASC"
    else:
        order_clause = "score DESC, id DESC"

    filter_conditions, filter_params = build_item_filter_conditions(
        item_type,
        storage,
        source,
        created_from,
        created_to,
    )
    filter_clause = join_conditions(filter_conditions, "AND")

    conn = get_db_connection()
    try:
        total = conn.execute(
            f"""
            SELECT COUNT(*) AS total
            FROM items
            WHERE (
                COALESCE(content, '') LIKE ? ESCAPE '\\'
                OR COALESCE(original_name, '') LIKE ? ESCAPE '\\'
                OR COALESCE(derived_text, '') LIKE ? ESCAPE '\\'
                OR COALESCE(transcript_text, '') LIKE ? ESCAPE '\\'
            )
            {filter_clause}
            """,
            (fuzzy_match, fuzzy_match, fuzzy_match, fuzzy_match, *filter_params),
        ).fetchone()["total"]

        if sort == "relevance":
            rows = conn.execute(
                f"""
                SELECT
                    {ITEM_LIST_SELECT_FIELDS},
                    (
                        CASE
                            WHEN COALESCE(content, '') = ? THEN 100
                            WHEN COALESCE(content, '') LIKE ? ESCAPE '\\' THEN 60
                            WHEN COALESCE(content, '') LIKE ? ESCAPE '\\' THEN 30
                            ELSE 0
                        END
                        +
                        CASE
                            WHEN COALESCE(original_name, '') = ? THEN 90
                            WHEN COALESCE(original_name, '') LIKE ? ESCAPE '\\' THEN 50
                            WHEN COALESCE(original_name, '') LIKE ? ESCAPE '\\' THEN 25
                            ELSE 0
                        END
                        +
                        CASE
                            WHEN COALESCE(derived_text, '') = ? THEN 70
                            WHEN COALESCE(derived_text, '') LIKE ? ESCAPE '\\' THEN 35
                            WHEN COALESCE(derived_text, '') LIKE ? ESCAPE '\\' THEN 15
                            ELSE 0
                        END
                        +
                        CASE
                            WHEN COALESCE(transcript_text, '') = ? THEN 75
                            WHEN COALESCE(transcript_text, '') LIKE ? ESCAPE '\\' THEN 38
                            WHEN COALESCE(transcript_text, '') LIKE ? ESCAPE '\\' THEN 18
                            ELSE 0
                        END
                        +
                        CASE
                            WHEN LENGTH(COALESCE(content, original_name, transcript_text, derived_text, '')) <= 20 THEN 8
                            WHEN LENGTH(COALESCE(content, original_name, transcript_text, derived_text, '')) <= 50 THEN 4
                            ELSE 0
                        END
                    ) AS score
                FROM items
                WHERE (
                    COALESCE(content, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(original_name, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(derived_text, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(transcript_text, '') LIKE ? ESCAPE '\\'
                )
                {filter_clause}
                ORDER BY {order_clause}
                LIMIT ? OFFSET ?
                """,
                (
                    exact_match,
                    prefix_match,
                    fuzzy_match,
                    exact_match,
                    prefix_match,
                    fuzzy_match,
                    exact_match,
                    prefix_match,
                    fuzzy_match,
                    exact_match,
                    prefix_match,
                    fuzzy_match,
                    fuzzy_match,
                    fuzzy_match,
                    fuzzy_match,
                    fuzzy_match,
                    *filter_params,
                    page_size,
                    offset,
                ),
            ).fetchall()
        else:
            rows = conn.execute(
                f"""
                SELECT {ITEM_LIST_SELECT_FIELDS}
                FROM items
                WHERE (
                    COALESCE(content, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(original_name, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(derived_text, '') LIKE ? ESCAPE '\\'
                    OR COALESCE(transcript_text, '') LIKE ? ESCAPE '\\'
                )
                {filter_clause}
                ORDER BY {order_clause}
                LIMIT ? OFFSET ?
                """,
                (fuzzy_match, fuzzy_match, fuzzy_match, fuzzy_match, *filter_params, page_size, offset),
            ).fetchall()
    finally:
        conn.close()

    total_pages = (total + page_size - 1) // page_size
    return ok_response(
        {
            "query": query,
            "sort": sort,
            "type": item_type,
            "storage": storage,
            "source": source,
            "created_from": created_from,
            "created_to": created_to,
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "items": [row_to_item(row, include_score=(sort == "relevance")) for row in rows],
        }
    )


# ===== 错误处理 =====
@app.errorhandler(HTTPException)
def handle_http_exception(exc: HTTPException):
    code = exc.code or 500
    return error_response(code, exc.name.lower().replace(" ", "_"), exc.description)


@app.errorhandler(Exception)
def handle_unexpected_exception(exc: Exception):
    logger.exception("unexpected error: %s", exc)
    return error_response(500, "internal_error", "服务内部错误")


init_app_storage()


if __name__ == "__main__":
    host = os.environ.get("AXIOM_HOST", "0.0.0.0")
    port = int(os.environ.get("AXIOM_PORT", "5000"))
    app.run(host=host, port=port)

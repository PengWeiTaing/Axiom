from __future__ import annotations

import hmac
import logging
import os
import sqlite3
from datetime import date, datetime, timezone
from pathlib import Path
from urllib.parse import quote
from uuid import uuid4

from flask import Flask, jsonify, render_template, request, send_file
from werkzeug.exceptions import HTTPException
from werkzeug.utils import secure_filename


app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


# ===== 基础配置 =====
# 默认保持 VPS 目录结构；环境变量用于本地测试或后续部署覆盖。
AXIOM_ROOT = Path(os.environ.get("AXIOM_ROOT", "/opt/axiom")).resolve()
INBOX_PATH = Path(os.environ.get("AXIOM_INBOX_PATH", AXIOM_ROOT / "data" / "inbox")).resolve()
ARCHIVE_PATH = Path(os.environ.get("AXIOM_ARCHIVE_PATH", AXIOM_ROOT / "data" / "archive")).resolve()
DB_PATH = Path(os.environ.get("AXIOM_DB_PATH", AXIOM_ROOT / "db" / "axiom.db")).resolve()
SECRET_KEY = os.environ.get("AXIOM_SECRET_KEY", os.environ.get("AXIOM_KEY", "axiom123"))
LOG_PATH = os.environ.get("AXIOM_LOG_PATH", "")
MAX_UPLOAD_BYTES = int(os.environ.get("AXIOM_MAX_UPLOAD_BYTES", str(20 * 1024 * 1024)))
app.config["MAX_CONTENT_LENGTH"] = MAX_UPLOAD_BYTES

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 10
MAX_PAGE_SIZE = 50

DEFAULT_SOURCE = "ios_shortcut"
ITEM_TYPE_TEXT = "text"
ITEM_TYPE_IMAGE = "image"
ITEM_TYPES = {ITEM_TYPE_TEXT, ITEM_TYPE_IMAGE}
STORAGE_AREAS = {"inbox": INBOX_PATH, "archive": ARCHIVE_PATH}
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".heif"}
REVIEWS_PATH = Path(os.environ.get("AXIOM_REVIEWS_PATH", AXIOM_ROOT / "data" / "reviews")).resolve()
ARTIFACT_GROUPS = {"review", "inbox", "inbox-actions", "inbox-action-history"}
ARTIFACT_WINDOWS = {"daily", "weekly"}
ARTIFACT_MODES = {"dry-run", "apply"}


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
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            "CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at)"
        )
        conn.execute("CREATE INDEX IF NOT EXISTS idx_items_type ON items(type)")
        conn.execute("CREATE INDEX IF NOT EXISTS idx_items_source ON items(source)")
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
) -> dict:
    item = {
        "id": item_id,
        "type": item_type,
        "content": content,
        "file_path": str(file_path) if file_path else None,
        "file_url": build_file_url(item_id) if file_path else None,
        "storage": get_storage_area(file_path),
        "source": source,
        "created_at": created_at,
    }
    return item


def row_to_item(row: sqlite3.Row, include_score: bool = False) -> dict:
    item = build_item_payload(
        row["id"],
        row["type"],
        row["content"],
        row["file_path"],
        row["source"],
        row["created_at"],
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


def build_image_file_path(now: datetime, filename: str) -> Path:
    return build_inbox_file_path(now, Path(filename).suffix.lower())


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
) -> int:
    conn = get_db_connection()
    try:
        cursor = conn.execute(
            """
            INSERT INTO items (type, content, file_path, source, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (item_type, content, str(file_path), source, created_at),
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
            """
            SELECT id, type, content, file_path, source, created_at
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


def update_item_content_and_source(
    item_id: int,
    content: str | None,
    source: str | None,
) -> None:
    conn = get_db_connection()
    try:
        conn.execute(
            """
            UPDATE items
            SET content = ?, source = ?
            WHERE id = ?
            """,
            (content, source, item_id),
        )
        conn.commit()
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
            """
            SELECT id, type, content, file_path, source, created_at
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
def upload_image():
    auth_error = require_key()
    if auth_error:
        return auth_error

    uploaded_file = request.files.get("file") or request.files.get("image")
    if uploaded_file is None or not uploaded_file.filename:
        return error_response(400, "empty_file", "file 不能为空")

    original_filename = uploaded_file.filename.strip()
    extension = Path(original_filename).suffix.lower()
    if extension not in IMAGE_EXTENSIONS:
        allowed = ", ".join(sorted(IMAGE_EXTENSIONS))
        return error_response(400, "invalid_file_type", f"只支持图片格式: {allowed}")

    source = get_request_field("source", DEFAULT_SOURCE).strip() or DEFAULT_SOURCE
    caption = get_request_field("caption").strip()
    content = caption or original_filename or secure_filename(original_filename) or "image"
    now = utc_now()
    created_at = now.isoformat(timespec="seconds")
    file_path = build_image_file_path(now, original_filename)

    try:
        write_binary_file_atomic(file_path, uploaded_file)
    except ValueError:
        return error_response(400, "empty_file", "file 不能为空")
    except OSError:
        logger.exception("failed to write uploaded image")
        return error_response(500, "file_write_failed", "文件写入失败")

    try:
        item_id = insert_item(ITEM_TYPE_IMAGE, content, file_path, source, created_at)
    except sqlite3.Error:
        cleanup_file(file_path)
        logger.exception("failed to insert image item into database")
        return error_response(500, "database_write_failed", "数据库写入失败")

    logger.info("saved image item id=%s file=%s", item_id, file_path.name)
    return ok_response(
        {
            "message": f"saved: {file_path.name}",
            "item": build_item_payload(
                item_id,
                ITEM_TYPE_IMAGE,
                content,
                file_path,
                source,
                created_at,
            ),
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

    if not content_provided and not source_provided:
        return error_response(400, "missing_update_fields", "至少要提供 content 或 source")

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

    updated_fields: list[str] = []
    if next_content != row["content"]:
        updated_fields.append("content")
    if next_source != row["source"]:
        updated_fields.append("source")

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
        update_item_content_and_source(item_id, next_content, next_source)
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

    return send_file(file_path, download_name=file_path.name)


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
            SELECT id, type, content, file_path, source, created_at
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
            WHERE content LIKE ? ESCAPE '\\'
            {filter_clause}
            """,
            (fuzzy_match, *filter_params),
        ).fetchone()["total"]

        if sort == "relevance":
            rows = conn.execute(
                f"""
                SELECT
                    id,
                    type,
                    content,
                    file_path,
                    source,
                    created_at,
                    (
                        CASE
                            WHEN content = ? THEN 100
                            WHEN content LIKE ? ESCAPE '\\' THEN 60
                            WHEN content LIKE ? ESCAPE '\\' THEN 30
                            ELSE 0
                        END
                        +
                        CASE
                            WHEN LENGTH(content) <= 20 THEN 8
                            WHEN LENGTH(content) <= 50 THEN 4
                            ELSE 0
                        END
                    ) AS score
                FROM items
                WHERE content LIKE ? ESCAPE '\\'
                {filter_clause}
                ORDER BY {order_clause}
                LIMIT ? OFFSET ?
                """,
                (
                    exact_match,
                    prefix_match,
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
                SELECT id, type, content, file_path, source, created_at
                FROM items
                WHERE content LIKE ? ESCAPE '\\'
                {filter_clause}
                ORDER BY {order_clause}
                LIMIT ? OFFSET ?
                """,
                (fuzzy_match, *filter_params, page_size, offset),
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

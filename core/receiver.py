from __future__ import annotations

import hmac
import logging
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from flask import Flask, jsonify, request, send_file
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


def build_item_filter_conditions(
    item_type: str | None,
    storage: str | None,
    source: str | None,
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

    return conditions, params


def join_conditions(conditions: list[str], prefix: str) -> str:
    if not conditions:
        return ""
    return f"{prefix} " + " AND ".join(conditions)


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


def build_inbox_file_path(now: datetime, extension: str) -> Path:
    timestamp = now.strftime("%Y%m%d_%H%M%S_%f")
    return INBOX_PATH / f"{timestamp}_{uuid4().hex[:8]}{extension}"


def build_text_file_path(now: datetime) -> Path:
    return build_inbox_file_path(now, ".txt")


def build_image_file_path(now: datetime, filename: str) -> Path:
    return build_inbox_file_path(now, Path(filename).suffix.lower())


def build_archive_file_path(now: datetime, file_path: Path) -> Path:
    archive_dir = ARCHIVE_PATH / now.strftime("%Y%m")
    archive_dir.mkdir(parents=True, exist_ok=True)
    archive_path = archive_dir / file_path.name
    counter = 1

    while archive_path.exists():
        archive_path = archive_dir / f"{file_path.stem}_{counter}{file_path.suffix}"
        counter += 1

    return archive_path


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


def rows_to_count_map(rows: list[sqlite3.Row], key_name: str) -> dict:
    return {row[key_name] or "unknown": row["count"] for row in rows}


def count_storage_areas(rows: list[sqlite3.Row]) -> dict:
    counts: dict[str, int] = {}
    for row in rows:
        storage = get_storage_area(row["file_path"]) or "unknown"
        counts[storage] = counts.get(storage, 0) + 1
    return counts


def resolve_stored_file_path(file_path_value: str | None) -> Path | None:
    if not file_path_value:
        return None

    file_path = Path(file_path_value).expanduser()
    if not file_path.is_absolute():
        file_path = AXIOM_ROOT / file_path
    return file_path.resolve()


def cleanup_file(file_path: Path) -> None:
    try:
        file_path.unlink(missing_ok=True)
    except OSError:
        logger.exception("failed to clean up file after database error: %s", file_path)


# ===== 路由 =====
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

    return ok_response(
        {
            "total": summary["total"],
            "first_created_at": summary["first_created_at"],
            "latest_created_at": summary["latest_created_at"],
            "by_type": rows_to_count_map(type_rows, "type"),
            "by_source": rows_to_count_map(source_rows, "source"),
            "by_storage": count_storage_areas(storage_rows),
        }
    )


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

    source = read_source_filter()
    filter_conditions, filter_params = build_item_filter_conditions(
        item_type,
        storage,
        source,
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

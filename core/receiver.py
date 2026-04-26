from __future__ import annotations

import hmac
import logging
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from flask import Flask, jsonify, request
from werkzeug.exceptions import HTTPException


app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


# ===== 基础配置 =====
# 默认保持 VPS 目录结构；环境变量用于本地测试或后续部署覆盖。
AXIOM_ROOT = Path(os.environ.get("AXIOM_ROOT", "/opt/axiom")).resolve()
INBOX_PATH = Path(os.environ.get("AXIOM_INBOX_PATH", AXIOM_ROOT / "data" / "inbox")).resolve()
DB_PATH = Path(os.environ.get("AXIOM_DB_PATH", AXIOM_ROOT / "db" / "axiom.db")).resolve()
SECRET_KEY = os.environ.get("AXIOM_SECRET_KEY", os.environ.get("AXIOM_KEY", "axiom123"))
LOG_PATH = os.environ.get("AXIOM_LOG_PATH", "")

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 10
MAX_PAGE_SIZE = 50

DEFAULT_SOURCE = "ios_shortcut"
ITEM_TYPE_TEXT = "text"


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


def row_to_item(row: sqlite3.Row, include_score: bool = False) -> dict:
    item = {
        "id": row["id"],
        "type": row["type"],
        "content": row["content"],
        "file_path": row["file_path"],
        "source": row["source"],
        "created_at": row["created_at"],
    }
    if include_score and "score" in row.keys():
        item["score"] = row["score"]
    return item


def escape_like(value: str) -> str:
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def build_text_file_path(now: datetime) -> Path:
    timestamp = now.strftime("%Y%m%d_%H%M%S_%f")
    return INBOX_PATH / f"{timestamp}_{uuid4().hex[:8]}.txt"


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


def insert_text_item(text: str, file_path: Path, source: str, created_at: str) -> int:
    conn = get_db_connection()
    try:
        cursor = conn.execute(
            """
            INSERT INTO items (type, content, file_path, source, created_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (ITEM_TYPE_TEXT, text, str(file_path), source, created_at),
        )
        conn.commit()
        return int(cursor.lastrowid)
    finally:
        conn.close()


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
            "item": {
                "id": item_id,
                "type": ITEM_TYPE_TEXT,
                "content": text,
                "file_path": str(file_path),
                "source": source,
                "created_at": created_at,
            },
        }
    )


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

    order_clause = "id DESC" if sort == "newest" else "id ASC"
    offset = (page - 1) * page_size

    conn = get_db_connection()
    try:
        total = conn.execute("SELECT COUNT(*) AS total FROM items").fetchone()["total"]
        rows = conn.execute(
            f"""
            SELECT id, type, content, file_path, source, created_at
            FROM items
            ORDER BY {order_clause}
            LIMIT ? OFFSET ?
            """,
            (page_size, offset),
        ).fetchall()
    finally:
        conn.close()

    total_pages = (total + page_size - 1) // page_size
    return ok_response(
        {
            "sort": sort,
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

    conn = get_db_connection()
    try:
        total = conn.execute(
            """
            SELECT COUNT(*) AS total
            FROM items
            WHERE content LIKE ? ESCAPE '\\'
            """,
            (fuzzy_match,),
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
                ORDER BY {order_clause}
                LIMIT ? OFFSET ?
                """,
                (exact_match, prefix_match, fuzzy_match, fuzzy_match, page_size, offset),
            ).fetchall()
        else:
            rows = conn.execute(
                f"""
                SELECT id, type, content, file_path, source, created_at
                FROM items
                WHERE content LIKE ? ESCAPE '\\'
                ORDER BY {order_clause}
                LIMIT ? OFFSET ?
                """,
                (fuzzy_match, page_size, offset),
            ).fetchall()
    finally:
        conn.close()

    total_pages = (total + page_size - 1) // page_size
    return ok_response(
        {
            "query": query,
            "sort": sort,
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

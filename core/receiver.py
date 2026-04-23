from flask import Flask, request, jsonify
from datetime import datetime
import os
import sqlite3

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
# ===== 基础配置 =====
INBOX_PATH = "/opt/axiom/data/inbox"
DB_PATH = "/opt/axiom/db/axiom.db"
SECRET_KEY = "axiom123"

# 确保目录存在
os.makedirs(INBOX_PATH, exist_ok=True)
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)


# ===== 数据库初始化 =====
def init_db():
    # 连接 SQLite 数据库
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # 创建 items 表（如果不存在）
    c.execute("""
    CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        content TEXT,
        file_path TEXT,
        source TEXT,
        created_at TEXT NOT NULL
    )
    """)

    conn.commit()
    conn.close()


# 程序启动时初始化数据库
init_db()


# ===== 工具函数：统一鉴权 =====
def check_key(key):
    """
    检查请求携带的 key 是否正确
    正确返回 True，错误返回 False
    """
    return key == SECRET_KEY


# ===== 工具函数：获取数据库连接 =====
def get_db_connection():
    """
    创建数据库连接，并让查询结果支持按列名取值
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ===== 写入接口 /add =====
@app.route("/add", methods=["GET"])
def add_note():
    # 读取 URL 参数里的 text 和 key
    text = request.args.get("text", "")
    key = request.args.get("key", "")

    # 校验密钥
    if not check_key(key):
        return "unauthorized", 403

    # 校验内容不能为空
    if not text:
        return "no text provided", 400

    # 获取当前时间
    now = datetime.now()

    # 生成文件名时间戳
    filename_time = now.strftime("%Y%m%d_%H%M%S")

    # 数据库存储时间
    created_at = now.isoformat()

    # 生成 txt 文件名和完整路径
    filename = f"{filename_time}.txt"
    filepath = os.path.join(INBOX_PATH, filename)

    # 写入 txt 文件
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(text)

    # 写入数据库
    conn = get_db_connection()
    c = conn.cursor()

    c.execute(
        """
        INSERT INTO items (type, content, file_path, source, created_at)
        VALUES (?, ?, ?, ?, ?)
        """,
        ("text", text, filepath, "ios_shortcut", created_at)
    )

    conn.commit()
    conn.close()

    return f"saved: {filename}", 200


# ===== 最近记录接口 /recent =====
@app.route("/recent", methods=["GET"])
def recent_items():
    # 读取参数
    key = request.args.get("key", "")
    limit = request.args.get("limit", "10")

    # 校验密钥
    if not check_key(key):
        return "unauthorized", 403

    # 校验 limit
    try:
        limit = int(limit)
    except ValueError:
        return "invalid limit", 400

    if limit <= 0:
        return "limit must be greater than 0", 400

    conn = get_db_connection()
    c = conn.cursor()

    # 查询最近记录
    c.execute(
        """
        SELECT id, type, content, file_path, source, created_at
        FROM items
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,)
    )

    rows = c.fetchall()
    conn.close()

    # 整理成 JSON 返回
    results = []
    for row in rows:
        results.append({
            "id": row["id"],
            "type": row["type"],
            "content": row["content"],
            "file_path": row["file_path"],
            "source": row["source"],
            "created_at": row["created_at"]
        })

    return jsonify(results), 200


# ===== 搜索接口 /search =====
@app.route("/search", methods=["GET"])
def search_items():
    """
    支持：
    - q: 搜索关键词
    - page: 第几页（默认 1）
    - page_size: 每页多少条（默认 10）
    - sort:
        relevance -> 按相关性排序（默认）
        newest    -> 按最新时间排序
        oldest    -> 按最旧时间排序
    """
    key = request.args.get("key", "")
    q = request.args.get("q", "").strip()
    page = request.args.get("page", "1")
    page_size = request.args.get("page_size", "10")
    sort = request.args.get("sort", "relevance").strip().lower()

    # 校验密钥
    if not check_key(key):
        return "unauthorized", 403

    # 校验搜索词
    if not q:
        return "no query provided", 400

    # 校验分页参数
    try:
        page = int(page)
        page_size = int(page_size)
    except ValueError:
        return "page and page_size must be integers", 400

    if page <= 0:
        return "page must be greater than 0", 400

    if page_size <= 0:
        return "page_size must be greater than 0", 400

    # 防止一次查太多
    if page_size > 50:
        page_size = 50

    offset = (page - 1) * page_size

    # 构造 LIKE 模式
    exact_match = q
    prefix_match = f"{q}%"
    fuzzy_match = f"%{q}%"

    conn = get_db_connection()
    c = conn.cursor()

    # 先查总数，便于分页
    c.execute(
        """
        SELECT COUNT(*) AS total
        FROM items
        WHERE content LIKE ?
        """,
        (fuzzy_match,)
    )
    total = c.fetchone()["total"]

    # 根据排序模式选择 SQL
    if sort == "newest":
        order_clause = "created_at DESC, id DESC"
    elif sort == "oldest":
        order_clause = "created_at ASC, id ASC"
    else:
        # relevance：手动做一个基础相关性评分
        # 规则：
        # 1. content 完全等于 q -> 分最高
        # 2. content 以 q 开头 -> 次高
        # 3. content 包含 q -> 基础命中
        # 4. 文本越短，通常越像精准笔记标题/短想法，略加一点优势
        # 5. 同分时按新记录优先
        order_clause = """
        score DESC,
        created_at DESC,
        id DESC
        """

    if sort in ["newest", "oldest"]:
        c.execute(
            f"""
            SELECT id, type, content, file_path, source, created_at
            FROM items
            WHERE content LIKE ?
            ORDER BY {order_clause}
            LIMIT ? OFFSET ?
            """,
            (fuzzy_match, page_size, offset)
        )
    else:
        c.execute(
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
                        WHEN content LIKE ? THEN 60
                        WHEN content LIKE ? THEN 30
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
            WHERE content LIKE ?
            ORDER BY {order_clause}
            LIMIT ? OFFSET ?
            """,
            (exact_match, prefix_match, fuzzy_match, fuzzy_match, page_size, offset)
        )

    rows = c.fetchall()
    conn.close()

    # 整理结果
    items = []
    for row in rows:
        item = {
            "id": row["id"],
            "type": row["type"],
            "content": row["content"],
            "file_path": row["file_path"],
            "source": row["source"],
            "created_at": row["created_at"]
        }

        # relevance 模式下额外返回 score，方便你观察排序效果
        if sort == "relevance":
            item["score"] = row["score"]

        items.append(item)

    # 计算分页信息
    total_pages = (total + page_size - 1) // page_size

    return jsonify({
        "query": q,
        "sort": sort,
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
        "items": items
    }), 200


# ===== 启动服务 =====
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
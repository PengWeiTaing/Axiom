# 从 flask 这个库里导入 Flask 类和 request 对象
# Flask 用来创建 Web 服务
# request 用来读取 URL 里的参数
from flask import Flask, request

# 从 datetime 模块里导入 datetime 类
# 用来获取当前时间，后面会用于文件名和数据库记录时间
from datetime import datetime

# 导入 os 模块
# 用来处理文件路径、创建目录等
import os

# 导入 sqlite3 模块
# 用来操作 SQLite 数据库
import sqlite3

# 创建 Flask 应用对象
app = Flask(__name__)

# 定义 inbox 目录的绝对路径
# 所有收到的文本都会先保存成 txt 文件到这里
INBOX_PATH = "/opt/axiom/data/inbox"

# 定义 SQLite 数据库文件的绝对路径
# 数据库文件会存放在 /opt/axiom/db/axiom.db
DB_PATH = "/opt/axiom/db/axiom.db"

# 定义访问密钥
# 请求里带的 key 必须和这里一致，才允许写入
SECRET_KEY = "axiom123"

# 确保 inbox 目录存在
# 如果目录已经存在，不会报错
os.makedirs(INBOX_PATH, exist_ok=True)

# 确保数据库所在的目录存在
# 如果 /opt/axiom/db 不存在，就自动创建
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

# 定义一个函数：初始化数据库
# 作用是确保 items 这张表存在
def init_db():
    # 连接到 SQLite 数据库
    # 如果数据库文件不存在，会自动创建
    conn = sqlite3.connect(DB_PATH)

    # 创建游标对象
    # 游标用于执行 SQL 语句
    c = conn.cursor()

    # 执行建表语句
    # 如果 items 表不存在，就创建它
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

    # 提交事务
    # 不提交的话，建表操作不会真正写入数据库
    conn.commit()

    # 关闭数据库连接
    conn.close()

# 在程序启动时先初始化数据库
# 这样第一次运行时就会自动建表
init_db()

# 定义一个路由：访问 /add 时执行这个函数
# methods=["GET"] 表示这个接口只接受 GET 请求
@app.route("/add", methods=["GET"])
def add_note():
    # 从 URL 参数中获取 text
    # 如果用户没传 text，就默认是空字符串
    text = request.args.get("text", "")

    # 从 URL 参数中获取 key
    # 如果用户没传 key，就默认是空字符串
    key = request.args.get("key", "")

    # 校验 key 是否正确
    # 如果 key 不匹配，就拒绝访问
    if key != SECRET_KEY:
        return "unauthorized", 403

    # 检查 text 是否为空
    # 如果为空，就返回错误提示
    if not text:
        return "no text provided", 400

    # 获取当前时间对象
    now = datetime.now()

    # 把当前时间格式化成文件名用的字符串
    # 例如：20260330_123456
    filename_time = now.strftime("%Y%m%d_%H%M%S")

    # 把当前时间格式化成数据库里更适合存储的字符串
    # 例如：2026-03-30T12:34:56
    created_at = now.isoformat()

    # 生成文件名
    # 例如：20260330_123456.txt
    filename = f"{filename_time}.txt"

    # 拼接出完整文件路径
    # 例如：/opt/axiom/data/inbox/20260330_123456.txt
    filepath = os.path.join(INBOX_PATH, filename)

    # 先把文本内容写入 txt 文件
    with open(filepath, "w", encoding="utf-8") as f:
        # 把用户传来的 text 写进文件
        f.write(text)

    # 连接数据库
    conn = sqlite3.connect(DB_PATH)

    # 创建游标
    c = conn.cursor()

    # 向 items 表插入一条记录
    # type 固定写成 text，表示这是文本类型
    # content 保存原始文本内容
    # file_path 保存 txt 文件路径
    # source 暂时固定写成 ios_shortcut，表示来源于 iPhone 快捷指令
    # created_at 保存创建时间
    c.execute(
        """
        INSERT INTO items (type, content, file_path, source, created_at)
        VALUES (?, ?, ?, ?, ?)
        """,
        ("text", text, filepath, "ios_shortcut", created_at)
    )

    # 提交事务
    # 不提交的话，这条插入不会真正保存到数据库
    conn.commit()

    # 关闭数据库连接
    conn.close()

    # 返回成功信息
    # 同时把文件名回传给客户端，方便测试和排查
    return f"saved: {filename}", 200

# 当这个文件被直接运行时，启动 Flask 服务
if __name__ == "__main__":
    # 启动 Flask
    # host="0.0.0.0" 表示允许外网访问
    # port=5000 表示监听 5000 端口
    app.run(host="0.0.0.0", port=5000)

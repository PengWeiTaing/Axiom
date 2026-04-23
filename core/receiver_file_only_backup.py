# 从 flask 这个库里导入 Flask 类和 request 对象
# Flask 用来创建 Web 服务
# request 用来读取用户通过网址传进来的参数
from flask import Flask, request

# 从 datetime 模块里导入 datetime 类
# 用来生成当前时间，后面会拿它给文件命名
from datetime import datetime

# 导入 os 模块
# 用来处理文件路径、创建文件夹等操作
import os

# 创建一个 Flask 应用对象
# __name__ 表示当前这个 Python 文件本身
app = Flask(__name__)

# 定义 inbox 文件夹的绝对路径
# 以后所有收到的文本，都会保存到这里
INBOX_PATH = "/opt/axiom/data/inbox"

# 定义你的密钥
# 只有请求里带的 key 和这里一致，才允许写入
SECRET_KEY = "axiom123"

# 确保 inbox 目录一定存在
# exist_ok=True 表示如果目录已经存在，就不要报错
os.makedirs(INBOX_PATH, exist_ok=True)

# 定义一个路由：当别人访问 /add 时，就会执行下面这个函数
# methods=["GET"] 表示这个接口只接受 GET 请求
@app.route("/add", methods=["GET"])
def add_note():
    # 从网址参数里读取 text
    # 如果没有传 text，就默认给空字符串 ""
    text = request.args.get("text", "")

    # 从网址参数里读取 key
    # 如果没有传 key，就默认给空字符串 ""
    key = request.args.get("key", "")

    # 先校验 key 是否正确
    # 如果用户传来的 key 不等于你预设的 SECRET_KEY
    # 就直接返回 unauthorized，并返回 HTTP 状态码 403（禁止访问）
    if key != SECRET_KEY:
        return "unauthorized", 403

    # 如果 text 是空的，说明用户没有传内容
    # 直接返回提示信息
    if not text:
        return "no text provided", 400

    # 生成当前时间字符串，格式是：年月日_时分秒
    # 例如：20260330_123456
    # 这样可以拿来做文件名，避免不同笔记互相覆盖
    now = datetime.now().strftime("%Y%m%d_%H%M%S")

    # 生成文件名，比如：20260330_123456.txt
    filename = f"{now}.txt"

    # 把目录路径和文件名拼成完整文件路径
    # 例如：/opt/axiom/data/inbox/20260330_123456.txt
    filepath = os.path.join(INBOX_PATH, filename)

    # 以“写入模式”打开这个文件
    # encoding="utf-8" 表示按 UTF-8 编码写入，避免中文乱码
    with open(filepath, "w", encoding="utf-8") as f:
        # 把收到的文本内容写进文件
        f.write(text)

    # 返回成功信息给客户端
    # 同时把保存到的文件名也回传，方便你排查
    return f"saved: {filename}", 200

# 只有当你直接运行这个 Python 文件时，才执行下面这段
# 如果这个文件被别的文件 import，就不会自动启动服务
if __name__ == "__main__":
    # 启动 Flask 服务
    # host="0.0.0.0" 表示允许外部设备访问
    # port=5000 表示监听 5000 端口
    app.run(host="0.0.0.0", port=5000)

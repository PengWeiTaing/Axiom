# 火山杯生成网关

`core.firecup_gateway` 是竞赛白板专用的最小 WSGI 应用，只开放：

- `GET /health`
- `POST /api/learning/knowledge-scenes/jobs`：立即创建或复用任务，返回 `202`
- `GET /api/learning/knowledge-scenes/jobs/<job_id>`：读取本地任务状态和结果
- `POST /api/learning/knowledge-scenes/generate`：旧同步兼容端点，不供比赛前端使用

它复用 `core.boards.knowledge_scene.generate_knowledge_scene`，不会加载 Axiom
个人资料、任务、记忆或管理接口。扣子 PAT 只从服务端 `COZE_API_TOKEN`
环境变量读取，不能写入前端、代码仓库或演示文档。

## 必需环境变量

```dotenv
COZE_API_TOKEN=<仅有工作流 run 权限的 PAT>
COZE_WORKFLOW_ID=<published-workflow-id>
COZE_API_BASE=https://api.coze.cn
COZE_TIMEOUT_SECONDS=300

# 逗号分隔的精确 Origin；不接受 *、路径或尾部斜杠。
FIRECUP_ALLOWED_ORIGINS=https://your-published-app.example
FIRECUP_WORKFLOW_REVISION=v0.0.7

# 异步任务：默认写入 /var/lib/axiom/firecup-jobs.sqlite3。
FIRECUP_JOB_TTL_SECONDS=1800
FIRECUP_JOB_MAX_ENTRIES=128
FIRECUP_JOB_QUEUE_MAX_ENTRIES=8
# FIRECUP_JOB_DB_PATH=/var/lib/axiom/firecup-jobs.sqlite3
```

缓存和流量保护的默认值可通过 `.env.example` 中的 `FIRECUP_*` 变量调整。
进程只允许一项远程生成：同目标和同教材复用同一任务，不同请求进入最多
8 项的单 worker 队列。只有任务 worker 会调用扣子；浏览器每 2–5 秒的状态
轮询只读取本机 SQLite，不调用模型、也不消耗扣子积分。只有通过 Axiom 质量门的
结果才进入 15 分钟结果缓存。缓存键同时包含 scene schema、质量策略、确定性生成
管线 revision、工作流 ID 与工作流 revision；只改修复/补全算法时也必须提升代码中的
`SCENE_PIPELINE_REVISION`，避免 TTL 内继续复用旧布局。

SQLite 让任务在浏览器断线后仍可完成，并让服务重启后的状态可解释：排队任务会
恢复；执行中的任务会被标记为 `worker_restarted`，前端保留旧白板并要求人工重试，
不会自动再提交一次。任务目标、可选资料与结果最多保留约 30 分钟；systemd 的
`StateDirectoryMode=0700`、`UMask=0077` 与数据库 `0600` 权限防止其他用户读取。

## 本地验证

```powershell
cd E:\Axiom
python scripts\smoke_test_firecup_gateway.py
python -m core.firecup_gateway
```

不要用 Flask 开发服务器上线。仓库提供
`deploy/axiom-firecup-gateway.service`：它固定为一个 Gunicorn worker，并用多线程
接收任务提交与状态轮询；服务只监听 `127.0.0.1:5010`，由现有 HTTPS 反向代理
转发。`deploy/nginx/axiom-firecup-location.inc` 把任务提交与轮询分成两个 location：
POST 沿用严格的额度保护，GET 使用独立的轮询限额。旧同步端点仍保留 370 秒
读取超时，但比赛前端不再依赖一条持续数分钟的 HTTP 连接。

部署前必须把正式前端的精确 Origin 写入服务器 `/etc/axiom/firecup.env`
（目录权限 `700`、文件权限 `600`）。如果更换预览域名，先更新
白名单并重启网关；不要为了省事改成通配符。

公网反向代理还必须对生成端点配置请求限速；精确 CORS 不是鉴权，不能替代
Nginx `limit_req`。任务提交和状态读取都必须携带已登记的 `Origin`，前端不会发送
`X-Axiom-Key`。正式构建还必须设置 `VITE_FIRECUP_API_BASE` 指向此 HTTPS 网关；
否则浏览器会错误地向静态站同源请求 `/jobs`。

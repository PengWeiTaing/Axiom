# Axiom

Axiom 是个人“外脑系统”的后端工程。它先把输入、存储、检索、备份、回顾底稿和安全处理链路跑通，再逐步接入更复杂的 AI 能力。

## 当前运行基线

当前线上基线已经部署在 VPS：

```text
iPhone / iOS 快捷指令
  -> https://pengweitai.me
  -> Nginx
  -> gunicorn
  -> Flask receiver
  -> 文件系统 + SQLite
  -> 备份 / 回顾 / inbox 处理自动化
```

当前技术栈：

- Python
- Flask
- SQLite
- 文件系统
- Nginx + gunicorn + systemd
- iOS 快捷指令作为输入端

这些是已经验证过的运行基线，不再作为永久硬约束。以后如果有明确收益，可以调整数据库、框架、部署形态或数据结构，但每次大改都要先写清收益、风险、迁移路径、回滚方案和验证办法。

## 当前能力

receiver 已提供：

- `/health`：服务和数据库健康检查
- `/stats`：总量、类型、来源、存储区统计
- `/add`：文本写入
- `/upload`：通用文件上传，支持图片、PDF、Word 和常见音频；`.pdf` 与 `.docx` 会自动抽取正文，音频可额外写入 `transcript_text`，也可同时上传 `txt / md / srt / vtt` 转写文件
- `/item/<id>`：读取单条元数据
- `/item/<id>/update`：更新单条内容与来源；文本会同步改写落盘文件，音频可补写或修订转写文本
- `/file/<id>`：按 item id 取回文件
- `/archive/<id>`：归档 item 文件
- `/restore/<id>`：从 archive 恢复到 inbox
- `/recent`：分页读取最近记录，支持类型、存储区、来源、时间过滤
- `/search`：关键词检索，支持相关性、时间、过滤条件，以及按原文件名、文档抽取正文和音频转写文本搜索
- `/overview`：聚合返回统计、最近记录和最新自动化产物摘要
- `/overview/text`：返回适合快捷指令直接显示的纯文本总览
- `/app`：移动优先 Web App，总览、记录、搜索、上传和自动化产物浏览入口；已补 PDF 预览与正文预览、音频播放器与转写预览，以及 Word 正文预览
- `/automation/jobs`：返回当前允许手动触发的安全自动化任务
- `/automation/runs`：读取自动化运行历史，覆盖手动触发和定时任务，并返回状态、产物和输出尾部
- `/automation/run`：手动生成 review / inbox report / dry-run artifact
- `/artifacts`：列出 `data/reviews` 下的自动化产物
- `/artifacts/summary`：直接读取各类自动化产物的最新摘要
- `/artifacts/file/<path>`：取回 markdown artifact 文件
- `/sw.js` + `manifest.webmanifest`：PWA 壳，可添加到手机主屏幕

脚本侧已提供：

- 备份与恢复演练基础
- 文件和数据库一致性检查
- 旧 PDF / Word 文档正文回填
- Markdown 导出
- 日回顾 / 周回顾底稿
- inbox 处理报告
- inbox action dry-run / apply 留痕
- action history 日 / 周汇总
- VPS systemd 定时任务模板

## Web App

现在仓库里已经有一个移动优先前端壳：

- 页面入口：`https://pengweitai.me/app`
- 页面职责：文本写入、文件上传、总览、最近记录、搜索、记录编辑、音频转写补录、手动触发安全自动化、运行历史回看、自动化产物浏览
- 鉴权方式：浏览器本地保存 key，前端请求统一走 `X-Axiom-Key`
- PWA 资源：`manifest.webmanifest`、`/sw.js`、应用图标

对应代码位置：

- `core/templates/app.html`
- `core/static/app.css`
- `core/static/app.js`
- `core/static/manifest.webmanifest`
- `core/static/sw.js`
- `core/static/icons/axiom-mark.svg`

## 当前状态图

```mermaid
flowchart TD
    A["iPhone 快捷指令"] --> B["HTTPS / Nginx"]
    B --> C["gunicorn + Flask receiver"]

    C --> D["/add 文本"]
    C --> E["/upload 文件"]
    D --> F["data/inbox"]
    E --> F
    D --> G["SQLite items"]
    E --> G

    G --> H["/recent / /search"]
    G --> I["/item / /file"]
    F --> I

    I --> J["/archive / /restore"]
    J --> F
    J --> K["data/archive"]

    F --> L["backup zip"]
    K --> L
    G --> L

    G --> M["review / inbox processing"]
    M --> N["action snapshots / history"]
```

## 架构决策规则

以后可以改架构，但按下面顺序推进：

1. 先说明当前痛点和证据。
2. 再说明准备改什么，以及为什么值得改。
3. 明确会影响哪些真实数据、脚本、部署配置和文档。
4. 准备迁移步骤和回滚步骤。
5. 本地测试通过后，再考虑 VPS 部署。
6. 涉及真实数据前先备份。
7. 大变动提交前同步 README、DeepWiki 和上下文文档；小变动只更新 `docs/ITERATION_LOG.md`。

## 关键代码

- `core/receiver.py`：receiver 主入口，负责 API、鉴权、落盘、入库、查询、归档和恢复
- `core/init_db.py`：独立数据库初始化脚本，复用 receiver 的建表逻辑
- `scripts/backup_axiom.py`：备份 SQLite、inbox、archive 并生成 manifest
- `scripts/check_consistency.py`：检查文件系统和 SQLite 索引是否一致
- `scripts/backfill_document_text.py`：为旧 PDF / DOCX 记录回填 `derived_text`
- `scripts/backfill_audio_transcript.py`：为旧 audio 记录从同名 sidecar 转写文件回填 `transcript_text`
- `scripts/smoke_test_receiver.py`：receiver 本地冒烟测试
- `scripts/smoke_test_web_app.py`：Web App 浏览器级冒烟测试
- `scripts/deploy_to_vps.py`：从本地当前 commit 生成发布包、备份 VPS 代码、同步代码和 systemd unit、重启并验证
- `scripts/run_logged_automation.py`：统一执行并记录自动化任务，供 systemd timer 复用
- `scripts/build_review_markdown.py`：生成日 / 周回顾 Markdown
- `scripts/save_review_snapshot.py`：保存日 / 周回顾快照
- `scripts/build_inbox_processing_report.py`：生成 inbox 处理建议
- `scripts/apply_inbox_actions.py`：dry-run 或执行 inbox 动作
- `scripts/save_inbox_action_snapshot.py`：保存 inbox action 快照并附带一致性检查
- `scripts/list_inbox_action_snapshots.py`：读取历史 action snapshots
- `scripts/build_inbox_action_history_markdown.py`：聚合 action history
- `scripts/save_inbox_action_history_snapshot.py`：保存 action history 快照
- `scripts/generate_deepwiki_cache.py`：生成本地 DeepWiki 缓存
- `deploy/*.service` / `deploy/*.timer`：VPS systemd 服务和定时任务模板

## 本地验证

```powershell
pip install -r requirements.txt
python -m compileall -q core scripts
python scripts\smoke_test_receiver.py
python scripts\smoke_test_inbox_processing.py
python scripts\check_consistency.py --root .
```

如果要补浏览器级验证，再执行：

```powershell
pip install -r requirements-dev.txt
python scripts\install_playwright_chromium.py
python scripts\smoke_test_web_app.py
```

如果本地没有同步 VPS 的真实 `data/inbox` 或 `data/archive`，一致性检查可能会报告缺文件。这是诊断结果，不代表脚本损坏。

## VPS 常用命令

```bash
cd /opt/axiom
sudo systemctl status axiom-receiver --no-pager
sudo journalctl -u axiom-receiver -f
tail -f /opt/axiom/logs/receiver.log
curl http://127.0.0.1:5000/health
python3 scripts/check_consistency.py --root /opt/axiom
python3 scripts/backup_axiom.py --root /opt/axiom --keep 14
```

从本地发起部署的常规顺序：

```powershell
python scripts\deploy_to_vps.py
```

这条命令会做这些事：

- 从本地当前 `HEAD` 生成代码快照
- 先在 VPS 上生成代码备份
- 把快照上传到 `/tmp`
- 用 `rsync --delete` 同步到 `/opt/axiom`，同时保留 `.env`、`.venv`、`db/`、`data/`、`backup/`、`logs/`
- 把 `deploy/*.service` 和 `deploy/*.timer` 安装到 `/etc/systemd/system/` 并执行 `systemctl daemon-reload`
- 在 VPS 上执行 `pip install -r requirements.txt`
- 重启 `axiom-receiver`
- 跑 `curl http://127.0.0.1:5000/health`
- 跑 `python3 scripts/check_consistency.py --root /opt/axiom`

如果本地工作区不是干净状态，脚本默认会拒绝部署；只有明确传 `--allow-dirty` 才会继续，但依然只会部署当前 `HEAD`，不会带上未提交改动。

## 文档结构

- `docs/AI_CONTEXT.md`：给 AI 协作代理看的当前事实和决策规则
- `docs/HUMAN_CONTEXT.md`：给人看的接手路径和必须掌握的位置
- `deep-research-report.md`：长期目标研究报告
- `docs/SHORT_TERM.md`：短期推进方向
- `README.md`：项目简介
- `docs/ITERATION_LOG.md`：迭代记录
- `docs/DEEPWIKI.md`：DeepWiki 使用说明

## 推荐阅读顺序

人类接手：

1. `README.md`
2. DeepWiki 主入口
3. `docs/HUMAN_CONTEXT.md`
4. `docs/SHORT_TERM.md`
5. `deep-research-report.md`

AI 协作代理接手：

1. `docs/AI_CONTEXT.md`
2. `docs/SHORT_TERM.md`
3. `core/receiver.py`
4. `scripts/check_consistency.py`
5. `scripts/backup_axiom.py`

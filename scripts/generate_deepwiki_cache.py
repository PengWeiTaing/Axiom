import json
from datetime import datetime
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
CACHE_PATH = (
    Path.home()
    / ".adalflow"
    / "wikicache"
    / "deepwiki_cache_local_local_Axiom_zh.json"
)


def read_lines(path: str) -> list[str]:
    return (REPO_ROOT / path).read_text(encoding="utf-8").splitlines()


def snippet(path: str, start: int, end: int, language: str = "python") -> str:
    lines = read_lines(path)
    body = "\n".join(lines[start - 1 : end])
    return (
        f"```{language}\n"
        f"# {path}:{start}-{end}\n"
        f"{body}\n"
        "```\n\n"
        f"来源: [{path}:{start}-{end}]()"
    )


def add_page(pages, generated_pages, page_id, title, file_paths, related, content):
    page = {
        "id": page_id,
        "title": title,
        "content": content.strip() + "\n",
        "filePaths": file_paths,
        "importance": "high",
        "relatedPages": related,
    }
    pages.append(page)
    generated_pages[page_id] = page


def build_cache():
    pages = []
    generated_pages = {}

    add_page(
        pages,
        generated_pages,
        "page-overview",
        "01 总览：当前运行基线",
        [
            "README.md",
            "docs/HUMAN_CONTEXT.md",
            "docs/SHORT_TERM.md",
            "docs/AI_CONTEXT.md",
        ],
        [
            "page-architecture",
            "page-api",
            "page-operations",
            "page-evolution",
        ],
        f"""
# 01 总览：当前运行基线

Axiom 当前已经有可运行的 VPS 后端基线。它能接收文本、图片、文档和音频，能落盘，能入库，能检索，能取回文件，能归档恢复，能备份，也能自动生成回顾、inbox 处理报告、action history 和音频转写日报。

## 一屏判断

| 项 | 当前答案 |
| --- | --- |
| 当前阶段 | `v0.1 alpha` |
| 线上入口 | `https://pengweitai.me` |
| 运行目录 | `/opt/axiom` |
| 部署链路 | Nginx -> gunicorn -> Flask receiver |
| 数据策略 | 文件系统保存内容本体，SQLite 保存索引 |
| 当前输入端 | iPhone + iOS 快捷指令 |
| 当前读取 / 操作端 | `/app` 移动优先 Web App |
| 当前重点 | 稳定运行、可备份恢复、可回顾、可安全处理 inbox |

当前技术栈是已验证基线。早期硬约束已经取消，后续可以调整架构；大改前需要先写清收益、风险、迁移、回滚和验证。

## 当前全链路

```mermaid
flowchart TD
    A["iPhone 快捷指令"] --> B["HTTPS / Nginx"]
    B --> C["gunicorn + receiver"]
    C --> D["/add 文本"]
    C --> E["/upload 文件"]
    D --> F["data/inbox"]
    E --> F
    D --> G["SQLite items"]
    E --> G
    G --> H["/recent / /search"]
    G --> I["/item / /file"]
    G --> O["/artifacts"]
    F --> I
    O --> P["/artifacts/file/<path>"]
    I --> J["/archive / /restore"]
    J --> K["data/archive"]
    F --> L["backup zip"]
    K --> L
    G --> L
    G --> M["review / inbox processing"]
    M --> N["action snapshots / history"]
```

## 接手阅读顺序

1. 先读本页，建立当前状态判断。
2. 再读 `02 架构：数据怎么流动`，理解文件和 SQLite 的关系。
3. 然后读 `03 接口：receiver 提供什么`，知道公网后端能力。
4. 接着读 `04 可靠性` 和 `05 运维`，掌握备份、校验和 VPS 运行方式。
5. 最后读 `08 演进规则`，理解以后怎么安全改变架构。

## 原始上下文底稿

{snippet("README.md", 1, 90, "markdown")}

{snippet("docs/HUMAN_CONTEXT.md", 1, 90, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-architecture",
        "02 架构：数据怎么流动",
        ["README.md", "docs/SHORT_TERM.md", "core/receiver.py"],
        [
            "page-overview",
            "page-api",
            "page-reliability",
            "page-code",
        ],
        f"""
# 02 架构：数据怎么流动

当前数据层的核心判断：文件系统保存内容本体，SQLite 保存索引。这个策略已经覆盖文本、图片、文档、音频、inbox、archive、备份、一致性检查和当前 Web App。

## 数据边界

| 位置 | 角色 | 当前内容 |
| --- | --- | --- |
| `data/inbox/` | 活跃内容本体 | 文本 txt、图片、文档、音频文件 |
| `data/archive/` | 归档内容本体 | 已归档文件，按月份目录组织 |
| `db/axiom.db` | 索引 | `items` 表，记录类型、内容、文件路径、来源、时间 |
| `data/reviews/` | 自动化产物 | review、inbox report、action snapshots、history、audio-transcripts、image-descriptions |
| `backup/*.zip` | 离线备份 | SQLite 快照、inbox、archive、manifest |
| `logs/` | 运行日志 | receiver 文件日志 |

## 写入与读取链路

```mermaid
flowchart TD
    A["快捷指令 / Web App"] --> B["请求 + key"]
    B --> C["receiver 鉴权"]
    C --> D["文本或文件"]
    D --> E["临时文件"]
    E --> F["原子替换为正式文件"]
    F --> G["SQLite items 入库"]
    G --> H["/recent / /search / /overview"]
    G --> I["/item / /file"]
    F --> I
```

## 配置与存储根

receiver 默认使用 `/opt/axiom`，本地测试可以通过环境变量覆盖。这里是运行基线的入口。

{snippet("core/receiver.py", 20, 40)}

## `items` 表

当前 `items` 表保持小而稳定，已经支撑文本、图片、文档、音频、归档、恢复、过滤和统计。

{snippet("core/receiver.py", 72, 116)}

## item 返回结构

所有 item 返回都会带 `file_url` 和 `storage`，所以调用方可以直接知道文件在哪个存储区，以及如何取回文件。

{snippet("core/receiver.py", 415, 447)}

## 原子写入

文本和二进制文件都先写临时文件，再替换为正式文件，减少半截文件进入 inbox 的概率。

{snippet("core/receiver.py", 505, 532)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-api",
        "03 接口：receiver 提供什么",
        ["core/receiver.py", "scripts/smoke_test_receiver.py", "scripts/transcribe_audio_items.py"],
        [
            "page-overview",
            "page-architecture",
            "page-reliability",
            "page-code",
        ],
        f"""
# 03 接口：receiver 提供什么

receiver 是当前公网后端主入口。它负责鉴权、接收、落盘、入库、查询、文件取回、归档、恢复和统计。

## 接口总表

| 接口 | 方法 | 用途 |
| --- | --- | --- |
| `/app` | GET | 返回移动优先 Web App 页面 |
| `/sw.js` | GET | 返回 PWA service worker |
| `/health` | GET | 检查服务和数据库 |
| `/stats` | GET | 统计总量、类型、来源和存储区 |
| `/add` | GET/POST | 写入文本 |
| `/upload` | POST | 上传图片、PDF、Word 或音频；`.pdf` 与 `.docx` 会自动抽取正文，音频可附带转写文本或 `txt / md / srt / vtt` 转写文件 |
| `/item/<id>` | GET | 读取单条元数据 |
| `/item/<id>/update` | POST | 更新单条内容、来源与音频转写文本 |
| `/file/<id>` | GET | 取回文本或文件，并优先保留原文件名 |
| `/archive/<id>` | POST | 将文件移动到 archive |
| `/restore/<id>` | POST | 将 archive 文件恢复到 inbox |
| `/recent` | GET | 分页读取最近记录 |
| `/search` | GET | 关键词检索 |
| `/overview` | GET | 聚合返回统计、最近记录和最新自动化产物摘要 |
| `/overview/text` | GET | 返回适合快捷指令直接显示的纯文本总览 |
| `/automation/jobs` | GET | 返回当前允许手动触发的自动化任务 |
| `/automation/runs` | GET | 返回自动化运行历史、状态、产物和输出尾部 |
| `/automation/run` | POST | 手动生成 review / inbox report / dry-run artifact / audio transcript report / image description report |
| `/artifacts` | GET | 列出 `data/reviews` 下的自动化产物 |
| `/artifacts/summary` | GET | 返回各类自动化产物的最新摘要 |
| `/artifacts/file/<path>` | GET | 取回 markdown artifact |

除 `/app`、`/sw.js` 和 `/health` 外，接口都需要 key。key 可通过 `key` 字段或 `X-Axiom-Key` header 传入。

## 统一响应和鉴权

{snippet("core/receiver.py", 60, 69)}

{snippet("core/receiver.py", 135, 150)}

## 前端入口、健康检查和统计

`/app` 是当前正式前端壳，`/sw.js` 让这个入口具备 PWA 基础能力。当前 Web 端已经补上 PDF 预览、音频播放与转写查看 / 编辑，以及 Word 正文预览。

{snippet("core/receiver.py", 2062, 2133)}

## 文本和文件写入

{snippet("core/receiver.py", 2136, 2270)}

## 元数据、编辑、文件取回、归档和恢复

{snippet("core/receiver.py", 763, 1118)}

{snippet("core/receiver.py", 1420, 1517)}

{snippet("core/receiver.py", 2271, 2694)}

## 手动自动化入口

`/automation/jobs` 让前端知道当前允许手动运行哪些安全任务，`/automation/run` 负责串行触发白名单脚本，`/automation/runs` 负责回看最近运行结果。

当前开放 review、inbox report、dry-run、`audio_transcribe_day` 和 `image_describe_day`。其中音频自动转写与图片自动描述都需要在运行环境里配置 OpenAI key；本地冒烟则通过 mock 模板走通这两条链路。每次手动触发都会写入运行历史，保留状态、耗时、stdout/stderr 尾部和关联产物。

给 systemd timer 用的 `run_logged_automation.py` 现在支持 `--skip-when-unavailable`。这意味着就算先启用了 daily audio / image timer，只要环境里还没配 key，它们也会安全记成 `skipped`，不会把定时任务跑成失败。

## 最近记录和检索

`/recent` 和 `/search` 支持分页、类型、存储区、来源、时间范围过滤。`/search` 还支持 `relevance`、`newest`、`oldest` 排序，并会同时匹配原文件名、文档抽取正文和音频转写文本。

`/artifacts` 负责把 `data/reviews` 里的自动化产物列出来，当前支持 `review`、`inbox`、`inbox-actions`、`inbox-action-history`、`audio-transcripts`、`image-descriptions` 六组，并支持 `window`、`mode`、日期范围、分页和排序。

`/artifacts/summary` 直接返回这些自动化产物的最新条目和文本预览，更适合手机端、快捷指令和轻量前端消费。

{snippet("core/receiver.py", 2697, 2939)}

## 自动化产物读取

{snippet("core/receiver.py", 1204, 1404)}

{snippet("core/receiver.py", 2494, 2619)}

## 冒烟测试覆盖

{snippet("scripts/smoke_test_receiver.py", 36, 120)}

{snippet("scripts/smoke_test_receiver.py", 198, 320)}

{snippet("scripts/smoke_test_receiver.py", 420, 780)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-reliability",
        "04 可靠性：一致性、备份和恢复",
        ["scripts/check_consistency.py", "scripts/backup_axiom.py", "docs/ITERATION_LOG.md"],
        [
            "page-architecture",
            "page-api",
            "page-operations",
            "page-automation",
        ],
        f"""
# 04 可靠性：一致性、备份和恢复

当前最重要的可靠性目标是：真实数据可备份、可恢复、可校验。Axiom 已有两类基础工具：一致性检查和备份脚本。

## 一致性检查

检查范围：

- DB 记录里的 `file_path` 是否存在
- `data/inbox` 和 `data/archive` 下的文件是否都有 DB 记录
- DB 记录是否缺少 `file_path`
- 本地检查时，把 DB 里的 `/opt/axiom/...` 映射到当前 `--root`

{snippet("scripts/check_consistency.py", 35, 60)}

{snippet("scripts/check_consistency.py", 113, 145)}

## 备份

备份范围：

- `db/axiom.db`
- `data/inbox`
- `data/archive`
- `manifest.json`

SQLite 使用 backup API 复制，减少读到半写入数据库文件的风险。

{snippet("scripts/backup_axiom.py", 51, 91)}

{snippet("scripts/backup_axiom.py", 122, 208)}

## 推荐操作

```powershell
python scripts\\check_consistency.py --root .
python scripts\\backup_axiom.py --root . --dry-run
```

VPS 上：

```bash
cd /opt/axiom
python3 scripts/check_consistency.py --root /opt/axiom
python3 scripts/backup_axiom.py --root /opt/axiom --keep 14
```

## 已完成的可靠性节点

{snippet("docs/ITERATION_LOG.md", 45, 95, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-operations",
        "05 运维：VPS 服务和定时任务",
        [
            "deploy/axiom-receiver.service",
            "deploy/axiom-backup.timer",
            "deploy/axiom-daily-audio-transcribe.timer",
            "deploy/axiom-daily-image-describe.timer",
            "deploy/axiom-daily-review.timer",
            "deploy/axiom-inbox-processing.timer",
            "deploy/axiom-daily-inbox-action.timer",
            "deploy/axiom-daily-inbox-action-history.timer",
            "deploy/axiom-weekly-inbox-action-history.timer",
            ".env.example",
        ],
        [
            "page-overview",
            "page-reliability",
            "page-automation",
            "page-code",
        ],
        f"""
# 05 运维：VPS 服务和定时任务

当前 VPS 负责真实运行。公网只暴露 Nginx 的 `80/443`，receiver 通过 gunicorn 监听 `127.0.0.1:5000`。

## receiver systemd 服务

{snippet("deploy/axiom-receiver.service", 1, 16, "ini")}

常用命令：

```bash
sudo systemctl status axiom-receiver --no-pager
sudo journalctl -u axiom-receiver -f
tail -f /opt/axiom/logs/receiver.log
curl http://127.0.0.1:5000/health
```

## 环境变量模板

{snippet(".env.example", 1, 30, "text")}

## 当前定时任务

| 任务 | 用途 |
| --- | --- |
| `axiom-backup.timer` | 自动备份 |
| `axiom-daily-audio-transcribe.timer` | 每日音频自动转写 |
| `axiom-daily-image-describe.timer` | 每日图片自动描述 |
| `axiom-daily-review.timer` | 每日回顾 |
| `axiom-weekly-review.timer` | 每周回顾 |
| `axiom-inbox-processing.timer` | inbox 处理报告 |
| `axiom-daily-inbox-action.timer` | 每日 action dry-run 快照 |
| `axiom-daily-inbox-action-history.timer` | 每日 action history 汇总 |
| `axiom-weekly-inbox-action-history.timer` | 每周 action history 汇总 |

## AI 自动化服务示例

{snippet("deploy/axiom-daily-audio-transcribe.service", 1, 8, "ini")}

{snippet("deploy/axiom-daily-image-describe.service", 1, 8, "ini")}

## action / history 服务示例

{snippet("deploy/axiom-daily-inbox-action-history.timer", 1, 11, "ini")}

## 从本地发起部署

```powershell
python scripts\\deploy_to_vps.py
```

这条命令会按顺序完成：

1. 从本地当前 `HEAD` 生成代码快照。
2. 在 VPS 上生成代码备份。
3. 上传快照到 `/tmp`。
4. 用 `rsync --delete` 同步到 `/opt/axiom`，同时保留 `.env`、`.venv`、`db/`、`data/`、`backup/`、`logs/`。
5. 在 VPS 上执行 `pip install -r requirements.txt`。
6. 重启 `axiom-receiver`。
7. 运行 health check 和一致性检查。
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-automation",
        "06 自动化：回顾、inbox 处理和 action history",
        [
            "scripts/build_review_markdown.py",
            "scripts/save_review_snapshot.py",
            "scripts/build_inbox_processing_report.py",
            "scripts/apply_inbox_actions.py",
            "scripts/save_inbox_action_snapshot.py",
            "scripts/build_inbox_action_history_markdown.py",
            "scripts/save_inbox_action_history_snapshot.py",
            "scripts/transcribe_audio_items.py",
        ],
        [
            "page-overview",
            "page-reliability",
            "page-operations",
            "page-code",
        ],
        f"""
# 06 自动化：回顾、inbox 处理和 action history

这一层把 Axiom 从“只存东西”推进到“能回看、能提出处理建议、能记录处理动作”。当前阶段仍以规则和留痕为主，AI 能力后续再接；音频自动转写是目前第一条可选接入的 AI 前处理链路。

## 自动化链路

```mermaid
flowchart TD
    A["SQLite items"] --> B["review markdown"]
    A --> C["inbox processing report"]
    C --> D["action dry-run / apply"]
    D --> E["action snapshot"]
    E --> F["action history"]
```

## inbox 处理规则

当前规则包括：

- `补描述后归档`
- `补描述`
- `归档候选`
- `继续保留`
- `检查空内容`

{snippet("scripts/build_inbox_processing_report.py", 27, 101)}

## 建议命令

处理报告会自动生成下一步建议命令，默认引导走 `save_inbox_action_snapshot.py`，优先保留执行痕迹。

{snippet("scripts/build_inbox_processing_report.py", 159, 191)}

## action 执行安全开关

默认 dry-run；真执行需要显式 `--apply`。可以用 `--only-id`、`--exclude-id`、`--max-items` 降低误操作范围。

{snippet("scripts/apply_inbox_actions.py", 72, 149)}

{snippet("scripts/apply_inbox_actions.py", 139, 190)}

## action 快照

action 快照会把 dry-run 或 apply 结果落盘，并追加一致性检查摘要。

{snippet("scripts/save_inbox_action_snapshot.py", 23, 61)}

{snippet("scripts/save_inbox_action_snapshot.py", 87, 112)}

## action history

history 汇总基于已保存的 action snapshots 聚合，不重新执行任何数据动作。

{snippet("scripts/build_inbox_action_history_markdown.py", 38, 86)}

{snippet("scripts/build_inbox_action_history_markdown.py", 140, 149)}

## 音频自动转写

`audio_transcribe_day` 会扫描指定日期内的 audio item，优先跳过已有 `transcript_text` 的条目，按需调用 OpenAI 自动转写，并把结果写回 SQLite，同时在 `data/reviews/audio-transcripts` 留下一份可回看的日报。没有配置 key 时，这条任务仍会显示在自动化中心，但真实执行会失败；本地冒烟通过 mock 模板覆盖这条路径。

{snippet("core/receiver.py", 196, 206)}

{snippet("scripts/transcribe_audio_items.py", 34, 53)}

{snippet("scripts/transcribe_audio_items.py", 267, 390)}

## 图片自动描述

`image_describe_day` 会扫描指定日期内的 image item，优先跳过已经有人手写说明的条目，按需调用 OpenAI Vision 生成中文描述，并把结果写回 item 的 `content`，同时在 `data/reviews/image-descriptions` 留下一份可回看的日报。没有配置 key 时，这条任务仍会显示在自动化中心，但真实执行会失败；本地冒烟通过 mock 模板覆盖这条路径。

{snippet("core/receiver.py", 209, 220)}

{snippet("scripts/describe_image_items.py", 1, 120)}

{snippet("scripts/describe_image_items.py", 180, 336)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-code",
        "07 代码导览：该从哪里改",
        [
            "core/receiver.py",
            "core/init_db.py",
            "core/templates/app.html",
            "core/static/app.css",
            "core/static/app.js",
            "core/static/manifest.webmanifest",
            "core/static/sw.js",
            "requirements-dev.txt",
            "scripts/install_playwright_chromium.py",
            "scripts/backup_axiom.py",
            "scripts/check_consistency.py",
            "scripts/backfill_document_text.py",
            "scripts/backfill_audio_transcript.py",
            "scripts/transcribe_audio_items.py",
            "scripts/describe_image_items.py",
            "scripts/smoke_test_receiver.py",
            "scripts/smoke_test_web_app.py",
            "scripts/deploy_to_vps.py",
            "scripts/smoke_test_inbox_processing.py",
            "scripts/generate_deepwiki_cache.py",
        ],
        [
            "page-api",
            "page-reliability",
            "page-automation",
            "page-evolution",
        ],
        f"""
# 07 代码导览：该从哪里改

这个项目目前仍然是小型后端工程。改代码时先判断要动哪一层。

## 修改入口

| 目标 | 优先看 |
| --- | --- |
| 改 API | `core/receiver.py` |
| 改数据库初始化 | `core/init_db.py` |
| 改 Web App 页面 | `core/templates/app.html`、`core/static/app.css`、`core/static/app.js` |
| 改 PWA 壳 | `core/static/manifest.webmanifest`、`core/static/sw.js`、`core/static/icons/axiom-mark.svg` |
| 改浏览器级前端验证 | `requirements-dev.txt`、`scripts/install_playwright_chromium.py`、`scripts/smoke_test_web_app.py` |
| 改 VPS 部署 | `scripts/deploy_to_vps.py` |
| 改备份 | `scripts/backup_axiom.py` |
| 改一致性检查 | `scripts/check_consistency.py` |
| 改旧文档正文回填 | `scripts/backfill_document_text.py` |
| 改旧音频转写回填 | `scripts/backfill_audio_transcript.py` |
| 改音频自动转写 | `scripts/transcribe_audio_items.py` |
| 改图片自动描述 | `scripts/describe_image_items.py` |
| 改 receiver 测试 | `scripts/smoke_test_receiver.py` |
| 改 inbox 自动化 | `build_inbox_processing_report.py`、`apply_inbox_actions.py` |
| 改 action history | `list_inbox_action_snapshots.py`、`build_inbox_action_history_markdown.py` |
| 改 Wiki | `scripts/generate_deepwiki_cache.py` |
| 改 VPS 自动运行 | `deploy/*.service` 和 `deploy/*.timer` |

## receiver 地图

| 区块 | 作用 |
| --- | --- |
| 基础配置 | 路径、key、上传上限、日志 |
| 响应工具 | 统一 JSON 成功和错误 |
| 存储与数据库 | 建表、连接、目录初始化 |
| 请求工具 | key、分页、过滤条件 |
| 文件工具 | 原子写文本、原子写二进制文件、归档路径、恢复路径 |
| 路由 | API 实现 |
| 错误处理 | Flask 异常统一 JSON 化 |

{snippet("core/receiver.py", 20, 69)}

{snippet("core/receiver.py", 153, 304)}

{snippet("core/init_db.py", 1, 19)}

## Web App 入口

前端层目前不单独拆服务，直接挂在 Flask 里。页面模板、样式和脚本各自分层，目标是让移动端入口和 receiver API 保持一套代码库、一个部署单元。

{snippet("core/templates/app.html", 1, 220, "html")}

{snippet("core/static/app.js", 1, 260, "javascript")}

## 测试入口

{snippet("scripts/smoke_test_receiver.py", 36, 100)}

{snippet("scripts/smoke_test_web_app.py", 1, 140)}

{snippet("scripts/deploy_to_vps.py", 1, 220)}

{snippet("scripts/smoke_test_inbox_processing.py", 1, 80)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-evolution",
        "08 演进规则：长期目标和架构决策",
        [
            "docs/AI_CONTEXT.md",
            "docs/SHORT_TERM.md",
            "deep-research-report.md",
            "docs/ITERATION_LOG.md",
        ],
        [
            "page-overview",
            "page-architecture",
            "page-code",
        ],
        f"""
# 08 演进规则：长期目标和架构决策

早期硬约束已经取消。Axiom 可以改变架构，但每次大改都要先证明值得，并且能迁移、能回滚、能验证。

## 当前决策规则

大改前先回答：

1. 当前痛点是什么，有什么证据。
2. 方案改动范围是什么。
3. 对真实数据、部署、脚本、文档的影响是什么。
4. 迁移路径是什么。
5. 回滚路径是什么。
6. 本地如何验证，VPS 如何验证。
7. 是否需要先备份或先 dry-run。

{snippet("docs/AI_CONTEXT.md", 23, 52, "markdown")}

## 短期目标

{snippet("docs/SHORT_TERM.md", 1, 80, "markdown")}

## 长期目标来源

`deep-research-report.md` 负责长期方向。当前工程仍以稳定可运行的数据底座为优先。

{snippet("deep-research-report.md", 1, 80, "markdown")}

## 最近迭代

{snippet("docs/ITERATION_LOG.md", 300, 420, "markdown")}
""",
    )

    sections = [
        {
            "id": "section-start",
            "title": "先看这里",
            "pages": ["page-overview", "page-architecture", "page-api"],
            "subsections": [],
        },
        {
            "id": "section-run",
            "title": "可靠运行",
            "pages": ["page-reliability", "page-operations", "page-automation"],
            "subsections": [],
        },
        {
            "id": "section-change",
            "title": "继续开发",
            "pages": ["page-code", "page-evolution"],
            "subsections": [],
        },
    ]

    return {
        "wiki_structure": {
            "id": "wiki",
            "title": "Axiom 项目 Wiki",
            "description": "面向接手和持续开发的中文 Wiki：先理解当前运行基线，再进入架构、接口、可靠性、运维、自动化和演进规则。",
            "pages": pages,
            "sections": sections,
            "rootSections": [section["id"] for section in sections],
        },
        "generated_pages": generated_pages,
        "repo_url": str(REPO_ROOT),
        "repo": {
            "owner": "local",
            "repo": "Axiom",
            "type": "local",
            "token": None,
            "localPath": str(REPO_ROOT),
            "repoUrl": str(REPO_ROOT),
        },
        "provider": "openai",
        "model": "gpt-5-mini",
        "generated_at": datetime.now().isoformat(timespec="seconds"),
    }


def main():
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    cache = build_cache()
    CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"已写入: {CACHE_PATH}")
    print(f"页面数: {len(cache['generated_pages'])}")
    for page_id, page in cache["generated_pages"].items():
        print(f"- {page_id}: {page['title']} ({len(page['content'])} 字符)")


if __name__ == "__main__":
    main()

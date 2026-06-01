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
- `/item/<id>/update`：更新单条内容与来源；文本会同步改写落盘文件，document 可手动补正文，audio 可补写或修订转写文本
- `/file/<id>`：按 item id 取回文件
- `/archive/<id>`：归档 item 文件
- `/restore/<id>`：从 archive 恢复到 inbox
- `/recent`：分页读取最近记录，支持类型、存储区、来源、处理状态、时间过滤
- `/search`：关键词检索，支持相关性、时间、处理状态等过滤条件，以及按原文件名、文档抽取正文和音频转写文本搜索
- `/overview`：聚合返回统计、最近记录和最新自动化产物摘要
- `/overview/text`：返回适合快捷指令直接显示的纯文本总览
- `/processing/backlog`：按类型聚合返回待补正文、待补转写、待补说明的积压条目，并附带快速过滤参数与“下一条待处理 item”
- `/app`：当前主前端入口（Vite + Vue 3），覆盖 Capture / Atlas / 近况三模式
- `/atlas`：同一套主前端的 Atlas 深链接
- `/app/legacy`：旧移动 Web App，保留处理工作台、旧 PWA 能力和回归测试，不再作为新功能主入口
- `/automation/jobs`：返回当前允许手动触发的安全自动化任务；当前包含 review、inbox report、dry-run，以及可选的音频自动转写和图片自动描述
- `/automation/runs`：读取自动化运行历史，覆盖手动触发和定时任务，并返回状态、产物和输出尾部；当前状态包含 `success / skipped / failed / timeout / running`
- `/automation/run`：手动生成 review / inbox report / dry-run artifact / audio transcript report / image description report
- `/artifacts`：列出 `data/reviews` 下的自动化产物
- `/artifacts/summary`：直接读取各类自动化产物的最新摘要，当前包含 `audio-transcripts` 和 `image-descriptions`
- `/artifacts/file/<path>`：取回 markdown artifact 文件
- `/sw.js` + `manifest.webmanifest`：PWA 壳，可添加到手机主屏幕

图谱系统：

- Cosmos：聚合 items/tasks/memories/decisions/lifelines 为统一图谱数据源，提供实体关系网络
- Lifelines：人生主线树结构，支持层级组织（parent_id）和顺序排列（order_index），四类实体可挂载
- Associations：自动关联生成——规则初筛（bigram 文本相似度 + 时间邻接）+ LLM 关系分类（co_occurrence / causal / tension / derived_from / none）
- Atlas：三维球形可视化图谱，semantic_shell_sector_v2 布局，支持全局概览 / 区域缩放 / 节点聚焦 / 关联揭示四态，2D 局部探索模式

记忆与任务系统：

- `/memories`：记忆列表（五类：事实/偏好/目标/人际关系/事件，三态：候选→确认→归档）
- `/memories/<id>`：记忆 CRUD + confirm/archive；`GET` 响应包含 `source_item: {id, type, type_label, snippet, created_at}`（无来源时为 `null`），用于回看派生记忆的原始 item
- `/memories/stats`：记忆统计
- `/memories/suggest`：让 LLM 从最近 item 中提取候选记忆；每条建议带 `source_item_id`（无法对应到具体 item 时为 `null`）
- `POST /item/<id>/promote-to-memory`：把指定 item 升级为 candidate 记忆，自动写入 `memories.source_item_id` 与 `memories.source_text`（item 文本前 200 字），并写审计 `memory_promote_from_item`
- `GET /item/<id>`：响应额外包含 `derived_memories: [{id, category, content, status, ...}]`，按 `created_at desc` 排序，最多 10 条
- `/tasks`：任务列表（三态：待办→完成→取消，三级优先级：高/中/低）
- `/tasks/<id>`：任务 CRUD + done/todo/cancel
- `/tasks/today`：今日任务汇总（含过期提醒）

item ↔ memory 通过显式反向链 `memories.source_item_id` 关联，外键采用 `ON DELETE SET NULL`：删除 item 时只清空来源指针，已派生的 memory 不会被一并删除。

治理系统：

- `DELETE /item/<id>`：删除条目（清理文件 + DB + FK 关联）
- `POST /export`：导出全部数据（items/memories/tasks JSON + 文件 ZIP）
- `GET /audit-log`：审计日志查询（记录所有 CUD 操作）

检索增强：

- `/search`：已升级为 SQLite FTS5 全文搜索（BM25 排序，CJK 字符级分词，支持中文）

模块系统：

- `modules/` 目录：可插拔模块框架（AxiomModule 基类，自动发现）
- `modules/jianzhi/`：减脂模块（`/m/jianzhi/*`，体重/饮食/运动/围度/备注记录）

脚本侧已提供：

- 备份与恢复演练基础
- 文件和数据库一致性检查
- 旧 PDF / Word 文档正文回填
- 旧 audio sidecar 转写回填
- 音频自动转写日报生成
- Markdown 导出
- 日回顾 / 周回顾底稿
- inbox 处理报告
- inbox action dry-run / apply 留痕
- action history 日 / 周汇总
- VPS systemd 定时任务模板

## Web App

现在仓库里有两套前端壳，主线已经收敛到 Vite 应用：

- 主入口：`https://pengweitai.me/app`
- Atlas 深链接：`https://pengweitai.me/atlas`
- 旧版入口：`https://pengweitai.me/app/legacy`
- 主前端职责：Capture、Atlas、近况三模式，以及后续新交互
- 旧版职责：已经验证过的处理工作台、自动化运行历史和旧 PWA 链路
- 鉴权方式：浏览器本地保存 key，前端请求统一走 `X-Axiom-Key`
- PWA 资源：`manifest.webmanifest`、`/sw.js`、应用图标

对应代码位置：

- `frontend/src/`
- `core/static/v2/`
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
- `scripts/transcribe_audio_items.py`：为当日 audio item 批量补全转写文本，并生成 `audio-transcripts` 报告
- `scripts/describe_image_items.py`：为当日 image item 批量补全中文描述，并生成 `image-descriptions` 报告
- `scripts/smoke_test_receiver.py`：receiver 本地冒烟测试
- `scripts/smoke_test_web_app.py`：Web App 浏览器级冒烟测试
- `scripts/deploy_to_vps.py`：从本地当前 commit 生成发布包、备份 VPS 代码、同步代码和 systemd unit、重启并验证
- `scripts/run_logged_automation.py`：统一执行并记录自动化任务，供 systemd timer 复用；支持 `--skip-when-unavailable`
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

如果要启用真实音频自动转写，再额外配置：

```powershell
$env:AXIOM_OPENAI_API_KEY="..."
$env:AXIOM_AUDIO_TRANSCRIBE_MODEL="gpt-4o-mini-transcribe"
```

如果要启用真实图片自动描述，再额外配置：

```powershell
$env:AXIOM_OPENAI_API_KEY="..."
$env:AXIOM_IMAGE_DESCRIBE_MODEL="gpt-4.1-mini"
```

没有配置 key 时，`audio_transcribe_day` 和 `image_describe_day` 任务仍会出现在自动化中心，但真实转写 / 描述不会成功；本地冒烟通过 mock 模板覆盖这两条链路。

如果把 daily audio / image timer 启用到 VPS，但还没配置 key，它们会在运行历史里记成 `skipped`，不会把 systemd 跑成失败。

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
- `docs/PROJECT_MAINLINE.md`：当前主入口、遗留边界、Atlas/Cosmos 主线和构建策略
- `docs/HUMAN_CONTEXT.md`：给人看的接手路径和必须掌握的位置
- `docs/axiom_current_status_2026-05-27.md`：当前版本盘点，适合快速了解近况
- `docs/axiom_atlas_v_1_spec_for_claude.md`：Atlas 重构规格与视觉/交互约束
- `docs/tasks/`：产品任务流转；`done/` 里能看到 Atlas / Cosmos 的演进轨迹
- `docs/backend-tasks/`：后端专项任务流转
- `docs/ITERATION_LOG.md`：迭代记录
- `docs/SHORT_TERM.md`：短期推进方向
- `docs/DEEPWIKI.md`：DeepWiki 使用说明
- `deep-research-report.md`：长期目标研究报告
- `README.md`：项目简介

## 推荐阅读顺序

人类接手：

1. `README.md`
2. `docs/PROJECT_MAINLINE.md`
3. `docs/axiom_current_status_2026-05-27.md`
4. `docs/HUMAN_CONTEXT.md`
5. `docs/SHORT_TERM.md`
6. `docs/axiom_atlas_v_1_spec_for_claude.md`
7. `deep-research-report.md`

AI 协作代理接手：

1. `docs/AI_CONTEXT.md`
2. `docs/PROJECT_MAINLINE.md`
3. `docs/SHORT_TERM.md`
4. `docs/axiom_atlas_v_1_spec_for_claude.md`
5. `core/receiver.py`
6. `scripts/check_consistency.py`
7. `scripts/backup_axiom.py`

## 当前架构 (v0.2, 2026-05-20)

```
core/
  _common.py       312行  共享兼容层 (re-export 模块，保留少量 import* 兼容符号)
  config.py        348行  基础配置、路径、常量、Flask app
  database.py      457行  DB/FTS5/迁移/存储初始化
  items.py         671行  Item payload、文件读写、CRUD 辅助
  system_state.py  560行  stats / overview / backlog / preference
  http_utils.py    401行  响应、鉴权、请求解析、过滤器
  receiver.py      613行  主入口 (组装路由+管理端点+导入导出+Webhook)
  middleware.py     122行  中间件 (限流/CORS/安全/Gzip/日志/指标)
  client.py         245行  Python SDK (供程序化调用, 90+ 方法)
  
  routes/                 按八层模型组织:
    items.py        487行  采集层: /add /upload /item /archive /fetch
    browse.py       321行  检索层: /recent /search /stats /overview  
    memories.py     332行  记忆层: /memories/*
    tasks.py        352行  计划层: /tasks/*
    decisions.py    161行  决策层: /decisions/*
    ai.py           626行  干预层: /suggestions /chat /parse /brief
    automation.py   335行  动作层: /automation /artifacts /processing
    governance.py   152行  治理层: /export /audit-log
    core.py          55行  基础: /app /app/legacy /health /sw.js

modules/
  base.py                  AxiomModule 基类
  registry.py             自动发现+启用/禁用管理
  jianzhi/                减脂模块 (体重/饮食/运动/围度/备注)
    routes.py  models.py  prompts/  static/

scripts/                  22个脚本 (备份/一致性/回顾/inbox/部署/导出/转写)
```

### Python SDK 示例

```python
from core.client import AxiomClient
c = AxiomClient("https://pengweitai.me", "axiomnb")

# 数据操作
c.add_note("今天跑步5公里")
c.create_task("交周报", priority="high", due_date="2026-05-21")
c.create_memory("goal", "年底前减到65kg")

# AI
c.ai_parse("明天下午3点开会")  # → {"type": "task", ...}
c.ai_chat("今天该做什么？")     # 流式聊天
c.ai_suggestions()            # AI 建议

# 管理
c.health()      # 健康检查
c.system()      # 系统状态
c.export_csv()  # 导出 CSV
```

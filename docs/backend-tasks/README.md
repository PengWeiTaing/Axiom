# docs/backend-tasks/ — 后端 / 旧前端 任务区

这个目录里的每一个 `*.md` 都是一份**给"实现工"角色的工作单**，由 Opus（架构师）出题，实现工执行。

> **执行者变更（2026-05-27）**：原方案是 Opus + DeepSeek + ccswitch，用户每次切换工具链。已改为 Opus 在主会话内直接调用 Haiku 4.5 子代理执行（Claude Code Agent 工具原生支持）。**任务单本体里"DeepSeek"措辞保留，按通用"实现工"角色理解即可**。

**与 `docs/tasks/` 的区别**：

| 目录 | 工作范围 | 禁止动 |
|---|---|---|
| `docs/tasks/` | 前端 v2 (`frontend/`) Capture/Atlas 线 | `core/**`、`core/static/v2/` |
| `docs/backend-tasks/`（本目录） | 后端 + 旧前端 + 部署脚本 + 文档 | `frontend/**` |

DeepSeek 拿到一份任务单时，**先看路径**：

- `docs/tasks/NNN-*.md` → 只动 `frontend/src/**`
- `docs/backend-tasks/NNN-*.md` → 可动 `core/**`、`scripts/**`、`docs/**`，但**不要动 `frontend/`**

## 分工

| 角色 | 干什么 |
|---|---|
| **Opus 4.7** | 出任务单、定接口/字段/契约、审实现工提交的代码、在主会话里调度 Haiku 执行 |
| **Haiku 4.5（实现 Agent）** | 按任务单写代码、跑 smoke test、调试报错，不做架构决策 |

## 任务单生命周期

```
Opus 写 docs/backend-tasks/NNN-xxx.md
  → Opus 在同一会话里用 Agent(subagent_type="general-purpose", model="haiku") 派出去
  → Haiku 按任务单直接写代码（动 core/、scripts/、docs/ 指定路径）
  → Haiku 跑通验收清单里的命令并返回结果
  → Opus 看 git diff，做 code review
  → 合格 → 任务单移到 docs/backend-tasks/done/
  → 不合格 → Opus 提反馈，再次派 Haiku 改
```

**用户介入时机**（除此之外 Opus 自动推进）：
- 任务单涉及大架构决策需要用户拍板
- Haiku 报 BLOCKED 求救
- review 发现需要用户判断的取舍
- 需要凭证 / VPS 部署 / 不可逆操作

## DeepSeek 上岗须知（每份任务单生效，不要在任务单里重复）

### 1. 项目结构（后端）

- 入口：`core/receiver.py`（注册路由 + 中间件）
- 共享内核：`core/_common.py`（DB / FTS / 鉴权 / item CRUD / 文本抽取 / 自动化 / 审计 / URL 抓取）
- 路由分层：`core/routes/{core,items,browse,automation,tasks,memories,decisions,ai,governance,cosmos,cosmos_associations,lifelines,cosmos_import}.py`
- 模块系统：`modules/{base,registry,prompt_loader}.py` + `modules/<name>/`
- 旧前端：`core/static/app.js` + `core/static/app.css` + `core/templates/app.html`
- 脚本：`scripts/`（部署、smoke test、一致性检查、deepwiki 生成）

### 2. 鉴权 / 响应约定

所有需要鉴权的端点：

```python
auth_error = require_key()
if auth_error:
    return auth_error
```

响应：成功用 `ok_response(data, status=200)`，错误用 `error_response(status, code, message)`。**不要直接 `return jsonify(...)`**。

### 3. DB 约定

- 用 `get_db_connection()` 拿连接，**手动 `conn.close()`**（用 try/finally）。
- 不要在路由里写裸 `sqlite3.connect`。
- 写操作必须 `conn.commit()`，并配 `write_audit_log(action, target_type, target_id)`。
- 时间一律 `utc_now().isoformat(timespec="seconds")`。

### 4. 禁止动的文件

- `frontend/**`（前端 v2 工程，归 `docs/tasks/` 那条线）
- `core/static/v2/`（v2 构建产物）
- 任务单未明确点名的文件，**不要顺手改**

### 5. 代码风格

- 注释默认中文；只在 _Why_ 不明显时才写，不要写 _What_
- 不要写 emoji
- Python 3.10+ 类型注解优先（`str | None`，不要 `Optional[str]`）
- 错误码用 snake_case：`item_not_found` / `invalid_category` / `missing_content`

### 6. 验收命令（每份任务单结束前必须跑通）

```bash
python -m compileall -q core scripts
python scripts/smoke_test_receiver.py
```

任务单里会指定额外的 smoke test。**任何 smoke 失败禁止提交**。

### 7. 不要做的事

- 不要"顺手"重构相邻代码
- 不要加新依赖（requirements.txt 改动需 Opus 批准）
- 不要新建表 / 加字段（除非任务单明确要求）
- 不要"为了好看"调整既有响应字段名（破坏前端兼容）
- 不要在任务范围外创建新文件
- 任务单没说的字段、API、文案不要凭空发明

### 8. 遇到阻塞怎么办

当你以为 _任务单写错了 / 字段不存在 / 接口签名对不上_ 时：

> **立即停止**，在任务单文件底部加一段：
> ```
> ## BLOCKED
> - 现象：...
> - 我以为应该 ...
> - 但实际看到 ...
> - 需要 Opus 决定：补任务单 / 改设计
> ```
> 不要自己改设计、不要"等价绕过"。Opus 拿到阻塞会评估、出补丁单。

## 任务单命名

```
NNN-短主题.md
```

`NNN` 三位顺序号（001 起，与 `docs/tasks/` 独立编号）。例：

- `001-item-promote-to-memory.md`
- `002-memory-suggest-with-item-id.md`

## 任务单模板

见 [`_template.md`](_template.md)。

## 历史批次

- **001 ~ 008（2026-05-27 完成）**：item ↔ memory 双向链，commits `892f48b` ~ `882f31e`。任务单已归档到 `done/`，详见 `docs/ITERATION_LOG.md` 2026-05-27 条目。
- **009（2026-05-27 完成）**：阶段标签 v0.1 alpha → v0.2+，commit `a6e2d98`。无任务单（最小文本编辑由 Opus 直接做）。

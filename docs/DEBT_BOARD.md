# Axiom 债务清理看板

> 最后更新：2026-06-02 | 基于 2026-06-01 全项目分析与 2026-06-02 前端迁移进展

## 债务总览

| 级别 | 数量 | 说明 |
|---|---|---|
| 🔴 P0 — 阻塞级 | 2 | 影响安全、稳定性、新成员接手 |
| 🟡 P1 — 重要 | 4 | 影响开发效率和可维护性 |
| 🔵 P2 — 改善级 | 3 | 提升质量但不阻塞推进 |

---

## 🔴 P0 — 阻塞级

### DB-001: `core/_common.py` 内核过重

- **现状：** 主体已拆分完成，`core/_common.py` 约 312 行，仅保留 Flask app/logging 初始化、兼容导出和少量历史兼容符号；配置、URL 抓取、数据库/FTS、搜索、Artifacts、Automation、Items、文本抽取、审计、向量搜索、系统状态、HTTP 工具均已拆出；`core/routes/*.py` 和 `core/receiver.py` 已移除 `from core._common import *`
- **残余风险：** route 虽已改成显式导入，但多数仍通过 `_common.py` 兼容层取名；部分老脚本仍把 `core.receiver` 当公共出口；核心模块缺少细粒度单元测试
- **建议拆分方案：**

```
core/config.py           # 基础配置 + 环境变量 (~348行)
core/database.py         # DB连接 + 建表 + FTS5 + 迁移 (~457行)
core/items.py            # Item CRUD + 文件读写 + 类型检测 (~671行)
core/search.py           # 搜索查询构造 (~24行)
core/artifacts.py        # 自动化产物读取 (~369行)
core/automation_core.py  # 自动化任务定义 + 锁 + 运行记录 (~640行)
core/text_extract.py     # PDF/DOCX抽取 + 音频转写处理 (~218行)
core/audit.py            # 审计日志 + 文件清理 (~41行)
core/vector_search.py    # Embedding 与向量相似搜索 (~130行)
core/system_state.py     # stats / overview / backlog / preference (~560行)
core/http_utils.py       # 响应、鉴权、请求字段、过滤参数 (~401行)
core/auth.py             # 鉴权 + 限流 (从middleware移入)
core/fetch.py            # URL抓取 (~129行)
core/_common.py          # 保留为兼容层，re-export各模块 (~312行)
```

- **迁移策略：** 逐个模块拆出 → 验证 smoke test 全绿 → 清理隐式 `import *` → 后续把 route 从 `_common.py` 兼容层迁到具体模块直接导入
- **预计工时：** 8-12h（分 4-5 个 commit 逐步拆）
- **前置条件：** 当前所有 smoke test 必须全绿

### DB-002: 文档版本标签不一致

- **现状：** `docs/AI_CONTEXT.md` 和 `docs/SHORT_TERM.md` 仍写 `v0.1 alpha`，实际架构已是 `v0.2+`
- **风险：** 新成员或 AI Agent 误判项目成熟度
- **需修改的文件：**
  - `docs/AI_CONTEXT.md` — `v0.1 alpha` → `v0.2+`
  - `docs/SHORT_TERM.md` — 重写短期目标章节（当前内容仍是 v0.1 时代）
  - `docs/HUMAN_CONTEXT.md` — 阶段标签修正
  - `README.md` — 确认一致
- **预计工时：** 1h
- **注意：** `docs/axiom_current_status_2026-05-27.md` 已正确标注为 `v0.2+`，以此为基准

---

## 🟡 P1 — 重要

### DB-003: Cosmos/Atlas/Lifelines 在核心文档中缺失

- **现状：** `README.md` 和 `docs/AI_CONTEXT.md` 完全没有提到 Cosmos 图谱系统、Lifelines 树、Association 自动生成
- **影响：** 新接手者不知道关系图谱已存在，可能重复造轮子或遗漏这条主线
- **需补充的位置：**
  - `README.md` — 当前能力清单中加入 Cosmos/Atlas/Lifelines
  - `docs/AI_CONTEXT.md` — 目录结构 + 能力矩阵中补充
- **预计工时：** 1h

### DB-004: 自动生产状态快照

- **现状：** 已新增 `scripts/build_system_status.py`、`system_status_day` 自动化 job、`deploy/axiom-daily-system-status.*` systemd 配置；待部署后启用 timer 并观察线上报告质量
- **报告内容：** 每日生成 `data/reviews/system-status/YYYY/YYYY-MM-DD.md`，包含：
  - `/health` 结果
  - `/system` 摘要（DB 大小、表计数、FTS 条目、备份年龄、孤立引用、健康分数）
  - `/stats` 总览
  - 一致性检查结果
  - 自动化 skipped/failed 统计
  - pending backlog 摘要
- **实现路径：** `scripts/build_system_status.py`，已注册到 `AUTOMATION_JOBS` + systemd timer
- **后续：** 部署后确认 `/artifacts` 能读取 `system-status`，并根据线上报告再补 alarm/suggestion

### DB-005: 前端双轨并存

- **现状：** 主前端 `frontend/src/`（Vue 3 + Vite）+ 旧前端 `core/static/app.js`（~4200行 vanilla JS）同时维护
- **影响：** 旧前端功能越来越多但架构脆弱；新成员困惑该改哪个
- **迁移策略（按 PROJECT_MAINLINE.md 定下的规则）：**
  - 旧 `app.js` 不再加新功能，只修 bug
  - 新功能进入 `frontend/src/`
  - 逐步小块迁移旧功能到新前端（如处理工作台、自动化中心）
  - 迁移完成后删除旧文件
- **当前迁移进度估测：** ~41%（Capture + Atlas + 近况看板已迁；近况页已具备处理积压单条打开、标记就绪和退回待处理；任务台已迁入 Vue 主线，支持快速新增、今日/逾期、状态/优先级筛选和基础状态动作；记忆库已迁入 Vue 主线，支持快速新增、分类/状态筛选、确认和归档；自动化中心已迁入 Vue 主线，支持任务列表、运行记录、手动触发和详情查看；完整处理工作台/决策面板仍在旧前端）
- **预计完全迁移：** 长期，不做一次性硬切

### DB-006: AI 层仍在工具层

- **现状：** AI 当前只做被动的"调用响应"（parse/suggestions/transcribe/describe），没有形成主动推理层
- **具体差距：**
  - 不会主动检测到"用户三天没记录"并推送提醒
  - 不会在 inbox 积压时自动建议处理优先级
  - 关联生成（cosmos_associations）只在手动触发时运行
  - 不会基于历史模式预判用户需求
- **下一步：** 先做 `DB-004`（生产快照）和 alarm/suggestion 的定时主动推送
- **预计工时：** 设计阶段 2-3h + 实现 4-6h

---

## 🔵 P2 — 改善级

### DB-007: 旧前端代码质量

- **现状：** `core/static/app.js` ~4200 行，vanilla JS 无模块化，全局函数命名冲突风险
- **影响：** 低（因为不会再加新功能，且有 Playwright smoke test 兜底）
- **处理：** 等待 P1 的逐步迁移，迁移完成自然消除
- **不需要单独投入**

### DB-008: 测试覆盖率不足

- **现状：** 只有 smoke test（冒烟），没有单元测试
- **影响：** 重构 `_common.py` 时风险较高
- **建议：** 在 `DB-001` 拆分后，为核心模块补最小单元测试（DB/Items/Search 优先）
- **预计工时：** 每个模块 2-4h，可在拆分时顺带写
- **注意：** 当前不做，等 `DB-001` 拆完再加

### DB-009: `.gitignore` 覆盖不全

- **现状：** `desktop/src-tauri/target`（4.15GB）、`desktop/src-tauri/gen`、`desktop/node_modules` 不在 `.gitignore` 中，虽然未跟踪但会出现在 `git status` 中
- **修复：** `.gitignore` 追加：
```
# Desktop (Tauri v2)
desktop/node_modules/
desktop/src-tauri/target/
desktop/src-tauri/gen/
```
- **预计工时：** 5 分钟

---

## 执行计划

### 第一轮（今天就做，~2h）

| 顺序 | 编号 | 任务 | 预计 |
|---|---|---|---|
| 1 | DB-009 | `.gitignore` 补全 | 5min |
| 2 | DB-002 | 统一版本标签 | 1h |
| 3 | DB-003 | 核心文档补 Cosmos/Atlas | 1h |

### 第二轮（本周，~12h）

| 顺序 | 编号 | 任务 | 预计 |
|---|---|---|---|
| 4 | DB-001 | `_common.py` 拆分（分 4-5 个 commit） | 8-12h |
| 5 | DB-004 | 生产状态快照脚本 | 2-3h |

### 第三轮（后续）

| 顺序 | 编号 | 任务 | 预计 |
|---|---|---|---|
| 6 | DB-006 | AI 主动推理层设计+实现 | 6-9h |
| 7 | DB-005 | 前端逐步迁移 | 长期 |
| 8 | DB-008 | 单元测试补全 | 跟随 DB-001 |

---

## 债务解决记录

| 编号 | 解决日期 | 方式 | 说明 |
|---|---|---|---|
| DB-002 | 2026-06-01 | SHORT_TERM.md 重写 | 当前主线/状态图/风险/优先级全面更新到 v0.2+ |
| DB-003 | 2026-06-01 | README.md 补 Cosmos 段 | 图谱系统（Cosmos/Lifelines/Associations/Atlas）介绍已加入 |
| DB-009 | 2026-06-01 | .gitignore 追加 4 行 | desktop/node_modules, target, gen 已忽略 |
| DB-004 | 2026-06-01 | 新增 system status 自动化 | `scripts/build_system_status.py` + `system_status_day` job + systemd service/timer |

> 每解决一条债务，在这里记录，不要删除条目（保留历史）。

## 债务推进记录

| 编号 | 日期 | 进展 | 验证 |
|---|---|---|---|
| DB-001 | 2026-06-01 | 第一阶段：从 `_common.py` 拆出 `core/config.py`、`core/fetch.py`、`core/database.py`、`core/search.py`、`core/artifacts.py`、`core/automation_core.py`，保留 `_common.py` 兼容导出；`_common.py` 约 3761 行降到 1708 行 | `python -m compileall -q core scripts`、`python scripts/smoke_test_receiver.py`、`system_status_day` 本地自动化验证 |
| DB-001 | 2026-06-01 | 第二阶段：继续拆出 `core/items.py`、`core/text_extract.py`、`core/audit.py`、`core/vector_search.py`、`core/system_state.py`、`core/http_utils.py`；`_common.py` 降到约 312 行，转为兼容导出层 | `python -m compileall -q core scripts`、`python scripts/smoke_test_receiver.py`、`python scripts/smoke_test_web_app.py`、`python scripts/smoke_test_atlas.py` |
| DB-001 | 2026-06-01 | 第三阶段：清理所有 `core/routes/*.py` 与 `core/receiver.py` 的 `from core._common import *`，改为显式导入；为老脚本保留 `core.receiver` 的显式兼容出口 | `python -m compileall -q core scripts`、`python scripts/smoke_test_receiver.py`、无 `from core._common import *` 命中 |
| DB-005 | 2026-06-02 | 第一阶段：`RecentView.vue` 从旧前端包装改为 Vue 原生只读近况页，覆盖运行摘要、处理积压、最近记录和自动化产物摘要 | `npm run type-check`、`npm run build`、`python scripts/smoke_test_web_app.py`、Playwright 打开 `/app?mode=recent` |
| DB-005 | 2026-06-02 | 第二阶段：Vue 近况页增加处理积压单条打开、标记就绪和手动完成项退回待处理；web smoke 同时覆盖 Vue 动作与旧 Recent 批量处理兼容链路 | `npm run type-check`、`npm run build`、`python -m compileall -q core scripts`、`python scripts/smoke_test_web_app.py` |
| DB-005 | 2026-06-02 | 第三阶段：新增 `AutomationView.vue`，将自动化中心迁入 Vue 主线；顶部模式增加“自动化”，页面覆盖任务卡、ready/runtime 状态、运行日期、运行记录过滤、手动触发和详情面板 | `npm run type-check`、`npm run build`、`python -m compileall -q core scripts`、`python scripts/smoke_test_web_app.py`、Browser 打开新版 KeyGate 并确认服务端 bundle 包含 automation 模式 |
| DB-005 | 2026-06-02 | 第四阶段：新增 `TasksView.vue`，将任务台迁入 Vue 主线；顶部模式增加“任务”，页面覆盖快速新增、今日/逾期、全部任务筛选、完成/恢复/取消/安排到今天 | `npm run type-check`、`npm run build`、`python -m compileall -q core scripts`、`python scripts/smoke_test_web_app.py` |
| DB-005 | 2026-06-02 | 第五阶段：修复 Vue 主线 bundle 缓存风险；`/static/v2/` 改为 revalidate，Vite 构建产物改为 hash 文件名，`/app` 保持 no-store，旧 service worker 明确绕开 `/static/v2/` | `python -m compileall -q core scripts`、`python scripts/smoke_test_web_app.py`、Browser 验证旧模块缓存不再挡住新页面 |
| DB-005 | 2026-06-02 | 第六阶段：新增 `MemoriesView.vue`，将记忆库迁入 Vue 主线；顶部模式增加“记忆”，页面覆盖统计、快速新增、分类/状态筛选、确认和归档；同步修正 `/memories/stats` 与 `createMemory()` 的前端类型 | `npm run type-check`、`npm run build`、`python -m compileall -q core scripts`、`python scripts/smoke_test_web_app.py`、Browser 打开 `/app?mode=memories` |

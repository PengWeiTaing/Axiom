# Axiom 项目主线

更新时间：2026-06-02

这份文档是当前开发前置事实源。它不替代详细设计文档，只回答一个问题：新功能应该接到哪条主线，哪些东西只是兼容或历史保留。

## 当前主入口

- `/app` 是当前主前端入口，服务 `frontend/` 构建出的 Vite + Vue 3 应用。
- `/atlas` 是同一套 Vite 应用的 Atlas 深链接，进入后默认打开 Atlas 模式。
- `/app/v2` 仅作为历史兼容入口，会重定向到 `/app`。
- `/app/legacy` 保留旧移动 Web App，用于兼容和回归测试，不再承载新功能。

## 前端主线

当前主前端代码在：

```text
frontend/src/
```

Vue 主应用模式：

```text
Capture -> Atlas -> 近况 -> 处理 -> 搜索 -> 任务 -> 记忆 -> 决策 -> 自动化
```

- `CaptureView.vue` 是记录入口。
- `AtlasView.vue` 是新 Atlas 主实现，包含 3D 全局图和 2D 聚焦图。
- `RecentView.vue` 是 Vue 主线近况页，读取 `/overview` 展示运行摘要、处理积压、最近记录和自动化产物；已支持积压单条打开、标记就绪和手动完成项退回待处理。
- `ProcessingView.vue` 是 Vue 主线处理工作台，读取 `/processing/backlog`，支持全局下一条、分组队列、分组批量标记就绪和退回待处理；条目详情复用 `ItemDrawer.vue`，支持标记就绪、退回待处理、完成并打开同类下一条。
- `SearchView.vue` 是 Vue 主线搜索工作台，读取 `/search/all` 与 `/search/vector`，支持关键词/语义切换、跨记录/任务/记忆/决策分组展示，记录结果可打开 `ItemDrawer.vue`。
- `TasksView.vue` 是 Vue 主线任务台，读取 `/tasks/today` 和 `/tasks`，支持快速新增、今日/逾期、状态/优先级筛选，以及完成、恢复、取消、安排到今天。
- `MemoriesView.vue` 是 Vue 主线记忆库，读取 `/memories/stats` 和 `/memories`，支持快速新增、分类/状态筛选、确认和归档。
- `DecisionsView.vue` 是 Vue 主线决策台，读取 `/decisions`，支持快速新增、状态筛选、填写实际结果并标记已回顾。
- `AutomationView.vue` 是 Vue 主线自动化中心，读取 `/automation/jobs` 和 `/automation/runs`，支持运行日期、手动触发、状态/任务过滤和运行详情。
- `frontend/src/views/_legacy/AtlasView.vue` 不是新 Atlas，不要在新功能中继续扩展它。

## Learning Board 主线

- `/board` 是 Learning Board 独立前端入口，服务 `frontend/board/` 构建出的 React + tldraw 应用。
- Board 后端 API 在 `/api/learning/*`，核心代码在 `core/boards/` 与 `core/routes/boards.py`。
- Board 构建产物输出到 `core/static/board/`，独立于主 Vue 的 `core/static/v2/`，避免 Vue 构建清空 Board 产物；产物暂时入库，保证 VPS 不依赖 Node.js。
- `ModeSwitcher` 中的 `Board` 会跳转到 `/board`，不在 `frontend/src/App.vue` 内直接渲染 Board。

## Atlas / Cosmos 主线

- Atlas v1 的真实数据 API 在 `/api/atlas/*`。
- Atlas 后端主线在 `core/graph/` 与 `core/routes/atlas.py`。
- Cosmos 仍是关系图谱的编辑与对象关系层，相关代码保留在 `core/routes/cosmos*.py` 与 `frontend/src/cosmos/`。
- `frontend/public/mock/cosmos.json` 只用于开发环境 fallback 和契约参考，生产环境不使用 mock 数据伪装真实数据。

## 旧版前端边界

旧版移动 Web App 仍然有价值，因为它覆盖了处理工作台、自动化运行、旧 PWA 链路等已经验证过的能力。

边界规则：

- bugfix 可以改 `/app/legacy` 相关旧代码。
- 新交互和新页面默认进入 `frontend/src/`。
- 如果旧版能力要迁入新前端，先做小块迁移，不在旧版上继续扩功能。

## 构建产物策略

`frontend/` 的构建产物输出到：

```text
core/static/v2/
```

这些产物暂时继续入库，因为 VPS 不要求安装 Node.js。主 Vue 构建使用 hash 文件名，避免浏览器或旧页面持有过期 bundle。

`frontend/board/` 的构建产物输出到：

```text
core/static/board/
```

Board 当前使用固定 `assets/index.js` / `assets/index.css` 文件名，因此 `/board` shell 必须 `no-store`，`/static/board/` assets 必须 revalidate。

hash 文件名仍需要配合服务端缓存策略，因此后端必须保持：

- `/app` shell 使用 `no-store`。
- `/static/v2/` 使用 `no-cache, must-revalidate`，让浏览器每次校验新版 Vue bundle。
- `/static/board/` 使用 `no-cache, must-revalidate`，让浏览器每次校验固定文件名的 Board bundle。
- 旧 `/static/app.js`、`/static/app.css` 仍可长期缓存，仅用于 `/app/legacy`。
- `/sw.js` 的离线缓存只服务旧 `/app/legacy`，不得缓存 `/static/v2/`。

## 后端边界

`core/receiver.py` 只负责组装 Flask app、注册中间件、注册 routes 和管理端点。

`core/_common.py` 仍是历史共享内核，短期不做大搬家。新代码遵守：

- route 模块不要再新增 `from core._common import *`。
- 新图谱逻辑放到 `core/graph/`。
- 新业务 route 放到 `core/routes/`，只显式导入需要的 helper。
- 当某类 helper 变多时，再从 `_common.py` 拆到更小的模块。

## 文档维护规则

- 小改动只更新对应任务文档或 `docs/ITERATION_LOG.md`。
- 改主入口、主数据流、部署方式、Atlas/Cosmos 边界时，同步更新本文件。
- 阶段性大改动后再同步 `README.md`、`docs/AI_CONTEXT.md` 和 DeepWiki 缓存。

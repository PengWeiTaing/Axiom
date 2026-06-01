# Git 梳洗方案 — 2026-06-01

> 当前：185 文件变更，来自 3 个源头（DeepSeek/Codex/我们），混在一起未提交。
> 目标：拆成独立、可回溯的 commit 批次，按依赖顺序提交。

## 提交顺序

### 第 1 批：我们 — 文档清理 + 垃圾删除（~100 文件）
```
[commit A] chore: 删除 Claude Code 时代遗物
  D .claude/commands/*
  D .claude/skills/*
  D .claude/settings.json
  D CLAUDE.md
  D docs/CLAUDE_FRONTEND.md
  D docs/claude-code-汉化配置.md

[commit B] chore: 清理项目垃圾文件
  D .playwright-mcp/* (~80 files)
  D screenshots/* (4 png files)

[commit C] chore: 归档历史任务单到 docs/_legacy/
  R docs/tasks/done/* → docs/_legacy/tasks/* (~32 files)
  R docs/backend-tasks/done/* → docs/_legacy/backend-tasks/* (8 files)
  R docs/atlas/v0.1-rfc.md → docs/_legacy/atlas/v0.1-rfc.md

[commit D] docs: 补文档体系 — SHORT_TERM 重写, README 补 Cosmos 段, .gitignore 补 desktop
  M docs/SHORT_TERM.md
  M README.md
  M .gitignore
  ?? AGENTS.md, SOUL.md, USER.md, TOOLS.md, HEARTBEAT.md
  ?? IDENTITY.md
  ?? docs/AGENT_BRIEFING.md
  ?? docs/PROJECT_EVOLUTION.md
  ?? docs/DEBT_BOARD.md
  ?? docs/PROJECT_MAINLINE.md
  ?? docs/白板/*
  ?? memory/*
```

### 第 2 批：Codex — `_common.py` 拆分 + 生产快照（~25 文件）
```
[commit E] refactor: 拆出 core/config.py (基础配置 + 常量 + 自动化任务定义)
  ?? core/config.py
  M core/_common.py (删除 config 段, 改为 from core.config import *)

[commit F] refactor: 拆出 core/database.py (DB连接 + 建表 + FTS5)
  ?? core/database.py
  M core/_common.py (删除 DB 段)

[commit G] refactor: 拆出 core/items.py + core/search.py + core/text_extract.py
  ?? core/items.py
  ?? core/search.py
  ?? core/text_extract.py
  M core/_common.py (删除 items/search/text 段)

[commit H] refactor: 拆出 core/audit.py + core/fetch.py + core/automation_core.py + core/artifacts.py
  ?? core/audit.py
  ?? core/fetch.py
  ?? core/automation_core.py
  ?? core/artifacts.py
  M core/_common.py (删除 audit/fetch/automation/artifacts 段)

[commit I] refactor: 拆出 core/http_utils.py + core/system_state.py + core/vector_search.py
  ?? core/http_utils.py
  ?? core/system_state.py
  ?? core/vector_search.py
  M core/_common.py (删除剩余辅助段)

[commit J] feat: 生产状态快照脚本 + systemd timer (DB-004)
  ?? scripts/build_system_status.py
  ?? deploy/axiom-daily-system-status.service
  ?? deploy/axiom-daily-system-status.timer
```

### 第 3 批：预存改动 — Atlas/Cosmos/前端 迭代（~50 文件）
```
[commit K] feat: Atlas v1 图谱可视化 (core/graph/ + routes/atlas.py)
  ?? core/graph/*
  ?? core/routes/atlas.py
  ?? core/routes/frontend_shell.py
  ?? scripts/seed_atlas_demo_data.py
  ?? scripts/smoke_test_atlas.py

[commit L] feat: Atlas 前端 — CosmosView + AtlasView 增强
  ?? frontend/src/atlas/*
  ?? frontend/src/stores/atlasGraph.ts
  ?? frontend/public/favicon.svg
  M frontend/src/views/AtlasView.vue
  M frontend/src/App.vue
  M frontend/src/stores/mode.ts
  M frontend/index.html
  M frontend/vite.config.ts
  M frontend/src/api/endpoints.ts

[commit M] chore: 前端构建产物更新 (Vite fixed-hash output)
  ?? core/static/v2/assets/AtlasView.css
  ?? core/static/v2/assets/AtlasView.js
  ?? core/static/v2/assets/RecentView.css
  ?? core/static/v2/assets/RecentView.js
  ?? core/static/v2/assets/SearchOverlay.css
  ?? core/static/v2/assets/SearchOverlay.js
  ?? core/static/v2/assets/index.css
  ?? core/static/v2/assets/index.js
  ?? core/static/v2/assets/three.js
  ?? core/static/v2/assets/vue.js
  ?? core/static/v2/favicon.svg
  D core/static/v2/assets/* (old hash-named versions)
  M core/static/v2/index.html

[commit N] misc: 其他预存改动 (core routes, middleware, app.js, docs, smoke tests)
  M core/_common.py (剩余的修改 — 小心和 DeepSeek 的拆分重叠)
  M core/receiver.py
  M core/middleware.py
  M core/routes/core.py
  M core/routes/ai.py
  M core/routes/automation.py
  M core/routes/browse.py
  M core/routes/cosmos.py
  M core/routes/cosmos_associations.py
  M core/routes/cosmos_import.py
  M core/routes/decisions.py
  M core/routes/governance.py
  M core/routes/items.py
  M core/routes/lifelines.py
  M core/routes/memories.py
  M core/routes/tasks.py
  M core/static/app.css
  M core/static/app.js
  M core/static/manifest.webmanifest
  M core/static/sw.js
  M core/templates/app.html
  M docs/AI_CONTEXT.md
  M docs/ITERATION_LOG.md
  M docs/axiom_current_status_2026-05-27.md
  M scripts/smoke_test_receiver.py
  M scripts/smoke_test_web_app.py
  M frontend/src/components/KeyGate.vue
```

---

## ⚠️ 关键风险

### `core/_common.py` 冲突
DeepSeek 拆分了 `_common.py`（删除大段代码 + 改为 import），但 commit N 的预存改动也在修改同一个文件。**这两个改动可能冲突。**

**验证方法：**
```powershell
git diff core/_common.py
```
如果 diff 主要是"删除大段功能 + 加 import 语句"，说明 DeepSeek 已经做完拆分，只差提交。如果还有实质性的新代码，说明有重叠。

### 提交顺序依赖
- B 必须在 C 之前（先删原始位置的垃圾，再移归档文件）
- E~I 有依赖（先拆 config → 才能从 _common.py import）
- K/L 可独立，与 DeepSeek 的工作无冲突

### 跑测试
每个 commit 之后都应该跑 `python -m compileall -q core scripts` 确保不破坏 import 链。

---

## 执行

**谁来做：** 你或代理 agent。我是观测者，不执行 git 命令。

**命令参考：**
```powershell
git -C E:\Axiom add <files...>
git -C E:\Axiom commit -m "<message>"
git -C E:\Axiom diff --stat           # 每批提交前看 diff
python -m compileall -q core scripts  # 每批提交后验证
```

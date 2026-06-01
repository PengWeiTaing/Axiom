# Axiom 项目演进总览

> 从历史文档中提炼的核心演进脉络。最后更新：2026-06-01。

## 阶段一：地基 (2026-04-21 ~ 04-29)

**做了什么：** 从零搭建 VPS 运行基线。receiver 最小 API（/health, /add, /stats），文件+SQLite 双层存储，备份+恢复+一致性检查，HTTPS 证书+Nginx+gunicorn，iOS 快捷指令作为第一个真实输入端。

**关键决策：**
- 文件系统存本体，SQLite 存索引 → 至今仍是基础
- 自动化默认 dry-run 先于 apply → 安全纪律从第一天就定下
- 部署脚本化 → deploy_to_vps.py 成为唯一部署路径

**产物：** 2 条真实数据在 VPS 上跑通全链路（文本 + 图片）

## 阶段二：自动化闭环 (2026-04-30)

**做了什么：** 日/周回顾、inbox 处理报告、action 执行+留痕、action history 汇总。8 个 systemd timers 上线。

**关键决策：**
- 半自动 inbox 处理：dry-run 优先，apply 需显式加 `--apply`
- 所有自动化写入 `automation_runs` 表，可回看
- action snapshot 落地为 markdown 文件，人可读

## 阶段三：移动端 + 文档增强 (2026-05-05 ~ 05-08)

**做了什么：** `/app` 移动优先 Web App + PWA 主屏入口。文件上传升级为通用上传（PDF/Word/音频）。PDF/DOCX 自动抽取正文，音频支持转写文本。处理工作台（processing backlog/next/mark-ready）。

**关键决策：**
- PWA 壳从一开始就做 → 手机低摩擦使用
- processing_state 概念引入 → 系统开始关心"数据是否可消费"
- 旧 `app.js/app.css` 开始承载越来越多的功能（后来成为需要迁移的技术债）

**产物：** `core/static/app.js` (~4200行), `core/static/app.css`, `core/templates/app.html`

## 阶段四：结构化对象层 (2026-05-10)

**做了什么：** 三系统齐上线——Memories（五类记忆+三态流转）、Tasks（三级优先级+截止日期）、Decisions（待回顾→已回顾）。同日补上治理层（审计日志、数据导出、删除级联）和 FTS5 中文全文搜索（BM25+CJK 分词）。

**关键决策：**
- 记忆分类：fact/preference/goal/relationship/event → 覆盖了从"事实"到"关系"的完整语义
- FTS5 手动同步而非自动触发器 → 控制同步时机
- 治理系统从一开始就做 → 可审计、可导出、可删除

## 阶段五：关系图谱 (2026-05-23 ~ 05-26)

**做了什么：** 这是最密集的开发阶段——32 个任务单在 3 天内完成（`docs/_legacy/tasks/001 ~ 032`）。核心产出：

1. **Cosmos 原型**（005）：Three.js 3D 球形放射树，四态机（Global Overview / Region Zoom / Node Focus / Relation Reveal）
2. **Cosmos 后端**（005c）：聚合 items/tasks/memories/decisions/lifelines → 图谱数据源
3. **关联自动生成**（005d）：规则初筛（bigram+时间邻接）+ LLM 分类（co_occurrence/causal/tension/derived_from/none）
4. **Lifeline CRUD**（005e）：人生主线树结构，parent_id + order_index
5. **Atlas 交互增强**（007~032）：空间隐喻、搜索、路径查找、实体编辑、关联编辑、视觉增强、导航、快捷键、数据导出/导入

**关键决策：**
- v0.1 原型完全脱离后端，纯 mock 数据 → 先验证视觉和交互，不对就改设计
- 叶子节点按 kind 用几何形状区分（方块/圆点/菱形/三角），不用颜色区分
- 颜色保留给关联线（type-color mapping）
- 前端用 Three.js 做 3D 图 → `frontend/src/cosmos/` 目录形成

**产物：** `frontend/src/cosmos/`, `core/routes/cosmos*.py`, `core/routes/lifelines.py`, `core/routes/cosmos_associations.py`

## 阶段六：对象关系链打通 (2026-05-27)

**做了什么：** item → memory 反向链。`POST /item/<id>/promote-to-memory` 打通了从原始记录到长期记忆的升级路径。`GET /item/<id>` 返回 `derived_memories`，`GET /memories/<id>` 返回 `source_item`。8 个后端任务单（`docs/_legacy/backend-tasks/001~008`）。

**关键决策：**
- FK `ON DELETE SET NULL`：删 item 时 memory 保留，仅清空来源指针
- AI 建议走分支路径：有 source_item_id → promote，无 → 凭空新建
- 这是对象关系链 `item→memory→task→decision→lifeline→association→review` 的第一段

## 阶段七：Atlas v1 架构定型 (2026-05-29 ~ 05-31)

**做了什么：** Atlas v1 规格文档（`docs/axiom_atlas_v_1_spec_for_claude.md`）、项目主线定义（`docs/PROJECT_MAINLINE.md`）、前端收敛（Capture/Atlas/近况 三模式）、白板功能研究（`docs/白板/`）。

**关键决策：**
- 前端主线收敛到 Vue 3（`frontend/src/`），旧 `app.js` 保留兼容
- Atlas 深链接 `/atlas` → 同一套 Vue 应用，不同模式
- 构建产物固定文件名（不再每次生成哈希文件名）
- 白板方向确认为下一个重大实验

## 当前状态 (2026-06-01)

**活跃进行中的任务：**
- `docs/tasks/005b-three-modes-switcher.md` — 三模式入口（Capture/Atlas/近况）
- `docs/tasks/020-lifeline-enhancement.md` — Lifeline 面板增强（已标记废案）

**当前未跟踪的工作区改动：** 大量修改（core/_common.py, middleware.py, app.js 等），推测是 Atlas v1 和白板相关的进行中改动。

**工程债务（按紧迫度）：**
1. `core/_common.py` 已降到约 312 行 → 主体已拆 config/fetch/database/search/artifacts/automation_core/items/text_extract/audit/vector_search/system_state/http_utils，继续清理旧 route 的 `import *`
2. 文档版本标签不一致 → 部分仍写 v0.1 alpha
3. Cosmos/Atlas 文档缺失在 README/AI_CONTEXT 中
4. 旧 `app.js` (~4200行) 与 Vue 3 前端并存 → 需逐步迁移
5. 自动生产状态快照脚本已补 → 待部署启用并观察

## 历史文档已归档

以下已完成的历史文档已移至 `docs/_legacy/`：
- 32 个前端任务单（Atlas/Cosmos 开发）
- 8 个后端任务单（Item↔Memory 反向链）
- Atlas v0.1 RFC（原型设计文档）

以下 Claude 时代文档已删除：
- `CLAUDE.md`（被 AGENTS.md + AGENT_BRIEFING.md 替代）
- `.claude/` 目录（Claude Code 配置，项目已迁移到 OpenClaw）
- `docs/claude-code-汉化配置.md`（Claude 专用）
- `docs/CLAUDE_FRONTEND.md`（被 AGENT_BRIEFING.md 覆盖）

# Axiom 项目 AI Agent 简报

> 阅读时间约 5 分钟。新 agent 接手前必读。最后更新：2026-06-01。

## 一句话定位

Axiom 是个人"外脑系统"，部署在 VPS (`pengweitai.me`)，当前阶段 **v0.2+**。
已从"iOS 快捷指令记录收集器"演进为具备**记忆/任务/决策/图谱/模块化/移动端 PWA** 的个人认知系统底座。

## 当前架构

```
iPhone 快捷指令 → Nginx → gunicorn → Flask → SQLite + 文件系统
                                          ↓
                                    systemd timers (自动化)
```

**技术栈：** Python/Flask/gunicorn + SQLite (FTS5+BM25+CJK) + 文件系统 + Vite/Vue 3 (前端主线) + vanilla JS (旧 PWA 兼容)

**部署：** `scripts/deploy_to_vps.py` 一键完成打包→备份→同步→安装→重启→验证

## 关键文件位置

| 文件 | 用途 | 行数 |
|---|---|---|
| `core/_common.py` | 共享兼容层 (re-export 已拆模块，route/receiver 已无 import*) | ~312 |
| `core/receiver.py` | Flask 主入口 + 模块注册 | ~900 |
| `core/middleware.py` | 限流/CORS/安全/日志/指标 | ~180 |
| `core/client.py` | Python SDK (90+ 方法) | ~245 |
| `core/routes/*.py` | 15 个路由模块 | — |
| `core/graph/` | Atlas v1 图谱核心 | — |
| `frontend/src/` | Vue 3 主前端 | — |
| `frontend/board/` | React Learning Board | — |
| `modules/` | 可插拔模块系统 | — |
| `scripts/` | 33+ 运维/自动化脚本 | — |

## 核心能力矩阵

### 已建成 (v0.2+)
- ✅ 多模态输入：文本/图片/PDF/Word/音频/URL 抓取
- ✅ 文档正文自动抽取 (PDF/Word) + 音频自动转写 (Whisper)
- ✅ FTS5 中文全文搜索 (BM25 排序)
- ✅ 五类记忆：fact/preference/goal/relationship/event，三态流转：candidate → confirmed → archived
- ✅ 任务系统：todo → done → cancelled，三级优先级，截止日期
- ✅ 决策系统：pending → reviewed，预演/复盘
- ✅ Cosmos 关系图谱：lifelines + entity 挂载 + 自动关联 (规则+LLM)
- ✅ Atlas v1 3D 图谱：semantic_shell_sector_v2 布局
- ✅ 自动化：日/周回顾、inbox 处理、action 执行+留痕、systemd 定时
- ✅ 治理：审计日志、数据导出、删除级联、系统监控 (/system, /metrics)
- ✅ 模块系统：AxiomModule 基类 + 自动发现 + 启用/禁用
- ✅ 移动端 PWA：/app + sw.js + manifest
- ✅ Python SDK：AxiomClient 类，90+ 方法

### 已建成（新增 2026-06-01）
- ✅ Learning Board v0.1：AI 四段生成流水线（planner→builder→layout→validator），4 类 Widget（概念地图/函数可视化/测验卡片/例题拆解），掌握度模型（6 维评分），复习调度（1d/3d/7d/14d），事件→mastery/review/task/memory 回写链
- ✅ Tauri v2 桌面应用：独立 exe 18MB，双击启动自动运行 Flask 后端，支持 MSVC 编译
- ✅ 跨端基础设施：可配置 API 客户端、Token 存储抽象、上传队列+指数退避重试、IndexedDB 离线缓存、axiom:// 深链

### 部分建成
- 🟡 AI 层：转写/描述/解析/聊天可用，Learning Board 的 AI 生成流水线已跑通，但主动推理层（检测/提醒/建议）仍未实现
- 🟡 图谱交互：Atlas 可看，但不可编辑/手动连线

### 尚未建设
- ❌ 目标树/OKR 分解
- ❌ 个性化干预引擎 (JITAI)
- ❌ 因果建模产品化
- ❌ 外部连接器 (日历/邮件)
- ❌ 个体差异适配 (能量/注意力追踪)

## 数据模型核心 ER

```
items ───source_item_id──→ memories (FK SET NULL on item delete)
items ───lifeline_id─────→ lifelines
memories ───memory_id────→ tasks
entities ─────────────────→ lifelines (四类实体挂载: items/tasks/memories/decisions)
lifelines ──parent_id────→ lifelines (树结构)

associations: entity_pair + relation_type
  (co_occurrence | causal | tension | derived_from | none)
```

## 当前技术债务 (按严重度排序)

1. 🟡 `core/_common.py` 主体已拆到模块层，当前约 312 行；旧 route/receiver 的 `from core._common import *` 已清理，残余问题是 route 仍大多经 `_common.py` 兼容层导入，需要逐步直连具体模块并补核心单元测试
2. 🟡 文档版本标签曾不一致，当前核心接手文档已统一到 v0.2+，历史文档保留旧阶段描述
3. 🟡 Cosmos/Atlas/Lifelines 已进入 README/AI_CONTEXT/本简报，后续还需补更完整设计文档
4. 🟡 自动生产状态快照脚本已补，待部署启用 systemd timer
5. 🟡 AI 层仍在工具层，未形成深度推理

## 协作规则

- 小改动只更新 `docs/ITERATION_LOG.md`
- 大改动同步 README + `docs/AI_CONTEXT.md` + 本文件
- 自动化默认 dry-run，真执行需显式 `--apply`
- 涉及 VPS 真实数据前先备份
- 部署前跑：`python -m compileall -q core scripts` + smoke tests
- 项目说明用中文
- 测试按改动分层，不默认每次都跑全套

## 关键 API 一览

| 路由前缀 | 模块 | 能力 |
|---|---|---|
| `/add`, `/upload`, `/item`, `/fetch` | items | 采集 |
| `/recent`, `/search`, `/stats`, `/overview` | browse | 检索 |
| `/memories/*` | memories | 记忆 CRUD + confirm/archive |
| `/tasks/*`, `/tasks/today` | tasks | 任务 CRUD + done/todo/cancel |
| `/decisions/*` | decisions | 决策 CRUD + review |
| `/automation/*`, `/artifacts/*`, `/processing/*` | automation | 自动化+产物+处理队列 |
| `/export`, `/audit-log`, `/system`, `/metrics` | governance | 治理 |
| `/cosmos`, `/lifelines/*` | cosmos | 图谱数据 |
| `/api/atlas/*` | atlas | Atlas v1 全局/局部图 |
| `/api/learning/*` | boards | Learning Board |
| `/m/jianzhi/*` | modules | 减脂模块 |

## 当前短期方向 (2026-06)

- Learning Board v0.1 完善
- Atlas 图谱交互增强
- 统一版本标签 + 补充 Cosmos 文档
- `_common.py` 后续收口：把 route 从兼容层迁到具体模块直接导入，为 DB / Items / Search / HTTP 工具补最小单元测试
- 记忆系统增强 (TTL/冲突消解)

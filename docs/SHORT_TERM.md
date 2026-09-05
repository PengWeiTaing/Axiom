# Short Term

这份文档只讲短期目标。它回答一个问题：

`Axiom 现在最应该推进什么？`

## 当前阶段

当前阶段：`v0.2+`（历史标签：`v0.1 alpha`）

> 当前产品事实以 `docs/PRODUCT_MODEL.md` 为准，债务清理以 `docs/DEBT_BOARD.md` 为准，演进总览见 `docs/PROJECT_EVOLUTION.md`。

## 2026-09-05 新会话交接

- 当前分支：`codex/axiom-product-core`。
- 下一代产品研究已经完成并写入 `PRODUCT_MODEL.md`、`FRONTEND_ART_DIRECTION.md` 与 `docs/discovery_cortex/`；当前 Vue 前端仍是可运行旧基线，新形态尚未开始实现。
- 研究中应继续保留：人和 Axiom 中枢严格分层、日常环境与 Foundry 分离、此刻到 Atlas 再到白板的连续认识运动、白板由 Axiom 生成而非用户维护、视觉显著性不能冒充真实性。
- 2026-09-05 生成的第一张“夜行长卷”暗色概念图已被用户否决，没有进入仓库。下一会话不得沿用其星图式右侧关系场、大片空黑、信息图式下半区或整体构图。
- “夜行长卷”当前只是研究代号，不是锁定风格。下一阶段应重新研究具体美学，先提出差异足够大的产品场景方案，再用真实 Axiom 内容做高保真原型；不要直接批量改现有 Vue 页面。
- 开始前依次阅读 `PRODUCT_MODEL.md`、`FRONTEND_ART_DIRECTION.md`、`discovery_cortex/07_ATLAS_DISCOVERY_LANDSCAPE.md`、`08_WHITEBOARD_CO_DISCOVERY_ENVIRONMENT.md` 与 `09_ATLAS_WHITEBOARD_CONTINUUM.md`，并重新检查仓库状态，避免把研究目标误报为当前实现。

当前主线：

```text
随时记录 → 此刻恢复方向 → Atlas 长期定向 → 白板深入理解 → 质疑与判断 → 回到生活 → 结果校准
```

当前阶段核心方向：
- 下一代全前端以 `FRONTEND_ART_DIRECTION.md` 的“夜行长卷”为基线，不再在固定顶栏、旧索引、矩形内容舞台和统一右侧抽屉上继续视觉修补。
- 先验证“此刻 → Atlas → 白板 → 质疑 → 返回”这一条完整认识运动，再迁移资料库、记录、对象与证据页；不同时重写全部旧页面。
- 日常环境只承载人的语境、发现与判断；自动化、结构校准、模型谱系、日志和系统状态迁入独立 Foundry，防止对象类型与治理工作台重新膨胀。
- 承诺档案、项目/生活线详情、行动结果、本周承诺、一层任务拆解、周复盘、候选结果学习与卡点提示已经形成第一条完整闭环，当前转入真实使用校准。
- Atlas 保持 3D 全局定向、按问题适配的 2D 聚焦；取消机器分类 Tab 和根节点中心。白板由 Axiom 生成认知展演，人通过追问、反证、换尺度和判断参与，不承担画布维护。
- AI 从解析工具层进入带依据、可确认、可撤回的主动建议层。
- AI 从工具层向主动推理层过渡

当前已经不再把早期技术边界作为硬约束。Flask、SQLite、文件系统和 VPS 是已验证基线；如果后续有明确收益，可以调整架构，但必须先完成决策说明、迁移方案、回滚方案和验证方案。

当前推进原则：
- 如果一个功能没有时间限制，优先一次做得更完整，减少为了“暂时能用”做的临时妥协。
- 默认追求更稳、更完整和更少返工，而不是单纯追求更快出结果。

## 当前状态图

```mermaid
flowchart TB
    subgraph 输入层
        A["iOS 快捷指令 / HTTPS 输入"]
    end
    subgraph 网关层
        B["Nginx"] --> C["gunicorn"]
    end
    subgraph 后端层
        C --> D["core/receiver.py\nApp 组装入口"]
        D --> E1["core/routes/\n15 个路由模块"]
        E1 --> E2["core/_common.py\n共享兼容层 (~312行)"]
        E1 --> E3["core/graph/\n图谱核心"]
    end
    subgraph 存储层
        E2 --> F1["SQLite\nitems / memories / tasks / decisions / lifelines"]
        E2 --> F2["文件系统\ninbox / archive / reviews"]
    end
    subgraph 前端层
        G1["frontend/src/\nVue 3 + Three.js\n主前端"]
        G2["core/static/app.js\n旧前端 (兼容保留)"]
    end
    subgraph 自动化层
        H1["systemd timers\n8 个定时任务"]
        H2["artifact 产物\nreviews/ 落盘"]
    end
    subgraph 扩展层
        I1["modules/\n插件系统"]
        I2["Cosmos / Atlas\n关系图谱"]
    end
    F1 --> G1
    F1 --> G2
    F1 --> H1
    F1 --> I2
```

## 当前已经有的东西

- HTTPS 域名入口：`pengweitai.me`
- Nginx 反向代理
- gunicorn + systemd receiver 服务
- `/health`
- `/stats`
- `/add`
- `/upload`
- `/item/<id>`
- `/file/<id>`
- `/archive/<id>`
- `/restore/<id>`
- `/recent`
- `/search`
- `/overview`
- `/overview/text`
- `/artifacts`
- `/artifacts/summary`
- `/artifacts/file/<path>`
- `/app`：当前主前端入口
- `/atlas`：Atlas 深链接
- `/app/legacy`：旧移动 Web App 兼容入口
- SQLite `items` 表
- `data/inbox` 和 `data/archive`
- 每日自动备份
- 一致性检查脚本
- receiver 冒烟测试
- inbox processing 冒烟测试
- Markdown 导出
- daily / weekly review
- inbox processing report
- inbox action snapshot
- inbox action history
- 对应的 VPS systemd timers
- 移动优先 Web App / PWA 壳

## 当前已稳住的点

**输入与存储：**
- 文本、图片、PDF/Word 文档和常见音频都能进入 inbox 并写入 SQLite。
- PDF/DOCX 上传后自动抽取正文，进入搜索和文档查看器。
- 音频支持直接携带 `transcript_text` 或通过 sidecar 文件导入转写（txt/md/srt/vtt），srt/vtt 自动清洗时间轴。
- 文件取回、元数据读取、统计、类型/来源/存储区/处理状态/时间范围过滤已验证。
- 归档和恢复不破坏取回路径。
- 备份包含 SQLite、inbox、archive 和 manifest，每日自动执行。

**检索与前端：**
- FTS5 中文全文搜索（BM25 排序 + CJK 字符级分词），覆盖 content / original_name / derived_text / transcript_text。
- `/app` 为当前主前端入口（Vue 3，“此刻 / 资料库 / Atlas”三个一级目的地 + 全局记录），`/app/legacy` 保留旧处理工作台兼容。
- PWA 主屏入口，移动端低摩擦使用。

**AI 预处理：**
- 音频自动转写（`audio_transcribe_day`），图片自动描述（`image_describe_day`），缺 key 时跳过并留痕。
- 所有 AI 预处理产物落盘 `data/reviews/`，可回看。

**结构化对象：**
- 五类记忆系统（fact / preference / goal / relationship / event），candidate → confirmed → archived。
- 任务系统（三级优先级 high/medium/low + due_date）。
- 决策系统（pending → reviewed），支持复盘记录。
- Item → Memory 反向链：`promote-to-memory` 已打通。

**自动化与治理：**
- 8 个 systemd timers 线上运行（日/周回顾、inbox 处理、action 执行+留痕、音频转写、图片描述、备份）。
- 自动化默认 dry-run，真执行需显式 `--apply`；支持 `--max-items`、`--only-id`、`--exclude-id` 分批操作。
- 审计日志覆盖 items / memories / tasks CUD 操作。
- `/system` 端点提供 DB 大小、表计数、FTS 条目、备份年龄、孤立引用、健康分数等运行指标。
- 部署脚本化：`deploy_to_vps.py` 一键部署 + 验证。

**关系图谱：**
- Cosmos 聚合 items / tasks / memories / decisions / lifelines / associations 为统一图谱数据源。
- Lifelines 树结构（parent_id + order_index），支持实体挂载与卸载。
- 关联自动生成（规则初筛：同 lifeline、时间邻接、bigram 文本相似 → LLM 分类：co_occurrence / causal / tension / derived_from / none）。
- Atlas v1 前端（Three.js 3D 图，搜索、路径查找、实体/关联编辑、数据导出/导入）。

**模块系统：**
- 自动模块发现、Blueprint 注册、Prompt 模板加载、前端 nav item。
- 减脂模块为第一个垂直领域示例（体重/饮食/运动/围度/备注）。
- Learning Board v0.1。

## 当前最重要的风险

### _common.py 过重（P0 — DEBT_BOARD DB-001）

- `core/_common.py` 已从巨型共享核心降到约 312 行，主体职责已拆到 `core/config.py`、`core/fetch.py`、`core/database.py`、`core/search.py`、`core/artifacts.py`、`core/automation_core.py`、`core/items.py`、`core/text_extract.py`、`core/audit.py`、`core/vector_search.py`、`core/system_state.py`、`core/http_utils.py`。
- `core/routes/*.py` 和 `core/receiver.py` 已移除 `from core._common import *`，隐式共享命名空间风险已收窄。
- 下一步收口：把 route 从 `_common.py` 兼容层逐步迁到具体模块直接导入，并为 DB / Items / Search / HTTP 工具补最小单元测试。

### 文档漂移（P0 — DEBT_BOARD DB-002）

- `docs/AI_CONTEXT.md` 和 `docs/SHORT_TERM.md` 版本标签长期停留在 v0.1 alpha，与代码实际 v0.2+ 脱节。
- Cosmos/Atlas/Lifelines 在 README 和 AI_CONTEXT 中完全缺失，新接手者不知道关系图谱主线已存在。
- 自动生产状态快照基础脚本已补（DB-004），后续需要随部署启用 systemd timer 并观察线上报告质量。

### 前端双轨并存（P1 — DEBT_BOARD DB-005）

- 主前端 `frontend/src/`（Vue 3 + Vite）+ 旧前端 `core/static/app.js`（~4200 行 vanilla JS）同时维护。
- 旧前端不再加新功能，只修 bug；新功能一律进入 Vue 3 前端。
- 原十三工作台中的必要能力仍有一部分只存在于旧前端；后续只能按“此刻 / 资料库 / Atlas”的上下文需要迁移，不能原样复制为平级面板。

### AI 层仍需从受控建议走向有边界的主动性（P1 — DEBT_BOARD DB-006）

- AI 已从 parse/transcribe/describe 等工具调用扩展到任务拆解推理：日常处理使用 DeepSeek V4 Flash，责任较高的拆解建议使用 V4 Pro；候选不直接写入任务，用户确认后才进入行动系统。
- “此刻”中的周复盘会保存用户对步骤粒度的判断；AI 候选另以不含正文的结果元数据记录确认、修改和放弃，并只在样本足够时有限校准下一次建议。
- “此刻”已能对本周行动长期未启动、拆解步骤连续卡住和周承诺明显失速给出最多两条站内提示；提示列出证据、可本周忽略，不自动调用 AI 或创建行动。
- 不会主动检测"用户三天没记录"、不会在 inbox 积压时自动建议处理优先级。
- 关联生成（cosmos_associations）只在手动触发时运行。
- 生产状态快照基础设施已补；定时主动推送仍暂缓，先验证站内提示是否真的有帮助。

### 数据安全

- 涉及真实数据的操作要先备份。
- 真执行前优先 dry-run。
- 归档、恢复、自动处理后都要跑一致性检查。

### 自动化误操作

- `apply_inbox_actions.py` 默认 dry-run。
- `--apply` 只在确认候选条目后使用。
- 大批量处理前加 `--max-items`，单条优先 `--only-id`。

### 架构升级

- 解除硬约束不等于马上迁移。
- 每次升级都要先证明当前基线在哪里挡住了进展。
- 影响持久化和部署的改动必须有回滚路径。

## 短期优先级

基于 `docs/DEBT_BOARD.md` 当前债务结构。

### 第一优先级（P0 — 阻塞级）

- `_common.py` 收口：已降到约 312 行；旧 route / receiver 的 `import *` 已清理，继续推进具体模块直连导入和核心单元测试。
- 统一文档版本标签：AI_CONTEXT.md / HUMAN_CONTEXT.md / README.md → v0.2+，核心文档补 Cosmos / Atlas / Lifelines 描述。
- 保持 VPS 运行稳定，备份/恢复/一致性检查持续可用。

### 第二优先级（P1 — 重要）

- 承诺闭环、项目/生活线详情、周承诺、一层任务拆解、AI 可撤回候选、结果统计、周复盘和有界卡点提示已打通；继续用真实使用数据验证接受率、修改率、忽略率、步骤粒度和完成反馈。
- 部署并观察自动生产状态快照（每日 system-status 报告，含 /health /system /stats /metrics 摘要）。
- 旧前端只迁移主产品流程真正需要的能力，并编排进现有三个目的地；不再按对象类型重建旧工作台。
- AI 层向主动推理过渡：当前只做确定性卡点识别，提示本身不触发模型；先观察站内提示的打开、忽略和后续结果，再决定是否需要定时推送。
- 改善人类阅读层，让 review / inbox report / action history 更容易消费。

### 第三优先级（P2 — 改善级）

- `_common.py` 拆分后为核心模块补最小单元测试（DB / Items / Search 优先）。
- `.gitignore` 补全 desktop 构建产物（tauri target / gen / node_modules）。
- 旧前端代码不单独投入，随迁移自然消除。

## 当前建议顺序

Atlas 的视觉骨架已重做为“真实关系 + 自适应 3D 取景 + 关系驱动 2D 力场”，后续不要再通过前端假边、调试网格、统计卡或固定同心圆补画面。

1. 用真实任务积累 AI 候选的确认、修改、放弃和完成结果，至少形成一批可比较样本后再校准 V4 Pro。
2. 观察卡点提示是否被打开、是否被本周忽略，以及原行动随后是否变化；没有帮助时优先收紧阈值，不扩张成通知中心。
3. 用真实使用数据观察 Atlas 待确认关系的确认率、放弃率和人工修改幅度；关系治理已留在 2D 局部语境，不再另建工作台。
4. 在关系证据足够后再校准自动关联候选阈值和每个节点的边上限；当前不增加无证据推断，也不扩张成关系管理中心。
5. 收集足够反馈后再决定是否需要依赖关系或更深层级；当前不扩张成任务树工作台。

## 最近操作习惯

- 能一起做且不耽误推进的测试，集中放在一轮功能末尾执行。
- 小功能做完后继续推进。
- 需要用户消化或拍板的节点再停下来。

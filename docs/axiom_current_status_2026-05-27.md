# Axiom 当前现状描述文档

更新时间：2026-05-27  
资料依据：GitHub 仓库 `PengWeiTaing/Axiom` 的 `main` 分支文档与代码、项目上下文记录。  
说明：本文是“现状描述”，不是下一阶段规划；也不是实时 VPS 巡检报告。由于未直接登录 VPS 读取生产库，生产数据条数、备份实际时间、服务实时健康状态等只按仓库文档和代码记录描述，不作为当前秒级事实。

---

## 1. 一句话总览

Axiom 现在已经不是一个简单的 iOS 快捷指令收集器，也不只是一个笔记后端。它已经发展成一个运行在 VPS 上的个人外脑后端系统：负责接收文本、图片、文档、音频，进行文件落盘与 SQLite 索引，提供搜索、回顾、处理队列、记忆、任务、决策、治理、模块化扩展、自动化产物和移动 Web App。

更准确地说，Axiom 当前处在：

> **从“输入/存储/检索系统”向“个人知识—任务—记忆—决策—关系图谱系统”过渡的阶段。**

---

## 2. 阶段标签与真实状态

仓库文档里存在一个阶段命名不完全一致的问题：

- `docs/AI_CONTEXT.md` 和 `docs/SHORT_TERM.md` 仍把当前阶段写作 `v0.1 alpha`。
- `README.md` 后部已经出现“当前架构 v0.2, 2026-05-20”的结构描述。
- 最近代码里已经出现 `cosmos`、`lifelines`、`associations`、模块系统、减脂模块、AI 路由、治理接口等明显超出早期 v0.1 的内容。
- 最近 commit 还显示过 `lifeline_id` 输出前缀、任务单鉴权码、smoke test 清理残留数据等修复，说明当前仓库已继续演进到 2026-05-25 之后的状态。

因此，建议在本文中把当前真实状态称为：

> **Axiom v0.2+ 运行基线 / v0.1 alpha 标签残留。**

这不是版本号上的大问题，但对新成员或 AI Agent 接手会造成误判：如果只读 `SHORT_TERM.md`，会以为系统还停留在“稳定 receiver + 基础回顾”；如果读当前 `receiver.py` 和路由代码，会发现系统已经进入多对象、多路由、多模块、多自动化的阶段。

---

## 3. 当前定位

Axiom 当前定位可以拆成三层。

### 3.1 工程层定位

Axiom 是一个部署在 VPS 上的 Flask 后端工程，使用 SQLite 与文件系统作为核心存储。当前线上路径默认为：

```text
/opt/axiom
```

公网入口为：

```text
https://pengweitai.me
```

部署链路为：

```text
iPhone / iOS 快捷指令
  -> HTTPS / Nginx
  -> gunicorn
  -> Flask receiver
  -> 文件系统 + SQLite
  -> 自动化 / 回顾 / 处理产物
```

### 3.2 产品层定位

它现在不只是“记录入口”，而是具备以下产品雏形：

- 移动优先 Web App。
- PWA 主屏入口。
- 文本、文件、搜索、统计、详情、编辑、归档、恢复。
- 记忆面板。
- 任务面板。
- 决策面板。
- 自动化中心。
- 处理工作台。
- 模块面板，例如减脂模块。
- Cosmos / Atlas 式关系图谱数据源。

### 3.3 外脑层定位

从长期目标看，Axiom 应该逐步变成：

```text
输入系统 + 记忆系统 + 任务系统 + 决策系统 + 回顾系统 + 关系建模系统
```

也就是说，它应该不只回答“我记录了什么”，还要逐步回答：

- 我最近在关注什么？
- 哪些记录值得进入长期记忆？
- 哪些记录应该变成任务？
- 哪些选择需要复盘？
- 哪些内容之间存在因果、冲突、派生或同主题关系？
- 当前系统里哪些数据还没处理完？

---

## 4. 当前运行架构

### 4.1 服务形态

当前 Axiom 的服务形态是：

```text
Nginx
  -> gunicorn
  -> core.receiver:app
  -> core.routes.*
  -> core._common
  -> SQLite + 文件系统
```

早期 `receiver.py` 曾经是几乎所有逻辑集中的单文件入口，但现在已经被拆成“主入口 + 共享库 + 路由模块”的结构。

当前 `core/receiver.py` 的职责已经明显收敛：

- 导入 Flask app 和共享工具。
- 注册中间件。
- 注册各类路由。
- 初始化模块系统。
- 提供 `/system`、`/metrics`、`/api`、`/health/badge` 等管理端点。

### 4.2 路由分层

当前主入口注册的路由模块包括：

```text
core.routes.core
core.routes.items
core.routes.browse
core.routes.automation
core.routes.tasks
core.routes.memories
core.routes.decisions
core.routes.ai
core.routes.governance
core.routes.cosmos
core.routes.cosmos_associations
core.routes.lifelines
core.routes.cosmos_import
```

这说明 Axiom 的后端已经从“几个 API”变成了多领域 API 系统。

### 4.3 共享层

`core/_common.py` 是当前系统真正的共享核心。它负责：

- Flask app 与基础配置。
- 环境变量读取。
- 数据库连接。
- 建表与迁移。
- FTS5 检索。
- 认证、分页、过滤器。
- item CRUD 与文件读写。
- 文本处理、PDF/DOCX 抽取、音频转写文本处理。
- 统计、overview、item payload 构建。
- 自动化任务与 artifact 读取。
- 审计日志与文件清理。
- URL 抓取。

风险点：`_common.py` 仍然承担过多职责。它现在更像一个“系统内核文件”，短期可接受，但中后期继续膨胀会带来维护压力。

---

## 5. 当前数据与存储模型

### 5.1 存储策略

当前策略是：

```text
文件系统保存内容本体
SQLite 保存结构化索引与状态
```

运行期目录大致为：

```text
db/
  axiom.db

data/
  inbox/
  archive/
  reviews/

backup/
logs/
runtime/
```

这些运行期数据不提交到 GitHub。

### 5.2 item 类型

当前 item 支持四类：

```text
text
image
document
audio
```

每条 item 不只是 content，还可能包含：

- 原始文件名 `original_name`
- MIME 类型 `mime_type`
- 文件大小 `size_bytes`
- 文档抽取正文 `derived_text`
- 音频转写文本 `transcript_text`
- 处理覆盖标记 `processing_override`
- 文件路径 `file_path`
- 来源 `source`
- 创建时间 `created_at`

### 5.3 处理状态

当前 Axiom 对 item 有“可消费文本层”的判断：

- 文本：有 content 就算 ready。
- 文档：有 derived_text 才算 ready。
- 音频：有 transcript_text 才算 ready。
- 图片：有有效说明，且不是简单等于文件名，才算 ready。
- 也可以通过 `processing_override=ready` 手动标记完成。

这说明系统已经开始关心“输入后是否真的可读、可搜索、可回顾”，而不是只关心“文件是否上传成功”。

---

## 6. 当前核心能力

### 6.1 输入层

当前输入层支持：

- `/add`：写入文本。
- `/upload`：上传通用文件。
- 图片：支持常见图片格式。
- 文档：支持 PDF、Word，其中 PDF 和 DOCX 可自动抽取正文。
- 音频：支持常见音频格式，可直接提交转写文本，也可同时提交 transcript sidecar 文件。
- transcript sidecar：支持 `txt / md / srt / vtt`，其中 SRT/VTT 会清洗时间轴与标签。

这已经不是普通“笔记入口”，而是多模态 capture pipeline。

### 6.2 读取与检索层

当前读取层包括：

- `/recent`：分页读取最近记录，支持过滤。
- `/search`：全文搜索。
- `/item/<id>`：读取单条详情。
- `/file/<id>`：按 id 取回文件。
- `/stats`：统计。
- `/overview`：聚合总览。
- `/overview/text`：适合 iOS 快捷指令直接展示的纯文本总览。

搜索已升级到 SQLite FTS5：

- 使用 BM25 排序。
- 使用 CJK 字符级分词辅助中文检索。
- 覆盖 content、original_name、derived_text、transcript_text。

这一步很关键：Axiom 已经开始具备中文检索系统的基础，而不是简单 `LIKE` 查询。

### 6.3 文件生命周期

当前支持：

- 上传到 inbox。
- 归档到 archive。
- 从 archive 恢复到 inbox。
- 删除 item 时清理文件与数据库关联。
- 文件路径限制在 `AXIOM_ROOT` 下，避免任意文件读取。

### 6.4 处理队列

当前已有处理积压系统：

- `/processing/backlog`：聚合待处理条目。
- `/processing/next`：获取下一条待处理记录。
- `/processing/mark-ready`：批量标记已处理。
- `/processing/mark-pending`：批量恢复待处理。

前端上已经有处理工作台，可以从总览进入 pending 记录，并支持连续处理、保存并跳下一条、同类下一条等动作。

这一块很重要，因为它把 Axiom 从“只会堆积 inbox”推进到了“能管理 inbox 处理债务”。

---

## 7. Web App 与 PWA 状态

当前 Web App 入口是：

```text
https://pengweitai.me/app
```

前端资源包括：

```text
core/templates/app.html
core/static/app.css
core/static/app.js
core/static/manifest.webmanifest
core/static/sw.js
core/static/icons/axiom-mark.svg
```

当前 Web App 已覆盖：

- key 保存。
- 总览。
- 文本写入。
- 文件上传。
- 最近记录。
- 搜索。
- 记录详情。
- 记录编辑。
- 文件下载。
- 归档 / 恢复。
- 删除。
- 自动化中心。
- 自动化运行历史。
- artifact 浏览。
- 处理工作台。
- 记忆面板。
- 任务面板。
- 决策面板。
- 模块面板。

鉴权方式上，前端统一通过 `X-Axiom-Key` header 请求，不再把 key 到处拼在 query 里。

---

## 8. 自动化与产物系统

当前自动化系统已经分成两类：

### 8.1 手动触发任务

通过 `/automation/jobs` 和 `/automation/run` 提供前端手动触发能力，例如：

- 日回顾。
- 周回顾。
- inbox report。
- inbox action dry-run。
- 音频自动转写。
- 图片自动描述。

### 8.2 systemd timer 定时任务

部署侧已有多个 systemd service/timer：

- receiver 服务。
- 自动备份。
- daily / weekly review。
- inbox processing。
- inbox action dry-run。
- inbox action history。
- 音频自动转写。
- 图片自动描述。

其中 AI 依赖任务支持 `skip-when-unavailable`：如果没有配置 OpenAI key，会写入 `skipped` 运行记录，而不是把 systemd 跑成失败。

### 8.3 artifact 系统

运行产物保存在：

```text
data/reviews/
```

当前 artifact 分组包括：

- review
- inbox
- inbox-actions
- inbox-action-history
- audio-transcripts
- image-descriptions
- cosmos

并通过以下接口读取：

- `/artifacts`
- `/artifacts/summary`
- `/artifacts/file/<path>`

这说明 Axiom 已经有“自动化运行 → 留痕 → 可回看”的闭环。

---

## 9. 记忆、任务、决策系统

### 9.1 记忆系统

当前有 `memories` 表，支持五类记忆：

```text
fact
preference
goal
relationship
event
```

状态流转：

```text
candidate -> confirmed -> archived
```

这对应长期外脑里的“可确认事实库”。

### 9.2 任务系统

当前有 `tasks` 表，支持：

```text
todo -> done -> cancelled
```

并有优先级：

```text
high / medium / low
```

支持 due_date，并可关联 memory。

### 9.3 决策系统

当前有 `decisions` 表，用于记录：

- title
- context
- decision
- reasoning
- expected_outcome
- actual_outcome
- status

状态流转：

```text
pending -> reviewed
```

这说明 Axiom 已经开始进入“决策复盘系统”，而不是普通任务管理器。

---

## 10. 治理系统

当前治理能力包括：

- `DELETE /item/<id>`：删除条目，清理文件与外键关联。
- `POST /export`：导出 items、memories、tasks 等 JSON 与文件 ZIP。
- `GET /audit-log`：查询审计日志。
- `audit_log`：记录 items、memories、tasks 等 CUD 操作。
- `/system`：系统状态，包括 DB 大小、表计数、FTS 条目、备份年龄、孤立引用、健康分数等。
- `/metrics`：请求数、错误率、慢请求、延迟分位、热门 endpoint。
- `/api`：枚举当前可用 API。
- `/health/badge`：SVG 健康徽章。

这部分是产品化和长期运行必须具备的基础。它说明系统已经从“能跑”进入“需要可观测、可导出、可审计”的阶段。

---

## 11. 模块系统与减脂模块

当前已经有模块框架：

```text
modules/
  base.py
  registry.py
  prompt_loader.py
  jianzhi/
```

模块系统支持：

- 自动发现。
- 模块表创建。
- Blueprint 注册。
- 自动化任务注册。
- Prompt 模板加载。
- 前端 metadata / nav item。

当前示例模块是 `jianzhi` 减脂模块，覆盖：

- 体重。
- 饮食。
- 运动。
- 围度。
- 备注。
- `/m/jianzhi/*` API。
- 模块前端面板。

这证明 Axiom 已经具备“以 Axiom 为底座，插入垂直领域模块”的雏形。这非常符合你之前设想的“减脂模块有专门数据入口、索引、agent prompt、前端页面”。

---

## 12. Cosmos / Lifeline / Association 当前状态

这是当前仓库里较新的方向，文档同步还不完全充分，但代码已经存在。

### 12.1 Cosmos

`/cosmos` 会聚合：

- lifelines
- items
- tasks
- memories
- decisions
- associations

返回一个图谱数据源，包含：

```text
root
lifelines
entities
associations
schema_version
```

其中 entity 会使用类似：

```text
item:1
task:2
memory:3
decision:4
lifeline:xxx
```

的前缀 ID。

### 12.2 Lifelines

当前 lifeline 支持：

- 创建。
- 修改。
- 删除。
- parent_id 树结构。
- order_index 排序。
- 把 item/task/memory/decision 挂载到某条 lifeline。
- 删除 lifeline 时，会卸载挂载实体，并把子 lifeline 提升到根级。

这相当于开始构建“人生主线 / 项目主线 / 领域主线”的组织层。

### 12.3 Associations

`cosmos_associations.py` 显示当前已出现“关联自动生成”逻辑：

第一阶段：规则初筛。

- 同 lifeline 基分。
- 时间邻接加分。
- bigram 文本相似度加分。

第二阶段：LLM 分类。

关系类型包括：

```text
co_occurrence   同主题 / 同场景 / 同时间段
causal          因果 / 触发
tension         矛盾 / 竞争 / 冲突
derived_from    派生关系
none            无明显关联
```

这非常关键，因为它已经靠近你最新想聊的“因果联系、多因素影响、关系图谱”方向。Axiom 正在从“记录集合”向“实体关系网络”演进。

---

## 13. AI 能力现状

当前 AI 相关能力分成几类。

### 13.1 AI 解析

`/parse` 能把输入初步解析成：

- note
- task
- memory
- decision

如果没有配置 AI key，会走关键词 fallback。

### 13.2 AI 周报 / 建议 / 聊天

`core/routes/ai.py` 已经出现：

- `/alerts`
- `/report/weekly`
- `/parse`
- `/parse/feedback`
- 以及与 suggestions/chat/brief 相关的路由逻辑。

其中 AI context 会读取：

- 最近 7 天 items。
- 待办任务。
- confirmed memories。
- pending decisions。
- item 总数。

这说明 AI 层已经不是孤立调用，而是在读 Axiom 的结构化上下文。

### 13.3 AI 预处理

当前支持：

- 音频自动转写。
- 图片自动描述。
- 任务可用性预检。
- 缺 key 时跳过并留痕。

### 13.4 Cosmos 关联分类

关联生成中已经使用 LLM 对候选 entity pair 做关系类型判断。

---

## 14. 部署与验证

当前部署方式已经从“手动 VPS 改代码”升级为脚本化部署：

```powershell
python scripts\deploy_to_vps.py
```

该脚本负责：

- 从本地当前 commit 生成代码快照。
- 在 VPS 上备份旧代码。
- 上传并同步代码。
- 安装 systemd service/timer。
- 执行 `pip install -r requirements.txt`。
- 重启 receiver。
- 验证 `/health`。
- 运行一致性检查。

测试层包括：

```text
python -m compileall -q core scripts
node --check core/static/app.js
python scripts/smoke_test_receiver.py
python scripts/smoke_test_web_app.py
python scripts/smoke_test_inbox_processing.py
python scripts/check_consistency.py --root .
python scripts/generate_deepwiki_cache.py
```

这说明 Axiom 的工程流程已经有一定“可部署、可回滚、可验证”的纪律。

---

## 15. 当前强项

### 15.1 输入闭环已经比较完整

Axiom 已经能处理文本、图片、PDF、Word、音频、转写文件。对个人外脑来说，入口已经够广。

### 15.2 文件 + DB 双层存储方向正确

文件系统保存原始内容，SQLite 保存索引、状态、关系。这比一开始就上复杂数据库更稳。

### 15.3 检索已经进入可用阶段

FTS5 + CJK 分词 + BM25，已经比简单 LIKE 高很多。对于中文个人知识库，这是一个明显升级。

### 15.4 自动化默认安全

dry-run、skipped、audit log、action snapshot、history、consistency check，这些机制能降低自动化误操作风险。

### 15.5 Web App 已经形成手机主入口

这对你很重要。Axiom 如果不能从手机低摩擦使用，就会失去长期输入优势。

### 15.6 模块化方向已经开头

减脂模块证明系统可以承载垂直领域模块。以后学习、健身、项目、财务、课程、比赛都可以走类似结构。

### 15.7 Cosmos 方向很有潜力

lifeline + entity + association 已经让 Axiom 开始具备“关系建模”能力。这是从笔记工具走向个人认知系统的关键。

---

## 16. 当前主要风险

### 16.1 文档漂移

文档里同时存在 `v0.1 alpha`、`v0.2`、以及代码中更先进功能。新接手者会误判系统阶段。

建议把版本标签统一成：

```text
Axiom v0.2+ current baseline
```

或者明确写：

```text
历史阶段名：v0.1 alpha
当前架构状态：v0.2+
```

### 16.2 `_common.py` 过重

`_common.py` 已经像“巨型内核”。它短期方便，但长期会导致：

- 修改风险集中。
- 单文件认知负荷过高。
- 测试粒度不清晰。
- 领域边界模糊。

后续可以考虑拆为：

```text
core/config.py
core/db.py
core/items.py
core/search.py
core/artifacts.py
core/automation_core.py
core/text_extract.py
core/audit.py
```

但这属于后续架构升级，不应现在为了“好看”强拆。

### 16.3 Cosmos 文档不足

`cosmos`、`lifelines`、`associations` 已经出现在代码里，但 README / AI_CONTEXT / SHORT_TERM 对这部分描述不充分。

这会导致：

- AI Agent 不知道这条主线已经存在。
- 人类接手者不知道关系图谱数据源怎么用。
- 前端 Atlas 相关逻辑难以被纳入整体理解。

### 16.4 真实生产状态未在仓库内自动快照

仓库记录了很多“线上只读验证通过”，但没有看到一个独立的、自动生成的“当前生产状态快照文档”。

例如可考虑未来生成：

```text
data/reviews/system-status/YYYY-MM-DD.md
```

包含：

- /health
- /system
- /stats
- /metrics 摘要
- backup age
- consistency check
- automation skipped/failed
- pending backlog

### 16.5 AI 能力还处于工具层，不是核心推理层

当前 AI 已用于：

- parse。
- weekly report。
- audio transcription。
- image description。
- association classification。

但 Axiom 还没有真正形成稳定的“因果建模 / 多因素概率 / 个人决策模型”层。Cosmos 是这条路的入口，但还没完全产品化。

---

## 17. 当前系统的真实重心

如果只看代码数量和能力分布，Axiom 当前重心不是“AI 聊天”，而是：

```text
稳定数据底座
多类型输入
检索与处理状态
自动化留痕
移动端低摩擦使用
结构化对象：memory / task / decision
关系图谱：lifeline / association / cosmos
```

也就是说，它现在最有价值的方向不是再加一个 chatbot，而是把这些对象之间的关系打通：

```text
item -> memory -> task -> decision -> lifeline -> association -> review
```

这条链打通以后，Axiom 才会真正从“记录系统”升级成“外脑系统”。

---

## 18. 当前最应该被保留的架构原则

1. **先保证数据安全，再做智能化。**
2. **文件本体与数据库索引分离。**
3. **自动化默认 dry-run 或 skipped，不默认破坏性执行。**
4. **真实数据操作前先备份。**
5. **小改动只更新迭代记录，大改动同步 README / AI_CONTEXT / HUMAN_CONTEXT / DeepWiki。**
6. **架构升级必须说明痛点、证据、迁移、回滚和验证。**
7. **手机端低摩擦输入优先级很高。**
8. **Axiom 不只是知识库，而是长期个人系统。**

---

## 19. 当前一句话结论

Axiom 目前已经完成了从“最小输入后端”到“可运行个人外脑底座”的跃迁。它现在具备输入、存储、检索、处理、回顾、自动化、记忆、任务、决策、治理、模块化和关系图谱雏形。下一阶段真正的关键不再是继续堆接口，而是统一系统模型：明确 item、memory、task、decision、lifeline、association、module 之间的关系，让 Axiom 从“功能集合”收束成一个可解释、可维护、可扩展的个人认知操作系统。


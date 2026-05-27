# 007 — 文档同步：item → memory 升级流

> 一句话目标：把 B-001~B-006、B-008 的端点 / 字段 / 用法写进 README、AI_CONTEXT、ITERATION_LOG，让后续接手者不靠读代码就能知道这条链已存在。

## 1. 背景 / Why

`docs/axiom_current_status_2026-05-27.md` 明确指出"Cosmos 文档不足 / 文档漂移"是当前主要风险。item → memory 升级流是 v0.2+ 的第一段关系链打通，必须在文档里留下脚印。

**版本号统一（v0.1 alpha → v0.2+）不在本任务范围**——那是另一份独立任务单（暂记为 B-009），本任务**只新增 item→memory 相关章节**，不动既有版本标签。

> **依赖**：B-001 ~ B-006、B-008 全部完成（验收都通过）。**只有当全部 7 份任务都 done 才出本任务**，避免文档先于代码。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `README.md` | 在 API 端点列表 / 数据模型说明里加新端点和字段 | +15 |
| `docs/AI_CONTEXT.md` | 加一节"item ↔ memory 反向链" | +25 |
| `docs/ITERATION_LOG.md` | 顶部加一条新日期段落 | +20 |

**不要动** `docs/SHORT_TERM.md`、`docs/HUMAN_CONTEXT.md`、`docs/DEEPWIKI.md`、`docs/axiom_current_status_2026-05-27.md`。

## 3. 内容契约

### 3.1 README.md

DeepSeek 自己定位 API 端点列表（如果 README 有"API"或"接口"小节），在 item 端点附近加一行：

```
- `POST /item/<id>/promote-to-memory` — 把 item 升级为 candidate memory，绑定 source_item_id
```

在 memory 端点附近补一行：

```
- `GET /memories/<id>` 响应新增 `source_item: {id, type, type_label, snippet, created_at}`
- `GET /item/<id>` 响应新增 `derived_memories: [{id, category, content, status, ...}]`
```

如果 README 当前**没有** API 列表区段，**不要凭空创造一个新章节**，改在数据模型 / 核心能力描述里嵌进去。具体位置 DeepSeek 自己判断，但**改动不要超过 20 行**。

### 3.2 docs/AI_CONTEXT.md

在文档末尾或合适的对象关系章节，追加一节：

```markdown
## item ↔ memory 反向链

Axiom 把"原始记录 (item)"和"长期记忆 (memory)"按显式反向链组织。打通这条链是
从"输入/存储/检索系统"向"知识—任务—记忆—决策系统"过渡的第一段。

### 写入路径

- `POST /item/<id>/promote-to-memory`
  - body: `{category, content?, detail?}`
  - 自动写入 `memories.source_item_id`、`memories.source_text`（item 文本前 200 字）
  - 新 memory 默认 status = candidate
  - 审计动作：`memory_promote_from_item`
- `POST /memories/suggest` 让 LLM 输出 `item_id|category|content`，响应里每条建议带 `source_item_id`
- 前端采纳建议路径：当 `source_item_id != null` 走 `POST /item/<id>/promote-to-memory`，
  否则走 `POST /memories`——保证 LLM 已经定位的来源不会丢失

### 读取路径

- `GET /memories/<id>` 返回的 memory 含 `source_item: {id, type, type_label, snippet,
  created_at}`（无来源时为 `null`）
- `GET /item/<id>` 返回的 item 含 `derived_memories: [{...}]`，按 created_at desc，最多 10 条

### 删除语义

- 删除 item → `memories.source_item_id` 由 FK `ON DELETE SET NULL` 自动置空；
  memory 本身保留，前端不再展示来源链
- 删除 memory → 不影响 item

### 下一段

memory → task / decision 的反向链尚未打通（goal 类 memory 可关联 task，但 task 来源
不显式回指 memory）。这是后续任务，参见 `docs/backend-tasks/`。
```

> 这段是模板，DeepSeek 可以按目录现有标题层级调整 `##` 数量。

### 3.3 docs/ITERATION_LOG.md

在文件顶部（紧接 `这份文档只记录迭代，不讲完整架构。` 那段后），插入新日期段落。日期用任务完成当天（DeepSeek 提交时的本地日期，**精确到 YYYY-MM-DD**）：

```markdown
## YYYY-MM-DD

- 打通 item → memory 升级流（backend-tasks/001 ~ 008）
  - 新增 `POST /item/<id>/promote-to-memory`，写入 `memories.source_item_id`
  - `POST /memories/suggest` 让 LLM 输出 source_item_id，建议清单可带来源
  - `GET /memories/<id>` 响应新增 `source_item`，`GET /item/<id>` 响应新增 `derived_memories`
  - 旧前端 item viewer 加"升级为记忆"按钮，memory 卡片显示"派生自 item #N"
  - 前端采纳 AI 建议走分支路径：有来源走 promote，无来源走凭空新建
  - smoke test 覆盖派生写入、反向读取、FK SET NULL（用 throwaway item）
```

> **不要倒序**——`ITERATION_LOG.md` 的现有惯例是**早的在上、新的在下**（看现有内容判断）。如果发现现有惯例是新的在上，按现有惯例。先看一眼再决定。

### 3.4 不动的文件

- `docs/SHORT_TERM.md`：当前阶段标签需要从 v0.1 alpha 升到 v0.2+，但那是 B-009 的范围
- `docs/HUMAN_CONTEXT.md`：给人类读的高层文档，不细到端点级
- `docs/DEEPWIKI.md`：由 `scripts/generate_deepwiki_cache.py` 自动生成，不要手动改
- `docs/axiom_current_status_2026-05-27.md`：状态快照文档，写完就冻结，不增量更新

## 4. 验收清单

- [ ] README.md / AI_CONTEXT.md / ITERATION_LOG.md 各自的 git diff < 30 行
- [ ] 没有新建文件
- [ ] 没改 docs/ 下其他文件
- [ ] 文档里描述的端点 / 字段 / 行为与 B-001~B-005 实际代码**完全一致**（DeepSeek 自己交叉对比一次）
- [ ] 没有 emoji
- [ ] 中文标点正常，没有半角括号包中文的低级错误

## 5. 禁止事项

- 不要顺手"修一下"README 里其他段落的笔误
- 不要把版本号从 v0.1 alpha 改成 v0.2（那是 B-009）
- 不要写 emoji / 不要新增 mermaid 图
- 不要复述任务单内容（文档面向读者，不是任务执行者）
- 不要在 ITERATION_LOG 里挂任务单 ID 链接（保留纯文本格式，跟既有条目风格一致）

# 028 — Atlas 数据导出

> 目前在 Atlas 中创建 entity、lifeline、association 后，数据仅存在于后端数据库中。用户无法导出知识图谱数据进行备份、分享或外部分析。本轮加入数据导出功能：支持 JSON（完整数据）和 Markdown（可读摘要）两种格式。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `CosmosView.vue` | 导出按钮 + 导出逻辑 | +55 行 |
| `components/cosmos/ExportDialog.vue` | **新建**：导出格式选择对话框 | +70 行 |

**总计约 125 行**。纯前端，数据来自 `store.data`，无需后端改动。

## 2. 产品边界

- **做**：JSON 导出（完整 cosmos 数据）、Markdown 导出（按 lifeline 分组的可读摘要）、导出前预览确认对话框
- **不做**：CSV 导出、导出过滤（只导出某 lifeline）、导入/恢复功能、自动备份、导出到云存储、导出历史记录
- 导出触发：快捷键面板入口 + 可选 Ctrl+E 快捷键

## 3. 导出格式

### 3.1 JSON 格式

完整导出 `CosmosData`：

```json
{
  "exported_at": "2026-05-26T12:00:00Z",
  "schema_version": "1.0",
  "root": { "id": "root", "name": "Axiom" },
  "lifelines": [ ... ],
  "entities": [ ... ],
  "associations": [ ... ]
}
```

文件名：`axiom-export-2026-05-26.json`

### 3.2 Markdown 格式

按 lifeline 分组，每个 entity 下列出其关联：

```markdown
# Axiom Atlas 导出 — 2026-05-26

## 概览
- Lifeline: 5 条
- Entity: 42 个 (Task 20, Memory 12, Decision 8, Item 2)
- 关联: 35 条 (已确认 28, 待确认 5, 已拒绝 2)

## Lifeline: Rust 学习
- task:15 给 Cosmos 加粒子效果
  - 因果 → task:22 性能优化 (85%)
  - 衍生 → memory:10 Rust 内存管理 (62%)
- memory:10 Rust 内存管理
- ...

## Lifeline: 项目管理
- task:30 完成 Q2 计划
  - 共现 → decision:5 选择技术栈 (45%)
- ...
```

### 3.3 导出行为

- 点击导出 → 弹出 ExportDialog 选择格式
- 选择格式后 → 生成内容 → 触发浏览器下载
- 使用 `URL.createObjectURL` + `<a download>` 触发下载
- 不涉及后端 API

## 4. 实现

### 4.1 ExportDialog

```html
<div class="export-dialog-overlay" @click.self="emit('close')">
  <div class="export-dialog">
    <div class="export-title">导出 Atlas 数据</div>
    
    <div class="export-stats">
      <div class="stat-row"><span>Lifeline</span><span>{{ lifelineCount }}</span></div>
      <div class="stat-row"><span>Entity</span><span>{{ entityCount }}</span></div>
      <div class="stat-row"><span>关联</span><span>{{ assocCount }}</span></div>
    </div>
    
    <div class="export-options">
      <button class="export-opt" @click="doExport('json')">
        <span class="opt-title">JSON</span>
        <span class="opt-desc">完整数据，可用于备份或导入</span>
      </button>
      <button class="export-opt" @click="doExport('markdown')">
        <span class="opt-title">Markdown</span>
        <span class="opt-desc">可读摘要，按 Lifeline 分组</span>
      </button>
    </div>
    
    <button class="export-cancel" @click="emit('close')">取消</button>
  </div>
</div>
```

### 4.2 导出逻辑

```typescript
function doExport(format: 'json' | 'markdown') {
  if (!store.data) return
  
  const now = new Date().toISOString().slice(0, 10)
  let content: string
  let filename: string
  let mime: string
  
  if (format === 'json') {
    content = JSON.stringify({
      exported_at: new Date().toISOString(),
      schema_version: store.data.schema_version,
      root: store.data.root,
      lifelines: store.data.lifelines,
      entities: store.data.entities,
      associations: store.data.associations,
    }, null, 2)
    filename = `axiom-export-${now}.json`
    mime = 'application/json'
  } else {
    content = buildMarkdownExport(store.data)
    filename = `axiom-export-${now}.md`
    mime = 'text/markdown'
  }
  
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
  emit('close')
}
```

### 4.3 Markdown 生成

```typescript
function buildMarkdownExport(data: CosmosData): string {
  const lines: string[] = []
  const now = new Date().toISOString().slice(0, 10)
  
  // Header
  lines.push(`# Axiom Atlas 导出 — ${now}`)
  lines.push('')
  lines.push('## 概览')
  lines.push('')
  
  const entityKindCounts = { task: 0, memory: 0, decision: 0, item: 0 }
  for (const e of data.entities) {
    entityKindCounts[e.kind] = (entityKindCounts[e.kind] || 0) + 1
  }
  const assocStatusCounts = { accepted: 0, pending: 0, rejected: 0 }
  for (const a of data.associations) {
    assocStatusCounts[a.status] = (assocStatusCounts[a.status] || 0) + 1
  }
  
  lines.push(`- Lifeline: ${data.lifelines.length} 条`)
  lines.push(`- Entity: ${data.entities.length} 个 (Task ${entityKindCounts.task}, Memory ${entityKindCounts.memory}, Decision ${entityKindCounts.decision}, Item ${entityKindCounts.item})`)
  lines.push(`- 关联: ${data.associations.length} 条 (已确认 ${assocStatusCounts.accepted}, 待确认 ${assocStatusCounts.pending}, 已拒绝 ${assocStatusCounts.rejected})`)
  lines.push('')
  
  // Group entities by lifeline
  const lifelineMap = new Map(data.lifelines.map(l => [l.id, l]))
  const entityMap = new Map(data.entities.map(e => [e.id, e]))
  
  for (const ll of data.lifelines) {
    lines.push(`## Lifeline: ${ll.name}`)
    lines.push('')
    
    const llEntities = data.entities.filter(e => e.lifeline_id === ll.id)
    if (llEntities.length === 0) {
      lines.push('_无 entity_')
      lines.push('')
      continue
    }
    
    for (const ent of llEntities) {
      const kindLabel = kindLabelMap[ent.kind] || ent.kind
      lines.push(`- ${ent.id} ${ent.title}`)
      
      // Associations involving this entity
      const entAssocs = data.associations.filter(a => a.from === ent.id || a.to === ent.id)
      for (const a of entAssocs) {
        const isFrom = a.from === ent.id
        const otherId = isFrom ? a.to : a.from
        const otherEnt = entityMap.get(otherId)
        const otherTitle = otherEnt?.title || otherId
        const rel = relLabel(a.relation_type)
        const arrow = isFrom ? '→' : '←'
        const conf = Math.round(a.confidence * 100)
        lines.push(`  - ${rel} ${arrow} ${otherTitle} (${conf}%)`)
      }
      lines.push('')
    }
  }
  
  return lines.join('\n')
}
```

### 4.4 入口

在 CosmosView 快捷键面板或左上角工具区添加导出按钮。推荐放在 ShortcutPanel 中已列出的快捷键旁边，或者作为独立的小按钮：

```html
<button class="export-trigger" @click="showExport = true" title="导出数据 (Ctrl+E)">
  导出
</button>
```

快捷键：`Ctrl+E` 打开导出对话框。

### 4.5 样式

ExportDialog 居中 overlay，z-index 120，与 QuickCreateDialog 同级。宽度 360px，简洁卡片风格，两个格式选项用大按钮展示。

## 5. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — JSON 导出
# - 打开 Atlas → 按 Ctrl+E（或点击导出按钮）
# - ExportDialog 弹出，显示当前数据统计
# - 点击 "JSON" → 浏览器下载 axiom-export-YYYY-MM-DD.json
# - 用文本编辑器打开 JSON → 数据完整
# - lifelines、entities、associations 都在
# - exported_at 时间戳正确

# 3. 人肉验证 — Markdown 导出
# - 打开 ExportDialog
# - 点击 "Markdown" → 浏览器下载 axiom-export-YYYY-MM-DD.md
# - 用 Markdown 编辑器打开
# - 概览统计正确
# - 按 Lifeline 分组
# - Entity 下列出关联（类型、方向、信心度）

# 4. 人肉验证 — 边界
# - 无数据时（刚加载前）导出按钮不可用或提示先加载
# - 空 lifeline 显示 "_无 entity_"
# - Entity 无关联时不显示关联列表

# 5. 人肉验证 — 不破坏
# - 导出不影响当前 store 数据
# - 导出后 Atlas 3D 场景不变
# - 其他面板正常
# - 搜索、导航正常
```

## 6. 禁止事项

- 不修改后端、数据库
- 不引入新 npm 依赖
- 不在 tokens.css 新增颜色
- 不做导入/恢复（那是另一个 task）
- 不做 CSV 导出
- 不做导出过滤/筛选
- 不做自动备份

## 7. 提交风格

```
add: 028 — Atlas 数据导出（JSON + Markdown）

- ExportDialog: 格式选择对话框，JSON 完整数据 + Markdown 可读摘要
- CosmosView: Ctrl+E 快捷键 + 导出按钮入口
```

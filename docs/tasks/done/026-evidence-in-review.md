# 026 — Pending Review 证据展示

> 025 引入的 PendingReviewPanel 列出了待确认关联，但用户只能看到关联类型和信心度，看不到 AI 提取的证据。这意味着审查是"盲审"——用户不知道关联的依据是什么。本轮在每条 pending 关联中加入可展开的证据区域。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `PendingReviewPanel.vue` | 每条 pending 项加入可展开证据区域 | +60 行 |

**总计约 60 行**。纯前端，数据来自 `association.evidence`（已存在于 types.ts）。

## 2. 产品边界

- **做**：每条 pending 关联显示证据条数，点击展开/收起证据列表，每条证据显示类型（中文标签）、摘要（excerpt）、权重
- **不做**：证据编辑（编辑在 AssociationEditDialog 已支持）、证据添加/删除、批量操作、证据搜索
- evidence 为空时显示"无证据"

## 3. 交互设计

### 3.1 展开/收起

每条 pending 项底部（accept/reject 按钮上方）显示证据摘要行：

```
┌────────────────────────────────┐
│ 因果 62%                       │
│ T 给 Cosmos 加粒子效果          │
│   → M Rust 内存管理             │
│ ▸ 2 条证据                     │  ← 点击展开
│                       [✓] [✗]  │
└────────────────────────────────┘
```

展开后：

```
┌────────────────────────────────┐
│ 因果 62%                       │
│ T 给 Cosmos 加粒子效果          │
│   → M Rust 内存管理             │
│ ▾ 2 条证据                     │  ← 点击收起
│   ┌──────────────────────────┐ │
│   │ 语义 · 权重 85%          │ │
│   │ "粒子效果的实现需要深入理  │ │
│   │ 解 Rust 的内存模型，特别  │ │
│   │ 是所有权和生命周期管理…"  │ │
│   └──────────────────────────┘ │
│   ┌──────────────────────────┐ │
│   │ 关键词 · 权重 60%         │ │
│   │ "内存管理相关讨论出现在   │ │
│   │ 粒子系统和渲染管线的上下  │ │
│   │ 文中…"                   │ │
│   └──────────────────────────┘ │
│                       [✓] [✗]  │
└────────────────────────────────┘
```

### 3.2 证据类型中文标签

```typescript
function evidenceTypeLabel(t: string): string {
  const m: Record<string, string> = {
    semantic: '语义',
    keyword: '关键词',
    co_occurrence: '共现',
    temporal: '时序',
    causal: '因果',
    manual: '手动',
  }
  return m[t] || t
}
```

### 3.3 权重显示

权重用百分比 + 小进度条：

```html
<span class="ev-weight-bar" :style="{ width: (ev.weight * 100) + '%' }"></span>
<span class="ev-weight-text">{{ Math.round(ev.weight * 100) }}%</span>
```

进度条高度 2px，颜色 `var(--accent)`，背景 `var(--line-2)`。

### 3.4 excerpt 截断

excerpt 超过 100 字符时截断，hover 时 tooltip 显示全文（用 `title` 属性即可，无需自定义 tooltip）。

## 4. 实现

### 4.1 数据

`CosmosAssociation.evidence` 已定义：

```typescript
evidence?: { type: string; excerpt: string; weight: number }[]
```

`pendingList` computed 已通过 `...a` 展开 association，evidence 可直接访问。

### 4.2 展开状态

用 `Set<string>` 跟踪哪些关联的证据已展开：

```typescript
const expandedIds = ref<Set<string>>(new Set())

function toggleEvidence(id: string) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
  // 触发响应式更新
  expandedIds.value = new Set(expandedIds.value)
}
```

### 4.3 模板结构

在 `pending-actions` 之前插入：

```html
<div v-if="item.assoc.evidence && item.assoc.evidence.length > 0" class="evidence-toggle" @click="toggleEvidence(item.assoc.id)">
  <span class="ev-toggle-icon">{{ expandedIds.has(item.assoc.id) ? '▾' : '▸' }}</span>
  <span>{{ item.assoc.evidence.length }} 条证据</span>
</div>
<div v-if="(!item.assoc.evidence || item.assoc.evidence.length === 0)" class="no-evidence">无证据</div>
<div v-if="expandedIds.has(item.assoc.id) && item.assoc.evidence" class="evidence-list">
  <div v-for="(ev, i) in item.assoc.evidence" :key="i" class="evidence-item">
    <div class="ev-header">
      <span class="ev-type">{{ evidenceTypeLabel(ev.type) }}</span>
      <span class="ev-weight">{{ Math.round(ev.weight * 100) }}%</span>
    </div>
    <div class="ev-weight-track"><div class="ev-weight-fill" :style="{ width: (ev.weight * 100) + '%' }"></div></div>
    <div class="ev-excerpt" :title="ev.excerpt">{{ ev.excerpt.slice(0, 100) }}{{ ev.excerpt.length > 100 ? '…' : '' }}</div>
  </div>
</div>
```

### 4.4 样式要点

- 证据区域整体缩进，左边框 2px solid `var(--line-2)` 区分
- 证据项之间用分隔线或间距
- excerpt 字体略小（`var(--fs-1)`），颜色 `var(--text-3)`
- 展开/收起行可点击，hover 时颜色变为 `var(--accent)`
- 整体紧凑，不增加面板高度过多

### 4.5 代码量

约 +60 行（模板 +30，样式 +20，逻辑 +10）。

## 5. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 基本展示
# - 打开 PendingReviewPanel
# - 有 evidence 的关联显示 "▸ N 条证据"
# - 无 evidence 的关联显示 "无证据"
# - 点击 "▸ N 条证据" → 展开证据列表
# - 再次点击 → 收起

# 3. 人肉验证 — 证据内容
# - 每条证据显示：类型（中文）、权重百分比、权重进度条、摘要
# - 摘要超过 100 字截断，hover title 显示全文
# - 权重进度条比例正确

# 4. 人肉验证 — 不破坏
# - accept/reject 操作正常
# - 展开状态在 accept/reject 后随关联消失而清除
# - 关闭面板再打开，展开状态重置
# - 其他面板（PathPanel、ShortcutPanel）正常
# - NodeDetailCard 证据展示不受影响
```

## 6. 禁止事项

- 不修改后端、数据库
- 不在 tokens.css 新增颜色
- 不做证据编辑（编辑在 AssociationEditDialog）
- 不做证据添加/删除
- 不做动画（展开/收起用 v-if 即可）
- 面板不做分页

## 7. 提交风格

```
add: 026 — Pending Review 证据展示

- PendingReviewPanel: 每条 pending 关联可展开查看 evidence
- 证据类型中文标签 + 权重进度条 + excerpt 截断
```

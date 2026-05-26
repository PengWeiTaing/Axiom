# 031 — 最近访问实体（Recent Entities）

> 当前 Atlas 中浏览 entity 后，如果想再次访问之前的 entity，只能依赖焦点历史（023）的 Alt+← 逐步回退，或者重新搜索。焦点历史仅限当前会话，刷新后丢失。本轮加入"最近访问"面板：自动记录最近浏览的 entity（最多 10 条），持久化到 localStorage，跨会话保留，点击一键跳转。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `components/cosmos/RecentPanel.vue` | **新建**：最近访问面板 | +80 行 |
| `CosmosView.vue` | 记录访问 + 面板挂载 + 入口按钮 | +25 行 |

**总计约 105 行**。纯前端，localStorage 持久化。

## 2. 产品边界

- **做**：自动记录每次 `node_focus` 访问的 entity（去重，最新在前），最多 10 条，localStorage 持久化，面板展示列表（kind badge + 标题 + lifeline 名），点击跳转，清除全部按钮
- **不做**：手动 pin/star（那是另一个 task）、访问次数统计、"最常访问"排序、lifeline 访问记录、导出访问记录、跨设备同步
- 面板入口放在左下角或与 LifelinePanel 同级，显示最近访问图标 `🕐` 或文字入口

## 3. 数据模型

### 3.1 存储格式

```typescript
interface RecentEntry {
  entityId: string       // e.g. "task:42"
  title: string
  kind: string           // task | memory | decision | item
  lifelineId: string
  lifelineName: string
  visitedAt: number      // Date.now()
}
```

localStorage key: `axiom_recent_entities`，值为 `RecentEntry[]` JSON 数组。

### 3.2 记录逻辑

在 `store.transition` 或 CosmosView 的 node_focus 处理中记录：

```typescript
function recordRecentVisit(entityId: string) {
  const ent = store.data?.entities.find(e => e.id === entityId)
  if (!ent) return
  
  const ll = store.data?.lifelines.find(l => l.id === ent.lifeline_id)
  const entry: RecentEntry = {
    entityId,
    title: ent.title,
    kind: ent.kind,
    lifelineId: ent.lifeline_id,
    lifelineName: ll?.name || '',
    visitedAt: Date.now(),
  }
  
  // 读取现有列表
  const raw = localStorage.getItem('axiom_recent_entities') || '[]'
  const list: RecentEntry[] = JSON.parse(raw)
  
  // 去重（同 entityId 的旧条目删除）
  const filtered = list.filter(e => e.entityId !== entityId)
  
  // 插入到最前面
  filtered.unshift(entry)
  
  // 截断到 10 条
  const trimmed = filtered.slice(0, 10)
  
  localStorage.setItem('axiom_recent_entities', JSON.stringify(trimmed))
}
```

### 3.3 加载

面板初始化时从 localStorage 读取，按 `visitedAt` 降序排列（已经是降序）。

## 4. 实现

### 4.1 RecentPanel

```html
<template>
  <div class="recent-panel">
    <div class="recent-header">
      <span class="recent-title">最近访问</span>
      <button v-if="items.length > 0" class="recent-clear" @click="clearAll">清除</button>
      <button class="recent-close" @click="emit('close')">✕</button>
    </div>
    
    <div v-if="items.length === 0" class="recent-empty">
      暂无访问记录
    </div>
    
    <div class="recent-list">
      <div v-for="item in items" :key="item.entityId" class="recent-item" @click="emit('focus-entity', item.entityId)">
        <span class="recent-kind">{{ kindBadge(item.kind) }}</span>
        <span class="recent-entity-title">{{ item.title.slice(0, 28) }}</span>
        <span class="recent-lifeline">{{ item.lifelineName }}</span>
      </div>
    </div>
  </div>
</template>
```

### 4.2 交互

- 点击行 → `emit('focus-entity', entityId)` → 关闭面板
- "清除"按钮 → 清空 localStorage + 清空列表
- 面板位置：固定在左侧，LifelinePanel 下方或右侧 PendingReviewPanel 下方

### 4.3 入口

在 CosmosView 左上角导航按钮区添加：

```html
<button class="recent-trigger" @click="showRecent = !showRecent" title="最近访问">
  🕐
</button>
```

或文字按钮 "最近"。

### 4.4 样式

- 面板宽度 280px，位置在左下角或左侧
- 与 LifelinePanel、PendingReviewPanel 风格一致
- z-index 20（低于 PathPanel 22）
- 每行显示：kind badge + 标题（截断） + lifeline 名（灰色小字）

### 4.5 代码量

约 +105 行（RecentPanel 80, CosmosView 25）。

## 5. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 自动记录
# - 打开 Atlas
# - 点击 entity A → node_focus
# - 点击 entity B → node_focus
# - 点击 entity C → node_focus
# - 打开 RecentPanel → 显示 C, B, A（最新在前）
# - 点击 entity A 两次 → 只有一条记录（去重），排在最前

# 3. 人肉验证 — 持久化
# - 浏览几个 entity
# - 刷新页面（F5）
# - 打开 RecentPanel → 记录仍在
# - 关闭浏览器标签 → 重新打开 → 记录仍在

# 4. 人肉验证 — 跳转
# - 点击 RecentPanel 中的 entity → 关闭面板 → 3D 跳转到该 entity
# - NodeDetailCard 显示该 entity 详情

# 5. 人肉验证 — 清除
# - 点击"清除" → 列表清空
# - 刷新页面 → 仍然为空（localStorage 已清除）
# - 再浏览新 entity → 列表重新开始记录

# 6. 人肉验证 — 上限
# - 浏览 15 个不同 entity
# - RecentPanel 只显示最近 10 条

# 7. 人肉验证 — 不破坏
# - 其他面板正常
# - 焦点历史正常
# - 搜索正常
```

## 6. 禁止事项

- 不修改后端、数据库
- 不在 tokens.css 新增颜色
- 不做手动 pin/star
- 不做访问次数统计
- 不做排序切换
- 不引入新 npm 依赖

## 7. 提交风格

```
add: 031 — 最近访问实体面板

- RecentPanel: 自动记录 node_focus 访问，localStorage 持久化，最多 10 条
- CosmosView: 入口按钮 + recordRecentVisit 逻辑
```

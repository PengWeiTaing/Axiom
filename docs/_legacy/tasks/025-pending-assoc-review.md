# 025 — Pending 关联审查面板

> AI 自动生成的关联（`status: 'pending'`）需要人工确认。当前只能逐个在 NodeDetailCard 的关联列表中点 ✓/✗，没有全局视角。本轮加入 Pending 关联审查面板：列出全部待确认关联，支持快速 accept/reject，一键跳转到相关 entity。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `PendingReviewPanel.vue` | **新建**：待审查关联面板 | +110 行 |
| `CosmosView.vue` | 面板集成 + 入口按钮（带 badge） | +25 行 |

**总计约 135 行**。纯前端，数据来自 `store.data.associations`。

## 2. 产品边界

- **做**：全局 pending 关联列表、accept/reject 操作、点击跳转 entity、入口按钮显示 pending 计数 badge
- **不做**：批量全选 accept/reject、关联编辑（改类型/信心度）、已确认关联的历史审查、分页/虚拟滚动
- 如果 pending 关联数为 0，入口按钮不显示（不显示"0"badge）

## 3. 入口

### 3.1 位置

在 CosmosView 左上角，home 和 nav 按钮旁边：

```
[⌂] [←] [→]  [审查 (3)]   ← 新增，括号内为 pending 计数
```

或更紧凑：

```
[⌂] [←] [→]  [待确认 3]
```

按钮样式与 nav-btn 一致，但用 warm 色调提示"需要关注"：
- 边框：`var(--warm)`
- 颜色：`var(--warm)`
- hover：背景 `var(--warm)` 10% opacity

### 3.2 显示条件

仅当 `pendingCount > 0` 时显示按钮。`pendingCount` 从 store 计算：

```typescript
const pendingAssocCount = computed(() => {
  if (!store.data) return 0
  return store.data.associations.filter(a => a.status === 'pending').length
})
```

## 4. PendingReviewPanel

### 4.1 布局

右侧面板（类似 PathPanel 位置，但独立）：

```
┌─ 待确认关联 ────────────────────────┐
│  共 3 条                        [✕] │
│  ─────────────────────────────────  │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ 因果 62%                       │ │
│  │ task:7 给 Cosmos 加粒子效果     │ │  ← 来源 entity
│  │   → memory:15 Rust 内存管理     │ │  ← 目标 entity
│  │                         [✓] [✗] │ │
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │ 衍生 45%                       │ │
│  │ decision:10 选择 Three.js       │ │
│  │   → task:12 性能优化            │ │
│  │                         [✓] [✗] │ │
│  └────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### 4.2 每条关联显示

- 关系类型（中文标签）
- 信心度百分比
- **From entity**：kind badge + 标题（可点击 → node_focus）
- 箭头 `→`
- **To entity**：kind badge + 标题（可点击 → node_focus）
- Accept（✓）和 Reject（✗）按钮

点击 entity 标题 → 关闭面板 → 跳转 node_focus。

### 4.3 操作

```typescript
async function acceptAssoc(assocId: string) {
  await store.reviewAssociation(assocId, 'accepted')
}

async function rejectAssoc(assocId: string) {
  await store.reviewAssociation(assocId, 'rejected')
}
```

`store.reviewAssociation` 已存在（乐观更新本地数据 + API 同步）。操作后关联从 pending 列表中移除（status 变了，列表自动刷新）。

### 4.4 面板容器

```html
<div class="pending-panel">
  <div class="pending-header">
    <span>待确认关联</span>
    <span class="pending-count">共 {{ pendingList.length }} 条</span>
    <button @click="emit('close')">✕</button>
  </div>
  <div class="pending-list">
    <div v-for="item in pendingList" :key="item.assoc.id" class="pending-item">
      <!-- 关联信息 -->
    </div>
  </div>
</div>
```

位置：固定定位，右侧，z-index 略低于 PathPanel（PathPanel 在 22，这里用 21）

### 4.5 代码量

约 +110 行。

## 5. CosmosView 集成

- 绑定 `pendingAssocCount` computed
- 入口按钮 + badge
- `showPendingReview` ref
- PendingReviewPanel 的 `v-if`
- 点击 entity → `onPendingNavigate`（等价于 `onPanelFocusEntity`）

## 6. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 入口
# - 右下角（或左上角导航栏）出现 [待确认 N] 按钮
# - N 为 pending 关联总数
# - 无 pending 关联时按钮不显示

# 3. 人肉验证 — 面板
# - 点击按钮 → PendingReviewPanel 弹出
# - 列出所有 pending 关联
# - 每条显示：类型 + 信心度 + from entity + → + to entity
# - From/to entity 标题可点击

# 4. 人肉验证 — 操作
# - 点击 ✓ → 关联状态变为 accepted，从列表中消失
# - 点击 ✗ → 关联状态变为 rejected，从列表中消失
# - 最后一条 accept/reject 后 → 面板变空 → 显示"无待确认关联"

# 5. 人肉验证 — 跳转
# - 点击 from entity → 关闭面板 → 3D 跳转到该 entity → NodeDetailCard 显示
# - 点击 to entity → 同上

# 6. 人肉验证 — 联动
# - accept 一条关联后 → 3D 关联线实时更新（不再虚线）
# - 入口按钮数字实时减少
# - 关闭面板 → 再打开 → 数据一致

# 7. 人肉验证 — 不破坏
# - 原有 NodeDetailCard 关联列表正常
# - 路径查找正常
# - 其他面板（PathPanel、ShortcutPanel）正常
```

## 7. 禁止事项

- 不修改后端、数据库
- 不在 tokens.css 新增颜色（入口按钮用 `--warm`，已有）
- 不做批量全选
- 不做关联编辑（只做 accept/reject）
- 面板不做分页（假设 pending 数量不会超过 50）
- 不做动画

## 8. 提交风格

```
add: 025 — Pending 关联审查面板

- PendingReviewPanel: 全局 pending 关联列表，accept/reject + 跳转 entity
- CosmosView: 入口按钮显示 pending 计数，面板集成
```

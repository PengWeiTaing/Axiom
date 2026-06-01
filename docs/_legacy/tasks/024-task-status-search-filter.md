# 024 — Entity 状态可视化 + 搜索过滤增强

> 当前 3D 球面上所有 R3 entity 节点外观一致（仅按 kind 着色）。task 的 done/todo 状态、priority 高低在 3D 中不可见。同时 AtlasSearch（Ctrl+K）只做文本搜索，无法按 kind 或状态过滤。本轮补齐：task 节点在 3D 中反映状态，搜索支持按 kind 筛选。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `scene.ts` | R3 task 节点根据 status/priority 调整透明度/大小 | +35 行 |
| `AtlasSearch.vue` | 搜索框下方加 kind 过滤 chips + 本地数据过滤 | +60 行 |
| `CosmosView.vue` | 传递 task meta 给 scene | +15 行 |

**总计约 110 行**。纯前端，数据来源 `/cosmos` 已有的 `meta` 字段，无新 API。

## 2. 产品边界

- **做**：task 节点 done 状态在 3D 中可辨识、high priority+todo 节点有视觉提示、搜索可按 kind 过滤、搜索结果可本地过滤
- **不做**：memory/decision/item 的状态可视化（它们的 meta 信息不在 /cosmos 中）、task 的 due_date 可视化、全景状态看板
- 只使用 `/cosmos` 返回的数据，不额外请求 entity detail API

## 3. 3D Task 节点状态可视化

### 3.1 数据来源

`/cosmos` 返回的 entity 中，task 类型有 `meta.priority` 和 `meta.status`：

```json
{ "id": "task:42", "kind": "task", "title": "...", "meta": { "priority": "high", "status": "done" } }
```

### 3.2 视觉规则

在 `scene.ts` 创建 R3 node mesh 时，读取 `layoutNode` 上的 meta 信息：

| 状态 | 效果 |
|---|---|
| `status === 'done'` | opacity 降低到 0.4，scale 缩小到 0.75 |
| `status === 'todo' && priority === 'high'` | 节点边缘加 accent 色微光（opacity 略高，如 0.95） |
| 其他 | 默认（现有 kind 颜色 + 默认 opacity 0.85） |

实现方式：在 `scene.ts` 的 `createNodes`（或等效位置）中，为 task 节点读取 `node.meta`，调整 material 属性。

**重要**：meta 数据需要从 `LayoutNode` 传递。当前 `LayoutNode` 可能没有 `meta` 字段。需要在 `layout.ts` 的 `LayoutNode` 接口中增加可选字段：

```typescript
export interface LayoutNode {
  // ... existing fields
  meta?: Record<string, unknown>  // 新增
}
```

并在 `computeLayout` 中传递 entity 的 meta。

### 3.3 代码量

约 +35 行（layout.ts +5, scene.ts +30）。

## 4. 搜索 Kind 过滤

### 4.1 交互

AtlasSearch（Ctrl+K 弹出）搜索框下方增加 kind 过滤 chips：

```
┌──────────────────────────────┐
│ [搜索 entity/lifeline...   ] │
│                              │
│  [全部] [T] [M] [D] [I]      │  ← 新增：kind 过滤
│                              │
│  Rust 学习  (lifeline)       │
│  给 Cosmos 3D 引擎加粒子效果 │
│  ...                         │
└──────────────────────────────┘
```

- `[全部]` 默认选中，显示所有类型
- `[T]` `[M]` `[D]` `[I]` 分别过滤 task/memory/decision/item
- 选中 chip 高亮（accent 色边框或背景），未选中保持默认样式
- 单选（点击 T 后再次点击 T 回到全部，点击 M 切换到 M）

### 4.2 过滤逻辑

搜索结果来自两个渠道：
1. API 搜索（`searchAll`）——远程结果
2. 本地数据（`store.data`）——最近搜索回退

对于 API 结果，在客户端按 kind 过滤。对于本地搜索，同样按 kind 过滤。

```typescript
const kindFilter = ref<string | null>(null) // null = 全部

function toggleKindFilter(kind: string) {
  kindFilter.value = kindFilter.value === kind ? null : kind
}

const filteredResults = computed(() => {
  if (!kindFilter.value) return searchResults.value
  return searchResults.value.filter(r => r.kind === kindFilter.value)
})
```

### 4.3 代码量

约 +60 行（模板 + 逻辑 + 样式）。

## 5. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 3D Task 状态
# - 标记一个 task 为 done → reload
# - 3D 球面上该 task 节点比普通节点更小更透明
# - 将 done task 改回 todo → reload → 恢复正常外观
# - high priority + todo 的 task 节点 → 边缘微光（比普通节点亮）

# 3. 人肉验证 — 搜索过滤
# - Ctrl+K 打开搜索 → 搜索框下方出现 [全部] [T] [M] [D] [I]
# - 默认 [全部] 高亮
# - 点击 [T] → 只显示 task 类型的结果
# - 点击 [M] → 切换到只显示 memory
# - 再次点击 [M] → 回到 [全部]
# - 搜索后切换过滤 → 结果实时过滤

# 4. 人肉验证 — 不破坏
# - 3D node 原有交互正常（点击聚焦、右键菜单）
# - 非 task entity 外观不变
# - 搜索原有功能正常（文本搜索、最近搜索）
# - / 键搜索、? 快捷键面板正常
```

## 6. 禁止事项

- 不修改后端、数据库
- 不在 tokens.css 新增颜色
- 不做 memory/decision/item 的状态可视化（它们的 meta 信息不够）
- 不做 due_date / 日历相关
- kind 过滤不做多选（保持简单：单选或全部）

## 7. 提交风格

```
add: 024 — Task 状态可视化 + 搜索 kind 过滤

- scene: R3 task 节点根据 meta.status/priority 变化外观
- AtlasSearch: 搜索框 kind 过滤 chips（全部/T/M/D/I）
- layout: LayoutNode 增加 meta 字段传递
```

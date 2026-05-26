# 018 — Atlas 路径查找：实体间最短关联路径

> 013-017 让 Atlas 可编辑、可读、可导航。但面对超过几十个 entity 的图，用户自然会产生一个问题："这两个东西之间有什么关系？"。知识图谱的核心价值之一就是发现间接关联。本轮实现 entity 间最短路径查找——用户在 3D 场景中选两个 entity，系统自动找到它们通过关联线连接的最短路径并高亮展示。

## 1. 范围

前端改动（1 个新组件 + CosmosView + scene.ts + store）。不涉及后端（路径计算在前端完成）。

**核心目标**：
- 从聚焦 entity 出发，选择"查找路径到…"模式，点击目标 entity
- BFS 算法在 association 图中查找最短路径（按跳数，不考虑权重）
- 3D 场景中高亮路径上的节点 + 关联线
- 路径面板显示跳数和每步详情
- 支持多路径切换（如果存在多条等长路径）

## 2. 产品边界

- 不做加权最短路径（A* 或 Dijkstra — 关联的 confidence 可以作为后续优化）
- 不做路径保存/导出
- 不做"排除某类关联"的路径约束
- 路径查找范围限于 accepted + pending 关联（不包含 rejected）
- 不做跨 lifeline 的"自由路径"搜索（所有 entity 都在图中，自然可跨 lifeline）
- 路径面板是临时的，退出 path 模式后清理

## 3. 交互流程

### 3.1 触发

在 `node_focus` 或 `relation_reveal` 状态下：

1. 右键 entity A → 菜单新增"查找路径到…"
2. 进入**路径选择模式**：光标变为 crosshair（复用 014 的选择模式样式）
3. 底部提示："crosshair 点击目标 entity 查找最短路径 (Esc 取消)"
4. 用户点击 entity B（≠ A）
5. 执行 BFS 路径查找
6. 高亮路径 + 显示 PathPanel

### 3.2 状态机

在路径模式下（path 查找中/展示中），不改变现有状态机（仍在 node_focus/relation_reveal），只是在视觉上叠加路径高亮。

退出路径模式的方式：
- Esc → 清除路径，恢复正常
- 点击空白 → 清除路径
- 切换到其他 entity → 清除路径
- 切换到 global_overview/region_zoom → 自动清除

### 3.3 右键菜单改动

`ContextMenu.vue` R3 entity 菜单新增一项：

```
┌─────────────────────┐
│  编辑标题…          │
│  移动到 lifeline ▸  │
│  关联到…            │
│  查找路径到…        │  ← 新增
│  ───────────────    │
│  删除               │
└─────────────────────┘
```

### 3.4 路径展示

找到路径后，在 NodeDetailCard 下方（或旁边）显示 PathPanel：

```
┌──────────────────────────────┐
│  路径（2 跳）                │
│                              │
│  ◆ 给 Cosmos 3D 引擎加…     │  ← 起点（当前聚焦）
│  ┊ [因果] 85%               │  ← 关联类型 + 信心度
│  ◆ 选择 Three.js 做 3D …    │
│  ┊ [衍生] 62%               │
│  ◆ Rust 内存管理笔记        │  ← 终点
│                              │
│  [上一条]  [下一条]   [清除] │  ← 多路径切换
└──────────────────────────────┘
```

## 4. 算法

### 4.1 BFS 最短路径

```typescript
function findShortestPaths(
  entities: CosmosEntity[],
  associations: CosmosAssociation[],
  fromId: string,
  toId: string,
  maxDepth: number = 5
): Array<Array<{ entityId: string; assocId: string | null }>> {
  // 构建邻接表
  const adj = new Map<string, Array<{ to: string; assocId: string; type: string; confidence: number }>>()
  for (const a of associations) {
    if (a.status === 'rejected') continue
    if (!adj.has(a.from)) adj.set(a.from, [])
    if (!adj.has(a.to)) adj.set(a.to, [])
    adj.get(a.from)!.push({ to: a.to, assocId: a.id, type: a.relation_type, confidence: a.confidence })
    adj.get(a.to)!.push({ to: a.from, assocId: a.id, type: a.relation_type, confidence: a.confidence })
  }

  // BFS
  const visited = new Set<string>()
  const queue: Array<{ id: string; path: Array<{ entityId: string; assocId: string | null }> }> = [
    { id: fromId, path: [{ entityId: fromId, assocId: null }] }
  ]
  visited.add(fromId)

  const results: Array<Array<{ entityId: string; assocId: string | null }>> = []
  let foundDepth = -1

  while (queue.length > 0) {
    const { id, path } = queue.shift()!
    if (foundDepth > -1 && path.length > foundDepth) break
    if (id === toId) {
      results.push(path)
      foundDepth = path.length
      continue
    }
    if (path.length >= maxDepth) continue
    const neighbors = adj.get(id) || []
    for (const nb of neighbors) {
      if (!visited.has(nb.to) || (foundDepth > -1 && path.length < foundDepth)) {
        visited.add(nb.to)
        queue.push({
          id: nb.to,
          path: [...path, { entityId: nb.to, assocId: nb.assocId }]
        })
      }
    }
  }

  return results
}
```

### 4.2 性能

- 在用户点击后立即执行（BFS 在图规模 < 1000 节点时 < 1ms）
- 不需要 Web Worker
- maxDepth = 5（最多 5 层中间节点，即 6 跳）

## 5. 3D 视觉高亮

### 5.1 路径节点

路径上的节点（除起点/终点外，起点已在 focus 状态）：
- scale 微增至 1.3
- 颜色变为 accent-bright
- 起点保持现有 halo（017），终点额外加一个 pulse ring

### 5.2 路径关联线

路径上的关联线：
- 线宽加粗 2×
- 颜色变为 accent
- 透明度提升到 1.0

其他非路径关联线：透明度降至 0.15（dim out）

### 5.3 实现

```typescript
// scene.ts 新增
export function highlightPath(
  nodes: THREE.Mesh[],
  assocLines: Array<{ line: any; data: any; fromNode: LayoutNode; toNode: LayoutNode }>,
  pathEntityIds: Set<string>,
  pathAssocIds: Set<string>
) {
  // 节点高亮
  for (const m of nodes) {
    const id = m.userData.id as string
    if (m.userData.layer === 3 && pathEntityIds.has(id)) {
      m.scale.setScalar(1.3)
      ;(m.material as THREE.MeshBasicMaterial).color.set(cssVar('--accent-bright'))
    }
  }
  // 关联线高亮 + 暗淡
  for (const al of assocLines) {
    const mat = al.line.material
    if (pathAssocIds.has(al.data.id)) {
      mat.linewidth = (mat.linewidth || 1.5) * 2
      mat.color.set(cssVar('--accent'))
      mat.opacity = 1
    } else {
      mat.opacity = 0.15
    }
  }
}

export function clearPathHighlight(
  nodes: THREE.Mesh[],
  assocLines: Array<{ line: any; data: any; fromNode: LayoutNode; toNode: LayoutNode }>
) {
  resetNodeAlpha(nodes)
  // 恢复关联线到筛选状态（由 applyAssocFilter 处理）
}
```

## 6. PathPanel 组件

新建 `frontend/src/components/cosmos/PathPanel.vue`：

### 6.1 Props

```typescript
interface PathHop {
  entityId: string
  entityTitle: string
  assocId: string | null
  assocType: string | null
  assocConfidence: number | null
}

interface Props {
  paths: PathHop[][]        // 所有找到的等长路径
  currentPathIndex: number  // 当前显示的路径索引
  fromTitle: string         // 起点标题
  toTitle: string           // 终点标题
}
```

### 6.2 Emits

```typescript
defineEmits<{
  (e: 'prev-path'): void    // 上一条路径
  (e: 'next-path'): void    // 下一条路径
  (e: 'clear'): void        // 清除路径
  (e: 'focus-entity', entityId: string): void  // 点击路径中的 entity 跳转
}>()
```

### 6.3 样式

- 位置：NodeDetailCard 下方（top 偏移多一些）或固定在底部
- 宽度：320px（与 NodeDetailCard 一致）
- 最大高度：40vh
- 背景：--surface-1
- 每跳一行：entity 可点击跳转 + 关联线类型 badge

## 7. 多路径切换

BFS 可能找到多条等长路径。PathPanel 显示"共 N 条路径（当前 1/N）"，用户可切换。

此时 3D 高亮应只显示当前选中的路径。

## 8. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/components/cosmos/PathPanel.vue` | **新建**：路径面板 | +150 行 |
| `frontend/src/views/CosmosView.vue` | 路径模式 + BFS 集成 + 高亮/清除 | +120 行 |
| `frontend/src/components/cosmos/ContextMenu.vue` | R3 菜单新增"查找路径到…" | +5 行 |
| `frontend/src/cosmos/scene.ts` | highlightPath / clearPathHighlight | +40 行 |
| `frontend/src/stores/cosmos.ts` | pathMode 状态 + 路径数据 | +30 行 |

**总计约 345 行**。

## 9. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 路径查找
# - Atlas → node_focus（entity A）
# - 右键 entity A → "查找路径到…"
# - 光标变 crosshair，底部提示出现
# - 点击 entity B（与 A 有间接关联）
# - 3D 场景高亮路径节点 + 关联线
# - PathPanel 显示跳数和每步详情
# - 点击 entity A 自身或无关空白 → 取消路径模式

# 3. 人肉验证 — 路径切换
# - 找到多条等长路径 → PathPanel 显示"共 N 条"
# - 点击"下一条"→ 3D 高亮切换
# - 点击"上一条"→ 回到前一条

# 4. 人肉验证 — 清除
# - PathPanel 中点击"清除"→ 路径高亮消失
# - Esc → 路径清除，回到正常 node_focus 状态
# - 切换 entity → 路径清除

# 5. 人肉验证 — 无路径
# - 选两个没有关联路径的 entity（或超出 maxDepth 5）
# - 显示提示"未找到路径（深度 5 内无连接）"

# 6. 人肉验证 — 相邻 entity
# - entity A 和 B 直接关联
# - 路径长度 = 1 跳
# - PathPanel 显示正确

# 7. 不破坏
# - 右键菜单其他功能正常
# - 关联筛选（016）在路径模式下不冲突
# - 关联编辑（014）正常
# - 搜索正常
# - 状态切换正常
```

## 10. 禁止事项

- 不修改后端
- 不做加权路径（A* / Dijkstra）
- 不做路径可视化编辑
- 不做路径导出/分享
- 路径查找不改变 entity 的实际数据（只改视觉）
- 不在 context menu 中为 R1/R2 lifeline 添加路径查找（仅 R3 entity）

## 11. 提交风格

```
add: 018 — Atlas 路径查找：entity 间 BFS 最短路径 + 3D 高亮 + 多路径切换

- 右键 entity → "查找路径到…" → 点击目标 → BFS 查找最短关联路径
- 3D 场景高亮路径节点 + 关联线，非路径元素暗淡
- PathPanel 显示路径跳数 + 每步详情，支持多条等长路径切换
- ContextMenu R3 菜单新增"查找路径到…"项
```

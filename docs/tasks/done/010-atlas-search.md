# 010 — Atlas 搜索定位 + 节点 Hover 反馈

> 当前 Atlas 中无法搜索 entity。80 个节点散布在球面上，想找到"跑步"相关的 entity 只能靠肉眼扫描。此外，鼠标悬停在节点上没有任何反馈，用户不知道哪里可以点。本轮加两个功能：搜索定位 + 节点 hover 高亮。

## 1. 范围

前端改动。不动后端（搜索使用本地 cosmos 数据过滤，不调 API）。

**核心目标**：
- 搜索框输入关键词 → 实时过滤匹配的 entity 和 lifeline → 点击结果 → 相机飞行定位
- 鼠标悬停 3D 节点 → 节点放大 + 光标变 pointer → 点击更有信心

## 2. 产品边界

- 搜索仅限本地 `store.data` 中已加载的 entity/lifeline（不在 cosmos 数据中的 entity 无法在 3D 场景中定位）
- 不做模糊/语义搜索 — 用简单的 `title.includes(keyword)` 或 `name.includes(keyword)`
- hover 高亮不做发光/后期特效 — 只做 scale 和 emissive 颜色切换
- 不修改 SearchOverlay（Capture 模式的搜索，与此无关）
- 不添加 npm 依赖

## 3. 搜索定位

### 3.1 触发

- 键盘快捷键：`Ctrl+K` 或 `/`（参考 VS Code / Notion 的搜索习惯）
- HUD 中显示一个搜索按钮 "搜索 ⌘K"（与 Capture 模式风格一致）

### 3.2 搜索面板

在 Atlas 视图的 HUD 区域（Breadcrumb 下方、LifelinePanel 上方），出现一个搜索浮层：

```
┌─────────────────────────────┐
│ 🔍 跑步                     │  ← 输入框，自动 focus
├─────────────────────────────┤
│ T  每天跑步 30 分钟          │  ← entity kind badge + title
│    心肺 · 健康              │  ← R2 lifeline · R1 lifeline 路径
├─────────────────────────────┤
│ M  空腹有氧更利于减脂         │
│    心肺 · 健康              │
├─────────────────────────────┤
│ L  健康                     │  ← lifeline 结果用 "L" badge
│    根级 lifeline            │
└─────────────────────────────┘
```

- 输入时实时过滤（无需防抖，本地数据量小）
- 最多显示 8 条结果
- entity 结果显示其 lifeline 路径（R2 · R1）：从 `entity.lifeline_id` 向上追溯到 R1
- lifeline 结果显示层级标记（根级 / 子级）
- 按匹配优先级排序：标题完全匹配 > 标题开头匹配 > 中间匹配

### 3.3 搜索逻辑

在 CosmosView 或一个独立的 composable 中：

```typescript
function searchLocal(query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q || !store.data) return []

  const results: SearchResult[] = []

  // 搜 entity
  for (const e of store.data.entities) {
    if (e.title.toLowerCase().includes(q)) {
      // 构建 lifeline 路径
      const path = buildLifelinePath(e.lifeline_id)
      results.push({ id: e.id, kind: e.kind, title: e.title, path, layer: 3 })
    }
  }

  // 搜 lifeline
  for (const l of store.data.lifelines) {
    if (l.name.toLowerCase().includes(q)) {
      const layer = l.parent_id === 'ROOT' ? 1 : 2
      // 构建父路径
      const parent = store.data.lifelines.find(p => p.id === l.parent_id)
      const path = parent ? `${parent.name}` : '根级 lifeline'
      results.push({ id: l.id, kind: 'lifeline', title: l.name, path, layer })
    }
  }

  // 排序：完全匹配优先，标题短的优先
  results.sort((a, b) => {
    const aExact = a.title.toLowerCase() === q ? 0 : a.title.toLowerCase().startsWith(q) ? 1 : 2
    const bExact = b.title.toLowerCase() === q ? 0 : b.title.toLowerCase().startsWith(q) ? 1 : 2
    return aExact - bExact || a.title.length - b.title.length
  })

  return results.slice(0, 8)
}

function buildLifelinePath(lifelineId: string): string {
  if (!store.data) return ''
  const parts: string[] = []
  let cur = store.data.lifelines.find(l => l.id === lifelineId)
  while (cur) {
    parts.unshift(cur.name)
    cur = cur.parent_id ? store.data.lifelines.find(l => l.id === cur.parent_id) : undefined
  }
  // parts: [R1, R2, ...]
  // 显示为 "R2 · R1"
  if (parts.length >= 2) return `${parts[parts.length - 1]} · ${parts[0]}`
  return parts.join(' · ')
}
```

### 3.4 点击结果 → 相机飞行

```typescript
function flyToResult(result: SearchResult) {
  if (!sceneObjs) return

  const node = sceneObjs.layoutNodes.find(n => n.id === result.id)
  if (!node) return

  if (result.kind === 'lifeline') {
    // R1/R2 lifeline → region_zoom
    if (result.layer === 1) {
      store.transition({ kind: 'region_zoom', lifeline_id: result.id })
    } else {
      // R2 lifeline → 向上找 R1，进入 region_zoom
      const r1 = findR1Ancestor(result.id)
      if (r1) store.transition({ kind: 'region_zoom', lifeline_id: r1.id })
    }
  } else {
    // entity → node_focus
    store.transition({ kind: 'node_focus', entity_kind: result.kind as any, entity_id: result.id })
  }
}
```

注意：`onStateChange` 中已处理 camera tween，所以这里只需触发状态转换，相机会自动飞到目标。

### 3.5 搜索面板关闭

- 按 `Esc` → 关闭搜索面板（如果搜索面板开着，第一次 Esc 关面板；如果面板已关，走现有的 Esc 回退逻辑）
- 点击结果 → 关闭搜索面板 + 执行定位
- 点击搜索面板以外的区域 → 关闭

## 4. 节点 Hover 反馈

### 4.1 mousemove handler 增强

在现有 mousemove handler 中增加节点 raycaster 检测：

```typescript
canvasRef.value.addEventListener('mousemove', (e: MouseEvent) => {
  if (!sceneObjs) return

  mouse.x = (e.offsetX / canvasRef.value!.clientWidth) * 2 - 1
  mouse.y = -(e.offsetY / canvasRef.value!.clientHeight) * 2 + 1
  raycaster.setFromCamera(mouse, sceneObjs.camera)

  // 0. 节点 hover 检测（所有状态下）
  const nodeHits = raycaster.intersectObjects(sceneObjs.pickables)
  if (nodeHits.length > 0) {
    const hoveredMesh = nodeHits[0].object as THREE.Mesh
    if (hoveredMesh !== hoveredNode) {
      resetHover()           // 还原上一个 hover
      hoveredNode = hoveredMesh
      applyHover(hoveredMesh) // 放大 + 变色
    }
    canvasRef.value!.style.cursor = 'pointer'
  } else {
    resetHover()
    canvasRef.value!.style.cursor = ''
  }

  // 1. 关联线 hover（relation_reveal 下 — 现有逻辑，不变）
  if (store.state.kind !== 'relation_reveal') return
  const lineHits = raycaster.intersectObjects(...)
  // ... 现有 tooltip 逻辑不变
})
```

### 4.2 hover 效果

```typescript
let hoveredNode: THREE.Mesh | null = null
const HOVER_SCALE = 1.5

function applyHover(mesh: THREE.Mesh) {
  mesh.scale.setScalar(HOVER_SCALE)
  // 颜色变亮：从 --text-3 → --accent 或从 --text-2 → --text-1
  const mat = mesh.material as THREE.MeshBasicMaterial
  mat._origColor = mat._origColor ?? mat.color.getHex()  // 保存原色
  mat.color.set(cssVar('--accent'))
  mat.needsUpdate = true
}

function resetHover() {
  if (!hoveredNode) return
  hoveredNode.scale.setScalar(1)
  const mat = hoveredNode.material as THREE.MeshBasicMaterial
  if (mat._origColor !== undefined) {
    mat.color.setHex(mat._origColor)
    delete mat._origColor
    mat.needsUpdate = true
  }
  hoveredNode = null
}
```

关键约束：
- hover 高亮颜色统一用 `--accent`（不区分 layer）
- scale 1.5x 是临时放大，松手回到 1.0x
- 保存原色到 `mat._origColor`，还原时恢复
- `_origColor` 这个临时字段只在 hover 期间存在，不影响时序

### 4.3 hover 与 state 的关系

- **global_overview / region_zoom**：hover 所有可见节点（ghost 节点也响应 hover）
- **node_focus / relation_reveal**：hover 所有节点（包括 ghost 的，方便发现导航目标）
- hover 不影响当前的 state 或选中状态
- 如果 hover 的节点 scale 被 `updateNodePositions` 或 `targetPosition` lerp 影响，hover 应该覆盖 scale（即 scale 在 hover 期间固定为 HOVER_SCALE）

### 4.4 性能注意事项

- 每个 mousemove 事件都做 raycaster 检测 — 当前节点数 ~85，raycaster 针对所有 pickables 检测，性能足够
- 不需要额外优化（如每隔 N 帧检测）
- hover 状态变更才更新 Three.js material（不是每帧都写）

## 5. 搜索面板的 UI 组件

新建 `frontend/src/components/cosmos/AtlasSearch.vue`：

- position: absolute，在 HUD 区域
- 输入框 autofocus，背景 `var(--surface-1)`，圆角 `var(--r-2)`
- 结果列表，每行显示 kind badge + title + path
- 键盘导航：↑↓ 选择，Enter 确认，Esc 关闭
- 高亮行用 `var(--surface-2)` 背景

样式参考现有 `SearchOverlay.vue` 和 `LifelinePanel.vue`。

## 6. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/components/cosmos/AtlasSearch.vue` | **新建**：搜索面板组件 | +180 行 |
| `frontend/src/views/CosmosView.vue` | 搜索面板集成 + mousemove 增加节点 hover + 键盘快捷键 | +60 行 |
| `frontend/src/cosmos/scene.ts` | 导出 `cssVar` 供 hover 使用（已在 scene.ts 定义但未 export） | +1 行 |

## 7. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 搜索
# - 在 Atlas 中按 Ctrl+K 或 / → 搜索面板弹出
# - 输入 "跑步" → 实时显示匹配的 entity（每天跑步 30 分钟）和 lifeline
# - 每条结果显示 kind badge (T/M/D/I/L) + title + lifeline 路径
# - ↑↓ 键切换选中行
# - Enter 或点击 → 搜索面板关闭 + 3D 场景飞向目标
# - 选 entity（R3）→ 进入 node_focus
# - 选 R1 lifeline → 进入 region_zoom
# - 选 R2 lifeline → 进入其父 R1 的 region_zoom
# - Esc 关搜索面板（如果面板开着）
# - Esc 再按（面板已关）→ 走现有回退逻辑

# 3. 人肉验证 — hover
# - 在 global_overview 中鼠标移过 R1/R2/R3 节点
# - 节点放大 1.5x，颜色变为 --accent
# - 鼠标移开 → 节点还原
# - cursor 在节点上变为 pointer，在空白区域为 default
# - 在 region_zoom 中 hover ghost 节点也有反馈
# - hover 不影响现有点击逻辑和 tooltip

# 4. 人肉验证 — 搜索为空
# - 输入不存在的关键词 → 显示 "无匹配结果"
# - 删掉关键词 → 结果列表清空（或显示 placeholder "输入关键词搜索…"）

# 5. 不破坏现有功能
# - mousemove tooltip（relation_reveal 下）仍然正常
# - 点击节点切换状态正常
# - 点击空白回退正常
```

## 8. 禁止事项

- 不做模糊/语义搜索（不调 searchAll API）
- 不做搜索历史/热门搜索
- hover 不做发光/outline/粒子/脉冲特效
- 不修改 Capture 模式的 SearchOverlay
- 不改变 node 的 targetPosition / homePosition（hover 只改 scale 和 color）
- 搜索面板不在 Capture / 近况 模式下显示

## 9. 提交风格

```
add: 010 — Atlas 搜索定位 + 节点 Hover 反馈

- 新增 AtlasSearch 组件：Ctrl+K 唤起，本地实时过滤 entity/lifeline
- 搜索结果显示 kind badge + title + lifeline 路径，↑↓ 键盘导航
- 点击结果 → 相机飞向目标（entity→node_focus，lifeline→region_zoom）
- mousemove 增加节点 raycaster 检测：hover 放大 1.5x + accent 高亮
- 节点 hover 在所有状态下生效，不破坏现有 click/logic/tooltip
```

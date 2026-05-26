# 007a — Atlas 可读性：fat lines + CSS2D 标签

> 目标：让 Atlas 3D 场景不再像"毛线球"。父子线和关联线改用 Three.js Line2（可变宽度），节点添加 CSS2DRenderer 文字标签，带 LOD 显隐策略。

## 1. 范围

只改前端 `frontend/src/cosmos/` 和 `CosmosView.vue`。后端不改。不做动态重排布（那是 007b），不做 TubeGeometry，不引入后处理（post-processing）。

**核心改动**：
- 所有线从 `THREE.Line` (LineBasicMaterial/LineDashedMaterial) 升级为 `Line2` + `LineMaterial`
- 新增 `frontend/src/cosmos/labels.ts`：CSS2D 标签创建 + LOD 管理
- `CosmosView.vue`：集成 CSS2DRenderer、动画循环中更新 LOD、处理 resize

## 2. 产品边界

- **线宽**：父子线 1.5px，关联线 2px。不做按 confidence 微调（v0.1 简化）。
- **标签**：CSS2DRenderer 方案，不用 Canvas Sprite、不用 CSS3DRenderer。
- **LOD**：严格按第 5 节的规则控制标签显隐。
- **懒加载**：Line2 / CSS2DRenderer 等 Three.js 扩展在 CosmosView 内动态 `import()`，不阻塞 Capture 启动。
- **不破坏现有交互**：raycaster 点击逻辑保持不变（Line2 对象也是 Object3D，`intersectObjects` 可用）。
- 不在本任务加"聚焦路径线"（那是 007b 的 2.5px 线）。

## 3. 数据流

```
CosmosView 加载
  → dynamic import Line2, LineMaterial, LineGeometry, CSS2DRenderer
  → initScene() 用 Line2 创建父子连线 + 关联线
  → createLabels() 为 R1/R2/R3 节点创建 CSS2DObject
  → animate() 每帧调用 updateLabelLOD() 根据 state + 相机距离控制显隐
  → CSS2DRenderer.render() 叠在 WebGL canvas 之上
```

## 4. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/cosmos/scene.ts` | 父子线 + 关联线改用 Line2；关联线创建函数签名调整 | +60 -30 行 |
| `frontend/src/cosmos/labels.ts` | **新建**：createLabels + updateLabelLOD | +120 行 |
| `frontend/src/views/CosmosView.vue` | 集成 CSS2DRenderer、resize、LOD tick | +50 行 |
| `frontend/src/cosmos/types.ts` | 可能加 LabelGroup 类型 | +8 行 |

## 5. LOD 规则

下表控制每个状态下哪些标签可见：

| 状态 | R1 lifeline | R2 lifeline | R3 entity | 上限 |
|---|---|---|---|---|
| `global_overview` | 全部显示 | 距相机 < 3.5 时显示 | 不显示 | — |
| `region_zoom` | 全部显示 | 全部显示 | ≤12 个（取距相机最近的） | — |
| `node_focus` | 焦点所在 lifeline 链 | 焦点所在 lifeline 链 | 焦点 1 + 同 lifeline ≤8 + 强关联 ≤6 | 24 |
| `relation_reveal` | 同上 | 同上 | 同上 | 24 |

"强关联"判定：关联表中 `confidence >= 0.7` 且 `status !== 'rejected'` 的关联对方。

标签文本规则：
- R1/R2 lifeline：直接显示 `name`，超过 12 字符截断加 `…`
- R3 entity：显示 `title`，超过 20 字符截断加 `…`

CSS2D DOM 元素样式：
- R1：`font-size: 11px; color: var(--accent); font-weight: 600`
- R2：`font-size: 10px; color: var(--text-2); font-weight: 500`
- R3：`font-size: 9px; color: var(--text-3)`

`CSS2DRenderer.domElement` 设置 `pointer-events: none`，不拦截 canvas 点击。

## 6. 实现细节

### 6.1 scene.ts — 父子连线改用 Line2

当前（第 77-95 行）用 `THREE.Line` + `LineBasicMaterial` 创建 SLERP 弧线。替换为：

```typescript
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'

// 替换原有的 line 创建循环：
const lineGeom = new LineGeometry()
lineGeom.setPositions(flatPositions) // [x0,y0,z0, x1,y1,z1, ...] 扁平数组

const lineMat = new LineMaterial({
  color: new THREE.Color(cssVar('--line-2')),
  linewidth: 1.5,            // px
  worldUnits: false,
  resolution: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
  transparent: true,
  opacity: 0.65,
  depthTest: true,
})

const line = new Line2(lineGeom, lineMat)
line.computeLineDistances()  // 虚线需要，实线可选
```

注意 `LineGeometry.setPositions()` 接受扁平 `number[]`，不是 `Vector3[]`。SLERP 8 段产生 9 个点 → 27 个 float。

### 6.2 scene.ts — 关联线改用 Line2

`createAssociationLines()` 当前（第 124-160 行）混合用 `LineDashedMaterial` 和 `LineBasicMaterial`。替换为：

```typescript
// 实线（accepted）
const mat = new LineMaterial({
  color: new THREE.Color(cssVar(colorMap[assoc.relation_type] || '--text-3')),
  linewidth: 2,
  worldUnits: false,
  resolution, // 从外部传入
  transparent: true,
  opacity: alpha,
  depthTest: false,
})

// 虚线（pending）
const mat = new LineMaterial({
  color: new THREE.Color(cssVar(colorMap[assoc.relation_type] || '--text-3')),
  linewidth: 2,
  worldUnits: false,
  resolution,
  transparent: true,
  opacity: alpha * 0.8,
  depthTest: false,
  dashed: true,
  dashSize: 0.06,
  gapSize: 0.04,
})
```

两个点的线 `LineGeometry.setPositions([from.x, from.y, from.z, to.x, to.y, to.z])`。

`resolution` 需要在 `initScene` 时计算，并随 resize 更新。建议 `initScene` 返回一个 `setResolution(w, h)` 函数。

### 6.3 scene.ts — resolution 管理

所有 `LineMaterial` 实例的 `resolution` 需要在窗口 resize 时更新。在 `initScene` 中维护一个 `LineMaterial[]` 数组：

```typescript
const lineMaterials: LineMaterial[] = []

// 每创建一个 LineMaterial 就 push
lineMaterials.push(lineMat)

// 返回一个 setResolution 函数
function setResolution(w: number, h: number) {
  lineMaterials.forEach(m => {
    m.resolution.set(w, h)
  })
}

return { ..., setResolution }
```

### 6.4 labels.ts — 新建文件

```typescript
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import type { LayoutNode } from './layout'
import type { CosmosState, CosmosAssociation } from './types'
import * as THREE from 'three'

export interface LabelEntry {
  object: CSS2DObject
  nodeId: string
  layer: number
  parentId?: string   // LayoutNode.parentId。R3 节点的 parentId = lifeline_id，用于判断兄弟关系
}

export interface LabelGroup {
  entries: LabelEntry[]
  /** 为所有 LayoutNode 创建 CSS2DObject，添加到 scene */
  create(scene: THREE.Scene, layoutNodes: LayoutNode[]): void
  /** 每帧调用：根据 state + camera 更新可见性 */
  update(state: CosmosState, camera: THREE.Camera, associations?: CosmosAssociation[]): void
  dispose(): void
}

export function createLabelGroup(): LabelGroup {
  const entries: LabelEntry[] = []

  function create(scene: THREE.Scene, layoutNodes: LayoutNode[]) {
    for (const n of layoutNodes) {
      const div = document.createElement('div')
      div.className = 'cosmos-label'
      // R1/R2 lifeline 截断 12 字符，R3 entity 截断 20 字符
      const maxLen = n.layer <= 2 ? 12 : 20
      const text = n.name.length > maxLen ? n.name.slice(0, maxLen - 1) + '…' : n.name
      div.textContent = text

      // 按 layer 设置样式
      if (n.layer === 1) {
        div.style.cssText = 'font-size:11px;color:var(--accent);font-weight:600;white-space:nowrap;text-shadow:0 0 6px rgba(0,0,0,0.8)'
      } else if (n.layer === 2) {
        div.style.cssText = 'font-size:10px;color:var(--text-2);font-weight:500;white-space:nowrap;text-shadow:0 0 6px rgba(0,0,0,0.8)'
      } else {
        // R3 初始隐藏
        div.style.cssText = 'font-size:9px;color:var(--text-3);white-space:nowrap;text-shadow:0 0 4px rgba(0,0,0,0.8)'
        div.style.display = 'none'
      }

      const obj = new CSS2DObject(div)
      obj.position.copy(n.position)
      obj.userData = { nodeId: n.id, layer: n.layer, parentId: n.parentId }
      scene.add(obj)
      entries.push({ object: obj, nodeId: n.id, layer: n.layer, parentId: n.parentId })
    }
  }

  function update(
    state: CosmosState,
    camera: THREE.Camera,
    associations?: CosmosAssociation[]
  ) {
    // 收集焦点 ID
    const focusId = state.kind === 'node_focus' || state.kind === 'relation_reveal'
      ? (state as any).entity_id
      : null

    // 强关联节点 ID 集合
    const strongAssocIds = new Set<string>()
    if (focusId && associations) {
      for (const a of associations) {
        if (a.confidence >= 0.7 && a.status !== 'rejected') {
          if (a.from === focusId) strongAssocIds.add(a.to)
          if (a.to === focusId) strongAssocIds.add(a.from)
        }
      }
    }

    // 焦点所在 lifeline 的兄弟节点集合（用于 node_focus 时的计数）
    const siblingIds = new Set<string>()
    if (focusId) {
      const focusEntry = entries.find(e => e.nodeId === focusId)
      if (focusEntry && focusEntry.parentId) {
        // R3 节点的 parentId 就是 lifeline_id，同 lifeline 的都是兄弟
        for (const e of entries) {
          if (e.layer === 3 && e.parentId === focusEntry.parentId && e.nodeId !== focusId) {
            siblingIds.add(e.nodeId)
          }
        }
      }
    }

    // 按状态控制显隐
    const MAX_TOTAL = 24

    // R3 可显示上限
    let maxR3 = 0
    if (state.kind === 'global_overview') {
      maxR3 = 0
    } else if (state.kind === 'region_zoom') {
      maxR3 = 12
    } else if (state.kind === 'node_focus' || state.kind === 'relation_reveal') {
      maxR3 = 15 // 焦点 + 兄弟 8 + 强关联 6
    }

    // 计算每个 R3 节点到相机的距离
    const r3Entries = entries.filter(e => e.layer === 3)
    const r3WithDist = r3Entries.map(e => ({
      entry: e,
      dist: e.object.position.distanceTo(camera.position),
    }))
    r3WithDist.sort((a, b) => a.dist - b.dist)

    // 决定哪些 R3 可见（优先级：焦点 > 兄弟 > 强关联 > 距离最近）
    const r3VisibleIds = new Set<string>()
    if (focusId) {
      r3VisibleIds.add(focusId)           // 焦点永远可见
    }
    // 兄弟节点（最多 8 个，取距离最近的）
    const siblingByDist = r3WithDist.filter(item => siblingIds.has(item.entry.nodeId) && !r3VisibleIds.has(item.entry.nodeId))
    for (const item of siblingByDist.slice(0, 8)) {
      if (r3VisibleIds.size >= maxR3) break
      r3VisibleIds.add(item.entry.nodeId)
    }
    // 强关联节点（最多 6 个，取距离最近的）
    const strongByDist = r3WithDist.filter(item => strongAssocIds.has(item.entry.nodeId) && !r3VisibleIds.has(item.entry.nodeId))
    for (const item of strongByDist.slice(0, 6)) {
      if (r3VisibleIds.size >= maxR3) break
      r3VisibleIds.add(item.entry.nodeId)
    }
    // 剩余名额给距离最近的 R3 节点（global_overview 时 maxR3=0，不会进此循环）
    for (const item of r3WithDist) {
      if (r3VisibleIds.size >= maxR3) break
      if (!r3VisibleIds.has(item.entry.nodeId)) {
        r3VisibleIds.add(item.entry.nodeId)
      }
    }

    // 应用可见性
    let visibleCount = 0
    for (const e of entries) {
      const div = e.object.element as HTMLDivElement
      let show = false
      if (e.layer === 1) {
        show = true
      } else if (e.layer === 2) {
        if (state.kind === 'global_overview') {
          const dist = e.object.position.distanceTo(camera.position)
          show = dist < 3.5
        } else {
          show = true
        }
      } else {
        show = r3VisibleIds.has(e.nodeId) && visibleCount < MAX_TOTAL
      }
      if (show && visibleCount < MAX_TOTAL) {
        div.style.display = ''
        visibleCount++
      } else {
        div.style.display = 'none'
      }
    }
  }

  function dispose() {
    for (const e of entries) {
      e.object.removeFromParent()
    }
    entries.length = 0
  }

  return { entries, create, update, dispose }
}
```

### 6.5 CosmosView.vue 集成改动

```typescript
// 新增 import（懒加载）
let labelRenderer: any = null
let labelGroup: ReturnType<typeof createLabelGroup> | null = null
let lineSetResolution: ((w: number, h: number) => void) | null = null

async function start() {
  // ... existing initScene ...

  // 动态加载 CSS2DRenderer
  const { CSS2DRenderer } = await import('three/examples/jsm/renderers/CSS2DRenderer.js')

  // 创建 CSS2DRenderer
  labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0'
  labelRenderer.domElement.style.pointerEvents = 'none'
  // 将 CSS2D domElement 挂到 .cosmos-view 下
  document.querySelector('.cosmos-view')?.appendChild(labelRenderer.domElement)

  // 导入 labels 模块
  const { createLabelGroup } = await import('@/cosmos/labels')
  labelGroup = createLabelGroup()
  labelGroup.create(sceneObjs.scene, sceneObjs.layoutNodes)

  // 保存 setResolution
  lineSetResolution = sceneObjs.setResolution
}
```

在 `animate()` 中加 LOD 更新和 CSS2D 渲染：

```typescript
function animate() {
  // ... existing update ...
  sceneObjs.renderer.render(sceneObjs.scene, sceneObjs.camera)

  // CSS2D labels
  if (labelGroup && labelRenderer) {
    labelGroup.update(store.state, sceneObjs.camera, store.data?.associations)
    labelRenderer.render(sceneObjs.scene, sceneObjs.camera)
  }
}
```

Resize 处理（在 start 中加）：

```typescript
window.addEventListener('resize', () => {
  if (!labelRenderer || !lineSetResolution) return
  const w = window.innerWidth
  const h = window.innerHeight
  labelRenderer.setSize(w, h)
  lineSetResolution(w, h)
})
```

### 6.6 scene.ts — 返回签名调整

`initScene` 返回的 `SceneObjects` 加两个字段：

```typescript
interface SceneObjects {
  // ... 现有字段不变 ...
  setResolution: (w: number, h: number) => void
}
```

`lines` 类型从 `THREE.Line[]` 改为 `Line2[]`（兼容，都是 Object3D 子类）。

### 6.7 LineGeometry 扁平坐标工具函数

```typescript
/** 将 Vector3[] 转为 LineGeometry.setPositions 需要的扁平数组 */
function flattenPoints(points: THREE.Vector3[]): number[] {
  const arr: number[] = []
  for (const p of points) {
    arr.push(p.x, p.y, p.z)
  }
  return arr
}
```

## 7. label DOM 元素复用注意事项

- CSS2DObject 的 `.element` 是 HTMLElement，直接操作 `style.display` 控制显隐。
- **不要**每帧 destroy/recreate label 元素。创建一次，复用终身。
- `dispose()` 中清理所有 DOM 元素和引用。

## 8. 验收

```bash
# 1. TypeScript 编译
cd frontend && npx vue-tsc --noEmit 2>&1 | head -20

# 2. Build
npm run build

# 3. 人肉验证
# - 打开 Axiom → Atlas
# - global_overview 状态：R1 lifeline 标签直接可见，父子线肉眼清楚
# - 鼠标滚轮缩放：R2 标签随距离显隐
# - 点击 lifeline（region_zoom）：区域内 R3 标签出现（≤12 个）
# - 点击 entity（node_focus）：焦点节点标签可见，关联节点标签可见
# - 旋转视角：标签不抖动、不漂移
# - 切回 Capture：Atlas 资源释放，无泄漏
```

## 9. 禁止事项

- 不做 TubeGeometry（留给后续特殊连线用）
- 不用 Canvas Sprite / CSS3DRenderer 做标签
- 不修改后端任何文件
- 不在 Capture 模式下加载 Line2 / CSS2DRenderer（懒加载）
- 不把 LOD 逻辑写死在 scene.ts（放 labels.ts）
- R3 标签文本过长时前端截断，不依赖后端改 API

## 10. 提交风格

```
add: 007a — Atlas 可读性（Line2 宽线 + CSS2D 标签）

- 父子连线 + 关联线从 LineBasicMaterial 升级到 Line2/LineMaterial (1.5px/2px)
- 新建 labels.ts：CSS2DObject 标签 + LOD 分状态显隐
- CosmosView 集成 CSS2DRenderer，懒加载，不影响 Capture 启动
```

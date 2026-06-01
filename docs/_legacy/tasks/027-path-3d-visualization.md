# 027 — 路径 3D 可视化增强

> 018 引入的路径查找能在面板中显示路径步骤，3D 场景中也会高亮路径节点和边。但当前高亮过于简单——所有节点同一颜色（cyan），没有方向感，多条路径无法区分。本轮增强路径的 3D 可视化：起终点区分、步骤编号、方向指示、多路径分色。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `cosmos/scene.ts` | 重写 `highlightPath`，增加起终点标记 + 步骤编号 + 方向指示；新增多路径分色 | +80 行 |
| `CosmosView.vue` | 多路径模式下同时渲染多条路径的叠加 | +40 行 |

**总计约 120 行**。纯前端 3D 渲染，无后端改动。

## 2. 产品边界

- **做**：起终点不同颜色（起点绿、终点暖橙）、中间节点显示步骤编号（CSS2D label）、路径边带方向指示（小箭头/锥体）、多条路径各用不同颜色
- **不做**：路径动画（流动粒子）、路径保存/导出、路径编辑、路径搜索条件优化（BFS 已在 018 实现）、路径节点缩放动画
- 仅当 `pathResult` 存在时生效，不影响非路径模式下的 3D 渲染

## 3. 视觉设计

### 3.1 节点颜色方案

```
起点 entity  →  绿色 #80ff80, scale 1.5
终点 entity  →  暖橙 #ffaa44, scale 1.5
中间 entity  →  青色 #a0fff0, scale 1.3（保持现有）
非路径 entity →  保持 ghost/dim 状态
```

### 3.2 步骤编号

在中间节点上方放置 CSS2D label 显示步骤序号：

```
      ①          ②          ③
  [entityA] → [entityB] → [entityC] → [entityD]
  (起点/绿)                            (终点/橙)
```

- 标签样式：圆形 badge，直径 18px，背景 `var(--accent)`，白色数字，字体 11px bold
- 仅中间节点显示编号（起点和终点不显示）
- 通过 `CSS2DRenderer` 渲染（已有基础设施）

### 3.3 方向指示

在每条路径边上放置小型箭头锥体（Three.js `ConeGeometry`），位于边的中点，指向目标方向：

```
  entityA ─────▶ entityB
                  ↑
              cone (r=0.15, h=0.3)
```

- 锥体颜色与路径边颜色一致
- 仅在当前选中的路径上显示方向指示
- 创建 2-3 个 `THREE.Mesh`（cone），在路径切换时更新位置和朝向

### 3.4 多路径分色

当 BFS 找到多条最短路径时（如 2 条），每条路径用不同颜色：

```
路径 1（当前） → cyan #a0fff0
路径 2        → yellow #ffeaa0
路径 3        → magenta #ffa0ff
路径 4+       → gray #a0a0a0
```

- 当前选中的路径（`currentPathIdx`）：节点 scale 1.3，线条粗 2x
- 其他路径：节点 scale 1.1，线条粗 1x，颜色为对应分色
- 切换路径时更新高亮状态

### 3.5 完整效果示意

```
3D 场景中：

  (起点/绿)                   ②                       (终点/橙)
  [Rust学习] ═══════▶ [所有权系统] ═══════▶ [内存管理]
     scale 1.5    ↑         scale 1.3     ↑      scale 1.5
                 方向锥体                  方向锥体
              (cyan, 路径1)            (cyan, 路径1)
              
  [Rust学习] ═══════▶ [Trait 系统] ═══════▶ [内存管理]
                       scale 1.1              (yellow, 路径2)
```

## 4. 实现

### 4.1 scene.ts — 重写 highlightPath

```typescript
export interface PathHighlight3D {
  startId: string
  endId: string
  pathEntityIds: Set<string>
  pathAssocIds: Set<string>
  color: number
  isCurrent: boolean
}

// 多路径调色板
const PATH_PALETTE = [0xa0fff0, 0xffeaa0, 0xffa0ff, 0xa0a0a0]

let pathStepLabels: CSS2DObject[] = []
let pathCones: THREE.Mesh[] = []

export function highlightPaths(
  nodes: THREE.Mesh[],
  assocLines: Array<{ line: any; data: any; fromNode: LayoutNode; toNode: LayoutNode }>,
  paths: PathHighlight3D[],
  stepLabelGroup: THREE.Group  // CSS2D group for step numbers
) {
  // 1. Clear previous step labels and cones
  clearPathDecorations(stepLabelGroup)
  
  // 2. Dim all non-path nodes and lines
  const allPathEntityIds = new Set(paths.flatMap(p => [...p.pathEntityIds]))
  const allPathAssocIds = new Set(paths.flatMap(p => [...p.pathAssocIds]))
  
  for (const m of nodes) {
    if (m.userData.layer === 3 && !allPathEntityIds.has(m.userData.id)) {
      m.scale.setScalar(1)
      const mat = m.material as THREE.MeshBasicMaterial
      mat.opacity = 0.3
      mat.transparent = true
      mat.needsUpdate = true
    }
  }
  
  for (const al of assocLines) {
    const mat = al.line.material
    if (!allPathAssocIds.has(al.data.id)) {
      mat.opacity = 0.1
    }
  }
  
  // 3. Highlight each path
  for (const ph of paths) {
    applySinglePathHighlight(nodes, assocLines, ph, stepLabelGroup)
  }
}

function applySinglePathHighlight(
  nodes: THREE.Mesh[],
  assocLines: Array<{ line: any; data: any; fromNode: LayoutNode; toNode: LayoutNode }>,
  ph: PathHighlight3D,
  stepLabelGroup: THREE.Group
) {
  const scale = ph.isCurrent ? 1.3 : 1.1
  const lineWidthMult = ph.isCurrent ? 2 : 1
  
  // Node highlight
  for (const m of nodes) {
    const id = m.userData.id as string
    if (!ph.pathEntityIds.has(id)) continue
    
    const mat = m.material as THREE.MeshBasicMaterial
    ;(mat as any)._pathOrigColor = (mat as any)._pathOrigColor ?? mat.color.getHex()
    
    if (id === ph.startId) {
      // Start node: green
      m.scale.setScalar(1.5)
      mat.color.set('#80ff80')
    } else if (id === ph.endId) {
      // End node: warm orange
      m.scale.setScalar(1.5)
      mat.color.set('#ffaa44')
    } else {
      // Intermediate: palette color
      m.scale.setScalar(scale)
      mat.color.set(ph.color)
    }
    mat.needsUpdate = true
  }
  
  // Edge highlight + direction cones
  for (const al of assocLines) {
    if (!ph.pathAssocIds.has(al.data.id)) continue
    const mat = al.line.material
    ;(mat as any)._pathOrigColor = (mat as any)._pathOrigColor ?? mat.color.getHex()
    ;(mat as any)._pathOrigLinewidth = (mat as any)._pathOrigLinewidth ?? mat.linewidth
    mat.color.set(ph.color)
    mat.linewidth = ((mat as any)._pathOrigLinewidth || 1.5) * lineWidthMult
    mat.opacity = 1
    
    if (ph.isCurrent) {
      addDirectionCones(al.fromNode, al.toNode, ph.color, stepLabelGroup)
    }
  }
}
```

### 4.2 步骤编号 CSS2D 标签

在 CosmosView 中（因为需要访问 CSS2DRenderer 的 group），或直接在 scene.ts 中操作：

```typescript
function addStepLabel(
  node: LayoutNode,
  stepNumber: number,
  scene: THREE.Scene
) {
  const div = document.createElement('div')
  div.className = 'path-step-label'
  div.textContent = String(stepNumber)
  const label = new CSS2DObject(div)
  label.position.copy(node.position.clone().add(new THREE.Vector3(0, 0.5, 0)))
  label.userData.isPathLabel = true
  scene.add(label)
  pathStepLabels.push(label)
}
```

CSS 样式（在全局或组件内注入）：

```css
.path-step-label {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
```

### 4.3 方向锥体

```typescript
function addDirectionCones(
  fromNode: LayoutNode,
  toNode: LayoutNode,
  color: number,
  scene: THREE.Scene
) {
  const mid = new THREE.Vector3().addVectors(fromNode.position, toNode.position).multiplyScalar(0.5)
  const dir = new THREE.Vector3().subVectors(toNode.position, fromNode.position).normalize()
  
  const coneGeom = new THREE.ConeGeometry(0.15, 0.3, 6)
  const coneMat = new THREE.MeshBasicMaterial({ color })
  const cone = new THREE.Mesh(coneGeom, coneMat)
  cone.position.copy(mid)
  // Orient cone along direction
  cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
  cone.userData.isPathCone = true
  scene.add(cone)
  pathCones.push(cone)
}
```

### 4.4 清理函数

```typescript
export function clearPathDecorations(scene: THREE.Scene) {
  for (const l of pathStepLabels) { scene.remove(l) }
  for (const c of pathCones) { scene.remove(c); c.geometry.dispose(); (c.material as THREE.Material).dispose() }
  pathStepLabels = []
  pathCones = []
}
```

### 4.5 CosmosView 集成

`applyCurrentPathHighlight` 改为支持多路径：

```typescript
function applyCurrentPathHighlight(path: PathHop[]) {
  if (!sceneObjs || !store.data) return
  clearPathDecorations(sceneObjs.scene)
  clearPathHighlight(sceneObjs.nodes, assocLines)
  
  // Build ordered entity list from path
  const orderedEntities = path.map(h => h.entityId)
  const assocIds = new Set(path.filter(h => h.assocId).map(h => h.assocId!))
  
  const ph: PathHighlight3D = {
    startId: orderedEntities[0],
    endId: orderedEntities[orderedEntities.length - 1],
    pathEntityIds: new Set(orderedEntities),
    pathAssocIds: assocIds,
    color: PATH_PALETTE[currentPathIdx.value],
    isCurrent: true,
    orderedEntities
  }
  highlightPaths(sceneObjs.nodes, assocLines, [ph], sceneObjs.scene)
}
```

多路径叠加模式（可选开启）：

```typescript
const showAllPaths = ref(false)  // toggle: show all found paths simultaneously

function applyAllPathsHighlight() {
  if (!sceneObjs || !pathResult.value) return
  clearPathDecorations(sceneObjs.scene)
  clearPathHighlight(sceneObjs.nodes, assocLines)
  
  const highlights = pathResult.value.map((path, i) => {
    const orderedEntities = path.map(h => h.entityId)
    return {
      startId: orderedEntities[0],
      endId: orderedEntities[orderedEntities.length - 1],
      pathEntityIds: new Set(orderedEntities),
      pathAssocIds: new Set(path.filter(h => h.assocId).map(h => h.assocId!)),
      color: PATH_PALETTE[i % PATH_PALETTE.length],
      isCurrent: i === currentPathIdx.value,
    }
  })
  highlightPaths(sceneObjs.nodes, assocLines, highlights, sceneObjs.scene)
}
```

## 5. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 起终点区分
# - 右键 entity A → "查找路径到"
# - 点击 entity B
# - 3D 中 A 节点为绿色（scale 1.5）
# - 3D 中 B 节点为暖橙色（scale 1.5）
# - 中间节点为青色（scale 1.3）

# 3. 人肉验证 — 步骤编号
# - 中间节点上方出现 CSS2D 圆形编号（①, ②, ③...）
# - 起点和终点不显示编号

# 4. 人肉验证 — 方向指示
# - 路径边上出现小型箭头锥体，指向目标方向
# - 锥体颜色与路径边颜色一致
# - 切换路径时锥体同步更新

# 5. 人肉验证 — 多路径
# - 如果两条 entity 间有多条最短路径
# - PathPanel 显示"共 N 条"
# - 3D 中当前路径高亮，其他路径暗色显示
# - 切换"上一条/下一条"按钮 → 3D 高亮切换

# 6. 人肉验证 — 清理
# - 点击"清除"按钮 → 所有路径高亮撤销
# - 步骤编号和方向锥体清除
# - entity 颜色和 scale 恢复原状

# 7. 人肉验证 — 不破坏
# - 非路径模式下 entity 颜色正常
# - PendingReviewPanel、NodeDetailCard 正常
# - 右键菜单正常
# - 搜索正常
# - 焦点历史导航正常
```

## 6. 禁止事项

- 不修改后端、数据库
- 不在 tokens.css 新增颜色（路径颜色用硬编码 hex）
- 不做路径流动动画
- 不做路径保存/导出
- 不修改 BFS 算法
- 不引入新的 npm 依赖

## 7. 提交风格

```
add: 027 — 路径 3D 可视化增强

- scene.ts: 起终点分色（绿/橙），中间节点步骤编号 CSS2D 标签
- 路径边方向锥体指示，多路径分色叠加
- CosmosView: 多路径 highlight 集成
```

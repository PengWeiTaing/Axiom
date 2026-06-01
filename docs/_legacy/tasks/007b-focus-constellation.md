# 007b — Atlas 聚焦动态重排：局部星座布局

> 目标：`node_focus` 状态下，不再让实体僵在原位。围绕焦点节点即时生成"局部星座"——焦点居中，同 lifeline 兄弟后侧弧形排列，强关联节点前侧排列，无关节点退为 ghost 背景。退出聚焦后所有节点平滑回到球面原始位置。

## 1. 范围

只改 `frontend/src/cosmos/layout.ts`、`scene.ts`、`views/CosmosView.vue`。后端不改。全局球面布局（`computeLayout`）保持原样不动。

**核心改动**：
- `layout.ts` 新增 `computeFocusLayout()`：输入原始布局 + 焦点 ID + 关联数据，输出 nodeId → targetPosition 映射
- `scene.ts`：mesh 的 `userData` 记录 `homePosition`，新增 `updateNodePositions()` 每帧 lerp
- `CosmosView.vue`：进入/退出 `node_focus` 时触发重排，动画循环驱动 lerp

## 2. 产品边界

- 动态重排**仅**发生在 `node_focus` 和 `relation_reveal` 状态。`global_overview` 和 `region_zoom` 使用原始球面位置。
- 全局布局不被修改。所有 targetPosition 是临时视图位置，不写回 `layoutNodes` 的原始数据。
- 过渡是插值动画（指数衰减），不是瞬移。
- 退出聚焦时所有节点回到原始球面位置，同样带插值。
- 全局树 ghost：无关节点不退场，而是降到极低 opacity，让用户保持方向感。

## 3. 数据流

```
用户点击 R3 entity
  → store.transition({ kind: 'node_focus', entity_id })
  → onStateChange() 检测到 node_focus
    → computeFocusLayout(nodes, focusId, associations, cameraDir)
      返回 { targets, constellationIds }
    → 将 targets 写入每个 mesh.userData.targetPosition
    → constellationIds 中的节点设 full opacity
    → 其余节点设 ghost opacity (0.06)
  → animate() 每帧:
    → updateNodePositions(meshes, dt)  // lerp position → targetPosition
    → render
```

退出：
```
用户按 Esc
  → store.transition({ kind: 'region_zoom' | 'global_overview' })
  → onStateChange() 检测到离开 node_focus
    → 将所有 mesh.userData.targetPosition 重置为 homePosition
    → 恢复所有节点 opacity 为正常值
  → animate() 继续 lerp 直到全部归位
```

## 4. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/cosmos/layout.ts` | 新增 `computeFocusLayout()` | +90 行 |
| `frontend/src/cosmos/scene.ts` | mesh.userData 存 homePosition；新增 `updateNodePositions()`；新增 `setNodeOpacities()` | +40 行 |
| `frontend/src/views/CosmosView.vue` | onStateChange 集成重排触发；animate 中调用 updateNodePositions；退出时恢复 | +50 行 |

## 5. 星座布局算法

### 5.1 输入

```
computeFocusLayout(
  nodes: LayoutNode[],        // 原始球面布局（home positions）
  focusId: string,            // 焦点节点 ID
  associations: CosmosAssociation[],  // 关联数据
  cameraDir: THREE.Vector3    // 摄像机→焦点方向（归一化）
): {
  targets: Map<string, THREE.Vector3>   // nodeId → 目标位置
  constellationIds: Set<string>         // 参与星座的节点（保持正常 opacity）
}
```

### 5.2 节点分组

从输入中提取：

| 组 | 定义 | 用途 |
|---|---|---|
| **focus** | 焦点节点本身 | 留在 homePosition，视觉中心 |
| **ancestors** | 沿 parentId 链向上：R2 → R1（最多 2 个） | 放在焦点后方偏上，表示"归属路径" |
| **siblings** | 同 parentId 的 R3 节点（不含 focus），最多 12 个 | 后侧弧形（behind focus） |
| **strongAssoc** | `confidence >= 0.7` 且 `status !== 'rejected'` 的对端节点，最多 6 个 | 前侧弧形（in front of focus） |
| **weakAssoc** | `0.3 <= confidence < 0.7` 且 `status !== 'rejected'` 的对端节点，最多 6 个 | 外圈弧形 |
| **ghost** | 其余所有节点 | 保持 homePosition，opacity 降到 0.06 |

### 5.3 参考坐标系

以焦点节点位置为原点，摄像机方向为基准：

```
origin = focusNode.position
d = cameraDir.normalize()            // 摄像机→焦点方向（向外的径向）
up = new Vector3(0, 1, 0)
u = cross(d, up).normalize()         // 水平切线方向
v = cross(u, d).normalize()          // 垂直切线方向
```

`d` 指向球面外侧（从球心向外，也是摄像机过来的方向）。所以：
- `+d` = 焦点后方（远离摄像机）
- `-d` = 焦点前方（靠近摄像机）

### 5.4 各组目标位置

```
// 焦点：留在原位
focus → origin

// 祖先（R2/R1 parent chain）：沿 +d 方向小步后退，略偏上
ancestor[i] → origin + d * (0.18 + i * 0.14) + v * 0.06
// i=0 是直接父节点，i=1 是爷节点。最多 2 个。

// 兄弟节点：在 u-v 平面，120° 弧形，偏后方
siblings → origin + d * 0.12 + (u * cos(θ) + v * sin(θ)) * 0.25
// θ 从 -60° 到 +60° 均匀分布（120° 弧，开口朝向摄像机）
// 按节点原始 ID 排序以保证每次布局一致

// 强关联节点：90° 弧形，偏前方
strongAssoc → origin - d * 0.08 + (u * cos(φ) + v * sin(φ)) * 0.22
// φ 从 -45° 到 +45° 均匀分布（90° 弧，开口朝外）

// 弱关联节点：外圈，150° 弧形
weakAssoc → origin - d * 0.04 + (u * cos(ψ) + v * sin(ψ)) * 0.38
// ψ 从 -75° 到 +75° 均匀分布

// ghost 节点：保持 homePosition，不设置新 target
```

角度分配时，如果某组只有 1 个节点，放在弧中点（θ=0）。参数微调（0.25、0.22、0.38 等半径值）可以根据效果调整，但相对关系必须保持：ghost < weakAssoc < siblings ≈ strongAssoc < ancestors < focus（中心到外围）。

### 5.5 targets Map 构建规则

```typescript
const targets = new Map<string, THREE.Vector3>()

// 只给参与星座的节点设 target
for (const n of constellationNodes) {
  targets.set(n.id, computeTargetPosition(n))
}
// ghost 节点不加入 targets（它们留在 homePosition，靠 opacity 区分）

return { targets, constellationIds }
```

## 6. scene.ts 改动

### 6.1 存储 homePosition

`initScene` 创建 mesh 时（第 83 行附近），加一行：

```typescript
mesh.userData = {
  id: n.id, name: n.name, kind: n.kind,
  layer: n.layer, parentId: n.parentId,
  homePosition: n.position.clone(),   // 新增：原始球面位置，永不修改
  targetPosition: n.position.clone(), // 新增：lerp 目标，初始 = homePosition
}
```

### 6.2 新增 updateNodePositions

```typescript
/**
 * 每帧调用：将所有 mesh 的 position 向 targetPosition lerp。
 * 使用指数衰减，帧率无关。
 * rate 越大越快，~6 表示约 0.5s 完成 95%。
 */
export function updateNodePositions(meshes: THREE.Mesh[], dt: number, rate: number = 6): void {
  const t = 1 - Math.exp(-rate * dt)
  for (const m of meshes) {
    const target = m.userData.targetPosition as THREE.Vector3 | undefined
    if (!target) continue
    m.position.lerp(target, t)
    // 同步更新关联的 CSS2DObject（如果有）
    // CSS2DObject 的位置在 labels.ts 中独立更新，这里不处理
  }
}
```

### 6.3 新增 applyConstellationOpacities

```typescript
/**
 * node_focus 状态下调整节点透明度：
 * - constellationIds 中的节点 → 正常 opacity（按 layer）
 * - 其余节点 → ghost opacity 0.06
 *
 * 退出聚焦后调用 resetNodeAlpha() 恢复。
 */
export function applyConstellationOpacities(
  meshes: THREE.Mesh[],
  constellationIds: Set<string>,
  ghostAlpha: number = 0.06
): void {
  for (const m of meshes) {
    const id = m.userData.id as string
    const mat = m.material as THREE.MeshBasicMaterial
    if (constellationIds.has(id)) {
      // 保持正常 opacity（不改变）
    } else {
      mat.opacity = ghostAlpha
      mat.transparent = true
      mat.needsUpdate = true
    }
  }
}
```

注意：`applyConstellationOpacities` 和已有的 `fadeNodes` 是互补关系：
- `fadeNodes` 用于 `relation_reveal`（显关联节点 + 淡出其余）
- `applyConstellationOpacities` 用于 `node_focus`（显星座节点 + ghost 其余）
- 退出时都用 `resetNodeAlpha` 恢复

### 6.4 CSS2DObject 位置同步

`labels.ts` 中的 CSS2DObject 也需要跟随 mesh 移动。在 `LabelGroup.update()` 末尾加一步：如果某个 label 对应的 mesh 的 `targetPosition` 改变，label 的 `position` 也需要 lerp。但 CSS2DObject 的 position 更新比较简单——直接设置即可，因为 CSS2DRenderer 每帧渲染时会读取最新 position。

简化方案：在 `LabelGroup` 中新增一个方法 `syncPositions(meshes: THREE.Mesh[])`，直接从 mesh 的 position 拷贝到 CSS2DObject：

```typescript
// labels.ts 新增：
function syncPositions(meshes: THREE.Mesh[]) {
  const meshMap = new Map<string, THREE.Vector3>()
  for (const m of meshes) {
    meshMap.set(m.userData.id as string, m.position)
  }
  for (const e of entries) {
    const pos = meshMap.get(e.nodeId)
    if (pos) e.object.position.copy(pos)
  }
}
```

在 `animate()` 中调用 `updateNodePositions` 之后调用 `labelGroup.syncPositions(meshes)`。

## 7. CosmosView.vue 改动

### 7.1 onStateChange 扩展

```typescript
function onStateChange() {
  if (!sceneObjs) return
  const s = store.state

  if (s.kind === 'node_focus' || s.kind === 'relation_reveal') {
    const targetId = (s as any).entity_id as string
    const n = sceneObjs.layoutNodes.find(ln => ln.id === targetId)
    if (n) {
      const dir = n.position.clone().normalize()
      const dist = n.position.length() + 0.6
      const camPos = dir.clone().multiplyScalar(dist)
      tweenCamera(sceneObjs.camera, controls, camPos, n.position, s.kind === 'node_focus' ? 38 : 55, 800)

      // ★ 新增：计算星座布局
      const { computeFocusLayout } = await import('@/cosmos/layout')
      const { targets, constellationIds } = computeFocusLayout(
        sceneObjs.layoutNodes,
        targetId,
        store.data?.associations || [],
        dir  // cameraDir = 从球心向外的方向
      )
      // 写入 mesh userData
      for (const m of sceneObjs.nodes) {
        const id = m.userData.id as string
        const tgt = targets.get(id)
        if (tgt) {
          m.userData.targetPosition = tgt.clone()
        } else {
          // 恢复到 homePosition（ghost 节点留在原位）
          m.userData.targetPosition = m.userData.homePosition.clone()
        }
      }
      // 应用星座 opacity
      applyConstellationOpacities(sceneObjs.nodes, constellationIds)

    }
  } else if (s.kind === 'global_overview' || s.kind === 'region_zoom') {
    // ★ 退出聚焦：恢复所有 targetPosition → homePosition
    if (sceneObjs) {
      for (const m of sceneObjs.nodes) {
        m.userData.targetPosition = m.userData.homePosition.clone()
      }
      resetNodeAlpha(sceneObjs.nodes)
    }
    // 原有的相机 tween
    if (s.kind === 'region_zoom') {
      const targetId = (s as any).lifeline_id
      const n = sceneObjs.layoutNodes.find(ln => ln.id === targetId)
      if (n) {
        const dir = n.position.clone().normalize()
        const dist = n.position.length() + 1.8
        tweenCamera(sceneObjs.camera, controls, dir.clone().multiplyScalar(dist), n.position, 55, 800)
      }
    } else if (s.kind === 'global_overview') {
      tweenCamera(sceneObjs.camera, controls, new THREE.Vector3(0, 2, 4), new THREE.Vector3(0, 0, 0), 60, 800)
    }
  }
}
```

### 7.2 animate 扩展

```typescript
function animate() {
  if (!sceneObjs) return
  animFrame = requestAnimationFrame(animate)
  controls?.update()
  updateTween(0.016, sceneObjs.camera, controls)

  // ★ 新增：lerp 节点位置
  updateNodePositions(sceneObjs.nodes, 0.016)

  // ★ 新增：同步 CSS2D 标签位置
  if (labelGroup) {
    labelGroup.syncPositions(sceneObjs.nodes)
  }

  // LOD: layer visibility by camera distance
  // ... existing code ...

  sceneObjs.renderer.render(sceneObjs.scene, sceneObjs.camera)

  // CSS2D labels
  if (labelGroup && labelRenderer) {
    labelGroup.update(store.state, sceneObjs.camera, store.data?.associations)
    labelRenderer.render(sceneObjs.scene, sceneObjs.camera)
  }
}
```

### 7.3 import 调整

```typescript
// 新增 import
import { updateNodePositions, applyConstellationOpacities, resetNodeAlpha } from '@/cosmos/scene'
```

`computeFocusLayout` 在 `onStateChange` 中动态 import（和 Line2 一样，不阻塞首屏）。

## 8. 过渡动画细节

- **指数衰减公式**：`position += (target - position) * (1 - exp(-rate * dt))`
- **rate = 6**：约 0.5 秒完成 95% 过渡，约 0.77 秒完成 99%
- **相机 tween**（已有的 `tweenCamera`）800ms，和节点 lerp 并发执行
- 进入聚焦：相机移动 + 节点重排同时发生
- 退出聚焦：节点先归位，相机同时拉远，两者并发

## 9. 验收

```bash
# 1. TypeScript 编译
cd frontend && npx vue-tsc --noEmit

# 2. Build
npm run build

# 3. 人肉验证
# - 打开 Axiom → Atlas
# - 在 global_overview 旋转球体，确认布局与之前一致
# - 点击 lifeline → region_zoom：节点位置不变（region_zoom 不触发重排）
# - 点击 entity → node_focus：
#   - 焦点节点居中
#   - 兄弟节点在其后方弧形排列
#   - 关联节点在前方排列
#   - 无关节点退为 ghost（极暗但仍可见）
#   - 过渡是滑动动画，不是瞬移
# - 按 Esc 退出聚焦：
#   - 所有节点平滑滑回球面原位
#   - opacity 恢复正常
#   - 相机同时拉远
# - 在 node_focus 状态下按 R（进入 relation_reveal）：
#   - 关联线显示
#   - 星座布局保持（不被打断）
# - 多次连续点击不同节点：
#   - 每次都能重新生成星座
#   - 无节点丢失或无目标
```

## 10. 禁止事项

- 不修改 `computeLayout()` 的球面布局算法
- 不把 targetPosition 写回 `layoutNodes` 或 store 数据
- 不用 `position.set()` 直接瞬移节点（必须 lerp）
- `node_focus` 以外的状态不触发重排
- 不引入新的 npm 依赖
- 星座布局不要用随机数（同一输入必须产生相同布局）
- 不做 force-directed graph（复杂度超出 v0.1 范围）

## 11. 已知限制（留给未来）

- 星座中节点间距不考虑标签重叠（标签可能轻微遮挡）
- 不处理 R1/R2 lifeline 节点的重排（它们保持在原始位置）
- 关联线在星座模式下不重绘（等 007c）

## 12. 提交风格

```
add: 007b — Atlas 聚焦动态重排（局部星座布局）

- layout.ts 新增 computeFocusLayout：焦点居中，兄弟/关联节点弧形排列
- scene.ts mesh 存储 homePosition + targetPosition，updateNodePositions 驱动 lerp
- node_focus 状态下无关节点退为 ghost (opacity 0.06)，退出后全部归位
```

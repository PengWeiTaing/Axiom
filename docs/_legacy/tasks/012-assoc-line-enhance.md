# 012 — 关联线视觉增强（线宽随置信度 + Hover 高亮 + 方向箭头）

> relation_reveal 模式目前已能显示关联线并点击查看证据，但所有线看起来一样粗细、一样颜色、没有方向。用户无法一眼看出哪条关联更有把握、谁是因谁是果。本轮给关联线加三层视觉编码。

## 1. 范围

只改前端 `scene.ts` 中 `createAssociationLines` 函数和 CosmosView 中关联线 hover 行为。不动后端，不改数据模型。

**核心目标**：
- 关联线粗细随 confidence 变化（0.3 → 1px, 0.7 → 2.5px, 1.0 → 3.5px）
- 鼠标 hover 关联线时线变亮/变粗（1.3x）
- accepted 关联线末端加小箭头指示方向（from → to）

## 2. 产品边界

- 只改关联线（`assocLines`），不改父子结构线（parent-child arcs）
- 不做发光/脉冲/粒子动画
- 箭头不交互（纯视觉）
- 不修改 `CosmosAssociation` 类型定义
- 不添加 npm 依赖
- hover 高亮保留现有 tooltip 行为

## 3. 线宽随置信度

### 3.1 映射规则

```typescript
const MIN_WIDTH = 1.0   // confidence ≈ 0.3
const MID_WIDTH = 2.5   // confidence = 0.7
const MAX_WIDTH = 3.5   // confidence = 1.0

function confidenceToWidth(c: number): number {
  // 线性插值，clamp 到 [MIN_WIDTH, MAX_WIDTH]
  return Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, MIN_WIDTH + (c - 0.3) * 3.57))
  // 0.3 → 1.0, 0.5 → 1.7, 0.7 → 2.4, 0.9 → 3.1, 1.0 → 3.5
}
```

### 3.2 在 createAssociationLines 中应用

当前所有关联线 `linewidth: 2`。改为根据 `assoc.confidence` 计算：

```typescript
const mat = new LineMaterial({
  color: new THREE.Color(colorHex),
  linewidth: confidenceToWidth(assoc.confidence),
  // ... 其余不变
})
```

### 3.3 视觉预期

- confidence 0.48（弱关联）→ 细线 1.6px，几乎透明
- confidence 0.75（强关联）→ 粗线 2.6px，很醒目
- 用户在 relation_reveal 模式下一眼能看出哪些关联更可靠

## 4. Hover 高亮

### 4.1 行为

当前 mousemove handler 中检测到关联线 hover 时，只设置 tooltip 文字。本轮增加：

- 被 hover 的线 **加粗 1.3x**（linewidth × 1.3）
- 被 hover 的线 **变亮**（color 向白色 lerp 30% 或换为 `--accent`）
- 其余关联线 **变暗**（opacity × 0.3）
- 鼠标移开 → 全部恢复

### 4.2 实现

在 CosmosView 的 mousemove handler 中：

```typescript
let hoveredAssocLine: Line2 | null = null

// 在 mousemove 的关联线检测部分：
const lineHits = raycaster.intersectObjects(assocLines.map(l => l.line))
if (lineHits.length > 0 && assocLines.some(al => al.line === lineHits[0].object)) {
  const al = assocLines.find(al => al.line === lineHits[0].object)
  if (al) {
    tooltipText = al.data.evidence?.[0]?.excerpt || ''
    if (al.line !== hoveredAssocLine) {
      resetLineHover()
      hoveredAssocLine = al.line
      applyLineHover(al)
    }
  }
} else {
  tooltipText = ''
  resetLineHover()
}
```

```typescript
function applyLineHover(al: typeof assocLines[0]) {
  const mat = al.line.material as LineMaterial
  mat._origLinewidth = mat._origLinewidth ?? mat.linewidth
  mat._origColor = mat._origColor ?? mat.color.getHex()
  mat.linewidth = mat._origLinewidth * 1.3
  mat.color.set(cssVar('--accent'))
  mat.needsUpdate = true

  // 其余线降低 opacity
  assocLines.forEach(other => {
    if (other.line !== al.line) {
      const om = other.line.material as LineMaterial
      om.transparent = true
      om.opacity = (om.opacity || 0.8) * 0.3
      om.needsUpdate = true
    }
  })
}

function resetLineHover() {
  if (!hoveredAssocLine) return
  const mat = hoveredAssocLine.material as LineMaterial
  if ((mat as any)._origLinewidth !== undefined) {
    mat.linewidth = (mat as any)._origLinewidth
    delete (mat as any)._origLinewidth
  }
  if ((mat as any)._origColor !== undefined) {
    mat.color.setHex((mat as any)._origColor)
    delete (mat as any)._origColor
  }
  mat.needsUpdate = true

  // 恢复其余线 opacity
  assocLines.forEach(al => {
    const om = al.line.material as LineMaterial
    om.opacity = al.data.status === 'pending' ? 0.8 : 1
    om.needsUpdate = true
  })

  hoveredAssocLine = null
}
```

重要：`clearAssoc()` 中也需调用 `resetLineHover()` 清理状态。

## 5. 方向箭头

### 5.1 设计

在 accepted 关联线的末端（to 端）放置一个小的圆锥体（ConeGeometry），指向 `from → to` 方向：

```
from ●───────────────────▶ to
                       ↑ 箭头
```

### 5.2 实现

```typescript
function createArrowhead(
  from: THREE.Vector3,
  to: THREE.Vector3,
  color: string,
  lineWidth: number
): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(to, from).normalize()
  const arrowSize = 0.03 + lineWidth * 0.005  // 箭头尺寸随线宽缩放
  const geom = new THREE.ConeGeometry(arrowSize, arrowSize * 2.5, 6, 1)
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color) })
  const arrow = new THREE.Mesh(geom, mat)

  // 放在 to 端，稍微回退一点避免穿透节点
  const arrowPos = to.clone().addScaledVector(dir, -0.04)
  arrow.position.copy(arrowPos)

  // 旋转对齐方向
  const quat = new THREE.Quaternion()
  quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
  arrow.setRotationFromQuaternion(quat)

  return arrow
}
```

在 `createAssociationLines` 中，仅对 `status === 'accepted'` 的关联添加箭头：

```typescript
if (assoc.status === 'accepted') {
  const arrow = createArrowhead(from.position, to.position, colorHex, lineWidth)
  scene.add(arrow)
  // 箭头加入 lines 或单独的 arrows 数组以便清理
}
```

### 5.3 清理

在 `clearAssoc()` 中一并 dispose 箭头几何体和材质。

### 5.4 待定（pending）关联

pending 关联线已经是虚线（dashed），视觉上已经和 accepted 实线区分。pending 线不加箭头。

## 6. 关联线颜色映射调整

当前 colorMap：
```typescript
const colorMap: Record<string, string> = {
  co_occurrence: '--text-3',   // 灰白
  causal: '--accent',          // 青绿
  tension: '--warm',           // 暖黄
  derived_from: '--accent-dim',// 淡青
}
```

本轮增加 `manual` 类型（人工标注的关联，009 的 mock evidence 中已经用了）：

```typescript
manual: '--accent',  // 与 causal 同色 — 人工确认的关联
```

不做大调整，颜色映射保持现状。

## 7. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/cosmos/scene.ts` | `createAssociationLines`：线宽映射 + 箭头生成 + 清理 | +50 行 |
| `frontend/src/views/CosmosView.vue` | mousemove 关联线 hover 高亮 + clearAssoc 清理 | +30 行 |

## 8. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 线宽
# - Atlas → R1 lifeline → R3 entity → R 进入 relation_reveal
# - 不同 confidence 的关联线肉眼可见粗细差异
# - confidence 0.88 的线明显比 0.48 的线粗

# 3. 人肉验证 — hover 高亮
# - relation_reveal 下鼠标悬停某条关联线
# - 该线变粗 + 变 accent 色
# - 其余关联线明显变暗
# - 鼠标移开 → 全部恢复
# - hover 高亮与现有 tooltip 不冲突（同时显示）

# 4. 人肉验证 — 方向箭头
# - accepted 关联线末端有小三角箭头
# - 箭头指向 to 方向
# - pending 虚线没有箭头
# - 旋转视角后箭头仍然指向正确方向

# 5. 人肉验证 — 兼容性
# - 现有关联线点击 → 证据面板正常工作
# - R 键退出 relation_reveal → 关联线清理干净（包括箭头）
# - Esc 退出 → 无残留
# - 切换到其他 entity → 旧关联线清理干净
```

## 9. 禁止事项

- 不做动画/过渡效果（线宽平滑变化等 — 可以后续做）
- 不对父子结构线（parent-child arcs）做任何改动
- 不修改 colorMap 以外的 CSC 变量
- 不做双向箭头（只 from → to 单向）
- linewidth 不超过 4.0（Three.js LineMaterial 有平台限制，超出可能无效）

## 10. 提交风格

```
add: 012 — 关联线视觉增强（线宽随信心度 + hover 高亮 + 方向箭头）

- createAssociationLines：线宽按 confidence 线性映射 1.0-3.5px
- mousemove hover 高亮：目标线 1.3x 加粗 + accent 色，其余线 opacity 降至 0.3x
- accepted 关联线末端加 ConeGeometry 方向箭头（from→to）
- pending 关联线保持虚线无箭头
```

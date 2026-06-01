# 008 — Atlas 空间隐喻修正：球面层级 + 状态机重定义

> 当前 Atlas 表现是"黑色画布上的稀疏节点图 + 同级分类横线排列"，而不是"树约束下的球面语义空间"。
> 本轮不堆光效、不加粒子、不做星空。只修三件事：**球壳层级可感知**、**状态机语义正确**、**mock 数据够密够验证结构**。

## 1. 范围

改动覆盖前端四大块：mock 数据、布局算法、状态机行为、左侧面板联动。后端不改。

**核心目标**：
- Global Overview → 一眼看出球形层级（R0/R1/R2/R3），不是平面 radial graph
- Region Zoom → 点击 lifeline 看到它的内部结构，不是同级横排
- Node Focus → 焦点节点居中 + 兄弟/关联分区（007b 已有，本轮微调）
- Relation Reveal → 仅聚焦后按 R reveal 局部关联，全局不显

## 2. 产品边界

- 不做粒子/星空/光斑/发光特效
- 不添加新 npm 依赖
- 不做 evidence 抽屉
- 不做真实 AI 关联生成（mock association 即可）
- R2 节点（项目/主题）和 R3 节点（知识点/任务/决策）视觉上必须可区分

## 3. Mock 数据

### 3.1 数据规模

| 层级 | 数量 | 说明 |
|---|---|---|
| R1 lifeline | 6-8 条 | 如：健康、Rust 学习、Axiom 开发、阅读、社交、财务、创作、家庭 |
| R2 子 lifeline | 每条 R1 下 2-4 个 | 如 Rust 学习 → 所有权、Trait、异步、WebAssembly |
| R3 entity | 每个 R2 下 2-4 个 | task/memory/decision/item 混合 |
| **总计** | **40-80 节点** | 足够验证空间结构 |

### 3.2 数据来源

两种方式二选一（由实现者决定）：

**方式 A**：创建 `frontend/public/mock/cosmos.json`，包含完整的 `CosmosData` JSON。前端在 `VITE_USE_MOCK_COSMOS=true` 或 API 失败时加载 mock 数据。

**方式 B**：写一个 PowerShell/Python 种子脚本，通过 `/lifelines`、`/tasks`、`/memories`、`/decisions`、`/add`、`/cosmos/entities/.../lifeline` 等 API 创建 mock 数据。

推荐方式 A（前后端分离，不依赖后端运行）。

mock 数据中应包含 5-10 条 mock association（`status: "pending"`，`confidence: 0.5-0.9`），用于验证 relation reveal。

### 3.3 mock 数据示例片段

```json
{
  "schema_version": "0.1",
  "root": { "id": "ROOT", "name": "我" },
  "lifelines": [
    { "id": "lifeline:health", "name": "健康", "parent_id": "ROOT", "order_index": 0 },
    { "id": "lifeline:health-cardio", "name": "心肺", "parent_id": "lifeline:health", "order_index": 0 },
    { "id": "lifeline:health-diet", "name": "饮食", "parent_id": "lifeline:health", "order_index": 1 },
    { "id": "lifeline:rust", "name": "Rust 学习", "parent_id": "ROOT", "order_index": 1 },
    { "id": "lifeline:rust-ownership", "name": "所有权", "parent_id": "lifeline:rust", "order_index": 0 },
    { "id": "lifeline:rust-trait", "name": "Trait 系统", "parent_id": "lifeline:rust", "order_index": 1 },
    { "id": "lifeline:rust-async", "name": "异步编程", "parent_id": "lifeline:rust", "order_index": 2 }
  ],
  "entities": [
    { "id": "task:1", "kind": "task", "title": "每天跑步 30 分钟", "lifeline_id": "lifeline:health-cardio" },
    { "id": "memory:1", "kind": "memory", "title": "空腹有氧更利于减脂", "lifeline_id": "lifeline:health-cardio" },
    { "id": "item:1", "kind": "item", "title": "今天血压 125/82", "lifeline_id": "lifeline:health-cardio" },
    { "id": "memory:2", "kind": "memory", "title": "所有权是 Rust 的核心创新", "lifeline_id": "lifeline:rust-ownership" },
    { "id": "task:2", "kind": "task", "title": "完成 Rust book 第 4 章练习", "lifeline_id": "lifeline:rust-ownership" }
  ],
  "associations": [
    {
      "id": "assoc:1",
      "from": "task:1",
      "to": "memory:1",
      "relation_type": "causal",
      "confidence": 0.75,
      "status": "pending",
      "evidence": []
    }
  ]
}
```

重要约束：
- R1 lifeline 的 `parent_id` 必须是 `"ROOT"`
- R2 lifeline 的 `parent_id` 指向 R1 lifeline
- R3 entity 的 `lifeline_id` 指向 R2 lifeline（不是 R1）
- `entity_id()` 前缀规则：`task:N`, `memory:N`, `decision:N`, `item:N`, `lifeline:xxx`

## 4. 球壳层级视觉

### 4.1 半径扩大

当前 `RADII = { R0: 0.2, R1: 1.0, R2: 1.8, R3: 2.5 }`。节点太小，屏幕留白太多。

修改为：

```typescript
export const RADII = { R0: 0.35, R1: 1.6, R2: 2.2, R3: 3.0 }
```

摄像机初始位置相应调整：`camera.position.set(0, 2.5, 5.5)` → 球体占屏幕约 60% 空间。

### 4.2 节点尺寸按层分级

当前 R1=0.025, R2=0.018, R3=0.012-0.014 全部很小且差异不大。

修改为：

| 层 | 尺寸 | 形状 | 颜色 |
|---|---|---|---|
| R0 | 0.06 | Sphere | `--accent` |
| R1 | 0.05 | Sphere | `--accent`，transparent, opacity 1.0 |
| R2 | 0.03 | Sphere | `--text-2`，transparent, opacity 0.9 |
| R3 task | 0.022 | Box | `--text-3` |
| R3 decision | 0.022 | Octahedron | `--text-3` |
| R3 memory | 0.02 | Sphere | `--text-3` |
| R3 item | 0.02 | Tetrahedron | `--text-3` |

这样 R1 lifeline 是醒目的彩色大球，R2 是中等灰球，R3 是小几何体。层级一眼可辨。

### 4.3 轨道环

当前只有 R1 一条环（`opacity: 0.04`），几乎看不见。

加 R2 轨道环，两条环在 camera 初始角度都能看到：

```typescript
// R1 orbit ring — 更明显
const ring1Geom = new THREE.TorusGeometry(RADII.R1, 0.006, 8, 80)
const ring1 = new THREE.Mesh(ring1Geom, new THREE.MeshBasicMaterial({
  color: cssVar('--line-2'), transparent: true, opacity: 0.12
}))
ring1.rotation.x = THREE.MathUtils.degToRad(15)
scene.add(ring1)

// R2 orbit ring
const ring2Geom = new THREE.TorusGeometry(RADII.R2, 0.004, 8, 80)
const ring2 = new THREE.Mesh(ring2Geom, new THREE.MeshBasicMaterial({
  color: cssVar('--line-2'), transparent: true, opacity: 0.08
}))
ring2.rotation.x = THREE.MathUtils.degToRad(15)
scene.add(ring2)
```

### 4.4 R2 节点布局

当前 `computeLayout()` 中 R2 的 `sectorWidth = Math.PI / 4`（45°）。R2 节点在父 R1 的 45° 扇区内均匀分布。这个逻辑保留，但需要验证多条 R2 时分布是否均匀。

R3 同理：`sectorWidth = Math.PI / 6`（30°），在当前 R2 的扇区内分布。

## 5. 状态机重定义

### 5.1 状态转移图

```
Global Overview  ←──────────────────────────┐
  │ 点击 R1 lifeline                          │ Esc / 面包屑
  ▼                                           │
Region Zoom  ────────────────────────────┐   │
  │ 点击区域内 R2 / R3 entity             │   │
  ▼                                      │   │
Node Focus  ──────── Esc ────────────────┼───┘
  │ 按 R                                 │
  ▼                                      │
Relation Reveal ─── Esc ──→ Node Focus ──┘
```

### 5.2 Global Overview

**触发**：默认进入 Atlas / 按 Esc 从 Region Zoom 返回 / 面包屑点击 "Atlas"

**行为**：
- 完整球面树显示：R0 → R1 → R2 → R3 节点 + 父子连线
- R1 和 R2 轨道环可见
- R1 lifeline 标签始终显示（CSS2D）
- R2 标签在相机距离 < 4 时显示
- R3 标签**不显示**（只有靠近/进入 Region Zoom 后才显示）
- **不显示任何关联线**（包括已 accepted 的）
- 左侧 LifelinePanel 中所有 lifeline 展开/折叠正常

**相机**：`position(0, 2.5, 5.5)`，`lookAt(0, 0, 0)`，FOV 60

**交互**：
- 鼠标旋转/缩放
- 点击 R1 lifeline 节点 → Region Zoom
- 左侧面板点击 lifeline → Region Zoom
- 搜索定位到某 entity → 进入其所在 Region Zoom 或 Node Focus

### 5.3 Region Zoom

**触发**：点击 R1 lifeline / 左侧面板点击 lifeline / 空点退出 Node Focus 回到上一层

**行为**（核心修正）：
- 选中的 R1 lifeline 及其 R2 子节点 → **全 opacity**
- **其余 R1 lifeline + 其 R2/R3 子节点 → ghost opacity 0.06**
- 目标 lifeline 的 R3 entity 节点 → 显示在对应 R2 扇区内，opacity 正常
- 目标 lifeline 的 R3 entity 标签 → 显示（≤12 个，按距离相机最近优先）
- R1/R2 轨道环保持可见（作为空间参考）
- 相机 tween 到：以选中 R1 节点为 lookAt，从外侧略近的位置看

**相机**：
```typescript
const dir = targetR1.position.clone().normalize()
const dist = RADII.R1 + 1.8  // ≈ 3.4，在球壳外面一点
const camPos = dir.clone().multiplyScalar(dist)
// lookAt 指向 R1 节点，FOV 50
tweenCamera(camera, controls, camPos, targetR1.position, 50, 800)
```

**注意区分**：Region Zoom 不是把 R1 lifeline 同级排成横线！其余 lifeline 仍然在它们的球面位置，只是 ghost 了。目标 lifeline 的子结构（R2/R3）出现在它周围。

**交互**：
- 点击目标 R1 区域内 R2 或 R3 节点 → Node Focus
- 点击 ghost 区域空处 → 回到 Global Overview
- Esc → 回到 Global Overview
- 面包屑显示：`Atlas › Rust 学习`

**LOD**：
- R1 标签：目标 + ghost 都显（ghost 的标签也 ghost）
- R2 标签：目标 lifeline 下的 R2 显示，其余隐藏
- R3 标签：目标 lifeline 下的 R3 显示 ≤12 个

### 5.4 Node Focus

**触发**：Region Zoom 中点击 entity（R3 节点）

**行为**（007b 星座布局 + 微调）：
- 焦点 entity 居中
- 父级路径（R2 + R1 祖先）在焦点后方偏上排列
- 同 R2 兄弟 entity 在后方 120° 弧形排列
- 强关联 entity（confidence ≥ 0.7）在前方 90° 弧形排列
- 弱关联 entity（0.3 ≤ confidence < 0.7）在外圈
- 其余节点 ghost opacity 0.06（包括其他 lifeline 的节点）
- 背景保留全局 tree ghost（R1 环 + ghost 节点提供空间方向感）
- **不显示关联线**（等按 R）

**相机**：FOV 35，距离焦点节点约 0.9 单位

**交互**：
- 点击星座中其他 entity → 切换 Node Focus 到该 entity
- 点击 ghost 空处 → 回到 Region Zoom
- 按 R → Relation Reveal
- Esc → 回到 Region Zoom
- 面包屑显示：`Atlas › Rust 学习 › 所有权 › #[entity title]`

**LOD**：
- 焦点 entity 标签：始终显示
- 同 R2 兄弟标签：显示 ≤8 个
- 强关联标签：显示 ≤6 个
- 总 R3 标签 ≤24

### 5.5 Relation Reveal

**触发**：Node Focus 中按 R

**行为**：
- 显示当前焦点 entity 的关联线（只画局部关联，不画全局关联）
- 关联线用 Line2，pending=虚线，accepted=实线
- 关联的对方 entity 高亮（提高 opacity），其余保持 ghost
- 鼠标 hover 到关联线 → 显示 tooltip（已有功能）

**交互**：
- 按 R 或 Esc → 回到 Node Focus（清除关联线）
- 点击关联对方 entity → 切换 Node Focus 到该 entity（关联线也切换到它）

### 5.6 Ghost 实现

需要一个统一的 ghost 函数，而不是分散的 opacity 调整：

```typescript
/**
 * 将全部节点设为 ghost opacity，然后恢复指定集合的节点为正常 opacity。
 * ghostAlpha = 0.06 意味着节点几乎看不见但仍在（空间方向感）。
 */
export function ghostExcept(meshes: THREE.Mesh[], visibleIds: Set<string>, ghostAlpha: number = 0.06): void {
  for (const m of meshes) {
    const id = m.userData.id as string
    const layer = m.userData.layer as number
    const mat = m.material as THREE.MeshBasicMaterial
    if (visibleIds.has(id)) {
      // 恢复正常 opacity
      const alpha = layer === 0 ? 1 : layer === 1 ? 1 : layer === 2 ? 0.9 : 0.85
      mat.opacity = alpha
    } else {
      mat.opacity = ghostAlpha
    }
    mat.transparent = true
    mat.needsUpdate = true
  }
}
```

替换现有的 `fadeNodes` 和 `applyConstellationOpacities`（它们可以内部调用 `ghostExcept`）。

### 5.7 关联线可见性规则

| 状态 | 关联线 |
|---|---|
| Global Overview | 不显示 |
| Region Zoom | 不显示 |
| Node Focus | 不显示（等按 R） |
| Relation Reveal | 仅显示当前焦点 entity 的关联线 |

修改 `CosmosView.vue`：`animate()` 中根据 state 决定是否跳过关联线的渲染。`createAssociationLines` 只在 `enterRelation()` 中调用（已满足）。

## 6. 左侧 LifelinePanel 联动

### 6.1 点击 lifeline → 驱动 3D 场景

在 `LifelinePanel.vue` 中，点击 lifeline 名称时 emit 事件：

```typescript
const emit = defineEmits<{
  (e: 'focus-lifeline', lifelineId: string): void
}>()
```

在 `CosmosView.vue` 中监听并触发 Region Zoom：

```typescript
function onPanelFocusLifeline(lifelineId: string) {
  store.transition({ kind: 'region_zoom', lifeline_id: lifelineId })
}
```

### 6.2 当前 lifeline 高亮

`LifelinePanel` 接收当前 state 作为 prop，高亮 `region_zoom` 或 `node_focus` 中涉及的 lifeline：

```typescript
// LifelinePanel 中
const activeLifelineId = computed(() => {
  const s = props.state
  if (s.kind === 'region_zoom') return (s as any).lifeline_id
  if (s.kind === 'node_focus' || s.kind === 'relation_reveal') {
    // 从 entity 反查其 lifeline_id
    return store.data?.entities.find(e => e.id === (s as any).entity_id)?.lifeline_id
  }
  return null
})
```

当前活跃的 lifeline 在面板中用 `--accent` 色高亮（加左边框或文字颜色变化）。

## 7. 标签锚定改进

### 7.1 标签偏移

CSS2DObject 目前直接放在节点位置上，文字和节点重叠。加微小偏移：

```typescript
// R1/R2: 标签在节点外侧（沿径向偏移）
const offset = n.position.clone().normalize().multiplyScalar(0.08)
obj.position.copy(n.position.clone().add(offset))

// R3: 标签在节点上方
obj.position.copy(n.position.clone().add(new THREE.Vector3(0, 0.03, 0)))
```

### 7.2 label sync 跟随 lerp

`syncPositions()` 已在 007b 实现。每帧从 mesh.position 同步到 CSS2DObject.position。偏移在创建时固化，sync 只做位置拷贝（偏移量不重复加）。

做法：`create()` 时把偏移后的初始位置写入 label；`syncPositions()` 中直接用 mesh.position + 偏移。简单方式是在创建时额外存 `labelOffset`：

```typescript
// create 时：
const labelOffset = n.layer <= 2
  ? n.position.clone().normalize().multiplyScalar(0.08)
  : new THREE.Vector3(0, 0.03, 0)
obj.position.copy(n.position.clone().add(labelOffset))
obj.userData = { nodeId: n.id, layer: n.layer, parentId: n.parentId, labelOffset }

// syncPositions 时：
const offset = e.object.userData.labelOffset as THREE.Vector3 | undefined
if (pos && offset) e.object.position.copy(pos.clone().add(offset))
```

## 8. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/public/mock/cosmos.json` | **新建**：40-80 节点 mock 数据 | +200 行 |
| `frontend/src/cosmos/layout.ts` | 半径调整 + 节点尺寸常量导出 | +15 行 |
| `frontend/src/cosmos/scene.ts` | 节点尺寸按层放大、R2 轨道环、`ghostExcept()` 统一 ghost、dispose 清理 R2 环 | +50 行 |
| `frontend/src/cosmos/labels.ts` | 标签径向偏移 + sync 保持偏移 | +15 行 |
| `frontend/src/views/CosmosView.vue` | 状态机重写：Region Zoom ghost、Node Focus 保持 007b、Relation Reveal 仅局部、面包屑联动 | +80 -40 行 |
| `frontend/src/components/LifelinePanel.vue` | 点击联动 emit + 活跃 lifeline 高亮 | +30 行 |
| `frontend/src/cosmos/types.ts` | 可能加 mock 加载相关 | +5 行 |

## 9. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — Global Overview
# - 打开 Atlas，看到球形层级结构
# - 明显区分 R0(中心亮点)、R1(大彩色球)、R2(中灰球)、R3(小几何体)
# - 两条轨道环可见（R1/R2）
# - R1 lifeline 标签可见，其余标签不杂乱
# - 旋转/缩放流畅，球体占屏幕主要区域
# - 无关联线显示

# 3. 人肉验证 — Region Zoom
# - 点击 Rust 学习（R1 大球）
# - 其他 lifeline 及其子节点淡出为 ghost
# - Rust 学习的 R2 子主题和 R3 entity 正常显示
# - NOT 同级横线排列——其他 lifeline 仍在球面原位的 ghost 位置
# - Esc → 回到 Global Overview
# - 面包屑路径正确

# 4. 人肉验证 — Node Focus
# - 在 Region Zoom 中点击具体 entity
# - 焦点 entity 居中，兄弟/关联弧形排列
# - 无关节点 ghost 但可见（方向感）
# - Esc → 回到 Region Zoom
# - 按 R → 显示局部关联线
# - 再按 Esc → 关联线消失，回到 Node Focus

# 5. 人肉验证 — 左侧面板联动
# - 点击 LifelinePanel 中的 lifeline → 3D 场景切入 Region Zoom
# - 当前 lifeline 在面板中高亮
# - 回到 Global Overview 后高亮消失

# 6. 人肉验证 — labels
# - 标签锚定在节点旁，不漂浮
# - R3 entity 标签仅在 Region Zoom / Node Focus 出现
# - 缩放/旋转时标签跟随节点
```

## 10. 禁止事项

- 不做粒子/星空/光斑/发光特效/球面纹理
- 不额外引入 npm 依赖
- 不修改后端任何文件
- 不做 evidence 抽屉
- 全局不显示关联线（只 relation_reveal 中显示局部）
- 不改变 mock 数据对后端 API 的兼容性（id 前缀规则不变）
- 不要把 Region Zoom 做成同级横线排列

## 11. 提交风格

```
add: 008 — Atlas 空间隐喻修正（球面层级 + 状态机重定义）

- mock 数据扩展至 6+ lifeline、50+ entity，验证球面结构
- 半径扩大，节点尺寸 R1 0.05/R2 0.03/R3 0.02，层级一眼可辨
- 新增 R2 轨道环，球壳结构可视化
- 状态机重定义：Global Overview → Region Zoom(ghost非目标区域) → Node Focus(007b星座) → Relation Reveal(仅局部关联)
- LifelinePanel 点击联动 3D 场景 + 高亮当前 lifeline
- 标签径向偏移锚定节点，syncPositions 保持跟随
```

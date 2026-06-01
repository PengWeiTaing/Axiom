# 020a — Lifeline Panel as Spatial Index

> LifelinePanel 当前是"数据管理"面板（CRUD 为主）。本轮将其升级为 Atlas 的**空间索引**：面板反映 3D 球面的层级关系，点击面板项驱动 3D 相机定位。不做拖拽、编辑、删除——那些属于 020b。

## 1. 范围

纯前端，3 个文件改动。无后端、无新依赖。

| 文件 | 改动 | 估算 |
|---|---|---|
| `LifelinePanel.vue` | 统计摘要 + 种类细分 + entity 点击跳转 + 空状态引导 | +70 行 |
| `CosmosView.vue` | 接收 `focus-entity` + 3D badge 计数 Map | +30 行 |
| `scene.ts` | R1/R2 CSS2D entity 数量 badge | +35 行 |

**总计约 135 行**。

## 2. 产品边界

- **做**：面板 → 3D 的双向联动（面板点击驱动 3D 相机，3D 状态反映到面板高亮）
- **不做**：拖拽排序、lifeline 编辑/删除、右键菜单、后端接口、数据库改动
- **面板定位**：空间索引，不是全功能数据管理器
- **3D 定位**：空间结构为主，badge 克制（只有数字，无颜色细分）

## 3. 现状分析

以下功能**已存在**，本轮只做微调：

| 功能 | 状态 | 本轮动作 |
|---|---|---|
| lifeline 行显示 entity 总数 badge | `entityCount()` + `.badge` 已实现 | 不动 |
| 展开 lifeline 显示 entity 列表 | `entitiesFor()` + 模板渲染已实现 | 不动 |
| 点击 lifeline → Region Zoom + ghost | `onPanelFocusLifeline` + `ghostExcept` 已实现 | 不动 |
| 面板高亮当前 lifeline | `isCurrentLifeline()` + `.active` CSS 已实现 | 不动 |
| 空状态文字 | 一行"暂无 lifeline" | **需要改进** |
| entity 行点击 → 无反应 | 无 emit | **需要新增** |

以下功能**全新**：

| 功能 | 说明 |
|---|---|
| 面板顶部统计摘要 | `N lifeline · M entity` |
| 展开后种类细分 | `T:3 M:2 D:1 I:0` 仅面板，不进 3D |
| 3D 节点 entity 数量 badge | R1/R2 CSS2D 小数字，仅总数 |
| 面板 entity 点击 → 3D 跳转 | emit `focus-entity`，CosmosView 处理 |

## 4. 面板顶部统计摘要

### 4.1 位置

在 `panel-header` 行（"Lifeline" 标题 + "+ 新建" 按钮）下方加一行。

### 4.2 内容

```
┌─ Lifeline ──────────────────────────┐
│  7 lifeline · 42 entity    [+ 新建] │  ← 这行已有
│  T:12 M:18 D:8 I:4                  │  ← 新增：全局种类细分
│  ─────────────────────────────────  │  ← 分隔线
│  ▼ 健康  T:2 M:1 D:0 I:1 (4)       │
│  ...                                │
```

全局种类细分的颜色遵循 entity kind 约定：
- T → `var(--accent)`
- M → `var(--text-2)`
- D → `var(--warm)`
- I → `var(--text-3)`

### 4.3 实现

```typescript
const stats = computed(() => {
  if (!store.data) return { lifelines: 0, entities: 0, byKind: { task: 0, memory: 0, decision: 0, item: 0 } }
  const byKind = { task: 0, memory: 0, decision: 0, item: 0 }
  for (const e of store.data.entities) byKind[e.kind]++
  return { lifelines: store.data.lifelines.length, entities: store.data.entities.length, byKind }
})
```

模板中：
```html
<div class="stats-row">
  <span>{{ stats.lifelines }} lifeline · {{ stats.entities }} entity</span>
  <span class="stats-kinds">
    <span class="kind-t">T:{{ stats.byKind.task }}</span>
    <span class="kind-m">M:{{ stats.byKind.memory }}</span>
    <span class="kind-d">D:{{ stats.byKind.decision }}</span>
    <span class="kind-i">I:{{ stats.byKind.item }}</span>
  </span>
</div>
```

`stats-kinds` 字体大小 `var(--fs-1)`，各 kind span 之间用空格或 `·` 分隔。

## 5. 展开 lifeline 后显示种类细分

### 5.1 内容

在展开的 lifeline 行右侧（或 entity 列表上方）显示该 lifeline 内部的种类细分：

```
  ▼ Rust 学习  T:3 M:2 D:1 I:0 (6)   ← 种类细分在 lifeline 名称行
    T  所有权与借用的深层理解
    T  Trait 系统的实际应用
    M  Rust 内存管理笔记
```

### 5.2 实现

新增 `entityCountsByKind(lifelineId)` 函数，返回 `{ task: number, memory: number, decision: number, item: number }`。

仅当该 lifeline 展开（`isExpanded(id)`）时渲染种类细分标签，避免每行都计算/显示。

颜色规则与全局统计一致：
- T → `var(--accent)` 
- M → `var(--text-2)` 
- D → `var(--warm)` 
- I → `var(--text-3)`
- 每种数量为零时也显示（`T:0`），保持格式一致

### 5.3 注意事项

- 种类细分**仅出现在 LifelinePanel**，不进入 3D 场景
- 种类颜色与 3D node 颜色一致（016 已有的 kind 着色），用户能自然关联

## 6. Entity 点击跳转 3D

### 6.1 问题

LifelinePanel 展开的 entity 列表，点击 entity 行目前无反应。用户期望点击后 3D 相机飞向该 entity 并进入 node_focus。

### 6.2 LifelinePanel 改动

新增 emit：

```typescript
const emit = defineEmits<{
  (e: 'focus-lifeline', lifelineId: string): void  // 已有
  (e: 'focus-entity', entityId: string): void       // 新增
}>()
```

entity 行（`.entity-row`）已有 `@click` 吗？当前代码中 entity 行没有点击事件。需要给 entity 行加 `@click="emit('focus-entity', ent.id)"`。

同时给 entity 行加 `cursor: pointer` 样式，hover 时背景变 `var(--surface-2)`。

注意：entity 行内的卸载按钮（×）不应触发 focus-entity，需要 `@click.stop` 阻止冒泡。

### 6.3 CosmosView 改动

新增处理函数：

```typescript
function onPanelFocusEntity(entityId: string) {
  if (!store.data) return
  const ent = store.data.entities.find(e => e.id === entityId)
  if (!ent) return
  store.transition({ kind: 'node_focus', entity_kind: ent.kind, entity_id: entityId } as any)
}
```

模板中绑定：

```html
<LifelinePanel
  v-if="!showSearch"
  @focus-lifeline="onPanelFocusLifeline"
  @focus-entity="onPanelFocusEntity"
/>
```

`node_focus` 的相机飞行动画、halo、星座布局已由 `onStateChange` 的 `s.kind === 'node_focus'` 分支处理（CosmosView.vue:860-888），无需额外实现。

### 6.4 面板中高亮当前 entity

当前 `isCurrentLifeline()` 通过匹配 `activeLifelineId` 高亮 lifeline 行。类似地，需要一个 `activeEntityId` computed 来高亮 entity 行。

```typescript
const activeEntityId = computed<string | null>(() => {
  const s = store.state
  if (s.kind === 'node_focus' || s.kind === 'relation_reveal') {
    return (s as any).entity_id ?? null
  }
  return null
})
```

entity 行模板中使用：

```html
<div
  v-for="ent in entitiesFor(node.lifeline.id)"
  :key="ent.id"
  class="entity-row"
  :class="{ active: activeEntityId === ent.id }"
  :style="{ paddingLeft: (node.depth * 16 + 28) + 'px' }"
  @click="emit('focus-entity', ent.id)"
>
```

`.entity-row.active` 样式：背景 `var(--surface-2)` + 文字颜色 `var(--text-1)`。

## 7. 空状态引导

### 7.1 当前

```
暂无 lifeline，点击「+ 新建」创建
```

### 7.2 改进后

```html
<div v-if="tree.length === 0 && !creating" class="empty">
  <div class="empty-icon">◇</div>
  <div class="empty-title">暂无 Lifeline</div>
  <div class="empty-desc">
    Lifeline 是实体分类的主线，例如"健康""学习""工作"。<br />
    创建后实体将分布在 3D 球面上。
  </div>
  <button class="btn-text" @click="creating = true">+ 创建第一个 Lifeline</button>
</div>
```

样式：
- `.empty-icon`：`font-size: 24px; color: var(--text-4); margin-bottom: var(--s-2);`
- `.empty-title`：`font-size: var(--fs-3); color: var(--text-2); margin-bottom: var(--s-1);`
- `.empty-desc`：`font-size: var(--fs-2); color: var(--text-3); text-align: center; margin-bottom: var(--s-2);`
- `.empty`：`display: flex; flex-direction: column; align-items: center; padding: var(--s-3) 0;`

不使用 emoji，用 `◇` 字符，颜色用 `--text-4`。

## 8. 3D 节点 Entity 数量 Badge

### 8.1 内容

R1 和 R2 的 3D 节点下方显示克制的小数字 badge，表示该 lifeline 直接挂载的 entity 数量。

```
    健康
     4       ← 小号灰色数字，无括号，无颜色
```

### 8.2 约束

- **只显示数字**，不显示 T/M/D/I 细分——细分只在面板
- **只显示 R1/R2**（layer 1 和 2），R0 和 R3 不显示
- **克制样式**：`font-size: 9px; color: var(--text-4)`，不加背景，不闪烁
- 数字为 0 时仍然显示（"0"），表示该 lifeline 为空

### 8.3 实现

在 `scene.ts` 的 label 创建逻辑中（或附近）：

```typescript
export function createCountLabel(node: LayoutNode, count: number, container: THREE.Object3D): CSS2DObject | null {
  if (node.layer !== 1 && node.layer !== 2) return null
  const div = document.createElement('div')
  div.textContent = String(count)
  div.style.cssText = 'font-size:9px;color:var(--text-4);font-family:var(--font-mono);text-align:center;'
  const label = new CSS2DObject(div)
  label.position.copy(node.position.clone().add(new THREE.Vector3(0, -0.07, 0)))
  label.userData.countLabel = true
  container.add(label)
  return label
}
```

或者直接在 scene.ts 现有 label 创建处追加一个 CSS2DObject，不抽函数也可以——由 DeepSeek 判断哪种更整洁。

### 8.4 计数来源

CosmosView 在 start() 中计算 `Map<lifelineId, count>`，传给 scene 构建函数：

```typescript
const entityCountByLifeline = new Map<string, number>()
for (const e of store.data.entities) {
  entityCountByLifeline.set(e.lifeline_id, (entityCountByLifeline.get(e.lifeline_id) || 0) + 1)
}
```

## 9. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 面板统计摘要
# - 打开 Atlas → LifelinePanel 顶部显示 "7 lifeline · 42 entity"
# - 下方显示 "T:12 M:18 D:8 I:4"
# - 创建新 lifeline → 数字更新
# - 删除 entity → 数字更新

# 3. 人肉验证 — 种类细分
# - 展开一个 lifeline → 名称行右侧显示 "T:2 M:1 D:0 I:1 (4)"
# - 种类颜色：T=accent 色, M=text-2, D=warm, I=text-3
# - 折叠 lifeline → 种类细分隐藏（只显示总数 badge）
# - 未展开的 lifeline 不显示种类细分

# 4. 人肉验证 — Entity 点击跳转
# - 展开 lifeline → 点击某个 entity 行
# - 3D 相机飞向该 entity → 进入 node_focus 状态
# - NodeDetailCard 出现，显示该 entity 详情
# - 面板中该 entity 行高亮（active 样式）
# - 点击另一 lifeline 的 entity → 切换焦点

# 5. 人肉验证 — 面板高亮同步
# - 在 3D 球面点击 R3 entity → node_focus
# - 面板中对应的 entity 行高亮
# - 按 Esc 返回 region_zoom → entity 高亮消失，lifeline 高亮保持
# - 面包屑/标题反映当前位置

# 6. 人肉验证 — 空状态引导
# - 删除所有 lifeline → 面板显示引导
# - 包括：◇ 图标、"暂无 Lifeline"、说明文字、"创建第一个"按钮
# - 点击"创建第一个 Lifeline"→ 新建表单展开

# 7. 人肉验证 — 3D Badge
# - R1 节点旁边显示 entity 数量数字
# - R2 节点旁边同样显示
# - R0（中心点）无 badge
# - R3（entity）无 badge
# - Badge 为小号灰色数字，不显眼
# - 数字为 0 时仍显示 "0"

# 8. 人肉验证 — 不破坏
# - 现有 lifeline 新建功能正常
# - 现有 entity 搜索 + 挂载正常
# - entity 卸载按钮（×）正常（不触发 focus-entity）
# - Ctrl+K / ? 快捷键正常
# - 路径查找正常
```

## 10. 禁止事项

- 不做拖拽排序（HTML5 drag API 或任何拖拽库）
- 不写 `order_index` 到后端
- 不做 lifeline 编辑/删除
- 不做右键菜单
- 不新增后端接口
- 不改数据库
- 不在 tokens.css 新增颜色变量
- 不在 3D badge 中显示 T/M/D/I 细分
- 不用 emoji（用 `◇` `·` 等 ASCII/Unicode 字符即可）
- 不新增 npm 依赖

## 11. 提交风格

```
add: 020a — Lifeline Panel 升级为空间索引

- LifelinePanel: 顶部统计摘要（N lifeline · M entity + 全局种类细分）
- LifelinePanel: 展开后显示该 lifeline 种类细分（T/M/D/I）
- LifelinePanel: entity 行点击跳转 3D node_focus + 高亮当前 entity/activeLifeline
- LifelinePanel: 空状态引导（图标 + 说明 + 快速创建按钮）
- scene: R1/R2 3D 节点 CSS2D entity 数量 badge
```

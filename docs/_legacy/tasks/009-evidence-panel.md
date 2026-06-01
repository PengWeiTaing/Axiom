# 009 — 关联证据面板

> 当前 relation_reveal 模式下，悬停关联线只显示一段 tooltip 摘要，点击无反应。NodeDetailCard 的关联列表只看得到类型/置信度/状态，看不到证据。本轮给每条关联补全证据查看能力。

## 1. 范围

只改前端。不动后端 API（`CosmosAssociation.evidence` 字段已存在于 types.ts 和 API 返回值中）。

**核心目标**：
- 3D 关联线可点击 → 在 NodeDetailCard 中展开该关联的证据
- NodeDetailCard 关联行可点击 → 展开/收起证据详情
- mock 数据补上 realistic evidence，让功能可测

## 2. 产品边界

- 不做新面板/弹窗/抽屉组件 — 证据在 NodeDetailCard 内联展开
- 不修改 `CosmosAssociation` 类型定义（evidence 字段已存在）
- 不做关联线高亮/选中态动画（本轮只做点击交互）
- 不添加 npm 依赖

## 3. 交互设计

### 3.1 3D 关联线点击

- **触发**：在 relation_reveal 模式下点击 3D 关联线
- **行为**：设置 `store.selectedAssocId` 为该关联 ID，NodeDetailCard 中对应行展开显示证据
- **再次点击同一根线**：取消选中（收起证据）
- **点击另一根线**：切换到新关联
- **点击空白区域**：取消选中（收起证据），同时走现有回退逻辑（Esc/空白=回到 node_focus）
- **点击 3D 节点**：走现有 node focus 切换逻辑，同时清除选中

### 3.2 NodeDetailCard 关联行点击

- **触发**：点击关联行（非 accept/reject 按钮区域）
- **行为**：切换展开/收起证据，同时 `store.selectedAssocId` 同步（展开时设置，收起时清空）
- **视觉**：展开的行左边框加粗或背景微亮

### 3.3 证据展示内容

展开后显示：

```
┌──────────────────────────────────────────────┐
│ [因果] 每天跑步 30 分钟           88% ✓ ✗   │  ← 现有行（始终显示）
│ ┌──────────────────────────────────────────┐ │
│ │ 证据                         共 2 条     │ │
│ │                                          │ │
│ │ ▸ "运动习惯与血压控制存在直接关联..."    │ │
│ │   来源: health_log   权重: 0.8           │ │
│ │                                          │ │
│ │ ▸ "有氧运动可降低收缩压 5-8mmHg"        │ │
│ │   来源: medical_ref   权重: 0.6           │ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

- 每条 evidence 显示：`excerpt`（截断 120 字符）、`type`（来源类型标签）、`weight`（权重数值）
- 如果 `evidence` 为空数组：显示 "暂无证据详情"

### 3.4 选中状态清除

以下情况清除 `selectedAssocId`：
- 状态切换（region_zoom / global_overview / 切换到另一个 entity 的 node_focus）
- 按 R 退出 relation_reveal
- 点击 3D 空白区域
- 点击另一根关联线（替换为新 ID）

## 4. 数据流

```
3D line click ──→ store.selectAssociation(id) ──→ NodeDetailCard 展开对应行
                                                      │
NodeDetailCard row click ──→ store.selectAssociation(id) ──┘
                                                      │
State change / Esc / R ──→ store.selectAssociation(null) ──→ 收起
```

## 5. Store 改动

`frontend/src/stores/cosmos.ts` 中新增：

```typescript
const selectedAssocId = ref<string | null>(null)

function selectAssociation(id: string | null) {
  selectedAssocId.value = id
}
```

在 `transition()` 中自动清除（状态切换时）：

```typescript
function transition(next: CosmosState) {
  emit(`leave_${state.value.kind}`, state.value)
  state.value = next
  selectedAssocId.value = null  // ← 新增
  emit(`enter_${next.kind}`, next)
}
```

导出中加入 `selectedAssocId` 和 `selectAssociation`。

## 6. CosmosView 改动

### 6.1 click handler 增加关联线检测

在现有节点点击逻辑之前，插入关联线 raycast：

```typescript
canvasRef.value.addEventListener('click', (e: MouseEvent) => {
  if (!sceneObjs) return
  mouse.x = (e.offsetX / canvasRef.value!.clientWidth) * 2 - 1
  mouse.y = -(e.offsetY / canvasRef.value!.clientHeight) * 2 + 1
  raycaster.setFromCamera(mouse, sceneObjs.camera)

  // 1. 先检测关联线（仅在 relation_reveal 模式下）
  if (store.state.kind === 'relation_reveal' && assocLines.length > 0) {
    const lineHits = raycaster.intersectObjects(assocLines.map(l => l.line))
    if (lineHits.length > 0) {
      const hitLine = lineHits[0].object
      const al = assocLines.find(a => a.line === hitLine)
      if (al) {
        // 点击同一根线 → 取消选中；不同线 → 切换
        if (store.selectedAssocId === al.data.id) {
          store.selectAssociation(null)
        } else {
          store.selectAssociation(al.data.id)
        }
        return
      }
    }
  }

  // 2. 再检测节点（现有逻辑）
  const hits = raycaster.intersectObjects(sceneObjs.pickables)
  if (hits.length === 0) {
    store.selectAssociation(null)  // ← 新增：清除选中
    // 现有回退逻辑...
    return
  }
  // 现有节点点击逻辑...
  store.selectAssociation(null)  // ← 新增：切换节点时清除选中
})
```

### 6.2 mousemove handler

现有逻辑已正确处理 tooltip。关联线被点击后，tooltip 可以保留（不冲突）。

## 7. NodeDetailCard 改动

### 7.1 展开状态

```typescript
// 读取 store 中的选中关联 ID
const expandedAssocId = computed<string | null>(() => store.selectedAssocId)
```

### 7.2 模板改动

关联行增加点击事件和展开区域：

```html
<div
  v-for="a in entityAssociations"
  :key="a.id"
  class="assoc-row"
  :class="{ pending: a.status === 'pending', expanded: expandedAssocId === a.id }"
>
  <!-- 现有行内容：类型标签 + 目标 + 置信度 + 状态 + 操作 -->
  <span class="rel-badge" ...>[{{ relLabel(a.relation_type) }}]</span>
  <span class="assoc-target" @click.stop="switchFocus(a)">...</span>
  <span class="confidence">...</span>
  <span class="status-badge">...</span>
  <span v-if="a.status === 'pending'" class="assoc-actions">...</span>

  <!-- 新增：展开/收起按钮 -->
  <button
    class="btn-expand"
    @click.stop="store.selectedAssocId === a.id ? store.selectAssociation(null) : store.selectAssociation(a.id)"
  >{{ expandedAssocId === a.id ? '▾' : '▸' }}</button>

  <!-- 新增：证据展开区域 -->
  <div v-if="expandedAssocId === a.id" class="evidence-block">
    <div class="evidence-title">证据 ({{ a.evidence?.length || 0 }} 条)</div>
    <div v-if="!a.evidence || a.evidence.length === 0" class="no-evidence">暂无证据详情</div>
    <div v-for="(ev, i) in a.evidence" :key="i" class="evidence-item">
      <div class="evidence-excerpt">"{{ ev.excerpt.slice(0, 120) }}{{ ev.excerpt.length > 120 ? '…' : '' }}"</div>
      <div class="evidence-meta">
        <span class="evidence-type">{{ ev.type }}</span>
        <span class="evidence-weight">权重: {{ Math.round(ev.weight * 100) }}%</span>
      </div>
    </div>
  </div>
</div>
```

### 7.3 样式

```css
.assoc-row.expanded {
  border-left: 2px solid var(--accent);
  background: var(--surface-2);
}

.btn-expand {
  background: none;
  border: none;
  color: var(--text-4);
  cursor: pointer;
  font-size: 10px;
  padding: 0 2px;
  flex-shrink: 0;
}

.evidence-block {
  grid-column: 1 / -1;
  padding: var(--s-1) var(--s-2);
  margin-top: 2px;
  background: var(--surface-0);
  border-radius: var(--r-1);
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
}

.evidence-title {
  font-size: var(--fs-1);
  color: var(--text-4);
}

.no-evidence {
  font-size: var(--fs-1);
  color: var(--text-4);
  font-style: italic;
}

.evidence-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.evidence-excerpt {
  font-size: var(--fs-1);
  color: var(--text-2);
  line-height: 1.4;
}

.evidence-meta {
  display: flex;
  gap: var(--s-2);
  font-size: 10px;
  color: var(--text-4);
}

.evidence-type {
  border: 1px solid var(--text-4);
  border-radius: var(--r-1);
  padding: 0 3px;
}

.evidence-weight {
  color: var(--text-4);
}
```

注意：`.assoc-row` 当前使用 `display: flex`，展开的 `evidence-block` 需要用不同布局。建议将 `.assoc-row` 改为 `display: grid` 或让 evidence-block 单独起一行（`flex-basis: 100%` 或改用 grid 布局）。

## 8. Mock 数据补证据

`frontend/public/mock/cosmos.json` 中 10 条 association 的 `evidence` 从 `[]` 改为 realistic 数据：

```json
"evidence": [
  { "type": "co_occurrence", "excerpt": "用户在相近时间段内同时记录了血压数据和跑步任务，共现频率显著高于随机基线（p<0.01）", "weight": 0.85 },
  { "type": "semantic", "excerpt": "两条记录的语义向量余弦相似度 0.72，同属「健康管理」主题域", "weight": 0.70 }
]
```

每条关联配 1-3 条 evidence。不同类型用不同 `type` 标签：
- `co_occurrence` — 共现统计
- `semantic` — 语义相似
- `temporal` — 时间序列
- `causal_hint` — 因果模式
- `manual` — 人工标注

至少 6 条关联有 ≥2 条 evidence，用于验证多条证据展示。

实现者自行编 realistic 证据文本（中文，10-40 字），不要照抄示例。

## 9. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/stores/cosmos.ts` | 新增 `selectedAssocId` + `selectAssociation()` + transition 中清除 | +10 行 |
| `frontend/src/views/CosmosView.vue` | click handler 增加关联线 raycast + 选中逻辑 | +20 行 |
| `frontend/src/components/cosmos/NodeDetailCard.vue` | 关联行展开按钮 + evidence-block + 样式 | +80 行 |
| `frontend/public/mock/cosmos.json` | 10 条 association 补 evidence 数组 | +80 行 |

## 10. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 3D 关联线点击
# - 进入 Atlas → 点击 R1 lifeline → 点击 R3 entity → 按 R
# - 悬停关联线：tooltip 显示（现有功能，不应破坏）
# - 点击关联线：NodeDetailCard 中对应关联行展开，显示证据
# - 再次点击同一根线：收起
# - 点击另一根线：切换到新关联的证据
# - 点击空白区域：证据收起 + 回到 node_focus
# - 按 Esc：证据收起 + 回到 node_focus

# 3. 人肉验证 — NodeDetailCard 关联行点击
# - 在 node_focus 或 relation_reveal 状态
# - 点击关联行（非 accept/reject 按钮）：展开证据
# - 再次点击：收起
# - 展开状态下点另一行：切换
# - 展开状态下点 accept/reject：正常操作 + 证据可保持展开

# 4. 人肉验证 — mock 数据
# - 用 mock 数据启动（API 不可用时），关联行展开能看到多条 realistic 证据
# - evidence 为空时显示 "暂无证据详情"

# 5. 人肉验证 — 状态切换清理
# - 在 relation_reveal 中展开某条关联的证据
# - 按 Esc 回到 node_focus：证据应自动收起
# - 按 Esc 回到 region_zoom：NodeDetailCard 隐藏
# - 进入另一个 entity 的 node_focus：证据不残留
```

## 11. 禁止事项

- 不做新弹窗/抽屉/浮层组件
- 不做关联线高亮/发光/脉冲动画
- 不修改 `CosmosAssociation` 类型定义
- 不修改后端任何文件
- 不破坏现有 mousemove tooltip 功能
- 不在 global_overview / region_zoom 状态下处理关联线点击
- 不修改 `.assoc-row` 中 accept/reject 按钮的行为

## 12. 提交风格

```
add: 009 — 关联证据面板（3D 线点击 + NodeDetailCard 内联展开）

- store 新增 selectedAssocId / selectAssociation，状态切换自动清除
- 3D 关联线可点击：raycast 检测 → 选中关联 → NodeDetailCard 展开证据
- NodeDetailCard 关联行增加展开按钮 + evidence-block 内联展示
- mock 数据 10 条关联补 realistic evidence（co_occurrence/semantic/temporal/causal_hint/manual）
```

# 029 — 3D 关联筛选

> 随着知识图谱增长，3D 场景中的关联线越来越密集。当前所有 accepted 关联都渲染在场景中，没有按类型或状态的筛选能力。本轮将 LegendBar 升级为可交互的筛选器：点击图例项切换该类型的可见性，同时支持按关联状态（accepted/pending/rejected）筛选。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `LegendBar.vue` | 可点击切换 + 状态筛选 + active/inactive 视觉 | +60 行 |
| `CosmosView.vue` | 关联可见性控制逻辑 + 响应筛选变化 | +30 行 |

**总计约 90 行**。纯前端，操作 `assocLines[i].line.visible`。

## 2. 产品边界

- **做**：按关联类型筛选（因果/共现/张力/衍生，独立 toggle）、按状态筛选（accepted/pending/rejected）、全部显示/全部隐藏快捷操作、"已筛选"视觉提示
- **不做**：按信心度范围筛选（滑块）、筛选条件持久化、筛选条件导出、按 lifeline 筛选、关联搜索
- 默认全部可见。筛选变化即时生效（`line.visible` 切换 + `line.material.opacity` 配合）

## 3. 交互设计

### 3.1 LegendBar 升级

现有 LegendBar 是静态图例。升级后每个图例项可点击：

```
节点  ■ 任务  ● 记忆  ◆ 决策  ▲ 条目  |  关联  — 因果  — 共现  — 张力  — 衍生
                                          ↑ 点击切换
```

点击"因果"→ 所有因果关联线隐藏 → "因果"标签变灰/加删除线。
再次点击 → 恢复显示。

### 3.2 状态筛选

LegendBar 右侧增加三个小开关：

```
[全部关联] [accepted] [pending] [rejected]
```

- 默认全部选中
- 点击切换该状态的显示/隐藏
- "全部关联"一键全开/全关
- 选中状态用边框高亮，未选中变灰

### 3.3 视觉反馈

- **active**：正常颜色（现状）
- **inactive**：opacity 0.3，加删除线或灰度滤镜
- 当所有类型被隐藏时，显示提示"所有关联已隐藏"
- LegendBar 在有任何筛选生效时，显示一个小的重置按钮"重置"

### 3.4 筛选状态

```typescript
interface AssocFilter {
  types: { causal: boolean; co_occurrence: boolean; tension: boolean; derived_from: boolean }
  statuses: { accepted: boolean; pending: boolean; rejected: boolean }
}
```

默认值：全部 `true`。

## 4. 实现

### 4.1 LegendBar — 可点击图例

新增 props 和 emits：

```typescript
const props = defineProps<{
  showAssoc: boolean
  filter: AssocFilter
}>()

const emit = defineEmits<{
  (e: 'update:filter', filter: AssocFilter): void
}>()

function toggleType(t: keyof AssocFilter['types']) {
  const next = { ...props.filter }
  next.types[t] = !next.types[t]
  emit('update:filter', next)
}

function toggleStatus(s: keyof AssocFilter['statuses']) {
  const next = { ...props.filter }
  next.statuses[s] = !next.statuses[s]
  emit('update:filter', next)
}

function toggleAll() {
  const allOn = Object.values(props.filter.types).every(v => v) &&
                Object.values(props.filter.statuses).every(v => v)
  const next: AssocFilter = {
    types: { causal: !allOn, co_occurrence: !allOn, tension: !allOn, derived_from: !allOn },
    statuses: { accepted: !allOn, pending: !allOn, rejected: !allOn },
  }
  emit('update:filter', next)
}

function resetFilter() {
  emit('update:filter', {
    types: { causal: true, co_occurrence: true, tension: true, derived_from: true },
    statuses: { accepted: true, pending: true, rejected: true },
  })
}

const hasActiveFilter = computed(() => {
  return !Object.values(props.filter.types).every(v => v) ||
         !Object.values(props.filter.statuses).every(v => v)
})
```

模板改动：每个图例项包装为 `<span>` 或 `<button>`，绑定 `@click`：

```html
<span class="legend-item" :class="{ inactive: !filter.types.causal }" @click="toggleType('causal')">
  <span class="line-sample causal" /> 因果
</span>
```

状态筛选行（新建）：

```html
<div class="legend-sep">|</div>
<div class="legend-section">
  <span class="legend-item" :class="{ inactive: !allOn }" @click="toggleAll">全部</span>
  <span class="legend-item" :class="{ inactive: !filter.statuses.accepted }" @click="toggleStatus('accepted')">已确认</span>
  <span class="legend-item" :class="{ inactive: !filter.statuses.pending }" @click="toggleStatus('pending')">待确认</span>
  <span class="legend-item" :class="{ inactive: !filter.statuses.rejected }" @click="toggleStatus('rejected')">已拒绝</span>
  <span v-if="hasActiveFilter" class="legend-reset" @click="resetFilter">重置</span>
</div>
```

### 4.2 样式

```css
.legend-item {
  cursor: pointer;
  transition: opacity 0.2s;
}
.legend-item:hover { opacity: 0.8; }
.legend-item.inactive {
  opacity: 0.35;
  text-decoration: line-through;
}
.legend-reset {
  color: var(--accent);
  cursor: pointer;
  font-size: 10px;
  margin-left: var(--s-1);
}
```

### 4.3 CosmosView — 筛选逻辑

```typescript
const assocFilter = ref<AssocFilter>({
  types: { causal: true, co_occurrence: true, tension: true, derived_from: true },
  statuses: { accepted: true, pending: true, rejected: true },
})

function applyAssocFilter() {
  for (const al of assocLines) {
    const type = al.data.relation_type as keyof AssocFilter['types']
    const status = al.data.status as keyof AssocFilter['statuses']
    const typeVisible = assocFilter.value.types[type] ?? true
    const statusVisible = assocFilter.value.statuses[status] ?? true
    al.line.visible = typeVisible && statusVisible
  }
}

watch(assocFilter, () => applyAssocFilter(), { deep: true })
```

在 `createAssociationLines` 之后调用 `applyAssocFilter()`。

### 4.4 代码量

约 +90 行（LegendBar +60, CosmosView +30）。

## 5. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 类型筛选
# - 打开 Atlas，LegendBar 显示在图例区
# - 点击"因果"→ 所有因果关联线消失 → "因果"标签变灰
# - 再次点击"因果"→ 因果线恢复
# - 依次测试"共现""张力""衍生"

# 3. 人肉验证 — 状态筛选
# - 点击"已确认"→ 所有 accepted 关联线消失
# - 点击"待确认"→ pending 关联线消失（虚线也会消失）
# - 再次点击恢复
# - "全部"按钮一键全关/全开

# 4. 人肉验证 — 重置
# - 关闭几个类型 → "重置"按钮出现
# - 点击"重置"→ 全部恢复可见
# - "重置"按钮消失

# 5. 人肉验证 — 组合筛选
# - 关闭"因果"类型 + 关闭"待确认"状态
# - accepted 的因果线隐藏（状态符合但类型不符合）
# - pending 的非因果线隐藏（类型符合但状态不符合）
# - accepted 的非因果线显示（两个条件都满足）

# 6. 人肉验证 — 不破坏
# - 路径高亮不受筛选影响（highlight 直接操作 opacity）
# - 其他面板正常
# - LegendBar fade/hover 行为正常
# - 导出功能正常
```

## 6. 禁止事项

- 不修改后端、数据库
- 不在 tokens.css 新增颜色
- 不做信心度范围筛选
- 不做筛选持久化（localStorage）
- 不做搜索与筛选联动
- 不修改 `createAssociationLines` 逻辑

## 7. 提交风格

```
add: 029 — 3D 关联筛选（按类型 + 状态）

- LegendBar: 图例项可点击切换，增加状态筛选行 + 全部/重置按钮
- CosmosView: assocFilter ref + applyAssocFilter + watch 联动
```

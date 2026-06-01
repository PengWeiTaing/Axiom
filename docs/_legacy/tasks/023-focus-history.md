# 023 — Focus History & Back/Forward Navigation

> 当前 Atlas 中用户浏览 entity 时，Esc 只能退回到 region_zoom。如果连续浏览了 A → B → C，想回到 B 只能重新点或搜索。本轮加入焦点历史栈和前进/后退导航，让 3D 浏览像浏览器一样可回溯。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `CosmosView.vue` | 历史栈 + 后退/前进逻辑 + 按钮模板 + 快捷键 | +80 行 |
| `stores/cosmos.ts` | `pushHistory` / `goBack` / `goForward` | +40 行 |

**总计约 120 行**。纯前端，无新 API。

## 2. 产品边界

- **做**：会话内焦点历史（最多 50 条）、后退/前进按钮（在界面中）、Alt+←/Alt+→ 快捷键、历史防重复（连续相同焦点不重复入栈）
- **不做**：持久化历史（localStorage）、历史管理界面（删除单条等）、分支历史可视化、跨会话恢复
- 历史跟随 `store.transition` 自动记录，无需手动调用

## 3. 焦点历史模型

### 3.1 历史条目

```typescript
interface FocusEntry {
  state: CosmosState   // 完整的 store.state 快照
  title: string        // 用于 UI 显示的简短描述
}
```

`title` 示例：
- `global_overview` → "全局"
- `region_zoom` → lifeline 名称（如 "Rust 学习"）
- `node_focus` → entity 标题（如 "给 Cosmos 3D 引擎加粒子效果"）
- `relation_reveal` → entity 标题 + "关联"

### 3.2 历史栈行为

```
初始: [全局]  cursor = 0

→ 点击 R1 "Rust 学习"
栈:  [全局, Rust 学习]  cursor = 1

→ 点击 entity "所有权"
栈:  [全局, Rust 学习, 所有权]  cursor = 2

→ 按 R 进入关联
栈:  [全局, Rust 学习, 所有权, 所有权关联]  cursor = 3

→ 后退 (Alt+←)
栈不变, cursor = 2  → state 变为 node_focus("所有权")

→ 后退 (Alt+←)
栈不变, cursor = 1  → state 变为 region_zoom("Rust 学习")

→ 前进 (Alt+→)
栈不变, cursor = 2  → state 变为 node_focus("所有权")

→ 在 cursor=2 时点击新 entity "Trait 系统"
截断栈: [全局, Rust 学习, 所有权, Trait 系统]  cursor = 3
                                  ↑ 新条目替换了"所有权关联"
```

### 3.3 防重复

连续相同焦点不入栈。如果当前 `cursor` 指向的条目与新的 transition 目标相同（相同 kind + 相同 id），跳过。

### 3.4 上限

最多 50 条。超出时删除最旧条目（shift），cursor 相应调整。

## 4. 实现

### 4.1 Store 改动

在 `cosmos.ts` 中添加：

```typescript
const historyStack = ref<FocusEntry[]>([])
const historyCursor = ref(-1)

function pushHistory(state: CosmosState) {
  const title = stateTitle(state)
  const entry: FocusEntry = { state: { ...state }, title }
  
  // 防重复
  if (historyCursor.value >= 0) {
    const cur = historyStack.value[historyCursor.value]
    if (cur && sameState(cur.state, state)) return
  }
  
  // 截断 forward 分支
  historyStack.value = historyStack.value.slice(0, historyCursor.value + 1)
  
  // 追加
  historyStack.value.push(entry)
  if (historyStack.value.length > 50) {
    historyStack.value.shift()
  } else {
    historyCursor.value = historyStack.value.length - 1
  }
  
  // 通知 CosmosView 执行 transition（重要：避免循环）
  emit('history_navigate', state)
}

function goBack(): CosmosState | null {
  if (historyCursor.value <= 0) return null
  historyCursor.value--
  return historyStack.value[historyCursor.value].state
}

function goForward(): CosmosState | null {
  if (historyCursor.value >= historyStack.value.length - 1) return null
  historyCursor.value++
  return historyStack.value[historyCursor.value].state
}

const canGoBack = computed(() => historyCursor.value > 0)
const canGoForward = computed(() => historyCursor.value < historyStack.value.length - 1)
```

辅助函数：

```typescript
function stateTitle(s: CosmosState): string {
  switch (s.kind) {
    case 'global_overview': return '全局'
    case 'region_zoom': {
      const name = data.value?.lifelines.find(l => l.id === (s as any).lifeline_id)?.name
      return name || (s as any).lifeline_id
    }
    case 'node_focus':
    case 'relation_reveal': {
      const eid = (s as any).entity_id as string
      const ent = data.value?.entities.find(e => e.id === eid)
      const title = ent?.title || eid
      return s.kind === 'relation_reveal' ? `${title} · 关联` : title
    }
  }
}

function sameState(a: CosmosState, b: CosmosState): boolean {
  if (a.kind !== b.kind) return false
  if (a.kind === 'global_overview') return true
  if ((a as any).lifeline_id && (b as any).lifeline_id) return (a as any).lifeline_id === (b as any).lifeline_id
  if ((a as any).entity_id && (b as any).entity_id) return (a as any).entity_id === (b as any).entity_id
  return false
}
```

### 4.2 CosmosView 改动

**重要**：当前所有 `store.transition()` 调用都需要改为通过历史栈。有两种方式：

**方案 A（推荐）**：修改 `store.transition()` 自身，在内部调用 `pushHistory` 而不是直接修改 state。这需要 store 自己监听自己的 state 变化。

**方案 B**：在 CosmosView 的 `watch(() => store.state)` 中记录历史。但这样会形成循环（back 设置 state → watch 触发 → pushHistory → ...）。

**方案 C**：暴露 `store.transitionWithHistory(state)` 和 `store.transitionDirect(state)`（用于 back/forward）。back/forward 使用 `transitionDirect`，正常操作使用 `transitionWithHistory`。

推荐**方案 A 的变体**：在 store 中修改 `transition` 函数，让它在修改 `state.value` 之前先调用 `pushHistory`。back/forward 使用不记录历史的 `navigateTo(state)`。

```typescript
// 在 store 中
function transition(next: CosmosState) {
  pushHistory(next)
  // pushHistory 会 emit 'history_navigate'
  // cosmos view 监听并执行实际的 state 切换
}
```

实际上更简单：

```typescript
function transition(next: CosmosState) {
  pushHistory(next)  // 记录历史
  applyState(next)   // 实际切换
}

function applyState(next: CosmosState) {
  emit(`leave_${state.value.kind}`, state.value)
  state.value = next
  selectedAssocId.value = null
  emit(`enter_${next.kind}`, next)
}

function navigateBack() {
  const prev = goBack()
  if (prev) applyState(prev)
}

function navigateForward() {
  const next = goForward()
  if (next) applyState(next)
}
```

CosmosView 中按钮和快捷键调用 `store.navigateBack()` / `store.navigateForward()`。

### 4.3 UI 按钮

在 CosmosView 左上角（home 按钮旁边）添加后退/前进按钮：

```
[⌂] [←] [→]
```

- 按钮样式与 home 按钮一致（小圆形，surface-2 背景）
- disabled 时 opacity: 0.3
- hover 显示 tooltip："后退 (Alt+←)" / "前进 (Alt+→)"

快捷键：
```typescript
if (e.altKey && e.key === 'ArrowLeft') { e.preventDefault(); store.navigateBack() }
if (e.altKey && e.key === 'ArrowRight') { e.preventDefault(); store.navigateForward() }
```

### 4.4 初始历史

加载完成后，自动记录 `global_overview` 作为第一条历史：

```typescript
// 在 store.load() 成功后
if (historyStack.value.length === 0) {
  historyStack.value = [{ state: { kind: 'global_overview' }, title: '全局' }]
  historyCursor.value = 0
}
```

### 4.5 代码量

约 +120 行（store +40, CosmosView +80）。

## 5. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 基本导航
# - 打开 Atlas → 全局
# - 点击 R1 lifeline → region_zoom
# - 点击 entity → node_focus
# - 按 Alt+← → 回到 region_zoom
# - 按 Alt+← → 回到 global_overview
# - 按 Alt+→ → 回到 region_zoom
# - 按 Alt+→ → 回到 node_focus

# 3. 人肉验证 — 按钮
# - 左上角出现 [←] [→] 按钮
# - 无历史可后退时 [←] disabled
# - 前进到最新后 [→] disabled
# - hover 按钮显示 tooltip

# 4. 人肉验证 — 分支截断
# - 浏览 A → B → C
# - 后退到 B
# - 点击 D（而非前进到 C）
# - Alt+→ 应该到 D，C 不在 forward 栈中

# 5. 人肉验证 — 防重复
# - 连续点击同一 entity 两次 → 栈中只记录一次
# - 连续点击同一 lifeline 两次 → 栈中只记录一次

# 6. 人肉验证 — 关联模式
# - node_focus → R 键 → relation_reveal
# - 后退 → node_focus
# - 前进 → relation_reveal

# 7. 人肉验证 — 不破坏
# - 右键菜单正常
# - 路径查找正常
# - 快捷键面板正常
# - Esc 行为不变
# - Ctrl+K 搜索正常
```

## 6. 禁止事项

- 不持久化历史（不写 localStorage）
- 不修改现有 `transition` 调用点（所有现有调用自动纳入历史）
- 不在 tokens.css 新增颜色
- 不修改后端
- 历史不保存到 store 外部（纯 Pinia state）

## 7. 提交风格

```
add: 023 — Focus History & Back/Forward Navigation

- store: 焦点历史栈（最多 50 条），防重复，分支截断
- CosmosView: Alt+←/→ 快捷键 + 后退/前进按钮
- 所有 transition 自动入栈，back/forward 不重复记录
```

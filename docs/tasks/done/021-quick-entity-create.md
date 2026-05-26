# 021 — 3D 场景中快速创建 Entity

> 当前在 Atlas 中无法创建 entity——必须切换到 Capture 模式。本轮在 3D 场景中加入快速创建入口：右键空白区或 lifeline 节点 → 新建 entity → 弹窗输入 → 自动挂载 → 3D 球面刷新。不替代 Capture（Capture 有完整表单），只是浏览知识图谱时的"随手记"。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `QuickCreateDialog.vue` | **新建**：快速创建弹窗 | +100 行 |
| `ContextMenu.vue` | 右键空白区 + R1/R2 节点增加"新建 entity"选项 | +15 行 |
| `CosmosView.vue` | `Ctrl+N` 快捷键 + 右键背景检测 + QuickCreateDialog 集成 | +50 行 |

**总计约 165 行**。

## 2. 产品边界

- **做**：3D 场景右键→新建、Ctrl+N 快捷键、弹窗选择 kind+输入+选 lifeline、创建后 mount + reload
- **不做**：完整富文本编辑（用 Capture 做）、文件附件、关联创建（association）、批量创建
- API 使用现有端点（`createTask/createMemory/createDecision/createItem` + `mountEntity`），不新增

## 3. 入口

### 3.1 右键空白 3D 区域

在 `global_overview` 或 `region_zoom` 状态下，右键点击空白区域（无节点命中）→ ContextMenu 显示：

```
┌─────────────────────┐
│  新建 entity…       │
└─────────────────────┘
```

点击 → 打开 QuickCreateDialog。

**实现**：当前右键空白区时，`contextMenu` ref 被设为 null（不显示菜单）。需要在 CosmosView 的 `onContextMenu` 中检测：如果 raycaster 没有命中任何节点（`hits.length === 0`），记录右键位置，打开 QuickCreateDialog（而不是 ContextMenu）。

当 state 是 `node_focus` 或 `relation_reveal` 时，右键空白区 → 先退出当前焦点（Esc 行为），再打开创建弹窗。简化为：这些状态下右键空白区不弹出创建菜单（避免混淆）。

### 3.2 右键 R1/R2 lifeline 节点

在 ContextMenu 的 `layer === 1 || layer === 2` 分支中，增加"新建 entity"选项，放在已有选项之前：

```
┌─────────────────────┐
│  新建 entity…       │  ← 新增
│  ───────────────    │
│  编辑名称…          │
│  删除 lifeline      │
└─────────────────────┘
```

点击 → 打开 QuickCreateDialog，**lifeline 预选**为该节点。

### 3.3 Ctrl+N 快捷键

在 CosmosView 的 `onKey` 中添加：

```typescript
if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
  e.preventDefault()
  openQuickCreate()
  return
}
```

- `openQuickCreate()` 设置 `quickCreateVisible = true`
- 默认 lifeline：
  - `region_zoom` → 当前 zoom 的 lifeline
  - `node_focus` / `relation_reveal` → 当前 entity 所在的 lifeline
  - `global_overview` → 不预选（用户自己选）

## 4. QuickCreateDialog

### 4.1 布局

居中弹窗，z-index: 120（低于 ShortcutPanel 的 130）：

```
┌──────────────────────────────┐
│  快速创建              [✕]   │
│                              │
│  类型  [task ▾]              │
│                              │
│  标题  [__________________]  │
│  内容  [__________________]  │  ← task/memory/decision/item 不同
│                              │
│  归类  [Rust 学习 ▾]         │
│                              │
│         [创建]  [取消]       │
└──────────────────────────────┘
```

### 4.2 类型切换

kind 选择器为下拉或按钮组（task / memory / decision / item）：

- **task**：标题（必填）
- **memory**：内容（必填）+ 分类（fact/preference/goal/relationship/event，默认 fact）
- **decision**：标题（必填）+ 决策内容（选填）
- **item**：内容（必填）

切换类型时，表单字段随之变化。用 `v-if` / `v-show` 切换即可。

### 4.3 Lifeline 选择器

下拉列表，数据来自 `store.data.lifelines`：

- 显示层级缩进：`健康 / 饮食`（用 name 拼接，或用缩进）
- 简化方案：用 flat list，显示 `name` 即可，ROOT 层 lifeline 优先排列
- 接收 prop `defaultLifelineId?: string` 用于预选

### 4.4 提交

```typescript
async function submit() {
  if (!kind.value || !canSubmit.value) return
  submitting.value = true
  try {
    let resp: { id: number }
    switch (kind.value) {
      case 'task':
        resp = await createTask({ title: title.value })
        break
      case 'memory':
        resp = await createMemory({ category: category.value, content: content.value })
        break
      case 'decision':
        resp = await createDecision({ title: title.value, decision: decision.value || '' })
        break
      case 'item':
        resp = await createItem({ content: content.value })
        break
    }
    // Mount to lifeline
    if (selectedLifelineId.value) {
      await store.mountEntity(kind.value, resp.id, selectedLifelineId.value)
    }
    await store.reload()
    emit('close')
  } finally {
    submitting.value = false
  }
}
```

创建成功后：`store.reload()` → 3D 场景刷新 → 新 entity 出现在球面。

### 4.5 代码量

约 +100 行（SFC: script + template + style）。

## 5. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/components/cosmos/QuickCreateDialog.vue` | **新建** | +100 行 |
| `frontend/src/components/cosmos/ContextMenu.vue` | 空白区 + R1/R2 增加"新建 entity" | +15 行 |
| `frontend/src/views/CosmosView.vue` | `Ctrl+N` + 右键空白区检测 + QuickCreateDialog 集成 | +50 行 |

## 6. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — Ctrl+N 快速创建
# - Atlas 任意状态 → Ctrl+N
# - 弹出 QuickCreateDialog
# - 选择类型 task，输入标题 "测试任务" → 创建
# - 3D 球面出现新 entity 节点
# - LifelinePanel 统计数字更新

# 3. 人肉验证 — 右键 lifeline 节点创建
# - global_overview → 右键 R2 lifeline 节点
# - 菜单出现"新建 entity…"
# - 点击 → 弹窗出现，lifeline 预选为该节点
# - 创建 → entity 挂载到该 lifeline

# 4. 人肉验证 — 右键空白区创建
# - global_overview → 右键 3D 空白区
# - 弹窗出现（lifeline 不预选）
# - 手动选择 lifeline → 创建 → 成功

# 5. 人肉验证 — 类型切换
# - task: 只显示标题字段
# - memory: 显示内容 + 分类下拉
# - decision: 显示标题 + 决策内容
# - item: 只显示内容字段

# 6. 人肉验证 — 边界
# - 不选 lifeline → 仍可创建（entity 不挂载，但允许后续手动挂载）
# - 必填项为空 → "创建"按钮 disabled
# - Esc 或点击遮罩 → 关闭弹窗

# 7. 人肉验证 — 不破坏
# - 右键菜单原有功能正常
# - LifelinePanel 功能正常
# - 路径查找正常
# - 其他快捷键正常
```

## 7. 禁止事项

- 不在 tokens.css 新增颜色
- 不新增后端 API
- 不新增 npm 依赖
- QuickCreateDialog 不用 vue-router（纯弹窗）
- 不做富文本编辑器
- 不做文件上传
- entity 创建后不做自动焦点跳转（reload 后 3D 视角不变）

## 8. 提交风格

```
add: 021 — 3D 场景快速创建 Entity

- QuickCreateDialog: 居中弹窗，按 kind 切换表单，创建 + 挂载 + reload
- ContextMenu: 右键空白区 + R1/R2 节点增加"新建 entity"
- CosmosView: Ctrl+N 快捷键 + 右键背景检测
```

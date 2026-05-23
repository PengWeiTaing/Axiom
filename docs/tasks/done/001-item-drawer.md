# 001 — Timeline 条目详情面板（ItemDrawer）

> 一句话目标：点击 Timeline 里的任一条目，从右侧滑出一个详情面板，能看完整内容并做归档/恢复/删除。

## 1. 背景 / Why

当前 `Timeline.vue` 里每条目是一行单行截断的文字。鼠标点上去**什么都不会发生**——这是个明显的"死交互"。

用户在 Capture 模式下看到一条想"展开看看"或"想删掉"的内容时，必须有一个低成本的出口。这个出口要：
- 不打断 Capture 主流（不能弹模态遮住整个时间流）
- 操作要齐：看全文、看附件、归档、删除
- 视觉上和 Capture 模式一致，不引入新语汇

详情面板用**右侧滑出 drawer** 而不是模态弹窗——保留时间流在左侧的上下文，符合"低摩擦"的核心要求。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `frontend/src/components/ItemDrawer.vue` | **新建** | ~280 |
| `frontend/src/api/endpoints.ts` | 加 5 个导出函数 | +35 |
| `frontend/src/components/Timeline.vue` | entry 点击 emit `select` | +6 |
| `frontend/src/views/CaptureView.vue` | 接入 ItemDrawer + 状态 | +20 |

不要动其他文件。**绝不**改 `tokens.css` / `base.css` / 任何 store / 任何 view（除 CaptureView）。

## 3. 设计契约

### 3.1 视觉骨架

参考已有的 `frontend/src/components/SearchOverlay.vue` 的玻璃面板风格 + `FloatChat.vue` 的 popup 滑入动效。**不引入任何新视觉语汇**。

```
┌─────────────────────────────────┐
│ TEXT · 2 分钟前    [···] [×]   │ ← header
├─────────────────────────────────┤
│                                 │
│ <完整 content 文本>             │
│                                 │ ← body (可滚动)
│ <如果是图片：缩略图>            │
│ <如果是文档：derived_text 预览> │
│ <如果是音频：transcript 预览>   │
│                                 │
├─────────────────────────────────┤
│ ID · #42                        │
│ 来源 · web_app                  │ ← metadata
│ 大小 · 24 KB                    │
│ 路径 · data/inbox/xxx.txt       │
├─────────────────────────────────┤
│ [归档] [删除]                   │ ← actions
└─────────────────────────────────┘
```

### 3.2 视觉规范（**只能用 tokens**）

- **位置**：固定 `position: fixed`，`right: 0`，`top: 0`，`height: 100vh`，宽度 `min(440px, 92vw)`
- **背景**：`var(--glass-bg)` + `backdrop-filter: var(--glass-blur)`
- **左边框**：`1px solid var(--line-2)`（提示这是一个抽屉，从右边来）
- **z-index**：50（低于 SearchOverlay 的 80 和 QuickCapture 的 90，高于 FloatChat 的 60 — **暂定 50，不要冲突**）
- **header 高 56px**，padding `var(--s-4)`，下边框 `1px solid var(--line-1)`
- **type chip**：复用 Timeline 里 `entry-type` 的 mono 大写小字风格 + 左侧 4px 色条（颜色来自 `typeAccent` 函数，**把 Timeline.vue 里的 `typeAccent` 提到 `composables/useTypeAccent.ts` 共享**）
- **关闭按钮 ×**：复用 SearchOverlay 的关闭 UX（点 overlay 空白 / 按 Esc 关）
- **删除按钮**：`color: var(--error)`，`background: transparent`，hover 才出现 `background: rgba(232, 120, 120, 0.08)` —— 用 `--error` 推一份带透明的就好，不要新增 token
- **滑入动画**：240ms，`transform: translateX(100%)` → `translateX(0)`，曲线 `var(--ease)`

### 3.3 交互契约

| 触发 | 行为 |
|---|---|
| Timeline entry 点击 | 打开 drawer，加载该 item 详情 |
| Esc 键 | 关闭 drawer |
| 点击 drawer 外（左侧空白区） | 关闭 drawer |
| 点击 [归档] | 调归档/恢复 API（按当前 storage 自动判断方向）→ 成功后 toast + 刷新 timeline + 关 drawer |
| 点击 [删除] | **第一次点击进入确认态**（按钮文字变 "确认删除？"，2 秒后自动取消）→ 第二次点击才真删除 → 成功后 toast + timeline 中删除该条 + 关 drawer |
| 加载 / 提交中 | 操作按钮 disabled，drawer 顶部一条 1px accent 进度条 |
| API 失败 | 在 actions 上方显示一行 `color: var(--error)` 的错误信息，**不自动消失** |

### 3.4 数据流

```
Timeline emit('select', entryId)
  → CaptureView 把 entryId 写到 ref selectedId
  → ItemDrawer 收到 prop :itemId
  → 监听 itemId 变化：call GET /item/<id> 拉详情（已经在 entry.raw 的不重拉？— 简单起见每次都拉，保证字段全）
  → 用户点操作 → endpoints.* → 成功 → emit('changed') → CaptureView 调 timeline.reset() + loadInitial()
  → 用户关闭 → CaptureView 把 selectedId = null
```

### 3.5 文件预览规则

`item.type` 字段（已有类型 `'text' | 'image' | 'document' | 'audio'`）：

- `text`：直接展示 `content`，`white-space: pre-wrap`，最大高度让 body 内部滚动
- `image`：`<img :src="item.file_url" />`（已经带 `/file/<id>`），`max-width: 100%`，`border-radius: var(--r-2)`，下方仍然显示 `content`
- `document`：先展示 `content` 一行（如果有），再展示 `derived_text_preview` 全文（同样 pre-wrap，scroll）；如果都没有就显示 `original_name` + "无可读正文" 提示用 `var(--text-4)`
- `audio`：用原生 `<audio :src="item.file_url" controls preload="none">` + 下方展示 `transcript_text`（如果有）

`file_url` 字段后端会返回，但**它是 `/file/<id>` 这种相对路径，前端直接用**。Vite dev 时通过 proxy 转发，build 后是同源访问。

### 3.6 metadata 区

只展示以下字段（**字段不存在就这一行整行不渲染**，不要写 "—" 占位）：

- `ID · #{id}`
- `来源 · {source}`
- `大小 · {humanSize(size_bytes)}`（人类可读）
- `路径 · {file_path}`（如果有；超长截断，hover tooltip 显示全路径）

`humanSize` 函数已经在 `SmartInput.vue` 里实现过，**抽到 `composables/useHumanSize.ts` 共享**。

## 4. API 依赖

在 `frontend/src/api/endpoints.ts` 加这五个导出（顺序、命名、参数严格按下表）：

```ts
// 获取单条详情（比 timeline 里的 entry 字段更全）
export const getItem = (id: number) =>
  apiRequest<{ item: Item & { derived_text_preview?: string; storage?: string; file_url?: string } }>(`/item/${id}`);

// 更新（暂不在 UI 暴露，但为以后留个口）
export const updateItem = (id: number, data: {
  content?: string;
  source?: string;
  derived_text?: string;
  transcript_text?: string;
}) => apiRequest<{ item: Item }>(`/item/${id}/update`, { method: 'POST', json: data });

// 归档
export const archiveItem = (id: number) =>
  apiRequest<{ item: Item; message: string }>(`/archive/${id}`, { method: 'POST' });

// 从归档恢复
export const restoreItem = (id: number) =>
  apiRequest<{ item: Item; message: string }>(`/restore/${id}`, { method: 'POST' });

// 删除（不可恢复）
export const deleteItem = (id: number) =>
  apiRequest<{ message: string }>(`/item/${id}`, { method: 'DELETE' });
```

`Item` 类型已在 `src/api/types.ts` 定义，**不要改它**。`file_url` / `storage` / `derived_text_preview` 是后端额外字段，用类型交集 `Item & {...}` 局部扩展即可。

## 5. Timeline.vue 改动（极小）

`<li class="entry">` 上加点击事件：

```vue
<li
  v-for="entry in store.entries"
  :key="entry.key"
  class="entry"
  :style="{ '--accent-bar': typeAccent(entry.raw.type) }"
  @click="$emit('select', entry.raw.id)"
>
```

组件顶部加 `defineEmits<{ select: [id: number] }>()`。

CSS 已经有 `cursor: pointer`，不用改。

## 6. CaptureView.vue 改动

```vue
<script setup lang="ts">
import { ref } from 'vue';
import SmartInput from '@/components/SmartInput.vue';
import Timeline from '@/components/Timeline.vue';
import ItemDrawer from '@/components/ItemDrawer.vue';
import { useTimelineStore } from '@/stores/timeline';
// ... 其他已有 import

const selectedId = ref<number | null>(null);
const timeline = useTimelineStore();

function onChanged() {
  selectedId.value = null;
  timeline.reset();
  timeline.loadInitial();
}
</script>

<template>
  <!-- 已有内容保持不变 -->
  <Timeline @select="(id) => selectedId = id" />
  <ItemDrawer
    :item-id="selectedId"
    @close="selectedId = null"
    @changed="onChanged"
  />
</template>
```

## 7. 共享逻辑抽取（强制）

| 抽到哪 | 来自哪 | 给谁用 |
|---|---|---|
| `composables/useTypeAccent.ts`：`typeAccent(t)` | Timeline.vue 内的同名函数 | Timeline + ItemDrawer |
| `composables/useHumanSize.ts`：`humanSize(n)` | SmartInput.vue 内的同名函数 | SmartInput + ItemDrawer |

抽完之后**两个旧组件改成 import 共享版本**，不要让函数定义存在两处。

## 8. 验收清单

- [ ] `cd frontend && npm run build` 通过（vue-tsc 无错 + vite build 无错）
- [ ] 在 dev 模式（`npm run dev` + Flask 5000）打开 `http://127.0.0.1:5173/`，输入 key `axiom123` 进入
- [ ] 点击时间流任一条 → drawer 从右侧滑入（动画 240ms）
- [ ] Esc 关闭 / 点 drawer 左侧空白关闭
- [ ] 文本类型条目能看完整内容
- [ ] 点 [归档] 一次性完成（不需要二次确认）
- [ ] 点 [删除] 第一次按钮变 "确认删除？"，2 秒不点会自动恢复
- [ ] 删除后 timeline 立即看不到这条
- [ ] drawer 打开期间还能按 Ctrl+K 唤起聊天（z-index 不冲突）
- [ ] drawer 打开期间还能按 Ctrl+Shift+N 唤起 QuickCapture
- [ ] 移动端宽度 < 480px 时 drawer 占满屏宽（用 `min(440px, 92vw)` 已经自动满足）

## 9. 禁止事项

- **不要**改 `tokens.css` / `base.css` / 任何 store
- **不要**新增 npm 依赖
- **不要**给 drawer 加"编辑模式"——这一版只读 + 操作，编辑留给后续任务单
- **不要**给删除做模态二次确认（"按钮变文字"已经足够）
- **不要**复制 `humanSize` / `typeAccent`，必须抽到 composables/
- **不要**改 Timeline 的样式或排序逻辑
- **不要**在 ItemDrawer 里直接 `fetch`，所有 API 调用走 `endpoints.ts` 里新加的函数
- **不要**用 `:any` 绕开类型，必要时用交集类型 `Item & { x?: string }`

## 10. 提交风格

完成后做一次 commit，message 中文：

```
add: Timeline 条目详情 drawer

- 新增 ItemDrawer，右侧滑出，支持归档/恢复/删除
- 抽 typeAccent 和 humanSize 到 composables
- 删除按钮二次确认（文字变化，无模态）
- 不破坏现有 SmartInput / Timeline / FloatChat 流
```

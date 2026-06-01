# 005b — 三模式入口（Capture / Atlas / 近况）+ 旧 5 分区视图回归

> 一句话目标：把 mode store 从二态扩到三态，加全局右上角的极简模式切换器；旧 5 分区视图从 `_legacy/` 重新挂到"近况"模式，让产品形成 **Capture（日常）/ Atlas（思考）/ 近况（数据）** 三个心智的稳定切换。

## 1. 背景 / Why

Atlas v0.1 原型已经撑住调性（球形树 + LOD + 状态机），但当前产品体感仍混乱：

- 用户进入后默认 Capture，要点右上 Atlas 按钮才能切——切换是**单向 hop**，不是平级模式
- 旧 5 分区驾驶舱（主线 / KPI / 节奏 / 决策 / 提炼）作为数据看板**仍有价值**，但目前躺在 `views/_legacy/AtlasView.vue` 没入口能进
- 三个模式语义完全不同：
  - **Capture**：高频输入输出，单栏 720px，工具感
  - **Atlas**：低频深度思考，全屏 3D 球体，宇宙感
  - **近况**：每天看一眼的数据看板，宽栏 1100px，密度感

需要一个**全局共享的模式切换器**让三种心智平级、稳定切换。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 行数 |
|---|---|---|
| `frontend/src/stores/mode.ts` | `AppMode` 枚举加 `'recent'` | +5 |
| `frontend/src/views/RecentView.vue` | **新建** wrapper，引用 `_legacy/AtlasView.vue` 并删除内部遗留导航 | ~25 |
| `frontend/src/views/_legacy/AtlasView.vue` | 删除内部的"返回 Capture"按钮 + 相关代码（被全局 ModeSwitcher 替代） | -15 |
| `frontend/src/components/ModeSwitcher.vue` | **新建** 全局右上角三模式切换组件 | ~110 |
| `frontend/src/App.vue` | mode v-if 增加 recent 分支 + 挂 ModeSwitcher 全局组件 | ~10 |
| `frontend/src/views/CaptureView.vue` | 删头部 Atlas 按钮（被 ModeSwitcher 替代）+ 删 mode.set 调用 + 删 useModeStore import | ~25 |
| `frontend/src/views/CosmosView.vue` | 删 `× 退出 Atlas` 按钮 + 相关代码（被 ModeSwitcher 替代） | -10 |

**不要改**：
- `tokens.css` / `base.css`（视觉只用现有 token）
- 任何 store 除了 `mode.ts`
- `cosmos/*.ts`（Atlas 内部逻辑不动）
- `endpoints.ts` / 任何 API 调用
- 旧 `_legacy/AtlasView.vue` 的 5 分区主体逻辑（只删导航相关）

## 3. mode store 扩展

`frontend/src/stores/mode.ts`：

```ts
// 改前
export type AppMode = 'capture' | 'atlas';

// 改后
export type AppMode = 'capture' | 'atlas' | 'recent';
```

`toggle()` 当前是二态循环——**改成三态循环**：`capture → atlas → recent → capture`。或者更简单：**删掉 `toggle()`**，只保留 `set()`，调用方明确指定目标。**推荐删 toggle**，因为三态循环语义不直觉。

注：mode 不持久化（刷新回 capture）的设计保留——这是产品决定。

## 4. ModeSwitcher 视觉契约

### 4.1 位置

固定右上角，`position: fixed; top: var(--s-4); right: var(--s-4); z-index: 25`。

z-index 协调：
- 25 = ModeSwitcher（高于 Cosmos canvas hud 的 20，但低于 SearchOverlay 80 / FloatChat 60 / QuickCapture 90）
- 这样 SearchOverlay / QuickCapture / FloatChat 弹出时仍能盖住切换器（不干扰）

### 4.2 形态

水平三个文字 tab，间距 `var(--s-3)`，背景**透明无玻璃**（不要喧宾夺主）：

```
            Capture · Atlas · 近况
                       ─────
```

- 三个 tab 文字水平排列，用 `·` 极淡分隔符（颜色 `var(--text-5)`）
- 当前 tab 颜色 `var(--text-1)`，**下方一条 2px accent 横线**长度等于文字宽度
- 非当前 tab 颜色 `var(--text-3)`，hover 变 `var(--text-1)`
- 字号 `var(--fs-2)`，全部小写英文 + 中文混排
- padding `var(--s-2) var(--s-3)`
- **不要** 加图标
- **不要** 加按钮边框
- **不要** 加背景色

### 4.3 自适应（按当前 mode 调整对比度）

- 在 `Capture` / `Recent` 模式：tab 正常可见
- 在 `Atlas` 模式：整体 `opacity: 0.65`，悬停时恢复 1.0——避免 3D 球体被切换器抢镜

### 4.4 切换动画

点击非当前 tab → 立即调 `mode.set()`，App.vue 的 `Transition mode="out-in"` 自动接管视图淡入淡出（已有逻辑，不要改）。

ModeSwitcher 自己的 active 下划线用 `transition: all var(--t-base) var(--ease)`——下划线位置和颜色从前一个 tab 滑到新 tab，**240ms 内**完成（用 absolute + transform 实现位置动画，或者 simply 让每个 tab 各自渲染下划线）。

简化实现：**每个 tab 各自渲染下划线 + opacity 0/1**（不要做下划线滑动），更轻量。

### 4.5 Suspense 期间

App.vue 用 `defineAsyncComponent` 懒加载 AtlasView 和 RecentView。切换时可能有 Suspense fallback。ModeSwitcher **永远渲染**（不在 Suspense 内），保持视觉稳定。

## 5. RecentView 适配

`frontend/src/views/RecentView.vue`（新建）：

```vue
<script setup lang="ts">
/** RecentView — 数据看板（原 5 分区 Atlas 改名） */
import LegacyView from './_legacy/AtlasView.vue'
</script>

<template>
  <LegacyView />
</template>
```

简单的 wrapper。视觉不变（已有 5 分区布局）。

### 5.1 删除 `_legacy/AtlasView.vue` 的内部导航

旧文件里有：

- `import { useModeStore } from '@/stores/mode'`（顶部）
- `const mode = useModeStore()`（setup）
- `<button class="back" type="button" @click="mode.set('capture')">` + 周围 svg 和 span "返回 Capture"（template）
- `.back { ... }` 整块 css

把这 4 段全部**删除**——全局 ModeSwitcher 已经提供退出能力，不需要内部按钮。

### 5.2 标题文案保留

旧 5 分区头部的 `<span class="eyebrow">Atlas</span>` + `<h1 class="title">你正在往哪里走</h1>` ——**改成**：

- eyebrow: `近况`
- title: `本周与最近的轮廓`

（其他章节内"Atlas"字面量保留不改，因为它们是数据语义不是模式名）

## 6. CaptureView 头部清理

`frontend/src/views/CaptureView.vue` 当前头部：

```vue
<div class="header-actions">
  <button class="action-btn" ... 搜索 ... ⌘F ... />
  <button class="action-btn atlas-btn" ... Atlas ... mode.set('atlas') ... />
</div>
```

**删除 atlas-btn 这个按钮 + 相关 CSS（`.atlas-btn:hover`）**，但**保留搜索按钮**（搜索还是 Capture 专属）。

同时删除 setup 区的：
- `import { useModeStore } from '@/stores/mode'`
- `const mode = useModeStore()`

（这两个现在只被 atlas-btn 用，删完没人引用）

## 7. CosmosView 头部清理

`frontend/src/views/CosmosView.vue` 的 `.cosmos-hud` 区有：

```vue
<button class="close-btn" type="button" @click="mode.set('capture')">&times; 退出 Atlas</button>
```

**删除这个按钮 + 相关 CSS（`.close-btn` 整块）**。

但**保留 `Breadcrumb` 组件**（它属于 Atlas 内部状态导航，不是模式切换）。

同样删除 import / setup 中 `mode` 相关代码（如果只被这个按钮用）。

## 8. App.vue 改造

当前：

```vue
<Transition name="mode" mode="out-in">
  <CaptureView v-if="mode.mode === 'capture'" key="capture" />
  <AtlasView v-else key="atlas" />
</Transition>
<QuickCapture />
<FloatChat />
```

改成：

```vue
<ModeSwitcher v-if="auth.ready" />
<Transition name="mode" mode="out-in">
  <CaptureView v-if="mode.mode === 'capture'" key="capture" />
  <AtlasView v-else-if="mode.mode === 'atlas'" key="atlas" />
  <RecentView v-else key="recent" />
</Transition>
<QuickCapture />
<FloatChat />
```

`RecentView` 也用 `defineAsyncComponent` 懒加载（跟 AtlasView 一样的写法）。

`ModeSwitcher` 在 KeyGate 时**不渲染**（用 `v-if="auth.ready"`）——没登录前不该看到模式切换器。

## 9. 验收清单

- [ ] `cd frontend && npm run build` 通过
- [ ] 打开 `http://127.0.0.1:5173/`，输 key 进入
- [ ] **右上角看到** 三 tab `Capture · Atlas · 近况`，Capture 下有 accent 短横线
- [ ] **点 Atlas tab** → 视图过渡到 Cosmos 球体，下划线移到 Atlas，**整体切换器变淡**（opacity ~0.65），hover 恢复
- [ ] **点 近况 tab** → 视图过渡到 5 分区数据看板，顶部 eyebrow 显示"近况"，标题"本周与最近的轮廓"
- [ ] **从近况点 Capture tab** → 回到输入界面
- [ ] **Capture 头部不再有 Atlas 按钮**（只剩 brand + 搜索按钮）
- [ ] **Atlas 头部不再有"× 退出 Atlas"按钮**（只剩 Breadcrumb）
- [ ] **近况头部不再有"返回 Capture"按钮**
- [ ] **Ctrl+K** 在三个 mode 下都能呼出 FloatChat
- [ ] **Ctrl+Shift+N** 在三个 mode 下都能呼出 QuickCapture
- [ ] **Ctrl+F** 仅在 Capture 下触发 SearchOverlay（在 Atlas / 近况 下不响应或让浏览器自处理）
- [ ] **刷新页面** → 回到 Capture（mode 不持久化的约定保留）
- [ ] 三个 mode 之间切换有 240ms 平滑过渡，无闪烁
- [ ] **不破坏** Atlas 球体功能（点节点 / R / Esc 都正常）
- [ ] **不破坏** 近况的 5 个 block（主线 / KPI / 节奏 / 领域 / 决策 / 提炼）原有渲染

## 10. 禁止事项

- 不要给 ModeSwitcher 加图标、边框、背景色或玻璃
- 不要做下划线滑动动画（用 `opacity 0/1` 切换更稳）
- 不要把 ModeSwitcher 放进 Suspense 内部
- 不要改 `_legacy/AtlasView.vue` 的 5 分区主体逻辑（数据加载、卡片渲染、空状态）——只删导航
- 不要给三 tab 加键盘快捷键（v0.1 不做，等用户后续要求再加）
- 不要持久化 mode 到 localStorage（产品决定：刷新回 Capture）
- 不要新增任何 npm 依赖
- 不要碰 `tokens.css` / `base.css`

## 11. 提交风格

```
add: 三模式入口 + 近况视图回归

- mode store 加 'recent' 第三态
- 新建 ModeSwitcher：右上角极简三 tab，Atlas 模式下自动变淡
- 新建 RecentView wrapper，把 _legacy/AtlasView 重新挂入
- 删除 CaptureView 的 Atlas 按钮（被 ModeSwitcher 替代）
- 删除 CosmosView 的"退出 Atlas"按钮（同上）
- 删除 _legacy/AtlasView 的"返回 Capture"按钮（同上）
- 近况头部文案：eyebrow "近况" / 标题 "本周与最近的轮廓"
```

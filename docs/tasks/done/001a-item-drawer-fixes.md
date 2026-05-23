# 001a — ItemDrawer 三处补丁（必修 bug + 时间显示 + 动画 token）

> Review 结果：001 整体通过，但有一处必修 bug 和两处轻微偏离。本补丁解决全部。

## 1. 背景

001 已合入仓库（commit `9be598c`）。Code review 发现：

1. **必修 Bug**：`isInbox` 判断在 Windows 上失效（`/archive/` vs `\archive\`）
2. **细节**：head 区显示 UTC 字符串切片，应该用 `formatRelative`
3. **整洁**：drawer 动画用了 `--t-slow`（280ms），任务单写 240ms，应该加专用 token

## 2. 要改的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `frontend/src/components/ItemDrawer.vue` | 三处局部修改 | ~10 |
| `frontend/src/styles/tokens.css` | 加 1 个 token | +1 |

**不要**改别的文件。

## 3. 具体改动

### 3.1 修 `isInbox` — 用后端 storage 字段

`frontend/src/components/ItemDrawer.vue` 第 46-50 行：

**改前**：

```ts
const isInbox = computed(() => {
  const fp = detail.value?.file_path
  if (!fp) return true
  return !fp.includes('/archive/')
})
```

**改后**：

```ts
const isInbox = computed(() => {
  // 后端返回 storage: 'inbox' | 'archive' | 'root' | null
  // 没有 file_path 的条目（纯文本无落盘）按 inbox 处理，归档按钮其实无意义但不报错
  const s = detail.value?.storage
  if (!s) return true
  return s === 'inbox'
})
```

**Why**：Windows 路径分隔符是 `\`，原写法在 Windows 永远返回 true。`storage` 字段是后端 `build_item_payload` 已经计算好的，跨平台一致。

### 3.2 时间显示用 formatRelative

`frontend/src/components/ItemDrawer.vue` 顶部 import 区加一行：

```ts
import { formatRelative } from '@/composables/useRelativeTime'
```

第 135 行：

**改前**：

```vue
<span v-if="detail" class="head-time mono">{{ detail.created_at?.slice(0, 16).replace('T', ' ') }}</span>
```

**改后**：

```vue
<span v-if="detail" class="head-time mono">{{ formatRelative(detail.created_at) }}</span>
```

**Why**：原写法显示 UTC 字符串、对用户不友好；`formatRelative` 已经在 Timeline 用过，行为一致（刚刚 / N 分钟前 / 昨天 / 周X / MM/DD）。

### 3.3 加 drawer 专用 token + 改动画时长

`frontend/src/styles/tokens.css` —— 在 `--t-slow: 280ms;` 那一行之后加一行：

```css
  --t-drawer: 240ms;  /* drawer 滑入滑出，介于 base 和 slow 之间 */
```

`frontend/src/components/ItemDrawer.vue` 把 transition 用的 `var(--t-slow)` 全部替换成 `var(--t-drawer)`（在 .drawer-enter-active / .drawer-leave-active / .drawer-enter-active .drawer-panel / .drawer-leave-active .drawer-panel 这四处）。

**Why**：任务单原话是 240ms。直接写字面量违反"只能用 token"约束，所以新增一个语义 token。

## 4. 验收清单

- [ ] `cd frontend && npm run build` 通过
- [ ] 在归档区有数据的环境下：从 archive 区点击条目 → drawer 显示按钮文字是 "恢复"（不是 "归档"）
- [ ] inbox 区条目 drawer 按钮文字仍是 "归档"
- [ ] drawer header 时间显示是 "刚刚" / "N 分钟前" 这种相对格式
- [ ] drawer 滑入时长比之前略快一点（视觉感受）

## 5. 禁止事项

- 不要顺手改其他 token 值
- 不要改 ItemDrawer 的其他逻辑
- 不要改 endpoints.ts / Timeline / CaptureView
- 不要碰 toast（review 已认可"没 toast"是更克制的做法，**不要加 toast**）

## 6. 提交风格

```
fix: ItemDrawer 三处补丁

- 修 Windows 下 isInbox 判断（用后端 storage 字段，不用路径拼字符串）
- 时间显示改用 formatRelative
- 新增 --t-drawer token，drawer 动画从 280ms 调到 240ms
```

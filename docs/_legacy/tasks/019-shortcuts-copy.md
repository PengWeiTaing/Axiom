# 019 — 快捷键面板 + 快捷操作（复制/导出 + 最近搜索）

> 013-018 功能堆叠了十几项交互——右键菜单、关联筛选、路径查找、内联编辑——但除了 3 秒淡出的底部提示外，用户无从知道哪些操作可用。`Ctrl+K` 搜索是唯一被明确提示的快捷键。本轮补齐可发现性：`?` 键弹出完整快捷键参考面板，同时补充日常高频的"复制"操作。

## 1. 范围

前端改动（1 个新组件 + CosmosView + SearchOverlay 微调）。不涉及后端。

**核心目标**：
- `?` 键弹出快捷键参考面板（ShortcutPanel），列出所有可用操作
- NodeDetailCard / PathPanel 中的 entity 支持"复制标题"和"复制为 Markdown 链接"
- 搜索框（AtlasSearch）记录最近 5 次搜索，存储在 localStorage
- 右键菜单新增"复制标题"

## 2. 产品边界

- 不做完整导出（JSON/Markdown 文件下载）——只做剪贴板复制
- 不做快捷键自定义绑定
- 不做搜索历史的管理界面（删除单条等）
- 不做"复制为纯文本"（Markdown 够用了）
- 不做搜索建议/自动补全

## 3. 快捷键面板

### 3.1 触发

按 `?`（无需 Shift，即 `/` 键位的下层）弹出。在 CosmosView 的 `onKey` 中处理。

- 已有一个 `/` 键触发搜索（010），`?` = `Shift + /`。需区分：
  - 无 Shift 的 `/` → 搜索（现有行为）
  - Shift + `/` 即 `?` → 快捷键面板（新增）
- 如果在 input/textarea 中 → 不触发
- 面板打开时再按 `?` 或 Esc → 关闭

### 3.2 内容

按状态分组显示：

```
┌─────────────────────────────────────────────┐
│  快捷键参考                          [✕]    │
│                                             │
│  全局                                       │
│  Ctrl+K /         搜索 entity/lifeline      │
│  ?                显示/隐藏此面板           │
│  滚轮             缩放                      │
│  拖拽             旋转                      │
│                                             │
│  全局 → region_zoom                        │
│  左键点击 R1      进入 lifeline 区域        │
│                                             │
│  region_zoom                               │
│  Esc              返回全局视图             │
│  左键点击 R2/R3   聚焦 entity              │
│  右键 R1/R2       新建 entity / 编辑名称   │
│                                             │
│  node_focus                                │
│  Esc              返回 lifeline 区域       │
│  R                 查看关联（relation_reveal）│
│  右键 entity       编辑/移动/删除/关联      │
│  双击标题          内联编辑标题            │
│                                             │
│  relation_reveal                           │
│  Esc              返回 node_focus          │
│  R                 退出关联视图            │
│  点击关联线        查看证据                │
│  筛选条            按类型/信心度过滤       │
│                                             │
│  路径查找（018）                            │
│  右键 → 查找路径  进入路径选择模式         │
│  Esc              退出路径模式             │
└─────────────────────────────────────────────┘
```

### 3.3 实现

新建 `frontend/src/components/cosmos/ShortcutPanel.vue`：

- 居中弹窗，半透明背景遮罩
- `z-index: 130`（高于所有其他 UI）
- 内容为静态模板（不需要动态计算快捷键）
- 按状态分组的 sections
- 简洁排版，每行：按键 + 描述
- 按键部分用 `<kbd>` 样式（monospace + surface-2 背景 + 小圆角）
- 点击遮罩或 ✕ 按钮关闭

## 4. 复制操作

### 4.1 复制标题

右键菜单 R3 entity 新增"复制标题"项：

```
┌─────────────────────┐
│  编辑标题…          │
│  移动到 lifeline ▸  │
│  关联到…            │
│  查找路径到…        │
│  复制标题           │  ← 新增
│  ───────────────    │
│  删除               │
└─────────────────────┘
```

点击 → `navigator.clipboard.writeText(entity.title)` → 底部短暂 toast "已复制"

### 4.2 复制为 Markdown

NodeDetailCard 标题行右侧加一个小的复制按钮（或放在详情区域）。

点击 → 复制格式：

```markdown
[task] 给 Cosmos 3D 引擎加粒子效果和过渡动画 (`task:42`)
```

其中 `[kind]` 为实体类型标签，后面跟标题和 ID。

可复用 NodeDetailCard 的标题区域，在 `editingTitle` 为 false 时 hover 显示复制图标。

### 4.3 Toast 反馈

复制成功后，在画面底部短暂显示 toast "已复制到剪贴板"，1.5 秒后消失。

实现方式：在 CosmosView 中加一个 `copiedToast` ref，复制时设为 true，setTimeout 清除。模板中用简单的绝对定位 div + CSS transition。

```
┌────────────────────┐
│  已复制到剪贴板     │
└────────────────────┘
  ↑ 底部居中，半透明，1.5s 自动消失
```

## 5. 最近搜索

### 5.1 存储

在 `AtlasSearch.vue` 或 CosmosView 中维护 `recentSearches`（存储在 localStorage，key 为 `atlas_recent_searches`）。

```
["Rust", "粒子", "Cosmos", "Three.js", "关联"]
```

- 最多存 5 条
- 新的放在最前面
- 不存空字符串
- 去重：如果新搜索词已存在，移到最前面
- 组件挂载时从 localStorage 读取

### 5.2 展示

在 AtlasSearch 搜索框下方，当搜索框为空且有历史时，显示"最近搜索"：

```
┌──────────────────────┐
│ [搜索 entity...   ]  │
│                      │
│ 最近搜索             │
│ Rust                 │
│ 粒子                 │
│ Cosmos               │
│ 清除历史             │
└──────────────────────┘
```

- 点击历史条目 → 填入搜索框并执行搜索
- "清除历史"→ 清空 localStorage + 列表

### 5.3 实现位置

修改 `frontend/src/components/cosmos/AtlasSearch.vue`（010 创建的），在现有搜索框下方加最近搜索区域。

## 6. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `frontend/src/components/cosmos/ShortcutPanel.vue` | **新建**：快捷键参考面板 | +160 行 |
| `frontend/src/components/cosmos/AtlasSearch.vue` | 最近搜索历史（localStorage + UI） | +60 行 |
| `frontend/src/components/cosmos/NodeDetailCard.vue` | 复制为 Markdown 按钮 | +25 行 |
| `frontend/src/components/cosmos/ContextMenu.vue` | 新增"复制标题"项 | +5 行 |
| `frontend/src/views/CosmosView.vue` | `?` 键触发 + toast + 复制逻辑 | +50 行 |

**总计约 300 行**。偏小，追加以下内容。

## 7. 追加：NodeDetailCard 实体 ID 显示 + 复制

### 7.1 实体 ID 显示

在 NodeDetailCard 的标题行下方（或详情区域顶部）显示实体 ID（如 `task:42`），小字灰色。hover 时出现复制图标。

点击 ID → 复制到剪贴板 → toast "已复制 task:42"

### 7.2 追加行数

+30 行。

追加后**总计约 330 行**。

## 8. 追加：PathPanel 复制路径

### 8.1 复制路径为 Markdown

在 PathPanel 底部加"复制路径"按钮：

```markdown
**路径（2 跳）**：
1. task:7 — 给 Cosmos 3D 引擎加粒子效果
2. [因果 85%] → decision:10 — 选择 Three.js 做 3D 渲染
3. [衍生 62%] → memory:15 — Rust 内存管理笔记
```

### 8.2 追加行数

+25 行。

追加后**总计约 355 行**。

## 9. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 快捷键面板
# - Atlas 任意状态 → 按 ?（Shift + /）
# - 弹出 ShortcutPanel，列出所有快捷键
# - 点击遮罩或 ✕ → 关闭
# - 再按 ? → 关闭
# - 在 input 中按 ? → 不触发

# 3. 人肉验证 — 复制标题
# - 右键 R3 entity → "复制标题"
# - 切换窗口 → Ctrl+V → 实体标题粘贴出来
# - 底部 toast "已复制到剪贴板"出现，1.5s 后消失

# 4. 人肉验证 — 复制 Markdown
# - NodeDetailCard 中 hover 标题行 → 复制图标出现
# - 点击 → 剪贴板得到 `[task] 标题 (task:42)` 格式
# - toast 出现

# 5. 人肉验证 — 实体 ID 复制
# - NodeDetailCard 中显示实体 ID（小字）
# - 点击 → 剪贴板得到 `task:42`
# - toast 出现

# 6. 人肉验证 — 路径复制
# - 路径查找（018）→ PathPanel 显示
# - 点击"复制路径"→ 剪贴板得到 Markdown 格式路径
# - toast 出现

# 7. 人肉验证 — 最近搜索
# - Ctrl+K 搜索 → 输入 "Rust" → Enter
# - 关闭搜索 → 再按 Ctrl+K → 搜索框下方显示"最近搜索"
# - "Rust" 在列表中
# - 搜索 "粒子" → 再次打开 → "粒子" 排第一，"Rust" 第二
# - 最多 5 条
# - 点击"清除历史"→ 列表清空

# 8. 人肉验证 — 不破坏
# - / 键仍然触发搜索（不受 ? 面板影响）
# - 所有现有快捷键正常
# - 右键菜单正常
# - NodeDetailCard 内联编辑正常
```

## 10. 禁止事项

- 不在 tokens.css 中新增颜色（kbd 样式用现有 token）
- 不做文件下载——只做剪贴板
- 不做快捷键自定义
- 不做搜索自动补全
- Toast 不用第三方库
- ShortcutPanel 内容不动态生成（手动维护的静态列表更可控）
- 不修改后端

## 11. 提交风格

```
add: 019 — 快捷键面板 + 复制操作 + 最近搜索

- 新增 ShortcutPanel：? 键弹出全局快捷键参考，按状态分组
- NodeDetailCard：实体 ID 显示 + 复制为 Markdown + 复制 ID
- ContextMenu：新增"复制标题"
- PathPanel：新增"复制路径"（Markdown 格式）
- AtlasSearch：最近 5 次搜索历史（localStorage）
- 复制操作统一 toast 反馈"已复制到剪贴板"
```

# 004 — 旧前端 item 详情：加"升级为记忆"按钮 + 展示 derived_memories

> 一句话目标：在旧前端 item viewer 里加一个动作，让用户能把当前 item 一键升级为 memory，并在 viewer 底部看到这条 item 已派生哪些 memory。

## 1. 背景 / Why

B-001 / B-003 已经把后端接口准备好（`POST /item/<id>/promote-to-memory` 和 `GET /item/<id>` 响应里的 `derived_memories`），但旧前端 `core/static/app.js` 还没有任何调用入口。本任务给 item viewer 接上这条链。

> **依赖**：必须先完成 B-001 和 B-003，否则按钮点了 404、derived_memories 字段不存在。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `core/static/app.js` | `buildItemViewerActions` 加按钮 + 加 `handlePromoteItemToMemory` 函数 + 全局点击委托加 case + viewer 渲染加 derived_memories section | +60 |

**不要改 `app.css` / `app.html`**——本任务靠现有样式就够看。

## 3. 设计契约

### 3.1 "升级为记忆"按钮

位置：`buildItemViewerActions(item)`（`core/static/app.js:1611`）返回的按钮数组里**追加**一项，**条件**：始终显示（不依赖 item.type，不依赖 processing_state）。

按钮规格：

```js
{
    label: "升级为记忆",
    className: "secondary-button",
    dataset: {
        action: "promote-item-to-memory",
        itemId: item.id,
    },
}
```

### 3.2 点击行为

在全局点击委托（DeepSeek 自己定位：搜 `data-action="edit-item"` 附近的 `else if (action === "edit-item")` switch），加一个新 case：

```js
} else if (action === "promote-item-to-memory") {
    await handlePromoteItemToMemory(itemId);
}
```

`handlePromoteItemToMemory(itemId)` 实现：

1. 用 `prompt()` 收集 category：

```js
const category = prompt(
    "选择记忆类别：fact / preference / goal / relationship / event",
    "fact"
);
if (!category) return;
const trimmed = category.trim();
const allowed = ["fact", "preference", "goal", "relationship", "event"];
if (!allowed.includes(trimmed)) {
    alert("类别非法，请输入：" + allowed.join(" / "));
    return;
}
```

2. 用 `prompt()` 收集可选 content（允许留空，留空走后端派生）：

```js
const customContent = prompt("自定义记忆内容（留空则从 item 自动派生）", "");
```

> `prompt` 用户取消 → `customContent === null`；空字符串 → `""`。两种都按"不传 content"处理。

3. 发请求：

```js
const body = { category: trimmed };
if (customContent && customContent.trim()) {
    body.content = customContent.trim();
}
try {
    const payload = await apiRequest(`/item/${itemId}/promote-to-memory`, {
        method: "POST",
        json: body,
    });
    alert(`已升级为记忆 #${payload.memory.id}`);
    await openItemViewer(itemId);  // 重新打开 viewer 刷新 derived_memories
} catch (error) {
    alert("升级失败：" + error.message);
}
```

> 沿用 `apiRequest` 的错误处理风格（同 `handleConfirmMemory` 等既有函数）。

### 3.3 viewer 里展示 `derived_memories`

`item.derived_memories` 是 B-003 加的字段，永远是数组。

#### 渲染位置

在 viewer 内容区域**底部**追加一段，标题"派生记忆"，内容是 memory 列表。

实现思路（任选其一，DeepSeek 自己定）：

- **方案 A（推荐）**：在 `buildItemMetaRows(item)` 里追加一行 meta，label = "派生记忆"，value = 一段 HTML 字符串（用 ul/li 简单列出）。但 buildItemMetaRows 是纯 text，可能不支持 HTML——DeepSeek 先看看 renderViewerMeta 是怎么用的，不支持就走方案 B。
- **方案 B**：在 `openItemViewer` 的每个分支（image/audio/pdf/document/text）末尾，调用一个新函数 `appendDerivedMemoriesSection(viewerContentEl, item.derived_memories)`，直接 innerHTML 追加。

#### 列表样式

每条 memory 渲染为一行：

```
[category_label] content_前80字 · status_label · created_at_相对时间
```

类比 memory 列表卡片的展示风格（`renderMemoryList` 一带可参考）。

空数组 → 整段不渲染（**不要**显示"暂无派生记忆"占位文字，避免噪音）。

### 3.4 不要做的"超纲"事

- **不要**做 inline modal / 弹层组件——用 `prompt()` 和 `alert()` 跟 `handleConfirmDecisionOutcome`（在 app.js:3039 附近）保持一致风格
- **不要**把"升级为记忆"按钮放进 buildItemMetaRows 之类位置——它是动作，不是元数据
- **不要**给按钮加图标 / emoji

## 4. API 依赖

| 端点 | 方法 | 入参 | 返回 |
|---|---|---|---|
| `/item/<id>/promote-to-memory` | POST | `{ category, content? }` | `{ memory: {...} }` |
| `/item/<id>` | GET | — | `{ item: { ..., derived_memories: [...] } }` |

两个都是 B-001 / B-003 的成果，本任务**不调** `/memories` 直接 POST。

## 5. 验收清单

- [ ] `node --check core/static/app.js` 通过
- [ ] 手动验证：
  1. 启动 receiver，登入 `/app`
  2. 打开任意一条 item viewer
  3. 看到"升级为记忆"按钮
  4. 点击 → prompt 提示选 category → 输入 fact → 二次 prompt content（留空） → 提示"已升级为记忆 #N"
  5. viewer 重新打开后，底部出现"派生记忆"区域，含刚建的 memory
  6. 进入 `/app` 的"记忆"面板，能看到这条 memory，status=待确认，source_item_id 字段已存
  7. 类别非法时弹错误，不发请求
  8. content 自定义内容时，建出的 memory.content 是自定义的而不是 item 派生的
- [ ] 不破坏既有按钮：编辑 / 下载 / 处理状态相关按钮都还在原位置
- [ ] 移动端样式不爆框（按钮数量增加后能换行）

## 6. 禁止事项

- 不要动 `core/templates/app.html`（按钮是 JS 动态生成的）
- 不要动 `app.css`（不要加新样式类，复用 `secondary-button`）
- 不要动 `frontend/`（前端 v2 不在本任务范围）
- 不要新建 `js` 文件
- 不要把 `prompt` / `alert` 替换成自研模态
- 不要给按钮加 confirm 二次确认（升级是低风险动作，candidate 状态用户随时能归档）

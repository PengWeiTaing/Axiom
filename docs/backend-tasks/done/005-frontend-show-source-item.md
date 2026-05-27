# 005 — 旧前端 memory 列表/详情：显示 source_item 来源

> 一句话目标：让 memory 卡片显式展示"派生自 item #N"，并在 memory 详情里给一个跳回 item 的入口。

## 1. 背景 / Why

B-003 已经让 `GET /memories/<id>` 响应里带上 `source_item: { id, type, type_label, snippet, created_at }`，但旧前端 `core/static/app.js` 完全没用这个字段。本任务把反向链在 UI 上接通。

> **依赖**：B-003。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `core/static/app.js` | `renderMemoryList` 卡片加来源行 + memory 详情弹层渲染加 source_item 卡片 + 全局点击委托加跳转 case | +35 |

## 3. 设计契约

### 3.1 memory 列表卡片：来源行

`renderMemoryList`（DeepSeek 自己搜，约 `app.js:2632` 附近）里生成 memory 卡片 HTML 时，**追加一行**：

```html
<div class="memory-source-line" style="font-size:12px;opacity:0.65;margin-top:4px">
    派生自 item #<span class="text-link" data-action="open-item-from-memory" data-item-id="42">42</span>
</div>
```

- **条件**：`mem.source_item_id` 不为 null 才渲染
- **位置**：在 memory 卡片内容下方、actions 上方（具体位置 DeepSeek 看现有结构定）
- **样式**：用 inline style 控制（旧前端的风格，不强求加 CSS 类）

### 3.2 memory 详情：source_item 卡片

memory 详情**当前是怎么打开的**：DeepSeek 自己定位。如果列表卡片点击只是切换 confirm/archive 不开详情，那本节只需要在 GET 详情之后存进 viewer 渲染的位置。

> 如果旧前端目前**没有** memory 详情弹层，仅有列表 + 快捷动作，那么本节简化为：**列表卡片的"派生自 item #N"行就是唯一的展示位**，不需要详情卡片。把这种情况在 commit message 里写明，不算阻塞。

如果有详情弹层（或后续要建）：

在 memory 详情下方加一个 section，标题"来源 item"，内容：

```
[type_label] snippet前60字 · created_at相对时间
```

附一个按钮 `[查看原文]`，点击切到 item viewer：

```js
await openItemViewer(memory.source_item.id);
```

### 3.3 跳转：点击来源 item

全局点击委托加一个 case：

```js
} else if (action === "open-item-from-memory") {
    const itemId = parseInt(target.getAttribute("data-item-id"), 10);
    if (Number.isFinite(itemId)) {
        await openItemViewer(itemId);
    }
}
```

> 复用 `openItemViewer`（`app.js:2251`），不要写新函数。

### 3.4 边界处理

- `source_item_id` 为 null → 不渲染来源行
- `source_item` 为 null（item 已删，FK SET NULL 已生效）→ 来源行可以保留显示 `派生自 item #N（已删除）`，**或者**不渲染。**选不渲染**——简单稳定。
- list 接口（`GET /memories`）当前**不返回** `source_item` 嵌套对象（B-003 只改了详情接口），所以**列表只用 `source_item_id`** 渲染"派生自 item #N"，不查 snippet。

## 4. API 依赖

| 端点 | 方法 | 用到的字段 |
|---|---|---|
| `GET /memories` | — | `memories[].source_item_id` |
| `GET /memories/<id>` | — | `memory.source_item: { id, type, type_label, snippet, created_at }` |
| `GET /item/<id>` | — | （由 `openItemViewer` 内部调用） |

## 5. 验收清单

- [ ] `node --check core/static/app.js` 通过
- [ ] 手动验证：
  1. 跑 B-004 验收里第 4 步建一条派生 memory
  2. 进入"记忆"面板 → 该 memory 卡片下方显示"派生自 item #N"
  3. 点击 "N" → 切到 item viewer 显示原 item
  4. 直接 `POST /memories` 建一条无来源 memory → 卡片不显示来源行
  5. 把 source item 删掉 → 该 memory 卡片不再显示来源行
- [ ] 不破坏既有 memory 卡片样式（confirm / archive / delete 按钮位置不动）

## 6. 禁止事项

- 不要在列表接口里多发请求查 source item snippet（B-003 故意没把 source_item 加进列表，保持 payload 小）
- 不要新建 modal 组件
- 不要修改 `MEMORY_CATEGORIES` / 标签映射
- 不要动 `core/templates/app.html`
- 不要给来源行加复杂样式 / 动画

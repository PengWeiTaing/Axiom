# 008 — suggestion 采纳时保留 source_item_id

> 一句话目标：让旧前端的 "采纳建议" 动作在 `source_item_id` 不为 null 时走 promote 端点，自动把来源链接上。

## 1. 背景 / Why

B-002 让 `/memories/suggest` 返回的每条建议都带 `source_item_id`，但**前端目前不会用这个字段**——采纳建议时只调 `POST /memories`，结果即使 LLM 已经定位到来源 item，新建的 memory 仍然是孤立的（source_item_id = null）。这等于 B-002 的功改一半。

本任务把采纳路径分两条：

- `source_item_id != null` → 走 `POST /item/<source_item_id>/promote-to-memory`（B-001 的端点）
- `source_item_id == null` → 走 `POST /memories`（旧路径）

> **依赖**：B-001（promote 端点）+ B-002（suggest 返回 source_item_id）。**不依赖** B-003/B-004/B-005。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `core/static/app.js` | 修改 suggest 渲染区域里的"采纳"按钮处理逻辑 | +20/-5 |

## 3. 设计契约

### 3.1 定位现有采纳逻辑

DeepSeek 自己定位：

- `elements.suggestMemoriesButton`（约 `app.js:181`）触发 `POST /memories/suggest`
- 渲染建议清单 + 每条建议的"采纳"按钮（搜 `suggestions` 渲染相关函数；可能叫 `renderMemorySuggestions` 或类似名）
- 点击"采纳"现在直接调 `POST /memories` —— **这是要改的入口**

如果旧前端**根本没有**"采纳"按钮（suggest 只展示不提供采纳路径）→ 在任务单底部加 BLOCKED 段，停下问 Opus，**不要自创交互**。

### 3.2 采纳路径分支

把原 `POST /memories` 调用替换为：

```js
async function adoptSuggestion(suggestion) {
    const { category, content, source_item_id: sourceItemId } = suggestion;
    if (!category || !content) {
        alert("建议数据缺失，无法采纳。");
        return;
    }

    try {
        if (sourceItemId != null) {
            // 有来源 item → 走 promote 端点
            await apiRequest(`/item/${sourceItemId}/promote-to-memory`, {
                method: "POST",
                json: { category, content },
            });
        } else {
            // 无来源 → 走凭空新建
            await apiRequest("/memories", {
                method: "POST",
                json: { category, content },
            });
        }
        // 采纳成功 → 从当前 suggestions 列表移除该条 + 刷新 memory stats
        removeSuggestionFromDom(suggestion);  // DeepSeek 自己实现细节，沿用既有移除方式
        const stats = await apiRequest("/memories/stats");
        renderMemoryStats(stats);
    } catch (error) {
        alert("采纳失败：" + error.message);
    }
}
```

> 关键差异在 `sourceItemId != null` 的判断上。**用 `!=` 不要用 `!==`** —— suggest 可能返回 `null` 也可能 undefined，`!=` 一次覆盖。

### 3.3 兜底

- 如果 promote 端点返回 404（理论上不会，因为 source_item_id 来自最近 7 天 items，刚刚还在），按错误流程展示 alert，**不要自动回退到 POST /memories**。让用户看见错误更安全。
- 不要在前端校验 category 合法性——后端会返回 400 invalid_category，alert 出来就行。

### 3.4 不做的事

- 不要为这个改动新建函数文件
- 不要把整段 suggest 流程重构成 store / state machine
- 不要给"采纳"按钮加 confirm 二次确认（建议本身是 candidate 状态，用户随时能归档）
- 不要把 source_item_id 显式渲染到建议卡片上（B-005 才是来源行展示，且只在 memory 卡片上，不在 suggestion 卡片上）

## 4. API 依赖

| 端点 | 方法 | 入参 | 返回 |
|---|---|---|---|
| `/item/<id>/promote-to-memory` | POST | `{ category, content }` | `{ memory: {...} }` |
| `/memories` | POST | `{ category, content }` | `{ memory: {...} }` |
| `/memories/stats` | GET | — | `{ total, by_category }` |

## 5. 验收清单

- [ ] `node --check core/static/app.js` 通过
- [ ] 手动验证（配 AI key 的环境）：
  1. 启动 receiver，登入 `/app`
  2. 进入记忆面板，点 "AI 建议" 按钮（或既有触发 suggest 的入口），看到一组建议
  3. 找一条 `source_item_id` 非 null 的建议（DeepSeek 可临时 console.log 验证），点采纳
  4. 进入 `/memories` 列表，新 memory 的 source_item_id 已写入（可通过 `GET /memories/<id>` 看 `source_item_id`，或 B-005 完成后看卡片底部的"派生自 item #N"行）
  5. 找一条 `source_item_id` 为 null 的建议（如果 LLM 输出 `0|...` 或解析失败），点采纳，新 memory.source_item_id == null
  6. 类别非法的建议本来就在解析阶段被丢弃，不需要测
- [ ] 无 AI key 时按钮触发 suggest → 503 → alert 正常显示，**不**误触发采纳路径
- [ ] 既有"凭空"新增 memory 的路径（`memoryQuickForm` 那条）**不受影响**

## 6. 禁止事项

- 不要动后端
- 不要修改 `apiRequest` 签名
- 不要新建 endpoints 文件 / 不要重构成 store
- 不要把 source_item_id 渲染在建议 UI 上
- 不要给 promote 失败做"自动回退到 POST /memories"

# 006 — SmartInput lifeline 建议

> 一句话：用户在 Capture 输入内容，AI 分析后自动建议归类到哪个 lifeline。用户点 ✓ 确认，entity 创建时直接挂载。补上 Capture → Atlas 的数据断层。

## 1. 范围

修改 `/parse` 后端 + `useSmartCapture` 前端管线 + SmartInput ghost UI。**不做**自动挂载（不点 ✓ 就不挂）、不做 lifeline 匹配算法优化（靠 LLM 判断）、不做离线关键词回退。

## 2. 产品边界

- lifeline 建议只是**建议**，用户不确认时 entity 正常创建，只是不挂载。不阻塞捕获流程。
- 建议基于 LLM 语义判断（/parse 延长 prompt），不做本地关键词匹配。
- `/parse` 返回里 `suggested_lifeline` 可选——LLM 认为没合适的就不返回。
- 不在本任务里做"自动挂载"偏好设置（留给未来）。

## 3. 数据流

```
SmartInput 输入
  → /parse（prompt 含 lifeline 列表）
  → LLM 返回 { type, ..., suggested_lifeline: "rust" }
  → useSmartCapture 创建 entity（不带 lifeline）
  → SmartInput ghost 显示: "AI 判定为 任务 · 归类到 Rust 学习? ✓"
  → 用户点 ✓ → mountEntity(kind, id, "rust")
  → 用户不理 → ghost 1.8s 消失，entity 保持未挂载（后续可在 Atlas LifelinePanel 手动挂）
```

## 4. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `core/routes/ai.py` | `/parse` 扩展 prompt + JSON 解析 + 返回 suggested_lifeline | +40 行 |
| `frontend/src/api/types.ts` | `ParseResult` 加 `suggested_lifeline_id?` / `suggested_lifeline_name?` | +3 行 |
| `frontend/src/composables/useSmartCapture.ts` | 传送 suggestion 到 CaptureSuccess + 导出一个 `acceptLifeline()` 函数 | +25 行 |
| `frontend/src/components/SmartInput.vue` | ghost 行显示 lifeline 建议 + ✓ 按钮 | +15 行 |

## 5. 后端：/parse 扩展

### 5.1 获取 lifeline 列表

在 `parse_input()` 函数开头（AI key 可用分支）加：

```python
# 读取 lifeline 列表供 LLM 匹配
lifeline_conn = get_db_connection()
try:
    ll_rows = lifeline_conn.execute("SELECT id, name FROM lifelines ORDER BY id").fetchall()
    lifeline_map = {r["id"]: r["name"] for r in ll_rows}
finally:
    lifeline_conn.close()
```

如果 lifeline_map 为空，跳过 suggestion（不影响现有逻辑）。

### 5.2 扩展 prompt

把现有 prompt（第 218-222 行）替换为：

```python
ll_hint = ""
if lifeline_map:
    ll_list = "\n".join(f'  {lid}: {lname}' for lid, lname in lifeline_map.items())
    ll_hint = f"\n已有的 lifeline（选择合适的，没有合适的填 null）：\n{ll_list}\n"

prompt = (
    f"输入: {text}\n\n"
    "分析这段话并只返回一行 JSON（不要 markdown、不要解释）：\n"
    '{{"type":"task|memory|decision|note","title":"...","content":"..."'
    + (',"suggested_lifeline":"<id>"' if lifeline_map else '')
    + '}\n\n'
    "分类规则：task=有日期/待办, memory=关于我的陈述/偏好, decision=选择/决定, note=其他\n"
    f"{ll_hint}"
)
```

关键：prompt 必须强调"只返回一行 JSON"，现有实现用文本关键词匹配，改 JSON 解析后要处理 markdown code fence。

### 5.3 解析 JSON 响应

替换现有 `for token in [...]` 的匹配逻辑：

```python
import re as _re
raw = result_text

# 去掉 markdown code fence
m = _re.search(r'\{[^{}]*\}', raw)
if m:
    raw = m.group(0)

try:
    parsed = json.loads(raw)
except (json.JSONDecodeError, TypeError):
    # 降级：保持原有 keyword 匹配行为
    for token in ["task", "memory", "decision", "note", "health", "url"]:
        if token in result_text:
            return ok_response({"type": token, "title": text[:60], "content": text})
    return ok_response({"type": "note", "content": text})

resp_type = str(parsed.get("type", "note")).strip().lower()
if resp_type not in ("task", "memory", "decision", "note", "health", "url"):
    resp_type = "note"

result = {
    "type": resp_type,
    "title": str(parsed.get("title", text[:60])),
    "content": str(parsed.get("content", text)),
}

# lifeline suggestion
suggested_id = str(parsed.get("suggested_lifeline", "")).strip() if parsed.get("suggested_lifeline") else ""
if suggested_id and suggested_id in lifeline_map:
    result["suggested_lifeline_id"] = suggested_id
    result["suggested_lifeline_name"] = lifeline_map[suggested_id]

return ok_response(result)
```

## 6. 前端类型

在 `frontend/src/api/types.ts` 的 `ParseResult` 加两个可选字段：

```typescript
export interface ParseResult {
  // ... 现有字段
  suggested_lifeline_id?: string;    // raw ID, e.g. "rust"
  suggested_lifeline_name?: string;  // display name, e.g. "Rust 学习"
}
```

在 `frontend/src/composables/useSmartCapture.ts` 的 `CaptureSuccess` 加：

```typescript
export interface CaptureSuccess {
  // ... 现有字段
  suggestedLifelineId?: string;
  suggestedLifelineName?: string;
}
```

## 7. useSmartCapture 改动

### 7.1 传送 suggestion

在 `route()` 函数中，每个 case 构建 `CaptureSuccess` 时加上：

```typescript
suggestedLifelineId: parsed.suggested_lifeline_id,
suggestedLifelineName: parsed.suggested_lifeline_name,
```

同步在 `capture()` 函数中兜底 `/add` 路径和纯 URL 路径，这两个路径通常没有 lifeline 建议（不传即可）。

### 7.2 导出 acceptLifeline

```typescript
import { mountEntity } from '@/api/endpoints';

export function useSmartCapture() {
  // ... existing code ...

  async function acceptLifeline(result: CaptureSuccess) {
    if (!result.suggestedLifelineId || !result.item) return
    const kind = result.kind === 'file' || result.kind === 'url' ? 'item' : result.kind
    try {
      await mountEntity(kind, result.item.id, result.suggestedLifelineId)
    } catch {
      // 静默失败，不影响主流程
    }
  }

  return { capture, submitting, lastResult, lastError, acceptLifeline };
}
```

注意：`note` / `health` / `file` / `url` 类型都走 `addNote()` → 产生 `items` 表记录 → kind 是 `"item"`。

## 8. SmartInput ghost UI

在 `SmartInput.vue` 的 ghost 行加 lifeline 建议：

```html
<span v-if="ghost" class="ghost" :data-kind="ghost.kind">
  <span class="ghost-dot" />
  AI 判定为 <strong>{{ ghost.label }}</strong>
  <template v-if="ghost.suggestedLifelineName">
    · 归类到
    <strong class="lifeline-suggest">{{ ghost.suggestedLifelineName }}</strong>
    <button class="ghost-accept" @click="onAcceptLifeline">✓</button>
  </template>
</span>
```

加 CSS：

```css
.ghost .lifeline-suggest {
  color: var(--accent);
}

.ghost-accept {
  background: none;
  border: 1px solid var(--accent);
  border-radius: var(--r-1);
  color: var(--accent);
  cursor: pointer;
  font-size: 12px;
  padding: 0 4px;
  margin-left: 2px;
  line-height: 1.4;
}

.ghost-accept:hover {
  background: var(--accent);
  color: var(--surface-0);
}
```

`onAcceptLifeline` 函数：

```typescript
const { capture, submitting, lastError, acceptLifeline } = useSmartCapture();

async function onAcceptLifeline() {
  if (!ghost.value) return
  await acceptLifeline(ghost.value)
  // 视觉反馈：把 ✓ 变成 "已归类"
  ghost.value = { ...ghost.value, suggestedLifelineId: undefined, suggestedLifelineName: undefined }
}
```

## 9. 验收

```bash
# 1. 先创建至少一个 lifeline（用于测试建议）
curl -X POST -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"id":"rust","name":"Rust 学习"}' \
  http://127.0.0.1:5000/lifelines

# 2. 测 /parse 返回 suggested_lifeline
curl -X POST -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"今天学完了 Rust trait 对象这一章"}' \
  http://127.0.0.1:5000/parse | python -m json.tool

# 期望响应包含:
#   "suggested_lifeline_id": "rust"
#   "suggested_lifeline_name": "Rust 学习"

# 3. 验证无 lifeline 时不返回建议字段
curl -X POST -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"随便记一条笔记"}' \
  http://127.0.0.1:5000/parse | python -m json.tool

# 期望响应不含 suggested_lifeline_id 字段

# 4. 前端 build
cd frontend && npm run build

# 5. 人肉验证
# - 打开 Axiom，确认有 lifeline
# - 在 SmartInput 输入 "刚完成了 Rust 所有权章节的练习"
# - Cmd+Enter 提交
# - 看到 ghost 行显示 "AI 判定为 任务 · 归类到 Rust 学习? ✓"
# - 点 ✓ → ghost 消失
# - 去 Atlas LifelinePanel 展开 "Rust 学习" → 确认 entity 已挂载
# - 再输一条无关内容，确认不显示 lifeline 建议
```

## 10. 禁止事项

- 不在 `/parse` 无 AI key 的 fallback 里做 lifeline 关键词匹配（v0.1 只靠 LLM）
- 不阻塞 entity 创建等 lifeline 确认
- 不自动挂载（用户必须点 ✓）
- 不修改 `/parse` 的 401/400 错误码
- `/parse` 的 response schema 向后兼容——没有 lifeline 时不返回那两个字段，老前端不受影响

## 11. 提交风格

```
add: 006 — SmartInput lifeline 建议

- /parse 扩展 prompt + JSON 解析，可选返回 suggested_lifeline
- useSmartCapture 传送 lifeline 建议到 CaptureSuccess
- SmartInput ghost 显示 "归类到 XX? ✓"，用户确认后挂载 entity
```

PR 描述里贴：curl /parse 输出（含 suggested_lifeline）、build 结果。

# 005f — Atlas 节点交互 + 关联确认

> 一句话：点击 Atlas 3D 节点弹出详情卡，用户可以在详情卡里确认/拒绝 pending 关联。Atlas 从"只能看"变成"能探索"。

## 1. 范围

后端 1 个 review 端点 + 前端 1 个详情卡组件 + scene.ts 微调。**不做**关联手动创建、不做 entity 详情编辑、不做节点搜索。

## 2. 产品边界

- 详情卡只在 `node_focus` 状态下显示。`global_overview` / `region_zoom` 状态下不显示。
- 关联确认操作即时生效（乐观更新 store 缓存，失败回滚）。
- 已拒绝的关联在 3D 视图中不显示连线；已确认的显示实线；pending 显示虚线（现有逻辑已实现，确认后触发重渲染即可）。

## 3. 当前状态速查

`frontend/src/cosmos/scene.ts:149-151` **已经**按 status 区分线条样式：
- `status === 'pending'` → `LineDashedMaterial`（虚线）
- 其余 → `LineBasicMaterial`（实线）

`frontend/src/cosmos/scene.ts:132` 只显示 `confidence >= 0.7` 的关联（在 relation_reveal 模式）。

前端已有的 `node_focus` 状态（`src/cosmos/types.ts:39`）携带 `entity_kind` + `entity_id`，状态机已就绪。

## 4. 改动文件

| 文件 | 改动 | 估算 |
|---|---|---|
| `core/routes/cosmos_associations.py` | 加 `POST /cosmos/associations/<id>/review` | +30 行 |
| `frontend/src/components/cosmos/NodeDetailCard.vue` | **新建** 详情卡组件 | ~180 行 |
| `frontend/src/views/CosmosView.vue` | 集成 NodeDetailCard | +5 行 |
| `frontend/src/stores/cosmos.ts` | 加 `reviewAssociation()` + 乐观更新 | +25 行 |
| `frontend/src/api/endpoints.ts` | 加 `reviewAssociation` 函数 | +5 行 |
| `scripts/smoke_test_cosmos_assoc.py` | 加 2 条 review 测试 | +30 行 |

## 5. POST /cosmos/associations/\<id\>/review

```
POST /cosmos/associations/A1/review
X-Axiom-Key: xxx
Content-Type: application/json

{ "status": "accepted" }
```

- `status`：`"accepted"` 或 `"rejected"`
- association 不存在 → `404`
- 无效 status → `400`

**返回 200**：
```json
{
  "ok": true,
  "association": {
    "id": "A1",
    "from": "task:3",
    "to": "memory:7",
    "relation_type": "causal",
    "confidence": 0.82,
    "status": "accepted",
    "evidence": [...]
  }
}
```

返回的 `from`/`to` 走 `entity_id()` 前缀协议（复用已有的 `entity_id` 函数）。

## 6. NodeDetailCard 组件

### 6.1 位置与外观

- CosmosView 右侧，固定定位，width 280px，top/right 各 `var(--s-4)`，max-height 60vh，overflow-y auto
- 背景 `var(--surface-1)`，圆角 `var(--r-2)`，内边距 `var(--s-3)`
- z-index 20（与 HUD 同级，但在右侧）
- `<script setup lang="ts">`

### 6.2 显示内容（node_focus 状态时）

**头部**：
- entity 名称（粗体，`var(--text-1)`）
- kind 徽章（小标签：T/M/D/I，颜色 `var(--accent)`）

**lifeline 路径**：
- 当前 entity 所属的 lifeline 名称（从 `store.data.lifelines` 查找），点击可 zoom 到该 lifeline
- 未挂载 lifeline 显示 "未归类"（灰色）

**关联列表标题**："关联 (N)"

**每条关联行**（从 `store.data.associations` 按 `from === entityId || to === entityId` 过滤）：
- 关系类型徽章（颜色区分）：
  - `co_occurrence` → `var(--text-3)`
  - `causal` → `var(--accent)`
  - `tension` → `var(--warm)`（如果 tokens.css 有定义，否则用 `var(--text-5)`）
  - `derived_from` → 灰/次级色
- 对方 entity 名称（截断 30 字符），点击可切换 focus 到该 entity
- 置信度百分比（如 "82%"）
- 状态徽章：pending（虚线边框）、accepted（实心绿）、rejected（灰色删除线）
- **pending 关联**：行尾显示 ✓（接受）和 ✗（拒绝）按钮

**空状态**：如果该 entity 没有关联，显示 "暂无关联"

### 6.3 交互行为

- ✓ 接受 → 调 `store.reviewAssociation(id, "accepted")`，行状态即时变为 accepted
- ✗ 拒绝 → 调 `store.reviewAssociation(id, "rejected")`，行状态即时变为 rejected
- 点击对方 entity 名称 → `store.transition({ kind: 'node_focus', entity_kind, entity_id })`，卡片切换到新 entity
- 点击 lifeline 路径 → `store.transition({ kind: 'region_zoom', lifeline_id })`
- 按 Esc 或点击卡片外的 3D 画布 → `store.transition({ kind: 'region_zoom', lifeline_id: 当前 entity 所属 lifeline })` 或回退到 `global_overview`

### 6.4 视觉约束

- 只用 `tokens.css` 变量
- 按钮用文本字符（✓ ✗），不引入 icon 库
- kind 徽章用单字母：T（task）、M（memory）、D（decision）、I（item）

## 7. Store 改动

在 `frontend/src/stores/cosmos.ts` 加：

```typescript
async function reviewAssociation(assocId: string, status: 'accepted' | 'rejected') {
  // 乐观更新本地缓存
  if (data.value) {
    const idx = data.value.associations.findIndex(a => a.id === assocId)
    if (idx !== -1) {
      data.value = {
        ...data.value,
        associations: [
          ...data.value.associations.slice(0, idx),
          { ...data.value.associations[idx], status },
          ...data.value.associations.slice(idx + 1),
        ],
      }
    }
  }

  try {
    const { reviewAssociation: apiReview } = await import('@/api/endpoints')
    await apiReview(assocId, status)
  } catch {
    // 失败回滚：全量 reload
    await reload()
  }
}
```

乐观更新让用户点击 ✓/✗ 后无需等网络 —— 即刻看到状态变化。API 失败时 reload 恢复正确状态。

## 8. API 函数

在 `frontend/src/api/endpoints.ts` 加：

```typescript
export const reviewAssociation = (id: string, status: 'accepted' | 'rejected') =>
  apiRequest<{ ok: boolean; association: import('@/cosmos/types').CosmosAssociation }>(
    `/cosmos/associations/${encodeURIComponent(id)}/review`,
    { method: 'POST', json: { status } },
  );
```

## 9. smoke test 补充

在 `scripts/smoke_test_cosmos_assoc.py` 末尾（总结之前）加：

```python
# ---- 7. Review association ----
# 先种子一条 pending association
conn = get_db_connection()
try:
    conn.execute(
        "INSERT INTO associations (id, from_kind, from_id, to_kind, to_id, relation_type, confidence, status) "
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        ("REVIEW_TEST", "item", str(item_id), "task", str(task_id), "co_occurrence", 0.5, "pending"),
    )
    conn.commit()
finally:
    conn.close()

resp = req("post", "/cosmos/associations/REVIEW_TEST/review", {"status": "accepted"})
check("review accept: 200", resp.status_code == 200)
check("review accept: status", resp.get_json()["association"]["status"] == "accepted")

resp = req("post", "/cosmos/associations/REVIEW_TEST/review", {"status": "rejected"})
check("review reject: 200", resp.status_code == 200)
check("review reject: status", resp.get_json()["association"]["status"] == "rejected")

resp = req("post", "/cosmos/associations/REVIEW_TEST/review", {"status": "invalid"})
check("review invalid status: 400", resp.status_code == 400)

resp = req("post", "/cosmos/associations/NONEXIST/review", {"status": "accepted"})
check("review nonexist: 404", resp.status_code == 404)
```

注：`item_id` 和 `task_id` 复用 smoke test 前面已种子过的变量（测试文件的 80/86 行已保存了 `item_id` 和 `task_id`）。如果原测试用的是固定 ID 而非 `last_insert_rowid()`，种子 REVIEW_TEST 时用固定 ID=1 即可。

## 10. 验收

```bash
# 1. 重启 backend
python -m core.receiver

# 2. curl 验证 review
curl -X POST -H "X-Axiom-Key: $AXIOM_SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status":"accepted"}' \
  http://127.0.0.1:5000/cosmos/associations/A1/review

# 3. 冒烟测试
python scripts/smoke_test_cosmos_assoc.py
# 期望: "all checks passed (N tests)"（N 比之前多 4 条）

# 4. 前端 build
cd frontend && npm run build

# 5. 人肉验证
# - 打开 Atlas，确认有 lifeline + 挂载 entity + 生成的关联
# - 点击 entity 节点 → 右侧弹出详情卡
# - 在详情卡里 ✓ 接受一条 pending 关联 → 状态即时变化
# - ✗ 拒绝一条 → 状态即时变化
# - 按 Esc → 卡片关闭
# - 按 r → 进入关联揭示模式（relation_reveal），已接受的显示实线连线
```

## 11. 提交风格

```
add: 005f — Atlas 节点交互 + 关联确认

- POST /cosmos/associations/<id>/review 端点
- NodeDetailCard：node_focus 状态右侧详情卡，显示 entity 信息 + 关联列表
- 关联即时确认/拒绝（乐观更新 store）
- smoke test 加 review 场景
```

PR 描述里贴：build 输出末尾、smoke test 通过行、Atlas 截图（详情卡 + 关联线）。

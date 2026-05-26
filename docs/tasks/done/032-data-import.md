# 032 — Atlas 数据导入

> 028 实现了数据导出（JSON + Markdown），但没有导入能力。用户无法恢复备份、迁移数据、或加载外部知识图谱。本轮实现完整的数据导入流程：后端 `POST /cosmos/import` 接受 JSON，解析并重建 lifelines / entities / associations；前端 ImportDialog 提供文件选择、预览、冲突策略、结果摘要。

## 1. 范围

| 文件 | 改动 | 估算 |
|---|---|---|
| `core/routes/cosmos_import.py` | **新建**：`POST /cosmos/import` 导入端点 | +130 行 |
| `core/routes/__init__.py` | 注册蓝图路由 `/cosmos/import` | +3 行 |
| `frontend/src/api/endpoints.ts` | `importCosmos` 函数 | +12 行 |
| `frontend/src/components/cosmos/ImportDialog.vue` | **新建**：导入对话框（文件选择 + 预览 + 结果） | +160 行 |
| `frontend/src/views/CosmosView.vue` | 入口按钮 + 对话框挂载 + reload | +25 行 |

**总计约 330 行**。后端 ~130 行，前端 ~200 行。

## 2. 产品边界

- **做**：导入 028 格式的 JSON 文件（或任何符合 CosmosData schema 的 JSON），lifelines 按 ID upsert，entities 重新创建（新 ID）并挂载到对应 lifeline，associations 按旧 ID→新 ID 映射重建，返回导入摘要（新增/跳过/失败计数），前端预览 + 确认 + 结果展示
- **不做**：Markdown 格式导入、CSV 导入、增量同步、导入撤消、导入历史记录、拖拽文件上传（用 `<input type="file">` 即可）、导入进度条、超大文件分片处理
- 假设导入文件 < 10MB，entity 数量 < 5000

## 3. 导入语义

### 3.1 Lifeline 处理 — Upsert

```
如果 lifeline.id 已存在 → 更新 name 和 parent_id（不改变 order_index）
如果 lifeline.id 不存在 → INSERT 新行（保留原 id）
```

Lifeline 的 `id` 是用户自定义的（如 `lifeline:rust-learning`），可以从导出文件原样恢复。

### 3.2 Entity 处理 — 重新创建

Entity 的原始 ID（如 `task:42`）中的数字部分来自数据库自增 ID，导入时无法保留。策略：

1. 创建新 entity（调用对应 kind 的 API），获得新 `raw_id`
2. 记录旧 ID → 新 ID 映射：`"task:42" → "task:157"`
3. 如果 entity 有 `lifeline_id`，调用 `mountEntity` 挂载

Entity 创建使用最小化数据（title/content），不复制所有元数据字段（优先级、状态等会丢失——这是导入的限制，明确告知用户）。

### 3.3 Association 处理 — 按映射重建

1. 用旧 ID→新 ID 映射转换 `from` 和 `to`
2. 如果 from 或 to 的映射不存在（entity 可能未导入），跳过该关联
3. 保留 `relation_type`、`confidence`、`status`、`evidence`
4. 关联 ID 重新生成（不保留旧 ID）

### 3.4 冲突策略

默认策略：**跳过已存在 + 创建新的**。
- Lifeline：同名 ID → 更新
- Entity：永远创建新（不会冲突）
- Association：永远创建新（使用新 entity ID）
- 如果导入文件中 entity 没有对应的 lifeline_id（或 lifeline 不存在），entity 创建但不挂载

### 3.5 返回结果

```json
{
  "ok": true,
  "imported": {
    "lifelines": { "created": 3, "updated": 1, "skipped": 0 },
    "entities": { "created": 42, "skipped": 0 },
    "associations": { "created": 28, "skipped": 4, "skipped_reason": "4 associations skipped (source entity not found)" }
  }
}
```

## 4. 后端实现

### 4.1 `POST /cosmos/import`

**文件**: `core/routes/cosmos_import.py`

```python
from core._common import *

def register_routes(app):
    @app.route('/cosmos/import', methods=['POST'])
    def cosmos_import():
        err = require_key()
        if err: return err
        
        body = request.get_json(silent=True)
        if not body:
            return error_response(400, 'bad_request', '请求体不能为空')
        
        # 验证基本结构
        if 'entities' not in body or 'associations' not in body:
            return error_response(400, 'bad_request', '缺少 entities 或 associations 字段')
        
        conn = get_db_connection()
        lifeline_result = {'created': 0, 'updated': 0}
        entity_result = {'created': 0}
        assoc_result = {'created': 0, 'skipped': 0}
        id_map: dict[str, str] = {}  # old_id → new_id
        
        try:
            # 1. Import lifelines
            for ll in body.get('lifelines', []):
                ll_id = ll.get('id', '').strip()
                ll_name = ll.get('name', '').strip()
                if not ll_id or not ll_name:
                    continue
                parent_id = ll.get('parent_id') or None
                existing = conn.execute(
                    'SELECT id FROM lifelines WHERE id = ?', (ll_id,)
                ).fetchone()
                if existing:
                    conn.execute(
                        'UPDATE lifelines SET name = ?, parent_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                        (ll_name, parent_id, ll_id)
                    )
                    lifeline_result['updated'] += 1
                else:
                    conn.execute(
                        'INSERT INTO lifelines (id, name, parent_id) VALUES (?, ?, ?)',
                        (ll_id, ll_name, parent_id)
                    )
                    lifeline_result['created'] += 1
            
            # 2. Import entities — create new, build id_map
            for ent in body.get('entities', []):
                old_id = ent.get('id', '').strip()
                kind = ent.get('kind', '').strip()
                title = ent.get('title', '').strip()
                lifeline_id = ent.get('lifeline_id') or None
                
                if not old_id or not kind or not title:
                    continue
                if kind not in ('task', 'memory', 'decision', 'item'):
                    continue
                
                new_id = _create_entity(conn, kind, title)
                if new_id:
                    id_map[old_id] = f'{kind}:{new_id}'
                    entity_result['created'] += 1
                    # Mount to lifeline if applicable
                    if lifeline_id:
                        _mount_entity(conn, kind, new_id, lifeline_id)
            
            # 3. Import associations — remap IDs
            for assoc in body.get('associations', []):
                old_from = assoc.get('from', '').strip()
                old_to = assoc.get('to', '').strip()
                new_from = id_map.get(old_from)
                new_to = id_map.get(old_to)
                
                if not new_from or not new_to:
                    assoc_result['skipped'] += 1
                    continue
                
                _create_association(
                    conn,
                    from_id=new_from,
                    to_id=new_to,
                    relation_type=assoc.get('relation_type', 'manual'),
                    confidence=assoc.get('confidence', 0.5),
                    status=assoc.get('status', 'accepted'),
                    evidence=assoc.get('evidence', [])
                )
                assoc_result['created'] += 1
            
            conn.commit()
            
            return ok_response({
                'imported': {
                    'lifelines': lifeline_result,
                    'entities': entity_result,
                    'associations': assoc_result,
                }
            })
        except Exception as e:
            conn.rollback()
            return error_response(500, 'import_failed', str(e))
        finally:
            conn.close()
```

### 4.2 辅助函数

```python
def _create_entity(conn, kind: str, title: str) -> int | None:
    """创建 entity 并返回自增 ID"""
    table_map = {
        'task': 'tasks',
        'memory': 'memories',
        'decision': 'decisions',
        'item': 'items',
    }
    table = table_map.get(kind)
    if not table:
        return None
    
    if kind == 'memory':
        cur = conn.execute(
            f'INSERT INTO {table} (category, content) VALUES (?, ?)',
            ('fact', title)
        )
    elif kind == 'decision':
        cur = conn.execute(
            f'INSERT INTO {table} (title, decision) VALUES (?, ?)',
            (title, title)
        )
    elif kind == 'task':
        cur = conn.execute(
            f'INSERT INTO {table} (title) VALUES (?)',
            (title,)
        )
    else:  # item
        cur = conn.execute(
            f'INSERT INTO {table} (content, source, content_type) VALUES (?, ?, ?)',
            (title, 'import', 'text')
        )
    return cur.lastrowid


def _mount_entity(conn, kind: str, raw_id: int, lifeline_id: str):
    """挂载 entity 到 lifeline"""
    table_map = {
        'task': 'tasks',
        'memory': 'memories',
        'decision': 'decisions',
        'item': 'items',
    }
    table = table_map.get(kind)
    if not table:
        return
    conn.execute(
        f'UPDATE {table} SET lifeline_id = ? WHERE id = ?',
        (lifeline_id, raw_id)
    )


def _create_association(conn, from_id: str, to_id: str, relation_type: str,
                        confidence: float, status: str, evidence: list):
    """创建关联"""
    from_kind, from_raw = from_id.split(':', 1)
    to_kind, to_raw = to_id.split(':', 1)
    assoc_id = f'assoc:{uuid4().hex[:12]}'
    evidence_json = json.dumps(evidence, ensure_ascii=False) if evidence else None
    
    conn.execute(
        '''INSERT INTO associations (id, from_kind, from_id, to_kind, to_id,
           relation_type, confidence, status, evidence)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
        (assoc_id, from_kind, from_raw, to_kind, to_raw,
         relation_type, confidence, status, evidence_json)
    )
```

### 4.3 注册路由

在 `core/routes/__init__.py` 中：

```python
from core.routes import cosmos_import
cosmos_import.register_routes(app)
```

## 5. 前端实现

### 5.1 endpoints.ts

```typescript
export const importCosmos = (data: Record<string, unknown>) =>
  apiRequest<{
    imported: {
      lifelines: { created: number; updated: number }
      entities: { created: number }
      associations: { created: number; skipped: number }
    }
  }>('/cosmos/import', { method: 'POST', json: data })
```

### 5.2 ImportDialog

三步流程：

**Step 1 — 文件选择**：
- 拖拽区域 + 浏览按钮（`<input type="file" accept=".json">`）
- 读取文件 → JSON.parse → 验证结构
- 验证失败显示错误信息
- 验证成功 → 进入 Step 2

**Step 2 — 预览确认**：
```
┌─ 导入预览 ──────────────────────────┐
│                                      │
│  即将导入：                           │
│  · Lifeline: 5 条                    │
│  · Entity: 42 个                     │
│    Task 20, Memory 12, Decision 8,   │
│    Item 2                            │
│  · 关联: 35 条                       │
│    已确认 28, 待确认 5, 已拒绝 2      │
│                                      │
│  导出时间: 2026-05-26                │
│                                      │
│  ⚠ 注意：Entity 将获得新 ID，       │
│  原有关联会自动重新映射              │
│                                      │
│         [取消]  [确认导入]           │
└──────────────────────────────────────┘
```

**Step 3 — 结果摘要**：
```
┌─ 导入完成 ──────────────────────────┐
│                                      │
│  ✅ Lifeline: 新建 3, 更新 1         │
│  ✅ Entity: 新建 42                  │
│  ✅ 关联: 新建 33, 跳过 2            │
│     (2 条关联的源 entity 未找到)     │
│                                      │
│  数据已刷新，请查看 3D 场景          │
│                                      │
│              [关闭]                  │
└──────────────────────────────────────┘
```

### 5.3 文件验证

```typescript
function validateImportData(data: unknown): { valid: boolean; error?: string; stats?: ImportStats } {
  if (!data || typeof data !== 'object') return { valid: false, error: '无效的 JSON 格式' }
  const d = data as Record<string, unknown>
  if (!Array.isArray(d.entities)) return { valid: false, error: '缺少 entities 数组' }
  if (!Array.isArray(d.associations)) return { valid: false, error: '缺少 associations 数组' }
  
  // 统计
  const entities = d.entities as Array<{ kind: string }>
  const assocs = d.associations as Array<{ status: string }>
  const lifelines = (d.lifelines as Array<unknown>) || []
  
  const kindCounts: Record<string, number> = {}
  for (const e of entities) {
    kindCounts[e.kind] = (kindCounts[e.kind] || 0) + 1
  }
  const statusCounts: Record<string, number> = {}
  for (const a of assocs) {
    statusCounts[a.status || 'unknown'] = (statusCounts[a.status || 'unknown'] || 0) + 1
  }
  
  return {
    valid: true,
    stats: {
      lifelineCount: lifelines.length,
      entityCount: entities.length,
      assocCount: assocs.length,
      kindCounts,
      statusCounts,
      exportedAt: (d.exported_at as string) || '未知',
    }
  }
}
```

### 5.4 CosmosView 集成

- 在导出按钮旁增加"导入"按钮
- `showImport` ref 控制 ImportDialog 显示
- 导入成功后调用 `store.reload()` 刷新数据
- 快捷键：Ctrl+I 打开导入对话框

## 6. 验收

```bash
# 1. Build
cd frontend && npm run build

# 2. 人肉验证 — 导入流程
# - 先用 028 导出一个 JSON 文件
# - 点击"导入"按钮（或 Ctrl+I）
# - 选择刚导出的 JSON 文件
# - 预览显示正确的统计数字
# - 点击"确认导入"
# - 结果摘要显示导入计数
# - 关闭对话框 → 3D 场景刷新

# 3. 人肉验证 — 数据完整性
# - 导入后所有 lifeline 恢复
# - 所有 entity 重新创建（新 ID）
# - 关联线恢复（使用新 entity ID）
# - entity 挂载到正确的 lifeline

# 4. 人肉验证 — 重复导入
# - 再次导入同一个文件
# - Lifeline 显示"更新"而非"新建"
# - Entity 再次创建（又获得新 ID）
# - 关联再次创建

# 5. 人肉验证 — 错误处理
# - 选择非 JSON 文件 → 显示错误
# - 选择格式不正确的 JSON → 显示错误
# - 空文件 → 显示错误

# 6. 人肉验证 — 不破坏
# - 导入不影响现有数据（entity 新建，不覆盖）
# - 其他面板正常
# - 搜索、导航正常
```

## 7. 禁止事项

- 不做 Markdown/CSV 导入
- 不做增量同步/去重
- 不做导入撤消
- 不做拖拽文件上传（用原生 `<input type="file">`）
- 不做导入进度条
- 不在 tokens.css 新增颜色
- 不引入新 npm 依赖
- 不修改现有 API 端点

## 8. 提交风格

```
add: 032 — Atlas 数据导入

- 后端: POST /cosmos/import — lifeline upsert + entity 重建 + association 重映射
- 前端: ImportDialog — 文件选择 → 预览 → 结果摘要三步流程
- endpoints.ts: importCosmos 函数
```

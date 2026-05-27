# NNN — 任务标题

> 一句话目标：…

## 1. 背景 / Why

…为什么要做这件事，目标是什么，对系统/用户意味着什么。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `core/routes/xxx.py` | 加端点 `foo()` | +30 |
| `core/_common.py` | 加常量 / 工具函数 | +5 |
| `scripts/smoke_test_xxx.py` | 加测试用例 | +20 |

## 3. 接口契约

### 端点

```
METHOD /path/<id>
```

### 请求

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `xxx` | str | 是 | … |

### 响应（成功）

```json
{
  "status": "ok",
  "data": { ... }
}
```

### 错误码

| HTTP | code | 触发条件 |
|---|---|---|
| 400 | `missing_xxx` | … |
| 404 | `xxx_not_found` | … |

### 副作用

- 写 `audit_log`：`action=xxx_yyy`, `target_type=...`, `target_id=...`
- 修改 `xxx` 表

## 4. 数据契约（如涉及）

- 表 / 字段 / 索引说明
- 涉及的现有字段：…

## 5. 验收清单

- [ ] `python -m compileall -q core scripts` 通过
- [ ] `python scripts/smoke_test_receiver.py` 通过
- [ ] 手动验证 1：…
- [ ] 手动验证 2：…
- [ ] 不破坏既有端点（跑一遍既有 smoke）

## 6. 禁止事项

- 不要改 …
- 不要新建表
- 不要…

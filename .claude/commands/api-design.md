---
description: 设计 Flask 接口：请求参数、错误码、返回 JSON 结构
---

设计 API 接口。输出以下内容：

1. **端点**：`METHOD /path`
2. **请求参数**：
   - Query string 参数（类型、必填/可选、默认值）
   - JSON body 字段（类型、必填/可选、说明）
3. **认证**：是否走 `X-Axiom-Key` header
4. **成功响应**：JSON 结构示例
5. **错误响应**：各错误码和 message 示例
6. **与现有 API 的一致性**：检查参数命名、分页格式、错误格式是否与 receiver.py 中已有端点一致

必须遵循项目现有模式：
- 成功：`{"ok": true, ...具体数据}`
- 失败：`{"ok": false, "error": {"code": "error_code", "message": "人类可读信息"}}`
- 分页：`page`、`page_size`、`total`、`total_pages`
- 认证函数：`require_key()`
- 数据库：`get_db_connection()` 返回 `sqlite3.Row`

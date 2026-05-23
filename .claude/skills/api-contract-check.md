## api-contract-check

**用途**: 防止前端乱猜后端字段。

**检查项**:
- 端点路径与方法是否匹配
- Query/Body 字段名是否一致
- 返回 JSON 结构是否匹配类型定义
- 错误格式 (`{error: {code, message}}`)
- 分页格式 (`page`, `page_size`, `total`, `total_pages`)

**步骤**:
1. 读 `frontend/src/api/endpoints.ts` 中的调用
2. 对应读 `core/routes/*.py` 中的后端实现
3. 逐字段对比类型定义 vs 实际返回

**输出**:
- 不一致项 (精确到文件和字段)
- 缺失字段
- 类型不匹配项
- 不要编辑文件

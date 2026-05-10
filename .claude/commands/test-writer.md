---
description: 根据已有函数补单元测试、边界测试、回归测试
---

为指定代码编写测试。遵循项目现有测试模式：

1. **测试框架**：Python 标准库 + Flask test_client，不引入 pytest
2. **测试结构**（参考 `scripts/smoke_test_receiver.py`）：
   - 用 `tempfile.TemporaryDirectory` 创建隔离环境
   - 设置 `AXIOM_ROOT`、`AXIOM_SECRET_KEY` 等环境变量
   - 从 `core.receiver` import `app`，用 `app.test_client()` 发请求
   - 每个测试断言成功和错误路径
3. **覆盖类型**：
   - 正常路径（happy path）
   - 边界条件（空输入、超长输入、特殊字符）
   - 错误路径（缺少必填参数、无效参数值、资源不存在）
   - 权限检查（不带 key 应返回 403）
4. **输出**：可直接运行的 Python 脚本，打印 "PASS"/"FAIL" 和具体测试名

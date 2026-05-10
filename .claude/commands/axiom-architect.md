---
description: 按长期架构思路检查 Axiom 改动：输入、索引、Agent、前端、模块化设计
---

对当前 Axiom 改动进行架构审查。以 deep-research-report.md 的八层模型为框架：

1. **采集连接层**：新输入源是否走统一入口（/add、/upload）？
2. **解析与索引层**：新数据类型是否有对应的解析和检索路径？
3. **用户档案与记忆层**：新功能是否与 `memories` 表正确关联？
4. **知识检索层**：查询是否能利用现有检索体系？
5. **计划与决策层**：是否影响 goal/task 系统？
6. **个性化干预层**：（当前未实现，暂跳过）
7. **动作执行层**：是否影响自动化任务（AUTOMATION_JOBS）？
8. **治理与评估层**：新代码是否有备份、一致性检查、错误处理的路径？

同时检查：
- 是否遵循现有模式（`require_key()` + `get_db_connection()` + `ok_response()/error_response()`）
- 是否影响部署链路（deploy_to_vps.py）
- 是否需要同步文档（README、AI_CONTEXT、ITERATION_LOG）

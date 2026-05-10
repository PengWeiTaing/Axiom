---
description: 每次改动后总结 diff、生成 commit message、提醒哪些文件该提交
---

对当前工作区的改动进行分析和提交准备：

1. **运行 `git status` 和 `git diff --stat`**，摘要所有改动文件
2. **分类文件**：
   - 核心代码改动（core/、scripts/）
   - 文档改动（docs/）
   - 配置文件（.env.example、requirements.txt）
   - 不应提交的文件（.env、__pycache__、backup/、data/、logs/）
3. **生成 commit message**（中文，遵循仓库风格）：
   - 格式：简短动词短语 + 补充说明
   - 参考历史格式：`Add <feature>`、`Record <feature> deployment`
4. **提醒**：明确列出应该 `git add` 的文件，和不应该提交的文件
5. **如果用户确认**：执行 `git add` + `git commit`

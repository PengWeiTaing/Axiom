## axiom-context

**用途**: 每次进入项目先读固定文件，不乱扫全仓库。

**步骤**:
1. 读取 `docs/CLAUDE_FRONTEND.md` (API 总览)
2. 读取 `frontend/src/api/types.ts` (数据模型)
3. 读取 `docs/tasks/README.md` (任务协作流程)  
4. 读取 `docs/AI_CONTEXT.md` (架构决策规则)

**输出**:
- 当前架构概要（2-3 句）
- 当前正在进行的任务（任务单目录）
- 涉及的关键文件清单
- 不要编辑任何文件

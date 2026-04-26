# Iteration Log

这份文档只记录迭代，不讲完整架构。

## 2026-04-21

- 以 VPS 上 `/opt/axiom` 的项目快照作为当前状态基线
- 确认当前后端已经存在最小链路
- 确认核心实现集中在 `core/receiver.py`

## 2026-04-26

- 确认 `deep-research-report.md` 作为 Axiom 的长期目标来源
- 补了 `scripts/backup_axiom.py`
- 补了基础备份说明和恢复边界
- 清理了历史运行日志、本地备份 zip、`__pycache__`
- 按新的分类重构文档体系：
  - AI context
  - Human context
  - Long-term goal
  - Short-term goal
  - Project intro
  - Iteration log
  - DeepWiki

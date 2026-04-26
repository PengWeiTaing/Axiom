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
- 重写 `core/receiver.py` 为 v0.1 稳定基底
- `/add` 增加唯一文件名、临时文件写入、入库失败清理
- `/recent` 和 `/search` 统一分页边界与 JSON 错误格式
- 新增 `/health`
- `core/init_db.py` 改为复用 receiver 的建表逻辑
- 新增 `scripts/check_consistency.py`
- 新增 `scripts/smoke_test_receiver.py`
- 新增 `requirements.txt`
- 重写 DeepWiki 生成脚本，把 Wiki 改成 8 页结构化阅读入口

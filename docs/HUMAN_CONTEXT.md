# Human Context

这份文档给人看。

目标不是一次性讲完全部细节，而是让你快速知道：

- 这个项目现在到底处在哪一步
- 你应该先掌握什么
- 哪些地方可以先略读

## 一句话判断

Axiom 现在已经不是概念稿，但也还不是稳定服务。

它当前更像一个已经打通最小链路、正在补可靠性的 `v0.1 alpha` 后端。

## 你先要理解的四件事

- 现在的主节点是 `VPS`，不是本地设备
- 当前主线只有 `输入 -> 存储 -> 检索`
- 文件是内容本体，SQLite 是索引
- 研究报告是长远方向，不是当前任务清单

## 需要完全掌握的位置

下面这些位置，如果你准备继续开发，建议完整理解：

1. `core/receiver.py`
   需要掌握：
   `INBOX_PATH`、`DB_PATH`、`SECRET_KEY`、`init_db()`、`check_key()`、`add_note()`、`recent_items()`、`search_items()`
2. `core/init_db.py`
   需要掌握：
   当前 `items` 表结构，以及它和 `receiver.py` 中建表逻辑的重复关系
3. `scripts/backup_axiom.py`
   需要掌握：
   备份范围、SQLite backup API、zip 输出、`--keep`、`--dry-run`
4. `docs/SHORT_TERM.md`
   需要掌握：
   当前阶段边界、近期优先级、下一步顺序

## 可以先略读的位置

- `deep-research-report.md`
  先知道它是长远目标来源即可，第一次不用逐字读完
- `docs/ITERATION_LOG.md`
  用来回看我们已经做了什么
- `docs/DEEPWIKI.md`
  需要用 DeepWiki 时再看

## 推荐阅读顺序

1. `README.md`
2. `docs/SHORT_TERM.md`
3. `core/receiver.py`
4. `scripts/backup_axiom.py`
5. `deep-research-report.md`

## 当前真正的核心问题

当前最需要持续盯住的不是“还能加什么功能”，而是：

- 服务如何稳定启动
- 文件和数据库如何保持一致
- 备份如何在 VPS 上真正形成固定流程

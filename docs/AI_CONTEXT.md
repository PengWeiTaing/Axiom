# AI Context

这份文档给 AI 协作代理使用。

目标不是介绍项目愿景，而是快速给出当前阶段的稳定事实、边界和默认行为。

## 稳定事实

- 项目名：`Axiom`
- 当前阶段：`v0.1 alpha`
- 当前主链路：`输入 -> 存储 -> 检索`
- 当前主节点：`VPS`
- 当前输入端：`iPhone + iOS 快捷指令`
- 当前技术栈：`Python + Flask + SQLite + 文件系统`
- 当前运行目录思路：`/opt/axiom`

## 当前目录

```text
core/
  receiver.py
  init_db.py
scripts/
  backup_axiom.py
  generate_deepwiki_cache.py
docs/
  AI_CONTEXT.md
  HUMAN_CONTEXT.md
  SHORT_TERM.md
  ITERATION_LOG.md
  DEEPWIKI.md
deep-research-report.md
README.md
```

部署运行时还会存在：

```text
db/
  axiom.db
data/
  inbox/
  archive/
backup/
```

## 当前代码事实

- `core/receiver.py` 是当前主入口
- 已有接口：`/add`、`/recent`、`/search`
- `core/init_db.py` 和 `receiver.py` 都有建表逻辑
- `scripts/backup_axiom.py` 已经存在
- `scripts/generate_deepwiki_cache.py` 用于生成本地中文 DeepWiki 缓存

## 当前设计原则

- 文件是内容本体
- 数据库是索引
- 先保证“能收、能存、能查”
- 不为了工程高级感过早复杂化
- 每次改动尽量小步、清晰、可验证

## 当前优先级

第一优先级：

- receiver 稳定运行
- 文件落盘可靠
- SQLite 入库可靠
- 文件和数据库一致性可检查
- 备份脚本在 VPS 上可执行

第二优先级：

- `/recent` 行为更清晰
- `/search` 行为更清晰
- 分页、limit、排序更规范
- 错误返回更统一

第三优先级：

- 图片上传
- 图片路径入库
- 多类型 item 支持

## 当前非目标

- 不切换 FastAPI
- 不切换 PostgreSQL
- 不引入 Redis
- 不引入向量数据库
- 不做复杂 agent
- 不做多服务拆分
- 不把研究报告里的长期能力一次性塞进 v0.1

## AI 默认行为

- 默认在现有架构上增量修改
- 默认保持 Flask + SQLite + 文件系统
- 默认优先修可靠性问题，再加新功能
- 如果要继续开发，先读 `docs/SHORT_TERM.md`

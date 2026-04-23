# Axiom

Axiom 是一个个人“外脑系统”的后端项目。

它不是普通笔记软件，也不是为了炫技而做的 agent 项目，而是一个长期可积累、可检索、可逐步接入 AI 的个人知识后端。

当前主链路是：

`输入 -> 存储 -> 检索 -> AI -> 决策`

但在 `v0.1` 阶段，实际重点只有前三步：

- 接收输入
- 持久化存储
- 基础检索

AI 摘要、分类建议、周回顾等能力属于后续阶段，不是当前主线。

## 当前阶段定位

Axiom 当前处于 `v0.1 alpha` 阶段。

它已经不是纯概念项目，因为最小后端链路已经存在；但它也还没有进入“稳定可长期运行”的状态，因为服务常驻、写入一致性、备份闭环还没有完全补齐。

当前更准确的阶段判断是：

- 最小链路已打通
- 基础接口已存在
- 数据已开始落盘和入库
- 运行稳定性仍需优先修补

## 当前架构结论

在当前阶段，`VPS` 是主节点，而不是本地设备。

原因很明确：

- 目前没有长期开机的本地设备
- iPhone 只是输入端
- 所以当前阶段最优架构是 `iPhone -> 快捷指令 -> VPS -> Flask -> 文件系统 + SQLite`

这是一种阶段性最优，而不是永久最终形态。

## 当前架构总览

```text
iPhone
  -> iOS 快捷指令
  -> VPS
  -> Flask receiver
  -> 文件系统存储
  -> SQLite 索引
```

## 核心设计原则

- 文件是内容本体
- 数据库是索引，不是内容真相来源
- 先保证“能收、能存、能查”
- 先做可运行流，再做更精致的能力
- 每次改动尽量小步、清晰、可验证
- 不要为了工程高级感过早复杂化

## 当前技术栈

- Python
- Flask
- SQLite
- 文件系统存储
- iPhone 快捷指令
- VPS 部署运行

当前阶段默认不引入：

- FastAPI
- PostgreSQL
- Redis
- Docker 重构
- ORM
- 前端框架

## 当前已实现能力

### `/add`

作用：
接收快捷指令提交的文本内容，并完成文件落盘和数据库入库。

当前行为：

- 校验 `key`
- 接收 `text`
- 将文本写入 `data/inbox/*.txt`
- 将元数据写入 SQLite `items` 表

### `/recent`

作用：
读取最近写入的记录。

当前行为：

- 校验 `key`
- 从 SQLite 查询最近记录
- 以 JSON 返回结果

### `/search`

作用：
执行基础关键词检索。

当前行为：

- 校验 `key`
- 搜索 `content`
- 支持 `page`
- 支持 `page_size`
- 支持排序模式

## 当前仓库结构

```text
core/
  receiver.py
  init_db.py
db/
  axiom.db
data/
  inbox/
  archive/
backup/
docs/
```

## 当前优先级

### 第一优先级

- 保持 receiver 稳定
- 提升持久化可靠性
- 保证文件落盘和数据库入库一致
- 补基础备份能力

### 第二优先级

- 整理 `/recent`
- 整理 `/search`
- 完善分页、limit、排序
- 统一错误处理

### 第三优先级

- 图片上传
- 多类型 item 支持

### 第四优先级

- AI 摘要
- 分类建议
- inbox 自动处理
- 周回顾脚本

## 当前非目标

- 复杂前端
- 复杂 agent 架构
- 向量数据库
- 分布式系统
- Kubernetes
- 多服务重构
- 后端框架迁移

## DeepWiki 推荐阅读顺序

如果使用 DeepWiki 或其他自动文档工具，建议优先从下面这些文档理解项目：

1. [文档总索引](docs/INDEX.md)
2. [架构说明](docs/ARCHITECTURE.md)
3. [当前状态](docs/CURRENT_STATE.md)
4. [架构思维导图](docs/ARCHITECTURE_MINDMAP.md)

## 重要文档

- [文档总索引](docs/INDEX.md)
- [架构说明](docs/ARCHITECTURE.md)
- [当前状态](docs/CURRENT_STATE.md)
- [架构思维导图](docs/ARCHITECTURE_MINDMAP.md)

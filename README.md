# Axiom

Axiom 是一个个人“外脑系统”的最小后端。

它当前不是笔记产品，不是复杂 agent，也不是多服务平台；它现在就是一个围绕 `输入 -> 存储 -> 检索` 打基础的个人知识后端。

## 当前定位

当前阶段是 `v0.1 alpha`。

当前只做：

- 接收输入
- 持久化存储
- 基础检索

当前暂不做：

- 复杂前端
- 复杂 agent
- 向量数据库
- 多服务拆分

## 当前链路

```text
iPhone
  -> iOS 快捷指令
  -> VPS
  -> Flask receiver
  -> 文件系统
  -> SQLite
```

当前原则：

- VPS 是主节点
- 文件是内容本体
- 数据库是索引
- 先把最小后端做稳，再谈 AI

## 关键代码

- `core/receiver.py`：当前主入口，负责 `/add`、`/recent`、`/search`
- `core/init_db.py`：独立数据库初始化脚本
- `scripts/backup_axiom.py`：手动备份脚本
- `scripts/generate_deepwiki_cache.py`：本地 DeepWiki 缓存生成脚本

## 文档结构

仓库里的文档只保留这几类：

- `docs/AI_CONTEXT.md`：给 AI 协作代理看的上下文
- `docs/HUMAN_CONTEXT.md`：给人看的上下文，附需要完全掌握的位置
- `deep-research-report.md`：长远目标研究报告
- `docs/SHORT_TERM.md`：短期目标和当前阶段主线
- `README.md`：项目简介
- `docs/ITERATION_LOG.md`：迭代记录
- `docs/DEEPWIKI.md`：DeepWiki 说明

## 先读哪几份

如果你是人，先读：

1. `README.md`
2. `docs/HUMAN_CONTEXT.md`
3. `docs/SHORT_TERM.md`
4. `deep-research-report.md`

如果你是 AI 协作代理，先读：

1. `docs/AI_CONTEXT.md`
2. `docs/SHORT_TERM.md`
3. `core/receiver.py`
4. `scripts/backup_axiom.py`

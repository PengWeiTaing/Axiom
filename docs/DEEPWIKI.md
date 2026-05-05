# DeepWiki

这份文档只讲 DeepWiki。

## 作用

DeepWiki 是 Axiom 的本地阅读层。它把项目上下文、当前代码、运行链路和关键脚本组织成中文 Wiki，方便人类和 AI 快速接手。

DeepWiki 里已经合并“给人看的上下文”，平时阅读项目时优先打开 Wiki 主入口。

## 当前 Wiki 结构

当前生成脚本会生成 8 个页面：

1. `01 总览：当前运行基线`
2. `02 架构：数据怎么流动`
3. `03 接口：receiver 提供什么`
4. `04 可靠性：一致性、备份和恢复`
5. `05 运维：VPS 服务和定时任务`
6. `06 自动化：回顾、inbox 处理和 action history`
7. `07 代码导览：该从哪里改`
8. `08 演进规则：长期目标和架构决策`

页面顺序按接手路径设计：先理解当前运行基线，再看数据流和接口，然后看可靠性、运维、自动化、代码入口，最后看长期目标和架构决策规则。

## 当前脚本

仓库里保留 DeepWiki 缓存生成脚本：

```text
scripts/generate_deepwiki_cache.py
```

## 重新生成缓存

在仓库根目录执行：

```powershell
python scripts\generate_deepwiki_cache.py
```

这个脚本会把缓存写到本地用户目录下的 DeepWiki 缓存位置：

```text
~/.adalflow/wikicache/deepwiki_cache_local_local_Axiom_zh.json
```

脚本职责是“编排 Wiki”。每个页面应当先给判断、图和阅读方式，再放关键代码块作为定位依据。

Mermaid 图表统一使用 `A["节点文字"]` 这种 quoted label 写法，避免 `/add`、`/search` 之类的接口名被 Mermaid 当成特殊形状语法解析。

## 什么时候需要重新生成

出现下面这些情况时，建议重新生成一次：

- `README.md` 改了
- `docs/AI_CONTEXT.md` 改了
- `docs/HUMAN_CONTEXT.md` 改了
- `docs/SHORT_TERM.md` 改了
- `docs/ITERATION_LOG.md` 改了
- `core/receiver.py` 改了
- `core/init_db.py` 改了
- `scripts/backup_axiom.py` 改了
- `scripts/check_consistency.py` 改了
- `scripts/smoke_test_receiver.py` 改了
- `scripts/smoke_test_inbox_processing.py` 改了
- `core/templates/*` 改了
- `core/static/*` 改了
- review / inbox / action history 相关脚本改了
- `deploy/*.service` 或 `deploy/*.timer` 改了
- `.env.example` 改了

## 当前边界

- 仓库里保留缓存生成脚本和 DeepWiki 说明。
- DeepWiki 服务本身不放进 Axiom 仓库。
- 生成内容必须跟当前代码和当前运行事实一致。
- 早期硬约束已经取消，Wiki 需要展示新的架构决策规则。

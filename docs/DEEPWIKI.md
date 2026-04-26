# DeepWiki

这份文档只讲 DeepWiki。

## 作用

DeepWiki 在这个项目里承担本地阅读层的作用。

它的作用是：

- 把项目上下文和核心代码组织成更容易浏览的中文 Wiki
- 让你在看代码前先有一个结构化入口
- 给 AI 或人类接手时提供更顺滑的阅读体验

现在 DeepWiki 主入口里已经直接并入“给人看的上下文”，平时阅读项目时不需要单独再开一份人类上下文页面。

## 当前 Wiki 结构

当前生成脚本会生成 8 个页面：

1. `01 总览：Axiom 当前是什么`
2. `02 架构：数据怎么流动`
3. `03 接口：receiver 提供什么`
4. `04 一致性：文件和索引怎么互相校验`
5. `05 运维：怎么验证、备份、刷新 Wiki`
6. `06 代码导览：该从哪里改`
7. `07 短期路线：下一步做什么`
8. `08 长期目标：研究报告怎么用`

页面顺序按接手项目的阅读路径设计：先理解阶段，再看架构和接口，然后看可靠性、运维和代码，最后看短期路线与长期目标。

## 当前脚本

仓库里只保留 DeepWiki 缓存生成脚本：

```text
scripts/generate_deepwiki_cache.py
```

## 重新生成缓存

在仓库根目录执行：

```powershell
python scripts\generate_deepwiki_cache.py
```

这个脚本会把缓存写到本地用户目录下的 DeepWiki 缓存位置。

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

## 当前边界

- 仓库里只保留缓存生成脚本
- DeepWiki 是辅助阅读层
- DeepWiki 服务本身不放进 Axiom 仓库

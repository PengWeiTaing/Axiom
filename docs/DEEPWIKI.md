# DeepWiki

这份文档只讲 DeepWiki。

## 作用

DeepWiki 在这个项目里不是源码的一部分，而是一个本地阅读层。

它的作用是：

- 把项目上下文和核心代码组织成更容易浏览的中文 Wiki
- 让你在看代码前先有一个结构化入口
- 给 AI 或人类接手时提供更顺滑的阅读体验

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

## 什么时候需要重新生成

出现下面这些情况时，建议重新生成一次：

- `README.md` 改了
- `docs/AI_CONTEXT.md` 改了
- `docs/HUMAN_CONTEXT.md` 改了
- `docs/SHORT_TERM.md` 改了
- `docs/ITERATION_LOG.md` 改了
- `core/receiver.py` 改了
- `scripts/backup_axiom.py` 改了

## 当前边界

- 仓库里只保留缓存生成脚本
- 不把 DeepWiki 服务本身放进 Axiom 仓库
- DeepWiki 是辅助阅读层，不是项目主逻辑

import json
from datetime import datetime
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
CACHE_PATH = (
    Path.home()
    / ".adalflow"
    / "wikicache"
    / "deepwiki_cache_local_local_Axiom_zh.json"
)


def read_lines(path: str) -> list[str]:
    return (REPO_ROOT / path).read_text(encoding="utf-8").splitlines()


def snippet(path: str, start: int, end: int, language: str = "python") -> str:
    lines = read_lines(path)
    body = "\n".join(lines[start - 1 : end])
    return (
        f"```{language}\n"
        f"# {path}:{start}-{end}\n"
        f"{body}\n"
        "```\n\n"
        f"Sources: [{path}:{start}-{end}]()"
    )


def add_page(pages, generated_pages, page_id, title, file_paths, related, content):
    page = {
        "id": page_id,
        "title": title,
        "content": content.strip() + "\n",
        "filePaths": file_paths,
        "importance": "high",
        "relatedPages": related,
    }
    pages.append(page)
    generated_pages[page_id] = page


def build_cache():
    pages = []
    generated_pages = {}

    add_page(
        pages,
        generated_pages,
        "page-intro",
        "项目简介与当前定位",
        ["README.md", "docs/SHORT_TERM.md", "deep-research-report.md"],
        ["page-ai-context", "page-short-term", "page-long-term"],
        f"""
# 项目简介与当前定位

Axiom 是一个个人“外脑系统”的最小后端。当前不是笔记产品，也不是复杂 agent；它现在的主线是先把 `输入 -> 存储 -> 检索` 做稳。Sources: [README.md]()

{snippet("README.md", 1, 35, "markdown")}

## 当前阶段

当前阶段是 `v0.1 alpha`。最重要的事情不是继续堆功能，而是把 receiver、写入一致性和备份闭环补稳。Sources: [docs/SHORT_TERM.md]()

{snippet("docs/SHORT_TERM.md", 1, 40, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-ai-context",
        "给 AI 的上下文",
        ["docs/AI_CONTEXT.md", "core/receiver.py", "scripts/backup_axiom.py"],
        ["page-intro", "page-core", "page-short-term"],
        f"""
# 给 AI 的上下文

这份页面对应 `docs/AI_CONTEXT.md`，目的是让协作代理快速进入正确边界，而不是重新发明项目方向。Sources: [docs/AI_CONTEXT.md]()

{snippet("docs/AI_CONTEXT.md", 1, 999, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-human-context",
        "给人的上下文",
        ["docs/HUMAN_CONTEXT.md", "core/receiver.py", "core/init_db.py", "scripts/backup_axiom.py"],
        ["page-intro", "page-core", "page-short-term"],
        f"""
# 给人的上下文

这份页面对应 `docs/HUMAN_CONTEXT.md`，重点是告诉接手的人应该先理解什么、哪些位置需要完全掌握。Sources: [docs/HUMAN_CONTEXT.md]()

{snippet("docs/HUMAN_CONTEXT.md", 1, 999, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-long-term",
        "长远目标研究报告",
        ["deep-research-report.md"],
        ["page-intro", "page-short-term"],
        f"""
# 长远目标研究报告

`deep-research-report.md` 是 Axiom 的长远目标来源。它负责回答“这个系统最终要长成什么”，但不直接等于当前待做任务。Sources: [deep-research-report.md]()

## 当前使用方式

- 用它确定长期方向
- 不把它直接当作 v0.1 的开发清单
- 当前阶段只取它的底层能力：采集、存储、基础检索

{snippet("deep-research-report.md", 1, 80, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-short-term",
        "短期目标与当前主线",
        ["docs/SHORT_TERM.md", "core/receiver.py", "scripts/backup_axiom.py"],
        ["page-intro", "page-core", "page-iteration"],
        f"""
# 短期目标与当前主线

这份页面对应 `docs/SHORT_TERM.md`，只负责说明“现在最应该做什么”。Sources: [docs/SHORT_TERM.md]()

{snippet("docs/SHORT_TERM.md", 1, 999, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-core",
        "核心代码入口",
        ["core/receiver.py", "core/init_db.py", "scripts/backup_axiom.py"],
        ["page-ai-context", "page-human-context", "page-short-term", "page-deepwiki"],
        f"""
# 核心代码入口

当前真正需要持续维护的代码入口很少，主要就是 `receiver.py`、`init_db.py` 和 `backup_axiom.py`。

## Flask 主入口

{snippet("core/receiver.py", 1, 110)}

## 检索接口

{snippet("core/receiver.py", 113, 324)}

## 独立初始化脚本

{snippet("core/init_db.py", 1, 22)}

## 备份脚本

{snippet("scripts/backup_axiom.py", 1, 120)}

{snippet("scripts/backup_axiom.py", 122, 245)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-iteration",
        "迭代记录",
        ["docs/ITERATION_LOG.md"],
        ["page-short-term", "page-deepwiki"],
        f"""
# 迭代记录

这份页面对应 `docs/ITERATION_LOG.md`，只记录“发生了什么变化”，不承担完整上下文说明。Sources: [docs/ITERATION_LOG.md]()

{snippet("docs/ITERATION_LOG.md", 1, 999, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-deepwiki",
        "DeepWiki 说明",
        ["docs/DEEPWIKI.md", "scripts/generate_deepwiki_cache.py"],
        ["page-human-context", "page-core", "page-iteration"],
        f"""
# DeepWiki 说明

DeepWiki 在 Axiom 里只是本地阅读层，不是项目主逻辑。仓库里只保留缓存生成脚本和说明文档。Sources: [docs/DEEPWIKI.md]()

{snippet("docs/DEEPWIKI.md", 1, 999, "markdown")}

## 缓存生成脚本

{snippet("scripts/generate_deepwiki_cache.py", 1, 220)}
""",
    )

    sections = [
        {
            "id": "section-context",
            "title": "上下文",
            "pages": ["page-intro", "page-ai-context", "page-human-context"],
            "subsections": [],
        },
        {
            "id": "section-goals",
            "title": "目标与主线",
            "pages": ["page-long-term", "page-short-term", "page-iteration"],
            "subsections": [],
        },
        {
            "id": "section-code",
            "title": "代码与 DeepWiki",
            "pages": ["page-core", "page-deepwiki"],
            "subsections": [],
        },
    ]

    return {
        "wiki_structure": {
            "id": "wiki",
            "title": "Axiom 精简项目 Wiki",
            "description": "围绕项目简介、AI 上下文、人类上下文、长短期目标、迭代记录和 DeepWiki 组织的精简中文 Wiki。",
            "pages": pages,
            "sections": sections,
            "rootSections": [section["id"] for section in sections],
        },
        "generated_pages": generated_pages,
        "repo_url": str(REPO_ROOT),
        "repo": {
            "owner": "local",
            "repo": "Axiom",
            "type": "local",
            "token": None,
            "localPath": str(REPO_ROOT),
            "repoUrl": str(REPO_ROOT),
        },
        "provider": "openai",
        "model": "gpt-5-mini",
        "generated_at": datetime.now().isoformat(timespec="seconds"),
    }


def main():
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    cache = build_cache()
    CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"wrote {CACHE_PATH}")
    print(f"pages={len(cache['generated_pages'])}")
    for page_id, page in cache["generated_pages"].items():
        print(f"- {page_id}: {page['title']} ({len(page['content'])} chars)")


if __name__ == "__main__":
    main()

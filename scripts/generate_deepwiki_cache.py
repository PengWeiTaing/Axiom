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
        f"来源: [{path}:{start}-{end}]()"
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
        "page-overview",
        "01 总览：Axiom 当前是什么",
        [
            "README.md",
            "docs/HUMAN_CONTEXT.md",
            "docs/SHORT_TERM.md",
            "docs/AI_CONTEXT.md",
        ],
        [
            "page-architecture",
            "page-api",
            "page-operations",
            "page-roadmap",
        ],
        f"""
# 01 总览：Axiom 当前是什么

Axiom 当前是个人知识后端的 `v0.1 alpha`。这一阶段只抓住一条主线：输入进入 VPS，内容落成文件，索引进入 SQLite，然后用基础接口查回来。

## 一屏判断

| 项 | 当前答案 |
| --- | --- |
| 当前主节点 | VPS |
| 输入端 | iPhone + iOS 快捷指令 |
| 技术栈 | Python + Flask + SQLite + 文件系统 |
| 当前目标 | 接收、存储、检索、备份 |
| 当前节奏 | 小步修可靠性 |
| 当前暂缓 | 复杂前端、复杂 agent、向量检索、多服务化 |

## 最小链路

```mermaid
flowchart LR
    A["iPhone 快捷指令"] --> B["VPS Flask receiver"]
    B --> C["data/inbox txt 文件"]
    B --> D["SQLite items 索引"]
    D --> E["/recent"]
    D --> F["/search"]
    C --> G["备份 zip"]
    D --> G
```

## 人类接手阅读顺序

1. 先读本页，建立当前阶段判断。
2. 再读 `02 架构：数据怎么流动`，理解文件和数据库的关系。
3. 然后读 `03 接口：receiver 提供什么`，知道系统对外暴露的能力。
4. 接着读 `05 运维：怎么验证和备份`，掌握本地与 VPS 的检查方式。
5. 最后按任务进入 `06 代码导览` 或 `07 短期路线`。

## 原始上下文底稿

{snippet("README.md", 1, 90, "markdown")}

{snippet("docs/HUMAN_CONTEXT.md", 1, 90, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-architecture",
        "02 架构：数据怎么流动",
        ["README.md", "docs/SHORT_TERM.md", "core/receiver.py"],
        [
            "page-overview",
            "page-api",
            "page-consistency",
            "page-operations",
        ],
        f"""
# 02 架构：数据怎么流动

当前架构很小，但有一个必须长期守住的原则：文件保存内容本体，SQLite 保存索引。这样做的好处是内容不会被锁死在数据库里，后续备份、迁移、AI 处理都更直接。

## 当前部署形态

```mermaid
flowchart TD
    A["快捷指令 text + key"] --> B["/add"]
    B --> C["生成唯一 txt 文件名"]
    C --> D["写临时文件"]
    D --> E["替换为 inbox 正式文件"]
    E --> F["写入 SQLite items"]
    F --> G["/recent 和 /search"]
    E --> H["backup_axiom.py"]
    F --> H
    H --> I["zip + manifest"]
```

## 数据边界

| 位置 | 角色 | 当前内容 |
| --- | --- | --- |
| `data/inbox/*.txt` | 内容本体 | 用户输入的原始文本 |
| `db/axiom.db` | 索引 | `items` 表，包含类型、内容、文件路径、来源、时间 |
| `backup/*.zip` | 离线备份 | SQLite 快照、inbox、archive、manifest |
| `logs/receiver.log` | 文件日志 | receiver 运行日志 |
| `docs/*` | 项目上下文 | 给人和 AI 的阶段说明 |

## `items` 表

当前表结构保持最小，只覆盖 v0.1 的文本记录。后续图片上传会在这个表上扩展多类型 item，继续保持 SQLite 单机后端路线。

{snippet("core/receiver.py", 71, 95)}

## 配置入口

receiver 默认以 `/opt/axiom` 作为部署根目录，同时允许本地通过环境变量覆盖路径。这个设计让 VPS 运行和 Windows 本地测试共用一份代码。

{snippet("core/receiver.py", 17, 50)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-api",
        "03 接口：receiver 提供什么",
        ["core/receiver.py", "scripts/smoke_test_receiver.py"],
        [
            "page-overview",
            "page-architecture",
            "page-consistency",
            "page-code",
        ],
        f"""
# 03 接口：receiver 提供什么

receiver 是当前后端主入口。它的职责很集中：检查 key，接收文本，落文件，写索引，提供最近记录和关键词检索。

## 接口总表

| 接口 | 方法 | 用途 | 鉴权 | 返回 |
| --- | --- | --- | --- | --- |
| `/health` | GET | 检查服务和数据库是否可用 | 否 | JSON |
| `/add` | GET/POST | 接收文本并持久化 | 是 | JSON |
| `/recent` | GET | 分页读取最近记录 | 是 | JSON |
| `/search` | GET | 基础关键词检索 | 是 | JSON |

## 统一返回形态

成功返回含 `ok: true`，失败返回含 `ok: false` 和 `error`。这个约定让快捷指令、命令行测试、后续 AI 脚本都能用同一套判断方式。

{snippet("core/receiver.py", 53, 61)}

## `/add`

`/add` 支持 query、form、JSON 三种输入来源。写入时先创建临时文件，再替换为正式 txt；数据库写入失败时，会清理本次已经写入的文件。

{snippet("core/receiver.py", 216, 246)}

{snippet("core/receiver.py", 276, 317)}

## `/recent`

`/recent` 支持 `page`、`page_size`，同时兼容旧的 `limit`。`page_size` 会被限制在 50 以内，避免一次查太多。

{snippet("core/receiver.py", 167, 187)}

{snippet("core/receiver.py", 320, 364)}

## `/search`

`/search` 当前使用 SQLite `LIKE` 做基础检索，支持 `relevance`、`newest`、`oldest`。相关性排序是轻量规则，用于 v0.1 阶段的可用检索。

{snippet("core/receiver.py", 366, 467)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-consistency",
        "04 一致性：文件和索引怎么互相校验",
        ["scripts/check_consistency.py", "core/receiver.py", "docs/SHORT_TERM.md"],
        [
            "page-architecture",
            "page-api",
            "page-operations",
            "page-roadmap",
        ],
        f"""
# 04 一致性：文件和索引怎么互相校验

Axiom 当前最需要盯住的风险是文件和数据库不同步。`scripts/check_consistency.py` 就是为这个阶段准备的诊断工具。

## 它检查什么

| 检查项 | 含义 | 常见原因 |
| --- | --- | --- |
| DB 记录缺文件 | `items.file_path` 指向的 txt 不存在 | 只拉了数据库，没拉 inbox；手工误删 |
| inbox 孤立文件 | txt 文件没有对应 DB 记录 | 写入中断；手工放入文件 |
| 缺 `file_path` 的记录 | DB 里记录不完整 | 早期数据或手工写入 |

## 本地检查 VPS 数据

数据库里可能保存 `/opt/axiom/...` 这样的绝对路径。脚本默认会把它映射到当前 `--root`，所以本地从 VPS 拉下数据后可以直接检查。

```powershell
python scripts\\check_consistency.py --root .
python scripts\\check_consistency.py --root . --json
```

## 关键实现

{snippet("scripts/check_consistency.py", 20, 60)}

{snippet("scripts/check_consistency.py", 113, 140)}

{snippet("scripts/check_consistency.py", 193, 219)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-operations",
        "05 运维：怎么验证、备份、刷新 Wiki",
        [
            "requirements.txt",
            ".env.example",
            "deploy/axiom-receiver.service",
            "scripts/smoke_test_receiver.py",
            "scripts/backup_axiom.py",
            "scripts/check_consistency.py",
            "scripts/generate_deepwiki_cache.py",
            "docs/DEEPWIKI.md",
        ],
        [
            "page-overview",
            "page-consistency",
            "page-code",
            "page-roadmap",
        ],
        f"""
# 05 运维：怎么验证、备份、刷新 Wiki

这一页给日常操作用。它优先回答“我改完代码后怎么确认没坏”“数据怎么备份”“Wiki 怎么刷新”。

## 本地最小验证

```powershell
pip install -r requirements.txt
python -m py_compile core\\receiver.py core\\init_db.py scripts\\smoke_test_receiver.py scripts\\backup_axiom.py scripts\\check_consistency.py scripts\\generate_deepwiki_cache.py
python scripts\\smoke_test_receiver.py
```

## VPS systemd 运行

在 VPS 的 `/opt/axiom` 下准备虚拟环境和环境变量：

```bash
cd /opt/axiom
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

`/opt/axiom/.env` 里必须设置真实的 `AXIOM_SECRET_KEY`。`.env.example` 只放可公开模板。

安装并启动服务：

```bash
sudo cp deploy/axiom-receiver.service /etc/systemd/system/axiom-receiver.service
sudo systemctl daemon-reload
sudo systemctl enable --now axiom-receiver
```

检查服务：

```bash
systemctl status axiom-receiver --no-pager
journalctl -u axiom-receiver -f
tail -f /opt/axiom/logs/receiver.log
curl http://127.0.0.1:5000/health
```

## 一致性检查

```powershell
python scripts\\check_consistency.py --root .
python scripts\\check_consistency.py --root . --json
```

当前本地如果只同步了 `db/axiom.db`，没有同步 `data/inbox`，一致性检查会报告缺失文件。这是诊断信号，不代表脚本坏了。

## 备份

```powershell
python scripts\\backup_axiom.py --root . --dry-run
```

VPS 上建议在 `/opt/axiom` 下执行：

```bash
cd /opt/axiom
python3 scripts/backup_axiom.py --keep 7
```

## 刷新 DeepWiki

```powershell
python scripts\\generate_deepwiki_cache.py
```

刷新后打开 DeepWiki，主入口应该显示 8 个结构化页面。

## 关键脚本证据

{snippet(".env.example", 1, 20, "text")}

{snippet("deploy/axiom-receiver.service", 1, 40, "ini")}

{snippet("scripts/smoke_test_receiver.py", 25, 108)}

{snippet("scripts/backup_axiom.py", 122, 208)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-code",
        "06 代码导览：该从哪里改",
        [
            "core/receiver.py",
            "core/init_db.py",
            "scripts/backup_axiom.py",
            "scripts/check_consistency.py",
            "scripts/smoke_test_receiver.py",
            "scripts/generate_deepwiki_cache.py",
            "deploy/axiom-receiver.service",
            ".env.example",
        ],
        [
            "page-api",
            "page-consistency",
            "page-operations",
            "page-roadmap",
        ],
        f"""
# 06 代码导览：该从哪里改

这个项目当前代码很少，真正需要掌握的是每个文件的职责边界。

## 文件职责表

| 文件 | 职责 | 常见修改场景 |
| --- | --- | --- |
| `core/receiver.py` | Flask 主入口，API、鉴权、落盘、入库、查询 | 改接口、修写入可靠性、加日志 |
| `core/init_db.py` | 独立初始化数据库 | 初始化 VPS 数据库 |
| `scripts/backup_axiom.py` | 打包数据库和数据目录 | 备份策略、保留数量、manifest |
| `scripts/check_consistency.py` | 检查文件和 DB 是否同步 | 数据诊断、恢复演练前检查 |
| `scripts/smoke_test_receiver.py` | 本地跑主链路测试 | 改 receiver 后验证 |
| `scripts/generate_deepwiki_cache.py` | 生成本地 DeepWiki 缓存 | 改 wiki 内容和结构 |
| `deploy/axiom-receiver.service` | systemd 服务模板 | VPS 启动、重启、查看日志 |
| `.env.example` | 环境变量模板 | 新部署时创建真实 `.env` |

## receiver 修改地图

| 位置 | 关注点 |
| --- | --- |
| 配置区 | `/opt/axiom` 默认路径、环境变量覆盖 |
| 日志区 | 控制台输出、可选文件日志 |
| 响应工具 | 统一 JSON 返回 |
| 存储与数据库 | 建表、连接、目录创建 |
| 请求工具 | key、分页、JSON/form/query 读取 |
| 文件写入 | 临时文件、原子替换 |
| 路由 | `/health`、`/add`、`/recent`、`/search` |
| 错误处理 | Flask 异常统一 JSON 化 |

## 关键代码块

{snippet("core/receiver.py", 17, 61)}

{snippet("core/receiver.py", 65, 106)}

{snippet("core/receiver.py", 111, 187)}

{snippet("core/init_db.py", 1, 19)}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-roadmap",
        "07 短期路线：下一步做什么",
        ["docs/SHORT_TERM.md", "docs/ITERATION_LOG.md"],
        [
            "page-overview",
            "page-operations",
            "page-consistency",
            "page-long-term",
        ],
        f"""
# 07 短期路线：下一步做什么

当前代码已经把 receiver 基底、冒烟测试、一致性检查和备份脚本放到位。下一步重点转向 VPS 真实运行闭环。

## 当前优先级

1. 在 VPS 上确认 receiver 正式启动方式。
2. 用真实快捷指令打一次 `/add`。
3. 在 VPS 上调用 `/health`、`/recent`、`/search`。
4. 跑一次真实备份。
5. 做一次恢复演练。
6. 在 VPS 上跑一致性检查。

## 当前仍要盯住的风险

| 风险 | 当前状态 | 下一步 |
| --- | --- | --- |
| 正式启动方式 | 已有 systemd 模板 | 在 VPS 上真实启用 |
| 数据一致性 | 已有检查脚本 | 在 VPS 上跑真实数据 |
| 备份闭环 | 已有备份脚本 | 做真实备份和恢复演练 |
| 日志 | 已支持 journal 和文件日志 | 在 VPS 上验证 |

## 迭代记录

{snippet("docs/SHORT_TERM.md", 1, 120, "markdown")}

{snippet("docs/ITERATION_LOG.md", 1, 80, "markdown")}
""",
    )

    add_page(
        pages,
        generated_pages,
        "page-long-term",
        "08 长期目标：研究报告怎么用",
        ["deep-research-report.md", "docs/SHORT_TERM.md"],
        [
            "page-overview",
            "page-roadmap",
            "page-architecture",
        ],
        f"""
# 08 长期目标：研究报告怎么用

`deep-research-report.md` 是 Axiom 的长期方向来源。它负责给出远景，但当前开发仍以 v0.1 的可靠性闭环为准。

## 当前用法

- 用研究报告确定长期方向。
- 用 `docs/SHORT_TERM.md` 决定本周和本轮要做什么。
- 当前只取底层能力：采集、存储、检索、备份、可恢复。
- AI 摘要、分类建议、周回顾等能力放在后续阶段。

## 长期目标与当前阶段的关系

```mermaid
flowchart TD
    A["长期目标研究报告"] --> B["能力方向"]
    B --> C["采集"]
    B --> D["存储"]
    B --> E["检索"]
    B --> F["AI 处理"]
    C --> G["v0.1 当前主线"]
    D --> G
    E --> G
    F --> H["后续阶段"]
```

## 报告开头

{snippet("deep-research-report.md", 1, 100, "markdown")}
""",
    )

    sections = [
        {
            "id": "section-start",
            "title": "先看这里",
            "pages": ["page-overview", "page-architecture", "page-api"],
            "subsections": [],
        },
        {
            "id": "section-reliability",
            "title": "可靠性与操作",
            "pages": ["page-consistency", "page-operations", "page-code"],
            "subsections": [],
        },
        {
            "id": "section-direction",
            "title": "目标与演进",
            "pages": ["page-roadmap", "page-long-term"],
            "subsections": [],
        },
    ]

    return {
        "wiki_structure": {
            "id": "wiki",
            "title": "Axiom 项目 Wiki",
            "description": "面向阅读和接手的中文 Wiki：先理解当前阶段，再进入架构、接口、可靠性、运维和路线图。",
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

    print(f"已写入: {CACHE_PATH}")
    print(f"页面数: {len(cache['generated_pages'])}")
    for page_id, page in cache["generated_pages"].items():
        print(f"- {page_id}: {page['title']} ({len(page['content'])} 字符)")


if __name__ == "__main__":
    main()

# Mac 迁移与上下文接续

## 包的结构

整份 `Axiom-Main-Mac-2026-10-01` 文件夹一起搬到 Mac，不要只搬里面的代码目录。

- `Axiom/`：可继续开发的 Git 仓库、当前源码、中文文档、锁文件、本地数据库与附件副本。不含 Windows 依赖和编译缓存。
- `conversations/`：按会话和月份整理的可检索对话，属于私有材料，不能推送到 GitHub。
- `private/codex/`：Axiom 目录相关会话的原始 JSONL 和项目范围的历史数据库快照。
- `private/project/`：原 `.env`、另一份 Windows 运行数据。配置只备份，不自动启用模型访问。
- `private/git-all-refs.bundle`：全部本地 Git 引用的离线备份。
- `references/`：未被 Git 跟踪的原研究 PDF。
- `archives/`：有独有内容的旧本地档案，离开活动项目目录；可重建缓存、日志不保留。
- `migration/`：导出、校验、隔离恢复工具和清单。

整个外层目录是**私有迁移包**，不要上传公开云盘或仓库；移动硬盘建议使用加密卷。代码仓库可正常独立使用 Git，外层档案不会被其 `git add` 包含。

## Codex 如何接续

在 Mac 的 Codex 中打开 `Axiom/`，创建新聊天并说：

> 请先读取 AGENTS.md、docs/MAC_HANDOFF.md 和最近迭代记录，再根据 ../conversations/INDEX.md 查相关原话，恢复项目上下文；先核对实际代码，不沿用已撤回的设计。

根目录 `AGENTS.md` 已有同样入口。这样能从随项目携带的材料接续，不依赖 Windows 用户路径，也不依赖旧聊天是否显示在侧栏。

**文件夹打开不等于旧聊天自动恢复到 Codex 侧栏。** 原始会话、历史数据库和可读文本都已另存，Mac 安装版本对旧记录的兼容性仍须实际验证。官方说明本地状态在 `CODEX_HOME`，CLI 支持 `codex resume`，没有据此承诺任意 Windows 桌面数据库可无损迁入 Mac UI。

可选隔离恢复：在外层目录运行 `python3 migration/restore_codex.py --target "$HOME/.codex-axiom-migrated"`。目标必须不存在；脚本只写新目录、改写运行路径，不覆盖 Mac 的 `~/.codex`。重新登录后用命令行尝试：

```bash
CODEX_HOME="$HOME/.codex-axiom-migrated" codex login
CODEX_HOME="$HOME/.codex-axiom-migrated" codex resume 019e716e-960e-7b50-bdc0-a80f15f8cce7 --cd "$PWD/Axiom"
```

这是兼容性恢复路径，不是已验收的 Mac UI 导入。失败时不要覆盖正常 Codex 配置或硬改其运行数据库；直接用新聊天读取上述交接和文本档案。登录凭证、其他项目聊天与定时自动化没有移植，避免越权和重复运行。

Windows 隔离验证使用 Codex CLI 0.159.2，仅调用本地读取接口，没有启动模型任务：5 段中 4 段可读取历史页，包含本主对话；旧接手会话 `01a0702a-2022-7c90-9d83-55c3903f387f` 的分页历史没有返回内容，其原库索引已不完整。该段的原始 JSONL 和 35 条原始文本消息另存保留，见 `conversations/RAW_INDEX.md`。因此完整 UI 恢复检查不是全通过，Mac 上仍需实测，不能宣称所有旧侧栏聊天已经恢复。

## 本地运行

准备 Git、Python 3.12、Node.js 24 LTS；需要编译桌面壳时再装 Rust / Xcode 工具，不把 Windows 的 `node_modules`、`.venv`、`target` 搬来使用。

在 `Axiom/` 运行以下命令，首次会下载依赖：

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
npm --prefix frontend ci
npm --prefix frontend run test:atlas-study
npm --prefix frontend run type-check
npm --prefix frontend run build:atlas-study
```

看独立 Atlas 样本：

```bash
npm --prefix frontend run dev -- --host 127.0.0.1 --port 4317
```

打开 `http://127.0.0.1:4317/atlas-study.html?view=space`。正式应用使用已跟踪的 `core/static/v2` 产物，可先无需重建主应用：

```bash
export AXIOM_ROOT="$PWD"
export AXIOM_SECRET_KEY="$(.venv/bin/python -c 'import secrets; print(secrets.token_urlsafe(24))')"
printf '本次本地访问口令：%s\n' "$AXIOM_SECRET_KEY"
.venv/bin/python -m flask --app core.receiver run --host 127.0.0.1 --port 5001
```

打开 `http://127.0.0.1:5001/app`。5001 避开 Mac 上可能占用 5000 的系统服务，也与当前 Vite 主 API 代理一致。旧 `/board` 与模块代理仍指向 5000，单独使用它们需统一代理端口，不能据此声称所有旧入口已迁移验证。

不要直接 `source` Windows `.env`；旧 `.env` 在 `private/project/`，其中真实密钥仅作备份。默认启动不读取它，不会自动启用 AI。需要联网模型能力时再确认密钥有效性、额度和环境变量；历史聊天中暴露过的密钥应轮换。

浏览器测试另外需要 Playwright 和 Chrome。`frontend/tests/run-atlas-study-browser.mjs` 默认导入 `playwright`、使用 Chrome，可通过 `PLAYWRIGHT_MODULE` 指向独立安装的模块；不要复用 Windows 缓存路径。MCP / 浏览器扩展在 Mac 上重新安装连接，不迁移机器专用配置。

## 验证与未迁移项目

外层运行 `python3 migration/verify_package.py` 检查传输后的 SHA-256；先校验再安装依赖或修改文件。清单记录了导出截止时间，最后一轮对话尚未结束时不可能包含未来回复。

最初打包只保留本地提交与 Git 历史，不发布。用户随后明确要求在电脑重置前保存并推送；最终提交与远端核验记录在私有包 `migration/reset-readiness.json`，这不等同于部署或 Mac 验收。重置前必须把两个完整迁移包复制到 Mac、移动硬盘或已确认同步完成的私有云端；仅放在本机桌面不构成异机备份。源码在 GitHub 不代表数据库、配置与对话也已备份。

后续清理（2026-10-01）：用户追加要求后，原 Windows 目录内的 Node 依赖、Rust 编译产物、旧构建、日志、截图和已经核对归档的历史产物也已移入回收站；5 份隔离恢复测试副本同时清理。源码与真实数据仍保留，但 Windows 前端再次启动前需要 `npm --prefix frontend ci`。13 张浏览器截图和 2 份旧审计数据库补存在 `archives/local-audit-supplement.zip`。本次共 41 项、约 7.19 GiB，全部可从回收站恢复，未替用户清空回收站。详细清单在 `migration/cleanup-results.json`。

未迁移 VPS 实时数据、SSH 密钥、Codex 登录认证、浏览器登录态和 localStorage、其他竞赛仓库。原始会话内嵌媒体保留；外部绝对路径引用可能仍需原文件，不把文本存档等同于全部外部资源已离线化。

参考：[Codex 本地状态位置](https://learn.chatgpt.com/docs/config-file/config-advanced)、[CLI 会话恢复](https://learn.chatgpt.com/docs/codex/cli)。

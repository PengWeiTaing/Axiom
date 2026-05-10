# CLAUDE.md — Axiom 项目

## 语言规则

- 默认使用**简体中文**交流。
- 代码标识符（变量、函数、类等）遵循 Python/项目惯例使用英文命名。
- 代码注释可使用中文或英文。
- 技术术语首次出现时可附英文原文。

## 项目概述

Axiom 项目基于 Python，使用 requirements.txt 管理依赖。

## 环境

- 平台：Windows 11
- Shell：Bash (Git Bash / WSL)
- 包管理：pip (requirements.txt)

## 技能集

以下技能定义了 Claude Code 在本项目中的特定行为模式。用户可通过 `/skill-name` 触发。

### project-onboarding
**触发**：用户问"这个项目怎么做"、"从哪开始看"、或者首次接入时。
**行为**：自动读取 README.md、requirements.txt、.env.example、docs/AI_CONTEXT.md，摘要输出：项目是什么、怎么跑起来、核心模块在哪、下一步从哪看。

### code-review
**触发**：用户说"review 一下"、"检查代码"、或在提交前审阅。
**行为**：按固定维度审阅——bug/逻辑错误、边界条件处理、可维护性/重复代码、安全风险（注入、权限、敏感信息泄露）、命名一致性。输出按严重度分级，附带具体行号。

### debug-triage
**触发**：报错时、用户说"帮我排查"、"为什么不行"。
**行为**：先收集报错信息和堆栈、确认运行环境和 Python 版本、用 `git diff` 看最近改动、定位可能原因，再提出修复方案。不盲目改代码。

### newbie-explainer
**触发**：用户说"解释一下这段代码"、"这个函数在做什么"。
**行为**：针对当前用户的阶段（Java/Web/Python 熟悉度），逐行解释代码逻辑，避免跳步，关键概念附上通俗类比。

### axiom-architect
**触发**：涉及 Axiom 架构决策时——新增表、新增模块、改变数据流、引入新依赖。
**行为**：按 deep-research-report.md 的长期架构思路（八层模型）检查改动：采集层→索引层→记忆层→检索层→计划层→干预层→动作层→治理层。确保改动不破坏现有层的完整性。

### api-design
**触发**：设计新 API 或修改现有接口时。
**行为**：统一采用 `require_key()` + `get_db_connection()` + `ok_response()/error_response()` 模式。输出：端点路径、请求参数、错误码、返回 JSON 结构示例。

### git-workflow
**触发**：每次改动完成后、用户准备提交时。
**行为**：先 `git diff --stat` 摘要改动范围，再生成中文 commit message（遵循仓库风格），提醒哪些文件该提交、哪些不该提交（如 .env、__pycache__）。

### test-writer
**触发**：用户说"写测试"、"补测试"。
**行为**：优先遵循现有冒烟测试模式（临时目录、Flask test_client、assert 覆盖成功和错误路径）。核心 API 改动必须补测试。

# Claude Code 汉化配置文档

> 配置日期: 2026-05-08 | Claude Code 版本: 2.1.128

---

## 一、汉化配置概述

Claude Code 的汉化分为三个层级，按优先级从高到低：

| 层级 | 配置文件 | 作用范围 |
|------|----------|----------|
| 全局设置 | `~/.claude/settings.json` | CLI + IDE 插件 |
| 全局指令 | `~/.claude/CLAUDE.md` | CLI + IDE 插件 |
| 项目指令 | `<项目>/CLAUDE.md` | 仅该项目（IDE 插件） |

> **注意**：Claude Code 的 CLI 界面元素（按钮、权限提示、状态栏等）目前仍为英文硬编码，官方尚未提供完整的 UI 本地化支持。上述配置控制的是**AI 模型的输出语言**，而非界面 UI 语言。

---

## 二、已完成的配置

### 2.1 全局设置 — `language: "Chinese"`

**文件**: `C:\Users\p3381\.claude\settings.json`

```json
{
  "language": "Chinese"
}
```

这是 Claude Code v2.1.0+ 新增的官方配置项，告诉模型默认以中文回复。该设置同时影响 CLI 和 VS Code IDE 插件。

### 2.2 全局 CLAUDE.md — 中文输出规则

**文件**: `C:\Users\p3381\.claude\CLAUDE.md`

核心规则：

- **默认使用简体中文**进行所有交流、解释和回答
- 代码标识符保持英文命名规范
- 代码注释可使用中文或英文
- 技术术语首次出现时附英文原文
- 错误信息、日志保持原语言不变
- 用户用英文提问时，用英文回答

### 2.3 项目 CLAUDE.md — Axiom 项目中文配置

**文件**: `E:\Axiom\CLAUDE.md`

针对 Axiom 项目的专用 CLAUDE.md，包含项目技术栈信息和中文默认输出规则。

---

## 三、IDE 插件状态

### VS Code 扩展

- **扩展 ID**: `anthropic.claude-code`
- **已安装版本**: v2.1.132 和 v2.1.133
- **当前工作区**: `E:\Axiom`

扩展本身不支持 UI 汉化（按钮、标签均为英文），但：
- 会读取全局 `~/.claude/settings.json` 中的 `language: "Chinese"` 设置
- 会加载全局和项目的 CLAUDE.md 文件
- AI 对话将在中文环境中进行

### VS Code 可用扩展设置

可通过 `File → Preferences → Settings → Claude Code` 调整以下选项：

| 设置项 | 推荐值 | 说明 |
|--------|--------|------|
| `claudeCode.useTerminal` | `false` | 使用原生 UI（非终端模式） |
| `claudeCode.autosave` | `true` | 自动保存文件 |
| `claudeCode.useCtrlEnterToSend` | `false` | 直接回车发送 |
| `claudeCode.preferredLocation` | `sidebar` | 侧边栏显示 |

---

## 四、效果验证

配置完成后，以下场景应表现为中文输出：

1. **CLI 对话**: 输入任意问题，Claude 应以中文回复
2. **IDE 对话**: VS Code 侧边栏中 Claude 应以中文回复
3. **代码生成**: 生成的代码注释应使用中文
4. **错误解释**: 错误分析和修复建议应以中文呈现

### 验证方法

在 Claude Code 中输入以下内容测试：

```
你好，请用一句话介绍你自己
```

预期输出应为中文自我介绍。

---

## 五、已知限制

1. **CLI 界面无法汉化** — 权限提示 (Allow/Deny)、Spinner、状态消息等仍是英文
2. **IDE 扩展 UI 无法汉化** — 菜单、按钮、标签等 UI 元素为英文硬编码
3. **不适用于其他语言模型** — DeepSeek 模型对中文支持良好，但不同模型的中文能力有差异
4. **第三方方案** — 如需完全中文界面，可考虑 `cc-translate-proxy` 或 `claudezh` 等第三方工具

---

## 六、相关资源

- [Claude Code 官方文档](https://code.claude.com/docs)
- [GitHub Issue: i18n/l10n 请求](https://github.com/anthropics/claude-code/issues/4866)
- [GitHub Issue: UI 语言配置请求](https://github.com/anthropics/claude-code/issues/29147)
- [第三方中文代理: cc-translate-proxy](https://github.com/GGGODLIN/cc-translate-proxy)

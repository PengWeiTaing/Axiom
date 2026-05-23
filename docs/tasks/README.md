# docs/tasks/ — DeepSeek 实现工任务区

这个目录里的每一个 `*.md` 都是一份**给 DeepSeek v4 Pro 的工作单**，由 Opus（架构师）出题，DeepSeek 执行。

## 分工

| 角色 | 干什么 |
|---|---|
| **Opus** | 出任务单、定视觉/交互/接口、审 DeepSeek 提交的代码 |
| **DeepSeek v4 Pro** | 按任务单写代码、跑构建、报错调试，不做架构决策 |

## 任务单生命周期

```
Opus 写 docs/tasks/NNN-xxx.md
  → 用户把任务单递给 DeepSeek
  → DeepSeek 按任务单直接写代码进仓库（动 frontend/src 等指定路径）
  → 用户告诉 Opus "做完了"
  → Opus 看 git diff，做 code review
  → 合格 → 任务单移到 docs/tasks/done/
  → 不合格 → Opus 提反馈，DeepSeek 再改
```

## DeepSeek 上岗须知（每份任务单生效，不要在任务单里重复）

### 1. 项目结构（前端 v2）

- 工程根：`E:/Axiom/frontend/`
- 入口：`src/main.ts` → `src/App.vue`
- 组件：`src/components/*.vue`
- 视图：`src/views/*.vue`
- 状态：`src/stores/*.ts`（Pinia）
- API：`src/api/client.ts`（统一 fetch）+ `src/api/endpoints.ts`（端点封装）
- 样式：`src/styles/tokens.css`（设计 token，**只能用这里定义的变量**）+ `src/styles/base.css`

### 2. 禁止动的文件

- `core/static/app.js` / `core/static/app.css` / `core/templates/app.html`（旧前端，等 v2 稳定后再清理）
- `core/_common.py` / `core/receiver.py` / `core/routes/**`（后端，除非任务单明确要求）
- `core/static/v2/`（构建产物，**不要手动改**——它由 `npm run build` 生成）

### 3. 视觉约束（硬规则）

- **颜色**：只允许用 `tokens.css` 里定义的 CSS 变量。不要写 `#fff`/`rgb(...)` 之类的字面量
- **圆角**：只用 `--r-1` / `--r-2` / `--r-3` / `--r-pill`
- **间距**：只用 `--s-1` ~ `--s-8`
- **字号**：只用 `--fs-1` ~ `--fs-7`
- **动效**：只用 `--t-fast` / `--t-base` / `--t-slow` + `--ease`
- 不引入新色、新圆角、新字号；如果设计上确实需要，**先停下问 Opus**

### 4. 代码风格

- TypeScript 严格模式，`vue-tsc --noEmit` 必须通过
- 注释默认中文；只在 _Why_ 不明显时才写，不要写 _What_
- 不要写 emoji
- Vue 组件用 `<script setup lang="ts">`
- API 调用走 `endpoints.ts` 里的函数；不要在组件里直接 `fetch`

### 5. 验收命令（每份任务单结束前必须跑通）

```bash
cd E:/Axiom/frontend
npm run build         # vue-tsc + vite build 必须全绿
```

build 失败禁止提交。

### 6. 不要做的事

- 不要"顺手"重构相邻代码
- 不要加新依赖（package.json 改动需 Opus 批准）
- 不要"为了好看"调整设计 token
- 不要在任务范围外创建新文件
- 任务单没说的字段、API、文案不要凭空发明

## 任务单命名

```
NNN-短主题.md
```

`NNN` 三位顺序号（001 起），主题用英文短名。例：

- `001-item-drawer.md`
- `002-timeline-mixed-feed.md`
- `003-pwa-manifest-v2.md`

## 任务单模板

见 [`_template.md`](_template.md)。每份任务单包含：

1. **目标**（一句话）
2. **背景 / Why**（这件事为什么要做）
3. **要改 / 新建的文件**（精确路径 + 改动类型）
4. **设计契约**（视觉、交互、数据流；参照已有组件）
5. **API 依赖**（用到的端点、字段、返回结构）
6. **验收清单**（人肉验证步骤 + build 命令）
7. **禁止事项**（容易踩坑的雷区）

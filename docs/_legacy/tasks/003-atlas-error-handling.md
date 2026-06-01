# 003 — Atlas 错误处理收口（视觉与语义）

> 一句话目标：把 Atlas 底部那 3 行刺眼的红色"加载失败 / 加载失败 / 未配置 AI API key"换成克制、有信息量的提示，不破坏 Atlas 整体的"驾驶舱"调性。

## 1. 背景 / Why

Opus 用 Playwright 跑了真实 UI 后发现：当前 Atlas 在数据少（开发环境）时，底部会堆 3 行红色错误：

```
加载失败
加载失败
未配置 AI API key
```

问题：

1. **错误用红色（var(--error)）刺眼**——但这些其实是"AI 没配 / 端点暂时空"的**预期开发状态**，不是真的故障
2. **"加载失败"重复两次**——`Promise.allSettled` 的错误没去重，多个端点失败时会堆叠
3. **AI 没配 key 被当成 error 显示**——这是配置缺失，应该是 _info_ 级别提示，不是 _error_
4. **错误堆在 Atlas 底部**——视觉上像"页面崩了"，但 Atlas 各 block 自己已经有"没有节奏数据 / 没有决策 / 本周还没有提炼"的空状态

参考截图：`E:/Axiom/screenshots/03-atlas.png`（已经存在）。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `frontend/src/stores/atlas.ts` | 错误收集去重 + 分类 | +20 / -8 |
| `frontend/src/views/AtlasView.vue` | 底部 errors 区改样式 + 文案 | +15 / -10 |

不要动其他文件。

## 3. 设计契约

### 3.1 错误分级（atlas store 内做）

`errors` 数组改成 `notices` 数组，每条带 level：

```ts
type AtlasNotice = {
  level: 'info' | 'warn'   // 不要 'error' 这一级 — Atlas 没有"真错误"
  message: string
  source: 'goals' | 'decisions' | 'memory_stats' | 'weekly' | 'daily'
}
```

`Promise.allSettled` 拿到 `rejected` 时按规则分类：
- 错误信息含 "AI" / "key" / "未配置" / "unconfigured" → level: `'info'`, message: `'AI 未配置，本周提炼暂不可用'`
- 错误信息含 "404" 或 "not_found" → level: `'info'`, message: `'<source 中文名> 端点暂时不可用'`
- 其他 → level: `'warn'`, message: `'<source 中文名> 加载失败：<原错误消息>'`

去重规则：**同 source 只保留最后一次**（用 Map 按 source 聚合即可）。

### 3.2 视觉契约（AtlasView 渲染）

**完全删掉**当前的 `.errors / .error` 红色 block。改成底部一行 muted 灰提示带 icon：

```
○ 节奏数据暂时不可用 · AI 未配置，本周提炼暂不可用
```

具体规则：

- 容器：`margin-top: var(--s-5)`，`padding: var(--s-2) var(--s-4)`，`border-top: 1px solid var(--line-1)`
- 文字：`font-size: var(--fs-2)`，颜色 `var(--text-4)`（不是 error 色）
- 多条提示之间用 ` · `（U+00B7 中点带空格）分隔，**全部在同一行**，溢出截断
- 每条前面一个 6×6 的圆点 `var(--text-5)`（warn 用 `var(--warn)` 但克制）
- **如果 notices 为空就整个 block 不渲染**

如果未来有 `level: 'warn'` 的真错误，圆点变成 `var(--warn)` 颜色暗示有问题——但仍然在同一行 inline 排列，不要让 warn 单独成行制造焦虑。

### 3.3 文案表

| source | 显示中文名 |
|---|---|
| `goals` | 主线 |
| `decisions` | 决策 |
| `memory_stats` | 记忆统计 |
| `weekly` | 本周提炼 |
| `daily` | 节奏数据 |

## 4. 验收清单

- [ ] `cd frontend && npm run build` 通过
- [ ] 在 dev 模式（Vite 5173 + Flask 5000，无 AI key 的现状）打开 Atlas：
  - [ ] 底部**不再有红色字**
  - [ ] 底部最多一行 muted 灰提示，内容像 `○ 节奏数据暂时不可用 · AI 未配置，本周提炼暂不可用`
  - [ ] 提示行紧挨着 distill block 下方，与 Atlas 整体调性一致
- [ ] 全部端点都正常时（mock 或真实数据完整时），底部提示**完全不渲染**（不留空 block）

## 5. 禁止事项

- 不要改 atlas store 的数据加载逻辑（`Promise.allSettled` 的并行/缓存策略保留）
- 不要引入新的颜色 token——能用 `--text-4` / `--text-5` / `--warn` 解决就用现有
- 不要给 notice 加 icon 库或 SVG（一个 6×6 的 `<span>` 圆点就行）
- 不要把 notice 做成 toast 或可关闭的卡片——只是一行底部 footer
- 不要改任何 block 内部的空状态（"还没有目标"、"没有决策"等 muted 文案保留）

## 6. 提交风格

```
fix: Atlas 错误处理改用 muted footer

- atlas store 错误改成 notices（含 level + source 分类）
- AI 未配置 / 404 归为 info，其他归为 warn
- 同 source 去重，不堆叠
- 底部红色 errors 块改成 text-4 灰色单行 footer
```

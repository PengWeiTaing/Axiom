# 004 — endpoints.ts 字段名与后端响应对齐

> 一句话目标：修复 `frontend/src/api/endpoints.ts` 里 `listMemories` / `listDecisions` 等列表端点的类型声明——后端返回的字段名是 `memories` / `decisions` / `tasks`（按实体复数），但前端写成了 `Paginated<T>`（含 `items`），导致 atlas store 等调用方拿到 undefined 而抛错。

## 1. 背景 / Why

Opus 在 review 003 时跑 Playwright 看 Atlas，发现底部 footer 显示"主线 加载失败：加载失败"和"决策 加载失败：加载失败"。

调查发现：

1. `/memories?category=goal` 后端返回 200，body 是 `{"memories":[],"ok":true,"page":1,"page_size":20,"total":0,"total_pages":1}`
2. 前端 `endpoints.ts` 把它声明为 `Paginated<Memory>`（即 `{ items: Memory[], page, ... }`）
3. atlas store 拿到 `data.items` → undefined → for...of 抛 TypeError → 被 Promise.allSettled 收成 notice "加载失败"

**这是个老 bug，不是 003 引入的**。003 只是把它的视觉表现从红色刺眼改成 muted 灰，让我看清了。

### 后端字段名表（实测）

| 端点 | 列表字段 |
|---|---|
| `GET /memories` | `memories` |
| `GET /decisions` | `decisions` |
| `GET /tasks` | `tasks` |
| `GET /recent` | `items` |
| `GET /search` | `items` |
| `GET /search/all` | `items` / `memories` / `tasks` / `decisions`（多键） |
| `GET /search/vector` | `items` |
| `GET /timeline` (新) | `entries` |

——`items` 是 items 表的字段名，**其他列表端点都用对应实体复数**，不是统一的 `items`。前端类型必须按实际字段名声明。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `frontend/src/api/types.ts` | 加 `MemoryList` / `TaskList` / `DecisionList` 三个列表响应类型，或者把 `Paginated` 改成泛型双参数 | +15 |
| `frontend/src/api/endpoints.ts` | 修 `listMemories` / `listDecisions` / `listTasks`（如果有）的返回类型 | ~10 |
| `frontend/src/stores/atlas.ts` | 调用处把 `data.items` 改为 `data.memories` / `data.decisions` | ~6 |
| `frontend/src/stores/timeline.ts` | **不改**（它调 /recent，字段是 items，正确） |

不要动其他文件。**特别不要**改后端去对齐 `items`——后端字段名已稳定，且 SDK / 旧前端都依赖。

## 3. 设计契约

### 3.1 推荐：`Paginated<T>` 改成泛型双参数

`frontend/src/api/types.ts` 现有：

```ts
export interface Paginated<T> {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  items: T[];
}
```

改成（second generic = field name string literal）：

```ts
// items 是默认字段名，与 /recent /search 等用 items 字段的端点兼容
export interface Paginated<T, K extends string = 'items'> {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}
// 实际数据字段通过交集类型表达，避免泛型 K 在运行时丢失：
export type PaginatedWith<T, K extends string> = Paginated<T> & { [P in K]: T[] };
```

或者更朴素：**不用泛型 K，直接为每个端点写专用类型**：

```ts
export interface MemoryList { page: number; page_size: number; total: number; total_pages: number; memories: Memory[]; }
export interface DecisionList { /* 同上，但 decisions: Decision[] */ }
export interface TaskList { /* 同上，但 tasks: Task[] */ }
```

**推荐第二种（朴素显式）**——读起来明确，不需要 TS 高阶技巧。

### 3.2 endpoints.ts 修改示例

```ts
// 改前
export const listMemories = (params: {...}) =>
  apiRequest<Paginated<Memory>>('/memories', { query: params });

// 改后
export const listMemories = (params: {...}) =>
  apiRequest<MemoryList>('/memories', { query: params });
```

同理 listDecisions 改 `DecisionList`。如果你看到现有有 `listTasks` 也按 `TaskList` 修。

### 3.3 atlas store 调用处

```ts
// 改前
const data = await listMemories({ ... });
for (const m of data.items) { ... }

// 改后
const data = await listMemories({ ... });
for (const m of data.memories) { ... }
```

decisions 同理：`data.items.slice(0, 8)` → `data.decisions.slice(0, 8)`。

### 3.4 同时改 atlas store 的兜底文案

顺手修一个 003 review 发现的小问题：当 ApiError.message 兜底是 "加载失败"（apiRequest 内置兜底），atlas store 拼成 "主线 加载失败：加载失败"，词重复。

在 `loadXxx` 失败时，如果 `raw === '加载失败'`（恰好等于 apiRequest 的兜底文案），就**不拼 `:${raw}` 后缀**：

```ts
// 当前
message = `${names[source]} 加载失败：${raw}`;

// 改成
message = raw === '加载失败' ? `${names[source]} 加载失败` : `${names[source]} 加载失败：${raw}`;
```

## 4. 验收清单

- [ ] `cd frontend && npm run build` 通过（vue-tsc 必须全绿）
- [ ] 在 dev 模式打开 Atlas（空库现状）：
  - [ ] **不再有 "主线 加载失败"** —— 主线区显示 "还没有目标。在 Capture 模式记一条..."
  - [ ] **不再有 "决策 加载失败"** —— 决策区显示 "没有决策"
  - [ ] 底部 footer 最多只剩 "AI 未配置，本周提炼暂不可用"（因为 /report/weekly 真的 503）
- [ ] 在 Atlas 写入一条 goal 类 memory（curl 或 UI 创建），刷新后主线区能渲染出来（验证 `data.memories` 真的被取到了）

## 5. 禁止事项

- 不要改后端任何路由的响应字段名
- 不要改 timeline store（它走 /recent，字段名正确）
- 不要"顺手"改其他不相关的类型定义
- 不要把 `Paginated<T>` 完全删除——`/recent` `/search` `/search/vector` 等真用 `items` 字段的端点应该继续用它

## 6. 提交风格

```
fix: endpoints 字段名与后端对齐

- 后端 /memories /decisions /tasks 列表返回的是 memories/decisions/tasks 字段
  不是统一的 items；前端类型声明跟着改
- atlas store 调用处 data.items → data.memories / data.decisions
- 顺手修兜底文案"X 加载失败：加载失败"的词重复
```

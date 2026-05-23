# 005 — Atlas v0.1 Cosmos 原型（mock 数据 + 球形树 + 四态机）

> 一句话目标：把 Atlas 重做成球形放射树状结构原型——只用 mock 数据验证空间模型、LOD、节点聚焦、局部关联 reveal 是否能撑起"思考人生"的调性。**不接任何后端、不动数据库**。

## 1. 背景 / Why

详细背景见 `docs/atlas/v0.1-rfc.md`。简要：

- 当前 Atlas（5 分区驾驶舱）本质是数据看板，不符合"低频深度宏观思考"的产品定位
- v0.1 原型阶段先验证视觉与状态机能不能撑住调性，**撑不住后端再大也白搭**
- v0.1 完全脱离后端，纯前端 mock。如果原型评审通过，再写后端任务单（005b 后端表 / 005c AI 关联拟合等）

**v0.1 拍板冻结清单见 `docs/atlas/v0.1-rfc.md §0.1`**——开工前必读，不要二次发挥。

## 2. 要改 / 新建的文件

| 文件 | 改动 | 大致行数 |
|---|---|---|
| `frontend/package.json` | 新增依赖 `three` + `@types/three`(dev) | +2 |
| `frontend/public/mock/cosmos.json` | **新建** mock 数据（按 §3 契约） | ~150 |
| `frontend/src/views/_legacy/AtlasView.vue` | 把当前 `views/AtlasView.vue` 整文件**移到这里**保留备查 | 移动 |
| `frontend/src/views/AtlasView.vue` | **完全重写**——只是个 wrapper，懒加载 CosmosView | ~20 |
| `frontend/src/views/CosmosView.vue` | **新建** 主宿主组件 + canvas 挂载 + 生命周期 | ~120 |
| `frontend/src/cosmos/scene.ts` | **新建** Three.js scene 构建（节点 / 连线 / 球壳） | ~200 |
| `frontend/src/cosmos/layout.ts` | **新建** 球面布局算法（角度扇区分配 + 力导向） | ~120 |
| `frontend/src/cosmos/camera.ts` | **新建** 摄像机控制 + tween 插值 util | ~80 |
| `frontend/src/cosmos/state.ts` | **新建** 状态机定义（4 态枚举 + 切换函数） | ~60 |
| `frontend/src/cosmos/types.ts` | **新建** cosmos 数据类型定义 | ~50 |
| `frontend/src/stores/cosmos.ts` | **新建** Pinia store（数据 + 当前状态 + 事件总线） | ~100 |
| `frontend/src/components/cosmos/Breadcrumb.vue` | **新建** 右上面包屑 | ~50 |
| `frontend/src/components/cosmos/NodeOverlay.vue` | **新建** 节点聚焦时的 HTML 标签覆盖层 | ~80 |

**不要改任何其他文件**。特别不要动：
- `mode.ts` store（顶部 3-tab 是后续任务）
- `App.vue` 的 mode 切换逻辑
- `CaptureView.vue` 顶部 Atlas 按钮的代码（按钮保留，行为指向新视图）
- `endpoints.ts` / `client.ts`（不接后端）
- `tokens.css`（视觉只用现有 token）

## 3. mock 数据契约 `frontend/public/mock/cosmos.json`

提供如下结构（**严格按此格式**，前端类型定义跟它对齐）：

```json
{
  "schema_version": "0.1",
  "root": {
    "id": "ROOT",
    "name": "我"
  },
  "lifelines": [
    { "id": "L1", "name": "健康", "parent_id": "ROOT", "order_index": 1 },
    { "id": "L1.1", "name": "减脂", "parent_id": "L1", "order_index": 1 },
    { "id": "L1.2", "name": "睡眠", "parent_id": "L1", "order_index": 2 },
    { "id": "L2", "name": "学习", "parent_id": "ROOT", "order_index": 2 },
    { "id": "L2.1", "name": "Rust", "parent_id": "L2", "order_index": 1 },
    { "id": "L2.2", "name": "系统设计", "parent_id": "L2", "order_index": 2 },
    { "id": "L3", "name": "关系", "parent_id": "ROOT", "order_index": 3 },
    { "id": "L3.1", "name": "家人", "parent_id": "L3", "order_index": 1 },
    { "id": "L4", "name": "事业", "parent_id": "ROOT", "order_index": 4 },
    { "id": "L4.1", "name": "Axiom", "parent_id": "L4", "order_index": 1 },
    { "id": "L5", "name": "兴趣", "parent_id": "ROOT", "order_index": 5 }
  ],
  "entities": [
    { "id": "T1", "kind": "task", "title": "晨跑 5km", "lifeline_id": "L1.1", "meta": { "priority": "high", "status": "todo" } },
    { "id": "T2", "kind": "task", "title": "晚饭少碳水", "lifeline_id": "L1.1", "meta": { "priority": "medium", "status": "done" } },
    { "id": "T3", "kind": "task", "title": "23 点前关灯", "lifeline_id": "L1.2", "meta": { "priority": "high", "status": "todo" } },
    { "id": "T4", "kind": "task", "title": "读 Rustonomicon Ch5", "lifeline_id": "L2.1", "meta": { "priority": "medium", "status": "todo" } },
    { "id": "T5", "kind": "task", "title": "重构 timeline 端点", "lifeline_id": "L4.1", "meta": { "priority": "high", "status": "done" } },
    { "id": "M1", "kind": "memory", "title": "夜间容易饿", "lifeline_id": "L1.1" },
    { "id": "M2", "kind": "memory", "title": "睡前刷手机会让我焦虑", "lifeline_id": "L1.2" },
    { "id": "M3", "kind": "memory", "title": "学习时容易分心", "lifeline_id": "L2" },
    { "id": "M4", "kind": "memory", "title": "我重视手感大于理论", "lifeline_id": "L2.1" },
    { "id": "M5", "kind": "memory", "title": "妈妈最近常打电话", "lifeline_id": "L3.1" },
    { "id": "D1", "kind": "decision", "title": "买跑步机还是去健身房", "lifeline_id": "L1" },
    { "id": "D2", "kind": "decision", "title": "Axiom 是否做 Tauri 壳", "lifeline_id": "L4.1" },
    { "id": "I1", "kind": "item", "title": "MIT 6.S081 课程笔记", "lifeline_id": "L2.2" },
    { "id": "I2", "kind": "item", "title": "豆瓣读书清单截图", "lifeline_id": "L5" }
  ],
  "associations": [
    { "id": "A1", "from": "T1", "to": "M1", "relation_type": "co_occurrence", "confidence": 0.82, "status": "accepted", "evidence": [{ "type": "shared_keyword", "excerpt": "夜间 / 早晨节律", "weight": 0.6 }] },
    { "id": "A2", "from": "T1", "to": "D1", "relation_type": "causal", "confidence": 0.74, "status": "pending", "evidence": [{ "type": "temporal", "excerpt": "T1 创建 2 天后 D1 出现", "weight": 0.5 }] },
    { "id": "A3", "from": "M2", "to": "T3", "relation_type": "causal", "confidence": 0.88, "status": "accepted", "evidence": [{ "type": "shared_keyword", "excerpt": "夜间 / 睡眠 / 焦虑", "weight": 0.8 }] },
    { "id": "A4", "from": "M3", "to": "T4", "relation_type": "tension", "confidence": 0.71, "status": "pending", "evidence": [{ "type": "explicit_link", "excerpt": "学习专注度与任务难度可能矛盾", "weight": 0.5 }] },
    { "id": "A5", "from": "T5", "to": "D2", "relation_type": "derived_from", "confidence": 0.79, "status": "accepted", "evidence": [{ "type": "temporal", "excerpt": "完成 T5 后讨论 D2", "weight": 0.6 }] },
    { "id": "A6", "from": "M4", "to": "T4", "relation_type": "co_occurrence", "confidence": 0.68, "status": "accepted", "evidence": [{ "type": "shared_keyword", "excerpt": "实践 / 手感", "weight": 0.5 }] },
    { "id": "A7", "from": "M1", "to": "T3", "relation_type": "co_occurrence", "confidence": 0.65, "status": "pending", "evidence": [{ "type": "temporal", "excerpt": "饿 → 不睡 → 第二天累", "weight": 0.4 }] }
  ]
}
```

加载方式：`fetch('/mock/cosmos.json')`（Vite dev 自动 serve `public/`，build 时拷到产物根）。

## 4. 视觉规范（严格用现有 tokens）

### 4.1 球壳半径（场景单位）

| 层 | 半径 | 内容 |
|---|---|---|
| R₀ | 0.2 | 根节点 "我" |
| R₁ | 1.0 | 一级 lifeline（领域，5~12 个） |
| R₂ | 1.8 | 二级 lifeline（项目/主题，每个父级 2~5 个） |
| R₃ | 2.5 | entity 叶子（task/memory/decision/item） |

### 4.2 节点视觉

- **根 (R₀)**：`THREE.Mesh` 球体 radius 0.04，颜色 `var(--accent)`，发光强度低
- **一级 lifeline (R₁)**：球体 radius 0.025，颜色 `var(--accent)`，alpha 1.0
- **二级 lifeline (R₂)**：球体 radius 0.018，颜色 `var(--text-2)`，alpha 0.9
- **叶子 (R₃) 按 kind 区分形状**（全部颜色 `var(--text-3)`，alpha 0.85）：
  - `task` → `THREE.BoxGeometry` 边长 0.014
  - `memory` → 球体 radius 0.012
  - `decision` → `THREE.OctahedronGeometry` radius 0.014（菱形看起来）
  - `item` → `THREE.TetrahedronGeometry` radius 0.014（三角看起来）

### 4.3 父子连线

- `THREE.LineSegments` 球面弧段（用 SLERP 插值生成 8 段折线，近似弧）
- 颜色 `var(--line-2)`（实际值用 `getComputedStyle(document.documentElement)` 取 CSS var 转换成 hex）
- alpha 0.4
- 线宽 1（注意 Three.js 标准 line 不支持宽度 > 1，但 v0.1 不用 Line2 复杂方案）

### 4.4 同心轨道环（点缀，非必须）

仅 R₁ 球壳显示一圈极淡轨道环：
- `THREE.CircleGeometry` 环线
- alpha 0.04
- 倾斜 15° 模拟黄道感（非黄赤交角认真模拟）

R₂ / R₃ **不画**轨道环（避免视觉密度过高）。

### 4.5 关联线（Relation Reveal 状态才显示）

- `co_occurrence` → 直线 `var(--text-3)` alpha 0.5
- `causal` → 直线 `var(--accent)` alpha 0.6
- `tension` → 直线 `var(--warm)` alpha 0.6
- `derived_from` → 直线 `var(--accent-dim)` alpha 0.5

线粗细 = confidence（用透明度模拟，0.5 ~ 0.9 区间映射 confidence 0.5 ~ 1.0）。

**status='pending'** 的关联线用**虚线**（Three.js `LineDashedMaterial` + computeLineDistances）。

### 4.6 背景

- 全屏 canvas，背景 `var(--surface-0)`
- 极淡球面网格（赤经赤纬线）alpha 0.04——**v0.1 选做**，如果实现成本超过 30 行就跳过
- **不要** 粒子背景、星空背景、晕染

### 4.7 HTML 覆盖层

Three.js scene 上面叠 HTML 元素（CSS position absolute）：
- 右上：面包屑（参考 §4.8）
- 右上面包屑下方：`× 退出 Atlas` 按钮（点击调 `mode.set('capture')`）
- Node Focus 状态时：节点旁的标签 + 一行 meta（用 Vue 组件 `NodeOverlay.vue` 渲染，position 通过 Three.js Vector3.project() 投影到屏幕坐标）
- Relation Reveal 状态时：右下角小字 `共 N 条关联 · M accepted · K pending`（参考 §5.4）
- **不做** evidence 抽屉、右侧轻面板（v0.2）

### 4.8 面包屑

右上角，距顶 16px 距右 16px。

格式（用 `›` 分隔，不是 `>` 或 `/`）：
- Global Overview: `Atlas`
- Region Zoom: `Atlas › 健康`
- Node Focus: `Atlas › 健康 › 减脂 › 晨跑 5km`
- Relation Reveal: 同 Node Focus + 右侧加灰色 `(关联)` 后缀

字号 `var(--fs-2)`，颜色 `var(--text-3)`，可点击祖先文字（hover 变 `var(--text-1)`）跳回该状态。当前层级文字不可点击。

## 5. 状态机契约

### 5.1 状态枚举（cosmos/state.ts）

```ts
export type CosmosState =
  | { kind: 'global_overview' }
  | { kind: 'region_zoom', lifeline_id: string }
  | { kind: 'node_focus', entity_kind: 'lifeline' | 'task' | 'memory' | 'decision' | 'item', entity_id: string }
  | { kind: 'relation_reveal', entity_kind: ..., entity_id: string }
```

### 5.2 状态切换

| 当前 | 触发 | 目标 | 摄像机变化 |
|---|---|---|---|
| Global | 点击 R₁ 节点 | Region Zoom | 距离 1.6R → 1.1R，看向该 lifeline 扇区中心，800ms |
| Region | 点击 R₂ 或 R₃ 节点 | Node Focus | 摄像机推到节点附近，800ms |
| Region | Esc / 缩出 | Global | 反向 800ms |
| Node Focus | 按 R | Relation Reveal | 关联线 300ms 淡入，无关节点 300ms 淡出 |
| Node Focus | Esc / 点祖先面包屑 | Region 或 Global | 反向 800ms |
| Relation Reveal | 再按 R / 点空白 | Node Focus | 关联线 300ms 淡出，其余节点 300ms 淡入 |
| Relation Reveal | 点关联节点 | Node Focus（新节点） | 摄像机平移到新节点，800ms，关联线先淡出 |
| Relation Reveal | Esc | Node Focus | （先回 Node Focus，再 Esc 才能继续退） |
| 任意 | 点击 × 退出 Atlas | 退出 | 调 `mode.set('capture')` |

### 5.3 摄像机参数（v0.1 球外简化）

| 状态 | distance | target | FOV |
|---|---|---|---|
| Global | 4.0 单位（R₃=2.5 的 1.6 倍） | (0,0,0) | 60° |
| Region | 2.8 单位（贴 R₂ 外） | 该 lifeline 在 R₁ 上的坐标 | 55° |
| Node Focus | 0.6 单位（贴节点） | 节点坐标 | 38° |
| Relation Reveal | 0.8 单位（略放宽看周围关联） | 节点坐标 | 45° |

摄像机插值用自写的 tween util（cubic ease-in-out 800ms），同时插值 position + target + FOV。

### 5.4 关联渲染规则

- 只显示 `confidence >= 0.7` 的关联（v0.1 固定阈值，不暴露给用户调）
- `status = 'rejected'` 不显示
- `status = 'pending'` 虚线 + 80% 透明度
- `status = 'accepted'` 实线
- 数量 > 20 时按 confidence 降序裁剪到 20
- 关联到的对端节点**保持完全不透明**（无论它在哪个 lifeline 下都拉出来高亮）
- 其余非关联节点 fade 到 alpha 0.05

底部统计："共 7 条关联 · 4 已确认 · 3 待审核"（按 mock 数据实际算）。

## 6. LOD（视距分级）

根据 OrbitControls 当前 `camera.position.length()` 距球心距离：

| 距离 | 显示层 |
|---|---|
| > 3.5 | R₀ + R₁ |
| 2.0 ~ 3.5 | R₀ + R₁ + R₂ |
| < 2.0 | R₀ + R₁ + R₂ + R₃ |

LOD 切换用**整层 visible toggle**（不要逐节点 fade）——简化实现，性能也更好。Region Zoom / Node Focus 强制显示对应层不管距离。

## 7. Three.js 集成要点

### 7.1 懒加载

`AtlasView.vue` 用 `defineAsyncComponent(() => import('./CosmosView.vue'))`。

`CosmosView.vue` 内的 Three.js 也用动态 import：

```ts
const { initScene } = await import('@/cosmos/scene')
```

确保 `three` 进独立 chunk，Capture 启动时不加载。

### 7.2 生命周期

```
onMounted   → fetch mock → init scene → start render loop
onBeforeUnmount → cancelAnimationFrame → scene.traverse(disposeMeshes) → renderer.dispose() → 解绑事件
```

记得 dispose：geometry / material / texture / renderer。否则切换出 Atlas 再回来会内存爆。

### 7.3 OrbitControls

- `enableDamping = true, dampingFactor = 0.08`
- `enableZoom = true, zoomSpeed = 0.6`
- `enablePan = false`（Atlas 只允许旋转和缩放，不允许平移——避免视角丢失）
- `minDistance = 0.5, maxDistance = 6.0`

### 7.4 拾取（点击节点）

用 `THREE.Raycaster` + 鼠标 NDC 坐标。

为提升性能：把所有节点 mesh 放进一个共享数组 `pickable[]`，raycaster 只测这个数组，不测全场景。

## 8. cosmos store 字段

```ts
// stores/cosmos.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CosmosState, CosmosData } from '@/cosmos/types'
import mitt from 'mitt' // 不！不要新增依赖，自己写一个最小事件总线

export const useCosmosStore = defineStore('cosmos', () => {
  const data = ref<CosmosData | null>(null)
  const state = ref<CosmosState>({ kind: 'global_overview' })
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 事件 hook（为将来 focus_session 录制预留）
  // 不要引入 mitt，写一个 60 行的 minimal emitter，或者就用回调数组
  const listeners: Record<string, Array<(payload: any) => void>> = {}
  function emit(event: string, payload: any) { listeners[event]?.forEach(fn => fn(payload)) }
  function on(event: string, fn: (payload: any) => void) {
    if (!listeners[event]) listeners[event] = []
    listeners[event].push(fn)
  }

  async function load() {
    if (data.value) return
    loading.value = true
    try {
      const resp = await fetch('/mock/cosmos.json')
      data.value = await resp.json()
    } catch (e) {
      error.value = '加载失败'
    } finally {
      loading.value = false
    }
  }

  function transition(next: CosmosState) {
    emit('leave_' + state.value.kind, state.value)
    state.value = next
    emit('enter_' + next.kind, next)
  }

  return { data, state, loading, error, load, transition, on }
})
```

**注**：上面的 `import mitt from 'mitt'` 那行是错的——**不要新增 mitt 依赖**。直接写极简 listeners 对象（已在示例里）。

事件名约定：`enter_global_overview` / `leave_global_overview` / `enter_region_zoom` / ... / `enter_relation_reveal`。

## 9. 验收清单

- [ ] `cd frontend && npm install` 通过（确认 three 正确装上）
- [ ] `npm run build` 通过（vue-tsc 无错，**Three.js 在独立 chunk**——build 输出能看到一个 ~140KB three 的 chunk）
- [ ] `npm run dev` 启动 → 进入 `http://127.0.0.1:5173/`（无需重新登录，localStorage key 还在）
- [ ] 点击顶部 Atlas 按钮进入 → 看到一个旋转响应的球
- [ ] **Global Overview**：只看到根 + 5 条主线节点，球面有同心轨道环 R₁ 暗示
- [ ] 鼠标拖拽流畅旋转，滚轮缩放有阻尼
- [ ] **缩近距离**：看到二级节点（减脂 / 睡眠 / Rust 等）
- [ ] **继续缩近**：看到叶子，叶子按 kind 形状区分（方块/圆/菱形/三角）
- [ ] **点击"健康"主线节点** → 摄像机推近到该扇区，进 Region Zoom
- [ ] **点击"减脂"二级节点** → 摄像机进 Node Focus，节点居中浮出标签 "减脂"
- [ ] **点击叶子节点"晨跑 5km"** → Node Focus，标签显示 task 元信息
- [ ] **按 R 键** → 关联线渐入，看到 T1 → M1 实线（accepted）和 T1 → D1 虚线（pending），其余节点褪到极淡
- [ ] **悬停关联线** → 显示 micro-tooltip 含 evidence excerpt
- [ ] **点击关联到的对端节点** → 平滑切换焦点到新节点（关联线先淡出再淡入新关联）
- [ ] **再按 R** → 关联线淡出，其余节点恢复
- [ ] **Esc** → 退一层（Relation Reveal → Node Focus → Region Zoom → Global Overview）
- [ ] **右上面包屑** 显示当前路径，点击祖先文字能跳回
- [ ] **点击 × 退出 Atlas** → 回到 Capture 模式
- [ ] **完全不调任何 API**（network 面板验证：除了 `/mock/cosmos.json` 一个文件外，无任何后端请求）
- [ ] 视觉**严格用现有 token**（搜代码无 `#xxxxxx` 颜色字面量，无新增 token）
- [ ] 切换出 Atlas 再回来，**内存不持续增长**（手动验：开 DevTools Memory，进 Atlas，退出，重复 3 次，内存基线稳定，证明 dispose 对了）

## 10. 禁止事项

- 不要新增 `mitt` / `lodash` / `gsap` / `@react-three/fiber` / `tresjs` / 任何 Three.js 包装层依赖
- 不要 `fetch` 除 `/mock/cosmos.json` 之外的任何 URL
- 不要修改 `mode.ts` / `App.vue` / `CaptureView.vue`（除非是 Atlas 按钮的链接，但行为不变）
- 不要修改 `tokens.css` / `base.css`
- 不要给关联线加箭头 / lens flare / 粒子效果
- 不要做 evidence 抽屉、用户审核按钮
- 不要做底部 AI 引导文案（mock 假，先别做）
- 不要做球内穿入（v0.1 只球外）
- 不要做 reflection_prompt / focus_session 持久化
- 不要在 cosmos store 里调任何 endpoints.ts 函数
- 不要为了"性能"用 InstancedMesh——v0.1 节点数 < 50，普通 Mesh 足够
- **如果发现 mock 数据契约不够用**（比如想加个字段方便实现），停下，在 PR 描述里写 `BLOCKED: mock schema 缺 xxx 字段` 等 Opus 决定

## 11. 提交风格

```
add: Atlas v0.1 cosmos 原型

- 球形树状空间模型：R0 根 / R1 领域 / R2 项目 / R3 叶子
- 四态机：Global Overview / Region Zoom / Node Focus / Relation Reveal
- LOD：距离分级显示
- 摄像机插值穿梭（自写 tween util，不引入 GSAP）
- 关联线 reveal（co_occurrence / causal / tension / derived_from）
- 完全使用 public/mock/cosmos.json，零后端依赖
- Three.js 懒加载，独立 chunk
- 旧 Atlas 移到 views/_legacy/ 保留备查
```

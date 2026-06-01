# Axiom Atlas v1 重构说明文档（给 Claude / Coding Agent）

## 0. 文档目的

本文用于把 Axiom 当前 Atlas / Cosmos / Lifeline / Association 相关讨论整理成一份可执行的工程说明，供 Claude、Codex 或其他 coding agent 接手开发。

目标不是做一个“更炫的知识图谱”，而是把 Axiom Atlas 从当前偏混乱的“数据可视化草图”重构成一个有清晰底层逻辑的个人认知地图系统。

核心目标：

```text
把 Atlas 从“直接显示所有实体关系”改成：
稳定骨架层 + 语义聚类层 + 局部明细层
```

一句话定义：

> Axiom Atlas 不应成为更大的 Obsidian Graph，而应成为有语义层级、有关系证据、有 AI 排布、有局部聚焦能力的个人认知地图。

核心交互形态必须明确：

```text
Atlas 主入口 = 3D / 准 3D 全局概览图谱
聚焦某一点后 = 2D Local Atlas 局部图谱
```

2D 不是 Atlas 的主形态，而是从 3D 全局视图中选择 root / lifeline / cluster / entity 后进入的局部关系解释层。

---

## 1. 当前 Axiom 现状摘要

Axiom 当前已经不是简单的 iOS 快捷指令收集器，也不是普通笔记后端，而是一个部署在 VPS 上的个人外脑后端系统。

当前大致具备：

- 文本、图片、文档、音频输入
- 文件落盘与 SQLite 索引
- FTS5 搜索
- 最近记录、详情、编辑、归档、恢复、删除
- 处理队列
- 自动化任务与 artifact 产物
- 记忆系统 memory
- 任务系统 task
- 决策系统 decision
- Lifeline 主线系统
- Cosmos / Association 关系图谱雏形
- 移动 Web App / PWA
- 模块系统，例如减脂模块

当前真实阶段应理解为：

```text
Axiom v0.2+ 运行基线 / v0.1 alpha 标签残留
```

现有架构方向可以保留：

```text
iPhone / Web App
  -> HTTPS / Nginx
  -> gunicorn
  -> Flask receiver
  -> SQLite + 文件系统
  -> 自动化 / 回顾 / 处理产物
```

不建议推翻：

- Flask 后端
- SQLite + 文件系统
- VPS 主节点部署
- 现有 items / memories / tasks / decisions / lifelines 数据底座
- 现有自动化、审计、导出、备份、处理队列机制

真正应该重构的是：

```text
Cosmos / Atlas 的关系建模层、视图模型、过滤规则、布局逻辑和前端渲染策略
```

---

## 2. 当前 Atlas 的主要问题

根据当前截图和现有表现，Atlas 不是单纯“画得乱”，而是底层逻辑混乱。

### 2.1 一个视图承担了过多任务

当前 Atlas 同时承担了：

- Lifeline 导航树
- 全局语义图谱
- 实体总览
- 文本标签展示
- 关系浏览
- 局部详情预览

这些任务本身冲突。

应拆分为：

```text
全局 Atlas：看整体结构
Local Atlas：看局部关系
Detail Panel：看具体内容
Sidebar：管理 Lifeline / 导航 / 筛选
```

---

### 2.2 Lifeline 树和 Entity 关系图混在同一平面

当前主线节点，例如：

- 阅读
- Rust 学习
- Axiom 开发
- 财务
- 创作
- 健康
- 社交

这些是 Lifeline / 一级主线。

但大量具体记录、任务、记忆、决策、原始文本又作为 entity 直接进入同一个平面。

问题：

```text
Lifeline 想要稳定结构
Entity 想要局部聚类
文本标签想要避免重叠
边想要表达关系
```

这四个目标互相打架。

结论：

> Lifeline 和 Entity 不是同一层级对象，不能用同一套布局规则。

---

### 2.3 边的语义混杂

当前边至少混有两类：

#### A. 结构归属边

表示：

```text
某个 entity 属于哪个 lifeline / cluster / module
```

例如：

```text
Rust 学习 -> 所有权笔记
Axiom 开发 -> Atlas 设计决策
```

#### B. 语义关联边

表示：

```text
两个 entity 之间存在同主题、因果、冲突、派生、支持等关系
```

例如：

```text
某条 Rust 笔记 <-> 某条 Axiom 技术选型决策
某个健康记录 -> 某个训练表现变化
```

当前如果两类边画成同一种线，用户无法判断线的意义。

结论：

> 结构边和语义边必须分离。

---

### 2.4 当前显示的是“文本”，不是“节点”

截图里大量长文本标签直接铺在画布上，导致用户看到的是：

```text
一堆漂浮文字 + 几条线
```

而不是：

```text
节点结构 + 关系结构 + 语义密度
```

图谱主视觉单位应该是 node / edge，不是 label。

全局视图不应默认显示大量长文本标签。

---

### 2.5 缺少 LOD 机制

当前没有根据缩放等级、聚焦层级、节点类型动态控制显示密度。

必须引入 LOD：

```text
Zoom out：只显示 root / lifeline / cluster
中等缩放：显示高权重 entity
Zoom in / focus：显示 item、标题、具体关系
```

没有 LOD，Atlas 必然变成毛线团。

---

### 2.6 目前布局像“横向面条”

第二张图呈现明显横向拉长，原因可能包括：

- 全局力导向被主轴关系拉扯
- 文本 label 宽度参与视觉负担
- 缺少 cluster 容器
- 所有节点共享同一布局空间
- 全局 force layout 试图解决所有层级关系

结论：

> 全局 Atlas 不应使用单一全局 force layout。应采用“稳定骨架 + 分区布局 + 局部力导向”。

---

## 3. 产品定位：Atlas / Local Atlas / Cosmos

建议正式区分三个概念：

| 名称 | 定位 | 说明 |
|---|---|---|
| Cosmos | 后端图谱数据层 | 聚合 items / memories / tasks / decisions / lifelines / associations |
| Atlas | 3D 或准 3D 全局认知地图 | 主形态，看整体结构、领域分布和宏观距离关系 |
| Local Atlas | 2D 局部图谱 | 从 3D Atlas 聚焦某个节点后进入的局部关系网络，可借鉴 Obsidian local graph |

关系：

```text
Cosmos = 图谱数据源
Atlas = 全局认知地图
Local Atlas = 局部关系视图
```

不要让 Cosmos 同时承担数据层、视觉层、交互层概念。

---

## 4. Obsidian 值得学习与不能照抄的地方

### 4.1 值得学习

Obsidian Graph 的优点：

- 2D 图谱动效克制
- 节点运动有轻微惯性
- 线条简洁，少用弯弯曲曲的装饰线
- 局部图谱体验较直观
- graph / local graph 概念清楚
- 用户可以通过过滤、深度、节点大小、连接线等参数控制密度

Axiom 可借鉴：

```text
局部图谱形态
轻量动效
低干扰线条
hover / focus 强化
深度控制
```

### 4.2 不能照抄

Obsidian 本质是笔记链接浏览器。

Obsidian 只有 2D 知识库图谱和局部图谱。它可以作为 Axiom 聚焦后 Local Atlas 的审美参考，但不能作为 Atlas 主形态。

Axiom 的目标不是“显示 note 之间有哪些链接”，而是：

```text
自动分析实体关系
推断因果 / 冲突 / 派生 / 同主题关系
根据语义层级排布
在 3D 全局空间中表达整体结构、距离和强弱
用图谱辅助理解、回顾、决策
```

所以 Axiom Atlas 应该更接近：

```text
个人认知地图 + 关系建模系统 + 决策辅助图谱
```

而不是：

```text
更大的笔记链接图
```

---

## 5. 正确的底层图谱模型：三层分离

Atlas v1 必须采用三层模型。

---

### 5.1 Layer 1：结构骨架层 Skeleton

包含：

- root
- lifeline
- domain
- module

示例：

```text
Axiom Root
├─ 阅读
├─ Rust 学习
├─ Axiom 开发
├─ 财务
├─ 创作
├─ 健康
└─ 社交
```

特点：

- 数量少
- 稳定
- 可预测
- 主要用于导航
- 默认始终可见
- 不应被 force graph 随意扰动

布局：

```text
中心 root
一级 lifeline 环形 / 半环形 / 星型分布
每个 lifeline 占据稳定扇区
```

原则：

> 骨架层是地图底盘，必须稳定。

---

### 5.2 Layer 2：语义聚类层 Cluster

包含：

- topic cluster
- memory cluster
- project cluster
- module-specific cluster
- AI 生成的主题簇

例如 Rust 学习下不应直接铺所有 item，而应先聚合成：

```text
Rust 学习
├─ 所有权
├─ trait
├─ unsafe
├─ 并发
├─ Tokio
└─ 项目实践
```

Cluster 的作用：

- 承接 Lifeline
- 聚合原始 entity
- 控制节点总量
- 形成可辨认区域
- 让全局图可读

没有 cluster 层，系统只能在“少数 lifeline”和“大量原始 item”之间硬连，这就是当前混乱的核心原因之一。

---

### 5.3 Layer 3：原始实体层 Leaf

包含：

- item
- text note
- image description
- document-derived text
- audio transcript
- task
- memory
- decision

默认策略：

```text
不在全局 Atlas 全量展开
只在 Local Atlas / focus / zoom in 中显示
```

全局视图中 Leaf 只能作为：

- 小点
- 聚类计数
- 热度密度
- hover 后的局部展开

---

## 6. 节点模型设计

建议标准节点类型：

```text
root
lifeline
cluster
memory
task
decision
item
module
```

建议字段：

```json
{
  "id": "memory:8",
  "type": "memory",
  "label": "Axiom 的图谱方向",
  "summary": "关于 Atlas 关系建模和视觉规则的记忆",
  "layer": 3,
  "semantic_level": "entity",
  "lifeline_id": "axiom-dev",
  "cluster_id": "cluster:atlas-design",
  "module_id": null,
  "weight": 0.72,
  "centrality": 0.48,
  "status": "confirmed",
  "created_at": "...",
  "updated_at": "..."
}
```

### 6.1 layer 定义

建议：

| layer | 含义 | 节点类型 |
|---|---|---|
| 0 | root | root |
| 1 | 主线 | lifeline |
| 2 | 聚类 / 模块 | cluster / module |
| 3 | 结构化实体 | memory / task / decision |
| 4 | 原始材料 | item |

---

## 7. 边模型设计

必须拆分三种边。

---

### 7.1 Structural Edge：结构边

表示：

```text
属于 / 挂载 / 包含
```

例如：

```text
root -> lifeline
lifeline -> cluster
cluster -> item
lifeline -> task
module -> module_item
```

特点：

- 稳定
- 淡
- 细
- 不强调推理
- 主要用于地图结构

字段：

```json
{
  "id": "edge:1",
  "source": "lifeline:rust",
  "target": "cluster:rust-ownership",
  "edge_class": "structural",
  "relation_type": "contains",
  "strength": 1.0,
  "confidence": 1.0,
  "visible_by_default": true
}
```

---

### 7.2 Semantic Edge：语义边

表示：

```text
same_topic
co_occurrence
causal
tension
derived_from
supports
contradicts
prerequisite
next_action
```

特点：

- 稀疏
- 必须有强度
- 必须有置信度
- 最好有 evidence
- 默认不全显示

字段：

```json
{
  "id": "edge:42",
  "source": "memory:8",
  "target": "decision:3",
  "edge_class": "semantic",
  "relation_type": "causal",
  "strength": 0.86,
  "confidence": 0.78,
  "evidence": "memory 中提到的问题直接触发了该 decision",
  "generated_by": "rule+llm",
  "visible_by_default": true
}
```

---

### 7.3 Focus Edge：交互边

表示当前用户聚焦某节点时临时展示的关系。

特点：

- 非全局常驻
- 点击 / hover / search 后出现
- 用于局部理解
- 可临时高亮一阶、二阶关系

---

## 8. 关系过滤规则

Atlas 不应默认展示所有边。

### 8.1 全局 Atlas 默认显示

```text
root
lifeline
cluster
高权重 entity 少量代表节点
```

边显示：

```text
structural edges: 默认显示，但极淡
semantic edges: 只显示高价值边
```

建议阈值：

```text
same_layer semantic edge: strength >= 0.65
adjacent_layer semantic edge: strength >= 0.82
cross_2_layers semantic edge: 默认隐藏
cross_2_layers causal/tension edge: strength >= 0.88 才显示
每个节点默认最多 8 条 visible semantic edges
```

### 8.2 Local Atlas 默认显示

```text
center node
一阶强关系
少量二阶摘要节点
必要 structural parent
```

建议参数：

```text
depth = 1
max_nodes = 40
max_edges = 80
same_layer_threshold = 0.60
cross_layer_threshold = 0.82
```

Local Atlas 的信息密度控制规则：

```text
只展示同语义层级中的高关联度节点
只展示上下相邻层级中的超高关联度节点
默认不展示跨多层普通弱关系
```

这样可以借鉴 Obsidian local graph 的清爽感，同时避免 2D 视角下信息量过大。

### 8.3 隐藏规则

默认隐藏：

- weak edges
- low confidence edges
- 没有 evidence 的 AI 猜测边
- 跨 2 层以上普通边
- 同一批导入造成的伪时间邻接边
- 大量 item-item 弱共现边

---

## 9. 关系强度评分规则

不要让 AI 对所有节点两两判断。

正确流程：

```text
候选生成
  -> 规则评分
  -> 高潜力候选交给 LLM
  -> LLM 分类
  -> 写入 graph_edges
  -> 过滤后输出 Atlas payload
```

### 9.1 候选来源

候选可来自：

- 同 lifeline
- 同 cluster
- 同 module
- 时间相近
- FTS 相似
- 共享关键词
- 同一 task / decision 引用
- 同一周回顾共同出现
- 用户手动连接过

限制：

```text
每个节点最多生成 20 个候选
每轮任务最多分析 300 对候选
```

### 9.2 第一版评分公式

可先使用：

```text
strength =
  0.25 * text_similarity
+ 0.20 * same_lifeline
+ 0.15 * time_proximity
+ 0.15 * explicit_user_link
+ 0.10 * shared_module
+ 0.10 * ai_confidence
+ 0.05 * recurrence
```

重点不是数学完美，而是：

```text
稳定
可解释
可调参
可审计
```

每条语义边必须有 evidence 或生成依据。

---

## 10. Cluster 生成规则

全局 Atlas 的核心单位应该是 cluster，而不是原始 item。

### 10.1 Cluster 来源

第一版可以混合使用：

```text
已有 lifeline 下的高频关键词
FTS / bigram 相似
同一 module
同一 memory / decision 引用
同一周回顾共同出现
用户手动创建 cluster
LLM 对最近内容提取主题
```

### 10.2 Cluster 字段

```json
{
  "id": "cluster:rust-ownership",
  "type": "cluster",
  "label": "Rust 所有权",
  "lifeline_id": "rust-study",
  "summary": "围绕 ownership、borrow、lifetime 的学习记录",
  "item_count": 18,
  "entity_count": 6,
  "weight": 0.77,
  "updated_at": "..."
}
```

### 10.3 Cluster 可视化

Cluster 可以表现为：

- 较大节点
- 半透明区域
- 扇区内局部中心
- 周围有少量代表 entity

不要把所有 leaf 直接铺开。

---

## 11. 布局规则

核心原则：

```text
全局图谱用分区布局
局部簇内再用力导向
```

---

### 11.1 Skeleton 固定布局

Root 位于中心。

Lifeline 采用环形 / 半环形 / 手动稳定位置。

每个 Lifeline 拥有一个扇区。

示例：

```text
阅读       左下
Rust 学习  右下
Axiom 开发 右中
健康       右上
创作       上方
社交       左侧
财务       左中
```

不要每次刷新随机变化。

---

### 11.2 Cluster 扇区布局

每个 cluster 在对应 lifeline 扇区内排布。

规则：

```text
cluster 距 lifeline 的距离由重要度和活跃度决定
同一 lifeline 下 cluster 之间保持角度间隔
高权重 cluster 靠近 lifeline / root
低权重 cluster 外移
```

---

### 11.3 Entity 局部力导向

只有当用户进入某个 cluster 或 Local Atlas 时，才对内部 entity 使用 force layout。

不要全局 force 所有节点。

---

### 11.4 距离表达关系强度

关系越强，距离越近。

简化公式：

```text
distance = base_distance_by_layer * (1.2 - strength)
```

建议：

```text
same layer base_distance = 80
adjacent layer base_distance = 120
cross layer base_distance = 180
```

但注意：这是局部关系布局规则，不应打破全局 skeleton 稳定性。

---

## 12. LOD 显示机制

必须实现 Level of Detail。

### 12.1 Zoom out

显示：

```text
root
lifeline
cluster
cluster count / density
```

隐藏：

```text
item label
普通 entity label
大多数 semantic edges
```

---

### 12.2 Medium zoom

显示：

```text
高权重 cluster
高权重 memory / task / decision
少数强 semantic edges
```

---

### 12.3 Zoom in / Focus

显示：

```text
具体 item
标题
关系 evidence
focus edges
detail preview
```

---

### 12.4 Label 规则

全局默认只显示：

- root label
- lifeline label
- cluster label
- hovered node label
- selected node label
- centrality top N label

不要全局显示所有 item 标题。

---

## 13. 视觉设计规范

### 13.1 总体视觉语言

Axiom Atlas 应采用：

```text
暗色背景
低饱和色系
细线
轻微发光
节点悬浮感
交互时局部增强
默认克制，不做霓虹灯效果
```

禁用方向：

```text
高饱和红蓝
粗线彩虹
大量弯曲线
全场发光
所有边常驻显示
长文本铺满画布
```

---

### 13.2 节点颜色

节点颜色不使用红蓝渐变。

节点颜色按类型区分，并保持低饱和。

建议：

| 节点类型 | 色感 |
|---|---|
| root | 低饱和亮青 / 白青 |
| lifeline | 低饱和青绿 |
| cluster | 冷灰蓝 / 暗青 |
| memory | 灰蓝 |
| task | 低饱和青绿 |
| decision | 低饱和紫 |
| item | 灰蓝 / 深灰 |
| pending | 低亮度琥珀色点缀 |

---

### 13.3 连接线颜色

用户特别要求：红蓝渐变是连接线的渐变，不是节点渐变。

规则：

```text
连接线从靠近中心的一端到远离中心的一端，使用低饱和红 -> 低饱和蓝渐变。
```

在 3D 全局 Atlas 中，中心是 root / 当前全局重心；在 2D Local Atlas 中，中心是当前 focus node。渐变方向必须按“中心 -> 外侧”计算，而不是按 source / target 固定方向计算。

不要使用高饱和纯红、纯蓝。

建议色值：

```text
中心端：#B46A63  // 灰红 / 陶土红
外侧端：#5F7FA6  // 灰蓝 / 雾蓝
```

更克制的透明版本：

```text
中心端：rgba(180, 106, 99, 0.42)
外侧端：rgba(95, 127, 166, 0.32)
```

### 13.4 连接线默认状态

```text
opacity: 0.18 ~ 0.35
width: 0.6px ~ 1.4px
saturation: low
brightness: medium-low
```

交互增强：

```text
hover node: 相关线 opacity 提到 0.65
focus node: 主路径线 width 提到 1.8px ~ 2.4px
causal / tension: 可轻微加亮，但不高饱和
```

---

### 13.5 线型表达关系类型

不要用很多颜色区分关系类型，关系类型主要靠线型。

| 关系类型 | 样式 |
|---|---|
| structural | 极淡灰白细线 |
| same_topic / co_occurrence | 细实线 |
| causal | 稍亮实线，可有方向感 |
| derived_from | 细箭头线 |
| tension / contradicts | 低饱和紫灰或红灰虚线 |
| prerequisite | 点线 / 短划线 |
| weak edge | 默认不显示 |

设计原则：

> 先解决边的数量和语义类型，再做红蓝渐变。否则只是更美地混乱。

---

## 14. API 设计

建议新增或重构以下接口。

```text
GET  /atlas
GET  /api/atlas/graph
GET  /api/atlas/local?center=item:123&depth=1
GET  /api/atlas/node/item:123
POST /api/atlas/rebuild
POST /api/atlas/edge
PATCH /api/atlas/edge/<id>
DELETE /api/atlas/edge/<id>
```

---

### 14.1 /api/atlas/graph 返回结构

```json
{
  "schema_version": "atlas.v1",
  "mode": "global",
  "nodes": [
    {
      "id": "cluster:atlas-design",
      "type": "cluster",
      "label": "Atlas 设计",
      "layer": 2,
      "lifeline_id": "axiom-dev",
      "size": 9,
      "weight": 0.82,
      "visible_label": true
    }
  ],
  "edges": [
    {
      "id": 12,
      "source": "lifeline:axiom-dev",
      "target": "cluster:atlas-design",
      "edge_class": "structural",
      "relation_type": "contains",
      "strength": 1.0,
      "confidence": 1.0,
      "width": 0.8,
      "opacity": 0.22
    },
    {
      "id": 42,
      "source": "memory:8",
      "target": "decision:3",
      "edge_class": "semantic",
      "relation_type": "causal",
      "strength": 0.86,
      "confidence": 0.78,
      "distance": 40,
      "width": 1.8,
      "opacity": 0.55,
      "color_from": "rgba(180,106,99,0.42)",
      "color_to": "rgba(95,127,166,0.32)",
      "evidence": "memory 中的问题触发了该 decision"
    }
  ],
  "view": {
    "max_nodes": 300,
    "hidden_edges": 1204,
    "generated_at": "2026-05-27T..."
  }
}
```

---

## 15. 数据表建议

继续使用 SQLite，不要现在引入 Neo4j。

原因：当前瓶颈不是图数据库能力，而是：

```text
节点语义不清
边的证据不足
视图过滤规则没定
前端没有稳定 Atlas 形态
```

---

### 15.1 graph_nodes

```sql
CREATE TABLE IF NOT EXISTS graph_nodes (
    id TEXT PRIMARY KEY,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    title TEXT,
    summary TEXT,
    layer INTEGER NOT NULL,
    semantic_level TEXT,
    lifeline_id TEXT,
    cluster_id TEXT,
    module_id TEXT,
    weight REAL DEFAULT 0,
    centrality REAL DEFAULT 0,
    status TEXT,
    created_at TEXT,
    updated_at TEXT
);
```

---

### 15.2 graph_edges

```sql
CREATE TABLE IF NOT EXISTS graph_edges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_id TEXT NOT NULL,
    target_id TEXT NOT NULL,
    edge_class TEXT NOT NULL,
    relation_type TEXT NOT NULL,
    strength REAL NOT NULL,
    confidence REAL NOT NULL,
    layer_delta INTEGER DEFAULT 0,
    evidence TEXT,
    generated_by TEXT,
    visible_by_default INTEGER DEFAULT 0,
    last_seen_at TEXT,
    created_at TEXT,
    updated_at TEXT
);
```

---

### 15.3 graph_clusters

```sql
CREATE TABLE IF NOT EXISTS graph_clusters (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    summary TEXT,
    lifeline_id TEXT,
    module_id TEXT,
    item_count INTEGER DEFAULT 0,
    entity_count INTEGER DEFAULT 0,
    weight REAL DEFAULT 0,
    generated_by TEXT,
    created_at TEXT,
    updated_at TEXT
);
```

---

### 15.4 graph_layout_cache

```sql
CREATE TABLE IF NOT EXISTS graph_layout_cache (
    view_id TEXT PRIMARY KEY,
    dimension TEXT NOT NULL,
    center_node_id TEXT,
    graph_hash TEXT NOT NULL,
    layout_json TEXT NOT NULL,
    generated_at TEXT NOT NULL
);
```

---

### 15.5 graph_views

```sql
CREATE TABLE IF NOT EXISTS graph_views (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    mode TEXT NOT NULL,
    center_node_id TEXT,
    max_nodes INTEGER,
    same_layer_threshold REAL,
    cross_layer_threshold REAL,
    created_at TEXT,
    updated_at TEXT
);
```

---

## 16. 后端模块结构建议

不要继续把 Atlas 逻辑塞进 `core/_common.py`。

建议新增：

```text
core/
  graph/
    __init__.py
    schema.py          # 标准 node / edge 结构
    materialize.py     # 从 items/tasks/memories/decisions/lifelines 生成图谱节点
    clusters.py        # cluster 生成与维护
    candidates.py      # 候选关系生成
    scoring.py         # 关系强度评分
    classify.py        # LLM 关系分类
    filter.py          # Atlas / Local Atlas 过滤规则
    layout.py          # 距离、层级、颜色、坐标 hint
    snapshots.py       # 图谱快照缓存
    export.py          # 输出前端 payload
```

路由：

```text
core/routes/atlas.py
```

原则：

```text
routes 只负责 HTTP
core/graph 负责图谱逻辑
_common.py 不继续膨胀
```

---

## 17. 前端实现建议

### 17.1 不要重写整个 Web App

当前 Web App 已经有捕获、搜索、处理、记忆、任务、决策、模块等能力。

不要为了 Atlas 全面切 React。

第一版建议：

```text
保留 /app
新增 /atlas 独立页面
```

文件：

```text
core/templates/atlas.html
core/static/atlas.css
core/static/atlas.js
```

---

### 17.2 Atlas 主形态必须是 3D，2D 是聚焦后的 Local Atlas

产品形态：

```text
进入 Atlas：默认看到 3D / 准 3D 全局概览图谱
点击 root / lifeline / cluster / entity：进入或展开 2D Local Atlas
退出 focus：回到 3D 全局概览
```

工程顺序可以先验证数据层和过滤规则，但前端验收不能把 2D 当作最终主入口。

要求：

```text
3D 全局负责宏观结构、空间距离、主线分布和认知地图感
2D Local Atlas 负责单点附近关系解释、证据查看和低噪声探索
两者共用 /api/atlas/graph 与 /api/atlas/local 的同一套图谱模型
```

---

### 17.3 3D 技术选择

如果做 3D 第一版，可考虑：

```text
3d-force-graph + ThreeJS/WebGL
```

但注意：

```text
不要全局 force 所有节点
force 只用于 cluster 内部或 focus local graph
```

---

## 18. 实施路线

---

### Phase 1：Atlas 数据层

目标：

```text
/api/atlas/graph 返回干净、可解释、过滤后的 nodes / edges
```

任务：

```text
1. 新建 core/graph/
2. 新建 graph_nodes / graph_edges / graph_clusters / graph_layout_cache 表
3. 从 items / memories / tasks / decisions / lifelines materialize nodes
4. 把现有 associations 转换为 graph_edges
5. 实现 structural / semantic edge 分离
6. 实现过滤规则
7. 输出 /api/atlas/graph JSON
```

验收：

```text
curl /api/atlas/graph 返回合法 JSON
nodes / edges / view 字段存在
每条 semantic edge 有 strength / confidence / relation_type
默认不输出全量 item-item 弱边
```

---

### Phase 2：Cluster 层

目标：

```text
全局 Atlas 默认以 cluster 为主要可视单位
```

任务：

```text
1. 为每个 lifeline 生成 topic clusters
2. 将 item / memory / task / decision 归属到 cluster
3. 提供 graph_clusters 表
4. /api/atlas/graph 默认输出 root + lifeline + cluster + 少量代表 entity
```

验收：

```text
全局图不再直接铺大量原始 item
每个 lifeline 下有清晰 cluster
```

---

### Phase 3：全局 Atlas 3D 主形态

目标：

```text
Atlas 默认入口成为 3D / 准 3D 全局认知地图
```

任务：

```text
1. 用 Three.js 或等价 WebGL 方案渲染全局 Atlas
2. Skeleton 固定在 3D 全局空间中
3. Lifeline 扇区化 / 星区化
4. Cluster 作为主要可视节点
5. 关系强度用距离表达：越强越近
6. 连接线按中心向外使用低饱和红 -> 蓝渐变
7. 默认只显示结构边和极少量高价值语义边
8. 点击节点进入 2D Local Atlas focus 状态
```

验收：

```text
用户一进入 Atlas 就看到 3D 全局图谱
5 秒内能看懂主要 lifeline / cluster 分布
不存在大面积文字重叠
不是 Obsidian 2D 全局图的复刻
```

---

### Phase 4：聚焦后的 Local Atlas 2D

目标：

```text
从 3D 全局聚焦某一点后，进入清爽的 2D 局部关系图谱
```

任务：

```text
1. GET /api/atlas/local?center=...&depth=1
2. 显示中心节点 + 同层高关联节点 + 上下层超高关联节点
3. hover / click 显示 evidence
4. 点击节点切换中心
5. 提供“展开更多”
6. 线条保持 Obsidian 式克制，不使用大量弯曲线
```

验收：

```text
默认节点 <= 40
默认边 <= 80
长文本不铺满画布
focus 关系清晰
2D 只作为局部形态，不替代 3D 主视图
```

---

### Phase 5：AI 自动关系分析与用户反馈

目标：

```text
让 Atlas 自动生成有证据的语义关系，并允许用户修正
```

任务：

```text
1. 每日定时生成候选关系
2. rule score 初筛
3. LLM 只处理高分候选
4. 低置信边进入 pending，不直接展示
5. 用户可确认 / 否定 / 修改关系
6. 用户反馈写入 edge_feedback，用于后续 scoring 调整
```

验收：

```text
AI 生成的边有 evidence
用户能删错边
低质量边不会反复出现
```

---

## 19. 明确不要做的事

### 19.1 不要现在上图数据库

暂不引入：

```text
Neo4j
ArangoDB
NebulaGraph
```

原因：当前不是数据库瓶颈。

---

### 19.2 不要现在重写整个前端

暂不做：

```text
React 全量重构
复杂前端状态管理
全站 UI 重写
```

先新增独立 /atlas 即可。

---

### 19.3 不要全量展示所有关联

Atlas 不是数据库可视化器。

它是认知导航器。

默认展示所有边就是失败。

---

### 19.4 不要继续调当前图的力导向参数来掩盖问题

当前问题不是参数问题，而是模型问题。

不要只做：

```text
调 repulsion
调 link distance
调 font size
调 zoom
```

这些只能缓解表象，不能解决底层混乱。

---

## 20. 给 Coding Agent 的具体任务单

### 任务名

```text
Implement Atlas v1 graph core and reduce global graph clutter
```

### 总目标

重构 Axiom Atlas 的底层图谱模型，使其从“全量 entity + 全量关系的混乱可视化”升级为“Skeleton + Cluster + Leaf 的分层认知地图”。

### 硬性要求

```text
1. 不要推翻现有 Flask / SQLite / 文件系统架构。
2. 不要破坏现有 /app、/cosmos、/lifelines、/associations 接口。
3. 不要把新图谱逻辑塞进 core/_common.py。
4. 新增 core/graph/ 模块承载图谱逻辑。
5. 新增 /api/atlas/graph 作为 Atlas v1 数据出口。
6. 全局 graph 默认不直接展示所有 item。
7. 必须区分 structural edge 与 semantic edge。
8. semantic edge 必须带 relation_type、strength、confidence、evidence。
9. 默认图谱必须做过滤，不允许全量边输出。
10. 添加 smoke test。
```

### 第一阶段具体开发任务

```text
1. 新建 core/graph/schema.py
   - 定义标准 node / edge 字典结构。

2. 新建 core/graph/materialize.py
   - 从现有 lifelines、items、memories、tasks、decisions 生成 graph_nodes。

3. 新建 core/graph/clusters.py
   - 第一版可用简单规则生成 cluster：按 lifeline + 高频关键词 / entity type 聚合。
   - 若暂时无法做智能聚类，至少为每个 lifeline 生成 type-level cluster，例如 notes/tasks/memories/decisions。

4. 新建 core/graph/filter.py
   - 实现默认过滤规则：
     - structural edges 默认显示但极淡。
     - same-layer semantic edge strength >= 0.65。
     - adjacent-layer semantic edge strength >= 0.82。
     - cross-2-layer semantic edge 默认隐藏。
     - causal / tension 且 strength >= 0.88 可跨层显示。
     - 每个节点最多 8 条 visible semantic edges。

5. 新建 core/graph/export.py
   - 输出 /api/atlas/graph 需要的 payload。

6. 新增 core/routes/atlas.py
   - GET /api/atlas/graph
   - 后续预留 GET /api/atlas/local。

7. 数据库 migration
   - graph_nodes
   - graph_edges
   - graph_clusters
   - graph_layout_cache

8. 将现有 associations 转换或映射为 semantic graph_edges。

9. 添加 smoke test
   - 验证 /api/atlas/graph 返回 200。
   - 验证 JSON 包含 schema_version、nodes、edges、view。
   - 验证不会返回明显超量边。
```

### 验收标准

```text
1. /api/atlas/graph 能稳定返回。
2. 全局 nodes 默认以 root + lifeline + cluster 为主。
3. item 不再全量平铺。
4. structural / semantic edge 字段区分明确。
5. semantic edge 有 strength / confidence / evidence。
6. 默认边数量明显下降。
7. 不影响现有 /app、/recent、/search、/cosmos 功能。
8. compileall / node --check / smoke test 通过。
```

---

## 21. 最终判断

当前 Atlas 的问题不是视觉还不够好，而是：

```text
底层模型没有完成从“数据可视化”到“认知地图”的切换。
```

正确方向是：

```text
Root / Lifeline      = 稳定骨架
Cluster / Topic      = 主要可视单位
Entity / Item        = 局部展开内容
Structural Edge      = 归属关系
Semantic Edge        = 有证据的语义关系
Focus Edge           = 当前交互上下文
```

最终目标：

> Axiom Atlas 应该让用户快速看懂自己的知识、任务、记忆、决策和主线之间的结构关系，而不是把所有数据都铺到屏幕上。

---

## 22. 可直接给 Claude 的执行提示

请基于当前 Axiom 仓库执行 Atlas v1 重构。优先完成数据层和过滤层，不要先追求 3D 炫酷效果。当前 Atlas 的核心问题是模型混乱，不是布局参数不足。

但必须注意：数据层完成后，Atlas 的产品主入口应恢复为 3D / 准 3D 全局概览；2D 只作为聚焦某一点后的 Local Atlas 形态，不应把 2D 全局图当成最终主形态。

请按以下优先级推进：

```text
1. 新建 core/graph/，建立 graph core。
2. 新增 graph_nodes / graph_edges / graph_clusters 表。
3. materialize 现有 lifelines、items、memories、tasks、decisions。
4. 把 associations 映射成 semantic edges。
5. 引入 cluster 层，避免全局 Atlas 直接铺 item。
6. 实现 structural / semantic / focus edge 分离。
7. 实现默认过滤规则。
8. 新增 /api/atlas/graph。
9. 添加 smoke test。
10. 暂时不要大改前端，只保证 API 正确、干净、可解释。
```

注意视觉规范：

```text
节点颜色按类型低饱和区分；
连接线可以使用低饱和红蓝渐变；
红蓝渐变只用于连接线，不用于节点；
线条默认低透明度、细线宽；
hover / focus 时才增强；
避免高饱和霓虹感和“杀马特”RGB 风格。
```

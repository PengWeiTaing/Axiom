import type { AtlasMaterial, AtlasRelation, RegionId } from './model';

export const regions: { id: RegionId; title: string; subtitle: string; x: number; y: number }[] = [
  { id: 'practice', title: '让想法走到现实', subtitle: '行动 / 方法 / 阻力', x: 457, y: 89 },
  { id: 'systems', title: '复杂性的秩序', subtitle: '规律 / 边界 / 连接', x: 927, y: 64 },
  { id: 'attention', title: '注意力与选择', subtitle: '专注 / 留白 / 取舍', x: 112, y: 274 },
  { id: 'time', title: '时间里的积累', subtitle: '反馈 / 修正 / 生长', x: 875, y: 565 },
];

export const deltaImage = 'https://assets.science.nasa.gov/dynamicimage/assets/science/esd/climate/2023/12/ImageWall5_1920x1200-384.jpg?crop=faces%2Cfocalpoint&fit=clip&h=1200&w=1920';
export const nasaSource = 'https://science.nasa.gov/resource/lena-delta-russia/';
export const littleSource = 'https://mitsloan.mit.edu/faculty/directory/john-d-c-little';

export const materials: AtlasMaterial[] = [
  { id: 'unfinished', title: '开始得更多，\n为何完成得更少？', region: 'practice', kind: 'question', x: 557, y: 305, width: 290, featured: true, summary: '也许需要改变的，是同时在途的数量。', provenance: '持续中的问题 · 演示', detail: '过去三周，开始的事情不断增加，完成的数量却没有同步增长。是投入不足、任务变难，还是等待和切换变多了？这些解释需要分开检验。' },
  { id: 'week-note', title: '这一周，一直在切换', region: 'practice', kind: 'note', x: 403, y: 187, width: 208, featured: true, summary: '“做了很多，却很少有一件真正结束。”', provenance: '记录片段 · 09.02 · 演示', detail: '周一同时打开三个项目，周三又接入两件新事。周五回看，大部分时间用在重新进入上下文。这是虚构演示记录，不是从你的资料中提取的事实。' },
  { id: 'finish', title: '先完成一个小闭环', region: 'practice', kind: 'hypothesis', x: 696, y: 184, summary: '先缩小进行中的集合，再观察变化。', provenance: '待检验的想法 · 演示', detail: '尝试一个可撤回的小实验：减少同时进行的事项，同时记录完成速度和任务难度。不要只记录“感觉更有效率”。' },
  { id: 'difficulty', title: '也可能是任务变难了', region: 'practice', kind: 'hypothesis', x: 827, y: 276, width: 200, summary: '数量相同，不代表工作量相同。', provenance: '另一种解释 · 演示', detail: '如果本周完成的是更困难的事情，只看完成件数会产生误判。需要用同类任务比较，也要保留难度变化的记录。' },
  { id: 'waiting', title: '工作，还是等待？', region: 'practice', kind: 'question', x: 504, y: 437, summary: '把主动处理时间与等待时间分开。', provenance: '观察问题 · 演示', detail: '从开始到结束的时间，可能包含主动处理、外部等待与暂停。总时长不能直接解释为工作投入。' },
  { id: 'boundary', title: '“完成”的边界', region: 'practice', kind: 'note', x: 668, y: 493, summary: '完成是提交、验收，还是被真正使用？', provenance: '问题边注 · 演示', detail: '同一套统计必须使用一致的入口和出口。如果边界改变，前后数字不能直接比较。' },
  { id: 'little', title: '在途、产出与时间', region: 'systems', kind: 'research', x: 855, y: 412, width: 216, featured: true, summary: 'L = λW', provenance: 'Little 定律 · 外部研究', detail: 'Little 定律联系稳定系统的长期平均在途数量、平均吞吐率与平均停留时间。它是平均量的关系，不单独证明减少并行会造成效率提升。', source: littleSource },
  { id: 'delta', title: '分流，汇合，再分流', region: 'systems', kind: 'image', x: 1110, y: 173, width: 177, featured: true, summary: '勒拿河三角洲 · Landsat 7', provenance: 'NASA / USGS · 影像材料', detail: 'Landsat 7 于 2000 年 7 月 27 日获取的勒拿河三角洲影像。这里仅用于观察网络形态；河流图像不能作为个人工作符合排队模型的证据。', source: nasaSource },
  { id: 'analogy', title: '相似形状，不等于相同机制', region: 'systems', kind: 'question', x: 999, y: 332, width: 247, summary: '跨领域的类比，在哪里失效？', provenance: '方法边界 · 演示', detail: '形态相似可以启发问题，但解释需要对应的变量、机制和检验。不能从河流分支直接推导个人行动策略。' },
  { id: 'feedback', title: '反馈比计划晚到', region: 'systems', kind: 'hypothesis', x: 915, y: 182, width: 168, summary: '延迟是否改变了我们的判断？', provenance: '开放线索 · 演示', detail: '如果结果反馈很慢，就容易把短期没有变化误判为方法无效。需要记录预期反馈时点，而非持续追加投入。' },
  { id: 'scale', title: '换一个观察尺度', region: 'systems', kind: 'question', x: 1115, y: 443, width: 182, summary: '一天的波动，与一个月的变化。', provenance: '观察问题 · 演示', detail: '某些变化只有在更长的观察窗口中才可辨认。延长窗口也可能掩盖近期转折，需要同时保留局部与整体。' },
  { id: 'attention-note', title: '留一段不被打断的时间', region: 'attention', kind: 'note', x: 161, y: 387, width: 240, featured: true, summary: '“不急着打开下一个窗口。”', provenance: '记录片段 · 08.29 · 演示', detail: '预留一段连续时间完成同一件事。这个演示想法关注恢复上下文的成本，不把所有中断都归为坏事。' },
  { id: 'switch', title: '重新进入的成本', region: 'attention', kind: 'hypothesis', x: 324, y: 319, width: 188, summary: '真正打断的，可能是一条思路。', provenance: '待检验的解释 · 演示', detail: '切换后，找回目标、材料和刚才的判断需要时间。它可能解释一部分耗时，但不能代替对任务难度与外部等待的观察。' },
  { id: 'pause', title: '暂停，也是一种选择', region: 'attention', kind: 'note', x: 119, y: 539, width: 194, summary: '未继续的事情，不等于失败。', provenance: '认识片段 · 演示', detail: '有些事情值得暂停，也有些兴趣不需要转化为成果。Atlas 不应把人生只解释为一条不断提高产出的曲线。' },
  { id: 'choice', title: '什么值得继续', region: 'attention', kind: 'question', x: 323, y: 531, width: 169, summary: '选择依据，不只是完成得快。', provenance: '持续中的问题 · 演示', detail: '兴趣、价值、关系和探索都可以成为继续的理由。效率模型只能回答有限的问题，不能替你决定什么值得。' },
  { id: 'quiet', title: '无需优化的片刻', region: 'attention', kind: 'note', x: 224, y: 646, width: 184, summary: '有些时刻，只需要被留下。', provenance: '认识片段 · 演示', detail: '一段没有产出目标的散步、阅读或发呆，也可以在外脑中拥有自己的位置。' },
  { id: 'revisit', title: '回看，比重来更有用', region: 'time', kind: 'hypothesis', x: 821, y: 653, width: 219, featured: true, summary: '让上一次没有完成的思考继续。', provenance: '待检验的想法 · 演示', detail: '保留问题、材料、反例和上一次停下的位置，使下一次探索不必重复解释背景。回访不代表必须沿用原结论。' },
  { id: 'retracted', title: '忙碌 ≠ 有效', region: 'time', kind: 'note', x: 1067, y: 670, width: 165, summary: '“投入越多越好”已被重新考虑。', provenance: '认识修正 · 08.24 · 演示', detail: '演示中曾把投入时长当成进展，后来发现它不足以独立说明结果。修正保留在历史里，不抹去原先为何这样想。' },
  { id: 'experiment', title: '用两周，检验一个想法', region: 'time', kind: 'question', x: 642, y: 613, width: 224, summary: '变化能否在相同条件下重复？', provenance: '下一步观察 · 演示', detail: '预先选定观察量和时间窗口，也记录计划未执行、样本不足与任务变化。两周只是本演示的观察安排，不保证足以得出结论。' },
  { id: 'counter', title: '把不符合的情况留下', region: 'time', kind: 'note', x: 1080, y: 543, width: 224, summary: '反例不是需要藏起来的噪声。', provenance: '方法边注 · 演示', detail: '如果减少并行后，完成速度同样下降，就需要重新检查瓶颈与条件。没有变化和失败结果同样值得保存。' },
];

export const relations: AtlasRelation[] = [
  { id: 'observed', from: 'week-note', to: 'unfinished', kind: 'context', statement: '这段记录提出了问题，但尚不足以解释原因。' },
  { id: 'limit-wip', from: 'unfinished', to: 'little', kind: 'hypothesis', statement: '在产出速度不变等条件下，在途数量可能帮助理解平均周期。' },
  { id: 'other-cause', from: 'unfinished', to: 'difficulty', kind: 'limit', statement: '任务变难也是解释，完成件数不能反映全部工作量。' },
  { id: 'cost', from: 'switch', to: 'unfinished', kind: 'hypothesis', statement: '频繁恢复上下文，可能占用一部分处理时间。' },
  { id: 'action', from: 'finish', to: 'unfinished', kind: 'context', statement: '一个更小的在途集合，是可尝试而非已证实的调整。' },
  { id: 'time-parts', from: 'unfinished', to: 'waiting', kind: 'context', statement: '先区分工作与等待，才能选择要解释的现象。' },
  { id: 'continuous', from: 'attention-note', to: 'switch', kind: 'context', statement: '连续的时间可能减少重新进入上下文的次数。' },
  { id: 'wait-boundary', from: 'waiting', to: 'boundary', kind: 'context', statement: '统计等待需要一致的起点与终点。' },
  { id: 'law-boundary', from: 'boundary', to: 'little', kind: 'limit', statement: '平均在途量和平均周期必须使用同一系统边界。' },
  { id: 'law-test', from: 'little', to: 'experiment', kind: 'hypothesis', statement: '数学关系可以启发观察，迁移到个人工作仍需检验。' },
  { id: 'retain-failure', from: 'experiment', to: 'counter', kind: 'context', statement: '实验应预先保留不符合预期的结果。' },
  { id: 'analogy-limit', from: 'delta', to: 'analogy', kind: 'limit', statement: '这张影像只展示网络形态，不证明工作系统拥有相同机制。' },
  { id: 'analogy-law', from: 'analogy', to: 'little', kind: 'limit', statement: '从类比进入模型之前，需要确认变量与适用条件。' },
  { id: 'delay', from: 'feedback', to: 'finish', kind: 'hypothesis', statement: '更小的闭环可能让反馈更早到来，仍需观察。' },
  { id: 'scale-feedback', from: 'scale', to: 'feedback', kind: 'context', statement: '观察窗口可能改变我们对反馈的理解。' },
  { id: 'pause-choice', from: 'pause', to: 'choice', kind: 'context', statement: '决定继续什么，也包含决定暂停什么。' },
  { id: 'quiet-choice', from: 'quiet', to: 'choice', kind: 'limit', statement: '价值不能被完成速度这一指标穷尽。' },
  { id: 'choice-practice', from: 'choice', to: 'waiting', kind: 'limit', statement: '先确认事情值得继续，再考虑是否需要加快。' },
  { id: 'revisit-test', from: 'revisit', to: 'experiment', kind: 'context', statement: '回访需要保留上一次的条件和结果。' },
  { id: 'revisit-retracted', from: 'revisit', to: 'retracted', kind: 'context', statement: '理解修正的来路，避免重新走回同一个假设。' },
  { id: 'retracted-counter', from: 'retracted', to: 'counter', kind: 'context', statement: '新的反例促使原先的认识被修正。' },
  { id: 'attention-pause', from: 'attention-note', to: 'pause', kind: 'context', statement: '留出时间，也可以通过主动暂停实现。' },
];

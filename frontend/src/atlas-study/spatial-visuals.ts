import type { MaterialKind, RegionId } from './model';

export const spatialNames: Record<string, string> = {
  unfinished: '并行与完成', 'week-note': '一周切换记录', finish: '小闭环',
  difficulty: '任务难度', waiting: '工作与等待', boundary: '完成的边界',
  little: 'Little 定律', delta: '河流分支影像', analogy: '类比的边界',
  feedback: '反馈延迟', scale: '观察尺度', 'attention-note': '连续时间',
  switch: '上下文切换', pause: '主动暂停', choice: '继续的理由',
  quiet: '不必优化的时刻', revisit: '回访与积累', retracted: '忙碌不等于有效',
  experiment: '两周观察', counter: '保留反例',
};
export const spatialKinds: Record<MaterialKind, string> = {
  question: '问题', note: '记录', research: '研究', image: '影像', hypothesis: '待验证的想法',
};
export const spatialTones: Record<RegionId, string> = {
  practice: '#9edbc6', systems: '#a4c5ee', attention: '#e7b29d', time: '#d7cd92',
};

// Depth never changes a name's width, importance or semantic category.
export function depthAppearance(depth: number) {
  const d = Math.max(0, Math.min(1, depth));
  return { pointSize: 7 - d * 2.6, pointOpacity: 1 - d * 0.32,
    labelOpacity: 1 - d * 0.18, edgeOpacity: 0.46 - d * 0.27,
    tier: d < 0.34 ? 'front' : d > 0.66 ? 'back' : 'middle' };
}

export interface LabelBox { x: number; y: number; w: number; h: number; }
export interface AnchoredLabel extends LabelBox { id: string; priority: number; domain?: boolean; }
export function boxesOverlap(a: LabelBox, b: LabelBox, gap = 0) {
  return a.x < b.x + b.w + gap && a.x + a.w + gap > b.x && a.y < b.y + b.h + gap && a.y + a.h + gap > b.y;
}

// Select a readable subset. Never move a name away from its own fixed anchor.
export function selectAnchoredLabels(requests: AnchoredLabel[], bounds: LabelBox, budget: number, previous: ReadonlySet<string> = new Set(), obstacles: LabelBox[] = []) {
  const visible = new Set<string>(), occupied: LabelBox[] = [];
  const ordered = [...requests].sort((a, b) => b.priority - a.priority || Number(previous.has(b.id)) - Number(previous.has(a.id)) || a.id.localeCompare(b.id));
  let used = 0;
  for (const item of ordered) {
    if (!item.domain && used >= budget && item.priority < 100) continue;
    if (![item.x, item.y, item.w, item.h].every(Number.isFinite) || item.w <= 0 || item.h <= 0) continue;
    if (item.x < bounds.x || item.y < bounds.y || item.x + item.w > bounds.x + bounds.w || item.y + item.h > bounds.y + bounds.h) continue;
    // A newly appearing name needs extra room, so tiny camera changes don't toggle it.
    if (obstacles.some(other => boxesOverlap(item, other, 1))) continue;
    if (occupied.some(other => boxesOverlap(item, other, previous.has(item.id) ? 3 : 10))) continue;
    visible.add(item.id); occupied.push(item); if (!item.domain) used++;
  }
  return visible;
}

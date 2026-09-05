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
  practice: '#a1d6bd', systems: '#9bbfdf', attention: '#d4a28b', time: '#c9bc85',
};

// Depth is camera-relative presentation, never relevance or confidence.
export function depthAppearance(depth: number) {
  const d = Math.max(0, Math.min(1, depth));
  return {
    pointSize: 7.5 - d * 3,
    pointOpacity: 1 - d * 0.38,
    ring: d > 0.58,
    labelOpacity: 1 - d * 0.22,
    edgeOpacity: 0.64 - d * 0.36,
    edgeWidth: 1.5 - d * 0.8,
    tier: d < 0.34 ? 'front' : d > 0.66 ? 'back' : 'middle',
  };
}

interface Point { x: number; y: number; }
export interface ProjectedEdge {
  id: string;
  from: Point & { distance: number };
  to: Point & { distance: number };
}

export function findRearCrossings(edges: ProjectedEdge[]) {
  const gaps = new Map(edges.map(edge => [edge.id, [] as Point[]]));
  for (let i = 0; i < edges.length; i++) for (let j = i + 1; j < edges.length; j++) {
    const a = edges[i]!, b = edges[j]!;
    if ([a.from, a.to, b.from, b.to].some(p => p.distance <= 0)) continue;
    const ax = a.to.x - a.from.x, ay = a.to.y - a.from.y;
    const bx = b.to.x - b.from.x, by = b.to.y - b.from.y;
    const denominator = ax * by - ay * bx;
    if (Math.abs(denominator) < 1e-6) continue;
    const dx = b.from.x - a.from.x, dy = b.from.y - a.from.y;
    const t = (dx * by - dy * bx) / denominator, u = (dx * ay - dy * ax) / denominator;
    if (t <= 0.02 || t >= 0.98 || u <= 0.02 || u >= 0.98) continue;
    // Perspective interpolation is reciprocal in view depth, not a mean of endpoints.
    const za = 1 / ((1 - t) / a.from.distance + t / a.to.distance);
    const zb = 1 / ((1 - u) / b.from.distance + u / b.to.distance);
    if (Math.abs(za - zb) < 1e-3) continue;
    gaps.get(za > zb ? a.id : b.id)!.push({ x: a.from.x + t * ax, y: a.from.y + t * ay });
  }
  return gaps;
}

export interface LabelRequest extends Point { id: string; w: number; h: number; priority: number; }
interface Box extends Point { w: number; h: number; }
export function boxesOverlap(a: Box, b: Box, gap = 0) {
  return a.x < b.x + b.w + gap && a.x + a.w + gap > b.x && a.y < b.y + b.h + gap && a.y + a.h + gap > b.y;
}

// Screen labels may move; the force-layout nodes and their links never do.
export function placeSpatialLabels(requests: LabelRequest[], bounds: Box, anchors: Point[] = []) {
  const placed = new Map<string, Box>();
  const placedBoxes: Box[] = [];
  for (const item of [...requests].sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id))) {
    let winner: Box | undefined;
    let bestScore = Infinity;
    const add = (x: number, y: number) => {
      const box = { x: Math.max(bounds.x, Math.min(bounds.x + bounds.w - item.w, x)), y: Math.max(bounds.y, Math.min(bounds.y + bounds.h - item.h, y)), w: item.w, h: item.h };
      const dx = Math.max(box.x - item.x, 0, item.x - box.x - box.w);
      const dy = Math.max(box.y - item.y, 0, item.y - box.y - box.h);
      const score = dx * dx + dy * dy * 1.4;
      if (score > bestScore || (score === bestScore && winner && (box.y > winner.y || (box.y === winner.y && box.x >= winner.x)))) return;
      if (placedBoxes.some(other => boxesOverlap(box, other, 5))) return;
      if (anchors.some(point => boxesOverlap(box, { x: point.x - 8, y: point.y - 8, w: 16, h: 16 }))) return;
      winner = box; bestScore = score;
    };
    for (let radius = 0; radius <= 240; radius += 16) {
      add(item.x - item.w / 2, item.y - 12 - radius - item.h);
      add(item.x - item.w / 2, item.y + 12 + radius);
      for (const side of [-1, 1]) for (const vertical of [0, -1, 1]) {
        add(item.x + side * (12 + radius) - (side < 0 ? item.w : 0), item.y - item.h / 2 + vertical * radius);
      }
    }
    // A bounded full-viewport search keeps every identity available on narrow screens.
    if (bestScore >= 3600) for (let y = bounds.y; y <= bounds.y + bounds.h - item.h; y += 6) {
      for (let x = bounds.x; x <= bounds.x + bounds.w - item.w; x += 8) add(x, y);
    }
    if (winner) { placed.set(item.id, winner); placedBoxes.push(winner); }
  }
  return placed;
}

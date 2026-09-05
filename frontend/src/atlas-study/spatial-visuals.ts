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
export const spatialRegionPatterns: Record<RegionId, string> = {
  practice: 'solid', systems: 'double', attention: 'dash', time: 'dots',
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
export interface RibbonPoint extends Point { depth: number; }

// A strip follows one existing edge; its caps never grow into a region-wide hull.
export function ribbonTriangles(a: RibbonPoint, b: RibbonPoint, width: number): RibbonPoint[] {
  const length = Math.hypot(b.x - a.x, b.y - a.y);
  if (![a.x, a.y, a.depth, b.x, b.y, b.depth, width].every(Number.isFinite) || length < 1 || width <= 0) return [];
  if (a.depth <= -1 || a.depth >= 1 || b.depth <= -1 || b.depth >= 1) return [];
  const radius = Math.min(width / 2, length * 0.24);
  const dx = (b.x - a.x) / length, dy = (b.y - a.y) / length;
  const at = (p: RibbonPoint, along: number, side: number) => ({ x: p.x + dx * along - dy * side, y: p.y + dy * along + dx * side, depth: p.depth });
  const vertices = [at(a, 0, -radius), at(b, 0, -radius), at(a, 0, radius), at(a, 0, radius), at(b, 0, -radius), at(b, 0, radius)];
  for (const [p, start] of [[a, Math.PI / 2], [b, -Math.PI / 2]] as const) {
    for (let i = 0; i < 10; i++) {
      const t = start + i * Math.PI / 10, u = t + Math.PI / 10;
      vertices.push(p, at(p, Math.cos(t) * radius, Math.sin(t) * radius), at(p, Math.cos(u) * radius, Math.sin(u) * radius));
    }
  }
  return vertices;
}

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
export interface LabelBox extends Point { w: number; h: number; }
type Box = LabelBox;
export function followSpatialLabels(boxes: ReadonlyMap<string, Box>, before: ReadonlyMap<string, Point>, after: ReadonlyMap<string, Point>) {
  return new Map([...boxes].map(([id, box]) => {
    const a = before.get(id), b = after.get(id);
    return [id, a && b ? { ...box, x: box.x + b.x - a.x, y: box.y + b.y - a.y } : { ...box }];
  }));
}

// Resolve small collisions locally after projection, without choosing new label slots.
export function separateFollowingLabels(boxes: ReadonlyMap<string, Box>, bounds: Box, anchors: Point[] = []) {
  const result = new Map([...boxes].map(([id, box]) => [id, { ...box }]));
  const entries = [...result.values()];
  const move = (box: Box, dx: number, dy: number) => {
    const x = box.x, y = box.y;
    box.x = Math.max(bounds.x, Math.min(bounds.x + bounds.w - box.w, x + dx));
    box.y = Math.max(bounds.y, Math.min(bounds.y + bounds.h - box.h, y + dy));
    return { x: box.x - x, y: box.y - y };
  };
  const displacement = (a: Box, b: Box, gap: number) => {
    const dx = a.x + a.w / 2 < b.x + b.w / 2 ? b.x - a.x - a.w - gap : b.x + b.w + gap - a.x;
    const dy = a.y + a.h / 2 < b.y + b.h / 2 ? b.y - a.y - a.h - gap : b.y + b.h + gap - a.y;
    return Math.abs(dx) < Math.abs(dy) ? { x: dx, y: 0 } : { x: 0, y: dy };
  };
  for (const box of entries) move(box, 0, 0);
  for (let pass = 0; pass < 24; pass++) {
    let changed = false;
    for (let i = 0; i < entries.length; i++) for (let j = i + 1; j < entries.length; j++) {
      const a = entries[i]!, b = entries[j]!;
      if (!boxesOverlap(a, b, 7)) continue;
      const d = displacement(a, b, 7.1), part = move(a, d.x / 2, d.y / 2);
      const rest = move(b, part.x - d.x, part.y - d.y);
      move(a, d.x + rest.x - part.x, d.y + rest.y - part.y);
      changed = true;
    }
    for (const box of entries) for (const point of anchors) {
      const dot = { x: point.x - 7, y: point.y - 7, w: 14, h: 14 };
      if (!boxesOverlap(box, dot)) continue;
      const d = displacement(box, dot, 0.1); move(box, d.x, d.y); changed = true;
    }
    if (!changed) break;
  }
  return result;
}

export function boxesOverlap(a: Box, b: Box, gap = 0) {
  return a.x < b.x + b.w + gap && a.x + a.w + gap > b.x && a.y < b.y + b.h + gap && a.y + a.h + gap > b.y;
}

export function canInterpolateLabels(from: ReadonlyMap<string, Box>, to: ReadonlyMap<string, Box>) {
  const entries = [...to];
  const interval = (start: number, end: number, low: number, high: number): [number, number] => {
    const delta = end - start;
    if (Math.abs(delta) < 1e-8) return start > low && start < high ? [0, 1] : [1, 0];
    const a = (low - start) / delta, b = (high - start) / delta;
    return [Math.max(0, Math.min(a, b)), Math.min(1, Math.max(a, b))];
  };
  for (let i = 0; i < entries.length; i++) for (let j = i + 1; j < entries.length; j++) {
    const [ai, a1] = entries[i]!, [bi, b1] = entries[j]!;
    const a0 = from.get(ai) || a1, b0 = from.get(bi) || b1;
    const x = interval(a0.x - b0.x, a1.x - b1.x, -Math.max(a0.w, a1.w), Math.max(b0.w, b1.w));
    const y = interval(a0.y - b0.y, a1.y - b1.y, -Math.max(a0.h, a1.h), Math.max(b0.h, b1.h));
    if (Math.max(x[0], y[0]) < Math.min(x[1], y[1]) - 1e-8) return false;
  }
  return true;
}

// Screen labels may move; the force-layout nodes and their links never do.
export function placeSpatialLabels(requests: LabelRequest[], bounds: Box, anchors: Point[] = [], previous: ReadonlyMap<string, Box> = new Map()) {
  const placed = new Map<string, Box>();
  const placedBoxes: Box[] = [];
  const ordered = [...requests].sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id));
  const available = (box: Box, retained = false) => {
    const margin = retained ? 6 : 8;
    return !placedBoxes.some(other => boxesOverlap(box, other, retained ? 3 : 5))
      && !anchors.some(point => boxesOverlap(box, { x: point.x - margin, y: point.y - margin, w: margin * 2, h: margin * 2 }));
  };
  const clamp = (box: Box): Box => ({ ...box, x: Math.max(bounds.x, Math.min(bounds.x + bounds.w - box.w, box.x)), y: Math.max(bounds.y, Math.min(bounds.y + bounds.h - box.h, box.y)) });
  // Reserve valid previous slots before any new label can displace their owners.
  for (const item of ordered) {
    const old = previous.get(item.id);
    if (!old) continue;
    const box = clamp({ ...old, w: item.w, h: item.h });
    const reach = Math.hypot(Math.max(box.x - item.x, 0, item.x - box.x - box.w), Math.max(box.y - item.y, 0, item.y - box.y - box.h));
    if (reach <= 180 && available(box, true)) { placed.set(item.id, box); placedBoxes.push(box); }
  }
  for (const item of ordered) {
    if (placed.has(item.id)) continue;
    const old = previous.get(item.id);
    let winner: Box | undefined;
    let bestScore = Infinity;
    const add = (x: number, y: number) => {
      const box = clamp({ x, y, w: item.w, h: item.h });
      const dx = Math.max(box.x - item.x, 0, item.x - box.x - box.w);
      const dy = Math.max(box.y - item.y, 0, item.y - box.y - box.h);
      const displacement = old ? (box.x - old.x) ** 2 + (box.y - old.y) ** 2 : 0;
      const oldReach = old ? Math.hypot(Math.max(old.x - item.x, 0, item.x - old.x - old.w), Math.max(old.y - item.y, 0, item.y - old.y - old.h)) : 0;
      const score = dx * dx + dy * dy * 1.4 + displacement * (oldReach > 180 ? 0.15 : 4);
      if (score > bestScore || (score === bestScore && winner && (box.y > winner.y || (box.y === winner.y && box.x >= winner.x)))) return;
      if (!available(box)) return;
      winner = box; bestScore = score;
    };
    if (old) for (let radius = 2; radius <= 48; radius += 2) {
      for (const dx of [-1, 0, 1]) for (const dy of [-1, 0, 1]) if (dx || dy) add(old.x + dx * radius, old.y + dy * radius);
    }
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
  // If retained slots fragment a narrow viewport, recover all identities in one reflow.
  if (previous.size && placed.size < requests.length) return placeSpatialLabels(requests, bounds, anchors);
  return placed;
}

export type RegionId = 'practice' | 'systems' | 'attention' | 'time';
export type MaterialKind = 'question' | 'note' | 'research' | 'image' | 'hypothesis';
export interface AtlasMaterial {
  id: string;
  title: string;
  region: RegionId;
  kind: MaterialKind;
  x: number;
  y: number;
  width?: number;
  featured?: boolean;
  summary: string;
  provenance: string;
  detail: string;
  source?: string;
}
export interface AtlasRelation {
  id: string;
  from: string;
  to: string;
  kind: 'context' | 'hypothesis' | 'limit';
  statement: string;
}

export function neighborhood(id: string, relations: AtlasRelation[]) {
  const first = new Set<string>();
  for (const edge of relations) {
    if (edge.from === id) first.add(edge.to);
    if (edge.to === id) first.add(edge.from);
  }
  const second = new Set<string>();
  for (const edge of relations) {
    if (first.has(edge.from)) second.add(edge.to);
    if (first.has(edge.to)) second.add(edge.from);
  }
  second.delete(id);
  for (const item of first) second.delete(item);
  return { first, second };
}

export function searchMaterials(query: string, materials: AtlasMaterial[]) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return materials.filter(item => item.featured);
  return materials.filter(item => {
    const content = `${item.title} ${item.summary} ${item.provenance}`.toLocaleLowerCase();
    return terms.every(term => content.includes(term));
  });
}

// Little's law compares long-run averages within the same stable system boundary.
export function averageCycleDays(inProgress: number, throughputPerDay: number) {
  if (!Number.isFinite(inProgress) || !Number.isFinite(throughputPerDay) || inProgress < 0 || throughputPerDay <= 0) {
    throw new RangeError('A finite nonnegative inventory and positive throughput are required.');
  }
  return inProgress / throughputPerDay;
}

export function parseStudyLocation(search: string, materials: AtlasMaterial[]) {
  const params = new URLSearchParams(search);
  const selected = params.get('focus');
  const focus = materials.some(item => item.id === selected) ? selected : null;
  return { focus, board: focus === 'unfinished' && params.get('view') === 'board' };
}

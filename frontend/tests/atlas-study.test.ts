import { test } from 'node:test';
import assert from 'node:assert/strict';
import { averageCycleDays, neighborhood, parseStudyLocation, searchMaterials } from '../src/atlas-study/model.ts';
import { materials, regions, relations } from '../src/atlas-study/data.ts';
import { buildSpatialLayout } from '../src/atlas-study/spatial-layout.ts';
import { boxesOverlap, depthAppearance, selectAnchoredLabels, spatialKinds, spatialNames, spatialTones } from '../src/atlas-study/spatial-visuals.ts';

test('every real dot retains its readable identity and content kind', () => {
  assert.equal(new Set(Object.values(spatialNames)).size, materials.length);
  for (const item of materials) {
    assert.ok(spatialNames[item.id] && spatialNames[item.id]!.length <= 12);
    assert.ok(spatialKinds[item.kind] && spatialTones[item.region]);
  }
  assert.equal(new Set(Object.values(spatialTones)).size, regions.length);
});

test('label selection never changes a position and prefers readable landmarks', () => {
  const bounds = { x: 0, y: 0, w: 500, h: 300 };
  const requests = [
    { id: 'domain', x: 10, y: 10, w: 120, h: 40, priority: 200, domain: true },
    { id: 'a', x: 50, y: 100, w: 90, h: 26, priority: 30 },
    { id: 'b', x: 60, y: 105, w: 90, h: 26, priority: 10 },
    { id: 'c', x: 220, y: 150, w: 90, h: 26, priority: 10 },
    { id: 'outside', x: 480, y: 200, w: 90, h: 26, priority: 30 },
  ];
  const original = JSON.stringify(requests);
  const visible = selectAnchoredLabels(requests, bounds, 2);
  assert.deepEqual([...visible], ['domain', 'a', 'c']);
  assert.deepEqual(visible, selectAnchoredLabels([...requests].reverse(), bounds, 2));
  assert.equal(JSON.stringify(requests), original);
  const boxes = requests.filter(item => visible.has(item.id));
  assert.ok(boxes.every((a, i) => boxes.every((b, j) => i === j || !boxesOverlap(a, b))));
  assert.ok(selectAnchoredLabels(requests, bounds, 0).has('domain'), 'Topic names are outside the detail budget');
});

test('label hysteresis tolerates projection noise without changing sides', () => {
  const bounds = { x: 0, y: 0, w: 500, h: 300 };
  const a = { id: 'a', x: 10, y: 10, w: 80, h: 26, priority: 30 };
  const b = { id: 'b', x: 103, y: 10, w: 80, h: 26, priority: 10 };
  const previous = selectAnchoredLabels([a, b], bounds, 2);
  assert.equal(previous.size, 2);
  for (const dx of [0.2, -0.2, -5, 3]) {
    assert.deepEqual(selectAnchoredLabels([a, { ...b, x: b.x + dx }], bounds, 2, previous), previous);
  }
  assert.equal(selectAnchoredLabels([a, { ...b, x: 95 }], bounds, 2).size, 1);
  assert.equal(selectAnchoredLabels([a, { ...b, x: 95 }], bounds, 2, previous).size, 2);
});

test('adjacent dot does not reject its own label but other dots cannot be covered', () => {
  const request = { id: 'a', x: 112, y: 87, w: 80, h: 26, priority: 30 };
  const bounds = { x: 0, y: 0, w: 300, h: 300 };
  assert.equal(selectAnchoredLabels([request], bounds, 1, new Set(), [{ x: 94, y: 94, w: 12, h: 12 }]).size, 1);
  assert.equal(selectAnchoredLabels([request], bounds, 1, new Set(), [{ x: 130, y: 94, w: 12, h: 12 }]).size, 0);
  assert.equal(selectAnchoredLabels([{ ...request, x: NaN }], bounds, 1).size, 0);
});

test('depth cues are continuous and keep distant material names readable', () => {
  const near = depthAppearance(0), middle = depthAppearance(0.5), far = depthAppearance(1);
  assert.ok(near.pointSize > middle.pointSize && middle.pointSize > far.pointSize);
  assert.ok(near.edgeOpacity > middle.edgeOpacity && middle.edgeOpacity > far.edgeOpacity);
  assert.ok(far.labelOpacity >= 0.75 && near.pointSize <= 8);
  assert.deepEqual(depthAppearance(-3), near); assert.deepEqual(depthAppearance(3), far);
});

test('curated sample has unique identities, valid relations and traceable research', () => {
  const ids = new Set(materials.map(item => item.id));
  assert.equal(ids.size, 20); assert.equal(ids.size, materials.length);
  assert.equal(new Set(relations.map(edge => edge.id)).size, relations.length);
  for (const item of materials) {
    assert.ok(regions.some(region => region.id === item.region));
    assert.ok(item.title && item.summary && item.provenance && item.detail);
    assert.ok(Number.isFinite(item.x) && Number.isFinite(item.y));
    if (item.kind === 'research' || item.kind === 'image') assert.equal(new URL(item.source!).protocol, 'https:');
  }
  for (const edge of relations) { assert.ok(ids.has(edge.from) && ids.has(edge.to)); assert.notEqual(edge.from, edge.to); assert.ok(edge.statement); }
  assert.equal(relations.find(edge => edge.id === 'limit-wip')?.kind, 'hypothesis');
});

test('first and second degree context remain distinct', () => {
  const edge = (from: string, to: string) => ({ id: from + to, from, to, kind: 'context' as const, statement: '' });
  const result = neighborhood('a', [edge('a', 'b'), edge('b', 'c'), edge('c', 'a'), edge('c', 'd')]);
  assert.deepEqual([...result.first].sort(), ['b', 'c']); assert.deepEqual([...result.second], ['d']);
});

test('average cycle calculation is finite and uses consistent units', () => {
  assert.equal(averageCycleDays(6, 2), 3); assert.equal(averageCycleDays(6, 4), 1.5); assert.equal(averageCycleDays(0, 2), 0);
  for (const [count, rate] of [[1, 0], [-1, 2], [Infinity, 2], [2, NaN]]) assert.throws(() => averageCycleDays(count!, rate!), RangeError);
});

test('search matches Chinese content and rejects unknown deep links', () => {
  const items = [{ id: 'unfinished', title: '等待', summary: '平均时间', provenance: 'MIT', featured: true }] as Parameters<typeof searchMaterials>[1];
  assert.equal(searchMaterials('等待 MIT', items).length, 1); assert.equal(searchMaterials('不存在', items).length, 0); assert.equal(searchMaterials('', items).length, 1);
  assert.deepEqual(parseStudyLocation('?focus=unfinished&view=board', items), { focus: 'unfinished', board: true, overview: false, region: null });
  assert.deepEqual(parseStudyLocation('?focus=private-data&view=board', items), { focus: null, board: false, overview: true, region: null });
  assert.deepEqual(parseStudyLocation('?view=map&region=systems', items), { focus: null, board: false, overview: false, region: 'systems' });
  assert.equal(parseStudyLocation('', items).overview, true); assert.equal(parseStudyLocation('?region=private-data', items).region, null);
});

test('topic-constrained layout is deterministic, relation-driven and truly three-dimensional', () => {
  const original = JSON.stringify({ materials, relations });
  const layout = buildSpatialLayout(materials, relations);
  assert.equal(layout.length, materials.length);
  assert.deepEqual(layout, buildSpatialLayout(materials, relations));
  assert.deepEqual(layout, buildSpatialLayout(materials.map(item => ({ ...item, x: 999, y: -999 })).reverse(), relations));
  assert.notDeepEqual(layout, buildSpatialLayout(materials, relations.slice(1)));
  const edges = new Set(relations.map(edge => [edge.from, edge.to].sort().join(':')));
  const distances = { linked: [] as number[], unlinked: [] as number[] };
  for (let i = 0; i < layout.length; i++) for (let j = i + 1; j < layout.length; j++) {
    const a = layout[i]!, b = layout[j]!;
    distances[edges.has([a.id, b.id].sort().join(':')) ? 'linked' : 'unlinked'].push(Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z));
  }
  const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
  assert.ok(mean(distances.linked) < mean(distances.unlinked) * 0.65);
  const axes = ['x', 'y', 'z'] as const;
  const cov = axes.map(a => axes.map(b => layout.reduce((sum, node) => sum + node[a] * node[b], 0) / layout.length));
  const [[a, b, c], [, d, e], [, , f]] = cov as [[number, number, number], [number, number, number], [number, number, number]];
  const determinant = a * d * f + 2 * b * c * e - a * e * e - d * c * c - f * b * b;
  assert.ok(determinant / (a + d + f) ** 3 > 0.008, 'Layout must not collapse into a plane');
  assert.equal(JSON.stringify({ materials, relations }), original);
  assert.ok(layout.every(node => axes.every(axis => Number.isFinite(node[axis]))));
  assert.deepEqual(buildSpatialLayout([], []), []);
  assert.throws(() => buildSpatialLayout(materials, [{ ...relations[0]!, to: 'missing' }]));
  assert.throws(() => buildSpatialLayout([...materials, materials[0]!], relations));
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { averageCycleDays, neighborhood, parseStudyLocation, searchMaterials } from '../src/atlas-study/model.ts';
import { materials, regions, relations } from '../src/atlas-study/data.ts';
import { buildSpatialLayout } from '../src/atlas-study/spatial-layout.ts';
import { boxesOverlap, canInterpolateLabels, depthAppearance, findRearCrossings, followSpatialLabels, placeSpatialLabels, ribbonTriangles, separateFollowingLabels, spatialKinds, spatialNames, spatialRegionPatterns, spatialTones } from '../src/atlas-study/spatial-visuals.ts';

test('every spatial dot has a short readable identity without losing its material kind', () => {
  assert.equal(new Set(Object.values(spatialNames)).size, materials.length);
  for (const item of materials) {
    assert.ok(spatialNames[item.id] && spatialNames[item.id]!.length <= 12);
    assert.ok(spatialKinds[item.kind]);
    assert.ok(spatialTones[item.region]);
  }
  assert.equal(new Set(Object.values(spatialTones)).size, regions.length);
  assert.equal(new Set(Object.values(spatialRegionPatterns)).size, regions.length);
});

test('nearby label history absorbs tiny projection noise without side switching', () => {
  const requests = Array.from({ length: 6 }, (_, i) => ({ id: String(i), x: 100 + (i % 2) * 110, y: 220 + Math.floor(i / 2) * 110, w: 96, h: 26, priority: i % 5 }));
  const bounds = { x: 18, y: 94, w: 284, h: 584 };
  const original = placeSpatialLabels(requests, bounds, requests);
  const stored = JSON.stringify([...original]);
  for (const epsilon of [1e-7, -1e-7, 0.2, -0.2]) {
    const perturbed = requests.map(item => ({ ...item, x: item.x + epsilon, y: item.y - epsilon }));
    const result = placeSpatialLabels(perturbed, bounds, perturbed, original);
    for (const [id, box] of original) assert.deepEqual(result.get(id), box);
  }
  assert.equal(JSON.stringify([...original]), stored, 'Previous frame must not be mutated');
});

test('names follow their own projected nodes without changing their local offset', () => {
  const before = new Map([['a', { x: 10, y: 20 }], ['b', { x: 220, y: 70 }]]);
  const after = new Map([['a', { x: 40, y: 9 }], ['b', { x: 205, y: 112 }]]);
  const boxes = new Map([['a', { x: 24, y: 7, w: 90, h: 26 }], ['b', { x: 114, y: 57, w: 90, h: 26 }]]);
  const snapshot = JSON.stringify([...boxes]);
  const moved = followSpatialLabels(boxes, before, after);
  assert.deepEqual(moved.get('a'), { x: 54, y: -4, w: 90, h: 26 });
  assert.deepEqual(moved.get('b'), { x: 99, y: 99, w: 90, h: 26 });
  assert.deepEqual(followSpatialLabels(moved, after, before), boxes);
  assert.equal(JSON.stringify([...boxes]), snapshot);
});

test('following labels resolve local collisions without jumping to distant slots', () => {
  const bounds = { x: 0, y: 0, w: 480, h: 320 };
  const boxes = new Map([['a', { x: 80, y: 80, w: 100, h: 26 }], ['b', { x: 120, y: 103, w: 100, h: 26 }], ['c', { x: 250, y: 205, w: 100, h: 26 }]]);
  const snapshot = JSON.stringify([...boxes]);
  const result = separateFollowingLabels(boxes, bounds, [{ x: 300, y: 200 }]);
  for (const [id, box] of result) {
    assert.ok([...result].every(([other, value]) => id === other || !boxesOverlap(box, value)));
    assert.ok(Math.hypot(box.x - boxes.get(id)!.x, box.y - boxes.get(id)!.y) < 8);
  }
  assert.deepEqual(separateFollowingLabels(result, bounds, [{ x: 300, y: 200 }]), result, 'A settled layout must not oscillate');
  assert.equal(JSON.stringify([...boxes]), snapshot);
  const nearEdge = new Map([['a', { x: -3, y: 270, w: 100, h: 26 }], ['b', { x: 25, y: 294, w: 100, h: 26 }]]);
  const clamped = separateFollowingLabels(nearEdge, bounds);
  assert.ok([...clamped.values()].every(box => box.x >= 0 && box.y >= 0 && box.x + box.w <= 480 && box.y + box.h <= 320));
  assert.equal(boxesOverlap(clamped.get('a')!, clamped.get('b')!), false);
});

test('ribbon faces stay narrow and inherit actual endpoint depth', () => {
  const a = { x: 20, y: 40, depth: 0.2 }, b = { x: 220, y: 40, depth: 0.8 };
  const vertices = ribbonTriangles(a, b, 36);
  assert.equal(vertices.length, 66);
  assert.ok(vertices.every(p => p.x >= 2 && p.x <= 238 && p.y >= 22 && p.y <= 58));
  assert.ok(vertices.every(p => p.depth === a.depth || p.depth === b.depth));
  const short = ribbonTriangles(a, { ...b, x: 30 }, 36);
  assert.ok(short.every(p => Math.abs(p.y - 40) <= 2.4 + 1e-6), 'A foreshortened edge must not become a large disk');
  for (const other of [a, { ...b, depth: 1.1 }, { ...b, x: NaN }]) assert.deepEqual(ribbonTriangles(a, other, 36), []);
  assert.deepEqual(ribbonTriangles(a, b, 0), []);
  const diagonal = ribbonTriangles(a, { ...b, y: 140 }, 36);
  assert.ok(diagonal.every(p => Math.abs((p.x - 20) * -100 + (p.y - 40) * 200) / Math.hypot(200, 100) <= 18 + 1e-6));
});

test('label transitions reject paths crossing through another identity', () => {
  const from = new Map([['a', { x: 10, y: 10, w: 80, h: 26 }], ['b', { x: 120, y: 10, w: 80, h: 26 }]]);
  const swapped = new Map([['a', from.get('b')!], ['b', from.get('a')!]]);
  assert.equal(canInterpolateLabels(from, swapped), false);
  const translated = new Map([...from].map(([id, box]) => [id, { ...box, x: box.x + 20, y: box.y + 10 }]));
  assert.equal(canInterpolateLabels(from, translated), true);
  assert.equal(canInterpolateLabels(from, from), true);
});

test('depth cues change monotonically without making background identities unreadable', () => {
  const near = depthAppearance(0), middle = depthAppearance(0.5), far = depthAppearance(1);
  assert.ok(near.pointSize > middle.pointSize && middle.pointSize > far.pointSize);
  assert.ok(near.edgeOpacity > middle.edgeOpacity && middle.edgeOpacity > far.edgeOpacity);
  assert.ok(near.edgeWidth > far.edgeWidth);
  assert.equal(near.ring, false); assert.equal(far.ring, true);
  assert.ok(far.labelOpacity >= 0.75);
  assert.deepEqual(depthAppearance(-3), near); assert.deepEqual(depthAppearance(3), far);
});

test('crossings reveal actual perspective depth, not endpoint-average sorting', () => {
  const a = { id: 'a', from: { x: 0, y: 5, distance: 2 }, to: { x: 10, y: 5, distance: 10 } };
  const b = { id: 'b', from: { x: 5, y: 0, distance: 4 }, to: { x: 5, y: 10, distance: 4 } };
  const gaps = findRearCrossings([a, b]);
  assert.deepEqual(gaps.get('a'), []);
  assert.deepEqual(gaps.get('b'), [{ x: 5, y: 5 }]);
  assert.deepEqual(findRearCrossings([b, a]), new Map([['b', [{ x: 5, y: 5 }]], ['a', []]]));
  const parallel = { ...a, id: 'parallel', from: { ...a.from, y: 6 }, to: { ...a.to, y: 6 } };
  assert.ok([...findRearCrossings([a, parallel]).values()].every(points => !points.length));
  const sharedEndpoint = { ...b, from: { ...b.from, x: 0 }, to: { ...b.to, x: 0 } };
  assert.ok([...findRearCrossings([a, sharedEndpoint]).values()].every(points => !points.length));
});

test('dense screen labels stay inside the frame and do not cover each other or dots', () => {
  const requests = Array.from({ length: 20 }, (_, i) => ({ id: String(i), x: 155 + (i % 3) * 12, y: 340 + Math.floor(i / 3) * 16, w: 96, h: 26, priority: i % 5 }));
  const bounds = { x: 18, y: 94, w: 284, h: 584 };
  const layout = placeSpatialLabels(requests, bounds, requests);
  assert.equal(layout.size, requests.length);
  assert.deepEqual(layout, placeSpatialLabels([...requests].reverse(), bounds, requests));
  for (const [id, box] of layout) {
    assert.ok(box.x >= bounds.x && box.y >= bounds.y && box.x + box.w <= bounds.x + bounds.w && box.y + box.h <= bounds.y + bounds.h);
    assert.ok([...layout].every(([other, value]) => id === other || !boxesOverlap(box, value)));
    assert.ok(requests.every(point => !boxesOverlap(box, { x: point.x - 8, y: point.y - 8, w: 16, h: 16 })));
  }
});

test('curated sample has unique identities, valid relations and traceable research', () => {
  const ids = new Set(materials.map(item => item.id));
  assert.equal(ids.size, 20);
  assert.equal(ids.size, materials.length);
  assert.equal(new Set(relations.map(edge => edge.id)).size, relations.length);
  for (const item of materials) {
    assert.ok(regions.some(region => region.id === item.region));
    assert.ok(item.title && item.summary && item.provenance && item.detail);
    assert.ok(Number.isFinite(item.x) && Number.isFinite(item.y));
    if (item.kind === 'research' || item.kind === 'image') assert.equal(new URL(item.source!).protocol, 'https:');
  }
  for (const edge of relations) {
    assert.ok(ids.has(edge.from) && ids.has(edge.to));
    assert.notEqual(edge.from, edge.to);
    assert.ok(edge.statement);
  }
  assert.equal(relations.find(edge => edge.id === 'limit-wip')?.kind, 'hypothesis');
});

test('first and second degree context remain distinct', () => {
  const edge = (from: string, to: string) => ({ id: from + to, from, to, kind: 'context' as const, statement: '' });
  const result = neighborhood('a', [edge('a', 'b'), edge('b', 'c'), edge('c', 'a'), edge('c', 'd')]);
  assert.deepEqual([...result.first].sort(), ['b', 'c']);
  assert.deepEqual([...result.second], ['d']);
});

test('average cycle calculation is finite and uses consistent units', () => {
  assert.equal(averageCycleDays(6, 2), 3);
  assert.equal(averageCycleDays(6, 4), 1.5);
  assert.equal(averageCycleDays(0, 2), 0);
  for (const [count, rate] of [[1, 0], [-1, 2], [Infinity, 2], [2, NaN]]) {
    assert.throws(() => averageCycleDays(count!, rate!), RangeError);
  }
});

test('search matches Chinese content and rejects unknown deep links', () => {
  const items = [{ id: 'unfinished', title: '等待', summary: '平均时间', provenance: 'MIT', featured: true }] as Parameters<typeof searchMaterials>[1];
  assert.equal(searchMaterials('等待 MIT', items).length, 1);
  assert.equal(searchMaterials('不存在', items).length, 0);
  assert.equal(searchMaterials('', items).length, 1);
  assert.deepEqual(parseStudyLocation('?focus=unfinished&view=board', items), { focus: 'unfinished', board: true, overview: false, region: null });
  assert.deepEqual(parseStudyLocation('?focus=private-data&view=board', items), { focus: null, board: false, overview: true, region: null });
  assert.deepEqual(parseStudyLocation('?view=map&region=systems', items), { focus: null, board: false, overview: false, region: 'systems' });
  assert.equal(parseStudyLocation('', items).overview, true);
  assert.equal(parseStudyLocation('?region=private-data', items).region, null);
});

test('spatial layout is deterministic, relation-driven and genuinely three-dimensional', () => {
  const original = JSON.stringify({ materials, relations });
  const layout = buildSpatialLayout(materials, relations);
  assert.equal(layout.length, materials.length);
  assert.deepEqual(layout, buildSpatialLayout(materials, relations));
  assert.deepEqual(layout, buildSpatialLayout(materials.map(item => ({ ...item, x: 999, y: -999 })).reverse(), relations));
  const changed = buildSpatialLayout(materials, relations.slice(1));
  assert.notDeepEqual(layout.map(node => [node.x, node.y, node.z]), changed.map(node => [node.x, node.y, node.z]));
  const edges = new Set(relations.map(edge => [edge.from, edge.to].sort().join(':')));
  const distances = { linked: [] as number[], unlinked: [] as number[] };
  for (let i = 0; i < layout.length; i++) for (let j = i + 1; j < layout.length; j++) {
    const a = layout[i]!, b = layout[j]!;
    distances[edges.has([a.id, b.id].sort().join(':')) ? 'linked' : 'unlinked'].push(Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z));
  }
  const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
  assert.ok(mean(distances.linked) < mean(distances.unlinked) * 0.65);
  assert.equal(JSON.stringify({ materials, relations }), original);
  const axes = ['x', 'y', 'z'] as const;
  const cov = axes.map(a => axes.map(b => layout.reduce((sum, node) => sum + node[a] * node[b], 0) / layout.length));
  const [[a, b, c], [, d, e], [, , f]] = cov as [[number, number, number], [number, number, number], [number, number, number]];
  const determinant = a * d * f + 2 * b * c * e - a * e * e - d * c * c - f * b * b;
  assert.ok(determinant / (a + d + f) ** 3 > 0.008, 'Layout must not collapse into a plane');
  for (const node of layout) assert.ok(axes.every(axis => Number.isFinite(node[axis])));
  assert.deepEqual(buildSpatialLayout([], []), []);
  assert.throws(() => buildSpatialLayout(materials, [{ ...relations[0]!, to: 'missing' }]));
});

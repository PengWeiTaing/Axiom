import { test } from 'node:test';
import assert from 'node:assert/strict';
import { averageCycleDays, neighborhood, parseStudyLocation, searchMaterials } from '../src/atlas-study/model.ts';
import { materials, regions, relations } from '../src/atlas-study/data.ts';

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
  assert.deepEqual(parseStudyLocation('?focus=unfinished&view=board', items), { focus: 'unfinished', board: true });
  assert.deepEqual(parseStudyLocation('?focus=private-data&view=board', items), { focus: null, board: false });
});

import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY, forceZ } from 'd3-force-3d';
import type { AtlasMaterial, AtlasRelation, RegionId } from './model';

export interface SpatialNode { id: string; region: RegionId; x: number; y: number; z: number; degree: number; }
interface SeedNode { id: string; region: RegionId; x?: number; y?: number; z?: number; degree: number; }

// Art-directed topic anchors, not measured knowledge coordinates or AI-discovered clusters.
const anchors: Record<RegionId, [number, number, number]> = {
  practice: [-105, 100, 65], systems: [150, 65, -80],
  attention: [-155, -90, -65], time: [80, -130, 95],
};

export function buildSpatialLayout(items: AtlasMaterial[], relations: AtlasRelation[]): SpatialNode[] {
  if (!items.length) return [];
  const ids = new Set(items.map(item => item.id));
  if (ids.size !== items.length) throw new Error('Spatial materials must have unique identities');
  const links = relations.map(edge => {
    if (!ids.has(edge.from) || !ids.has(edge.to) || edge.from === edge.to) throw new Error('Invalid spatial relationship');
    return { source: edge.from, target: edge.to, local: items.find(item => item.id === edge.from)!.region === items.find(item => item.id === edge.to)!.region };
  });
  const nodes: SeedNode[] = [...items].sort((a, b) => a.id.localeCompare(b.id)).map((item, index) => {
    const [x, y, z] = anchors[item.region];
    return { id: item.id, region: item.region, degree: relations.filter(edge => edge.from === item.id || edge.to === item.id).length,
      x: x + Math.cos(index * 2.4) * 36, y: y + Math.sin(index * 2.4) * 36, z: z + Math.sin(index * 1.7) * 45 };
  });
  // Topic proximity supplies composition; real links still shape each group and its bridges.
  // A relation kind is not a confidence score and never changes the spring strength.
  const simulation = forceSimulation(nodes, 3).stop()
    .force('link', forceLink<SeedNode, typeof links[number]>(links).id(node => node.id).distance(edge => edge.local ? 64 : 185).strength(edge => edge.local ? 0.5 : 0.14))
    .force('charge', forceManyBody().strength(-120))
    .force('collision', forceCollide(18))
    .force('topic-x', forceX<SeedNode>(node => anchors[node.region][0]).strength(0.16))
    .force('topic-y', forceY<SeedNode>(node => anchors[node.region][1]).strength(0.16))
    .force('topic-z', forceZ<SeedNode>(node => anchors[node.region][2]).strength(0.12))
    .force('center', forceCenter(0, 0, 0));
  simulation.tick(360);
  const radius = Math.max(1, ...nodes.map(node => Math.hypot(node.x!, node.y!, node.z!)));
  return nodes.map(node => ({ id: node.id, region: node.region, degree: node.degree, x: node.x! / radius * 230, y: node.y! / radius * 230, z: node.z! / radius * 230 }));
}

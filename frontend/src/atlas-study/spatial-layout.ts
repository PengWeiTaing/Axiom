import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation } from 'd3-force-3d';
import type { AtlasMaterial, AtlasRelation, RegionId } from './model';

export interface SpatialNode { id: string; region: RegionId; x: number; y: number; z: number; degree: number; }
interface SeedNode { id: string; region: RegionId; x?: number; y?: number; z?: number; degree: number; }

export function buildSpatialLayout(items: AtlasMaterial[], relations: AtlasRelation[]): SpatialNode[] {
  if (!items.length) return [];
  const ids = new Set(items.map(item => item.id));
  if (ids.size !== items.length) throw new Error('Spatial materials must have unique identities');
  const links = relations.map(edge => {
    if (!ids.has(edge.from) || !ids.has(edge.to) || edge.from === edge.to) throw new Error('Invalid spatial relationship');
    return { source: edge.from, target: edge.to };
  });
  const nodes: SeedNode[] = [...items].sort((a, b) => a.id.localeCompare(b.id)).map(item => ({
    id: item.id, region: item.region, degree: relations.filter(edge => edge.from === item.id || edge.to === item.id).length,
  }));
  // Use only adjacency, never the authored 2D coordinates or topic centroids, as forces.
  // Relation kind is not a confidence score; all documented connections get equal pull.
  const simulation = forceSimulation(nodes, 3).stop()
    .force('link', forceLink<SeedNode, typeof links[number]>(links).id(node => node.id).distance(66).strength(0.55))
    .force('charge', forceManyBody().strength(-180))
    .force('collision', forceCollide(16))
    .force('center', forceCenter(0, 0, 0));
  simulation.tick(360);
  const radius = Math.max(1, ...nodes.map(node => Math.hypot(node.x!, node.y!, node.z!)));
  return nodes.map(node => ({ id: node.id, region: node.region, degree: node.degree, x: node.x! / radius * 230, y: node.y! / radius * 230, z: node.z! / radius * 230 }));
}

import * as THREE from 'three';
import type { SpatialNode } from './spatial-layout';

// One open sheet per topic, sized from its members; never one face per relationship.
export function buildRegionSurface(members: SpatialNode[]) {
  if (!members.length) throw new Error('A topic sheet needs members');
  const center = new THREE.Vector3();
  const points = members.map(node => new THREE.Vector3(node.x, node.y, node.z));
  points.forEach(point => center.addScaledVector(point, 1 / points.length));
  let direction = new THREE.Vector3(1, 0, 0), longest = 0;
  for (const a of points) for (const b of points) {
    const distance = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
    if (distance > longest) { longest = distance; direction.subVectors(b, a); }
  }
  if (direction.x < 0) direction.negate();
  direction.z *= 0.18; direction.normalize();
  const across = new THREE.Vector3(-direction.y, direction.x, 0).normalize();
  const normal = new THREE.Vector3().crossVectors(direction, across).normalize();
  const offsets = points.map(point => point.clone().sub(center));
  const length = Math.max(48, ...offsets.map(point => Math.abs(point.dot(direction)))) + 22;
  const breadth = Math.max(24, ...offsets.map(point => Math.abs(point.dot(across)))) * 0.68 + 12;
  center.z = Math.min(...points.map(point => point.z)) - 14;
  const positions: number[] = [], indices: number[] = [], perimeter: THREE.Vector3[] = [];
  const at = (t: number, side: number) => {
    const envelope = 0.22 + Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.8) * 0.78;
    return center.clone().addScaledVector(direction, (t * 2 - 1) * length)
      .addScaledVector(across, side * breadth * envelope * (0.7 + t * 0.3) + Math.sin(t * Math.PI) * 8)
      .addScaledVector(normal, Math.sin(t * Math.PI) * (side * side * 16 - 8));
  };
  const segments = 40, rows = 6;
  for (let i = 0; i <= segments; i++) {
    for (let j = 0; j <= rows; j++) {
      const point = at(i / segments, j / rows * 2 - 1); positions.push(point.x, point.y, point.z);
      if (i < segments && j < rows) {
        const a = i * (rows + 1) + j, b = a + rows + 1;
        indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
    }
    perimeter.push(at(i / segments, -1));
  }
  for (let i = segments; i >= 0; i--) perimeter.push(at(i / segments, 1));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return { geometry, outline: new THREE.BufferGeometry().setFromPoints(perimeter) };
}

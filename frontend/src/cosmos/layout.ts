/** 球面布局算法 — 角度扇区分配 */
import * as THREE from 'three'
import type { CosmosData } from './types'

export interface LayoutNode {
  id: string
  name: string
  layer: number // 0=root, 1=R1 lifeline, 2=R2 lifeline, 3=R3 entity
  position: THREE.Vector3
  parentId?: string
  kind?: string // entity kind for R3 leaves
}

// Shell radii
export const RADII = { R0: 0.2, R1: 1.0, R2: 1.8, R3: 2.5 }

export function computeLayout(data: CosmosData): LayoutNode[] {
  const nodes: LayoutNode[] = []

  // R0: root
  nodes.push({ id: data.root.id, name: data.root.name, layer: 0, position: new THREE.Vector3(0, 0, RADII.R0) })

  // R1: top-level lifelines (evenly around equator)
  const r1Lifelines = data.lifelines.filter(l => l.parent_id === data.root.id)
  const r1Count = r1Lifelines.length
  r1Lifelines.forEach((l, i) => {
    const phi = (i / r1Count) * Math.PI * 2
    const pos = spherical(RADII.R1, phi, 0)
    nodes.push({ id: l.id, name: l.name, layer: 1, position: pos, parentId: data.root.id })
  })

  // R2: child lifelines, each in parent's angular sector
  data.lifelines.filter(l => l.parent_id !== data.root.id).forEach(l => {
    const parent = nodes.find(n => n.id === l.parent_id)
    if (!parent) return
    const siblings = data.lifelines.filter(s => s.parent_id === l.parent_id)
    const idx = siblings.findIndex(s => s.id === l.id)
    const parentPhi = Math.atan2(parent.position.y, parent.position.x)
    const sectorWidth = Math.PI / 4
    const offset = idx - (siblings.length - 1) / 2
    const phi = parentPhi + offset * (sectorWidth / Math.max(siblings.length, 1))
    const pos = spherical(RADII.R2, phi, (Math.random() - 0.5) * 0.15)
    nodes.push({ id: l.id, name: l.name, layer: 2, position: pos, parentId: l.parent_id })
  })

  // R3: entity leaves
  data.entities.forEach(e => {
    const parent = nodes.find(n => n.id === e.lifeline_id)
    if (!parent) return
    const siblings = data.entities.filter(s => s.lifeline_id === e.lifeline_id)
    const idx = siblings.findIndex(s => s.id === e.id)
    const parentPhi = Math.atan2(parent.position.y, parent.position.x)
    const sectorWidth = Math.PI / 6
    const offset = idx - (siblings.length - 1) / 2
    const phi = parentPhi + offset * (sectorWidth / Math.max(siblings.length, 1))
    const pos = spherical(RADII.R3, phi + (Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.12)
    nodes.push({ id: e.id, name: e.title, layer: 3, position: pos, parentId: e.lifeline_id, kind: e.kind })
  })

  return nodes
}

function spherical(r: number, phi: number, theta: number): THREE.Vector3 {
  const x = r * Math.cos(theta) * Math.cos(phi)
  const y = r * Math.sin(theta)
  const z = r * Math.cos(theta) * Math.sin(phi)
  return new THREE.Vector3(x, y, z)
}

/** 球面布局算法 — 角度扇区分配 + 聚焦星座重排 */
import * as THREE from 'three'
import type { CosmosData, CosmosAssociation } from './types'

export interface LayoutNode {
  id: string
  name: string
  layer: number // 0=root, 1=R1 lifeline, 2=R2 lifeline, 3=R3 entity
  position: THREE.Vector3
  parentId?: string
  kind?: string // entity kind for R3 leaves
  meta?: Record<string, unknown>
}

// Shell radii
export const RADII = { R0: 0.35, R1: 1.6, R2: 2.3, R3: 3.5 }

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

  // R3: entity leaves — sector scales with count, vertical distribution spreads more
  data.entities.forEach(e => {
    const parent = nodes.find(n => n.id === e.lifeline_id)
    if (!parent) return
    const siblings = data.entities.filter(s => s.lifeline_id === e.lifeline_id)
    const idx = siblings.findIndex(s => s.id === e.id)
    const parentPhi = Math.atan2(parent.position.y, parent.position.x)
    // Sector: base 45° + ~5° per extra sibling, min 30°
    const sectorWidth = Math.max(Math.PI / 6, Math.PI / 4 + siblings.length * 0.09)
    const offset = idx - (siblings.length - 1) / 2
    const phi = parentPhi + offset * (sectorWidth / Math.max(siblings.length, 1))
    // Vertical spread: base ±10° + ~2° per sibling
    const thetaSpread = 0.18 + siblings.length * 0.035
    const pos = spherical(RADII.R3, phi + (Math.random() - 0.5) * 0.10, (Math.random() - 0.5) * thetaSpread)
    nodes.push({ id: e.id, name: e.title, layer: 3, position: pos, parentId: e.lifeline_id, kind: e.kind, meta: e.meta })
  })

  return nodes
}

function spherical(r: number, phi: number, theta: number): THREE.Vector3 {
  const x = r * Math.cos(theta) * Math.cos(phi)
  const y = r * Math.sin(theta)
  const z = r * Math.cos(theta) * Math.sin(phi)
  return new THREE.Vector3(x, y, z)
}

/** 聚焦星座布局 — node_focus 状态下为焦点/兄弟/关联节点计算目标位置 */
export function computeFocusLayout(
  nodes: LayoutNode[],
  focusId: string,
  associations: CosmosAssociation[],
  cameraDir: THREE.Vector3
): { targets: Map<string, THREE.Vector3>; constellationIds: Set<string> } {
  const focusNode = nodes.find(n => n.id === focusId)
  if (!focusNode) return { targets: new Map(), constellationIds: new Set() }

  const origin = focusNode.position.clone()
  const d = cameraDir.clone().normalize()

  // 构建参考坐标系，处理 d 平行于 (0,1,0) 的退化情况
  const up = new THREE.Vector3(0, 1, 0)
  const u = new THREE.Vector3().crossVectors(d, up)
  if (u.length() < 0.001) {
    const altUp = new THREE.Vector3(1, 0, 0)
    u.crossVectors(d, altUp).normalize()
  } else {
    u.normalize()
  }
  const v = new THREE.Vector3().crossVectors(u, d).normalize()

  const targets = new Map<string, THREE.Vector3>()
  const constellationIds = new Set<string>()

  // 1. 焦点：留在原位
  targets.set(focusId, origin.clone())
  constellationIds.add(focusId)

  // 2. 祖先链：沿 parentId 向上收集 R2 → R1
  const ancestors: LayoutNode[] = []
  let parentId = focusNode.parentId
  while (parentId && ancestors.length < 2) {
    const p = nodes.find(n => n.id === parentId)
    if (p) {
      ancestors.push(p)
      parentId = p.parentId
    } else {
      break
    }
  }
  ancestors.forEach((a, i) => {
    const pos = origin.clone().addScaledVector(d, 0.18 + i * 0.14).addScaledVector(v, 0.06)
    targets.set(a.id, pos)
    constellationIds.add(a.id)
  })

  // 3. 兄弟节点（同 parentId 的 R3 节点，不含 focus）
  const siblings = nodes.filter(
    n => n.id !== focusId && n.layer === 3 && n.parentId === focusNode.parentId
  ).slice(0, 12)
  siblings.forEach((s, i) => {
    const angle = siblings.length === 1 ? 0 : (i / (siblings.length - 1) - 0.5) * (Math.PI * 2 / 3) // 120° arc
    const pos = origin.clone()
      .addScaledVector(d, 0.12)
      .addScaledVector(u, Math.cos(angle) * 0.25)
      .addScaledVector(v, Math.sin(angle) * 0.25)
    targets.set(s.id, pos)
    constellationIds.add(s.id)
  })

  // 4. 强关联节点（confidence >= 0.7，非 rejected）
  const strongAssocIds = new Set<string>()
  for (const a of associations) {
    if (a.confidence >= 0.7 && a.status !== 'rejected') {
      if (a.from === focusId) strongAssocIds.add(a.to)
      if (a.to === focusId) strongAssocIds.add(a.from)
    }
  }
  const strongNodes = nodes.filter(n => strongAssocIds.has(n.id) && !constellationIds.has(n.id)).slice(0, 6)
  strongNodes.forEach((n, i) => {
    const angle = strongNodes.length === 1 ? 0 : (i / (strongNodes.length - 1) - 0.5) * (Math.PI / 2) // 90° arc
    const pos = origin.clone()
      .addScaledVector(d, -0.08)
      .addScaledVector(u, Math.cos(angle) * 0.22)
      .addScaledVector(v, Math.sin(angle) * 0.22)
    targets.set(n.id, pos)
    constellationIds.add(n.id)
  })

  // 5. 弱关联节点（0.3 <= confidence < 0.7）
  const weakAssocIds = new Set<string>()
  for (const a of associations) {
    if (a.confidence >= 0.3 && a.confidence < 0.7 && a.status !== 'rejected') {
      if (a.from === focusId) weakAssocIds.add(a.to)
      if (a.to === focusId) weakAssocIds.add(a.from)
    }
  }
  const weakNodes = nodes.filter(n => weakAssocIds.has(n.id) && !constellationIds.has(n.id)).slice(0, 6)
  weakNodes.forEach((n, i) => {
    const angle = weakNodes.length === 1 ? 0 : (i / (weakNodes.length - 1) - 0.5) * (Math.PI * 5 / 6) // 150° arc
    const pos = origin.clone()
      .addScaledVector(d, -0.04)
      .addScaledVector(u, Math.cos(angle) * 0.38)
      .addScaledVector(v, Math.sin(angle) * 0.38)
    targets.set(n.id, pos)
    constellationIds.add(n.id)
  })

  return { targets, constellationIds }
}

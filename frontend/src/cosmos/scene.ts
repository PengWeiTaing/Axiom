/** Three.js scene 构建 — 节点 / 连线 / 轨道环 */
import * as THREE from 'three'
import type { CosmosData, CosmosAssociation } from './types'
import { computeLayout, type LayoutNode, RADII } from './layout'

// Resolve CSS variable as hex string
function cssVar(name: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  // return v directly (THREE.Color accepts CSS var values)
  return v || '#6ee7d0'
}

interface SceneObjects {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  nodes: THREE.Mesh[]
  pickables: THREE.Mesh[]
  lines: THREE.LineSegments[]
  orbit: THREE.Mesh | null
  layoutNodes: LayoutNode[]
  dispose: () => void
}

export async function initScene(
  canvas: HTMLCanvasElement,
  data: CosmosData
): Promise<SceneObjects> {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#07090d')

  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 20)
  camera.position.set(0, 2, 4)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)

  const nodes = computeLayout(data)
  const meshes: THREE.Mesh[] = []
  const pickables: THREE.Mesh[] = []
  const allLines: THREE.LineSegments[] = []

  // Create meshes by layer
  for (const n of nodes) {
    let geom: THREE.BufferGeometry
    let mat: THREE.MeshBasicMaterial
    const alpha = n.layer === 0 ? 1 : n.layer === 1 ? 1 : n.layer === 2 ? 0.9 : 0.85

    if (n.layer === 0) {
      geom = new THREE.SphereGeometry(0.04, 16, 16)
      mat = new THREE.MeshBasicMaterial({ color: cssVar('--accent') })
    } else if (n.layer === 1) {
      geom = new THREE.SphereGeometry(0.025, 12, 12)
      mat = new THREE.MeshBasicMaterial({ color: cssVar('--accent'), transparent: true, opacity: alpha })
    } else if (n.layer === 2) {
      geom = new THREE.SphereGeometry(0.018, 8, 8)
      mat = new THREE.MeshBasicMaterial({ color: cssVar('--text-2'), transparent: true, opacity: alpha })
    } else {
      // R3: entity leaves - shape by kind
      if (n.kind === 'task') geom = new THREE.BoxGeometry(0.014, 0.014, 0.014)
      else if (n.kind === 'decision') geom = new THREE.OctahedronGeometry(0.014)
      else if (n.kind === 'item') geom = new THREE.TetrahedronGeometry(0.014)
      else geom = new THREE.SphereGeometry(0.012, 8, 8)
      mat = new THREE.MeshBasicMaterial({ color: cssVar('--text-3'), transparent: true, opacity: alpha })
    }

    const mesh = new THREE.Mesh(geom, mat)
    mesh.position.copy(n.position)
    mesh.userData = { id: n.id, name: n.name, kind: n.kind, layer: n.layer, parentId: n.parentId }
    scene.add(mesh)
    meshes.push(mesh)
    pickables.push(mesh)
  }

  // Parent-child lines (arc approximation via SLERP)
  for (const n of nodes) {
    if (!n.parentId) continue
    const parent = nodes.find(p => p.id === n.parentId)
    if (!parent) continue
    const segments = 8
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const p = new THREE.Vector3().lerpVectors(parent.position, n.position, t).normalize()
        .multiplyScalar(parent.position.length() * (1 - t) + n.position.length() * t)
      points.push(p)
    }
    const lineGeom = new THREE.BufferGeometry().setFromPoints(points)
    const lineMat = new THREE.LineBasicMaterial({ color: cssVar('--line-2'), transparent: true, opacity: 0.4 })
    const line = new THREE.LineSegments(lineGeom, lineMat)
    scene.add(line)
    allLines.push(line)
  }

  // R1 orbit ring
  const ringGeom = new THREE.TorusGeometry(RADII.R1, 0.003, 8, 64)
  const ring = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({ color: cssVar('--line-2'), transparent: true, opacity: 0.04 }))
  ring.rotation.x = THREE.MathUtils.degToRad(15)
  scene.add(ring)

  function dispose() {
    scene.traverse((obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose()
        if (obj.material instanceof THREE.Material) obj.material.dispose()
      }
    })
    renderer.dispose()
  }

  return { scene, camera, renderer, nodes: meshes, pickables, lines: allLines, orbit: ring, layoutNodes: nodes, dispose }
}

interface AssociationLine {
  line: THREE.LineSegments
  data: CosmosAssociation
  fromNode: LayoutNode
  toNode: LayoutNode
}

export function createAssociationLines(
  scene: THREE.Scene,
  data: CosmosData,
  layoutNodes: LayoutNode[],
  focusId: string
): AssociationLine[] {
  const results: AssociationLine[] = []
  const relevant = data.associations
    .filter(a => (a.from === focusId || a.to === focusId) && a.confidence >= 0.7)
    .slice(0, 20)

  for (const assoc of relevant) {
    const from = layoutNodes.find(n => n.id === assoc.from)
    const to = layoutNodes.find(n => n.id === assoc.to)
    if (!from || !to) continue

    const lineGeom = new THREE.BufferGeometry().setFromPoints([from.position, to.position])
    ;(lineGeom as any).computeLineDistances?.()
    const colorMap: Record<string, string> = {
      co_occurrence: '--text-3',
      causal: '--accent',
      tension: '--warm',
      derived_from: '--accent-dim',
    }
    const alpha = 0.5 + (assoc.confidence - 0.5) * 0.8
    const mat = assoc.status === 'pending'
      ? new THREE.LineDashedMaterial({ color: cssVar(colorMap[assoc.relation_type] || '--text-3'), transparent: true, opacity: alpha * 0.8, dashSize: 0.06, gapSize: 0.04 })
      : new THREE.LineBasicMaterial({ color: cssVar(colorMap[assoc.relation_type] || '--text-3'), transparent: true, opacity: alpha })
    mat.depthTest = false
    const line = new THREE.LineSegments(lineGeom, mat)
    line.userData = { associationId: assoc.id, ...assoc }
    scene.add(line)
    results.push({ line, data: assoc, fromNode: from, toNode: to })
  }

  return results
}

export function fadeNodes(meshes: THREE.Mesh[], visibleIds: Set<string>, alpha: number = 0.05) {
  meshes.forEach(m => {
    const id = m.userData.id as string
    const mat = m.material as THREE.MeshBasicMaterial
    if (visibleIds.has(id)) {
      mat.opacity = 1
      mat.transparent = true
    } else {
      mat.opacity = alpha
      mat.transparent = true
    }
    mat.needsUpdate = true
  })
}

export function resetNodeAlpha(meshes: THREE.Mesh[]) {
  meshes.forEach(m => {
    const layer = m.userData.layer as number
    const alpha = layer === 0 ? 1 : layer === 1 ? 1 : layer === 2 ? 0.9 : 0.85
    const mat = m.material as THREE.MeshBasicMaterial
    mat.opacity = alpha
    mat.transparent = true
    mat.needsUpdate = true
  })
}

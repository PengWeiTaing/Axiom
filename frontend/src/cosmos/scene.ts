/** Three.js scene 构建 — 节点 / Line2 连线 / 轨道环 */
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import type { CosmosData, CosmosAssociation } from './types'
import { computeLayout, type LayoutNode, RADII } from './layout'

function cssVar(name: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || '#6ee7d0'
}

function flattenPoints(points: THREE.Vector3[]): number[] {
  const arr: number[] = []
  for (const p of points) arr.push(p.x, p.y, p.z)
  return arr
}

interface SceneObjects {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  nodes: THREE.Mesh[]
  pickables: THREE.Mesh[]
  lines: Line2[]
  orbit: THREE.Mesh | null
  layoutNodes: LayoutNode[]
  dispose: () => void
  setResolution: (w: number, h: number) => void
}

export async function initScene(
  canvas: HTMLCanvasElement,
  data: CosmosData
): Promise<SceneObjects> {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#07090d')

  const w = canvas.clientWidth
  const h = canvas.clientHeight
  const resolution = new THREE.Vector2(w, h)

  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 20)
  camera.position.set(0, 2, 4)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)

  const nodes = computeLayout(data)
  const meshes: THREE.Mesh[] = []
  const pickables: THREE.Mesh[] = []
  const allLines: Line2[] = []
  const lineMaterials: LineMaterial[] = []

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
      if (n.kind === 'task') geom = new THREE.BoxGeometry(0.014, 0.014, 0.014)
      else if (n.kind === 'decision') geom = new THREE.OctahedronGeometry(0.014)
      else if (n.kind === 'item') geom = new THREE.TetrahedronGeometry(0.014)
      else geom = new THREE.SphereGeometry(0.012, 8, 8)
      mat = new THREE.MeshBasicMaterial({ color: cssVar('--text-3'), transparent: true, opacity: alpha })
    }

    const mesh = new THREE.Mesh(geom, mat)
    mesh.position.copy(n.position)
    mesh.userData = {
      id: n.id, name: n.name, kind: n.kind,
      layer: n.layer, parentId: n.parentId,
      homePosition: n.position.clone(),
      targetPosition: n.position.clone(),
    }
    scene.add(mesh)
    meshes.push(mesh)
    pickables.push(mesh)
  }

  // Parent-child lines (SLERP arcs) → Line2
  for (const n of nodes) {
    if (!n.parentId) continue
    const parent = nodes.find(p => p.id === n.parentId)
    if (!parent) continue
    const segments = 8
    const arcPoints: THREE.Vector3[] = []
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const p = new THREE.Vector3().lerpVectors(parent.position, n.position, t).normalize()
        .multiplyScalar(parent.position.length() * (1 - t) + n.position.length() * t)
      arcPoints.push(p)
    }
    const lineGeom = new LineGeometry()
    lineGeom.setPositions(flattenPoints(arcPoints))

    const lineMat = new LineMaterial({
      color: new THREE.Color(cssVar('--line-2')),
      linewidth: 1.5,
      worldUnits: false,
      resolution,
      transparent: true,
      opacity: 0.65,
      depthTest: true,
    })
    lineMaterials.push(lineMat)

    const line = new Line2(lineGeom, lineMat)
    line.computeLineDistances()
    line.userData = { fromLayer: parent.layer, toLayer: n.layer }
    scene.add(line)
    allLines.push(line)
  }

  // R1 orbit ring
  const ringGeom = new THREE.TorusGeometry(RADII.R1, 0.003, 8, 64)
  const ring = new THREE.Mesh(ringGeom, new THREE.MeshBasicMaterial({ color: cssVar('--line-2'), transparent: true, opacity: 0.04 }))
  ring.rotation.x = THREE.MathUtils.degToRad(15)
  scene.add(ring)

  function setResolution(w2: number, h2: number) {
    resolution.set(w2, h2)
    lineMaterials.forEach(m => { m.resolution.set(w2, h2) })
  }

  function dispose() {
    scene.traverse((obj: THREE.Object3D) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose()
        const mat = obj.material
        if (mat instanceof THREE.Material) {
          if (Array.isArray(mat)) mat.forEach(m => m.dispose())
          else mat.dispose()
        }
      }
    })
    // Line2 的 geometry 需手动 dispose
    allLines.forEach(l => { l.geometry?.dispose() })
    lineMaterials.forEach(m => m.dispose())
    renderer.dispose()
  }

  return { scene, camera, renderer, nodes: meshes, pickables, lines: allLines, orbit: ring, layoutNodes: nodes, dispose, setResolution }
}

interface AssociationLine {
  line: Line2
  data: CosmosAssociation
  fromNode: LayoutNode
  toNode: LayoutNode
}

export function createAssociationLines(
  scene: THREE.Scene,
  data: CosmosData,
  layoutNodes: LayoutNode[],
  focusId: string,
  resolution?: THREE.Vector2
): AssociationLine[] {
  const res = resolution || new THREE.Vector2(window.innerWidth, window.innerHeight)
  const results: AssociationLine[] = []
  const relevant = data.associations
    .filter(a => (a.from === focusId || a.to === focusId) && a.confidence >= 0.7)
    .slice(0, 20)

  const colorMap: Record<string, string> = {
    co_occurrence: '--text-3',
    causal: '--accent',
    tension: '--warm',
    derived_from: '--accent-dim',
  }

  for (const assoc of relevant) {
    const from = layoutNodes.find(n => n.id === assoc.from)
    const to = layoutNodes.find(n => n.id === assoc.to)
    if (!from || !to) continue

    const lineGeom = new LineGeometry()
    lineGeom.setPositions([from.position.x, from.position.y, from.position.z, to.position.x, to.position.y, to.position.z])

    const alpha = 0.5 + (assoc.confidence - 0.5) * 0.8
    const colorHex = cssVar(colorMap[assoc.relation_type] || '--text-3')

    const mat = new LineMaterial({
      color: new THREE.Color(colorHex),
      linewidth: 2,
      worldUnits: false,
      resolution: res,
      transparent: true,
      opacity: assoc.status === 'pending' ? alpha * 0.8 : alpha,
      depthTest: false,
      dashed: assoc.status === 'pending',
      dashSize: 0.06,
      gapSize: 0.04,
    })

    const line = new Line2(lineGeom, mat)
    line.computeLineDistances()
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

export function updateNodePositions(meshes: THREE.Mesh[], dt: number, rate: number = 6): void {
  const t = 1 - Math.exp(-rate * dt)
  for (const m of meshes) {
    const target = m.userData.targetPosition as THREE.Vector3 | undefined
    if (!target) continue
    m.position.lerp(target, t)
  }
}

export function applyConstellationOpacities(
  meshes: THREE.Mesh[],
  constellationIds: Set<string>,
  ghostAlpha: number = 0.06
): void {
  for (const m of meshes) {
    const id = m.userData.id as string
    if (constellationIds.has(id)) continue
    const mat = m.material as THREE.MeshBasicMaterial
    mat.opacity = ghostAlpha
    mat.transparent = true
    mat.needsUpdate = true
  }
}

/** Three.js scene 构建 — 节点 / Line2 连线 / 轨道环 */
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import type { CosmosData, CosmosAssociation } from './types'
import { computeLayout, type LayoutNode, RADII } from './layout'

export function cssVar(name: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!v) return '#6ee7d0'
  const m = v.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (m) {
    return '#' + [m[1], m[2], m[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('')
  }
  return v
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
  camera.position.set(0, 2.5, 5.5)
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
      geom = new THREE.SphereGeometry(0.06, 16, 16)
      mat = new THREE.MeshBasicMaterial({ color: cssVar('--accent') })
    } else if (n.layer === 1) {
      geom = new THREE.SphereGeometry(0.05, 12, 12)
      mat = new THREE.MeshBasicMaterial({ color: cssVar('--accent'), transparent: true, opacity: alpha })
    } else if (n.layer === 2) {
      geom = new THREE.SphereGeometry(0.03, 8, 8)
      mat = new THREE.MeshBasicMaterial({ color: cssVar('--text-2'), transparent: true, opacity: alpha })
    } else {
      if (n.kind === 'task') geom = new THREE.BoxGeometry(0.026, 0.026, 0.026)
      else if (n.kind === 'decision') geom = new THREE.OctahedronGeometry(0.026)
      else if (n.kind === 'memory') geom = new THREE.SphereGeometry(0.024, 8, 8)
      else if (n.kind === 'item') geom = new THREE.TetrahedronGeometry(0.024)
      else geom = new THREE.SphereGeometry(0.018, 8, 8)

      const kindColorMap: Record<string, string> = { task: '--accent', memory: '--warn', decision: '--warm', item: '--text-3' }
      const kindColor = kindColorMap[n.kind || ''] || '--text-3'
      let r3Alpha = alpha
      if (n.kind === 'task' && n.meta) {
        if (n.meta.status === 'done') r3Alpha = 0.4
        else if (n.meta.status === 'cancelled') r3Alpha = 0.25
        else if (n.meta.priority === 'high') r3Alpha = 0.95
      }
      mat = new THREE.MeshBasicMaterial({ color: cssVar(kindColor), transparent: true, opacity: r3Alpha })
    }

    const mesh = new THREE.Mesh(geom, mat)
    mesh.position.copy(n.position)
    mesh.userData = {
      id: n.id, name: n.name, kind: n.kind,
      layer: n.layer, parentId: n.parentId,
      homePosition: n.position.clone(),
      targetPosition: n.position.clone(),
    }
    // task 节点 done 状态缩小
    if (n.layer === 3 && n.kind === 'task' && n.meta) {
      if (n.meta.status === 'done') mesh.scale.setScalar(0.75)
      else if (n.meta.status === 'cancelled') mesh.scale.setScalar(0.6)
    }
    scene.add(mesh)
    meshes.push(mesh)
    pickables.push(mesh)

    // R3 节点：不可见碰撞球，提升点击精度
    if (n.layer === 3) {
      const hitGeom = new THREE.SphereGeometry(0.04, 8, 8)
      const hitMat = new THREE.MeshBasicMaterial({ visible: false })
      const hitMesh = new THREE.Mesh(hitGeom, hitMat)
      hitMesh.position.copy(n.position)
      hitMesh.userData = mesh.userData
      pickables.push(hitMesh)
    }
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
  const ring1Geom = new THREE.TorusGeometry(RADII.R1, 0.006, 8, 80)
  const ring1 = new THREE.Mesh(ring1Geom, new THREE.MeshBasicMaterial({ color: cssVar('--line-2'), transparent: true, opacity: 0.12 }))
  ring1.rotation.x = THREE.MathUtils.degToRad(15)
  scene.add(ring1)

  // R2 orbit ring
  const ring2Geom = new THREE.TorusGeometry(RADII.R2, 0.004, 8, 80)
  const ring2 = new THREE.Mesh(ring2Geom, new THREE.MeshBasicMaterial({ color: cssVar('--line-2'), transparent: true, opacity: 0.08 }))
  ring2.rotation.x = THREE.MathUtils.degToRad(15)
  scene.add(ring2)

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

  return { scene, camera, renderer, nodes: meshes, pickables, lines: allLines, orbit: ring1, layoutNodes: nodes, dispose, setResolution }
}

interface AssociationLine {
  line: Line2
  data: CosmosAssociation
  fromNode: LayoutNode
  toNode: LayoutNode
  arrow?: THREE.Mesh
}

const MIN_LINEWIDTH = 1.0
const MAX_LINEWIDTH = 3.5

function confidenceToWidth(c: number): number {
  return Math.max(MIN_LINEWIDTH, Math.min(MAX_LINEWIDTH, MIN_LINEWIDTH + (c - 0.3) * 3.57))
}

function createArrowhead(
  from: THREE.Vector3,
  to: THREE.Vector3,
  color: string,
  lineWidth: number
): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(to, from).normalize()
  const arrowSize = 0.03 + lineWidth * 0.005
  const geom = new THREE.ConeGeometry(arrowSize, arrowSize * 2.5, 6, 1)
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color) })
  const arrow = new THREE.Mesh(geom, mat)

  const arrowPos = to.clone().addScaledVector(dir, -0.04)
  arrow.position.copy(arrowPos)

  const quat = new THREE.Quaternion()
  quat.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
  arrow.setRotationFromQuaternion(quat)

  return arrow
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
    manual: '--accent',
  }

  for (const assoc of relevant) {
    const from = layoutNodes.find(n => n.id === assoc.from)
    const to = layoutNodes.find(n => n.id === assoc.to)
    if (!from || !to) continue

    const lineGeom = new LineGeometry()
    lineGeom.setPositions([from.position.x, from.position.y, from.position.z, to.position.x, to.position.y, to.position.z])

    const lw = confidenceToWidth(assoc.confidence)
    const alpha = 0.5 + (assoc.confidence - 0.5) * 0.8
    const colorHex = cssVar(colorMap[assoc.relation_type] || '--text-3')

    const mat = new LineMaterial({
      color: new THREE.Color(colorHex),
      linewidth: lw,
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
    line.userData = { associationId: assoc.id, ...assoc, _origLinewidth: lw, _origColor: line.material.color.getHex() }
    scene.add(line)

    let arrow: THREE.Mesh | undefined
    if (assoc.status === 'accepted') {
      arrow = createArrowhead(from.position, to.position, colorHex, lw)
      scene.add(arrow)
    }

    results.push({ line, data: assoc, fromNode: from, toNode: to, arrow })
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
  ghostExcept(meshes, constellationIds, ghostAlpha)
}

/** ghost 全部节点，然后恢复 visibleIds 中的节点到正常 opacity */
export function ghostExcept(meshes: THREE.Mesh[], visibleIds: Set<string>, ghostAlpha: number = 0.06): void {
  for (const m of meshes) {
    const id = m.userData.id as string
    const layer = m.userData.layer as number
    const mat = m.material as THREE.MeshBasicMaterial
    if (visibleIds.has(id)) {
      const alpha = layer === 0 ? 1 : layer === 1 ? 1 : layer === 2 ? 0.9 : 0.85
      mat.opacity = alpha
    } else {
      mat.opacity = ghostAlpha
    }
    mat.transparent = true
    mat.needsUpdate = true
  }
}

/** 给聚焦节点加光环 */
export function addHalo(scene: THREE.Scene, position: THREE.Vector3, color: string): THREE.Mesh {
  const haloGeom = new THREE.TorusGeometry(0.04, 0.004, 8, 16)
  const haloMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: 0.5 })
  const halo = new THREE.Mesh(haloGeom, haloMat)
  halo.position.copy(position)
  halo.name = 'focusHalo'
  halo.renderOrder = 999
  halo.material.depthTest = false
  halo.material.depthWrite = false
  scene.add(halo)
  return halo
}

export function removeHalo(scene: THREE.Scene) {
  const halo = scene.getObjectByName('focusHalo')
  if (halo) {
    scene.remove(halo)
    if ((halo as THREE.Mesh).geometry) (halo as THREE.Mesh).geometry.dispose()
    if ((halo as THREE.Mesh).material) {
      const m = (halo as THREE.Mesh).material as THREE.Material
      if (Array.isArray(m)) m.forEach(x => x.dispose()); else m.dispose()
    }
  }
}

/** 路径查找 3D 高亮 — 增强版（起终点分色 + 多路径分色） */
export const PATH_PALETTE = [0xa0fff0, 0xffeaa0, 0xffa0ff, 0xa0a0a0]

export interface PathHighlight3D {
  startId: string
  endId: string
  pathEntityIds: Set<string>
  pathAssocIds: Set<string>
  color: number
  isCurrent: boolean
}

let pathStepLabels: THREE.Object3D[] = []
let pathCones: THREE.Mesh[] = []

export function highlightPaths(
  nodes: THREE.Mesh[],
  assocLines: Array<{ line: any; data: any; fromNode: any; toNode: any }>,
  paths: PathHighlight3D[],
  scene: THREE.Scene
) {
  clearPathDecorations(scene)

  const allEntityIds = new Set(paths.flatMap(p => [...p.pathEntityIds]))
  const allAssocIds = new Set(paths.flatMap(p => [...p.pathAssocIds]))

  // Dim non-path
  for (const m of nodes) {
    if (m.userData.layer === 3 && !allEntityIds.has(m.userData.id as string)) {
      const mat = m.material as THREE.MeshBasicMaterial
      mat.opacity = 0.3; mat.transparent = true; mat.needsUpdate = true
    }
  }
  for (const al of assocLines) {
    if (!allAssocIds.has(al.data.id)) al.line.material.opacity = 0.1
  }

  // Highlight each path
  for (const ph of paths) {
    const scale = ph.isCurrent ? 1.3 : 1.1
    const lwMult = ph.isCurrent ? 2 : 1

    for (const m of nodes) {
      const id = m.userData.id as string
      if (!ph.pathEntityIds.has(id)) continue
      const mat = m.material as THREE.MeshBasicMaterial
      ;(mat as any)._pathOrigColor = (mat as any)._pathOrigColor ?? mat.color.getHex()

      if (id === ph.startId) { m.scale.setScalar(1.5); mat.color.set('#80ff80') }
      else if (id === ph.endId) { m.scale.setScalar(1.5); mat.color.set('#ffaa44') }
      else { m.scale.setScalar(scale); mat.color.set(ph.color) }
      mat.needsUpdate = true
    }

    for (const al of assocLines) {
      if (!ph.pathAssocIds.has(al.data.id)) continue
      const mat = al.line.material
      ;(mat as any)._pathOrigLinewidth = (mat as any)._pathOrigLinewidth ?? mat.linewidth
      mat.linewidth = ((mat as any)._pathOrigLinewidth || 1.5) * lwMult
      mat.opacity = 1

      if (ph.isCurrent) addDirectionCones(al.fromNode, al.toNode, ph.color, scene)
    }
  }
}

function addDirectionCones(fromNode: any, toNode: any, color: number, scene: THREE.Scene) {
  const mid = new THREE.Vector3().addVectors(fromNode.position, toNode.position).multiplyScalar(0.5)
  const dir = new THREE.Vector3().subVectors(toNode.position, fromNode.position).normalize()
  const coneGeom = new THREE.ConeGeometry(0.015, 0.04, 6)
  const coneMat = new THREE.MeshBasicMaterial({ color })
  const cone = new THREE.Mesh(coneGeom, coneMat)
  cone.position.copy(mid)
  cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
  cone.userData.isPathCone = true
  scene.add(cone)
  pathCones.push(cone)
}

export function addPathStepLabels(path: string[], nodes: any[], scene: THREE.Scene) {
  for (let i = 1; i < path.length - 1; i++) {
    const node = nodes.find(n => n.userData.id === path[i])
    if (!node) continue
    const div = document.createElement('div')
    div.style.cssText = 'width:18px;height:18px;border-radius:50%;background:var(--accent);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;'
    div.textContent = String(i)
    const label = new CSS2DObject(div)
    label.position.copy(node.position.clone().add(new THREE.Vector3(0, 0.05, 0)))
    label.userData.isPathLabel = true
    scene.add(label)
    pathStepLabels.push(label)
  }
}

export function clearPathDecorations(scene: THREE.Scene) {
  for (const l of pathStepLabels) { scene.remove(l) }
  for (const c of pathCones) { scene.remove(c); c.geometry?.dispose(); (c.material as THREE.Material).dispose() }
  pathStepLabels = []
  pathCones = []
}

export function clearPathHighlight(
  nodes: THREE.Mesh[],
  assocLines: Array<{ line: any; data: any }>
) {
  for (const m of nodes) {
    const mat = m.material as THREE.MeshBasicMaterial
    if ((mat as any)._pathOrigColor !== undefined) {
      mat.color.setHex((mat as any)._pathOrigColor)
      delete (mat as any)._pathOrigColor
      m.scale.setScalar(1)
      mat.needsUpdate = true
    }
  }
  for (const al of assocLines) {
    const mat = al.line.material
    if ((mat as any)._pathOrigLinewidth !== undefined) {
      mat.linewidth = (mat as any)._pathOrigLinewidth
      delete (mat as any)._pathOrigLinewidth
    }
    mat.opacity = mat.opacity < 0.2 ? 0.8 : mat.opacity
  }
}

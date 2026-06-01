<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  GridHelper,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
  type ColorRepresentation,
  type Material,
  type Object3D,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useAtlasGraphStore } from '@/stores/atlasGraph'
import type { AtlasEdge, AtlasNode } from '@/atlas/types'

interface LocalNode {
  node: AtlasNode
  x: number
  y: number
  radius: number
  role: 'center' | 'primary' | 'secondary'
  anchorId?: string
}

interface LocalEdge {
  edge: AtlasEdge
  role: 'primary' | 'secondary'
}

interface ProjectedLabel {
  id: string
  label: string
  type: string
  x: number
  y: number
  muted: boolean
}

const store = useAtlasGraphStore()
const sceneHost = ref<HTMLElement | null>(null)
const sceneReady = ref(false)
const graphScale = ref(1)
const focusMode = ref(false)
const projectedLabels = ref<ProjectedLabel[]>([])

const nodes = computed(() => store.data?.nodes || [])
const edges = computed(() => store.visibleEdges || [])
const ambientEdges = computed<AtlasEdge[]>(() => buildAmbientEdges())
const renderEdges = computed<AtlasEdge[]>(() => [...edges.value, ...ambientEdges.value])
const nodeMap = computed(() => store.nodeMap)

let scene: Scene | null = null
let camera: PerspectiveCamera | null = null
let renderer: WebGLRenderer | null = null
let controls: OrbitControls | null = null
let graphGroup: Group | null = null
let animationFrame = 0
let raycaster: Raycaster | null = null
let pointer = new Vector2()
const nodeObjects = new Map<string, Mesh>()
const nodePositions = new Map<string, Vector3>()
const energyNodeSprites = new Map<string, Sprite>()
let haloTexture: CanvasTexture | null = null
let dotTexture: CanvasTexture | null = null
let energyDotTexture: CanvasTexture | null = null

onMounted(async () => {
  await store.load()
  await nextTick()
  initScene()
})

onUnmounted(() => {
  teardownScene()
})

watch(
  () => [
    store.data,
    renderEdges.value.length,
    store.selectedId,
    store.hoveredId,
    store.lod,
    store.showSemantic,
    store.showStructural,
    graphScale.value,
  ],
  () => {
    updateScene()
  },
  { deep: true },
)

const relatedIds = computed(() => {
  const id = store.selectedId || store.hoveredId
  if (!id) return new Set<string>()
  const set = new Set<string>([id])
  for (const edge of store.focusedEdges) {
    set.add(edge.source)
    set.add(edge.target)
  }
  return set
})

const relatedEdgeIds = computed(() => new Set(store.focusedEdges.map(edge => edge.id)))

const typeStats = computed(() => {
  const stats: Record<string, number> = {}
  for (const node of nodes.value) stats[node.type] = (stats[node.type] || 0) + 1
  return stats
})

const localEdges = computed<LocalEdge[]>(() => {
  const center = store.selectedNode
  if (!center) return []
  const primary = store.focusedEdges
    .filter(edge => localEdgeVisible(edge, center))
    .sort((a, b) => b.strength - a.strength || b.confidence - a.confidence)
    .slice(0, 18)
    .map(edge => ({ edge, role: 'primary' as const }))

  const primaryIds = new Set<string>([center.id])
  for (const entry of primary) {
    primaryIds.add(entry.edge.source === center.id ? entry.edge.target : entry.edge.source)
  }

  const secondary: LocalEdge[] = []
  const secondDegreeCount = new Map<string, number>()
  const used = new Set(primary.map(entry => entry.edge.id))
  for (const edge of (store.data?.edges || [])) {
    if (used.has(edge.id) || edge.source === center.id || edge.target === center.id) continue
    const sourcePrimary = primaryIds.has(edge.source)
    const targetPrimary = primaryIds.has(edge.target)
    if (!sourcePrimary && !targetPrimary) continue
    const source = nodeById(edge.source)
    const target = nodeById(edge.target)
    if (!source || !target || !localContextEdgeVisible(edge, source, target)) continue
    const outsideId = sourcePrimary && targetPrimary ? null : sourcePrimary ? edge.target : edge.source
    if (outsideId) {
      const count = secondDegreeCount.get(sourcePrimary ? edge.source : edge.target) || 0
      if (count >= 2) continue
      secondDegreeCount.set(sourcePrimary ? edge.source : edge.target, count + 1)
    }
    secondary.push({ edge, role: 'secondary' })
    used.add(edge.id)
    if (secondary.length >= 36) break
  }

  return [...primary, ...secondary]
})

const primaryLocalEdges = computed(() => localEdges.value.filter(entry => entry.role === 'primary'))
const secondaryLocalEdges = computed(() => localEdges.value.filter(entry => entry.role === 'secondary'))

const localNodeIds = computed(() => {
  const ids = new Set<string>()
  const center = store.selectedNode
  if (center) ids.add(center.id)
  for (const entry of localEdges.value) {
    ids.add(entry.edge.source)
    ids.add(entry.edge.target)
  }
  return ids
})

const localRelationRows = computed(() => primaryLocalEdges.value
  .map(entry => entry.edge)
    .sort((a, b) => b.confidence - a.confidence || b.strength - a.strength)
)

const localNodes = computed<LocalNode[]>(() => {
  const center = store.selectedNode
  if (!center) return []
  const result: LocalNode[] = [{ node: center, x: 0, y: 0, radius: localNodeRadius(center, 'center'), role: 'center' }]
  const placed = new Set<string>([center.id])
  const primary = primaryLocalEdges.value
    .map(entry => {
      const id = entry.edge.source === center.id ? entry.edge.target : entry.edge.source
      return { edge: entry, node: nodeById(id) }
    })
    .filter((entry): entry is { edge: LocalEdge, node: AtlasNode } => Boolean(entry.node))

  const count = Math.max(primary.length, 1)
  primary.forEach((entry, index) => {
    if (placed.has(entry.node.id)) return
    placed.add(entry.node.id)
    const distance = localPrimaryDistance(entry.edge.edge, entry.node, center)
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count
    result.push({
      node: entry.node,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      radius: localNodeRadius(entry.node, 'primary'),
      role: 'primary',
    })
  })

  const byId = new Map(result.map(entry => [entry.node.id, entry]))
  for (const entry of secondaryLocalEdges.value) {
    for (const [nodeId, anchorId] of [
      [entry.edge.source, entry.edge.target],
      [entry.edge.target, entry.edge.source],
    ] as const) {
      if (placed.has(nodeId) || !localNodeIds.value.has(nodeId)) continue
      const node = nodeById(nodeId)
      const anchor = byId.get(anchorId)
      if (!node || !anchor) continue
      placed.add(nodeId)
      const angle = Math.atan2(anchor.y, anchor.x) + (placed.size % 2 === 0 ? 0.45 : -0.45)
      const distance = 24 + (1 - entry.edge.strength) * 34
      const localNode = {
        node,
        x: anchor.x + Math.cos(angle) * distance,
        y: anchor.y + Math.sin(angle) * distance,
        radius: localNodeRadius(node, 'secondary'),
        role: 'secondary' as const,
        anchorId,
      }
      result.push(localNode)
      byId.set(nodeId, localNode)
    }
  }
  return result
})

const localNodeById = computed(() => new Map(localNodes.value.map(entry => [entry.node.id, entry])))

function nodeById(id: string): AtlasNode | undefined {
  return nodeMap.value.get(id)
}

function typeLabel(type: string): string {
  const labels: Record<string, string> = {
    root: '根',
    lifeline: '主线',
    cluster: '聚类',
    memory: '记忆',
    task: '任务',
    decision: '决策',
    item: '记录',
  }
  return labels[type] || type
}

function relationLabel(type: string): string {
  const labels: Record<string, string> = {
    contains: '归属',
    same_topic: '同主题',
    co_occurrence: '共现',
    causal: '因果',
    tension: '张力',
    derived_from: '衍生',
    supports: '支持',
    contradicts: '冲突',
    prerequisite: '前置',
    next_action: '下一步',
    manual: '人工',
  }
  return labels[type] || type
}

function shortLabel(label: string, max = 12): string {
  return label.length > max ? label.slice(0, max - 1) + '…' : label
}

function reload() {
  store.load(true)
}

function enterFocus(node: AtlasNode) {
  store.selectNode(node)
  focusMode.value = true
}

function exitFocus() {
  focusMode.value = false
}

function clearSelection() {
  store.selectNode(null)
  focusMode.value = false
}

function selectLocalNode(node: AtlasNode) {
  store.selectNode(node)
  focusMode.value = true
}

function buildAmbientEdges(): AtlasEdge[] {
  if (!nodes.value.length) return []
  const output: AtlasEdge[] = []
  const existing = new Set(edges.value.map(edge => edgePairKey(edge.source, edge.target)))
  const add = (source: AtlasNode | undefined, target: AtlasNode | undefined, strength = 0.56) => {
    if (!source || !target || source.id === target.id || isFallbackNode(source) || isFallbackNode(target)) return
    const key = edgePairKey(source.id, target.id)
    if (existing.has(key) || output.some(edge => edgePairKey(edge.source, edge.target) === key)) return
    output.push(makeAmbientEdge(source, target, strength))
  }

  const clustersByLifeline = new Map<string, AtlasNode[]>()
  const entitiesByCluster = new Map<string, AtlasNode[]>()
  for (const node of nodes.value) {
    if (isFallbackNode(node)) continue
    if (node.type === 'cluster' && node.lifeline_id) {
      clustersByLifeline.set(node.lifeline_id, [...(clustersByLifeline.get(node.lifeline_id) || []), node])
    }
    if (node.cluster_id && ['memory', 'task', 'decision', 'item'].includes(node.type)) {
      entitiesByCluster.set(node.cluster_id, [...(entitiesByCluster.get(node.cluster_id) || []), node])
    }
  }

  for (const clusters of clustersByLifeline.values()) {
    const ordered = [...clusters].sort((a, b) => b.weight - a.weight || a.label.localeCompare(b.label))
    for (let index = 0; index < ordered.length - 1; index += 1) add(ordered[index], ordered[index + 1], 0.5)
    if (ordered.length > 2) add(ordered[0], ordered[ordered.length - 1], 0.42)
  }

  for (const [clusterId, entities] of entitiesByCluster.entries()) {
    const cluster = nodeById(clusterId)
    const ordered = [...entities].sort((a, b) => b.weight - a.weight || a.label.localeCompare(b.label)).slice(0, 8)
    for (let index = 0; index < ordered.length; index += 1) {
      add(ordered[index], ordered[(index + 1) % ordered.length], 0.48)
      if (index < 3) add(cluster, ordered[index], 0.44)
      if (index + 2 < ordered.length && index < 4) add(ordered[index], ordered[index + 2], 0.36)
    }
    if (output.length >= 72) break
  }

  const eligible = nodes.value.filter(node => node.type !== 'root' && !isFallbackNode(node))
  for (const node of eligible) {
    const neighbors = eligible
      .filter(other => other.id !== node.id && ambientNeighborAllowed(node, other))
      .map(other => ({ node: other, distance: layoutDistanceSq(node, other) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, node.type === 'lifeline' ? 1 : 2)
    for (const neighbor of neighbors) add(node, neighbor.node, 0.32)
    if (output.length >= 120) break
  }

  return output.slice(0, 120)
}

function edgePairKey(source: string, target: string): string {
  return source < target ? `${source}::${target}` : `${target}::${source}`
}

function makeAmbientEdge(source: AtlasNode, target: AtlasNode, strength: number): AtlasEdge {
  return {
    id: `ambient:${source.id}:${target.id}`,
    source: source.id,
    target: target.id,
    edge_class: 'semantic',
    relation_type: 'ambient_context',
    strength,
    confidence: strength,
    layer_delta: Math.abs(source.layer - target.layer),
    evidence: '同一主题邻近关系',
    generated_by: 'frontend_atlas_affinity_mesh',
    visible_by_default: true,
    distance: 0,
    width: 0.45,
    opacity: 0.13,
    color_from: '#b46a63',
    color_to: '#5f7fa6',
    line_style: 'solid',
  }
}

function ambientNeighborAllowed(source: AtlasNode, target: AtlasNode): boolean {
  if (source.cluster_id && source.cluster_id === target.cluster_id) return true
  if (source.lifeline_id && source.lifeline_id === target.lifeline_id) return Math.abs(source.layer - target.layer) <= 2
  return source.semantic_level === target.semantic_level && Math.abs(source.layer - target.layer) <= 1
}

function layoutDistanceSq(source: AtlasNode, target: AtlasNode): number {
  const dx = (source.layout.x || 0) - (target.layout.x || 0)
  const dy = (source.layout.y || 0) - (target.layout.y || 0)
  const dz = (source.layout.z || 0) - (target.layout.z || 0)
  return dx * dx + dy * dy + dz * dz
}

function resetCamera() {
  if (!camera || !controls) return
  camera.position.set(0, 185, 360)
  camera.lookAt(0, 0, 0)
  controls.target.set(0, 0, 0)
  controls.update()
}

function initScene() {
  if (!sceneHost.value || renderer) return
  scene = new Scene()
  scene.background = new Color(0x07090d)
  graphGroup = new Group()
  scene.add(graphGroup)

  const host = sceneHost.value
  const rect = host.getBoundingClientRect()
  camera = new PerspectiveCamera(45, Math.max(1, rect.width) / Math.max(1, rect.height), 0.1, 4000)
  camera.position.set(0, 185, 360)
  camera.lookAt(0, 0, 0)

  renderer = new WebGLRenderer({ antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(rect.width, rect.height)
  renderer.outputColorSpace = SRGBColorSpace
  host.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.06
  controls.rotateSpeed = 0.48
  controls.zoomSpeed = 0.72
  controls.panSpeed = 0.42
  controls.minDistance = 125
  controls.maxDistance = 780

  raycaster = new Raycaster()
  renderer.domElement.addEventListener('pointermove', onPointerMove)
  renderer.domElement.addEventListener('click', onPointerClick)
  window.addEventListener('resize', onResize)

  addSceneLights()
  addGlobalGrid()
  updateScene()
  sceneReady.value = true
  animate()
}

function addSceneLights() {
  if (!scene) return
  scene.add(new AmbientLight(0xc6d4df, 0.52))
  const key = new DirectionalLight(0xcffdf5, 1.35)
  key.position.set(-180, 360, 240)
  scene.add(key)
  const fill = new PointLight(0x5f7fa6, 2.3, 980)
  fill.position.set(220, 120, 260)
  scene.add(fill)
}

function addGlobalGrid() {
  if (!scene) return
  const grid = new GridHelper(900, 16, 0x25303a, 0x101820)
  grid.position.y = -120
  const gridMaterial = grid.material as Material
  gridMaterial.transparent = true
  gridMaterial.opacity = 0.22
  scene.add(grid)
}

function teardownScene() {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', onResize)
  if (renderer) {
    renderer.domElement.removeEventListener('pointermove', onPointerMove)
    renderer.domElement.removeEventListener('click', onPointerClick)
  }
  controls?.dispose()
  if (graphGroup) disposeObject(graphGroup)
  renderer?.dispose()
  renderer?.domElement.remove()
  haloTexture?.dispose()
  dotTexture?.dispose()
  energyDotTexture?.dispose()
  haloTexture = null
  dotTexture = null
  energyDotTexture = null
  scene = null
  camera = null
  renderer = null
  controls = null
  graphGroup = null
  raycaster = null
  nodeObjects.clear()
  nodePositions.clear()
  energyNodeSprites.clear()
}

function disposeObject(object: Object3D) {
  while (object.children.length) {
    disposeObject(object.children[0])
    object.remove(object.children[0])
  }
  const mesh = object as Mesh
  if (mesh.geometry) mesh.geometry.dispose()
  const material = mesh.material as Material | Material[] | undefined
  if (Array.isArray(material)) material.forEach(item => item.dispose())
  else material?.dispose()
}

function onResize() {
  if (!sceneHost.value || !camera || !renderer) return
  const rect = sceneHost.value.getBoundingClientRect()
  camera.aspect = Math.max(1, rect.width) / Math.max(1, rect.height)
  camera.updateProjectionMatrix()
  renderer.setSize(rect.width, rect.height)
}

function animate() {
  animationFrame = requestAnimationFrame(animate)
  controls?.update()
  updateEnergyNodeSprites()
  updateProjectedLabels()
  if (renderer && scene && camera) renderer.render(scene, camera)
}

function updateScene() {
  if (!graphGroup) return
  while (graphGroup.children.length) {
    const child = graphGroup.children[0]
    disposeObject(child)
    graphGroup.remove(child)
  }
  nodeObjects.clear()
  nodePositions.clear()
  energyNodeSprites.clear()
  graphGroup.scale.setScalar(graphScale.value)

  for (const edge of renderEdges.value) addEdgeObject(edge)
  for (const node of nodes.value) addNodeObject(node)
}

function addNodeObject(node: AtlasNode) {
  if (!graphGroup) return
  const position = scenePoint(node)
  nodePositions.set(node.id, position)

  const size = nodeSize3d(node)
  const color = nodeColor(node)
  const energy = nodeEnergyVisible(node)
  if (!dotTexture) dotTexture = makeDotTexture()
  if (!energyDotTexture) energyDotTexture = makeEnergyDotTexture()
  const dot = new Sprite(new SpriteMaterial({
    map: energy ? energyDotTexture : dotTexture,
    color: nodeSpriteColor(node, color, energy),
    transparent: true,
    opacity: nodeOpacity(node),
    blending: energy ? AdditiveBlending : NormalBlending,
    depthWrite: false,
  }))
  dot.position.copy(position)
  dot.scale.set(size, size, 1)
  dot.userData.nodeId = node.id
  dot.userData.baseSize = size
  dot.userData.energy = energy
  graphGroup.add(dot)
  if (energy) energyNodeSprites.set(node.id, dot)

  const hitRadius = Math.max(size * 2.5, 6)
  const hitGeometry = new SphereGeometry(hitRadius, 8, 6)
  const hitMaterial = new MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  })
  const hitMesh = new Mesh(hitGeometry, hitMaterial)
  hitMesh.position.copy(position)
  hitMesh.userData.nodeId = node.id
  graphGroup.add(hitMesh)
  nodeObjects.set(node.id, hitMesh)

  const halo = nodeHaloOpacity(node)
  if (halo > 0) graphGroup.add(createHaloSprite(position, nodeSpriteColor(node, color, energy), size, halo))
}

function createHaloSprite(
  position: Vector3,
  color: ColorRepresentation,
  size: number,
  opacity: number,
): Sprite {
  if (!haloTexture) haloTexture = makeHaloTexture()
  const material = new SpriteMaterial({
    map: haloTexture,
    color,
    transparent: true,
    opacity,
    blending: AdditiveBlending,
    depthWrite: false,
  })
  const sprite = new Sprite(material)
  sprite.position.copy(position)
  const scale = size * 3.25
  sprite.scale.set(scale, scale, 1)
  return sprite
}

function makeDotTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(30, 29, 1, 32, 32, 27)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.38, 'rgba(255,255,255,0.94)')
    gradient.addColorStop(0.62, 'rgba(255,255,255,0.20)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)

    const glint = ctx.createRadialGradient(24, 23, 0, 24, 23, 12)
    glint.addColorStop(0, 'rgba(255,255,255,0.42)')
    glint.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = glint
    ctx.fillRect(0, 0, 64, 64)
  }
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

function makeEnergyDotTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 96
  canvas.height = 96
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.clearRect(0, 0, 96, 96)

    const halo = ctx.createRadialGradient(48, 48, 5, 48, 48, 46)
    halo.addColorStop(0, 'rgba(255,255,255,0.92)')
    halo.addColorStop(0.28, 'rgba(255,255,255,0.56)')
    halo.addColorStop(0.6, 'rgba(255,255,255,0.12)')
    halo.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = halo
    ctx.fillRect(0, 0, 96, 96)

    ctx.save()
    ctx.translate(48, 48)
    ctx.lineCap = 'round'
    ctx.globalCompositeOperation = 'lighter'
    for (let index = 0; index < 4; index += 1) {
      const radius = 10 + index * 4.6
      ctx.rotate(0.74 + index * 0.8)
      ctx.beginPath()
      ctx.strokeStyle = `rgba(255,255,255,${0.48 - index * 0.08})`
      ctx.lineWidth = Math.max(1.1, 3.2 - index * 0.45)
      ctx.arc(0, 0, radius, 0.05 * Math.PI, (0.92 + index * 0.06) * Math.PI)
      ctx.stroke()
    }
    ctx.restore()

    const core = ctx.createRadialGradient(44, 42, 0, 44, 42, 17)
    core.addColorStop(0, 'rgba(255,255,255,1)')
    core.addColorStop(0.38, 'rgba(255,255,255,0.82)')
    core.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = core
    ctx.fillRect(18, 18, 60, 60)
  }
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

function makeHaloTexture(): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 96
  canvas.height = 96
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(48, 48, 4, 48, 48, 48)
    gradient.addColorStop(0, 'rgba(255,255,255,0.16)')
    gradient.addColorStop(0.18, 'rgba(255,255,255,0.08)')
    gradient.addColorStop(0.52, 'rgba(255,255,255,0.028)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 96, 96)
  }
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

function addEdgeObject(edge: AtlasEdge) {
  if (!graphGroup) return
  const source = nodeById(edge.source)
  const target = nodeById(edge.target)
  if (!source || !target) return
  const start = scenePoint(source)
  const end = scenePoint(target)
  const geometry = new BufferGeometry().setFromPoints([start, end])

  const startIsInner = start.lengthSq() <= end.lengthSq()
  const inner = new Color(0xb46a63)
  const outer = new Color(0x5f7fa6)
  const colors = startIsInner
    ? [inner.r, inner.g, inner.b, outer.r, outer.g, outer.b]
    : [outer.r, outer.g, outer.b, inner.r, inner.g, inner.b]
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

  const material = new LineBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: edgeOpacity(edge),
    depthWrite: false,
  })
  const line = new Line(geometry, material)
  line.userData.edgeId = edge.id
  graphGroup.add(line)
}

function scenePoint(node: AtlasNode): Vector3 {
  const x = (node.layout.x || 0) * 0.56
  const z = (node.layout.y || 0) * 0.56
  const y = (node.layout.z || 0) * 0.56
  return new Vector3(x, y, z)
}

function nodeSize3d(node: AtlasNode): number {
  const active = store.selectedId === node.id || store.hoveredId === node.id
  const boost = active ? 1.22 : 1
  if (node.type === 'root') return 3.8 * boost
  if (node.type === 'lifeline') return (isFallbackNode(node) ? 1.8 : 2.65) * boost
  if (node.type === 'cluster') return (isFallbackNode(node) ? 1.55 : 2.15) * boost
  if (node.type === 'decision') return 1.9 * boost
  if (node.type === 'task' || node.type === 'memory') return 1.7 * boost
  return 0.95 * boost
}

function nodeColor(node: AtlasNode): ColorRepresentation {
  if (isFallbackNode(node)) return 0x46505b
  const colors: Record<string, number> = {
    root: 0xd8fffb,
    lifeline: 0x72c3b2,
    cluster: 0x7d92aa,
    memory: 0x72839a,
    task: 0x72a996,
    decision: 0x8b7aa8,
    item: 0x596270,
  }
  return colors[node.type] || 0x77808f
}

function nodeEnergyVisible(node: AtlasNode): boolean {
  return node.type === 'root' || store.selectedId === node.id || store.hoveredId === node.id
}

function nodeSpriteColor(
  node: AtlasNode,
  baseColor: ColorRepresentation,
  energy: boolean,
): ColorRepresentation {
  if (!energy) return baseColor
  if (node.type === 'root' || store.selectedId === node.id || store.hoveredId === node.id) return 0xf4b15e
  return baseColor
}

function updateEnergyNodeSprites() {
  if (!energyNodeSprites.size) return
  const time = performance.now() * 0.001
  for (const [id, sprite] of energyNodeSprites) {
    const material = sprite.material as SpriteMaterial
    const active = store.selectedId === id || store.hoveredId === id
    material.rotation = time * (active ? 0.72 : 0.18)
    const baseSize = Number(sprite.userData.baseSize || 1)
    const phase = energyPhase(id)
    const pulse = 1 + Math.sin(time * (active ? 2.4 : 1.2) + phase) * (active ? 0.075 : 0.028)
    sprite.scale.set(baseSize * pulse, baseSize * pulse, 1)
  }
}

function energyPhase(id: string): number {
  let hash = 0
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) >>> 0
  }
  return (hash % 628) / 100
}

function nodeOpacity(node: AtlasNode): number {
  const fallback = isFallbackNode(node)
  if (!store.selectedId && !store.hoveredId) return fallback ? 0.34 : 0.92
  return relatedIds.value.has(node.id) ? (fallback ? 0.58 : 1) : 0.14
}

function edgeOpacity(edge: AtlasEdge): number {
  const hasFocus = Boolean(store.selectedId || store.hoveredId)
  if (edge.relation_type === 'ambient_context') return hasFocus ? 0.022 : 0.082
  if (!hasFocus) return edge.edge_class === 'structural' ? Math.min(edge.opacity, 0.105) : Math.min(edge.opacity, 0.36)
  return relatedEdgeIds.value.has(edge.id) ? Math.min(0.58, edge.opacity + 0.22) : Math.min(edge.opacity, 0.045)
}

function labelVisible(node: AtlasNode): boolean {
  if (store.selectedId === node.id || store.hoveredId === node.id) return true
  if (isFallbackNode(node) && node.type !== 'lifeline') return false
  if (store.lod === 'structure') return node.layer <= 3 && node.visible_label
  if (store.lod === 'semantic') return node.layer <= 2 || (node.layer === 3 && node.weight >= 0.9)
  if (store.lod === 'tags') return node.layer <= 2
  if (store.lod === 'relations') return node.layer <= 2 || (node.layer === 3 && node.weight >= 0.72)
  return node.layer <= 1
}

function nodeHaloOpacity(node: AtlasNode): number {
  if (store.selectedId === node.id) return 0.26
  if (store.hoveredId === node.id) return 0.22
  if (node.type === 'root') return 0.055
  if (node.weight >= 0.94 && !isFallbackNode(node)) return 0.026
  return 0
}

function isFallbackNode(node: AtlasNode): boolean {
  return Boolean(node.meta?.fallback_bucket || node.id === 'lifeline:uncategorized' || node.lifeline_id === 'lifeline:uncategorized')
}

function updateProjectedLabels() {
  if (!camera || !sceneHost.value) return
  const rect = sceneHost.value.getBoundingClientRect()
  const labels: ProjectedLabel[] = []
  for (const node of nodes.value) {
    if (!labelVisible(node)) continue
    const position = nodePositions.get(node.id)
    if (!position) continue
    const projected = position.clone().multiplyScalar(graphScale.value).project(camera)
    if (projected.z < -1 || projected.z > 1) continue
    labels.push({
      id: node.id,
      label: shortLabel(node.label, node.layer <= 2 ? 12 : 18),
      type: node.type,
      x: (projected.x * 0.5 + 0.5) * rect.width,
      y: (-projected.y * 0.5 + 0.5) * rect.height + 12,
      muted: nodeOpacity(node) < 0.5,
    })
  }
  projectedLabels.value = labels
}

function onPointerMove(event: PointerEvent) {
  const hit = pickNode(event)
  store.hoveredId = hit?.id || null
}

function onPointerClick(event: MouseEvent) {
  const hit = pickNode(event)
  if (hit) enterFocus(hit)
  else clearSelection()
}

function pickNode(event: PointerEvent | MouseEvent): AtlasNode | null {
  if (!renderer || !camera || !raycaster) return null
  const rect = renderer.domElement.getBoundingClientRect()
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  const intersects = raycaster.intersectObjects(Array.from(nodeObjects.values()), false)
  const id = intersects[0]?.object.userData.nodeId
  return id ? nodeById(id) || null : null
}

function localEdgeVisible(edge: AtlasEdge, center: AtlasNode): boolean {
  const other = nodeById(edge.source === center.id ? edge.target : edge.source)
  if (!other) return false
  if (edge.edge_class === 'structural') return true
  const layerDelta = Math.abs(center.layer - other.layer)
  if (!edge.evidence || edge.confidence < 0.45) return false
  if (layerDelta === 0) return edge.strength >= 0.6
  if (layerDelta === 1) return edge.strength >= 0.82
  return ['causal', 'tension', 'contradicts'].includes(edge.relation_type) && edge.strength >= 0.88
}

function localContextEdgeVisible(edge: AtlasEdge, source: AtlasNode, target: AtlasNode): boolean {
  if (edge.edge_class === 'structural') return edge.strength >= 0.85 && source.layer <= 3 && target.layer <= 3
  const layerDelta = Math.abs(source.layer - target.layer)
  if (!edge.evidence || edge.confidence < 0.68) return false
  if (layerDelta === 0) return edge.strength >= 0.7
  if (layerDelta === 1) return edge.strength >= 0.84
  return ['causal', 'tension', 'contradicts', 'supports', 'next_action'].includes(edge.relation_type) && edge.strength >= 0.88
}

function localPrimaryDistance(edge: AtlasEdge, node: AtlasNode, center: AtlasNode): number {
  const layerDelta = Math.abs(node.layer - center.layer)
  if (center.type === 'root' && node.layer <= 1) {
    const strengthOffset = (1 - edge.strength) * 30
    const activityOffset = (1 - node.weight) * 16
    return Math.max(26, Math.min(74, 46 + strengthOffset + activityOffset - edge.confidence * 12))
  }
  const layerBase = edge.edge_class === 'structural' ? 82 : layerDelta === 0 ? 58 : 70
  const strengthOffset = (1 - edge.strength) * 50
  const activityOffset = (1 - node.weight) * 26
  return Math.max(34, Math.min(132, layerBase + strengthOffset + activityOffset - edge.confidence * 18))
}

function localNodeRadius(node: AtlasNode, role: LocalNode['role']): number {
  if (role === 'center') return node.type === 'root' ? 4.8 : 4.2
  if (node.type === 'root') return 4.1
  if (node.type === 'lifeline') return role === 'primary' ? 3.25 : 2.7
  if (node.type === 'cluster') return role === 'primary' ? 2.65 : 2.2
  if (node.type === 'decision') return role === 'primary' ? 2.45 : 2.05
  if (node.type === 'task' || node.type === 'memory') return role === 'primary' ? 2.25 : 1.85
  return role === 'primary' ? 1.45 : 1.15
}

function localLabelVisible(entry: LocalNode): boolean {
  if (entry.role === 'center') return true
  if (entry.role === 'secondary') return entry.node.weight >= 0.9
  return entry.node.layer <= 2 || entry.node.weight >= 0.78
}

function localEdgePath(entry: LocalEdge): string {
  const source = localNodeById.value.get(entry.edge.source)
  const target = localNodeById.value.get(entry.edge.target)
  if (!source || !target) return ''
  return `M ${source.x} ${source.y} L ${target.x} ${target.y}`
}

function localGradient(entry: LocalEdge): { x1: number, y1: number, x2: number, y2: number } {
  const center = store.selectedNode
  const source = localNodeById.value.get(entry.edge.source)
  const target = localNodeById.value.get(entry.edge.target)
  if (!center || !source || !target) return { x1: 0, y1: 0, x2: 0, y2: 0 }
  const sourceDistance = source.x * source.x + source.y * source.y
  const targetDistance = target.x * target.x + target.y * target.y
  if (sourceDistance <= targetDistance) return { x1: source.x, y1: source.y, x2: target.x, y2: target.y }
  return { x1: target.x, y1: target.y, x2: source.x, y2: source.y }
}

function localEdgeClass(entry: LocalEdge): Record<string, boolean> {
  return {
    structural: entry.edge.edge_class === 'structural',
    semantic: entry.edge.edge_class === 'semantic',
    primary: entry.role === 'primary',
    secondary: entry.role === 'secondary',
  }
}
</script>

<template>
  <section class="atlas-view" :class="{ 'focus-active': focusMode }">
    <div ref="sceneHost" class="atlas-scene" data-testid="atlas-3d-scene" />

    <div v-if="!focusMode" class="label-layer" aria-hidden="true">
      <span
        v-for="label in projectedLabels"
        :key="label.id"
        class="scene-label"
        :class="[`type-${label.type}`, { muted: label.muted }]"
        :style="{ transform: `translate(${label.x}px, ${label.y}px)` }"
      >{{ label.label }}</span>
    </div>

    <div v-if="!focusMode" class="atlas-toolbar">
      <div class="toolbar-title">
        <span class="mark" />
        <span>Atlas v1</span>
        <em>3D 全局</em>
      </div>
        <div class="segmented atlas-tabs">
          <button :class="{ active: store.lod === 'overview' }" @click="store.lod = 'overview'">总览</button>
          <button :class="{ active: store.lod === 'semantic' }" @click="store.lod = 'semantic'">语义</button>
          <button :class="{ active: store.lod === 'tags' }" @click="store.lod = 'tags'">标签</button>
          <button :class="{ active: store.lod === 'structure' }" @click="store.lod = 'structure'">结构</button>
          <button :class="{ active: store.lod === 'relations' }" @click="store.lod = 'relations'">关系</button>
        </div>
      <input v-model.number="graphScale" class="zoom-range" type="range" min="0.72" max="1.5" step="0.04" />
      <button class="icon-btn" title="重置视角" @click="resetCamera">⌖</button>
      <button class="icon-btn" title="刷新" @click="reload">↻</button>
    </div>

    <div v-if="store.loading || !sceneReady" class="atlas-state">
      <div class="loader-ring" />
      <span>加载 Atlas</span>
    </div>
    <div v-else-if="store.error" class="atlas-state">
      <span>{{ store.error }}</span>
      <button class="retry-btn" @click="reload">重试</button>
    </div>

    <aside v-if="!focusMode" class="atlas-panel">
      <template v-if="store.selectedNode">
        <div class="panel-kicker">{{ typeLabel(store.selectedNode.type) }} · L{{ store.selectedNode.layer }}</div>
        <h2>{{ store.selectedNode.label }}</h2>
        <p v-if="store.selectedNode.summary" class="summary">{{ store.selectedNode.summary }}</p>
        <div class="metric-grid">
          <div><span>权重</span><strong>{{ Math.round(store.selectedNode.weight * 100) }}%</strong></div>
          <div><span>关联</span><strong>{{ store.focusedEdges.length }}</strong></div>
          <div><span>层级</span><strong>{{ store.selectedNode.semantic_level }}</strong></div>
        </div>
        <button class="focus-btn" @click="focusMode = true">进入 2D 局部图</button>
      </template>
      <template v-else>
        <div class="panel-kicker">全局图谱</div>
        <h2>3D Skeleton Atlas</h2>
        <div class="metric-grid">
          <div><span>节点</span><strong>{{ store.data?.view.node_count || 0 }}</strong></div>
          <div><span>边</span><strong>{{ store.data?.view.edge_count || 0 }}</strong></div>
          <div><span>隐藏</span><strong>{{ (store.data?.view.hidden_nodes || 0) + (store.data?.view.hidden_edges || 0) }}</strong></div>
        </div>
        <div v-if="store.data?.view.unclassified_count" class="fallback-note">
          未归类 {{ store.data.view.unclassified_count }} · 隐藏 {{ store.data.view.hidden_unclassified_items || 0 }}
        </div>
        <div class="type-breakdown">
          <span v-for="(count, type) in typeStats" :key="type">{{ typeLabel(type) }} {{ count }}</span>
        </div>
      </template>
    </aside>

    <section v-if="focusMode && store.selectedNode" class="local-atlas" data-testid="local-atlas-2d">
      <div class="local-toolbar">
        <button class="back-btn" @click="exitFocus">返回 3D</button>
        <div>
          <span>2D Local Atlas</span>
          <strong>{{ store.selectedNode.label }}</strong>
        </div>
      </div>

      <svg class="local-map" viewBox="-360 -260 720 520" preserveAspectRatio="xMidYMid meet" @click="clearSelection">
        <defs>
          <linearGradient
            v-for="entry in localEdges"
            :id="`local-grad-${entry.edge.id}`"
            :key="'local-grad-' + entry.edge.id"
            gradientUnits="userSpaceOnUse"
            v-bind="localGradient(entry)"
          >
            <stop offset="0%" stop-color="#b46a63" />
            <stop offset="100%" stop-color="#5f7fa6" />
          </linearGradient>
        </defs>
        <g class="local-grid">
          <circle cx="0" cy="0" r="54" />
          <circle cx="0" cy="0" r="104" />
          <line x1="-300" y1="0" x2="300" y2="0" />
          <line x1="0" y1="-210" x2="0" y2="210" />
        </g>
        <g class="local-edges">
          <path
            v-for="entry in localEdges"
            :key="entry.edge.id"
            :d="localEdgePath(entry)"
            :class="localEdgeClass(entry)"
            :stroke="`url(#local-grad-${entry.edge.id})`"
            :stroke-width="entry.role === 'primary' ? Math.min(1.25, Math.max(0.75, entry.edge.width * 0.68)) : Math.min(0.68, Math.max(0.32, entry.edge.width * 0.38))"
            :stroke-opacity="entry.role === 'primary' ? Math.min(0.52, entry.edge.opacity + 0.1) : Math.min(0.22, entry.edge.opacity * 0.42)"
          />
        </g>
        <g class="local-nodes">
          <g
            v-for="entry in localNodes"
            :key="entry.node.id"
            class="local-node"
            :class="[`type-${entry.node.type}`, `role-${entry.role}`]"
            :transform="`translate(${entry.x}, ${entry.y})`"
            @click.stop="selectLocalNode(entry.node)"
          >
            <circle class="local-hit" :r="entry.radius + 11" />
            <circle v-if="entry.role === 'center' || entry.node.weight > 0.88" class="local-halo" :r="entry.radius + 4" />
            <circle class="local-core" :r="entry.radius" />
            <text v-if="localLabelVisible(entry)" :y="entry.radius + 14" text-anchor="middle">{{ shortLabel(entry.node.label, entry.role === 'center' ? 18 : 12) }}</text>
          </g>
        </g>
      </svg>

      <aside class="local-panel">
        <div class="panel-kicker">{{ typeLabel(store.selectedNode.type) }} · Local Focus</div>
        <h2>{{ store.selectedNode.label }}</h2>
        <p v-if="store.selectedNode.summary" class="summary">{{ store.selectedNode.summary }}</p>
        <div class="metric-grid">
          <div><span>节点</span><strong>{{ localNodes.length }}</strong></div>
          <div><span>边</span><strong>{{ primaryLocalEdges.length }}+{{ secondaryLocalEdges.length }}</strong></div>
          <div><span>权重</span><strong>{{ Math.round(store.selectedNode.weight * 100) }}%</strong></div>
        </div>
        <div v-if="localRelationRows.length > 0" class="relation-list">
          <button
            v-for="edge in localRelationRows"
            :key="edge.id"
            class="relation-row"
            @click="store.selectNeighbor(edge)"
          >
            <span>{{ relationLabel(edge.relation_type) }}</span>
            <strong>{{ Math.round(edge.confidence * 100) }}%</strong>
            <small>{{ nodeById(edge.source === store.selectedId ? edge.target : edge.source)?.label }}</small>
            <em v-if="edge.evidence">{{ edge.evidence }}</em>
          </button>
        </div>
      </aside>
    </section>
  </section>
</template>

<style scoped>
.atlas-view {
  position: fixed;
  inset: 0;
  z-index: 10;
  overflow: hidden;
  color: var(--text-2);
  background: #07090d;
}

.atlas-scene {
  position: absolute;
  inset: 0;
}

.atlas-scene :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.label-layer {
  position: absolute;
  inset: 0;
  z-index: 18;
  pointer-events: none;
}

.scene-label {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--text-2);
  font-size: 10px;
  font-weight: 520;
  text-shadow: 0 1px 6px #07090d, 0 0 2px #07090d;
  white-space: nowrap;
  opacity: 0.78;
}

.scene-label.muted {
  opacity: 0.24;
}

.scene-label.type-root,
.scene-label.type-lifeline,
.scene-label.type-cluster {
  color: var(--text-1);
}

.atlas-toolbar,
.atlas-panel,
.local-toolbar,
.local-panel {
  background: var(--glass-bg);
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-1);
}

.atlas-toolbar {
  position: absolute;
  top: var(--s-4);
  left: var(--s-4);
  z-index: 32;
  display: flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-2);
}

.toolbar-title {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--text-1);
  font-size: var(--fs-3);
  font-weight: 600;
}

.toolbar-title em {
  color: var(--text-4);
  font-size: var(--fs-1);
  font-style: normal;
  font-weight: 500;
}

.mark {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 14px var(--accent-glow);
}

.segmented,
.edge-toggles {
  display: flex;
  gap: 2px;
  padding: 2px;
  background: var(--surface-0);
  border-radius: var(--r-1);
  border: 1px solid var(--line-1);
}

.atlas-tabs {
  flex-wrap: wrap;
}

.segmented button,
.edge-toggles button,
.icon-btn,
.retry-btn,
.focus-btn,
.back-btn {
  min-height: 28px;
  border: 1px solid transparent;
  border-radius: var(--r-1);
  background: transparent;
  color: var(--text-3);
  font-size: var(--fs-2);
  padding: 0 var(--s-2);
  cursor: pointer;
}

.segmented button.active,
.edge-toggles button.active {
  color: var(--text-1);
  background: var(--surface-3);
  border-color: var(--line-2);
}

.icon-btn {
  width: 30px;
  padding: 0;
  background: var(--surface-1);
  border-color: var(--line-2);
}

.zoom-range {
  width: 120px;
  accent-color: var(--accent);
}

.atlas-panel {
  position: absolute;
  top: 72px;
  right: var(--s-4);
  z-index: 31;
  width: min(340px, calc(100vw - 32px));
  max-height: calc(100vh - 96px);
  overflow: auto;
  padding: var(--s-3);
}

.panel-kicker {
  color: var(--text-4);
  font-size: var(--fs-1);
  margin-bottom: var(--s-1);
}

.atlas-panel h2,
.local-panel h2 {
  margin: 0;
  color: var(--text-1);
  font-size: var(--fs-6);
  line-height: var(--lh-tight);
}

.summary {
  margin: var(--s-2) 0 0;
  color: var(--text-3);
  font-size: var(--fs-3);
  line-height: var(--lh-base);
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s-2);
  margin-top: var(--s-3);
}

.metric-grid div {
  min-width: 0;
  padding: var(--s-2);
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid var(--line-1);
  border-radius: var(--r-1);
}

.metric-grid span,
.metric-grid strong {
  display: block;
}

.metric-grid span {
  color: var(--text-4);
  font-size: var(--fs-1);
}

.metric-grid strong {
  margin-top: 2px;
  color: var(--text-1);
  font-size: var(--fs-3);
  overflow-wrap: anywhere;
}

.focus-btn,
.back-btn {
  margin-top: var(--s-3);
  color: var(--surface-0);
  background: var(--accent);
}

.fallback-note {
  margin-top: var(--s-2);
  color: var(--text-4);
  font-size: var(--fs-1);
}

.type-breakdown {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-1);
  margin-top: var(--s-3);
}

.type-breakdown span {
  border: 1px solid var(--line-1);
  border-radius: var(--r-pill);
  color: var(--text-3);
  font-size: var(--fs-1);
  padding: 3px var(--s-2);
}

.atlas-state {
  position: absolute;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--s-2);
  background: rgba(7, 9, 13, 0.76);
  color: var(--text-3);
  font-size: var(--fs-3);
}

.loader-ring {
  width: 26px;
  height: 26px;
  border: 2px solid var(--text-5);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.local-atlas {
  position: absolute;
  inset: 0;
  z-index: 40;
  overflow: hidden;
  background:
    linear-gradient(rgba(255, 255, 255, 0.026) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    rgba(7, 9, 13, 0.94);
  background-size: 48px 48px, 48px 48px, auto;
}

.local-toolbar {
  position: absolute;
  top: var(--s-4);
  left: var(--s-4);
  z-index: 45;
  display: flex;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-2) var(--s-3);
}

.local-toolbar div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.local-toolbar span {
  color: var(--text-4);
  font-size: var(--fs-1);
}

.local-toolbar strong {
  color: var(--text-1);
  font-size: var(--fs-3);
  overflow-wrap: anywhere;
}

.local-map {
  width: 100%;
  height: 100%;
  display: block;
}

.local-grid circle,
.local-grid line,
.local-edges path {
  fill: none;
}

.local-grid circle,
.local-grid line {
  stroke: rgba(255, 255, 255, 0.04);
  stroke-width: 0.7;
}

.local-grid circle {
  opacity: 0.22;
}

.local-grid line {
  opacity: 0.5;
}

.local-edges path {
  stroke-linecap: round;
}

.local-edges path.structural {
  stroke-dasharray: 4 7;
}

.local-edges path.secondary {
  stroke-dasharray: 2 7;
}

.local-node {
  cursor: pointer;
}

.local-hit {
  fill: transparent;
}

.local-core {
  stroke: rgba(255, 255, 255, 0.22);
  stroke-width: 0.75;
}

.local-halo {
  fill: rgba(112, 195, 178, 0.07);
  stroke: rgba(180, 106, 99, 0.11);
  stroke-width: 0.7;
}

.local-node.role-center .local-core {
  stroke-width: 1.1;
  filter: drop-shadow(0 0 8px rgba(110, 231, 208, 0.18));
}

.local-node.role-secondary {
  opacity: 0.66;
}

.local-node.type-root .local-core { fill: #d8fffb; }
.local-node.type-lifeline .local-core { fill: #6fb8a8; }
.local-node.type-cluster .local-core { fill: #566f8a; }
.local-node.type-memory .local-core { fill: #72839a; }
.local-node.type-task .local-core { fill: #72a996; }
.local-node.type-decision .local-core { fill: #8b7aa8; }
.local-node.type-item .local-core { fill: #596270; }

.local-node text {
  fill: var(--text-2);
  font-size: 10px;
  paint-order: stroke;
  stroke: rgba(7, 9, 13, 0.94);
  stroke-width: 3px;
  pointer-events: none;
}

.local-node.role-center text {
  fill: var(--text-1);
  font-size: 12px;
  font-weight: 650;
}

.local-node.role-secondary text {
  fill: var(--text-4);
  font-size: 9px;
}

.local-panel {
  position: absolute;
  top: 72px;
  right: var(--s-4);
  z-index: 45;
  width: min(360px, calc(100vw - 32px));
  max-height: calc(100vh - 96px);
  overflow: auto;
  padding: var(--s-3);
}

.relation-list {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
  margin-top: var(--s-3);
}

.relation-row {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: var(--s-1);
  width: 100%;
  text-align: left;
  border: 1px solid var(--line-1);
  border-radius: var(--r-1);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-2);
  padding: var(--s-2);
  cursor: pointer;
}

.relation-row:hover {
  border-color: var(--line-3);
  background: rgba(255, 255, 255, 0.055);
}

.relation-row span {
  color: #b46a63;
  font-size: var(--fs-1);
}

.relation-row strong {
  color: #5f7fa6;
  font-size: var(--fs-1);
}

.relation-row small {
  color: var(--text-2);
  font-size: var(--fs-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.relation-row em {
  grid-column: 1 / -1;
  color: var(--text-4);
  font-size: var(--fs-1);
  font-style: normal;
  line-height: var(--lh-base);
}

@media (max-width: 760px) {
  .atlas-toolbar {
    top: calc(var(--s-4) + 48px);
    right: var(--s-3);
    left: var(--s-3);
    flex-wrap: wrap;
  }

  .zoom-range {
    width: 100%;
  }

  .atlas-panel,
  .local-panel {
    top: auto;
    right: var(--s-3);
    bottom: calc(var(--s-3) + 76px);
    left: var(--s-3);
    width: auto;
    max-height: 30vh;
  }

  .local-toolbar {
    top: calc(var(--s-4) + 48px);
    right: var(--s-3);
    left: var(--s-3);
  }
}
</style>

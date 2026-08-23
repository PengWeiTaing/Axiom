<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  PerspectiveCamera,
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
import { ArrowLeft, ArrowUpRight, Crosshair, RefreshCw } from '@lucide/vue'
import { useAtlasGraphStore } from '@/stores/atlasGraph'
import { listenToElementEvent, useWindowEventListener } from '@/composables/useEventListener'
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
  priority: number
}

interface NodeVisual {
  node: AtlasNode
  dot: Sprite
  halo: Sprite
  hit: Mesh
}

const store = useAtlasGraphStore()
const sceneHost = ref<HTMLElement | null>(null)
const sceneReady = ref(false)
const graphScale = ref(1)
const focusMode = ref(false)
const projectedLabels = ref<ProjectedLabel[]>([])
const selectedRelationId = ref<string | null>(null)
const viewportWidth = ref(typeof window === 'undefined' ? 1440 : window.innerWidth)

const nodes = computed(() => store.data?.nodes || [])
const edges = computed(() => store.visibleEdges || [])
const renderEdges = computed<AtlasEdge[]>(() => edges.value)
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
const nodeVisuals = new Map<string, NodeVisual>()
const edgeObjects = new Map<string, Line>()
const energyNodeSprites = new Map<string, Sprite>()
let haloTexture: CanvasTexture | null = null
let dotTexture: CanvasTexture | null = null
let energyDotTexture: CanvasTexture | null = null
let hasFittedScene = false
const stopCanvasListeners: Array<() => void> = []

onMounted(async () => {
  await store.load()
  await nextTick()
  initScene()
})

onUnmounted(() => {
  teardownScene()
})

useWindowEventListener('resize', onResize)

watch(
  () => [
    store.data,
    renderEdges.value.length,
    store.lod,
    store.showSemantic,
    store.showStructural,
    graphScale.value,
  ],
  () => {
    updateScene()
    if (!hasFittedScene && nodes.value.length) {
      requestAnimationFrame(() => fitCameraToGraph())
    }
  },
  { deep: true },
)

watch(
  () => [store.selectedId, store.hoveredId],
  () => refreshVisualState(),
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
    .sort((a, b) => {
      const classOrder = Number(b.edge_class === 'semantic') - Number(a.edge_class === 'semantic')
      return classOrder || b.confidence - a.confidence || b.strength - a.strength
    })
)

const selectedLocalRelation = computed(() => {
  if (!localRelationRows.value.length) return null
  return localRelationRows.value.find(edge => edge.id === selectedRelationId.value) || localRelationRows.value[0]
})

const localNodes = computed<LocalNode[]>(() => {
  const center = store.selectedNode
  if (!center) return []
  const result: LocalNode[] = [{ node: center, x: -48, y: 0, radius: localNodeRadius(center, 'center'), role: 'center' }]
  const placed = new Set<string>([center.id])
  const primaryCandidates = primaryLocalEdges.value
    .map(entry => {
      const id = entry.edge.source === center.id ? entry.edge.target : entry.edge.source
      return { edge: entry, node: nodeById(id) }
    })
    .filter((entry): entry is { edge: LocalEdge, node: AtlasNode } => Boolean(entry.node))
    .sort((a, b) => b.edge.edge.strength - a.edge.edge.strength || a.node.id.localeCompare(b.node.id))

  const primary = primaryCandidates.filter(entry => {
    if (placed.has(entry.node.id)) return false
    placed.add(entry.node.id)
    return true
  })

  primary.forEach((entry, index) => {
    const distance = localPrimaryDistance(entry.edge.edge, entry.node, center)
    const angle = seededAngle(entry.node.id, index)
    result.push({
      node: entry.node,
      x: -48 + Math.cos(angle) * distance,
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
      const angle = Math.atan2(anchor.y, anchor.x + 48) + seededOffset(node.id)
      const distance = 32 + (1 - entry.edge.strength) * 38
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

  relaxLocalLayout(result, localEdges.value, center.id)
  return result
})

const localViewBox = computed(() => {
  if (!localNodes.value.length) return '-170 -150 340 300'

  const bounds = localNodes.value.reduce(
    (current, entry) => ({
      minX: Math.min(current.minX, entry.x - entry.radius),
      maxX: Math.max(current.maxX, entry.x + entry.radius),
      minY: Math.min(current.minY, entry.y - entry.radius),
      maxY: Math.max(current.maxY, entry.y + entry.radius + (localLabelVisible(entry) ? 18 : 0)),
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
  )
  const centerX = (bounds.minX + bounds.maxX) / 2
  const centerY = (bounds.minY + bounds.maxY) / 2
  const compact = viewportWidth.value <= 760
  const width = Math.max(compact ? 310 : 640, bounds.maxX - bounds.minX + (compact ? 112 : 180))
  const height = Math.max(compact ? 290 : 500, bounds.maxY - bounds.minY + (compact ? 104 : 160))

  return `${centerX - width / 2} ${centerY - height / 2} ${width} ${height}`
})

function seededAngle(id: string, index: number): number {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  return -Math.PI / 2 + index * goldenAngle + seededUnit(id) * 0.38
}

function seededOffset(id: string): number {
  return (seededUnit(id) - 0.5) * 1.25
}

function seededUnit(id: string): number {
  let hash = 2166136261
  for (let index = 0; index < id.length; index += 1) {
    hash ^= id.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0) / 4294967295
}

function relaxLocalLayout(layout: LocalNode[], layoutEdges: LocalEdge[], centerId: string) {
  if (layout.length <= 2) return
  const byId = new Map(layout.map(entry => [entry.node.id, entry]))
  const movable = layout.filter(entry => entry.node.id !== centerId)

  for (let iteration = 0; iteration < 96; iteration += 1) {
    const force = new Map(movable.map(entry => [entry.node.id, { x: 0, y: 0 }]))

    for (let leftIndex = 0; leftIndex < movable.length; leftIndex += 1) {
      const left = movable[leftIndex]
      for (let rightIndex = leftIndex + 1; rightIndex < movable.length; rightIndex += 1) {
        const right = movable[rightIndex]
        let dx = right.x - left.x
        let dy = right.y - left.y
        let distance = Math.hypot(dx, dy)
        if (distance < 0.01) {
          dx = seededUnit(left.node.id) - 0.5
          dy = seededUnit(right.node.id) - 0.5
          distance = Math.max(0.01, Math.hypot(dx, dy))
        }
        const comfort = 30 + (left.radius + right.radius) * 2.4
        if (distance >= comfort * 2.1) continue
        const push = Math.min(2.4, (comfort * 2.1 - distance) * 0.016)
        const nx = dx / distance
        const ny = dy / distance
        force.get(left.node.id)!.x -= nx * push
        force.get(left.node.id)!.y -= ny * push
        force.get(right.node.id)!.x += nx * push
        force.get(right.node.id)!.y += ny * push
      }
    }

    for (const entry of layoutEdges) {
      const source = byId.get(entry.edge.source)
      const target = byId.get(entry.edge.target)
      if (!source || !target) continue
      const dx = target.x - source.x
      const dy = target.y - source.y
      const distance = Math.max(0.01, Math.hypot(dx, dy))
      const centerLinked = source.node.id === centerId || target.node.id === centerId
      const other = source.node.id === centerId ? target.node : source.node
      const desired = centerLinked
        ? localPrimaryDistance(entry.edge, other, byId.get(centerId)!.node)
        : 38 + (1 - entry.edge.strength) * 42
      const pull = (distance - desired) * (entry.role === 'primary' ? 0.026 : 0.014)
      const nx = dx / distance
      const ny = dy / distance
      if (source.node.id !== centerId) {
        force.get(source.node.id)!.x += nx * pull
        force.get(source.node.id)!.y += ny * pull
      }
      if (target.node.id !== centerId) {
        force.get(target.node.id)!.x -= nx * pull
        force.get(target.node.id)!.y -= ny * pull
      }
    }

    const cooling = 0.56 - iteration / 260
    for (const entry of movable) {
      const next = force.get(entry.node.id)!
      next.x += (-48 - entry.x) * 0.0014
      next.y += -entry.y * 0.0014
      entry.x += Math.max(-3.2, Math.min(3.2, next.x)) * cooling
      entry.y += Math.max(-3.2, Math.min(3.2, next.y)) * cooling
      const dx = entry.x + 48
      const dy = entry.y
      const radius = Math.hypot(dx, dy)
      if (radius > 214) {
        entry.x = -48 + dx / radius * 214
        entry.y = dy / radius * 214
      }
    }
  }
}

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
  hasFittedScene = false
  store.load(true)
}

function enterFocus(node: AtlasNode) {
  store.selectNode(node)
  selectedRelationId.value = null
  focusMode.value = true
}

function exitFocus() {
  focusMode.value = false
  selectedRelationId.value = null
}

function clearSelection() {
  store.selectNode(null)
  focusMode.value = false
}

function selectLocalNode(node: AtlasNode) {
  store.selectNode(node)
  selectedRelationId.value = null
  focusMode.value = true
}

function inspectLocalRelation(edge: AtlasEdge) {
  selectedRelationId.value = edge.id
}

function relationTarget(edge: AtlasEdge): AtlasNode | undefined {
  return nodeById(edge.source === store.selectedId ? edge.target : edge.source)
}

function navigateRelation(edge: AtlasEdge) {
  store.selectNeighbor(edge)
  selectedRelationId.value = null
}

function relationOriginLabel(edge: AtlasEdge): string {
  if (edge.edge_class === 'structural') return '结构归属'
  if (edge.generated_by === 'associations') return '关系库'
  if (edge.generated_by === 'rule') return '规则推断'
  if (edge.generated_by === 'manual') return '人工确认'
  return '系统关系'
}

function resetCamera() {
  fitCameraToGraph(true)
}

function fitCameraToGraph(force = false) {
  if (!camera || !controls || nodePositions.size === 0 || (!force && hasFittedScene)) return
  const primaryNodes = nodes.value.filter(node => !isFallbackNode(node))
  const framingNodes = primaryNodes.length > 1 ? primaryNodes : nodes.value
  const points = framingNodes
    .map(node => nodePositions.get(node.id))
    .filter((point): point is Vector3 => Boolean(point))
    .map(point => point.clone().multiplyScalar(graphScale.value))
  if (!points.length) return
  const center = points.reduce((sum, point) => sum.add(point), new Vector3()).multiplyScalar(1 / points.length)
  let radius = 1
  for (const point of points) radius = Math.max(radius, point.distanceTo(center))

  const verticalFov = camera.fov * Math.PI / 180
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect)
  const limitingFov = Math.min(verticalFov, horizontalFov)
  const distance = Math.max(112, radius / Math.sin(limitingFov / 2) * 0.94)
  const direction = new Vector3(0.72, 0.46, 1).normalize()

  controls.target.copy(center)
  camera.position.copy(center).add(direction.multiplyScalar(distance))
  camera.lookAt(center)
  controls.minDistance = Math.max(54, radius * 0.46)
  controls.maxDistance = Math.max(520, radius * 4.5)
  controls.update()
  hasFittedScene = true
}

function initScene() {
  if (!sceneHost.value || renderer) return
  scene = new Scene()
  scene.background = new Color(0x08090c)
  graphGroup = new Group()
  scene.add(graphGroup)

  const host = sceneHost.value
  const rect = host.getBoundingClientRect()
  camera = new PerspectiveCamera(45, Math.max(1, rect.width) / Math.max(1, rect.height), 0.1, 4000)
  camera.position.set(0, 120, 280)
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
  controls.minDistance = 54
  controls.maxDistance = 780
  controls.enablePan = false

  raycaster = new Raycaster()
  listenCanvasEvent('pointermove', onPointerMove)
  listenCanvasEvent('click', onPointerClick)

  updateScene()
  requestAnimationFrame(() => fitCameraToGraph())
  sceneReady.value = true
  animate()
}

function teardownScene() {
  cancelAnimationFrame(animationFrame)
  stopCanvasEventListeners()
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
  nodeVisuals.clear()
  edgeObjects.clear()
  energyNodeSprites.clear()
  hasFittedScene = false
}

function listenCanvasEvent<K extends keyof HTMLElementEventMap>(
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
) {
  const canvas = renderer?.domElement
  if (!canvas) return
  stopCanvasListeners.push(listenToElementEvent(canvas, type, listener))
}

function stopCanvasEventListeners() {
  while (stopCanvasListeners.length) {
    stopCanvasListeners.pop()?.()
  }
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
  viewportWidth.value = window.innerWidth
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
  nodeVisuals.clear()
  edgeObjects.clear()
  energyNodeSprites.clear()
  graphGroup.scale.setScalar(graphScale.value)

  for (const edge of renderEdges.value) addEdgeObject(edge)
  for (const node of nodes.value) addNodeObject(node)
  refreshVisualState()
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

  const halo = createHaloSprite(position, nodeSpriteColor(node, color, energy), size, 0)
  graphGroup.add(halo)
  nodeVisuals.set(node.id, { node, dot, halo, hit: hitMesh })
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
  const inner = new Color(edge.edge_class === 'structural' ? 0x6d747d : 0xb46a63)
  const outer = new Color(edge.edge_class === 'structural' ? 0x35404d : 0x5f7fa6)
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
  edgeObjects.set(edge.id, line)
}

function scenePoint(node: AtlasNode): Vector3 {
  const x = (node.layout.x || 0) * 0.56
  const z = (node.layout.y || 0) * 0.56
  const y = (node.layout.z || 0) * 0.56
  return new Vector3(x, y, z)
}

function nodeSize3d(node: AtlasNode): number {
  const active = store.selectedId === node.id || store.hoveredId === node.id
  const boost = active ? 1.16 : 1
  if (node.type === 'root') return 4.6 * boost
  if (node.type === 'lifeline') return (isFallbackNode(node) ? 1.7 : 2.9) * boost
  if (node.type === 'cluster') return (isFallbackNode(node) ? 1.4 : 2.15) * boost
  if (node.type === 'decision') return 1.72 * boost
  if (node.type === 'task' || node.type === 'memory') return 1.5 * boost
  return 0.82 * boost
}

function nodeColor(node: AtlasNode): ColorRepresentation {
  if (isFallbackNode(node)) return 0x46505b
  const colors: Record<string, number> = {
    root: 0xf0ad55,
    lifeline: 0x83c6b9,
    cluster: 0x8194aa,
    memory: 0x8592a6,
    task: 0x7fb29c,
    decision: 0x9b88ae,
    item: 0x69727f,
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
  if (node.type === 'root' || store.selectedId === node.id || store.hoveredId === node.id) return 0xf3ad52
  return baseColor
}

function refreshVisualState() {
  energyNodeSprites.clear()
  for (const [id, visual] of nodeVisuals) {
    const { node, dot, halo } = visual
    const energy = nodeEnergyVisible(node)
    const baseColor = nodeColor(node)
    const color = nodeSpriteColor(node, baseColor, energy)
    const dotMaterial = dot.material as SpriteMaterial
    dotMaterial.map = energy ? energyDotTexture : dotTexture
    dotMaterial.color.set(color)
    dotMaterial.opacity = nodeOpacity(node)
    dotMaterial.blending = energy ? AdditiveBlending : NormalBlending
    dotMaterial.needsUpdate = true
    dot.userData.energy = energy
    const baseSize = Number(dot.userData.baseSize || 1)
    const active = store.selectedId === id || store.hoveredId === id
    const scale = baseSize * (active ? 1.16 : 1)
    dot.scale.set(scale, scale, 1)

    const haloMaterial = halo.material as SpriteMaterial
    haloMaterial.color.set(color)
    haloMaterial.opacity = nodeHaloOpacity(node)
    haloMaterial.needsUpdate = true
    if (energy) energyNodeSprites.set(id, dot)
  }

  for (const edge of renderEdges.value) {
    const line = edgeObjects.get(edge.id)
    if (!line) continue
    const material = line.material as LineBasicMaterial
    material.opacity = edgeOpacity(edge)
    material.needsUpdate = true
  }
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
  if (!store.selectedId && !store.hoveredId) return fallback ? 0.24 : node.type === 'item' ? 0.74 : 0.94
  return relatedIds.value.has(node.id) ? (fallback ? 0.48 : 1) : 0.1
}

function edgeOpacity(edge: AtlasEdge): number {
  const hasFocus = Boolean(store.selectedId || store.hoveredId)
  if (!hasFocus) return edge.edge_class === 'structural' ? Math.min(0.2, edge.opacity + 0.035) : Math.min(edge.opacity, 0.42)
  return relatedEdgeIds.value.has(edge.id) ? Math.min(0.68, edge.opacity + 0.26) : Math.min(edge.opacity, 0.032)
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
  if (store.selectedId === node.id) return 0.34
  if (store.hoveredId === node.id) return 0.27
  if (node.type === 'root') return 0.12
  if (node.weight >= 0.94 && !isFallbackNode(node)) return 0.035
  return 0
}

function isFallbackNode(node: AtlasNode): boolean {
  return Boolean(node.meta?.fallback_bucket || node.id === 'lifeline:uncategorized' || node.lifeline_id === 'lifeline:uncategorized')
}

function updateProjectedLabels() {
  if (!camera || !sceneHost.value) return
  const rect = sceneHost.value.getBoundingClientRect()
  const candidates: ProjectedLabel[] = []
  for (const node of nodes.value) {
    if (!labelVisible(node)) continue
    const position = nodePositions.get(node.id)
    if (!position) continue
    const projected = position.clone().multiplyScalar(graphScale.value).project(camera)
    if (projected.z < -1 || projected.z > 1) continue
    candidates.push({
      id: node.id,
      label: shortLabel(node.label, node.layer <= 2 ? 12 : 18),
      type: node.type,
      x: (projected.x * 0.5 + 0.5) * rect.width,
      y: (-projected.y * 0.5 + 0.5) * rect.height + (node.type === 'root' ? 15 : 11),
      muted: nodeOpacity(node) < 0.5,
      priority: labelPriority(node),
    })
  }
  candidates.sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id))
  const placed: Array<{ left: number, right: number, top: number, bottom: number }> = []
  const labels: ProjectedLabel[] = []
  for (const candidate of candidates) {
    const width = Math.min(180, Math.max(38, Array.from(candidate.label).length * 7.2 + 12))
    const box = {
      left: candidate.x - width / 2,
      right: candidate.x + width / 2,
      top: candidate.y - 2,
      bottom: candidate.y + 16,
    }
    if (box.right < 8 || box.left > rect.width - 8 || box.bottom < 8 || box.top > rect.height - 8) continue
    const collides = placed.some(other => !(
      box.right + 7 < other.left
      || box.left - 7 > other.right
      || box.bottom + 4 < other.top
      || box.top - 4 > other.bottom
    ))
    if (collides && candidate.priority < 95) continue
    placed.push(box)
    labels.push(candidate)
  }
  projectedLabels.value = labels
}

function labelPriority(node: AtlasNode): number {
  if (store.selectedId === node.id) return 120
  if (store.hoveredId === node.id) return 110
  if (node.type === 'root') return 100
  if (node.type === 'lifeline') return 80 + node.weight * 10
  if (node.type === 'cluster') return 55 + node.weight * 10
  return 20 + node.weight * 10
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
      :style="{ left: `${label.x}px`, top: `${label.y}px` }"
    >{{ label.label }}</span>
    </div>

    <header v-if="!focusMode" class="atlas-toolbar">
      <div class="toolbar-title">
        <span class="mark" aria-hidden="true" />
        <div>
          <strong>Atlas</strong>
          <small>
            全局 · {{ store.data?.view.node_count || 0 }} 节点 · {{ store.data?.view.edge_count || 0 }} 关系
          </small>
        </div>
      </div>
      <nav class="segmented atlas-tabs" aria-label="Atlas 视图">
        <button :class="{ active: store.lod === 'overview' }" @click="store.lod = 'overview'">总览</button>
        <button :class="{ active: store.lod === 'semantic' }" @click="store.lod = 'semantic'">语义</button>
        <button :class="{ active: store.lod === 'tags' }" @click="store.lod = 'tags'">标签</button>
        <button :class="{ active: store.lod === 'structure' }" @click="store.lod = 'structure'">结构</button>
        <button :class="{ active: store.lod === 'relations' }" @click="store.lod = 'relations'">关系</button>
      </nav>
      <div class="toolbar-actions">
        <button class="icon-btn" type="button" title="重置视角" aria-label="重置视角" @click="resetCamera">
          <Crosshair :size="17" :stroke-width="1.7" />
        </button>
        <button class="icon-btn" type="button" title="刷新 Atlas" aria-label="刷新 Atlas" @click="reload">
          <RefreshCw :size="17" :stroke-width="1.7" />
        </button>
      </div>
    </header>

    <div v-if="store.loading || !sceneReady" class="atlas-state">
      <div class="loader-ring" />
      <span>加载 Atlas</span>
    </div>
    <div v-else-if="store.error" class="atlas-state">
      <span>{{ store.error }}</span>
      <button class="retry-btn" @click="reload">重试</button>
    </div>

    <div v-if="!focusMode && store.data" class="atlas-footnote">
      <span>3D 全局</span>
      <span v-if="store.data.view.hidden_nodes || store.data.view.hidden_edges">
        已收束 {{ (store.data.view.hidden_nodes || 0) + (store.data.view.hidden_edges || 0) }} 条低优先信息
      </span>
      <span v-if="store.data.view.unclassified_count">未归类 {{ store.data.view.unclassified_count }}</span>
    </div>

    <section v-if="focusMode && store.selectedNode" class="local-atlas" data-testid="local-atlas-2d">
      <div class="local-toolbar">
        <button class="back-btn" type="button" @click="exitFocus">
          <ArrowLeft :size="17" :stroke-width="1.8" />
          <span>全局</span>
        </button>
        <div>
          <span>Atlas · 局部语境</span>
          <strong>{{ store.selectedNode.label }}</strong>
        </div>
      </div>

      <svg class="local-map" :viewBox="localViewBox" preserveAspectRatio="xMidYMid meet">
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
        <g class="local-edges">
          <path
            v-for="entry in localEdges"
            :key="entry.edge.id"
            :d="localEdgePath(entry)"
            :class="localEdgeClass(entry)"
            :stroke="entry.edge.edge_class === 'structural' ? 'rgba(154, 164, 174, 0.34)' : `url(#local-grad-${entry.edge.id})`"
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
        <div class="panel-kicker">{{ typeLabel(store.selectedNode.type) }} · 局部焦点</div>
        <h2>{{ store.selectedNode.label }}</h2>
        <p v-if="store.selectedNode.summary" class="summary">{{ store.selectedNode.summary }}</p>
        <div class="focus-metrics">
          <span>{{ localNodes.length }} 个节点</span>
          <span>{{ primaryLocalEdges.length }} 条直接关系</span>
          <span>{{ secondaryLocalEdges.length }} 条语境关系</span>
        </div>
        <div v-if="localRelationRows.length > 0" class="relation-list">
          <button
            v-for="edge in localRelationRows"
            :key="edge.id"
            class="relation-row"
            :class="{ active: selectedLocalRelation?.id === edge.id }"
            type="button"
            @click="inspectLocalRelation(edge)"
          >
            <span>{{ relationLabel(edge.relation_type) }}</span>
            <small>{{ relationTarget(edge)?.label }}</small>
            <strong>{{ Math.round(edge.confidence * 100) }}%</strong>
          </button>
        </div>

        <div v-if="selectedLocalRelation" class="relation-insight">
          <div class="relation-insight-meta">
            <span>{{ relationLabel(selectedLocalRelation.relation_type) }}</span>
            <span>{{ relationOriginLabel(selectedLocalRelation) }}</span>
          </div>
          <p>{{ selectedLocalRelation.evidence || '这是一条结构关系，没有额外语义证据。' }}</p>
          <button type="button" @click="navigateRelation(selectedLocalRelation)">
            <span>聚焦 {{ relationTarget(selectedLocalRelation)?.label }}</span>
            <ArrowUpRight :size="15" :stroke-width="1.7" />
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
  left: var(--atlas-shell-left, 0px);
  bottom: var(--atlas-shell-bottom, 0px);
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
  color: var(--text-2);
  font-size: 11px;
  font-weight: 540;
  line-height: 1;
  text-shadow: 0 1px 8px #08090c, 0 0 3px #08090c;
  white-space: nowrap;
  opacity: 0.84;
  transform: translateX(-50%);
  transition: opacity 140ms var(--ease), color 140ms var(--ease);
}

.scene-label.muted {
  opacity: 0.24;
}

.scene-label.type-root,
.scene-label.type-lifeline,
.scene-label.type-cluster {
  color: var(--text-1);
}

.scene-label.type-root {
  color: #f1c078;
  font-size: 12px;
}

.atlas-toolbar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 32;
  display: grid;
  grid-template-columns: minmax(190px, 1fr) auto minmax(88px, 1fr);
  align-items: center;
  gap: var(--s-4);
  min-height: 68px;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.045);
  background: rgba(8, 9, 12, 0.78);
  backdrop-filter: blur(14px);
}

.toolbar-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-1);
}

.toolbar-title > div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toolbar-title strong {
  font-size: var(--fs-4);
  font-weight: 650;
}

.toolbar-title small {
  color: var(--text-4);
  font-size: var(--fs-1);
  font-weight: 450;
}

.mark {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #f0ad55;
  box-shadow: 0 0 10px rgba(240, 173, 85, 0.34);
}

.segmented {
  display: flex;
  gap: 2px;
  padding: 2px;
  background: rgba(255, 255, 255, 0.035);
  border-radius: var(--r-1);
  border: 1px solid rgba(255, 255, 255, 0.055);
}

.atlas-tabs {
  justify-self: center;
}

.segmented button,
.icon-btn,
.retry-btn,
.back-btn {
  min-height: 30px;
  border: 1px solid transparent;
  border-radius: var(--r-1);
  background: transparent;
  color: var(--text-3);
  font-size: var(--fs-2);
  padding: 0 var(--s-2);
  cursor: pointer;
}

.segmented button.active {
  color: var(--text-1);
  background: rgba(255, 255, 255, 0.075);
  border-color: rgba(255, 255, 255, 0.04);
}

.toolbar-actions {
  justify-self: end;
  display: flex;
  gap: 5px;
}

.icon-btn {
  width: 32px;
  display: grid;
  place-items: center;
  padding: 0;
  color: var(--text-3);
  background: rgba(255, 255, 255, 0.025);
  border-color: rgba(255, 255, 255, 0.055);
}

.icon-btn:hover {
  color: var(--text-1);
  border-color: rgba(255, 255, 255, 0.12);
}

.atlas-footnote {
  position: absolute;
  bottom: 18px;
  left: 20px;
  z-index: 24;
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 10px;
}

.panel-kicker {
  color: var(--text-4);
  font-size: var(--fs-1);
  margin-bottom: var(--s-1);
}

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

.back-btn {
  color: var(--text-2);
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
  background: #08090c;
}

.local-toolbar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 45;
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 68px;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.045);
  background: rgba(8, 9, 12, 0.82);
  backdrop-filter: blur(14px);
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
  font-size: var(--fs-4);
  overflow-wrap: anywhere;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 9px 0 7px;
  border-color: rgba(255, 255, 255, 0.065);
  background: rgba(255, 255, 255, 0.028);
}

.back-btn:hover {
  color: var(--text-1);
  border-color: rgba(255, 255, 255, 0.12);
}

.local-map {
  width: calc(100% - 350px);
  height: 100%;
  display: block;
}

.local-edges path {
  fill: none;
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
  fill: #f0ad55;
  stroke: #f3c37f;
  stroke-width: 0.9;
  filter: drop-shadow(0 0 7px rgba(240, 173, 85, 0.26));
}

.local-node.role-secondary {
  opacity: 0.66;
}

.local-node.type-root .local-core { fill: #f0ad55; }
.local-node.type-lifeline .local-core { fill: #83c6b9; }
.local-node.type-cluster .local-core { fill: #8194aa; }
.local-node.type-memory .local-core { fill: #8592a6; }
.local-node.type-task .local-core { fill: #7fb29c; }
.local-node.type-decision .local-core { fill: #9b88ae; }
.local-node.type-item .local-core { fill: #69727f; }

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
  top: 68px;
  right: 0;
  bottom: 0;
  z-index: 45;
  width: 350px;
  overflow: auto;
  padding: 28px 24px 32px;
  border-left: 1px solid rgba(255, 255, 255, 0.055);
  background: rgba(12, 14, 18, 0.88);
  backdrop-filter: blur(18px);
}

.focus-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 7px 12px;
  margin-top: 16px;
  color: var(--text-4);
  font-size: var(--fs-1);
}

.relation-list {
  display: flex;
  flex-direction: column;
  margin-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.055);
}

.relation-row {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr) 28px;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.045);
  border-radius: 0;
  background: transparent;
  color: var(--text-2);
  padding: 10px 2px;
  cursor: pointer;
}

.relation-row:hover,
.relation-row.active {
  background: rgba(255, 255, 255, 0.035);
}

.relation-row span {
  color: #b46a63;
  font-size: var(--fs-1);
}

.relation-row strong {
  color: #5f7fa6;
  font-size: var(--fs-1);
  text-align: right;
}

.relation-row small {
  color: var(--text-2);
  font-size: var(--fs-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.relation-insight {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.relation-insight-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-4);
  font-size: var(--fs-1);
}

.relation-insight p {
  margin: 10px 0 0;
  color: var(--text-2);
  font-size: var(--fs-3);
  line-height: 1.6;
}

.relation-insight button {
  width: 100%;
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
  padding: 0 2px;
  color: var(--text-3);
  border-top: 1px solid rgba(255, 255, 255, 0.045);
}

.relation-insight button:hover {
  color: var(--text-1);
}

@media (max-width: 760px) {
  .atlas-toolbar {
    grid-template-columns: 1fr auto;
    gap: 8px 12px;
    min-height: 104px;
    padding: 10px 12px 8px;
  }

  .toolbar-title small {
    max-width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .atlas-tabs {
    grid-column: 1 / -1;
    justify-self: stretch;
    overflow-x: auto;
  }

  .atlas-tabs button {
    flex: 1 0 auto;
  }

  .atlas-footnote {
    display: none;
  }

  .local-toolbar {
    min-height: 64px;
    padding: 10px 12px;
  }

  .local-toolbar strong {
    display: block;
    max-width: calc(100vw - 120px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .local-map {
    width: 100%;
    height: 68%;
    margin-top: 34px;
  }

  .local-panel {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto;
    height: 34%;
    padding: 18px 16px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.065);
    border-left: 0;
  }

  .local-panel h2 {
    font-size: var(--fs-5);
  }

  .summary {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .relation-list {
    margin-top: 14px;
  }
}
</style>

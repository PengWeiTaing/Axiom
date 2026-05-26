<script setup lang="ts">
/** CosmosView — Atlas 球形树宿主组件 */
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'
import { initScene, createAssociationLines, fadeNodes, resetNodeAlpha, updateNodePositions, applyConstellationOpacities, ghostExcept, cssVar, addHalo, removeHalo } from '@/cosmos/scene'
import { tweenCamera, updateTween } from '@/cosmos/camera'
import type { CosmosState } from '@/cosmos/types'
import type { LayoutNode } from '@/cosmos/layout'
import { RADII } from '@/cosmos/layout'
import * as THREE from 'three'
import Breadcrumb from '@/components/cosmos/Breadcrumb.vue'
import LifelinePanel from '@/components/LifelinePanel.vue'
import NodeDetailCard from '@/components/cosmos/NodeDetailCard.vue'
import AtlasSearch from '@/components/cosmos/AtlasSearch.vue'
import ContextMenu from '@/components/cosmos/ContextMenu.vue'
import type { ContextMenuTarget } from '@/components/cosmos/ContextMenu.vue'
import ConfirmDialog from '@/components/cosmos/ConfirmDialog.vue'
import AssociationEditDialog from '@/components/cosmos/AssociationEditDialog.vue'
import LegendBar from '@/components/cosmos/LegendBar.vue'
import type { LabelGroup } from '@/cosmos/labels'

const store = useCosmosStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)

let sceneObjs: Awaited<ReturnType<typeof initScene>> | null = null
let controls: any = null
let animFrame = 0
let assocLines: { line: any; data: any; fromNode: LayoutNode; toNode: LayoutNode; arrow?: any }[] = []
let tooltipText = ''

// Search
const showSearch = ref(false)

// Context menu
const contextMenu = ref<{ x: number; y: number; target: ContextMenuTarget } | null>(null)

// Confirm dialog
const confirmDialog = ref<{ title: string; message: string; confirmLabel: string; danger: boolean; resolve: (v: boolean) => void } | null>(null)
function showConfirm(title: string, message: string, confirmLabel: string, danger: boolean): Promise<boolean> {
  return new Promise(resolve => {
    confirmDialog.value = { title, message, confirmLabel, danger, resolve }
  })
}

// Create entity dialog
const createDialog = ref<{ kind: string; lifelineId: string; lifelineName: string } | null>(null)
const createTitle = ref('')
const createInputEl = ref<HTMLInputElement | null>(null)

// NodeDetailCard ref for triggering inline edit
const nodeDetailRef = ref<InstanceType<typeof NodeDetailCard> | null>(null)

// Shortcuts hint
const hintVisible = ref(true)
const hintDismissed = ref(false)
let hintTimer: number | undefined

// Hover
let hoveredNode: THREE.Mesh | null = null
let hoveredAssocLine: any = null
const HOVER_SCALE = 1.5

// 关联筛选
const assocFilter = reactive({
  types: ['co_occurrence', 'causal', 'tension', 'derived_from', 'manual'] as string[],
  minConfidence: 0.0,
  status: 'all' as 'all' | 'accepted' | 'pending',
})

function applyAssocFilter() {
  for (const al of assocLines) {
    const typeMatch = assocFilter.types.includes(al.data.relation_type)
    const confMatch = al.data.confidence >= assocFilter.minConfidence
    const statusMatch = assocFilter.status === 'all' || al.data.status === assocFilter.status
    const vis = typeMatch && confMatch && statusMatch
    al.line.visible = vis
    if (al.arrow) al.arrow.visible = vis
  }
}

function toggleFilterType(t: string) {
  if (assocFilter.types.includes(t)) {
    if (assocFilter.types.length > 1) assocFilter.types = assocFilter.types.filter((x: string) => x !== t)
  } else {
    assocFilter.types = [...assocFilter.types, t]
  }
  applyAssocFilter()
}

const visibleAssocCount = computed(() => assocLines.filter(al => al.line.visible).length)

// CSS2D label renderer
let labelRenderer: any = null
let labelGroup: LabelGroup | null = null
let lineSetResolution: ((w: number, h: number) => void) | null = null

async function start() {
  if (!store.data || !canvasRef.value) return
  const Three = await import('three')
  const OrbitControls = (await import('three/examples/jsm/controls/OrbitControls.js')).OrbitControls
  const { CSS2DRenderer } = await import('three/examples/jsm/renderers/CSS2DRenderer.js')

  sceneObjs = await initScene(canvasRef.value, store.data)
  controls = new OrbitControls(sceneObjs.camera, sceneObjs.renderer.domElement)
  controls.enableDamping = true; controls.dampingFactor = 0.08
  controls.enableZoom = true; controls.zoomSpeed = 0.6
  controls.enablePan = false
  controls.minDistance = 0.5; controls.maxDistance = 9.0

  // CSS2D label renderer
  labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0'
  labelRenderer.domElement.style.pointerEvents = 'none'
  document.querySelector('.cosmos-view')?.appendChild(labelRenderer.domElement)

  const { createLabelGroup } = await import('@/cosmos/labels')
  labelGroup = createLabelGroup()
  labelGroup.create(sceneObjs.scene, sceneObjs.layoutNodes)

  lineSetResolution = sceneObjs.setResolution

  window.addEventListener('resize', onResize)

  const raycaster = new Three.Raycaster()
  const mouse = new Three.Vector2()

  canvasRef.value.addEventListener('click', (e: MouseEvent) => {
    if (!sceneObjs) return
    mouse.x = (e.offsetX / canvasRef.value!.clientWidth) * 2 - 1
    mouse.y = -(e.offsetY / canvasRef.value!.clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, sceneObjs.camera)

    // 0. 选择目标模式（关联创建）
    if (store.selectingTarget) {
      const hits_ = raycaster.intersectObjects(sceneObjs.pickables)
      if (hits_.length > 0) {
        const obj_ = hits_[0].object as THREE.Mesh
        if (obj_.userData.layer === 3 && obj_.userData.id !== store.selectingTarget.fromId) {
          const toTitle = store.data?.entities.find(en => en.id === obj_.userData.id)?.title || ''
          store.openEditAssoc({
            id: '', from: store.selectingTarget.fromId, fromTitle: store.selectingTarget.fromTitle,
            to: obj_.userData.id as string, toTitle: toTitle,
            relation_type: 'manual', confidence: 0.7, status: 'accepted', evidence: []
          })
          store.cancelSelecting()
          return
        }
      }
      // 点击空白或自身 → 退出选择模式
      store.cancelSelecting()
      return
    }

    // 1. 先检测关联线（仅在 relation_reveal 模式下）
    if (store.state.kind === 'relation_reveal' && assocLines.length > 0) {
      const lineHits = raycaster.intersectObjects(assocLines.map(l => l.line))
      if (lineHits.length > 0) {
        const hitLine = lineHits[0].object
        const al = assocLines.find(a => a.line === hitLine)
        if (al) {
          if (store.selectedAssocId === al.data.id) {
            store.selectAssociation(null)
          } else {
            store.selectAssociation(al.data.id)
          }
          return
        }
      }
    }

    // 2. 再检测节点
    const hits = raycaster.intersectObjects(sceneObjs.pickables)
    if (hits.length === 0) {
      store.selectAssociation(null)
      if (store.state.kind === 'node_focus' || store.state.kind === 'relation_reveal') {
        const eid = (store.state as any).entity_id as string
        const ent = store.data?.entities.find(e => e.id === eid)
        const lid = ent?.lifeline_id
        if (lid) {
          store.transition({ kind: 'region_zoom', lifeline_id: lid } as any)
        } else {
          store.transition({ kind: 'global_overview' })
        }
      } else if (store.state.kind === 'region_zoom') {
        store.transition({ kind: 'global_overview' })
      }
      return
    }
    store.selectAssociation(null)
    const obj = hits[0].object
    const layer = obj.userData.layer as number
    const id = obj.userData.id as string
    const kind = obj.userData.kind as string
    const s = store.state

    if (s.kind === 'global_overview' && layer === 1) {
      store.transition({ kind: 'region_zoom', lifeline_id: id })
    } else if (s.kind === 'region_zoom' && (layer === 2 || layer === 3)) {
      store.transition({ kind: 'node_focus', entity_kind: (kind || 'lifeline') as any, entity_id: id })
    } else if (s.kind === 'node_focus') {
      store.transition({ kind: 'node_focus', entity_kind: (kind || 'lifeline') as any, entity_id: id })
    } else if (s.kind === 'relation_reveal') {
      clearAssoc()
      store.transition({ kind: 'node_focus', entity_kind: (kind || 'lifeline') as any, entity_id: id })
    }
  })

  canvasRef.value.addEventListener('mousemove', (e: MouseEvent) => {
    if (!sceneObjs) return
    mouse.x = (e.offsetX / canvasRef.value!.clientWidth) * 2 - 1
    mouse.y = -(e.offsetY / canvasRef.value!.clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, sceneObjs.camera)

    // 0. 节点 hover 检测（所有状态下）
    const nodeHits = raycaster.intersectObjects(sceneObjs.pickables)
    if (nodeHits.length > 0) {
      const hm = nodeHits[0].object as THREE.Mesh
      if (hm !== hoveredNode) {
        resetHover()
        hoveredNode = hm
        applyHover(hm)
      }
      canvasRef.value!.style.cursor = store.selectingTarget ? 'crosshair' : 'pointer'
    } else {
      resetHover()
      canvasRef.value!.style.cursor = store.selectingTarget ? 'crosshair' : ''
    }

    // 1. 关联线 hover（relation_reveal 下）
    if (store.state.kind !== 'relation_reveal') return
    const lineHits = raycaster.intersectObjects(sceneObjs.lines.concat(assocLines.map(l => l.line)))
    if (lineHits.length > 0 && assocLines.some(al => al.line === lineHits[0].object)) {
      const al = assocLines.find(al => al.line === lineHits[0].object)
      if (al) {
        tooltipText = al.data.evidence?.[0]?.excerpt || ''
        if (al.line !== hoveredAssocLine) {
          resetLineHover()
          hoveredAssocLine = al.line
          applyLineHover(al)
        }
      }
    } else {
      tooltipText = ''
      resetLineHover()
    }
  })

  // 右键上下文菜单
  canvasRef.value.addEventListener('contextmenu', (e: MouseEvent) => {
    e.preventDefault()
    if (!sceneObjs || !store.data) return
    // 不在 global_overview 下弹出菜单
    if (store.state.kind === 'global_overview') return

    mouse.x = (e.offsetX / canvasRef.value!.clientWidth) * 2 - 1
    mouse.y = -(e.offsetY / canvasRef.value!.clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, sceneObjs.camera)

    const hits = raycaster.intersectObjects(sceneObjs.pickables)
    if (hits.length === 0) { contextMenu.value = null; return }

    const obj = hits[0].object
    const id = obj.userData.id as string
    const kind = obj.userData.kind as string
    const layer = obj.userData.layer as number
    // 仅 R1/R2 lifeline 和 R3 entity 弹出菜单（R0 root 不弹）
    if (layer < 1 || layer > 3) { contextMenu.value = null; return }

    let title = ''
    if (layer <= 2) {
      const ll = store.data.lifelines.find(l => l.id === id)
      title = ll?.name || id
    } else {
      const ent = store.data.entities.find(en => en.id === id)
      title = ent?.title || id
    }

    contextMenu.value = { x: e.clientX, y: e.clientY, target: { id, kind, title, layer } }
  })

  window.addEventListener('keydown', onKey)

  // 快捷键提示：3s 后淡出，鼠标移入 HUD 重新显示
  const hudEl = document.querySelector('.cosmos-hud')
  hudEl?.addEventListener('mouseenter', () => {
    hintVisible.value = true
    if (hintTimer) clearTimeout(hintTimer)
  })
  hintTimer = window.setTimeout(() => { hintVisible.value = false; hintDismissed.value = true }, 3000)

  animate()
}

function onPanelFocusLifeline(lifelineId: string) {
  store.transition({ kind: 'region_zoom', lifeline_id: lifelineId } as any)
}

function onResize() {
  if (!labelRenderer || !lineSetResolution) return
  const w = window.innerWidth
  const h = window.innerHeight
  labelRenderer.setSize(w, h)
  lineSetResolution(w, h)
}

function applyHover(mesh: THREE.Mesh) {
  mesh.scale.setScalar(HOVER_SCALE)
  const mat = mesh.material as THREE.MeshBasicMaterial
  ;(mat as any)._origColor = (mat as any)._origColor ?? mat.color.getHex()
  mat.color.set(cssVar('--accent'))
  mat.needsUpdate = true
}

function resetHover() {
  if (!hoveredNode) return
  hoveredNode.scale.setScalar(1)
  const mat = hoveredNode.material as THREE.MeshBasicMaterial
  if ((mat as any)._origColor !== undefined) {
    mat.color.setHex((mat as any)._origColor)
    delete (mat as any)._origColor
    mat.needsUpdate = true
  }
  hoveredNode = null
}

function applyLineHover(al: typeof assocLines[0]) {
  const mat = al.line.material as any
  mat._origLinewidth = mat._origLinewidth ?? mat.linewidth
  mat._origColor = mat._origColor ?? mat.color.getHex()
  mat.linewidth = mat._origLinewidth * 1.3
  mat.color.set(cssVar('--accent'))
  mat.needsUpdate = true

  assocLines.forEach(other => {
    if (other.line !== al.line) {
      const om = other.line.material as any
      om.transparent = true
      om._origOpacity = om._origOpacity ?? om.opacity
      om.opacity = (om._origOpacity || 0.8) * 0.3
      om.needsUpdate = true
    }
  })
}

function resetLineHover() {
  if (!hoveredAssocLine) return
  const mat = hoveredAssocLine.material as any
  if (mat._origLinewidth !== undefined) {
    mat.linewidth = mat._origLinewidth
    delete mat._origLinewidth
  }
  if (mat._origColor !== undefined) {
    mat.color.setHex(mat._origColor)
    delete mat._origColor
  }
  mat.needsUpdate = true

  assocLines.forEach(al => {
    const om = al.line.material as any
    if (om._origOpacity !== undefined) {
      om.opacity = om._origOpacity
      delete om._origOpacity
      om.needsUpdate = true
    }
  })

  hoveredAssocLine = null
}

function onSearchSelect(result: { id: string; kind: string; layer: number }) {
  showSearch.value = false
  if (!sceneObjs) return

  if (result.kind === 'lifeline') {
    if (result.layer === 1) {
      store.transition({ kind: 'region_zoom', lifeline_id: result.id } as any)
    } else {
      let pid = store.data?.lifelines.find(l => l.id === result.id)?.parent_id
      while (pid && pid !== 'ROOT') {
        const p = store.data?.lifelines.find(l => l.id === pid)
        if (p && p.parent_id === 'ROOT') break
        pid = p?.parent_id
      }
      if (pid && pid !== 'ROOT') {
        store.transition({ kind: 'region_zoom', lifeline_id: pid } as any)
      }
    }
  } else {
    store.transition({ kind: 'node_focus', entity_kind: result.kind as any, entity_id: result.id } as any)
  }
}

function onContextEditTitle(target: ContextMenuTarget) {
  // For R3 entity: trigger NodeDetailCard inline edit
  if (target.layer === 3) {
    nodeDetailRef.value?.startEditTitle()
  }
}

async function onContextDeleteEntity(target: ContextMenuTarget) {
  const ok = await showConfirm(
    `确定删除「${target.title.slice(0, 30)}」？`,
    '此操作不可撤销。',
    '删除',
    true,
  )
  if (!ok) return
  const parts = target.id.split(':')
  const kind = parts[0]
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  try {
    await store.deleteEntityById(kind, rawId)
  } catch {
    await store.reload()
  }
  // 如果删除的是当前聚焦的 entity，回到 region_zoom
  const s = store.state
  if (s.kind === 'node_focus' || s.kind === 'relation_reveal') {
    if ((s as any).entity_id === target.id) {
      const ent = store.data?.entities.find(e => e.id === target.id)
      const lid = ent?.lifeline_id
      if (lid) store.transition({ kind: 'region_zoom', lifeline_id: lid } as any)
      else store.transition({ kind: 'global_overview' })
    }
  }
}

async function onContextMoveLifeline(entityId: string, lifelineId: string) {
  const parts = entityId.split(':')
  const kind = parts[0]
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  try {
    await store.mountEntity(kind, rawId, lifelineId)
  } catch {
    await store.reload()
  }
}

function onContextCreateEntity(kind: string, lifelineId: string) {
  const lifeline = store.data?.lifelines.find(l => l.id === lifelineId)
  createDialog.value = { kind, lifelineId, lifelineName: lifeline?.name || lifelineId }
  createTitle.value = ''
  setTimeout(() => createInputEl.value?.focus(), 50)
}

async function onCreateEntityConfirm() {
  if (!createDialog.value) return
  const title = createTitle.value.trim()
  if (!title) return
  const { kind, lifelineId } = createDialog.value
  try {
    await store.createEntityUnderLifeline(kind, title, lifelineId)
  } catch {
    await store.reload()
  }
  createDialog.value = null
}

function onCreateEntityCancel() {
  createDialog.value = null
}

function onCreateKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') onCreateEntityConfirm()
  else if (e.key === 'Escape') onCreateEntityCancel()
}

// Lifeline edit dialog
const lifelineEditDialog = ref<{ id: string; name: string } | null>(null)
const lifelineEditName = ref('')
const lifelineEditEl = ref<HTMLInputElement | null>(null)

function onContextEditLifelineName(target: ContextMenuTarget) {
  lifelineEditDialog.value = { id: target.id, name: target.title }
  lifelineEditName.value = target.title
  nextTick(() => lifelineEditEl.value?.focus())
}

async function onLifelineEditSave() {
  if (!lifelineEditDialog.value) return
  const newName = lifelineEditName.value.trim()
  if (!newName || newName === lifelineEditDialog.value.name) { lifelineEditDialog.value = null; return }
  try {
    await store.updateLifeline(lifelineEditDialog.value.id, { name: newName })
    lifelineEditDialog.value = null
  } catch {
    await store.reload()
    lifelineEditDialog.value = null
  }
}

function onLifelineEditKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') { e.stopPropagation(); onLifelineEditSave() }
  else if (e.key === 'Escape') { e.stopPropagation(); lifelineEditDialog.value = null }
}

function onContextAssociateTo(target: ContextMenuTarget) {
  store.startSelectingTarget(target.id, target.title)
}

async function onAssocCreate(data: {
  from: string; to: string; relation_type: string; confidence: number
  evidence: { type: string; excerpt: string; weight: number }[]
}) {
  await store.createAssoc(data)
  store.closeEditAssoc()
}

async function onAssocUpdate(data: {
  association_id: string; relation_type?: string; confidence?: number
  evidence?: { type: string; excerpt: string; weight: number }[]
}) {
  await store.updateAssoc(data.association_id, {
    relation_type: data.relation_type,
    confidence: data.confidence,
    evidence: data.evidence,
  })
  store.closeEditAssoc()
}

async function onAssocDelete(assocId: string) {
  store.closeEditAssoc()
  await store.deleteAssoc(assocId)
}

async function onNodeDetailEditAssoc(a: { id: string; relation_type: string; confidence: number; status: string; evidence?: { type: string; excerpt: string; weight: number }[] }) {
  if (!store.data) return
  const s = store.state
  if (s.kind !== 'node_focus' && s.kind !== 'relation_reveal') return
  const eid = (s as any).entity_id as string
  const entity = store.data.entities.find(en => en.id === eid)
  if (!entity) return
  // Find the association in store.data
  const assoc = store.data.associations.find(as => as.id === a.id)
  if (!assoc) return
  const fromEnt = store.data.entities.find(en => en.id === assoc.from)
  const toEnt = store.data.entities.find(en => en.id === assoc.to)
  store.openEditAssoc({
    id: assoc.id, from: assoc.from, fromTitle: fromEnt?.title || assoc.from,
    to: assoc.to, toTitle: toEnt?.title || assoc.to,
    relation_type: assoc.relation_type, confidence: assoc.confidence,
    status: assoc.status, evidence: assoc.evidence || [],
  })
}

async function onNodeDetailDeleteAssoc(assocId: string) {
  const ok = await showConfirm('删除关联', '确定删除这条关联？此操作不可撤销。', '确认删除', true)
  if (ok) await store.deleteAssoc(assocId)
}

function onKey(e: KeyboardEvent) {
  // 搜索快捷键
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    e.stopPropagation()
    showSearch.value = !showSearch.value
    return
  }
  if (e.key === '/' && !showSearch.value) {
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
    e.preventDefault()
    showSearch.value = true
    return
  }

  const s = store.state
  if (e.key === 'Escape') {
    if (store.selectingTarget) {
      store.cancelSelecting()
      return
    }
    if (showSearch.value) {
      showSearch.value = false
      return
    }
    if (s.kind === 'relation_reveal') { clearAssoc(); store.transition({ kind: 'node_focus', entity_kind: (s as any).entity_kind, entity_id: (s as any).entity_id }) }
    else if (s.kind === 'node_focus') { store.transition({ kind: (s as any).lifeline_id ? 'region_zoom' : 'global_overview', lifeline_id: (s as any).lifeline_id }) }
    else if (s.kind === 'region_zoom') { store.transition({ kind: 'global_overview' }) }
  }
  if (e.key === 'r' || e.key === 'R') {
    if (s.kind === 'node_focus') { enterRelation() }
    else if (s.kind === 'relation_reveal') { clearAssoc() }
  }
}

function enterRelation() {
  if (!store.data || !sceneObjs) return
  const s = store.state
  if (s.kind !== 'node_focus') return
  const focusId = (s as any).entity_id as string
  store.transition({ kind: 'relation_reveal', entity_kind: (s as any).entity_kind, entity_id: focusId })
  assocLines = createAssociationLines(
    sceneObjs.scene, store.data, sceneObjs.layoutNodes, focusId,
    new THREE.Vector2(canvasRef.value!.clientWidth, canvasRef.value!.clientHeight)
  )
  const visibleIds = new Set<string>([focusId])
  assocLines.forEach(al => { visibleIds.add(al.fromNode.id); visibleIds.add(al.toNode.id) })
  fadeNodes(sceneObjs.nodes, visibleIds)
  applyAssocFilter()
}

function clearAssoc() {
  if (!sceneObjs) return
  resetLineHover()
  assocLines.forEach(al => {
    sceneObjs!.scene.remove(al.line)
    al.line.geometry?.dispose()
    if (al.line.material) {
      const m = al.line.material
      if (Array.isArray(m)) m.forEach(x => x.dispose())
      else m.dispose()
    }
    if (al.arrow) {
      sceneObjs!.scene.remove(al.arrow)
      al.arrow.geometry?.dispose()
      if (al.arrow.material instanceof THREE.Material) al.arrow.material.dispose()
    }
  })
  assocLines = []
  resetNodeAlpha(sceneObjs.nodes)
}

function animate() {
  if (!sceneObjs) return
  animFrame = requestAnimationFrame(animate)
  controls?.update()
  updateTween(0.016, sceneObjs.camera, controls)

  // LOD: layer visibility by camera distance
  const dist = sceneObjs.camera.position.length()
  const maxLayer = dist > 3.5 ? 1 : dist >= 2.0 ? 2 : 3
  const inFocusState = store.state.kind === 'node_focus' || store.state.kind === 'relation_reveal'
  sceneObjs.nodes.forEach(m => {
    const layer = m.userData.layer as number
    m.visible = inFocusState || layer <= maxLayer
  })
  sceneObjs.lines.forEach((l: any) => {
    const fromLayer = (l.userData?.fromLayer ?? 3) as number
    const toLayer = (l.userData?.toLayer ?? 3) as number
    l.visible = inFocusState || Math.max(fromLayer, toLayer) <= maxLayer
  })

  // 节点位置 lerp + CSS2D 标签同步
  updateNodePositions(sceneObjs.nodes, 0.016)
  if (labelGroup) labelGroup.syncPositions(sceneObjs.nodes)

  sceneObjs.renderer.render(sceneObjs.scene, sceneObjs.camera)

  // CSS2D labels
  if (labelGroup && labelRenderer) {
    labelGroup.update(store.state, sceneObjs.camera, store.data?.associations)
    labelRenderer.render(sceneObjs.scene, sceneObjs.camera)
  }
}

async function onStateChange() {
  if (!sceneObjs) return
  const s = store.state
  const nodes = sceneObjs.layoutNodes

  if (s.kind === 'global_overview') {
    removeHalo(sceneObjs.scene)
    // 恢复所有节点位置 + opacity
    for (const m of sceneObjs.nodes) {
      m.userData.targetPosition = m.userData.homePosition.clone()
    }
    resetNodeAlpha(sceneObjs.nodes)
    tweenCamera(sceneObjs.camera, controls, new THREE.Vector3(0, 2.5, 5.5), new THREE.Vector3(0, 0, 0), 60, 800)
  } else if (s.kind === 'region_zoom') {
    removeHalo(sceneObjs.scene)
    // 恢复节点位置
    for (const m of sceneObjs.nodes) {
      m.userData.targetPosition = m.userData.homePosition.clone()
    }
    const targetId = (s as any).lifeline_id as string
    const targetR1 = nodes.find(ln => ln.id === targetId && ln.layer === 1)
    // 如果点的是 R2/R3，向上找其 R1 祖先
    let r1Node = targetR1
    if (!r1Node) {
      const anyNode = nodes.find(ln => ln.id === targetId)
      if (anyNode) {
        let pid = anyNode.parentId
        while (pid) {
          const p = nodes.find(ln => ln.id === pid)
          if (p && p.layer === 1) { r1Node = p; break }
          pid = p?.parentId
        }
      }
    }
    if (r1Node) {
      const dir = r1Node.position.clone().normalize()
      const dist = RADII.R1 + 1.8
      tweenCamera(sceneObjs.camera, controls, dir.clone().multiplyScalar(dist), r1Node.position, 50, 800)

      // Ghost 非目标 lifeline 的节点
      const targetR1Id = r1Node.id
      const visibleIds = new Set<string>()
      const queue = [targetR1Id]
      while (queue.length > 0) {
        const cur = queue.shift()!
        visibleIds.add(cur)
        nodes.filter(n => n.parentId === cur).forEach(n => queue.push(n.id))
      }
      ghostExcept(sceneObjs.nodes, visibleIds)
    }
  } else if (s.kind === 'node_focus' || s.kind === 'relation_reveal') {
    const targetId = (s as any).entity_id as string
    const n = nodes.find(ln => ln.id === targetId)
    if (!n) return

    // 焦点 halo
    removeHalo(sceneObjs.scene)
    addHalo(sceneObjs.scene, n.position, cssVar('--accent'))

    // 相机 tween
    const dir = n.position.clone().normalize()
    const dist = n.position.length() + 0.6
    const camPos = dir.clone().multiplyScalar(dist)
    tweenCamera(sceneObjs.camera, controls, camPos, n.position, s.kind === 'node_focus' ? 35 : 55, 800)

    // 星座布局
    const { computeFocusLayout } = await import('@/cosmos/layout')
    const { targets, constellationIds } = computeFocusLayout(
      nodes,
      targetId,
      store.data?.associations || [],
      dir
    )
    for (const m of sceneObjs.nodes) {
      const id = m.userData.id as string
      const tgt = targets.get(id)
      m.userData.targetPosition = tgt ? tgt.clone() : m.userData.homePosition.clone()
    }
    applyConstellationOpacities(sceneObjs.nodes, constellationIds)
  }
}

watch(() => store.state, onStateChange, { deep: true })

onMounted(async () => {
  await store.load()
  if (store.data) await start()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animFrame)
  sceneObjs?.dispose()
  controls?.dispose()
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
  if (labelGroup) { labelGroup.dispose(); labelGroup = null }
  if (labelRenderer?.domElement) { labelRenderer.domElement.remove() }
  if (hintTimer) clearTimeout(hintTimer)
})
</script>

<template>
  <div class="cosmos-view">
    <div class="cosmos-hud">
      <Breadcrumb :state="store.state" @nav="(s: CosmosState) => store.transition(s)" />
      <AtlasSearch v-if="showSearch" @select="onSearchSelect" @close="showSearch = false" />
      <LifelinePanel v-if="!showSearch" @focus-lifeline="onPanelFocusLifeline" />
      <button v-if="!showSearch" class="search-trigger" @click="showSearch = true">搜索 ⌘K</button>
    </div>

    <!-- 加载态 -->
    <div v-if="store.loading" class="overlay-state">
      <div class="loader-ring" />
      <div class="state-text">加载 Atlas…</div>
    </div>

    <!-- 错误态 -->
    <div v-else-if="store.error" class="overlay-state">
      <div class="state-text">Cosmos 数据加载失败</div>
      <div class="state-sub">API 和 mock 均不可用</div>
      <button class="retry-btn" @click="store.reload()">重试</button>
    </div>

    <!-- 空态 -->
    <div v-else-if="store.data && store.data.lifelines.length === 0" class="overlay-state">
      <div class="state-text">暂无 lifeline</div>
      <div class="state-sub">在左侧面板中创建第一条 lifeline 来开始构建知识星球</div>
    </div>

    <!-- 3D 场景（加载/错误/空态时不渲染，但不销毁） -->
    <template v-if="!store.loading && !store.error && store.data && store.data.lifelines.length > 0">
      <canvas ref="canvasRef" class="cosmos-canvas" />
      <NodeDetailCard ref="nodeDetailRef" @edit-assoc="onNodeDetailEditAssoc" @delete-assoc="onNodeDetailDeleteAssoc" />
      <div v-if="tooltipText && store.state.kind === 'relation_reveal'" class="tooltip">{{ tooltipText }}</div>

      <!-- 快捷键提示 -->
      <div
        v-if="store.state.kind === 'global_overview' && hintVisible"
        class="shortcuts-hint"
        :class="{ fade: hintDismissed }"
      >
        R 显示关联 &nbsp; Esc 返回 &nbsp; 滚轮缩放 &nbsp; 拖拽旋转 &nbsp; Ctrl+K 搜索
      </div>

      <!-- 右键上下文菜单 -->
      <ContextMenu
        v-if="contextMenu"
        :target="contextMenu.target"
        :x="contextMenu.x"
        :y="contextMenu.y"
        @close="contextMenu = null"
        @edit-title="onContextEditTitle"
        @delete-entity="onContextDeleteEntity"
        @move-lifeline="onContextMoveLifeline"
        @create-entity="onContextCreateEntity"
        @edit-lifeline-name="onContextEditLifelineName"
        @associate-to="onContextAssociateTo"
      />

      <!-- 确认弹窗 -->
      <ConfirmDialog
        v-if="confirmDialog"
        :title="confirmDialog.title"
        :message="confirmDialog.message"
        :confirm-label="confirmDialog.confirmLabel"
        :danger="confirmDialog.danger"
        @confirm="confirmDialog!.resolve(true); confirmDialog = null"
        @cancel="confirmDialog!.resolve(false); confirmDialog = null"
      />

      <!-- Lifeline 编辑弹窗 -->
      <div v-if="lifelineEditDialog" class="create-overlay" @pointerdown="lifelineEditDialog = null">
        <div class="create-dialog" @pointerdown.stop>
          <div class="create-title">编辑 lifeline 名称</div>
          <input
            ref="lifelineEditEl"
            v-model="lifelineEditName"
            class="create-input"
            @keydown="onLifelineEditKeydown"
          />
          <div class="create-actions">
            <button class="confirm-btn cancel-btn" @click="lifelineEditDialog = null">取消</button>
            <button class="confirm-btn primary-btn" :disabled="!lifelineEditName.trim()" @click="onLifelineEditSave">保存</button>
          </div>
        </div>
      </div>

      <!-- 新建 entity 弹窗 -->
      <div v-if="createDialog" class="create-overlay" @pointerdown="onCreateEntityCancel">
        <div class="create-dialog" @pointerdown.stop>
          <div class="create-title">新建 {{ createDialog.kind }}</div>
          <div class="create-sub">添加到「{{ createDialog.lifelineName }}」</div>
          <input
            ref="createInputEl"
            v-model="createTitle"
            class="create-input"
            placeholder="输入标题…"
            @keydown="onCreateKeydown"
          />
          <div class="create-actions">
            <button class="confirm-btn cancel-btn" @click="onCreateEntityCancel">取消</button>
            <button class="confirm-btn primary-btn" :disabled="!createTitle.trim()" @click="onCreateEntityConfirm">创建</button>
          </div>
        </div>
      </div>
    </template>

    <!-- 关联编辑弹窗 -->
    <AssociationEditDialog
      v-if="store.editAssoc"
      :from-id="store.editAssoc.from"
      :from-title="store.editAssoc.fromTitle"
      :to-id="store.editAssoc.to"
      :to-title="store.editAssoc.toTitle"
      :existing="store.editAssoc.id ? {
        id: store.editAssoc.id,
        relation_type: store.editAssoc.relation_type,
        confidence: store.editAssoc.confidence,
        status: store.editAssoc.status,
        evidence: store.editAssoc.evidence,
      } : undefined"
      @cancel="store.closeEditAssoc()"
      @create="onAssocCreate"
      @update="onAssocUpdate"
      @delete="onAssocDelete"
    />

    <!-- Selecting target hint -->
    <div v-if="store.selectingTarget" class="select-hint">
      crosshair 点击目标 entity 来创建关联 (Esc 取消)
    </div>

    <!-- LegendBar -->
    <LegendBar :show-assoc="store.state.kind === 'relation_reveal'" />

    <!-- 关联筛选条 -->
    <div v-if="store.state.kind === 'relation_reveal'" class="assoc-filter-bar">
      <div class="filter-chips">
        <button
          v-for="t in ['co_occurrence', 'causal', 'tension', 'derived_from', 'manual']"
          :key="t"
          class="filter-chip"
          :class="{ active: assocFilter.types.includes(t) }"
          @click="toggleFilterType(t)"
        >{{ {co_occurrence:'共现',causal:'因果',tension:'张力', derived_from:'衍生', manual:'人工'}[t] }}</button>
      </div>
      <div class="filter-slider">
        <span class="filter-label">信心度 ≥ {{ assocFilter.minConfidence.toFixed(2) }}</span>
        <input
          v-model.number="assocFilter.minConfidence"
          type="range"
          min="0"
          max="1"
          step="0.05"
          class="filter-range"
          @input="applyAssocFilter"
        />
      </div>
      <select v-model="assocFilter.status" class="filter-select" @change="applyAssocFilter">
        <option value="all">全部</option>
        <option value="accepted">已确认</option>
        <option value="pending">待定</option>
      </select>
      <span class="filter-count">显示 {{ visibleAssocCount }}/{{ assocLines.length }} 条关联</span>
      <span v-if="assocLines.length > 0 && visibleAssocCount === 0" class="filter-empty">当前筛选条件下无可见关联</span>
    </div>
  </div>
</template>

<style scoped>
.cosmos-view {
  position: fixed;
  inset: 0;
  z-index: 10;
  background: var(--surface-0);
}

.cosmos-hud {
  position: absolute;
  top: var(--s-4);
  left: var(--s-4);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--s-2);
  z-index: 20;
}


.cosmos-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.tooltip {
  position: absolute;
  bottom: var(--s-4);
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--fs-2);
  color: var(--text-3);
  background: var(--surface-2);
  padding: var(--s-1) var(--s-3);
  border-radius: var(--r-2);
  z-index: 20;
}

.search-trigger {
  background: var(--surface-1);
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  color: var(--text-3);
  font-size: var(--fs-1);
  padding: var(--s-1) var(--s-2);
  cursor: pointer;
}

.search-trigger:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* 加载/错误/空态 */
.overlay-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--s-2);
  z-index: 30;
  background: var(--surface-0);
}

.loader-ring {
  width: 32px;
  height: 32px;
  border: 3px solid var(--text-4);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.state-text {
  font-size: var(--fs-3);
  color: var(--text-3);
}

.state-sub {
  font-size: var(--fs-2);
  color: var(--text-4);
}

.retry-btn {
  background: var(--surface-2);
  border: 1px solid var(--accent);
  border-radius: var(--r-2);
  color: var(--accent);
  font-size: var(--fs-2);
  padding: var(--s-1) var(--s-3);
  cursor: pointer;
}

.retry-btn:hover {
  background: var(--accent);
  color: var(--surface-0);
}

/* 快捷键提示 */
.shortcuts-hint {
  position: absolute;
  bottom: var(--s-3);
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--fs-1);
  color: var(--text-4);
  background: var(--surface-1);
  padding: var(--s-1) var(--s-3);
  border-radius: var(--r-2);
  z-index: 20;
  transition: opacity 0.6s var(--ease);
}

.shortcuts-hint.fade {
  opacity: 0.3;
}

/* 新建 entity 弹窗 */
.create-overlay {
  position: fixed;
  inset: 0;
  z-index: 110;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.create-dialog {
  background: var(--surface-1);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  padding: var(--s-3);
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.create-title {
  font-size: var(--fs-3);
  font-weight: 600;
  color: var(--text-1);
}

.create-sub {
  font-size: var(--fs-1);
  color: var(--text-4);
}

.create-input {
  background: var(--surface-2);
  border: 1px solid var(--accent);
  border-radius: var(--r-1);
  color: var(--text-1);
  font-size: var(--fs-2);
  padding: var(--s-1) var(--s-2);
  outline: none;
}

.create-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--s-2);
  margin-top: var(--s-1);
}

.confirm-btn {
  padding: var(--s-1) var(--s-3);
  border: none;
  border-radius: var(--r-1);
  font-size: var(--fs-2);
  cursor: pointer;
}

.cancel-btn {
  background: var(--surface-2);
  color: var(--text-2);
}

.cancel-btn:hover {
  color: var(--text-1);
}

.primary-btn {
  background: var(--accent);
  color: var(--surface-0);
}

.primary-btn:hover {
  opacity: 0.85;
}

.primary-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

.select-hint {
  position: absolute;
  bottom: var(--s-3);
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--fs-2);
  color: var(--accent);
  background: var(--surface-1);
  padding: var(--s-1) var(--s-3);
  border-radius: var(--r-2);
  z-index: 20;
}

/* 关联筛选条 */
.assoc-filter-bar {
  position: absolute;
  bottom: var(--s-2);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-1) var(--s-3);
  background: var(--surface-1);
  border-radius: var(--r-2);
  z-index: 21;
  font-size: var(--fs-1);
}

.filter-chips {
  display: flex;
  gap: 4px;
}

.filter-chip {
  background: none;
  border: 1px solid var(--text-5);
  border-radius: var(--r-pill);
  color: var(--text-4);
  font-size: var(--fs-1);
  padding: 2px 8px;
  cursor: pointer;
}

.filter-chip.active {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(110, 231, 208, 0.08);
}

.filter-slider {
  display: flex;
  align-items: center;
  gap: 4px;
}

.filter-label {
  color: var(--text-4);
  white-space: nowrap;
}

.filter-range {
  width: 70px;
  accent-color: var(--accent);
}

.filter-select {
  background: var(--surface-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-1);
  color: var(--text-1);
  font-size: var(--fs-1);
  padding: 2px 4px;
}

.filter-count {
  color: var(--text-4);
  white-space: nowrap;
}

.filter-empty {
  color: var(--text-5);
  white-space: nowrap;
}
</style>

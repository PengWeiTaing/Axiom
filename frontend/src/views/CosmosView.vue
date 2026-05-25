<script setup lang="ts">
/** CosmosView — Atlas 球形树宿主组件 */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'
import { initScene, createAssociationLines, fadeNodes, resetNodeAlpha, updateNodePositions, applyConstellationOpacities, ghostExcept, cssVar } from '@/cosmos/scene'
import { tweenCamera, updateTween } from '@/cosmos/camera'
import type { CosmosState } from '@/cosmos/types'
import type { LayoutNode } from '@/cosmos/layout'
import { RADII } from '@/cosmos/layout'
import * as THREE from 'three'
import Breadcrumb from '@/components/cosmos/Breadcrumb.vue'
import LifelinePanel from '@/components/LifelinePanel.vue'
import NodeDetailCard from '@/components/cosmos/NodeDetailCard.vue'
import AtlasSearch from '@/components/cosmos/AtlasSearch.vue'
import type { LabelGroup } from '@/cosmos/labels'

const store = useCosmosStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)

let sceneObjs: Awaited<ReturnType<typeof initScene>> | null = null
let controls: any = null
let animFrame = 0
let assocLines: { line: any; data: any; fromNode: LayoutNode; toNode: LayoutNode }[] = []
let tooltipText = ''

// Search
const showSearch = ref(false)

// Shortcuts hint
const hintVisible = ref(true)
const hintDismissed = ref(false)
let hintTimer: number | undefined

// Hover
let hoveredNode: THREE.Mesh | null = null
const HOVER_SCALE = 1.5

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
      canvasRef.value!.style.cursor = 'pointer'
    } else {
      resetHover()
      canvasRef.value!.style.cursor = ''
    }

    // 1. 关联线 hover（relation_reveal 下）
    if (store.state.kind !== 'relation_reveal') return
    const lineHits = raycaster.intersectObjects(sceneObjs.lines.concat(assocLines.map(l => l.line)))
    if (lineHits.length > 0 && assocLines.some(al => al.line === lineHits[0].object)) {
      const al = assocLines.find(al => al.line === lineHits[0].object)
      if (al) { tooltipText = al.data.evidence?.[0]?.excerpt || ''; canvasRef.value!.style.cursor = 'pointer' }
    } else { tooltipText = '' }
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
}

function clearAssoc() {
  if (!sceneObjs) return
  assocLines.forEach(al => {
    sceneObjs!.scene.remove(al.line)
    al.line.geometry?.dispose()
    if (al.line.material) {
      const m = al.line.material
      if (Array.isArray(m)) m.forEach(x => x.dispose())
      else m.dispose()
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
    // 恢复所有节点位置 + opacity
    for (const m of sceneObjs.nodes) {
      m.userData.targetPosition = m.userData.homePosition.clone()
    }
    resetNodeAlpha(sceneObjs.nodes)
    tweenCamera(sceneObjs.camera, controls, new THREE.Vector3(0, 2.5, 5.5), new THREE.Vector3(0, 0, 0), 60, 800)
  } else if (s.kind === 'region_zoom') {
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
      <NodeDetailCard />
      <div v-if="tooltipText && store.state.kind === 'relation_reveal'" class="tooltip">{{ tooltipText }}</div>

      <!-- 快捷键提示 -->
      <div
        v-if="store.state.kind === 'global_overview' && hintVisible"
        class="shortcuts-hint"
        :class="{ fade: hintDismissed }"
      >
        R 显示关联 &nbsp; Esc 返回 &nbsp; 滚轮缩放 &nbsp; 拖拽旋转 &nbsp; Ctrl+K 搜索
      </div>
    </template>
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
</style>

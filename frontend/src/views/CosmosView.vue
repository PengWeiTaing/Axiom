<script setup lang="ts">
/** CosmosView — Atlas 球形树宿主组件 */
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'
import { initScene, createAssociationLines, fadeNodes, resetNodeAlpha } from '@/cosmos/scene'
import { tweenCamera, updateTween } from '@/cosmos/camera'
import type { CosmosState } from '@/cosmos/types'
import type { LayoutNode } from '@/cosmos/layout'
import * as THREE from 'three'
import Breadcrumb from '@/components/cosmos/Breadcrumb.vue'

const store = useCosmosStore()
const canvasRef = ref<HTMLCanvasElement | null>(null)

let sceneObjs: Awaited<ReturnType<typeof initScene>> | null = null
let controls: any = null
let animFrame = 0
let assocLines: { line: THREE.Line; data: any; fromNode: LayoutNode; toNode: LayoutNode }[] = []
let tooltipText = ''

async function start() {
  if (!store.data || !canvasRef.value) return
  const Three = await import('three')
  const OrbitControls = (await import('three/examples/jsm/controls/OrbitControls.js')).OrbitControls

  sceneObjs = await initScene(canvasRef.value, store.data)
  controls = new OrbitControls(sceneObjs.camera, sceneObjs.renderer.domElement)
  controls.enableDamping = true; controls.dampingFactor = 0.08
  controls.enableZoom = true; controls.zoomSpeed = 0.6
  controls.enablePan = false
  controls.minDistance = 0.5; controls.maxDistance = 6.0

  const raycaster = new Three.Raycaster()
  const mouse = new Three.Vector2()

  canvasRef.value.addEventListener('click', (e: MouseEvent) => {
    if (!sceneObjs) return
    mouse.x = (e.offsetX / canvasRef.value!.clientWidth) * 2 - 1
    mouse.y = -(e.offsetY / canvasRef.value!.clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, sceneObjs.camera)
    const hits = raycaster.intersectObjects(sceneObjs.pickables)
    if (hits.length === 0) return
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
    if (!sceneObjs || store.state.kind !== 'relation_reveal') return
    mouse.x = (e.offsetX / canvasRef.value!.clientWidth) * 2 - 1
    mouse.y = -(e.offsetY / canvasRef.value!.clientHeight) * 2 + 1
    raycaster.setFromCamera(mouse, sceneObjs.camera)
    const lineHits = raycaster.intersectObjects(sceneObjs.lines.concat(assocLines.map(l => l.line)))
    if (lineHits.length > 0 && assocLines.some(al => al.line === lineHits[0].object)) {
      const al = assocLines.find(al => al.line === lineHits[0].object)
      if (al) { tooltipText = al.data.evidence?.[0]?.excerpt || ''; canvasRef.value!.style.cursor = 'pointer' }
    } else { tooltipText = ''; canvasRef.value!.style.cursor = '' }
  })

  window.addEventListener('keydown', onKey)
  animate()
}

function onKey(e: KeyboardEvent) {
  const s = store.state
  if (e.key === 'Escape') {
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
  assocLines = createAssociationLines(sceneObjs.scene, store.data, sceneObjs.layoutNodes, focusId)
  const visibleIds = new Set<string>([focusId])
  assocLines.forEach(al => { visibleIds.add(al.fromNode.id); visibleIds.add(al.toNode.id) })
  fadeNodes(sceneObjs.nodes, visibleIds)
}

function clearAssoc() {
  if (!sceneObjs) return
  assocLines.forEach(al => { sceneObjs!.scene.remove(al.line); al.line.geometry.dispose(); (al.line.material as THREE.Material).dispose() })
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

  sceneObjs.renderer.render(sceneObjs.scene, sceneObjs.camera)
}

function onStateChange() {
  if (!sceneObjs) return
  const s = store.state
  const nodes = sceneObjs.layoutNodes
  if (s.kind === 'region_zoom' || s.kind === 'node_focus') {
    const targetId = s.kind === 'region_zoom' ? (s as any).lifeline_id : (s as any).entity_id
    const n = nodes.find(ln => ln.id === targetId)
    if (n) {
      const dir = n.position.clone().normalize()
      const dist = s.kind === 'region_zoom' ? n.position.length() + 1.8 : n.position.length() + 0.6
      const camPos = dir.clone().multiplyScalar(dist)
      tweenCamera(sceneObjs.camera, controls, camPos, n.position, s.kind === 'node_focus' ? 38 : 55, 800)
    }
  } else if (s.kind === 'global_overview') {
    tweenCamera(sceneObjs.camera, controls, new THREE.Vector3(0, 2, 4), new THREE.Vector3(0, 0, 0), 60, 800)
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
})
</script>

<template>
  <div class="cosmos-view">
    <div class="cosmos-hud">
      <Breadcrumb :state="store.state" @nav="(s: CosmosState) => store.transition(s)" />
    </div>
    <canvas ref="canvasRef" class="cosmos-canvas" />
    <div v-if="tooltipText && store.state.kind === 'relation_reveal'" class="tooltip">{{ tooltipText }}</div>
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
</style>

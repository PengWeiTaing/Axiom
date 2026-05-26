<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import type { LayoutNode } from '@/cosmos/layout'

const props = defineProps<{
  layoutNodes: LayoutNode[]
  camera: THREE.PerspectiveCamera
  controls: any
  worldRadius: number
  focusedLifelineId?: string | null
}>()

const emit = defineEmits<{
  (e: 'jump', position: THREE.Vector3, target: THREE.Vector3): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const MAP_SIZE = 180
let animId = 0

function project(pos: THREE.Vector3): { x: number; y: number } {
  const scale = MAP_SIZE / (props.worldRadius * 2.4)
  const cx = MAP_SIZE / 2
  const cy = MAP_SIZE / 2
  return { x: cx + pos.x * scale, y: cy - pos.z * scale }
}

function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  canvas.width = MAP_SIZE * dpr
  canvas.height = MAP_SIZE * dpr
  ctx.scale(dpr, dpr)

  // Background
  ctx.fillStyle = 'rgba(7, 9, 13, 0.85)'
  ctx.beginPath()
  ctx.roundRect(0, 0, MAP_SIZE, MAP_SIZE, 8)
  ctx.fill()

  // Static ring
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(MAP_SIZE / 2, MAP_SIZE / 2, MAP_SIZE / 2.6, 0, Math.PI * 2)
  ctx.stroke()

  // R1 and R2 nodes
  const r1Nodes = props.layoutNodes.filter(n => n.layer === 1)
  const r2Nodes = props.layoutNodes.filter(n => n.layer === 2)

  for (const n of r2Nodes) {
    const p = project(n.position)
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill()
  }

  for (const n of r1Nodes) {
    const p = project(n.position)
    if (n.id === props.focusedLifelineId) {
      ctx.strokeStyle = '#6ee7d0'
      ctx.lineWidth = 2
      ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.stroke()
    }
    ctx.fillStyle = '#6ee7d0'
    ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fill()
  }

  // Camera viewport indicator
  if (props.camera && props.controls) {
    const camPos = props.camera.position
    const cp = project(camPos)
    const target = props.controls.target || new THREE.Vector3(0, 0, 0)
    const tp = project(target)

    ctx.strokeStyle = '#6ee7d0'
    ctx.lineWidth = 1
    const vw = 22 + (camPos.length() - 2) * 5
    const vh = 16 + (camPos.length() - 2) * 3.5
    ctx.strokeRect(cp.x - vw / 2, cp.y - vh / 2, vw, vh)

    // Direction line from camera to target
    ctx.beginPath()
    ctx.moveTo(cp.x, cp.y)
    ctx.lineTo(tp.x, tp.y)
    ctx.strokeStyle = 'rgba(110,231,208,0.3)'
    ctx.stroke()
  }

  animId = requestAnimationFrame(draw)
}

function onClick(e: MouseEvent) {
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  const mx = e.offsetX
  const my = e.offsetY
  const scale = MAP_SIZE / (props.worldRadius * 2.4)
  const cx = MAP_SIZE / 2; const cy = MAP_SIZE / 2
  const wx = (mx - cx) / scale
  const wz = -(my - cy) / scale
  const dir = new THREE.Vector3(wx, 0.3, wz).normalize()
  const camPos = dir.clone().multiplyScalar(4.5)
  const lookTarget = new THREE.Vector3(0, 0, 0)
  emit('jump', camPos, lookTarget)
}

onMounted(() => { animId = requestAnimationFrame(draw) })
onBeforeUnmount(() => { cancelAnimationFrame(animId) })
</script>

<template>
  <canvas ref="canvasRef" class="minimap" :width="180" :height="180" @click="onClick" />
</template>

<style scoped>
.minimap {
  width: 180px;
  height: 180px;
  border-radius: var(--r-2);
  cursor: pointer;
  flex-shrink: 0;
}
</style>

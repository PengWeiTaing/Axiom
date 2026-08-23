<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps<{ mode: string }>();
const canvas = ref<HTMLCanvasElement | null>(null);

let context: CanvasRenderingContext2D | null = null;
let frame = 0;
let width = 0;
let height = 0;
let dpr = 1;
let lastPaint = 0;
let pointerX = 0.72;
let pointerY = 0.34;
let targetX = pointerX;
let targetY = pointerY;
let reducedMotion = false;

const palettes: Record<string, [number, number, number]> = {
  today: [225, 165, 88],
  capture: [225, 165, 88],
  library: [134, 173, 158],
  search: [134, 173, 158],
  atlas: [115, 136, 173],
};

function resize() {
  if (!canvas.value) return;
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 1.6);
  canvas.value.width = Math.max(1, Math.floor(width * dpr));
  canvas.value.height = Math.max(1, Math.floor(height * dpr));
  canvas.value.style.width = `${width}px`;
  canvas.value.style.height = `${height}px`;
  context = canvas.value.getContext('2d');
  context?.setTransform(dpr, 0, 0, dpr, 0, 0);
  paint(performance.now());
}

function onPointerMove(event: PointerEvent) {
  targetX = event.clientX / Math.max(width, 1);
  targetY = event.clientY / Math.max(height, 1);
}

function rgba(rgb: [number, number, number], alpha: number) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

function paint(timestamp: number) {
  if (!context || !width || !height) return;
  const ctx = context;
  const pigment = palettes[props.mode] || [205, 194, 172];
  const time = reducedMotion ? 0 : timestamp * 0.00012;

  pointerX += (targetX - pointerX) * 0.025;
  pointerY += (targetY - pointerY) * 0.025;
  ctx.clearRect(0, 0, width, height);
  ctx.lineCap = 'square';

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(242, 237, 225, 0.022)';
  const columns = width < 760 ? 4 : 9;
  for (let index = 1; index < columns; index += 1) {
    const x = Math.round((width / columns) * index) + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  const contourCount = width < 760 ? 7 : 11;
  const left = width < 760 ? -80 : width * 0.18;
  const span = width - left + 100;
  for (let line = 0; line < contourCount; line += 1) {
    const depth = line / Math.max(contourCount - 1, 1);
    const base = height * (0.12 + depth * 0.78);
    const amplitude = height * (0.018 + depth * 0.024);
    ctx.beginPath();
    for (let point = 0; point <= 36; point += 1) {
      const ratio = point / 36;
      const x = left + span * ratio;
      const nearPointer = Math.exp(-Math.pow(ratio - pointerX, 2) * 12);
      const wave = Math.sin(ratio * 8.4 + line * 0.63 + time * (1 + depth))
        + Math.sin(ratio * 3.1 - line * 0.31 - time * 0.7) * 0.46;
      const y = base + wave * amplitude + nearPointer * (pointerY - 0.5) * 18;
      if (point === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = rgba(pigment, 0.018 + (1 - depth) * 0.024);
    ctx.lineWidth = line === 2 ? 1.15 : 0.7;
    ctx.stroke();
  }

  const markerY = height * (0.27 + pointerY * 0.08);
  ctx.strokeStyle = rgba(pigment, 0.14);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width * 0.62, markerY);
  ctx.lineTo(width * 0.94, markerY + Math.sin(time * 2) * 5);
  ctx.stroke();

  ctx.fillStyle = rgba(pigment, 0.3);
  for (let index = 0; index < 5; index += 1) {
    const x = width * (0.67 + index * 0.052);
    const y = markerY + Math.sin(index * 1.7 + time * 2) * 5;
    const size = index === 2 ? 2 : 1;
    ctx.fillRect(Math.round(x), Math.round(y), size, size);
  }
}

function animate(timestamp: number) {
  frame = requestAnimationFrame(animate);
  if (timestamp - lastPaint < 48) return;
  lastPaint = timestamp;
  paint(timestamp);
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  resize();
  if (!reducedMotion) frame = requestAnimationFrame(animate);
});

watch(() => props.mode, () => paint(performance.now()));

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener('resize', resize);
  window.removeEventListener('pointermove', onPointerMove);
});
</script>

<template>
  <canvas
    ref="canvas"
    class="axiom-atmosphere"
    :class="`is-${mode}`"
    aria-hidden="true"
  />
</template>

<style scoped>
.axiom-atmosphere {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 1;
  transition: opacity var(--t-slow) var(--ease);
}

.axiom-atmosphere.is-atlas {
  opacity: 0;
}
</style>

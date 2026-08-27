<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps<{ mode: string }>();
const canvas = ref<HTMLCanvasElement | null>(null);

let context: CanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;
let dpr = 1;
let pointerX = 0.68;
let targetX = pointerX;
let frame = 0;

const palettes: Record<string, [number, number, number]> = {
  today: [211, 109, 82],
  capture: [211, 109, 82],
  library: [124, 164, 200],
  search: [124, 164, 200],
};

function seeded(index: number, salt: number): number {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function resize() {
  if (!canvas.value) return;
  width = window.innerWidth;
  height = window.innerHeight;
  dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.value.width = Math.max(1, Math.floor(width * dpr));
  canvas.value.height = Math.max(1, Math.floor(height * dpr));
  canvas.value.style.width = `${width}px`;
  canvas.value.style.height = `${height}px`;
  context = canvas.value.getContext('2d');
  context?.setTransform(dpr, 0, 0, dpr, 0, 0);
  paint();
}

function onPointerMove(event: PointerEvent) {
  targetX = event.clientX / Math.max(width, 1);
  if (!frame) frame = requestAnimationFrame(settlePointer);
}

function settlePointer() {
  frame = 0;
  pointerX += (targetX - pointerX) * 0.16;
  paint();
  if (Math.abs(targetX - pointerX) > 0.002) frame = requestAnimationFrame(settlePointer);
}

function paint() {
  if (!context || !width || !height) return;
  const ctx = context;
  const pigment = palettes[props.mode] || [88, 115, 99];
  ctx.clearRect(0, 0, width, height);

  // Sparse graphite grain keeps the field tactile without turning the shell
  // into a paper simulation or running an idle animation.
  const fibreCount = Math.round((width * height) / 7200);
  ctx.lineWidth = 0.6;
  for (let index = 0; index < fibreCount; index += 1) {
    const x = seeded(index, 1) * width;
    const y = seeded(index, 2) * height;
    const length = 2 + seeded(index, 3) * 11;
    const slope = (seeded(index, 4) - 0.5) * 2.4;
    ctx.strokeStyle = `rgba(228, 233, 223, ${0.012 + seeded(index, 5) * 0.018})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + length, y + slope);
    ctx.stroke();
  }

  const guideX = Math.round(width * (0.075 + pointerX * 0.035)) + 0.5;
  ctx.strokeStyle = `rgba(${pigment[0]}, ${pigment[1]}, ${pigment[2]}, 0.17)`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(guideX, height * 0.12);
  ctx.lineTo(guideX, height * 0.88);
  ctx.stroke();

  ctx.fillStyle = `rgba(${pigment[0]}, ${pigment[1]}, ${pigment[2]}, 0.72)`;
  ctx.fillRect(guideX - 1, height * 0.12, 3, 38);

  ctx.strokeStyle = 'rgba(228, 233, 223, 0.035)';
  for (let index = 0; index < 5; index += 1) {
    const y = Math.round(height * (0.22 + index * 0.135)) + 0.5;
    ctx.beginPath();
    ctx.moveTo(width * 0.80, y);
    ctx.lineTo(width * (0.93 + seeded(index, 7) * 0.04), y);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(228, 233, 223, 0.022)';
  for (let index = 0; index < 3; index += 1) {
    const radius = Math.max(width, height) * (0.40 + index * 0.16);
    ctx.beginPath();
    ctx.arc(width * 0.94, height * 0.08, radius, Math.PI * 0.56, Math.PI * 1.02);
    ctx.stroke();
  }
}

onMounted(() => {
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  resize();
});

watch(() => props.mode, paint);

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  window.removeEventListener('resize', resize);
  window.removeEventListener('pointermove', onPointerMove);
});
</script>

<template>
  <canvas ref="canvas" class="axiom-atmosphere" :class="`is-${mode}`" aria-hidden="true" />
</template>

<style scoped>
.axiom-atmosphere {
  position: fixed;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.9;
}

.axiom-atmosphere.is-atlas {
  opacity: 0;
}
</style>

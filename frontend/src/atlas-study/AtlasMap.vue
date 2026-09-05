<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Minus, Plus, LocateFixed } from '@lucide/vue';
import { deltaImage, materials, regions, relations } from './data';
import { neighborhood } from './model';
import type { AtlasMaterial, RegionId } from './model';

const props = defineProps<{ selected: string | null; region: RegionId | null; rejected: boolean }>();
const emit = defineEmits<{ select: [id: string] }>();
const viewport = ref<HTMLElement | null>(null);
const width = ref(1440);
const height = ref(760);
const zoom = ref(1);
const pan = ref({ x: 0, y: 0 });
const dragging = ref(false);
const imageFailed = ref(false);
const mobile = computed(() => width.value < 650);
const fit = computed(() => mobile.value ? 1 : Math.min(width.value / 1400, height.value / 760));
const scale = computed(() => fit.value * zoom.value);
const context = computed(() => neighborhood(props.selected || '', relations));
const selectedMaterial = computed(() => materials.find(item => item.id === props.selected));
const visibleMaterials = computed(() => mobile.value
  ? materials.filter(item => item.region === (props.region || selectedMaterial.value?.region || 'practice'))
  : materials);
const coordinates = computed(() => new Map(visibleMaterials.value.map((item, index) => [item.id,
  mobile.value ? { x: 30 + (index % 2) * 28, y: index === 0 ? 40 : 210 + (index - 1) * 104 } : { x: item.x, y: item.y }])));
const visibleEdges = computed(() => relations.filter(edge => coordinates.value.has(edge.from) && coordinates.value.has(edge.to)));
const basePan = computed(() => {
  if (mobile.value) return { x: 0, y: 0 };
  const anchor = selectedMaterial.value || (props.region ? regions.find(item => item.id === props.region) : null);
  if (anchor) return { x: width.value * (props.selected ? 0.35 : 0.5) - anchor.x * scale.value, y: height.value * 0.42 - anchor.y * scale.value };
  return { x: (width.value - 1400 * scale.value) / 2, y: (height.value - 760 * scale.value) / 2 };
});
const worldStyle = computed(() => ({
  transform: `translate(${basePan.value.x + pan.value.x}px, ${basePan.value.y + pan.value.y}px) scale(${scale.value})`,
  width: `${mobile.value ? width.value : 1400}px`, height: `${mobile.value ? 730 : 760}px`,
}));

function nodeClass(item: AtlasMaterial) {
  return {
    'is-selected': item.id === props.selected,
    'is-first': context.value.first.has(item.id),
    'is-second': context.value.second.has(item.id),
    'is-dimmed': props.selected ? item.id !== props.selected && !context.value.first.has(item.id) && !context.value.second.has(item.id) : props.region && props.region !== item.region,
  };
}
function edgeClass(from: string, to: string) {
  const primary = from === props.selected || to === props.selected;
  const secondary = !primary && (context.value.first.has(from) || context.value.first.has(to));
  return { 'edge-primary': primary, 'edge-secondary': secondary,
    'edge-dimmed': props.selected && !primary && !secondary };
}
function point(id: string) { return coordinates.value.get(id)!; }
function changeZoom(amount: number) { zoom.value = Math.max(0.75, Math.min(1.7, zoom.value + amount)); }
function resetCamera() { zoom.value = props.selected && !mobile.value ? 1.12 : 1; pan.value = { x: 0, y: 0 }; }
let start: { x: number; y: number; panX: number; panY: number } | null = null;
function pointerDown(event: PointerEvent) {
  if (mobile.value || event.button !== 0 || (event.target as Element).closest('button, a')) return;
  start = { x: event.clientX, y: event.clientY, panX: pan.value.x, panY: pan.value.y };
  viewport.value?.setPointerCapture(event.pointerId);
  dragging.value = true;
}
function pointerMove(event: PointerEvent) {
  if (!start) return;
  pan.value = { x: start.panX + event.clientX - start.x, y: start.panY + event.clientY - start.y };
}
function pointerUp() { start = null; dragging.value = false; }
function wheel(event: WheelEvent) {
  if (mobile.value || (!event.ctrlKey && !event.metaKey)) return;
  event.preventDefault();
  changeZoom(event.deltaY > 0 ? -0.05 : 0.05);
}
let observer: ResizeObserver;
onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    if (entry && entry.contentRect.width > 0) { width.value = entry.contentRect.width; height.value = entry.contentRect.height; }
  });
  if (viewport.value) observer.observe(viewport.value);
});
onBeforeUnmount(() => observer?.disconnect());
watch(() => [props.selected, props.region], resetCamera);
watch(mobile, resetCamera);
</script>

<template>
  <div ref="viewport" class="atlas-map" :class="{ 'is-dragging': dragging, 'has-focus': selected, 'is-mobile-map': mobile }"
    aria-label="认识地图" @pointerdown="pointerDown" @pointermove="pointerMove" @pointerup="pointerUp" @pointercancel="pointerUp" @wheel="wheel">
    <div class="map-world" :class="{ 'without-transition': dragging }" :style="worldStyle">
      <svg class="map-lines" :viewBox="`0 0 ${mobile ? width : 1400} ${mobile ? 730 : 760}`" aria-hidden="true">
        <path v-for="edge in visibleEdges" :key="edge.id"
          :d="`M ${point(edge.from).x} ${point(edge.from).y} L ${point(edge.to).x} ${point(edge.to).y}`"
          :class="[edge.kind, edgeClass(edge.from, edge.to), { 'is-rejected': rejected && edge.id === 'limit-wip' }]" />
      </svg>
      <template v-if="!mobile">
        <div v-for="(area, index) in regions" :key="area.id" class="region-heading" :class="[`tone-${area.id}`, { 'is-dimmed': selected || (region && region !== area.id) }]"
          :style="{ left: `${area.x}px`, top: `${area.y}px` }">
          <span class="region-number">0{{ index + 1 }}</span>
          <h2>{{ area.title }}</h2>
        </div>
      </template>
      <button v-for="item in visibleMaterials" :key="item.id" type="button" class="map-material" :class="[item.kind, `tone-${item.region}`, nodeClass(item), { featured: item.featured }]"
        :style="{ left: `${point(item.id).x}px`, top: `${point(item.id).y}px`, width: `${mobile ? Math.min(width - point(item.id).x - 25, 295) : (item.width || 180)}px` }"
        :aria-label="item.title.replace('\n', '')" :aria-pressed="selected === item.id" @click="emit('select', item.id)">
        <span class="material-dot" aria-hidden="true"></span>
        <span class="material-content">
          <template v-if="item.id === 'delta'">
            <img v-if="!imageFailed" :src="deltaImage" alt="勒拿河三角洲的分支河道，NASA / USGS 卫星影像" width="177" height="112" @error="imageFailed = true" />
            <span v-else class="image-fallback">Landsat 7 / 勒拿河三角洲</span>
          </template>
          <span v-if="item.featured && item.id !== 'delta'" class="material-origin">{{ item.provenance }}</span>
          <span class="material-title">{{ item.title }}</span>
          <span v-if="item.featured" class="material-excerpt" :class="{ formula: item.id === 'little' }">{{ item.summary }}</span>
          <span v-if="selected === item.id" class="selection-mark">正在看</span>
        </span>
      </button>
    </div>
    <div v-if="!mobile" class="map-controls" aria-label="地图缩放">
      <button class="icon-button" type="button" aria-label="缩小" title="缩小" :disabled="zoom <= 0.75" @click="changeZoom(-0.15)"><Minus :size="17" /></button>
      <output>{{ Math.round(zoom * 100) }}%</output>
      <button class="icon-button" type="button" aria-label="放大" title="放大" :disabled="zoom >= 1.7" @click="changeZoom(0.15)"><Plus :size="17" /></button>
      <button class="icon-button reset-camera" type="button" aria-label="重新定位" title="重新定位" @click="resetCamera"><LocateFixed :size="18" /></button>
    </div>
  </div>
</template>

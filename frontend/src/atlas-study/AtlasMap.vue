<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Minus, Plus, LocateFixed } from '@lucide/vue';
import { deltaImage, materials, regions, relations } from './data';
import { localReadingMaterials, neighborhood } from './model';
import type { AtlasMaterial, RegionId } from './model';
import { spatialNames } from './spatial-visuals';

const props = defineProps<{ selected: string | null; region: RegionId | null; rejected: boolean }>();
const emit = defineEmits<{ select: [id: string] }>();
const viewport = ref<HTMLElement | null>(null);
const world = ref<HTMLElement | null>(null);
const mobilePositions = ref(new Map<string, { x: number; y: number }>());
const contentHeight = ref(730);
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
  ? localReadingMaterials(materials, relations, props.selected, props.region)
  : materials);
const coordinates = computed(() => new Map(visibleMaterials.value.map((item, index) => [item.id,
  mobile.value ? mobilePositions.value.get(item.id) || { x: 30 + (index % 2) * 28, y: 40 } : { x: item.x, y: item.y }])));
const visibleEdges = computed(() => relations.filter(edge => coordinates.value.has(edge.from) && coordinates.value.has(edge.to)));
const basePan = computed(() => {
  if (mobile.value) return { x: 0, y: 0 };
  const anchor = selectedMaterial.value || (props.region ? regions.find(item => item.id === props.region) : null);
  if (anchor) return { x: width.value * (props.selected ? 0.35 : 0.5) - anchor.x * scale.value, y: height.value * 0.42 - anchor.y * scale.value };
  return { x: (width.value - 1400 * scale.value) / 2, y: (height.value - 760 * scale.value) / 2 };
});
const worldStyle = computed(() => mobile.value ? {} : ({
  transform: `translate(${basePan.value.x + pan.value.x}px, ${basePan.value.y + pan.value.y}px) scale(${scale.value})`,
  width: '1400px', height: '760px',
}));

function measureMobilePositions() {
  if (!mobile.value || !world.value) return;
  const bounds = world.value.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const positions = new Map<string, { x: number; y: number }>();
  for (const element of world.value.querySelectorAll<HTMLElement>('[data-material-id]')) {
    const dot = element.querySelector('.material-dot')!.getBoundingClientRect();
    positions.set(element.dataset.materialId!, { x: dot.x - bounds.x + dot.width / 2, y: dot.y - bounds.y + dot.height / 2 });
  }
  mobilePositions.value = positions; contentHeight.value = bounds.height;
}

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
  observer = new ResizeObserver(() => {
    const bounds = viewport.value?.getBoundingClientRect();
    if (bounds && bounds.width > 0) { width.value = bounds.width; height.value = bounds.height; }
    measureMobilePositions();
  });
  if (viewport.value) observer.observe(viewport.value);
  if (world.value) observer.observe(world.value);
});
onBeforeUnmount(() => observer?.disconnect());
const cameras = new Map<string, { zoom: number; pan: { x: number; y: number } }>();
const cameraKey = ([selected, region]: readonly (string | null)[]) => `${region || 'all'}:${selected || 'overview'}`;
watch(() => [props.selected, props.region] as const, (current, previous) => {
  if (previous && !mobile.value) cameras.set(cameraKey(previous), { zoom: zoom.value, pan: { ...pan.value } });
  const saved = !mobile.value && cameras.get(cameraKey(current));
  if (saved) { zoom.value = saved.zoom; pan.value = { ...saved.pan }; }
  else resetCamera();
});
watch(mobile, () => { cameras.clear(); resetCamera(); });
watch([visibleMaterials, mobile], measureMobilePositions, { flush: 'post' });
</script>

<template>
  <div ref="viewport" class="atlas-map" :class="{ 'is-dragging': dragging, 'has-focus': selected, 'is-mobile-map': mobile }"
    aria-label="认识地图" @pointerdown="pointerDown" @pointermove="pointerMove" @pointerup="pointerUp" @pointercancel="pointerUp" @wheel="wheel">
    <div ref="world" class="map-world" :class="{ 'without-transition': dragging }" :style="worldStyle">
      <svg class="map-lines" :viewBox="`0 0 ${mobile ? width : 1400} ${mobile ? contentHeight : 760}`" aria-hidden="true">
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
      <button v-for="(item, index) in visibleMaterials" :key="item.id" type="button" class="map-material" :data-material-id="item.id" :class="[item.kind, `tone-${item.region}`, nodeClass(item), { featured: item.featured }]"
        :style="mobile ? { '--mobile-indent': `${30 + (index % 2) * 28}px` } : { left: `${point(item.id).x}px`, top: `${point(item.id).y}px`, width: `${item.width || 180}px` }"
        :aria-label="item.title.replace('\n', '')" :aria-pressed="selected === item.id" @click="emit('select', item.id)">
        <span class="material-dot" aria-hidden="true"></span>
        <span class="material-content">
          <template v-if="item.id === 'delta' && item.id !== selected">
            <img v-if="!imageFailed" :src="deltaImage" alt="勒拿河三角洲的分支河道，NASA / USGS 卫星影像" width="177" height="112" @error="imageFailed = true" />
            <span v-else class="image-fallback">Landsat 7 / 勒拿河三角洲</span>
          </template>
          <span v-if="item.featured && item.id !== 'delta' && item.id !== selected" class="material-origin">{{ item.provenance }}</span>
          <span class="material-title">{{ item.id === selected ? spatialNames[item.id] : item.title }}</span>
          <span v-if="item.featured && item.id !== selected" class="material-excerpt" :class="{ formula: item.id === 'little' }">{{ item.summary }}</span>
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

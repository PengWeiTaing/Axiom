<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ArrowUpRight, LocateFixed, Map as MapIcon, Minus, Plus, RotateCw } from '@lucide/vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { materials, regions, relations } from './data';
import type { RegionId } from './model';
import { buildSpatialLayout } from './spatial-layout';

const props = defineProps<{ active: boolean }>();
const emit = defineEmits<{ select: [id: string]; region: [id: RegionId]; reading: [] }>();
const host = ref<HTMLElement | null>(null);
const failed = ref(false);
const ready = ref(false);
const hovered = ref<string | null>(null);
const hoveredRegion = ref<RegionId | null>(null);
const hoveredMaterial = computed(() => materials.find(item => item.id === hovered.value));
const labels = new Map<string, HTMLElement>();
const hits = new Map<string, HTMLElement>();
const stems = new Map<string, SVGPathElement>();
const nodes = buildSpatialLayout(materials, relations);
const positions = new Map(nodes.map(node => [node.id, new THREE.Vector3(node.x, node.y, node.z)]));
const colors: Record<RegionId, string> = { practice: '#bdd3c5', systems: '#a6c5df', attention: '#d6a68d', time: '#c9bf99' };
const domains = regions.map(region => {
  const members = nodes.filter(node => node.region === region.id);
  const center = members.reduce((sum, node) => sum.add(positions.get(node.id)!), new THREE.Vector3()).divideScalar(members.length);
  return { ...region, count: members.length, center };
});
const linked = computed(() => new Set(relations.filter(edge => edge.from === hovered.value || edge.to === hovered.value).flatMap(edge => [edge.from, edge.to])));
let renderer: THREE.WebGLRenderer | undefined;
let controls: OrbitControls | undefined;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let points: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
let lines: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>;
let observer: ResizeObserver;
let frame = 0;
let lastTime = 0;
let introUntil = 0;
let gesture = false;
let width = 1;
let height = 1;
let homeDistance = 800;
let disposed = false;
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const vector = new THREE.Vector3();

function bindElement(map: Map<string, HTMLElement>, id: string, element: unknown) {
  if (element instanceof HTMLElement) map.set(id, element); else map.delete(id);
}
function project(position: THREE.Vector3) {
  vector.copy(position).project(camera);
  return { x: (vector.x + 1) * width / 2, y: (1 - vector.y) * height / 2, depth: vector.z };
}
function placeLabels() {
  const placed: { x: number; y: number; w: number; h: number }[] = [];
  for (const domain of domains) {
    const element = labels.get(domain.id);
    if (!element) continue;
    const anchor = project(domain.center);
    const w = element.offsetWidth, h = element.offsetHeight;
    let x = Math.min(width - w - 18, Math.max(18, anchor.x + (anchor.x < width / 2 ? -w - 28 : 28)));
    let y = Math.min(height - h - 85, Math.max(100, anchor.y - h / 2));
    for (let attempt = 0; attempt < 8; attempt++) {
      const collision = placed.find(box => x < box.x + box.w + 14 && x + w + 14 > box.x && y < box.y + box.h + 15 && y + h + 15 > box.y);
      if (!collision) break;
      y = collision.y + collision.h + 20;
      if (y + h > height - 80) { y = Math.max(100, collision.y - h - 20); x = x < width / 2 ? width - w - 18 : 18; }
    }
    placed.push({ x, y, w, h });
    element.style.transform = `translate(${x}px, ${y}px)`;
    const endX = anchor.x < x ? x - 9 : anchor.x > x + w ? x + w + 9 : x + w / 2;
    stems.get(domain.id)?.setAttribute('d', `M ${anchor.x} ${anchor.y} L ${endX} ${y + h / 2}`);
  }
  for (const node of nodes) {
    const element = hits.get(node.id);
    if (!element) continue;
    const p = project(positions.get(node.id)!);
    element.style.transform = `translate(${p.x - 13}px, ${p.y - 13}px)`;
    element.style.visibility = p.depth > -1 && p.depth < 1 && p.x > 0 && p.x < width && p.y > 75 && p.y < height - 75 ? 'visible' : 'hidden';
    element.style.zIndex = `${Math.round((1 - p.depth) * 100)}`;
  }
}
function recolor() {
  if (!points || !lines) return;
  const values = points.geometry.getAttribute('color');
  const sizes = points.geometry.getAttribute('size');
  const color = new THREE.Color();
  nodes.forEach((node, index) => {
    const relevant = hovered.value ? linked.value.has(node.id) : !hoveredRegion.value || node.region === hoveredRegion.value;
    color.set(colors[node.region]).multiplyScalar(relevant ? 1 : 0.25);
    values.setXYZ(index, color.r, color.g, color.b);
    sizes.setX(index, node.id === hovered.value ? 9 : 4.8 + Math.min(node.degree, 6) * 0.25);
  });
  values.needsUpdate = true; sizes.needsUpdate = true;
  const lineColors = lines.geometry.getAttribute('color');
  relations.forEach((edge, index) => {
    const relevant = hovered.value ? edge.from === hovered.value || edge.to === hovered.value : !hoveredRegion.value || nodes.find(node => node.id === edge.from)?.region === hoveredRegion.value || nodes.find(node => node.id === edge.to)?.region === hoveredRegion.value;
    [edge.from, edge.to].forEach((id, end) => {
      const region = nodes.find(node => node.id === id)!.region;
      color.set(colors[region]).multiplyScalar(relevant ? hovered.value || hoveredRegion.value ? 0.9 : 0.48 : 0.12);
      lineColors.setXYZ(index * 2 + end, color.r, color.g, color.b);
    });
  });
  lineColors.needsUpdate = true;
  requestRender();
}
function stopIntro() { introUntil = 0; }
function onGestureStart() { gesture = true; stopIntro(); }
function onGestureEnd() { gesture = false; requestRender(); }
function render(now: number) {
  frame = 0;
  if (!renderer || !props.active || document.hidden || disposed || failed.value) return;
  const rotating = !motionQuery.matches && !gesture && now < introUntil;
  controls!.autoRotate = rotating;
  const changed = controls!.update(Math.min((now - lastTime) / 1000 || 0, 0.05));
  lastTime = now;
  camera.updateMatrixWorld();
  renderer.render(scene, camera);
  placeLabels();
  if (rotating || changed || gesture) requestRender();
}
function requestRender() {
  if (!frame && props.active && !document.hidden && !failed.value && !disposed) frame = requestAnimationFrame(render);
}
function visibilityChanged() {
  if (document.hidden || !props.active) { cancelAnimationFrame(frame); frame = 0; stopIntro(); }
  else requestRender();
}
function resetCamera() {
  if (!camera || !controls) return;
  stopIntro();
  camera.position.set(0.8, 0.85, 1).normalize().multiplyScalar(homeDistance * 0.78);
  controls.target.set(0, 0, 0);
  controls.update(); requestRender();
}
function zoom(amount: number) {
  if (!camera || !controls) return;
  stopIntro();
  const offset = camera.position.clone().sub(controls.target);
  const distance = THREE.MathUtils.clamp(offset.length() * amount, controls.minDistance, controls.maxDistance);
  camera.position.copy(controls.target).add(offset.setLength(distance));
  controls.update(); requestRender();
}
function turn() {
  if (!camera || !controls) return;
  stopIntro();
  const offset = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 8);
  camera.position.copy(controls.target).add(offset); controls.update(); requestRender();
}
function contextLost(event: Event) { event.preventDefault(); failed.value = true; cancelAnimationFrame(frame); frame = 0; }
function resize() {
  if (!host.value || !renderer) return;
  const bounds = host.value.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  width = bounds.width; height = bounds.height;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setSize(width, height, false);
  points.material.uniforms.pixelRatio!.value = renderer.getPixelRatio();
  camera.aspect = width / height; camera.updateProjectionMatrix();
  const oldDistance = homeDistance;
  homeDistance = 245 / Math.sin(THREE.MathUtils.degToRad(20)) / Math.min(1, camera.aspect) * 1.15;
  if (!ready.value) resetCamera();
  else camera.position.sub(controls!.target).multiplyScalar(homeDistance / oldDistance).add(controls!.target);
  controls!.minDistance = homeDistance * 0.5;
  controls!.maxDistance = homeDistance * 2.4;
  ready.value = true; requestRender();
}

onMounted(() => {
  try {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, 1, 1, 5000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor('#171919', 0);
    renderer.domElement.setAttribute('aria-label', '三维知识全貌');
    renderer.domElement.setAttribute('role', 'img');
    renderer.domElement.className = 'spatial-canvas';
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    host.value!.prepend(renderer.domElement);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(nodes.flatMap(node => [node.x, node.y, node.z]), 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(nodes.length * 3), 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(new Float32Array(nodes.length), 1));
    points = new THREE.Points(geometry, new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, vertexColors: true,
      uniforms: { pixelRatio: { value: 1 } },
      vertexShader: `attribute float size; uniform float pixelRatio; varying vec3 pointColor;
        void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); pointColor = color;
          gl_PointSize = clamp(size * 950.0 / -mv.z, 3.5, 12.0) * pixelRatio;
          gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying vec3 pointColor; void main() {
        float r = length(gl_PointCoord - vec2(0.5)); if (r > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.25, 0.5, r);
        gl_FragColor = vec4(pointColor, alpha);
        #include <colorspace_fragment>
        }`,
    }));
    scene.add(points);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(relations.flatMap(edge => [...positions.get(edge.from)!.toArray(), ...positions.get(edge.to)!.toArray()]), 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(relations.length * 6), 3));
    lines = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false }));
    scene.add(lines);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7; controls.autoRotateSpeed = 0.7;
    controls.addEventListener('change', requestRender); controls.addEventListener('start', onGestureStart); controls.addEventListener('end', onGestureEnd);
    observer = new ResizeObserver(resize); observer.observe(host.value!);
    document.addEventListener('visibilitychange', visibilityChanged);
    motionQuery.addEventListener('change', visibilityChanged);
    resize(); recolor();
    if (!motionQuery.matches) introUntil = performance.now() + 3500;
  } catch { failed.value = true; }
});
watch([hovered, hoveredRegion], () => { stopIntro(); recolor(); });
watch(() => props.active, visibilityChanged);
onBeforeUnmount(() => {
  disposed = true; cancelAnimationFrame(frame); observer?.disconnect();
  document.removeEventListener('visibilitychange', visibilityChanged); motionQuery.removeEventListener('change', visibilityChanged);
  controls?.dispose(); points?.geometry.dispose(); points?.material.dispose(); lines?.geometry.dispose(); lines?.material.dispose();
  renderer?.domElement.removeEventListener('webglcontextlost', contextLost); renderer?.dispose(); renderer?.domElement.remove();
});
</script>

<template>
  <section ref="host" class="spatial-overview" :class="{ 'is-ready': ready, 'spatial-failed': failed }" aria-label="Atlas 三维全貌">
    <div class="spatial-heading"><h1>Atlas</h1><button class="quiet-command" type="button" @click="emit('reading')"><MapIcon :size="17" />二维阅读</button></div>
    <template v-if="!failed">
      <svg class="spatial-leaders" aria-hidden="true"><path v-for="domain in domains" :key="domain.id" :ref="element => { if (element) stems.set(domain.id, element as SVGPathElement); }" /></svg>
      <button v-for="node in nodes" :key="node.id" :ref="element => bindElement(hits, node.id, element)" class="spatial-hit" type="button"
        :aria-label="`查看${materials.find(item => item.id === node.id)!.title.replace('\n', '')}`" :data-spatial-node="node.id"
        @pointerenter="hovered = node.id" @pointerleave="hovered = null" @focus="hovered = node.id" @blur="hovered = null" @click="emit('select', node.id)"></button>
      <button v-for="domain in domains" :key="domain.id" :ref="element => bindElement(labels, domain.id, element)" class="spatial-domain" :class="`tone-${domain.id}`"
        type="button" :aria-label="`展开${domain.title}`" :data-spatial-region="domain.id" @pointerenter="hoveredRegion = domain.id" @pointerleave="hoveredRegion = null"
        @focus="hoveredRegion = domain.id" @blur="hoveredRegion = null" @click="emit('region', domain.id)">
        <span class="domain-name">{{ domain.title }}</span><span class="domain-count">{{ domain.count }} 个片段 <ArrowUpRight :size="13" /></span>
      </button>
      <div class="spatial-controls" aria-label="三维视角">
        <button class="icon-button" type="button" aria-label="拉远三维视角" title="拉远" @click="zoom(1.16)"><Minus :size="17" /></button>
        <button class="icon-button" type="button" aria-label="拉近三维视角" title="拉近" @click="zoom(0.86)"><Plus :size="17" /></button>
        <button class="icon-button" type="button" aria-label="转动三维视角" title="转动视角" @click="turn"><RotateCw :size="17" /></button>
        <button class="icon-button" type="button" aria-label="恢复三维全貌" title="恢复全貌" @click="resetCamera"><LocateFixed :size="18" /></button>
      </div>
    </template>
    <div v-else class="spatial-fallback"><p>三维画面暂时无法显示。</p><button class="quiet-command" type="button" @click="emit('reading')">进入二维阅读 <ArrowUpRight :size="16" /></button></div>
    <footer class="spatial-footer"><span v-if="hoveredMaterial" class="spatial-caption">{{ hoveredMaterial.title.replace('\n', '') }}</span><span v-else>4 个领域<span class="spatial-footer-separator">/</span>20 个片段</span><span class="spatial-demo">演示集合</span></footer>
  </section>
</template>

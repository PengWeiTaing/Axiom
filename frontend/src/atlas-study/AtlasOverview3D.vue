<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ArrowUpRight, BookOpen, CircleHelp, FileText, Image, Lightbulb, LocateFixed, Map as MapIcon, Minus, Plus, RotateCw } from '@lucide/vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { polygonHull } from 'd3-polygon';
import { materials, regions, relations } from './data';
import type { RegionId } from './model';
import { buildSpatialLayout } from './spatial-layout';
import { depthAppearance, findRearCrossings, placeSpatialLabels, spatialKinds, spatialNames, spatialTones } from './spatial-visuals';

const props = defineProps<{ active: boolean }>();
const emit = defineEmits<{ select: [id: string]; region: [id: RegionId]; reading: [] }>();
const host = ref<HTMLElement | null>(null);
const failed = ref(false), ready = ref(false);
const hovered = ref<string | null>(null), hoveredRegion = ref<RegionId | null>(null);
const hoveredMaterial = computed(() => materials.find(item => item.id === hovered.value));
const elements = new Map<string, Element>();
const nodes = buildSpatialLayout(materials, relations).map(node => ({ ...node, material: materials.find(item => item.id === node.id)! }));
const positions = new Map(nodes.map(node => [node.id, new THREE.Vector3(node.x, node.y, node.z)]));
const domains = regions.map(region => ({ ...region, members: nodes.filter(node => node.region === region.id) }));
const icons = { question: CircleHelp, note: FileText, research: BookOpen, image: Image, hypothesis: Lightbulb };
const linked = computed(() => new Set(relations.filter(edge => edge.from === hovered.value || edge.to === hovered.value).flatMap(edge => [edge.from, edge.to])));
const edgeKinds = { context: '关联', hypothesis: '待验证的联系', limit: '限制与反例' };
let renderer: THREE.WebGLRenderer | undefined, controls: OrbitControls | undefined;
let scene: THREE.Scene, camera: THREE.PerspectiveCamera;
let points: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
let observer: ResizeObserver;
let frame = 0, lastTime = 0, width = 1, height = 1, homeDistance = 800;
let gesture = false, disposed = false;
let pointerDown: { x: number; y: number } | null = null;
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const vector = new THREE.Vector3();
const projected = new Map<string, { x: number; y: number; depth: number; distance: number; viewDistance: number }>();

function bind(key: string, element: unknown) {
  if (element instanceof Element) elements.set(key, element); else elements.delete(key);
}
function attrs(key: string, values: Record<string, string | number>) {
  const element = elements.get(key);
  if (element) for (const [name, value] of Object.entries(values)) element.setAttribute(name, String(value));
}
function related(id: string) {
  return hovered.value ? id === hovered.value || linked.value.has(id) : !hoveredRegion.value || nodes.find(node => node.id === id)!.region === hoveredRegion.value;
}
function projectScene() {
  const distances = nodes.map(node => -vector.copy(positions.get(node.id)!).applyMatrix4(camera.matrixWorldInverse).z);
  const near = Math.min(...distances), range = Math.max(1, Math.max(...distances) - near);
  nodes.forEach((node, index) => {
    vector.copy(positions.get(node.id)!).project(camera);
    projected.set(node.id, { x: (vector.x + 1) * width / 2, y: (1 - vector.y) * height / 2, depth: vector.z, distance: (distances[index]! - near) / range, viewDistance: distances[index]! });
  });
}
function paintScene() {
  const color = new THREE.Color();
  const values = points.geometry.getAttribute('color'), sizes = points.geometry.getAttribute('size');
  const opacity = points.geometry.getAttribute('opacity'), rings = points.geometry.getAttribute('ring');
  nodes.forEach((node, index) => {
    const p = projected.get(node.id)!, appearance = depthAppearance(p.distance), relevant = related(node.id);
    color.set(spatialTones[node.region]);
    values.setXYZ(index, color.r, color.g, color.b);
    sizes.setX(index, hovered.value === node.id ? 11 : appearance.pointSize);
    opacity.setX(index, appearance.pointOpacity * (relevant ? 1 : 0.22));
    rings.setX(index, appearance.ring && hovered.value !== node.id ? 1 : 0);
    const element = elements.get('node:' + node.id) as HTMLElement | undefined;
    if (element) {
      element.style.setProperty('--depth-opacity', String(appearance.labelOpacity));
      element.dataset.depth = appearance.tier;
      element.dataset.related = String(relevant);
    }
  });
  for (const attribute of [values, sizes, opacity, rings]) attribute.needsUpdate = true;
  const gaps = findRearCrossings(relations.map(edge => {
    const a = projected.get(edge.from)!, b = projected.get(edge.to)!;
    return { id: edge.id, from: { x: a.x, y: a.y, distance: a.viewDistance }, to: { x: b.x, y: b.y, distance: b.viewDistance } };
  }));
  for (const edge of relations) {
    const a = projected.get(edge.from)!, b = projected.get(edge.to)!;
    const appearance = depthAppearance((a.distance + b.distance) / 2);
    const active = hovered.value ? edge.from === hovered.value || edge.to === hovered.value : !!hoveredRegion.value && related(edge.from) && related(edge.to);
    const muted = (hovered.value || hoveredRegion.value) && !active;
    const d = 'M ' + a.x + ' ' + a.y + ' L ' + b.x + ' ' + b.y;
    const stroke = active ? 1.8 : appearance.edgeWidth;
    const alpha = muted ? 0.09 : active ? 0.95 : appearance.edgeOpacity;
    attrs('gradient:' + edge.id, { x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    attrs('start:' + edge.id, { 'stop-opacity': 1 - a.distance * 0.5 });
    attrs('end:' + edge.id, { 'stop-opacity': 1 - b.distance * 0.5 });
    attrs('edge:' + edge.id, { d, 'stroke-width': stroke, opacity: alpha });
    attrs('holes:' + edge.id, { d: gaps.get(edge.id)!.map(p => 'M ' + (p.x - 3) + ' ' + p.y + ' a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0').join(' ') });
  }
}
function placeLabels() {
  const bounds = { x: 18, y: 94, w: width - 36, h: height - 194 };
  const requests = nodes.map(node => {
    const el = elements.get('node:' + node.id) as HTMLElement;
    const p = projected.get(node.id)!;
    return { id: 'node:' + node.id, x: p.x, y: p.y, w: el.offsetWidth, h: el.offsetHeight, priority: 10 + node.degree };
  });
  for (const domain of domains) {
    const members = domain.members.map(node => projected.get(node.id)!);
    const center = members.reduce((sum, p) => ({ x: sum.x + p.x / members.length, y: sum.y + p.y / members.length }), { x: 0, y: 0 });
    const padding = width < 650 ? 18 : 32;
    const hull = polygonHull(members.flatMap(p => [[p.x - padding, p.y], [p.x, p.y - padding], [p.x + padding, p.y], [p.x, p.y + padding]] as [number, number][]));
    const d = hull ? 'M ' + hull.map(p => p.join(' ')).join(' L ') + ' Z' : '';
    attrs('field:' + domain.id, { d }); attrs('texture:' + domain.id, { d });
    const element = elements.get('domain:' + domain.id) as HTMLElement;
    const minY = Math.min(...members.map(p => p.y));
    requests.push({ id: 'domain:' + domain.id, x: center.x, y: minY - padding - 38, w: element.offsetWidth, h: element.offsetHeight, priority: 40 });
  }
  const boxes = placeSpatialLabels(requests, bounds, [...projected.values()]);
  for (const request of requests) {
    const element = elements.get(request.id) as HTMLElement, box = boxes.get(request.id);
    element.style.visibility = box ? 'visible' : 'hidden';
    if (!box) continue;
    element.style.transform = 'translate(' + box.x + 'px, ' + box.y + 'px)';
    if (request.id.startsWith('node:')) {
      const id = request.id.slice(5), p = projected.get(id)!;
      const endX = Math.max(box.x, Math.min(box.x + box.w, p.x));
      const endY = Math.max(box.y, Math.min(box.y + box.h, p.y));
      attrs('stem:' + id, { d: 'M ' + p.x + ' ' + p.y + ' L ' + endX + ' ' + endY, opacity: related(id) ? 0.3 : 0.08 });
      element.style.visibility = p.depth > -1 && p.depth < 1 ? 'visible' : 'hidden';
    }
  }
}
function onGestureStart() { gesture = true; }
function onGestureEnd() { gesture = false; requestRender(); }
function render(now: number) {
  frame = 0;
  if (!renderer || !props.active || document.hidden || disposed || failed.value) return;
  const changed = controls!.update(Math.min((now - lastTime) / 1000 || 0, 0.05));
  lastTime = now;
  camera.updateMatrixWorld();
  projectScene(); paintScene(); placeLabels(); renderer.render(scene, camera);
  if (changed || gesture) requestRender();
}
function requestRender() {
  if (!frame && props.active && !document.hidden && !failed.value && !disposed) frame = requestAnimationFrame(render);
}
function visibilityChanged() {
  if (document.hidden || !props.active) { cancelAnimationFrame(frame); frame = 0; hovered.value = null; hoveredRegion.value = null; }
  else requestRender();
}
function resetCamera() {
  if (!camera || !controls) return;
  camera.position.set(0.8, 0.85, 1).normalize().multiplyScalar(homeDistance * 0.78);
  controls.target.set(0, 0, 0);
  controls.update(); requestRender();
}
function zoom(amount: number) {
  if (!camera || !controls) return;
  const offset = camera.position.clone().sub(controls.target);
  const distance = THREE.MathUtils.clamp(offset.length() * amount, controls.minDistance, controls.maxDistance);
  camera.position.copy(controls.target).add(offset.setLength(distance)); controls.update(); requestRender();
}
function turn() {
  if (!camera || !controls) return;
  const offset = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 8);
  camera.position.copy(controls.target).add(offset); controls.update(); requestRender();
}
function contextLost(event: Event) { event.preventDefault(); failed.value = true; cancelAnimationFrame(frame); frame = 0; }
function canvasDown(event: PointerEvent) { pointerDown = { x: event.clientX, y: event.clientY }; }
function canvasUp(event: PointerEvent) {
  if (!pointerDown || Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y) > 5) { pointerDown = null; return; }
  pointerDown = null;
  const rect = host.value!.getBoundingClientRect();
  const target = nodes.filter(node => { const p = projected.get(node.id)!; return Math.hypot(p.x - event.clientX + rect.x, p.y - event.clientY + rect.y) < 14; })
    .sort((a, b) => projected.get(a.id)!.distance - projected.get(b.id)!.distance)[0];
  if (target) emit('select', target.id);
}
function resize() {
  if (!host.value || !renderer) return;
  const bounds = host.value.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  width = bounds.width; height = bounds.height;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setSize(width, height, false);
  points.material.uniforms.pixelRatio!.value = renderer.getPixelRatio();
  camera.aspect = width / height; camera.updateProjectionMatrix();
  const oldDistance = homeDistance;
  homeDistance = 245 / Math.sin(THREE.MathUtils.degToRad(20)) / Math.min(1, camera.aspect) * 1.15;
  if (!ready.value) resetCamera();
  else camera.position.sub(controls!.target).multiplyScalar(homeDistance / oldDistance).add(controls!.target);
  controls!.minDistance = homeDistance * 0.5; controls!.maxDistance = homeDistance * 2.4;
  ready.value = true; requestRender();
}

onMounted(() => {
  try {
    scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(40, 1, 1, 5000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); renderer.setClearColor('#171919', 0);
    renderer.domElement.setAttribute('aria-label', '三维知识全貌'); renderer.domElement.setAttribute('role', 'img'); renderer.domElement.className = 'spatial-canvas';
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    renderer.domElement.addEventListener('pointerdown', canvasDown); renderer.domElement.addEventListener('pointerup', canvasUp);
    host.value!.prepend(renderer.domElement);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(nodes.flatMap(node => [node.x, node.y, node.z]), 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(nodes.length * 3), 3));
    for (const name of ['size', 'opacity', 'ring']) geometry.setAttribute(name, new THREE.Float32BufferAttribute(new Float32Array(nodes.length), 1));
    points = new THREE.Points(geometry, new THREE.ShaderMaterial({
      transparent: true, depthWrite: true, vertexColors: true,
      uniforms: { pixelRatio: { value: 1 } },
      vertexShader: `attribute float size; attribute float opacity; attribute float ring;
        uniform float pixelRatio; varying vec3 pointColor; varying float pointOpacity; varying float pointRing;
        void main() { pointColor = color; pointOpacity = opacity; pointRing = ring;
          gl_PointSize = size * pixelRatio;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 pointColor; varying float pointOpacity; varying float pointRing;
        void main() { float r = length(gl_PointCoord - vec2(0.5)); if (r > 0.5) discard;
          float alpha = (1.0 - smoothstep(0.36, 0.5, r)) * mix(1.0, smoothstep(0.16, 0.3, r), pointRing);
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(pointColor, alpha * pointOpacity);
          #include <colorspace_fragment>
        }`,
    }));
    scene.add(points);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.enablePan = false;
    controls.rotateSpeed = 0.55; controls.zoomSpeed = 0.7;
    controls.addEventListener('change', requestRender); controls.addEventListener('start', onGestureStart); controls.addEventListener('end', onGestureEnd);
    observer = new ResizeObserver(resize); observer.observe(host.value!);
    document.addEventListener('visibilitychange', visibilityChanged); motionQuery.addEventListener('change', visibilityChanged);
    document.fonts.ready.then(() => { if (!disposed) requestRender(); });
    resize();
  } catch { failed.value = true; }
});
watch([hovered, hoveredRegion], requestRender);
watch(() => props.active, visibilityChanged);
onBeforeUnmount(() => {
  disposed = true; cancelAnimationFrame(frame); observer?.disconnect();
  document.removeEventListener('visibilitychange', visibilityChanged); motionQuery.removeEventListener('change', visibilityChanged);
  controls?.dispose(); points?.geometry.dispose(); points?.material.dispose();
  renderer?.domElement.removeEventListener('webglcontextlost', contextLost);
  renderer?.domElement.removeEventListener('pointerdown', canvasDown); renderer?.domElement.removeEventListener('pointerup', canvasUp);
  renderer?.dispose(); renderer?.domElement.remove();
});
</script>

<template>
  <section ref="host" class="spatial-overview" :class="{ 'is-ready': ready, 'spatial-failed': failed, 'has-focus': hovered || hoveredRegion }" aria-label="Atlas 三维全貌">
    <div class="spatial-heading"><h1>Atlas</h1><button class="quiet-command" type="button" @click="emit('reading')"><MapIcon :size="17" />二维阅读</button></div>
    <template v-if="!failed">
      <svg class="spatial-fields" aria-hidden="true">
        <defs>
          <pattern id="spatial-systems-lines" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><path d="M 0 0 L 0 12" stroke="#9bbfdf" stroke-width=".6" opacity=".15" /></pattern>
          <pattern id="spatial-time-lines" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M 0 2 L 5 2" stroke="#c9bc85" stroke-width=".7" opacity=".25" /></pattern>
        </defs>
        <g v-for="domain in domains" :key="domain.id" :class="`spatial-field field-${domain.id}`" :style="{ '--field-tone': spatialTones[domain.id] }">
          <path :ref="el => bind(`field:${domain.id}`, el)" class="field-shape" :data-spatial-field="domain.id" />
          <path :ref="el => bind(`texture:${domain.id}`, el)" :fill="domain.id === 'systems' || domain.id === 'time' ? `url(#spatial-${domain.id}-lines)` : 'none'" />
        </g>
      </svg>
      <svg class="spatial-connections" aria-hidden="true">
        <defs><linearGradient v-for="edge in relations" :id="`spatial-edge-${edge.id}`" :key="edge.id" :ref="el => bind(`gradient:${edge.id}`, el)" gradientUnits="userSpaceOnUse">
          <stop :ref="el => bind(`start:${edge.id}`, el)" offset="0" :stop-color="spatialTones[materials.find(item => item.id === edge.from)!.region]" />
          <stop :ref="el => bind(`end:${edge.id}`, el)" offset="1" :stop-color="spatialTones[materials.find(item => item.id === edge.to)!.region]" />
        </linearGradient>
        <mask v-for="edge in relations" :id="`spatial-mask-${edge.id}`" :key="edge.id" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          <rect width="100%" height="100%" fill="white" /><path :ref="el => bind(`holes:${edge.id}`, el)" fill="black" />
        </mask></defs>
        <g><g v-for="edge in relations" :key="edge.id" class="spatial-edge" :class="{ 'edge-active': hovered && (edge.from === hovered || edge.to === hovered) }" :data-relation="edge.kind">
          <title>{{ edgeKinds[edge.kind] }}：{{ edge.statement }}</title>
          <path :ref="el => bind(`edge:${edge.id}`, el)" :stroke="`url(#spatial-edge-${edge.id})`" :mask="`url(#spatial-mask-${edge.id})`" :stroke-dasharray="edge.kind === 'hypothesis' ? '7 5' : edge.kind === 'limit' ? '2 4' : undefined" class="edge-ink" />
        </g></g>
        <path v-for="node in nodes" :key="node.id" :ref="el => bind(`stem:${node.id}`, el)" class="spatial-node-stem" :stroke="spatialTones[node.region]" />
      </svg>
      <button v-for="node in nodes" :key="node.id" :ref="el => bind(`node:${node.id}`, el)" class="spatial-hit" :class="{ 'is-active': hovered === node.id }" :style="{ '--node-tone': spatialTones[node.region] }" type="button"
        :aria-label="`查看${node.material.title.replace('\n', '')}`" :title="`${spatialKinds[node.material.kind]}：${node.material.title.replace('\n', '')}`" :data-spatial-node="node.id"
        @pointerenter="hovered = node.id" @pointerleave="hovered = null" @focus="hovered = node.id" @blur="hovered = null" @click="emit('select', node.id)">
        <component :is="icons[node.material.kind]" :size="13" :stroke-width="1.6" aria-hidden="true" /><span>{{ spatialNames[node.id] || node.material.title.replace('\n', '') }}</span>
      </button>
      <button v-for="domain in domains" :key="domain.id" :ref="el => bind(`domain:${domain.id}`, el)" class="spatial-domain" :style="{ '--tone': spatialTones[domain.id] }"
        type="button" :aria-label="`展开${domain.title}`" :data-spatial-region="domain.id" @pointerenter="hoveredRegion = domain.id" @pointerleave="hoveredRegion = null"
        @focus="hoveredRegion = domain.id" @blur="hoveredRegion = null" @click="emit('region', domain.id)">
        <span class="domain-name">{{ domain.title }}</span><span class="domain-count">{{ domain.members.length }} 个片段 <ArrowUpRight :size="13" /></span>
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

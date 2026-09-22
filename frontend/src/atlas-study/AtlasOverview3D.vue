<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ArrowUpRight, BookOpen, CircleHelp, FileText, Image, Lightbulb, LocateFixed, Map as MapIcon, Minus, Plus, RotateCw } from '@lucide/vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { materials, regions, relations } from './data';
import type { RegionId } from './model';
import { buildSpatialLayout } from './spatial-layout';
import { depthAppearance, selectAnchoredLabels, spatialKinds, spatialNames, spatialTones } from './spatial-visuals';
import type { AnchoredLabel } from './spatial-visuals';

const props = defineProps<{ active: boolean }>();
const emit = defineEmits<{ select: [id: string]; region: [id: RegionId]; reading: [] }>();
const host = ref<HTMLElement | null>(null);
const failed = ref(false), ready = ref(false), moving = ref(false);
const hovered = ref<string | null>(null), hoveredRegion = ref<RegionId | null>(null);
const hoveredMaterial = computed(() => materials.find(item => item.id === hovered.value));
const nodes = buildSpatialLayout(materials, relations).map(node => ({ ...node, material: materials.find(item => item.id === node.id)! }));
const leftLabels = new Set(['unfinished', 'week-note', 'attention-note', 'little', 'pause', 'waiting']);
const overviewBridges = new Set<string>();
const regionPairs = new Set<string>();
for (const edge of relations) {
  const a = nodes.find(node => node.id === edge.from)!.region, b = nodes.find(node => node.id === edge.to)!.region;
  const pair = [a, b].sort().join(':');
  if (a !== b && !regionPairs.has(pair)) { regionPairs.add(pair); overviewBridges.add(edge.id); }
}
const positions = new Map(nodes.map(node => [node.id, new THREE.Vector3(node.x, node.y, node.z)]));
const domains = regions.map((region, index) => {
  const members = nodes.filter(node => node.region === region.id);
  const center = new THREE.Vector3();
  members.forEach(node => center.addScaledVector(positions.get(node.id)!, 1 / members.length));
  return { ...region, index, members, center };
});
const icons = { question: CircleHelp, note: FileText, research: BookOpen, image: Image, hypothesis: Lightbulb };
const linked = computed(() => new Set(relations.filter(edge => edge.from === hovered.value || edge.to === hovered.value).flatMap(edge => [edge.from, edge.to])));
const elements = new Map<string, HTMLElement>();
const edges = new Map<string, THREE.Line<THREE.BufferGeometry, THREE.LineDashedMaterial>>();
const projected = new Map<string, { x: number; y: number; z: number; depth: number }>();
let renderer: THREE.WebGLRenderer | undefined, controls: OrbitControls | undefined;
let scene: THREE.Scene, camera: THREE.PerspectiveCamera;
let points: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
let observer: ResizeObserver;
let frame = 0, width = 1, height = 1, homeDistance = 800;
let disposed = false, dirty = true, fontsReady = false;
let visibleLabels = new Set<string>();
let labelRequests: AnchoredLabel[] = [];
const vector = new THREE.Vector3();
const homeDirection = new THREE.Vector3(0.08, 0.13, 1).normalize();

function bind(id: string, element: unknown) {
  if (element instanceof HTMLElement) elements.set(id, element); else elements.delete(id);
}
function isRelated(id: string) {
  return hovered.value ? linked.value.has(id) : !hoveredRegion.value || nodes.find(node => node.id === id)!.region === hoveredRegion.value;
}

function project() {
  const distances = nodes.map(node => -vector.copy(positions.get(node.id)!).applyMatrix4(camera.matrixWorldInverse).z);
  const near = Math.min(...distances), range = Math.max(1, Math.max(...distances) - near);
  labelRequests = [];
  nodes.forEach((node, index) => {
    vector.copy(positions.get(node.id)!).project(camera);
    const point = { x: (vector.x + 1) * width / 2, y: (1 - vector.y) * height / 2, z: vector.z, depth: (distances[index]! - near) / range };
    projected.set(node.id, point);
    const hit = elements.get('hit:' + node.id), label = elements.get('label:' + node.id);
    if (hit) {
      hit.style.transform = `translate(${point.x - 12}px, ${point.y - 12}px)`;
      hit.style.visibility = point.z > -1 && point.z < 1 && point.y > 100 && point.y < height - 80 ? 'visible' : 'hidden';
      hit.dataset.anchorX = String(point.x); hit.dataset.anchorY = String(point.y);
    }
    if (label && point.z > -1 && point.z < 1) {
      // Always the same side and offset, including while orbiting or zooming.
      labelRequests.push({ id: 'label:' + node.id, x: leftLabels.has(node.id) ? point.x - label.offsetWidth - 12 : point.x + 12, y: point.y + (node.id === 'unfinished' ? 9 : -13),
        w: label.offsetWidth, h: label.offsetHeight, priority: (node.material.featured ? 30 : 10) + node.degree * 0.01 });
    }
  });
  for (const domain of domains) {
    const below = width < 650 && (domain.id === 'attention' || domain.id === 'time');
    vector.copy(domain.center).project(camera);
    const el = elements.get('domain:' + domain.id);
    if (!el || vector.z <= -1 || vector.z >= 1) continue;
    const members = domain.members.map(node => projected.get(node.id)!).filter(point => point.z > -1 && point.z < 1);
    if (!members.length) continue;
    // Keep a screen-space reading gap while following the projected topic, not the viewport.
    const y = below ? Math.max(...members.map(point => point.y)) + 18 : Math.min(...members.map(point => point.y)) - el.offsetHeight - 14;
    labelRequests.push({ id: 'domain:' + domain.id, x: (vector.x + 1) * width / 2 - el.offsetWidth / 2,
      y, w: el.offsetWidth, h: el.offsetHeight, priority: 200, domain: true });
  }
}
function paintLabels() {
  if (!fontsReady) return;
  const distance = camera.position.distanceTo(controls!.target);
  const close = distance < homeDistance * 0.84;
  const budget = close ? 20 : width < 650 ? 5 : width < 1000 ? 9 : 13;
  const requests = labelRequests.map(item => ({ ...item, priority: item.id === 'label:' + hovered.value ? 150 : item.priority }));
  const obstacles = [...projected.values()].filter(p => p.z > -1 && p.z < 1).map(p => ({ x: p.x - 6, y: p.y - 6, w: 12, h: 12 }));
  visibleLabels = selectAnchoredLabels(requests, { x: 12, y: width < 650 ? 100 : 80, w: width - 24, h: height - (width < 650 ? 208 : 172) }, budget, visibleLabels, obstacles);
  for (const [key, el] of elements) {
    if (!key.startsWith('label:') && !key.startsWith('domain:')) continue;
    const request = requests.find(item => item.id === key);
    const visible = visibleLabels.has(key);
    el.style.visibility = visible ? 'visible' : 'hidden';
    el.dataset.visible = String(visible);
    if (request) el.style.transform = `translate(${request.x}px, ${request.y}px)`;
  }
  host.value!.dataset.visibleLabels = String([...visibleLabels].filter(key => key.startsWith('label:')).length);
}
function paint() {
  const colors = points.geometry.getAttribute('color'), sizes = points.geometry.getAttribute('size');
  const alphas = points.geometry.getAttribute('opacity'), halos = points.geometry.getAttribute('halo');
  const color = new THREE.Color();
  nodes.forEach((node, index) => {
    const appearance = depthAppearance(projected.get(node.id)!.depth), relevant = isRelated(node.id);
    color.set(spatialTones[node.region]); colors.setXYZ(index, color.r, color.g, color.b);
    sizes.setX(index, hovered.value === node.id ? 20 : appearance.pointSize + (node.material.featured ? 1 : 0));
    alphas.setX(index, appearance.pointOpacity * (relevant ? 1 : 0.28));
    halos.setX(index, hovered.value === node.id ? 1 : 0);
    for (const prefix of ['label:', 'hit:']) {
      const el = elements.get(prefix + node.id);
      if (el) { el.dataset.depth = appearance.tier; el.dataset.related = String(relevant); el.style.setProperty('--depth-opacity', String(appearance.labelOpacity)); }
    }
  });
  for (const attribute of [colors, sizes, alphas, halos]) attribute.needsUpdate = true;
  let visibleEdges = 0, activeEdges = 0;
  for (const edge of relations) {
    const line = edges.get(edge.id)!;
    const a = nodes.find(node => node.id === edge.from)!, b = nodes.find(node => node.id === edge.to)!;
    const local = a.region === b.region;
    const active = hovered.value ? edge.from === hovered.value || edge.to === hovered.value : !!hoveredRegion.value && (a.region === hoveredRegion.value || b.region === hoveredRegion.value);
    const focused = hovered.value || hoveredRegion.value;
    if (active) activeEdges++;
    // One real bridge per topic pair; the rest emerge only on attention.
    line.visible = local || overviewBridges.has(edge.id) || !!active;
    if (line.visible) visibleEdges++;
    line.material.opacity = active ? 0.84 : focused ? 0.05 : local ? depthAppearance((projected.get(edge.from)!.depth + projected.get(edge.to)!.depth) / 2).edgeOpacity : 0.13;
  }
  host.value!.dataset.visibleEdges = String(visibleEdges);
  host.value!.dataset.activeEdges = String(activeEdges);
}
function render() {
  frame = 0;
  if (!renderer || !props.active || document.hidden || disposed || failed.value) return;
  camera.updateMatrixWorld();
  if (dirty) { project(); dirty = false; }
  paintLabels(); paint(); renderer.render(scene, camera);
}
function requestRender() {
  if (!frame && props.active && !document.hidden && !failed.value && !disposed) frame = requestAnimationFrame(render);
}
function geometryChanged() { dirty = true; requestRender(); }
function onGestureStart() { moving.value = true; hovered.value = null; hoveredRegion.value = null; }
function onGestureEnd() { moving.value = false; }
function visibilityChanged() {
  if (document.hidden || !props.active) { cancelAnimationFrame(frame); frame = 0; moving.value = false; hovered.value = null; hoveredRegion.value = null; }
  else requestRender();
}
function resetCamera() {
  if (!camera || !controls) return;
  visibleLabels.clear();
  camera.position.copy(homeDirection).multiplyScalar(homeDistance);
  controls.target.set(12, 0, 0); controls.update(); geometryChanged();
}
function zoom(amount: number) {
  if (!camera || !controls) return;
  const offset = camera.position.clone().sub(controls.target);
  const distance = THREE.MathUtils.clamp(offset.length() * amount, controls.minDistance, controls.maxDistance);
  camera.position.copy(controls.target).add(offset.setLength(distance)); controls.update(); geometryChanged();
}
function turn() {
  if (!camera || !controls) return;
  const offset = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 8);
  camera.position.copy(controls.target).add(offset); controls.update(); geometryChanged();
}
function contextLost(event: Event) { event.preventDefault(); failed.value = true; cancelAnimationFrame(frame); frame = 0; }
function resize() {
  if (!host.value || !renderer) return;
  const bounds = host.value.getBoundingClientRect();
  if (!bounds.width || !bounds.height || ready.value && width === bounds.width && height === bounds.height) return;
  width = bounds.width; height = bounds.height;
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setSize(width, height, false);
  points.material.uniforms.pixelRatio!.value = renderer.getPixelRatio();
  camera.aspect = width / height; camera.updateProjectionMatrix();
  const oldDistance = homeDistance;
  homeDistance = Math.max(740, 310 / Math.tan(THREE.MathUtils.degToRad(20)) / Math.min(1.12, camera.aspect));
  if (!ready.value) resetCamera();
  else camera.position.sub(controls!.target).multiplyScalar(homeDistance / oldDistance).add(controls!.target);
  controls!.minDistance = homeDistance * 0.5; controls!.maxDistance = homeDistance * 2.1;
  visibleLabels.clear(); ready.value = true; geometryChanged();
}

onMounted(() => {
  try {
    scene = new THREE.Scene(); camera = new THREE.PerspectiveCamera(40, 1, 1, 6000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }); renderer.setClearColor('#171919');
    renderer.domElement.setAttribute('aria-label', '三维知识全貌'); renderer.domElement.setAttribute('role', 'img'); renderer.domElement.className = 'spatial-canvas';
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    host.value!.prepend(renderer.domElement);
    for (const edge of relations) {
      const geometry = new THREE.BufferGeometry().setFromPoints([positions.get(edge.from)!, positions.get(edge.to)!]);
      const a = nodes.find(node => node.id === edge.from)!, b = nodes.find(node => node.id === edge.to)!;
      geometry.setAttribute('color', new THREE.Float32BufferAttribute([...new THREE.Color(spatialTones[a.region]).toArray(), ...new THREE.Color(spatialTones[b.region]).toArray()], 3));
      const line = new THREE.Line(geometry, new THREE.LineDashedMaterial({ vertexColors: true, transparent: true, depthWrite: false,
        dashSize: edge.kind === 'context' ? 10000 : edge.kind === 'hypothesis' ? 5 : 2, gapSize: 4 }));
      line.computeLineDistances(); edges.set(edge.id, line); scene.add(line);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(nodes.flatMap(node => [node.x, node.y, node.z]), 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(nodes.length * 3), 3));
    for (const name of ['size', 'opacity', 'halo']) geometry.setAttribute(name, new THREE.Float32BufferAttribute(new Float32Array(nodes.length), 1));
    points = new THREE.Points(geometry, new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, vertexColors: true,
      uniforms: { pixelRatio: { value: 1 } },
      vertexShader: `attribute float size; attribute float opacity; attribute float halo;
        uniform float pixelRatio; varying vec3 pointColor; varying float pointOpacity; varying float pointHalo;
        void main() { pointColor = color; pointOpacity = opacity; pointHalo = halo;
          gl_PointSize = size * pixelRatio; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `varying vec3 pointColor; varying float pointOpacity; varying float pointHalo;
        void main() { float r = length(gl_PointCoord - vec2(0.5)); if (r > 0.5) discard;
          float dot = 1.0 - smoothstep(0.34, 0.5, r);
          float focus = 1.0 - smoothstep(0.13, 0.19, r) + (1.0 - smoothstep(0.22, 0.5, r)) * 0.17;
          gl_FragColor = vec4(pointColor, min(1.0, mix(dot, focus, pointHalo)) * pointOpacity);
          #include <colorspace_fragment>
        }`,
    }));
    points.renderOrder = 2; scene.add(points);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false; controls.enablePan = false; controls.rotateSpeed = 0.5; controls.zoomSpeed = 0.65;
    controls.addEventListener('change', geometryChanged); controls.addEventListener('start', onGestureStart); controls.addEventListener('end', onGestureEnd);
    observer = new ResizeObserver(resize); observer.observe(host.value!);
    document.addEventListener('visibilitychange', visibilityChanged);
    document.fonts.ready.then(() => { if (!disposed) { fontsReady = true; geometryChanged(); } });
    resize();
  } catch { failed.value = true; }
});
watch([hovered, hoveredRegion], requestRender);
watch(() => props.active, visibilityChanged);
onBeforeUnmount(() => {
  disposed = true; cancelAnimationFrame(frame); observer?.disconnect();
  document.removeEventListener('visibilitychange', visibilityChanged);
  controls?.dispose(); points?.geometry.dispose(); points?.material.dispose();
  for (const object of edges.values()) { object.geometry.dispose(); object.material.dispose(); }
  renderer?.domElement.removeEventListener('webglcontextlost', contextLost); renderer?.dispose(); renderer?.domElement.remove();
});
</script>

<template>
  <section ref="host" class="spatial-overview" :class="{ 'is-ready': ready, 'spatial-failed': failed, 'has-focus': hovered || hoveredRegion, 'is-moving': moving }" aria-label="Atlas 三维全貌">
    <div class="spatial-heading">
      <h1>Atlas<span>全貌</span></h1>
      <button class="quiet-command spatial-reading" type="button" @click="emit('reading')"><MapIcon :size="17" />二维阅读</button>
    </div>
    <template v-if="!failed">
      <template v-for="node in nodes" :key="node.id">
        <button :ref="el => bind(`hit:${node.id}`, el)" class="spatial-dot-hit" type="button" :data-spatial-node="node.id" :data-region="node.region"
          :aria-label="`查看${node.material.title.replace('\n', '')}`" :title="`${spatialKinds[node.material.kind]}：${node.material.title.replace('\n', '')}`"
          @pointerenter="hovered = node.id" @pointerleave="hovered = null" @focus="hovered = node.id" @blur="hovered = null" @click="emit('select', node.id)"></button>
        <button :ref="el => bind(`label:${node.id}`, el)" class="spatial-hit" :class="{ 'is-active': hovered === node.id, 'is-landmark': node.material.featured }"
          :style="{ '--node-tone': spatialTones[node.region] }" type="button" :data-node-label="node.id" :data-region="node.region" tabindex="-1"
          :aria-label="`阅读${node.material.title.replace('\n', '')}`" :title="`${spatialKinds[node.material.kind]}：${node.material.title.replace('\n', '')}`"
          @pointerenter="hovered = node.id" @pointerleave="hovered = null" @click="emit('select', node.id)">
          <span>{{ spatialNames[node.id] }}</span>
        </button>
      </template>
      <button v-for="domain in domains" :key="domain.id" :ref="el => bind(`domain:${domain.id}`, el)" class="spatial-domain" :style="{ '--tone': spatialTones[domain.id] }"
        type="button" :aria-label="`展开${domain.title}`" :data-spatial-region="domain.id" @pointerenter="hoveredRegion = domain.id" @pointerleave="hoveredRegion = null"
        @focus="hoveredRegion = domain.id" @blur="hoveredRegion = null" @click="emit('region', domain.id)">
        <span class="domain-name">{{ domain.title }}<ArrowUpRight :size="14" /></span>
        <span class="domain-count">{{ domain.subtitle.split(' / ').join(' · ') }}<span>{{ String(domain.members.length).padStart(2, '0') }}</span></span>
      </button>
      <div class="spatial-controls" aria-label="三维视角">
        <button class="icon-button" type="button" aria-label="拉远三维视角" title="拉远" @click="zoom(1.16)"><Minus :size="17" /></button>
        <button class="icon-button" type="button" aria-label="拉近三维视角" title="拉近" @click="zoom(0.86)"><Plus :size="17" /></button>
        <button class="icon-button" type="button" aria-label="转动三维视角" title="转动视角" @click="turn"><RotateCw :size="17" /></button>
        <button class="icon-button" type="button" aria-label="恢复三维全貌" title="恢复全貌" @click="resetCamera"><LocateFixed :size="18" /></button>
      </div>
    </template>
    <div v-else class="spatial-fallback"><p>三维画面暂时无法显示。</p><button class="quiet-command" type="button" @click="emit('reading')">进入二维阅读 <ArrowUpRight :size="16" /></button></div>
    <footer class="spatial-footer">
      <span v-if="hoveredMaterial" class="spatial-caption"><component :is="icons[hoveredMaterial.kind]" :size="16" /><span>{{ hoveredMaterial.title.replace('\n', '') }}</span><small>{{ spatialKinds[hoveredMaterial.kind] }}</small></span>
      <span v-else>4 个领域<span class="spatial-footer-separator">/</span>20 个片段</span><span class="spatial-demo">演示集合</span>
    </footer>
  </section>
</template>

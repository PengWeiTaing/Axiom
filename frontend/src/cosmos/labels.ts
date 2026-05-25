/** CSS2D 标签 — 创建 + LOD 管理 */
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import type { LayoutNode } from './layout'
import type { CosmosState, CosmosAssociation } from './types'
import * as THREE from 'three'

export interface LabelEntry {
  object: CSS2DObject
  nodeId: string
  layer: number
  parentId?: string
}

export interface LabelGroup {
  entries: LabelEntry[]
  create(scene: THREE.Scene, layoutNodes: LayoutNode[]): void
  update(state: CosmosState, camera: THREE.Camera, associations?: CosmosAssociation[]): void
  syncPositions(meshes: THREE.Mesh[]): void
  dispose(): void
}

export function createLabelGroup(): LabelGroup {
  const entries: LabelEntry[] = []

  function create(scene: THREE.Scene, layoutNodes: LayoutNode[]) {
    for (const n of layoutNodes) {
      const div = document.createElement('div')
      div.className = 'cosmos-label'

      const maxLen = n.layer <= 2 ? 12 : 20
      const text = n.name.length > maxLen ? n.name.slice(0, maxLen - 1) + '…' : n.name
      div.textContent = text

      if (n.layer === 1) {
        div.style.cssText = 'font-size:11px;color:var(--accent);font-weight:600;white-space:nowrap;text-shadow:0 0 6px rgba(0,0,0,0.8)'
      } else if (n.layer === 2) {
        div.style.cssText = 'font-size:10px;color:var(--text-2);font-weight:500;white-space:nowrap;text-shadow:0 0 6px rgba(0,0,0,0.8)'
      } else {
        div.style.cssText = 'font-size:9px;color:var(--text-3);white-space:nowrap;text-shadow:0 0 4px rgba(0,0,0,0.8)'
        div.style.display = 'none'
      }

      const obj = new CSS2DObject(div)
      obj.position.copy(n.position)
      obj.userData = { nodeId: n.id, layer: n.layer, parentId: n.parentId }
      scene.add(obj)
      entries.push({ object: obj, nodeId: n.id, layer: n.layer, parentId: n.parentId })
    }
  }

  function update(
    state: CosmosState,
    camera: THREE.Camera,
    associations?: CosmosAssociation[]
  ) {
    const focusId = state.kind === 'node_focus' || state.kind === 'relation_reveal'
      ? (state as any).entity_id
      : null

    // 强关联节点 ID 集合
    const strongAssocIds = new Set<string>()
    if (focusId && associations) {
      for (const a of associations) {
        if (a.confidence >= 0.7 && a.status !== 'rejected') {
          if (a.from === focusId) strongAssocIds.add(a.to)
          if (a.to === focusId) strongAssocIds.add(a.from)
        }
      }
    }

    // 焦点所在 lifeline 的兄弟节点
    const focusLifelineId = new Set<string>()
    if (focusId) {
      const focusEntry = entries.find(e => e.nodeId === focusId)
      if (focusEntry && focusEntry.parentId) {
        focusLifelineId.add(focusEntry.parentId)
      }
    }
    const siblingIds = new Set<string>()
    for (const e of entries) {
      if (e.layer === 3 && e.parentId && focusLifelineId.has(e.parentId) && e.nodeId !== focusId) {
        siblingIds.add(e.nodeId)
      }
    }

    // R2 显隐：距相机距离
    const MAX_TOTAL = 24
    let maxR3 = 0
    if (state.kind === 'global_overview') {
      maxR3 = 0
    } else if (state.kind === 'region_zoom') {
      maxR3 = 12
    } else if (state.kind === 'node_focus' || state.kind === 'relation_reveal') {
      maxR3 = 15
    }

    // R3 节点按距离排序
    const r3Entries = entries.filter(e => e.layer === 3)
    const r3WithDist = r3Entries.map(e => ({
      entry: e,
      dist: e.object.position.distanceTo(camera.position),
    }))
    r3WithDist.sort((a, b) => a.dist - b.dist)

    // 决定哪些 R3 可见
    const r3VisibleIds = new Set<string>()
    if (focusId) r3VisibleIds.add(focusId)

    const siblingByDist = r3WithDist.filter(
      item => siblingIds.has(item.entry.nodeId) && !r3VisibleIds.has(item.entry.nodeId)
    )
    for (const item of siblingByDist.slice(0, 8)) {
      if (r3VisibleIds.size >= maxR3) break
      r3VisibleIds.add(item.entry.nodeId)
    }

    const strongByDist = r3WithDist.filter(
      item => strongAssocIds.has(item.entry.nodeId) && !r3VisibleIds.has(item.entry.nodeId)
    )
    for (const item of strongByDist.slice(0, 6)) {
      if (r3VisibleIds.size >= maxR3) break
      r3VisibleIds.add(item.entry.nodeId)
    }

    for (const item of r3WithDist) {
      if (r3VisibleIds.size >= maxR3) break
      if (!r3VisibleIds.has(item.entry.nodeId)) {
        r3VisibleIds.add(item.entry.nodeId)
      }
    }

    // 应用可见性
    let visibleCount = 0
    for (const e of entries) {
      const div = e.object.element as HTMLDivElement
      let show = false
      if (e.layer === 1) {
        show = true
      } else if (e.layer === 2) {
        if (state.kind === 'global_overview') {
          const dist = e.object.position.distanceTo(camera.position)
          show = dist < 3.5
        } else {
          show = true
        }
      } else {
        show = r3VisibleIds.has(e.nodeId) && visibleCount < MAX_TOTAL
      }
      if (show && visibleCount < MAX_TOTAL) {
        div.style.display = ''
        visibleCount++
      } else {
        div.style.display = 'none'
      }
    }
  }

  function syncPositions(meshes: THREE.Mesh[]) {
    const meshMap = new Map<string, THREE.Vector3>()
    for (const m of meshes) {
      meshMap.set(m.userData.id as string, m.position)
    }
    for (const e of entries) {
      const pos = meshMap.get(e.nodeId)
      if (pos) e.object.position.copy(pos)
    }
  }

  function dispose() {
    for (const e of entries) {
      e.object.removeFromParent()
    }
    entries.length = 0
  }

  return { entries, create, update, syncPositions, dispose }
}

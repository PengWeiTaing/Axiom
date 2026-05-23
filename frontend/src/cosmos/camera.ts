/** 摄像机控制 + cubic ease-in-out tween */
import * as THREE from 'three'

// Cubic ease-in-out
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

interface TweenTarget {
  position: THREE.Vector3
  target: THREE.Vector3
  fov: number
}

let activeTween: { elapsed: number; duration: number; from: TweenTarget; to: TweenTarget } | null = null

export function tweenCamera(
  cam: THREE.PerspectiveCamera,
  controls: { target: THREE.Vector3 },
  toPos: THREE.Vector3,
  toLookAt: THREE.Vector3,
  toFov: number,
  duration: number = 800
): void {
  activeTween = {
    elapsed: 0,
    duration,
    from: {
      position: cam.position.clone(),
      target: controls.target.clone(),
      fov: cam.fov,
    },
    to: {
      position: toPos.clone(),
      target: toLookAt.clone(),
      fov: toFov,
    },
  }
}

export function updateTween(dt: number, cam: THREE.PerspectiveCamera, controls: { target: THREE.Vector3 }): boolean {
  if (!activeTween) return false
  activeTween.elapsed += dt * 1000
  const t = Math.min(activeTween.elapsed / activeTween.duration, 1)
  const e = easeInOutCubic(t)
  cam.position.lerpVectors(activeTween.from.position, activeTween.to.position, e)
  controls.target.lerpVectors(activeTween.from.target, activeTween.to.target, e)
  cam.fov = activeTween.from.fov + (activeTween.to.fov - activeTween.from.fov) * e
  cam.updateProjectionMatrix()
  if (t >= 1) {
    activeTween = null
    return false
  }
  return true
}

export function isTweening(): boolean {
  return activeTween !== null
}

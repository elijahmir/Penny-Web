"use client"

import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, PresentationControls } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Model as Iphone } from './IphonePenny'

// Scene — user's original dialled-in values
const CAMERA_Z = 1.8
const CAMERA_FOV = 53

/* ─── Canvas aspect is fixed (≈ 0.962) — see CanvasContainer comment.
       Adjust both numbers together to keep the ratio. The container max size
       on desktop is W × H below; on narrower viewports it scales down while
       preserving the same aspect. */
const CANVAS_ASPECT_W = 380
const CANVAS_ASPECT_H = 395
type PhoneCursor = 'grab' | 'grabbing' | 'pointer'

export function PhoneScene() {
  const [cursor, setCursor] = useState<PhoneCursor>('grab')

  return (
    <CanvasContainer cursor={cursor}>
      <Canvas
        camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV }}
        frameloop="always"
        style={{ cursor }}
      >
        <ResyncOnResize />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <Suspense fallback={null}>
          <Environment preset="city" />

          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
          >
            <PhoneIntroRig onCursorChange={setCursor} />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </CanvasContainer>
  )
}

/* ─── CanvasContainer ──────────────────────────────────────────────────────
 * The phone screen UI is now a WebGL texture on the GLB's real screen mesh,
 * so it inherits the model projection directly instead of relying on a
 * second CSS3D overlay pipeline. The fixed canvas aspect is still kept for a
 * consistent hero composition across breakpoints.
 * --------------------------------------------------------------------------- */
function CanvasContainer({ children, cursor }: { children: React.ReactNode; cursor: PhoneCursor }) {
  return (
    <div
      className="w-full mx-auto relative"
      style={{
        maxWidth: `${CANVAS_ASPECT_W}px`,
        aspectRatio: `${CANVAS_ASPECT_W} / ${CANVAS_ASPECT_H}`,
        cursor,
        touchAction: 'none',
      }}
    >
      {children}
    </div>
  )
}

function PhoneIntroRig({ onCursorChange }: { onCursorChange: (cursor: PhoneCursor) => void }) {
  const group = useRef<THREE.Group>(null)
  const startedAt = useRef<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useFrame(({ clock }) => {
    const rig = group.current
    if (!rig) return

    if (startedAt.current === null) startedAt.current = clock.getElapsedTime()
    const elapsed = clock.getElapsedTime() - startedAt.current
    const rawProgress = prefersReducedMotion ? 1 : THREE.MathUtils.clamp((elapsed - 0.1) / 1.45, 0, 1)
    const progress = rawProgress * rawProgress * (3 - 2 * rawProgress)
    const settle = Math.sin(progress * Math.PI) * 0.035

    /* Keep the intro lift inside the fixed-aspect canvas: the phone starts
       flatter and smaller, then eases into the existing upright composition. */
    rig.rotation.x = THREE.MathUtils.lerp(-0.42, 0, progress) + settle * 0.45
    rig.rotation.z = THREE.MathUtils.lerp(-0.045, 0, progress)
    rig.position.y = THREE.MathUtils.lerp(0.05, 0, progress)
    rig.position.z = THREE.MathUtils.lerp(0.035, 0, progress)
    rig.scale.setScalar(THREE.MathUtils.lerp(8.1, 10, progress))
  })

  return (
    <group ref={group} position={[0, 0, 0]} scale={10}>
      <Iphone rotation={[Math.PI / 2, 0, 0]} onCursorChange={onCursorChange} />
    </group>
  )
}

/* ─── ResyncOnResize ───────────────────────────────────────────────────────── */
/* eslint-disable react-hooks/immutability -- Three cameras are mutable scene objects. */
function ResyncOnResize() {
  const { camera, size, gl, invalidate } = useThree()
  const prev = useRef({ w: size.width, h: size.height })
  useEffect(() => {
    if (prev.current.w === size.width && prev.current.h === size.height) return
    prev.current = { w: size.width, h: size.height }
    if ('aspect' in camera) (camera as { aspect: number }).aspect = size.width / size.height
    /* Explicitly point camera at scene origin to eliminate any chance of
       inherited rotation from previous frames or component remounts. */
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    gl.setSize(size.width, size.height, false)
    invalidate()
  }, [size.width, size.height, camera, gl, invalidate])
  return null
}
/* eslint-enable react-hooks/immutability */

"use client"

import { Canvas, useThree } from '@react-three/fiber'
import { Environment, PresentationControls, Html } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { Model as Iphone } from './IphonePenny'

/* ─── Locked overlay values (dialled in on desktop, work everywhere because
       the canvas aspect ratio below is now constant) ───────────────────────── */
// Overlay
const OVERLAY_WIDTH_PX = 327
const OVERLAY_HEIGHT_PX = 705.3512621174044
const OVERLAY_SCALE = 0.0083
const OVERLAY_RADIUS_PX = 29.5
const OVERLAY_POS_Z = 0.0042
const OVERLAY_OFFSET_X = 0
const OVERLAY_OFFSET_Y = 0
// Scene
const CAMERA_Z = 1.8
const CAMERA_FOV = 53

/* ─── CRITICAL: canvas aspect is fixed (≈ 0.962) — see CanvasContainer comment.
       Adjust both numbers together to keep the ratio. The container max size
       on desktop is W × H below; on narrower viewports it scales down while
       preserving the same aspect. */
const CANVAS_ASPECT_W = 380
const CANVAS_ASPECT_H = 395

export function PhoneScene() {
  return (
    <CanvasContainer>
      <Canvas
        camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV }}
        frameloop="always"
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
            <group position={[0, 0, 0]} scale={10}>
              <Iphone rotation={[Math.PI / 2, 0, 0]}>
                <Html
                  transform
                  wrapperClass="htmlScreen"
                  zIndexRange={[100, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[OVERLAY_OFFSET_X, OVERLAY_POS_Z, OVERLAY_OFFSET_Y]}
                  scale={OVERLAY_SCALE}
                  style={{
                    width: `${OVERLAY_WIDTH_PX}px`,
                    height: `${OVERLAY_HEIGHT_PX}px`,
                    borderRadius: `${OVERLAY_RADIUS_PX}px`,
                    overflow: 'hidden',
                    backgroundColor: '#000000',
                    pointerEvents: 'none',
                  }}
                >
                  <CallScreen />
                </Html>
              </Iphone>
            </group>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </CanvasContainer>
  )
}

/* ─── CanvasContainer ──────────────────────────────────────────────────────
 * KEY INSIGHT: the alignment between the phone GLB (rendered via WebGL) and
 * the call-screen overlay (rendered via drei's CSS3D `<Html transform>`)
 * depends on the canvas aspect ratio. Both pipelines compute their
 * projection from `camera.aspect = canvas_width / canvas_height`. If aspect
 * changes between viewports (e.g. desktop 1.4 vs mobile 0.95), drei's CSS3D
 * matrix diverges from WebGL's matrix by a small but visible amount,
 * causing the overlay to drift relative to the phone.
 *
 * Solution: keep the aspect CONSTANT by using `aspect-ratio` + `max-width`.
 * The container scales down on narrow viewports but keeps the same ratio,
 * so both projections always agree. Tuned values dialled on desktop work
 * identically on mobile.
 * --------------------------------------------------------------------------- */
function CanvasContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full mx-auto relative cursor-grab active:cursor-grabbing"
      style={{
        maxWidth: `${CANVAS_ASPECT_W}px`,
        aspectRatio: `${CANVAS_ASPECT_W} / ${CANVAS_ASPECT_H}`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Call UI ──────────────────────────────────────────────────────────────── */
function CallScreen() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 text-white relative">
      <div className="flex justify-between items-center text-xs text-white/70">
        <span>Penny</span>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-2.5 bg-white/70 rounded-sm"></div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-12 space-y-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--copper)] to-orange-400 p-1 flex items-center justify-center shadow-[0_0_30px_rgba(217,119,87,0.3)]">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl">
            👋
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-light mb-1">Penny</h2>
          <p className="text-white/50 text-sm">Penny AI Assistant</p>
        </div>
      </div>

      <div className="flex justify-center items-center h-20 gap-1">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 bg-[var(--copper)] rounded-full pulse-bar"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <div className="flex justify-between items-center pb-8 px-4">
        <button className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </button>
        <button className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ─── ResyncOnResize ───────────────────────────────────────────────────────── */
function ResyncOnResize() {
  const { camera, size, gl, invalidate } = useThree()
  const prev = useRef({ w: size.width, h: size.height })
  useEffect(() => {
    if (prev.current.w === size.width && prev.current.h === size.height) return
    prev.current = { w: size.width, h: size.height }
    if ('aspect' in camera) (camera as { aspect: number }).aspect = size.width / size.height
    camera.updateProjectionMatrix()
    gl.setSize(size.width, size.height, false)
    invalidate()
  }, [size.width, size.height, camera, gl, invalidate])
  return null
}

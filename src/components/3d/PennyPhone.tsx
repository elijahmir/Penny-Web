"use client"

/* ─────────────────────────────────────────────────────────────────────────
 *  <PennyPhone />
 *  Self-contained 3D phone with the incoming-call UI mounted on its screen.
 *  Renders the GLB iPhone and the Html overlay as ONE group so they always
 *  share a parent transform. Use the forwarded ref to animate the whole
 *  duo (position, rotation, scale) — both the phone and the screen UI move
 *  together.
 *
 *  Example future animation usage:
 *    const phoneRef = useRef<THREE.Group>(null)
 *    useFrame((_, dt) => {
 *      if (phoneRef.current) phoneRef.current.rotation.y += dt * 0.4
 *    })
 *    <PennyPhone ref={phoneRef} />
 * ───────────────────────────────────────────────────────────────────────── */

import { forwardRef } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { Model as Iphone } from './IphonePenny'

/* Locked overlay constants (dialled in via the tuning panel earlier).
   Derived from the GLB's `screen` mesh bbox aspect 2.157037498829983. */
const OVERLAY_WIDTH_PX = 327
const OVERLAY_HEIGHT_PX = 705.3512621174044
const OVERLAY_SCALE = 0.0083
const OVERLAY_RADIUS_PX = 29.5
const OVERLAY_POS_Z = 0.0042       // distance from screen face (avoid z-fight)
const OVERLAY_OFFSET_X = 0
const OVERLAY_OFFSET_Y = 0

export const PennyPhone = forwardRef<THREE.Group>(function PennyPhone(_, ref) {
  return (
    <group ref={ref}>
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
  )
})

/* The on-screen call UI. Extracted so it can be swapped or animated
   independently of the phone group. */
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

"use client"

/* ─────────────────────────────────────────────────────────────────────────
 *  <PennyPhone />
 *  Self-contained 3D phone. The incoming-call UI is rendered as a WebGL
 *  texture on the GLB's real screen mesh by <IphonePenny />, so there is no
 *  separate Html/CSS3D overlay to keep aligned.
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
import { Model as Iphone } from './IphonePenny'

export const PennyPhone = forwardRef<THREE.Group>(function PennyPhone(_, ref) {
  return (
    <group ref={ref}>
      <Iphone rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
})

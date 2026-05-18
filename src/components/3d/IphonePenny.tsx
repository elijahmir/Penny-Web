import * as THREE from 'three'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

const BASE_SCREEN_WIDTH = 327
const BASE_SCREEN_HEIGHT = 705.3512621174044
const SCREEN_TEXTURE_WIDTH = 1024
const SCREEN_TEXTURE_HEIGHT = Math.round(
  SCREEN_TEXTURE_WIDTH * (BASE_SCREEN_HEIGHT / BASE_SCREEN_WIDTH)
)
const SCREEN_SURFACE_FORWARD_OFFSET = 0.001
const SENSOR_CUTOUT_FILL_FORWARD_OFFSET = 0.00035
const COPPER = '#C98160'
const GREEN = '#34c759'
const RED = '#ff2837'

type CallPhase = 'ringing' | 'connected'
type CallAction = 'answer' | null
type PhoneCursor = 'grab' | 'grabbing' | 'pointer'

type CallScreenFrame = {
  connectedElapsedTime: number
  elapsedTime: number
  hoveredAction: CallAction
  phase: CallPhase
}

type ScreenTextureState = {
  canvas: HTMLCanvasElement
  texture: THREE.CanvasTexture
}

type PointerStart = {
  active: boolean
  startedOnAnswer: boolean
  x: number
  y: number
}

type ScreenPoint = {
  x: number
  y: number
}

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh
    Plane_1: THREE.Mesh
    screen: THREE.Mesh
    camera_bump: THREE.Mesh
    ring_telephoto: THREE.Mesh
    lens_telephoto: THREE.Mesh
    ring_wide: THREE.Mesh
    lens_wide: THREE.Mesh
    ring_ultrawide: THREE.Mesh
    lens_ultrawide: THREE.Mesh
    lens_flash: THREE.Mesh
    lens_lidar: THREE.Mesh
    action: THREE.Mesh
    volume_up: THREE.Mesh
    volume_down: THREE.Mesh
    power: THREE.Mesh
  }
  materials: {
    titanium_frame: THREE.MeshStandardMaterial
    back_glass: THREE.MeshStandardMaterial
    screen_display: THREE.MeshStandardMaterial
    lens_rings: THREE.MeshStandardMaterial
    lens_glass: THREE.MeshPhysicalMaterial
    buttons: THREE.MeshStandardMaterial
  }
  animations: THREE.AnimationClip[]
}

type ModelProps = React.ComponentProps<'group'> & {
  onCursorChange?: (cursor: PhoneCursor) => void
}

export function Model({ onCursorChange, ...props }: ModelProps) {
  const { nodes, materials } = useGLTF('/models/iphone_penny_final.glb') as unknown as GLTFResult
  const [callPhase, setCallPhase] = useState<CallPhase>('ringing')
  const [hoveredAction, setHoveredAction] = useState<CallAction>(null)
  const pointerStart = useRef<PointerStart | null>(null)
  const screenTexture = useCallScreenTexture(callPhase, hoveredAction)
  const screenGeometry = useMemo(
    () => createNormalizedScreenGeometry(nodes.screen.geometry),
    [nodes.screen.geometry]
  )

  const answerCall = useCallback(() => {
    setHoveredAction(null)
    onCursorChange?.('grab')
    setCallPhase((phase) => (phase === 'ringing' ? 'connected' : phase))
  }, [onCursorChange])

  useEffect(() => () => {
    onCursorChange?.('grab')
  }, [onCursorChange])

  const handlePointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {
    const point = getScreenPoint(event)
    const startedOnAnswer = callPhase === 'ringing' && isAnswerButtonHit(point)

    if (startedOnAnswer) {
      event.stopPropagation()
      onCursorChange?.('pointer')
    } else {
      onCursorChange?.('grabbing')
    }

    pointerStart.current = {
      active: true,
      startedOnAnswer,
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY,
    }
  }, [callPhase, onCursorChange])

  const handlePointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    const point = getScreenPoint(event)
    const isOverAnswer = callPhase === 'ringing' && isAnswerButtonHit(point)
    const nextHoveredAction: CallAction = isOverAnswer ? 'answer' : null
    setHoveredAction((current) => (current === nextHoveredAction ? current : nextHoveredAction))

    if (isOverAnswer) {
      event.stopPropagation()
      onCursorChange?.('pointer')
    } else if (!pointerStart.current?.active) {
      onCursorChange?.('grab')
    }

    const start = pointerStart.current
    if (!start?.active || !start.startedOnAnswer || callPhase !== 'ringing') return

    const dx = event.nativeEvent.clientX - start.x
    const dy = event.nativeEvent.clientY - start.y
    if (Math.hypot(dx, dy) < 24) return

    pointerStart.current = { ...start, active: false }
    answerCall()
  }, [answerCall, callPhase, onCursorChange])

  const handlePointerUp = useCallback((event: ThreeEvent<PointerEvent>) => {
    const start = pointerStart.current
    if (!start?.active) return

    pointerStart.current = { ...start, active: false }
    onCursorChange?.(hoveredAction === 'answer' ? 'pointer' : 'grab')
    if (callPhase !== 'ringing') return

    const isOverAnswer = isAnswerButtonHit(getScreenPoint(event))
    if (start.startedOnAnswer || isOverAnswer) {
      event.stopPropagation()
      answerCall()
    }
  }, [answerCall, callPhase, hoveredAction, onCursorChange])

  const handlePointerOut = useCallback(() => {
    pointerStart.current = null
    setHoveredAction(null)
    onCursorChange?.('grab')
  }, [onCursorChange])
  
  useEffect(() => {
    Object.values(materials).forEach((mat) => {
      if (mat) {
        (mat as THREE.Material).side = THREE.DoubleSide;
        (mat as THREE.Material).transparent = false;
        (mat as THREE.Material).opacity = 1;
        (mat as THREE.Material).needsUpdate = true;
      }
    });

  }, [materials]);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={screenGeometry}
        renderOrder={20}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onPointerOver={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <meshBasicMaterial
          attach="material"
          color={screenTexture ? '#ffffff' : '#000000'}
          map={screenTexture ?? null}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={nodes.camera_bump.geometry} material={materials.back_glass} />
      <mesh geometry={nodes.ring_telephoto.geometry} material={materials.lens_rings} />
      <mesh geometry={nodes.lens_telephoto.geometry} material={materials.lens_glass} />
      <mesh geometry={nodes.ring_wide.geometry} material={materials.lens_rings} />
      <mesh geometry={nodes.lens_wide.geometry} material={materials.lens_glass} />
      <mesh geometry={nodes.ring_ultrawide.geometry} material={materials.lens_rings} />
      <mesh geometry={nodes.lens_ultrawide.geometry} material={materials.lens_glass} />
      <mesh geometry={nodes.lens_flash.geometry} material={materials.lens_glass} />
      <mesh geometry={nodes.lens_lidar.geometry} material={materials.lens_glass} />
      <mesh geometry={nodes.action.geometry} material={materials.buttons} />
      <mesh geometry={nodes.volume_up.geometry} material={materials.buttons} />
      <mesh geometry={nodes.volume_down.geometry} material={materials.buttons} />
      <mesh geometry={nodes.power.geometry} material={materials.buttons} />
      <mesh geometry={nodes.Plane.geometry} material={materials.titanium_frame} />
      <mesh geometry={nodes.Plane_1.geometry} material={materials.back_glass} />
    </group>
  )
}

function useCallScreenTexture(phase: CallPhase, hoveredAction: CallAction) {
  const screenTextureState = useMemo<ScreenTextureState | null>(() => {
    if (typeof document === 'undefined') return null

    const canvas = document.createElement('canvas')
    canvas.width = SCREEN_TEXTURE_WIDTH
    canvas.height = SCREEN_TEXTURE_HEIGHT

    const nextTexture = new THREE.CanvasTexture(canvas)
    nextTexture.colorSpace = THREE.SRGBColorSpace
    nextTexture.flipY = false
    nextTexture.generateMipmaps = false
    nextTexture.magFilter = THREE.LinearFilter
    nextTexture.minFilter = THREE.LinearFilter

    drawCallScreen(canvas, {
      connectedElapsedTime: 0,
      elapsedTime: 0,
      hoveredAction: null,
      phase: 'ringing',
    })
    nextTexture.needsUpdate = true

    return { canvas, texture: nextTexture }
  }, [])

  const screenTextureRef = useRef(screenTextureState)
  const phaseRef = useRef(phase)
  const hoveredActionRef = useRef(hoveredAction)
  const connectedAtRef = useRef<number | null>(null)

  useEffect(() => {
    phaseRef.current = phase
    if (phase === 'ringing') connectedAtRef.current = null
  }, [phase])

  useEffect(() => {
    hoveredActionRef.current = hoveredAction
  }, [hoveredAction])

  useFrame(({ clock }) => {
    const current = screenTextureRef.current
    if (!current) return

    const elapsedTime = clock.getElapsedTime()
    if (phaseRef.current === 'connected' && connectedAtRef.current === null) {
      connectedAtRef.current = elapsedTime
    }

    drawCallScreen(current.canvas, {
      connectedElapsedTime: connectedAtRef.current === null ? 0 : elapsedTime - connectedAtRef.current,
      elapsedTime,
      hoveredAction: hoveredActionRef.current,
      phase: phaseRef.current,
    })
    current.texture.needsUpdate = true
  })

  return screenTextureState?.texture ?? null
}

function getScreenPoint(event: ThreeEvent<PointerEvent>): ScreenPoint | null {
  if (!event.uv) return null

  return {
    x: event.uv.x * BASE_SCREEN_WIDTH,
    y: event.uv.y * BASE_SCREEN_HEIGHT,
  }
}

function isAnswerButtonHit(point: ScreenPoint | null) {
  if (!point) return false

  const dx = point.x - 252
  const dy = point.y - 617
  return Math.hypot(dx, dy) <= 54
}

function createNormalizedScreenGeometry(geometry: THREE.BufferGeometry) {
  const nextGeometry = geometry.clone()
  nextGeometry.translate(0, SCREEN_SURFACE_FORWARD_OFFSET, 0)
  const uv = nextGeometry.getAttribute('uv') as THREE.BufferAttribute | undefined

  if (!uv) return nextGeometry

  let minU = Infinity
  let minV = Infinity
  let maxU = -Infinity
  let maxV = -Infinity

  for (let i = 0; i < uv.count; i += 1) {
    const u = uv.getX(i)
    const v = uv.getY(i)
    minU = Math.min(minU, u)
    minV = Math.min(minV, v)
    maxU = Math.max(maxU, u)
    maxV = Math.max(maxV, v)
  }

  const rangeU = maxU - minU || 1
  const rangeV = maxV - minV || 1
  const normalized = new Float32Array(uv.count * 2)

  for (let i = 0; i < uv.count; i += 1) {
    normalized[i * 2] = (uv.getX(i) - minU) / rangeU
    normalized[i * 2 + 1] = (uv.getY(i) - minV) / rangeV
  }

  nextGeometry.setAttribute('uv', new THREE.BufferAttribute(normalized, 2))
  fillSensorCutout(nextGeometry)
  return nextGeometry
}

function fillSensorCutout(geometry: THREE.BufferGeometry) {
  const position = geometry.getAttribute('position') as THREE.BufferAttribute | undefined
  const uv = geometry.getAttribute('uv') as THREE.BufferAttribute | undefined
  if (!position || !uv) return

  geometry.computeBoundingBox()
  const bounds = geometry.boundingBox
  if (!bounds) return

  const normal = geometry.getAttribute('normal') as THREE.BufferAttribute | undefined
  const positions: number[] = []
  const normals: number[] = []
  const uvs: number[] = []

  for (let i = 0; i < position.count; i += 1) {
    positions.push(position.getX(i), position.getY(i), position.getZ(i))
    if (normal) {
      normals.push(normal.getX(i), normal.getY(i), normal.getZ(i))
    } else {
      normals.push(0, 1, 0)
    }
    uvs.push(uv.getX(i), uv.getY(i))
  }

  const indices = geometry.index
    ? Array.from(geometry.index.array)
    : Array.from({ length: position.count }, (_, index) => index)
  const centerY = bounds.min.y + SENSOR_CUTOUT_FILL_FORWARD_OFFSET
  const cutoutCenterX = 0
  const cutoutCenterZ = -0.0627
  const cutoutWidth = 0.034
  const cutoutHeight = 0.0115
  const radius = cutoutHeight / 2
  const leftArcX = cutoutCenterX - cutoutWidth / 2 + radius
  const rightArcX = cutoutCenterX + cutoutWidth / 2 - radius
  const segmentCount = 12
  const boundary: Array<{ x: number; z: number }> = []

  for (let i = 0; i <= segmentCount; i += 1) {
    const angle = -Math.PI / 2 + (i / segmentCount) * Math.PI
    boundary.push({
      x: rightArcX + Math.cos(angle) * radius,
      z: cutoutCenterZ + Math.sin(angle) * radius,
    })
  }

  for (let i = 0; i <= segmentCount; i += 1) {
    const angle = Math.PI / 2 + (i / segmentCount) * Math.PI
    boundary.push({
      x: leftArcX + Math.cos(angle) * radius,
      z: cutoutCenterZ + Math.sin(angle) * radius,
    })
  }

  const addVertex = (localX: number, localY: number, localZ: number) => {
    positions.push(localX, localY, localZ)
    normals.push(0, 1, 0)
    uvs.push(
      THREE.MathUtils.clamp((localX - bounds.min.x) / (bounds.max.x - bounds.min.x), 0, 1),
      THREE.MathUtils.clamp((localZ - bounds.min.z) / (bounds.max.z - bounds.min.z), 0, 1)
    )
    return positions.length / 3 - 1
  }

  const centerIndex = addVertex(cutoutCenterX, centerY, cutoutCenterZ)
  const boundaryIndices = boundary.map((point) => addVertex(point.x, centerY, point.z))

  boundaryIndices.forEach((boundaryIndex, index) => {
    const nextBoundaryIndex = boundaryIndices[(index + 1) % boundaryIndices.length]
    indices.push(centerIndex, boundaryIndex, nextBoundaryIndex)
  })

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3))
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2))
  geometry.setIndex(indices)
  geometry.computeBoundingBox()
  geometry.computeBoundingSphere()
}

function drawCallScreen(canvas: HTMLCanvasElement, frame: CallScreenFrame) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const scale = canvas.width / BASE_SCREEN_WIDTH
  const x = (value: number) => value * scale
  const y = (value: number) => value * scale

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  drawScreenGlow(ctx, x, y, frame)
  drawStatusRow(ctx, x, y, frame)
  drawLiveIsland(ctx, x, y, frame)
  drawAvatar(ctx, x, y, frame)
  drawIdentity(ctx, x, y, frame)
  drawVoiceBars(ctx, x, y, frame)
  drawCallControls(ctx, x, y, frame)
}

function drawScreenGlow(
  ctx: CanvasRenderingContext2D,
  x: (value: number) => number,
  y: (value: number) => number,
  frame: CallScreenFrame
) {
  const ringPulse = frame.phase === 'ringing'
    ? Math.sin(frame.elapsedTime * 5.2) * 0.5 + 0.5
    : 0.25
  const glow = ctx.createRadialGradient(
    x(164),
    y(198),
    x(15),
    x(164),
    y(198),
    x(92 + ringPulse * 18)
  )
  glow.addColorStop(0, `rgba(201, 129, 96, ${0.2 + ringPulse * 0.12})`)
  glow.addColorStop(0.55, 'rgba(201, 129, 96, 0.07)')
  glow.addColorStop(1, 'rgba(201, 129, 96, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(x(48), y(84), x(232), y(232))

  const lowerGlow = ctx.createRadialGradient(
    x(248),
    y(604),
    x(4),
    x(248),
    y(604),
    x(frame.phase === 'ringing' ? 88 : 68)
  )
  lowerGlow.addColorStop(0, frame.phase === 'ringing' ? 'rgba(52, 199, 89, 0.24)' : 'rgba(255, 40, 55, 0.22)')
  lowerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = lowerGlow
  ctx.fillRect(x(154), y(510), x(150), y(160))
}

function drawStatusRow(
  ctx: CanvasRenderingContext2D,
  x: (value: number) => number,
  y: (value: number) => number,
  frame: CallScreenFrame
) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)'
  ctx.font = `${x(10.5)}px Inter, system-ui, sans-serif`
  ctx.textBaseline = 'top'
  ctx.fillText('Penny', x(20), y(20))

  if (frame.phase === 'ringing') {
    const dotAlpha = 0.4 + (Math.sin(frame.elapsedTime * 6) * 0.5 + 0.5) * 0.45
    ctx.beginPath()
    ctx.arc(x(60), y(24.5), x(2.4), 0, Math.PI * 2)
    ctx.fillStyle = `rgba(52, 199, 89, ${dotAlpha})`
    ctx.fill()
  }

  roundedRect(ctx, x(292), y(20), x(15), y(8), x(3))
  ctx.fillStyle = 'rgba(255, 255, 255, 0.72)'
  ctx.fill()
}

function drawLiveIsland(
  ctx: CanvasRenderingContext2D,
  x: (value: number) => number,
  y: (value: number) => number,
  frame: CallScreenFrame
) {
  const centerXValue = 164
  const width = frame.phase === 'ringing' ? 88 : 82
  const height = 24
  const leftValue = centerXValue - width / 2
  const rightValue = centerXValue + width / 2
  const left = x(leftValue)
  const topValue = 31
  const centerYValue = topValue + height / 2
  const top = y(topValue)
  const radius = x(height / 2)
  const pulse = Math.sin(frame.elapsedTime * 5.6) * 0.5 + 0.5

  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)'
  ctx.shadowBlur = x(4)
  roundedRect(ctx, left, top, x(width), y(height), radius)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.98)'
  ctx.fill()
  ctx.restore()

  roundedRect(ctx, left + x(3.4), top + y(3.4), x(width - 6.8), y(height - 6.8), x((height - 6.8) / 2))
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.lineWidth = x(1.1)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(x(leftValue + 17), y(centerYValue), x(2.1 + pulse * 0.25), 0, Math.PI * 2)
  ctx.fillStyle = frame.phase === 'ringing'
    ? `rgba(52, 199, 89, ${0.48 + pulse * 0.32})`
    : 'rgba(201, 129, 96, 0.86)'
  ctx.fill()

  ctx.strokeStyle = `rgba(201, 129, 96, ${0.18 + pulse * 0.18})`
  ctx.lineWidth = x(1.1)
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x(leftValue + 8), y(centerYValue))
  ctx.lineTo(x(leftValue + 8), y(centerYValue + (frame.phase === 'ringing' ? 3.5 : 1.4)))
  ctx.moveTo(x(rightValue - 8), y(centerYValue))
  ctx.lineTo(x(rightValue - 8), y(centerYValue - (frame.phase === 'ringing' ? 3.5 : 1.4)))
  ctx.stroke()

  const lensXValue = rightValue - 18
  const lens = ctx.createRadialGradient(x(lensXValue), y(centerYValue), x(1), x(lensXValue), y(centerYValue), x(5.8))
  lens.addColorStop(0, 'rgba(18, 35, 78, 0.9)')
  lens.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.beginPath()
  ctx.arc(x(lensXValue), y(centerYValue), x(5.2), 0, Math.PI * 2)
  ctx.fillStyle = lens
  ctx.fill()
}

function drawAvatar(
  ctx: CanvasRenderingContext2D,
  x: (value: number) => number,
  y: (value: number) => number,
  frame: CallScreenFrame
) {
  const centerX = x(164)
  const centerY = y(frame.phase === 'ringing' ? 190 : 174)
  const pulse = Math.sin(frame.elapsedTime * 5.1) * 0.5 + 0.5
  const outerRadius = x(frame.phase === 'ringing' ? 48 + pulse * 3 : 43)
  const innerRadius = x(frame.phase === 'ringing' ? 39 : 36)

  if (frame.phase === 'ringing') {
    for (let i = 0; i < 3; i += 1) {
      const wave = (frame.elapsedTime * 1.4 + i / 3) % 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, x(52 + wave * 34), 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(201, 129, 96, ${0.22 * (1 - wave)})`
      ctx.lineWidth = x(2)
      ctx.stroke()
    }
  }

  const ring = ctx.createLinearGradient(
    centerX - outerRadius,
    centerY - outerRadius,
    centerX + outerRadius,
    centerY + outerRadius
  )
  ring.addColorStop(0, COPPER)
  ring.addColorStop(1, '#fb923c')

  ctx.beginPath()
  ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
  ctx.fillStyle = ring
  ctx.fill()

  ctx.beginPath()
  ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.92)'
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = `${x(frame.phase === 'ringing' ? 34 : 30)}px "Apple Color Emoji", "Segoe UI Emoji", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.save()
  if (frame.phase === 'ringing') {
    ctx.translate(centerX, centerY)
    ctx.rotate(Math.sin(frame.elapsedTime * 7) * 0.1)
    ctx.fillText('👋', 0, y(1))
  } else {
    ctx.fillText('👋', centerX, centerY + y(1))
  }
  ctx.restore()
}

function drawIdentity(
  ctx: CanvasRenderingContext2D,
  x: (value: number) => number,
  y: (value: number) => number,
  frame: CallScreenFrame
) {
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  ctx.fillStyle = '#ffffff'
  ctx.font = `300 ${x(frame.phase === 'ringing' ? 30 : 28)}px Inter, system-ui, sans-serif`
  ctx.fillText('Penny', x(164), y(frame.phase === 'ringing' ? 268 : 244))

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.font = `${x(12.5)}px Inter, system-ui, sans-serif`
  ctx.fillText(
    frame.phase === 'ringing' ? 'Incoming call' : `Connected ${formatCallTimer(frame.connectedElapsedTime)}`,
    x(164),
    y(frame.phase === 'ringing' ? 293 : 268)
  )
}

function drawVoiceBars(
  ctx: CanvasRenderingContext2D,
  x: (value: number) => number,
  y: (value: number) => number,
  frame: CallScreenFrame
) {
  const centerX = x(164)
  const centerY = y(frame.phase === 'ringing' ? 388 : 392)
  const gap = x(frame.phase === 'ringing' ? 9 : 10)
  const barWidth = x(frame.phase === 'ringing' ? 5 : 6)

  ctx.fillStyle = frame.phase === 'ringing' ? 'rgba(201, 129, 96, 0.82)' : COPPER

  for (let i = 0; i < 6; i += 1) {
    const phase = frame.elapsedTime * (frame.phase === 'ringing' ? 7.5 : 4.5) + i * 0.72
    const baseHeight = frame.phase === 'ringing' ? 14 : 22
    const motion = frame.phase === 'ringing' ? 30 : 38
    const height = y(baseHeight + (Math.sin(phase) * 0.5 + 0.5) * motion)
    const barX = centerX + (i - 2.5) * gap - barWidth / 2
    roundedRect(ctx, barX, centerY - height / 2, barWidth, height, barWidth / 2)
    ctx.fill()
  }
}

function drawCallControls(
  ctx: CanvasRenderingContext2D,
  x: (value: number) => number,
  y: (value: number) => number,
  frame: CallScreenFrame
) {
  if (frame.phase === 'ringing') {
    drawRingingControls(ctx, x, y, frame)
    return
  }

  drawCircleButton(ctx, x(75), y(618), x(32), 'rgba(255, 255, 255, 0.1)')
  drawMicIcon(ctx, x(75), y(618), x(1))

  drawCircleButton(ctx, x(252), y(618), x(40), RED)
  drawPhoneIcon(ctx, x(252), y(618), x(1))
}

function drawRingingControls(
  ctx: CanvasRenderingContext2D,
  x: (value: number) => number,
  y: (value: number) => number,
  frame: CallScreenFrame
) {
  const pulse = Math.sin(frame.elapsedTime * 5.8) * 0.5 + 0.5
  const answerHover = frame.hoveredAction === 'answer'

  drawCircleButton(ctx, x(75), y(617), x(34), RED)
  drawPhoneIcon(ctx, x(75), y(617), x(0.92), Math.PI * 0.72)

  for (let i = 0; i < 3; i += 1) {
    const wave = (frame.elapsedTime * 1.35 + i / 3) % 1
    ctx.beginPath()
    ctx.arc(x(252), y(617), x(45 + wave * 32 + (answerHover ? 6 : 0)), 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(52, 199, 89, ${(0.24 + (answerHover ? 0.12 : 0)) * (1 - wave)})`
    ctx.lineWidth = x(2.2)
    ctx.stroke()
  }

  ctx.beginPath()
  ctx.arc(x(252), y(617), x(43 + pulse * 7 + (answerHover ? 6 : 0)), 0, Math.PI * 2)
  ctx.fillStyle = `rgba(52, 199, 89, ${0.09 + pulse * 0.13 + (answerHover ? 0.08 : 0)})`
  ctx.fill()
  drawCircleButton(ctx, x(252), y(617), x(answerHover ? 43 : 40), GREEN)
  drawPhoneIcon(ctx, x(252), y(617), x(answerHover ? 1.08 : 1), -Math.PI * 0.18)

  ctx.font = `${x(11.5)}px Inter, system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.52)'
  ctx.fillText('Decline', x(75), y(668))
  ctx.fillStyle = answerHover ? 'rgba(190, 255, 207, 0.9)' : 'rgba(255, 255, 255, 0.68)'
  ctx.fillText('Answer', x(252), y(668))
}

function drawCircleButton(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  fillStyle: string
) {
  if (fillStyle === RED || fillStyle === GREEN) {
    const glow = ctx.createRadialGradient(centerX, centerY, radius * 0.4, centerX, centerY, radius * 1.45)
    glow.addColorStop(0, fillStyle === RED ? 'rgba(255, 40, 55, 0.32)' : 'rgba(52, 199, 89, 0.3)')
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 1.45, 0, Math.PI * 2)
    ctx.fillStyle = glow
    ctx.fill()
  }

  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.fillStyle = fillStyle
  ctx.fill()

  if (fillStyle === RED || fillStyle === GREEN) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)'
    ctx.lineWidth = radius * 0.035
    ctx.stroke()
  }
}

function drawMicIcon(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  scale: number
) {
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 2.2 * scale
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  roundedRect(ctx, centerX - 4 * scale, centerY - 11 * scale, 8 * scale, 17 * scale, 4 * scale)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(centerX - 10 * scale, centerY - 1 * scale)
  ctx.quadraticCurveTo(centerX - 10 * scale, centerY + 12 * scale, centerX, centerY + 12 * scale)
  ctx.quadraticCurveTo(centerX + 10 * scale, centerY + 12 * scale, centerX + 10 * scale, centerY - 1 * scale)
  ctx.moveTo(centerX, centerY + 12 * scale)
  ctx.lineTo(centerX, centerY + 19 * scale)
  ctx.moveTo(centerX - 6 * scale, centerY + 19 * scale)
  ctx.lineTo(centerX + 6 * scale, centerY + 19 * scale)
  ctx.stroke()
}

function drawPhoneIcon(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  scale: number,
  rotation = 0
) {
  ctx.save()
  ctx.translate(centerX, centerY)
  ctx.rotate(rotation)

  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 2.4 * scale
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  ctx.beginPath()
  ctx.moveTo(-8 * scale, -12 * scale)
  ctx.bezierCurveTo(
    -13 * scale,
    -3 * scale,
    -8 * scale,
    11 * scale,
    9 * scale,
    14 * scale
  )
  ctx.stroke()

  roundedRect(ctx, -13 * scale, -16 * scale, 8 * scale, 13 * scale, 3 * scale)
  ctx.stroke()
  roundedRect(ctx, 5 * scale, 7 * scale, 13 * scale, 8 * scale, 3 * scale)
  ctx.stroke()

  ctx.restore()
}

function formatCallTimer(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, '0')
  const remainder = (safeSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remainder}`
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2)

  ctx.beginPath()
  ctx.moveTo(left + r, top)
  ctx.lineTo(left + width - r, top)
  ctx.quadraticCurveTo(left + width, top, left + width, top + r)
  ctx.lineTo(left + width, top + height - r)
  ctx.quadraticCurveTo(left + width, top + height, left + width - r, top + height)
  ctx.lineTo(left + r, top + height)
  ctx.quadraticCurveTo(left, top + height, left, top + height - r)
  ctx.lineTo(left, top + r)
  ctx.quadraticCurveTo(left, top, left + r, top)
  ctx.closePath()
}

useGLTF.preload('/models/iphone_penny_final.glb')

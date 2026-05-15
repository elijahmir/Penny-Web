import * as THREE from 'three'
import React, { useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

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

export function Model({ children, ...props }: React.PropsWithChildren<React.ComponentProps<'group'>>) {
  const { nodes, materials } = useGLTF('/models/iphone_penny_final.glb') as unknown as GLTFResult
  
  useEffect(() => {
    Object.values(materials).forEach((mat) => {
      if (mat) {
        (mat as THREE.Material).side = THREE.DoubleSide;
        (mat as THREE.Material).transparent = false;
        (mat as THREE.Material).opacity = 1;
        (mat as THREE.Material).needsUpdate = true;
      }
    });

    // Force screen to be opaque black so we don't see through the phone
    if (materials.screen_display) {
      materials.screen_display.color = new THREE.Color('#000000');
      materials.screen_display.roughness = 0.2;
      materials.screen_display.metalness = 0.8;
    }

    // DEBUG: measure body + screen bboxes so we can calibrate centering
    const logBBox = (name: string, mesh: THREE.Mesh | undefined) => {
      if (!mesh) return
      mesh.geometry.computeBoundingBox()
      const bb = mesh.geometry.boundingBox!
      const center = new THREE.Vector3()
      bb.getCenter(center)
      const size = new THREE.Vector3()
      bb.getSize(size)
      // eslint-disable-next-line no-console
      console.log(`[BBOX:${name}]`, JSON.stringify({
        min: { x: bb.min.x.toFixed(5), y: bb.min.y.toFixed(5), z: bb.min.z.toFixed(5) },
        max: { x: bb.max.x.toFixed(5), y: bb.max.y.toFixed(5), z: bb.max.z.toFixed(5) },
        center: { x: center.x.toFixed(5), y: center.y.toFixed(5), z: center.z.toFixed(5) },
        size: { x: size.x.toFixed(5), y: size.y.toFixed(5), z: size.z.toFixed(5) },
      }))
    }
    logBBox('screen', nodes.screen)
    logBBox('body_Plane', nodes.Plane)
    logBBox('back_Plane_1', nodes.Plane_1)
  }, [materials, nodes]);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.screen.geometry} material={materials.screen_display}>
        {children}
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

useGLTF.preload('/models/iphone_penny_final.glb')

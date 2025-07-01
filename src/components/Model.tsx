import * as THREE from 'three'
import React, { useLayoutEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { Material, Materials } from '../App'

interface ModelProps {
  materials: Materials;
}

export default function Model({ materials: propMaterials }: ModelProps) {
  const { scene } = useGLTF('/src/assets/tape2.glb')
  const clonedScene = useMemo(() => scene.clone(), [scene])

  const materials = useMemo(() => ({
    SIDEA: new THREE.MeshStandardMaterial(),
    SIDEB: new THREE.MeshStandardMaterial(),
    BASE: new THREE.MeshStandardMaterial(),
    ACCENTS: new THREE.MeshStandardMaterial(),
  }), []);

  useLayoutEffect(() => {
    // Update SIDEA material
    materials.SIDEA.color.set(propMaterials.SIDEA.color);
    materials.SIDEA.metalness = propMaterials.SIDEA.metalness;
    materials.SIDEA.roughness = propMaterials.SIDEA.roughness;

    // Update SIDEB material
    materials.SIDEB.color.set(propMaterials.SIDEB.color);
    materials.SIDEB.metalness = propMaterials.SIDEB.metalness;
    materials.SIDEB.roughness = propMaterials.SIDEB.roughness;

    // Update BASE material
    materials.BASE.color.set(propMaterials.BASE.color);
    materials.BASE.metalness = propMaterials.BASE.metalness;
    materials.BASE.roughness = propMaterials.BASE.roughness;

    // Update ACCENTS material
    materials.ACCENTS.color.set(propMaterials.ACCENTS.color);
    materials.ACCENTS.metalness = propMaterials.ACCENTS.metalness;
    materials.ACCENTS.roughness = propMaterials.ACCENTS.roughness;
  }, [propMaterials, materials]);

  useLayoutEffect(() => {
    clonedScene.traverse(node => {
      if (node instanceof THREE.Mesh && node.material) {
        switch (node.material.name) {
          case 'SIDEA':
            node.material = materials.SIDEA
            break
          case 'SIDEB':
            node.material = materials.SIDEB
            break
          case 'BASE':
            node.material = materials.BASE
            break
          case 'ACCENTS':
            node.material = materials.ACCENTS
            break
          default:
            break
        }
      }
    })
  }, [clonedScene, materials]);

  return <primitive object={clonedScene} />
}

useGLTF.preload('/src/assets/tape3.glb')
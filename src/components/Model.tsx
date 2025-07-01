import * as THREE from 'three'
import React, { useLayoutEffect, useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Material, Materials } from '../App'

interface ModelProps {
  materials: Materials;
}

export default function Model({ materials: propMaterials }: ModelProps) {
  const { scene, materials: gltfMaterials } = useGLTF('/src/assets/tape3.glb')
  const clonedScene = useMemo(() => scene.clone(), [scene])
  
  // Store material references
  const materialsRef = useRef<{
    SIDEA: THREE.MeshStandardMaterial;
    SIDEB: THREE.MeshStandardMaterial;
    BASE: THREE.MeshStandardMaterial;
    ACCENTS: THREE.MeshStandardMaterial;
  }>()

  // Initialize materials once
  useMemo(() => {
    materialsRef.current = {
      SIDEA: new THREE.MeshStandardMaterial(),
      SIDEB: new THREE.MeshStandardMaterial(),
      BASE: new THREE.MeshStandardMaterial(),
      ACCENTS: new THREE.MeshStandardMaterial(),
    }
  }, []);

  // Update materials when props change
  useLayoutEffect(() => {
    if (!materialsRef.current) return;

    const materials = materialsRef.current;

    // Configure SIDEA material
    materials.SIDEA.color.set(propMaterials.SIDEA.color);
    materials.SIDEA.metalness = propMaterials.SIDEA.metalness;
    materials.SIDEA.roughness = propMaterials.SIDEA.roughness;
    materials.SIDEA.needsUpdate = true;

    // Configure SIDEB material
    materials.SIDEB.color.set(propMaterials.SIDEB.color);
    materials.SIDEB.metalness = propMaterials.SIDEB.metalness;
    materials.SIDEB.roughness = propMaterials.SIDEB.roughness;
    materials.SIDEB.needsUpdate = true;

    // Configure BASE material
    materials.BASE.color.set(propMaterials.BASE.color);
    materials.BASE.metalness = propMaterials.BASE.metalness;
    materials.BASE.roughness = propMaterials.BASE.roughness;
    materials.BASE.needsUpdate = true;

    // Configure ACCENTS material
    materials.ACCENTS.color.set(propMaterials.ACCENTS.color);
    materials.ACCENTS.metalness = propMaterials.ACCENTS.metalness;
    materials.ACCENTS.roughness = propMaterials.ACCENTS.roughness;
    materials.ACCENTS.needsUpdate = true;

  }, [propMaterials]);

  // Apply materials to the scene
  useLayoutEffect(() => {
    if (!materialsRef.current) return;

    const materials = materialsRef.current;

    clonedScene.traverse((node) => {
      if (node instanceof THREE.Mesh && node.material) {
        // Handle both single materials and material arrays
        const handleMaterial = (material: THREE.Material) => {
          if (material.name === 'SIDEA' || material.name === 'Side_A' || material.name === 'SideA') {
            node.material = materials.SIDEA;
          } else if (material.name === 'SIDEB' || material.name === 'Side_B' || material.name === 'SideB') {
            node.material = materials.SIDEB;
          } else if (material.name === 'BASE' || material.name === 'Base' || material.name === 'Body') {
            node.material = materials.BASE;
          } else if (material.name === 'ACCENTS' || material.name === 'Accents') {
            node.material = materials.ACCENTS;
          }
        };

        if (Array.isArray(node.material)) {
          node.material.forEach(handleMaterial);
        } else {
          handleMaterial(node.material);
        }
      }
    });

  }, [clonedScene]);

  return <primitive object={clonedScene} />
}

useGLTF.preload('/src/assets/tape3.glb')
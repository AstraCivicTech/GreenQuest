// src/components/GrassPlanet.jsx
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import * as THREE from "three";
import Tree from "./Tree"; // 👈 Import your Tree component

export default function GrassPlanet() {
  const groupRef = useRef();

  const grassTexture = useLoader(TextureLoader, "/textures/rockyGrass.jpg");
  grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(10, 10);

  useFrame(() => {
    // 🌍 Rotate the whole planet group (planet + tree)
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial map={grassTexture} />
      </mesh>

      {/* 🌳 Tree positioned on top of the sphere */}
      <Tree position={[0, 2.62, 0]} scale={[0.6, 0.6, 0.6]} />
    </group>
  );
}

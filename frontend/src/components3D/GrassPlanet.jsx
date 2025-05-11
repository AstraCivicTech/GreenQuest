import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
import Tree from "./Tree";

export default function GrassPlanet() {
  const groupRef = useRef();

  const grassTexture = useLoader(TextureLoader, "/textures/rockyGrass.jpg");
  grassTexture.wrapS = grassTexture.wrapT = RepeatWrapping;
  grassTexture.repeat.set(10, 10);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial map={grassTexture} />
      </mesh>
      <Tree position={[0, 2.57, 0]} scale={[0.6, 0.6, 0.6]} />
    </group>
  );
}

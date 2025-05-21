import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import Tree from "./Tree";
import FloweryPlanet from "./FloweryPlanet";
import PinkFlower from "./PinkFlower";
import WhiteFlower from "./WhiteFlower";
import SecondWhiteFLower from "./SecondWhiteFlower";
import LilyFlower from "./LilyFlower";
import Bush from "./Bush";
import SecondBush from "./SecondBush";

export default function GrassPlanet() {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} position={[0, 3, 0]}>
      <mesh receiveShadow castShadow>
        <FloweryPlanet args={[2, 128, 128]} scale={[2.5, 2.5, 2.5]} />
      </mesh>
      <Tree position={[0, 2.7, 0]} scale={[0.87, 0.87, 0.87]} />
      <PinkFlower position={[0, 1.3, 1.8]} scale={[0.4, 0.4, 0.4]} />
      <WhiteFlower
        position={[-0.5, 1.3, -1.8]}
        scale={[0.35, 0.35, 0.35]}
        rotation={[Math.PI / -3.7, Math.PI / 25, 0.2]} // X, Y, Z rotation in radians
      />
      <LilyFlower
        position={[1.95, 1.22, 0.1]}
        scale={[0.33, 0.33, 0.33]}
        rotation={[Math.PI / -4.9, Math.PI / 25.2, -0.55]}
      />
      <SecondWhiteFLower
        position={[-1.8, 1.15, 0.7]}
        scale={[0.35, 0.35, 0.35]}
        rotation={[Math.PI / -20, Math.PI / -10, -30.6]}
      />
      <Bush
        position={[-1.8, 1.42, -0.55]}
        scale={[0.63, 0.63, 0.63]}
        rotation={[Math.PI / -20, Math.PI / -10, -30]}
      />
      <SecondBush
        position={[-0.6, 0.15, 2.13]}
        scale={[0.59, 0.59, 0.59]}
        rotation={[Math.PI / -19, Math.PI / -9.5, -30]}
      />
    </group>
  );
}

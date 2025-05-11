import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Text,
  Sky,
  Cloud,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import GrassPlanet from "./GrassPlanet";
import Fireflies from "./Fireflies";
import Tree from "./Tree";

function CameraRig() {
  useFrame(({ camera }) => {
    if (camera.position.z > 9) {
      camera.position.z -= 0.02;
    }
  });
  return null;
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 14], fov: 50 }}
      shadows
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      {/* ☁️ Day Sky */}
      <color attach="background" args={["#aee7ff"]} />
      <Sky
        sunPosition={[100, 5, 100]} // ⬅️ lower Y value "lowers" the sky gradient
        turbidity={8}
        rayleigh={6}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* ☁️ Moving Clouds */}
      <Cloud position={[0, 5, -10]} speed={0.2} opacity={0.4} segments={20} />
      <Cloud position={[5, 6, -15]} speed={0.25} opacity={0.35} segments={20} />
      <Cloud position={[-5, 4, -8]} speed={0.18} opacity={0.5} segments={20} />

      {/* 💡 Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

      <Suspense fallback={null}>
        <GrassPlanet />
        <Fireflies />
        <Environment preset="sunset" />
      </Suspense>

      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        🌍 Green Quest
      </Text>

      <CameraRig />
      <OrbitControls
        enablePan={false}
        enableRotate={true}
        enableZoom={false}
        target={[0, 3, 0]} // 👈 centers rotation on the new planet position
      />
    </Canvas>
  );
}

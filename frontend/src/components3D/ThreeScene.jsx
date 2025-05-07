// src/components/ThreeScene.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Environment, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";
import GrassPlanet from "./GrassPlanet";
import Fireflies from "./Fireflies";
import Tree from "./Tree"; // Adjust the path if needed

function CameraRig() {
  const cameraRef = useRef();

  useFrame(({ camera }) => {
    if (camera.position.z > 9) {
      camera.position.z -= 0.02; // Zoom in speed
    }
  });

  return null;
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 3, 14], fov: 50 }} // 📍 Start further back
      shadows
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* 🌌 Background */}
      <color attach="background" args={["#02040f"]} />

      {/* 💡 Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

      <Suspense fallback={null}>
        <GrassPlanet />
        <Fireflies />
        <Stars
          radius={200} // Radius of the inner sphere (controls star spread)
          depth={50} // Star field depth
          count={10000} // Total number of stars
          factor={15} // Size of stars (increase for brightness effect)
          saturation={2} // Color saturation
          fade // Enables fading based on distance
          speed={2} // Subtle motion to make them twinkle
        />

        <Environment preset="sunset" />
      </Suspense>

      {/* 📝 Floating 3D Text */}
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
        enableRotate={false}
        enableZoom={false}
      />
    </Canvas>
  );
}

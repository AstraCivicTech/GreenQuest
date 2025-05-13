// src/components3D/ThreeScene.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Text,
  Sky,
  Cloud,
  Html,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import GrassPlanet from "./GrassPlanet";
import Skybox from "./Skybox";
import "../styles/ThreeScene.css";

function CameraRig() {
  useFrame(({ camera }) => {
    if (camera.position.z > 9) {
      camera.position.z -= 0.02;
    }
  });
  return null;
}

// Wraps the entire Canvas to delay rendering until assets are ready
export default function ThreeScene() {
  return (
    <Suspense
      fallback={
        <div className="canvas-loader">
          <div className="leaf-spinner" />
          <p className="loading-message">
            🌿 Initializing GreenQuest environment...
          </p>
        </div>
      }
    >
      <Canvas
        camera={{ position: [0, 4, 12], fov: 50 }}
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
        <color attach="background" args={["#aee7ff"]} />
        <Sky
          sunPosition={[100, 5, 100]}
          turbidity={8}
          rayleigh={6}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />
        <Cloud
          position={[0, 2.5, -10]}
          speed={0.2}
          opacity={0.4}
          segments={20}
        />
        <Cloud
          position={[5, 3.5, -15]}
          speed={0.25}
          opacity={0.35}
          segments={20}
        />
        <Cloud
          position={[0, 0, 4.5]}
          speed={0.18}
          opacity={1.5}
          segments={20}
        />

        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

        <Skybox />
        <GrassPlanet />
        <Environment preset="sunset" />

        <Text
          position={[0, 7, 0]}
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
          target={[0, 4.5, 0]}
        />
      </Canvas>
    </Suspense>
  );
}

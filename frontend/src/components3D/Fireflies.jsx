// src/components/Fireflies.jsx
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Fireflies() {
  const count = 80;
  const firefliesRef = useRef();

  // Create random base positions once
  const basePositions = useMemo(() => {
    return new Array(count).fill().map(() => ({
      x: (Math.random() - 0.5) * 6,
      y: Math.random() * 4 + 1,
      z: (Math.random() - 0.5) * 6,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const positions = firefliesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const base = basePositions[i];
      positions[i3] = base.x + Math.sin(t + base.offset) * 0.5;
      positions[i3 + 1] = base.y + Math.sin(t * 2 + base.offset) * 0.2;
      positions[i3 + 2] = base.z + Math.cos(t + base.offset) * 0.5;
    }

    firefliesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={firefliesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        color={new THREE.Color("#aaff88")}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

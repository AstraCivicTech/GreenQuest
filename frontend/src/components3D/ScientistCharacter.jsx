// src/components/ScientistCharacter.jsx
import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import "../styles/ThreeCharacter.css";

export default function ScientistCharacter(props) {
  const ref = useRef();
  const { scene, animations } = useGLTF("/models/scientist.glb");
  const { actions } = useAnimations(animations, ref);

  // Play first animation
  useEffect(() => {
    if (actions && Object.values(actions)[0]) {
      Object.values(actions)[0].play();
    }
  }, [actions]);

  return (
    <primitive
      object={scene}
      ref={ref}
      position={[2.5, -3, 2]}
      scale={props.scale || [3, 3, 3]}
      rotation={[-0.38, Math.PI, 0]} // face camera
      {...props}
    />
  );
}

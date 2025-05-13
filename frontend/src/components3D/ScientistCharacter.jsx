// src/components/ScientistCharacter.jsx
import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import "../styles/ThreeCharacter.css";

export default function ScientistCharacter(props) {
  const ref = useRef();
  const { scene, animations } = useGLTF("/models/scientist.glb");
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions && Object.values(actions)[0]) {
      Object.values(actions)[0].play();
    }
  }, [actions]);

  return (
    <primitive
      object={scene}
      ref={ref}
      position={[-1, 4.5, 1.5]}
      scale={props.scale || [5.5, 5.5, 5.5]}
      rotation={[Math.PI, Math.PI, -0.2]} // only Y-axis to face camera
      {...props}
    />
  );
}

import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";
import "../styles/ThreeCharacter.css";

export default function ScientistCharacter(props) {
  // useful for keeping a mutable value between renders
  const ref = useRef();
  // useGLTF loads the model and animations
  const { scene, animations } = useGLTF("/models/scientist.glb");
  // useAnimations is used to manage the animations of the model
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
      position={[0.4, -1.2, 0.3]}
      scale={props.scale || [1.8, 1.8, 1.8]}
      rotation={[0, -2.5, 0]} // Face camera
      {...props}
    />
  );
}

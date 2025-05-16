// src/components/Tree.jsx
import { useGLTF } from "@react-three/drei";

export default function PinkFlower(props) {
  const { scene } = useGLTF("/models/pinkflower.glb");

  return <primitive object={scene} {...props} />;
}

// src/components/Tree.jsx
import { useGLTF } from "@react-three/drei";

export default function Tree(props) {
  const { scene } = useGLTF("/models/tree.glb");

  return <primitive object={scene} {...props} />;
}

import { useGLTF } from "@react-three/drei";

export default function Bush(props) {
  const { scene } = useGLTF("/models/bush.glb");

  return <primitive object={scene} {...props} />;
}

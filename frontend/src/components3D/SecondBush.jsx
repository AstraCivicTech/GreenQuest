import { useGLTF } from "@react-three/drei";

export default function SecondBush(props) {
  const { scene } = useGLTF("/models/bush2.glb");

  return <primitive object={scene} {...props} />;
}

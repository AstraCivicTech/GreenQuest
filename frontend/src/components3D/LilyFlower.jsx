import { useGLTF } from "@react-three/drei";

export default function LilyFlower(props) {
  const { scene } = useGLTF("/models/lilyflower.glb");

  return <primitive object={scene} {...props} />;
}

import { useGLTF } from "@react-three/drei";

export default function WhiteFlower(props) {
  const { scene } = useGLTF("/models/whiteflower.glb");

  return <primitive object={scene} {...props} />;
}

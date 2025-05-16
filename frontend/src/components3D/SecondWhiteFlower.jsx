import { useGLTF } from "@react-three/drei";

export default function SecondWhiteFLower(props) {
  const { scene } = useGLTF("/models/whiteflower2.glb");

  return <primitive object={scene} {...props} />;
}

import { useGLTF } from "@react-three/drei";

export default function Tree(props) {
  const { scene } = useGLTF("/models/worldtree.glb");

  return <primitive object={scene} {...props} />;
}

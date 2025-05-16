import { useGLTF } from "@react-three/drei";

export default function FloweryPlanet(props) {
  const { scene } = useGLTF("/models/floweryplanet.glb");

  return <primitive object={scene} {...props} />;
}

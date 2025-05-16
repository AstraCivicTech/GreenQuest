// Skybox.jsx
import { useLoader } from "@react-three/fiber";
import { TextureLoader, BackSide } from "three";

export default function Skybox() {
  const texture = useLoader(TextureLoader, "/textures/bluesky.jpg");

  return (
    <mesh scale={[500, 500, 500]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial map={texture} side={BackSide} />
    </mesh>
  );
}

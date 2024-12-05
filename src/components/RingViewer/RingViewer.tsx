import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Environment,
} from "@react-three/drei";
import { Ring } from "./Ring";
import { RingConfig } from "@/types/ring";

interface RingViewerProps {
  ringConfig: RingConfig;
  onChange: (config: RingConfig) => void;
}

const Pedestal = () => {
  return (
    <mesh position={[0, -1.2, 0]}>
      <cylinderGeometry args={[1.2, 0.5, 0.5, 32]} />
      <meshStandardMaterial
        color="#B8B8D0"
        metalness={0.9}
        roughness={0.1}
        emissive="#6B6B7A"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const FloatingRing = ({ config }: { config: RingConfig }) => {
  return (
    <group position={[0, 0.5, 0]} rotation={[0.5, 0, 0]}>
      <Ring config={config} />
      <pointLight position={[0, -0.5, 0]} intensity={0.5} color="#4444ff" />
    </group>
  );
};

export const RingViewer = ({ ringConfig }: RingViewerProps) => {
  return (
    <div
      style={{
        height: "50vh",
        background: "linear-gradient(45deg, #000428 0%, #004e92 100%)",
        position: "relative",
      }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />

        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        <Environment preset="night" intensity={1} />

        <Pedestal />
        <FloatingRing config={ringConfig} />
      </Canvas>
    </div>
  );
};

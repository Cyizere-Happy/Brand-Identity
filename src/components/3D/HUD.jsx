import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const HUD = () => {
  const scroll = useScroll();
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scroll.offset;
    const targetOffset = 0.6; // Page 3
    const visibility = Math.max(0, 1 - Math.abs(offset - targetOffset) * 8);
    groupRef.current.visible = visibility > 0.01;
    groupRef.current.scale.setScalar(visibility);
    groupRef.current.rotation.z += 0.002;
  });

  return (
    <group ref={groupRef} position={[0, 0, 3.5]}>
      {/* Concentric Tech Rings */}
      <mesh>
        <ringGeometry args={[2.2, 2.201, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
      <mesh>
        <ringGeometry args={[2.0, 2.002, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.8, 1.805, 128]} />
        <meshBasicMaterial color="#FF4D00" transparent opacity={0.15} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.5, 1.501, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>

      {/* Measurement Markers (Outer) */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group key={i} rotation={[0, 0, (i * 30 * Math.PI) / 180]}>
          <mesh position={[0, 2.2, 0]}>
            <boxGeometry args={[0.005, 0.08, 0.005]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
        </group>
      ))}

      {/* Crosshair Dots */}
      {[0, 90, 180, 270].map((rot) => (
        <group key={rot} rotation={[0, 0, (rot * Math.PI) / 180]}>
          <mesh position={[0, 1.4, 0]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color="#FF4D00" transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Subtle Scanner Line */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[4.4, 0.001, 0.001]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.03} />
      </mesh>
    </group>
  );
};

export default HUD;

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
    <group ref={groupRef} position={[0, 0, 1.8]}>
      {/* Razor-thin Rings */}
      <mesh>
        <ringGeometry args={[2.0, 2.002, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.8, 1.802, 128]} />
        <meshBasicMaterial color="#F57C00" transparent opacity={0.2} />
      </mesh>

      {/* Measurement Markers */}
      {[0, 90, 180, 270].map((rot) => (
        <group key={rot} rotation={[0, 0, (rot * Math.PI) / 180]}>
          <mesh position={[0, 2.0, 0]}>
            <boxGeometry args={[0.005, 0.1, 0.005]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Pointer Lines (connecting to UI labels) */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[4.5, 0.002, 0.002]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[4.5, 0.002, 0.002]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

export default HUD;

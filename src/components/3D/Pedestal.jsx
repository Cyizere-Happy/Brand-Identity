import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const Pedestal = ({ position = [0, -4.5, 0], scale = 1 }) => {
  const scroll = useScroll();
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scroll.offset;
    // Section 4 is Podium (approx 0.8)
    // Visible between 0.7 and 0.9
    const visibility = Math.max(0, 1 - Math.abs(offset - 0.8) * 10);
    groupRef.current.visible = visibility > 0.01;
    groupRef.current.position.y = -4.5 + (1 - visibility) * -5; // Slide in from bottom
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Bottom Tier */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[5, 5.5, 1, 64]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
      </mesh>
      
      {/* Middle Tier */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[4, 4.5, 1, 64]} />
        <meshStandardMaterial color="#080808" roughness={0.1} metalness={1} />
      </mesh>

      {/* Top Tier */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[3, 3, 1, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.05} metalness={1} />
      </mesh>
      
      {/* Glowing Ring on Top Tier Edge */}
      <mesh position={[0, 2.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={4} 
          transparent 
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

export default Pedestal;

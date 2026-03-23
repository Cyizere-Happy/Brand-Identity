import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const Basketball = () => {
  const meshRef = useRef();
  const scroll = useScroll();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const bumpMap = useMemo(() => {
    const size = 512;
    const data = new Uint8Array(size * size);
    for (let i = 0; i < size * size; i++) {
      data[i] = Math.random() * 255;
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(8, 8);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#D42A1B', 
    roughness: 0.5,
    metalness: 0.1,
    bumpMap: bumpMap,
    bumpScale: 0.003,
    clearcoat: 0.4,
    clearcoatRoughness: 0.4,
    sheen: 1,
    sheenColor: '#ff4d00',
  }), [bumpMap]);

  const stages = [
    [0, 0, 0, 1.3, 0, 0],         
    [4.5, 0.5, 4, 2.8, 0.5, -0.6], 
    [-4.5, 0.5, 4, 2.8, 0.2, 0.6],  
    [0, 0, 2.5, 1.6, 0.3, 0],        
    [0, -1, 0, 1.2, 0, 0],           
    [0, 20, -10, 1, 8, 0],          
  ];

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const offset = scroll.offset; 
    const totalStages = stages.length - 1;
    const currentIdx = Math.floor(offset * totalStages);
    const nextIdx = Math.min(currentIdx + 1, totalStages);
    const t = (offset * totalStages) % 1;

    const s1 = stages[currentIdx];
    const s2 = stages[nextIdx];

    // Smooth position
    meshRef.current.position.x = THREE.MathUtils.lerp(s1[0], s2[0], t) + mouseRef.current.x * 0.15;
    meshRef.current.position.y = THREE.MathUtils.lerp(s1[1], s2[1], t) - mouseRef.current.y * 0.15;
    meshRef.current.position.z = THREE.MathUtils.lerp(s1[2], s2[2], t);
    
    // Smooth scale
    const targetScale = THREE.MathUtils.lerp(s1[3], s2[3], t);
    meshRef.current.scale.setScalar(targetScale);
    
    // Constant rotation + scroll rotation
    meshRef.current.rotation.y += delta * 0.5;
    const targetRotX = THREE.MathUtils.lerp(s1[4], s2[4], t);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX + mouseRef.current.y * 0.2, 0.1);
  });

  return (
    <group ref={meshRef}>
      <mesh castShadow receiveShadow material={material}>
        <sphereGeometry args={[1.5, 128, 128]} />
      </mesh>
      
      {/* Seams */}
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.505, 0.015, 16, 128]} />
          <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.505, 0.015, 16, 128]} />
          <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[1.505, 0.012, 16, 128]} />
          <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <torusGeometry args={[1.505, 0.012, 16, 128]} />
          <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

export default Basketball;

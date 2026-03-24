import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const SoccerBall = () => {
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

  const rawTexture = useTexture('/soccer_texture.png');
  const texture = useMemo(() => {
    const tex = rawTexture.clone();
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 16;
    return tex;
  }, [rawTexture]);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: texture,
    roughness: 0.6,
    metalness: 0.1,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
  }), [texture]);

  const stages = [
    [0, 0, 0, 0.8, 0, 0],         
    [5.5, 0.3, 2, 2.4, 0.5, -0.6], 
    [-6, 0.5, 2.5, 2.2, 0.2, 0.6],  
    [0, 0, 0, 0.8, 0.3, 0],        
    [0, -0.2, 0, 0.9, 0.5, 0],           
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
        <sphereGeometry args={[1.5, 64, 64]} />
      </mesh>
    </group>
  );
};

export default SoccerBall;

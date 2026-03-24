import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

const Volleyball = () => {
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

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Base white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1024, 512);

    // Smooth wavy bands to simulate volleyball panels
    ctx.fillStyle = '#0055FF'; // Blue
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.bezierCurveTo(341, 200, 682, 0, 1024, 100);
    ctx.lineTo(1024, 250);
    ctx.bezierCurveTo(682, 150, 341, 350, 0, 250);
    ctx.fill();

    ctx.fillStyle = '#FFD700'; // Yellow
    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.bezierCurveTo(341, 450, 682, 250, 1024, 350);
    ctx.lineTo(1024, 500);
    ctx.bezierCurveTo(682, 400, 341, 600, 0, 500);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 16;
    return tex;
  }, []);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: texture,
    roughness: 0.5,
    metalness: 0.1,
    clearcoat: 0.1,
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

export default Volleyball;

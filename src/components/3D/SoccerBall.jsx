import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

// Calculate icosahedron vertices for perfect pentagon placement
const phi = (1 + Math.sqrt(5)) / 2;
const radius = 1.5;
const rawVertices = [
  [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
  [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
  [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
];

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

  // Tiny noise for leather bump
  const bumpMap = useMemo(() => {
    const size = 256;
    const data = new Uint8Array(size * size);
    for (let i = 0; i < size * size; i++) data[i] = Math.random() * 255;
    const tex = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Pre-compute the 12 pentagon positions and rotations
  const patches = useMemo(() => {
    return rawVertices.map(v => {
      const vec = new THREE.Vector3(...v).normalize().multiplyScalar(radius * 0.98);
      const dummy = new THREE.Object3D();
      dummy.position.copy(vec);
      dummy.lookAt(0, 0, 0);
      dummy.rotateX(Math.PI / 2); // align cap to surface
      // rotate randomly around Y to make pentagon point outward organically
      dummy.rotateY(Math.PI / 5); 
      return { position: dummy.position, rotation: dummy.rotation };
    });
  }, []);

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
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhysicalMaterial 
           color="#f4f4f4" 
           roughness={0.7} 
           clearcoat={0.1}
           bumpMap={bumpMap}
           bumpScale={0.002}
        />
      </mesh>
      {/* 12 Black Pentagons */}
      {patches.map((p, i) => (
        <mesh key={i} position={p.position} rotation={p.rotation} castShadow receiveShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.1, 5]} />
          <meshPhysicalMaterial 
             color="#111111" 
             roughness={0.8} 
             clearcoat={0.2}
             bumpMap={bumpMap}
             bumpScale={0.005}
          />
        </mesh>
      ))}
    </group>
  );
};

export default SoccerBall;

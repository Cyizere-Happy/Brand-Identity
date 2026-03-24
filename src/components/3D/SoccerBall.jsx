import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
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

  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const width = 1024;
    const height = 512;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;

    // 1. Calculate 12 vertices of an icosahedron
    const phi = (1 + Math.sqrt(5)) / 2;
    const vRaw = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ];
    const vertices = vRaw.map(v => new THREE.Vector3(...v).normalize());

    // 2. Calculate 20 face centers of the icosahedron
    const faces = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        for (let k = j + 1; k < vertices.length; k++) {
          const d1 = vertices[i].distanceTo(vertices[j]);
          const d2 = vertices[j].distanceTo(vertices[k]);
          const d3 = vertices[k].distanceTo(vertices[i]);
          // Normalized edge length is ~1.05146
          if (Math.abs(d1 - 1.0515) < 0.05 && Math.abs(d2 - 1.0515) < 0.05 && Math.abs(d3 - 1.0515) < 0.05) {
            faces.push([vertices[i], vertices[j], vertices[k]]);
          }
        }
      }
    }

    const faceCenters = faces.map(f => 
      new THREE.Vector3().add(f[0]).add(f[1]).add(f[2]).normalize()
    );

    // 32 total points: 12 vertices (will become pentagons) + 20 face centers (will become hexagons)
    const points = [...vertices, ...faceCenters];

    // 3. Map equirectangular projection to 3D and test Voronoi distance
    for (let y = 0; y < height; y++) {
      const lat = (1 - y / height) * Math.PI - (Math.PI / 2); // PI/2 to -PI/2
      const cosLat = Math.cos(lat);
      const sinLat = Math.sin(lat);
      for (let x = 0; x < width; x++) {
        const lon = (x / width) * 2 * Math.PI - Math.PI; // -PI to PI
        
        const px = cosLat * Math.cos(lon);
        const py = sinLat;
        const pz = cosLat * Math.sin(lon);
        
        let minDist = Infinity;
        let minDist2 = Infinity;
        let closestIdx = -1;

        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          const dx = pt.x - px;
          const dy = pt.y - py;
          const dz = pt.z - pz;
          const dist = dx*dx + dy*dy + dz*dz; // using dist^2 for faster sorting
          
          if (dist < minDist) {
            minDist2 = minDist;
            minDist = dist;
            closestIdx = i;
          } else if (dist < minDist2) {
            minDist2 = dist;
          }
        }

        // Vertices (0-11) are black pentagons, Face centers (12-31) are white hexagons
        const isBlack = closestIdx < 12;
        let c = isBlack ? 25 : 245; 
        
        // Seams (if the distance difference between closest and second closest is small)
        if (minDist2 - minDist < 0.015) {
          c = 15; // Dark seams
        }

        const idx = (y * width + x) * 4;
        data[idx] = c;
        data[idx + 1] = c;
        data[idx + 2] = c;
        data[idx + 3] = 255;
      }
    }

    ctx.putImageData(imgData, 0, 0);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 16;
    return tex;
  }, []);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: texture,
    roughness: 0.6,
    metalness: 0.1,
    clearcoat: 0.2,
    clearcoatRoughness: 0.2,
    bumpMap: texture,
    bumpScale: 0.005,
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

    meshRef.current.position.x = THREE.MathUtils.lerp(s1[0], s2[0], t) + mouseRef.current.x * 0.15;
    meshRef.current.position.y = THREE.MathUtils.lerp(s1[1], s2[1], t) - mouseRef.current.y * 0.15;
    meshRef.current.position.z = THREE.MathUtils.lerp(s1[2], s2[2], t);
    
    const targetScale = THREE.MathUtils.lerp(s1[3], s2[3], t);
    meshRef.current.scale.setScalar(targetScale);
    
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

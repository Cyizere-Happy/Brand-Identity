import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Float, Stars, ScrollControls, Scroll, ContactShadows } from '@react-three/drei';
import Basketball from './Basketball';
import Football from './Football';
import SoccerBall from './SoccerBall';
import Volleyball from './Volleyball';
import Fragments from './Fragments';
import Pedestal from './Pedestal';
import HUD from './HUD';
import Content from '../UI/Content';
import Header from '../UI/Header';
import SideNav from '../UI/SideNav';
import Cart from '../UI/Cart';
import HeroText from './HeroText';
import CustomLoader from '../UI/CustomLoader';
import { Suspense, useState, useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const products = [
  { id: 'basketball', color: '#FF4D00', heroText: 'SPAING', price: '$34.99', desc: 'SIZE: 29.5" • OFFICIAL' },
  { id: 'football', color: '#8B4513', heroText: 'GRIDIRON', price: '$29.99', desc: 'SIZE: 9" • PRO PIGSKIN' },
  { id: 'soccer', color: '#2ecc71', heroText: 'STRIKER', price: '$39.99', desc: 'SIZE: 5 • MATCH BALL' },
  { id: 'volleyball', color: '#3498db', heroText: 'SPIKE', price: '$24.99', desc: 'SIZE: 5 • INDOOR/BEACH' }
];

// Pub-sub store to decouple state from <ScrollControls>
export const productStore = {
  idx: 0,
  listeners: new Set(),
  next() { this.idx = (this.idx + 1) % products.length; this.notify(); },
  prev() { this.idx = (this.idx - 1 + products.length) % products.length; this.notify(); },
  subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  notify() { this.listeners.forEach(fn => fn(this.idx)); },
  getSnapshot() { return this.idx; }
};

const useActiveProductIdx = () => {
  const [idx, setIdx] = useState(productStore.getSnapshot());
  useEffect(() => productStore.subscribe(setIdx), []);
  return idx;
};

const ThemeManager = () => {
  const idx = useActiveProductIdx();
  useEffect(() => {
    const container = document.querySelector('.canvas-container');
    if (container) container.style.setProperty('--primary-color', products[idx].color);
  }, [idx]);
  return null;
};

const Lights = () => {
  const idx = useActiveProductIdx();
  const color = products[idx].color;
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 15, 10]} angle={0.25} penumbra={1} intensity={1500} castShadow />
      <pointLight position={[-10, 5, -5]} intensity={1500} color={color} />
      <pointLight position={[10, 5, -5]} intensity={1500} color={color} />
      <directionalLight position={[0, -5, 5]} intensity={0.5} />
    </>
  );
};

const DynamicHeroText = () => {
  const idx = useActiveProductIdx();
  return <HeroText text={products[idx].heroText} />;
};

const ProductWrapper = ({ index, children }) => {
  const groupRef = useRef();
  const activeIdx = useActiveProductIdx();
  const active = activeIdx === index;
  const targetScale = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const s = active ? 1 : 0.001;
    targetScale.set(s, s, s);
    groupRef.current.scale.lerp(targetScale, 0.15); 
    
    if (!active && groupRef.current.scale.x > 0.01) {
       groupRef.current.rotation.y -= delta * 5;
       groupRef.current.rotation.z += delta * 2;
    } else if (active && groupRef.current.scale.x < 0.99) {
       groupRef.current.rotation.set(0, 0, 0); 
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const HtmlUI = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const idx = useActiveProductIdx();
  
  return (
    <>
      <div className="fixed-ui">
        <Header onCartClick={() => setIsCartOpen(true)} />
        <SideNav totalPages={6} />
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
      <Content 
         activeProduct={products[idx]} 
         onNext={() => productStore.next()} 
         onPrev={() => productStore.prev()} 
      />
    </>
  );
};

const SceneContent = () => {
  return (
    <>
      <ThemeManager />
      <ScrollControls pages={6} damping={0.25}>
        <Lights />

        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          <ProductWrapper index={0}><Basketball /></ProductWrapper>
          <ProductWrapper index={1}><Football /></ProductWrapper>
          <ProductWrapper index={2}><SoccerBall /></ProductWrapper>
          <ProductWrapper index={3}><Volleyball /></ProductWrapper>
        </Float>
        <DynamicHeroText />

        <Pedestal position={[0, -4.5, 0]} />
        <HUD />

        <Fragments count={40} />
        <ContactShadows opacity={0.4} scale={20} blur={2.4} far={4.5} />
        <Environment preset="night" />

        <Scroll html>
          <HtmlUI />
        </Scroll>
      </ScrollControls>
    </>
  );
};

const Scene = () => {
  return (
    <>
      <CustomLoader />
      <div className="canvas-container">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default Scene;

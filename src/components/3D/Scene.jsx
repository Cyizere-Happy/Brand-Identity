import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Float, Stars, ScrollControls, Scroll, ContactShadows } from '@react-three/drei';
import Basketball from './Basketball';
import Fragments from './Fragments';
import Pedestal from './Pedestal';
import HUD from './HUD';
import Content from '../UI/Content';
import Header from '../UI/Header';
import SideNav from '../UI/SideNav';
import Cart from '../UI/Cart';
import { Suspense, useState } from 'react';

const Scene = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="canvas-container">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={6} damping={0.25}>
            {/* Dramatic Lighting */}
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 15, 10]} angle={0.25} penumbra={1} intensity={1500} castShadow />
            <pointLight position={[-10, 5, -5]} intensity={1500} color="#FF4D00" /> {/* Left Rim */}
            <pointLight position={[10, 5, -5]} intensity={1500} color="#FF4D00" />  {/* Right Rim */}
            <directionalLight position={[0, -5, 5]} intensity={0.5} />

            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
              <Basketball />
            </Float>

            <Pedestal position={[0, -4.5, 0]} />
            <HUD />

            <Fragments count={40} />
            <ContactShadows opacity={0.4} scale={20} blur={2.4} far={4.5} />
            <Environment preset="night" />

            <Scroll html>
              <div className="fixed-ui">
                <Header onCartClick={() => setIsCartOpen(true)} />
                {/* We removed SideNav because 01/06 is now in Content.jsx for the Hero, 
                    but we might want to keep it global if it appears on all pages. 
                    Let's update SideNav to be the vertical one on the right. */}
                <SideNav totalPages={6} />
                <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              </div>
              <Content />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;

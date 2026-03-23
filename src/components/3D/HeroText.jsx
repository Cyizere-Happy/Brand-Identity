import { Text, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const HeroText = () => {
  const textRef = useRef();
  const scroll = useScroll();

  useFrame(() => {
    if (textRef.current) {
      // Fade out based on scroll offset
      // offset goes from 0 to 1 over all pages (6 pages)
      // We want it to be fully visible at 0, and invisible by the end of page 1 (1/6 = 0.166)
      const opacity = Math.max(0, 1 - scroll.offset * 10); 
      textRef.current.fillOpacity = opacity * 0.15; // Target 0.15 max opacity
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, 0, -4]}
      fontSize={6}
      color="white"
      font="https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/bebasneue/BebasNeue-Regular.ttf"
      anchorX="center"
      anchorY="middle"
      maxWidth={20}
      textAlign="center"
      fontStyle="italic"
      fontWeight="900"
    >
      SPAING
    </Text>
  );
};

export default HeroText;

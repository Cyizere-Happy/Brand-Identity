import { Text, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const HeroText = () => {
  const textRef = useRef();
  const scroll = useScroll();

  useFrame(() => {
    if (textRef.current) {
      const scrollOpacity = Math.max(0, 1 - scroll.offset * 10);
      textRef.current.fillOpacity = scrollOpacity * 0.15;
      textRef.current.outlineOpacity = scrollOpacity * 0.05;
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, 0, -4]}
      fontSize={5.5}
      color="white"
      font="https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/bebasneue/BebasNeue-Regular.ttf"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.04}
      outlineColor="white"
      fontWeight="bold"
    >
      SPAING
    </Text>
  );
};

export default HeroText;

import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

const SideNav = ({ totalPages = 6 }) => {
  const scroll = useScroll();
  const [activeSection, setActiveSection] = useState(0);

  useFrame(() => {
    // scroll.offset is 0 to 1
    const section = Math.min(Math.floor(scroll.offset * totalPages + 0.1), totalPages - 1);
    if (section !== activeSection) {
      setActiveSection(section);
    }
  });

  return (
    <div className="side-nav-vertical">
      <span className="current">0{activeSection + 1}</span>
      <span className="separator"> / </span>
      <span className="total">0{totalPages}</span>
    </div>
  );
};

export default SideNav;

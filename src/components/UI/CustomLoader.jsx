import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { Hourglass } from 'lucide-react';

const CustomLoader = () => {
  const { active } = useProgress();
  const [minTimePassed, setMinTimePassed] = useState(false);

  // Enforce a smooth minimum 1.5s loading screen for aesthetic polish, 
  // ensuring the user actually gets to see the cool hourglass animation even if assets load instantly!
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = active || !minTimePassed;

  if (!isLoading) return null;

  return (
    <div className="loader-overlay">
      <div className="hourglass-container">
        <Hourglass size={32} color="white" className="spinning-hourglass" />
        <p>loading</p>
      </div>
    </div>
  );
};

export default CustomLoader;

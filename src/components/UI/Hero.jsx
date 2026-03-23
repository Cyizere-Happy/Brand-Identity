import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Hero = ({ title, price, material, grip }) => {
  const textRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!textRef.current) return;
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 50;
      const yPos = (clientY / window.innerHeight - 0.5) * 50;

      gsap.to(textRef.current, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background-text" ref={textRef}>
        <motion.h1 
          initial={{ opacity: 0, scale: 1.2 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {title}
        </motion.h1>
      </div>

      <div className="hero-content">
        <motion.div 
          className="hero-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="amount">{price}</span>
          </div>
        </motion.div>

        <motion.div 
          className="hero-bottom"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button className="cta-button">
            ADD TO CART
          </button>
        </motion.div>

        <div className="hero-meta">
          <div className="meta-item">
            <span className="label">MATERIAL</span>
            <span className="value">{material}</span>
          </div>
          <div className="meta-item">
            <span className="label">GRIP</span>
            <span className="value">{grip}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

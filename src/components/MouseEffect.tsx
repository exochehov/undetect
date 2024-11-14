import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
  timestamp: number;
}

export default function MouseEffect() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0, timestamp: Date.now() });
  const [isMoving, setIsMoving] = useState(false);
  const [trail, setTrail] = useState<Position[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const trailLength = 12;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let lastUpdate = Date.now();
    const updateInterval = 12; // Increased frequency for smoother trail
    
    const updateMousePosition = (ev: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < updateInterval) return;
      lastUpdate = now;

      const newPosition = { 
        x: ev.clientX, 
        y: ev.clientY, 
        timestamp: now
      };
      
      const target = ev.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null || 
        target.closest('a') !== null ||
        target.closest('[role="button"]') !== null
      );
      
      setMousePosition(newPosition);
      setIsMoving(true);
      setTrail(prev => [newPosition, ...prev.slice(0, trailLength - 1)]);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 100);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[100] mix-blend-difference"
        animate={{
          scale: isClicking ? 0.8 : isMoving ? 0.6 : isHovering ? 1.5 : 1,
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 1200,
          damping: 40,
          mass: 0.2,
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[100]"
        animate={{
          scale: isClicking ? 0.9 : isMoving ? 1.2 : isHovering ? 1.8 : 1,
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          rotate: isMoving ? 180 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 900,
          damping: 35,
          mass: 0.2,
        }}
      >
        <div className={`w-10 h-10 border-2 rounded-full transition-all duration-300 ${
          isHovering 
            ? 'border-purple-400 opacity-70' 
            : isClicking 
              ? 'border-pink-500 opacity-80' 
              : 'border-purple-500 opacity-50'
        }`} />
      </motion.div>

      {/* Trail effect */}
      {trail.map((position, index) => {
        const size = Math.max(2, 14 - index * 1.2);
        const opacity = Math.max(0.05, 0.6 - (index * 0.05));
        
        return (
          <motion.div
            key={position.timestamp}
            className="fixed pointer-events-none z-[99]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: isMoving ? opacity : 0 
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              left: position.x - (size / 2),
              top: position.y - (size / 2),
              width: size,
              height: size,
              borderRadius: '50%',
              background: `linear-gradient(135deg, #a855f7 ${index * 10}%, #ec4899)`,
              filter: `blur(${index * 0.6}px)`,
            }}
          />
        );
      })}

      {/* Glow effect */}
      <motion.div
        className="fixed pointer-events-none z-[98]"
        animate={{
          scale: isMoving ? 2 : isHovering ? 1.5 : 1,
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          opacity: isMoving ? 0.15 : isHovering ? 0.2 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
        }}
      >
        <div 
          className="rounded-full"
          style={{
            width: "80px",
            height: "80px",
            background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(236,73,153,0.1) 70%)",
            filter: "blur(15px)",
          }}
        />
      </motion.div>
    </>
  );
}
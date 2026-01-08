import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}
export function MagneticButton({
  children,
  className = '',
  onClick,
  href
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = {
    damping: 20,
    stiffness: 300
  };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  const content = <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
    x: xSpring,
    y: ySpring
  }} className={className} whileHover={{
    scale: 1.05
  }} whileTap={{
    scale: 0.95
  }}>
      {children}
    </motion.div>;
  if (href) {
    return <a href={href}>{content}</a>;
  }
  return <div onClick={onClick}>{content}</div>;
}
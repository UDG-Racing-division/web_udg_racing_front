import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
interface ScrollRevealTextProps {
  children: string;
  className?: string;
}
export function ScrollRevealText({
  children,
  className = ''
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });
  const fillProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return <div ref={ref} className={`relative ${className}`}>
    {/* Background text (gray) */}
    <div className="text-gray-600">{children}</div>

    {/* Filled text (white) with clip-path */}
    <motion.div className="absolute inset-0 text-white overflow-hidden" style={{
      clipPath: useTransform(fillProgress, value => `inset(0 ${100 - value}% 0 0)`)
    }}>
      {children}
    </motion.div>
  </div>;
}
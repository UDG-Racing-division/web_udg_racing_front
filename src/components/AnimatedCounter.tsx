import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
interface AnimatedCounterProps {
  value: string;
  duration?: number;
}
export function AnimatedCounter({
  value,
  duration = 2
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  });
  const [displayValue, setDisplayValue] = useState(value);
  useEffect(() => {
    if (isInView) {
      // Check if value is a number
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      if (!isNaN(numericValue)) {
        motionValue.set(numericValue);
      }
    }
  }, [isInView, value, motionValue]);
  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      // Check if original value contains time format (e.g., "1:21")
      if (value.includes(':')) {
        const minutes = Math.floor(latest);
        const seconds = Math.round((latest - minutes) * 60);
        setDisplayValue(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setDisplayValue(Math.round(latest).toString());
      }
    });
    return unsubscribe;
  }, [springValue, value]);
  return <div ref={ref}>{displayValue}</div>;
}
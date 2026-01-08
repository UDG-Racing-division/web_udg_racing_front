import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface LoadingScreenProps {
  onLoadingComplete: () => void;
}
export function LoadingScreen({
  onLoadingComplete
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 30;
    const increment = interval / duration * 100;
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + increment;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);
  return <AnimatePresence>
      <motion.div initial={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} transition={{
      duration: 0.5
    }} className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(var(--color-udg-blue) 1px, transparent 1px), linear-gradient(90deg, var(--color-udg-blue) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4">
          {/* Logo container */}
          <div className="relative w-full mb-12">
            {/* Outline logo (always visible) */}
            <motion.img src="/logoBorde.png" alt="UDG Racing Division Outline" className="w-full h-auto" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5
          }} />

            {/* Filled logo (reveals progressively) */}
            <motion.div className="absolute inset-0 overflow-hidden" style={{
            clipPath: `inset(0 ${100 - progress}% 0 0)`
          }}>
              <img src="/logo_udgRacing.png" alt="UDG Racing Division Filled" className="w-full h-auto" />
            </motion.div>

            {/* Animated fill line */}
            <motion.div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[var(--color-udg-blue)] to-transparent" style={{
            left: `${progress}%`,
            boxShadow: '0 0 20px var(--color-udg-blue)'
          }} animate={{
            opacity: [0.5, 1, 0.5]
          }} transition={{
            duration: 1,
            repeat: Infinity
          }} />
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-md">
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-blue" style={{
              width: `${progress}%`
            }} transition={{
              duration: 0.1
            }} />
            </div>
            <motion.p initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.5
          }} className="text-center text-gray-500 text-sm mt-4 tracking-wider">
              {Math.round(progress)}%
            </motion.p>
          </div>
        </div>

        {/* Ambient glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-udg-blue)] opacity-5 blur-[120px] rounded-full" animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }} transition={{
          duration: 3,
          repeat: Infinity
        }} />
        </div>

        {/* Animated particles */}
        {[...Array(15)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 bg-[var(--color-udg-blue)] rounded-full" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }} animate={{
        y: [0, -30, 0],
        opacity: [0, 0.6, 0]
      }} transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }} />)}
      </motion.div>
    </AnimatePresence>;
}
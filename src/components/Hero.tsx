import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { Three3DBackground } from './Three3DBackground';
export function Hero() {
  const {
    scrollYProgress
  } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scrollToContent = () => {
    const statsSection = document.getElementById('stats');
    statsSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <motion.section style={{
    opacity
  }} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Interactive Background */}
      <Three3DBackground />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90 z-10" />

      {/* Content */}
      <motion.div style={{
      y
    }} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }}>
          <motion.h1 className="font-racing text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight" initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          delay: 0.3
        }}>
            <motion.span initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.5
          }}>
              UDG RACING
            </motion.span>
            <br />
            <motion.span className="text-gradient-blue inline-block" initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.7
          }}>
              DIVISION
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.9
      }} className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Per Scratch. Enginyeria i velocitat des de la Universitat de Girona.
        </motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 1.1
      }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton onClick={scrollToContent} className="px-8 py-4 bg-[var(--color-udg-blue)] text-white font-bold text-lg rounded-none hover:bg-[var(--color-udg-blue-light)] transition-colors duration-300 uppercase tracking-wide glow-blue cursor-pointer">
            Descobreix més
          </MagneticButton>
          <MagneticButton href="#team" className="px-8 py-4 border-2 border-[var(--color-udg-blue)] text-white font-bold text-lg rounded-none hover:bg-[var(--color-udg-blue)] transition-all duration-300 uppercase tracking-wide cursor-pointer">
            Coneix l'equip
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button onClick={scrollToContent} initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1,
      delay: 1.5
    }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity
      }}>
          <ChevronDown className="text-white/50" size={32} />
        </motion.div>
      </motion.button>
    </motion.section>;
}
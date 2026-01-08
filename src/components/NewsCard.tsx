import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  image?: string;
}
export function NewsCard({
  title,
  excerpt,
  date,
  image
}: NewsCardProps) {
  return <motion.div className="group bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-[var(--color-udg-blue)] transition-all duration-500" whileHover={{
    y: -4
  }} transition={{
    type: 'spring',
    stiffness: 300,
    damping: 30
  }}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {/* Image section - 2 columns */}
        <div className="md:col-span-2 aspect-video md:aspect-auto overflow-hidden relative bg-zinc-800">
          {image ? <motion.img src={image} alt={title} className="w-full h-full object-cover" whileHover={{
          scale: 1.1
        }} transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }} /> : <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
              <motion.div className="text-zinc-700 font-racing text-5xl z-10" whileHover={{
            scale: 1.1
          }} transition={{
            type: 'spring',
            stiffness: 300
          }}>
                UDG
              </motion.div>
              {/* Animated grid background */}
              <motion.div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(var(--color-udg-blue) 1px, transparent 1px), linear-gradient(90deg, var(--color-udg-blue) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} animate={{
            backgroundPosition: ['0px 0px', '20px 20px']
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }} />
            </div>}

          {/* Overlay gradient */}
          <motion.div className="absolute inset-0 bg-gradient-to-r from-[var(--color-udg-blue)]/0 to-[var(--color-udg-blue)]/30" initial={{
          opacity: 0
        }} whileHover={{
          opacity: 1
        }} transition={{
          duration: 0.4
        }} />
        </div>

        {/* Content section - 3 columns */}
        <div className="md:col-span-3 p-8 flex flex-col justify-between">
          <div>
            <motion.div className="flex items-center gap-2 text-[var(--color-udg-blue)] text-sm mb-4 font-medium" initial={{
            opacity: 0,
            x: -10
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.4
          }}>
              <Calendar size={16} />
              <span>{date}</span>
            </motion.div>

            <motion.h3 className="font-bold text-2xl md:text-3xl text-white mb-4 group-hover:text-[var(--color-udg-blue)] transition-colors duration-300" initial={{
            opacity: 0,
            y: 10
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.1
          }}>
              {title}
            </motion.h3>

            <motion.p className="text-gray-400 leading-relaxed mb-6" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              {excerpt}
            </motion.p>
          </div>

          <motion.div className="flex items-center gap-2 text-white font-medium group-hover:text-[var(--color-udg-blue)] transition-colors duration-300 cursor-pointer" whileHover={{
          x: 5
        }} transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25
        }}>
            Llegir més
            <ArrowRight size={18} />
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div className="h-1 bg-[var(--color-udg-blue)]" initial={{
      scaleX: 0
    }} whileHover={{
      scaleX: 1
    }} transition={{
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }} style={{
      transformOrigin: 'left'
    }} />
    </motion.div>;
}
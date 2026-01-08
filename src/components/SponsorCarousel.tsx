import React from 'react';
import { motion } from 'framer-motion';
export function SponsorCarousel() {
  const sponsors = [{
    name: 'AMADE',
    logo: "/logo-amade.png",
    website: '#'
  }, {
    name: 'ARTEIN',
    logo: "/logo-artein.png",
    website: '#'
  }, {
    name: 'CompoXI',
    logo: "/logo-compoxi.png",
    website: '#'
  }, {
    name: 'Enginyers Industrials de Catalunya',
    logo: "/logo-eic.png",
    website: '#'
  }, {
    name: 'UdG Escola Politècnica Superior',
    logo: "/logo-eps.png",
    website: '#'
  }, {
    name: 'ERAM',
    logo: "/logo-eram.png",
    website: '#'
  }, {
    name: 'GREFEMA',
    logo: "/logo-grefema.png",
    website: '#'
  }, {
    name: 'JBM',
    logo: "/logo-jbm.png",
    website: '#'
  }, {
    name: 'NG Brakes',
    logo: "/logo-ngBrakes.png",
    website: '#'
  }, {
    name: 'RdeRacing',
    logo: "/logo-rdeRacing.png",
    website: '#'
  }, {
    name: 'SolidWorks',
    logo: "/logo-solidWorks.png",
    website: '#'
  }, {
    name: 'Universitat de Girona',
    logo: "/logo-udg.png",
    website: '#'
  }];
  // Triple the sponsors for seamless infinite scroll
  const infiniteSponsors = [...sponsors, ...sponsors, ...sponsors];
  return <section id="sponsors" className="py-24 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-900" />

      <div className="relative z-10">
        {/* Section header */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: '-100px'
      }} transition={{
        duration: 0.6
      }} className="text-center mb-20 px-4">
          <h2 className="font-racing text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            SPONSORS
          </h2>
          <div className="w-24 h-1 bg-gradient-blue mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Gràcies als nostres patrocinadors que fan possible el projecte
          </p>
        </motion.div>

        {/* Infinite scroll carousel */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="overflow-hidden py-12">
            <motion.div className="flex gap-16 items-center" animate={{
            x: [0, -1920]
          }} transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear'
            }
          }}>
              {infiniteSponsors.map((sponsor, index) => <motion.a key={index} href={sponsor.website} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 group" whileHover={{
              scale: 1.1
            }} transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}>
                  <div className="w-64 h-32 flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm border border-zinc-800 group-hover:border-[var(--color-udg-blue)] transition-all duration-300">
                    <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </motion.a>)}
            </motion.div>
          </div>
        </div>

        {/* Second row - reverse direction */}
        <div className="relative mt-8">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden py-12">
            <motion.div className="flex gap-16 items-center" animate={{
            x: [-1920, 0]
          }} transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear'
            }
          }}>
              {infiniteSponsors.map((sponsor, index) => <motion.a key={index} href={sponsor.website} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 group" whileHover={{
              scale: 1.1
            }} transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}>
                  <div className="w-64 h-32 flex items-center justify-center p-6 bg-white/5 backdrop-blur-sm border border-zinc-800 group-hover:border-[var(--color-udg-blue)] transition-all duration-300">
                    <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </motion.a>)}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="text-center mt-20 px-4">
          <p className="text-gray-400 mb-6 text-lg">
            Vols col·laborar amb nosaltres?
          </p>
          <motion.a href="#contact" className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-[var(--color-udg-blue)] text-white font-bold text-lg uppercase tracking-wider overflow-hidden group relative" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <motion.div className="absolute inset-0 bg-[var(--color-udg-blue)]" initial={{
            scaleX: 0
          }} whileHover={{
            scaleX: 1
          }} transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }} style={{
            transformOrigin: 'left'
          }} />
            <span className="relative z-10">Contacta'ns</span>
          </motion.a>
        </motion.div>
      </div>
    </section>;
}
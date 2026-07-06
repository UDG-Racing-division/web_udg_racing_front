import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import type { Sponsor } from "../types/api";


interface SponsorCarouselProps {
  sponsors: Sponsor[];
}

export function SponsorCarousel({ sponsors }: SponsorCarouselProps) {
  const { t } = useLanguage();
  
  // Use all sponsors for the main carousel
  const mainSponsors = sponsors;

  // Triple the list for seamless infinite scroll
  const infiniteMainSponsors = [
    ...mainSponsors,
    ...mainSponsors,
    ...mainSponsors,
  ];

  return (
    <section id="sponsors" className="py-24 bg-[var(--theme-bg-page)] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--theme-bg-section), var(--theme-bg-page), var(--theme-bg-section))' }} />

      <div className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-16 px-4"
        >
          <h2 className="font-racing text-4xl sm:text-5xl md:text-6xl text-[var(--theme-text-heading)] mb-4">
            {t("sponsors.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-blue mx-auto mb-6" />
          <p className="text-[var(--theme-text-muted)] text-lg max-w-2xl mx-auto">
            {t("sponsors.description")}
          </p>
        </motion.div>

        {/* Main Sponsors Carousel */}
        {mainSponsors.length > 0 && (
          <div className="relative mb-12">
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--theme-fade-color), transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--theme-fade-color), transparent)' }} />

            <div className="overflow-hidden py-8">
              <motion.div
                className="flex gap-20 items-center"
                animate={{
                  x: [`0px`, `-${mainSponsors.length * (320 + 80)}px`],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: mainSponsors.length * 5,
                    ease: "linear",
                  },
                }}
              >
                {infiniteMainSponsors.map((sponsor, index) => (
                  <motion.a
                    key={`main-${index}`}
                    href={sponsor.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="w-80 h-48 flex items-center justify-center p-8 bg-gray-300/80 border border-gray-400/50 group-hover:border-[var(--color-udg-blue)] transition-all duration-300 rounded-xl shadow-sm">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain transition-all duration-300"
                      />
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        )}



        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.4,
          }}
          className="text-center mt-20 px-4"
        >
          <p className="text-[var(--theme-text-muted)] mb-6 text-lg">
            {t("sponsors.page")}
          </p>
          <motion.a
            href="/partners"
            className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-[var(--color-udg-blue)] text-[var(--theme-text-heading)] font-bold text-lg uppercase tracking-wider overflow-hidden group relative"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <motion.div
              className="absolute inset-0 bg-[var(--color-udg-blue)]"
              initial={{
                scaleX: 0,
              }}
              whileHover={{
                scaleX: 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin: "left",
              }}
            />
            <span className="relative z-10">{t("sponsors.clickHere")}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

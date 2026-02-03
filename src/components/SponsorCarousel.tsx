import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import type { Sponsor } from "../types/api";
import { ContactModal } from "./ContactModal";

interface SponsorCarouselProps {
  sponsors: Sponsor[];
}

export function SponsorCarousel({ sponsors }: SponsorCarouselProps) {
  const { t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  // Filter sponsors by type
  const mainSponsors = sponsors.filter((s) =>
    ["main", "principal", "premium"].includes((s.type || "").toLowerCase())
  );
  const secondarySponsors = sponsors.filter(
    (s) =>
      !["main", "principal", "premium"].includes((s.type || "").toLowerCase())
  );

  // Triple the lists for seamless infinite scroll
  const infiniteMainSponsors = [
    ...mainSponsors,
    ...mainSponsors,
    ...mainSponsors,
  ];
  const infiniteSecondarySponsors = [
    ...secondarySponsors,
    ...secondarySponsors,
    ...secondarySponsors,
  ];

  return (
    <section id="sponsors" className="py-24 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-900" />

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
          <h2 className="font-racing text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            {t("sponsors.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-blue mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("sponsors.description")}
          </p>
        </motion.div>

        {/* Main Sponsors Carousel */}
        {mainSponsors.length > 0 && (
          <div className="relative mb-12">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden py-8">
              <motion.div
                className="flex gap-20 items-center"
                animate={{
                  x: [0, -1920],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 40,
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
                    <div className="w-80 h-48 flex items-center justify-center p-8 bg-white/5 backdrop-blur-sm border border-zinc-700 group-hover:border-[var(--color-udg-blue)] transition-all duration-300 rounded-xl">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* Secondary Sponsors Carousel */}
        {secondarySponsors.length > 0 && (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden py-6">
              <motion.div
                className="flex gap-12 items-center"
                animate={{
                  x: [-1920, 0],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 35,
                    ease: "linear",
                  },
                }}
              >
                {infiniteSecondarySponsors.map((sponsor, index) => (
                  <motion.a
                    key={`secondary-${index}`}
                    href={sponsor.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="w-48 h-28 flex items-center justify-center p-5 bg-white/5 backdrop-blur-sm border border-zinc-800 group-hover:border-[var(--color-udg-blue)] transition-all duration-300 rounded-lg">
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
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
          <p className="text-gray-400 mb-6 text-lg">
            {t("sponsors.collaborate")}
          </p>
          <motion.button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-[var(--color-udg-blue)] text-white font-bold text-lg uppercase tracking-wider overflow-hidden group relative"
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
            <span className="relative z-10">{t("sponsors.contact")}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
}

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import { Three3DBackground } from "./Three3DBackground";
import type { SiteSettings } from "../types/api";

interface HeroProps {
  settings?: SiteSettings;
}

export function Hero({ settings }: HeroProps) {
  const { translate, t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scrollToContent = () => {
    const statsSection = document.getElementById("stats");
    statsSection?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <motion.section
      style={{
        opacity,
      }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Interactive Background */}
      <Three3DBackground />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, var(--theme-overlay-start), var(--theme-overlay-mid), var(--theme-overlay-end))' }} />

      {/* Content */}
      <motion.div
        style={{
          y,
        }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
        >
          <motion.h1
            className="font-racing text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[var(--theme-text-heading)] mb-6 tracking-tight"
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
          >
            <motion.span
              initial={{
                opacity: 0,
                x: -50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
            >
              {settings?.hero_title
                ? translate(settings.hero_title).split(" ")[0]
                : "UDG"}{" "}
              {settings?.hero_title
                ? translate(settings.hero_title).split(" ")[1]
                : "RACING"}
            </motion.span>
            <br />
            <motion.span
              className="text-gradient-blue inline-block"
              initial={{
                opacity: 0,
                x: 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.7,
              }}
            >
              {settings?.hero_title &&
                translate(settings.hero_title).split(" ").length > 2
                ? translate(settings.hero_title).split(" ").slice(2).join(" ")
                : "DIVISION"}
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.9,
          }}
          className="text-xl sm:text-2xl text-[var(--theme-text-body)] mb-12 max-w-2xl mx-auto"
        >
          {translate(settings?.hero_subtitle) ||
            "Per Scratch. Enginyeria i velocitat des de la Universitat de Girona."}
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 1.1,
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="#team"
            className="px-8 py-4 border-2 border-[var(--color-udg-blue)] text-[var(--theme-text-heading)] font-bold text-lg rounded-none hover:bg-[var(--color-udg-blue)] hover:text-white transition-all duration-300 uppercase tracking-wide cursor-pointer"
          >
            {t("hero.meetTeam")}
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <ChevronDown className="text-[var(--theme-text-subtle)]" size={32} />
        </motion.div>
      </motion.button>
    </motion.section>
  );
}

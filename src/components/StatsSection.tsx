import React, { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { AnimatedCounter } from "./AnimatedCounter";
import type { Stat } from "../types/api";

interface StatsSectionProps {
  stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  const { translate, t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="stats"
      ref={ref}
      className="py-32 bg-[var(--theme-bg-page)] relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-udg-blue) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={
            isInView
              ? {
                opacity: 1,
                y: 0,
              }
              : {}
          }
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-16"
        >
          <motion.h2
            className="font-racing text-4xl sm:text-5xl md:text-6xl text-[var(--theme-text-heading)] mb-4"
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={
              isInView
                ? {
                  opacity: 1,
                  scale: 1,
                }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            {t("stats.title")}
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-blue mx-auto"
            initial={{
              scaleX: 0,
            }}
            animate={
              isInView
                ? {
                  scaleX: 1,
                }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={
                isInView
                  ? {
                    opacity: 1,
                    y: 0,
                  }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <TiltCard>
                {stat.link ? (
                  <motion.a
                    href={stat.link}
                    target={stat.is_external ? "_blank" : "_self"}
                    rel={stat.is_external ? "noopener noreferrer" : undefined}
                    className="relative group cursor-pointer block"
                    whileHover={{
                      y: -5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <div className="bg-[var(--theme-bg-section)] border-2 border-[var(--theme-border)] p-8 sm:p-12 text-center group-hover:border-[var(--color-udg-blue)] transition-colors duration-300 relative overflow-hidden">
                      {/* Animated background on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[var(--color-udg-blue)]/10 to-transparent opacity-0 group-hover:opacity-100"
                        transition={{
                          duration: 0.3,
                        }}
                      />

                      <div className="relative z-10">
                        <div className="font-racing text-6xl sm:text-7xl md:text-8xl text-[var(--theme-text-heading)] mb-3 break-words">
                          <AnimatedCounter value={stat.value} />
                        </div>
                        <motion.div
                          className="text-[var(--color-udg-blue)] font-bold text-lg sm:text-2xl mb-3 flex items-center justify-center gap-2"
                          whileHover={{
                            scale: 1.1,
                          }}
                        >
                          {translate(stat.unit)}
                          {stat.is_external && (
                            <ExternalLink size={16} className="opacity-50" />
                          )}
                        </motion.div>
                        <div className="text-[var(--theme-text-muted)] uppercase tracking-widest text-sm sm:text-base">
                          {translate(stat.label)}
                        </div>
                      </div>
                    </div>

                    {/* Animated corner accent */}
                    <motion.div
                      className="absolute top-0 right-0 w-4 h-4 bg-[var(--color-udg-blue)]"
                      initial={{
                        scale: 0,
                      }}
                      whileHover={{
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                      }}
                    />
                  </motion.a>
                ) : (
                  <div className="relative block">
                    <div className="bg-[var(--theme-bg-section)] border-2 border-[var(--theme-border)] p-8 sm:p-12 text-center relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="font-racing text-6xl sm:text-7xl md:text-8xl text-[var(--theme-text-heading)] mb-3 break-words">
                          <AnimatedCounter value={stat.value} />
                        </div>
                        <div className="text-[var(--color-udg-blue)] font-bold text-lg sm:text-2xl mb-3">
                          {translate(stat.unit)}
                        </div>
                        <div className="text-[var(--theme-text-muted)] uppercase tracking-widest text-sm sm:text-base">
                          {translate(stat.label)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

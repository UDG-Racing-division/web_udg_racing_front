import React, { useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { ScrollRevealText } from "./ScrollRevealText";
import { ArrowDown } from "lucide-react";
import type { SiteSettings } from "../types/api";

interface AboutSectionProps {
  settings?: SiteSettings;
}

export function AboutSection({ settings }: AboutSectionProps) {
  const { translate, t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-100px",
  });
  return (
    <section
      id="about"
      ref={ref}
      className="py-32 bg-zinc-900 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-udg-blue) 1px, transparent 1px), linear-gradient(90deg, var(--color-udg-blue) 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
            }}
          >
            {/* Title */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
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
              className="mb-12"
            >
              <h2 className="font-racing text-5xl sm:text-6xl md:text-7xl text-white mb-6">
                {t("about.title")}
              </h2>
              <div className="w-24 h-1 bg-gradient-blue" />
            </motion.div>

            {/* Main text */}
            <div className="space-y-8 text-lg sm:text-xl leading-relaxed">
              <ScrollRevealText className="font-bold text-2xl sm:text-3xl">
                {translate(settings?.about_title) || t("about.heading")}
              </ScrollRevealText>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
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
                  delay: 0.2,
                }}
                className="text-gray"
              >
                {t("about.paragraph1")}
              </motion.p>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
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
                  delay: 0.3,
                }}
                className="text-gray"
              >
                {t("about.paragraph2")}
              </motion.p>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
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
                  delay: 0.4,
                }}
                className="text-gray"
              >
                {t("about.paragraph3")}
              </motion.p>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
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
                delay: 0.5,
              }}
              className="mt-12"
            >
              <motion.a
                href="#team"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-udg-blue)] text-white font-bold text-lg uppercase tracking-wide group"
                whileHover={{
                  x: 5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
              >
                {t("about.ctaButton")}
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <ArrowDown size={20} />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.img
                src="/inicio1.jpg"
                alt="UDG Racing Team"
                className="w-full h-full object-cover"
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.6,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <motion.div
                className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-[var(--color-udg-blue)]"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={
                  isInView
                    ? {
                        scale: 1,
                        opacity: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                }}
              />

              <motion.div
                className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-[var(--color-udg-blue)]"
                initial={{
                  scale: 0,
                  opacity: 0,
                }}
                animate={
                  isInView
                    ? {
                        scale: 1,
                        opacity: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: 0.8,
                }}
              />
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
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
                delay: 1,
              }}
              className="absolute -bottom-8 -left-8 bg-black/90 backdrop-blur-sm border border-[var(--color-udg-blue)] p-6"
            >
              <div className="flex items-center gap-6">
                <div>
                  <div className="font-racing text-4xl text-[var(--color-udg-blue)]">
                    2+
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">
                    {t("about.yearsLabel")}
                  </div>
                </div>
                <div className="w-px h-12 bg-zinc-700" />
                <div>
                  <div className="font-racing text-4xl text-[var(--color-udg-blue)]">
                    100+
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wide">
                    {t("about.membersLabel")}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

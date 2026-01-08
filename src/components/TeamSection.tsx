import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import type { SiteSettings } from "../types/api";

interface TeamSectionProps {
  settings?: SiteSettings;
}

export function TeamSection({ settings }: TeamSectionProps) {
  const { translate, t } = useLanguage();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const teamPhoto = settings?.team_photo || "/images/team/team-photo.jpg";
  const teamDescription = settings?.team_description;

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative min-h-screen bg-black py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ opacity }} className="max-w-7xl mx-auto">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-racing text-5xl md:text-7xl text-white mb-6">
              {t("team.title")}
            </h2>
            <div className="w-24 h-1 bg-[var(--color-udg-blue)] mx-auto" />
          </motion.div>

          {/* Team photo and description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Team photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <img
                src={teamPhoto}
                alt={t("team.title")}
                className="w-full h-full object-cover"
              />

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[var(--color-udg-blue)]" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[var(--color-udg-blue)]" />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            {/* Team description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="prose prose-invert max-w-none">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {teamDescription
                    ? translate(teamDescription)
                    : t("team.description")}
                </p>
              </div>

              {/* Decorative element */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="h-1 bg-gradient-to-r from-[var(--color-udg-blue)] to-transparent"
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated background particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[var(--color-udg-blue)] rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </section>
  );
}

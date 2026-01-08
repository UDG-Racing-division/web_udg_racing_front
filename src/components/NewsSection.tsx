import React, { useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import type { NewsItem } from "../types/api";
import { NewsDetailModal } from "./NewsDetailModal";

interface NewsSectionProps {
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  const { translate, t } = useLanguage();
  const sectionRef = useRef(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="news"
      ref={sectionRef}
      className="relative bg-black"
      style={{
        height: `${news.length * 100}vh`,
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-black" />

        {/* Section title - fixed */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-12 left-4 sm:left-8 lg:left-16 z-20"
        >
          <h2 className="font-racing text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            {t("news.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-blue" />
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute top-12 right-4 sm:right-8 lg:right-16 z-20 flex items-center gap-2">
          {news.map((_, index) => {
            const start = index / news.length;
            const end = (index + 1) / news.length;
            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.01, end - 0.01, end],
              [0.3, 1, 1, 0.3]
            );
            return (
              <motion.div
                key={index}
                className="w-8 h-1 bg-white"
                style={{
                  opacity,
                }}
              />
            );
          })}
        </div>

        {/* News cards stack */}
        <div className="relative w-full h-full">
          {news.map((item, index) => {
            const start = index / news.length;
            const end = (index + 1) / news.length;
            // Current card opacity and scale
            const opacity = useTransform(
              scrollYProgress,
              [start - 0.1, start, end - 0.1, end],
              [0, 1, 1, 0]
            );
            const scale = useTransform(
              scrollYProgress,
              [start - 0.1, start, end - 0.1, end],
              [0.8, 1, 1, 1.1]
            );
            const x = useTransform(
              scrollYProgress,
              [start, end - 0.1, end],
              ["0%", "0%", "-100%"]
            );
            return (
              <motion.div
                key={index}
                style={{
                  opacity,
                  scale,
                  x,
                }}
                className="absolute inset-0 flex items-center justify-center px-4 sm:px-8 lg:px-16"
              >
                <HorizontalNewsCard
                  item={item}
                  index={index}
                  translate={translate}
                  t={t}
                  onClick={() => setSelectedNews(item)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* View more button - appears at the end */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1]),
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.button
            className="group relative px-10 py-5 bg-transparent border-2 border-[var(--color-udg-blue)] text-white font-bold text-lg uppercase tracking-wider overflow-hidden"
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

            <span className="relative z-10 flex items-center gap-3">
              {t("news.loadMore")}
              <ArrowRight size={20} />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* News Detail Modal */}
      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </section>
  );
}
// Horizontal news card component
function HorizontalNewsCard({
  item,
  index,
  translate,
  t,
  onClick,
}: {
  item: any;
  index: number;
  translate: (val: any) => string;
  t: (key: string) => string;
  onClick: () => void;
}) {
  return (
    <div
      className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center cursor-pointer"
      onClick={onClick}
    >
      {/* Image side */}
      <motion.div
        initial={{
          opacity: 0,
          x: -50,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative aspect-[4/3] overflow-hidden"
      >
        <img
          src={item.image}
          alt={translate(item.title)}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[var(--color-udg-blue)]" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[var(--color-udg-blue)]" />
      </motion.div>

      {/* Content side */}
      <motion.div
        initial={{
          opacity: 0,
          x: 50,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="space-y-6"
      >
        {/* Date */}
        <div className="flex items-center gap-2 text-[var(--color-udg-blue)] font-medium">
          <Calendar size={18} />
          <span>{translate(item.date)}</span>
        </div>

        {/* Title */}
        <h3 className="font-racing text-4xl sm:text-5xl md:text-6xl text-white leading-tight">
          {translate(item.title)}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
          {translate(item.excerpt)}
        </p>

        {/* Read more link */}
        <motion.a
          href="#"
          className="inline-flex items-center gap-3 text-white font-bold text-lg group"
          whileHover={{
            x: 10,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {t("news.readMore")}
          <motion.div
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowRight size={20} className="text-[var(--color-udg-blue)]" />
          </motion.div>
        </motion.a>

        {/* Number indicator */}
        <div className="pt-8 border-t border-zinc-800">
          <span className="font-racing text-6xl text-zinc-800">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

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

  // Only show the latest news item
  const latestNews = news.length > 0 ? [news[0]] : [];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="news"
      ref={sectionRef}
      className="relative bg-[var(--theme-bg-section)]"
      style={{
        height: `${latestNews.length * 100}vh`,
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[var(--theme-bg-section)]" />

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
          <h2 className="font-racing text-4xl sm:text-5xl md:text-6xl text-[var(--theme-text-heading)] mb-4">
            {t("news.title")}
          </h2>
          <div className="w-24 h-1 bg-gradient-blue" />
        </motion.div>

        {/* "See all news" link */}
        <motion.a
          href="/news"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-14 right-4 sm:right-8 lg:right-16 z-20 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-udg-blue)] hover:text-[var(--color-udg-blue-light)] transition-colors group"
        >
          {t("news.allNews")}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
        </motion.a>

        {/* News cards stack */}
        <div className="relative w-full h-full">
          {latestNews.map((item, index) => {
            const start = index / latestNews.length;
            const end = (index + 1) / latestNews.length;
            const isLast = index === latestNews.length - 1;
            const opacity = useTransform(
              scrollYProgress,
              isLast
                ? [start - 0.1, start]
                : [start - 0.1, start, end - 0.1, end],
              isLast ? [0, 1] : [0, 1, 1, 0]
            );
            const scale = useTransform(
              scrollYProgress,
              isLast
                ? [start - 0.1, start]
                : [start - 0.1, start, end - 0.1, end],
              isLast ? [0.8, 1] : [0.8, 1, 1, 1.1]
            );
            const x = useTransform(
              scrollYProgress,
              isLast ? [start, 1] : [start, end - 0.1, end],
              isLast ? ["0%", "0%"] : ["0%", "0%", "-100%"]
            );

            const handleClick = () => {
              setSelectedNews(item);
            };

            const isFirst = index === 0;
            const pointerEvents = useTransform(
              scrollYProgress,
              isFirst
                ? [end - 0.05, end]
                : isLast
                  ? [start, start + 0.05]
                  : [start, start + 0.05, end - 0.05, end],
              isFirst
                ? ["auto", "none"]
                : isLast
                  ? ["none", "auto"]
                  : ["none", "auto", "auto", "none"]
            );

            return (
              <motion.div
                key={item.id}
                style={{
                  opacity,
                  scale,
                  x,
                  pointerEvents,
                }}
                className="absolute inset-0 flex items-start md:items-center justify-center pt-28 md:pt-0 px-4 sm:px-8 lg:px-16"
              >
                <HorizontalNewsCard
                  item={item}
                  index={index}
                  translate={translate}
                  t={t}
                  onClick={handleClick}
                />
              </motion.div>
            );
          })}
        </div>
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
      className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center cursor-pointer"
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
        className="relative overflow-hidden"
      >
        <img
          src={item.image}
          alt={translate(item.title)}
          className="w-full h-auto block"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--theme-overlay-gradient-r), transparent)' }} />

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-12 h-12 lg:w-24 lg:h-24 border-t-4 border-l-4 border-[var(--color-udg-blue)]" />
        <div className="absolute bottom-0 right-0 w-12 h-12 lg:w-24 lg:h-24 border-b-4 border-r-4 border-[var(--color-udg-blue)]" />
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
        <h3 className="font-racing text-2xl sm:text-3xl md:text-4xl text-[var(--theme-text-heading)] leading-tight">
          {translate(item.title)}
        </h3>

        {/* Excerpt */}
        <p className="text-[var(--theme-text-muted)] text-lg sm:text-xl leading-relaxed">
          {translate(item.excerpt)}
        </p>

        {/* Read more link */}
        <motion.span
          className="inline-flex items-center gap-3 text-[var(--theme-text-heading)] font-bold text-lg group cursor-pointer"
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
        </motion.span>


      </motion.div>
    </div>
  );
}

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsItem } from "../types/api";
import { NewsDetailModal } from "./NewsDetailModal";

interface NewsSectionProps {
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  const { translate, t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Only show the latest 5 news items
  const latestNews = news.slice(0, 5);
  const total = latestNews.length;

  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir);
    setCurrentIndex(index);
  }, []);

  const next = useCallback(() => {
    if (total === 0) return;
    goTo((currentIndex + 1) % total, 1);
  }, [currentIndex, total, goTo]);

  const prev = useCallback(() => {
    if (total === 0) return;
    goTo((currentIndex - 1 + total) % total, -1);
  }, [currentIndex, total, goTo]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (total <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total);
      setDirection(1);
    }, 5500);
  }, [total]);

  useEffect(() => {
    resetAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [resetAutoPlay]);

  const handlePrev = () => { prev(); resetAutoPlay(); };
  const handleNext = () => { next(); resetAutoPlay(); };
  const handleDotClick = (i: number) => {
    goTo(i, i > currentIndex ? 1 : -1);
    resetAutoPlay();
  };

  // Swipe / drag
  const onPointerDown = (x: number) => {
    dragStartX.current = x;
    isDragging.current = false;
  };
  const onPointerMove = (x: number) => {
    if (Math.abs(x - dragStartX.current) > 5) isDragging.current = true;
  };
  const onPointerUp = (x: number) => {
    const diff = dragStartX.current - x;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  if (latestNews.length === 0) return null;

  const item = latestNews[currentIndex];

  return (
    <section id="news" className="relative bg-[var(--theme-bg-section)] py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--theme-bg-page)] via-[var(--theme-bg-section)] to-[var(--theme-bg-page)] opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-racing text-4xl sm:text-5xl md:text-6xl text-[var(--theme-text-heading)] mb-3">
              {t("news.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-blue" />
          </motion.div>

          {/* "See all" — desktop only */}
          <motion.a
            href="/news"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-udg-blue)] hover:text-[var(--color-udg-blue-light)] transition-colors group"
          >
            {t("news.allNews")}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </div>

        {/* ── Carousel ── */}
        <div className="relative">
          {/* Overflow wrapper — no fixed height, card drives size */}
          <div
            className="overflow-hidden rounded-2xl shadow-2xl"
            onMouseDown={(e) => onPointerDown(e.clientX)}
            onMouseMove={(e) => onPointerMove(e.clientX)}
            onMouseUp={(e) => onPointerUp(e.clientX)}
            onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
            onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
            onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => { if (!isDragging.current) setSelectedNews(item); }}
                className="cursor-pointer select-none"
              >
                <NewsCarouselCard item={item} translate={translate} t={t} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next — positioned relative to the image area on mobile */}
          {total > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous news"
                className="absolute left-2 sm:-left-5 top-[210px] sm:top-1/2 -translate-y-1/2 z-20
                           flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full
                           bg-black/40 sm:bg-[var(--theme-bg-page)]/80 backdrop-blur
                           border border-white/20 sm:border-[var(--color-udg-blue)]/30
                           text-white sm:text-[var(--theme-text-heading)] shadow-lg
                           hover:bg-[var(--color-udg-blue)] hover:text-white
                           transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next news"
                className="absolute right-2 sm:-right-5 top-[210px] sm:top-1/2 -translate-y-1/2 z-20
                           flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full
                           bg-black/40 sm:bg-[var(--theme-bg-page)]/80 backdrop-blur
                           border border-white/20 sm:border-[var(--color-udg-blue)]/30
                           text-white sm:text-[var(--theme-text-heading)] shadow-lg
                           hover:bg-[var(--color-udg-blue)] hover:text-white
                           transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Dots + counter */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {latestNews.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`Slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "w-7 h-2 bg-[var(--color-udg-blue)]"
                    : "w-2 h-2 bg-[var(--theme-text-muted)]/30 hover:bg-[var(--theme-text-muted)]/60"
                }`}
              />
            ))}
            <span className="ml-2 text-xs text-[var(--theme-text-muted)] font-medium tabular-nums">
              {currentIndex + 1} / {total}
            </span>
          </div>
        )}

        {/* "See all" — mobile */}
        <div className="flex justify-center mt-8 sm:hidden">
          <a
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-udg-blue)]
                       text-[var(--color-udg-blue)] font-semibold text-sm rounded-lg
                       hover:bg-[var(--color-udg-blue)] hover:text-white transition-all duration-200"
          >
            {t("news.allNews")}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Modal */}
      <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />
    </section>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function NewsCarouselCard({
  item,
  translate,
  t,
}: {
  item: any;
  translate: (val: any) => string;
  t: (key: string) => string;
}) {
  return (
    <div className="w-full bg-[var(--theme-bg-page)] border border-white/5 flex flex-col md:grid md:grid-cols-2">
      {/* Image */}
      <div className="relative overflow-hidden h-[210px] sm:h-[260px] md:h-full md:min-h-[380px]">
        <img
          src={item.image}
          alt={translate(item.title)}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 md:bg-gradient-to-r md:from-transparent md:to-black/30" />
        {/* corners */}
        <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-t-[3px] border-l-[3px] border-[var(--color-udg-blue)]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-b-[3px] border-r-[3px] border-[var(--color-udg-blue)]" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-3 sm:gap-4 p-5 sm:p-8 md:p-10">
        {/* Date */}
        <div className="flex items-center gap-2 text-[var(--color-udg-blue)] font-semibold text-xs sm:text-sm">
          <Calendar size={14} />
          <span>{translate(item.date)}</span>
        </div>

        {/* Title */}
        <h3 className="font-racing text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--theme-text-heading)] leading-tight line-clamp-3">
          {translate(item.title)}
        </h3>

        {/* Excerpt */}
        <p className="text-[var(--theme-text-muted)] text-sm sm:text-base leading-relaxed line-clamp-3">
          {translate(item.excerpt)}
        </p>

        {/* Read more */}
        <span className="inline-flex items-center gap-2 text-[var(--theme-text-heading)] font-bold text-sm sm:text-base group w-fit mt-1">
          {t("news.readMore")}
          <ArrowRight
            size={16}
            className="text-[var(--color-udg-blue)] group-hover:translate-x-1 transition-transform duration-200"
          />
        </span>
      </div>
    </div>
  );
}

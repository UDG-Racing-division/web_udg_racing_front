import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { NewsItem } from "../types/api";
import { useLanguage } from "../contexts/LanguageContext";

interface NewsDetailModalProps {
  news: NewsItem | null;
  onClose: () => void;
}

export function NewsDetailModal({ news, onClose }: NewsDetailModalProps) {
  const { translate } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [news?.id]);

  if (!news) return null;

  const allImages = [
    ...(news.image ? [{ id: 0, image: news.image, order: -1 }] : []),
    ...news.images,
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--theme-bg-card)] rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-[var(--theme-bg-card)]/80 hover:bg-[var(--theme-bg-card)] rounded-full transition-colors shadow"
          >
            <X size={24} className="text-[var(--theme-text-body)]" />
          </button>

          {/* Image Gallery */}
          {allImages.length > 0 && (
            <div className="relative w-full h-96 bg-[var(--theme-bg-section)]">
              <img
                src={allImages[currentImageIndex].image}
                alt={translate(news.title)}
                className="w-full h-full object-contain"
              />

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[var(--theme-bg-card)]/80 hover:bg-[var(--theme-bg-card)] rounded-full transition-colors shadow"
                  >
                    <ChevronLeft size={24} className="text-[var(--theme-text-heading)]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[var(--theme-bg-card)]/80 hover:bg-[var(--theme-bg-card)] rounded-full transition-colors shadow"
                  >
                    <ChevronRight size={24} className="text-[var(--theme-text-heading)]" />
                  </button>

                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                            ? "bg-[var(--color-udg-blue)] w-8"
                            : "bg-white/50"
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <h2 className="font-racing text-3xl md:text-4xl text-[var(--theme-text-heading)] mb-4">
              {translate(news.title)}
            </h2>

            <p className="text-[var(--theme-text-muted)] mb-6">
              {translate(news.date)}
            </p>

            <div className="prose max-w-none">
              <p className="text-lg text-[var(--theme-text-body)] leading-relaxed whitespace-pre-wrap">
                {translate(news.content)}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

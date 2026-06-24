import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Newspaper } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { apiService } from "../services/api";
import type { NewsItem } from "../types/api";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { LoadingScreen } from "../components/LoadingScreen";
import { NewsDetailModal } from "../components/NewsDetailModal";

function NewsGrid({
  news,
  onSelect,
}: {
  news: NewsItem[];
  onSelect: (item: NewsItem) => void;
}) {
  const { translate } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <motion.button
          key={item.id}
          onClick={() => onSelect(item)}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.5,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -6 }}
          className="group text-left w-full bg-[var(--theme-bg-card)] border border-[var(--theme-border)] overflow-hidden rounded-lg hover:border-[var(--color-udg-blue)] hover:shadow-[0_20px_60px_-15px_rgba(45,74,142,0.2)] transition-all duration-400"
        >
          {/* Image */}
          <div className="relative overflow-hidden bg-[var(--theme-bg-section)]">
            {item.image ? (
              <motion.img
                src={item.image}
                alt={translate(item.title)}
                className="w-full aspect-video object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="w-full aspect-video flex items-center justify-center bg-[var(--theme-bg-section)]">
                <img
                  src="/logo_udgRacing.png"
                  alt="UDG Racing Division"
                  className="w-1/2 max-w-[160px] object-contain opacity-60"
                />
              </div>
            )}
            {/* Blue accent line on hover */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-udg-blue)]"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 text-[var(--color-udg-blue)] text-xs font-medium mb-3 uppercase tracking-wider">
              <Calendar size={13} />
              <span>{translate(item.date)}</span>
            </div>
            <h3 className="font-bold text-[var(--theme-text-heading)] text-base leading-snug group-hover:text-[var(--color-udg-blue)] transition-colors duration-300 line-clamp-2">
              {translate(item.title)}
            </h3>
            {item.excerpt && (
              <p className="text-[var(--theme-text-muted)] text-sm mt-2 leading-relaxed line-clamp-2">
                {translate(item.excerpt)}
              </p>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
}

export function NewsPage() {
  const { language, t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [homeData, newsData] = await Promise.all([
          apiService.getHomeData(language),
          apiService.getNews(language),
        ]);
        setSettings(homeData.settings);
        setNews(newsData.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);

  return (
    <>
      <LoadingScreen isLoading={loading} />
      {!loading && (
        <div className="w-full min-h-screen bg-[var(--theme-bg-page)]">
          <Navigation />

          {/* Hero */}
          <section className="relative pt-32 pb-16 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[var(--color-udg-blue)] opacity-[0.03] blur-[100px] rounded-full" />
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-udg-blue-light)] opacity-[0.03] blur-[100px] rounded-full" />
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-udg-blue) 1px, transparent 1px), linear-gradient(90deg, var(--color-udg-blue) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Back link */}
              <motion.a
                href="/"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 text-[var(--theme-text-muted)] hover:text-[var(--color-udg-blue)] transition-colors duration-300 mb-10 group"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform duration-300"
                />
                <span className="text-sm font-medium uppercase tracking-wider">
                  {t("partners.backHome")}
                </span>
              </motion.a>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-1 bg-gradient-blue mb-6"
                />
                <h1 className="font-racing text-5xl sm:text-6xl md:text-7xl text-[var(--theme-text-heading)] mb-4">
                  {t("news.title")}
                </h1>
                <p className="text-[var(--theme-text-muted)] text-lg sm:text-xl leading-relaxed max-w-2xl">
                  {t("news.description")}
                </p>
              </motion.div>

              {/* Count badge */}
              {news.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-3 mt-10"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-[var(--theme-bg-card)] border border-[var(--theme-border)] rounded-full">
                    <Newspaper size={16} className="text-[var(--color-udg-blue)]" />
                    <span className="text-sm font-medium text-[var(--theme-text-heading)]">
                      {news.length} {t("news.total")}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          {/* News Grid */}
          <section className="pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {news.length > 0 ? (
                <NewsGrid news={news} onSelect={setSelectedNews} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 text-[var(--theme-text-muted)]"
                >
                  <Newspaper size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="text-lg">{t("news.empty")}</p>
                </motion.div>
              )}
            </div>
          </section>

          <Footer settings={settings} />
        </div>
      )}

      <NewsDetailModal
        news={selectedNews}
        onClose={() => setSelectedNews(null)}
      />
    </>
  );
}

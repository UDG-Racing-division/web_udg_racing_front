import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Crown, Star, Award, Building } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { apiService } from "../services/api";
import type { HomeData, Sponsor } from "../types/api";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { LoadingScreen } from "../components/LoadingScreen";


function SponsorCard({
  sponsor,
  index,
  isMain,
}: {
  sponsor: Sponsor;
  index: number;
  isMain: boolean;
}) {
  return (
    <motion.a
      href={sponsor.website || "#"}
      target={sponsor.website ? "_blank" : undefined}
      rel={sponsor.website ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative block h-full"
    >
      {/* Card container */}
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-500 flex flex-col h-full ${
          isMain
            ? "bg-[var(--theme-bg-card)] border-[var(--color-udg-blue)]/20 shadow-lg group-hover:shadow-[0_20px_60px_-15px_rgba(45,74,142,0.25)] group-hover:border-[var(--color-udg-blue)]/60"
            : "bg-[var(--theme-bg-card)] border-[var(--theme-border)] shadow-sm group-hover:shadow-[0_15px_40px_-10px_rgba(45,74,142,0.15)] group-hover:border-[var(--color-udg-blue)]/40"
        }`}
      >
        {/* Gradient accent top */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${
            isMain
              ? "bg-gradient-to-r from-[var(--color-udg-blue-dark)] via-[var(--color-udg-blue)] to-[var(--color-udg-blue-light)] opacity-100"
              : "bg-gradient-to-r from-[var(--color-udg-blue)] to-[var(--color-udg-blue-light)] opacity-0 group-hover:opacity-100"
          }`}
        />

        {/* Main badge for premium sponsors */}
        {isMain && (
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[var(--color-udg-blue)] to-[var(--color-udg-blue-light)] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
              <Crown size={12} />
              <span>Premium</span>
            </div>
          </div>
        )}

        <div
          className={`flex items-center justify-center flex-grow ${
            isMain ? "p-10 min-h-[220px]" : "p-8 min-h-[180px]"
          }`}
        >
          <motion.img
            src={sponsor.logo}
            alt={sponsor.name}
            className={`max-w-full object-contain transition-all duration-500 ${
              isMain
                ? "max-h-40 opacity-90 group-hover:opacity-100 group-hover:scale-105"
                : "max-h-24 opacity-70 group-hover:opacity-100 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
            }`}
          />
        </div>

        {/* Info area */}
        <div className="px-6 pb-6 border-t border-[var(--theme-border)] mt-auto">
          <div className="flex items-center justify-between pt-4">
            <div>
              <h3
                className={`font-semibold text-[var(--theme-text-heading)] transition-colors duration-300 ${
                  isMain ? "text-lg" : "text-base"
                }`}
              >
                {sponsor.name}
              </h3>
              {isMain && (
                <p className="text-xs text-[var(--color-udg-blue)] font-medium mt-0.5 uppercase tracking-wider">
                  Partner Principal
                </p>
              )}
            </div>
            {sponsor.website && (
              <motion.div
                className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--theme-bg-section)] text-[var(--theme-text-muted)] group-hover:bg-[var(--color-udg-blue)] group-hover:text-white transition-all duration-300"
                whileHover={{ rotate: -45 }}
              >
                <ExternalLink size={16} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-udg-blue)]/5 to-transparent" />
        </div>
      </div>
    </motion.a>
  );
}

export function PartnersPage() {
  const { language, t } = useLanguage();
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const homeData = await apiService.getHomeData(language);
        setData(homeData);
      } catch (error) {
        console.error("Error fetching partners data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const sponsors = data?.sponsors || [];
  const levelFirstSponsors = sponsors.filter((s) => (s.type || "").toLowerCase() === "first");
  const levelSecondSponsors = sponsors.filter((s) => {
    const type = (s.type || "").toLowerCase();
    return type === "second" || (type !== "first" && type !== "third" && type !== "fourth");
  });
  const levelThirdSponsors = sponsors.filter((s) => (s.type || "").toLowerCase() === "third");
  const levelFourthSponsors = sponsors.filter((s) => (s.type || "").toLowerCase() === "fourth");

  return (
    <>
      <LoadingScreen isLoading={loading} />
      {!loading && (
        <div className="w-full min-h-screen bg-[var(--theme-bg-page)]">
          <Navigation />

          {/* Hero section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[var(--color-udg-blue)] opacity-[0.03] blur-[100px] rounded-full" />
              <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-udg-blue-light)] opacity-[0.03] blur-[100px] rounded-full" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div
                className="absolute inset-0"
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

              {/* Title block */}
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
                <h1 className="font-racing text-5xl sm:text-6xl md:text-7xl text-[var(--theme-text-heading)] mb-6">
                  {t("partners.title")}
                </h1>
                <p className="text-[var(--theme-text-muted)] text-lg sm:text-xl leading-relaxed max-w-2xl">
                  {t("partners.description")}
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-10 mt-12"
              >
                <div>
                  <span className="text-3xl font-bold text-[var(--color-udg-blue)]">
                    {sponsors.length}
                  </span>
                  <p className="text-sm text-[var(--theme-text-muted)] mt-1 uppercase tracking-wider">
                    {t("partners.totalPartners")}
                  </p>
                </div>
                {levelFirstSponsors.length > 0 && (
                  <div>
                    <span className="text-3xl font-bold text-[var(--color-udg-blue)]">
                      {levelFirstSponsors.length}
                    </span>
                    <p className="text-sm text-[var(--theme-text-muted)] mt-1 uppercase tracking-wider">
                      Premium
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Sponsor Sections */}
          {(() => {
            const renderSection = (
              sponsorsList: Sponsor[],
              titleKey: string,
              descKey: string,
              icon: React.ReactNode,
              isMain: boolean,
              bgClass: string
            ) => {
              if (sponsorsList.length === 0) return null;
              return (
                <section className={`py-16 ${bgClass}`}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="flex items-center gap-3 mb-10"
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${isMain ? 'bg-gradient-to-br from-[var(--color-udg-blue)] to-[var(--color-udg-blue-light)] text-white shadow-md' : 'bg-[var(--theme-bg-section)] border border-[var(--theme-border)] text-[var(--color-udg-blue)]'}`}>
                        {icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-[var(--theme-text-heading)]">
                          {t(titleKey)}
                        </h2>
                        <p className="text-sm text-[var(--theme-text-muted)]">
                          {t(descKey)}
                        </p>
                      </div>
                    </motion.div>

                    <div className={`grid ${isMain ? (
                      sponsorsList.length === 1 ? 'grid-cols-1 gap-8 max-w-4xl mx-auto' :
                      sponsorsList.length === 2 ? 'grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto' :
                      sponsorsList.length === 3 ? 'grid-cols-1 md:grid-cols-3 gap-8' :
                      sponsorsList.length === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8' :
                      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    ) : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'}`}>
                      {sponsorsList.map((sponsor, index) => (
                        <SponsorCard
                          key={sponsor.id}
                          sponsor={sponsor}
                          index={index}
                          isMain={isMain}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              );
            };

            return (
              <>
                {renderSection(levelFirstSponsors, "partners.levelFirst", "partners.levelFirstDesc", <Crown size={20} />, true, "bg-[var(--theme-bg-section)]")}
                {renderSection(levelSecondSponsors, "partners.levelSecond", "partners.levelSecondDesc", <Star size={20} />, false, "bg-[var(--theme-bg-page)]")}
                {renderSection(levelThirdSponsors, "partners.levelThird", "partners.levelThirdDesc", <Award size={20} />, false, "bg-[var(--theme-bg-section)]")}
                {renderSection(levelFourthSponsors, "partners.levelFourth", "partners.levelFourthDesc", <Building size={20} />, false, "bg-[var(--theme-bg-page)]")}
              </>
            );
          })()}

          {/* CTA section */}
          <section className="py-24 bg-[var(--theme-bg-section)] relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-udg-blue)] opacity-[0.03] blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-racing text-3xl sm:text-4xl md:text-5xl text-[var(--theme-text-heading)] mb-6">
                  {t("partners.ctaTitle")}
                </h2>
                <p className="text-[var(--theme-text-muted)] text-lg mb-10 max-w-xl mx-auto">
                  {t("partners.ctaDescription")}
                </p>
                <motion.a
                  href="mailto:info@udgracingdivision.cat"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-[var(--color-udg-blue)] text-[var(--theme-text-heading)] font-bold text-lg uppercase tracking-wider overflow-hidden group relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[var(--color-udg-blue)]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                  <span className="relative z-10">
                    {t("sponsors.contact")}
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </section>

          <Footer settings={data?.settings} />
        </div>
      )}
    </>
  );
}

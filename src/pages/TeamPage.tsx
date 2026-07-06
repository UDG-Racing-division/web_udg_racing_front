import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { ScrollRevealText } from "../components/ScrollRevealText";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowDown, User } from "lucide-react";
import { apiService } from "../services/api";
import type { HomeData, TeamMember } from "../types/api";

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden bg-[var(--theme-bg-section)] border border-[var(--theme-border)] group-hover:border-[var(--color-udg-blue)] transition-all duration-300">
        <div className="aspect-[3/4] overflow-hidden bg-[var(--theme-bg-section)]">
          {member.image ? (
            <motion.img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User size={64} className="text-[var(--theme-text-muted)] opacity-30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg-section)] via-transparent to-transparent" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-[var(--theme-text-heading)] text-lg leading-tight">
            {member.name}
          </h3>
          <p className="text-[var(--color-udg-blue)] text-sm font-medium mt-1 uppercase tracking-wide">
            {member.role}
          </p>
        </div>
        <motion.div
          className="absolute top-0 right-0 w-4 h-4 bg-[var(--color-udg-blue)]"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </div>
    </motion.div>
  );
}

export function TeamPage() {
  const { t, translate, language } = useLanguage();
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: false, margin: "-100px" });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        setLoading(true);
        const homeData = await apiService.getHomeData(language);
        setData(homeData);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [language]);

  const activeMembers = data?.team?.filter((m) => m.active) || [];
  const alumni = data?.team?.filter((m) => !m.active) || [];

  return (
    <div className="w-full min-h-screen bg-[var(--theme-bg-page)]">
      <Navigation />

      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-[var(--theme-bg-page)]">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-udg-blue) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 z-0">
          <img
            src="/equip.jpg"
            alt="UdG Racing Team"
            className="w-full h-full object-cover object-top opacity-20"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, var(--theme-bg-page))" }} />
        </div>

        <div className="relative z-10 text-center px-4 pt-28 pb-12">
          <motion.a
            href="/"
            className="inline-flex items-center gap-2 text-[var(--theme-text-muted)] hover:text-[var(--color-udg-blue)] transition-colors mb-10 text-sm uppercase tracking-widest"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft size={16} />
            {t("team.backHome")}
          </motion.a>

          <motion.h1
            className="font-racing text-6xl sm:text-7xl md:text-8xl text-[var(--theme-text-heading)] mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("team.pageTitle")}
          </motion.h1>

          <motion.div
            className="w-24 h-1 bg-gradient-blue mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p
            className="text-[var(--theme-text-muted)] text-xl max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t("team.pageSubtitle")}
          </motion.p>
        </div>
      </section>

      {/* QUI SOM */}
      <section
        id="about"
        ref={aboutRef}
        className="py-24 bg-[var(--theme-bg-section)] relative overflow-hidden"
      >
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
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="font-racing text-5xl sm:text-6xl md:text-7xl text-[var(--theme-text-heading)] mb-6">
                  {t("team.whoWeAre")}
                </h2>
                <div className="w-24 h-1 bg-gradient-blue" />
              </motion.div>

              <div className="space-y-8 text-lg sm:text-xl leading-relaxed">
                <ScrollRevealText className="font-bold text-2xl sm:text-3xl">
                  {translate(data?.settings?.about_title) || t("about.heading")}
                </ScrollRevealText>

                {[t("about.paragraph1"), t("about.paragraph2")].map((para, i) =>
                  para ? (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                      className="text-[var(--theme-text-body)]"
                    >
                      {para}
                    </motion.p>
                  ) : null
                )}
              </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.img
                  src="/inicio1.jpg"
                  alt="UDG Racing Team"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--theme-overlay-image), transparent, transparent)" }} />
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-[var(--color-udg-blue)]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isAboutInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-[var(--color-udg-blue)]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isAboutInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOTO DE L'EQUIP */}
      <section className="py-24 bg-[var(--theme-bg-page)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-racing text-5xl sm:text-6xl text-[var(--theme-text-heading)] mb-4">
              {t("team.current")}
            </h2>
            <div className="w-24 h-1 bg-gradient-blue mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-lg"
          >
            <img
              src="/equip.jpg"
              alt={t("team.current")}
              className="w-full h-auto object-cover"
            />
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[var(--color-udg-blue)]" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-[var(--color-udg-blue)]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--theme-overlay-image), transparent, transparent)" }} />
          </motion.div>
        </div>
      </section>

      <Footer settings={data?.settings} />
    </div>
  );
}

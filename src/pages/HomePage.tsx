import React, { useEffect, useState } from "react";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { StatsSection } from "../components/StatsSection";
import { AboutSection } from "../components/AboutSection";
import { TeamSection } from "../components/TeamSection";
import { NewsSection } from "../components/NewsSection";
import { SponsorCarousel } from "../components/SponsorCarousel";
import { Footer } from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { apiService } from "../services/api";
import type { HomeData } from "../types/api";
import { LoadingScreen } from "../components/LoadingScreen";
import { FAQSection } from "../components/FAQSection";

export function HomePage() {
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
        console.error("Error fetching home data:", error);
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
        <div className="w-full min-h-screen bg-black">
          <Navigation />
          <Hero settings={data?.settings} />
          <AboutSection settings={data?.settings} />
          <StatsSection stats={data?.stats || []} />
          <TeamSection settings={data?.settings} />
          <SponsorCarousel sponsors={data?.sponsors || []} />
          <NewsSection news={data?.news || []} />
          <FAQSection />
          <Footer settings={data?.settings} />
        </div>
      )}
    </>
  );
}

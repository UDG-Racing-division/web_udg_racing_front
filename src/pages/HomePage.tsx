import React from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { StatsSection } from '../components/StatsSection';
import { AboutSection } from '../components/AboutSection';
import { TeamSection } from '../components/TeamSection';
import { NewsSection } from '../components/NewsSection';
import { SponsorCarousel } from '../components/SponsorCarousel';
import { Footer } from '../components/Footer';
export function HomePage() {
  return <div className="w-full min-h-screen bg-black">
      <Navigation />
      <Hero />
      <StatsSection />
      <AboutSection />
      <TeamSection />
      <NewsSection />
      <SponsorCarousel />
      <Footer />
    </div>;
}
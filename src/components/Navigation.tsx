import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";


export function Navigation() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { label: t("nav.team"), href: "#team" },
    { label: t("nav.news"), href: "#news" },
    { label: t("nav.sponsors"), href: "#sponsors" },
  ];
  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-blue origin-left z-[60]"
        style={{
          scaleX,
        }}
      />

      <motion.nav
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[var(--theme-bg-nav)] backdrop-blur-md shadow-lg"
          : "bg-transparent backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{
                scale: 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
            >
              <a href="/">
                <img
                  src="/logo_udgRacing.png"
                  alt="UdG Racing Division"
                  className="h-12 w-auto"
                />
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="relative text-[var(--theme-text-heading)] font-medium group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-udg-blue)] group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <motion.a
                href="mailto:info@udgracingdivision.cat"
                className="px-4 py-2 bg-[var(--color-udg-blue)] hover:bg-[var(--color-udg-blue-light)] text-white font-medium rounded transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("nav.contact")}
              </motion.a>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[var(--theme-text-heading)] p-2"
              whileTap={{
                scale: 0.9,
              }}
            >
              <motion.div
                animate={{
                  rotate: isMobileMenuOpen ? 90 : 0,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="md:hidden bg-[var(--theme-bg-nav-mobile)] backdrop-blur-sm border-t border-[var(--theme-border)] overflow-hidden"
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-[var(--theme-text-heading)] hover:text-[var(--color-udg-blue)] transition-colors duration-200 font-medium text-lg"
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                {link.label}
              </motion.a>
            ))}

            {/* Mobile Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
              className="flex items-center gap-4 pt-4 mt-2 border-t border-[var(--theme-border)]"
            >
              <ThemeToggle />
              <LanguageSwitcher />
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}

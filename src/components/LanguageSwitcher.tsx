import React, { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLanguage, type Language } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const languages: { code: Language; name: string; flag: string }[] = [
  { code: "ca", name: "Català", flag: "cat" },
  { code: "es", name: "Español", flag: "es" },
  { code: "en", name: "English", flag: "en" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((lang) => lang.code === language);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-card)] transition-colors duration-200 border border-[var(--color-border)]"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe size={18} className="text-[var(--color-udg-blue)]" />
        <span className="text-sm font-medium">{currentLang?.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg shadow-lg overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-[var(--color-bg-tertiary)] transition-colors duration-150 ${
                  language === lang.code
                    ? "bg-[var(--color-udg-blue)]/10 text-[var(--color-udg-blue)]"
                    : "text-[var(--color-text)]"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

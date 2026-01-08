import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Import translation files
import caTranslations from "../locales/ca.json";
import esTranslations from "../locales/es.json";
import enTranslations from "../locales/en.json";

// Supported languages
export type Language = "ca" | "es" | "en";

// Translation type
type Translations = Record<string, any>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translate: (value: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translation files mapping
const translations: Record<Language, Translations> = {
  ca: caTranslations,
  es: esTranslations,
  en: enTranslations,
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get saved language from localStorage or default to Catalan
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ca";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    // Update document lang attribute for accessibility
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === "string" ? value : key;
  };

  const translate = (value: any): string => {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      // Priority: current language -> catalan -> english -> spanish
      return value[language] || value["ca"] || value["en"] || value["es"] || "";
    }
    return String(value);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

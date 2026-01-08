import React from "react";
import { HomePage } from "./pages/HomePage";
import { LanguageProvider } from "./contexts/LanguageContext";

export function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}

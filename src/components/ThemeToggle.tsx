import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--theme-bg-section)] hover:bg-[var(--theme-bg-card-hover)] transition-colors duration-200 border border-[var(--theme-border)]"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      >
        {theme === "light" ? (
          <Moon size={18} className="text-[var(--color-udg-blue)]" />
        ) : (
          <Sun size={18} className="text-[var(--color-udg-blue)]" />
        )}
      </motion.div>
    </motion.button>
  );
}

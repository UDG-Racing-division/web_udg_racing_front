import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"participate" | "sponsor">(
    "participate"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "participate",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, type: activeTab }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          type: "participate",
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative w-full max-w-2xl bg-[var(--color-bg-card)] rounded-lg shadow-2xl p-8 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
          >
            <X size={24} className="text-white" />
          </button>

          <h2 className="font-racing text-3xl text-white mb-6">
            {t("contact.title")}
          </h2>

          {/* Custom Segmented Control */}
          <div className="relative flex p-1 bg-zinc-900/50 rounded-xl border border-white/10 mb-8 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("participate")}
              className={`flex-1 relative z-10 py-3 text-sm sm:text-base font-bold uppercase tracking-wide transition-colors duration-200 ${
                activeTab === "participate" ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {t("contact.participate")}
            </button>
            <button
              onClick={() => setActiveTab("sponsor")}
              className={`flex-1 relative z-10 py-3 text-sm sm:text-base font-bold uppercase tracking-wide transition-colors duration-200 ${
                activeTab === "sponsor" ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {t("contact.sponsor")}
            </button>
            
            {/* Animated Background */}
            <div className="absolute inset-1 pointer-events-none">
              <motion.div
                layoutId="activeTabBackground"
                className="h-full bg-[var(--color-udg-blue)] rounded-lg shadow-lg"
                initial={false}
                animate={{
                  x: activeTab === "participate" ? "0%" : "100%",
                }}
                style={{ width: "50%" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t("contact.name")} *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-white focus:outline-none focus:border-[var(--color-udg-blue)] transition-colors"
                placeholder={
                  activeTab === "sponsor" ? "Company / Organization" : ""
                }
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-white focus:outline-none focus:border-[var(--color-udg-blue)] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t("contact.subject")} *
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-white focus:outline-none focus:border-[var(--color-udg-blue)] transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t("contact.message")} *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-white focus:outline-none focus:border-[var(--color-udg-blue)] transition-colors resize-none"
              />
            </div>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                {t("contact.success")}
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                {t("contact.error")}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-[var(--color-udg-blue)] hover:bg-[var(--color-udg-blue-light)] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                t("contact.sending")
              ) : (
                <>
                  <Send size={20} />
                  {t("contact.send")}
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

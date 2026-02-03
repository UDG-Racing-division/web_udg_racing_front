import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection() {
  const { t, getData } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const questions: FAQItem[] = getData("faq.questions") || [];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--color-udg-blue)] opacity-5 skew-x-12 transform translate-x-32" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-racing text-4xl sm:text-5xl text-white mb-6">
            {getData("faq.title") || t("faq.title")}
          </h2>
          <div className="w-24 h-1 bg-[var(--color-udg-blue)] mx-auto mb-6" />
          <p className="text-gray-400 text-lg">
            {getData("faq.description") || t("faq.description")}
          </p>
        </motion.div>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-zinc-800 rounded-lg bg-zinc-900/50 overflow-hidden backdrop-blur-sm"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-800/50 transition-colors"
              >
                <span className="text-white font-medium text-lg pr-8">
                  {item.question}
                </span>
                <span className="text-[var(--color-udg-blue)]">
                  {openIndex === index ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-zinc-800/50">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {questions.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No questions available.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

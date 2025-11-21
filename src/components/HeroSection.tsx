import React from 'react'
import { motion } from 'framer-motion'
import '../styles/global.css'

export function HeroSection() {
  return (
    <section className="relative py-20 flex items-center justify-center bg-gray-50">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl font-bold text-gray-900 mb-6"
        >
          Welcome to 3D Studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl text-gray-700 mb-8 font-medium"
        >
          Creating innovative digital experiences for the modern web
        </motion.p>
        <div className="inline-block">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </section>
  )
}

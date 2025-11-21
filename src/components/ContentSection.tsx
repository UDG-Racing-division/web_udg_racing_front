import React from 'react'
import { motion } from 'framer-motion'
import '../styles/global.css'
interface ContentSectionProps {
  title: string
  description: string
}
export function ContentSection({ title, description }: ContentSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
      <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  )
}
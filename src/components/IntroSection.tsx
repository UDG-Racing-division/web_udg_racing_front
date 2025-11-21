import React from 'react'
import { motion } from 'framer-motion'
import { Scene3D } from './Scene3D'
import '../styles/global.css'

export function IntroSection() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-gray-900">
            <Scene3D />
            <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10 pointer-events-none">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-white text-opacity-80 flex flex-col items-center"
                >
                    <span className="text-sm mb-2 uppercase tracking-widest">Scroll to Explore</span>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>
            </div>
        </section>
    )
}

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Users } from 'lucide-react';
export function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const teamMembers = [{
    name: 'Marc Soler',
    role: "Cap d'Equip",
    image: null,
    active: true
  }, {
    name: 'Anna Puig',
    role: 'Enginyera Mecànica',
    image: null,
    active: true
  }, {
    name: 'Jordi Mas',
    role: 'Enginyer Electrònic',
    image: null,
    active: true
  }, {
    name: 'Laura Vila',
    role: 'Dissenyadora',
    image: null,
    active: true
  }, {
    name: 'Pere Font',
    role: 'Enginyer Aerodinàmic',
    image: null,
    active: false
  }, {
    name: 'Maria Roca',
    role: 'Gestora de Projectes',
    image: null,
    active: false
  }];
  const filteredMembers = showActiveOnly ? teamMembers.filter(member => member.active) : teamMembers;
  return <section id="team" ref={ref} className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <h2 className="font-racing text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            L'EQUIP
          </h2>
          <div className="w-24 h-1 bg-gradient-blue mx-auto mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Estudiants i professionals units per la passió per la competició i
            la innovació
          </p>
        </motion.div>

        {/* Filter toggle */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="flex justify-center mb-12">
          <div className="inline-flex bg-zinc-900 border border-zinc-800 p-1">
            <button onClick={() => setShowActiveOnly(true)} className={`px-6 py-3 font-medium transition-all duration-300 ${showActiveOnly ? 'bg-[var(--color-udg-blue)] text-white' : 'text-gray-400 hover:text-white'}`}>
              ✓ Equip Directiu
            </button>
            <button onClick={() => setShowActiveOnly(false)} className={`px-6 py-3 font-medium transition-all duration-300 ${!showActiveOnly ? 'bg-[var(--color-udg-blue)] text-white' : 'text-gray-400 hover:text-white'}`}>
              Tot l'equip
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member, index) => <motion.div key={member.name} initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: index * 0.1
        }} className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-[var(--color-udg-blue)] transition-all duration-300">
              {/* Image placeholder */}
              <div className="aspect-[3/4] bg-zinc-800 flex items-center justify-center">
                <Users className="text-zinc-700 group-hover:text-[var(--color-udg-blue)] transition-colors duration-300" size={64} />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-[var(--color-udg-blue)] font-medium">
                  {member.role}
                </p>
                {!member.active && <span className="inline-block mt-2 text-xs text-gray-500 uppercase tracking-wide">
                    Alumni
                  </span>}
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-udg-blue)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>)}
        </div>
      </div>
    </section>;
}
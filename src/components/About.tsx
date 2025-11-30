import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { AboutFeatures } from './AboutFeatures';
import { AboutProcess } from './AboutProcess';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id={SectionId.ABOUT} ref={sectionRef} className="pt-32 md:pt-32 pb-12 md:pb-20 bg-[#020617] relative overflow-hidden">
      {/* Subtle neutral background texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

      <div className="w-full px-6 md:px-12 relative z-10">

        {/* Top banner: visual intro for About */}



        {/* Inner panel: subtle slate above band */}
        <div className="bg-[#0b1220] border border-white/10 rounded-3xl px-6 md:px-10 lg:px-12 py-10 md:py-14">

          {/* Header with Decorative Border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 relative"
          >
            {/* Decorative Corner Accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-elastic-accent"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-elastic-highlight"></div>

            <div className="text-center mx-auto max-w-4xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-10 bg-gradient-to-r from-transparent via-elastic-accent to-transparent"></span>
                <span className="text-elastic-accent font-mono text-xs uppercase tracking-[0.2em]">Capabilities</span>
                <span className="h-px w-10 bg-gradient-to-r from-transparent via-elastic-accent to-transparent"></span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                Engineering The <span className="text-gradient">Intangible</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                We sit at the intersection of heavy industry and delicate art.
                Using advanced production pipelines, we translate vector data into tactile, high-fidelity physical goods.
              </p>
            </div>
          </motion.div>

          {/* Feature Cards Grid - Using New Component */}
          <AboutFeatures />

        </div>
      </div>

      {/* Separator between main panel and secondary section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex items-center gap-4 text-xs text-zinc-500"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <span className="font-mono tracking-[0.25em] uppercase text-zinc-500">Process</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </motion.div>

      {/* Secondary About section: process + interaction - Using New Component */}
      <AboutProcess />

      {/* Tertiary band: partners / use-cases */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 md:px-12 pt-4 pb-10"
      >
        <div className="rounded-3xl border border-white/5 bg-black/40 px-5 md:px-8 py-6 md:py-7 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8">
          <div className="space-y-2 flex-1">
            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Built for real-world abuse</h3>
            <p className="text-zinc-300 text-sm md:text-[15px] leading-relaxed max-w-xl">
              Our parts live on rucks, medical kits, shop floors, and streetwear drops. Each vertical has its own thermal,
              chemical, and cosmetic demands—we design for all of them from day one.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 text-[11px] md:text-xs font-mono uppercase tracking-[0.18em] text-zinc-200">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Outdoor / Tactical</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Medical Devices</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Industrial OEM</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Apparel & Fashion</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

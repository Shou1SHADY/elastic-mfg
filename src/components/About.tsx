import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionId } from '../types';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Material Science",
    description: "Engineered Soft PVC & Silicone blends tested for extreme durability, UV resistance, and color fidelity.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
  },
  {
    title: "Micro-Precision",
    description: "5-Axis CNC milling creates aluminum molds with 0.05mm tolerance for razor-sharp detailing.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
  },
  {
    title: "Global Logistics",
    description: "Automated fulfillment pipelines shipping 500k+ units monthly with real-time tracking.",
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  }
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(sectionRef.current.querySelectorAll('.feature-card'),
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      }
    );
  }, []);

  return (
    <section id={SectionId.ABOUT} ref={sectionRef} className="py-16 md:py-20 bg-[#020617] relative overflow-hidden">
      {/* Subtle neutral background texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Top banner: visual intro for About */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10 md:mb-12 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#020617] via-[#030b1a] to-[#020617]"
        >
          <div className="relative px-6 md:px-10 lg:px-12 py-8 md:py-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
            <div className="flex-1 space-y-3 md:space-y-4">
              <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-elastic-accent/80">
                <span className="h-px w-10 bg-gradient-to-r from-elastic-accent to-transparent" />
                <span>About Elastic MFG</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Design partners for modern physical brands.
              </h1>
              <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
                We help studios and teams turn vector artwork into production-ready rubber systems—without sacrificing
                fidelity, durability, or delivery windows.
              </p>
            </div>

            <div className="w-full md:w-56 lg:w-64 flex md:justify-end">
              <div className="relative w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-4 overflow-hidden">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-elastic-accent/10 blur-2xl" />
                <div className="relative z-10 space-y-2 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.2em] text-zinc-500">Programs</span>
                    <span className="text-sm font-semibold text-white">12 active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[0.2em] text-zinc-500">Regions</span>
                    <span className="text-sm font-semibold text-white">3 hubs</span>
                  </div>
                  <div className="mt-2 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-elastic-accent to-elastic-secondary" />
                  </div>
                  <p className="text-[10px] text-zinc-500">
                    Always-on production lanes tuned for small to mid-size runs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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

          <div className="border-l-2 border-elastic-accent/30 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gradient-to-r from-elastic-accent to-transparent"></span>
              <span className="text-elastic-accent font-mono text-xs uppercase tracking-[0.2em]">Capabilities</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              Engineering The <span className="text-gradient">Intangible</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
              We sit at the intersection of heavy industry and delicate art.
              Using advanced production pipelines, we translate vector data into tactile, high-fidelity physical goods.
            </p>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className={`feature-card group relative p-8 rounded-2xl
                    bg-[#020617] border border-white/15
                    transition-all duration-500 ease-out
                    hover:-translate-y-2 hover:scale-[1.02]
                    hover:bg-[#040a1a] hover:border-elastic-accent/60 hover:shadow-[0_26px_70px_rgba(0,0,0,0.9)]`}
              whileHover={{ y: -8 }}
            >
              {/* Icon with unique background per card */}
              <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 
                    group-hover:scale-110 transition-all duration-500
                    ${idx === 0 ? 'bg-elastic-accent/10 border border-elastic-accent/30 group-hover:border-elastic-accent group-hover:shadow-glow' : ''}
                    ${idx === 1 ? 'bg-elastic-secondary/10 border border-elastic-secondary/30 group-hover:border-elastic-secondary group-hover:shadow-glow-purple' : ''}
                    ${idx === 2 ? 'bg-elastic-highlight/10 border border-elastic-highlight/30 group-hover:border-elastic-highlight group-hover:shadow-glow-mint' : ''}`}>
                <div className={`${idx === 0 ? 'text-elastic-accent' : idx === 1 ? 'text-elastic-secondary' : 'text-elastic-highlight'}`}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl text-white font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                {feature.description}
              </p>

                {/* Unique Hover Glow per card */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none
                      ${idx === 0 ? 'bg-gradient-to-br from-elastic-accent/5 via-transparent to-transparent' : ''}
                      ${idx === 1 ? 'bg-gradient-to-br from-elastic-secondary/5 via-transparent to-transparent' : ''}
                      ${idx === 2 ? 'bg-gradient-to-br from-elastic-highlight/5 via-transparent to-transparent' : ''}`}></div>
              </motion.div>
            ))}
          </div>

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

      {/* Secondary About section: process + interaction */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-2 pb-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr,2fr] gap-10 items-start"
        >
          {/* Left: short narrative */}
          <div className="space-y-5">
            <h3 className="text-sm font-mono tracking-[0.25em] uppercase text-elastic-accent/80">
              Engagement Model
            </h3>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              From the first sketch to the last unit off the line, we keep a single thread of ownership. Your team gets
              one point of contact, one source of truth, and a transparent window into sampling, approvals, and live
              production.
            </p>
            <p className="text-zinc-500 text-xs md:text-[13px] leading-relaxed">
              We intentionally limit active programs so that engineering, design, and logistics can all sit at the same
              table—physically or virtually—when tradeoffs need to be made.
            </p>
          </div>

          {/* Right: interactive steps */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                label: '01',
                title: 'Discover',
                body: 'We audit your current parts, usage environments, and tolerances to define what “success” actually means.',
              },
              {
                label: '02',
                title: 'Prototype',
                body: 'Rapid iterations on tooling, colors, and hardness with small test batches and clear feedback loops.',
              },
              {
                label: '03',
                title: 'Scale',
                body: 'Lock specs, then ramp into reliable monthly volumes with live tracking and QC reporting.',
              },
            ].map((step, index) => (
              <motion.button
                key={step.label}
                type="button"
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative h-full rounded-2xl border border-white/10 bg-black/40 px-4 py-5 text-left overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-elastic-accent/10 via-transparent to-elastic-secondary/10" />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
                    <span>{step.label}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-elastic-accent group-hover:shadow-glow" />
                  </div>
                  <h4 className="text-sm md:text-base font-semibold text-white">{step.title}</h4>
                  <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed">
                    {step.body}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-elastic-accent transition-all duration-500" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

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

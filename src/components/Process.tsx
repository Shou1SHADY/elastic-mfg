import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionId } from '../types';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: '01', title: 'CAD Optimization', desc: 'Vector layer separation & structural integrity verification.' },
  { id: '02', title: 'CNC Milling', desc: '7075 Aluminum Mold Carving with high-speed tooling.' },
  { id: '03', title: 'Pigment Mix', desc: 'Pantone® PMS Color Matching & chemical prep.' },
  { id: '04', title: 'Injection', desc: 'Robotic Liquid PVC Dispensing.' },
  { id: '05', title: 'Thermal Cure', desc: '180°C Baking Process & rapid cooling cycles.' },
  { id: '06', title: 'QC Inspect', desc: 'Optical verification & manual finishing.' }
];

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.process-card');
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, x: -30, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.6,
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" }
        }
      );
    });
  }, []);

  return (
    <section id={SectionId.PROCESS} ref={containerRef} className="pt-10 md:pt-14 pb-16 md:pb-20 bg-elastic-darker relative overflow-hidden border-y border-white/5">
      {/* Diagonal Accent Line */}
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-elastic-secondary via-elastic-accent to-elastic-highlight opacity-20"></div>

      {/* Subtle grid only, remove large blue gradient band */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header with Top Border Accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 relative"
        >
          {/* Top accent bar */}
          <div className="absolute -top-4 left-0 w-24 h-1 bg-gradient-to-r from-elastic-secondary to-transparent"></div>

          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-gradient-to-r from-elastic-accent to-transparent"></span>
            <span className="text-elastic-accent font-mono text-xs uppercase tracking-[0.2em]">Protocol</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Six-Step <span className="text-gradient">Precision</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl">
            From CAD to your hands. Our automated pipeline ensures consistency, speed, and quality at scale.
          </p>
        </motion.div>

        {/* Process Cards with Alternating Styles */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`process-card group relative p-6 md:p-8 rounded-2xl
                    transition-all duration-500
                    hover:-translate-x-2
                    ${index % 2 === 0
                  ? 'card-glass border-l-2 border-elastic-secondary/50 hover:border-elastic-secondary hover:shadow-glow-purple'
                  : 'bg-gradient-to-r from-elastic-panel to-transparent border border-white/5 hover:border-elastic-accent/50 hover:shadow-glow'}`}
              whileHover={{ x: -8, scale: 1.01 }}
            >
              <div className="flex items-start gap-6">
                {/* Number Badge with Gradient Border */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-xl relative flex items-center justify-center
                      ${index % 2 === 0
                    ? 'bg-elastic-secondary/10 border-2 border-elastic-secondary/30 group-hover:border-elastic-secondary'
                    : 'bg-elastic-accent/10 border-2 border-elastic-accent/30 group-hover:border-elastic-accent'}`}>
                  <span className="text-2xl font-bold text-gradient relative z-10">{step.id}</span>
                  {/* Pulsing glow on hover */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        ${index % 2 === 0 ? 'bg-elastic-secondary/20' : 'bg-elastic-accent/20'} blur-md`}></div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base group-hover:text-zinc-300 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>

                {/* Step Indicator Line */}
                <div className={`hidden md:block w-1 h-full absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      ${index % 2 === 0 ? 'bg-gradient-to-b from-elastic-secondary to-transparent' : 'bg-gradient-to-b from-elastic-accent to-transparent'}`}></div>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none
                    ${index % 2 === 0
                  ? 'bg-gradient-to-r from-elastic-secondary/10 to-transparent'
                  : 'bg-gradient-to-r from-elastic-accent/10 to-transparent'}`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

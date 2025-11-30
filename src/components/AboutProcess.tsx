import React from 'react';
import { motion } from 'framer-motion';

export const AboutProcess: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-2 pb-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
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

                {/* Right: interactive steps with images */}
                <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                    {[
                        {
                            label: '01',
                            title: 'Discover',
                            body: 'We audit your current parts, usage environments, and tolerances to define what "success" actually means.',
                            gradient: 'from-elastic-accent/20 via-elastic-accent/10 to-transparent',
                            color: 'elastic-accent',
                            icon: (
                                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                                    <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                                    <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                                    <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="2" opacity="0.8" />
                                    <path d="M100 40 L100 160 M40 100 L160 100" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
                                    <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.9" />
                                </svg>
                            )
                        },
                        {
                            label: '02',
                            title: 'Prototype',
                            body: 'Rapid iterations on tooling, colors, and hardness with small test batches and clear feedback loops.',
                            gradient: 'from-elastic-secondary/20 via-elastic-secondary/10 to-transparent',
                            color: 'elastic-secondary',
                            icon: (
                                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                                    <rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="2" opacity="0.3" rx="10" />
                                    <rect x="70" y="70" width="60" height="60" stroke="currentColor" strokeWidth="2" opacity="0.5" rx="8" />
                                    <path d="M90 90 L110 110 M110 90 L90 110" stroke="currentColor" strokeWidth="2" opacity="0.7" />
                                    <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.8" />
                                    <circle cx="140" cy="60" r="4" fill="currentColor" opacity="0.8" />
                                    <circle cx="60" cy="140" r="4" fill="currentColor" opacity="0.8" />
                                    <circle cx="140" cy="140" r="4" fill="currentColor" opacity="0.8" />
                                </svg>
                            )
                        },
                        {
                            label: '03',
                            title: 'Scale',
                            body: 'Lock specs, then ramp into reliable monthly volumes with live tracking and QC reporting.',
                            gradient: 'from-elastic-highlight/20 via-elastic-highlight/10 to-transparent',
                            color: 'elastic-highlight',
                            icon: (
                                <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
                                    <path d="M40 160 L60 120 L80 140 L100 100 L120 120 L140 80 L160 100" stroke="currentColor" strokeWidth="2.5" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="60" cy="120" r="5" fill="currentColor" opacity="0.8" />
                                    <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.8" />
                                    <circle cx="140" cy="80" r="5" fill="currentColor" opacity="0.8" />
                                    <rect x="30" y="40" width="20" height="120" fill="currentColor" opacity="0.1" />
                                    <rect x="60" y="60" width="20" height="100" fill="currentColor" opacity="0.15" />
                                    <rect x="90" y="80" width="20" height="80" fill="currentColor" opacity="0.2" />
                                    <rect x="120" y="50" width="20" height="110" fill="currentColor" opacity="0.15" />
                                    <rect x="150" y="70" width="20" height="90" fill="currentColor" opacity="0.1" />
                                </svg>
                            )
                        },
                    ].map((step, idx) => (
                        <motion.div
                            key={step.label}
                            initial={{ opacity: 0, y: 40, rotateX: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true, amount: 0.05 }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.23, 1, 0.32, 1] }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative h-full rounded-3xl border border-white/10 bg-black/40 overflow-hidden cursor-pointer"
                        >
                            {/* Image/Icon Section */}
                            <div className={`relative h-32 bg-gradient-to-br ${step.gradient} overflow-hidden`}>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />
                                <div className={`absolute inset-0 flex items-center justify-center text-${step.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}>
                                    {step.icon}
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/5 blur-xl" />
                                <div className="absolute bottom-2 left-2 w-20 h-20 rounded-full bg-white/3 blur-2xl" />
                            </div>

                            {/* Content Section */}
                            <div className="relative z-10 px-4 py-4 space-y-2.5">
                                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
                                    <span>{step.label}</span>
                                    <span className={`w-1.5 h-1.5 rounded-full bg-${step.color} group-hover:shadow-glow`} />
                                </div>
                                <h4 className="text-sm font-semibold text-white group-hover:text-gradient transition-all duration-300">{step.title}</h4>
                                <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                                    {step.body}
                                </p>
                            </div>

                            {/* Bottom accent line */}
                            <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-${step.color} transition-all duration-500`} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

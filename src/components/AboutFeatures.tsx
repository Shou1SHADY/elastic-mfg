import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

export const AboutFeatures: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Enhanced staggered animation with 3D transforms
        gsap.fromTo(sectionRef.current.querySelectorAll('.feature-card'),
            { y: 80, opacity: 0, scale: 0.85, rotateX: 15 },
            {
                y: 0, opacity: 1, scale: 1, rotateX: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Parallax effect on feature icons
        gsap.to(sectionRef.current.querySelectorAll('.feature-icon'),
            {
                y: -20,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );
    }, []);

    return (
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
                <motion.div
                    key={idx}
                    className={`feature-card group relative rounded-3xl overflow-hidden
                bg-[#020617] border border-white/15
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:scale-[1.02]
                hover:bg-[#040a1a] hover:border-elastic-accent/60 hover:shadow-[0_26px_70px_rgba(0,0,0,0.9)]`}
                    whileHover={{ y: -8 }}
                >
                    {/* Visual Background Section */}
                    <div className={`relative h-32 overflow-hidden
                ${idx === 0 ? 'bg-gradient-to-br from-elastic-accent/20 via-elastic-accent/10 to-transparent' : ''}
                ${idx === 1 ? 'bg-gradient-to-br from-elastic-secondary/20 via-elastic-secondary/10 to-transparent' : ''}
                ${idx === 2 ? 'bg-gradient-to-br from-elastic-highlight/20 via-elastic-highlight/10 to-transparent' : ''}`}>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />
                        {/* Decorative grid pattern */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
                        {/* Floating orbs */}
                        <div className={`absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl
                  ${idx === 0 ? 'bg-elastic-accent/20' : ''}
                  ${idx === 1 ? 'bg-elastic-secondary/20' : ''}
                  ${idx === 2 ? 'bg-elastic-highlight/20' : ''}`} />
                        <div className={`absolute bottom-2 left-2 w-16 h-16 rounded-full blur-xl
                  ${idx === 0 ? 'bg-elastic-accent/10' : ''}
                  ${idx === 1 ? 'bg-elastic-secondary/10' : ''}
                  ${idx === 2 ? 'bg-elastic-highlight/10' : ''}`} />
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        {/* Icon with unique background per card */}
                        <div className={`feature-icon relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
                  group-hover:scale-110 transition-all duration-500
                  ${idx === 0 ? 'bg-elastic-accent/10 border border-elastic-accent/30 group-hover:border-elastic-accent group-hover:shadow-glow' : ''}
                  ${idx === 1 ? 'bg-elastic-secondary/10 border border-elastic-secondary/30 group-hover:border-elastic-secondary group-hover:shadow-glow-purple' : ''}
                  ${idx === 2 ? 'bg-elastic-highlight/10 border border-elastic-highlight/30 group-hover:border-elastic-highlight group-hover:shadow-glow-mint' : ''}`}>
                            <div className={`${idx === 0 ? 'text-elastic-accent' : idx === 1 ? 'text-elastic-secondary' : 'text-elastic-highlight'}`}>
                                {feature.icon}
                            </div>
                        </div>

                        {/* Text Content */}
                        <h3 className="text-xl text-white font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                            {feature.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                            {feature.description}
                        </p>
                    </div>

                    {/* Unique Hover Glow per card */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none
                ${idx === 0 ? 'bg-gradient-to-br from-elastic-accent/5 via-transparent to-transparent' : ''}
                ${idx === 1 ? 'bg-gradient-to-br from-elastic-secondary/5 via-transparent to-transparent' : ''}
                ${idx === 2 ? 'bg-gradient-to-br from-elastic-highlight/5 via-transparent to-transparent' : ''}`}></div>
                </motion.div>
            ))}
        </div>
    );
};

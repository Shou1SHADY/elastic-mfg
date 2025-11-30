import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { Atom, Scale, Globe } from 'lucide-react';

const features = [
    {
        title: "Material Science",
        description: "Engineered Soft PVC & Silicone blends tested for extreme durability, UV resistance, and color fidelity.",
        icon: Atom
    },
    {
        title: "Micro-Precision",
        description: "5-Axis CNC milling creates aluminum molds with 0.05mm tolerance for razor-sharp detailing.",
        icon: Scale
    },
    {
        title: "Global Logistics",
        description: "Automated fulfillment pipelines shipping 500k+ units monthly with real-time tracking.",
        icon: Globe
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
                    <div className={`relative h-40 overflow-hidden flex items-center justify-center
                ${idx === 0 ? 'bg-gradient-to-br from-elastic-accent/20 via-elastic-accent/5 to-transparent' : ''}
                ${idx === 1 ? 'bg-gradient-to-br from-elastic-secondary/20 via-elastic-secondary/5 to-transparent' : ''}
                ${idx === 2 ? 'bg-gradient-to-br from-elastic-highlight/20 via-elastic-highlight/5 to-transparent' : ''}`}>

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />
                        {/* Decorative grid pattern */}
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />

                        {/* Large Icon in Header */}
                        <div className={`feature-icon relative w-20 h-20 rounded-2xl flex items-center justify-center
                            transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3
                            ${idx === 0 ? 'text-elastic-accent bg-elastic-accent/10' : ''}
                            ${idx === 1 ? 'text-elastic-secondary bg-elastic-secondary/10' : ''}
                            ${idx === 2 ? 'text-elastic-highlight bg-elastic-highlight/10' : ''}
                        `}>
                            <feature.icon strokeWidth={1.5} className="w-10 h-10" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 pt-6 text-center">

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

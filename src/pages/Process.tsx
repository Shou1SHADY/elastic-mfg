import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Process as ProcessComponent } from '../components/Process';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Process: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Banner animation with 3D effect
            const banner = containerRef.current?.querySelector('.process-banner');
            if (banner) {
                gsap.fromTo(banner,
                    {
                        opacity: 0,
                        y: 80,
                        rotationX: 15,
                        scale: 0.8
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotationX: 0,
                        scale: 1,
                        duration: 1.5,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: banner,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Process steps staggered animation
            const processSteps = containerRef.current?.querySelectorAll('.process-step');

            processSteps?.forEach((step, index) => {
                // Create different entrance animations for each step
                const directions = [
                    { x: -100, rotation: -5 },
                    { x: 100, rotation: 5 },
                    { x: -80, rotation: -3 },
                    { x: 80, rotation: 3 },
                    { x: -60, rotation: -2 },
                    { x: 60, rotation: 2 }
                ];

                const dir = directions[index % directions.length];

                gsap.fromTo(step,
                    {
                        opacity: 0,
                        x: dir.x,
                        y: 60,
                        rotation: dir.rotation,
                        scale: 0.85
                    },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotation: 0,
                        scale: 1,
                        duration: 1.2,
                        delay: index * 0.2,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: step,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Parallax effect for process steps
            processSteps?.forEach((step, index) => {
                gsap.to(step, {
                    y: -30 - (index * 10),
                    ease: "none",
                    scrollTrigger: {
                        trigger: step,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1 + (index * 0.2)
                    }
                });
            });

            // Number animations
            const stepNumbers = containerRef.current?.querySelectorAll('.step-number');

            if (stepNumbers && stepNumbers.length > 0) {
                gsap.fromTo(stepNumbers,
                    {
                        opacity: 0,
                        scale: 0,
                        rotation: 180
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "back.out(1.5)",
                        scrollTrigger: {
                            trigger: stepNumbers[0],
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            // Connecting lines animation
            const connectingLines = containerRef.current?.querySelectorAll('.connecting-line');

            connectingLines?.forEach((line, index) => {
                gsap.fromTo(line,
                    {
                        scaleX: 0,
                        opacity: 0
                    },
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.3 + (index * 0.1),
                        ease: "power2.out",
                        transformOrigin: "left center",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 90%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, containerRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className=""
        >
            <ProcessComponent />
        </motion.div>
    );
};

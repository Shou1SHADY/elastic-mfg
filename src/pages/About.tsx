import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { About as AboutComponent } from '../components/About';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Fade in sections on scroll
        const sections = containerRef.current.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            gsap.fromTo(section,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    delay: index * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Parallax effect for cards
        const cards = containerRef.current.querySelectorAll('.about-card');
        
        cards.forEach((card) => {
            gsap.to(card, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        // Staggered text reveal
        const textElements = containerRef.current.querySelectorAll('.reveal-text');
        
        gsap.fromTo(textElements,
            {
                opacity: 0,
                y: 30,
                rotationX: -10
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: textElements[0],
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-20"
        >
            <AboutComponent />
        </motion.div>
    );
};

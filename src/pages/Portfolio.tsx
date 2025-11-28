import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Portfolio as PortfolioComponent } from '../components/Portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Portfolio: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Staggered portfolio items animation
        const portfolioItems = containerRef.current.querySelectorAll('.portfolio-item');
        
        gsap.fromTo(portfolioItems,
            {
                opacity: 0,
                y: 60,
                rotationY: -15,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                rotationY: 0,
                scale: 1,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: portfolioItems[0],
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Parallax effect for showcase section
        const showcaseSection = containerRef.current.querySelector('.showcase-section');
        if (showcaseSection) {
            gsap.to(showcaseSection, {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: showcaseSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }

        // Filter tabs animation
        const filterTabs = containerRef.current.querySelectorAll('.filter-tab');
        
        filterTabs.forEach((tab, index) => {
            gsap.fromTo(tab,
                {
                    opacity: 0,
                    x: -30,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: tab,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Header reveal animation
        const header = containerRef.current.querySelector('.portfolio-header');
        if (header) {
            gsap.fromTo(header,
                {
                    opacity: 0,
                    y: -40,
                    skewY: 2
                },
                {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: header,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

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
            <PortfolioComponent />
        </motion.div>
    );
};

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Contact as ContactComponent } from '../components/Contact';
import TerminalGrid from '../components/TerminalGrid';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Contact form animation with 3D perspective
        const contactForm = containerRef.current.querySelector('.contact-form');
        if (contactForm) {
            gsap.fromTo(contactForm,
                {
                    opacity: 0,
                    y: 100,
                    rotationX: 10,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    scale: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contactForm,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Contact info cards with staggered entrance
        const infoCards = containerRef.current.querySelectorAll('.info-card');

        infoCards.forEach((card, index) => {
            const directions = [
                { x: -80, y: 40, rotation: -8 },
                { x: 0, y: 60, rotation: 0 },
                { x: 80, y: 40, rotation: 8 }
            ];

            const dir = directions[index % directions.length];

            gsap.fromTo(card,
                {
                    opacity: 0,
                    x: dir.x,
                    y: dir.y,
                    rotation: dir.rotation,
                    scale: 0.7
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    duration: 1,
                    delay: index * 0.2,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Form fields animation
        const formFields = containerRef.current.querySelectorAll('.form-field');

        formFields.forEach((field, index) => {
            gsap.fromTo(field,
                {
                    opacity: 0,
                    x: -50,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: 0.3 + (index * 0.1),
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: field,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Social links animation
        const socialLinks = containerRef.current.querySelectorAll('.social-link');

        socialLinks.forEach((link, index) => {
            gsap.fromTo(link,
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
                    delay: 0.5 + (index * 0.1),
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: link,
                        start: "top 95%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Header text animation
        const headerText = containerRef.current.querySelector('.contact-header');
        if (headerText) {
            gsap.fromTo(headerText,
                {
                    opacity: 0,
                    y: -60,
                    skewY: 3,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: headerText,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Parallax effect for background elements
        const bgElements = containerRef.current.querySelectorAll('.bg-element');

        bgElements.forEach((element, index) => {
            gsap.to(element, {
                y: -50 - (index * 20),
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });
        });

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
            className="pt-4 relative min-h-screen"
        >
            {/* Terminal Grid Background */}
            <TerminalGrid
                height="100%"
                accentColors={["#00e5ff"]}
                density={0}
                className="fixed top-0 left-0 w-full h-full"
            />

            {/* Contact Content */}
            <div className="relative z-10">
                <ContactComponent />
            </div>
        </motion.div>
    );
};

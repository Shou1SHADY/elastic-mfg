import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Preload key frames/images
        const imagesToPreload = [
            "/images/keychain4.jpg",
            "/images/collection.jpg",
            "/images/collection2.jpg",
            "/logo.png"
        ];

        imagesToPreload.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        // Prevent scrolling while splash screen is visible
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Total duration: 2.5s (2500ms)
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                // Restore scrolling after splash completes
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                onComplete();
            }, 800);
        }, 2500);

        return () => {
            clearTimeout(timer);
            // Restore scrolling in case of unmount
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden font-mono"
                >
                    {/* Noise + Scanline Overlay */}
                    <div className="absolute inset-0 pointer-events-none noise-layer"></div>
                    <div className="absolute inset-0 pointer-events-none scanline-layer"></div>

                    {/* Center Content */}
                    <div className="relative flex flex-col items-center w-full max-w-md px-4">

                        {/* Logo flicker */}
                        <motion.img
                            src="/logo.png"
                            alt="Elastic MFG"
                            className="w-32 md:w-44 mb-8 object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.35)]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: [0, 0.4, 1, 0.8, 1],
                                scale: [0.8, 1.05, 1],
                                filter: [
                                    "brightness(0.4)",
                                    "brightness(1.4)",
                                    "brightness(1)"
                                ]
                            }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut",
                                times: [0, 0.2, 0.7, 0.8, 1]
                            }}
                            // @ts-ignore - fetchPriority is valid but not in all React types yet
                            fetchPriority="high"
                        />

                        {/* Text Reveal - Smooth Fade Up */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                duration: 1.2,
                                delay: 0.2,
                                ease: "easeOut"
                            }}
                            className="text-white text-xl md:text-3xl font-bold tracking-[0.25em] uppercase text-center relative"
                        >
                            <span className="relative z-10">Precision Manufacturing</span>
                        </motion.h1>

                        {/* Decorative Scan Line (Abstract, not a loading bar) */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                            transition={{
                                duration: 2,
                                delay: 0.5,
                                ease: "easeInOut"
                            }}
                            className="mt-8 h-[1px] w-32 bg-gradient-to-r from-transparent via-white to-transparent"
                        />

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

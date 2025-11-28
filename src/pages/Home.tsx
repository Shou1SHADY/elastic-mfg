import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { VideoHighlight } from '../components/VideoHighlight';
import { Showcase } from '../components/Showcase';
import { ScrollVelocityContainer, ScrollVelocityRow } from '../components/ui/scroll-based-velocity';

export const Home: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero should be fullscreen, ignore main padding */}
            <div className="-mt-28">
                <Hero />
            </div>
            
            {/* Scroll Velocity Section */}
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-20 bg-elastic-black">
                <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]">
                    <ScrollVelocityRow baseVelocity={8} direction={1}>
                        <span className="mx-4">Precision Manufacturing</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4">Advanced Production</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4">Quality Control</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4">Global Logistics</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4">Precision Manufacturing</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4">Advanced Production</span>
                        <span className="mx-4">•</span>
                    </ScrollVelocityRow>
                    <ScrollVelocityRow baseVelocity={8} direction={-1}>
                        <span className="mx-4 text-gradient">Scale & Speed</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4 text-gradient">Custom Solutions</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4 text-gradient">Rapid Prototyping</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4 text-gradient">Full Production</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4 text-gradient">Scale & Speed</span>
                        <span className="mx-4">•</span>
                        <span className="mx-4 text-gradient">Custom Solutions</span>
                        <span className="mx-4">•</span>
                    </ScrollVelocityRow>
                </ScrollVelocityContainer>
                <div className="from-elastic-black pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
                <div className="from-elastic-black pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
            </div>
            
            <div className="relative z-30 bg-elastic-black">
                <VideoHighlight />
                <Showcase />
            </div>
        </motion.div>
    );
};

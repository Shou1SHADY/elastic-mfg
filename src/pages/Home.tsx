import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { VideoHighlight } from '../components/VideoHighlight';
import { Showcase } from '../components/Showcase';
import { ScrollVelocityContainer, ScrollVelocityRow } from '../components/ui/scroll-based-velocity';
import { CometCard } from '../components/ui/comet-card';

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
                    <ScrollVelocityRow baseVelocity={5} direction={1}>
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
                    <ScrollVelocityRow baseVelocity={5} direction={-1}>
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

            {/* Comet Card Section */}
            <div className="relative py-20 bg-elastic-black">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <CometCard rotateDepth={15} translateDepth={15} className="group">
                            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col justify-between hover:border-elastic-accent/50 transition-all duration-300">
                                <div className="absolute inset-0">
                                    <img src="/images/keychain4.jpg" alt="Precision Engineering" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                                </div>
                                <div className="relative z-10 w-12 h-12 rounded-full bg-elastic-accent/20 flex items-center justify-center group-hover:bg-elastic-accent/30 transition-colors backdrop-blur-sm">
                                    <div className="w-6 h-6 bg-elastic-accent rounded-sm"></div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-2">Precision Engineering</h3>
                                    <p className="text-zinc-300 text-sm">Advanced manufacturing with micron-level accuracy and automated quality control.</p>
                                </div>
                            </div>
                        </CometCard>

                        <CometCard rotateDepth={15} translateDepth={15} className="group">
                            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col justify-between hover:border-elastic-accent/50 transition-all duration-300">
                                <div className="absolute inset-0">
                                    <img src="/images/collection.jpg" alt="Scale Production" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                                </div>
                                <div className="relative z-10 w-12 h-12 rounded-full bg-elastic-secondary/20 flex items-center justify-center group-hover:bg-elastic-secondary/30 transition-colors backdrop-blur-sm">
                                    <div className="w-6 h-6 bg-elastic-secondary rounded-full"></div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-2">Scale Production</h3>
                                    <p className="text-zinc-300 text-sm">From prototype to 500k+ units with consistent quality and on-time delivery.</p>
                                </div>
                            </div>
                        </CometCard>

                        <CometCard rotateDepth={15} translateDepth={15} className="group">
                            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 p-6 flex flex-col justify-between hover:border-elastic-accent/50 transition-all duration-300">
                                <div className="absolute inset-0">
                                    <img src="/images/collection2.jpg" alt="Global Logistics" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                                </div>
                                <div className="relative z-10 w-12 h-12 rounded-full bg-elastic-highlight/20 flex items-center justify-center group-hover:bg-elastic-highlight/30 transition-colors backdrop-blur-sm">
                                    <div className="w-6 h-6 bg-elastic-highlight rounded-lg"></div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-2">Global Logistics</h3>
                                    <p className="text-zinc-300 text-sm">Worldwide distribution network with real-time tracking and customs management.</p>
                                </div>
                            </div>
                        </CometCard>
                    </motion.div>
                </div>
            </div>

            <div className="relative z-30 bg-elastic-black">
                <VideoHighlight />
                <Showcase />
            </div>
        </motion.div>
    );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { VideoHighlight } from '../components/VideoHighlight';
import { Showcase } from '../components/Showcase';

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
            <div className="relative z-30 bg-elastic-black">
                <VideoHighlight />
                <Showcase />
            </div>
        </motion.div>
    );
};

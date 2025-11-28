import React from 'react';
import { motion } from 'framer-motion';
import { About as AboutComponent } from '../components/About';

export const About: React.FC = () => {
    return (
        <motion.div
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

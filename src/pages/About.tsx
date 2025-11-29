import React from 'react';
import { motion } from 'framer-motion';
import { About as AboutComponent } from '../components/About';
import ScrollColorBackground from '../components/ScrollColorBackground';

export const About: React.FC = () => {
    const sections = [
        {
            id: "about-hero",
            color: "#0D1117", // very dark navy
            content: (
                <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center space-y-6 ">
                    {/* pt-40 ensures navbar doesn't overlap */}
                    <AboutComponent />
                    {/* <p className="text-gray-300 max-w-2xl mt-8 text-lg">
                        At Elastic, we blend cutting-edge technology with craftsmanship
                        to create premium custom keychains, patches, and emblems for
                        brands worldwide. Every design is meticulously crafted to make
                        your brand stand out.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                            Learn More
                        </button>
                        <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
                            Contact Us
                        </button>
                    </div> */}
                </div>
            ),
        },
        {
            id: "about-2",
            color: "#1B1F3B", // deep indigo
            content: (
                <div className="w-full h-full flex flex-col items-center justify-center px-6 lg:px-20 space-y-8 md:space-y-12 pt-16 md:pt-0">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center">Engineering Excellence</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl text-center px-4">
                        Advanced manufacturing capabilities meet innovative design solutions.
                        Our high-precision production process ensures each product meets the
                        highest quality standards.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-6 w-full max-w-5xl">
                        <div className="bg-gradient-to-tr from-gray-800 to-gray-700 p-6 md:p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition">
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Precision Crafting</h3>
                            <p className="text-sm md:text-base text-gray-400">Every piece is carefully molded and finished to perfection.</p>
                        </div>
                        <div className="bg-gradient-to-tr from-gray-800 to-gray-700 p-6 md:p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition">
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Innovative Design</h3>
                            <p className="text-sm md:text-base text-gray-400">Modern, sleek, and fully customizable designs that stand out.</p>
                        </div>
                        <div className="bg-gradient-to-tr from-gray-800 to-gray-700 p-6 md:p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition">
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Durability</h3>
                            <p className="text-sm md:text-base text-gray-400">Materials that last, designed to withstand daily use without compromise.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: "about-3",
            color: "#23332F", // dark green-teal
            content: (
                <div className="w-full h-full flex flex-col items-center justify-center px-6 lg:px-20 space-y-8 md:space-y-12 pt-16 md:pt-0">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center">Global Reach</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl text-center px-4">
                        Serving clients worldwide with precision and reliability.
                        Our logistics and distribution networks ensure timely delivery anywhere.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-6 w-full max-w-5xl">
                        <div className="bg-gradient-to-tr from-gray-800 to-gray-700 p-6 md:p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition">
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">North America</h3>
                            <p className="text-sm md:text-base text-gray-400">Quick delivery and local support across the continent.</p>
                        </div>
                        <div className="bg-gradient-to-tr from-gray-800 to-gray-700 p-6 md:p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition">
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Europe</h3>
                            <p className="text-sm md:text-base text-gray-400">Strong partnerships and distribution channels for fast shipping.</p>
                        </div>
                        <div className="bg-gradient-to-tr from-gray-800 to-gray-700 p-6 md:p-8 rounded-2xl shadow-xl text-center hover:scale-105 transition">
                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Asia-Pacific</h3>
                            <p className="text-sm md:text-base text-gray-400">Global manufacturing reach with consistent quality assurance.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: "about-final",
            color: "#0D1117",
            content: (
                <div className="w-full h-full flex flex-col items-center justify-center px-6 text-center space-y-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">Partner With Us</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl px-4">
                        Let's create something extraordinary together. Whether it's a
                        large-scale corporate order or a custom project, we can bring
                        your ideas to life.
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-4">
                        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">
                            Get Started
                        </button>
                        <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
                            Contact Sales
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className=""
        >
            <ScrollColorBackground sections={sections} />
        </motion.div>
    );
};

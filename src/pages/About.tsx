import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Palette, ShieldCheck } from 'lucide-react';
import { About as AboutComponent } from '../components/About';
import ScrollColorBackground from '../components/ScrollColorBackground';

export const About: React.FC = () => {
    const sections = [
        {
            id: "about-hero",
            color: "#0D1117", // very dark navy
            content: (
                <div className="w-full h-full flex flex-col items-center justify-center  text-center space-y-6 ">
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
                <div className="w-full h-full flex flex-col items-center justify-center px-6 lg:px-20 space-y-12 pt-16 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center space-y-4"
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                            Engineering <span className="text-blue-500">Excellence</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Where advanced manufacturing meets innovative design. We ensure every product exceeds the highest quality standards.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                        {[
                            {
                                icon: Cpu,
                                title: "Precision Crafting",
                                desc: "Molded and finished with sub-millimeter accuracy for flawless execution."
                            },
                            {
                                icon: Palette,
                                title: "Innovative Design",
                                desc: "Modern aesthetics combined with fully customizable options to match your brand."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Unmatched Durability",
                                desc: "Built to withstand daily wear and tear without compromising on style."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                                        <item.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
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

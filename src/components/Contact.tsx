import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', company: '', details: '' });
    const [formState, setFormState] = useState<'idle' | 'processing' | 'success'>('idle');
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // GSAP animations removed since background elements are removed
        // TerminalGrid now handles the background animations
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('processing');

        // Simulate API call
        setTimeout(() => {
            setFormState('success');
            // Reset after success
            setTimeout(() => {
                setFormState('idle');
                setFormData({ name: '', email: '', company: '', details: '' });
            }, 3000);
        }, 2000);
    };

    return (
        <section id={SectionId.CONTACT} ref={sectionRef} className="py-24 relative overflow-hidden">

            {/* --- Content Container --- */}
            <div className="max-w-[1200px] mx-auto md:px-4 md:px-6 lg:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 bg-zinc-900/30 backdrop-blur-md md:border border-white/10 md:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">

                    {/* Left: Info Console */}
                    <div className="lg:col-span-5 p-5 md:p-8 lg:p-12 bg-zinc-900/60 lg:border-r border-white/5 flex flex-col justify-between relative overflow-hidden">
                        {/* Top Shine Decoration */}
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-elastic-accent/50 to-transparent"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-2 border border-elastic-accent rotate-45"></div>
                                <span className="text-elastic-accent font-mono text-xs uppercase tracking-widest">Initialize</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Start Project</h2>
                            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 md:mb-8">
                                Secure terminal for project initiation. Our engineering team reviews all specifications within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-4 md:space-y-6 font-mono text-xs text-zinc-300 relative z-10">
                            <div className="flex items-center gap-3 p-3 bg-black/40 border border-white/5 rounded-xl">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-green-500 tracking-wider">SYSTEM ONLINE</span>
                            </div>

                            <div className="border-l border-white/10 pl-4 space-y-4">
                                <div>
                                    <p className="mb-1 text-zinc-500 text-[10px] uppercase tracking-widest">Email</p>
                                    <a href="mailto:hello@elastic-mfg.com" className="text-white hover:text-elastic-accent transition-colors cursor-pointer text-sm">hello@elastic-mfg.com</a>
                                </div>
                                <div>
                                    <p className="mb-1 text-zinc-500 text-[10px] uppercase tracking-widest">Phone</p>
                                    <a href="tel:+201006565661" className="text-white hover:text-elastic-accent transition-colors cursor-pointer text-sm">010 06565661</a>
                                </div>
                                <div>
                                    <p className="mb-1 text-zinc-500 text-[10px] uppercase tracking-widest">Address</p>
                                    <a
                                        href="https://www.google.com/maps/place/Elastic/@29.966711,31.4821247,17z/data=!3m1!4b1!4m6!3m5!1s0x1457fd72338aaef3:0xc1b43b22faf5adc3!8m2!3d29.966711!4d31.4821247!16s%2Fg%2F11gbwnmc3c?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-elastic-accent transition-colors cursor-pointer text-sm leading-relaxed block"
                                    >
                                        مصنع 645, Industrial Area<br />
                                        New Cairo 3, Cairo 4716015<br />
                                        Egypt
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Subtle sheen interaction */}
                        <div className="absolute -inset-full bg-gradient-to-br from-transparent via-white/5 to-transparent rotate-45 pointer-events-none transition-transform duration-1000 group-hover:translate-x-full"></div>
                    </div>

                        {/* Right: Input Terminal */}
                        <div className="lg:col-span-7 p-5 md:p-8 lg:p-12 bg-[#0a0a0a]/60 relative flex items-center justify-center">
                            <div className="w-full max-w-lg">
                                <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                                    {/* Name Input */}
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="name"
                                            className="peer w-full bg-zinc-900/50 border border-white/10 rounded-lg md:rounded-xl px-4 md:px-5 py-3.5 md:py-4 text-sm text-white focus:border-elastic-secondary focus:ring-1 focus:ring-elastic-secondary focus:shadow-[0_0_20px_rgba(93,156,201,0.2)] outline-none transition-all placeholder-transparent"
                                            placeholder="Name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            disabled={formState !== 'idle'}
                                        />
                                        <label
                                            htmlFor="name"
                                            className="absolute left-4 md:left-5 top-3.5 md:top-4 text-zinc-500 text-xs transition-all 
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 
                                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-elastic-secondary peer-focus:uppercase peer-focus:tracking-wider peer-focus:bg-[#0a0a0a] peer-focus:px-1
                                pointer-events-none 
                                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-zinc-400 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-1"
                                        >
                                            Full Name
                                        </label>
                                    </div>

                                    {/* Company Input */}
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            id="company"
                                            className="peer w-full bg-zinc-900/50 border border-white/10 rounded-lg md:rounded-xl px-4 md:px-5 py-3.5 md:py-4 text-sm text-white focus:border-elastic-secondary focus:ring-1 focus:ring-elastic-secondary focus:shadow-[0_0_20px_rgba(93,156,201,0.2)] outline-none transition-all placeholder-transparent"
                                            placeholder="Company"
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            disabled={formState !== 'idle'}
                                        />
                                        <label
                                            htmlFor="company"
                                            className="absolute left-4 md:left-5 top-3.5 md:top-4 text-zinc-500 text-xs transition-all 
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 
                                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-elastic-secondary peer-focus:uppercase peer-focus:tracking-wider peer-focus:bg-[#0a0a0a] peer-focus:px-1
                                pointer-events-none 
                                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-zinc-400 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-1"
                                        >
                                            Company / Org
                                        </label>
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="relative group">
                                    <input
                                        type="email"
                                        id="email"
                                        className="peer w-full bg-zinc-900/50 border border-white/10 rounded-lg md:rounded-xl px-4 md:px-5 py-3.5 md:py-4 text-sm text-white focus:border-elastic-secondary focus:ring-1 focus:ring-elastic-secondary focus:shadow-[0_0_20px_rgba(93,156,201,0.2)] outline-none transition-all placeholder-transparent"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        disabled={formState !== 'idle'}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-4 md:left-5 top-3.5 md:top-4 text-zinc-500 text-xs transition-all 
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 
                                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-elastic-secondary peer-focus:uppercase peer-focus:tracking-wider peer-focus:bg-[#0a0a0a] peer-focus:px-1
                                pointer-events-none 
                                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-zinc-400 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-1"
                                    >
                                        Email Address
                                    </label>
                                </div>

                                {/* Details Textarea */}
                                <div className="relative group">
                                    <textarea
                                        id="details"
                                        className="peer w-full bg-zinc-900/50 border border-white/10 rounded-lg md:rounded-xl px-4 md:px-5 py-3.5 md:py-4 text-sm text-white focus:border-elastic-secondary focus:ring-1 focus:ring-elastic-secondary focus:shadow-[0_0_20px_rgba(93,156,201,0.2)] outline-none transition-all placeholder-transparent h-28 md:h-32 resize-none"
                                        placeholder="Details"
                                        value={formData.details}
                                        onChange={e => setFormData({ ...formData, details: e.target.value })}
                                        disabled={formState !== 'idle'}
                                    ></textarea>
                                    <label
                                        htmlFor="details"
                                        className="absolute left-4 md:left-5 top-3.5 md:top-4 text-zinc-500 text-xs transition-all 
                                peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-4 
                                peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-elastic-secondary peer-focus:uppercase peer-focus:tracking-wider peer-focus:bg-[#0a0a0a] peer-focus:px-1
                                pointer-events-none 
                                peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-zinc-400 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-1"
                                    >
                                        Project Parameters
                                    </label>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={formState !== 'idle'}
                                        className={`w-full py-3.5 md:py-4 font-bold text-sm uppercase tracking-[0.2em] rounded-lg md:rounded-xl shadow-[0_0_20px_rgba(114,200,194,0.3)] transition-all duration-300 ease-out transform relative overflow-hidden group
                                        ${formState === 'idle' ? 'bg-elastic-accent text-black hover:bg-white hover:shadow-[0_0_30px_rgba(114,200,194,0.6)] hover:scale-105 active:scale-95' : ''}
                                        ${formState === 'processing' ? 'bg-zinc-800 text-zinc-400 cursor-wait' : ''}
                                        ${formState === 'success' ? 'bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.6)]' : ''}
                                    `}
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-2 h-6">
                                            <AnimatePresence mode='wait'>
                                                {formState === 'idle' && (
                                                    <motion.span
                                                        key="idle"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        Transmit Data <span className="text-[10px] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">→</span>
                                                    </motion.span>
                                                )}
                                                {formState === 'processing' && (
                                                    <motion.span
                                                        key="processing"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                        Encrypting...
                                                    </motion.span>
                                                )}
                                                {formState === 'success' && (
                                                    <motion.span
                                                        key="success"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                                        Data Secured
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Progress Bar for Processing State */}
                                        {formState === 'processing' && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-1 bg-elastic-accent"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 2, ease: "linear" }}
                                            />
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

                {/* Google Maps - Outside Container */}
                <div className="mt-8 max-w-[1200px] mx-auto md:px-4 md:px-6 lg:px-10">
                    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.0234567890123!2d31.4821247!3d29.966711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1457fd72338aaef3%3A0xc1b43b22faf5adc3!2sElastic!5e0!3m2!1sen!2seg!4v1234567890123!5m2!1sen!2seg"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>
        </section>
    );
};

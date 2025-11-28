import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Github } from 'lucide-react';

export const Footer: React.FC = () => {
   const currentYear = new Date().getFullYear();

   const footerLinks = {
      company: [
         { name: 'About', path: '/about' },
         { name: 'Process', path: '/process' },
         { name: 'Portfolio', path: '/portfolio' },
         { name: 'Contact', path: '/contact' },
      ],
      social: [
         { name: 'Instagram', url: '#', icon: Instagram },
         { name: 'LinkedIn', url: '#', icon: Linkedin },
         { name: 'Twitter', url: '#', icon: Twitter },
         { name: 'GitHub', url: '#', icon: Github },
      ],
   };

   return (
      <footer className="relative bg-gradient-to-b from-elastic-black via-elastic-darker to-black border-t border-white/10 overflow-hidden">
         {/* Animated Background Elements */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-elastic-accent/5 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-elastic-secondary/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
         </div>

         {/* Grid Pattern */}
         <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>

         <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20 relative z-10">

            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

               {/* Brand Section */}
               <div className="lg:col-span-2">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6 }}
                  >
                     <h3 className="text-3xl font-bold mb-4">
                        ELASTIC<span className="text-gradient">.</span>
                     </h3>
                     <p className="text-zinc-400 text-sm leading-relaxed max-w-md mb-6">
                        Precision polymer engineering for the modern industrial age.
                        Transforming digital concepts into high-fidelity physical products.
                     </p>
                     <div className="flex items-center gap-3">
                        <span className="h-px w-12 bg-gradient-to-r from-elastic-accent to-transparent"></span>
                        <span className="text-elastic-accent font-mono text-xs uppercase tracking-widest">Est. 2023</span>
                     </div>
                  </motion.div>
               </div>

               {/* Company Links */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
               >
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Company</h4>
                  <ul className="space-y-3">
                     {footerLinks.company.map((link) => (
                        <li key={link.name}>
                           <Link
                              to={link.path}
                              className="text-zinc-400 text-sm hover:text-elastic-accent transition-colors duration-300 flex items-center gap-2 group"
                           >
                              <span className="w-0 h-px bg-elastic-accent transition-all duration-300 group-hover:w-4"></span>
                              {link.name}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </motion.div>

               {/* Social Links */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
               >
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Connect</h4>
                  <ul className="space-y-3">
                     {footerLinks.social.map((link) => {
                        const Icon = link.icon;
                        return (
                           <li key={link.name}>
                              <a
                                 href={link.url}
                                 className="text-zinc-400 text-sm hover:text-elastic-highlight transition-colors duration-300 flex items-center gap-3 group"
                                 target="_blank"
                                 rel="noopener noreferrer"
                              >
                                 <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                 {link.name}
                              </a>
                           </li>
                        );
                     })}
                  </ul>
               </motion.div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8">
               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                     <div className="w-2 h-2 rounded-full bg-elastic-accent animate-glow-pulse"></div>
                     <p className="text-zinc-500 text-xs font-mono">
                        All Systems Operational
                     </p>
                  </div>

                  <div className="text-zinc-500 text-xs font-mono">
                     © {currentYear} Elastic MFG. All rights reserved.
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
};

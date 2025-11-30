import React, { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionId, type Product } from '../types';
import TerminalGrid from './TerminalGrid';

gsap.registerPlugin(ScrollTrigger);

// Add status indicators to products
// Add status indicators to products
const products: Product[] = [
  { id: 'TAC-001', title: 'OPS_PATCH_V1', category: 'MORALE', description: 'Standard issue morale patch with hook backing.', imageUrl: '/images/patch1.jpg', details: ['3.5mm PVC', 'VELCRO HOOK', 'IR COMPATIBLE'], status: 'POPULAR' },
  { id: 'KEY-092', title: 'HEX_CHAIN_L2', category: 'EDC', description: 'Rubberized keychain with hexagonal pattern.', imageUrl: '/images/keychain1.jpg', details: ['PANTONE 802C', 'MATTE FINISH', 'BLK SPLIT RING'], status: 'NEW' },
  { id: 'IND-442', title: 'CORP_BRAND', category: 'PROMO', description: 'Flat corporate branding asset, soft touch.', imageUrl: '/images/collection2.jpg', details: ['2D MOLD', '4 COLOR', 'POLYBAG'], status: null },
  { id: 'FIG-X01', title: 'UNIT_CREST', category: 'MIL-SPEC', description: 'Heavy duty unit crest patch.', imageUrl: '/images/patch2.jpg', details: ['HAND PAINTED', 'SILICONE', 'HEAVY BASE'], status: 'LIMITED' },
  { id: 'FSH-882', title: 'STREET_TAG', category: 'FASHION', description: 'High-detail garment label for streetwear.', imageUrl: '/images/keychain2.jpg', details: ['SEW-ON CHANNEL', 'MATTE', 'EMBOSSED'], status: null },
  { id: 'MED-119', title: 'MEDIC_CROSS', category: 'MORALE', description: 'Glow in the dark medical identifier.', imageUrl: '/images/keychain3.jpg', details: ['GITD PIGMENT', 'RED/WHITE', 'WASHABLE'], status: 'NEW' },
];

// 3D Tilt Card Component
const TiltCard = ({ product, onClick, index }: { product: Product; onClick: () => void; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className=" group cursor-pointer relative rounded-2xl overflow-hidden
            bg-black/10 backdrop-blur-sm
            border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]
            hover:border-elastic-accent/70 hover:shadow-glow-mint transition-colors duration-500"
    >
      <div style={{ transform: "translateZ(50px)" }} className="absolute top-4 left-4 z-20">
        {product.status && (
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider animate-pulse ${product.status === 'NEW' ? 'bg-green-500 text-black' :
            product.status === 'POPULAR' ? 'bg-orange-500 text-white' :
              product.status === 'LIMITED' ? 'bg-red-500 text-white' :
                'bg-gray-500 text-white'
            }`}>
            {product.status}
          </span>
        )}
      </div>

      <div className="aspect-[4/3] overflow-hidden">
        <motion.img
          src={product.imageUrl}
          alt={product.title}
          style={{ transform: "translateZ(20px)" }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>

      <div style={{ transform: "translateZ(60px)" }} className="absolute bottom-0 left-0 w-full p-6">
        <div className="text-elastic-accent font-mono text-xs mb-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          {product.category}
        </div>
        <h3 className="text-white font-bold text-xl uppercase tracking-wide">{product.title}</h3>
      </div>

      {/* Corner accent */}
      <div style={{ transform: "translateZ(40px)" }} className="absolute top-4 right-4 w-2 h-2 bg-elastic-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-glow-pulse"></div>
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`group relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${active
        ? 'bg-elastic-accent text-black shadow-glow'
        : 'bg-white/5 border border-white/10 text-zinc-400 hover:border-elastic-accent/50 hover:text-white hover:bg-white/10'
        }`}
    >
      {children}
    </motion.button>
  );
};

export const Portfolio: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = filter === 'ALL'
    ? products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : products.filter(p =>
      p.category === filter &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  const categories = ['ALL', 'MORALE', 'EDC', 'PROMO', 'FASHION'];

  // Count products per category
  const getCategoryCount = (category: string) => {
    if (category === 'ALL') return products.length;
    return products.filter(p => p.category === category).length;
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* TerminalGrid covers entire component */}
      <TerminalGrid
        accentColors={['#3b82f6', '#8b5cf6', '#06b6d4']}
        density={0.8}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Main content above grid */}
      <section
        id={SectionId.PORTFOLIO}
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 pt-24 md:pt-32
        "
      >
        {/* Image + Text Showcase Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-12 rounded-3xl overflow-hidden border border-white/10 bg-black/10 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
              <img
                src="/images/collection.jpg"
                alt="Manufacturing precision"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Text side */}
            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-elastic-accent/80">
                <span className="h-px w-8 bg-gradient-to-r from-elastic-accent to-transparent" />
                <span>Capability</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Precision at Scale.
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
                From single prototypes to 500k+ monthly runs, our production lines are built for consistency.
                Every batch is optically verified, hand‑finished, and shipped on time.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full border border-white/10 text-[11px] uppercase tracking-[0.18em] text-zinc-300 bg-black/10">Low MOQ</span>
                <span className="px-3 py-1 rounded-full border border-white/10 text-[11px] uppercase tracking-[0.18em] text-zinc-300 bg-black/10">QC Gates</span>
                <span className="px-3 py-1 rounded-full border border-white/10 text-[11px] uppercase tracking-[0.18em] text-zinc-300 bg-black/10">Global Fulfillment</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 pb-8 border-b border-white/10 gap-6 pt-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gradient-to-r from-elastic-accent to-transparent"></span>
              <span className="text-elastic-accent font-mono text-xs uppercase tracking-[0.2em]">Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Selected <span className="text-gradient">Works</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 bg-black/10 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-elastic-accent/50 focus:bg-black/20 transition-all"
              />
              <svg className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <MagneticButton
                  key={cat}
                  active={filter === cat}
                  onClick={() => setFilter(cat)}
                >
                  <span className="relative z-10">{cat}</span>
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${filter === cat
                    ? 'bg-black/20 text-black'
                    : 'bg-white/10 text-zinc-500 group-hover:bg-elastic-accent/20 group-hover:text-elastic-accent'
                    }`}>
                    {getCategoryCount(cat)}
                  </span>
                </MagneticButton>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Counter */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-zinc-500 text-lg mb-4">No products found</div>
            <div className="text-zinc-600 text-sm">Try adjusting your search or filters</div>
          </motion.div>
        ) : (
          <>
            <div className="text-zinc-500 text-sm mb-6 text-center">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              {searchTerm && ` for "${searchTerm}"`}
              {filter !== 'ALL' && ` in ${filter}`}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <TiltCard
                    key={product.id}
                    product={product}
                    index={index}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Enhanced Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="card-glass w-full max-w-4xl rounded-3xl shadow-glow overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="md:w-1/2 relative h-64 md:h-auto bg-zinc-900 overflow-hidden">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7 }}
                    src={selectedProduct!.imageUrl}
                    className="w-full h-full object-cover"
                    alt={selectedProduct!.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col bg-elastic-darker border-l border-white/5">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold text-gradient uppercase tracking-tight">{selectedProduct!.title}</h2>
                    <button onClick={() => setSelectedProduct(null)} className="text-zinc-400 hover:text-white text-2xl transition-colors">×</button>
                  </div>
                  <div className="text-xs font-mono text-elastic-accent mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-elastic-accent animate-pulse" />
                    {selectedProduct!.id} // {selectedProduct!.category}
                  </div>
                  <p className="text-zinc-300 text-base leading-relaxed mb-6 flex-grow">{selectedProduct!.description}</p>
                  <div className="card-glass p-5 rounded-xl mb-6 border border-white/5 bg-black/20">
                    <div className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-semibold">Specifications</div>
                    {selectedProduct!.details?.map((d, i) => (
                      <div key={i} className="text-sm text-zinc-300 font-mono py-2 border-b border-white/5 last:border-0 flex items-center gap-2">
                        <span className="text-elastic-accent/50">›</span> {d}
                      </div>
                    ))}
                  </div>
                  <button className="group w-full py-4 bg-gradient-to-r from-elastic-accent to-elastic-highlight text-black font-bold text-sm uppercase tracking-widest rounded-xl hover:shadow-glow transition-all relative overflow-hidden">
                    <span className="relative z-10">Request Quote</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

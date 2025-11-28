import React, { useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionId, type Product } from '../types';
import TerminalGrid from './TerminalGrid';

gsap.registerPlugin(ScrollTrigger);

const products: Product[] = [
  { id: 'TAC-001', title: 'OPS_PATCH_V1', category: 'MORALE', description: 'Standard issue morale patch with hook backing.', imageUrl: 'https://images.unsplash.com/photo-1620310214309-906927d627b4?q=80&w=1000&auto=format&fit=crop', details: ['3.5mm PVC', 'VELCRO HOOK', 'IR COMPATIBLE'] },
  { id: 'KEY-092', title: 'HEX_CHAIN_L2', category: 'EDC', description: 'Rubberized keychain with hexagonal pattern.', imageUrl: 'https://images.unsplash.com/photo-1622445275576-721325763afe?q=80&w=1000&auto=format&fit=crop', details: ['PANTONE 802C', 'MATTE FINISH', 'BLK SPLIT RING'] },
  { id: 'IND-442', title: 'CORP_BRAND', category: 'PROMO', description: 'Flat corporate branding asset, soft touch.', imageUrl: 'https://images.unsplash.com/photo-1616401776146-236b23d9df6d?q=80&w=1000&auto=format&fit=crop', details: ['2D MOLD', '4 COLOR', 'POLYBAG'] },
  { id: 'FIG-X01', title: 'UNIT_CREST', category: 'MIL-SPEC', description: 'Heavy duty unit crest patch.', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop', details: ['HAND PAINTED', 'SILICONE', 'HEAVY BASE'] },
  { id: 'FSH-882', title: 'STREET_TAG', category: 'FASHION', description: 'High-detail garment label for streetwear.', imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop', details: ['SEW-ON CHANNEL', 'MATTE', 'EMBOSSED'] },
  { id: 'MED-119', title: 'MEDIC_CROSS', category: 'MORALE', description: 'Glow in the dark medical identifier.', imageUrl: 'https://images.unsplash.com/photo-1550534882-628d61183c51?q=80&w=1000&auto=format&fit=crop', details: ['GITD PIGMENT', 'RED/WHITE', 'WASHABLE'] },
];

export const Portfolio: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState('ALL');

  const filteredProducts = filter === 'ALL' ? products : products.filter(p => p.category === filter);
  const categories = ['ALL', 'MORALE', 'EDC', 'PROMO', 'FASHION'];

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
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16"
      >
        {/* Image + Text Showcase Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-12 rounded-3xl overflow-hidden border border-white/10 bg-black/10 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-[4/3] lg:aspect-square overflow-hidden">
              <img
                src="https://picsum.photos/seed/elastic-mfg-manufacturing/1200/1200.jpg"
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
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Precision at Scale.
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
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
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-8 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-gradient-to-r from-elastic-accent to-transparent"></span>
              <span className="text-elastic-accent font-mono text-xs uppercase tracking-[0.2em]">Archive</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Selected <span className="text-gradient">Works</span>
            </h2>
          </div>

          <div className="flex gap-2 mt-6 md:mt-0 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all ${filter === cat
                  ? 'bg-elastic-accent text-black shadow-glow'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:border-elastic-accent/50 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden
                    bg-black/10 backdrop-blur-sm
                    border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]
                    hover:border-elastic-accent/70 hover:shadow-glow-mint transition-all duration-500"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>

              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="text-elastic-accent font-mono text-xs mb-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.category}
                </div>
                <h3 className="text-white font-bold text-xl uppercase tracking-wide">{product.title}</h3>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-elastic-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-glow-pulse"></div>
            </motion.div>
          ))}
        </div>

      {/* Enhanced Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card-glass w-full max-w-4xl rounded-3xl shadow-glow overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-1/2 relative h-64 md:h-auto bg-zinc-900">
              <img src={selectedProduct!.imageUrl} className="w-full h-full object-cover" alt={selectedProduct!.title} />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col bg-elastic-darker">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-gradient uppercase tracking-tight">{selectedProduct!.title}</h2>
                <button onClick={() => setSelectedProduct(null)} className="text-zinc-400 hover:text-white text-2xl">×</button>
              </div>
              <div className="text-xs font-mono text-elastic-accent mb-6">{selectedProduct!.id} // {selectedProduct!.category}</div>
              <p className="text-zinc-300 text-base leading-relaxed mb-6 flex-grow">{selectedProduct!.description}</p>
              <div className="card-glass p-5 rounded-xl mb-6">
                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-semibold">Specifications</div>
                {selectedProduct!.details?.map((d, i) => (
                  <div key={i} className="text-sm text-zinc-300 font-mono py-2 border-b border-white/10 last:border-0">{d}</div>
                ))}
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-elastic-accent to-elastic-highlight text-black font-bold text-sm uppercase tracking-widest rounded-xl hover:shadow-glow transition-all">
                Request Quote
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </section>
    </div>
  );
};

'use client';
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionId } from '../types';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation constants
  const frameCount = 147;
  const currentFrame = (index: number) => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1)
      .toString()
      .padStart(4, '0')}.jpg`
  );

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const sequence = useRef({ frame: 0 });

  // ----------------------
  // RENDERER
  // ----------------------
  const render = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[sequence.current.frame];
    const activeImg =
      img && img.complete
        ? img
        : imagesRef.current
            .slice(0, sequence.current.frame)
            .reverse()
            .find(i => i && i.complete);

    if (!activeImg) return;

    const canvasWidth = container.offsetWidth;
    const canvasHeight = container.offsetHeight;

    // Cover effect (like CSS object-fit: cover)
    const scale = Math.max(
      canvasWidth / activeImg.width,
      canvasHeight / activeImg.height
    );
    const x = (canvasWidth - activeImg.width * scale) / 2;
    const y = (canvasHeight - activeImg.height * scale) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(
      activeImg,
      0,
      0,
      activeImg.width,
      activeImg.height,
      x,
      y,
      activeImg.width * scale,
      activeImg.height * scale
    );
  };

  // ----------------------
  // SETUP IMAGES & RESIZING
  // ----------------------
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = window.devicePixelRatio || 1;

      canvas.width = container.offsetWidth * dpr;
      canvas.height = container.offsetHeight * dpr;

      canvas.style.width = `${container.offsetWidth}px`;
      canvas.style.height = `${container.offsetHeight}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      render();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // Preload images
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        if (i === 0) render();
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // ----------------------
  // SCROLLTRIGGER + EVENTS
  // ----------------------
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.to(sequence.current, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=400%',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: false,
          onUpdate: render
        }
      });

      // Text parallax
      gsap.to('.hero-text-container', {
        y: -150,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=100%',
          scrub: true
        }
      });
    }, containerRef);

    ScrollTrigger.refresh();

    // Revalidate on tab restore or window focus
    const revalidate = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        render();
      });
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') revalidate();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', revalidate);

    // CLEANUP — (correct order!)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', revalidate);
      ctx.revert(); // always last
    };
  }, []);

  const scrollToAbout = () => {
    document
      .getElementById(SectionId.ABOUT)
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id={SectionId.HERO}
      className="relative w-full h-screen bg-[#050505] overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-10 block" />

      {/* Gradients for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-fade opacity-30 z-10 pointer-events-none" />

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="hero-text-container max-w-[1200px] w-full px-4 md:px-6 lg:px-10 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-4 animate-fade-in-up">
            <div className="h-[1px] w-12 bg-white/30"></div>
            <span className="font-mono text-xs text-white/60 tracking-[0.3em] uppercase">
              Precision Manufacturing
            </span>
            <div className="h-[1px] w-12 bg-white/30"></div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] drop-shadow-2xl mb-6 md:mb-8">
            MOLDING IDEAS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-400 to-zinc-700">
              INTO REALITY
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8 md:mb-10 font-light px-4 sm:px-0 text-center">
            Advanced polymer engineering for the modern industrial age. We
            bridge the gap between digital concepts and tangible high-fidelity
            products.
          </p>

          <button
            onClick={scrollToAbout}
            className="group relative px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black font-bold text-xs sm:text-sm tracking-widest uppercase rounded-sm overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10">Discover System</span>
            <div className="absolute inset-0 bg-elastic-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 mix-blend-difference">
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <div className="w-full h-1/2 bg-white animate-scan"></div>
        </div>
      </div>
    </section>
  );
};

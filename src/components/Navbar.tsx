import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Loader, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

type ScrollDirection = 'up' | 'down';

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

const useScroll = (threshold = 80) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up');
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > threshold);
      if (current > lastScroll.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScroll.current = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { isScrolled, scrollDirection };
};

const navLinks = [
  { path: '/about', label: 'About' },
  { path: '/process', label: 'Process' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLockedOpen, setIsLockedOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isScrolled, scrollDirection } = useScroll(80);

  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const rotatingIconRef = useRef<HTMLDivElement>(null);

  const isShrunken = useMemo(
    () => isScrolled && scrollDirection === 'down' && !isLockedOpen,
    [isScrolled, scrollDirection, isLockedOpen]
  );

  useEffect(() => {
    if (scrollDirection === 'down') {
      setIsLockedOpen(false);
    }
  }, [scrollDirection]);

  useEffect(() => {
    if (!headerRef.current) return;

    const tl = gsap.timeline();

    if (isShrunken) {
      tl.to(headerRef.current, {
        width: 56,
        height: 56,
        borderRadius: '1rem',
        duration: 0.4,
        ease: 'power3.inOut',
      })
        .to([
          navRef.current,
          logoRef.current,
          actionsRef.current,
        ], {
          opacity: 0,
          duration: 0.25,
          ease: 'power3.inOut',
        }, '-=0.35')
        .to(iconRef.current, {
          opacity: 1,
          duration: 0.2,
          ease: 'power3.inOut',
        }, '-=0.2');
    } else {
      tl.to(headerRef.current, {
        width: 'auto',
        height: 56,
        borderRadius: '999px',
        duration: 0.4,
        ease: 'power3.inOut',
      })
        .to(iconRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power3.inOut',
        }, '-=0.4')
        .to([
          navRef.current,
          logoRef.current,
          actionsRef.current,
        ], {
          opacity: 1,
          duration: 0.3,
          ease: 'power3.inOut',
        }, '-=0.3');
    }

    return () => {
      tl.kill();
    };
  }, [isShrunken]);

  useEffect(() => {
    const handleScroll = () => {
      if (!rotatingIconRef.current) return;
      const rotation = window.scrollY / 5;
      gsap.to(rotatingIconRef.current, {
        rotation,
        duration: 0.1,
        ease: 'power1.out',
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const navigateTo = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header
        className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer"
        onMouseEnter={() => {
          if (isShrunken) setIsLockedOpen(true);
        }}
        onClick={() => {
          if (isShrunken) window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div
          ref={headerRef}
          className="flex h-14 items-center justify-center border border-white/10 bg-elastic-black/70 px-4 shadow-lg backdrop-blur-strong md:px-6 overflow-hidden transition-all duration-300"
        >
          <div ref={iconRef} className="absolute opacity-0 text-white">
            <div ref={rotatingIconRef}>
              <Loader className="h-5 w-5" />
            </div>
          </div>

          <div ref={logoRef} className="flex-shrink-0 pl-4 pr-6">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Elastic MFG" className="h-12 md:h-14 w-auto object-contain" />
            </Link>
          </div>

          <nav
            ref={navRef}
            className="hidden md:flex items-center space-x-6 mx-8"
          >
            {navLinks.map((link, index) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={cn(
                  'relative text-sm font-medium transition-all duration-300 group uppercase tracking-wider',
                  pathname === link.path ? 'text-white' : 'text-white/60 hover:text-white'
                )}
                style={{
                  animation: `slideInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards ${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-elastic-accent to-elastic-highlight transition-all duration-300 ease-out',
                    pathname === link.path
                      ? 'w-full opacity-100'
                      : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  )}
                />
              </button>
            ))}
          </nav>

          <div ref={actionsRef} className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigateTo('/contact')}
              className="relative inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium tracking-[0.2em] text-white/90 transition-all duration-300 hover:bg-elastic-accent hover:text-black hover:shadow-glow min-w-[11rem] justify-center whitespace-nowrap overflow-hidden group shimmer"
            >
              <span className="relative z-10">Start Project</span>
              <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <div className="md:hidden ml-auto">
            <button
              className="rounded-full border border-white/20 p-2 text-white"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-elastic-black/90 backdrop-blur-xl md:hidden transition-opacity duration-300 ease-in-out',
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <div className="absolute top-5 right-5">
          <button
            className="rounded-full border border-white/20 p-2 text-white"
            onClick={toggleMobileMenu}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-full flex-col items-center justify-center space-y-10">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigateTo(link.path)}
              className={cn(
                'text-3xl font-semibold uppercase tracking-[0.3em] text-white/70 transition hover:text-elastic-accent',
                pathname === link.path && 'text-white'
              )}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => navigateTo('/contact')}
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white/80 transition hover:border-elastic-accent hover:bg-elastic-accent hover:text-black"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </>
  );
};

import { useState, useEffect } from 'react';

interface StickyNavProps {
  onApply: () => void;
}

export default function StickyNav({ onApply }: StickyNavProps) {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setVisible(y > 100);
        setScrolled(y > 300);
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true });
    return () => window.removeEventListener('scroll', close);
  }, [menuOpen]);

  return (
    <nav className={`sticky-nav ${visible ? 'visible' : ''} ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
          aria-label="Menu"
        >
          <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>

        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hidden md:flex items-center gap-2">
          <img src="https://qcmkvxym51.ufs.sh/f/dwov31m0cIp82UZKkVuje8HKUVFmQABviX9nuTsJazGrcdLg" alt="CEO Media" className="h-8 rounded-lg" />
          <span className="text-sm font-medium text-white">CEO Media</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-brand-muted hover:text-white transition-colors duration-200">The Visionary</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-brand-muted hover:text-white transition-colors duration-200">Services</a>
          <a href="#network" onClick={(e) => { e.preventDefault(); document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-brand-muted hover:text-white transition-colors duration-200">Network</a>
          <a href="#philosophy" onClick={(e) => { e.preventDefault(); document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-brand-muted hover:text-white transition-colors duration-200">Philosophy</a>
        </div>

        <button onClick={onApply} className="px-5 py-2 bg-white text-brand-bg text-sm font-semibold rounded-card transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]">
          Apply Now
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 pb-2 border-t border-white/[0.06] pt-4">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-4 px-2">
            <a href="#" onClick={(e) => { e.preventDefault(); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-sm text-brand-muted hover:text-white transition-colors duration-200">Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-brand-muted hover:text-white transition-colors duration-200">The Visionary</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-brand-muted hover:text-white transition-colors duration-200">Services</a>
            <a href="#network" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-brand-muted hover:text-white transition-colors duration-200">Network</a>
            <a href="#philosophy" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-sm text-brand-muted hover:text-white transition-colors duration-200">Philosophy</a>
          </div>
        </div>
      )}
    </nav>
  );
}

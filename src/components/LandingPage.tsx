import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface LandingPageProps {
  onApply: () => void;
}

const STATS = [
  { value: '2,733+', label: 'VIDEOS' },
  { value: '1.59M+', label: 'SUBSCRIBERS' },
  { value: '296M+', label: 'VIEWS' },
];

const EPISODES = [
  {
    guest: 'Andrew Tate',
    title: 'The Most Controversial Man on the Internet',
    thumbnail: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8XRLJCeF5ETAmoahpBtgDk70FQLIz4YcweGRN',
    url: '#',
  },
  {
    guest: 'Rick Ross',
    title: 'Building an Empire From Nothing',
    thumbnail: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8EL3wfMK1WHkR9uCP63Fz1pZsXg82yJne0tSo',
    url: '#',
  },
  {
    guest: 'Kodak Black',
    title: 'Raw Truth About the Music Industry',
    thumbnail: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8vHgNAlkTWtrxo2wiN5ZbaUcM1SmqfHvA04Gj',
    url: '#',
  },
  {
    guest: 'Ryan Garcia',
    title: 'Champion Mindset & Life Outside the Ring',
    thumbnail: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8m9GBDIYDKvypVFONjSGeEAtJ5Tq6HIrhbgZB',
    url: '#',
  },
  {
    guest: 'Justin Waller',
    title: 'From Blue Collar to Multi-Millionaire',
    thumbnail: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8ZcxKB2AmWcPo1iXQNnteMGzHf09RkKgrT7DA',
    url: '#',
  },
  {
    guest: 'Hodge Twins',
    title: 'Comedy, Culture & Saying What Everyone Thinks',
    thumbnail: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8bVWr0BZv7fjr4IYNoyUlK9Fk0B21ZOWtXmsS',
    url: '#',
  },
  {
    guest: '6ix9ine',
    title: 'Life After the Feds',
    thumbnail: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp83pU0BTg7Gdhf1azeqCUp8EvXgDO2x6ciFBIM',
    url: '#',
  },
  {
    guest: 'DJ Akademiks',
    title: 'Running the Biggest Platform in Hip Hop',
    thumbnail: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8uVAL9f3eXEvDacpVwUxYQ8rRbdP5lIgTsSjH',
    url: '#',
  },
  {
    guest: 'Dom Lucre',
    title: 'Exposing the Truth They Don\'t Want You to See',
    thumbnail: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8jwqhsdxiX8tkPaZf2dCEKNTxBwRS1L6JDIph',
    url: '#',
  },
];

const LOGO_URL = 'https://9tuqy0mn23.ufs.sh/f/Ck56V993keuOTsuJByNp3Mmv4ukxatX8qZAVOCbsfeQj0FW7';
const HERO_BG_URL = 'https://9tuqy0mn23.ufs.sh/f/Ck56V993keuOTODQtJNp3Mmv4ukxatX8qZAVOCbsfeQj0FW7';
const FRESH_IMAGE_URL = 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8n2Skrmd0Yz8LUCypj73TBqbNtA9HMho5GQ1g';
const AWARD_IMAGE_URL = 'https://9tuqy0mn23.ufs.sh/f/Ck56V993keuOTsuJByNp3Mmv4ukxatX8qZAVOCbsfeQj0FW7';

function AnimatedNumber({ value, visible }: { value: string; visible: boolean }) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!visible) return;
    const numericPart = value.replace(/[^0-9.]/g, '');
    const suffix = value.replace(/[0-9.,]/g, '');
    const target = parseFloat(numericPart);
    const isDecimal = numericPart.includes('.');
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      if (isDecimal) {
        setDisplay(current.toFixed(2).replace(/\.?0+$/, '') + suffix);
      } else {
        setDisplay(Math.floor(current).toLocaleString() + suffix);
      }
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, value]);
  return <>{display}</>;
}

export default function LandingPage({ onApply }: LandingPageProps) {
  useScrollReveal();

  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG_URL} alt="After Hours podcast studio" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.75)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center py-20">
          <img src={LOGO_URL} alt="After Hours Podcast" className="h-44 sm:h-56 md:h-72 lg:h-80 w-auto mx-auto mb-8 animate-float" style={{ animationDelay: '0.1s' }} />
          <p className="text-[#999999] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            Unfiltered conversations with the world's most interesting people. New episodes daily.
          </p>
          <div ref={statsRef} className="flex flex-wrap justify-center gap-8 sm:gap-14 text-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl sm:text-3xl text-gradient-gold"><AnimatedNumber value={stat.value} visible={statsVisible} /></p>
                <p className="text-[#999999] text-xs sm:text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </div>
      </section>

      {/* BE A GUEST */}
      <section className="py-12 sm:py-20 border-t border-gold-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(245,196,94,0.05)] via-transparent to-[rgba(232,212,139,0.05)]" />

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="reveal flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-4xl mx-auto">
            <div className="w-44 sm:w-52 md:w-56 shrink-0 flex items-center justify-center">
              <img src={FRESH_IMAGE_URL} alt="After Hours podcast" className="w-full h-auto max-h-44 sm:max-h-48 md:max-h-56 object-contain rounded-full drop-shadow-[0_0_20px_rgba(245,196,94,0.3)]" />
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
                BE A <span className="text-gradient-gold">GUEST</span>
              </h2>
              <p className="text-[#999999] text-base sm:text-lg max-w-xl mb-6 sm:mb-8">
                Join 2,000+ entrepreneurs, creators, and thought leaders who've built authority and deal flow by appearing on After Hours.
              </p>
              <button onClick={() => window.location.href = '/apply'} className="btn-gold inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg">
                APPLY TO BE ON THE SHOW (TAKES 30 SECONDS)
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TOP EPISODES */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-8 sm:mb-12">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              TOP <span className="text-gradient-gold">EPISODES</span>
            </h2>
            <p className="text-[#999999] text-base sm:text-lg">
              Our most-watched conversations that broke the internet.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {EPISODES.map((ep, i) => (
              <a
                key={ep.guest}
                href={ep.url}
                className="reveal hover-lift group relative rounded-2xl overflow-hidden border border-gold-glow bg-[#0D0D0F] hover:shadow-[0_0_25px_rgba(245,196,94,0.15)] transition-all duration-500 hover:border-[rgba(245,196,94,0.4)]"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={ep.thumbnail}
                    alt={ep.guest}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-[rgba(245,196,94,0.9)] flex items-center justify-center shadow-[0_0_20px_rgba(245,196,94,0.4)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0A0A0A"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="text-[#F5C45E] text-xs font-semibold uppercase tracking-widest mb-1">{ep.guest}</p>
                  <h3 className="font-display text-lg sm:text-xl leading-tight">{ep.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSOR THE SHOW */}
      <section className="py-12 sm:py-20 border-t border-gold-glow bg-[#0A0A0A]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(245,196,94,0.05)] via-transparent to-[rgba(232,212,139,0.05)]" />
        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="reveal flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-4xl mx-auto">

            <div className="w-44 sm:w-52 md:w-56 shrink-0 flex items-center justify-center">
              <img src={LOGO_URL} alt="After Hours Podcast" className="w-full h-auto max-h-56 object-contain drop-shadow-[0_0_20px_rgba(245,196,94,0.3)]" />
            </div>

            <div className="text-center md:text-left flex-1">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
                SPONSOR THE <span className="text-gradient-gold">SHOW</span>
              </h2>
              <p className="text-[#999999] text-base sm:text-lg max-w-xl mb-6 sm:mb-8">
                Custom ad-reads, product placement, and live event activations.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <button onClick={() => window.location.href = '/apply'} className="btn-outline-gold inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg border-2 border-[#F5C45E] text-white rounded-xl font-bold uppercase tracking-wider hover:bg-[rgba(245,196,94,0.1)] transition-all duration-300">
                  PARTNER WITH US
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
                <button onClick={() => window.location.href = '/apply'} className="btn-gold inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg">
                  EVENTS
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AWARD / SOCIAL PROOF */}
      <section className="py-12 sm:py-16 border-t border-gold-glow">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal max-w-2xl mx-auto">
            <img src={AWARD_IMAGE_URL} alt="After Hours Podcast Achievement" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-gold-glow">
        <div className="container mx-auto px-4 sm:px-6">

          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <img src={LOGO_URL} alt="After Hours Podcast" className="h-14 sm:h-16 w-auto" />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-[#999999]">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgba(245,196,94,0.2)] text-sm text-white hover:border-[rgba(245,196,94,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/></svg>
              YouTube
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgba(245,196,94,0.2)] text-sm text-white hover:border-[rgba(245,196,94,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              Spotify
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgba(245,196,94,0.2)] text-sm text-white hover:border-[rgba(245,196,94,0.5)] transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple Podcasts
            </a>
          </div>

          <p className="text-[#999999] text-[10px] mt-6 text-center">
            © 2026 After Hours. All rights reserved.
          </p>

        </div>
      </footer>
    </div>
  );
}

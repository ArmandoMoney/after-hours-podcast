import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const LOGO_URL = 'https://9tuqy0mn23.ufs.sh/f/Ck56V993keuOTsuJByNp3Mmv4ukxatX8qZAVOCbsfeQj0FW7';
const HERO_BG_URL = 'https://9tuqy0mn23.ufs.sh/f/Ck56V993keuOTODQtJNp3Mmv4ukxatX8qZAVOCbsfeQj0FW7';

const STATS = [
  { value: '296M+', label: 'MONTHLY IMPRESSIONS' },
  { value: '2,733+', label: 'EPISODES' },
  { value: '1.59M+', label: 'SUBSCRIBERS' },
  { value: '296M+', label: 'TOTAL VIEWS' },
];

const RANKINGS = [
  { rank: '#1 IN ENTERTAINMENT', platform: 'on YouTube Podcasts' },
  { rank: '#1 IN CULTURE', platform: 'on YouTube Podcasts' },
  { rank: '#1 IN LIFESTYLE', platform: 'on Apple Podcasts' },
  { rank: 'TOP 10 OVERALL', platform: 'on Spotify Trending' },
];

const PAST_GUESTS = [
  { name: 'Andrew Tate', title: 'Entrepreneur & Media Mogul', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8XRLJCeF5ETAmoahpBtgDk70FQLIz4YcweGRN' },
  { name: 'Rick Ross', title: 'Rapper & Business Mogul', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8EL3wfMK1WHkR9uCP63Fz1pZsXg82yJne0tSo' },
  { name: 'Kodak Black', title: 'Recording Artist', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8vHgNAlkTWtrxo2wiN5ZbaUcM1SmqfHvA04Gj' },
  { name: 'Ryan Garcia', title: 'World Champion Boxer', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8m9GBDIYDKvypVFONjSGeEAtJ5Tq6HIrhbgZB' },
  { name: 'Justin Waller', title: 'CEO & Entrepreneur', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8ZcxKB2AmWcPo1iXQNnteMGzHf09RkKgrT7DA' },
  { name: 'Hodge Twins', title: 'Comedians & Media Personalities', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8bVWr0BZv7fjr4IYNoyUlK9Fk0B21ZOWtXmsS' },
  { name: 'DJ Akademiks', title: 'Media Personality', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8uVAL9f3eXEvDacpVwUxYQ8rRbdP5lIgTsSjH' },
  { name: 'Rollo Tomassi', title: 'Author & Speaker', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8Sn8Voo4I2be9xqSiE0Zmj7wkuaHADtLX3sVg' },
  { name: 'Dom Lucre', title: 'Journalist & Creator', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8jwqhsdxiX8tkPaZf2dCEKNTxBwRS1L6JDIph' },
  { name: 'Rampage Jackson', title: 'UFC Champion & Actor', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8jR7OHSiX8tkPaZf2dCEKNTxBwRS1L6JDIphH' },
  { name: '6ix9ine', title: 'Recording Artist', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp83pU0BTg7Gdhf1azeqCUp8EvXgDO2x6ciFBIM' },
  { name: 'Fresh', title: 'After Hours Podcast Host', image: 'https://qcmkvxym51.ufs.sh/f/dwov31m0cIp8fxOFPV29ueOnvHw4VjFsmKyYbcNMo3QiJSLA' },
];

const BENEFITS = [
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    title: 'Massive Reach',
    description: 'Your brand is associated with one of the most-watched podcasts in the game. Millions of impressions across YouTube, Spotify, and Apple Podcasts.',
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    title: 'Exclusive Network',
    description: 'Your episode is the starting line, not the finish. Get lifetime access to a private mastermind of founders at the 7, 8, and 9-figure level for introductions, talent, and high-ticket clients.',
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    title: 'SEO Domination',
    description: 'With over 1M YouTube subscribers, your episode, title, and clips rank when people look you up. Prospects, investors, and recruits see a high-production, third-party feature.',
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>',
    title: 'Done-For-You Content Library',
    description: 'We professionally produce, edit, and deliver a full library of viral-style clips from your episode. Raw files and finished assets so your team can plug them straight into ads, email, and social.',
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    title: 'Turn 60 Minutes Into 12 Months of Demand',
    description: 'One recording turns into a full episode, a top-ranked Apple and Spotify placement, and multiple short-form clips. Your job is to show up for an hour. We handle the rest.',
  },
  {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    title: 'Skip the Waitlist',
    description: 'Organic guests wait months to get in the chair. As a sponsor, you skip the line entirely. Your episode is filmed, edited, and published within weeks.',
  },
];

const PACKAGES = [
  {
    name: 'Standard',
    price: '$12,500',
    popular: false,
    features: [
      'Full podcast episode on Spotify & Apple',
      'Your links + CTA featured in description',
      '3+ short-form clips (tagged + collaborator posts)',
      'Raw footage (repurpose anywhere)',
      'Access to private mastermind community',
      '2 IG story posts announcing the episode release',
      '"As seen on After Hours" badge for your site',
    ],
  },
  {
    name: 'Premium',
    price: '$15,000',
    popular: true,
    features: [
      'Everything in Standard, PLUS:',
      '1,000,000+ guaranteed views on short-form content',
      'Pre-show monetization strategy call with Fresh',
      'Full episode posted on YouTube (1M+ subscriber audience)',
      'SEO lift from high-authority channel',
      'Pro headshot + custom thumbnail + episode trailer',
      '5+ short-form clips',
      'Published within 21 days',
      'Access to exclusive founder mastermind chat',
      'Feature you/your business in the mastermind with a warm intro',
    ],
  },
];

const TESTIMONIALS = [
  { name: 'Coming Soon', title: 'Placeholder', },
  { name: 'Coming Soon', title: 'Placeholder', },
  { name: 'Coming Soon', title: 'Placeholder', },
  { name: 'Coming Soon', title: 'Placeholder', },
  { name: 'Coming Soon', title: 'Placeholder', },
  { name: 'Coming Soon', title: 'Placeholder', },
];

const FAQS = [
  { question: 'Where & when do you film?', answer: 'We film in our professional studio in Miami, FL. Recording sessions are scheduled Monday through Friday based on availability.' },
  { question: 'Do you ever film virtual episodes?', answer: 'We primarily film in-person for the highest production quality. Virtual episodes may be considered on a case-by-case basis for select guests.' },
  { question: 'How long is the episode?', answer: 'Episodes typically run 45-90 minutes depending on the conversation flow. We want to give you enough time to share your story fully.' },
  { question: 'Can I bring someone with me?', answer: 'Absolutely. You are welcome to bring a guest, business partner, or assistant to the recording session.' },
  { question: 'Will I receive a copy of my episode?', answer: 'Yes. You receive raw footage and all finished clips. You own full rights to repurpose the content for ads, social media, email, and your website.' },
  { question: 'Do I need to have a huge following to be considered?', answer: 'No. We look for founders, CEOs, and entrepreneurs with compelling stories and real business results — not follower counts.' },
  { question: 'Do I need to prepare my own talking points?', answer: 'We handle the prep. Our team sends you a pre-show guide and we work with you to identify the best angles for your episode.' },
  { question: 'Can I pay in installments?', answer: 'Yes, we offer flexible payment options. Reach out after submitting your application and we can discuss a plan that works for you.' },
  { question: 'What if I freeze up on camera?', answer: 'Our host is experienced at making guests feel comfortable. The conversation is relaxed and natural — not a formal interview. We also edit out any rough patches.' },
  { question: 'Do I own the content? Can I run it as ads?', answer: 'Yes. You receive raw files and finished assets with full rights to use them however you want — ads, social, email campaigns, your website, pitch decks.' },
  { question: 'Why pay when I can get on podcasts for free?', answer: 'Free podcasts give you an episode. We give you a content library, guaranteed distribution, SEO lift, and lifetime access to a vetted founder network. The ROI is in what happens after the episode.' },
  { question: 'How many leads will I get from this?', answer: 'Results depend on your offer and audience alignment, but our guests consistently report inbound leads, partnership opportunities, and deals sourced directly from their episode and the mastermind network.' },
  { question: 'What happens after I submit the application?', answer: 'Our team reviews your application within 48 hours. If it is a fit, we schedule a brief call to align on goals, then lock in your recording date.' },
];

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

export default function ApplyPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const handleApply = () => {
    window.location.href = '/application';
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">

      {/* TOP NAV */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <img src={LOGO_URL} alt="After Hours Podcast" className="h-12 sm:h-16 w-auto" />
          <a href="/" className="text-sm text-[#999999] hover:text-white transition-colors">
            &larr; Home
          </a>
        </div>
      </div>

      {/* HERO */}
      <section className="relative min-h-[70svh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={HERO_BG_URL} alt="After Hours studio" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.8)' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center py-12 max-w-5xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6 animate-fadeInUp">
            GET <span className="text-gradient-gold">1,000,000+</span> GUARANTEED VIEWS AND LIFETIME ACCESS TO A{' '}
            <span className="text-gradient-gold">FOUNDER MASTERMIND</span> IN ONE INTERVIEW
          </h1>
          <p className="text-[#999999] text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            For founders and CEOs who want authority, leads, and social proof without spending years building an audience.
          </p>
          <p className="text-[#F5C45E] text-sm sm:text-base font-semibold mb-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            We only film 4 sponsored guest episodes per month.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={handleApply}
              className="btn-gold inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            >
              APPLY IN 30 SECONDS
            </button>
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg border-2 border-[#F5C45E] text-white rounded-xl font-bold uppercase tracking-wider hover:bg-[rgba(245,196,94,0.1)] transition-all duration-300 w-full sm:w-auto"
            >
              VIEW PACKAGES
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative py-10 sm:py-16 border-y border-gold-glow bg-[#0A0A0A]/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl sm:text-4xl md:text-5xl text-gradient-gold"><AnimatedNumber value={stat.value} visible={statsVisible} /></p>
                <p className="text-[#999999] text-xs sm:text-sm uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RANKINGS */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
            {RANKINGS.map((r, i) => (
              <div
                key={r.rank}
                className="reveal rounded-2xl border border-gold-glow bg-[#0D0D0F] p-6 sm:p-8 text-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <p className="font-display text-2xl sm:text-3xl md:text-4xl text-gradient-gold">{r.rank}</p>
                <p className="text-[#999999] text-sm sm:text-base mt-2">{r.platform}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAST GUESTS */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(245,196,94,0.03)] via-transparent to-[rgba(232,212,139,0.03)]" />
        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-10 sm:mb-14">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              PAST <span className="text-gradient-gold">GUESTS</span>
            </h2>
            <p className="text-[#999999] text-base sm:text-lg">
              See who's already been on the show.
            </p>
          </div>
          <div className="reveal grid grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 max-w-5xl mx-auto" style={{ transitionDelay: '0.2s' }}>
            {PAST_GUESTS.map((guest) => (
              <div key={guest.name} className="text-center guest-hover">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-3 rounded-full overflow-hidden border-2 border-white/20">
                  <img src={guest.image} alt={guest.name} className="w-full h-full object-cover grayscale brightness-100" />
                </div>
                <p className="font-display text-xs sm:text-sm leading-tight">{guest.name}</p>
                <p className="text-[#999999] text-[10px] sm:text-xs italic">{guest.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SPONSOR THE SHOW */}
      <section className="py-16 sm:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-10 sm:mb-14">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              WHY <span className="text-gradient-gold">SPONSOR</span> THE SHOW
            </h2>
            <p className="text-[#999999] text-base sm:text-lg">
              Get more eyes on your brand and meet the right people.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {BENEFITS.map((b, i) => (
              <div key={b.title} className="reveal hover-lift rounded-2xl border border-gold-glow bg-[#0D0D0F] p-6 sm:p-8" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-[rgba(245,196,94,0.1)] flex items-center justify-center text-[#F5C45E] mb-5" dangerouslySetInnerHTML={{ __html: b.icon }} />
                <h3 className="font-display text-xl sm:text-2xl mb-3">{b.title}</h3>
                <p className="text-[#999999] text-sm sm:text-base leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MID-PAGE CTA */}
      <section className="reveal py-12 sm:py-16 text-center">
        <button
          onClick={handleApply}
          className="btn-gold inline-flex items-center justify-center gap-2 px-10 sm:px-14 py-4 sm:py-5 text-lg sm:text-xl"
        >
          APPLY IN 30 SECONDS
        </button>
      </section>

      {/* MASTERMIND COMMUNITY */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(245,196,94,0.03)] via-transparent to-[rgba(232,212,139,0.03)]" />
        <div className="reveal relative container mx-auto px-4 sm:px-6 text-center">
          <div className="text-[#F5C45E] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            PRIVATE <span className="text-gradient-gold">MASTERMIND CHATS</span>
          </h2>
          <p className="text-[#999999] text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Get exclusive access to our private communities filled with high-level entrepreneurs, creators, and past guests.
          </p>
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto" style={{ transitionDelay: '0.2s' }}>
            <div className="rounded-2xl border border-gold-glow bg-[#0D0D0F] p-6 sm:p-8 text-center">
              <p className="font-display text-xl sm:text-2xl mb-2">FOUNDER NETWORK</p>
              <p className="text-[#999999] text-sm">Connect with 7, 8, and 9-figure founders. Swap introductions, hire key talent, and source high-ticket clients.</p>
            </div>
            <div className="rounded-2xl border border-gold-glow bg-[#0D0D0F] p-6 sm:p-8 text-center">
              <p className="font-display text-xl sm:text-2xl mb-2">ALUMNI NETWORK</p>
              <p className="text-[#999999] text-sm">An exclusive gathering of past guests who share expertise, insights, and meaningful connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORSHIP PACKAGES */}
      <section id="packages" className="py-16 sm:py-24 border-t border-gold-glow">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-10 sm:mb-14">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              SPONSORSHIP <span className="text-gradient-gold">PACKAGES</span>
            </h2>
            <p className="text-[#999999] text-base sm:text-lg">
              Pick the package that fits your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PACKAGES.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`reveal hover-lift rounded-2xl border p-6 sm:p-8 flex flex-col ${
                  pkg.popular
                    ? 'border-[#F5C45E] bg-[#0D0D0F] shadow-[0_0_30px_rgba(245,196,94,0.15)]'
                    : 'border-gold-glow bg-[#0D0D0F]'
                }`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {pkg.popular && (
                  <div className="text-center mb-4">
                    <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[rgba(245,196,94,0.15)] text-[#F5C45E] border border-[#F5C45E]/30">
                      Most Popular
                    </span>
                  </div>
                )}
                <p className="font-display text-2xl sm:text-3xl mb-1">{pkg.name}</p>
                <p className="font-display text-4xl sm:text-5xl text-gradient-gold mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm sm:text-base text-[#CCCCCC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F5C45E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleApply}
                  className={`w-full py-3 sm:py-4 rounded-xl font-bold uppercase tracking-wider text-base sm:text-lg transition-all duration-300 ${
                    pkg.popular
                      ? 'btn-gold'
                      : 'border-2 border-[#F5C45E] text-white hover:bg-[rgba(245,196,94,0.1)]'
                  }`}
                >
                  APPLY NOW
                </button>
              </div>
            ))}
          </div>
          {/* PREMIUM GUARANTEE */}
          <div className="mt-8 text-center">
            <p className="inline-flex items-center gap-2 text-[#F5C45E] text-sm sm:text-base font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              PREMIUM GUARANTEE: If your clips don't hit 1,000,000+ total views, we keep distributing at no extra cost until they do.
            </p>
          </div>
        </div>
      </section>

      {/* GUEST TESTIMONIALS */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-10 sm:mb-14">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              GUEST <span className="text-gradient-gold">TESTIMONIALS</span>
            </h2>
            <p className="text-[#999999] text-base sm:text-lg">
              Hear what past guests have to say about their experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="reveal rounded-2xl border border-gold-glow bg-[#0D0D0F] overflow-hidden" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="aspect-video bg-[#111113] flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[rgba(245,196,94,0.9)] flex items-center justify-center shadow-[0_0_20px_rgba(245,196,94,0.4)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0A0A0A"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <p className="font-display text-sm sm:text-base">{t.name}</p>
                  <p className="text-[#999999] text-xs sm:text-sm">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 border-t border-gold-glow">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="reveal text-center mb-10 sm:mb-14">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              FREQUENTLY <span className="text-gradient-gold">ASKED</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-gold-glow bg-[#0D0D0F] overflow-hidden hover:border-[rgba(245,196,94,0.35)] transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left"
                >
                  <span className="text-sm sm:text-base font-medium pr-4">{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F5C45E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5">
                    <p className="text-[#999999] text-sm sm:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-24 text-center">
        <div className="reveal container mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            YOUR SEAT IS <span className="text-gradient-gold">WAITING</span>
          </h2>
          <p className="text-[#999999] text-base sm:text-lg mb-8">
            Apply today and be the next After Hours guest.
          </p>
          <button
            onClick={handleApply}
            className="btn-gold inline-flex items-center justify-center gap-2 px-10 sm:px-14 py-4 sm:py-5 text-lg sm:text-xl"
          >
            APPLY NOW
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-gold-glow">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <img src={LOGO_URL} alt="After Hours Podcast" className="h-14 sm:h-16 w-auto" />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              <a href="#" className="text-[#999999] hover:text-white transition-colors">YouTube</a>
              <a href="#" className="text-[#999999] hover:text-white transition-colors">Spotify</a>
              <a href="#" className="text-[#999999] hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-[#999999] hover:text-white transition-colors">X</a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              <a href="/privacy" className="text-[#999999] hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-[#999999] hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          <p className="text-[#666666] text-[9px] sm:text-[10px] mt-8 text-center leading-relaxed max-w-5xl mx-auto">
            *Results are not guaranteed. These observations are based solely on anecdotal reports from some podcast guests. We do not have access to or the ability to independently verify the business revenue or performance metrics of our guests. Actual outcomes will vary depending on numerous factors.
          </p>
          <p className="text-[#999999] text-[10px] mt-4 text-center">
            © 2026 After Hours. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}

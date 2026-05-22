interface SimpleLandingHeroProps {
  onApply: () => void;
}

export default function SimpleLandingHero({ onApply }: SimpleLandingHeroProps) {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] px-6">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://qcmkvxym51.ufs.sh/f/dwov31m0cIp82UZKkVuje8HKUVFmQABviX9nuTsJazGrcdLg"
          alt="CEO Media"
          className="h-16 md:h-20 object-contain rounded-2xl opacity-0 anim-logo"
        />

        <h1 className="mt-10 text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide leading-tight opacity-0 anim-heading">
          Your Brand. Amplified.
        </h1>

        <p className="mt-6 text-lg text-brand-muted max-w-[500px] leading-relaxed opacity-0 anim-subtext">
          CEO Media partners with industry leaders to scale personal brands, build digital empires, and unlock multi-million dollar growth.
        </p>

        <button
          onClick={onApply}
          className="mt-10 px-10 py-4 bg-white text-brand-bg font-semibold text-base rounded-card
                     transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
                     opacity-0 anim-button"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

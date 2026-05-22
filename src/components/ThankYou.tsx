interface ThankYouProps {
  onReturn: () => void;
}

export default function ThankYou({ onReturn }: ThankYouProps) {
  return (
    <div className="h-full overflow-hidden flex flex-col items-center justify-center px-6">
      <div className="max-w-[640px] w-full flex flex-col items-center text-center">
        <img
          src="https://qcmkvxym51.ufs.sh/f/dwov31m0cIp82UZKkVuje8HKUVFmQABviX9nuTsJazGrcdLg"
          alt="CEO Media"
          className="h-20 mb-12 object-contain rounded-xl opacity-0 anim-logo-fast"
        />

        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide opacity-0 anim-heading-fast">
          Application Received
        </h1>

        <p className="mt-6 text-lg text-brand-body leading-relaxed max-w-[480px] opacity-0 anim-subtext-fast">
          Thank you for your interest in CEO Media. Our team will review your
          information and reach out to you shortly.
        </p>

        <button
          onClick={onReturn}
          className="mt-12 px-8 py-3.5 border border-brand-border rounded-card text-brand-body
                     text-sm font-medium transition-all duration-200 hover:border-white/40 hover:text-white
                     opacity-0 anim-button-fast"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center gap-3 mb-10">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-white text-brand-bg'
                  : isCompleted
                    ? 'bg-white/20 text-white'
                    : 'bg-brand-border text-brand-muted'
              }`}
            >
              {step}
            </div>
            {step < totalSteps && (
              <div
                className={`w-8 sm:w-12 h-px transition-colors duration-300 ${
                  isCompleted ? 'bg-white/40' : 'bg-brand-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

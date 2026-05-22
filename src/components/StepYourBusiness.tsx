const REVENUE_OPTIONS = [
  'Under $100K',
  '$100K – $500K',
  '$500K – $1M',
  '$1M – $5M',
  '$5M – $10M',
  '$10M+',
];

const CONTENT_OPTIONS = [
  'Yes, regularly',
  'Sometimes',
  'No, but I\'m interested in starting',
  'No',
];

interface StepYourBusinessProps {
  annualRevenue: string;
  productService: string;
  createsContent: string;
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function StepYourBusiness({
  annualRevenue,
  productService,
  createsContent,
  onChange,
  errors,
}: StepYourBusinessProps) {
  return (
    <div className="slide-up">
      <h2 className="text-2xl font-semibold text-white tracking-wide mb-2">Your Business</h2>
      <p className="text-brand-muted mb-8">Help us understand your current situation.</p>

      <div className="space-y-6">
        <div>
          <label htmlFor="annualRevenue" className="block text-sm font-medium text-brand-body mb-2">
            Annual Revenue
          </label>
          <select
            id="annualRevenue"
            value={annualRevenue}
            onChange={(e) => onChange('annualRevenue', e.target.value)}
            className="w-full px-4 py-3.5 bg-brand-input border border-brand-border rounded-card text-white
                       appearance-none focus:outline-none focus:ring-2 focus:ring-white/20
                       focus:border-transparent transition-all duration-200"
          >
            <option value="" disabled className="text-brand-muted">
              Select your annual revenue
            </option>
            {REVENUE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-brand-input">
                {opt}
              </option>
            ))}
          </select>
          {errors.annualRevenue && <p className="mt-2 text-sm text-red-400">{errors.annualRevenue}</p>}
        </div>

        <div>
          <label htmlFor="productService" className="block text-sm font-medium text-brand-body mb-2">
            Product or Service
          </label>
          <input
            id="productService"
            type="text"
            value={productService}
            onChange={(e) => onChange('productService', e.target.value)}
            placeholder="What product or service does your business offer?"
            className="w-full px-4 py-3.5 bg-brand-input border border-brand-border rounded-card text-white
                       placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-white/20
                       focus:border-transparent transition-all duration-200"
          />
          {errors.productService && <p className="mt-2 text-sm text-red-400">{errors.productService}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-body mb-3">
            Do you create content?
          </label>
          <div className="space-y-2">
            {CONTENT_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange('createsContent', opt)}
                className={`w-full text-left px-4 py-3.5 rounded-card border transition-all duration-200 ${
                  createsContent === opt
                    ? 'border-white/40 bg-white/5 text-white'
                    : 'border-brand-border bg-brand-input text-brand-body hover:border-white/20'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {errors.createsContent && <p className="mt-2 text-sm text-red-400">{errors.createsContent}</p>}
        </div>
      </div>
    </div>
  );
}

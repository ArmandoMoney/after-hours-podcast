function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return '(' + digits;
  if (digits.length <= 6) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
  return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
}

interface StepAboutYouProps {
  fullName: string;
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function StepAboutYou({ fullName, email, phone, onChange, errors }: StepAboutYouProps) {
  return (
    <div className="slide-up">
      <h2 className="text-2xl font-semibold text-white tracking-wide mb-2">About You</h2>
      <p className="text-brand-muted mb-8">Tell us who you are.</p>

      <div className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-brand-body mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            placeholder="John Smith"
            className="w-full px-4 py-3.5 bg-brand-input border border-brand-border rounded-card text-white
                       placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-white/20
                       focus:border-transparent transition-all duration-200"
          />
          {errors.fullName && <p className="mt-2 text-sm text-red-400">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-body mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="john@company.com"
            className="w-full px-4 py-3.5 bg-brand-input border border-brand-border rounded-card text-white
                       placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-white/20
                       focus:border-transparent transition-all duration-200"
          />
          {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-body mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => onChange('phone', formatPhone(e.target.value))}
            maxLength={14}
            placeholder="(555) 555-5555"
            className="w-full px-4 py-3.5 bg-brand-input border border-brand-border rounded-card text-white
                       placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-white/20
                       focus:border-transparent transition-all duration-200"
          />
          {errors.phone && <p className="mt-2 text-sm text-red-400">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
}

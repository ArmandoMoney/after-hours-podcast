interface StepYourSocialsProps {
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  otherSocial: string;
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

const FIELDS = [
  { id: 'instagram', label: 'Instagram', placeholder: '@username' },
  { id: 'twitter', label: 'X / Twitter', placeholder: '@username' },
  { id: 'tiktok', label: 'TikTok', placeholder: '@username' },
  { id: 'youtube', label: 'YouTube', placeholder: 'Channel name or URL' },
  { id: 'linkedin', label: 'LinkedIn', placeholder: 'Profile URL' },
  { id: 'otherSocial', label: 'Other', placeholder: 'Any other platform or link' },
] as const;

export default function StepYourSocials({
  instagram,
  twitter,
  tiktok,
  youtube,
  linkedin,
  otherSocial,
  onChange,
  errors,
}: StepYourSocialsProps) {
  const values: Record<string, string> = { instagram, twitter, tiktok, youtube, linkedin, otherSocial };

  return (
    <div className="slide-up">
      <h2 className="text-2xl font-semibold text-white tracking-wide mb-2">Your Socials</h2>
      <p className="text-brand-muted mb-8">Share your online presence. Please fill in at least one.</p>
      {errors?.socials && <p className="text-sm text-red-400 mb-6">{errors.socials}</p>}

      <div className="space-y-5">
        {FIELDS.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-brand-body mb-2">
              {field.label}
            </label>
            <input
              id={field.id}
              type="text"
              value={values[field.id]}
              onChange={(e) => onChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-4 py-3.5 bg-brand-input border border-brand-border rounded-card text-white
                         placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-white/20
                         focus:border-transparent transition-all duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

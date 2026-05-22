import { useState } from 'react';
import { supabase } from '../lib/supabase';

const LOGO_URL = 'https://9tuqy0mn23.ufs.sh/f/Ck56V993keuOTsuJByNp3Mmv4ukxatX8qZAVOCbsfeQj0FW7';

const STANDARD_FEATURES = [
  'Full podcast episode on Spotify & Apple',
  'Your links + CTA featured in description',
  '3+ short-form clips (tagged + collaborator posts)',
  'Raw footage (repurpose anywhere)',
  'Access to private mastermind community',
  '2 IG story posts announcing the episode release',
  '"As seen on After Hours" badge for your site',
];

const PREMIUM_FEATURES = [
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
];

export default function ApplicationPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    business_name: '',
    package_interest: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return '(' + digits;
    if (digits.length <= 6) return '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
    return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));
  };

  const selectPackage = (pkg: string) => {
    setFormData((prev) => ({ ...prev, package_interest: pkg }));
  };

  const handleSubmit = async () => {
    setError('');
    if (!formData.full_name.trim()) { setError('Full Name is required.'); return; }
    if (!formData.email.trim() || !formData.email.includes('@')) { setError('Valid email is required.'); return; }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) { setError('Valid 10-digit phone number is required.'); return; }
    if (!formData.business_name.trim()) { setError('Business / Brand Name is required.'); return; }
    if (!formData.package_interest) { setError('Please select a package.'); return; }
    if (!formData.consent) { setError('You must agree to the consent terms.'); return; }

    setSubmitting(true);
    try {
      const { error: dbError } = await supabase.from('applications').insert([{
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        business_name: formData.business_name.trim(),
        package_interest: formData.package_interest,
        consent: formData.consent,
      }]);
      if (dbError) throw dbError;
      // Send to n8n webhook
      try {
        await fetch('https://mgxossarmy.app.n8n.cloud/webhook/after-hours-podcast-submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            full_name: formData.full_name.trim(),
            email: formData.email.trim(),
            phone: formData.phone,
            business_name: formData.business_name.trim(),
            package_interest: formData.package_interest,
          }),
        });
      } catch (webhookErr) {
        // Webhook failure shouldn't block submission
        console.warn('Webhook notification failed:', webhookErr);
      }
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <img src={LOGO_URL} alt="After Hours Podcast" className="h-16 w-auto mx-auto mb-6" />
          <h1 className="font-display text-4xl sm:text-5xl mb-4">APPLICATION <span className="text-gradient-gold">RECEIVED</span></h1>
          <p className="text-[#999999] text-base sm:text-lg mb-8">Thank you for applying! Our team will review your application and get back to you within 48 hours.</p>
          <a href="/" className="btn-gold inline-flex items-center justify-center gap-2 px-8 py-3 text-base">BACK TO HOME</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white relative">
      <div className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <a href="/apply" className="text-sm text-[#999999] hover:text-white transition-colors">
            &larr; Back
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pb-20 max-w-2xl">

        <div className="text-center mb-10">
          <img src={LOGO_URL} alt="After Hours Podcast" className="h-12 sm:h-16 w-auto mx-auto mb-6" />
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            PODCAST <span className="text-gradient-gold">APPLICATION FORM</span>
          </h1>
        </div>

        <div className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-2">Full Name <span className="text-[#F5C45E]">*</span></label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#F5C45E]/50 focus:shadow-[0_0_10px_rgba(245,196,94,0.1)] transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email <span className="text-[#F5C45E]">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#F5C45E]/50 focus:shadow-[0_0_10px_rgba(245,196,94,0.1)] transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number <span className="text-[#F5C45E]">*</span></label>
            <input type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange} placeholder="(555) 000-0000" maxLength={14} className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#F5C45E]/50 focus:shadow-[0_0_10px_rgba(245,196,94,0.1)] transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Business / Brand Name <span className="text-[#F5C45E]">*</span></label>
            <input type="text" name="business_name" value={formData.business_name} onChange={handleChange} placeholder="Your company or brand" className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[#2A2A2A] text-white placeholder-[#666] focus:outline-none focus:border-[#F5C45E]/50 focus:shadow-[0_0_10px_rgba(245,196,94,0.1)] transition-all" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-4">Package Interest <span className="text-[#F5C45E]">*</span></label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <button type="button" onClick={() => selectPackage('standard')} className={`text-left rounded-2xl border p-5 transition-all duration-300 ${formData.package_interest === 'standard' ? 'border-[#F5C45E] shadow-[0_0_20px_rgba(245,196,94,0.2)]' : 'border-[rgba(245,196,94,0.15)] hover:border-[rgba(245,196,94,0.3)]'} bg-[#0D0D0F]`}>
                <p className="font-display text-xl mb-1">STANDARD</p>
                <p className="font-display text-2xl text-gradient-gold mb-4">$12,500</p>
                <ul className="space-y-2">
                  {STANDARD_FEATURES.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5C45E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>

              <div className="relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[rgba(245,196,94,0.15)] text-[#F5C45E] border border-[#F5C45E]/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    MOST POPULAR
                  </span>
                </div>
                <button type="button" onClick={() => selectPackage('premium')} className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 ${formData.package_interest === 'premium' ? 'border-[#F5C45E] shadow-[0_0_20px_rgba(245,196,94,0.2)]' : 'border-[rgba(245,196,94,0.15)] hover:border-[rgba(245,196,94,0.3)]'} bg-[#0D0D0F]`}>
                  <p className="font-display text-xl mb-1">PREMIUM</p>
                  <p className="font-display text-2xl text-gradient-gold mb-4">$15,000</p>
                  <ul className="space-y-2">
                    {PREMIUM_FEATURES.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5C45E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              </div>

            </div>
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-1 w-5 h-5 rounded border-[#2A2A2A] bg-[#141414] accent-[#F5C45E] shrink-0" />
            <label className="text-xs text-[#999999] leading-relaxed">
              By checking this box, I provide my express written consent for After Hours and its affiliates to contact me via phone calls (including autodialed and pre-recorded calls), text messages (SMS/MMS), and email at the phone number and email address provided above, regarding my application and related services. I understand that my consent is not a condition of any purchase. Message and data rates may apply. Message frequency varies. I can opt out at any time by replying STOP to text messages or contacting us directly. I have read and agree to the <a href="/privacy" className="text-[#F5C45E] underline">Privacy Policy</a> and <a href="#" className="text-[#F5C45E] underline">Terms of Service</a>.
            </label>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button onClick={handleSubmit} disabled={submitting} className="btn-gold w-full py-4 text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            {submitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
          </button>

          <div className="text-center pt-4">
            <p className="inline-flex items-center gap-2 text-[#F5C45E] text-xs sm:text-sm font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              PREMIUM GUARANTEE: If your clips don't hit 1,000,000+ total views, we keep distributing at no extra cost until they do.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

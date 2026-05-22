import { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProgressIndicator from './ProgressIndicator';
import StepAboutYou from './StepAboutYou';
import StepYourBusiness from './StepYourBusiness';
import StepYourSocials from './StepYourSocials';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  annualRevenue: string;
  productService: string;
  createsContent: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  otherSocial: string;
}

const INITIAL_DATA: FormData = {
  fullName: '',
  email: '',
  phone: '',
  annualRevenue: '',
  productService: '',
  createsContent: '',
  instagram: '',
  twitter: '',
  tiktok: '',
  youtube: '',
  linkedin: '',
  otherSocial: '',
};

interface QuestionnaireProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function Questionnaire({ onComplete, onBack }: QuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [step]);

  function handleChange(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validateStep1(): boolean {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits) errs.phone = 'Phone number is required.';
    else if (phoneDigits.length < 10) errs.phone = 'Please enter a complete 10-digit phone number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2(): boolean {
    const errs: Record<string, string> = {};
    if (!formData.annualRevenue) errs.annualRevenue = 'Please select your annual revenue.';
    if (!formData.productService.trim()) errs.productService = 'This field is required.';
    if (!formData.createsContent) errs.createsContent = 'Please select an option.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep3(): boolean {
    const socials = [
      formData.instagram,
      formData.twitter,
      formData.tiktok,
      formData.youtube,
      formData.linkedin,
      formData.otherSocial,
    ];
    if (!socials.some((v) => v.trim())) {
      setErrors({ socials: 'Please provide at least one social media profile.' });
      return false;
    }
    setErrors({});
    return true;
  }

  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  async function handleSubmit() {
    if (!validateStep3()) return;
    setSubmitting(true);
    setSubmitError('');

    const { error } = await supabase.from('submissions').insert({
      full_name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      annual_revenue: formData.annualRevenue,
      product_service: formData.productService.trim(),
      creates_content: formData.createsContent,
      instagram: formData.instagram.trim() || null,
      twitter: formData.twitter.trim() || null,
      tiktok: formData.tiktok.trim() || null,
      youtube: formData.youtube.trim() || null,
      linkedin: formData.linkedin.trim() || null,
      other_social: formData.otherSocial.trim() || null,
    });

    setSubmitting(false);

    if (error) {
      setSubmitError('Something went wrong. Please try again.');
      return;
    }

    fetch('https://mgxossarmy.app.n8n.cloud/webhook/ceomedia-submission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        annual_revenue: formData.annualRevenue,
        product_service: formData.productService.trim(),
        creates_content: formData.createsContent,
        instagram: formData.instagram.trim() || null,
        twitter: formData.twitter.trim() || null,
        tiktok: formData.tiktok.trim() || null,
        youtube: formData.youtube.trim() || null,
        linkedin: formData.linkedin.trim() || null,
        other_social: formData.otherSocial.trim() || null,
      }),
    }).catch(() => {});

    onComplete();
  }

  return (
    <div ref={scrollRef} className="relative h-full overflow-y-auto flex flex-col items-center px-6 py-12 md:py-20 fade-in">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-brand-muted hover:text-white transition-colors duration-200 z-10"
        aria-label="Back to home"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>
      <div className="w-full max-w-[640px]">
        <img
          src="https://qcmkvxym51.ufs.sh/f/dwov31m0cIp82UZKkVuje8HKUVFmQABviX9nuTsJazGrcdLg"
          alt="CEO Media"
          className="h-14 mb-10 mt-12 object-contain rounded-xl opacity-70"
        />

        <ProgressIndicator currentStep={step} totalSteps={3} />

        {step === 1 && (
          <StepAboutYou
            fullName={formData.fullName}
            email={formData.email}
            phone={formData.phone}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {step === 2 && (
          <StepYourBusiness
            annualRevenue={formData.annualRevenue}
            productService={formData.productService}
            createsContent={formData.createsContent}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {step === 3 && (
          <StepYourSocials
            instagram={formData.instagram}
            twitter={formData.twitter}
            tiktok={formData.tiktok}
            youtube={formData.youtube}
            linkedin={formData.linkedin}
            otherSocial={formData.otherSocial}
            onChange={handleChange}
            errors={errors}
          />
        )}

        {submitError && (
          <p className="mt-4 text-sm text-red-400">{submitError}</p>
        )}

        <div className="flex items-center gap-4 mt-10">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3.5 border border-brand-border rounded-card text-brand-body text-sm
                         font-medium transition-all duration-200 hover:border-white/40 hover:text-white"
            >
              Back
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3.5 bg-white text-brand-bg font-semibold text-sm rounded-card
                         transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
                         ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3.5 bg-white text-brand-bg font-semibold text-sm rounded-card
                         transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

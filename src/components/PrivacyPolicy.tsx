import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white fade-in">
      <div className="max-w-[800px] mx-auto px-6 py-16 md:py-24">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-3 mb-16">
          <img
            src="https://9tuqy0mn23.ufs.sh/f/Ck56V993keuOTsuJByNp3Mmv4ukxatX8qZAVOCbsfeQj0FW7"
            alt="After Hours Podcast"
            className="h-12"
          />
          <span className="text-base font-medium text-gradient-gold">After Hours Podcast</span>
        </button>

        <h1 className="font-display text-3xl md:text-4xl text-white mb-2">PRIVACY <span className="text-gradient-gold">POLICY</span></h1>
        <p className="text-sm text-[#999999] mb-12">Last updated: May 2026</p>

        <div className="space-y-0">
          <Section title="Introduction">
            After Hours Podcast ("we," "us," or "our") operates the After Hours Podcast website and
            related services. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or submit an application through our
            intake form. By using our site, you consent to the practices described in this policy.
          </Section>

          <Section title="Information We Collect">
            When you submit an application through our guest application form, we collect the
            following information: your full name, email address, phone number, business or brand
            name, package interest selection, and TCPA consent acknowledgment. We do not collect
            payment information through our website.
          </Section>

          <Section title="How We Use Your Information">
            We use the information you provide to: evaluate your application for a guest appearance
            on After Hours Podcast, contact you regarding your submission, coordinate episode
            scheduling and production logistics, and improve our services and website experience. We
            do not sell, trade, or rent your personal information to third parties.
          </Section>

          <Section title="Data Storage & Security">
            Your submission data is stored securely in our database with industry-standard security
            measures. We implement appropriate technical and organizational safeguards to protect
            your personal information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </Section>

          <Section title="Third-Party Services">
            We may use third-party services to process and manage your data, including database
            hosting providers and workflow automation tools. These services are bound by their own
            privacy policies and are selected for their security standards. We do not share your
            information with third parties for their direct marketing purposes.
          </Section>

          <Section title="Cookies & Tracking">
            Our website does not currently use cookies or tracking technologies. We do not use
            analytics platforms or advertising pixels. This policy will be updated if tracking
            technologies are added in the future.
          </Section>

          <Section title="Your Rights">
            You have the right to: request access to the personal information we hold about you,
            request correction or deletion of your personal information, withdraw consent for us to
            process your data, and request that we restrict processing of your personal information.
            To exercise any of these rights, contact us through the channels below.
          </Section>

          <Section title="Data Retention">
            We retain your personal information for as long as necessary to fulfill the purposes
            outlined in this policy, unless a longer retention period is required or permitted by
            law. You may request deletion of your data at any time.
          </Section>

          <Section title="Children's Privacy">
            Our services are not directed to individuals under the age of 18. We do not knowingly
            collect personal information from children. If you believe we have collected information
            from a minor, please contact us immediately.
          </Section>

          <Section title="Changes to This Policy">
            We may update this Privacy Policy from time to time. Any changes will be reflected on
            this page with an updated "Last updated" date. We encourage you to review this policy
            periodically.
          </Section>

          <Section title="Contact Us">
            If you have questions or concerns about this Privacy Policy or our data practices,
            you can reach us through our social channels:
          </Section>
          <div className="flex flex-wrap gap-4 mt-3">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#F5C45E] hover:text-white transition-colors duration-200 text-sm">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#F5C45E] hover:text-white transition-colors duration-200 text-sm">YouTube</a>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="text-sm text-[#999999] hover:text-white transition-colors duration-200 mt-16 inline-flex items-center gap-1">
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-white mb-3 mt-10">{title}</h2>
      <p className="text-[#E5E5E5] leading-relaxed text-sm md:text-base">{children}</p>
    </div>
  );
}

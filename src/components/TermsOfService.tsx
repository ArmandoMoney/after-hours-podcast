import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
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

        <h1 className="font-display text-3xl md:text-4xl text-white mb-2">TERMS OF <span className="text-gradient-gold">SERVICE</span></h1>
        <p className="text-sm text-[#999999] mb-12">Last updated: May 2026</p>

        <div className="space-y-0">
          <Section title="Agreement to Terms">
            By accessing or using the After Hours Podcast website, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not use our website or
            services.
          </Section>

          <Section title="Use of Website">
            This website is provided for informational purposes and to facilitate guest applications
            for the After Hours Podcast. You agree to use the website only for lawful purposes and
            in a manner that does not infringe upon the rights of others.
          </Section>

          <Section title="Application Process">
            Submitting an application does not guarantee a podcast appearance. After Hours Podcast
            reserves the right to accept or decline any application at its sole discretion. Package
            pricing is subject to change without prior notice.
          </Section>

          <Section title="Intellectual Property">
            All content, logos, branding, graphics, and materials on this website are the property
            of After Hours Podcast and are protected by applicable intellectual property laws. You
            may not reproduce, distribute, or create derivative works without prior written consent.
          </Section>

          <Section title="User Content">
            By submitting an application, you grant After Hours Podcast the right to use your
            provided information for evaluation purposes. You represent that the information you
            provide is accurate and that you have the authority to share it.
          </Section>

          <Section title="Payment Terms">
            Package fees are discussed during the application review process. All payments are
            subject to separate agreements between you and After Hours Podcast. Specific payment
            terms, refund policies, and scheduling details will be outlined in those agreements.
          </Section>

          <Section title="Limitation of Liability">
            After Hours Podcast is not liable for any indirect, incidental, special, or
            consequential damages arising from your use of the website or services. Our total
            liability shall not exceed the amount paid by you for the specific service in question.
          </Section>

          <Section title="Governing Law">
            These Terms of Service are governed by and construed in accordance with the laws of the
            State of Florida, without regard to its conflict of law provisions. Any disputes arising
            from these terms shall be resolved in the courts of Florida.
          </Section>

          <Section title="Changes to Terms">
            We reserve the right to update or modify these Terms of Service at any time. Changes
            will be effective immediately upon posting to this page. Your continued use of the
            website after changes are posted constitutes acceptance of the revised terms.
          </Section>

          <Section title="Contact">
            If you have questions about these Terms of Service, you can reach us through our social
            channels:
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

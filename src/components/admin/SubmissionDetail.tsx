import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Submission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  business_name: string;
  package_interest: string;
  consent: boolean;
  submitted_at: string;
  status: string;
}

interface SubmissionDetailProps {
  submission: Submission;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

const STATUS_OPTIONS = ['new', 'contacted', 'not_interested'];
const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  not_interested: 'Not Interested',
};

const PACKAGE_LABELS: Record<string, string> = {
  standard: 'Standard - $12,500',
  premium: 'Premium - $15,000',
};

export default function SubmissionDetail({ submission, onStatusChange, onDelete }: SubmissionDetailProps) {
  const [copiedField, setCopiedField] = useState('');
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  async function copyToClipboard(value: string, field: string) {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  }

  async function handleStatusChange(newStatus: string) {
    await supabase.from('applications').update({ status: newStatus }).eq('id', submission.id);
    onStatusChange(submission.id, newStatus);
  }

  const formattedDate = new Date(submission.submitted_at).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className="bg-[#0F0F0F] border-t border-[#2A2A2A] px-6 py-5 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Full Name</p>
          <div className="flex items-center gap-2">
            <p className="text-white">{submission.full_name}</p>
            <button
              onClick={() => copyToClipboard(submission.full_name, 'name')}
              className="text-xs px-2 py-1 rounded-lg border border-[#2A2A2A] text-[#999999]
                         hover:text-white hover:border-white/30 transition-colors"
            >
              {copiedField === 'name' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Email</p>
          <div className="flex items-center gap-2">
            <p className="text-white">{submission.email}</p>
            <button
              onClick={() => copyToClipboard(submission.email, 'email')}
              className="text-xs px-2 py-1 rounded-lg border border-[#2A2A2A] text-[#999999]
                         hover:text-white hover:border-white/30 transition-colors"
            >
              {copiedField === 'email' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Phone</p>
          <div className="flex items-center gap-2">
            <p className="text-white">{submission.phone}</p>
            <button
              onClick={() => copyToClipboard(submission.phone, 'phone')}
              className="text-xs px-2 py-1 rounded-lg border border-[#2A2A2A] text-[#999999]
                         hover:text-white hover:border-white/30 transition-colors"
            >
              {copiedField === 'phone' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Business / Brand Name</p>
          <p className="text-white">{submission.business_name}</p>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Package Interest</p>
          <p className="text-white">{PACKAGE_LABELS[submission.package_interest] || submission.package_interest}</p>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Consent</p>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${submission.consent ? 'bg-green-400' : 'bg-red-400'}`} />
            <p className="text-white">{submission.consent ? 'Yes' : 'No'}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Status</p>
          <select
            value={submission.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-[#141414] border border-[#2A2A2A] rounded-lg px-3 py-1.5 text-white text-sm
                       focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Submitted</p>
        <p className="text-white text-sm">{formattedDate}</p>
      </div>

      <div className="pt-2">
        {!confirmingDelete ? (
          <button
            onClick={() => setConfirmingDelete(true)}
            className="text-sm px-4 py-2 rounded-lg border border-red-500/20 text-red-400
                       hover:border-red-500/40 hover:bg-red-500/5 transition-colors"
          >
            Delete Application
          </button>
        ) : (
          <div className="space-y-3 transition-opacity duration-200">
            <p className="text-sm text-red-400">Permanently delete this application?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmingDelete(false)}
                className="text-sm px-4 py-2 rounded-lg border border-[#2A2A2A] text-[#999999]
                           hover:text-white hover:border-white/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(submission.id)}
                className="text-sm px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400
                           hover:bg-red-500/20 hover:border-red-500/50 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

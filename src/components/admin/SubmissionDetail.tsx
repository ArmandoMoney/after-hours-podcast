import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Submission {
  id: string;
  full_name: string;
  email: string;
  annual_revenue: string;
  product_service: string;
  creates_content: string;
  instagram: string | null;
  twitter: string | null;
  tiktok: string | null;
  youtube: string | null;
  linkedin: string | null;
  other_social: string | null;
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

function buildSocialUrl(platform: string, value: string): string {
  const cleaned = value.trim();
  if (platform === 'instagram') return `https://instagram.com/${cleaned.replace(/^@/, '')}`;
  if (platform === 'twitter') return `https://x.com/${cleaned.replace(/^@/, '')}`;
  if (platform === 'tiktok') return `https://tiktok.com/@${cleaned.replace(/^@/, '')}`;
  if (platform === 'youtube') {
    return cleaned.startsWith('http') ? cleaned : `https://youtube.com/${cleaned}`;
  }
  if (platform === 'linkedin') return cleaned.startsWith('http') ? cleaned : `https://linkedin.com/in/${cleaned}`;
  return cleaned.startsWith('http') ? cleaned : `https://${cleaned}`;
}

export default function SubmissionDetail({ submission, onStatusChange, onDelete }: SubmissionDetailProps) {
  const [copied, setCopied] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(submission.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleStatusChange(newStatus: string) {
    await supabase.from('submissions').update({ status: newStatus }).eq('id', submission.id);
    onStatusChange(submission.id, newStatus);
  }

  const socials = [
    { platform: 'instagram', label: 'Instagram', value: submission.instagram },
    { platform: 'twitter', label: 'X / Twitter', value: submission.twitter },
    { platform: 'tiktok', label: 'TikTok', value: submission.tiktok },
    { platform: 'youtube', label: 'YouTube', value: submission.youtube },
    { platform: 'linkedin', label: 'LinkedIn', value: submission.linkedin },
    { platform: 'other', label: 'Other', value: submission.other_social },
  ].filter((s) => s.value);

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
          <p className="text-white">{submission.full_name}</p>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Email</p>
          <div className="flex items-center gap-2">
            <p className="text-white">{submission.email}</p>
            <button
              onClick={copyEmail}
              className="text-xs px-2 py-1 rounded-lg border border-[#2A2A2A] text-[#999999]
                         hover:text-white hover:border-white/30 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Annual Revenue</p>
          <p className="text-white">{submission.annual_revenue}</p>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Product / Service</p>
          <p className="text-white">{submission.product_service}</p>
        </div>
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-1">Creates Content</p>
          <p className="text-white">{submission.creates_content}</p>
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

      {socials.length > 0 && (
        <div>
          <p className="text-xs text-[#999999] uppercase tracking-wider mb-2">Social Links</p>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={buildSocialUrl(s.platform, s.value!)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-3 py-1.5 rounded-lg border border-[#2A2A2A] text-[#E5E5E5]
                           hover:text-white hover:border-white/30 transition-colors"
              >
                {s.label}: {s.value}
              </a>
            ))}
          </div>
        </div>
      )}

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
            Delete Submission
          </button>
        ) : (
          <div className="space-y-3 transition-opacity duration-200">
            <p className="text-sm text-red-400">Permanently delete this submission?</p>
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

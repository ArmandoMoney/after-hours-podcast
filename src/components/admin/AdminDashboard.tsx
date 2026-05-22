import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import StatsBar from './StatsBar';
import SubmissionDetail from './SubmissionDetail';

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

interface AdminDashboardProps {
  onSignOut: () => void;
}

type SortField = 'full_name' | 'annual_revenue' | 'submitted_at' | 'status';
type SortDir = 'asc' | 'desc';

const REVENUE_OPTIONS = [
  'Under $100K',
  '$100K \u2013 $500K',
  '$500K \u2013 $1M',
  '$1M \u2013 $5M',
  '$5M \u2013 $10M',
  '$10M+',
];

const CONTENT_OPTIONS = [
  'Yes, regularly',
  'Sometimes',
  "No, but I'm interested in starting",
  'No',
];

const STATUS_OPTIONS = ['new', 'contacted', 'not_interested'];
const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  contacted: 'Contacted',
  not_interested: 'Not Interested',
};

const PAGE_SIZE = 20;

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function StatusBadge({ status, onClick }: { status: string; onClick: () => void }) {
  const colors: Record<string, string> = {
    new: 'border-white/30 text-white bg-white/5',
    contacted: 'border-green-500/30 text-green-400 bg-green-500/5',
    not_interested: 'border-[#2A2A2A] text-[#666666] bg-[#141414]',
  };

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors hover:opacity-80 ${colors[status] || colors.new}`}
    >
      {STATUS_LABELS[status] || status}
    </button>
  );
}

export default function AdminDashboard({ onSignOut }: AdminDashboardProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, not_interested: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [revenueFilter, setRevenueFilter] = useState('');
  const [contentFilter, setContentFilter] = useState('');
  const [sortField, setSortField] = useState<SortField>('submitted_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const fetchStats = useCallback(async () => {
    const { count: total } = await supabase.from('submissions').select('*', { count: 'exact', head: true });
    const { count: newC } = await supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'new');
    const { count: contactedC } = await supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'contacted');
    const { count: notIntC } = await supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'not_interested');
    setStats({ total: total || 0, new: newC || 0, contacted: contactedC || 0, not_interested: notIntC || 0 });
  }, []);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('submissions').select('*', { count: 'exact' });

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }
    if (statusFilter) query = query.eq('status', statusFilter);
    if (revenueFilter) query = query.eq('annual_revenue', revenueFilter);
    if (contentFilter) query = query.eq('creates_content', contentFilter);

    query = query.order(sortField, { ascending: sortDir === 'asc' });

    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);

    const { data, count } = await query;
    setSubmissions(data || []);
    setTotalCount(count || 0);
    setLoading(false);
  }, [search, statusFilter, revenueFilter, contentFilter, sortField, sortDir, page]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  useEffect(() => {
    const channel = supabase
      .channel('submissions-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'submissions' }, () => {
        fetchSubmissions();
        fetchStats();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [fetchSubmissions, fetchStats]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSubmissions();
      fetchStats();
    }, 15000);
    return () => clearInterval(interval);
  }, [fetchSubmissions, fetchStats]);

  function handleSearchChange(value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(value);
      setPage(0);
    }, 300);
  }

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(0);
  }

  function cycleStatus(submission: Submission) {
    const currentIdx = STATUS_OPTIONS.indexOf(submission.status);
    const nextStatus = STATUS_OPTIONS[(currentIdx + 1) % STATUS_OPTIONS.length];
    handleStatusChange(submission.id, nextStatus);
  }

  async function handleStatusChange(id: string, newStatus: string) {
    await supabase.from('submissions').update({ status: newStatus }).eq('id', id);
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    fetchStats();
  }

  async function handleDelete(id: string) {
    await supabase.from('submissions').delete().eq('id', id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    setExpandedId(null);
    fetchStats();
  }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  function SortArrow({ field }: { field: SortField }) {
    if (sortField !== field) return null;
    return <span className="ml-1 text-white/60">{sortDir === 'asc' ? '\u2191' : '\u2193'}</span>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="border-b border-[#2A2A2A] px-4 md:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://qcmkvxym51.ufs.sh/f/dwov31m0cIp82UZKkVuje8HKUVFmQABviX9nuTsJazGrcdLg"
              alt="CEO Media"
              className="h-14 rounded-xl object-contain"
            />
            <h1 className="text-xl font-semibold tracking-wide">Submissions Dashboard</h1>
          </div>
          <button
            onClick={onSignOut}
            className="px-4 py-2 text-sm rounded-xl border border-[#2A2A2A] text-[#E5E5E5]
                       hover:border-white/30 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="px-4 md:px-8 py-6 space-y-6">
        {/* Stats */}
        <StatsBar
          total={stats.total}
          newCount={stats.new}
          contacted={stats.contacted}
          notInterested={stats.not_interested}
        />

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            onChange={(e) => handleSearchChange(e.target.value)}
            className="flex-1 px-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white
                       placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-white/20
                       focus:border-transparent transition-all duration-200"
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
            className="px-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white
                       focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
          <select
            value={revenueFilter}
            onChange={(e) => { setRevenueFilter(e.target.value); setPage(0); }}
            className="px-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white
                       focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="">All Revenue</option>
            {REVENUE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select
            value={contentFilter}
            onChange={(e) => { setContentFilter(e.target.value); setPage(0); }}
            className="px-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-xl text-white
                       focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="">All Content</option>
            {CONTENT_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2A2A2A] text-[#999999] text-left">
                <th className="pb-3 pr-4 font-medium cursor-pointer select-none" onClick={() => handleSort('full_name')}>
                  Name<SortArrow field="full_name" />
                </th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium cursor-pointer select-none" onClick={() => handleSort('annual_revenue')}>
                  Revenue<SortArrow field="annual_revenue" />
                </th>
                <th className="pb-3 pr-4 font-medium">Product/Service</th>
                <th className="pb-3 pr-4 font-medium">Content</th>
                <th className="pb-3 pr-4 font-medium cursor-pointer select-none" onClick={() => handleSort('status')}>
                  Status<SortArrow field="status" />
                </th>
                <th className="pb-3 font-medium cursor-pointer select-none" onClick={() => handleSort('submitted_at')}>
                  Date<SortArrow field="submitted_at" />
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <TableRow
                  key={sub.id}
                  submission={sub}
                  expanded={expandedId === sub.id}
                  onToggle={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                  onCycleStatus={() => cycleStatus(sub)}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards (Mobile) */}
        <div className="md:hidden space-y-3">
          {submissions.map((sub) => (
            <MobileCard
              key={sub.id}
              submission={sub}
              expanded={expandedId === sub.id}
              onToggle={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Empty/Loading States */}
        {loading && (
          <div className="text-center py-12">
            <svg className="animate-spin h-6 w-6 text-white/40 mx-auto" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}
        {!loading && submissions.length === 0 && (
          <p className="text-center text-[#999999] py-12">No submissions yet.</p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-4 py-2 text-sm rounded-xl border border-[#2A2A2A] text-[#E5E5E5]
                         hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-[#999999]">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 text-sm rounded-xl border border-[#2A2A2A] text-[#E5E5E5]
                         hover:border-white/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function TableRow({
  submission,
  expanded,
  onToggle,
  onCycleStatus,
  onStatusChange,
  onDelete,
}: {
  submission: Submission;
  expanded: boolean;
  onToggle: () => void;
  onCycleStatus: () => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const fullDate = new Date(submission.submitted_at).toLocaleString();

  return (
    <>
      <tr
        onClick={onToggle}
        className="border-b border-[#1A1A1A] cursor-pointer hover:bg-[#141414] transition-colors"
      >
        <td className="py-3 pr-4 text-white">{submission.full_name}</td>
        <td className="py-3 pr-4 text-[#E5E5E5]">{submission.email}</td>
        <td className="py-3 pr-4 text-[#E5E5E5]">{submission.annual_revenue}</td>
        <td className="py-3 pr-4 text-[#E5E5E5] max-w-[200px] truncate">{submission.product_service}</td>
        <td className="py-3 pr-4 text-[#E5E5E5]">{submission.creates_content}</td>
        <td className="py-3 pr-4">
          <StatusBadge status={submission.status} onClick={onCycleStatus} />
        </td>
        <td className="py-3 text-[#999999]" title={fullDate}>
          {relativeTime(submission.submitted_at)}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={7}>
            <SubmissionDetail submission={submission} onStatusChange={onStatusChange} onDelete={onDelete} />
          </td>
        </tr>
      )}
    </>
  );
}

function MobileCard({
  submission,
  expanded,
  onToggle,
  onStatusChange,
  onDelete,
}: {
  submission: Submission;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      className="bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden"
    >
      <div onClick={onToggle} className="p-4 cursor-pointer">
        <div className="flex items-start justify-between mb-2">
          <p className="text-white font-medium">{submission.full_name}</p>
          <StatusBadge status={submission.status} onClick={() => {}} />
        </div>
        <p className="text-sm text-[#E5E5E5]">{submission.email}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-[#999999]">{submission.annual_revenue}</p>
          <p className="text-xs text-[#999999]">{relativeTime(submission.submitted_at)}</p>
        </div>
      </div>
      {expanded && (
        <SubmissionDetail submission={submission} onStatusChange={onStatusChange} onDelete={onDelete} />
      )}
    </div>
  );
}

interface StatsBarProps {
  total: number;
  newCount: number;
  contacted: number;
  notInterested: number;
}

export default function StatsBar({ total, newCount, contacted, notInterested }: StatsBarProps) {
  const stats = [
    { label: 'Total Submissions', value: total },
    { label: 'New', value: newCount },
    { label: 'Contacted', value: contacted },
    { label: 'Not Interested', value: notInterested },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#141414] border border-[rgba(245,196,94,0.12)] rounded-xl p-5 hover:border-[rgba(245,196,94,0.25)] transition-colors"
        >
          <p className="text-2xl font-display text-[#F5C45E]">{stat.value}</p>
          <p className="text-sm text-[#999999] mt-1 uppercase tracking-wider">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

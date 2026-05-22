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
          className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5"
        >
          <p className="text-2xl font-bold text-white">{stat.value}</p>
          <p className="text-sm text-[#999999] mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

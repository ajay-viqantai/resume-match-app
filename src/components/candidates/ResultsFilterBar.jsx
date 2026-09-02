import { STATUSES } from '../../context/CandidateStatusContext';

export default function ResultsFilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}) {
  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or role..."
        className="flex-1 px-3 py-2 text-sm outline-none rounded-sm"
        style={{
          border: '1px solid var(--line)',
          background: '#fff',
          color: 'var(--ink)',
        }}
      />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 text-sm outline-none rounded-sm"
        style={{
          border: '1px solid var(--line)',
          background: '#fff',
          color: 'var(--ink)',
        }}
      >
        <option value="all">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}

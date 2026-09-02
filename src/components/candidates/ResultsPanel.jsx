import { useState } from 'react';
import CandidateList from './CandidateList';
import ResultsFilterBar from './ResultsFilterBar';
import { useCandidateStatus } from '../../context/CandidateStatusContext';

export default function ResultsPanel({ jdId, jdTitle, candidates }) {
  const { getStatus } = useCandidateStatus();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const visible = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || getStatus(jdId, c.id) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div
        className="text-xs tracking-wide mb-2"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: 'var(--muted)',
        }}
      >
        {candidates.length} MATCHES
      </div>
      <h2
        className="text-2xl mb-4"
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          color: 'var(--ink)',
        }}
      >
        {jdTitle}
      </h2>

      <ResultsFilterBar
        search={search}
        onSearchChange={setSearch}
        status={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {visible.length === 0 ? (
        <div
          className="py-10 text-center text-sm"
          style={{
            color: 'var(--muted)',
            border: '1px solid var(--line)',
            background: '#fff',
          }}
        >
          No candidates match your search or filter.
        </div>
      ) : (
        <CandidateList candidates={visible} jdId={jdId} />
      )}
    </div>
  );
}

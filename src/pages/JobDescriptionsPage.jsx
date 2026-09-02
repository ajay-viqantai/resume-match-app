import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import NewJDModal from '../components/jd/NewJDModal';
import JDCard from '../components/jd/JDCard';
import { JOB_DESCRIPTIONS } from '../data/jobDescriptions';
import { useCandidateStatus } from '../context/CandidateStatusContext';

export default function JobDescriptionsPage() {
  const [search, setSearch] = useState('');
  const [showNewJd, setShowNewJd] = useState(false);
  const [jobDescriptions, setJobDescriptions] = useState(JOB_DESCRIPTIONS);
  const { getReviewedCount } = useCandidateStatus();

  const filtered = jobDescriptions.filter((jd) =>
    jd.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreate = (newJd) => {
    setJobDescriptions((prev) => [newJd, ...prev]);
    setShowNewJd(false);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div
              className="text-xs tracking-wide mb-2"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--muted)',
              }}
            >
              {jobDescriptions.length} JOB DESCRIPTIONS
            </div>
            <h1
              className="text-3xl"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              Job descriptions
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Saved roles you can search candidates against.
            </p>
          </div>

          <button
            onClick={() => setShowNewJd(true)}
            className="px-4 py-2.5 text-sm font-medium rounded-sm shrink-0 transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            + New JD
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="w-full px-4 py-2.5 text-sm outline-none rounded-sm mb-6"
          style={{
            border: '1px solid var(--line)',
            background: '#fff',
            color: 'var(--ink)',
          }}
        />

        <div className="flex flex-col gap-3">
          {filtered.map((jd) => (
            <JDCard
              key={jd.id}
              jd={jd}
              reviewedCount={getReviewedCount(jd.id)}
            />
          ))}

          {filtered.length === 0 && (
            <div
              className="px-5 py-10 text-center text-sm"
              style={{
                color: 'var(--muted)',
                border: '1px solid var(--line)',
                background: '#fff',
              }}
            >
              No job descriptions match your search.
            </div>
          )}
        </div>
      </main>

      {showNewJd && (
        <NewJDModal
          onClose={() => setShowNewJd(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

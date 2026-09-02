import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ResultsPanel from '../components/candidates/ResultsPanel';
import JDCard from '../components/jd/JDCard';
import { CANDIDATES } from '../data/candidates';
import { JOB_DESCRIPTIONS } from '../data/jobDescriptions';
import { useCandidateStatus } from '../context/CandidateStatusContext';
import { useSearchHistory } from '../context/SearchHistoryContext';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { getReviewedCount } = useCandidateStatus();
  const { searchedJdIds } = useSearchHistory();

  const historyJds = searchedJdIds
    .map((id) => JOB_DESCRIPTIONS.find((jd) => jd.id === id))
    .filter(Boolean);

  const [selectedJdId, setSelectedJdId] = useState(historyJds[0]?.id ?? null);
  const selectedJd = JOB_DESCRIPTIONS.find((jd) => jd.id === selectedJdId);

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs mb-6"
          style={{ color: 'var(--accent)' }}
        >
          ← New search
        </button>

        {historyJds.length === 0 ? (
          <div className="py-20 text-center">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-xl"
              style={{
                background: 'var(--accent-soft)',
                color: 'var(--accent)',
              }}
            >
              ?
            </div>
            <h2
              className="text-xl mb-2"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              No searches yet
            </h2>
            <p
              className="text-sm mb-6 max-w-sm mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              Run a search from the Dashboard and it'll show up here.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 text-sm font-medium rounded-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              New search
            </button>
          </div>
        ) : (
          <>
            <div
              className="text-xs tracking-wide mb-4"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--muted)',
              }}
            >
              {historyJds.length} SEARCHED ROLES
            </div>

            <div className="flex flex-col gap-3 mb-10">
              {historyJds.map((jd) => (
                <JDCard
                  key={jd.id}
                  jd={jd}
                  variant="compact"
                  selected={selectedJdId === jd.id}
                  reviewedCount={getReviewedCount(jd.id)}
                  onClick={() => setSelectedJdId(jd.id)}
                />
              ))}
            </div>

            {selectedJd && (
              <ResultsPanel
                jdId={selectedJd.id}
                jdTitle={selectedJd.title}
                candidates={CANDIDATES}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

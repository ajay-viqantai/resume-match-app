import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import JDCard from '../components/jd/JDCard';
import ResultsPanel from '../components/candidates/ResultsPanel';
import { JOB_DESCRIPTIONS } from '../data/jobDescriptions';
import { CANDIDATES } from '../data/candidates';
import { useCandidateStatus } from '../context/CandidateStatusContext';
import { useSearchHistory } from '../context/SearchHistoryContext';

export default function DashboardPage() {
  const { getReviewedCount } = useCandidateStatus();
  const { searchedJdIds, markSearched, hasSearched } = useSearchHistory();

  const [mode, setMode] = useState('select'); // 'select' | 'paste' | 'filters'
  const [selectedJdId, setSelectedJdId] = useState(null);
  const [jdText, setJdText] = useState('');

  const [filters, setFilters] = useState({
    title: '',
    experience: '',
    location: '',
    skills: '',
  });

  const [isMatching, setIsMatching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFilterChange = (field) => (e) =>
    setFilters((f) => ({ ...f, [field]: e.target.value }));

  const runMatch = (jdId) => {
    setShowResults(false);
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      setShowResults(true);
      markSearched(jdId);
    }, 900); // brief, believable delay — swap for a real await once matching exists
  };

  const handleFindMatches = (e) => {
    e.preventDefault();
    runMatch(activeJdId);
  };

  const handleSelectJd = (jd) => {
    setSelectedJdId(jd.id);
    if (hasSearched(jd.id)) {
      // already searched before — show cached results instantly, no spinner
      setIsMatching(false);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleHistoryClick = (jdId) => {
    setMode('select');
    setSelectedJdId(jdId);
    setIsMatching(false);
    setShowResults(true);
  };

  const activeJdId = selectedJdId || 1; // hardcoded fallback until real matching exists
  const activeJd = JOB_DESCRIPTIONS.find((jd) => jd.id === activeJdId);
  const activeJdTitle = activeJd?.title || 'Senior Frontend Engineer';

  const historyJds = searchedJdIds
    .map((id) => JOB_DESCRIPTIONS.find((jd) => jd.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div
          className="text-xs tracking-wide mb-2"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: 'var(--muted)',
          }}
        >
          NEW SEARCH
        </div>
        <h1
          className="text-3xl mb-2"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            color: 'var(--ink)',
          }}
        >
          Find candidates
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          Select a saved job description, paste a full JD, or search using
          specific criteria.
        </p>

        {/* mode toggle */}
        <div
          className="inline-flex mb-6 p-1"
          style={{
            background: 'var(--accent-soft)',
            border: '1px solid var(--line)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode('select');
              setShowResults(false);
            }}
            className="px-4 py-1.5 text-xs font-medium transition-colors"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: mode === 'select' ? 'var(--accent)' : 'transparent',
              color: mode === 'select' ? '#fff' : 'var(--muted)',
            }}
          >
            SELECT JD
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('paste');
              setShowResults(false);
            }}
            className="px-4 py-1.5 text-xs font-medium transition-colors"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: mode === 'paste' ? 'var(--accent)' : 'transparent',
              color: mode === 'paste' ? '#fff' : 'var(--muted)',
            }}
          >
            PASTE JD
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('filters');
              setShowResults(false);
            }}
            className="px-4 py-1.5 text-xs font-medium transition-colors"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: mode === 'filters' ? 'var(--accent)' : 'transparent',
              color: mode === 'filters' ? '#fff' : 'var(--muted)',
            }}
          >
            USE FILTERS
          </button>
        </div>

        <form onSubmit={handleFindMatches}>
          {mode === 'select' ? (
            <>
              <div className="flex flex-col gap-3">
                {JOB_DESCRIPTIONS.map((jd) => (
                  <JDCard
                    key={jd.id}
                    jd={jd}
                    variant="compact"
                    selected={selectedJdId === jd.id}
                    reviewedCount={getReviewedCount(jd.id)}
                    onClick={() => handleSelectJd(jd)}
                  />
                ))}
              </div>

              <div className="flex items-center justify-end mt-6">
                <button
                  type="submit"
                  disabled={!selectedJdId}
                  className="px-5 py-2.5 text-sm font-medium rounded-sm transition-opacity hover:opacity-90 disabled:opacity-40"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {selectedJdId && hasSearched(selectedJdId)
                    ? 'Re-run match'
                    : 'Find matches'}
                </button>
              </div>
            </>
          ) : mode === 'paste' ? (
            <>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="e.g. We're looking for a Senior Frontend Engineer with 5+ years of React experience..."
                rows={10}
                className="w-full px-4 py-3 text-sm outline-none rounded-sm resize-none"
                style={{
                  border: '1px solid var(--line)',
                  background: '#fff',
                  color: 'var(--ink)',
                }}
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                  {jdText.length} characters
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium rounded-sm transition-opacity hover:opacity-90"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  Find matches
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                className="p-5 flex flex-col gap-4"
                style={{ border: '1px solid var(--line)', background: '#fff' }}
              >
                <div>
                  <label
                    className="block text-xs mb-1 tracking-wide"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--muted)',
                    }}
                  >
                    JOB TITLE
                  </label>
                  <input
                    type="text"
                    value={filters.title}
                    onChange={handleFilterChange('title')}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full px-3 py-2.5 text-sm outline-none rounded-sm"
                    style={{
                      border: '1px solid var(--line)',
                      background: 'var(--paper)',
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs mb-1 tracking-wide"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'var(--muted)',
                      }}
                    >
                      EXPERIENCE
                    </label>
                    <input
                      type="text"
                      value={filters.experience}
                      onChange={handleFilterChange('experience')}
                      placeholder="e.g. 5+ years"
                      className="w-full px-3 py-2.5 text-sm outline-none rounded-sm"
                      style={{
                        border: '1px solid var(--line)',
                        background: 'var(--paper)',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs mb-1 tracking-wide"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'var(--muted)',
                      }}
                    >
                      LOCATION
                    </label>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={handleFilterChange('location')}
                      placeholder="e.g. Pune, Remote"
                      className="w-full px-3 py-2.5 text-sm outline-none rounded-sm"
                      style={{
                        border: '1px solid var(--line)',
                        background: 'var(--paper)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs mb-1 tracking-wide"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--muted)',
                    }}
                  >
                    SKILLS
                  </label>
                  <input
                    type="text"
                    value={filters.skills}
                    onChange={handleFilterChange('skills')}
                    placeholder="e.g. React, TypeScript, Tailwind"
                    className="w-full px-3 py-2.5 text-sm outline-none rounded-sm"
                    style={{
                      border: '1px solid var(--line)',
                      background: 'var(--paper)',
                    }}
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                    Comma-separated
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end mt-4">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium rounded-sm transition-opacity hover:opacity-90"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  Find matches
                </button>
              </div>
            </>
          )}
        </form>

        {isMatching && (
          <div className="mt-14 flex flex-col items-center text-center py-10">
            <div
              className="w-8 h-8 rounded-full mb-4 animate-spin"
              style={{
                border: '3px solid var(--line)',
                borderTopColor: 'var(--accent)',
              }}
            />
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Matching candidates...
            </p>
          </div>
        )}

        {showResults && !isMatching && (
          <div className="mt-14">
            <ResultsPanel
              jdId={activeJdId}
              jdTitle={activeJdTitle}
              candidates={CANDIDATES}
            />
          </div>
        )}

        <div className="mt-14">
          <div
            className="text-xs tracking-wide mb-4"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: 'var(--muted)',
            }}
          >
            SEARCH HISTORY
          </div>

          {historyJds.length === 0 ? (
            <div
              className="px-4 py-3 text-sm"
              style={{
                border: '1px solid var(--line)',
                background: '#fff',
                color: 'var(--muted)',
              }}
            >
              You haven't searched any roles yet.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {historyJds.map((jd) => (
                <JDCard
                  key={jd.id}
                  jd={jd}
                  reviewedCount={getReviewedCount(jd.id)}
                  onClick={() => handleHistoryClick(jd.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

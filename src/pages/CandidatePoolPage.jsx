import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import ResumeModal from '../components/candidates/ResumeModal';
import ConfirmDialog from '../components/candidates/ConfirmDialog';
import { CANDIDATES } from '../data/candidates';
import { useUser } from '../context/UserContext';
import UploadResumeModal from '../components/candidates/UploadResumeModal';

export default function CandidatePoolPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [viewingResume, setViewingResume] = useState(null);
  const [removingCandidate, setRemovingCandidate] = useState(null);
  const [candidates, setCandidates] = useState(CANDIDATES);
  const { role } = useUser();
  const canManage = role === 'admin' || role === 'superadmin';
  const [showUpload, setShowUpload] = useState(false);

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase()),
  );

  const handleConfirmRemove = () => {
    setCandidates((prev) => prev.filter((c) => c.id !== removingCandidate.id));
    setRemovingCandidate(null);
  };

  const handleUpload = (newCandidate) => {
    setCandidates((prev) => [newCandidate, ...prev]);
    setShowUpload(false);
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
              {candidates.length} RESUMES
            </div>
            <h1
              className="text-3xl"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              Candidate pool
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Shared across your organization.
            </p>
          </div>

          {canManage && (
            <button
              onClick={() => setShowUpload(true)}
              className="px-4 py-2.5 text-sm font-medium rounded-sm shrink-0 transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              + Upload resume
            </button>
          )}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or role..."
          className="w-full px-4 py-2.5 text-sm outline-none rounded-sm mb-6"
          style={{
            border: '1px solid var(--line)',
            background: '#fff',
            color: 'var(--ink)',
          }}
        />

        <div style={{ border: '1px solid var(--line)', background: '#fff' }}>
          <div
            className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_auto] px-5 py-3 text-xs"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: 'var(--muted)',
              borderBottom: '1px solid var(--line)',
              background: 'var(--accent-soft)',
            }}
          >
            <div>NAME</div>
            <div>ROLE</div>
            <div>UPLOADED BY</div>
            <div>DATE</div>
            <div></div>
          </div>

          {filtered.map((c, i) => (
            <div
              key={c.id}
              className="grid grid-cols-2 md:grid-cols-[2fr_1.5fr_1fr_1fr_auto] items-center px-5 py-3 gap-y-1"
              style={{
                borderBottom:
                  i < filtered.length - 1 ? '1px solid var(--line)' : 'none',
              }}
            >
              <div className="text-sm" style={{ color: 'var(--ink)' }}>
                {c.name}
              </div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                {c.role}
              </div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                {c.uploadedBy}
              </div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                {c.uploadedDate}
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setViewingResume(c)}
                  className="text-xs"
                  style={{ color: 'var(--accent)' }}
                >
                  View
                </button>
                {canManage && (
                  <button
                    onClick={() => setRemovingCandidate(c)}
                    className="text-xs"
                    style={{ color: '#b3413a' }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div
              className="px-5 py-10 text-center text-sm"
              style={{ color: 'var(--muted)' }}
            >
              No candidates match your search.
            </div>
          )}
        </div>
      </main>

      {viewingResume && (
        <ResumeModal
          candidate={viewingResume}
          onClose={() => setViewingResume(null)}
        />
      )}

      {removingCandidate && (
        <ConfirmDialog
          title="Remove candidate?"
          message={`This will remove ${removingCandidate.name} from your organization's candidate pool. This can't be undone.`}
          confirmLabel="Remove"
          onConfirm={handleConfirmRemove}
          onCancel={() => setRemovingCandidate(null)}
        />
      )}

      {showUpload && (
        <UploadResumeModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}

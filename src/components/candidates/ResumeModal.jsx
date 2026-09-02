export default function ResumeModal({ candidate, onClose }) {
  if (!candidate) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-6 z-50"
      style={{ background: 'rgba(20,23,31,0.5)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[85vh] flex flex-col"
        style={{ background: '#fff', border: '1px solid var(--line)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid var(--line)' }}
        >
          <div>
            <div
              className="text-sm font-medium"
              style={{ color: 'var(--ink)' }}
            >
              {candidate.name}'s resume
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
              {candidate.role}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={candidate.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              style={{ color: 'var(--accent)' }}
            >
              Open in new tab ↗
            </a>
            <button
              onClick={onClose}
              className="text-lg leading-none"
              style={{ color: 'var(--muted)' }}
            >
              ×
            </button>
          </div>
        </div>

        <div
          className="flex-1 overflow-auto"
          style={{ background: 'var(--paper)' }}
        >
          <iframe
            src={candidate.resumeUrl}
            title={`${candidate.name}'s resume`}
            className="w-full h-full min-h-[500px]"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import ResumeModal from './ResumeModal';
import {
  useCandidateStatus,
  STATUSES,
} from '../../context/CandidateStatusContext';

export default function CandidateCard({ candidate, jdId }) {
  const [expanded, setExpanded] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const { getStatus, setStatus } = useCandidateStatus();
  const currentStatus = getStatus(jdId, candidate.id);
  const statusConfig = STATUSES.find((s) => s.key === currentStatus);

  return (
    <div style={{ border: '1px solid var(--line)', background: '#fff' }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setExpanded((e) => !e)}
        onKeyDown={(e) => e.key === 'Enter' && setExpanded((ex) => !ex)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-black/[0.02] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
          >
            {candidate.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <div
              className="text-sm font-medium"
              style={{ color: 'var(--ink)', fontFamily: "'Fraunces', serif" }}
            >
              {candidate.name}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
              {candidate.role} · {candidate.experience}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={currentStatus}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setStatus(jdId, candidate.id, e.target.value)}
            className="text-xs px-2 py-1.5 rounded-sm outline-none cursor-pointer"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: statusConfig.bg,
              color: statusConfig.color,
              border: `1px solid ${statusConfig.color}`,
            }}
          >
            {STATUSES.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>

          <div
            className="text-xs px-2 py-1 rounded-sm shrink-0"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
          >
            {candidate.matchScore}% match
          </div>
          <span
            className="text-xs transition-transform"
            style={{
              color: 'var(--muted)',
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            ▾
          </span>
        </div>
      </div>

      {expanded && (
        <div
          className="px-5 pb-5 pt-1"
          style={{ borderTop: '1px solid var(--line)' }}
        >
          <p className="text-sm mt-4 mb-4" style={{ color: 'var(--ink)' }}>
            {candidate.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {candidate.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-2 py-1 rounded-sm"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  border: '1px solid var(--line)',
                  color: 'var(--muted)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowResume(true)}
            className="text-xs px-3 py-1.5 rounded-sm mb-4"
            style={{ border: '1px solid var(--line)', color: 'var(--accent)' }}
          >
            View resume
          </button>

          <div
            className="grid grid-cols-2 gap-y-2 text-xs"
            style={{ color: 'var(--muted)' }}
          >
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                EDUCATION
              </span>
              <div className="text-sm mt-1" style={{ color: 'var(--ink)' }}>
                {candidate.education}
              </div>
            </div>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                LOCATION
              </span>
              <div className="text-sm mt-1" style={{ color: 'var(--ink)' }}>
                {candidate.location}
              </div>
            </div>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                EMAIL
              </span>
              <div className="text-sm mt-1" style={{ color: 'var(--ink)' }}>
                {candidate.email}
              </div>
            </div>
            <div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                PHONE
              </span>
              <div className="text-sm mt-1" style={{ color: 'var(--ink)' }}>
                {candidate.phone}
              </div>
            </div>
          </div>
        </div>
      )}

      {showResume && (
        <ResumeModal
          candidate={candidate}
          onClose={() => setShowResume(false)}
        />
      )}
    </div>
  );
}

export default function JDCard({
  jd,
  variant = 'full',
  selected = false,
  reviewedCount,
  onClick,
}) {
  const clickable = typeof onClick === 'function';

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="text-left p-4 w-full transition-colors"
        style={{
          border: selected
            ? '1px solid var(--accent)'
            : '1px solid var(--line)',
          background: selected ? 'var(--accent-soft)' : '#fff',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div
              className="text-sm font-medium"
              style={{ color: 'var(--ink)' }}
            >
              {jd.title}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
              {jd.department} · {jd.location} · {jd.experience}
            </div>
          </div>
          {typeof reviewedCount === 'number' && (
            <span
              className="text-xs px-2 py-1 rounded-sm shrink-0 ml-3"
              style={{
                background: 'var(--accent-soft)',
                color: 'var(--accent)',
              }}
            >
              {reviewedCount} reviewed
            </span>
          )}
        </div>
      </button>
    );
  }

  return (
    <div
      onClick={onClick}
      className="p-5"
      style={{
        border: '1px solid var(--line)',
        background: '#fff',
        cursor: clickable ? 'pointer' : 'default',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div
            className="text-sm font-medium"
            style={{ color: 'var(--ink)', fontFamily: "'Fraunces', serif" }}
          >
            {jd.title}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            {jd.department} · {jd.location} · {jd.experience}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs" style={{ color: 'var(--muted)' }}>
            {jd.createdDate}
          </div>
          {typeof reviewedCount === 'number' && (
            <div
              className="text-xs px-2 py-1 rounded-sm mt-1"
              style={{
                background: 'var(--accent-soft)',
                color: 'var(--accent)',
              }}
            >
              {reviewedCount} reviewed
            </div>
          )}
        </div>
      </div>

      <p className="text-sm mb-3" style={{ color: 'var(--ink)' }}>
        {jd.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {jd.skills.map((skill) => (
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
    </div>
  );
}

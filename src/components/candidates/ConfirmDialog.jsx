export default function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-6 z-50"
      style={{ background: 'rgba(20,23,31,0.5)' }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm p-6"
        style={{ background: '#fff', border: '1px solid var(--line)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-lg mb-2"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            color: 'var(--ink)',
          }}
        >
          {title}
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          {message}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm rounded-sm"
            style={{ border: '1px solid var(--line)', color: 'var(--muted)' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-sm font-medium rounded-sm"
            style={{ background: '#b3413a', color: '#fff' }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

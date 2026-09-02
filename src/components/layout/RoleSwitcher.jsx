import { useState } from 'react';

const ROLES = ['superadmin', 'admin', 'user'];

// TEMP dev tool — lets you preview role-based views without editing
// currentUser.js by hand. Remove once real auth exists.
export default function RoleSwitcher({ currentRole, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div
          className="mb-2 p-2 flex flex-col gap-1"
          style={{ background: '#fff', border: '1px solid var(--line)' }}
        >
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => {
                onChange(r);
                setOpen(false);
              }}
              className="px-3 py-1.5 text-xs text-left rounded-sm capitalize"
              style={{
                background: r === currentRole ? 'var(--accent)' : 'transparent',
                color: r === currentRole ? '#fff' : 'var(--ink)',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="px-3 py-2 text-xs rounded-sm shadow-lg capitalize"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          background: 'var(--ink)',
          color: '#fff',
        }}
      >
        DEV · Viewing as: {currentRole}
      </button>
    </div>
  );
}

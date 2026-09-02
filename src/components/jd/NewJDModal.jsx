import { useState } from 'react';

export default function NewJDModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: '',
    department: '',
    location: '',
    experience: '',
    skills: '',
    description: '',
  });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    onCreate({
      id: Date.now(),
      title: form.title,
      department: form.department,
      location: form.location,
      experience: form.experience,
      skills: form.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      description: form.description,
      createdBy: 'You',
      createdDate: 'Just now',
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-6 z-50"
      style={{ background: 'rgba(20,23,31,0.5)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[85vh] flex flex-col"
        style={{ background: '#fff', border: '1px solid var(--line)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: '1px solid var(--line)' }}
        >
          <h2
            className="text-lg"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              color: 'var(--ink)',
            }}
          >
            New job description
          </h2>
          <button
            onClick={onClose}
            className="text-lg leading-none"
            style={{ color: 'var(--muted)' }}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-auto px-6 py-5 flex flex-col gap-4"
        >
          <div>
            <label
              className="block text-xs mb-1 tracking-wide"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--muted)',
              }}
            >
              TITLE
            </label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange('title')}
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
                DEPARTMENT
              </label>
              <input
                type="text"
                value={form.department}
                onChange={handleChange('department')}
                placeholder="e.g. Engineering"
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
                value={form.location}
                onChange={handleChange('location')}
                placeholder="e.g. Remote"
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
              EXPERIENCE
            </label>
            <input
              type="text"
              value={form.experience}
              onChange={handleChange('experience')}
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
              SKILLS
            </label>
            <input
              type="text"
              value={form.skills}
              onChange={handleChange('skills')}
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

          <div>
            <label
              className="block text-xs mb-1 tracking-wide"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--muted)',
              }}
            >
              DESCRIPTION
            </label>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={5}
              className="w-full px-3 py-2.5 text-sm outline-none rounded-sm resize-none"
              style={{
                border: '1px solid var(--line)',
                background: 'var(--paper)',
              }}
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm rounded-sm"
              style={{ border: '1px solid var(--line)', color: 'var(--muted)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 text-sm font-medium rounded-sm"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Create JD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useUser } from '../../context/UserContext';

export default function UploadResumeModal({ onClose, onUpload }) {
  const { name } = useUser();
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: '',
    role: '',
    experience: '',
    education: '',
    location: '',
    email: '',
    phone: '',
    skills: '',
    summary: '',
  });

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !file) return;

    onUpload({
      id: Date.now(),
      name: form.name,
      role: form.role,
      matchScore: null, // no score until real matching exists
      skills: form.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      experience: form.experience,
      education: form.education,
      location: form.location,
      email: form.email,
      phone: form.phone,
      summary: form.summary,
      uploadedBy: name || 'You',
      uploadedDate: 'Just now',
      resumeUrl: '/resumes/dummy_resume.pdf', // placeholder until real file storage exists
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
            Upload resume
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
              RESUME FILE (PDF)
            </label>

            <label
              className="flex items-center justify-between px-4 py-3 text-sm cursor-pointer rounded-sm"
              style={{
                border: `1px dashed ${file ? 'var(--accent)' : 'var(--line)'}`,
                background: file ? 'var(--accent-soft)' : 'var(--paper)',
              }}
            >
              <span style={{ color: file ? 'var(--accent)' : 'var(--muted)' }}>
                {file ? file.name : 'Click to choose a PDF file'}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-sm shrink-0 ml-3"
                style={{
                  border: '1px solid var(--line)',
                  color: 'var(--muted)',
                  background: '#fff',
                }}
              >
                Browse
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0] || null)}
                className="hidden"
              />
            </label>

            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
              Not actually stored yet — placeholder for the real upload flow.
            </p>
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
                FULL NAME
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="e.g. Aisha Verma"
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
                ROLE
              </label>
              <input
                type="text"
                value={form.role}
                onChange={handleChange('role')}
                placeholder="e.g. Frontend Engineer"
                className="w-full px-3 py-2.5 text-sm outline-none rounded-sm"
                style={{
                  border: '1px solid var(--line)',
                  background: 'var(--paper)',
                }}
              />
            </div>
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
                value={form.experience}
                onChange={handleChange('experience')}
                placeholder="e.g. 4 years"
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
                placeholder="e.g. Pune, India"
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
              EDUCATION
            </label>
            <input
              type="text"
              value={form.education}
              onChange={handleChange('education')}
              placeholder="e.g. B.Tech, Computer Science — VJTI Mumbai"
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
                EMAIL
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="candidate@email.com"
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
                PHONE
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="+91 90000 00000"
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
              SUMMARY
            </label>
            <textarea
              value={form.summary}
              onChange={handleChange('summary')}
              placeholder="Short bio or resume summary..."
              rows={3}
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
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

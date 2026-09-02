import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { name, role, setRole } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : '?';

  // close dropdown when clicking outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setRole(null, '');
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header
      className="flex items-center justify-between px-6 md:px-12 py-4 relative"
      style={{ borderBottom: '1px solid var(--line)', background: '#fff' }}
    >
      <Link
        to="/dashboard"
        className="text-sm tracking-wide"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: 'var(--ink)',
        }}
      >
        RESUME MATCH
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="text-sm"
          style={{ color: 'var(--muted)' }}
        >
          Dashboard
        </Link>
        <Link
          to="/job-descriptions"
          className="text-sm"
          style={{ color: 'var(--muted)' }}
        >
          Job Descriptions
        </Link>
        <Link
          to="/results"
          className="text-sm"
          style={{ color: 'var(--muted)' }}
        >
          Results
        </Link>
        <Link
          to="/candidates"
          className="text-sm"
          style={{ color: 'var(--muted)' }}
        >
          Candidates
        </Link>
        <Link to="/team" className="text-sm" style={{ color: 'var(--muted)' }}>
          Team
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
          >
            {initials}
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-11 w-56 z-50"
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                boxShadow: 'var(--shadow, 0 10px 15px -3px rgba(0,0,0,0.1))',
              }}
            >
              <div
                className="px-4 py-3"
                style={{ borderBottom: '1px solid var(--line)' }}
              >
                <div className="text-sm" style={{ color: 'var(--ink)' }}>
                  {name}
                </div>
                <div
                  className="text-xs mt-0.5 capitalize"
                  style={{ color: 'var(--muted)' }}
                >
                  {role}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-black/[0.02] transition-colors"
                  style={{ color: 'var(--ink)' }}
                >
                  Account
                </button>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-black/[0.02] transition-colors"
                  style={{ color: 'var(--ink)' }}
                >
                  Settings
                </button>
              </div>

              <div
                className="py-1"
                style={{ borderTop: '1px solid var(--line)' }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-black/[0.02] transition-colors"
                  style={{ color: '#b3413a' }}
                >
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

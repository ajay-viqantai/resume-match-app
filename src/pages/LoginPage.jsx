import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { MOCK_ACCOUNTS } from '../data/mockAccounts';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setRole } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const account = MOCK_ACCOUNTS.find(
      (a) =>
        a.email.toLowerCase() === email.toLowerCase() &&
        a.password === password,
    );

    if (!account) {
      setError('Invalid email or password.');
      return;
    }

    setRole(account.role, account.name);
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen grid md:grid-cols-2"
      style={{ background: 'var(--paper)' }}
    >
      {/* Left brand panel */}
      <div
        className="hidden md:flex flex-col justify-center gap-8 p-12 relative overflow-hidden"
        style={{ background: 'var(--accent)', color: 'var(--paper)' }}
      >
        <div
          className="text-xs tracking-wide"
          style={{ fontFamily: "'JetBrains Mono', monospace", opacity: 0.75 }}
        >
          RESUME MATCH
        </div>

        <div>
          <h1
            className="text-4xl leading-tight mb-4"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            Find the right fit, faster.
          </h1>
          <p className="text-sm max-w-xs" style={{ opacity: 0.85 }}>
            Paste a job description. See the candidates who actually match it.
          </p>
        </div>

        <div
          className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full"
          style={{ background: 'rgba(247,246,242,0.06)' }}
        />
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">
          <h2
            className="text-2xl mb-1"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              color: 'var(--ink)',
            }}
          >
            Log In
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Welcome back. Enter your details to continue.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {error && (
              <div
                className="text-xs px-3 py-2 rounded-sm"
                style={{ background: 'rgba(179,65,58,0.08)', color: '#b3413a' }}
              >
                {error}
              </div>
            )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3 py-2.5 text-sm outline-none rounded-sm"
                style={{ border: '1px solid var(--line)', background: '#fff' }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  className="block text-xs tracking-wide"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--muted)',
                  }}
                >
                  PASSWORD
                </label>
                <button
                  type="button"
                  className="text-xs"
                  style={{ color: 'var(--accent)' }}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 text-sm outline-none rounded-sm"
                  style={{
                    border: '1px solid var(--line)',
                    background: '#fff',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                  style={{ color: 'var(--muted)' }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <label
              className="flex items-center gap-2 text-xs"
              style={{ color: 'var(--muted)' }}
            >
              <input type="checkbox" className="accent-current" />
              Remember me
            </label>

            <button
              type="submit"
              className="mt-2 py-2.5 text-sm font-medium rounded-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Log in
            </button>

            <p
              className="text-xs text-center mt-2"
              style={{ color: 'var(--muted)' }}
            >
              Don't have an account?{' '}
              <Link
                to="/signup"
                style={{ color: 'var(--accent)', fontWeight: 500 }}
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

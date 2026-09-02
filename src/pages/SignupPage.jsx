import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen grid md:grid-cols-2"
      style={{ background: 'var(--paper)' }}
    >
      {/* Left brand panel — same as Login for consistency */}
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
            Set up your workspace.
          </h1>
          <p className="text-sm max-w-xs" style={{ opacity: 0.85 }}>
            Create an account to start matching candidates to your roles.
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
            Create account
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Get started in a couple of minutes.
          </p>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
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
                placeholder="Jordan Lee"
                className="w-full px-3 py-2.5 text-sm outline-none rounded-sm"
                style={{ border: '1px solid var(--line)', background: '#fff' }}
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
                EMAIL
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-3 py-2.5 text-sm outline-none rounded-sm"
                style={{ border: '1px solid var(--line)', background: '#fff' }}
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
                PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
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
              className="flex items-start gap-2 text-xs"
              style={{ color: 'var(--muted)' }}
            >
              <input type="checkbox" className="accent-current mt-0.5" />I agree
              to the Terms and Privacy Policy
            </label>

            <button
              type="submit"
              className="mt-2 py-2.5 text-sm font-medium rounded-sm transition-opacity hover:opacity-90"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Create account
            </button>
          </form>

          <p
            className="text-xs text-center mt-4"
            style={{ color: 'var(--muted)' }}
          >
            Already have an account?{' '}
            <Link to="/" style={{ color: 'var(--accent)', fontWeight: 500 }}>
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

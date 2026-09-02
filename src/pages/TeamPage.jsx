import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { TEAM_MEMBERS } from '../data/teamMembers';
/* import { CURRENT_USER } from '../data/currentUser'; */
import { useUser } from '../context/UserContext';

export default function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const { role } = useUser();
  const canManage = role === 'admin' || role === 'superadmin';
  /* const canManage =
    CURRENT_USER.role === 'admin' || CURRENT_USER.role === 'superadmin'; */

  if (!canManage) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <Navbar />
        <main className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            You don't have access to this page.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div
              className="text-xs tracking-wide mb-2"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--muted)',
              }}
            >
              {TEAM_MEMBERS.length} MEMBERS
            </div>
            <h1
              className="text-3xl"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              Team
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              Users under your organization and their activity.
            </p>
          </div>

          <button
            onClick={() => setInviteOpen(true)}
            className="px-4 py-2.5 text-sm font-medium rounded-sm shrink-0 transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            + Invite user
          </button>
        </div>

        <div style={{ border: '1px solid var(--line)', background: '#fff' }}>
          <div
            className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] px-5 py-3 text-xs"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: 'var(--muted)',
              borderBottom: '1px solid var(--line)',
              background: 'var(--accent-soft)',
            }}
          >
            <div>NAME</div>
            <div>RESUMES</div>
            <div>JDS SEARCHED</div>
            <div>MATCHES</div>
            <div>LAST ACTIVE</div>
            <div>STATUS</div>
          </div>

          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={member.id}
              className="grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto] items-center px-5 py-3 gap-y-1"
              style={{
                borderBottom:
                  i < TEAM_MEMBERS.length - 1
                    ? '1px solid var(--line)'
                    : 'none',
              }}
            >
              <div>
                <div className="text-sm" style={{ color: 'var(--ink)' }}>
                  {member.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--muted)' }}>
                  {member.email}
                </div>
              </div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                {member.resumesUploaded}
              </div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                {member.jdsSearched}
              </div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                {member.matchesFound}
              </div>
              <div className="text-sm" style={{ color: 'var(--muted)' }}>
                {member.lastActive}
              </div>
              <div>
                <span
                  className="text-xs px-2 py-1 rounded-sm"
                  style={{
                    background:
                      member.status === 'active'
                        ? 'var(--accent-soft)'
                        : '#f4f3ec',
                    color:
                      member.status === 'active'
                        ? 'var(--accent)'
                        : 'var(--muted)',
                  }}
                >
                  {member.status === 'active' ? 'Active' : 'Invited'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {inviteOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center px-6"
          style={{ background: 'rgba(20,23,31,0.4)' }}
          onClick={() => setInviteOpen(false)}
        >
          <div
            className="w-full max-w-sm p-6"
            style={{ background: '#fff', border: '1px solid var(--line)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="text-xl mb-4"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                color: 'var(--ink)',
              }}
            >
              Invite a user
            </h2>
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
              placeholder="teammate@company.com"
              className="w-full px-3 py-2.5 text-sm outline-none rounded-sm mb-4"
              style={{
                border: '1px solid var(--line)',
                background: 'var(--paper)',
              }}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setInviteOpen(false)}
                className="flex-1 py-2.5 text-sm rounded-sm"
                style={{
                  border: '1px solid var(--line)',
                  color: 'var(--muted)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setInviteOpen(false)}
                className="flex-1 py-2.5 text-sm font-medium rounded-sm"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                Send invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

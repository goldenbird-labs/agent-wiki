import { Link } from 'react-router-dom';
import { Bot, ClipboardPlus, BookOpen, MessagesSquare, ArrowRight } from 'lucide-react';
import { agents } from '../data/agents';
import { useChatContext } from '../context/ChatContext';

// Corporate palette
const T = { primary: '#0F172A', secondary: '#64748B', muted: '#94A3B8', border: '#E2E8F0', card: '#FFFFFF', accent: '#2563EB', accentBg: '#EFF6FF', accentBorder: '#BFDBFE' };

const tiles = [
  {
    icon: Bot, label: 'Agent Directory',
    desc: 'Browse every registered AI agent — ownership, risk classification, data access scope, and audit status.',
    to: '/agents', action: null,
    stat: `${agents.length} agents registered`,
  },
  {
    icon: ClipboardPlus, label: 'Register Agent',
    desc: 'Submit a new AI agent for governance review and approval before any production deployment.',
    to: '/register', action: null,
    stat: 'Required before go-live',
  },
  {
    icon: BookOpen, label: 'Policies & Guidelines',
    desc: 'View responsible AI policies on registration requirements, data handling, and acceptable use.',
    to: '/policies', action: null,
    stat: '4 active policies',
  },
  {
    icon: MessagesSquare, label: 'Ask AI Assistant',
    desc: 'Get instant answers on governance questions, policy lookups, and agent registration guidance.',
    to: null, action: 'chat',
    stat: 'Governance assistant',
  },
];

export default function Home() {
  const { openChat } = useChatContext();

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 56px)', paddingTop: '24px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: T.accentBg, border: `1px solid ${T.accentBorder}`,
          borderRadius: '20px', padding: '4px 14px', marginBottom: '20px',
        }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.accent }} />
          <span style={{ fontSize: '11px', fontWeight: 600, color: T.accent, letterSpacing: '0.6px' }}>
            AI GOVERNANCE PLATFORM
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800,
          color: T.primary, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '14px',
        }}>
          Welcome to AgentWiki
        </h1>
        <p style={{ fontSize: '15px', color: T.secondary, lineHeight: 1.65, maxWidth: '460px', margin: '0 auto 28px' }}>
          The central registry for AI agents in your organization — governed, audited, and accountable.
        </p>
        <Link to="/dashboard" style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: T.primary, color: '#FFFFFF',
          fontSize: '13.5px', fontWeight: 600,
          padding: '10px 22px', borderRadius: '8px', textDecoration: 'none',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        }}>
          Dashboard <ArrowRight size={14} />
        </Link>
      </div>

      {/* Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        {tiles.map(({ icon: Icon, label, desc, to, action, stat }) => {
          const card = (
            <div
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: '12px', padding: '22px',
                display: 'flex', flexDirection: 'column',
                cursor: 'pointer', height: '100%',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.15s, border-color 0.15s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Icon + title + arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '9px', flexShrink: 0,
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={T.primary} strokeWidth={1.8} />
                </div>
                <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: T.primary, letterSpacing: '-0.2px', flex: 1, lineHeight: 1.3 }}>
                  {label}
                </h3>
                <div style={{
                  width: '26px', height: '26px', borderRadius: '6px', flexShrink: 0,
                  background: '#F8FAFC', border: `1px solid ${T.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ArrowRight size={12} color={T.muted} />
                </div>
              </div>

              <div style={{ height: '1px', background: '#F1F5F9', marginBottom: '14px' }} />

              <p style={{ fontSize: '13px', color: T.secondary, lineHeight: 1.65, flexGrow: 1 }}>
                {desc}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '18px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: T.accent, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', fontWeight: 500, color: T.accent }}>{stat}</span>
              </div>
            </div>
          );

          return action === 'chat'
            ? <div key={label} onClick={openChat} style={{ display: 'block' }}>{card}</div>
            : <Link key={label} to={to!} style={{ textDecoration: 'none' }}>{card}</Link>;
        })}
      </div>
    </div>
  );
}

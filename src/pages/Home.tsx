import { Link } from 'react-router-dom';
import { Bot, ClipboardPlus, BookOpen, MessagesSquare, ArrowRight } from 'lucide-react';
import { agents } from '../data/agents';
import { useChatContext } from '../context/ChatContext';

const TEXT_PRIMARY = '#0F172A';
const TEXT_SECONDARY = '#64748B';

const tiles = [
  {
    icon: Bot, label: 'Agent Directory',
    desc: 'Browse every registered AI agent — ownership, risk level, audit status, and data access scope.',
    to: '/agents', action: null,
    iconGradient: 'linear-gradient(135deg, #4F46E5, #6366F1)',
    accent: '#4F46E5', accentBg: 'rgba(79,70,229,0.06)', accentBorder: '#C7D2FE',
    stat: `${agents.length} agents registered`,
  },
  {
    icon: ClipboardPlus, label: 'Register Agent',
    desc: 'Submit a new AI agent for governance review and approval before any production deployment.',
    to: '/register', action: null,
    iconGradient: 'linear-gradient(135deg, #059669, #10B981)',
    accent: '#059669', accentBg: 'rgba(5,150,105,0.06)', accentBorder: '#A7F3D0',
    stat: 'Required before go-live',
  },
  {
    icon: BookOpen, label: 'Policies & Guidelines',
    desc: 'View responsible AI policies covering registration requirements, data handling, and acceptable use.',
    to: '/policies', action: null,
    iconGradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
    accent: '#B45309', accentBg: 'rgba(217,119,6,0.06)', accentBorder: '#FDE68A',
    stat: '4 active policies',
  },
  {
    icon: MessagesSquare, label: 'Ask AI Assistant',
    desc: 'Get instant answers on governance questions, policy lookups, and agent registration guidance.',
    to: null, action: 'chat',
    iconGradient: 'linear-gradient(135deg, #7C3AED, #A855F7)',
    accent: '#7C3AED', accentBg: 'rgba(124,58,237,0.06)', accentBorder: '#DDD6FE',
    stat: 'Governance assistant',
  },
];

export default function Home() {
  const { openChat } = useChatContext();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px', paddingTop: '16px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: 'rgba(79,70,229,0.08)', border: '1px solid #C7D2FE',
          borderRadius: '20px', padding: '5px 14px', marginBottom: '20px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4F46E5' }} />
          <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#4338CA', letterSpacing: '0.5px' }}>
            AI GOVERNANCE PLATFORM
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-1px', lineHeight: 1.15, marginBottom: '14px' }}>
          Welcome to AgentWiki
        </h1>
        <p style={{ fontSize: '15.5px', color: TEXT_SECONDARY, lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 28px' }}>
          The central registry for AI agents in your organization — governed, audited, and accountable.
        </p>
        <Link to="/dashboard" style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          color: '#fff', fontSize: '13.5px', fontWeight: 600,
          padding: '10px 22px', borderRadius: '10px', textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
        }}>
          Dashboard <ArrowRight size={14} />
        </Link>
      </div>

      {/* 4 Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {tiles.map(({ icon: Icon, label, desc, to, action, iconGradient, accent, accentBg, accentBorder, stat }) => {
          const card = (
            <div
              style={{
                background: `linear-gradient(160deg, ${accentBg} 0%, #ffffff 55%)`,
                border: `1px solid ${accentBorder}`,
                borderRadius: '18px', padding: '24px',
                display: 'flex', flexDirection: 'column',
                cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.2s, transform 0.15s',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Icon + title + arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '13px',
                  background: iconGradient, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 12px ${accent}35`,
                }}>
                  <Icon size={22} color="#fff" />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: '-0.2px', flex: 1 }}>
                  {label}
                </h3>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                  background: 'rgba(255,255,255,0.85)', border: `1px solid ${accentBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ArrowRight size={13} color={accent} />
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: accentBorder, marginBottom: '14px', opacity: 0.5 }} />

              {/* Description */}
              <p style={{ fontSize: '13.5px', color: TEXT_SECONDARY, lineHeight: 1.65, flexGrow: 1 }}>
                {desc}
              </p>

              {/* Stat */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: '18px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: accent }}>{stat}</span>
              </div>
            </div>
          );

          return action === 'chat'
            ? <div key={label} onClick={openChat}>{card}</div>
            : <Link key={label} to={to!} style={{ textDecoration: 'none' }}>{card}</Link>;
        })}
      </div>

    </div>
  );
}

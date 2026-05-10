import { Link } from 'react-router-dom';
import { Bot, ShieldAlert, Clock, CheckCircle, Circle, ArrowRight, TrendingUp, Building2, AlertTriangle, Activity, Zap } from 'lucide-react';
import { agents } from '../data/agents';

const CARD = '#fff';
const BORDER = '#E2E8F0';
const TEXT_PRIMARY = '#0F172A';
const TEXT_SECONDARY = '#64748B';
const TEXT_MUTED = '#94A3B8';

const riskColor = { Low: '#059669', Medium: '#D97706', High: '#DC2626' } as const;
const riskBg   = { Low: '#ECFDF5', Medium: '#FFFBEB', High: '#FEF2F2' } as const;
const statusDot = { Active: '#10B981', 'Under Review': '#F59E0B', Deprecated: '#94A3B8' } as const;

const recentAgents   = [...agents].sort((a, b) => b.registeredDate.localeCompare(a.registeredDate)).slice(0, 5);
const pendingAgents  = agents.filter((a) => a.status === 'Under Review');
const highRiskAgents = agents.filter((a) => a.riskLevel === 'High').slice(0, 5);

const lowCount  = agents.filter((a) => a.riskLevel === 'Low').length;
const midCount  = agents.filter((a) => a.riskLevel === 'Medium').length;
const highCount = agents.filter((a) => a.riskLevel === 'High').length;

const adoptionMetrics = [
  { id: 'AGT-003', name: 'Customer Support Agent',        dept: 'Customer Success',    calls: 18420, trend: +12 },
  { id: 'AGT-005', name: 'Code Review Assistant',         dept: 'Engineering',         calls: 14300, trend: +8  },
  { id: 'AGT-001', name: 'HR Policy Assistant',           dept: 'Human Resources',     calls: 9870,  trend: +21 },
  { id: 'AGT-009', name: 'Executive Meeting Summarizer',  dept: 'Office of the CEO',   calls: 7540,  trend: +5  },
  { id: 'AGT-008', name: 'Procurement Assistant',         dept: 'Operations',          calls: 5210,  trend: -3  },
];
const maxCalls = adoptionMetrics[0].calls;

const stats = [
  { label: 'Total Agents',  value: agents.length,                                  icon: Bot,           color: '#4F46E5', bg: '#EEF2FF' },
  { label: 'Active',        value: agents.filter(a => a.status === 'Active').length, icon: CheckCircle,  color: '#059669', bg: '#ECFDF5' },
  { label: 'High Risk',     value: highCount,                                        icon: AlertTriangle, color: '#DC2626', bg: '#FEF2F2' },
  { label: 'Departments',   value: new Set(agents.map(a => a.department)).size,      icon: Building2,     color: '#0891B2', bg: '#ECFEFF' },
];

function PanelCard({ title, count, linkTo, linkLabel, children }: {
  title: string; count?: number; linkTo: string; linkLabel: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px 12px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h2 style={{ fontSize: '13.5px', fontWeight: 700, color: TEXT_PRIMARY }}>{title}</h2>
        {count !== undefined && (
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#4F46E5', background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: '10px', padding: '1px 8px' }}>
            {count}
          </span>
        )}
      </div>
      <div style={{ flex: 1, padding: '8px 0' }}>{children}</div>
      <div style={{ padding: '12px 20px', borderTop: `1px solid ${BORDER}` }}>
        <Link to={linkTo} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', fontWeight: 600, color: '#4F46E5', textDecoration: 'none',
          background: '#EEF2FF', border: '1px solid #C7D2FE',
          padding: '6px 14px', borderRadius: '20px',
        }}>
          {linkLabel} <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '22px' }}>
        <p style={{ fontSize: '12.5px', color: TEXT_MUTED, marginBottom: '3px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h1 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.5px' }}>
          Good morning, Akash 👋
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '12px', marginBottom: '22px' }}>
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={17} color={color} />
            </div>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: TEXT_PRIMARY, lineHeight: 1, letterSpacing: '-0.6px' }}>{value}</div>
              <div style={{ fontSize: '11.5px', color: TEXT_MUTED, fontWeight: 500, marginTop: '3px' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 3-panel row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>

        {/* Agent Registry */}
        <PanelCard title="Agent Registry" count={agents.length} linkTo="/agents" linkLabel="View All Agents">
          {recentAgents.map((agent) => (
            <div key={agent.id} style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${BORDER}` }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#EEF2FF', border: '1px solid #C7D2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={14} color="#4F46E5" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '12.5px', fontWeight: 600, color: TEXT_PRIMARY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.name}</p>
                <p style={{ fontSize: '11px', color: TEXT_MUTED, marginTop: '1px' }}>{agent.department}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: riskColor[agent.riskLevel], background: riskBg[agent.riskLevel], borderRadius: '5px', padding: '1px 6px' }}>
                  {agent.riskLevel}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', color: TEXT_MUTED }}>
                  <Circle size={5} fill={statusDot[agent.status]} color={statusDot[agent.status]} />
                  {agent.status}
                </span>
              </div>
            </div>
          ))}
        </PanelCard>

        {/* Pending Reviews */}
        <PanelCard title="Pending Reviews" count={pendingAgents.length} linkTo="/agents" linkLabel="Manage Reviews">
          {pendingAgents.length === 0 ? (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: TEXT_MUTED }}>
              <CheckCircle size={26} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.35 }} />
              <p style={{ fontSize: '12.5px', fontWeight: 500 }}>No pending reviews</p>
            </div>
          ) : pendingAgents.map((agent) => (
            <div key={agent.id} style={{ padding: '12px 20px', borderBottom: `1px solid ${BORDER}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '12.5px', fontWeight: 600, color: TEXT_PRIMARY, marginBottom: '2px' }}>{agent.name}</p>
                  <p style={{ fontSize: '11px', color: TEXT_MUTED }}>{agent.owner} · {agent.department}</p>
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#D97706', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '5px', padding: '2px 7px', flexShrink: 0 }}>
                  Review
                </span>
              </div>
              <div style={{ marginTop: '7px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={10} color={TEXT_MUTED} />
                <span style={{ fontSize: '10.5px', color: TEXT_MUTED }}>Registered {agent.registeredDate}</span>
              </div>
            </div>
          ))}
          {pendingAgents.length > 0 && pendingAgents.length < 3 && (
            <div style={{ padding: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: '11.5px', color: TEXT_MUTED }}>{5 - pendingAgents.length} review slots available</p>
            </div>
          )}
        </PanelCard>

        {/* High-Risk Agents */}
        <PanelCard title="High-Risk Agents" count={highRiskAgents.length} linkTo="/agents" linkLabel="View Risk Overview">
          {highRiskAgents.map((agent) => (
            <div key={agent.id} style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${BORDER}` }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#FEF2F2', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldAlert size={14} color="#DC2626" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '12.5px', fontWeight: 600, color: TEXT_PRIMARY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.name}</p>
                <p style={{ fontSize: '11px', color: TEXT_MUTED, marginTop: '1px' }}>Audited {agent.lastAudited}</p>
              </div>
              <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '5px', padding: '1px 6px', flexShrink: 0 }}>
                High
              </span>
            </div>
          ))}
        </PanelCard>
      </div>

      {/* Bottom row: Risk + Adoption */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>

        {/* Risk Distribution */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '18px' }}>
            <TrendingUp size={14} color="#4F46E5" />
            <h2 style={{ fontSize: '13.5px', fontWeight: 700, color: TEXT_PRIMARY }}>Risk Distribution</h2>
          </div>
          {[
            { label: 'Low Risk',    count: lowCount,  color: '#059669', track: '#D1FAE5' },
            { label: 'Medium Risk', count: midCount,  color: '#D97706', track: '#FDE68A' },
            { label: 'High Risk',   count: highCount, color: '#DC2626', track: '#FECACA' },
          ].map(({ label, count, color, track }) => {
            const pct = Math.round((count / agents.length) * 100);
            return (
              <div key={label} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: TEXT_SECONDARY }}>{label}</span>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color }}>
                    {count} <span style={{ fontSize: '10.5px', fontWeight: 500, color: TEXT_MUTED }}>({pct}%)</span>
                  </span>
                </div>
                <div style={{ height: '6px', background: track, borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px' }} />
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11.5px', color: TEXT_MUTED }}>Total registered</span>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: TEXT_PRIMARY }}>{agents.length} agents</span>
          </div>
        </div>

        {/* AI Adoption */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={14} color="#7C3AED" />
              <h2 style={{ fontSize: '13.5px', fontWeight: 700, color: TEXT_PRIMARY }}>AI Adoption</h2>
            </div>
            <span style={{ fontSize: '11px', background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '8px', padding: '2px 8px', fontWeight: 600, color: '#7C3AED' }}>
              Last 30 days
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {adoptionMetrics.map(({ id, name, dept, calls, trend }) => {
              const pct = Math.round((calls / maxCalls) * 100);
              const up  = trend >= 0;
              return (
                <div key={id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ flex: 1, minWidth: 0, marginRight: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: TEXT_PRIMARY, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{name}</span>
                      <span style={{ fontSize: '10.5px', color: TEXT_MUTED }}>{dept}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '10.5px', fontWeight: 600, color: up ? '#059669' : '#DC2626', background: up ? '#ECFDF5' : '#FEF2F2', borderRadius: '5px', padding: '1px 5px' }}>
                        {up ? '↑' : '↓'}{Math.abs(trend)}%
                      </span>
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: TEXT_PRIMARY, minWidth: '46px', textAlign: 'right' }}>
                        {calls.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '5px', background: '#EDE9FE', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #7C3AED, #A855F7)', borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', color: TEXT_MUTED, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={11} color="#7C3AED" />
              {adoptionMetrics.reduce((s, a) => s + a.calls, 0).toLocaleString()} total calls
            </span>
            <Link to="/agents" style={{ fontSize: '11.5px', fontWeight: 600, color: '#7C3AED', textDecoration: 'none' }}>
              Full breakdown →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

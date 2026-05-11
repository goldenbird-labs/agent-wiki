import { Link } from 'react-router-dom';
import { Bot, ShieldAlert, Clock, CheckCircle, Circle, ArrowRight, TrendingUp, Building2, AlertTriangle, Activity, Zap } from 'lucide-react';
import { agents } from '../data/agents';

// Corporate palette: navy, white, slate, blue accent
const C = '#FFFFFF';          // card
const B = '#E2E8F0';          // border
const T1 = '#0F172A';         // text primary
const T2 = '#64748B';         // text secondary
const T3 = '#94A3B8';         // text muted
const ACC = '#2563EB';        // blue accent (used sparingly)

const riskColor = { Low: '#16A34A', Medium: '#D97706', High: '#DC2626' } as const;
const riskBg   = { Low: '#F0FDF4', Medium: '#FFFBEB', High: '#FEF2F2' } as const;
const riskBorder = { Low: '#BBF7D0', Medium: '#FDE68A', High: '#FECACA' } as const;
const statusDot = { Active: '#16A34A', 'Under Review': '#D97706', Deprecated: '#94A3B8' } as const;

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
  { label: 'Total Agents',  value: agents.length,                                    icon: Bot,           },
  { label: 'Active',        value: agents.filter(a => a.status === 'Active').length,  icon: CheckCircle,   },
  { label: 'High Risk',     value: highCount,                                          icon: AlertTriangle, },
  { label: 'Departments',   value: new Set(agents.map(a => a.department)).size,        icon: Building2,     },
];

function PanelCard({ title, count, linkTo, linkLabel, children }: {
  title: string; count?: number; linkTo: string; linkLabel: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: C, border: `1px solid ${B}`, borderRadius: '12px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px 12px', borderBottom: `1px solid ${B}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, color: T1 }}>{title}</h2>
        {count !== undefined && (
          <span style={{ fontSize: '11px', fontWeight: 600, color: T2, background: '#F1F5F9', border: `1px solid ${B}`, borderRadius: '10px', padding: '1px 8px' }}>
            {count}
          </span>
        )}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ padding: '10px 18px', borderTop: `1px solid ${B}` }}>
        <Link to={linkTo} style={{
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          fontSize: '12px', fontWeight: 600, color: ACC, textDecoration: 'none',
          transition: 'opacity 0.15s',
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
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '12px', color: T3, marginBottom: '3px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <h1 style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 800, color: T1, letterSpacing: '-0.5px' }}>
          Good morning, Akash
        </h1>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginBottom: '20px' }}>
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} style={{ background: C, border: `1px solid ${B}`, borderRadius: '12px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F1F5F9', border: `1px solid ${B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={16} color={T2} strokeWidth={1.8} />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: T1, lineHeight: 1, letterSpacing: '-0.5px' }}>{value}</div>
              <div style={{ fontSize: '11px', color: T3, fontWeight: 500, marginTop: '3px' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 3 panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '14px' }}>

        <PanelCard title="Agent Registry" count={agents.length} linkTo="/agents" linkLabel="View All Agents">
          {recentAgents.map((agent) => (
            <div key={agent.id} style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${B}` }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F1F5F9', border: `1px solid ${B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={13} color={T2} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '12.5px', fontWeight: 600, color: T1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.name}</p>
                <p style={{ fontSize: '11px', color: T3, marginTop: '1px' }}>{agent.department}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: riskColor[agent.riskLevel], background: riskBg[agent.riskLevel], border: `1px solid ${riskBorder[agent.riskLevel]}`, borderRadius: '4px', padding: '1px 6px' }}>
                  {agent.riskLevel}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', color: T3 }}>
                  <Circle size={5} fill={statusDot[agent.status]} color={statusDot[agent.status]} />
                  {agent.status}
                </span>
              </div>
            </div>
          ))}
        </PanelCard>

        <PanelCard title="Pending Reviews" count={pendingAgents.length} linkTo="/agents" linkLabel="Manage Reviews">
          {pendingAgents.length === 0 ? (
            <div style={{ padding: '32px 18px', textAlign: 'center', color: T3 }}>
              <CheckCircle size={24} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.3 }} />
              <p style={{ fontSize: '12.5px', fontWeight: 500 }}>No pending reviews</p>
            </div>
          ) : pendingAgents.map((agent) => (
            <div key={agent.id} style={{ padding: '12px 18px', borderBottom: `1px solid ${B}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '12.5px', fontWeight: 600, color: T1, marginBottom: '2px' }}>{agent.name}</p>
                  <p style={{ fontSize: '11px', color: T3 }}>{agent.owner} · {agent.department}</p>
                </div>
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '4px', padding: '2px 7px', flexShrink: 0 }}>
                  Review
                </span>
              </div>
              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={10} color={T3} />
                <span style={{ fontSize: '10.5px', color: T3 }}>Registered {agent.registeredDate}</span>
              </div>
            </div>
          ))}
        </PanelCard>

        <PanelCard title="High-Risk Agents" count={highRiskAgents.length} linkTo="/agents" linkLabel="View Risk Overview">
          {highRiskAgents.map((agent) => (
            <div key={agent.id} style={{ padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${B}` }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldAlert size={13} color="#DC2626" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '12.5px', fontWeight: 600, color: T1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.name}</p>
                <p style={{ fontSize: '11px', color: T3, marginTop: '1px' }}>Audited {agent.lastAudited}</p>
              </div>
              <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', padding: '1px 6px', flexShrink: 0 }}>High</span>
            </div>
          ))}
        </PanelCard>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>

        {/* Risk Distribution */}
        <div style={{ background: C, border: `1px solid ${B}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '16px' }}>
            <TrendingUp size={14} color={T2} strokeWidth={1.8} />
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: T1 }}>Risk Distribution</h2>
          </div>
          {[
            { label: 'Low Risk',    count: lowCount,  color: '#16A34A', track: '#DCFCE7' },
            { label: 'Medium Risk', count: midCount,  color: '#D97706', track: '#FEF3C7' },
            { label: 'High Risk',   count: highCount, color: '#DC2626', track: '#FEE2E2' },
          ].map(({ label, count, color, track }) => {
            const pct = Math.round((count / agents.length) * 100);
            return (
              <div key={label} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: T2 }}>{label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color }}>
                    {count} <span style={{ fontSize: '10.5px', fontWeight: 400, color: T3 }}>({pct}%)</span>
                  </span>
                </div>
                <div style={{ height: '5px', background: track, borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px' }} />
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: `1px solid ${B}`, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11.5px', color: T3 }}>Total registered</span>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: T1 }}>{agents.length} agents</span>
          </div>
        </div>

        {/* AI Adoption */}
        <div style={{ background: C, border: `1px solid ${B}`, borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Activity size={14} color={T2} strokeWidth={1.8} />
              <h2 style={{ fontSize: '13px', fontWeight: 700, color: T1 }}>AI Adoption</h2>
            </div>
            <span style={{ fontSize: '11px', background: '#F1F5F9', border: `1px solid ${B}`, borderRadius: '6px', padding: '2px 8px', fontWeight: 600, color: T2 }}>
              Last 30 days
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {adoptionMetrics.map(({ id, name, dept, calls, trend }) => {
              const pct = Math.round((calls / maxCalls) * 100);
              const up = trend >= 0;
              return (
                <div key={id}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ flex: 1, minWidth: 0, marginRight: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: T1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{name}</span>
                      <span style={{ fontSize: '10.5px', color: T3 }}>{dept}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '10.5px', fontWeight: 600, color: up ? '#16A34A' : '#DC2626', background: up ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${up ? '#BBF7D0' : '#FECACA'}`, borderRadius: '4px', padding: '1px 5px' }}>
                        {up ? '↑' : '↓'}{Math.abs(trend)}%
                      </span>
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: T1, textAlign: 'right' }}>
                        {calls.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '4px', background: '#F1F5F9', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: T1, borderRadius: '2px' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: `1px solid ${B}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11.5px', color: T3, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={11} color={T3} />
              {adoptionMetrics.reduce((s, a) => s + a.calls, 0).toLocaleString()} total calls
            </span>
            <Link to="/agents" style={{ fontSize: '11.5px', fontWeight: 600, color: ACC, textDecoration: 'none' }}>
              Full breakdown →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

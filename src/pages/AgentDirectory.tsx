import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronRight, Circle, X } from 'lucide-react';
import { agents, type RiskLevel, type AgentStatus } from '../data/agents';

const CARD = '#fff';
const BORDER = '#E2E8F0';
const TEXT_PRIMARY = '#0F172A';
const TEXT_SECONDARY = '#64748B';
const TEXT_MUTED = '#94A3B8';

const riskStyle: Record<RiskLevel, { color: string; bg: string; border: string }> = {
  Low:    { color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
  Medium: { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  High:   { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
};

const statusStyle: Record<AgentStatus, { dot: string; label: string }> = {
  'Active':       { dot: '#10B981', label: '#059669' },
  'Under Review': { dot: '#F59E0B', label: '#D97706' },
  'Deprecated':   { dot: '#94A3B8', label: '#64748B' },
};

const ALL = 'All';

export default function AgentDirectory() {
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskLevel | typeof ALL>(ALL);
  const [statusFilter, setStatusFilter] = useState<AgentStatus | typeof ALL>(ALL);
  const [deptFilter, setDeptFilter] = useState<string>(ALL);

  const departments = useMemo(
    () => [ALL, ...Array.from(new Set(agents.map((a) => a.department))).sort()],
    []
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return agents.filter((a) => {
      const matchQ = !q || a.name.toLowerCase().includes(q) || a.owner.toLowerCase().includes(q)
        || a.department.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
        || a.tags.some((t) => t.toLowerCase().includes(q));
      return matchQ
        && (riskFilter === ALL || a.riskLevel === riskFilter)
        && (statusFilter === ALL || a.status === statusFilter)
        && (deptFilter === ALL || a.department === deptFilter);
    });
  }, [query, riskFilter, statusFilter, deptFilter]);

  const hasFilters = query || riskFilter !== ALL || statusFilter !== ALL || deptFilter !== ALL;
  const clearAll = () => { setQuery(''); setRiskFilter(ALL); setStatusFilter(ALL); setDeptFilter(ALL); };

  const selectStyle: React.CSSProperties = {
    fontSize: '13px', border: `1px solid ${BORDER}`, borderRadius: '8px',
    padding: '7px 12px', color: TEXT_SECONDARY, background: CARD,
    cursor: 'pointer', outline: 'none', appearance: 'none',
    WebkitAppearance: 'none', paddingRight: '28px',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.6px', marginBottom: '6px' }}>
          Agent Directory
        </h1>
        <p style={{ fontSize: '14px', color: TEXT_MUTED }}>
          {agents.length} registered agents across the organization
        </p>
      </div>

      {/* Search + Filters */}
      <div style={{
        background: CARD, border: `1px solid ${BORDER}`,
        borderRadius: '14px', padding: '16px 20px', marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search size={15} color={TEXT_MUTED} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by name, owner, department, or tag…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%', paddingLeft: '36px', paddingRight: query ? '36px' : '14px',
              paddingTop: '9px', paddingBottom: '9px',
              fontSize: '13.5px', border: `1px solid ${BORDER}`, borderRadius: '10px',
              outline: 'none', color: TEXT_PRIMARY, background: '#F8FAFC',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', color: TEXT_MUTED,
              display: 'flex', alignItems: 'center',
            }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: TEXT_MUTED }}>
            <SlidersHorizontal size={13} />
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Filters</span>
          </div>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value as RiskLevel | typeof ALL)} style={selectStyle}>
              <option value={ALL}>All Risk Levels</option>
              <option value="Low">Low Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="High">High Risk</option>
            </select>
            <ChevronRight size={12} color={TEXT_MUTED} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none' }} />
          </div>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as AgentStatus | typeof ALL)} style={selectStyle}>
              <option value={ALL}>All Statuses</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Deprecated">Deprecated</option>
            </select>
            <ChevronRight size={12} color={TEXT_MUTED} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none' }} />
          </div>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} style={selectStyle}>
              {departments.map((d) => (
                <option key={d} value={d}>{d === ALL ? 'All Departments' : d}</option>
              ))}
            </select>
            <ChevronRight size={12} color={TEXT_MUTED} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none' }} />
          </div>

          {hasFilters && (
            <button onClick={clearAll} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12.5px', color: '#4F46E5', fontWeight: 600, padding: '0 4px',
            }}>
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <div style={{ marginBottom: '12px' }}>
        <p style={{ fontSize: '12.5px', color: TEXT_MUTED }}>
          Showing <strong style={{ color: TEXT_SECONDARY }}>{filtered.length}</strong> of {agents.length} agents
        </p>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px', color: TEXT_MUTED }}>
          <Search size={32} style={{ margin: '0 auto 12px', opacity: 0.4, display: 'block' }} />
          <p style={{ fontSize: '14px', fontWeight: 600, color: TEXT_SECONDARY, marginBottom: '8px' }}>No agents match your filters</p>
          <button onClick={clearAll} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#4F46E5', fontWeight: 600 }}>
            Clear all filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((agent) => {
            const risk = riskStyle[agent.riskLevel];
            const status = statusStyle[agent.status];
            return (
              <div
                key={agent.id}
                style={{
                  background: CARD, border: `1px solid ${BORDER}`,
                  borderRadius: '14px', padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C7D2FE';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.07)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = BORDER;
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', color: TEXT_MUTED, background: '#F8FAFC', border: `1px solid ${BORDER}`, borderRadius: '5px', padding: '1px 7px' }}>
                      {agent.id}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Circle size={7} fill={status.dot} color={status.dot} />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: status.label }}>{agent.status}</span>
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: risk.color, background: risk.bg, border: `1px solid ${risk.border}`, borderRadius: '6px', padding: '1px 8px' }}>
                      {agent.riskLevel} Risk
                    </span>
                  </div>

                  {/* Name + description */}
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: TEXT_PRIMARY, marginBottom: '4px' }}>{agent.name}</h3>
                  <p style={{ fontSize: '13px', color: TEXT_SECONDARY, lineHeight: 1.5, marginBottom: '10px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {agent.description}
                  </p>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: 'clamp(8px, 3vw, 16px)', flexWrap: 'wrap', marginBottom: '10px' }}>
                    {[
                      ['Owner', agent.owner],
                      ['Dept', agent.department],
                      ['Model', agent.model],
                      ['Audited', agent.lastAudited],
                    ].map(([k, v]) => (
                      <span key={k} style={{ fontSize: '12px', color: TEXT_MUTED }}>
                        <span style={{ fontWeight: 600, color: TEXT_SECONDARY }}>{k}:</span> {v}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {agent.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: '11.5px', color: TEXT_SECONDARY,
                        background: '#F8FAFC', border: `1px solid ${BORDER}`,
                        borderRadius: '6px', padding: '2px 9px', fontWeight: 500,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <ChevronRight size={16} color={TEXT_MUTED} style={{ flexShrink: 0 }} />
              </div>
            );
          })}
        </div>
      )}

      {/* Register CTA */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <Link to="/register" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          color: '#fff', fontSize: '13.5px', fontWeight: 600,
          padding: '10px 24px', borderRadius: '10px', textDecoration: 'none',
          boxShadow: '0 2px 12px rgba(79,70,229,0.3)',
        }}>
          Register a New Agent →
        </Link>
      </div>
    </div>
  );
}

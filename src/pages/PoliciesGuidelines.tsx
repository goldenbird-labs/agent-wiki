import { useState } from 'react';
import { ChevronRight, BookOpen, Calendar, User, AlertCircle } from 'lucide-react';
import { policies } from '../data/policies';

const CARD = '#fff';
const BORDER = '#E2E8F0';
const TEXT_PRIMARY = '#0F172A';
const TEXT_SECONDARY = '#64748B';
const TEXT_MUTED = '#94A3B8';

function PolicyCard({ policy }: { policy: typeof policies[0] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '12px' }}>
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', padding: '20px 24px',
          display: 'flex', alignItems: 'flex-start', gap: '16px',
          background: 'none', border: 'none', cursor: 'pointer',
          borderBottom: open ? `1px solid ${BORDER}` : 'none',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
      >
        <div style={{ width: '38px', height: '38px', background: '#EEF2FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
          <BookOpen size={16} color="#4F46E5" />
        </div>

        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontFamily: 'monospace', color: TEXT_MUTED, background: '#F8FAFC', border: `1px solid ${BORDER}`, borderRadius: '4px', padding: '1px 7px' }}>
              {policy.id}
            </span>
            <span style={{ fontSize: '11px', color: TEXT_MUTED, background: '#F8FAFC', border: `1px solid ${BORDER}`, borderRadius: '4px', padding: '1px 7px' }}>
              v{policy.version}
            </span>
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: TEXT_PRIMARY, marginBottom: '6px', letterSpacing: '-0.2px' }}>{policy.title}</h3>
          <p style={{ fontSize: '13px', color: TEXT_SECONDARY, lineHeight: 1.6, marginBottom: '10px' }}>{policy.summary}</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: TEXT_MUTED }}>
              <Calendar size={11} /> Effective {policy.effectiveDate}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: TEXT_MUTED }}>
              <User size={11} /> {policy.owner}
            </span>
          </div>
        </div>

        <div style={{ flexShrink: 0, marginTop: '2px', transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
          <ChevronRight size={16} color={TEXT_MUTED} />
        </div>
      </button>

      {/* Sections */}
      {open && (
        <div style={{ padding: '16px 24px 20px' }}>
          {policy.sections.map((section) => {
            const isOpen = expanded === section.id;
            return (
              <div key={section.id} style={{ border: `1px solid ${BORDER}`, borderRadius: '10px', marginBottom: '8px', overflow: 'hidden' }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : section.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '12px 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: isOpen ? '#F8FAFC' : 'none', border: 'none', cursor: 'pointer',
                    borderBottom: isOpen ? `1px solid ${BORDER}` : 'none',
                  }}
                >
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: TEXT_PRIMARY }}>{section.title}</span>
                  <div style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}>
                    <ChevronRight size={14} color={TEXT_MUTED} />
                  </div>
                </button>
                {isOpen && (
                  <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {section.content.map((para, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4F46E5', marginTop: '8px', flexShrink: 0 }} />
                        <p style={{ fontSize: '13.5px', color: TEXT_SECONDARY, lineHeight: 1.65 }}>{para}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function PoliciesGuidelines() {
  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.6px', marginBottom: '8px' }}>
          Policies & Guidelines
        </h1>
        <p style={{ fontSize: '14px', color: TEXT_MUTED }}>
          Official AI governance policies for agent registration, responsible use, data handling, and ongoing oversight.
        </p>
      </div>

      {/* Notice */}
      <div style={{
        background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '14px',
        padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: '12px',
        marginBottom: '24px',
      }}>
        <div style={{ width: '32px', height: '32px', background: '#FEF3C7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <AlertCircle size={15} color="#D97706" />
        </div>
        <div>
          <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#92400E', marginBottom: '3px' }}>Policy Acknowledgment Required</p>
          <p style={{ fontSize: '13px', color: '#B45309', lineHeight: 1.5 }}>
            All employees deploying or operating AI agents are expected to read and comply with these policies. Questions? Contact{' '}
            <strong>ai-governance@company.com</strong>
          </p>
        </div>
      </div>

      {/* Policies */}
      {policies.map((policy) => (
        <PolicyCard key={policy.id} policy={policy} />
      ))}

      {/* Meta card */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginTop: '8px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: TEXT_PRIMARY, marginBottom: '6px' }}>Policy Lifecycle</h3>
        <p style={{ fontSize: '13px', color: TEXT_SECONDARY, marginBottom: '20px', lineHeight: 1.6 }}>
          All policies are reviewed semi-annually by the AI Governance Committee. Proposed changes go through a 30-day comment period before adoption.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
          {[{ label: 'Active Policies', value: String(policies.length) }, { label: 'Last Updated', value: 'Feb 2026' }, { label: 'Next Review', value: 'Aug 2026' }].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center', padding: '12px', background: '#F8FAFC', borderRadius: '10px', border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: '22px', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.5px', marginBottom: '4px' }}>{value}</div>
              <div style={{ fontSize: '11.5px', color: TEXT_MUTED, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

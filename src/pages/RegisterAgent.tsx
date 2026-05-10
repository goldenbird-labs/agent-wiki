import { useState } from 'react';
import { CheckCircle, Info } from 'lucide-react';

const CARD = '#fff';
const BORDER = '#E2E8F0';
const TEXT_PRIMARY = '#0F172A';
const TEXT_SECONDARY = '#64748B';
const TEXT_MUTED = '#94A3B8';

type FormData = {
  agentName: string; ownerName: string; ownerEmail: string; department: string;
  description: string; useCase: string; modelProvider: string; modelName: string;
  riskLevel: string; dataAccess: string; externalAPIs: string;
  humanOversight: string; productionDate: string; executiveSponsor: string; additionalNotes: string;
};

const initialForm: FormData = {
  agentName: '', ownerName: '', ownerEmail: '', department: '',
  description: '', useCase: '', modelProvider: '', modelName: '',
  riskLevel: '', dataAccess: '', externalAPIs: '',
  humanOversight: '', productionDate: '', executiveSponsor: '', additionalNotes: '',
};

const departments = [
  'Engineering', 'Human Resources', 'Legal', 'Finance & Compliance',
  'Customer Success', 'Information Security', 'Operations', 'Strategy & Insights',
  'Marketing', 'Product', 'Risk & Compliance', 'Office of the CEO', 'Other',
];

const modelProviders = ['Anthropic', 'OpenAI', 'Google DeepMind', 'Meta (Llama)', 'Mistral', 'Cohere', 'Other'];

const inputStyle = (error?: boolean): React.CSSProperties => ({
  width: '100%', padding: '9px 12px', fontSize: '13.5px',
  border: `1px solid ${error ? '#FCA5A5' : BORDER}`,
  background: error ? '#FFF5F5' : '#F8FAFC',
  borderRadius: '9px', outline: 'none', color: TEXT_PRIMARY,
  transition: 'border-color 0.15s',
});

const selectStyle = (error?: boolean): React.CSSProperties => ({
  ...inputStyle(error),
  appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer',
});

function SectionCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '16px', padding: 'clamp(14px, 4vw, 24px)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '14px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{
          width: '24px', height: '24px', borderRadius: '6px',
          background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff' }}>{number}</span>
        </div>
        <h2 style={{ fontSize: '14px', fontWeight: 700, color: TEXT_PRIMARY }}>{title}</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>{children}</div>
    </div>
  );
}

function Field({ label, required, hint, error, children }: { label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: TEXT_SECONDARY, marginBottom: '6px' }}>
        {label}{required && <span style={{ color: '#EF4444', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
      {hint && (
        <p style={{ marginTop: '5px', fontSize: '12px', color: TEXT_MUTED, display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
          <Info size={11} style={{ marginTop: '1px', flexShrink: 0 }} /> {hint}
        </p>
      )}
      {error && <p style={{ marginTop: '4px', fontSize: '12px', color: '#EF4444', fontWeight: 500 }}>{error}</p>}
    </div>
  );
}

export default function RegisterAgent() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: '' }));
  };

  const validate = () => {
    const required: (keyof FormData)[] = ['agentName', 'ownerName', 'ownerEmail', 'department', 'description', 'useCase', 'modelProvider', 'riskLevel', 'dataAccess', 'humanOversight'];
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    for (const f of required) if (!form[f].trim()) newErrors[f] = 'This field is required';
    if (form.ownerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ownerEmail)) newErrors.ownerEmail = 'Enter a valid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) setSubmitted(true); };

  const riskOptions = [
    { level: 'Low', desc: 'Internal tools, no PII, human-reviewed outputs', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
    { level: 'Medium', desc: 'Customer-facing or processes business data', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
    { level: 'High', desc: 'Financial, legal, or safety-critical decisions', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  ];

  if (submitted) {
    return (
      <div style={{ maxWidth: '560px', margin: '40px auto', textAlign: 'center', padding: '0 20px' }}>
        <div style={{ width: '64px', height: '64px', background: '#ECFDF5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <CheckCircle size={32} color="#059669" />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: TEXT_PRIMARY, marginBottom: '8px', letterSpacing: '-0.4px' }}>Registration Submitted</h2>
        <p style={{ fontSize: '14px', color: TEXT_SECONDARY, marginBottom: '4px' }}>
          <strong style={{ color: TEXT_PRIMARY }}>{form.agentName}</strong> has been submitted for review.
        </p>
        <p style={{ fontSize: '13.5px', color: TEXT_MUTED, marginBottom: '28px', lineHeight: 1.6 }}>
          The AI Governance Committee will respond within{' '}
          {form.riskLevel === 'High' ? '5–10 business days' : form.riskLevel === 'Medium' ? '3–5 business days' : '1–2 business days'}.
          A confirmation will be sent to <strong style={{ color: TEXT_SECONDARY }}>{form.ownerEmail}</strong>.
        </p>
        <div style={{ background: '#F8FAFC', border: `1px solid ${BORDER}`, borderRadius: '14px', padding: '18px 20px', textAlign: 'left', marginBottom: '24px' }}>
          {[['Agent Name', form.agentName], ['Owner', form.ownerName], ['Department', form.department], ['Risk Level', form.riskLevel], ['Model Provider', form.modelProvider]].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontSize: '12.5px', color: TEXT_MUTED }}>{l}</span>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: TEXT_PRIMARY }}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setSubmitted(false); setForm(initialForm); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13.5px', color: '#4F46E5', fontWeight: 600 }}>
          Register another agent →
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.6px', marginBottom: '8px' }}>
          Register an Agent
        </h1>
        <p style={{ fontSize: '14px', color: TEXT_SECONDARY }}>
          All AI agents must be registered before production use. Fields marked <span style={{ color: '#EF4444' }}>*</span> are required.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <SectionCard number="1" title="Agent Identity">
          <Field label="Agent Name" required error={errors.agentName}>
            <input type="text" placeholder="e.g., HR Policy Assistant" value={form.agentName} onChange={set('agentName')} style={inputStyle(!!errors.agentName)} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <Field label="Owner Full Name" required error={errors.ownerName}>
              <input type="text" placeholder="Jane Smith" value={form.ownerName} onChange={set('ownerName')} style={inputStyle(!!errors.ownerName)} />
            </Field>
            <Field label="Owner Email" required error={errors.ownerEmail}>
              <input type="email" placeholder="jane@company.com" value={form.ownerEmail} onChange={set('ownerEmail')} style={inputStyle(!!errors.ownerEmail)} />
            </Field>
          </div>
          <Field label="Department" required error={errors.department}>
            <select value={form.department} onChange={set('department')} style={selectStyle(!!errors.department)}>
              <option value="">Select a department</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
        </SectionCard>

        <SectionCard number="2" title="Purpose & Use Case">
          <Field label="Agent Description" required error={errors.description}>
            <textarea placeholder="Describe what this agent does, how it works, and who uses it…" value={form.description} onChange={set('description')} rows={3} style={{ ...inputStyle(!!errors.description), resize: 'vertical' }} />
          </Field>
          <Field label="Specific Use Case" required hint="A concise, one-line summary of the primary function." error={errors.useCase}>
            <input type="text" placeholder="e.g., Employee self-service HR query resolution" value={form.useCase} onChange={set('useCase')} style={inputStyle(!!errors.useCase)} />
          </Field>
        </SectionCard>

        <SectionCard number="3" title="Technical Configuration">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <Field label="Model Provider" required error={errors.modelProvider}>
              <select value={form.modelProvider} onChange={set('modelProvider')} style={selectStyle(!!errors.modelProvider)}>
                <option value="">Select provider</option>
                {modelProviders.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Model Name / Version">
              <input type="text" placeholder="e.g., claude-sonnet-4-6" value={form.modelName} onChange={set('modelName')} style={inputStyle()} />
            </Field>
          </div>
          <Field label="Data Access" required hint="List every system, database, or data source the agent can read or write." error={errors.dataAccess}>
            <textarea placeholder="e.g., HR Policy Documents, Employee Handbook, Workday HRIS…" value={form.dataAccess} onChange={set('dataAccess')} rows={2} style={{ ...inputStyle(!!errors.dataAccess), resize: 'vertical' }} />
          </Field>
          <Field label="External APIs or Integrations">
            <input type="text" placeholder="e.g., Slack, Salesforce CRM — or 'None'" value={form.externalAPIs} onChange={set('externalAPIs')} style={inputStyle()} />
          </Field>
        </SectionCard>

        <SectionCard number="4" title="Risk & Governance">
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: TEXT_SECONDARY, marginBottom: '10px' }}>
              Risk Level <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
              {riskOptions.map(({ level, desc, color, bg }) => (
                <button key={level} type="button" onClick={() => { setForm((f) => ({ ...f, riskLevel: level })); setErrors((e) => ({ ...e, riskLevel: '' })); }}
                  style={{
                    border: `2px solid ${form.riskLevel === level ? color : BORDER}`,
                    background: form.riskLevel === level ? bg : '#F8FAFC',
                    borderRadius: '12px', padding: '14px', textAlign: 'left', cursor: 'pointer',
                    transition: 'border-color 0.15s, background 0.15s',
                  }}>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: form.riskLevel === level ? color : TEXT_PRIMARY, marginBottom: '4px' }}>{level}</div>
                  <div style={{ fontSize: '11.5px', color: TEXT_MUTED, lineHeight: 1.4 }}>{desc}</div>
                </button>
              ))}
            </div>
            {errors.riskLevel && <p style={{ marginTop: '6px', fontSize: '12px', color: '#EF4444' }}>{errors.riskLevel}</p>}
          </div>

          <Field label="Human Oversight Mechanism" required error={errors.humanOversight}>
            <select value={form.humanOversight} onChange={set('humanOversight')} style={selectStyle(!!errors.humanOversight)}>
              <option value="">Select oversight type</option>
              <option value="Human-in-the-loop">Human-in-the-loop (approves every output)</option>
              <option value="Human-on-the-loop">Human-on-the-loop (monitors, can intervene)</option>
              <option value="Fully autonomous">Fully autonomous (no human review per action)</option>
              <option value="Human review on escalation">Human review on escalation only</option>
            </select>
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <Field label="Target Production Date">
              <input type="date" value={form.productionDate} onChange={set('productionDate')} style={inputStyle()} />
            </Field>
            <Field label="Executive Sponsor" hint="Required for High-risk agents.">
              <input type="text" placeholder="e.g., VP of Engineering" value={form.executiveSponsor} onChange={set('executiveSponsor')} style={inputStyle()} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard number="5" title="Additional Information">
          <Field label="Notes for Reviewers">
            <textarea placeholder="Any additional context, constraints, or considerations the governance committee should know…" value={form.additionalNotes} onChange={set('additionalNotes')} rows={3} style={{ ...inputStyle(), resize: 'vertical' }} />
          </Field>
        </SectionCard>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginTop: '8px', paddingBottom: '8px' }}>
          <p style={{ fontSize: '12px', color: TEXT_MUTED, maxWidth: '380px', lineHeight: 1.5 }}>
            By submitting, you confirm this agent complies with organizational AI policies and accept responsibility as the designated owner.
          </p>
          <button type="submit" style={{
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            color: '#fff', fontSize: '14px', fontWeight: 600,
            padding: '11px 26px', borderRadius: '10px', border: 'none',
            cursor: 'pointer', boxShadow: '0 2px 12px rgba(79,70,229,0.3)',
            whiteSpace: 'nowrap',
          }}>
            Submit for Review →
          </button>
        </div>
      </form>
    </div>
  );
}

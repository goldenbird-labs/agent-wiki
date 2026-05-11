import { Link } from 'react-router-dom';
import { useChatContext } from '../context/ChatContext';
import {
  TrendingUp, ShieldCheck, Clock, AlertTriangle, CheckCircle,
  ArrowRight, BarChart3, Users, FileText, Bot, DollarSign,
  Zap, Eye, Lock, Award, ChevronRight,
} from 'lucide-react';

const T1 = '#0F172A';
const T2 = '#64748B';
const T3 = '#94A3B8';
const BORDER = '#E2E8F0';
const CARD = '#FFFFFF';
const ACC = '#2563EB';

// ─── Data ────────────────────────────────────────────────────────────────────

const roiStats = [
  { value: '73%', label: 'Reduction in shadow AI incidents', icon: ShieldCheck, desc: 'Organizations using a formal AI registry see significantly fewer unregistered, ungoverned agents in production.' },
  { value: '4.2×', label: 'Faster regulatory audit response', icon: Clock, desc: 'Centralized agent records, data access logs, and audit trails cut audit preparation from weeks to days.' },
  { value: '$2.4M', label: 'Average compliance penalty avoided', icon: DollarSign, desc: 'Non-compliance with EU AI Act, GDPR, and SOC2 for unregistered AI systems carries significant financial exposure.' },
  { value: '61%', label: 'Decrease in AI-related incidents', icon: AlertTriangle, desc: 'Mandatory risk classification and human oversight requirements reduce production failures and reputational harm.' },
];

const problems = [
  { title: 'No visibility into what AI agents exist', desc: 'Teams deploy AI tools independently. Security and compliance have no central record of what agents are running, who owns them, or what data they access.' },
  { title: 'Regulatory exposure is growing fast', desc: 'The EU AI Act, GDPR Article 22, and sector-specific rules (HIPAA, FINRA) require documented oversight of automated decision-making. Most organizations are unprepared.' },
  { title: 'Audit prep takes weeks', desc: 'When regulators ask "show us your AI inventory," teams spend weeks pulling spreadsheets, emailing owners, and reconstructing records — if they can at all.' },
  { title: 'Shadow AI is a silent liability', desc: 'A single unregistered agent accessing sensitive data is a breach waiting to happen. Without governance tooling, you cannot enforce the controls you cannot see.' },
];

const features = [
  { icon: Bot, title: 'Agent Directory', desc: 'A single source of truth for every AI agent — ownership, model, data access, risk level, and compliance status in one searchable registry.' },
  { icon: FileText, title: 'Structured Registration', desc: 'Standardized intake forms capture everything needed for governance review: use case, data scope, risk classification, and oversight mechanism.' },
  { icon: ShieldCheck, title: 'Policy Enforcement', desc: 'Built-in responsible AI policies aligned with EU AI Act, NIST AI RMF, and ISO 42001. Every agent deployment is measured against live requirements.' },
  { icon: BarChart3, title: 'Adoption Analytics', desc: 'Track which agents are being used, by how many people, and how usage trends over time — turning AI governance into an executive KPI.' },
  { icon: Eye, title: 'Risk Classification', desc: 'Automated risk tiering (Low / Medium / High) with differential approval workflows, audit cadence, and escalation paths built in by default.' },
  { icon: Zap, title: 'AI Governance Assistant', desc: 'An embedded AI chat assistant that answers governance questions, guides registrations, and surfaces policy gaps in real time.' },
];

const timeline = [
  { week: 'Week 1', title: 'Deploy & onboard', desc: 'Stand up AgentWiki, import existing agent inventory, and configure approval workflows for your organization.' },
  { week: 'Week 2', title: 'Register all agents', desc: 'Business units complete structured registrations. Risk classifications are assigned. Data access is documented.' },
  { week: 'Week 3', title: 'Policy alignment', desc: 'Governance committee reviews registrations against policies. High-risk agents enter oversight workflows.' },
  { week: 'Week 4+', title: 'Continuous oversight', desc: 'Monitoring dashboards go live. Audit readiness is ongoing. ROI is measurable within the first quarter.' },
];

const testimonials = [
  { quote: 'AgentWiki cut our AI audit preparation from three weeks to two days. The regulator asked for our AI inventory — we exported it in minutes.', name: 'Chief Risk Officer', org: 'Global Financial Services Firm' },
  { quote: 'We had 40+ AI tools deployed with no central registry. Within a month of using AgentWiki, we had full visibility and three agents flagged for immediate remediation.', name: 'CISO', org: 'Healthcare Technology Company' },
  { quote: 'The ROI was clear before we even finished onboarding. One prevented compliance incident paid for the platform many times over.', name: 'Head of AI Governance', org: 'Insurance Group' },
];

const compareRows = [
  { feature: 'Centralized agent inventory', without: false, with: true },
  { feature: 'Structured risk classification', without: false, with: true },
  { feature: 'Audit-ready documentation', without: false, with: true },
  { feature: 'Policy compliance tracking', without: false, with: true },
  { feature: 'Human oversight enforcement', without: false, with: true },
  { feature: 'Real-time adoption analytics', without: false, with: true },
  { feature: 'Regulatory framework alignment', without: false, with: true },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '20px', padding: '4px 12px', marginBottom: '14px' }}>
      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: ACC }} />
      <span style={{ fontSize: '11px', fontWeight: 600, color: ACC, letterSpacing: '0.5px' }}>{children}</span>
    </div>
  );
}

function SectionHeading({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: T1, letterSpacing: '-0.6px', lineHeight: 1.2, textAlign: center ? 'center' : 'left', marginBottom: '10px' }}>
      {children}
    </h2>
  );
}

function SectionSubtitle({ children, center }: { children: string; center?: boolean }) {
  return (
    <p style={{ fontSize: '15px', color: T2, lineHeight: 1.65, maxWidth: '560px', margin: center ? '0 auto 40px' : '0 0 40px', textAlign: center ? 'center' : 'left' }}>
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: '1px', background: BORDER, margin: '64px 0' }} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Demo() {
  const { openChat } = useChatContext();

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>

      {/* ── Hero ── */}
      <div style={{
        background: T1, borderRadius: '16px', padding: 'clamp(32px, 5vw, 56px)',
        marginBottom: '32px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.4)', borderRadius: '20px', padding: '4px 12px', marginBottom: '20px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#60A5FA' }} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#93C5FD', letterSpacing: '0.5px' }}>EXECUTIVE OVERVIEW</span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '16px', maxWidth: '680px' }}>
            Turn AI Governance from a Cost Centre into a Competitive Advantage
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: '560px', marginBottom: '32px' }}>
            AgentWiki gives your organization complete visibility, control, and auditability over every AI agent — reducing risk exposure while accelerating safe adoption of AI at scale.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#FFFFFF', color: T1, fontSize: '13.5px', fontWeight: 700, padding: '11px 22px', borderRadius: '8px', textDecoration: 'none' }}>
              Register Your First Agent <ArrowRight size={14} />
            </Link>
            <button onClick={openChat} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: '13.5px', fontWeight: 600, padding: '11px 22px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}>
              Ask AI Assistant
            </button>
          </div>
        </div>
      </div>

      {/* ── ROI Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '64px' }}>
        {roiStats.map(({ value, label, icon: Icon, desc }) => (
          <div key={label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#F1F5F9', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={15} color={T2} strokeWidth={1.8} />
              </div>
              <span style={{ fontSize: '28px', fontWeight: 800, color: T1, letterSpacing: '-0.8px', lineHeight: 1 }}>{value}</span>
            </div>
            <p style={{ fontSize: '12.5px', fontWeight: 600, color: T1, marginBottom: '6px' }}>{label}</p>
            <p style={{ fontSize: '11.5px', color: T3, lineHeight: 1.55 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* ── The Problem ── */}
      <div style={{ marginBottom: '64px' }}>
        <SectionLabel>THE PROBLEM</SectionLabel>
        <SectionHeading>Most organizations are flying blind on AI</SectionHeading>
        <SectionSubtitle>AI agents are being deployed faster than governance can keep up. The result is mounting regulatory, security, and operational risk.</SectionSubtitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {problems.map(({ title, desc }) => (
            <div key={title} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#FEF2F2', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626' }} />
                </div>
                <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: T1, lineHeight: 1.3 }}>{title}</h3>
              </div>
              <p style={{ fontSize: '12.5px', color: T2, lineHeight: 1.6, paddingLeft: '30px' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── The Solution: Before / After ── */}
      <div style={{ marginBottom: '64px' }}>
        <SectionLabel>THE SOLUTION</SectionLabel>
        <SectionHeading>AgentWiki vs. No Governance</SectionHeading>
        <SectionSubtitle>See what changes when AI governance moves from ad-hoc spreadsheets to a purpose-built platform.</SectionSubtitle>

        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: '#F8FAFC', borderBottom: `1px solid ${BORDER}` }}>
            <div style={{ padding: '12px 20px' }}><span style={{ fontSize: '12px', fontWeight: 700, color: T3, letterSpacing: '0.5px' }}>CAPABILITY</span></div>
            <div style={{ padding: '12px 20px', borderLeft: `1px solid ${BORDER}`, textAlign: 'center' }}><span style={{ fontSize: '12px', fontWeight: 700, color: '#DC2626' }}>Without AgentWiki</span></div>
            <div style={{ padding: '12px 20px', borderLeft: `1px solid ${BORDER}`, textAlign: 'center' }}><span style={{ fontSize: '12px', fontWeight: 700, color: '#16A34A' }}>With AgentWiki</span></div>
          </div>
          {compareRows.map(({ feature, without, with: withPlatform }, i) => (
            <div key={feature} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < compareRows.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ padding: '13px 20px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: T1 }}>{feature}</span>
              </div>
              <div style={{ padding: '13px 20px', borderLeft: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFBFB' }}>
                {without
                  ? <CheckCircle size={16} color="#16A34A" />
                  : <div style={{ width: '16px', height: '2px', background: '#FECACA', borderRadius: '1px' }} />}
              </div>
              <div style={{ padding: '13px 20px', borderLeft: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F0FDF4' }}>
                {withPlatform
                  ? <CheckCircle size={16} color="#16A34A" />
                  : <div style={{ width: '16px', height: '2px', background: '#BBF7D0', borderRadius: '1px' }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Features ── */}
      <div style={{ marginBottom: '64px' }}>
        <SectionLabel>PLATFORM CAPABILITIES</SectionLabel>
        <SectionHeading>Everything you need for enterprise AI governance</SectionHeading>
        <SectionSubtitle>Built for compliance, risk, and technology teams who need to govern AI at scale — without slowing down innovation.</SectionSubtitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F1F5F9', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Icon size={16} color={T1} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: T1, marginBottom: '8px' }}>{title}</h3>
              <p style={{ fontSize: '12.5px', color: T2, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── ROI Calculator ── */}
      <div style={{ marginBottom: '64px' }}>
        <SectionLabel>ROI BREAKDOWN</SectionLabel>
        <SectionHeading>Where the value comes from</SectionHeading>
        <SectionSubtitle>A mid-size enterprise with 20+ AI agents deployed can expect measurable returns across four dimensions.</SectionSubtitle>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { category: 'Compliance & Regulatory Risk', saving: '$800K – $2.4M', how: 'Avoiding fines under EU AI Act, GDPR Article 22, and sector-specific regulations through documented governance.', icon: Lock },
            { category: 'Audit Preparation Cost', saving: '$120K – $300K / yr', how: 'Reducing audit prep from 3–6 weeks of staff time to a real-time export. Applies across internal, external, and regulatory audits.', icon: FileText },
            { category: 'Incident Prevention', saving: '$400K – $1.5M / yr', how: 'Preventing AI-related data breaches, bias incidents, and failed deployments through mandatory risk review and oversight.', icon: ShieldCheck },
            { category: 'Productivity & Adoption', saving: '$200K – $600K / yr', how: 'Accelerating safe AI adoption by giving teams a clear, fast path from idea to approved deployment — reducing governance bottlenecks by 60%.', icon: TrendingUp },
          ].map(({ category, saving, how, icon: Icon }) => (
            <div key={category} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '18px 20px', display: 'flex', alignItems: 'flex-start', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F1F5F9', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color={T1} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: T1 }}>{category}</h3>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: ACC, whiteSpace: 'nowrap' }}>{saving}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: T2, lineHeight: 1.6 }}>{how}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total callout */}
        <div style={{ background: T1, borderRadius: '12px', padding: '20px 24px', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: '4px', letterSpacing: '0.4px' }}>ESTIMATED TOTAL ANNUAL VALUE</p>
            <p style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.8px' }}>$1.5M – $4.8M</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Typical payback period</p>
            <p style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF' }}>6 – 10 weeks</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Time to value ── */}
      <div style={{ marginBottom: '64px' }}>
        <SectionLabel>IMPLEMENTATION</SectionLabel>
        <SectionHeading>Live in 4 weeks, value from day one</SectionHeading>
        <SectionSubtitle>No lengthy implementation. AgentWiki is operational within a week and delivering measurable governance coverage in the first month.</SectionSubtitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {timeline.map(({ week, title, desc }, idx) => (
            <div key={week} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'relative' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: T1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#FFFFFF' }}>{idx + 1}</span>
              </div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: T3, letterSpacing: '0.5px', marginBottom: '4px' }}>{week.toUpperCase()}</p>
              <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: T1, marginBottom: '8px' }}>{title}</h3>
              <p style={{ fontSize: '12px', color: T2, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Testimonials ── */}
      <div style={{ marginBottom: '64px' }}>
        <SectionLabel>SOCIAL PROOF</SectionLabel>
        <SectionHeading center>What governance leaders say</SectionHeading>
        <SectionSubtitle center>Organizations that have deployed AgentWiki report measurable impact within the first quarter.</SectionSubtitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {testimonials.map(({ quote, name, org }) => (
            <div key={name} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '28px', color: BORDER, lineHeight: 1, marginBottom: '12px', fontFamily: 'Georgia, serif' }}>"</div>
              <p style={{ fontSize: '13px', color: T1, lineHeight: 1.7, fontStyle: 'italic', flexGrow: 1, marginBottom: '18px' }}>{quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: `1px solid ${BORDER}`, paddingTop: '14px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: T1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={13} color="#FFFFFF" />
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: T1 }}>{name}</p>
                  <p style={{ fontSize: '11px', color: T3 }}>{org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Compliance badges ── */}
      <div style={{ marginBottom: '64px' }}>
        <SectionLabel>COMPLIANCE ALIGNMENT</SectionLabel>
        <SectionHeading>Built for the regulatory environment you operate in</SectionHeading>
        <SectionSubtitle>AgentWiki's governance framework is designed to support compliance with the major AI and data regulations globally.</SectionSubtitle>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['EU AI Act', 'GDPR Art. 22', 'NIST AI RMF', 'ISO 42001', 'SOC 2 Type II', 'HIPAA', 'CCPA', 'FINRA', 'MAS TRM'].map((reg) => (
            <div key={reg} style={{ display: 'flex', alignItems: 'center', gap: '7px', background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '8px 14px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
              <Award size={13} color={ACC} />
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: T1 }}>{reg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        background: T1, borderRadius: '16px',
        padding: 'clamp(32px, 5vw, 48px)',
        textAlign: 'center', marginBottom: '8px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.8px', marginBottom: '14px' }}>GET STARTED TODAY</p>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.6px', lineHeight: 1.2, marginBottom: '14px' }}>
            Ready to govern your AI agents?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Start with your agent inventory today. Governance coverage, audit readiness, and risk visibility — from week one.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#FFFFFF', color: T1, fontSize: '13.5px', fontWeight: 700, padding: '11px 24px', borderRadius: '8px', textDecoration: 'none' }}>
              Register an Agent <ArrowRight size={14} />
            </Link>
            <Link to="/agents" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: '13.5px', fontWeight: 600, padding: '11px 24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none' }}>
              View Agent Directory <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

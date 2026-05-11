import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useChatContext } from '../context/ChatContext';
import {
  Bot, ShieldCheck, Clock, DollarSign, AlertTriangle, TrendingUp,
  FileText, BarChart3, Eye, Zap, Lock, Award, Users, ArrowRight,
  CheckCircle, XCircle, ChevronRight, Sparkles, Activity,
} from 'lucide-react';

// ── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ target, prefix = '', suffix = '', duration = 1800 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ── Animate-in wrapper ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ── Animated bar ──────────────────────────────────────────────────────────────
function AnimBar({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setW(pct), delay);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct, delay]);
  return (
    <div ref={ref} style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${w}%`, background: color, borderRadius: '3px', transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const features = [
  { icon: Bot, title: 'Agent Directory', desc: 'A single source of truth for every AI agent — searchable, filterable, auditable.', color: '#6366F1', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)' },
  { icon: FileText, title: 'Structured Registration', desc: 'Standardized intake capturing use case, data scope, risk level, and oversight mechanism.', color: '#0EA5E9', bg: 'rgba(14,165,233,0.12)', border: 'rgba(14,165,233,0.3)' },
  { icon: ShieldCheck, title: 'Policy Enforcement', desc: 'Live policies aligned with EU AI Act, NIST AI RMF, and ISO 42001 — every agent measured against requirements.', color: '#10B981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)' },
  { icon: BarChart3, title: 'Adoption Analytics', desc: 'Track usage, invocations, active users and trends — turn AI governance into an executive KPI.', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)' },
  { icon: Eye, title: 'Risk Classification', desc: 'Tiered risk assessment with differential approval workflows and quarterly audit cadence built in.', color: '#EF4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)' },
  { icon: Zap, title: 'AI Governance Assistant', desc: 'Embedded AI chat that answers governance questions, guides registrations, and flags policy gaps instantly.', color: '#A855F7', bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.3)' },
];

const roiItems = [
  { label: 'Compliance & Regulatory Fines', range: '$800K – $2.4M', pct: 92, color: '#EF4444', icon: Lock },
  { label: 'Audit Preparation Cost', range: '$120K – $300K / yr', pct: 75, color: '#F59E0B', icon: FileText },
  { label: 'AI Incident Prevention', range: '$400K – $1.5M / yr', pct: 84, color: '#10B981', icon: ShieldCheck },
  { label: 'Productivity & Adoption', range: '$200K – $600K / yr', pct: 61, color: '#6366F1', icon: TrendingUp },
];

const timeline = [
  { step: '01', week: 'Week 1', title: 'Deploy & configure', desc: 'Platform live, approval workflows set, existing agent inventory imported.', color: '#6366F1' },
  { step: '02', week: 'Week 2', title: 'Register all agents', desc: 'Business units complete structured registrations. Risk tiers assigned. Data access documented.', color: '#0EA5E9' },
  { step: '03', week: 'Week 3', title: 'Policy alignment', desc: 'Governance committee reviews against live policies. High-risk agents enter oversight workflows.', color: '#10B981' },
  { step: '04', week: 'Week 4+', title: 'Continuous oversight', desc: 'Dashboards live. Audit readiness ongoing. ROI measurable within the first quarter.', color: '#F59E0B' },
];

const compareRows = [
  'Centralized AI agent inventory',
  'Structured risk classification',
  'Audit-ready documentation on demand',
  'Policy compliance tracking',
  'Human oversight enforcement',
  'Real-time adoption analytics',
  'Regulatory framework alignment',
  'Incident detection & response workflow',
];

const regulations = [
  { name: 'EU AI Act', color: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
  { name: 'GDPR Art. 22', color: '#0EA5E9', bg: 'rgba(14,165,233,0.1)' },
  { name: 'NIST AI RMF', color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
  { name: 'ISO 42001', color: '#6366F1', bg: 'rgba(99,102,241,0.1)' },
  { name: 'SOC 2 Type II', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  { name: 'HIPAA', color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  { name: 'CCPA', color: '#A855F7', bg: 'rgba(168,85,247,0.1)' },
  { name: 'FINRA', color: '#EC4899', bg: 'rgba(236,72,153,0.1)' },
  { name: 'MAS TRM', color: '#14B8A6', bg: 'rgba(20,184,166,0.1)' },
];

const testimonials = [
  { quote: 'AgentWiki cut our AI audit prep from three weeks to two days. The regulator asked for our AI inventory — we exported it in minutes.', name: 'Chief Risk Officer', org: 'Global Financial Services Firm', color: '#6366F1' },
  { quote: 'We had 40+ AI tools with no central registry. Within a month we had full visibility and three agents flagged for immediate remediation.', name: 'CISO', org: 'Healthcare Technology Company', color: '#0EA5E9' },
  { quote: 'One prevented compliance incident paid for the platform many times over. The ROI was clear before we even finished onboarding.', name: 'Head of AI Governance', org: 'Insurance Group', color: '#10B981' },
];

// ── Mock Dashboard Preview ────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div style={{ background: '#0F172A', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', userSelect: 'none' }}>
      {/* Window bar */}
      <div style={{ background: '#1E293B', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>agentwiki.enterprise.io/dashboard</div>
      </div>

      <div style={{ display: 'flex', height: '320px' }}>
        {/* Mini sidebar */}
        <div style={{ width: '48px', background: '#080E1A', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', gap: '14px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={13} color="#fff" />
          </div>
          {[BarChart3, Bot, FileText, ShieldCheck].map((Icon, i) => (
            <div key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', background: i === 0 ? 'rgba(99,102,241,0.2)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={14} color={i === 0 ? '#818CF8' : '#334155'} />
            </div>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'hidden' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>Good morning, Akash</div>

          {/* Stat row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
            {[['10', 'Agents', '#6366F1'], ['9', 'Active', '#10B981'], ['4', 'High Risk', '#EF4444'], ['10', 'Depts', '#0EA5E9']].map(([v, l, c]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{l}</div>
                <div style={{ height: '2px', background: c, borderRadius: '1px', marginTop: '6px', opacity: 0.7 }} />
              </div>
            ))}
          </div>

          {/* Panels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {/* Agent list */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>AGENT REGISTRY</div>
              {[['HR Policy Assistant', 'Low', '#10B981'], ['Legal Contract Reviewer', 'High', '#EF4444'], ['Customer Support Agent', 'Med', '#F59E0B'], ['Code Review Assistant', 'Low', '#10B981']].map(([name, risk, c]) => (
                <div key={name as string} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>{name as string}</span>
                  <span style={{ fontSize: '8px', fontWeight: 700, color: c as string, background: `${c}20`, borderRadius: '3px', padding: '1px 5px' }}>{risk as string}</span>
                </div>
              ))}
            </div>

            {/* Adoption chart */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>AI ADOPTION</div>
              {[['Customer Support', 18420, 100], ['Code Review', 14300, 77], ['HR Policy', 9870, 53], ['Exec Summarizer', 7540, 40]].map(([name, calls, pct]) => (
                <div key={name as string} style={{ marginBottom: '7px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>{name as string}</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>{(calls as number).toLocaleString()}</span>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Demo() {
  const { openChat } = useChatContext();

  return (
    <div>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 14px rgba(99,102,241,0); }
          100% { transform: scale(0.95); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .demo-card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .demo-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
        }
      `}</style>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)',
        borderRadius: '20px', padding: 'clamp(40px, 6vw, 72px) clamp(28px, 5vw, 64px)',
        marginBottom: '40px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px', borderRadius: '20px' }} />
        {/* Glow orbs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '10%', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', borderRadius: '20px', padding: '6px 14px', marginBottom: '24px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#818CF8', animation: 'pulse-ring 2s infinite' }} />
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#A5B4FC', letterSpacing: '0.6px' }}>EXECUTIVE DEMO · AgentWiki Platform</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900,
            lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: '20px',
            background: 'linear-gradient(135deg, #FFFFFF 30%, #A5B4FC 70%, #818CF8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Turn AI Governance into Your Biggest Competitive Advantage
          </h1>

          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '540px' }}>
            AgentWiki gives your organization complete visibility, control, and auditability over every AI agent — reducing risk while accelerating safe AI adoption at scale.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link to="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              color: '#FFFFFF', fontSize: '14px', fontWeight: 700,
              padding: '13px 26px', borderRadius: '10px', textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(79,70,229,0.45)',
            }}>
              Get Started <ArrowRight size={15} />
            </Link>
            <button onClick={openChat} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.06)', color: '#FFFFFF',
              fontSize: '14px', fontWeight: 600, padding: '13px 26px',
              borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
            }}>
              <Sparkles size={14} /> Ask AI Assistant
            </button>
          </div>

          {/* Floating stat pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { val: '73%', label: 'Fewer shadow AI incidents', color: '#10B981' },
              { val: '4.2×', label: 'Faster audits', color: '#F59E0B' },
              { val: '$2.4M', label: 'Avg. penalty avoided', color: '#6366F1' },
            ].map(({ val, label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '8px 14px', backdropFilter: 'blur(10px)' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color }}>{val}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard mockup floating on right (desktop) */}
        <div style={{ position: 'absolute', right: '32px', top: '50%', transform: 'translateY(-50%)', width: '420px', animation: 'float 6s ease-in-out infinite', display: 'none' }} className="xl:block">
          <DashboardMockup />
        </div>
      </div>

      {/* Dashboard mockup — shown below hero on smaller screens */}
      <Reveal>
        <div style={{ marginBottom: '48px', maxWidth: '720px', margin: '0 auto 48px' }}>
          <DashboardMockup />
        </div>
      </Reveal>

      {/* ── ANIMATED ROI STATS ── */}
      <Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '72px' }}>
          {[
            { value: 73, suffix: '%', label: 'Reduction in shadow AI', sub: 'vs. organizations without governance', color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', icon: ShieldCheck },
            { value: 4, suffix: '.2×', label: 'Faster audit response', sub: 'from weeks to days', color: '#6366F1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)', icon: Clock },
            { value: 61, suffix: '%', label: 'Fewer AI incidents', sub: 'through mandatory oversight', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', icon: AlertTriangle },
            { value: 10, suffix: 'wk', label: 'Payback period', sub: 'typical time to positive ROI', color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.25)', icon: TrendingUp },
          ].map(({ value, suffix, label, sub, color, bg, border, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="demo-card-hover" style={{ background: bg, border: `1px solid ${border}`, borderRadius: '16px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color={color} />
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, animation: 'pulse-ring 2.5s infinite' }} />
                </div>
                <div style={{ fontSize: 'clamp(32px, 5vw, 42px)', fontWeight: 900, color, letterSpacing: '-1px', lineHeight: 1 }}>
                  <Counter target={value} suffix={suffix} duration={1600} />
                </div>
                <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', marginTop: '8px', marginBottom: '4px' }}>{label}</p>
                <p style={{ fontSize: '11.5px', color: '#94A3B8' }}>{sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── THE PROBLEM ── */}
      <Reveal>
        <div style={{ marginBottom: '72px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '20px', padding: '5px 14px', marginBottom: '14px' }}>
              <AlertTriangle size={11} color="#EF4444" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#EF4444', letterSpacing: '0.5px' }}>THE PROBLEM</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.6px', marginBottom: '12px' }}>Most organizations are flying blind on AI</h2>
            <p style={{ fontSize: '15px', color: '#64748B', maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 }}>AI agents are being deployed faster than governance can keep up — creating mounting regulatory, security, and operational risk.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {[
              { title: 'Zero visibility into deployed agents', desc: 'Teams deploy AI tools independently. Security has no central record of what agents exist, who owns them, or what data they access.', stat: '87% of enterprises', statLabel: 'have unregistered AI agents' },
              { title: 'Regulatory exposure is accelerating', desc: 'EU AI Act, GDPR Art. 22, and sector rules require documented oversight of automated decisions. Most organizations are unprepared.', stat: '€35M', statLabel: 'max EU AI Act fine per violation' },
              { title: 'Audit prep consumes weeks', desc: 'When regulators ask "show us your AI inventory," teams spend 3–6 weeks pulling spreadsheets and emailing owners — if they can at all.', stat: '3–6 weeks', statLabel: 'average audit prep time' },
              { title: 'Shadow AI is a silent liability', desc: 'A single unregistered agent accessing sensitive data is a breach waiting to happen. You cannot govern what you cannot see.', stat: '43% of breaches', statLabel: 'involve unregistered AI systems' },
            ].map(({ title, desc, stat, statLabel }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="demo-card-hover" style={{ background: '#FFFFFF', border: '1px solid #FEE2E2', borderRadius: '14px', padding: '22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#FEF2F2', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <XCircle size={12} color="#EF4444" />
                    </div>
                    <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>{title}</h3>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.65, paddingLeft: '32px', flexGrow: 1 }}>{desc}</p>
                  <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #FEE2E2', paddingLeft: '32px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#EF4444' }}>{stat}</span>
                    <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{statLabel}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── BEFORE / AFTER side-by-side ── */}
      <Reveal>
        <div style={{ marginBottom: '72px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '20px', padding: '5px 14px', marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#6366F1', letterSpacing: '0.5px' }}>BEFORE VS. AFTER</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.6px' }}>What changes when you deploy AgentWiki</h2>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px' }}>
              <div style={{ padding: '14px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.6px' }}>CAPABILITY</span>
              </div>
              <div style={{ padding: '14px 20px', background: '#FFF1F2', borderBottom: '1px solid #FECACA', borderLeft: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <XCircle size={13} color="#EF4444" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#DC2626' }}>Without</span>
              </div>
              <div style={{ padding: '14px 20px', background: '#F0FDF4', borderBottom: '1px solid #BBF7D0', borderLeft: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle size={13} color="#10B981" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>With AgentWiki</span>
              </div>
            </div>

            {/* Data rows */}
            {compareRows.map((row, i) => {
              const isLast = i === compareRows.length - 1;
              const alt = i % 2 !== 0;
              return (
                <div key={row} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 160px', borderBottom: isLast ? 'none' : '1px solid #F1F5F9' }}>
                  <div style={{ padding: '14px 24px', background: alt ? '#FAFAFA' : '#FFFFFF', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#0F172A' }}>{row}</span>
                  </div>
                  <div style={{ padding: '14px 20px', background: alt ? '#FFFBFB' : '#FFFFFF', borderLeft: '1px solid #FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '5px', padding: '3px 10px' }}>Gap</span>
                  </div>
                  <div style={{ padding: '14px 20px', background: alt ? '#FAFFFE' : '#FFFFFF', borderLeft: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '5px', padding: '3px 10px' }}>✓ Live</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* ── FEATURES ── */}
      <Reveal>
        <div style={{ marginBottom: '72px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: '20px', padding: '5px 14px', marginBottom: '14px' }}>
              <Zap size={11} color="#0EA5E9" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#0EA5E9', letterSpacing: '0.5px' }}>PLATFORM CAPABILITIES</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.6px' }}>Everything you need, nothing you don't</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {features.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="demo-card-hover" style={{ background: '#FFFFFF', border: `1px solid #F1F5F9`, borderRadius: '14px', padding: '22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', height: '100%' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '11px', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <Icon size={20} color={color} />
                  </div>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>{title}</h3>
                  <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── ROI BREAKDOWN ── */}
      <Reveal>
        <div style={{
          background: 'linear-gradient(135deg, #0F172A, #1E1B4B)',
          borderRadius: '20px', padding: 'clamp(32px, 5vw, 52px)', marginBottom: '72px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '5px 14px', marginBottom: '14px', width: 'fit-content' }}>
              <DollarSign size={11} color="#F59E0B" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#FCD34D', letterSpacing: '0.5px' }}>ROI BREAKDOWN</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.6px', marginBottom: '8px' }}>Where the value comes from</h2>
            <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.45)', marginBottom: '36px', maxWidth: '480px', lineHeight: 1.6 }}>A mid-size enterprise with 20+ AI agents can expect measurable returns across four dimensions from the first quarter.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              {roiItems.map(({ label, range, pct, color, icon: Icon }, i) => (
                <div key={label}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `${color}18`, border: `1px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={13} color={color} />
                      </div>
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{label}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 800, color }}>{range}</span>
                  </div>
                  <AnimBar pct={pct} color={color} delay={i * 150} />
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', padding: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '6px' }}>ESTIMATED ANNUAL VALUE</p>
                <p style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px' }}>
                  $<Counter target={1} suffix=".5M – $4.8M" duration={1200} />
                </p>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '24px' }}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '6px' }}>TYPICAL PAYBACK PERIOD</p>
                <p style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px' }}>
                  <Counter target={6} suffix="–10 weeks" duration={1200} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── TIMELINE ── */}
      <Reveal>
        <div style={{ marginBottom: '72px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '20px', padding: '5px 14px', marginBottom: '14px' }}>
              <Activity size={11} color="#10B981" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#10B981', letterSpacing: '0.5px' }}>IMPLEMENTATION</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.6px' }}>Live in 4 weeks, value from day one</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0', position: 'relative' }}>
            {timeline.map(({ step, week, title, desc, color }, i) => (
              <Reveal key={step} delay={i * 100}>
                <div className="demo-card-hover" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '24px', margin: '0 6px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', position: 'relative' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: `${color}15`, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color }}>{step}</span>
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '5px' }}>{week.toUpperCase()}</p>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>{title}</h3>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.65 }}>{desc}</p>
                  <div style={{ position: 'absolute', bottom: '-2px', left: '24px', right: '24px', height: '3px', background: `linear-gradient(90deg, ${color}, ${color}00)`, borderRadius: '2px' }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── TESTIMONIALS ── */}
      <Reveal>
        <div style={{ marginBottom: '72px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.6px' }}>What governance leaders say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
            {testimonials.map(({ quote, name, org, color }, i) => (
              <Reveal key={name} delay={i * 80}>
                <div className="demo-card-hover" style={{ background: '#FFFFFF', border: `1px solid #F1F5F9`, borderRadius: '16px', padding: '26px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${color}, ${color}60)` }} />
                  <div style={{ fontSize: '40px', color: `${color}30`, lineHeight: 1, marginBottom: '14px', fontFamily: 'Georgia, serif', fontWeight: 700 }}>"</div>
                  <p style={{ fontSize: '13.5px', color: '#0F172A', lineHeight: 1.75, fontStyle: 'italic', flexGrow: 1, marginBottom: '20px' }}>{quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${color}15`, border: `2px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Users size={14} color={color} />
                    </div>
                    <div>
                      <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>{name}</p>
                      <p style={{ fontSize: '11.5px', color: '#94A3B8' }}>{org}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── COMPLIANCE ── */}
      <Reveal>
        <div style={{ marginBottom: '72px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)', borderRadius: '20px', padding: '5px 14px', marginBottom: '14px' }}>
              <Lock size={11} color="#A855F7" />
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#A855F7', letterSpacing: '0.5px' }}>COMPLIANCE ALIGNMENT</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.6px' }}>Built for the regulatory environment you operate in</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {regulations.map(({ name, color, bg }, i) => (
              <Reveal key={name} delay={i * 40}>
                <div className="demo-card-hover" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: bg, border: `1px solid ${color}30`, borderRadius: '10px', padding: '10px 18px', cursor: 'default' }}>
                  <Award size={14} color={color} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <div style={{
          background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 40%, #064E3B 100%)',
          borderRadius: '20px', padding: 'clamp(40px, 6vw, 64px)',
          textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: '8px',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '20px', padding: '6px 16px', marginBottom: '24px' }}>
              <CheckCircle size={12} color="#34D399" />
              <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#34D399' }}>Ready to deploy in days, not months</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '16px',
              background: 'linear-gradient(135deg, #FFFFFF, #A5B4FC)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Ready to govern your AI agents?
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', maxWidth: '420px', margin: '0 auto 36px', lineHeight: 1.65 }}>
              Start with your agent inventory today. Governance coverage, audit readiness, and risk visibility — from week one.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: '#FFFFFF', fontSize: '14px', fontWeight: 700,
                padding: '13px 28px', borderRadius: '10px', textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(16,185,129,0.4)',
              }}>
                Register an Agent <ArrowRight size={15} />
              </Link>
              <Link to="/agents" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.07)', color: '#FFFFFF',
                fontSize: '14px', fontWeight: 600, padding: '13px 28px',
                borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none',
              }}>
                View Agent Directory <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

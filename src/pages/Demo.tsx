import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useChatContext } from '../context/ChatContext';
import {
  Bot, ShieldCheck, Clock, AlertTriangle, TrendingUp,
  FileText, BarChart3, Eye, Zap, Lock, Award, Users, ArrowRight,
  CheckCircle, XCircle, ChevronRight, Sparkles,
} from 'lucide-react';

// ── Utilities ─────────────────────────────────────────────────────────────────

function Counter({ target, prefix = '', suffix = '', duration = 1800 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const ease = 1 - Math.pow(1 - Math.min((now - start) / duration, 1), 3);
          setCount(Math.round(ease * target));
          if (ease < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

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
    <div ref={ref} style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${w}%`, background: color, borderRadius: '3px', transition: 'width 1.1s cubic-bezier(0.4,0,0.2,1)' }} />
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function Section({ number, label, labelColor = '#6366F1', labelBg = 'rgba(99,102,241,0.08)', labelBorder = 'rgba(99,102,241,0.2)', bg = '#FFFFFF', children, style = {} }: {
  number: string; label: string; labelColor?: string; labelBg?: string; labelBorder?: string;
  bg?: string; children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <Reveal>
      <div style={{ background: bg, borderRadius: '20px', padding: 'clamp(32px, 5vw, 52px)', marginBottom: '20px', border: bg === '#FFFFFF' || bg === '#F8FAFC' ? '1px solid #E2E8F0' : 'none', boxShadow: bg === '#FFFFFF' ? '0 1px 4px rgba(0,0,0,0.04)' : 'none', ...style }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#CBD5E1', letterSpacing: '1px' }}>{number}</span>
          <div style={{ width: '1px', height: '12px', background: '#E2E8F0' }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: labelBg, border: `1px solid ${labelBorder}`, borderRadius: '20px', padding: '3px 12px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 700, color: labelColor, letterSpacing: '0.5px' }}>{label}</span>
          </div>
        </div>
        {children}
      </div>
    </Reveal>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

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

const features = [
  { icon: Bot,        title: 'Agent Directory',         desc: 'Single source of truth for every AI agent — searchable, filterable, auditable.',                        color: '#6366F1', bg: 'rgba(99,102,241,0.08)'  },
  { icon: FileText,   title: 'Structured Registration',  desc: 'Standardized intake capturing use case, data scope, risk level, and oversight mechanism.',               color: '#0EA5E9', bg: 'rgba(14,165,233,0.08)'  },
  { icon: ShieldCheck,title: 'Policy Enforcement',       desc: 'Live policies aligned with EU AI Act, NIST AI RMF, and ISO 42001.',                                      color: '#10B981', bg: 'rgba(16,185,129,0.08)'  },
  { icon: BarChart3,  title: 'Adoption Analytics',       desc: 'Track usage and invocations — turn AI governance into an executive KPI.',                                color: '#F59E0B', bg: 'rgba(245,158,11,0.08)'  },
  { icon: Eye,        title: 'Risk Classification',      desc: 'Tiered risk assessment with differential approval workflows and audit cadence.',                         color: '#EF4444', bg: 'rgba(239,68,68,0.08)'   },
  { icon: Zap,        title: 'AI Governance Assistant',  desc: 'Embedded AI chat that answers governance questions and flags policy gaps instantly.',                    color: '#A855F7', bg: 'rgba(168,85,247,0.08)'  },
];

const roiItems = [
  { label: 'Compliance & Regulatory Fines',  range: '$800K – $2.4M',       pct: 92, color: '#EF4444', icon: Lock        },
  { label: 'Audit Preparation Cost',         range: '$120K – $300K / yr',   pct: 75, color: '#F59E0B', icon: FileText    },
  { label: 'AI Incident Prevention',         range: '$400K – $1.5M / yr',   pct: 84, color: '#10B981', icon: ShieldCheck },
  { label: 'Productivity & Adoption Speed',  range: '$200K – $600K / yr',   pct: 61, color: '#6366F1', icon: TrendingUp  },
];

const timeline = [
  { n: '1', week: 'Week 1', title: 'Deploy & configure',  desc: 'Platform live, approval workflows set, existing agent inventory imported.',                          color: '#6366F1' },
  { n: '2', week: 'Week 2', title: 'Register all agents', desc: 'Business units complete structured registrations. Risk tiers assigned. Data access documented.',     color: '#0EA5E9' },
  { n: '3', week: 'Week 3', title: 'Policy alignment',    desc: 'Governance committee reviews against live policies. High-risk agents enter oversight workflows.',    color: '#10B981' },
  { n: '4', week: 'Week 4+', title: 'Continuous oversight', desc: 'Dashboards live. Audit readiness ongoing. ROI measurable within the first quarter.',              color: '#F59E0B' },
];

const testimonials = [
  { quote: 'AgentWiki cut our AI audit prep from three weeks to two days. The regulator asked for our AI inventory — we exported it in minutes.', name: 'Chief Risk Officer', org: 'Global Financial Services Firm', color: '#6366F1' },
  { quote: 'We had 40+ AI tools with no registry. Within a month we had full visibility and three agents flagged for immediate remediation.', name: 'CISO', org: 'Healthcare Technology Company', color: '#0EA5E9' },
  { quote: 'One prevented compliance incident paid for the platform many times over. The ROI was clear before we finished onboarding.', name: 'Head of AI Governance', org: 'Insurance Group', color: '#10B981' },
];

const regulations = [
  { name: 'EU AI Act', color: '#2563EB' }, { name: 'GDPR Art. 22', color: '#0EA5E9' },
  { name: 'NIST AI RMF', color: '#10B981' }, { name: 'ISO 42001', color: '#6366F1' },
  { name: 'SOC 2 Type II', color: '#F59E0B' }, { name: 'HIPAA', color: '#EF4444' },
  { name: 'CCPA', color: '#A855F7' }, { name: 'FINRA', color: '#EC4899' }, { name: 'MAS TRM', color: '#14B8A6' },
];

// ── Mini dashboard mockup ─────────────────────────────────────────────────────
function Mockup() {
  return (
    <div style={{ background: '#0B1120', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
      <div style={{ background: '#141E32', padding: '9px 16px', display: 'flex', alignItems: 'center', gap: '7px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        {['#EF4444','#F59E0B','#10B981'].map(c => <div key={c} style={{ width: '9px', height: '9px', borderRadius: '50%', background: c }} />)}
        <span style={{ flex: 1, textAlign: 'center', fontSize: '10px', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>agentwiki.io / dashboard</span>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '44px', background: '#080E1A', borderRight: '1px solid rgba(255,255,255,0.04)', padding: '12px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Bot size={12} color="#fff" /></div>
          {[BarChart3, Bot, FileText, ShieldCheck].map((Icon, i) => (
            <div key={i} style={{ width: '28px', height: '28px', borderRadius: '7px', background: i === 0 ? 'rgba(99,102,241,0.18)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={13} color={i === 0 ? '#818CF8' : '#2D3748'} />
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '14px' }}>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginBottom: '10px' }}>Good morning, Akash</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px', marginBottom: '10px' }}>
            {[['10','Agents','#6366F1'],['9','Active','#10B981'],['4','High Risk','#EF4444'],['10','Depts','#0EA5E9']].map(([v,l,c]) => (
              <div key={l as string} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '7px', padding: '7px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>{l}</div>
                <div style={{ height: '2px', background: c as string, borderRadius: '1px', marginTop: '5px', opacity: 0.7 }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '7px', padding: '9px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: '7px', letterSpacing: '0.5px' }}>AGENT REGISTRY</p>
              {[['HR Policy','Low','#10B981'],['Legal Review','High','#EF4444'],['Support Agent','Med','#F59E0B']].map(([n,r,c]) => (
                <div key={n as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)' }}>{n}</span>
                  <span style={{ fontSize: '7px', fontWeight: 700, color: c as string, background: `${c}20`, borderRadius: '3px', padding: '1px 4px' }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '7px', padding: '9px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '8px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', marginBottom: '7px', letterSpacing: '0.5px' }}>ADOPTION</p>
              {[['Support',100],['Code Review',77],['HR Policy',53],['Exec',40]].map(([n,p]) => (
                <div key={n as string} style={{ marginBottom: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>{n}</span>
                    <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.5)' }}>{p}%</span>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${p}%`, background: 'linear-gradient(90deg,#6366F1,#8B5CF6)', borderRadius: '2px' }} />
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
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .demo-hover { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .demo-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }
      `}</style>

      {/* ── 00 · HERO ── */}
      <Reveal>
        <div style={{
          background: 'linear-gradient(140deg, #0F172A 0%, #1E1B4B 55%, #0C1A2E 100%)',
          borderRadius: '20px', padding: 'clamp(40px,6vw,68px) clamp(28px,5vw,60px)',
          marginBottom: '20px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.07) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />
          <div style={{ position: 'absolute', top: '-100px', right: '-60px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: '40px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '20px', padding: '5px 14px', marginBottom: '22px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#818CF8', animation: 'pulse-dot 2s infinite' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#A5B4FC', letterSpacing: '0.6px' }}>EXECUTIVE DEMO · AgentWiki</span>
              </div>
              <h1 style={{ fontSize: 'clamp(28px,4.5vw,46px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-1.2px', marginBottom: '18px', background: 'linear-gradient(135deg,#FFFFFF 30%,#C7D2FE 70%,#818CF8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Turn AI Governance into a Competitive Advantage
              </h1>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '460px' }}>
                Complete visibility, control, and auditability over every AI agent — reducing risk while accelerating safe AI adoption at scale.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', color: '#fff', fontSize: '13.5px', fontWeight: 700, padding: '11px 22px', borderRadius: '9px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(79,70,229,0.45)' }}>
                  Register an Agent <ArrowRight size={14} />
                </Link>
                <button onClick={openChat} style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: '13.5px', fontWeight: 600, padding: '11px 22px', borderRadius: '9px', border: '1px solid rgba(255,255,255,0.14)', cursor: 'pointer' }}>
                  <Sparkles size={13} /> Ask AI Assistant
                </button>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[['73%','Shadow AI reduced','#10B981'],['4.2×','Faster audits','#F59E0B'],['$2.4M','Avg. penalty avoided','#818CF8']].map(([v,l,c]) => (
                  <div key={l as string} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '9px', padding: '7px 14px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: c as string }}>{v}</span>
                    <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.4)' }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Mockup */}
            <div style={{ animation: 'float 6s ease-in-out infinite' }}>
              <Mockup />
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── 01 · THE PROBLEM ── */}
      <Section number="01" label="THE PROBLEM" labelColor="#EF4444" labelBg="rgba(239,68,68,0.08)" labelBorder="rgba(239,68,68,0.2)" bg="#FFFFFF">
        <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '8px' }}>Most organizations are flying blind on AI</h2>
        <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: 1.65, marginBottom: '32px', maxWidth: '540px' }}>AI agents are being deployed faster than governance can keep up — creating mounting regulatory, security, and operational risk.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '12px' }}>
          {[
            { title: 'Zero visibility into deployed agents', stat: '87%', statLabel: 'of enterprises have unregistered AI', icon: Eye },
            { title: 'Regulatory exposure accelerating', stat: '€35M', statLabel: 'max EU AI Act fine per violation', icon: AlertTriangle },
            { title: 'Audit prep consumes weeks', stat: '3–6 wks', statLabel: 'average audit preparation time', icon: Clock },
            { title: 'Shadow AI is a silent liability', stat: '43%', statLabel: 'of breaches involve unregistered AI', icon: ShieldCheck },
          ].map(({ title, stat, statLabel, icon: Icon }) => (
            <div key={title} className="demo-hover" style={{ background: '#FFF8F8', border: '1px solid #FEE2E2', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: '#FEF2F2', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Icon size={16} color="#EF4444" />
              </div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '12px', lineHeight: 1.4 }}>{title}</h3>
              <div style={{ borderTop: '1px solid #FEE2E2', paddingTop: '12px' }}>
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#EF4444', letterSpacing: '-0.5px' }}>{stat}</span>
                <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{statLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 02 · ROI STATS ── */}
      <Section number="02" label="THE IMPACT" labelColor="#10B981" labelBg="rgba(16,185,129,0.08)" labelBorder="rgba(16,185,129,0.2)" bg="#F8FAFC">
        <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '8px' }}>Measurable outcomes from day one</h2>
        <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: 1.65, marginBottom: '32px', maxWidth: '500px' }}>Organizations that deploy AgentWiki report significant improvements across risk, compliance, and operational efficiency.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '12px', alignItems: 'stretch' }}>
          {[
            { value: 73, suffix: '%', label: 'Shadow AI reduction', color: '#10B981', bg: '#F0FDF4', border: '#BBF7D0', icon: ShieldCheck },
            { value: 61, suffix: '%', label: 'Fewer AI incidents', color: '#6366F1', bg: '#EEF2FF', border: '#C7D2FE', icon: AlertTriangle },
            { value: 90, suffix: '%', label: 'Faster audit prep', color: '#F59E0B', bg: '#FFFBEB', border: '#FDE68A', icon: Clock },
            { value: 10, suffix: ' wks', label: 'Typical payback period', color: '#0EA5E9', bg: '#F0F9FF', border: '#BAE6FD', icon: TrendingUp },
          ].map(({ value, suffix, label, color, bg, border, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="demo-hover" style={{ background: bg, border: `1px solid ${border}`, borderRadius: '14px', padding: '22px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: '#fff', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', flexShrink: 0 }}>
                  <Icon size={16} color={color} />
                </div>
                <div style={{ fontSize: 'clamp(30px,4vw,40px)', fontWeight: 900, color, letterSpacing: '-1px', lineHeight: 1 }}>
                  <Counter target={value} suffix={suffix} duration={1500} />
                </div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', marginTop: '8px', lineHeight: 1.3, whiteSpace: 'nowrap' }}>{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 03 · COMPARISON ── */}
      <Section number="03" label="BEFORE VS. AFTER" labelColor="#6366F1" labelBg="rgba(99,102,241,0.08)" labelBorder="rgba(99,102,241,0.2)" bg="#FFFFFF">
        <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '8px' }}>What changes when you deploy AgentWiki</h2>
        <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: 1.65, marginBottom: '32px', maxWidth: '500px' }}>A side-by-side view of governance capabilities before and after deployment.</p>
        <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div style={{ padding: '13px 20px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.6px' }}>CAPABILITY</span>
            </div>
            <div style={{ padding: '13px 20px', background: '#FFF1F2', borderBottom: '1px solid #FECACA', borderLeft: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <XCircle size={12} color="#EF4444" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#DC2626' }}>Without</span>
            </div>
            <div style={{ padding: '13px 20px', background: '#F0FDF4', borderBottom: '1px solid #BBF7D0', borderLeft: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <CheckCircle size={12} color="#10B981" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>With AgentWiki</span>
            </div>
          </div>
          {compareRows.map((row, i) => (
            <div key={row} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i < compareRows.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
              <div style={{ padding: '12px 20px', background: i % 2 !== 0 ? '#FAFAFA' : '#fff', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>{row}</span>
              </div>
              <div style={{ padding: '12px 20px', background: i % 2 !== 0 ? '#FFFBFB' : '#fff', borderLeft: '1px solid #FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#EF4444', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '5px', padding: '3px 10px' }}>Gap</span>
              </div>
              <div style={{ padding: '12px 20px', background: i % 2 !== 0 ? '#FAFFFE' : '#fff', borderLeft: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '5px', padding: '3px 10px' }}>✓ Live</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 04 · FEATURES ── */}
      <Section number="04" label="PLATFORM" labelColor="#0EA5E9" labelBg="rgba(14,165,233,0.08)" labelBorder="rgba(14,165,233,0.2)" bg="linear-gradient(140deg,#0F172A,#1E1B4B)" style={{ border: 'none' }}>
        <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px', marginBottom: '8px' }}>Everything you need, nothing you don't</h2>
        <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: '32px', maxWidth: '500px' }}>Six purpose-built modules that work together to deliver enterprise-grade AI governance from day one.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '12px' }}>
          {features.map(({ icon: Icon, title, desc, color, bg }, i) => (
            <Reveal key={title} delay={i * 60}>
              <div className="demo-hover" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '22px', backdropFilter: 'blur(4px)', boxShadow: 'none', height: '100%' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <Icon size={18} color={color} />
                </div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 05 · ROI BREAKDOWN ── */}
      <Section number="05" label="ROI BREAKDOWN" labelColor="#F59E0B" labelBg="rgba(245,158,11,0.08)" labelBorder="rgba(245,158,11,0.25)" bg="#F8FAFC">
        <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '8px' }}>Where the value comes from</h2>
        <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: 1.65, marginBottom: '32px', maxWidth: '500px' }}>A mid-size enterprise with 20+ AI agents can expect measurable returns across four dimensions.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {roiItems.map(({ label, range, pct, color, icon: Icon }, i) => (
            <div key={label} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: `${color}12`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={15} color={color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A' }}>{label}</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color, whiteSpace: 'nowrap' }}>{range}</span>
                </div>
                <AnimBar pct={pct} color={color} delay={i * 120} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0F172A', borderRadius: '12px', padding: '22px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '5px' }}>ESTIMATED ANNUAL VALUE</p>
            <p style={{ fontSize: 'clamp(24px,4vw,34px)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.8px' }}>$1.5M – $4.8M</p>
          </div>
          <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '24px' }}>
            <p style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '5px' }}>PAYBACK PERIOD</p>
            <p style={{ fontSize: 'clamp(24px,4vw,34px)', fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.8px' }}>6 – 10 weeks</p>
          </div>
        </div>
      </Section>

      {/* ── 06 · TIMELINE ── */}
      <Section number="06" label="IMPLEMENTATION" labelColor="#10B981" labelBg="rgba(16,185,129,0.08)" labelBorder="rgba(16,185,129,0.2)" bg="#FFFFFF">
        <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '8px' }}>Live in 4 weeks, value from day one</h2>
        <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: 1.65, marginBottom: '32px', maxWidth: '500px' }}>No lengthy implementations. AgentWiki is operational within a week and delivering measurable governance in the first month.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: '12px' }}>
          {timeline.map(({ n, week, title, desc, color }, i) => (
            <Reveal key={n} delay={i * 80}>
              <div className="demo-hover" style={{ background: '#FAFAFA', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '22px', position: 'relative', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,${color},${color}50)` }} />
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${color}15`, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color }}>{n}</span>
                </div>
                <p style={{ fontSize: '10.5px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '4px' }}>{week.toUpperCase()}</p>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 07 · TESTIMONIALS ── */}
      <Section number="07" label="SOCIAL PROOF" labelColor="#A855F7" labelBg="rgba(168,85,247,0.08)" labelBorder="rgba(168,85,247,0.2)" bg="#F8FAFC">
        <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '8px' }}>What governance leaders say</h2>
        <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: 1.65, marginBottom: '32px', maxWidth: '500px' }}>Organizations using AgentWiki report measurable impact within the first quarter of deployment.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '12px' }}>
          {testimonials.map(({ quote, name, org, color }, i) => (
            <Reveal key={name} delay={i * 80}>
              <div className="demo-hover" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,${color},${color}50)` }} />
                <div style={{ fontSize: '36px', color: `${color}25`, lineHeight: 1, marginBottom: '12px', fontFamily: 'Georgia,serif', fontWeight: 700 }}>"</div>
                <p style={{ fontSize: '13.5px', color: '#0F172A', lineHeight: 1.72, fontStyle: 'italic', flexGrow: 1, marginBottom: '18px' }}>{quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid #F1F5F9', paddingTop: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Users size={13} color={color} />
                  </div>
                  <div>
                    <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>{name}</p>
                    <p style={{ fontSize: '11px', color: '#94A3B8' }}>{org}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 08 · COMPLIANCE ── */}
      <Section number="08" label="COMPLIANCE" labelColor="#2563EB" labelBg="rgba(37,99,235,0.08)" labelBorder="rgba(37,99,235,0.2)" bg="#FFFFFF">
        <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '8px' }}>Built for the regulatory environment you operate in</h2>
        <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: 1.65, marginBottom: '28px', maxWidth: '500px' }}>AgentWiki's governance framework is designed to support compliance with major AI and data regulations globally.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {regulations.map(({ name, color }, i) => (
            <Reveal key={name} delay={i * 35}>
              <div className="demo-hover" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '9px', padding: '9px 16px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                <Award size={13} color={color} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 09 · CTA ── */}
      <Reveal>
        <div style={{
          background: 'linear-gradient(140deg,#1E1B4B 0%,#0F172A 45%,#064E3B 100%)',
          borderRadius: '20px', padding: 'clamp(40px,6vw,60px)', textAlign: 'center',
          position: 'relative', overflow: 'hidden', marginBottom: '8px',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '20px', padding: '5px 14px', marginBottom: '22px' }}>
              <CheckCircle size={12} color="#34D399" />
              <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#34D399' }}>Ready to deploy in days, not months</span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px,4.5vw,42px)', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: '14px', background: 'linear-gradient(135deg,#FFFFFF,#A5B4FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ready to govern your AI agents?
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', maxWidth: '400px', margin: '0 auto 32px', lineHeight: 1.65 }}>
              Governance coverage, audit readiness, and risk visibility — from week one.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'linear-gradient(135deg,#10B981,#059669)', color: '#fff', fontSize: '14px', fontWeight: 700, padding: '12px 26px', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 20px rgba(16,185,129,0.4)' }}>
                Register an Agent <ArrowRight size={14} />
              </Link>
              <Link to="/agents" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.07)', color: '#fff', fontSize: '14px', fontWeight: 600, padding: '12px 26px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none' }}>
                View Agent Directory <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

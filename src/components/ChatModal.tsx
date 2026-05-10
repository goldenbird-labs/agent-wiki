import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Sparkles, RefreshCw, Minus } from 'lucide-react';

const BORDER = '#E2E8F0';
const TEXT_PRIMARY = '#0F172A';
const TEXT_SECONDARY = '#64748B';
const TEXT_MUTED = '#94A3B8';

type Role = 'assistant' | 'user';
interface Message { id: string; role: Role; content: string; timestamp: Date; }

const initialMessages: Message[] = [{
  id: '1', role: 'assistant',
  content: "Hi! I'm the AgentWiki Governance Assistant.\n\nI can help you navigate AI policies, understand the agent registration process, or answer questions about responsible AI deployment.\n\nWhat can I help you with today?",
  timestamp: new Date(),
}];

const suggestions = [
  'How do I register a new AI agent?',
  'What counts as a high-risk agent?',
  'What data access is allowed?',
  'Audit frequency for agents?',
];

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Bot size={12} color="#4F46E5" />
      </div>
      <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: '16px 16px 16px 4px', padding: '12px 16px', display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[0, 150, 300].map((d) => (
          <span key={d} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#CBD5E1', display: 'inline-block', animation: 'bounce 1.2s infinite', animationDelay: `${d}ms` }} />
        ))}
        <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-4px)}}`}</style>
      </div>
    </div>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChatModal({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, minimized]);

  useEffect(() => {
    if (!minimized) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, minimized]);

  const sendMessage = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', content: text.trim(), timestamp: new Date() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(), role: 'assistant',
        content: "This is a frontend preview — the AI backend hasn't been connected yet. Once integrated, I'll be able to answer your governance questions, search the agent directory, and guide you through registration in real time.",
        timestamp: new Date(),
      }]);
    }, 1800);
  };

  const reset = () => { setMessages(initialMessages); setInput(''); setTyping(false); };

  if (!open) return null;

  const showSuggestions = messages.length === 1 && !typing;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.3)',
          backdropFilter: 'blur(2px)', zIndex: 100,
          animation: 'fadeIn 0.18s ease',
        }}
      />

      {/* Modal panel — bottom-right */}
      <div style={{
        position: 'fixed', bottom: '28px', right: '28px', zIndex: 101,
        width: 'min(420px, calc(100vw - 32px))',
        borderRadius: '20px',
        background: '#F8FAFC',
        border: `1px solid ${BORDER}`,
        boxShadow: '0 24px 64px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        height: minimized ? 'auto' : 'min(560px, calc(100vh - 80px))',
        animation: 'slideUp 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transition: 'height 0.2s ease',
      }}>
        <style>{`
          @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        `}</style>

        {/* Header */}
        <div style={{
          padding: '14px 16px',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          display: 'flex', alignItems: 'center', gap: '10px',
          flexShrink: 0,
        }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles size={17} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '13.5px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>Governance Assistant</p>
            <p style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.65)', marginTop: '2px' }}>AgentWiki AI · Preview mode</p>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={reset} title="Reset" style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <RefreshCw size={12} color="#fff" />
            </button>
            <button onClick={() => setMinimized((m) => !m)} title={minimized ? 'Expand' : 'Minimize'} style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Minus size={13} color="#fff" />
            </button>
            <button onClick={onClose} title="Close" style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={13} color="#fff" />
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={msg.id} style={{ display: 'flex', gap: '8px', flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0, background: isUser ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : '#fff', border: isUser ? 'none' : `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isUser ? <User size={12} color="#fff" /> : <Bot size={12} color="#4F46E5" />}
                    </div>
                    <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: '4px' }}>
                      <div style={{
                        padding: '10px 14px', fontSize: '13px', lineHeight: 1.65, whiteSpace: 'pre-wrap',
                        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background: isUser ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : '#fff',
                        color: isUser ? '#fff' : TEXT_PRIMARY,
                        border: isUser ? 'none' : `1px solid ${BORDER}`,
                        boxShadow: isUser ? '0 2px 8px rgba(79,70,229,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
                      }}>
                        {msg.content}
                      </div>
                      <span style={{ fontSize: '10.5px', color: TEXT_MUTED }}>{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                );
              })}
              {typing && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Suggested prompts */}
            {showSuggestions && (
              <div style={{ padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {suggestions.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)} style={{ fontSize: '11.5px', background: '#fff', border: `1px solid ${BORDER}`, color: TEXT_SECONDARY, padding: '5px 10px', borderRadius: '7px', cursor: 'pointer', fontWeight: 500 }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '12px 14px', borderTop: `1px solid ${BORDER}`, background: '#fff' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                  placeholder="Ask about governance or policies…"
                  rows={1}
                  style={{
                    flex: 1, resize: 'none', padding: '9px 12px', fontSize: '13px',
                    border: `1px solid ${BORDER}`, borderRadius: '10px', outline: 'none',
                    color: TEXT_PRIMARY, background: '#F8FAFC', maxHeight: '100px', lineHeight: 1.5,
                  }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  style={{
                    width: '36px', height: '36px', flexShrink: 0, borderRadius: '10px', border: 'none', cursor: 'pointer',
                    background: input.trim() && !typing ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : '#E2E8F0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: input.trim() && !typing ? '0 2px 8px rgba(79,70,229,0.3)' : 'none',
                    transition: 'background 0.15s, box-shadow 0.15s',
                  }}
                >
                  <Send size={13} color={input.trim() && !typing ? '#fff' : TEXT_MUTED} />
                </button>
              </div>
              <p style={{ fontSize: '10.5px', color: TEXT_MUTED, marginTop: '6px', textAlign: 'center' }}>
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

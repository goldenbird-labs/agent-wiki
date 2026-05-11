import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Sparkles, RefreshCw, Minus } from 'lucide-react';

const B = '#E2E8F0';
const T1 = '#0F172A';
const T2 = '#64748B';
const T3 = '#94A3B8';

type Role = 'assistant' | 'user';
interface Message { id: string; role: Role; content: string; timestamp: Date; }

const initialMessages: Message[] = [{
  id: '1', role: 'assistant',
  content: "Hi! I'm the AgentWiki Governance Assistant.\n\nI can help you navigate AI policies, understand the registration process, or answer questions about responsible AI deployment.\n\nWhat can I help you with today?",
  timestamp: new Date(),
}];

const suggestions = [
  'How do I register a new AI agent?',
  'What counts as a high-risk agent?',
  'What data access is allowed?',
  'Audit frequency for agents?',
];

function formatTime(d: Date) { return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
      <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#F1F5F9', border: `1px solid ${B}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Bot size={12} color={T2} />
      </div>
      <div style={{ background: '#FFFFFF', border: `1px solid ${B}`, borderRadius: '14px 14px 14px 4px', padding: '10px 14px', display: 'flex', gap: '4px', alignItems: 'center' }}>
        {[0, 150, 300].map((d) => (
          <span key={d} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#CBD5E1', display: 'inline-block', animation: 'bounce 1.2s infinite', animationDelay: `${d}ms` }} />
        ))}
        <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-4px)}}`}</style>
      </div>
    </div>
  );
}

interface Props { open: boolean; onClose: () => void; }

export default function ChatModal({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { if (open && !minimized) setTimeout(() => inputRef.current?.focus(), 100); }, [open, minimized]);
  useEffect(() => { if (!minimized) bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing, minimized]);

  const sendMessage = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', content: text.trim(), timestamp: new Date() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: "This is a frontend preview — the AI backend hasn't been connected yet. Once integrated, I'll answer governance questions and guide you through registration in real time.", timestamp: new Date() }]);
    }, 1800);
  };

  const reset = () => { setMessages(initialMessages); setInput(''); setTyping(false); };
  const showSuggestions = messages.length === 1 && !typing;
  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.25)', backdropFilter: 'blur(1px)', zIndex: 100, animation: 'fadeIn 0.15s ease' }} />
      <div style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 101,
        width: 'min(400px, calc(100vw - 32px))',
        borderRadius: '14px', background: '#F8FAFC',
        border: `1px solid ${B}`,
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        height: minimized ? 'auto' : 'min(540px, calc(100vh - 72px))',
        animation: 'slideUp 0.2s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

        {/* Header */}
        <div style={{ padding: '14px 16px', background: T1, display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles size={15} color="#FFFFFF" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1 }}>Governance Assistant</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>AgentWiki AI · Preview mode</p>
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[
              { icon: RefreshCw, size: 11, action: reset, title: 'Reset' },
              { icon: Minus, size: 12, action: () => setMinimized(m => !m), title: minimized ? 'Expand' : 'Minimize' },
              { icon: X, size: 12, action: onClose, title: 'Close' },
            ].map(({ icon: Icon, size, action, title }) => (
              <button key={title} onClick={action} title={title} style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={size} color="rgba(255,255,255,0.7)" />
              </button>
            ))}
          </div>
        </div>

        {!minimized && (
          <>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC' }}>
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={msg.id} style={{ display: 'flex', gap: '8px', flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0, background: isUser ? T1 : '#FFFFFF', border: isUser ? 'none' : `1px solid ${B}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isUser ? <User size={11} color="#fff" /> : <Bot size={11} color={T2} />}
                    </div>
                    <div style={{ maxWidth: '80%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: '3px' }}>
                      <div style={{
                        padding: '9px 13px', fontSize: '12.5px', lineHeight: 1.6, whiteSpace: 'pre-wrap',
                        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        background: isUser ? T1 : '#FFFFFF',
                        color: isUser ? '#FFFFFF' : T1,
                        border: isUser ? 'none' : `1px solid ${B}`,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                      }}>
                        {msg.content}
                      </div>
                      <span style={{ fontSize: '10px', color: T3 }}>{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                );
              })}
              {typing && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div style={{ padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px', background: '#F8FAFC' }}>
                {suggestions.map((s) => (
                  <button key={s} onClick={() => sendMessage(s)} style={{ fontSize: '11.5px', background: '#FFFFFF', border: `1px solid ${B}`, color: T2, padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '10px 12px', borderTop: `1px solid ${B}`, background: '#FFFFFF' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                  placeholder="Ask about governance or policies…"
                  rows={1}
                  style={{ flex: 1, resize: 'none', padding: '8px 12px', fontSize: '12.5px', border: `1px solid ${B}`, borderRadius: '8px', outline: 'none', color: T1, background: '#F8FAFC', maxHeight: '96px', lineHeight: 1.5 }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || typing}
                  style={{ width: '34px', height: '34px', flexShrink: 0, borderRadius: '8px', border: 'none', cursor: 'pointer', background: input.trim() && !typing ? T1 : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                >
                  <Send size={13} color={input.trim() && !typing ? '#fff' : T3} />
                </button>
              </div>
              <p style={{ fontSize: '10.5px', color: T3, marginTop: '6px', textAlign: 'center' }}>Enter to send · Shift+Enter for new line</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

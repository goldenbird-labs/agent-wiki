import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';

const CARD = '#fff';
const BORDER = '#E2E8F0';
const TEXT_PRIMARY = '#0F172A';
const TEXT_SECONDARY = '#64748B';
const TEXT_MUTED = '#94A3B8';

type Role = 'assistant' | 'user';
interface Message { id: string; role: Role; content: string; timestamp: Date; }

const placeholderMessages: Message[] = [{
  id: '1', role: 'assistant',
  content: "Hi! I'm the AgentWiki Governance Assistant. I can help you navigate AI policies, understand the agent registration process, or answer questions about responsible AI deployment within the organization.\n\nWhat can I help you with today?",
  timestamp: new Date(),
}];

const suggestions = [
  'How do I register a new AI agent?',
  'What counts as a high-risk agent?',
  'What data access is allowed for customer-facing agents?',
  'What is the audit frequency for high-risk agents?',
];

function formatTime(d: Date) { return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
      <div style={{
        width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
        background: isUser ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : CARD,
        border: isUser ? 'none' : `1px solid ${BORDER}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isUser ? <User size={13} color="#fff" /> : <Bot size={13} color="#4F46E5" />}
      </div>
      <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: '4px' }}>
        <div style={{
          padding: '12px 16px', borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          fontSize: '13.5px', lineHeight: 1.65, whiteSpace: 'pre-wrap',
          background: isUser ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : CARD,
          color: isUser ? '#fff' : TEXT_PRIMARY,
          border: isUser ? 'none' : `1px solid ${BORDER}`,
          boxShadow: isUser ? '0 2px 8px rgba(79,70,229,0.25)' : '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          {message.content}
        </div>
        <span style={{ fontSize: '11px', color: TEXT_MUTED }}>{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
      <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: CARD, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Bot size={13} color="#4F46E5" />
      </div>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '18px 18px 18px 4px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {[0, 150, 300].map((delay) => (
          <span key={delay} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CBD5E1', display: 'inline-block', animation: 'bounce 1.2s infinite', animationDelay: `${delay}ms` }} />
        ))}
      </div>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(placeholderMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const reset = () => { setMessages(placeholderMessages); setInput(''); setTyping(false); };
  const showSuggestions = messages.length === 1 && !typing;

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: '-0.6px', marginBottom: '6px' }}>AI Chat</h1>
          <p style={{ fontSize: '14px', color: TEXT_MUTED }}>Ask about AI governance, policies, or agent registration.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, color: '#D97706', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '20px', padding: '4px 10px' }}>
            <Sparkles size={11} /> Frontend Preview
          </span>
          <button onClick={reset} title="Reset conversation" style={{ width: '34px', height: '34px', borderRadius: '9px', background: CARD, border: `1px solid ${BORDER}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: TEXT_MUTED, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Chat window */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '20px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 'clamp(480px, 65vh, 620px)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

        {/* Chat header bar */}
        <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', background: '#F8FAFC' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={16} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '13.5px', fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1 }}>Governance Assistant</p>
            <p style={{ fontSize: '12px', color: TEXT_MUTED, marginTop: '2px' }}>AgentWiki AI · Backend not yet connected</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{ fontSize: '12px', color: TEXT_MUTED, fontWeight: 500 }}>Preview</span>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#FAFAFA' }}>
          {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}
          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts */}
        {showSuggestions && (
          <div style={{ padding: '12px 20px', borderTop: `1px solid ${BORDER}`, background: CARD }}>
            <p style={{ fontSize: '11.5px', color: TEXT_MUTED, fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Suggested</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {suggestions.map((s) => (
                <button key={s} onClick={() => sendMessage(s)} style={{
                  fontSize: '12.5px', background: '#F8FAFC', border: `1px solid ${BORDER}`,
                  color: TEXT_SECONDARY, padding: '6px 12px', borderRadius: '8px',
                  cursor: 'pointer', fontWeight: 500, transition: 'all 0.15s',
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: '14px 16px', background: CARD }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about policies, agent registration, or governance…"
              rows={1}
              style={{
                flex: 1, resize: 'none', padding: '10px 14px', fontSize: '13.5px',
                border: `1px solid ${BORDER}`, borderRadius: '12px', outline: 'none',
                color: TEXT_PRIMARY, background: '#F8FAFC',
                maxHeight: '120px', lineHeight: 1.5,
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              style={{
                width: '38px', height: '38px', flexShrink: 0, borderRadius: '10px', border: 'none', cursor: 'pointer',
                background: input.trim() && !typing ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s', boxShadow: input.trim() && !typing ? '0 2px 8px rgba(79,70,229,0.3)' : 'none',
              }}
            >
              <Send size={14} color={input.trim() && !typing ? '#fff' : TEXT_MUTED} />
            </button>
          </div>
          <p style={{ fontSize: '11px', color: TEXT_MUTED, marginTop: '8px', textAlign: 'center' }}>
            Press <kbd style={{ background: '#F1F5F9', border: `1px solid ${BORDER}`, borderRadius: '4px', padding: '1px 5px', fontSize: '10px' }}>Enter</kbd> to send ·{' '}
            <kbd style={{ background: '#F1F5F9', border: `1px solid ${BORDER}`, borderRadius: '4px', padding: '1px 5px', fontSize: '10px' }}>Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
}

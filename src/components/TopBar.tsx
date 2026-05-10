import { Search, Bell, HelpCircle, Menu, Sparkles } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

interface Props {
  onOpenMobileMenu: () => void;
}

export default function TopBar({ onOpenMobileMenu }: Props) {
  const { openChat } = useChatContext();

  return (
    <div style={{
      height: '60px', background: '#fff',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: '12px',
      flexShrink: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      {/* Mobile menu toggle */}
      <button
        className="lg:hidden"
        onClick={onOpenMobileMenu}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', color: '#64748B', flexShrink: 0 }}
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: '420px', position: 'relative' }}>
        <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search agents, policies, owners…"
          style={{
            width: '100%', paddingLeft: '34px', paddingRight: '14px',
            paddingTop: '8px', paddingBottom: '8px',
            fontSize: '13px', border: '1px solid #E2E8F0',
            borderRadius: '9px', outline: 'none',
            color: '#0F172A', background: '#F8FAFC',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#A5B4FC'; e.target.style.background = '#fff'; }}
          onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; }}
        />
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>

        {/* AI Chat button */}
        <button
          onClick={openChat}
          title="Open AI Chat"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '0 14px', height: '34px',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
            flexShrink: 0,
          }}
        >
          <Sparkles size={13} color="#fff" />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>AI Chat</span>
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bell size={15} color="#64748B" />
          </button>
          <span style={{ position: 'absolute', top: '6px', right: '6px', width: '7px', height: '7px', borderRadius: '50%', background: '#EF4444', border: '1.5px solid #fff' }} />
        </div>

        {/* Help */}
        <button style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HelpCircle size={15} color="#64748B" />
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: '#E2E8F0', margin: '0 4px' }} />

        {/* Avatar */}
        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>AK</span>
        </div>
      </div>
    </div>
  );
}

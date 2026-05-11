import { Search, Bell, HelpCircle, Menu, Sparkles } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import { useIsMobile } from '../hooks/useIsMobile';

interface Props { onOpenMobileMenu: () => void; }

export default function TopBar({ onOpenMobileMenu }: Props) {
  const { openChat } = useChatContext();
  const isMobile = useIsMobile(640);

  return (
    <div style={{
      height: '60px', background: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: '10px', flexShrink: 0,
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    }}>
      <button className="lg:hidden" onClick={onOpenMobileMenu}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '6px', color: '#64748B', flexShrink: 0 }}>
        <Menu size={20} />
      </button>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: isMobile ? '100%' : '400px', position: 'relative' }}>
        <Search size={13} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder={isMobile ? 'Search…' : 'Search agents, policies, owners…'}
          style={{
            width: '100%', paddingLeft: '32px', paddingRight: '10px',
            paddingTop: '7px', paddingBottom: '7px',
            fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '7px',
            outline: 'none', color: '#0F172A', background: '#F8FAFC',
          }}
          onFocus={(e) => { e.target.style.borderColor = '#94A3B8'; e.target.style.background = '#fff'; }}
          onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; }}
        />
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* AI Chat */}
        <button onClick={openChat} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: isMobile ? '0 10px' : '0 14px', height: '34px',
          background: '#0F172A', border: 'none', borderRadius: '7px',
          cursor: 'pointer', flexShrink: 0,
        }}>
          <Sparkles size={13} color="#FFFFFF" />
          {!isMobile && <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap' }}>AI Chat</span>}
        </button>

        {!isMobile && (
          <div style={{ position: 'relative' }}>
            <button style={{ width: '34px', height: '34px', borderRadius: '7px', border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={14} color="#64748B" />
            </button>
            <span style={{ position: 'absolute', top: '7px', right: '7px', width: '6px', height: '6px', borderRadius: '50%', background: '#DC2626', border: '1.5px solid #fff' }} />
          </div>
        )}

        {!isMobile && (
          <button style={{ width: '34px', height: '34px', borderRadius: '7px', border: '1px solid #E2E8F0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HelpCircle size={14} color="#64748B" />
          </button>
        )}

        <div style={{ width: '1px', height: '20px', background: '#E2E8F0', margin: '0 2px' }} />

        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#FFFFFF' }}>AK</span>
        </div>
      </div>
    </div>
  );
}

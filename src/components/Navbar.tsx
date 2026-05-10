import { Link } from 'react-router-dom';
import { Bot, Sparkles, Menu } from 'lucide-react';

interface Props {
  onOpenChat: () => void;
  onOpenMobileMenu: () => void;
}

export default function Navbar({ onOpenChat, onOpenMobileMenu }: Props) {
  return (
    <nav style={{
      backgroundColor: '#fff',
      borderBottom: '1px solid #E2E8F0',
      position: 'sticky', top: 0, zIndex: 50,
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: '34px', height: '34px', borderRadius: '9px',
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
            }}>
              <Bot size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#0F172A', letterSpacing: '-0.3px' }}>
              AgentWiki
            </span>
            <span style={{
              fontSize: '10px', color: '#4F46E5', fontWeight: 600,
              background: '#EEF2FF', borderRadius: '4px',
              padding: '2px 7px', border: '1px solid #C7D2FE',
              letterSpacing: '0.4px', textTransform: 'uppercase',
            }}>
              Enterprise
            </span>
          </Link>

          {/* Right: AI Chat + mobile menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onOpenChat}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '8px 18px',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: '#fff', fontWeight: 600, fontSize: '13.5px',
                borderRadius: '10px', border: 'none', cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(79,70,229,0.35)',
                whiteSpace: 'nowrap',
              }}
            >
              <Sparkles size={14} color="#fff" />
              AI Chat
            </button>

            <button
              className="lg:hidden"
              onClick={onOpenMobileMenu}
              style={{
                padding: '7px', borderRadius: '8px', background: '#F8FAFC',
                border: '1px solid #E2E8F0', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Menu size={18} color="#64748B" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

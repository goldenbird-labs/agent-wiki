import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, LayoutDashboard, Bot, ClipboardPlus,
  BookOpen, ShieldCheck, ChevronsRight, ChevronsLeft, X, Presentation,
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: Home,            label: 'Home',            to: '/',          section: 1 },
  { icon: LayoutDashboard, label: 'Dashboard',       to: '/dashboard', section: 1 },
  { icon: Bot,             label: 'Agent Directory', to: '/agents',    section: 1 },
  { icon: ClipboardPlus,   label: 'Register Agent',  to: '/register',  section: 1 },
  { icon: BookOpen,        label: 'Policies',          to: '/policies', section: 2 },
  { icon: ShieldCheck,     label: 'Risk & Compliance', to: '/agents',   section: 2 },
  { icon: Presentation,    label: 'Demo',               to: '/demo',     section: 3 },
];

interface Props {
  mobileOpen: boolean;
  onCloseMobile: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function NavButton({ item, collapsed, onClose }: {
  item: typeof NAV_ITEMS[0];
  collapsed: boolean;
  onClose?: () => void;
}) {
  const location = useLocation();
  const [hovered, setHovered] = useState(false);

  const active = item.to === '/'
    ? location.pathname === '/'
    : location.pathname.startsWith(item.to);

  const Icon = item.icon;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}>
      <Link
        to={item.to}
        onClick={onClose}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          width: collapsed ? '36px' : '100%',
          height: '36px',
          padding: collapsed ? '0' : '0 10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: '7px',
          textDecoration: 'none',
          background: active ? '#27272A' : hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
          transition: 'background 0.12s ease',
          position: 'relative',
        }}
      >
        <Icon
          size={16}
          strokeWidth={active ? 2.2 : 1.8}
          color={active ? '#FAFAFA' : hovered ? '#A1A1AA' : '#52525B'}
        />
        {!collapsed && (
          <span style={{
            fontSize: '13px',
            fontWeight: active ? 600 : 400,
            color: active ? '#FAFAFA' : hovered ? '#A1A1AA' : '#52525B',
            whiteSpace: 'nowrap',
          }}>
            {item.label}
          </span>
        )}
        {active && collapsed && (
          <div style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            width: '2px', height: '16px', borderRadius: '0 2px 2px 0',
            background: '#FAFAFA',
          }} />
        )}
      </Link>

      {/* Tooltip */}
      {collapsed && hovered && (
        <div style={{
          position: 'absolute', left: 'calc(100% + 10px)', top: '50%',
          transform: 'translateY(-50%)',
          background: '#18181B', color: '#F4F4F5',
          fontSize: '12px', fontWeight: 500,
          padding: '5px 10px', borderRadius: '6px',
          whiteSpace: 'nowrap', pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          border: '1px solid #3F3F46',
          zIndex: 200,
        }}>
          {item.label}
          <span style={{
            position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)',
            borderTop: '4px solid transparent', borderBottom: '4px solid transparent',
            borderRight: '5px solid #18181B',
          }} />
        </div>
      )}
    </div>
  );
}

function SidebarInner({ collapsed, onToggleCollapse, onClose, isMobile }: {
  collapsed: boolean; onToggleCollapse: () => void; onClose?: () => void; isMobile?: boolean;
}) {
  const effectiveCollapsed = isMobile ? false : collapsed;

  return (
    <div style={{
      width: effectiveCollapsed ? '60px' : '220px',
      height: '100%', background: '#09090B',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.2s ease',
      overflow: 'hidden',
      borderRight: '1px solid #1C1C1E',
    }}>
      {/* Logo */}
      <div style={{
        height: '60px', flexShrink: 0,
        display: 'flex', alignItems: 'center',
        justifyContent: effectiveCollapsed ? 'center' : 'space-between',
        padding: effectiveCollapsed ? '0' : '0 14px',
        borderBottom: '1px solid #1C1C1E',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '9px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '7px', flexShrink: 0,
            background: '#FAFAFA',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bot size={16} color="#09090B" strokeWidth={2} />
          </div>
          {!effectiveCollapsed && (
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#FAFAFA', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
              AgentWiki
            </span>
          )}
        </Link>

        {isMobile && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', color: '#52525B' }}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto', overflowX: 'visible' }}>
        {NAV_ITEMS.map((item, i) => {
          const prev = NAV_ITEMS[i - 1];
          const showDivider = i > 0 && item.section !== prev?.section;
          return (
            <div key={item.label}>
              {showDivider && (
                <div style={{ height: '1px', background: '#1C1C1E', margin: effectiveCollapsed ? '8px 4px' : '8px 4px' }} />
              )}
              <NavButton item={item} collapsed={effectiveCollapsed} onClose={onClose} />
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      {!isMobile && (
        <div style={{ borderTop: '1px solid #1C1C1E', padding: effectiveCollapsed ? '10px 0' : '8px 8px', display: 'flex', justifyContent: effectiveCollapsed ? 'center' : 'flex-start' }}>
          <button
            onClick={onToggleCollapse}
            title={effectiveCollapsed ? 'Expand' : 'Collapse'}
            style={{
              width: effectiveCollapsed ? '36px' : '100%',
              height: '32px', borderRadius: '7px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: effectiveCollapsed ? 'center' : 'flex-start',
              gap: '8px', padding: effectiveCollapsed ? '0' : '0 8px',
              transition: 'background 0.12s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            {effectiveCollapsed
              ? <ChevronsRight size={14} color="#3F3F46" />
              : <ChevronsLeft size={14} color="#3F3F46" />
            }
            {!effectiveCollapsed && <span style={{ fontSize: '12px', color: '#3F3F46', fontWeight: 500 }}>Collapse</span>}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ mobileOpen, onCloseMobile, collapsed, onToggleCollapse }: Props) {
  return (
    <>
      <div className="hidden lg:block" style={{ height: '100vh', position: 'sticky', top: 0, flexShrink: 0, width: collapsed ? '60px' : '220px', transition: 'width 0.2s ease', overflow: 'visible', zIndex: 30 }}>
        <SidebarInner collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
      </div>

      {mobileOpen && (
        <>
          <div onClick={onCloseMobile} className="lg:hidden" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }} />
          <div className="lg:hidden" style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50, width: 'min(240px, 85vw)' }}>
            <SidebarInner collapsed={false} onToggleCollapse={onToggleCollapse} onClose={onCloseMobile} isMobile />
          </div>
        </>
      )}
    </>
  );
}

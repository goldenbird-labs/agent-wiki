import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ChatModal from './ChatModal';
import { useChatContext } from '../context/ChatContext';

export default function Layout() {
  const { isOpen, closeChat } = useChatContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F0F4F8' }}>
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <TopBar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <main style={{
          flex: 1, overflowY: 'auto',
          padding: 'clamp(16px, 3vw, 28px) clamp(12px, 3vw, 28px) 60px',
        }}>
          <Outlet />
        </main>
      </div>

      <ChatModal open={isOpen} onClose={closeChat} />
    </div>
  );
}

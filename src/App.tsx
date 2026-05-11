import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AgentDirectory from './pages/AgentDirectory';
import RegisterAgent from './pages/RegisterAgent';
import PoliciesGuidelines from './pages/PoliciesGuidelines';
import Demo from './pages/Demo';

export default function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="agents" element={<AgentDirectory />} />
            <Route path="register" element={<RegisterAgent />} />
            <Route path="policies" element={<PoliciesGuidelines />} />
            <Route path="demo" element={<Demo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

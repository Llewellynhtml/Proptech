import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import Properties from './components/Properties';
import Leads from './components/Leads';
import Analytics from './components/Analytics';
import Marketing from './components/Marketing';
import ScheduledPosts from './components/ScheduledPosts';
import Agents from './components/Agents';
import Settings from './components/Settings';
import Onboarding from './components/Onboarding';
import { UserRole, Agent } from './types';
import { useAuth } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

function DashboardLayout() {
  const { token, logout } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const fetchAgents = async () => {
    if (!token) return;
    try {
      const response = await fetch('/api/agents', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAgents();
    }
  }, [token]);

  const handleOnboardingComplete = (role: UserRole) => {
    setUserRole(role);
    setShowOnboarding(false);
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick Action:', action);
    if (action === 'add-property') setActivePage('properties');
    if (action === 'create-post') setActivePage('post-builder');
    if (action === 'add-lead') setActivePage('leads');
    if (action === 'add-agent') setActivePage('agents');
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <AnimatePresence>
        {showOnboarding && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

      <Sidebar 
        activePage={activePage} 
        setActivePage={(page) => {
          setActivePage(page);
          setIsSidebarOpen(false);
        }} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 w-full">
        <TopBar 
          activePage={activePage} 
          onAction={handleQuickAction} 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activePage === 'dashboard' && <Dashboard />}
              {activePage === 'properties' && <Properties />}
              {activePage === 'agents' && <Agents agents={agents} onUpdate={fetchAgents} />}
              {activePage === 'leads' && <Leads />}
              {activePage === 'analytics' && <Analytics />}
              {activePage === 'post-builder' && <Marketing />}
              {activePage === 'scheduled-posts' && <ScheduledPosts />}
              {activePage === 'branding' && <Settings />}
              {activePage === 'settings' && <Settings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

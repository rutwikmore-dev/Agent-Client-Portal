import React, { useState } from 'react';
import { usePortal } from './context/PortalContext';
import { DashboardView } from './views/DashboardView';
import { LandingView } from './views/LandingView';
import { 
  LayoutDashboard, 
  Bell,
  ArrowLeft
} from 'lucide-react';

const App: React.FC = () => {
  const { role, setRole } = usePortal();
  const [viewMode, setViewMode] = useState<'landing' | 'portal'>('landing');

  if (viewMode === 'landing') {
    return <LandingView onEnterPortal={() => setViewMode('portal')} />;
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          <div className="logo-container">
            <div className="logo-icon">S</div>
            <span className="logo-text">Sorted</span>
          </div>

          <nav className="nav-links">
            <button className="nav-item active">
              <LayoutDashboard />
              <span>Workspace Dashboard</span>
            </button>

            {/* Back to Home Navigation */}
            <button 
              className="nav-item"
              onClick={() => setViewMode('landing')}
              style={{ borderTop: '1px solid var(--border-color)', marginTop: '24px', paddingTop: '16px', borderRadius: 0 }}
            >
              <ArrowLeft />
              <span>Back to Home</span>
            </button>
          </nav>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
            Sorted Suite v1.0.0
          </div>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="main-content">
        {/* Header section */}
        <header className="header">
          <div className="header-title-section">
            <h1>Workspace Portal</h1>
            <p>Track project timelines, workflow swimlanes, and assets.</p>
          </div>

          <div className="header-controls">
            {/* Live Perspective Switcher */}
            <div className="role-toggle-container">
              <button 
                className={`role-btn ${role === 'client' ? 'active' : ''}`}
                onClick={() => setRole('client')}
              >
                Client Mode
              </button>
              <button 
                className={`role-btn ${role === 'agent' ? 'active' : ''}`}
                onClick={() => setRole('agent')}
              >
                Agent Mode
              </button>
            </div>

            {/* Notification indicator */}
            <div className="notification-bell" title="System Alerts">
              <Bell style={{ width: '18px', height: '18px' }} />
              <span className="notification-badge"></span>
            </div>

            {/* Profile tag */}
            <div className="user-profile-badge">
              <div className="user-avatar" style={{ background: role === 'agent' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'var(--accent-gradient)' }}>
                {role === 'agent' ? 'SJ' : 'RM'}
              </div>
              <div className="user-profile-info">
                <span className="user-name">
                  {role === 'agent' ? 'Sarah Jenkins' : 'Rutwik More'}
                </span>
                <span className="user-role">
                  {role === 'agent' ? 'Senior Advisor' : 'Client User'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Inner View */}
        <section style={{ animation: 'fade-in 0.3s ease-out' }}>
          <DashboardView />
        </section>
      </main>
    </div>
  );
};

export default App;

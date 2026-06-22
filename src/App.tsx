import React, { useState } from 'react';
import { usePortal } from './context/PortalContext';
import { DashboardView } from './pages/DashboardPage';
import { LandingView } from './pages/LandingPage';
import { ProjectsListView, ProjectsDetailView } from './pages/ProjectsPage';
import { 
  LayoutDashboard, 
  Bell,
  ArrowLeft,
  Search,
  Folder,
  Users,
  CheckCircle2,
  Cloud,
  MessageSquare,
  Clock,
  BarChart2,
  ChevronDown,
  Star
} from 'lucide-react';

const App: React.FC = () => {
  const { role, setRole } = usePortal();
  const [viewMode, setViewMode] = useState<'landing' | 'portal'>('landing');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects'>('dashboard');
  // null = projects list, string = project detail id
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const goToProjectsList = () => {
    setActiveTab('projects');
    setSelectedProjectId(null);
  };

  const goToProjectDetail = (id: string) => {
    setActiveTab('projects');
    setSelectedProjectId(id);
  };

  if (viewMode === 'landing') {
    return <LandingView onEnterPortal={() => setViewMode('portal')} />;
  }

  // Sidebar navigation menu based on selected perspective
  const getSidebarNav = () => {
    if (role === 'agent') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div className="sidebar-section-title">Main</div>
          <nav className="nav-links" style={{ marginTop: 0 }}>
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={goToProjectsList}
            >
              <Folder />
              <span>Projects</span>
            </button>
            
            <button className="nav-item" onClick={() => alert('Simulated Navigating to Clients...')}>
              <Users />
              <span>Clients</span>
            </button>
            
            <button className="nav-item" onClick={() => alert('Simulated Navigating to Approvals...')}>
              <CheckCircle2 />
              <span>Approvals</span>
              <span className="nav-item-badge">3</span>
            </button>
            
            <button className="nav-item" onClick={() => alert('Simulated Navigating to Asset Requests...')}>
              <Cloud />
              <span>Asset Requests</span>
              <span className="nav-item-badge">5</span>
            </button>
            
            <button className="nav-item" onClick={() => alert('Simulated Navigating to Feedback...')}>
              <MessageSquare />
              <span>Feedback</span>
            </button>
            
            <button className="nav-item" onClick={() => alert('Simulated Navigating to Activity...')}>
              <Clock />
              <span>Activity</span>
            </button>
            
            <button className="nav-item" onClick={() => alert('Simulated Navigating to Team...')}>
              <Users />
              <span>Team</span>
            </button>
            
            <button className="nav-item" onClick={() => alert('Simulated Navigating to Reports...')}>
              <BarChart2 />
              <span>Reports</span>
            </button>
          </nav>

          <div className="sidebar-section-title">Favorites</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 4px' }}>
            <button 
              className={`favorite-item ${activeTab === 'projects' && selectedProjectId === 'abc-website' ? 'active' : ''}`}
              onClick={() => goToProjectDetail('abc-website')}
            >
              <Star className="active-star" />
              <span>ABC Website Redesign</span>
            </button>
            
            <button className="favorite-item" onClick={() => goToProjectDetail('brand-identity')}>
              <Star className="active-star" />
              <span>Brand Identity</span>
            </button>
            
            <button className="favorite-item" onClick={() => goToProjectDetail('social-media')}>
              <Star className="active-star" />
              <span>Social Media Campaign</span>
            </button>
          </div>

          <div className="growth-plan-card">
            <div className="growth-plan-header-row">
              <span className="growth-plan-title">Growth Plan</span>
              <span className="growth-plan-text" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>12 / 30</span>
            </div>
            <div className="growth-plan-text" style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-muted)' }}>
              Projects
            </div>
            <div className="growth-plan-progress">
              <div className="growth-plan-fill" style={{ width: '40%' }}></div>
            </div>
            <button className="growth-plan-btn" onClick={() => alert('Opening Upgrade Plan interface...')}>
              Upgrade Plan
            </button>
          </div>

          {/* Back to Home Navigation */}
          <button 
            className="nav-item"
            onClick={() => setViewMode('landing')}
            style={{ borderTop: '1px solid var(--border-color)', marginTop: '16px', paddingTop: '16px', borderRadius: 0 }}
          >
            <ArrowLeft />
            <span>Back to Home</span>
          </button>
        </div>
      );
    } else {
      // Client perspective sidebar
      return (
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
      );
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar" style={{ height: '100vh', overflowY: 'auto' }}>
        <div>
          <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingBottom: '16px' }}>
            <div style={{
              background: '#000000',
              color: '#ffffff',
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '15px'
            }}>
              ✓
            </div>
            <span className="logo-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700 }}>Sorted</span>
          </div>

          {getSidebarNav()}
        </div>

        {/* Sidebar Footer Account Switcher */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
          {role === 'agent' ? (
            <div className="sidebar-footer-profile">
              <div className="sidebar-avatar-ca">CA</div>
              <div className="sidebar-profile-info">
                <span className="sidebar-profile-name">Creative Agency</span>
                <span className="sidebar-profile-role">Agency Workspace</span>
              </div>
              <ChevronDown style={{ width: '14px', height: '14px', color: 'var(--text-secondary)' }} />
            </div>
          ) : (
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
              Sorted Suite v1.0.0
            </div>
          )}
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="main-content">
        {/* Header Section */}
        <header className="header">
          <div className="header-title-section">
            {role === 'agent' && activeTab === 'projects' && !selectedProjectId ? (
              <div className="breadcrumbs-container">
                <span className="breadcrumbs-item active">Projects</span>
              </div>
            ) : role === 'agent' && activeTab === 'projects' && selectedProjectId ? (
              <div className="breadcrumbs-container">
                <button
                  onClick={goToProjectsList}
                  className="breadcrumbs-item"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
                >
                  Projects
                </button>
                <span className="breadcrumbs-separator">&gt;</span>
                <span className="breadcrumbs-item active">ABC Website Redesign</span>
              </div>
            ) : (
              <>
                <h1>
                  {role === 'agent' ? 'Good Morning, Rutwik! 👋' : 'Workspace Portal'}
                </h1>
                <p style={{ marginTop: '2px' }}>
                  {role === 'agent' 
                    ? "Here's what's happening with your projects today." 
                    : 'Track project timelines, workflow swimlanes, and assets.'
                  }
                </p>
              </>
            )}
          </div>

          {/* Search container in header */}
          {role === 'agent' && (
            <div className="search-container" style={{ margin: '0 auto 0 40px' }}>
              <Search style={{ width: '15px', height: '15px', color: 'var(--text-secondary)' }} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input"
                readOnly
                title="Search simulated (⌘K)"
              />
              <span className="search-shortcut-badge">⌘ K</span>
            </div>
          )}

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

            {/* Notification Indicator */}
            <div className="notification-bell" title="System Alerts" style={{ border: 'none', background: 'transparent' }}>
              <Bell style={{ width: '20px', height: '20px' }} />
              <span className="notification-badge" style={{ 
                top: '2px', 
                right: '2px', 
                border: '1.5px solid #ffffff', 
                width: '14px', 
                height: '14px', 
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '8px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%'
              }}>
                3
              </span>
            </div>

            {/* Profile Avatar Tag */}
            <div className="user-profile-badge" style={{ border: 'none', background: 'transparent', padding: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  className="user-avatar" 
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%',
                    background: '#e2e8f0', 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1.5px solid var(--border-color)',
                    flexShrink: 0
                  }}
                />
                {role === 'agent' && (
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>Rutwik Patel</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Agency Admin</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Inner View */}
        <section style={{ animation: 'fade-in 0.3s ease-out' }}>
          {role === 'agent' && activeTab === 'projects' ? (
            selectedProjectId ? (
              <ProjectsDetailView
                projectId={selectedProjectId}
                onBack={goToProjectsList}
              />
            ) : (
              <ProjectsListView onSelectProject={goToProjectDetail} />
            )
          ) : (
            <DashboardView />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;

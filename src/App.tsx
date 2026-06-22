import React from 'react';
import { usePortal } from './context/PortalContext';
import { DashboardView } from './views/DashboardView';
import { PipelineView } from './views/PipelineView';
import { MessagesView } from './views/MessagesView';
import { DocumentsView } from './views/DocumentsView';
import { TasksView } from './views/TasksView';
import { 
  LayoutDashboard, 
  TrendingUp, 
  MessageSquare, 
  FolderOpen, 
  CheckSquare, 
  Bell 
} from 'lucide-react';

const App: React.FC = () => {
  const { role, setRole, activeTab, setActiveTab } = usePortal();

  // Handle views rendering
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'pipeline':
        return <PipelineView />;
      case 'messages':
        return <MessagesView />;
      case 'documents':
        return <DocumentsView />;
      case 'tasks':
        return <TasksView />;
      default:
        return <DashboardView />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Overview Dashboard', subtitle: 'Real-time overview of deal status and next steps.' };
      case 'pipeline':
        return { title: 'Transaction Milestones', subtitle: 'Track milestones and stage criteria for your deal.' };
      case 'messages':
        return { title: 'Messaging Center', subtitle: 'Secure, encrypted collaboration with your advisor.' };
      case 'documents':
        return { title: 'Secure Document Vault', subtitle: 'Upload files, check statuses, and sign contracts.' };
      case 'tasks':
        return { title: 'Collaboration Task Board', subtitle: 'Checklist of actions to keep things moving.' };
    }
  };

  const pageMeta = getPageTitle();

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div>
          <div className="logo-container">
            <div className="logo-icon">A</div>
            <span className="logo-text">Agentic</span>
          </div>

          <nav className="nav-links">
            <button 
              className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard />
              <span>Dashboard</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'pipeline' ? 'active' : ''}`}
              onClick={() => setActiveTab('pipeline')}
            >
              <TrendingUp />
              <span>Milestones</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <MessageSquare />
              <span>Messages</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FolderOpen />
              <span>Document Vault</span>
            </button>

            <button 
              className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <CheckSquare />
              <span>Tasks Board</span>
            </button>
          </nav>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
            Agentic Collaboration Suite v1.0.0
          </div>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="main-content">
        {/* Header section */}
        <header className="header">
          <div className="header-title-section">
            <h1>{pageMeta.title}</h1>
            <p>{pageMeta.subtitle}</p>
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
          {renderActiveView()}
        </section>
      </main>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  FileText,
  MoreVertical,
  Globe,
  Plus,
  Share2,
  ChevronDown,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  name: string;
  client: string;
  clientInitials: string;
  category: string;
  status: 'In Review' | 'Active' | 'Completed' | 'On Hold';
  progress: number;
  dueDate: string;
  startDate: string;
  teamSize: number;
  deliverables: number;
  pendingApprovals: number;
  color: string;
  icon: string;
}

// ─── Mock data ──────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'abc-website',
    name: 'ABC Website Redesign',
    client: 'ABC Corp',
    clientInitials: 'AC',
    category: 'Web Design',
    status: 'In Review',
    progress: 80,
    dueDate: '15 Jun, 2024',
    startDate: '10 May, 2024',
    teamSize: 4,
    deliverables: 7,
    pendingApprovals: 2,
    color: '#3b82f6',
    icon: '🌐',
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity System',
    client: 'TechFlow Inc',
    clientInitials: 'TF',
    category: 'Branding',
    status: 'Active',
    progress: 45,
    dueDate: '30 Jul, 2024',
    startDate: '1 Jun, 2024',
    teamSize: 3,
    deliverables: 12,
    pendingApprovals: 0,
    color: '#10b981',
    icon: '✦',
  },
  {
    id: 'social-media',
    name: 'Social Media Campaign',
    client: 'Bright Ventures',
    clientInitials: 'BV',
    category: 'Marketing',
    status: 'Active',
    progress: 20,
    dueDate: '20 Aug, 2024',
    startDate: '15 Jun, 2024',
    teamSize: 2,
    deliverables: 5,
    pendingApprovals: 1,
    color: '#f59e0b',
    icon: '📣',
  },
  {
    id: 'mobile-app',
    name: 'Mobile App UI Kit',
    client: 'Nexus Labs',
    clientInitials: 'NL',
    category: 'Product Design',
    status: 'Completed',
    progress: 100,
    dueDate: '1 Jun, 2024',
    startDate: '1 Mar, 2024',
    teamSize: 5,
    deliverables: 24,
    pendingApprovals: 0,
    color: '#8b5cf6',
    icon: '📱',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    client: 'ShopWave',
    clientInitials: 'SW',
    category: 'Web Development',
    status: 'On Hold',
    progress: 35,
    dueDate: '10 Sep, 2024',
    startDate: '1 Apr, 2024',
    teamSize: 6,
    deliverables: 9,
    pendingApprovals: 3,
    color: '#ec4899',
    icon: '🛒',
  },
];

const STATUS_CONFIG = {
  'In Review': { bg: 'rgba(139,92,246,0.08)', color: '#8b5cf6', label: 'In Review' },
  'Active':    { bg: 'rgba(16,185,129,0.08)',  color: '#10b981', label: 'Active' },
  'Completed': { bg: 'rgba(59,130,246,0.08)',  color: '#3b82f6', label: 'Completed' },
  'On Hold':   { bg: 'rgba(245,158,11,0.08)',  color: '#f59e0b', label: 'On Hold' },
};

// ─── Projects List View ─────────────────────────────────────────────────────────

interface ProjectsListViewProps {
  onSelectProject: (id: string) => void;
}

export const ProjectsListView: React.FC<ProjectsListViewProps> = ({ onSelectProject }) => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const statuses = ['All', 'Active', 'In Review', 'Completed', 'On Hold'];

  const filtered = PROJECTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: PROJECTS.length,
    active: PROJECTS.filter(p => p.status === 'Active').length,
    inReview: PROJECTS.filter(p => p.status === 'In Review').length,
    completed: PROJECTS.filter(p => p.status === 'Completed').length,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Summary Stats Row */}
      <div className="proj-list-stats-row">
        <div className="proj-list-stat-card">
          <div className="proj-list-stat-icon" style={{ background: 'rgba(59,130,246,0.08)', color: '#3b82f6' }}>
            <Grid style={{ width: '16px', height: '16px' }} />
          </div>
          <div>
            <div className="proj-list-stat-num">{stats.total}</div>
            <div className="proj-list-stat-label">Total Projects</div>
          </div>
        </div>
        <div className="proj-list-stat-card">
          <div className="proj-list-stat-icon" style={{ background: 'rgba(16,185,129,0.08)', color: '#10b981' }}>
            <TrendingUp style={{ width: '16px', height: '16px' }} />
          </div>
          <div>
            <div className="proj-list-stat-num">{stats.active}</div>
            <div className="proj-list-stat-label">Active</div>
          </div>
        </div>
        <div className="proj-list-stat-card">
          <div className="proj-list-stat-icon" style={{ background: 'rgba(139,92,246,0.08)', color: '#8b5cf6' }}>
            <Clock style={{ width: '16px', height: '16px' }} />
          </div>
          <div>
            <div className="proj-list-stat-num">{stats.inReview}</div>
            <div className="proj-list-stat-label">In Review</div>
          </div>
        </div>
        <div className="proj-list-stat-card">
          <div className="proj-list-stat-icon" style={{ background: 'rgba(16,185,129,0.08)', color: '#10b981' }}>
            <CheckCircle2 style={{ width: '16px', height: '16px' }} />
          </div>
          <div>
            <div className="proj-list-stat-num">{stats.completed}</div>
            <div className="proj-list-stat-label">Completed</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="proj-list-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="proj-list-search-box">
            <Search style={{ width: '14px', height: '14px', color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="proj-list-search-input"
            />
          </div>
          <div className="proj-list-filter-tabs">
            {statuses.map(s => (
              <button
                key={s}
                className={`proj-list-filter-tab ${filterStatus === s ? 'active' : ''}`}
                onClick={() => setFilterStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="proj-list-icon-btn" title="Filter">
            <Filter style={{ width: '15px', height: '15px' }} />
          </button>
          <div className="proj-list-view-toggle">
            <button
              className={`proj-list-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid style={{ width: '14px', height: '14px' }} />
            </button>
            <button
              className={`proj-list-view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
          <button
            className="action-btn primary"
            onClick={() => alert('Create new project simulated')}
            style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '8px' }}
          >
            <Plus style={{ width: '14px', height: '14px' }} />
            New Project
          </button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === 'grid' ? (
        <div className="proj-list-grid">
          {filtered.map(project => {
            const sc = STATUS_CONFIG[project.status];
            return (
              <div
                key={project.id}
                className="proj-card"
                onClick={() => onSelectProject(project.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && onSelectProject(project.id)}
              >
                {/* Card top accent */}
                <div className="proj-card-accent" style={{ background: project.color }} />

                <div className="proj-card-body">
                  {/* Header */}
                  <div className="proj-card-header">
                    <div className="proj-card-icon-wrap" style={{ background: `${project.color}14`, color: project.color }}>
                      <span style={{ fontSize: '18px' }}>{project.icon}</span>
                    </div>
                    <span className="proj-card-status-badge" style={{ background: sc.bg, color: sc.color }}>
                      {sc.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="proj-card-title">{project.name}</h3>
                  <p className="proj-card-client">{project.client} · {project.category}</p>

                  {/* Progress */}
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>Progress</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{project.progress}%</span>
                    </div>
                    <div className="proj-card-progress-track">
                      <div
                        className="proj-card-progress-fill"
                        style={{ width: `${project.progress}%`, background: project.color }}
                      />
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="proj-card-meta-row">
                    <div className="proj-card-meta-item">
                      <Calendar style={{ width: '12px', height: '12px' }} />
                      <span>{project.dueDate}</span>
                    </div>
                    <div className="proj-card-meta-item">
                      <Users style={{ width: '12px', height: '12px' }} />
                      <span>{project.teamSize} members</span>
                    </div>
                  </div>

                  {/* Footer stats */}
                  <div className="proj-card-footer">
                    <div className="proj-card-footer-stat">
                      <span className="proj-card-footer-num">{project.deliverables}</span>
                      <span className="proj-card-footer-lbl">Deliverables</span>
                    </div>
                    {project.pendingApprovals > 0 && (
                      <div className="proj-card-footer-alert">
                        <AlertCircle style={{ width: '12px', height: '12px' }} />
                        <span>{project.pendingApprovals} pending</span>
                      </div>
                    )}
                    <div className="proj-card-arrow">
                      <ChevronRight style={{ width: '16px', height: '16px' }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* New project CTA card */}
          <div
            className="proj-card proj-card-new"
            onClick={() => alert('Create new project simulated')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && alert('Create new project simulated')}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', border: '2px dashed var(--border-color-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus style={{ width: '20px', height: '20px', color: 'var(--text-muted)' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>New Project</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>Start a new client project workspace</span>
            </div>
          </div>
        </div>
      ) : (
        /* List view */
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="agency-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Due Date</th>
                <th>Team</th>
                <th style={{ width: '30px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(project => {
                const sc = STATUS_CONFIG[project.status];
                return (
                  <tr
                    key={project.id}
                    onClick={() => onSelectProject(project.id)}
                    style={{ cursor: 'pointer' }}
                    className="proj-list-row"
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${project.color}14`, color: project.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                          {project.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{project.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{project.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: `${project.color}14`, color: project.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                          {project.clientInitials}
                        </div>
                        <span style={{ fontSize: '13px' }}>{project.client}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: sc.bg, color: sc.color }}>
                        {sc.label}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${project.progress}%`, height: '100%', background: project.color, borderRadius: '2px' }} />
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 600 }}>{project.progress}%</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{project.dueDate}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users style={{ width: '12px', height: '12px', color: 'var(--text-muted)' }} />
                        <span style={{ fontSize: '12px' }}>{project.teamSize}</span>
                      </div>
                    </td>
                    <td>
                      <ChevronRight style={{ width: '16px', height: '16px', color: 'var(--text-muted)' }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px', gap: '12px' }}>
          <Globe style={{ width: '40px', height: '40px', color: 'var(--text-muted)' }} />
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>No projects match your search.</p>
        </div>
      )}
    </div>
  );
};

// ─── Project Detail View ────────────────────────────────────────────────────────

interface ProjectsDetailViewProps {
  projectId: string;
  onBack: () => void;
}

export const ProjectsDetailView: React.FC<ProjectsDetailViewProps> = ({ projectId }) => {
  const { addActivity } = usePortal();
  const project = PROJECTS.find(p => p.id === projectId) ?? PROJECTS[0];
  const [activeProjectTab, setActiveProjectTab] = useState<string>('Overview');

  const projectTabs = [
    'Overview',
    'Deliverables',
    'Feedback',
    'Assets',
    'Timeline',
    'Tasks',
    'Notes',
    'Settings'
  ];

  const deliverables = [
    {
      title: 'Homepage Design',
      type: 'Figma Design',
      isDesign: true,
      version: 'v2',
      status: 'Pending Approval',
      statusType: 'warning',
      sharedOn: '12 Jun, 2024'
    },
    {
      title: 'About Us Page',
      type: 'Figma Design',
      isDesign: true,
      version: 'v1',
      status: 'Approved',
      statusType: 'success',
      sharedOn: '10 Jun, 2024'
    },
    {
      title: 'Mobile View',
      type: 'Figma Design',
      isDesign: true,
      version: 'v1',
      status: 'Changes Requested',
      statusType: 'danger',
      sharedOn: '8 Jun, 2024'
    },
    {
      title: 'Style Guide',
      type: 'PDF Document',
      isDesign: false,
      version: 'v1',
      status: 'Approved',
      statusType: 'success',
      sharedOn: '5 Jun, 2024'
    }
  ];

  const activities = [
    { time: '10:35 AM', text: 'Homepage design approved', author: 'Jane Cooper', type: 'success' },
    { time: 'Yesterday', text: 'New feedback added', author: 'Jane Cooper', type: 'danger' },
    { time: '2 Jun, 2024', text: 'About us page submitted', author: 'Rutwik Patel', type: 'document' },
    { time: '30 May, 2024', text: 'Brand assets uploaded', author: 'Jane Cooper', type: 'upload' },
    { time: '28 May, 2024', text: 'Project created', author: 'Rutwik Patel', type: 'flag' }
  ];

  const assetRequests = [
    { name: 'Logo (High Priority)', type: 'PNG, SVG', status: 'Pending', statusType: 'pending' },
    { name: 'Brand Guidelines', type: 'PDF', status: 'Pending', statusType: 'pending' },
    { name: 'Team Photos', type: 'JPG, PNG', status: 'Received', statusType: 'received' }
  ];

  const team = [
    { name: 'Rutwik Patel', role: 'Project Manager', isYou: true, color: '#3b82f6' },
    { name: 'John Doe', role: 'UI/UX Designer', color: '#10b981' },
    { name: 'Sarah Wilson', role: 'Developer', color: '#f59e0b' },
    { name: 'Mike Johnson', role: 'Content Writer', color: '#ec4899' }
  ];

  const handleShare = () => {
    addActivity(`Shared ${project.name} details externally.`, 'agency');
    alert('Project details link copied to clipboard.');
  };

  const handleAddAction = () => {
    addActivity(`Added a new element to ${project.name}.`, 'agency');
    alert('Simulated adding a new task, deliverable, or asset.');
  };

  const handleRequestAsset = () => {
    addActivity('Sent asset request reminder to client.', 'agency');
    alert('Asset request form generated and sent to client.');
  };

  const handleInviteMember = () => {
    const email = prompt('Enter team member email to invite:');
    if (email) {
      addActivity(`Invited team member ${email} to project.`, 'agency');
      alert(`Invitation sent to ${email}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* A. Project Header Section */}
      <div className="project-header-container">
        <div className="project-header-logo" style={{ background: `${project.color}14`, color: project.color }}>
          <span style={{ fontSize: '22px' }}>{project.icon}</span>
        </div>
        <div className="project-header-info">
          <div className="project-header-title-row">
            <h1 className="project-header-title">{project.name}</h1>
            <span className="status-badge-styled review" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              {project.status} <ChevronDown style={{ width: '12px', height: '12px' }} />
            </span>
          </div>
          <div className="project-header-meta">
            <span>{project.category}</span>
            <span className="project-header-meta-dot"></span>
            <span>{project.client}</span>
            <span className="project-header-meta-dot"></span>
            <div className="project-header-pm">
              <span>Project Manager:</span>
              <div
                className="project-header-pm-avatar"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80")' }}
              />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Rutwik Patel</span>
            </div>
          </div>
        </div>

        <div className="project-header-actions">
          <button className="action-btn" onClick={handleShare} style={{ padding: '8px 16px', borderRadius: '8px' }}>
            <Share2 style={{ width: '14px', height: '14px' }} />
            Share Project
          </button>
          <button
            className="action-btn primary"
            onClick={handleAddAction}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#000'
            }}
          >
            <Plus style={{ width: '14px', height: '14px' }} />
            Add
            <ChevronDown style={{ width: '12px', height: '12px', marginLeft: '4px' }} />
          </button>
        </div>
      </div>

      {/* B. Tabs Strip Row */}
      <div className="project-tabs-row">
        {projectTabs.map((tab) => (
          <button
            key={tab}
            className={`project-tab-item ${activeProjectTab === tab ? 'active' : ''}`}
            onClick={() => setActiveProjectTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* C. Overview Tab Grid */}
      {activeProjectTab === 'Overview' ? (
        <div className="project-overview-grid">
          {/* Main Column */}
          <div className="project-left-stack">
            {/* 1. Summary card */}
            <div className="project-summary-card">
              <div className="summary-column">
                <span className="summary-label">Status</span>
                <span className="summary-value" style={{ color: STATUS_CONFIG[project.status].color }}>{project.status}</span>
              </div>
              <div className="summary-column">
                <span className="summary-label">Progress</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
                  <span className="summary-value">{project.progress}%</span>
                  <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${project.progress}%`, height: '100%', backgroundColor: project.color }}></div>
                  </div>
                </div>
              </div>
              <div className="summary-column">
                <span className="summary-label">Start Date</span>
                <span className="summary-value">{project.startDate}</span>
              </div>
              <div className="summary-column">
                <span className="summary-label">Due Date</span>
                <span className="summary-value danger">{project.dueDate}</span>
              </div>
              <div className="summary-column">
                <span className="summary-label">Client</span>
                <div className="summary-client-box">
                  <div className="summary-client-avatar" style={{ background: `${project.color}14`, color: project.color }}>{project.clientInitials}</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="summary-value" style={{ fontSize: '11px', lineHeight: 1.1 }}>{project.client}</span>
                    <a href="#client-profile" className="summary-client-link" onClick={() => alert('Opening client profile details...')}>
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Description and Activity columns */}
            <div className="project-desc-activity-grid">
              {/* Left Subcol: Project Description */}
              <div className="card" style={{ padding: '20px' }}>
                <h3 className="card-title-main" style={{ marginBottom: '12px' }}>Project Description</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Redesign the {project.client} website with a modern, conversion-focused design.
                </p>
                
                <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '16px', marginBottom: '8px' }}>Goals:</h4>
                <ul className="goals-list">
                  <li className="goal-item">Improve user experience</li>
                  <li className="goal-item">Increase lead generation</li>
                  <li className="goal-item">Align with new brand identity</li>
                  <li className="goal-item">Mobile-first approach</li>
                </ul>
              </div>

              {/* Right Subcol: Project Activity Timeline */}
              <div className="card" style={{ padding: '20px' }}>
                <div className="card-header-flex" style={{ marginBottom: '16px' }}>
                  <h3 className="card-title-main">Project Activity</h3>
                  <a href="#activity" className="view-all-link" onClick={() => setActiveProjectTab('Timeline')}>View all</a>
                </div>

                <div className="timeline-card-styled">
                  {activities.map((act, idx) => (
                    <div className="timeline-item-styled" key={idx} style={{ gap: '10px' }}>
                      <div className="timeline-bullet-col">
                        <div className="timeline-bullet" style={{ 
                          width: '18px', 
                          height: '18px',
                          border: '2.5px solid var(--bg-primary)',
                          backgroundColor: act.type === 'success' ? '#10b981' : (act.type === 'danger' ? '#ef4444' : '#3b82f6')
                        }} />
                        <div className="timeline-line-styled" style={{ top: '18px', bottom: '-14px' }}></div>
                      </div>
                      <div className="timeline-content-col" style={{ paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <span className="timeline-text" style={{ fontSize: '12px', fontWeight: 600 }}>{act.text}</span>
                          <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{act.time}</span>
                        </div>
                        <span className="timeline-author" style={{ fontSize: '10px', marginTop: '1px' }}>By {act.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Deliverables Table */}
            <div className="card" style={{ padding: '20px' }}>
              <div className="card-header-flex" style={{ marginBottom: '16px' }}>
                <h3 className="deliverables-section-title">Deliverables</h3>
                <a href="#deliverables" className="view-all-link" onClick={() => setActiveProjectTab('Deliverables')}>
                  View all deliverables
                </a>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="agency-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Version</th>
                      <th>Status</th>
                      <th>Shared On</th>
                      <th>Action</th>
                      <th style={{ width: '30px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliverables.map((del, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="project-cell">
                            <div className="deliverable-thumbnail-box">
                              {del.isDesign ? (
                                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '3px', gap: '2px' }}>
                                  <div style={{ height: '5px', background: '#cbd5e1', borderRadius: '1px' }}></div>
                                  <div style={{ display: 'flex', gap: '2px', flex: 1 }}>
                                    <div style={{ flex: 1, background: '#f1f5f9', border: '0.5px solid #cbd5e1', borderRadius: '1px' }}></div>
                                    <div style={{ width: '12px', background: '#e2e8f0', borderRadius: '1px' }}></div>
                                  </div>
                                </div>
                              ) : (
                                <FileText style={{ width: '14px', height: '14px', color: '#94a3b8' }} />
                              )}
                            </div>
                            <div className="project-details">
                              <span className="project-name">{del.title}</span>
                              <span className="project-category" style={{ fontSize: '10px' }}>{del.isDesign ? 'Figma File' : 'PDF Document'}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ 
                            fontSize: '11px', 
                            padding: '3px 8px', 
                            borderRadius: '4px', 
                            backgroundColor: del.isDesign ? 'rgba(59, 130, 246, 0.06)' : 'rgba(245, 158, 11, 0.06)',
                            color: del.isDesign ? '#3b82f6' : '#f59e0b',
                            fontWeight: 600
                          }}>
                            {del.isDesign ? 'Design' : 'Document'}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{del.version}</td>
                        <td>
                          <span className={`status-badge-styled ${del.statusType}`}>
                            {del.status}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-secondary)' }}>{del.sharedOn}</td>
                        <td>
                          <button 
                            className="action-btn" 
                            style={{ padding: '4px 10px', fontSize: '11px' }}
                            onClick={() => alert(`Simulating viewing ${del.title}...`)}
                          >
                            View
                          </button>
                        </td>
                        <td>
                          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                            <MoreVertical style={{ width: '16px', height: '16px' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar Widgets column */}
          <div className="project-sidebar-stack">
            {/* Widget 1: Client Actions */}
            <div className="card" style={{ padding: '18px' }}>
              <h3 className="card-title-main" style={{ marginBottom: '14px' }}>Client Actions</h3>
              <div className="client-actions-container">
                <div className="client-action-item">
                  <div className="client-action-left">
                    <div className="client-action-number pending-approval">2</div>
                    <span className="client-action-label">Pending Approvals</span>
                  </div>
                  <a href="#view-pending" className="client-action-link">View all</a>
                </div>

                <div className="client-action-item">
                  <div className="client-action-left">
                    <div className="client-action-number changes-requested">1</div>
                    <span className="client-action-label">Changes Requested</span>
                  </div>
                  <a href="#view-changes" className="client-action-link">View all</a>
                </div>

                <div className="client-action-item">
                  <div className="client-action-left">
                    <div className="client-action-number pending-assets">3</div>
                    <span className="client-action-label">Pending Asset Requests</span>
                  </div>
                  <a href="#view-assets" className="client-action-link">View all</a>
                </div>
              </div>
            </div>

            {/* Widget 2: Asset Requests */}
            <div className="card" style={{ padding: '18px' }}>
              <div className="card-header-flex" style={{ marginBottom: '14px' }}>
                <h3 className="card-title-main">Asset Requests</h3>
                <a href="#assets" className="view-all-link" onClick={() => setActiveProjectTab('Assets')}>View all</a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {assetRequests.map((req, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText style={{ width: '14px', height: '14px', color: 'var(--text-secondary)' }} />
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>{req.name}</span>
                        <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{req.type}</span>
                      </div>
                    </div>
                    <span style={{ 
                      fontSize: '9px', 
                      fontWeight: 700, 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      backgroundColor: req.statusType === 'pending' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                      color: req.statusType === 'pending' ? '#ef4444' : '#10b981'
                    }}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                className="action-btn" 
                onClick={handleRequestAsset}
                style={{ width: '100%', justifyContent: 'center', fontSize: '11px', padding: '8px 0', marginTop: '12px' }}
              >
                + Request New Asset
              </button>
            </div>

            {/* Widget 3: Project Team */}
            <div className="card" style={{ padding: '18px' }}>
              <div className="card-header-flex" style={{ marginBottom: '14px' }}>
                <h3 className="card-title-main">Project Team</h3>
                <a href="#team" className="view-all-link" onClick={() => alert('Simulated Team Manage...')}>Manage</a>
              </div>

              <div className="team-list-small">
                {team.map((member, idx) => (
                  <div className="team-row-small" key={idx}>
                    <div className="team-member-info-small">
                      <div className="team-member-avatar-small" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6' }}>
                        {member.name.charAt(0)}
                      </div>
                      <div className="team-member-details-small">
                        <span className="team-member-name-small">{member.name}</span>
                        <span className="team-member-role-small">{member.role}</span>
                      </div>
                    </div>
                    {member.isYou && <span className="team-member-you-badge">You</span>}
                  </div>
                ))}
              </div>

              <button 
                className="action-btn" 
                onClick={handleInviteMember}
                style={{ width: '100%', justifyContent: 'center', fontSize: '11px', padding: '8px 0', marginTop: '12px' }}
              >
                + Invite Team Member
              </button>
            </div>

            {/* Widget 4: Project Notes */}
            <div className="card" style={{ padding: '18px' }}>
              <div className="card-header-flex" style={{ marginBottom: '10px' }}>
                <h3 className="card-title-main">Project Notes</h3>
                <a href="#notes" className="view-all-link" onClick={() => setActiveProjectTab('Notes')}>View all</a>
              </div>
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#fffdf5', 
                border: '1px solid #fef08a', 
                borderRadius: '6px',
                fontSize: '11px',
                color: '#713f12',
                lineHeight: 1.5,
                position: 'relative'
              }}>
                <p>Client prefers a clean and minimal design with blue as the primary color.</p>
                <div style={{ fontSize: '9px', color: '#854d0e', marginTop: '6px', fontWeight: 500 }}>
                  Updated on 10 Jun, 2024
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', gap: '12px', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
          <Globe style={{ width: '48px', height: '48px', color: 'var(--text-muted)' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {activeProjectTab} Section
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center', maxWidth: '360px' }}>
            The {activeProjectTab} component workspace is simulated. Toggle back to the Overview tab to view the primary dashboard metrics.
          </p>
          <button className="action-btn" onClick={() => setActiveProjectTab('Overview')} style={{ backgroundColor: '#000', color: '#fff' }}>
            Back to Overview
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Legacy export (kept for backwards compatibility) ───────────────────────────
export const ProjectsView = ProjectsDetailView;

import React from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  CheckCircle2, 
  Clock, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  FileText,
  Users,
  MessageSquare,
  Cloud,
  MoreVertical,
  Calendar,
  Folder
} from 'lucide-react';

export const AgencyDashboardView: React.FC = () => {
  const { addActivity } = usePortal();

  const metrics = [
    {
      title: 'Active Projects',
      value: '24',
      trend: '↑ +3 this week',
      trendType: 'success',
      icon: Folder,
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.08)'
    },
    {
      title: 'Clients',
      value: '17',
      trend: '↑ +2 this week',
      trendType: 'success',
      icon: Users,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.08)'
    },
    {
      title: 'Pending Approvals',
      value: '3',
      trend: 'Needs your attention',
      trendType: 'warning',
      icon: CheckCircle2,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.08)'
    },
    {
      title: 'Pending Feedback',
      value: '5',
      trend: 'Needs your response',
      trendType: 'danger',
      icon: MessageSquare,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.08)'
    },
    {
      title: 'Asset Requests',
      value: '5',
      trend: 'Waiting for clients',
      trendType: 'success',
      icon: Cloud,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.08)'
    }
  ];

  const projects = [
    {
      name: 'ABC Website Redesign',
      category: 'Website Design',
      client: 'ABC Corp',
      status: 'Review',
      progress: 80,
      dueDate: '15 Jun, 2024',
      iconColor: '#8b5cf6',
      iconBg: 'rgba(139, 92, 246, 0.08)'
    },
    {
      name: 'Brand Identity',
      category: 'Branding',
      client: 'Startup X',
      status: 'In Progress',
      progress: 45,
      dueDate: '22 Jun, 2024',
      iconColor: '#ec4899',
      iconBg: 'rgba(236, 72, 153, 0.08)'
    },
    {
      name: 'Product Explainer Video',
      category: 'Video Production',
      client: 'XYZ Ltd.',
      status: 'Approval',
      progress: 95,
      dueDate: '10 Jun, 2024',
      iconColor: '#10b981',
      iconBg: 'rgba(16, 185, 129, 0.08)'
    },
    {
      name: 'Social Media Campaign',
      category: 'Marketing',
      client: 'Nike India',
      status: 'In Progress',
      progress: 60,
      dueDate: '18 Jun, 2024',
      iconColor: '#f59e0b',
      iconBg: 'rgba(245, 158, 11, 0.08)'
    },
    {
      name: 'Landing Page Design',
      category: 'Website Design',
      client: 'TechFlow',
      status: 'Overdue',
      progress: 70,
      dueDate: '5 Jun, 2024',
      iconColor: '#3b82f6',
      iconBg: 'rgba(59, 130, 246, 0.08)'
    }
  ];

  const actionItems = [
    {
      title: 'Homepage Design waiting for approval',
      client: 'ABC Corp',
      priority: 'High',
      icon: Clock,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.08)'
    },
    {
      title: 'Client has not uploaded logo',
      client: 'Startup X Brand Identity',
      priority: 'Medium',
      icon: Cloud,
      color: '#3b82f6',
      bgColor: 'rgba(59, 130, 246, 0.08)'
    },
    {
      title: 'Video Revision #2 pending',
      client: 'XYZ Ltd. Explainer Video',
      priority: 'High',
      icon: MessageSquare,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.08)'
    },
    {
      title: 'Landing Page overdue by 3 days',
      client: 'TechFlow',
      priority: 'High',
      icon: Calendar,
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.08)'
    }
  ];

  const approvals = [
    {
      id: 'app1',
      name: 'Homepage Design',
      client: 'ABC Corp',
      submitted: 'Submitted 2 days ago',
      type: 'figma'
    },
    {
      id: 'app2',
      name: 'Brand Identity',
      client: 'Startup X',
      submitted: 'Submitted 1 day ago',
      type: 'logo'
    }
  ];

  const assetRequests = [
    {
      id: 'req1',
      client: 'ABC Corp',
      missing: 'Missing 2 of 4 assets',
      tags: ['Logo', 'Team Photos']
    },
    {
      id: 'req2',
      client: 'Startup X',
      missing: 'Missing 3 of 5 assets',
      tags: ['Brand Guidelines', 'Content', 'Images']
    }
  ];

  const activities = [
    {
      time: '10:35 AM',
      text: 'Client approved Homepage Design',
      author: 'ABC Corp',
      type: 'client'
    },
    {
      time: '10:12 AM',
      text: 'Logo uploaded by client',
      author: 'Startup X',
      type: 'client'
    },
    {
      time: '09:45 AM',
      text: 'New revision requested',
      author: 'Product Explainer Video',
      type: 'revision'
    },
    {
      time: '09:20 AM',
      text: 'New asset uploaded',
      author: 'Nike India Campaign',
      type: 'upload'
    }
  ];

  const team = [
    { name: 'Rutwik', tasks: '5 Active Tasks', percent: 70, color: '#3b82f6' },
    { name: 'John', tasks: '8 Active Tasks', percent: 90, color: '#3b82f6' },
    { name: 'Sarah', tasks: '3 Active Tasks', percent: 40, color: '#3b82f6' },
    { name: 'Mike', tasks: '6 Active Tasks', percent: 60, color: '#3b82f6' }
  ];

  const handleReminder = (name: string, client: string) => {
    addActivity(`Sent reminder for "${name}" to ${client}.`, 'agency');
    alert(`Reminder notification sent to ${client} for ${name}.`);
  };

  const handleAssetReminder = (client: string) => {
    addActivity(`Sent asset upload reminder to ${client}.`, 'agency');
    alert(`Asset request reminder sent to ${client}.`);
  };

  return (
    <div className="agency-dashboard-grid">
      <div className="agency-metrics-grid">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div className="card metric-card" key={idx} style={{ padding: '16px', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
              <div className="metric-icon-box" style={{ backgroundColor: m.bgColor, color: m.color, width: '40px', height: '40px' }}>
                <Icon style={{ width: '18px', height: '18px' }} />
              </div>
              <div className="metric-details" style={{ marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {m.title}
                </span>
                <div className="metric-value" style={{ fontSize: '24px', fontWeight: 700, margin: '2px 0' }}>
                  {m.value}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: 600, 
                  color: m.trendType === 'success' ? '#10b981' : (m.trendType === 'warning' ? '#f59e0b' : '#ef4444')
                }}>
                  {m.trend}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Projects & Action Center Row */}
      <div className="agency-row-2col">
        {/* Projects Overview */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-flex">
            <h3 className="card-title-main">Projects Overview</h3>
            <a href="#projects" className="view-all-link">View all projects →</a>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="agency-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Due Date</th>
                  <th style={{ width: '30px' }}></th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="project-cell">
                        <div className="project-icon-wrapper" style={{ backgroundColor: p.iconBg, color: p.iconColor }}>
                          <FileText style={{ width: '16px', height: '16px' }} />
                        </div>
                        <div className="project-details">
                          <span className="project-name">{p.name}</span>
                          <span className="project-category">{p.category}</span>
                        </div>
                      </div>
                    </td>
                    <td>{p.client}</td>
                    <td>
                      <span className={`status-badge-styled ${p.status.toLowerCase().replace(' ', '')}`}>
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className="agency-progress-container">
                        <span className="agency-progress-percent">{p.progress}%</span>
                        <div className="agency-progress-bar">
                          <div 
                            className="agency-progress-fill" 
                            style={{ 
                              width: `${p.progress}%`, 
                              backgroundColor: p.status === 'Overdue' ? '#ef4444' : '#3b82f6' 
                            }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td style={{ color: p.status === 'Overdue' ? '#ef4444' : 'var(--text-secondary)', fontWeight: p.status === 'Overdue' ? '600' : '500' }}>
                      {p.dueDate}
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

        {/* Action Center */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-flex">
            <h3 className="card-title-main">Action Center</h3>
            <a href="#actions" className="view-all-link">View all →</a>
          </div>

          <div className="action-center-list">
            {actionItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div className="action-center-item" key={idx}>
                  <div className="action-item-icon-box" style={{ backgroundColor: item.bgColor, color: item.color }}>
                    <Icon style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div className="action-item-content">
                    <span className="action-item-title">{item.title}</span>
                    <span className="action-item-sub">{item.client}</span>
                  </div>
                  <span className={`action-priority-badge ${item.priority.toLowerCase()}`}>
                    {item.priority}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Third Row: Approvals, Asset Requests, and Activity */}
      <div className="agency-row-3col">
        {/* Pending Approvals */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-flex">
            <h3 className="card-title-main">Pending Approvals</h3>
            <a href="#approvals" className="view-all-link">View all →</a>
          </div>

          <div className="approvals-list-col">
            {approvals.map((app) => (
              <div className="approval-item-card" key={app.id}>
                <div className="approval-item-top">
                  <div className="approval-thumbnail">
                    {app.type === 'figma' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '4px', gap: '3px' }}>
                        <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '1px' }}></div>
                        <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
                          <div style={{ flex: 1, background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '1px' }}></div>
                          <div style={{ width: '20px', background: '#cbd5e1', borderRadius: '1px' }}></div>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: '#fff' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '4px', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '10px', color: '#cbd5e1' }}>
                          S
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="approval-info">
                    <span className="approval-name">{app.name}</span>
                    <span className="approval-sub">{app.client}</span>
                    <span className="approval-sub" style={{ color: 'var(--text-muted)', fontSize: '10px' }}>{app.submitted}</span>
                  </div>
                </div>
                <div className="approval-item-actions">
                  <button 
                    className="action-btn" 
                    style={{ flex: 1, padding: '6px 8px', fontSize: '11px', justifyContent: 'center' }}
                    onClick={() => alert(`Opening preview of ${app.name} for ${app.client}...`)}
                  >
                    View
                  </button>
                  <button 
                    className="action-btn" 
                    style={{ flex: 1, padding: '6px 8px', fontSize: '11px', justifyContent: 'center' }}
                    onClick={() => handleReminder(app.name, app.client)}
                  >
                    Send Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asset Requests */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-flex">
            <h3 className="card-title-main">Asset Requests</h3>
            <a href="#assets" className="view-all-link">View all →</a>
          </div>

          <div className="approvals-list-col">
            {assetRequests.map((req) => (
              <div className="assets-request-card" key={req.id}>
                <div className="assets-request-header">
                  <div className="assets-request-client">
                    <div className="client-avatar-letter" style={{ 
                      backgroundColor: req.client.startsWith('ABC') ? 'rgba(59, 130, 246, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                      color: req.client.startsWith('ABC') ? '#3b82f6' : '#10b981'
                    }}>
                      {req.client.charAt(0)}
                    </div>
                    <div className="assets-request-info">
                      <span className="assets-request-name">{req.client}</span>
                      <span className="assets-request-missing-count">{req.missing}</span>
                    </div>
                  </div>
                  <button 
                    className="action-btn" 
                    style={{ padding: '6px 8px', fontSize: '11px' }}
                    onClick={() => handleAssetReminder(req.client)}
                  >
                    Remind Client
                  </button>
                </div>
                <div className="assets-tags-row">
                  {req.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="asset-tag" style={{
                      backgroundColor: tag.includes('Guidelines') || tag.includes('Photos') ? 'rgba(245, 158, 11, 0.06)' : (tag.includes('Content') ? 'rgba(16, 185, 129, 0.06)' : 'rgba(239, 68, 68, 0.06)'),
                      color: tag.includes('Guidelines') || tag.includes('Photos') ? '#f59e0b' : (tag.includes('Content') ? '#10b981' : '#ef4444')
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity timeline */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-flex">
            <h3 className="card-title-main">Recent Activity</h3>
            <a href="#activity" className="view-all-link">View all →</a>
          </div>

          <div className="timeline-card-styled">
            {activities.map((act, idx) => (
              <div className="timeline-item-styled" key={idx}>
                <div className="timeline-time-col">{act.time}</div>
                <div className="timeline-bullet-col">
                  <div className="timeline-bullet" style={{ 
                    backgroundColor: act.type === 'client' ? 'rgba(16, 185, 129, 0.08)' : (act.type === 'revision' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(59, 130, 246, 0.08)'),
                    color: act.type === 'client' ? '#10b981' : (act.type === 'revision' ? '#ef4444' : '#3b82f6')
                  }}>
                    ✓
                  </div>
                  <div className="timeline-line-styled"></div>
                </div>
                <div className="timeline-content-col">
                  <span className="timeline-text">{act.text}</span>
                  <span className="timeline-author">{act.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Team Workload row */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="card-header-flex">
          <h3 className="card-title-main">Team Workload</h3>
          <a href="#team" className="view-all-link">View full workload →</a>
        </div>

        <div className="team-workload-grid">
          {team.map((member, idx) => (
            <div className="team-member-card" key={idx}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '13px'
              }}>
                {member.name.charAt(0)}
              </div>
              <div className="team-member-info">
                <span className="team-member-name">{member.name}</span>
                <span className="team-member-tasks">{member.tasks}</span>
                <div className="team-member-progress-row">
                  <div className="team-member-progress-bar">
                    <div className="team-member-progress-fill" style={{ width: `${member.percent}%`, backgroundColor: member.color }}></div>
                  </div>
                  <span className="team-member-progress-percent">{member.percent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DashboardView: React.FC = () => {
  const { 
    role, 
    currentStage, 
    advanceStage, 
    revertStage, 
    activities, 
    addActivity,
    resetWorkflow 
  } = usePortal();

  const workflowSteps = [
    { num: 1, title: 'Create Project', actor: 'agency', desc: 'Initialize project details & timelines' },
    { num: 2, title: 'Invite Client', actor: 'agency', desc: 'Send portal invitation and setup client account' },
    { num: 3, title: 'Collect Assets', actor: 'client', desc: 'Client uploads branding assets and content specifications' },
    { num: 4, title: 'Share Deliverables', actor: 'agency', desc: 'Agency uploads draft links (Figma boards, Loom reviews)' },
    { num: 5, title: 'Feedback & Revisions', actor: 'client', desc: 'Client reviews draft, adds comments or requests revisions' },
    { num: 6, title: 'Approve', actor: 'client', desc: 'Client signs off on final assets' },
    { num: 7, title: 'Complete', actor: 'system', desc: 'Project marked complete and assets delivered' }
  ];

  const handleSimulateAction = (actionDesc: string, actor: 'agency' | 'client') => {
    addActivity(actionDesc, actor);
    advanceStage();
  };

  if (role === 'agent') {
    return <AgencyDashboardView />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Project Banner Info */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-glass)' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700 }}>
            Project: <span style={{ color: '#3b82f6' }}>Sorted Corporate Rebrand</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
            Agency: Jenkins Design Studio | Value: $45,000 | Active Step: <strong style={{ color: 'var(--text-primary)' }}>Step {currentStage + 1} ({workflowSteps[currentStage].title})</strong>
          </p>
        </div>
        
        <button 
          className="action-btn"
          onClick={resetWorkflow}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RotateCcw style={{ width: '14px', height: '14px' }} />
          Reset Demo
        </button>
      </div>

      {/* 1. Key Metrics Row */}
      <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {/* Metric 1: Active Deliverables */}
        <div className="card metric-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}>
          <div className="metric-icon-box" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FileText style={{ width: '20px', height: '20px' }} />
          </div>
          <div className="metric-details">
            <h3 style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'none', fontWeight: 600 }}>Active Deliverables</h3>
            <div className="metric-value" style={{ fontSize: '20px', fontWeight: 700 }}>{currentStage >= 3 ? (currentStage >= 5 ? 2 : 1) : 0} Files</div>
          </div>
        </div>

        {/* Metric 2: Pending Approvals */}
        <div className="card metric-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}>
          <div className="metric-icon-box" style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock style={{ width: '20px', height: '20px' }} />
          </div>
          <div className="metric-details">
            <h3 style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'none', fontWeight: 600 }}>Pending Approvals</h3>
            <div className="metric-value" style={{ fontSize: '20px', fontWeight: 700 }}>{currentStage === 3 || currentStage === 5 ? 1 : 0} Items</div>
          </div>
        </div>

        {/* Metric 3: Assets Collected */}
        <div className="card metric-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}>
          <div className="metric-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 style={{ width: '20px', height: '20px' }} />
          </div>
          <div className="metric-details">
            <h3 style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'none', fontWeight: 600 }}>Assets Collected</h3>
            <div className="metric-value" style={{ fontSize: '20px', fontWeight: 700 }}>{currentStage >= 3 ? '4 / 4' : '0 / 4'} Uploaded</div>
          </div>
        </div>

        {/* Metric 4: Stage Progress */}
        <div className="card metric-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}>
          <div className="metric-icon-box" style={{ backgroundColor: 'rgba(168, 85, 247, 0.08)', color: '#a855f7', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles style={{ width: '20px', height: '20px' }} />
          </div>
          <div className="metric-details">
            <h3 style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'none', fontWeight: 600 }}>Current Phase</h3>
            <div className="metric-value" style={{ fontSize: '18px', fontWeight: 700 }}>Step {currentStage + 1} of 7</div>
          </div>
        </div>
      </div>

      {/* 2. Active Deliverables List (Replacer of SwimlaneFlow) */}
      <div className="card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
          Active Project Deliverables & Sign-offs
        </h3>
        
        {currentStage < 3 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', border: '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)', gap: '12px' }}>
            <FileText style={{ width: '36px', height: '36px', color: 'var(--text-muted)' }} />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>No deliverables shared yet</p>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>Once the project is initialized and client uploads branding assets, the agency will submit drafts for review.</p>
            </div>
            <span style={{ fontSize: '11px', backgroundColor: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
              Simulate actions in Step 1 to Step 3 below to proceed
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Deliverable Item 1 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '250px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px', flexShrink: 0 }}>PDF</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Brand_Identity_Guidelines_V1.pdf</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Size: 4.8 MB | Shared by Jenkins Studio</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', fontWeight: 600 }}>
                  ✓ Approved
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Signed off by Rutwik More</span>
              </div>
            </div>

            {/* Deliverable Item 2 (Dynamic based on currentStage) */}
            {currentStage >= 3 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '250px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px', flexShrink: 0 }}>FIG</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {currentStage >= 5 ? 'Website_Homepage_Concept_V3_Final.figma' : 'Website_Homepage_Concept_V2.figma'}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {currentStage >= 5 ? 'Size: 12.4 MB | Revised by Sarah Jenkins' : 'Size: 11.2 MB | Shared by Sarah Jenkins'}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {currentStage === 3 && (
                    <>
                      <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)', fontWeight: 600 }}>
                        ● Pending Approval
                      </span>
                      {role === 'client' ? (
                        <button 
                          className="action-btn"
                          style={{ padding: '6px 12px', fontSize: '11px', backgroundColor: '#000000', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => handleSimulateAction('Client approved Website Concept V2 and requested production handoff.', 'client')}
                        >
                          Sign & Approve
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Awaiting client sign-off</span>
                      )}
                    </>
                  )}

                  {currentStage === 4 && (
                    <>
                      <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)', fontWeight: 600 }}>
                        ● Changes Requested
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Feedback: "Warmer pastel color palettes requested"</span>
                    </>
                  )}

                  {currentStage === 5 && (
                    <>
                      <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)', fontWeight: 600 }}>
                        ● Re-submitted
                      </span>
                      {role === 'client' ? (
                        <button 
                          className="action-btn"
                          style={{ padding: '6px 12px', fontSize: '11px', backgroundColor: '#000000', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => handleSimulateAction('Client approved Website Concept V3 Final deliverables.', 'client')}
                        >
                          Sign & Approve Final
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Awaiting client sign-off</span>
                      )}
                    </>
                  )}

                  {currentStage >= 6 && (
                    <>
                      <span style={{ fontSize: '12px', padding: '3px 8px', borderRadius: '12px', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', fontWeight: 600 }}>
                        ✓ Approved
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fully signed off & archive ready</span>
                    </>
                  )}
                </div>
              </div>
            )}
            
          </div>
        )}
      </div>

      {/* 3. Bottom Grid: Simulation Controller and Activity logs */}
      <div className="dashboard-grid">
        
        {/* Left Side: Contextual Simulation Action Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles style={{ width: '18px', height: '18px', color: '#a855f7' }} />
            Demo Simulation Controller (Client Mode)
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Use these contextual buttons to simulate actions on the platform and watch the workflow update.
          </p>

          <div style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Contextual Actions based on Role and Stage */}
            {/* CLIENT ROLE CONTROLS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentStage === 0 && (
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  <p style={{ fontWeight: 600, color: '#fbbf24', marginBottom: '4px' }}>Step 1: Awaiting Agency Setup</p>
                  <p>Toggle to **Agent Mode** at the top right to configure project files and kick things off.</p>
                </div>
              )}

              {currentStage === 1 && (
                <div>
                  <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>Step 2: Sign up and enter workspace</h4>
                  <button 
                    className="action-btn primary"
                    onClick={() => handleSimulateAction('Client accepted secure invitation link and set password credentials.', 'client')}
                  >
                    Accept Portal Invite & Login <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              )}

              {currentStage === 2 && (
                <div>
                  <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>Step 3: Upload branding guidelines and assets</h4>
                  <button 
                    className="action-btn primary"
                    onClick={() => handleSimulateAction('Client uploaded vector logos, mood boards, and copy briefs.', 'client')}
                  >
                    Upload Requested Brand Assets <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              )}

              {currentStage === 3 && (
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  <p style={{ fontWeight: 600, color: '#fbbf24', marginBottom: '4px' }}>Step 4: Awaiting Agency Deliverables</p>
                  <p>Toggle to **Agent Mode** at the top right to upload the draft design deliverables.</p>
                </div>
              )}

              {currentStage === 4 && (
                <div>
                  <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>Step 5: Review deliverables and submit feedback</h4>
                  <button 
                    className="action-btn primary"
                    onClick={() => handleSimulateAction('Client reviewed draft vectors and requested warmer pastel palettes.', 'client')}
                  >
                    Submit Revision Feedback <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              )}

              {currentStage === 5 && (
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  <p style={{ fontWeight: 600, color: '#fbbf24', marginBottom: '4px' }}>Step 6: Awaiting Agency Revisions</p>
                  <p>Toggle to **Agent Mode** to address client feedback and deliver the revised files.</p>
                </div>
              )}

              {currentStage === 6 && (
                <div>
                  <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>Step 7: Approve final deliverables</h4>
                  <button 
                    className="action-btn primary"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                    onClick={() => handleSimulateAction('Client approved final brand boards and closed transaction escrow.', 'client')}
                  >
                    Approve final files & Complete <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Explicit override step advance/revert buttons */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              className="action-btn"
              disabled={currentStage === 0}
              onClick={revertStage}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft style={{ width: '14px', height: '14px' }} /> Revert Step
            </button>
            
            <button 
              className="action-btn"
              disabled={currentStage === 6}
              onClick={advanceStage}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Advance Step <ArrowRight style={{ width: '14px', height: '14px' }} />
            </button>
          </div>
        </div>

        {/* Right Side: Activity log timeline */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock style={{ width: '18px', height: '18px', color: '#f59e0b' }} />
            Recent Activity Log
          </h3>
          <div className="activity-list" style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {activities.map((act) => {
              let iconColor = 'rgba(59, 130, 246, 0.08)';
              let textColor = '#3b82f6';
              
              if (act.type === 'client') {
                iconColor = 'rgba(16, 185, 129, 0.08)';
                textColor = '#10b981';
              } else if (act.type === 'system') {
                iconColor = 'rgba(14, 165, 233, 0.08)';
                textColor = '#0ea5e9';
              }

              return (
                <div className="activity-item" key={act.id}>
                  <div className="activity-icon-container" style={{ backgroundColor: iconColor, color: textColor, fontSize: '12px', fontWeight: 'bold' }}>
                    {act.type === 'agency' && <TrendingUp style={{ width: '16px', height: '16px' }} />}
                    {act.type === 'client' && <FileText style={{ width: '16px', height: '16px' }} />}
                    {act.type === 'system' && <CheckCircle2 style={{ width: '16px', height: '16px' }} />}
                  </div>
                  <div className="activity-content">
                    <p className="activity-desc" style={{ fontSize: '13px' }}>{act.desc}</p>
                    <p className="activity-time">{act.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Briefcase, 
  Calendar, 
  CheckSquare, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Users, 
  MessageCircle, 
  ArrowRight,
  Clock
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { role, clients, tasks, documents, activities, setActiveTab } = usePortal();

  // Selected client for simulation (Rutwik More)
  const clientData = clients[0]; 

  // Calculations for Client View
  const pendingTasksCount = tasks.filter(t => t.assignedTo === 'client' && t.status !== 'completed').length;
  const unsignedDocsCount = documents.filter(d => d.status === 'Pending Signature').length;

  // Calculations for Agent View
  const totalValue = '$1,085,000';
  const totalClients = clients.length;
  const agentTasksCount = tasks.filter(t => t.assignedTo === 'agent' && t.status !== 'completed').length;

  const pipelineStages = [
    { label: 'Onboarding', desc: 'Welcome & intake form' },
    { label: 'Due Diligence', desc: 'Financial review' },
    { label: 'Inspection', desc: 'Space inspection' },
    { label: 'Negotiation', desc: 'Final terms check' },
    { label: 'Closing', desc: 'Signatures & keys' }
  ];

  return (
    <div className="dashboard-view">
      {/* 1. Metrics Grid based on Role */}
      {role === 'client' ? (
        <div className="metrics-grid">
          <div className="card metric-card">
            <div className="metric-icon-box" style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)', color: '#a78bfa' }}>
              <Briefcase />
            </div>
            <div className="metric-details">
              <h3>Active Deal</h3>
              <p className="metric-value">{clientData.dealType}</p>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <CheckSquare />
            </div>
            <div className="metric-details">
              <h3>My Pending Tasks</h3>
              <p className="metric-value">{pendingTasksCount}</p>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon-box" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <FileText />
            </div>
            <div className="metric-details">
              <h3>Unsigned Documents</h3>
              <p className="metric-value">{unsignedDocsCount}</p>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon-box" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <Calendar />
            </div>
            <div className="metric-details">
              <h3>Next Meeting</h3>
              <p className="metric-value" style={{ fontSize: '15px', fontWeight: 600 }}>Friday at 2:00 PM</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="metrics-grid">
          <div className="card metric-card">
            <div className="metric-icon-box" style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)', color: '#a78bfa' }}>
              <Users />
            </div>
            <div className="metric-details">
              <h3>Total Active Clients</h3>
              <p className="metric-value">{totalClients}</p>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <DollarSign />
            </div>
            <div className="metric-details">
              <h3>Pipeline Value</h3>
              <p className="metric-value">{totalValue}</p>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon-box" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <CheckSquare />
            </div>
            <div className="metric-details">
              <h3>Agent Tasks Pending</h3>
              <p className="metric-value">{agentTasksCount}</p>
            </div>
          </div>

          <div className="card metric-card">
            <div className="metric-icon-box" style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <MessageCircle />
            </div>
            <div className="metric-details">
              <h3>Active Chat Thread</h3>
              <p className="metric-value" style={{ fontSize: '15px', fontWeight: 600 }}>Rutwik More</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Transaction Stepper Card */}
      <div className="card progress-stepper-card">
        <div className="progress-header">
          <div>
            <h2>Deal Milestone Progress: <span style={{ color: '#a78bfa' }}>{clientData.name}</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
              Type: {clientData.dealType} | Value: {clientData.dealValue}
            </p>
          </div>
          {role === 'agent' && (
            <button className="action-btn primary" onClick={() => setActiveTab('pipeline')}>
              Manage Pipeline Stage
            </button>
          )}
        </div>

        <div className="stepper-container">
          <div className="stepper-line">
            <div 
              className="stepper-line-fill" 
              style={{ width: `${(clientData.currentStage / (pipelineStages.length - 1)) * 100}%` }}
            />
          </div>
          
          {pipelineStages.map((stage, idx) => {
            const isCompleted = idx < clientData.currentStage;
            const isActive = idx === clientData.currentStage;
            
            return (
              <div 
                key={idx} 
                className={`step-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
              >
                <div className="step-dot">
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <div className="step-label">
                  <div>{stage.label}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 400, marginTop: '2px' }}>
                    {stage.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Dashboard Content Grid */}
      <div className="dashboard-grid">
        {/* Left Side: Recent Activity */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock style={{ width: '18px', height: '18px', color: '#a78bfa' }} />
            Recent Activity Log
          </h2>
          <div className="activity-list">
            {activities.slice(0, 5).map((act) => {
              let iconColor = 'rgba(124, 58, 237, 0.15)';
              let textColor = '#a78bfa';
              
              if (act.type === 'document') {
                iconColor = 'rgba(245, 158, 11, 0.15)';
                textColor = '#fbbf24';
              } else if (act.type === 'task') {
                iconColor = 'rgba(16, 185, 129, 0.15)';
                textColor = '#34d399';
              } else if (act.type === 'pipeline') {
                iconColor = 'rgba(6, 182, 212, 0.15)';
                textColor = '#22d3ee';
              }

              return (
                <div className="activity-item" key={act.id}>
                  <div className="activity-icon-container" style={{ backgroundColor: iconColor, color: textColor }}>
                    {act.type === 'message' && <MessageCircle style={{ width: '16px', height: '16px' }} />}
                    {act.type === 'document' && <FileText style={{ width: '16px', height: '16px' }} />}
                    {act.type === 'task' && <CheckSquare style={{ width: '16px', height: '16px' }} />}
                    {act.type === 'pipeline' && <TrendingUp style={{ width: '16px', height: '16px' }} />}
                  </div>
                  <div className="activity-content">
                    <p className="activity-desc">{act.desc}</p>
                    <p className="activity-time">{act.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Quick Action Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: '4px' }}>
            Quick Actions
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
            Jump to action items immediately.
          </p>

          {role === 'client' ? (
            <>
              <button 
                className="action-btn" 
                style={{ width: '100%', justifyContent: 'space-between', padding: '12px' }}
                onClick={() => setActiveTab('messages')}
              >
                <span>Chat with Sarah Jenkins</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>

              <button 
                className="action-btn primary" 
                style={{ width: '100%', justifyContent: 'space-between', padding: '12px' }}
                onClick={() => setActiveTab('documents')}
              >
                <span>Sign Commercial Lease</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>

              <button 
                className="action-btn" 
                style={{ width: '100%', justifyContent: 'space-between', padding: '12px' }}
                onClick={() => setActiveTab('tasks')}
              >
                <span>View Checklist & Upload Statements</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </>
          ) : (
            <>
              <button 
                className="action-btn" 
                style={{ width: '100%', justifyContent: 'space-between', padding: '12px' }}
                onClick={() => setActiveTab('messages')}
              >
                <span>Send Chat Reminder to Rutwik</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>

              <button 
                className="action-btn primary" 
                style={{ width: '100%', justifyContent: 'space-between', padding: '12px' }}
                onClick={() => setActiveTab('documents')}
              >
                <span>Request Document uploads</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>

              <button 
                className="action-btn" 
                style={{ width: '100%', justifyContent: 'space-between', padding: '12px' }}
                onClick={() => setActiveTab('tasks')}
              >
                <span>Review Kanban Tasks</span>
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

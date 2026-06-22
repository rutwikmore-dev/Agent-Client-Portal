import React from 'react';
import { usePortal } from '../context/PortalContext';
import { SwimlaneFlow } from '../components/SwimlaneFlow';
import { 
  CheckCircle2, 
  Clock, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Project Banner Info */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-glass)' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700 }}>
            Project: <span style={{ color: '#a78bfa' }}>Sortd Corporate Rebrand</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
            Agency: Jenkins Design Studio | Value: $45,000 | Active Step: <strong style={{ color: '#fff' }}>Step {currentStage + 1} ({workflowSteps[currentStage].title})</strong>
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

      {/* 2. Interactive Swimlane Flow Graph */}
      <SwimlaneFlow />

      {/* 3. Bottom Grid: Simulation Controller and Activity logs */}
      <div className="dashboard-grid">
        
        {/* Left Side: Contextual Simulation Action Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles style={{ width: '18px', height: '18px', color: '#a78bfa' }} />
            Demo Simulation Controller ({role === 'agent' ? 'Agency Mode' : 'Client Mode'})
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Use these contextual buttons to simulate actions on the platform and watch the workflow update.
          </p>

          <div style={{ padding: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            {/* Contextual Actions based on Role and Stage */}
            {role === 'agent' ? (
              // AGENCY ROLE CONTROLS
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentStage === 0 && (
                  <div>
                    <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>Step 1: Set details and setup project</h4>
                    <button 
                      className="action-btn primary"
                      onClick={() => handleSimulateAction('Agency defined Sortd project board details and timelines.', 'agency')}
                    >
                      Initialize Project & Details <ArrowRight style={{ width: '14px', height: '14px' }} />
                    </button>
                  </div>
                )}
                
                {currentStage === 1 && (
                  <div>
                    <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>Step 2: Invite client to dashboard</h4>
                    <button 
                      className="action-btn primary"
                      onClick={() => handleSimulateAction('Client invitation links dispatched to client email registry.', 'agency')}
                    >
                      Invite Client to Portal <ArrowRight style={{ width: '14px', height: '14px' }} />
                    </button>
                  </div>
                )}

                {currentStage === 2 && (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    <p style={{ fontWeight: 600, color: '#fbbf24', marginBottom: '4px' }}>Step 3: Awaiting Client Action</p>
                    <p>Invite the client to upload files. Toggle to **Client Mode** at the top right to simulate uploading the branding assets.</p>
                  </div>
                )}

                {currentStage === 3 && (
                  <div>
                    <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>Step 4: Share initial design deliverables</h4>
                    <button 
                      className="action-btn primary"
                      onClick={() => handleSimulateAction('Agency shared Figma brand drafts and Loom review video link.', 'agency')}
                    >
                      Upload & Share Deliverables <ArrowRight style={{ width: '14px', height: '14px' }} />
                    </button>
                  </div>
                )}

                {currentStage === 4 && (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                    <p style={{ fontWeight: 600, color: '#fbbf24', marginBottom: '4px' }}>Step 5: Awaiting Client Reviews</p>
                    <p>Toggle to **Client Mode** at the top right to simulate leaving feedback and requesting design changes.</p>
                  </div>
                )}

                {currentStage === 5 && (
                  <div>
                    <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>Step 6: Address feedback and request sign-off</h4>
                    <button 
                      className="action-btn primary"
                      onClick={() => handleSimulateAction('Agency completed revision changes and submitted final boards for sign-off.', 'agency')}
                    >
                      Deliver Final Board for Approval <ArrowRight style={{ width: '14px', height: '14px' }} />
                    </button>
                  </div>
                )}

                {currentStage === 6 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ fontSize: '14px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px' }} /> Step 7: Project Completed
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Deliverables have been fully approved. The project lifecycle is complete.</p>
                  </div>
                )}
              </div>
            ) : (
              // CLIENT ROLE CONTROLS
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
            )}
          </div>

          {/* Explicit override step advance/revert buttons */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <button 
              className="action-btn"
              disabled={currentStage === 0}
              onClick={revertStage}
            >
              ◄ Revert Step
            </button>
            
            <button 
              className="action-btn"
              disabled={currentStage === 6}
              onClick={advanceStage}
            >
              Advance Step ►
            </button>
          </div>
        </div>

        {/* Right Side: Activity log timeline */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock style={{ width: '18px', height: '18px', color: '#a78bfa' }} />
            Recent Activity Log
          </h3>
          <div className="activity-list" style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {activities.map((act) => {
              let iconColor = 'rgba(124, 58, 237, 0.15)';
              let textColor = '#a78bfa';
              
              if (act.type === 'client') {
                iconColor = 'rgba(16, 185, 129, 0.15)';
                textColor = '#34d399';
              } else if (act.type === 'system') {
                iconColor = 'rgba(6, 182, 212, 0.15)';
                textColor = '#22d3ee';
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

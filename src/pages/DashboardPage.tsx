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
            Project: <span style={{ color: '#3b82f6' }}>Sortd Corporate Rebrand</span>
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

import React from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';

export const PipelineView: React.FC = () => {
  const { role, clients, updateClientStage } = usePortal();

  // Selected client for client-view mode (Rutwik More)
  const mainClient = clients[0];

  const stages = [
    {
      title: 'Stage 1: Onboarding',
      desc: 'Initial consultation and portal setup.',
      requirements: [
        { name: 'Complete profile registry', done: true },
        { name: 'Submit corporate Operations Plan', done: true },
      ]
    },
    {
      title: 'Stage 2: Due Diligence',
      desc: 'Verify financial statements & credit audit.',
      requirements: [
        { name: 'Upload 3 months bank statements', done: false },
        { name: 'Execute advisory commission terms', done: true },
      ]
    },
    {
      title: 'Stage 3: Under Inspection',
      desc: 'Space accessibility check and structural layout checkout.',
      requirements: [
        { name: 'Coordinate structural check walk-through', done: false },
        { name: 'Acquire board building regulations', done: true },
      ]
    },
    {
      title: 'Stage 4: Negotiation',
      desc: 'Commercial lease details draft & signatures.',
      requirements: [
        { name: 'E-Sign Suite 400B Lease Agreement', done: false },
        { name: 'Transfer deposit guarantee escrow', done: false },
      ]
    },
    {
      title: 'Stage 5: Closing',
      desc: 'Contract activation and key retrieval.',
      requirements: [
        { name: 'Perform escrow reconciliation checks', done: false },
        { name: 'Handover security codes and office keys', done: false },
      ]
    }
  ];

  return (
    <div className="pipeline-view">
      {role === 'client' ? (
        // Client View: Detailed Stage Checklist
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ marginBottom: '10px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '8px' }}>
              My Transaction Milestone Requirements
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Below is a checklist of items required to complete each stage of your lease transaction. Keep in touch with Sarah Jenkins to progress through stages.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stages.map((stage, idx) => {
              const isActive = idx === mainClient.currentStage;
              const isCompleted = idx < mainClient.currentStage;
              
              let borderStyle = '1px solid var(--border-color)';
              let bgStyle = 'var(--bg-glass)';
              
              if (isActive) {
                borderStyle = '1px solid var(--accent-primary)';
                bgStyle = 'rgba(124, 58, 237, 0.05)';
              } else if (isCompleted) {
                borderStyle = '1px solid rgba(16, 185, 129, 0.3)';
              }

              return (
                <div key={idx} className="card" style={{ border: borderStyle, backgroundColor: bgStyle, padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ 
                        fontFamily: 'var(--font-heading)', 
                        fontSize: '16px', 
                        fontWeight: 600,
                        color: isCompleted ? '#34d399' : isActive ? '#fff' : 'var(--text-secondary)'
                      }}>
                        {stage.title}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{stage.desc}</p>
                    </div>
                    <div>
                      {isCompleted && (
                        <span className="badge signed" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle style={{ width: '12px', height: '12px' }} /> Stage Complete
                        </span>
                      )}
                      {isActive && (
                        <span className="badge pending" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock style={{ width: '12px', height: '12px' }} /> Active Stage
                        </span>
                      )}
                      {!isActive && !isCompleted && (
                        <span className="badge missing" style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)' }}>
                          Locked
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px' }}>
                    {stage.requirements.map((req, rIdx) => {
                      // Dynamically mark bank statements/lease done based on our app context states
                      let isDone = req.done;
                      return (
                        <div key={rIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                          {isDone ? (
                            <CheckCircle style={{ width: '14px', height: '14px', color: 'var(--color-success)' }} />
                          ) : (
                            <AlertCircle style={{ width: '14px', height: '14px', color: 'var(--text-muted)' }} />
                          )}
                          <span style={{ color: isDone ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                            {req.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // Agent View: Roster & Stage Editors
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', marginBottom: '8px' }}>
              Client Pipeline Roster
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Update client deal milestones, inspect their values, and manage transaction progression.
            </p>
          </div>

          <div className="client-list-grid">
            {clients.map((client) => {
              const stageInfo = stages[client.currentStage];
              return (
                <div key={client.id} className="card client-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="client-card-header">
                    <div className="client-card-title">
                      <h3>{client.name}</h3>
                      <p>{client.email}</p>
                    </div>
                    <span 
                      className="client-card-status"
                      style={{ 
                        backgroundColor: client.currentStage === 4 ? 'var(--color-success-bg)' : 'var(--accent-glow)',
                        color: client.currentStage === 4 ? 'var(--color-success)' : '#c084fc'
                      }}
                    >
                      {stages[client.currentStage].title.replace('Stage ', '').split(':')[0]}
                    </span>
                  </div>

                  <div className="client-card-body">
                    <div className="client-info-row">
                      <span className="client-info-label">Deal Type:</span>
                      <span className="client-info-value">{client.dealType}</span>
                    </div>
                    <div className="client-info-row">
                      <span className="client-info-label">Deal Value:</span>
                      <span className="client-info-value" style={{ color: '#fff', fontWeight: 600 }}>{client.dealValue}</span>
                    </div>
                    <div className="client-info-row">
                      <span className="client-info-label">Active Milestone:</span>
                      <span className="client-info-value" style={{ color: '#34d399' }}>
                        {stageInfo.title.split(': ')[1]}
                      </span>
                    </div>
                    <div className="client-info-row">
                      <span className="client-info-label">Last Active:</span>
                      <span className="client-info-value">{client.lastActive}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      MANAGE MILESTONE STAGE:
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="action-btn"
                        style={{ flex: 1, padding: '8px', fontSize: '12px' }}
                        disabled={client.currentStage === 0}
                        onClick={() => updateClientStage(client.id, client.currentStage - 1)}
                      >
                        ◄ Revert Stage
                      </button>
                      <button 
                        className="action-btn primary"
                        style={{ flex: 1, padding: '8px', fontSize: '12px' }}
                        disabled={client.currentStage === 4}
                        onClick={() => updateClientStage(client.id, client.currentStage + 1)}
                      >
                        Advance Stage ►
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

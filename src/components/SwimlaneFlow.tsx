import React from 'react';
import { usePortal } from '../context/PortalContext';
import { Home, User, ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';

export const SwimlaneFlow: React.FC = () => {
  const { currentStage } = usePortal();

  // Columns / Steps
  const steps = [
    { num: 1, label: 'Create Project' },
    { num: 2, label: 'Invite Client' },
    { num: 3, label: 'Collect Assets' },
    { num: 4, label: 'Share Deliverables' },
    { num: 5, label: 'Feedback & Revisions' },
    { num: 6, label: 'Approve' },
    { num: 7, label: 'Complete' }
  ];

  // Nodes for Agency Row
  const agencyNodes = [
    { title: 'Create project & set details', colIndex: 0 },
    { title: 'Invite client to project', colIndex: 1 },
    { title: 'Request assets & information', colIndex: 2 },
    { title: 'Upload deliverables & notes', colIndex: 3 },
    { title: 'Address feedback & revisions', colIndex: 4 },
    { title: 'Deliver final version for approval', colIndex: 5 },
    { title: 'Mark project complete', colIndex: 6 }
  ];

  // Nodes for Client Row
  const clientNodes = [
    { title: '', colIndex: 0 }, // Empty space
    { title: 'Accept invitation & login', colIndex: 1 },
    { title: 'Upload requested assets', colIndex: 2 },
    { title: 'Review deliverables & requirements', colIndex: 3 },
    { title: 'Provide feedback or requests', colIndex: 4 },
    { title: 'Approve deliverables when satisfied', colIndex: 5 },
    { title: 'Project completed & delivered', colIndex: 6 }
  ];

  const getNodeClass = (colIndex: number) => {
    if (colIndex < currentStage) return 'node-completed';
    if (colIndex === currentStage) return 'node-active';
    return 'node-pending';
  };

  const getArrowColor = (colIndex: number) => {
    if (colIndex < currentStage) return '#10b981'; // Green for complete
    if (colIndex === currentStage) return '#3b82f6'; // Blue for active
    return 'var(--border-color)'; // Muted gray
  };

  return (
    <div className="card swimlane-container" style={{ padding: '30px 20px', overflowX: 'auto', backgroundColor: 'var(--bg-glass)' }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 600, marginBottom: '24px', textAlign: 'center' }}>
        Interactive Swimlane Workflow
      </h3>

      {/* Grid container with swimlanes layout */}
      <div style={{ minWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
        
        {/* Step Numbers Top Header Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(7, 1fr)', gap: '16px', textAlign: 'center' }}>
          <div></div> {/* Empty spacer for row titles */}
          {steps.map((s, idx) => {
            const isCompleted = idx < currentStage;
            const isActive = idx === currentStage;
            return (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: isCompleted ? 'var(--color-success-bg)' : isActive ? 'var(--accent-gradient)' : 'var(--bg-secondary)',
                  border: `1px solid ${isCompleted ? 'var(--color-success)' : isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  color: isCompleted ? 'var(--color-success)' : isActive ? '#fff' : 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: isActive ? '#fff' : 'var(--text-muted)' }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lane 1: Agency Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(7, 1fr)', gap: '16px', alignItems: 'center' }}>
          {/* Row label */}
          <div style={{ 
            backgroundColor: '#f3f4f6',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '13px'
          }}>
            <Home style={{ width: '16px', height: '16px', color: '#3b82f6' }} />
            <span>AGENCY</span>
          </div>

          {/* Nodes list */}
          {agencyNodes.map((node) => {
            const status = getNodeClass(node.colIndex);
            
            return (
              <div 
                key={node.colIndex}
                className={`swim-node ${status}`}
                style={{ 
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: 500,
                  minHeight: '68px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  border: '1px solid transparent',
                  position: 'relative'
                }}
              >
                {node.title}

                {/* Horizontal arrows to connect nodes */}
                {node.colIndex < 6 && (
                  <div style={{ 
                    position: 'absolute', 
                    right: '-14px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    zIndex: 10,
                    color: getArrowColor(node.colIndex + 1)
                  }}>
                    <ArrowRight style={{ width: '12px', height: '12px' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connecting flow arrows (between agency and client lanes) */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(7, 1fr)', gap: '16px', height: '24px', position: 'relative' }}>
          <div></div> {/* Spacer */}
          {/* Column connectors */}
          {steps.map((_, idx) => {
            if (idx === 0) return <div key={idx}></div>; // No node in client lane for step 1

            // Dynamic directions matching flow:
            // Step 2: Agency -> Client (down)
            // Step 3: Client -> Agency (up)
            // Step 4: Agency -> Client (down)
            // Step 5: Client -> Agency (up)
            // Step 6: Agency -> Client (down)
            // Step 7: Client -> Agency (up)
            const isDown = idx % 2 === 1;
            const arrowColor = getArrowColor(idx);

            return (
              <div key={idx} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: arrowColor }}>
                {isDown ? (
                  <ArrowDown style={{ width: '16px', height: '16px' }} />
                ) : (
                  <ArrowUp style={{ width: '16px', height: '16px' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Lane 2: Client Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(7, 1fr)', gap: '16px', alignItems: 'center' }}>
          {/* Row label */}
          <div style={{ 
            backgroundColor: '#f3f4f6',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '13px'
          }}>
            <User style={{ width: '16px', height: '16px', color: '#10b981' }} />
            <span>CLIENT</span>
          </div>

          {/* Nodes list */}
          {clientNodes.map((node) => {
            if (!node.title) {
              return (
                <div key={node.colIndex} style={{ 
                  minHeight: '68px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  border: '1px dashed var(--border-color)',
                  borderRadius: '8px',
                  opacity: 0.5
                }}>
                  Project Setup
                </div>
              );
            }

            const status = getNodeClass(node.colIndex);
            
            return (
              <div 
                key={node.colIndex}
                className={`swim-node ${status}`}
                style={{ 
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: 500,
                  minHeight: '68px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  border: '1px solid transparent',
                  position: 'relative'
                }}
              >
                {node.title}

                {/* Horizontal arrows to connect nodes */}
                {node.colIndex < 6 && (
                  <div style={{ 
                    position: 'absolute', 
                    right: '-14px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    zIndex: 10,
                    color: getArrowColor(node.colIndex + 1)
                  }}>
                    <ArrowRight style={{ width: '12px', height: '12px' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Styled node variables inside index.css will complement this, adding visual fallback rules here for safety */}
      <style>{`
        .swim-node.node-completed {
          background-color: var(--color-success-bg) !important;
          border-color: var(--color-success) !important;
          color: var(--color-success) !important;
        }
        .swim-node.node-active {
          background: var(--accent-gradient) !important;
          border-color: var(--accent-primary) !important;
          color: #fff !important;
          box-shadow: 0 0 15px var(--accent-glow) !important;
          transform: scale(1.02);
        }
        .swim-node.node-pending {
          background-color: var(--bg-secondary) !important;
          border-color: var(--border-color) !important;
          color: var(--text-secondary) !important;
        }
      `}</style>
    </div>
  );
};

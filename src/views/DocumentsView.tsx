import React, { useState, useRef } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  FileText, 
  UploadCloud, 
  X, 
  Download, 
  PenTool, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const { role, documents, uploadDocument, signDocument } = usePortal();
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [isUploadSimulating, setIsUploadSimulating] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadFileName, setUploadFileName] = useState('');
  
  // E-sign modal states
  const [activeSignDoc, setActiveSignDoc] = useState<string | null>(null);
  const [signatureName, setSignatureName] = useState('');
  const [isInkSigned, setIsInkSigned] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter documents
  const filteredDocs = filterCategory === 'All' 
    ? documents 
    : documents.filter(doc => doc.category === filterCategory);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      simulateUpload(file.name, file.size);
    }
  };

  const simulateUpload = (fileName: string, sizeBytes: number) => {
    const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(1) + ' MB';
    setUploadFileName(fileName);
    setIsUploadSimulating(true);
    setUploadPercent(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadPercent(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploadSimulating(false);
          // Extract category based on name
          let cat: 'Identity' | 'Contract' | 'Financial' = 'Identity';
          if (fileName.toLowerCase().includes('statement') || fileName.toLowerCase().includes('tax') || fileName.toLowerCase().includes('bank')) {
            cat = 'Financial';
          } else if (fileName.toLowerCase().includes('contract') || fileName.toLowerCase().includes('lease') || fileName.toLowerCase().includes('agreement')) {
            cat = 'Contract';
          }
          uploadDocument(fileName, cat, sizeMB === '0.0 MB' ? '1.5 MB' : sizeMB);
        }, 300);
      }
    }, 150);
  };

  const triggerUploadSimulator = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openSignModal = (docId: string) => {
    setActiveSignDoc(docId);
    setSignatureName('');
    setIsInkSigned(false);
  };

  const closeSignModal = () => {
    setActiveSignDoc(null);
  };

  const handleSignSubmit = () => {
    if (!signatureName.trim()) return;
    if (activeSignDoc) {
      signDocument(activeSignDoc, signatureName.trim());
      closeSignModal();
    }
  };

  const selectedDocForSign = documents.find(d => d.id === activeSignDoc);

  return (
    <div className="documents-view">
      <div className="documents-grid">
        {/* Left Side: Document Inventory */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 600 }}>
              Secure Document Vault
            </h2>
            
            {/* Filter Tags */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Identity', 'Contract', 'Financial'].map((cat) => (
                <button
                  key={cat}
                  className={`action-btn ${filterCategory === cat ? 'primary' : ''}`}
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="vault-table-container">
            <table className="vault-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Size</th>
                  <th>Upload Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => {
                  let docIconBg = 'rgba(124, 58, 237, 0.15)';
                  let docIconColor = '#a78bfa';
                  
                  if (doc.category === 'Identity') {
                    docIconBg = 'rgba(6, 182, 212, 0.15)';
                    docIconColor = '#22d3ee';
                  } else if (doc.category === 'Financial') {
                    docIconBg = 'rgba(16, 185, 129, 0.15)';
                    docIconColor = '#34d399';
                  }

                  return (
                    <tr key={doc.id}>
                      <td>
                        <div className="doc-name-cell">
                          <div className="doc-icon" style={{ backgroundColor: docIconBg, color: docIconColor }}>
                            <FileText style={{ width: '18px', height: '18px' }} />
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 500 }}>{doc.name}</div>
                            {doc.signedBy && (
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                Signed by: {doc.signedBy}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{doc.category}</td>
                      <td>
                        {doc.status === 'Signed' && (
                          <span className="badge signed">
                            <CheckCircle2 style={{ width: '12px', height: '12px' }} /> Signed
                          </span>
                        )}
                        {doc.status === 'Pending Signature' && (
                          <span className="badge pending">
                            <PenTool style={{ width: '12px', height: '12px' }} /> Needs Signature
                          </span>
                        )}
                        {doc.status === 'Missing' && (
                          <span className="badge missing">
                            <AlertTriangle style={{ width: '12px', height: '12px' }} /> File Requested
                          </span>
                        )}
                      </td>
                      <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{doc.size}</td>
                      <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{doc.uploadedAt}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          {doc.status === 'Pending Signature' && (
                            <button 
                              className="action-btn primary"
                              style={{ padding: '4px 8px', fontSize: '12px' }}
                              onClick={() => openSignModal(doc.id)}
                            >
                              <PenTool style={{ width: '12px', height: '12px' }} /> Sign
                            </button>
                          )}
                          {doc.status === 'Signed' && (
                            <button 
                              className="action-btn"
                              style={{ padding: '4px 8px', fontSize: '12px' }}
                              onClick={() => alert(`Simulating download of "${doc.name}"...`)}
                            >
                              <Download style={{ width: '12px', height: '12px' }} /> Download
                            </button>
                          )}
                          {doc.status === 'Missing' && role === 'client' && (
                            <button 
                              className="action-btn primary"
                              style={{ padding: '4px 8px', fontSize: '12px' }}
                              onClick={triggerUploadSimulator}
                            >
                              Upload
                            </button>
                          )}
                          {doc.status === 'Missing' && role === 'agent' && (
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', alignSelf: 'center' }}>
                              Awaiting client
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Upload Zone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>
              Upload Center
            </h3>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <div className="upload-zone" onClick={triggerUploadSimulator}>
              <div className="upload-icon">
                <UploadCloud style={{ width: '24px', height: '24px' }} />
              </div>
              <div>
                <h3>Click to Upload</h3>
                <p>PDF, PNG, JPG up to 10MB</p>
              </div>
            </div>

            {isUploadSimulating && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '180px' }}>
                    {uploadFileName}
                  </span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{uploadPercent}%</span>
                </div>
                <div className="upload-progress-bar">
                  <div className="upload-progress-fill" style={{ width: `${uploadPercent}%` }}></div>
                </div>
              </div>
            )}
          </div>

          <div className="card" style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.01)' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <HelpCircle style={{ width: '14px', height: '14px', color: '#a78bfa' }} /> Document Guidelines
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Uploading a file containing the word "bank" or "statement" will automatically verify the proof of funds document checklist and task list items.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Digitial E-Sign Modal */}
      {activeSignDoc && selectedDocForSign && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Sign Document</h2>
              <button className="modal-close-btn" onClick={closeSignModal}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              You are electronically signing: <strong style={{ color: '#fff' }}>{selectedDocForSign.name}</strong>.
              This digital signature constitutes a binding acknowledgement.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                TYPE YOUR NAME FOR SIGNATURE:
              </label>
              <input 
                type="text" 
                className="chat-input"
                placeholder="Type full legal name (e.g. Rutwik More)"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                style={{ width: '100%' }}
              />

              {signatureName && (
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>
                    PREVIEW SIGNATURE:
                  </label>
                  <div 
                    className="signature-pad" 
                    onClick={() => setIsInkSigned(true)}
                  >
                    <div className="signature-line"></div>
                    <span 
                      style={{ 
                        fontFamily: "'Outfit', cursive", 
                        fontSize: '32px', 
                        color: 'var(--accent-primary)',
                        fontStyle: 'italic',
                        zIndex: 2,
                        textShadow: '0 0 10px rgba(124,58,237,0.2)'
                      }}
                    >
                      {signatureName}
                    </span>
                    {!isInkSigned && (
                      <span className="signature-placeholder" style={{ position: 'absolute', bottom: '10px', fontSize: '10px' }}>
                        Click pad to generate digital ink seal
                      </span>
                    )}
                    {isInkSigned && (
                      <span className="badge signed" style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '10px' }}>
                        ✓ Ink Seal Generated
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="action-btn" onClick={closeSignModal}>
                Cancel
              </button>
              <button 
                className="action-btn primary" 
                disabled={!signatureName.trim()}
                onClick={handleSignSubmit}
              >
                Accept & Sign Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

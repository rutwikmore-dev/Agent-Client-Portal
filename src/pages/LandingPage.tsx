import React, { useState } from 'react';
import { 
  Check, 
  MessageSquare, 
  Clock, 
  FolderOpen, 
  TrendingUp, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  Send,
  Star,
  Users,
  LayoutDashboard,
  FileText,
  Bell,
  ShieldCheck
} from 'lucide-react';

interface LandingViewProps {
  onEnterPortal: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onEnterPortal }) => {
  // Mock interactive state for hero visual
  const [heroApprovalSigned, setHeroApprovalSigned] = useState(false);
  const [demoChatInput, setDemoChatInput] = useState('');
  const [demoChatHistory, setDemoChatHistory] = useState([
    { sender: 'client', text: 'Hey, I just reviewed the draft logo. Can we try a warmer color palette?' }
  ]);

  const handleSendDemoChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoChatInput.trim()) return;
    setDemoChatHistory(prev => [...prev, { sender: 'agency', text: demoChatInput.trim() }]);
    setDemoChatInput('');
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* 1. Header Navigation */}
      <nav className="lp-navbar">
        <div className="lp-navbar-container">
          <a href="#" className="lp-logo">
            <div className="lp-logo-dot">S</div>
            <span>Sorted</span>
          </a>

          <div className="lp-nav-links">
            <button className="lp-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => handleScrollTo('features')}>
              Features
            </button>
            <button className="lp-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => handleScrollTo('how-it-works')}>
              How It Works
            </button>
            <button className="lp-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => handleScrollTo('pricing')}>
              Pricing
            </button>
            <button className="lp-btn lp-btn-secondary" onClick={onEnterPortal}>
              Launch Portal Demo
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="lp-section">
        <div className="lp-container lp-hero-grid">
          <div className="lp-hero-text">
            <div className="lp-badge">
              <Sparkles style={{ width: '12px', height: '12px', marginRight: '4px', color: '#a855f7' }} />
              Next-Gen Agency Workspace
            </div>
            <h1>Keep Every Client Project Sorted</h1>
            <p>
              Sorted helps creative agencies manage client communication, approvals, feedback, revisions, and project progress from a single workspace.
            </p>
            
            <div className="lp-hero-ctas">
              <button className="lp-btn lp-btn-accent" style={{ padding: '12px 24px', fontSize: '15px' }} onClick={onEnterPortal}>
                Start Free Trial <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
              <button className="lp-btn lp-btn-secondary" style={{ padding: '12px 24px', fontSize: '15px' }} onClick={() => alert("Book Demo simulation triggered! Check the Live Portal Demo to explore features immediately.")}>
                Book Demo
              </button>
            </div>

            <div className="lp-hero-benefits-row">
              <div className="lp-hero-benefit-item">
                <Check style={{ color: '#10b981', width: '14px', height: '14px', strokeWidth: 3 }} /> <span>No credit card required</span>
              </div>
              <div className="lp-hero-benefit-item">
                <Check style={{ color: '#10b981', width: '14px', height: '14px', strokeWidth: 3 }} /> <span>Free 14-day trial</span>
              </div>
              <div className="lp-hero-benefit-item">
                <Check style={{ color: '#10b981', width: '14px', height: '14px', strokeWidth: 3 }} /> <span>Invite unlimited clients</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Visual */}
          <div className="lp-hero-visual">
            <div className="lp-mockup">
              {/* Browser Header Bar */}
              <div className="lp-mockup-header">
                <div className="lp-mockup-dot red"></div>
                <div className="lp-mockup-dot yellow"></div>
                <div className="lp-mockup-dot green"></div>
                <div style={{ marginLeft: '12px', fontSize: '11px', color: 'var(--lp-text-muted)', fontWeight: 500 }}>
                  workspace.sorted.co/design-agency
                </div>
              </div>
              
              {/* App Mockup Layout (Main Panel) */}
              <div style={{ display: 'flex', minHeight: '380px', backgroundColor: '#f9fafb', borderTop: '1px solid rgba(0,0,0,0.02)' }}>
                {/* Main Panel Mockup */}
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
                  {/* Top Bar inside mockup */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Acme Rebrand Project</span>
                      <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '10px', backgroundColor: '#e0f2fe', color: '#0369a1', fontWeight: 600, flexShrink: 0 }}>Active</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      <span style={{ fontSize: '10px', color: '#4b5563', fontWeight: 500 }}>Sarah (Agency)</span>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#10b981', color: '#ffffff', fontSize: '9px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SJ</div>
                    </div>
                  </div>

                  {/* Dashboard body grid in mockup */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                    {/* Left Column in mockup */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      
                      {/* Active Approvals Mockup Card */}
                      <div className="lp-mockup-card" style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', letterSpacing: '0.2px' }}>Active Approval</span>
                          <span style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '4px', backgroundColor: '#fee2e2', color: '#b91c1c', fontWeight: 600 }}>Needs Review</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #f3f4f6', marginBottom: '8px' }}>
                          <div style={{ width: '24px', height: '24px', borderRadius: '4px', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontWeight: 'bold', fontSize: '10px', flexShrink: 0 }}>PDF</div>
                          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Brand_Board_V2.pdf</span>
                            <span style={{ fontSize: '9px', color: '#6b7280' }}>Submitted 2h ago by Sarah</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button style={{ padding: '4px 8px', fontSize: '10px', border: '1px solid #d1d5db', borderRadius: '4px', backgroundColor: '#ffffff', color: '#374151', cursor: 'pointer' }} onClick={() => alert("Simulated change request sent to agency!")}>Request Revisions</button>
                          {heroApprovalSigned ? (
                            <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px', padding: '4px' }}>
                              <Check style={{ color: '#10b981', width: '12px', height: '12px', strokeWidth: 3 }} /> Approved
                            </span>
                          ) : (
                            <button 
                              style={{ padding: '4px 8px', fontSize: '10px', border: 'none', borderRadius: '4px', backgroundColor: '#10b981', color: '#ffffff', fontWeight: 600, cursor: 'pointer' }}
                              onClick={() => setHeroApprovalSigned(true)}
                            >
                              Sign & Approve
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Timeline / Stepper Card */}
                      <div className="lp-mockup-card" style={{ padding: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', letterSpacing: '0.2px', display: 'block', marginBottom: '10px' }}>Project Phase</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px' }}>✓</div>
                            <span style={{ fontSize: '11px', color: '#111827', textDecoration: 'line-through' }}>Phase 1: Briefing & Strategy</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '8px', fontWeight: 'bold' }}>•</div>
                            <span style={{ fontSize: '11px', color: '#111827', fontWeight: 600 }}>Phase 2: Brand Concepts (Active)</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e5e7eb' }}></div>
                            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Phase 3: Feedback & Revisions</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Column in mockup */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      
                      {/* Live Feedback Streams Card */}
                      <div className="lp-mockup-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', height: '100%', minHeight: '190px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', letterSpacing: '0.2px', display: 'block', marginBottom: '8px' }}>Live Feedback</span>
                        
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '110px', overflowY: 'auto', marginBottom: '8px', paddingRight: '2px' }}>
                          {demoChatHistory.map((chat, idx) => (
                            <div key={idx} style={{ 
                              alignSelf: chat.sender === 'client' ? 'flex-start' : 'flex-end',
                              backgroundColor: chat.sender === 'client' ? '#f3f4f6' : '#111827',
                              color: chat.sender === 'client' ? '#111827' : '#ffffff',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              fontSize: '10px',
                              maxWidth: '90%',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                            }}>
                              {chat.text}
                            </div>
                          ))}
                        </div>

                        <form onSubmit={handleSendDemoChat} style={{ display: 'flex', gap: '4px', borderTop: '1px solid #f3f4f6', paddingTop: '8px' }}>
                          <input 
                            type="text" 
                            placeholder="Send feedback..."
                            style={{ flex: 1, padding: '4px 8px', fontSize: '10px', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none', backgroundColor: '#ffffff' }}
                            value={demoChatInput}
                            onChange={(e) => setDemoChatInput(e.target.value)}
                          />
                          <button type="submit" style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                            <Send style={{ width: '12px', height: '12px' }} />
                          </button>
                        </form>
                      </div>

                      {/* Quick Asset List Card */}
                      <div className="lp-mockup-card" style={{ padding: '12px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#4b5563', letterSpacing: '0.2px', display: 'block', marginBottom: '6px' }}>Shared Assets</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 550, color: '#374151' }}>
                            <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>AI</span> logo_final.ai
                          </span>
                          <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#fff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 550, color: '#374151' }}>
                            <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>PNG</span> banner.png
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Problem Section */}
      <section className="lp-section lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-badge">The Problem</div>
            <h2>Creative work gets messy fast</h2>
            <p>
              Managing client assets, feedback cycles, and milestones shouldn't require stitching together five different tools.
            </p>
          </div>

          <div className="lp-problem-grid">
            <div className="lp-problem-card">
              <div className="lp-problem-icon-wrapper">
                <MessageSquare style={{ width: '22px', height: '22px', color: '#3b82f6' }} />
              </div>
              <h3>Feedback scattered everywhere</h3>
              <p>
                Revisions are buried across WhatsApp threads, long email chains, and slack channels. Comments get forgotten, leading to mistakes.
              </p>
            </div>

            <div className="lp-problem-card">
              <div className="lp-problem-icon-wrapper">
                <Clock style={{ width: '22px', height: '22px', color: '#f59e0b' }} />
              </div>
              <h3>Delayed approvals</h3>
              <p>
                Clients forget to review deliverables, leaving deliverables pending checkouts. Project timelines slip as you wait for approvals.
              </p>
            </div>

            <div className="lp-problem-card">
              <div className="lp-problem-icon-wrapper">
                <FolderOpen style={{ width: '22px', height: '22px', color: '#06b6d4' }} />
              </div>
              <h3>Missing files and assets</h3>
              <p>
                Chasing down clients for vector logos, image credentials, and copywriting content delays the actual project kick-off.
              </p>
            </div>

            <div className="lp-problem-card">
              <div className="lp-problem-icon-wrapper">
                <AlertCircle style={{ width: '22px', height: '22px', color: '#ef4444' }} />
              </div>
              <h3>Constant status updates</h3>
              <p>
                "Where are we with X?" Client check-ins eat up hours of agency time that should have been spent creating amazing deliverables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-badge">Features Included</div>
            <h2>Everything you need to stay sorted</h2>
            <p>
              Sorted provides ten integrated features tailored to creative collaboration, design feedback, and transaction milestone transparency.
            </p>
          </div>

          <div className="lp-features-grid">
            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <LayoutDashboard style={{ width: '22px', height: '22px', color: '#3b82f6' }} />
              </div>
              <h3>Dashboard</h3>
              <p>
                Overview of projects, pending approvals, tasks, and recent activity.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <TrendingUp style={{ width: '22px', height: '22px', color: '#10b981' }} />
              </div>
              <h3>Projects</h3>
              <p>
                Create and manage projects. Track status, due dates and progress.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <Users style={{ width: '22px', height: '22px', color: '#ec4899' }} />
              </div>
              <h3>Clients</h3>
              <p>
                Manage client details and invite them to projects with client login access.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <FileText style={{ width: '22px', height: '22px', color: '#f97316' }} />
              </div>
              <h3>Deliverables & Approvals</h3>
              <p>
                Share deliverables via links. Clients can approve or request changes.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <MessageSquare style={{ width: '22px', height: '22px', color: '#3b82f6' }} />
              </div>
              <h3>Feedback & Comments</h3>
              <p>
                Centralized feedback and comments with thread and resolutions.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <FolderOpen style={{ width: '22px', height: '22px', color: '#06b6d4' }} />
              </div>
              <h3>Asset Requests</h3>
              <p>
                Request files, content and information. Track pending and received items.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <Clock style={{ width: '22px', height: '22px', color: '#8b5cf6' }} />
              </div>
              <h3>Activity Timeline</h3>
              <p>
                Track all actions, updates, approvals and comments in one place.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <Bell style={{ width: '22px', height: '22px', color: '#f43f5e' }} />
              </div>
              <h3>Notifications</h3>
              <p>
                Email notifications for approvals, feedback, asset requests and updates.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <Users style={{ width: '22px', height: '22px', color: '#14b8a6' }} />
              </div>
              <h3>Team Management</h3>
              <p>
                Add team members and manage roles within your creative agency.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <ShieldCheck style={{ width: '22px', height: '22px', color: '#a855f7' }} />
              </div>
              <h3>Roles & Permissions</h3>
              <p>
                Secure access for agency members and clients with role-based permissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="lp-section lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-badge">How Sorted Works</div>
            <h2>A seamless collaboration flow</h2>
            <p>
              How Sorted connects agencies and clients together from start to finish.
            </p>
          </div>

          <div className="lp-how-grid">
            <div className="lp-how-card">
              <div className="lp-how-card-num">01</div>
              <h3>Create Project</h3>
              <p>
                Agency creates a new project and adds client details.
              </p>
            </div>

            <div className="lp-how-card">
              <div className="lp-how-card-num">02</div>
              <h3>Invite Client</h3>
              <p>
                Client receives an invitation and gains access to the portal.
              </p>
            </div>

            <div className="lp-how-card">
              <div className="lp-how-card-num">03</div>
              <h3>Collect Assets</h3>
              <p>
                Agency requests required content and assets. Client uploads and submits.
              </p>
            </div>

            <div className="lp-how-card">
              <div className="lp-how-card-num">04</div>
              <h3>Share Deliverables</h3>
              <p>
                Agency shares work via links (Figma, Drive, Loom, etc.).
              </p>
            </div>

            <div className="lp-how-card">
              <div className="lp-how-card-num">05</div>
              <h3>Feedback & Revisions</h3>
              <p>
                Client reviews, leaves feedback or requests changes.
              </p>
            </div>

            <div className="lp-how-card">
              <div className="lp-how-card-num">06</div>
              <h3>Approve</h3>
              <p>
                Client approves the deliverable when satisfied.
              </p>
            </div>

            <div className="lp-how-card">
              <div className="lp-how-card-num">07</div>
              <h3>Complete</h3>
              <p>
                Project marked complete and delivered. Archive or start new project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Benefits Section */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-badge">Agency Benefits</div>
            <h2>Engineered for creative agencies</h2>
            <p>
              Sorted removes administration friction, so your team can focus on delivering high-fidelity design work.
            </p>
          </div>

          <div className="lp-benefits-grid">
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981', width: '20px', height: '20px' }} />
              <h3>Faster approvals</h3>
            </div>
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981', width: '20px', height: '20px' }} />
              <h3>Fewer client emails</h3>
            </div>
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981', width: '20px', height: '20px' }} />
              <h3>Better visibility</h3>
            </div>
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981', width: '20px', height: '20px' }} />
              <h3>Organized chat</h3>
            </div>
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981', width: '20px', height: '20px' }} />
              <h3>Premium client UX</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="lp-section lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-badge">Social Proof</div>
            <h2>Trusted by creative leaders</h2>
            <p>
              Here is what agencies and clients say about using Sorted to manage their creative deliverables.
            </p>
          </div>

          <div className="lp-testimonials-grid">
            <div className="lp-testimonial-card">
              <div style={{ display: 'flex', gap: '2px', color: '#fbbf24', marginBottom: '8px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: '16px', height: '16px', fill: '#fbbf24', color: '#fbbf24' }} />)}
              </div>
              <p className="lp-testimonial-text">
                "Sorted completely replaced our messy email chains and PDF revision booklets. We now get approvals on design boards in hours, not weeks."
              </p>
              <div className="lp-testimonial-author">
                <div className="lp-testimonial-author-avatar">SJ</div>
                <div>
                  <h4 className="lp-testimonial-author-name">Sarah Jenkins</h4>
                  <p className="lp-testimonial-author-role">Founder, Jenkins Design Studio</p>
                </div>
              </div>
            </div>

            <div className="lp-testimonial-card">
              <div style={{ display: 'flex', gap: '2px', color: '#fbbf24', marginBottom: '8px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: '16px', height: '16px', fill: '#fbbf24', color: '#fbbf24' }} />)}
              </div>
              <p className="lp-testimonial-text">
                "As a client, I love having one portal to track our brand rollout. I can sign off on vector assets, review tasks, and message my agent in a few taps."
              </p>
              <div className="lp-testimonial-author">
                <div className="lp-testimonial-author-avatar">RM</div>
                <div>
                  <h4 className="lp-testimonial-author-name">Rutwik More</h4>
                  <p className="lp-testimonial-author-role">Marketing Director, Sorted Group</p>
                </div>
              </div>
            </div>

            <div className="lp-testimonial-card">
              <div style={{ display: 'flex', gap: '2px', color: '#fbbf24', marginBottom: '8px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: '16px', height: '16px', fill: '#fbbf24', color: '#fbbf24' }} />)}
              </div>
              <p className="lp-testimonial-text">
                "The asset vault and digital signature features saved our project timeline. Collecting brief specifications and credentials has never been this secure."
              </p>
              <div className="lp-testimonial-author">
                <div className="lp-testimonial-author-avatar">EW</div>
                <div>
                  <h4 className="lp-testimonial-author-name">Emma Watson</h4>
                  <p className="lp-testimonial-author-role">Operations Manager, Watson & Co</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Preview Section */}
      <section id="pricing" className="lp-section">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-badge">Pricing Plans</div>
            <h2>Simple, transparent pricing</h2>
            <p>
              Choose the plan that fits your agency's scale. All plans include unlimited guest invites for clients.
            </p>
          </div>

          <div className="lp-pricing-grid">
            {/* Starter Plan */}
            <div className="lp-pricing-card">
              <div className="lp-pricing-header">
                <div className="lp-pricing-name">Starter</div>
                <div className="lp-pricing-price">$49 <span>/ month</span></div>
                <p className="lp-pricing-desc">For freelancers and small creative teams.</p>
              </div>
              
              <ul className="lp-pricing-features">
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Up to 3 active projects</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> 5GB secure storage</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Unlimited client invites</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Basic task checklist</li>
              </ul>
              
              <button className="lp-btn lp-btn-secondary" style={{ width: '100%' }} onClick={onEnterPortal}>
                Start Starter Trial
              </button>
            </div>

            {/* Growth Plan - Highlighted */}
            <div className="lp-pricing-card popular">
              <div className="lp-pricing-pop-tag">Most Popular</div>
              <div className="lp-pricing-header">
                <div className="lp-pricing-name">Growth</div>
                <div className="lp-pricing-price">$129 <span>/ month</span></div>
                <p className="lp-pricing-desc">For growing boutique design and creative agencies.</p>
              </div>
              
              <ul className="lp-pricing-features">
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Unlimited active projects</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> 50GB secure storage</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Unlimited client invites</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Custom milestone steppers</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Interactive E-Signatures</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Simulated chat templates</li>
              </ul>
              
              <button className="lp-btn lp-btn-accent" style={{ width: '100%' }} onClick={onEnterPortal}>
                Start Growth Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="lp-pricing-card">
              <div className="lp-pricing-header">
                <div className="lp-pricing-name">Enterprise</div>
                <div className="lp-pricing-price">Custom <span>pricing</span></div>
                <p className="lp-pricing-desc">For larger agencies requiring custom compliance.</p>
              </div>
              
              <ul className="lp-pricing-features">
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Unlimited active projects</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> 1TB+ dedicated storage</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Dedicated support advisor</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Branded custom domain</li>
                <li className="lp-pricing-feature-item"><Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Single Sign-On (SSO)</li>
              </ul>
              
              <button className="lp-btn lp-btn-secondary" style={{ width: '100%' }} onClick={() => alert("Enterprise contact inquiry simulated! Click the Growth or Starter trial to view the portal workspace.")}>
                Contact Sales
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '13px', color: 'var(--lp-text-muted)' }}>
              Looking for a custom contract? <a href="#" style={{ color: 'var(--lp-accent)', fontWeight: 600, textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); alert('Redirecting to custom contract form...'); }}>Talk to our team</a>.
            </span>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-cta-banner">
            <h2>Ready to keep every project sorted?</h2>
            <p>
              Spend less time chasing clients for files and approvals, and more time creating great work.
            </p>
            <button className="lp-btn lp-btn-accent" style={{ padding: '14px 28px', fontSize: '15px' }} onClick={onEnterPortal}>
              Get Started for Free <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </section>

      {/* 10. Footer Section */}
      <footer className="lp-footer">
        <div className="lp-footer-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="lp-logo-dot" style={{ width: '24px', height: '24px', borderRadius: '6px', fontSize: '12px' }}>S</div>
            <span style={{ fontWeight: 700, fontSize: '16px' }}>Sorted</span>
          </div>

          <div className="lp-footer-links">
            <a href="#" className="lp-footer-link" onClick={(e) => { e.preventDefault(); handleScrollTo('features'); }}>Features</a>
            <a href="#" className="lp-footer-link" onClick={(e) => { e.preventDefault(); handleScrollTo('pricing'); }}>Pricing</a>
            <a href="#" className="lp-footer-link" onClick={(e) => { e.preventDefault(); alert('Redirecting to support contact...'); }}>Contact</a>
            <a href="#" className="lp-footer-link" onClick={(e) => { e.preventDefault(); alert('Sorted Privacy Policy (Draft)'); }}>Privacy Policy</a>
          </div>

          <div className="lp-footer-copyright">
            © 2026 Sorted. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

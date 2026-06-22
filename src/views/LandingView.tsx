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
  Users
} from 'lucide-react';

interface LandingViewProps {
  onEnterPortal: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onEnterPortal }) => {
  // Mock interactive state for hero visual
  const [heroApprovalSigned, setHeroApprovalSigned] = useState(false);
  const [demoChatSent, setDemoChatSent] = useState(false);
  const [demoChatInput, setDemoChatInput] = useState('');
  const [demoChatHistory, setDemoChatHistory] = useState([
    { sender: 'client', text: 'Hey, I just reviewed the draft logo. Can we try a warmer color palette?' }
  ]);

  const handleSendDemoChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoChatInput.trim()) return;
    setDemoChatHistory(prev => [...prev, { sender: 'agency', text: demoChatInput.trim() }]);
    setDemoChatInput('');
    setDemoChatSent(true);
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
              <Sparkles style={{ width: '12px', height: '12px', marginRight: '4px' }} />
              Next-Gen Agency Workspace
            </div>
            <h1>Keep Every Client Project Sorted</h1>
            <p>
              Sortd helps creative agencies manage client communication, approvals, feedback, revisions, and project progress from a single workspace.
            </p>
            
            <div className="lp-hero-ctas">
              <button className="lp-btn lp-btn-accent" style={{ padding: '14px 28px', fontSize: '15px' }} onClick={onEnterPortal}>
                Start Free Trial <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
              <button className="lp-btn lp-btn-secondary" style={{ padding: '14px 28px', fontSize: '15px' }} onClick={() => alert("Book Demo simulation triggered! Check the Live Portal Demo to explore features immediately.")}>
                Book Demo
              </button>
            </div>

            <div className="lp-hero-benefits-row">
              <div className="lp-hero-benefit-item">
                <Check /> <span>No credit card required</span>
              </div>
              <div className="lp-hero-benefit-item">
                <Check /> <span>Free 14-day trial</span>
              </div>
              <div className="lp-hero-benefit-item">
                <Check /> <span>Invite unlimited clients</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Visual */}
          <div className="lp-hero-visual">
            <div className="lp-mockup">
              <div className="lp-mockup-header">
                <div className="lp-mockup-dot red"></div>
                <div className="lp-mockup-dot yellow"></div>
                <div className="lp-mockup-dot green"></div>
                <div style={{ marginLeft: '12px', fontSize: '11px', color: 'var(--lp-text-muted)', fontWeight: 500 }}>
                  workspace.sorted.co/design-agency
                </div>
              </div>
              
              <div className="lp-mockup-body">
                {/* Visual Section: Milestone & Approvals */}
                <div className="lp-mockup-row">
                  <div className="lp-mockup-card">
                    <div className="lp-mockup-title">Active Approvals</div>
                    <div className="lp-mockup-project">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>Brand Board Revisions V2.pdf</span>
                        <span style={{ fontSize: '11px', color: 'var(--lp-text-secondary)' }}>Pending client signature</span>
                      </div>
                      
                      {heroApprovalSigned ? (
                        <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          ✓ Approved
                        </span>
                      ) : (
                        <button 
                          className="lp-btn lp-btn-accent" 
                          style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '4px' }}
                          onClick={() => setHeroApprovalSigned(true)}
                        >
                          Sign to Approve
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="lp-mockup-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                    <div className="lp-mockup-title" style={{ width: '100%' }}>Progress</div>
                    <div className="lp-mockup-avatar" style={{ width: '38px', height: '38px', fontSize: '14px' }}>75%</div>
                    <span style={{ fontSize: '11px', color: 'var(--lp-text-secondary)', fontWeight: 500 }}>3 of 4 stages complete</span>
                  </div>
                </div>

                {/* Visual Section: Live Mock Chat */}
                <div className="lp-mockup-card">
                  <div className="lp-mockup-title">Real-time Feedback Stream</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '110px', overflowY: 'auto', marginBottom: '10px', paddingRight: '4px' }}>
                    {demoChatHistory.map((chat, idx) => (
                      <div key={idx} style={{ 
                        alignSelf: chat.sender === 'client' ? 'flex-start' : 'flex-end',
                        backgroundColor: chat.sender === 'client' ? '#f3f4f6' : '#7c3aed',
                        color: chat.sender === 'client' ? 'var(--lp-text-primary)' : '#fff',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        maxWidth: '85%'
                      }}>
                        {chat.text}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendDemoChat} style={{ display: 'flex', gap: '6px' }}>
                    <input 
                      type="text" 
                      placeholder="Type feedback as Agency (e.g. Added warmer palettes!)..."
                      style={{ flex: 1, padding: '6px 10px', fontSize: '12px', border: '1px solid #e5e7eb', borderRadius: '4px', outline: 'none' }}
                      value={demoChatInput}
                      onChange={(e) => setDemoChatInput(e.target.value)}
                    />
                    <button type="submit" style={{ background: 'none', border: 'none', color: '#7c3aed', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Send style={{ width: '14px', height: '14px' }} />
                    </button>
                  </form>
                  {demoChatSent && (
                    <div style={{ fontSize: '10px', color: 'var(--lp-text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                      Tip: Explore the live portal demo to see automated agent replies!
                    </div>
                  )}
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
            <div className="lp-badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>The Problem</div>
            <h2>Creative work gets messy fast</h2>
            <p>
              Managing client assets, feedback cycles, and milestones shouldn't require stitching together five different tools.
            </p>
          </div>

          <div className="lp-problem-grid">
            <div className="lp-problem-card">
              <div className="lp-problem-icon-wrapper">
                <MessageSquare style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>Feedback scattered everywhere</h3>
              <p>
                Revisions are buried across WhatsApp threads, long email chains, and slack channels. Comments get forgotten, leading to mistakes.
              </p>
            </div>

            <div className="lp-problem-card">
              <div className="lp-problem-icon-wrapper">
                <Clock style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>Delayed approvals</h3>
              <p>
                Clients forget to review deliverables, leaving deliverables pending checkouts. Project timelines slip as you wait for approvals.
              </p>
            </div>

            <div className="lp-problem-card">
              <div className="lp-problem-icon-wrapper">
                <FolderOpen style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>Missing files and assets</h3>
              <p>
                Chasing down clients for vector logos, image credentials, and copywriting content delays the actual project kick-off.
              </p>
            </div>

            <div className="lp-problem-card">
              <div className="lp-problem-icon-wrapper">
                <AlertCircle style={{ width: '22px', height: '22px' }} />
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
            <div className="lp-badge">Platform Overview</div>
            <h2>Everything you need in one workspace</h2>
            <p>
              Sortd provides a modern toolkit tailored to creative collaboration, design feedback, and transaction transparent checkpoints.
            </p>
          </div>

          <div className="lp-features-grid">
            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <Users style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>Client Portal</h3>
              <p>
                Give clients a branded, unified workspace to view active deal files, sign-offs, and project progression.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <Check style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>Approval Workflows</h3>
              <p>
                Verify deliverables with custom milestones. Clients can sign-off or request changes with a single click.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <MessageSquare style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>Feedback Tracking</h3>
              <p>
                Threaded replies, document comments, and quick templates keep all instructions and revisions organized.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <FolderOpen style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>Asset Collection</h3>
              <p>
                Collect briefs, branding vector assets, and statements efficiently using secure vault guidelines.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <TrendingUp style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>Project Timeline</h3>
              <p>
                Progress bars and visual steppers show clients active project milestones in real-time, reducing status emails.
              </p>
            </div>

            <div className="lp-feature-card">
              <div className="lp-feature-icon-wrapper">
                <Clock style={{ width: '22px', height: '22px' }} />
              </div>
              <h3>Activity History</h3>
              <p>
                View every single milestone edit, message transaction, document e-signature, and log entry in one feed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="lp-section lp-section-alt">
        <div className="lp-container">
          <div className="lp-section-header">
            <div className="lp-badge">Workflow</div>
            <h2>Simple setup, quick results</h2>
            <p>
              Get your first project up and running in minutes, and give your clients a premium collaboration experience.
            </p>
          </div>

          <div className="lp-how-grid">
            <div className="lp-how-card">
              <div className="lp-how-card-num">01</div>
              <h3>Create a project</h3>
              <p>
                Configure project timelines, set milestone stages, and upload initial scopes of work.
              </p>
            </div>

            <div className="lp-how-card">
              <div className="lp-how-card-num">02</div>
              <h3>Invite your client</h3>
              <p>
                Send a secure portal invitation link. No complicated login or training needed for clients.
              </p>
            </div>

            <div className="lp-how-card">
              <div className="lp-how-card-num">03</div>
              <h3>Collect assets & feedback</h3>
              <p>
                Clients drop statements and branding files directly into the vault, and comment on drafts.
              </p>
            </div>

            <div className="lp-how-card">
              <div className="lp-how-card-num">04</div>
              <h3>Deliver & get approvals</h3>
              <p>
                Deliver final boards. Clients verify and sign electronically, moving the project to closing.
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
              Sortd removes administration friction, so your team can focus on delivering high-fidelity design work.
            </p>
          </div>

          <div className="lp-benefits-grid">
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981' }} />
              <h3>Faster approvals</h3>
            </div>
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981' }} />
              <h3>Fewer client emails</h3>
            </div>
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981' }} />
              <h3>Better visibility</h3>
            </div>
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981' }} />
              <h3>Organized chat</h3>
            </div>
            <div className="lp-benefit-card">
              <Check style={{ color: '#10b981' }} />
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
              Here is what agencies and clients say about using Sortd to manage their creative deliverables.
            </p>
          </div>

          <div className="lp-testimonials-grid">
            <div className="lp-testimonial-card">
              <div style={{ display: 'flex', gap: '2px', color: '#fbbf24', marginBottom: '8px' }}>
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: '16px', height: '16px', fill: '#fbbf24' }} />)}
              </div>
              <p className="lp-testimonial-text">
                "Sortd completely replaced our messy email chains and PDF revision booklets. We now get approvals on design boards in hours, not weeks."
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
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: '16px', height: '16px', fill: '#fbbf24' }} />)}
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
                {[...Array(5)].map((_, i) => <Star key={i} style={{ width: '16px', height: '16px', fill: '#fbbf24' }} />)}
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
                <li className="lp-pricing-feature-item"><Check /> Up to 3 active projects</li>
                <li className="lp-pricing-feature-item"><Check /> 5GB secure storage</li>
                <li className="lp-pricing-feature-item"><Check /> Unlimited client invites</li>
                <li className="lp-pricing-feature-item"><Check /> Basic task checklist</li>
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
                <li className="lp-pricing-feature-item"><Check /> Unlimited active projects</li>
                <li className="lp-pricing-feature-item"><Check /> 50GB secure storage</li>
                <li className="lp-pricing-feature-item"><Check /> Unlimited client invites</li>
                <li className="lp-pricing-feature-item"><Check /> Custom milestone steppers</li>
                <li className="lp-pricing-feature-item"><Check /> Interactive E-Signatures</li>
                <li className="lp-pricing-feature-item"><Check /> Simulated chat templates</li>
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
                <li className="lp-pricing-feature-item"><Check /> Unlimited active projects</li>
                <li className="lp-pricing-feature-item"><Check /> 1TB+ dedicated storage</li>
                <li className="lp-pricing-feature-item"><Check /> Dedicated support advisor</li>
                <li className="lp-pricing-feature-item"><Check /> Branded custom domain</li>
                <li className="lp-pricing-feature-item"><Check /> Single Sign-On (SSO)</li>
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

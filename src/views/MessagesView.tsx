import React, { useState, useRef, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import { Send } from 'lucide-react';

export const MessagesView: React.FC = () => {
  const { role, messages, sendMessage, isTyping, clients } = usePortal();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleTemplateClick = (text: string) => {
    setInputText(text);
  };

  // Client quick replies templates
  const clientTemplates = [
    "I signed the lease agreement in the document vault.",
    "I just uploaded my bank statements, please check.",
    "Can we reschedule our inspection meeting?",
    "What are the next steps for Stage 3?"
  ];

  // Agent quick replies templates
  const agentTemplates = [
    "Reminder: Please sign the draft lease contract in the vault.",
    "Please upload your bank statements so we can complete due diligence.",
    "I have updated your task list with the inspection details.",
    "The building inspector has signed off on the office layout."
  ];

  const activeTemplates = role === 'client' ? clientTemplates : agentTemplates;

  return (
    <div className="chat-container">
      {/* Left Contacts Sidebar */}
      <div className="chat-contacts">
        <div className="chat-contacts-header">
          <h2>Conversations</h2>
        </div>
        <div className="contacts-list">
          {role === 'client' ? (
            <div className="contact-item active">
              <div className="user-avatar" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}>
                SJ
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>Sarah Jenkins</span>
                  <span className="contact-status online"></span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Senior Advisor (Agent)
                </p>
              </div>
            </div>
          ) : (
            clients.map((c, idx) => (
              <div key={c.id} className={`contact-item ${idx === 0 ? 'active' : ''}`}>
                <div className="user-avatar" style={{ background: idx === 0 ? 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' : 'var(--bg-tertiary)' }}>
                  {c.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{c.name}</span>
                    <span className={`contact-status ${idx === 0 ? 'online' : ''}`}></span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {c.dealType}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Chat Main */}
      <div className="chat-main">
        {/* Chat Thread Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="user-avatar" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' }}>
              {role === 'client' ? 'SJ' : 'RM'}
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600 }}>
                {role === 'client' ? 'Sarah Jenkins' : 'Rutwik More'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: 500 }}>
                Online & Active
              </p>
            </div>
          </div>
        </div>

        {/* Message List */}
        <div className="chat-messages">
          {messages.map((msg) => {
            const isOutgoing = msg.sender === role;
            return (
              <div 
                key={msg.id} 
                className={`message-bubble ${isOutgoing ? 'outgoing' : 'incoming'}`}
              >
                <div style={{ fontWeight: 600, fontSize: '11px', marginBottom: '2px', opacity: 0.9 }}>
                  {msg.senderName}
                </div>
                <div>{msg.text}</div>
                <div className="message-time">{msg.timestamp}</div>
              </div>
            );
          })}

          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input & Templates */}
        <div className="chat-input-area">
          <div className="quick-templates">
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, alignSelf: 'center', marginRight: '6px' }}>
              QUICK TEMPLATES:
            </span>
            {activeTemplates.map((template, idx) => (
              <button 
                key={idx} 
                className="template-tag"
                onClick={() => handleTemplateClick(template)}
              >
                {template.length > 35 ? template.substring(0, 35) + '...' : template}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="chat-form">
            <input 
              type="text" 
              className="chat-input"
              placeholder={`Send message as ${role === 'agent' ? 'Sarah Jenkins (Agent)' : 'Rutwik More (Client)'}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="chat-send-btn">
              <Send style={{ width: '18px', height: '18px' }} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

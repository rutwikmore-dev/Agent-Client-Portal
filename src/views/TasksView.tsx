import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import type { TaskItem } from '../context/PortalContext';
import { Plus, User, ArrowRight, ArrowLeft, Check, X, ClipboardList } from 'lucide-react';

export const TasksView: React.FC = () => {
  const { role, tasks, moveTask, addTask } = styleContext();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newAssignedTo, setNewAssignedTo] = useState<'agent' | 'client'>('client');

  function styleContext() {
    return usePortal();
  }

  // Group tasks by status
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inprogressTasks = tasks.filter(t => t.status === 'inprogress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle.trim(),
      desc: newDesc.trim(),
      status: 'todo',
      priority: newPriority,
      assignedTo: newAssignedTo
    });

    // Reset and close
    setNewTitle('');
    setNewDesc('');
    setNewPriority('medium');
    setNewAssignedTo('client');
    setShowAddModal(false);
  };

  const renderTaskCard = (task: TaskItem) => {
    return (
      <div key={task.id} className="task-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span className={`task-card-badge ${task.priority}`}>
            {task.priority}
          </span>
          
          <span 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              fontSize: '11px', 
              color: 'var(--text-secondary)',
              fontWeight: 500
            }}
          >
            <User style={{ width: '10px', height: '10px' }} />
            {task.assignedTo === 'client' ? 'Client' : 'Agent'}
          </span>
        </div>

        <h4 className="task-card-title">{task.title}</h4>
        <p className="task-card-desc">{task.desc}</p>

        <div className="task-card-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '10px', marginTop: '10px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Actions</span>
          
          <div style={{ display: 'flex', gap: '4px' }}>
            {task.status !== 'todo' && (
              <button 
                className="task-card-action-btn"
                title="Move to To-Do"
                onClick={() => moveTask(task.id, task.status === 'completed' ? 'inprogress' : 'todo')}
              >
                <ArrowLeft style={{ width: '14px', height: '14px' }} />
              </button>
            )}
            
            {task.status !== 'completed' && (
              <button 
                className="task-card-action-btn"
                style={{ color: task.status === 'inprogress' ? 'var(--color-success)' : 'var(--text-secondary)' }}
                title={task.status === 'todo' ? "Start Task" : "Complete Task"}
                onClick={() => moveTask(task.id, task.status === 'todo' ? 'inprogress' : 'completed')}
              >
                {task.status === 'inprogress' ? (
                  <Check style={{ width: '14px', height: '14px' }} />
                ) : (
                  <ArrowRight style={{ width: '14px', height: '14px' }} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="tasks-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 600 }}>
            Task Board & Checklist
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
            Manage the collaborative items required for this transaction.
          </p>
        </div>

        {role === 'agent' && (
          <button 
            className="action-btn primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setShowAddModal(true)}
          >
            <Plus style={{ width: '16px', height: '16px' }} /> Create Task
          </button>
        )}
      </div>

      {/* Kanban Board columns */}
      <div className="kanban-board">
        {/* Column 1: To Do */}
        <div className="kanban-column">
          <div className="column-header">
            <span className="column-title">To Do</span>
            <span className="column-badge">{todoTasks.length}</span>
          </div>
          <div className="kanban-cards-container">
            {todoTasks.map(renderTaskCard)}
            {todoTasks.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '120px', color: 'var(--text-muted)', fontSize: '13px' }}>
                <ClipboardList style={{ width: '24px', height: '24px', marginBottom: '8px', opacity: 0.5 }} />
                No tasks to do.
              </div>
            )}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="kanban-column">
          <div className="column-header">
            <span className="column-title">In Progress</span>
            <span className="column-badge">{inprogressTasks.length}</span>
          </div>
          <div className="kanban-cards-container">
            {inprogressTasks.map(renderTaskCard)}
            {inprogressTasks.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '120px', color: 'var(--text-muted)', fontSize: '13px' }}>
                <ClipboardList style={{ width: '24px', height: '24px', marginBottom: '8px', opacity: 0.5 }} />
                No active tasks.
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Completed */}
        <div className="kanban-column">
          <div className="column-header">
            <span className="column-title">Completed</span>
            <span className="column-badge">{completedTasks.length}</span>
          </div>
          <div className="kanban-cards-container">
            {completedTasks.map(renderTaskCard)}
            {completedTasks.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: '120px', color: 'var(--text-muted)', fontSize: '13px' }}>
                <ClipboardList style={{ width: '24px', height: '24px', marginBottom: '8px', opacity: 0.5 }} />
                No completed tasks.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Agent Modal for adding Tasks */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create Collaboration Task</h2>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <X style={{ width: '20px', height: '20px' }} />
              </button>
            </div>
            
            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  TASK TITLE
                </label>
                <input 
                  type="text" 
                  className="chat-input"
                  placeholder="e.g. Schedule electrical audit"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  DESCRIPTION
                </label>
                <textarea 
                  className="chat-input"
                  placeholder="Outline the steps needed to finish this item..."
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  style={{ width: '100%', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    PRIORITY
                  </label>
                  <select 
                    className="chat-input"
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    style={{ width: '100%', background: 'var(--bg-tertiary)' }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    ASSIGNED TO
                  </label>
                  <select 
                    className="chat-input"
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value as any)}
                    style={{ width: '100%', background: 'var(--bg-tertiary)' }}
                  >
                    <option value="client">Client (Rutwik More)</option>
                    <option value="agent">Agent (Sarah Jenkins)</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="action-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="action-btn primary">
                  Publish Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

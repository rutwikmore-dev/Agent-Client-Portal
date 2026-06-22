import React, { createContext, useContext, useState } from 'react';

// Types
export type UserRole = 'agent' | 'client';
export type TabName = 'dashboard' | 'pipeline' | 'messages' | 'documents' | 'tasks';

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  dealType: string;
  dealValue: string;
  currentStage: number; // 0 to 4
  lastActive: string;
}

export interface Message {
  id: string;
  sender: 'agent' | 'client';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'Identity' | 'Contract' | 'Financial';
  status: 'Signed' | 'Pending Signature' | 'Missing';
  size: string;
  uploadedAt: string;
  signedAt?: string;
  signedBy?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  desc: string;
  status: 'todo' | 'inprogress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  assignedTo: 'agent' | 'client';
}

export interface ActivityLog {
  id: string;
  desc: string;
  time: string;
  type: 'message' | 'document' | 'task' | 'pipeline';
}

interface PortalContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
  clients: ClientProfile[];
  updateClientStage: (clientId: string, stage: number) => void;
  messages: Message[];
  sendMessage: (text: string) => void;
  isTyping: boolean;
  documents: DocumentItem[];
  uploadDocument: (name: string, category: 'Identity' | 'Contract' | 'Financial', size: string) => void;
  signDocument: (docId: string, signature: string) => void;
  tasks: TaskItem[];
  moveTask: (taskId: string, newStatus: 'todo' | 'inprogress' | 'completed') => void;
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  activities: ActivityLog[];
  addActivity: (desc: string, type: ActivityLog['type']) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('client');
  const [activeTab, setActiveTab] = useState<TabName>('dashboard');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // 1. Mock Clients Data
  const [clients, setClients] = useState<ClientProfile[]>([
    {
      id: 'c1',
      name: 'Rutwik More',
      email: 'rutwik.more@example.com',
      dealType: 'Commercial Space Lease',
      dealValue: '$240,000',
      currentStage: 2, // Under Inspection
      lastActive: 'Just now',
    },
    {
      id: 'c2',
      name: 'Emma Watson',
      email: 'emma.w@example.com',
      dealType: 'Residential Purchase',
      dealValue: '$750,000',
      currentStage: 4, // Completed / Closed
      lastActive: '2 hours ago',
    },
    {
      id: 'c3',
      name: 'James Cooper',
      email: 'j.cooper@example.com',
      dealType: 'Equity Advisory Contract',
      dealValue: '$95,000',
      currentStage: 0, // Onboarding
      lastActive: '1 day ago',
    },
  ]);

  // 2. Mock Messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'agent',
      senderName: 'Sarah Jenkins',
      text: 'Hi Rutwik, welcome to your portal. I have uploaded the draft lease contract and marked it for your signature.',
      timestamp: 'Yesterday at 4:15 PM',
    },
    {
      id: 'm2',
      sender: 'client',
      senderName: 'Rutwik More',
      text: 'Thanks Sarah. I see the contract. I will review it and sign it by tonight.',
      timestamp: 'Yesterday at 4:32 PM',
    },
    {
      id: 'm3',
      sender: 'agent',
      senderName: 'Sarah Jenkins',
      text: 'Perfect. Also, please make sure to upload your bank statement so we can finalize the proof of financial viability.',
      timestamp: 'Today at 10:10 AM',
    },
  ]);

  // 3. Mock Documents
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'd1',
      name: 'Government ID Verification.pdf',
      category: 'Identity',
      status: 'Signed',
      size: '2.4 MB',
      uploadedAt: 'Jun 18, 2026',
      signedAt: 'Jun 18, 2026',
      signedBy: 'Rutwik More',
    },
    {
      id: 'd2',
      name: 'Commercial Advisory Engagement Agreement.pdf',
      category: 'Contract',
      status: 'Signed',
      size: '1.8 MB',
      uploadedAt: 'Jun 19, 2026',
      signedAt: 'Jun 19, 2026',
      signedBy: 'Rutwik More & Sarah Jenkins',
    },
    {
      id: 'd3',
      name: 'Draft Commercial Lease Agreement - Suite 400B.pdf',
      category: 'Contract',
      status: 'Pending Signature',
      size: '4.2 MB',
      uploadedAt: 'Jun 22, 2026',
    },
    {
      id: 'd4',
      name: 'Certified Bank Statements - 3 Months.pdf',
      category: 'Financial',
      status: 'Missing',
      size: '--',
      uploadedAt: '--',
    },
  ]);

  // 4. Mock Tasks
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 't1',
      title: 'E-Sign Suite 400B Draft Lease',
      desc: 'Review commercial lease details and sign digitally in the document vault.',
      status: 'todo',
      priority: 'high',
      assignedTo: 'client',
    },
    {
      id: 't2',
      title: 'Upload bank statements for audit',
      desc: 'Provide last 3 months of bank statements to verify proof of financial holdings.',
      status: 'todo',
      priority: 'high',
      assignedTo: 'client',
    },
    {
      id: 't3',
      title: 'Schedule lease inspection walk-through',
      desc: 'Coordinate with property inspector for Suite 400B accessibility and utilities checkout.',
      status: 'inprogress',
      priority: 'medium',
      assignedTo: 'agent',
    },
    {
      id: 't4',
      title: 'Verify business credentials & registry',
      desc: 'Verify corporate records and business registration documents.',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'agent',
    },
    {
      id: 't5',
      title: 'Submit commercial space business plan',
      desc: 'Submit draft operations summary outlining structural modifications needed.',
      status: 'completed',
      priority: 'low',
      assignedTo: 'client',
    },
  ]);

  // 5. Activity Log
  const [activities, setActivities] = useState<ActivityLog[]>([
    {
      id: 'a1',
      desc: 'Contract "Commercial Advisory Engagement" was signed by Rutwik More.',
      time: '3 days ago',
      type: 'document',
    },
    {
      id: 'a2',
      desc: 'Task "Verify business credentials & registry" was marked complete by Sarah Jenkins.',
      time: 'Yesterday',
      type: 'task',
    },
    {
      id: 'a3',
      desc: 'Document "Draft Commercial Lease Agreement - Suite 400B" was uploaded by Sarah Jenkins.',
      time: 'Yesterday',
      type: 'document',
    },
  ]);

  // Add activities dynamically
  const addActivity = (desc: string, type: ActivityLog['type']) => {
    const newAct: ActivityLog = {
      id: `act_${Date.now()}`,
      desc,
      time: 'Just now',
      type,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Client actions
  const updateClientStage = (clientId: string, stage: number) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, currentStage: stage } : c))
    );
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      const stages = ['Onboarding', 'Discovery', 'Under Inspection', 'Negotiation', 'Closing'];
      addActivity(`Client ${client.name} status advanced to ${stages[stage]}.`, 'pipeline');
    }
  };

  // Messaging sending and dynamic auto-reply simulator
  const sendMessage = (text: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      sender: role,
      senderName: role === 'agent' ? 'Sarah Jenkins' : 'Rutwik More',
      text,
      timestamp: `Today at ${timestamp}`,
    };

    setMessages((prev) => [...prev, newMsg]);
    addActivity(`${role === 'agent' ? 'Sarah Jenkins' : 'Rutwik More'} sent a message.`, 'message');

    // Simulate real-time response from the opposite role after 1.5s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      let replyText = '';

      if (role === 'client') {
        // Sarah Jenkins (Agent) replies
        if (text.toLowerCase().includes('sign') || text.toLowerCase().includes('contract')) {
          replyText = "Thanks for checking the contract, Rutwik. Once signed, the system will automatically notify the owner and advance our inspection checks.";
        } else if (text.toLowerCase().includes('bank') || text.toLowerCase().includes('statement') || text.toLowerCase().includes('upload')) {
          replyText = "Awesome, once you upload the statements in the Documents tab, I will review them and check off that task for you.";
        } else {
          replyText = "Thanks for the update. Let me review these details and I will update our task list accordingly! Let me know if you need anything else.";
        }
      } else {
        // Rutwik More (Client) replies
        if (text.toLowerCase().includes('sign') || text.toLowerCase().includes('lease')) {
          replyText = "I will jump to the Documents tab and sign the draft contract right away. Let me know when you receive it.";
        } else if (text.toLowerCase().includes('upload') || text.toLowerCase().includes('statement')) {
          replyText = "Understood. I am uploading my banking docs now. Please confirm once you can view them.";
        } else {
          replyText = "Got it! Thanks for keeping me updated, Sarah. Let me know what my next steps are.";
        }
      }

      const autoReply: Message = {
        id: `msg_${Date.now() + 1}`,
        sender: role === 'agent' ? 'client' : 'agent',
        senderName: role === 'agent' ? 'Rutwik More' : 'Sarah Jenkins',
        text: replyText,
        timestamp: `Today at ${replyTime}`,
      };

      setMessages((prev) => [...prev, autoReply]);
      addActivity(
        `${role === 'agent' ? 'Rutwik More' : 'Sarah Jenkins'} replied to your message.`,
        'message'
      );
    }, 1800);
  };

  // Uploading document
  const uploadDocument = (name: string, category: 'Identity' | 'Contract' | 'Financial', size: string) => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    
    // Check if it replaces an existing missing file (e.g. Bank statement)
    const isMatchingMissing = documents.some(
      (doc) => doc.name.toLowerCase().includes('bank') && name.toLowerCase().includes('bank')
    );

    if (isMatchingMissing) {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.name.toLowerCase().includes('bank')
            ? { ...doc, name, status: 'Signed', size, uploadedAt: formattedDate, signedAt: formattedDate, signedBy: 'Rutwik More' }
            : doc
        )
      );
      // Auto complete the task "Upload bank statements"
      setTasks((prev) =>
        prev.map((t) => (t.title.toLowerCase().includes('bank') ? { ...t, status: 'completed' } : t))
      );
      addActivity(`Document "${name}" uploaded and signed. Task completed.`, 'document');
    } else {
      const newDoc: DocumentItem = {
        id: `doc_${Date.now()}`,
        name,
        category,
        status: category === 'Contract' ? 'Pending Signature' : 'Signed',
        size,
        uploadedAt: formattedDate,
        signedAt: category === 'Contract' ? undefined : formattedDate,
        signedBy: category === 'Contract' ? undefined : 'Rutwik More',
      };
      setDocuments((prev) => [...prev, newDoc]);
      addActivity(`New document "${name}" uploaded.`, 'document');
    }
  };

  // Signing document
  const signDocument = (docId: string, signature: string) => {
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              status: 'Signed',
              signedAt: formattedDate,
              signedBy: `${role === 'client' ? 'Rutwik More' : 'Sarah Jenkins'} (Signed: ${signature})`,
            }
          : doc
      )
    );

    // If it's the lease contract, complete the lease signing task
    const signedDoc = documents.find((d) => d.id === docId);
    if (signedDoc && signedDoc.name.toLowerCase().includes('lease')) {
      setTasks((prev) =>
        prev.map((t) => (t.title.toLowerCase().includes('lease') ? { ...t, status: 'completed' } : t))
      );
      // Also advance client stage to Stage 3 (Negotiation) or 4 (Closing)
      updateClientStage('c1', 3);
    }

    addActivity(
      `Document "${signedDoc?.name || 'Contract'}" signed digitally by ${
        role === 'client' ? 'Rutwik More' : 'Sarah Jenkins'
      }.`,
      'document'
    );
  };

  // Kanban task transitions
  const moveTask = (taskId: string, newStatus: 'todo' | 'inprogress' | 'completed') => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      addActivity(
        `Task "${task.title}" moved to ${
          newStatus === 'inprogress' ? 'In Progress' : newStatus === 'completed' ? 'Completed' : 'To Do'
        }.`,
        'task'
      );
    }
  };

  // Adding tasks
  const addTask = (taskDetails: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = {
      id: `task_${Date.now()}`,
      ...taskDetails,
    };
    setTasks((prev) => [newTask, ...prev]);
    addActivity(`New task "${taskDetails.title}" added and assigned to ${taskDetails.assignedTo}.`, 'task');
  };

  return (
    <PortalContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        clients,
        updateClientStage,
        messages,
        sendMessage,
        isTyping,
        documents,
        uploadDocument,
        signDocument,
        tasks,
        moveTask,
        addTask,
        activities,
        addActivity,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

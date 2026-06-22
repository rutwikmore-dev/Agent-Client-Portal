import React, { createContext, useContext, useState } from 'react';

// Types
export type UserRole = 'agent' | 'client';

export interface ActivityLog {
  id: string;
  desc: string;
  time: string;
  type: 'agency' | 'client' | 'system';
}

interface PortalContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentStage: number; // 0 to 6
  setStage: (stage: number) => void;
  advanceStage: () => void;
  revertStage: () => void;
  activities: ActivityLog[];
  addActivity: (desc: string, type: ActivityLog['type']) => void;
  resetWorkflow: () => void;
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
  const [currentStage, setCurrentStage] = useState<number>(2); // Start at "Collect Assets" for demo visibility
  const [activities, setActivities] = useState<ActivityLog[]>([
    {
      id: 'a1',
      desc: 'Project "Sorted Brand Redesign" initialized by agency.',
      time: '10 mins ago',
      type: 'agency',
    },
    {
      id: 'a2',
      desc: 'Client invitation sent to Rutwik More.',
      time: '8 mins ago',
      type: 'agency',
    },
    {
      id: 'a3',
      desc: 'Client accepted portal invitation and logged in.',
      time: '5 mins ago',
      type: 'client',
    },
  ]);

  const addActivity = (desc: string, type: ActivityLog['type']) => {
    const newAct: ActivityLog = {
      id: `act_${Date.now()}`,
      desc,
      time: 'Just now',
      type,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  const setStage = (stage: number) => {
    if (stage >= 0 && stage <= 6) {
      setCurrentStage(stage);
      const stagesList = [
        'Create Project',
        'Invite Client',
        'Collect Assets',
        'Share Deliverables',
        'Feedback & Revisions',
        'Approve',
        'Complete'
      ];
      addActivity(`Workflow progress updated to Step ${stage + 1}: ${stagesList[stage]}.`, 'system');
    }
  };

  const advanceStage = () => {
    if (currentStage < 6) {
      setStage(currentStage + 1);
    }
  };

  const revertStage = () => {
    if (currentStage > 0) {
      setStage(currentStage - 1);
    }
  };

  const resetWorkflow = () => {
    setCurrentStage(0);
    setActivities([
      {
        id: `a_${Date.now()}`,
        desc: 'Workspace workflow reset to initial state.',
        time: 'Just now',
        type: 'system',
      }
    ]);
  };

  return (
    <PortalContext.Provider
      value={{
        role,
        setRole,
        currentStage,
        setStage,
        advanceStage,
        revertStage,
        activities,
        addActivity,
        resetWorkflow,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

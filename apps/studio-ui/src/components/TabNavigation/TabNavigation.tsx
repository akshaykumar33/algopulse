import React from 'react';
import { BookOpen, Signpost, GitBranch, Box, Code, FlaskConical } from 'lucide-react';
import { useStudioStore, type TabType } from '../../store/useStudioStore';

interface TabItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabItem[] = [
  { id: 'story', label: 'Story', icon: <BookOpen size={16} /> },
  { id: 'walkthrough', label: 'Walkthrough', icon: <Signpost size={16} /> },
  { id: 'diagrams', label: 'Diagrams', icon: <GitBranch size={16} /> },
  { id: 'visualize', label: 'Visualize', icon: <Box size={16} /> },
  { id: 'code', label: 'Code', icon: <Code size={16} /> },
  { id: 'tests', label: 'Tests', icon: <FlaskConical size={16} /> },
];

export const TabNavigation: React.FC = () => {
  const { activeTab, setActiveTab } = useStudioStore();

  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--s-2)',
        padding: 'var(--s-2) var(--s-6)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--surface)',
      }}
    >
      {TABS.map((tab) => {
        const selected = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-2)',
              padding: 'var(--s-2) var(--s-4)',
              borderRadius: 'var(--r-pill)',
              border: '1px solid',
              borderColor: selected ? 'var(--caramel)' : 'transparent',
              backgroundColor: selected ? 'var(--caramel-soft)' : 'transparent',
              color: selected ? 'var(--caramel-text)' : 'var(--text-muted)',
              fontWeight: selected ? 800 : 700,
              fontSize: 'var(--fs-14)',
              cursor: 'pointer',
              transition: 'all var(--t-fast) var(--ease-pop)',
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { TabNavigation } from './components/TabNavigation/TabNavigation';
import { PipMascot } from './components/Mascot/PipMascot';
import { ProblemListSidebar } from './components/Sidebar/ProblemListSidebar';
import { CoachDrawer } from './components/Coach/CoachDrawer';

import { StoryTab } from './components/Tabs/StoryTab';
import { WalkthroughTab } from './components/Tabs/WalkthroughTab';
import { DiagramsTab } from './components/Tabs/DiagramsTab';
import { VisualizeTab } from './components/Tabs/VisualizeTab';
import { CodeTab } from './components/Tabs/CodeTab';
import { TestsTab } from './components/Tabs/TestsTab';

import { useStudioStore } from './store/useStudioStore';
import { List, ChevronLeft, ChevronRight } from 'lucide-react';

export const App: React.FC = () => {
  const { activeTab, activeFile, problems, setDays, setActiveDate, setProblems, setActiveFile } =
    useStudioStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);

  useEffect(() => {
    fetch('/api/days')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.days) && data.days.length > 0) {
          setDays(data.days);
          const firstDay = data.days[0];
          setActiveDate(firstDay.date);
          if (Array.isArray(firstDay.problems) && firstDay.problems.length > 0) {
            setProblems(firstDay.problems);
            setActiveFile(firstDay.problems[0].file);
          }
        }
      })
      .catch(() => {
        setDays([{ date: '2026-10-05', dayNumber: 1, total: 6, done: 6 }]);
        setActiveDate('2026-10-05');
        setProblems([
          { id: '1', name: 'Yet Another Tetris Problem', file: 'yetAnotherTetrisProblem', rating: 800, done: true },
          { id: '2', name: 'Next Level', file: 'nextLevel', rating: 800, done: true },
        ]);
        setActiveFile('yetAnotherTetrisProblem');
      });
  }, [setDays, setActiveDate, setProblems, setActiveFile]);

  const currentProblem = problems.find((p) => p.file === activeFile) || problems[0];

  const handleNextProblem = () => {
    const idx = problems.findIndex((p) => p.file === activeFile);
    if (idx >= 0 && idx < problems.length - 1) {
      setActiveFile(problems[idx + 1].file);
    }
  };

  const handlePrevProblem = () => {
    const idx = problems.findIndex((p) => p.file === activeFile);
    if (idx > 0) {
      setActiveFile(problems[idx - 1].file);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onOpenCoach={() => setCoachOpen(true)} />
      <TabNavigation />

      {/* Main Content */}
      <main style={{ flex: 1, padding: 'var(--s-6)', maxWidth: '72rem', margin: '0 auto', width: '100%' }}>
        {/* Problem Title & Navigation Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--s-6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--s-2)',
                padding: 'var(--s-2) var(--s-3)',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
                fontWeight: 700,
                fontSize: 'var(--fs-14)',
                cursor: 'pointer',
              }}
            >
              <List size={16} color="var(--caramel-text)" />
              <span>Problems</span>
            </button>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-31)', fontWeight: 700 }}>
              {currentProblem?.name || 'Problem'}
            </h1>
          </div>

          <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
            <button
              type="button"
              onClick={handlePrevProblem}
              style={{
                padding: 'var(--s-2)',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
              title="Previous Problem"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={handleNextProblem}
              style={{
                padding: 'var(--s-2)',
                borderRadius: 'var(--r-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
                cursor: 'pointer',
              }}
              title="Next Problem"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Tab Panels */}
        {activeTab === 'story' && <StoryTab />}
        {activeTab === 'walkthrough' && <WalkthroughTab />}
        {activeTab === 'diagrams' && <DiagramsTab />}
        {activeTab === 'visualize' && <VisualizeTab />}
        {activeTab === 'code' && <CodeTab />}
        {activeTab === 'tests' && <TestsTab />}
      </main>

      {/* Drawers */}
      <ProblemListSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <CoachDrawer open={coachOpen} onClose={() => setCoachOpen(false)} />

      {/* Floating Mascot */}
      <PipMascot />
    </div>
  );
};

export default App;

import React, { useEffect } from 'react';
import { Header } from './components/Header/Header';
import { TabNavigation } from './components/TabNavigation/TabNavigation';
import { PipMascot } from './components/Mascot/PipMascot';
import { useStudioStore } from './store/useStudioStore';

export const App: React.FC = () => {
  const { activeTab, setDays, setActiveDate, setProblems, setActiveFile } = useStudioStore();

  useEffect(() => {
    // Fetch initial practice data from Express server
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
        // Fallback demo state if server offline
        setDays([{ date: '2026-10-05', dayNumber: 1, total: 6, done: 6 }]);
        setActiveDate('2026-10-05');
        setProblems([
          { id: '1', name: 'Yet Another Tetris Problem', file: 'yetAnotherTetrisProblem', rating: 800, done: true },
        ]);
        setActiveFile('yetAnotherTetrisProblem');
      });
  }, [setDays, setActiveDate, setProblems, setActiveFile]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <TabNavigation />

      <main style={{ flex: 1, padding: 'var(--s-6)', maxWidth: '72rem', margin: '0 auto', width: '100%' }}>
        {activeTab === 'story' && (
          <section
            style={{
              padding: 'var(--s-6)',
              borderRadius: 'var(--r-lg)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-31)', marginBottom: 'var(--s-3)' }}>
              Welcome to AlgoPulse Studio V2 🌱
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-16)', maxWidth: '60ch' }}>
              Your competitive programming workspace powered by React 19, TypeScript, and self-hosted AI voice controls.
            </p>
          </section>
        )}

        {activeTab === 'walkthrough' && (
          <section
            style={{
              padding: 'var(--s-6)',
              borderRadius: 'var(--r-lg)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-25)' }}>Problem Walkthrough</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 'var(--s-2)' }}>
              Step-by-step mathematical breakdown and algorithmic proof.
            </p>
          </section>
        )}

        {activeTab === 'diagrams' && (
          <section
            style={{
              padding: 'var(--s-6)',
              borderRadius: 'var(--r-lg)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-25)' }}>Visual Diagrams</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 'var(--s-2)' }}>
              Interactive graph structure and DP state transitions.
            </p>
          </section>
        )}

        {activeTab === 'visualize' && (
          <section
            style={{
              padding: 'var(--s-6)',
              borderRadius: 'var(--r-lg)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-25)' }}>Execution Visualizer</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 'var(--s-2)' }}>
              Step-by-step memory and pointer state animation.
            </p>
          </section>
        )}

        {activeTab === 'code' && (
          <section
            style={{
              padding: 'var(--s-6)',
              borderRadius: 'var(--r-lg)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-25)' }}>Code Workspace</h2>
            <pre
              style={{
                marginTop: 'var(--s-4)',
                padding: 'var(--s-4)',
                borderRadius: 'var(--r-md)',
                backgroundColor: 'var(--surface-sunk)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-14)',
              }}
            >
              {`const fs = require('fs');\nfunction solve() {\n  // Solution code\n}`}
            </pre>
          </section>
        )}

        {activeTab === 'tests' && (
          <section
            style={{
              padding: 'var(--s-6)',
              borderRadius: 'var(--r-lg)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-25)' }}>Sample Test Suite</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: 'var(--s-2)' }}>
              Automated runner output and sample assertion checks.
            </p>
          </section>
        )}
      </main>

      {/* Floating Mascot */}
      <PipMascot />
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Play, CheckCircle, XCircle } from 'lucide-react';

export const TestsTab: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [passed, setPassed] = useState<boolean | null>(null);

  const handleRunTests = () => {
    setRunning(true);
    setPassed(null);
    setTimeout(() => {
      setRunning(false);
      setPassed(true);
    }, 600);
  };

  return (
    <div
      style={{
        padding: 'var(--s-6)',
        borderRadius: 'var(--r-lg)',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--s-4)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-25)', fontWeight: 700 }}>
          Sample Test Cases
        </h2>

        <button
          type="button"
          onClick={handleRunTests}
          disabled={running}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--s-2)',
            padding: 'var(--s-2) var(--s-4)',
            borderRadius: 'var(--r-pill)',
            border: 'none',
            backgroundColor: 'var(--choc)',
            color: 'var(--on-choc)',
            fontWeight: 700,
            fontSize: 'var(--fs-14)',
            cursor: 'pointer',
          }}
        >
          <Play size={16} />
          <span>{running ? 'Running...' : 'Run Tests'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gap: 'var(--s-3)' }}>
        <div
          style={{
            padding: 'var(--s-4)',
            borderRadius: 'var(--r-md)',
            backgroundColor: 'var(--surface-sunk)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 'var(--fs-14)' }}>Sample Test #1</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-12)', color: 'var(--text-muted)', marginTop: 4 }}>
              Input: 4 \n 1 2 3 4
            </div>
          </div>

          {passed === true && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--moss)', fontWeight: 700 }}>
              <CheckCircle size={18} />
              <span>PASSED</span>
            </div>
          )}
          {passed === false && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--berry)', fontWeight: 700 }}>
              <XCircle size={18} />
              <span>FAILED</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

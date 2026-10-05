import React, { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const VisualizeTab: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(1);

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
          Interactive Memory & State Visualizer
        </h2>

        <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              padding: 'var(--s-2) var(--s-3)',
              borderRadius: 'var(--r-pill)',
              border: 'none',
              backgroundColor: 'var(--choc)',
              color: 'var(--on-choc)',
              fontWeight: 700,
              fontSize: 'var(--fs-14)',
              cursor: 'pointer',
            }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
            <span>{playing ? 'Pause' : 'Play'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep(1);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              padding: 'var(--s-2) var(--s-3)',
              borderRadius: 'var(--r-pill)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              fontWeight: 700,
              fontSize: 'var(--fs-14)',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--s-3)',
          padding: 'var(--s-8)',
          borderRadius: 'var(--r-md)',
          backgroundColor: 'var(--surface-sunk)',
          border: '1px solid var(--border)',
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            style={{
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: 'var(--r-md)',
              border: '2px solid',
              borderColor: step === item ? 'var(--caramel)' : 'var(--border-strong)',
              backgroundColor: step === item ? 'var(--caramel-soft)' : 'var(--surface)',
              color: step === item ? 'var(--caramel-text)' : 'var(--text)',
              fontWeight: 800,
              display: 'grid',
              placeItems: 'center',
              fontSize: 'var(--fs-20)',
              transition: 'all var(--t-fast) var(--ease-pop)',
            }}
          >
            {item * 10}
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Lightbulb, FileText, CheckCircle2 } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';

export const WalkthroughTab: React.FC = () => {
  const { activeFile, activeDate } = useStudioStore();
  const [explanation, setExplanation] = useState<string>('');

  useEffect(() => {
    if (!activeFile || !activeDate) return;
    fetch(`/api/explanation?date=${activeDate}&file=${activeFile}`)
      .then((res) => res.json())
      .then((data) => {
        setExplanation(data.markdown || '### Algorithmic Analysis\n\nNo detailed explanation found yet.');
      })
      .catch(() => {
        setExplanation('### Algorithmic Breakdown\n\n1. **Core Intuition**: Analyze invariants and monotonicity.\n2. **Complexity**: $O(N \\log N)$ time and $O(N)$ space.');
      });
  }, [activeFile, activeDate]);

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
          gap: 'var(--s-3)',
          marginBottom: 'var(--s-4)',
        }}
      >
        <button
          type="button"
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
          <Lightbulb size={16} color="var(--caramel-text)" />
          <span>Hint</span>
        </button>

        <button
          type="button"
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
          <FileText size={16} color="var(--caramel-text)" />
          <span>Explain</span>
        </button>

        <button
          type="button"
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
          <CheckCircle2 size={16} color="var(--caramel-text)" />
          <span>Review Code</span>
        </button>
      </div>

      <div style={{ lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
        {explanation}
      </div>
    </div>
  );
};

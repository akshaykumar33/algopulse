import React, { useState, useEffect } from 'react';
import { Copy, Save } from 'lucide-react';
import { useStudioStore, type CodeModeType } from '../../store/useStudioStore';

export const CodeTab: React.FC = () => {
  const { activeFile, activeDate, codeMode, setCodeMode } = useStudioStore();
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    if (!activeFile || !activeDate) return;
    fetch(`/api/code?date=${activeDate}&file=${activeFile}&mode=${codeMode}`)
      .then((res) => res.json())
      .then((data) => setCode(data.code || '// Solution code'))
      .catch(() => setCode(`const fs = require('fs');\n\nfunction solve() {\n  // Solution code for ${activeFile}\n}\n\nsolve();`));
  }, [activeFile, activeDate, codeMode]);

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
        {/* Code Mode Selector */}
        <div style={{ display: 'flex', gap: 'var(--s-1)', backgroundColor: 'var(--surface-sunk)', padding: 4, borderRadius: 'var(--r-pill)' }}>
          {(['attempt', 'reference', 'diff'] as CodeModeType[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setCodeMode(mode)}
              style={{
                padding: 'var(--s-1) var(--s-4)',
                borderRadius: 'var(--r-pill)',
                border: 'none',
                backgroundColor: codeMode === mode ? 'var(--surface)' : 'transparent',
                color: codeMode === mode ? 'var(--text)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: 'var(--fs-14)',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(code)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              padding: 'var(--s-2) var(--s-3)',
              borderRadius: 'var(--r-pill)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              fontSize: 'var(--fs-14)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Copy size={16} />
            <span>Copy</span>
          </button>

          <button
            type="button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--s-1)',
              padding: 'var(--s-2) var(--s-3)',
              borderRadius: 'var(--r-pill)',
              border: 'none',
              backgroundColor: 'var(--choc)',
              color: 'var(--on-choc)',
              fontSize: 'var(--fs-14)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Save size={16} />
            <span>Save Attempt</span>
          </button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        style={{
          width: '100%',
          minHeight: '22rem',
          padding: 'var(--s-4)',
          borderRadius: 'var(--r-md)',
          backgroundColor: 'var(--code-bg, oklch(24% 0.03 45))',
          color: 'oklch(90% 0.025 80)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-14)',
          lineHeight: 1.6,
          border: '1px solid var(--border)',
          outline: 'none',
          resize: 'vertical',
        }}
      />
    </div>
  );
};

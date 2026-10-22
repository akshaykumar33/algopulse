import React from 'react';
import { GitCommit } from 'lucide-react';

export const DiagramsTab: React.FC = () => {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)', marginBottom: 'var(--s-4)' }}>
        <GitCommit size={20} color="var(--caramel-text)" />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-25)', fontWeight: 700 }}>
          Visual Diagrams & Flowcharts
        </h2>
      </div>

      <div
        style={{
          padding: 'var(--s-6)',
          borderRadius: 'var(--r-md)',
          backgroundColor: 'var(--surface-sunk)',
          border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-14)',
          overflowX: 'auto',
        }}
      >
        {`flowchart TD\n    A[Input Array] --> B[Sort Array]\n    B --> C[Two Pointers Check]\n    C -->|Match| D[Return YES]\n    C -->|No Match| E[Return NO]`}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';

export const StoryTab: React.FC = () => {
  const { activeFile, activeDate } = useStudioStore();
  const [storyMarkdown, setStoryMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!activeFile || !activeDate) return;
    setLoading(true);
    fetch(`/api/story?date=${activeDate}&file=${activeFile}`)
      .then((res) => res.json())
      .then((data) => {
        setStoryMarkdown(data.markdown || '### Story Time ✨\n\nOnce upon a time in a distant realm of algorithms...');
        setLoading(false);
      })
      .catch(() => {
        setStoryMarkdown('### Story Time ✨\n\nOnce upon a time in a distant realm of algorithms, a programmer set out to solve the optimal subarray sum...');
        setLoading(false);
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
          justifyContent: 'space-between',
          marginBottom: 'var(--s-4)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-25)', fontWeight: 700 }}>
          Problem Story
        </h2>
        <div style={{ display: 'flex', gap: 'var(--s-2)' }}>
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
              fontSize: 'var(--fs-14)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Volume2 size={16} color="var(--caramel-text)" />
            <span>Read Aloud</span>
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
              fontSize: 'var(--fs-14)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={16} color="var(--caramel-text)" />
            <span>Regenerate Story</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-14)' }}>Loading story...</div>
      ) : (
        <div
          style={{
            lineHeight: 1.7,
            color: 'var(--text)',
            whiteSpace: 'pre-wrap',
            fontFamily: 'var(--font-ui)',
          }}
        >
          {storyMarkdown}
        </div>
      )}
    </div>
  );
};

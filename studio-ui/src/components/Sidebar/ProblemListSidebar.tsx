import React, { useState } from 'react';
import { Search, CheckCircle, Circle, X } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';

interface ProblemListSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const ProblemListSidebar: React.FC<ProblemListSidebarProps> = ({ open, onClose }) => {
  const { problems, activeFile, setActiveFile } = useStudioStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'done'>('all');

  if (!open) return null;

  const filtered = problems.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.file.toLowerCase().includes(search.toLowerCase());
    if (statusFilter === 'todo') return matchesQuery && !p.done;
    if (statusFilter === 'done') return matchesQuery && p.done;
    return matchesQuery;
  });

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 'var(--sidebar-w)',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div
        style={{
          padding: 'var(--s-4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-20)', fontWeight: 700 }}>
          Today's Set
        </h2>
        <button
          type="button"
          onClick={onClose}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ padding: 'var(--s-3) var(--s-4)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--s-2)',
            padding: 'var(--s-2) var(--s-3)',
            borderRadius: 'var(--r-md)',
            backgroundColor: 'var(--surface-sunk)',
            border: '1px solid var(--border)',
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search problem or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: 'none',
              background: 'none',
              outline: 'none',
              color: 'var(--text)',
              fontSize: 'var(--fs-14)',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', padding: '0 var(--s-4) var(--s-3)', gap: 'var(--s-1)' }}>
        {(['all', 'todo', 'done'] as const).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setStatusFilter(filter)}
            style={{
              flex: 1,
              padding: 'var(--s-1) 0',
              borderRadius: 'var(--r-sm)',
              border: '1px solid',
              borderColor: statusFilter === filter ? 'var(--caramel)' : 'transparent',
              backgroundColor: statusFilter === filter ? 'var(--caramel-soft)' : 'transparent',
              color: statusFilter === filter ? 'var(--caramel-text)' : 'var(--text-muted)',
              fontSize: 'var(--fs-12)',
              fontWeight: 700,
              textTransform: 'capitalize',
              cursor: 'pointer',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Problem List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--s-2)' }}>
        {filtered.map((p) => {
          const isSelected = p.file === activeFile;
          return (
            <div
              key={p.file}
              onClick={() => {
                setActiveFile(p.file);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--s-3) var(--s-3)',
                margin: 'var(--s-1) 0',
                borderRadius: 'var(--r-md)',
                backgroundColor: isSelected ? 'var(--caramel-soft)' : 'transparent',
                border: '1px solid',
                borderColor: isSelected ? 'var(--caramel)' : 'transparent',
                cursor: 'pointer',
                transition: 'all var(--t-fast) var(--ease-pop)',
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 'var(--fs-14)',
                    color: isSelected ? 'var(--caramel-text)' : 'var(--text)',
                  }}
                >
                  {p.name}
                </div>
                <div style={{ fontSize: 'var(--fs-12)', color: 'var(--text-muted)' }}>
                  Rating: {p.rating}
                </div>
              </div>

              {p.done ? (
                <CheckCircle size={18} color="var(--moss)" />
              ) : (
                <Circle size={18} color="var(--border-strong)" />
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};

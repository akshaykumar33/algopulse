import React from 'react';
import { Sun, Moon, Mic, Calendar, Flame, MessageSquare } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';

interface HeaderProps {
  onOpenCoach?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCoach }) => {
  const { theme, toggleTheme, voice, setVoiceListening, days, activeDate } = useStudioStore();

  const currentDay = days.find((d) => d.date === activeDate);

  return (
    <header
      style={{
        height: 'var(--topbar-h)',
        padding: '0 var(--s-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--surface)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-4)' }}>
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--s-2)',
            textDecoration: 'none',
            color: 'var(--text)',
            fontWeight: 800,
            fontSize: 'var(--fs-20)',
          }}
        >
          <span>🌱</span>
          <span>
            AlgoPulse <em style={{ color: 'var(--caramel-text)', fontStyle: 'normal' }}>Studio V2</em>
          </span>
        </a>

        {/* Day Picker */}
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--s-2)',
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
          <Calendar size={16} color="var(--caramel-text)" />
          <span>{activeDate ? `Day ${currentDay?.dayNumber || 1} (${activeDate})` : 'Select day'}</span>
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-3)' }}>
        {/* Streak */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--s-1)',
            padding: 'var(--s-1) var(--s-3)',
            borderRadius: 'var(--r-pill)',
            backgroundColor: 'var(--caramel-soft)',
            color: 'var(--caramel-text)',
            fontWeight: 800,
            fontSize: 'var(--fs-14)',
          }}
        >
          <Flame size={16} />
          <span>1 day streak</span>
        </div>

        {/* Voice Control */}
        <button
          type="button"
          onClick={() => setVoiceListening(!voice.listening)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            backgroundColor: voice.listening ? 'var(--berry)' : 'var(--surface)',
            color: voice.listening ? '#fff' : 'var(--text)',
            cursor: 'pointer',
          }}
          title="Voice Control"
        >
          <Mic size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            cursor: 'pointer',
          }}
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* AI Coach */}
        <button
          type="button"
          onClick={onOpenCoach}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--s-2)',
            padding: '0 var(--s-4)',
            height: '2.5rem',
            borderRadius: 'var(--r-pill)',
            border: 'none',
            backgroundColor: 'var(--choc)',
            color: 'var(--on-choc)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <MessageSquare size={16} />
          <span>Coach</span>
        </button>
      </div>
    </header>
  );
};

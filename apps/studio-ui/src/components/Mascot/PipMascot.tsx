import React, { useState, useEffect } from 'react';
import { Mic, Terminal } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';
import styles from './PipMascot.module.css';

export const PipMascot: React.FC = () => {
  const { mascot, voice, toggleMascotHidden, setVoiceListening } = useStudioStore();
  const [pos, setPos] = useState({ x: window.innerWidth - 130, y: window.innerHeight - 150 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setPos((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 110),
        y: Math.min(prev.y, window.innerHeight - 130),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (mascot.hidden) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const nx = Math.min(Math.max(12, e.clientX - dragStart.x), window.innerWidth - 110);
    const ny = Math.min(Math.max(95, e.clientY - dragStart.y), window.innerHeight - 130);
    setPos({ x: nx, y: ny });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`${styles.mascot} ${isDragging ? styles.mascotDragging : ''}`}
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      role="region"
      aria-label="Pip the hamster buddy"
    >
      <div className={styles.pipBadges}>
        <button
          className={styles.pipStatusBadge}
          type="button"
          onClick={toggleMascotHidden}
          title="Pip · Click to hide/show"
        >
          <span
            className={`${styles.pipStatusDot} ${
              voice.listening ? styles.pipStatusDotListening : ''
            }`}
          />
          <span>{voice.listening ? 'Listening' : mascot.character === 'bunny' ? 'Bun' : 'Pip'}</span>
        </button>

        <button
          className={styles.pipBadgeBtn}
          type="button"
          onClick={() => setVoiceListening(!voice.listening)}
          title="Toggle microphone"
          aria-label="Microphone"
        >
          <Mic size={14} />
        </button>

        <button
          className={styles.pipBadgeBtn}
          type="button"
          title="Command window"
          aria-label="Command"
        >
          <Terminal size={14} />
        </button>
      </div>

      <div className={styles.mascotAvatar}>
        <div className={styles.mascotFloat}>
          <div className={styles.mascotSquash}>
            {/* Hamster / Bunny visual representation */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #f4b87c, #d88942)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
              }}
            >
              {mascot.character === 'bunny' ? '🐰' : '🐹'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

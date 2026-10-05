import React, { useState } from 'react';
import { Send, X, Bot, User } from 'lucide-react';

interface CoachDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'coach';
  text: string;
}

export const CoachDrawer: React.FC<CoachDrawerProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'coach', text: 'Hey there! I am your AI Coach. How can I help you with this problem?' },
  ]);
  const [input, setInput] = useState('');

  if (!open) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Fetch AI coach reply
    fetch('/api/coach/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userMsg }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [
          ...prev,
          { role: 'coach', text: data.reply || 'Great question! Let us examine the invariants...' },
        ]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          { role: 'coach', text: 'Great question! Analyze the bounds and monotonicity of the array sum.' },
        ]);
      });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(36rem, 100vw)',
          height: '100vh',
          backgroundColor: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--s-4) var(--s-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-2)' }}>
            <Bot size={20} color="var(--caramel-text)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-20)', fontWeight: 700 }}>
              AI Coach
            </h3>
          </div>
          <button type="button" onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Message Log */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--s-6)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 'var(--s-3)',
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}
            >
              {m.role === 'coach' && (
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor: 'var(--caramel-soft)',
                    display: 'grid',
                    placeItems: 'center',
                    flex: 'none',
                  }}
                >
                  <Bot size={14} color="var(--caramel-text)" />
                </div>
              )}
              <div
                style={{
                  padding: 'var(--s-3) var(--s-4)',
                  borderRadius: 'var(--r-lg)',
                  backgroundColor: m.role === 'user' ? 'var(--choc)' : 'var(--surface-2)',
                  color: m.role === 'user' ? 'var(--on-choc)' : 'var(--text)',
                  fontSize: 'var(--fs-14)',
                  lineHeight: 1.6,
                }}
              >
                {m.text}
              </div>
              {m.role === 'user' && (
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor: 'var(--choc)',
                    display: 'grid',
                    placeItems: 'center',
                    flex: 'none',
                    color: 'var(--on-choc)',
                  }}
                >
                  <User size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ padding: 'var(--s-4) var(--s-6)', borderTop: '1px solid var(--border)', display: 'flex', gap: 'var(--s-2)' }}>
          <input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              padding: 'var(--s-3) var(--s-4)',
              borderRadius: 'var(--r-pill)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              fontSize: 'var(--fs-14)',
              outline: 'none',
            }}
          />
          <button
            type="button"
            onClick={handleSend}
            style={{
              width: '2.8rem',
              height: '2.8rem',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'var(--choc)',
              color: 'var(--on-choc)',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

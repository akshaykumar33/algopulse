/**
 * Gesture remote: while the camera is on, a small card lists every hand sign and what it
 * does, lights up the sign the camera sees, and flashes the one that fires — so the
 * hands work like a TV remote you can read at a glance. It can be folded to a chip.
 */
'use strict';

(() => {
  const STORE = 'algopulse-remote';
  const folded = () => {
    try {
      return localStorage.getItem(STORE) === 'folded';
    } catch {
      return false;
    }
  };
  let el = null;
  let lastLive = null;

  function rows() {
    const a = assistant;
    const map = a.bindings();
    const signs = Object.entries(a.BUILTIN)
      .map(([name, b]) => ({ name, emoji: b.emoji, label: b.label, action: map[name] }))
      .filter((r) => r.action && r.action !== 'none');
    const own = a.customs().map((g) => ({ name: `custom:${g.id}`, emoji: '✨', label: g.name, action: g.action }));
    return [...signs, ...own].map((r) => ({ ...r, does: a.ACTIONS[r.action]?.label || r.action, muted: a.gestures.suppress.has(r.name) }));
  }

  function render() {
    if (!el) return;
    const on = assistant.gestures.on;
    el.hidden = !on;
    if (!on) return;
    el.classList.toggle('is-folded', folded());
    el.innerHTML = `
      <button class="rm-head" type="button" aria-expanded="${!folded()}" title="Fold or open the remote">
        <i class="ph-fill ph-hand-waving" aria-hidden="true"></i><span>Remote</span><i class="ph-bold ph-caret-down rm-caret" aria-hidden="true"></i>
      </button>
      <ul class="rm-list">${rows()
        .map(
          (r) => `<li class="rm-row${r.muted ? ' is-muted' : ''}" data-sign="${escapeHtml(r.name)}" title="${r.muted ? 'Used by the air cursor while it is on' : ''}">
            <span class="rm-emoji" aria-hidden="true">${escapeHtml(r.emoji)}</span>
            <span class="rm-what"><strong>${escapeHtml(r.label)}</strong><span>${escapeHtml(r.does)}</span></span>
          </li>`
        )
        .join('')}</ul>
      <p class="rm-tip">Hold a sign still until the ring on your buddy fills.</p>`;
    el.querySelector('.rm-head').addEventListener('click', () => {
      try {
        localStorage.setItem(STORE, folded() ? 'open' : 'folded');
      } catch { /* private mode */ }
      render();
    });
  }

  function live(name) {
    if (!el || el.hidden || name === lastLive) return;
    lastLive = name;
    el.querySelectorAll('.rm-row').forEach((r) => r.classList.toggle('is-live', r.dataset.sign === name));
  }

  function flash(name) {
    const row = el && [...el.querySelectorAll('.rm-row')].find((r) => r.dataset.sign === name);
    if (!row) return;
    row.classList.remove('is-fired');
    void row.offsetWidth; // restart the animation
    row.classList.add('is-fired');
  }

  function mount() {
    if (typeof assistant === 'undefined') return;
    el = document.createElement('aside');
    el.className = 'gesture-remote';
    el.id = 'gestureRemote';
    el.hidden = true;
    el.setAttribute('aria-label', 'Gesture remote');
    document.body.append(el);
    const g = assistant.gestures;
    g.listeners.add(() => live(g.live?.name || null));
    // Flash the row of every sign that actually fires.
    const fire = g.fire.bind(g);
    g.fire = (name) => {
      fire(name);
      flash(name);
    };
    document.addEventListener('assistant:change', render);
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();

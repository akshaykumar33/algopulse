/**
 * Pip, the studio hamster — a floating, draggable buddy whose head follows the cursor.
 *
 * A vanilla port of the page-mascot component: two 3×3 sprite sheets (nine head
 * directions, nine expressions) swapped by background-position, so there is no
 * per-frame animation work. Added here: it floats, can be dragged anywhere (the spot is
 * remembered), moves with arrow keys, and reacts to what happens in the studio via
 * window.mascot.react(name).
 */
'use strict';

(() => {
  const DIRECTIONS = ['up-left', 'up', 'up-right', 'left', 'center', 'right', 'down-left', 'down', 'down-right'];
  const REACTIONS = ['blink', 'heart', 'sparkle', 'surprised', 'wink', 'bashful', 'sleepy', 'dizzy', 'delighted'];
  // Clockwise from the right, matching atan2 with y pointing down.
  const CLOCKWISE = ['right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up', 'up-right'];
  const SECTOR = (Math.PI * 2) / CLOCKWISE.length;
  const HYSTERESIS = 0.12;
  const DEAD_ZONE = 60;
  const PAYOFFS = ['heart', 'sparkle', 'delighted'];
  const DRAG_THRESHOLD = 5;
  const STORE = 'algopulse-mascot';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');

  const cell = (i) => `${(i % 3) * 50}% ${Math.floor(i / 3) * 50}%`;
  const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || '{}');
    } catch {
      return {};
    }
  }
  function save(patch) {
    try {
      localStorage.setItem(STORE, JSON.stringify({ ...load(), ...patch }));
    } catch { /* private mode: position lasts this session */ }
  }

  function mount() {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'mascot';
    el.id = 'mascot';
    el.setAttribute('aria-label', 'Pip the hamster. Click to boop, drag or use arrow keys to move, M to hide.');
    el.title = 'Boop me · drag me · M to hide';
    el.innerHTML = `
      <span class="mascot-bubble" aria-live="polite" hidden></span>
      <span class="mascot-status" aria-hidden="true"><i class="ph-fill ph-microphone mascot-mic"></i><i class="ph-fill ph-eye mascot-eye"></i></span>
      <span class="mascot-float">
        <span class="mascot-squash">
          <span class="mascot-layer mascot-dir"></span>
          <span class="mascot-layer mascot-react"></span>
        </span>
      </span>
      <span class="mascot-shadow" aria-hidden="true"></span>`;
    document.body.append(el);

    // Character: hamster (default) or bunny, remembered per browser.
    const CHARACTERS = { hamster: 'Pip the hamster', bunny: 'Bun the bunny' };
    function setCharacter(name) {
      const c = CHARACTERS[name] ? name : 'hamster';
      el.dataset.character = c;
      el.style.setProperty('--sheet-dir', `url("mascots/${c}-directions.webp")`);
      el.style.setProperty('--sheet-react', `url("mascots/${c}-reactions.webp")`);
      el.setAttribute('aria-label', `${CHARACTERS[c]}. Click to boop, drag or use arrow keys to move, M to hide.`);
      save({ character: c });
      return c;
    }
    setCharacter(load().character);

    // Speech-bubble captions (what Pip heard, or what it is doing).
    const bubble = el.querySelector('.mascot-bubble');
    let bubbleTimer = null;
    function say(text, ms = 2600) {
      clearTimeout(bubbleTimer);
      if (!text) {
        bubble.hidden = true;
        return;
      }
      bubble.textContent = text;
      bubble.hidden = false;
      if (ms) bubbleTimer = setTimeout(() => (bubble.hidden = true), ms);
    }

    const dirLayer = el.querySelector('.mascot-dir');
    const reactLayer = el.querySelector('.mascot-react');
    const squash = el.querySelector('.mascot-squash');
    let timers = [];
    let reaction = null;

    const setDirection = (d) => {
      dirLayer.style.backgroundPosition = cell(DIRECTIONS.indexOf(d));
    };
    const setReaction = (r) => {
      reaction = r;
      reactLayer.style.backgroundPosition = cell(REACTIONS.indexOf(r || 'blink'));
      el.classList.toggle('is-reacting', Boolean(r));
    };
    setDirection('center');
    setReaction(null);

    /* ---- position: remembered, always kept on screen ---- */
    const size = () => el.getBoundingClientRect();
    function place(x, y, persist = false) {
      const r = size();
      const nx = Math.min(Math.max(8, x), innerWidth - r.width - 8);
      const ny = Math.min(Math.max(72, y), innerHeight - r.height - 8);
      el.style.left = `${nx}px`;
      el.style.top = `${ny}px`;
      if (persist) save({ x: nx / innerWidth, y: ny / innerHeight });
    }
    const saved = load();
    const home = () => place(innerWidth - size().width - 24, innerHeight - size().height - 96);
    if (typeof saved.x === 'number') place(saved.x * innerWidth, saved.y * innerHeight);
    else home();
    addEventListener('resize', () => {
      const r = size();
      place(r.left, r.top);
    });
    if (saved.hidden) el.hidden = true;

    /* ---- head follows the cursor ---- */
    let sector = -1;
    let pointer = null;
    function aim() {
      if (!pointer || reaction) return;
      const box = size();
      const dx = pointer.x - (box.left + box.width / 2);
      const dy = pointer.y - (box.top + box.height / 2);
      if (Math.hypot(dx, dy) < DEAD_ZONE) {
        sector = -1;
        return setDirection('center');
      }
      const angle = Math.atan2(dy, dx);
      // Hold the current sector until the pointer is well past its edge (no flicker).
      if (sector !== -1 && Math.abs(wrap(angle - sector * SECTOR)) < SECTOR / 2 + HYSTERESIS) return;
      sector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length;
      setDirection(CLOCKWISE[sector]);
    }
    addEventListener('pointermove', (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      aim();
    }, { passive: true });

    /* ---- reactions ---- */
    function play(sequence) {
      timers.forEach(clearTimeout);
      timers = [];
      let t = 0;
      for (const [r, ms] of sequence) {
        timers.push(setTimeout(() => setReaction(r), t));
        t += ms;
      }
      timers.push(setTimeout(() => {
        setReaction(null);
        aim();
      }, t));
    }
    function bounce() {
      if (reduced.matches) return;
      squash.animate(
        [
          { transform: 'scale(1, 1)', easing: 'ease-in' },
          { transform: 'scale(1.1, 0.86)', offset: 0.18, easing: 'ease-out' },
          { transform: 'scale(0.95, 1.08)', offset: 0.45, easing: 'ease-in-out' },
          { transform: 'scale(1.03, 0.97)', offset: 0.72, easing: 'ease-in-out' },
          { transform: 'scale(1, 1)' },
        ],
        { duration: 420, easing: 'linear' }
      );
    }
    const boops = { count: 0, at: 0 };
    function boop() {
      const now = Date.now();
      boops.count = now - boops.at < 1600 ? boops.count + 1 : 1;
      boops.at = now;
      if (boops.count >= 4) {
        boops.count = 0;
        play([['dizzy', 1100]]);
      } else {
        play([['blink', 120], [PAYOFFS[(boops.count - 1) % PAYOFFS.length], 440]]);
      }
      bounce();
    }

    /* ---- drag (a click that barely moved is a boop) ---- */
    let drag = null;
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      const r = size();
      drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: e.clientX - r.left, oy: e.clientY - r.top, moved: false };
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < DRAG_THRESHOLD) return;
      if (!drag.moved) {
        drag.moved = true;
        el.classList.add('is-dragging');
        setReaction('surprised');
      }
      place(e.clientX - drag.ox, e.clientY - drag.oy);
    });
    const endDrag = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const wasDrag = drag.moved;
      drag = null;
      el.classList.remove('is-dragging');
      if (wasDrag) {
        const r = size();
        place(r.left, r.top, true);
        play([['delighted', 500]]);
        bounce();
      }
      el.dataset.dragged = wasDrag ? '1' : '';
    };
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    el.addEventListener('click', (e) => {
      if (el.dataset.dragged) {
        el.dataset.dragged = '';
        e.preventDefault();
        return;
      }
      boop();
    });

    /* ---- keyboard: arrows move it, Enter/Space boops (native button) ---- */
    el.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 48 : 16;
      const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (!d) return;
      e.preventDefault();
      const r = size();
      place(r.left + d[0], r.top + d[1], true);
    });

    // Step aside while the user types anywhere, so Pip never covers an input or button.
    const editable = (t) => t instanceof Element && t.matches('input:not([type=radio]):not([type=checkbox]), textarea, select, [contenteditable]');
    document.addEventListener('focusin', (e) => el.classList.toggle('is-shy', editable(e.target)));
    document.addEventListener('focusout', () => setTimeout(() => el.classList.toggle('is-shy', editable(document.activeElement)), 0));

    function toggle(force) {
      el.hidden = typeof force === 'boolean' ? !force : !el.hidden;
      save({ hidden: el.hidden });
      if (!el.hidden) {
        const r = size();
        place(r.left, r.top);
        play([['wink', 600]]);
      }
      return !el.hidden;
    }
    addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() !== 'm' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest('input, textarea, select, [contenteditable]')) return;
      if ([...document.querySelectorAll('dialog')].some((d) => d.matches(':modal'))) return;
      const shown = toggle();
      if (typeof toast === 'function') toast(shown ? 'Pip is back!' : 'Pip is napping. Press M to wake them.');
    });

    window.mascot = {
      el,
      say,
      setCharacter,
      character: () => el.dataset.character,
      name: () => CHARACTERS[el.dataset.character].split(' ')[0],
      listening(on) {
        el.classList.toggle('is-listening', on);
      },
      watching(on) {
        el.classList.toggle('is-watching', on);
      },
      react(name, ms = 900) {
        if (el.hidden || !REACTIONS.includes(name)) return;
        play([[name, ms]]);
        bounce();
      },
      toggle,
      home() {
        home();
        const r = size();
        place(r.left, r.top, true);
      },
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();

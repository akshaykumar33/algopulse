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
    const el = document.createElement('div');
    el.className = 'mascot';
    el.id = 'mascot';
    el.tabIndex = 0;
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Pip the hamster. Click to boop, drag or use arrow keys to move, M to hide.');
    el.title = 'Boop me · drag me · right-click to switch buddy · M to hide';
    el.innerHTML = `
      <div class="mascot-bubble" id="mascotBubble" aria-live="polite" hidden></div>
      <div class="pip-badges" id="pipBadges">
        <button class="pip-status-badge" type="button" id="pipStatusBadge" title="Pip · Click to boop">
          <span class="pip-status-dot is-idle" id="pipStatusDot"></span>
          <span class="pip-status-text" id="pipStatusText">Pip</span>
        </button>
        <button class="pip-badge-btn pip-mic-badge" type="button" id="pipMicBadge" title="Voice control (V)" aria-label="Microphone">
          <i class="ph-fill ph-microphone"></i>
        </button>
        <button class="pip-badge-btn pip-cmd-badge" type="button" id="pipCmdBadge" title="Ask Pip or run command (B)" aria-label="Command">
          <i class="ph-bold ph-terminal-window"></i>
        </button>
      </div>
      <form class="pip-command-badge" id="pipCommandBadge" autocomplete="off" hidden>
        <i class="ph-bold ph-magnifying-glass pip-cmd-icon" aria-hidden="true"></i>
        <input id="pipCmdInput" type="text" maxlength="300" placeholder="Ask Pip or run command…" enterkeyhint="send">
        <kbd class="pip-kbd-esc">ESC</kbd>
        <button class="pip-cmd-send" type="submit" aria-label="Send"><i class="ph-fill ph-paper-plane-right"></i></button>
      </form>
      <div class="mascot-avatar" id="pipAvatar" role="button" tabindex="0" title="Boop Pip!">
        <span class="mascot-float">
          <span class="mascot-squash">
            <span class="mascot-layer mascot-dir"></span>
            <span class="mascot-layer mascot-react"></span>
          </span>
        </span>
        <span class="mascot-shadow" aria-hidden="true"></span>
      </div>`;
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
    function say(text, ms = 3500, actions = []) {
      clearTimeout(bubbleTimer);
      if (!text) {
        bubble.hidden = true;
        bubble.innerHTML = '';
        return;
      }
      bubble.innerHTML = '';
      const textSpan = document.createElement('span');
      textSpan.className = 'pip-bubble-text';
      textSpan.textContent = text;
      bubble.append(textSpan);

      if (Array.isArray(actions) && actions.length > 0) {
        const actionRow = document.createElement('div');
        actionRow.className = 'pip-bubble-actions';
        actions.forEach((act) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'pip-action-chip';
          btn.innerHTML = act.html || act.label || 'Action';
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            act.run?.();
          });
          actionRow.append(btn);
        });
        bubble.append(actionRow);
      }
      bubble.hidden = false;
      if (ms) bubbleTimer = setTimeout(() => {
        bubble.hidden = true;
        bubble.innerHTML = '';
      }, ms);
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
      el.dispatchEvent(new Event('mascot:move'));
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
      chirp('boop');
    }

    /* ---- drag (a click that barely moved is a boop) ---- */
    let drag = null;
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      if (e.target.closest('button, input, form, a, .pip-badges, .pip-command-badge, .pip-action-chip')) return;
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
        setReaction('wink');
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
        play([['delighted', 400]]);
      }
      el.dataset.dragged = wasDrag ? '1' : '';
    };
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
    el.addEventListener('click', (e) => {
      if (e.target.closest('button, input, form, a, .pip-badges, .pip-command-badge, .pip-action-chip')) return;
      if (el.dataset.dragged) {
        el.dataset.dragged = '';
        e.preventDefault();
        return;
      }
      boop();
    });
    el.querySelector('#pipStatusBadge')?.addEventListener('click', (e) => {
      e.stopPropagation();
      boop();
    });
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      setCharacter(el.dataset.character === 'bunny' ? 'hamster' : 'bunny');
      say(`Hi, I'm ${CHARACTERS[el.dataset.character]}!`, 2000);
      document.dispatchEvent(new CustomEvent('assistant:change'));
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

    const MOOD_ALIASES = {
      laughing: 'laugh', haha: 'laugh', giggle: 'giggle', giggling: 'giggle', chuckle: 'giggle',
      smile: 'happy', smiling: 'happy', joy: 'happy', joyful: 'happy', cheerful: 'happy',
      excited: 'surprised', shock: 'surprised', shocked: 'surprised', wow: 'surprised',
      crying: 'cry', weep: 'cry', weeping: 'cry', sob: 'cry', sobbing: 'cry',
      droop: 'sad', depressed: 'sad', gloomy: 'sad', sorrow: 'sad', upset: 'sad',
      mad: 'angry', grumpy: 'angry', furious: 'angry', pout: 'angry', pouting: 'angry',
      curious: 'think', thinking: 'think', ponder: 'think', pondering: 'think', puzzle: 'think', confused: 'think',
      sleeping: 'sleepy', tired: 'sleepy', yawn: 'sleepy', yawning: 'sleepy', nap: 'sleepy',
      blush: 'shy', blushing: 'shy', bashful: 'shy', embarrassed: 'shy',
      celebrate: 'proud', celebrating: 'proud', cheer: 'proud', cheering: 'proud', victory: 'proud',
      dancing: 'dance', party: 'dance', groove: 'dance',
      waving: 'wave', hello: 'wave', hi: 'wave',
      loving: 'love', affectionate: 'love', heart: 'love', adore: 'love', adorably: 'love',
      delighted: 'happy', sparkle: 'proud', wink: 'wink', blinking: 'calm',
    };

    const MOODS = {
      happy: { seq: [['delighted', 900]], anim: 'hop', fx: ['✨', '✨', '💛'] },
      laugh: { seq: [['delighted', 450], ['wink', 220], ['delighted', 450], ['wink', 220], ['delighted', 400]], anim: 'laugh', fx: ['😂', 'ha', 'ha', '🤣'] },
      giggle: { seq: [['wink', 300], ['bashful', 300], ['wink', 300]], anim: 'wiggle', fx: ['hehe', '🤭', 'hee'] },
      love: { seq: [['heart', 1400]], anim: 'pulse', fx: ['❤️', '💕', '💖', '💗'] },
      surprised: { seq: [['surprised', 900]], anim: 'jump', fx: ['❗', '⁉️'] },
      shy: { seq: [['bashful', 1300]], anim: 'sway', fx: ['🌸', '☺️'] },
      think: { seq: [['blink', 160]], anim: 'tilt', fx: ['💭', '🤔'], look: 'up-right', hold: 1400 },
      sad: { seq: [['sleepy', 1800]], anim: 'droop', fx: ['🌧️', '💧'], fall: true, tint: 'sad' },
      cry: { seq: [['bashful', 500], ['sleepy', 1600]], anim: 'sob', fx: ['💧', '💧', '💧', '😢', '💧'], fall: true, tint: 'sad' },
      angry: { seq: [['dizzy', 1100]], anim: 'shake', fx: ['💢', '😤'], tint: 'angry' },
      sleepy: { seq: [['sleepy', 2000]], anim: 'droop', fx: ['💤', 'z', 'Z'] },
      wink: { seq: [['wink', 700]], anim: 'hop', fx: ['😉'] },
      proud: { seq: [['sparkle', 1300]], anim: 'jump', fx: ['⭐', '🏆', '✨', '🌟'] },
      calm: { seq: [['blink', 160]], anim: 'sway', fx: ['🍃'] },
      dance: { seq: [['delighted', 450], ['wink', 450], ['sparkle', 450], ['delighted', 450], ['heart', 450], ['wink', 450], ['delighted', 500]], anim: 'dance', fx: ['🎵', '🎶', '✨', '🎵', '💃', '🎶'] },
      wave: { seq: [['wink', 900]], anim: 'wave', fx: ['👋'] },
    };
    const ANIMS = {
      hop: [[{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-14px) scale(0.96,1.05)', offset: 0.35 }, { transform: 'translateY(0) scale(1.06,0.94)', offset: 0.7 }, { transform: 'translateY(0) scale(1)' }], 600],
      jump: [[{ transform: 'translateY(0)' }, { transform: 'translateY(-30px) scale(0.94,1.08)', offset: 0.4 }, { transform: 'translateY(0) scale(1.1,0.9)', offset: 0.75 }, { transform: 'none' }], 700],
      laugh: [[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({ transform: `translateY(${i % 2 ? -6 : 0}px) rotate(${i % 2 ? 4 : -4}deg)` })).concat({ transform: 'none' }), 1500],
      wiggle: [[{ transform: 'rotate(0)' }, { transform: 'rotate(-8deg)' }, { transform: 'rotate(8deg)' }, { transform: 'rotate(-6deg)' }, { transform: 'rotate(6deg)' }, { transform: 'rotate(0)' }], 900],
      pulse: [[{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], 1200],
      sway: [[{ transform: 'rotate(0)' }, { transform: 'rotate(-5deg) translateX(-3px)' }, { transform: 'rotate(5deg) translateX(3px)' }, { transform: 'rotate(0)' }], 1300],
      tilt: [[{ transform: 'rotate(0)' }, { transform: 'rotate(-10deg)', offset: 0.3 }, { transform: 'rotate(-10deg)', offset: 0.8 }, { transform: 'rotate(0)' }], 1600],
      droop: [[{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(6px) scale(1.04,0.92)', offset: 0.3 }, { transform: 'translateY(6px) scale(1.04,0.92)', offset: 0.85 }, { transform: 'none' }], 2000],
      sob: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => ({ transform: `translateY(${4 + (i % 2) * 3}px) scale(1.03,${i % 2 ? 0.93 : 0.97})` })).concat({ transform: 'none' }), 2000],
      shake: [[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ transform: `translateX(${i % 2 ? 6 : -6}px)` })).concat({ transform: 'none' }), 700],
      // A little routine: sway, sway, hop, hop, a twirl and a squishy landing.
      dance: [[
        { transform: 'rotate(0) translateY(0)' },
        { transform: 'rotate(-14deg) translateY(-10px)', offset: 0.1 },
        { transform: 'rotate(0) translateY(0) scale(1.06,0.94)', offset: 0.18 },
        { transform: 'rotate(14deg) translateY(-10px)', offset: 0.28 },
        { transform: 'rotate(0) translateY(0) scale(1.06,0.94)', offset: 0.36 },
        { transform: 'translateY(-22px) scale(0.95,1.07)', offset: 0.46 },
        { transform: 'translateY(0) scale(1.08,0.92)', offset: 0.54 },
        { transform: 'translateY(-22px) scale(0.95,1.07)', offset: 0.64 },
        { transform: 'translateY(0) scale(1.08,0.92)', offset: 0.72 },
        { transform: 'translateY(-12px) rotate(360deg)', offset: 0.88 },
        { transform: 'translateY(0) rotate(360deg) scale(1.1,0.9)', offset: 0.95 },
        { transform: 'rotate(360deg)' },
      ], 3200],
      spin: [[{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], 800],
      wave: [[{ transform: 'rotate(0)' }, { transform: 'rotate(-12deg)' }, { transform: 'rotate(10deg)' }, { transform: 'rotate(-12deg)' }, { transform: 'rotate(0)' }], 1000],
    };
    function animate(name) {
      if (reduced.matches || !ANIMS[name]) return;
      const [frames, duration] = ANIMS[name];
      squash.animate(frames, { duration, easing: 'ease-in-out' });
    }
    function burst(fx, fall) {
      if (reduced.matches || !fx?.length) return;
      fx.forEach((ch, i) => {
        const s = document.createElement('span');
        s.className = `mascot-fx${fall ? ' is-fall' : ''}`;
        s.textContent = ch;
        s.style.setProperty('--x', `${(i - (fx.length - 1) / 2) * 22 + (Math.random() * 10 - 5)}px`);
        s.style.animationDelay = `${i * 140}ms`;
        el.append(s);
        setTimeout(() => s.remove(), 2200 + i * 140);
      });
    }
    let tintTimer = 0;
    function emote(mood) {
      const m = MOODS[mood];
      if (!m || el.hidden) return;
      wake();
      play(m.seq);
      animate(m.anim);
      burst(m.fx, m.fall);
      chirp(mood);
      if (m.look) {
        setDirection(m.look);
        timers.push(setTimeout(aim, m.hold || 1200));
      }
      clearTimeout(tintTimer);
      el.dataset.mood = m.tint || '';
      if (m.tint) tintTimer = setTimeout(() => (el.dataset.mood = ''), 2600);
    }

    /* ---- moving around on request ---- */
    function glide(x, y) {
      el.classList.add('is-gliding');
      place(x, y, true);
      setTimeout(() => el.classList.remove('is-gliding'), 750);
    }
    function move(where) {
      if (el.hidden) toggle(true);
      wake();
      const r = size();
      const w = (where || '').toLowerCase();
      if (w === 'spin') return animate('spin'), burst(['💫', '✨']);
      if (w === 'jump') return emote('surprised'), animate('jump');
      if (MOODS[w]) return emote(w);
      if (w === 'hide' || w === 'peek') {
        if (reduced.matches) return;
        squash.animate([{ transform: 'none' }, { transform: 'translateY(120%) scale(0.6)', offset: 0.25 }, { transform: 'translateY(120%) scale(0.6)', offset: 0.75 }, { transform: 'none' }], { duration: w === 'peek' ? 1600 : 3000, easing: 'ease-in-out' });
        return timers.push(setTimeout(() => emote('giggle'), w === 'peek' ? 1200 : 2600));
      }
      const spots = {
        'go-left': [16, r.top],
        'go-right': [innerWidth - r.width - 16, r.top],
        'go-top': [r.left, 80],
        'go-bottom': [r.left, innerHeight - r.height - 16],
        'go-center': [(innerWidth - r.width) / 2, (innerHeight - r.height) / 2],
        'go-home': [innerWidth - r.width - 24, innerHeight - r.height - 96],
        'come-here': pointer ? [pointer.x - r.width / 2 + 60, pointer.y - r.height / 2] : [(innerWidth - r.width) / 2, (innerHeight - r.height) / 2],
      };
      const spot = spots[w] || spots[`go-${w}`];
      if (!spot) return;
      glide(spot[0], spot[1]);
      timers.push(setTimeout(() => emote('happy'), 700));
    }

    /* ---- idle life: looks around, yawns, naps; wakes when you come back ---- */
    let lastActive = Date.now();
    let asleep = false;
    function wake() {
      lastActive = Date.now();
      if (asleep) {
        asleep = false;
        el.classList.remove('is-asleep');
        play([['surprised', 500], ['delighted', 600]]);
        say('Oh! Hi again! 👋', 1800);
      }
    }
    ['pointermove', 'keydown', 'pointerdown'].forEach((t) => addEventListener(t, () => (asleep ? wake() : (lastActive = Date.now())), { passive: true }));
    setInterval(() => {
      if (el.hidden || document.hidden || reaction) return;
      const idle = Date.now() - lastActive;
      if (idle > 150000 && !asleep) {
        asleep = true;
        el.classList.add('is-asleep');
        setReaction('sleepy');
        burst(['💤', 'z', 'Z']);
        return;
      }
      if (asleep) return burst(['z']);
      if (idle > 20000 && Math.random() < 0.35) {
        const pick = ['look', 'look', 'wink', 'calm', 'think', 'sleepy'][Math.floor(Math.random() * 6)];
        if (pick === 'look') {
          setDirection(['left', 'right', 'up-left', 'up-right'][Math.floor(Math.random() * 4)]);
          timers.push(setTimeout(aim, 1100));
        } else emote(pick);
      }
    }, 9000);

    /* ---- little voice: synthesized giggles, sobs and boops (no audio files) ---- */
    let actx = null;
    const soundsOn = () => {
      try {
        return JSON.parse(localStorage.getItem('algopulse-assistant') || '{}').sounds !== false;
      } catch {
        return true;
      }
    };
    // Each note: [start s, length s, from Hz, to Hz, volume, wobble Hz].
    const SOUNDS = {
      laugh: [[0, 0.11, 720, 560, 0.16, 0], [0.16, 0.11, 700, 540, 0.15, 0], [0.32, 0.11, 680, 520, 0.14, 0], [0.48, 0.14, 660, 480, 0.12, 0]],
      giggle: [[0, 0.07, 1050, 900, 0.12, 0], [0.1, 0.07, 1100, 940, 0.12, 0], [0.2, 0.07, 1150, 980, 0.11, 0], [0.3, 0.09, 1200, 1000, 0.1, 0]],
      cry: [[0, 0.5, 520, 380, 0.12, 7], [0.6, 0.6, 500, 340, 0.1, 7]],
      sad: [[0, 0.6, 440, 330, 0.1, 4]],
      love: [[0, 0.14, 660, 660, 0.11, 0], [0.16, 0.24, 880, 880, 0.11, 0]],
      surprised: [[0, 0.18, 500, 1100, 0.12, 0]],
      happy: [[0, 0.1, 700, 900, 0.1, 0], [0.12, 0.12, 900, 1200, 0.1, 0]],
      proud: [[0, 0.1, 660, 660, 0.1, 0], [0.12, 0.1, 830, 830, 0.1, 0], [0.24, 0.22, 990, 990, 0.1, 0]],
      angry: [[0, 0.16, 300, 260, 0.12, 18], [0.2, 0.16, 290, 250, 0.12, 18]],
      boop: [[0, 0.08, 900, 1300, 0.09, 0]],
      dance: [[0, 0.1, 660, 660, 0.08, 0], [0.25, 0.1, 880, 880, 0.08, 0], [0.5, 0.1, 740, 740, 0.08, 0], [0.75, 0.1, 990, 990, 0.08, 0]],
    };
    function chirp(name) {
      const notes = SOUNDS[name];
      if (!notes || !soundsOn() || document.hidden) return;
      try {
        actx ||= new AudioContext();
        if (actx.state === 'suspended') actx.resume();
        const t0 = actx.currentTime + 0.02;
        for (const [at, len, f0, f1, vol, wob] of notes) {
          const o = actx.createOscillator();
          const g = actx.createGain();
          o.type = 'triangle';
          o.frequency.setValueAtTime(f0, t0 + at);
          o.frequency.exponentialRampToValueAtTime(f1, t0 + at + len);
          if (wob) {
            const lfo = actx.createOscillator();
            const depth = actx.createGain();
            lfo.frequency.value = wob;
            depth.gain.value = f0 * 0.04;
            lfo.connect(depth).connect(o.frequency);
            lfo.start(t0 + at);
            lfo.stop(t0 + at + len);
          }
          g.gain.setValueAtTime(0.0001, t0 + at);
          g.gain.exponentialRampToValueAtTime(vol, t0 + at + 0.015);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + len);
          o.connect(g).connect(actx.destination);
          o.start(t0 + at);
          o.stop(t0 + at + len + 0.02);
        }
      } catch { /* audio blocked until the first click; silent is fine */ }
    }

    /* ---- feelings that last: "keep laughing" loops until "stop" ---- */
    let feelTimer = 0;
    let feeling = null;
    const lengthOf = (m) => Math.max(m.seq.reduce((n, [, ms]) => n + ms, 0), ANIMS[m.anim]?.[1] || 0, 900);
    function feel(arg) {
      const [raw, mode] = String(arg || '').trim().toLowerCase().split(/\s+/);
      const name = MOOD_ALIASES[raw] || raw;
      clearInterval(feelTimer);
      feelTimer = 0;
      feeling = null;
      el.classList.remove('is-feeling');
      if (!name || name === 'stop' || name === 'normal' || !MOODS[name]) {
        timers.forEach(clearTimeout);
        timers = [];
        el.dataset.mood = '';
        setReaction(null);
        aim();
        return null;
      }
      emote(name);
      if (mode === 'nonstop' || mode === 'loop' || mode === 'forever') {
        feeling = name;
        el.classList.add('is-feeling');
        feelTimer = setInterval(() => {
          if (!el.hidden && !document.hidden) emote(name);
        }, lengthOf(MOODS[name]) + 250);
        // Endless is a lot; it settles down by itself after two minutes.
        setTimeout(() => feeling === name && feel('stop'), 120000);
      }
      return name;
    }

    // Others can send the buddy somewhere (the chat parks it in its corner, then returns it).
    el.addEventListener('mascot:goto', (e) => glide(e.detail.x, e.detail.y));

    function talking(on) {
      el.classList.toggle('is-talking', on);
    }

    window.mascot = {
      el,
      say,
      boop: () => boop(),
      emote,
      feel,
      feeling: () => feeling,
      chirp,
      move,
      talking,
      wake,
      moods: Object.keys(MOODS),
      setCharacter,
      character: () => el.dataset.character,
      name: () => CHARACTERS[el.dataset.character].split(' ')[0],
      listening(on) {
        el.classList.toggle('is-listening', on);
      },
      watching(on) {
        el.classList.toggle('is-watching', on);
      },
      react(rawName, ms = 900) {
        const key = String(rawName || '').trim().toLowerCase();
        const name = MOOD_ALIASES[key] || key;
        if (MOODS[name]) return emote(name);
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

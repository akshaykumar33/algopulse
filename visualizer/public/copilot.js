/**
 * Copilot — "do whatever I say", a live chat beside the buddy, and an air cursor.
 *
 *  - Brain: free speech in any language (or a mix) goes to /api/agent/plan, which returns
 *    a short plan of known studio actions. They run one at a time, narrated by the buddy.
 *    Nothing the model writes ever executes as code in the page — only listed actions run.
 *  - Ears: a chat panel beside the buddy shows your live words, its replies, a mic level
 *    meter, the language it is actually listening in, and each step it runs.
 *  - Hands: with the camera on, the index fingertip drives an on-screen cursor, a pinch
 *    clicks, and an open palm moving up/down scrolls. Signs (👍 ✌️ …) keep working.
 *
 * Loaded after assistant.js; uses the app's globals.
 */
'use strict';

const copilot = (() => {
  const A = () => assistant; // a top-level const in assistant.js: global by name, not on window
  const pet = () => window.mascot;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const LANGUAGES = [
    ['auto', 'Auto-detect'],
    ['en-US', 'English (US)'], ['en-IN', 'English (India) · good for Hinglish'], ['en-GB', 'English (UK)'],
    ['hi-IN', 'हिन्दी Hindi'], ['bn-IN', 'বাংলা Bengali'], ['ta-IN', 'தமிழ் Tamil'], ['te-IN', 'తెలుగు Telugu'],
    ['mr-IN', 'मराठी Marathi'], ['kn-IN', 'ಕನ್ನಡ Kannada'], ['ml-IN', 'മലയാളം Malayalam'], ['gu-IN', 'ગુજરાતી Gujarati'],
    ['pa-IN', 'ਪੰਜਾਬੀ Punjabi'], ['ur-PK', 'اردو Urdu'], ['es-ES', 'Español'], ['fr-FR', 'Français'], ['de-DE', 'Deutsch'],
    ['it-IT', 'Italiano'], ['pt-BR', 'Português (BR)'], ['ru-RU', 'Русский'], ['ar-SA', 'العربية'], ['tr-TR', 'Türkçe'],
    ['id-ID', 'Bahasa Indonesia'], ['ja-JP', '日本語'], ['ko-KR', '한국어'], ['zh-CN', '中文 (普通话)'],
  ];

  /* ======================================================================
     Chat: the whole conversation floats right beside the buddy
     ====================================================================== */
  let hud;
  let log;
  const history = [];
  let liveItem = null;
  let stepsItem = null;
  let idleTimer = 0;

  function langName(code) {
    try {
      return new Intl.DisplayNames([navigator.language || 'en'], { type: 'language' }).of(code);
    } catch {
      return code;
    }
  }

  function mountHud() {
    hud = document.createElement('section');
    hud.className = 'buddy-chat';
    hud.id = 'buddyChat';
    hud.hidden = true;
    hud.setAttribute('aria-label', 'Chat with your buddy');
    hud.innerHTML = `
      <header class="bc-head">
        <span class="vb-state" aria-hidden="true"><i class="ph-fill ph-chat-circle-dots"></i></span>
        <button class="bc-title" type="button" aria-expanded="false" aria-controls="bcLog" title="Open or fold the chat (B)"><strong id="bcName">Pip</strong><span class="bc-status" id="bcStatus"></span></button>
        <span class="bc-unread" id="bcUnread" hidden></span>
        <span class="vb-meter" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
        <button class="bc-icon" type="button" id="bcMic" aria-pressed="false" title="Talk to me (V)" aria-label="Microphone"><i class="ph-fill ph-microphone"></i></button>
        <button class="bc-icon" type="button" id="bcClose" aria-label="Close chat" title="Close (B)"><i class="ph-bold ph-x"></i></button>
      </header>
      <ol class="bc-log" id="bcLog" aria-live="polite"></ol>
      <form class="bc-form" id="bcForm" autocomplete="off">
        <label class="visually-hidden" for="bcInput">Message your buddy</label>
        <input id="bcInput" type="text" maxlength="500" placeholder="Type, or just talk…" enterkeyhint="send">
        <button class="bc-send" type="submit" aria-label="Send"><i class="ph-fill ph-paper-plane-right"></i></button>
      </form>`;
    document.body.append(hud);
    log = hud.querySelector('#bcLog');
    hud.querySelector('#bcClose').addEventListener('click', (e) => {
      e.stopPropagation();
      closeChat();
    });
    const toggleDock = () => {
      setCollapsed(expanded());
      pet()?.el.classList.toggle('has-chat', expanded());
      if (expanded()) hud.querySelector('#bcInput').focus({ preventScroll: true });
      scheduleIdle();
    };
    hud.querySelector('.bc-title').addEventListener('click', toggleDock);
    hud.querySelector('#bcMic').addEventListener('click', (e) => {
      e.stopPropagation();
      A().voice.toggle();
    });
    hud.querySelector('#bcForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = hud.querySelector('#bcInput');
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      say('me', text);
      A().interpret(text);
    });
    hud.addEventListener('focusin', scheduleIdle);
    pet()?.el.addEventListener('mascot:move', position);
    pet()?.el.addEventListener('dblclick', () => openChat(true));
    addEventListener('resize', position);
    addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() !== 'b' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest('input, textarea, select, [contenteditable]')) return;
      if ([...document.querySelectorAll('dialog')].some((d) => d.matches(':modal'))) return;
      if (expanded()) closeChat();
      else openChat(true);
    });
    document.addEventListener('assistant:change', syncHud);
    mountCaption();
    syncHud();
  }

  // Sit beside the buddy (left of it, else above or below); dock to the bottom on phones.
  function position() {
    if (!hud || hud.hidden) return;
    const m = pet()?.el;
    const docked = !m || m.hidden || innerWidth < 640;
    hud.classList.toggle('is-docked', docked);
    if (docked) {
      hud.style.left = hud.style.top = '';
      return;
    }
    const r = m.getBoundingClientRect();
    const w = hud.offsetWidth;
    const h = hud.offsetHeight;
    let x = r.left - w - 12;
    let y = r.bottom - h;
    if (x < 8) {
      x = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8);
      y = r.top - h - 12;
      if (y < 72) y = r.bottom + 12;
    }
    y = Math.min(Math.max(72, y), innerHeight - h - 8);
    hud.style.left = `${x}px`;
    hud.style.top = `${y}px`;
    hud.dataset.side = x + w <= r.left ? 'left' : 'stack';
  }

  // The chat is a dock: a small pill (status, mic level, unread count) that opens into the
  // full conversation on click, B or a double-click on the buddy, and folds itself away
  // again after a quiet spell. Live speech shows in the caption at the top instead.
  let unread = 0;
  function setCollapsed(on) {
    if (!hud) return;
    hud.classList.toggle('is-collapsed', on);
    hud.querySelector('.bc-title').setAttribute('aria-expanded', String(!on));
    if (!on) {
      unread = 0;
      paintUnread();
      scrollLog();
    }
    position();
  }
  function paintUnread() {
    const b = hud?.querySelector('#bcUnread');
    if (!b) return;
    b.textContent = unread > 9 ? '9+' : String(unread);
    b.hidden = !unread;
  }
  const expanded = () => hud && !hud.hidden && !hud.classList.contains('is-collapsed');

  function openChat(byHand) {
    if (!hud) return;
    const was = hud.hidden;
    if (byHand === true) {
      hud.hidden = false;
      setCollapsed(false);
    } else if (was) {
      hud.hidden = false;
      setCollapsed(true);
    }
    pet()?.el.classList.toggle('has-chat', expanded());
    if (was && !log.children.length) {
      const li = document.createElement('li');
      li.className = 'bc-msg pip';
      li.textContent = `Hi! I'm ${pet()?.name?.() || 'Pip'} 💛 Talk or type to me. I can open problems, run tests, write code, tell jokes, dance…`;
      log.append(li);
    }
    position();
    if (byHand === true) hud.querySelector('#bcInput').focus({ preventScroll: true });
    scheduleIdle();
  }
  function closeChat() {
    if (!hud) return;
    if (A().voice.on) setCollapsed(true);
    else hud.hidden = true;
    pet()?.el.classList.remove('has-chat');
  }
  // Folds into the pill after 12 s without activity (never while you type); with the mic
  // off, the pill itself goes away after another 30 s.
  function scheduleIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (busy || hud.contains(document.activeElement) || hud.matches(':hover')) return scheduleIdle();
      if (expanded()) {
        setCollapsed(true);
        pet()?.el.classList.remove('has-chat');
        return scheduleIdle();
      }
      if (!A().voice.on && !unread) hud.hidden = true;
    }, expanded() ? 12000 : 30000);
  }

  /* ---- live caption: what you are saying and what the buddy answers, on top ---- */
  let cap = null;
  let capTimer = 0;
  let lastClip = null;
  let lastHeardText = '';
  function nativeName(code) {
    try {
      return new Intl.DisplayNames([code], { type: 'language' }).of(code);
    } catch {
      return code;
    }
  }
  function mountCaption() {
    cap = document.createElement('section');
    cap.className = 'live-cap';
    cap.id = 'liveCap';
    cap.hidden = true;
    cap.setAttribute('aria-label', 'Live conversation');
    cap.innerHTML = `
      <div class="lc-row lc-me">
        <span class="lc-ic" aria-hidden="true"><i class="ph-fill ph-microphone"></i></span>
        <div class="lc-text" aria-live="polite"><p class="lc-said"></p><p class="lc-meaning" hidden></p></div>
        <span class="lc-lang" hidden></span>
        <button class="lc-btn" type="button" data-cap="edit" title="Fix what I heard" aria-label="Fix what I heard" hidden><i class="ph-bold ph-pencil-simple"></i></button>
        <button class="lc-btn" type="button" data-cap="retry" title="Hear it again" aria-label="Hear it again" hidden><i class="ph-bold ph-arrow-clockwise"></i></button>
      </div>
      <div class="lc-row lc-pip" hidden>
        <span class="lc-face" aria-hidden="true"></span>
        <div class="lc-text" aria-live="polite"><p class="lc-reply"></p><ol class="vb-steps lc-steps"></ol></div>
      </div>
      <button class="lc-btn lc-close" type="button" data-cap="close" title="Hide" aria-label="Hide caption"><i class="ph-bold ph-x"></i></button>`;
    document.body.append(cap);
    cap.addEventListener('click', (e) => {
      const b = e.target.closest('[data-cap]');
      if (!b) return;
      if (b.dataset.cap === 'close') return capHide();
      if (b.dataset.cap === 'retry' && lastClip && !busy) return handle({ audio: lastClip, retry: true });
      if (b.dataset.cap === 'edit') {
        openChat(true);
        const input = hud.querySelector('#bcInput');
        input.value = lastHeardText;
        input.focus();
        input.select();
        capHide();
      }
    });
    cap.addEventListener('pointerenter', () => clearTimeout(capTimer));
    cap.addEventListener('pointerleave', () => capLater());
  }
  const capEl = (sel) => cap.querySelector(sel);
  function capShow() {
    clearTimeout(capTimer);
    // Sit just under the header, which wraps onto two rows on phones.
    const bar = document.querySelector('.topbar')?.getBoundingClientRect();
    cap.style.top = `${Math.max(8, (bar && bar.bottom > 0 ? bar.bottom : 0) + 8)}px`;
    cap.hidden = false;
    cap.classList.remove('is-leaving');
  }
  function capHide() {
    clearTimeout(capTimer);
    if (!cap || cap.hidden) return;
    cap.classList.add('is-leaving');
    capTimer = setTimeout(() => (cap.hidden = true), 220);
  }
  function capLater(ms = 7000) {
    clearTimeout(capTimer);
    capTimer = setTimeout(() => !busy && !cap.matches(':hover') && capHide(), ms);
  }
  function capMe(state, text = '', lang = '', meaning = '') {
    if (!cap) return;
    capShow();
    const row = capEl('.lc-me');
    row.dataset.state = state; // speaking | sent | heard
    const said = capEl('.lc-said');
    if (state === 'speaking') {
      said.innerHTML = '<span class="bc-wave"><i></i><i></i><i></i><i></i></span><span class="lc-hint">Listening…</span>';
      capEl('.lc-pip').hidden = true;
    } else if (state === 'sent') {
      said.innerHTML = '<span class="bc-wave"><i></i><i></i><i></i><i></i></span><span class="lc-hint">Understanding…</span>';
    } else {
      said.textContent = text;
    }
    const m = capEl('.lc-meaning');
    m.textContent = meaning ? `“${meaning}”` : '';
    m.hidden = !meaning;
    const chip = capEl('.lc-lang');
    chip.textContent = lang ? nativeName(lang) : '';
    chip.hidden = !lang;
    const done = state === 'heard';
    capEl('[data-cap="edit"]').hidden = !done;
    capEl('[data-cap="retry"]').hidden = !done || !lastClip;
  }
  function capPip(text, thinking) {
    if (!cap) return;
    capShow();
    const row = capEl('.lc-pip');
    row.hidden = false;
    capEl('.lc-face').style.backgroundImage = `url("mascots/${pet()?.character?.() || 'hamster'}-directions.webp")`;
    const p = capEl('.lc-reply');
    if (thinking) p.innerHTML = '<span class="bc-typing lc-dots"><i></i><i></i><i></i></span>';
    else p.textContent = text;
    capEl('.lc-steps').innerHTML = '';
  }

  function scrollLog() {
    log.scrollTop = log.scrollHeight;
  }

  function say(who, text, opts = {}) {
    if (!hud || !text) return null;
    openChat();
    if (who === 'me') {
      liveItem?.remove();
      liveItem = null;
    }
    const li = document.createElement('li');
    li.className = `bc-msg ${who}${opts.error ? ' is-error' : ''}`;
    li.textContent = text;
    log.append(li);
    if (!expanded() && who === 'pip') {
      unread++;
      paintUnread();
    }
    history.push({ who, text });
    if (history.length > 24) history.shift();
    while (log.children.length > 40) log.firstElementChild.remove();
    scrollLog();
    position();
    scheduleIdle();
    return li;
  }

  function typing(on) {
    log?.querySelector('.bc-typing')?.remove();
    if (!on || !log) return;
    const li = document.createElement('li');
    li.className = 'bc-msg pip bc-typing';
    li.setAttribute('aria-label', 'thinking');
    li.innerHTML = '<i></i><i></i><i></i>';
    log.append(li);
    scrollLog();
  }

  function statusText(kind) {
    if (kind === 'listening' && A().voice.mode === 'ai') return `Listening · any language${lastHeard ? ` · last heard ${langName(lastHeard)}` : ''}`;
    if (kind === 'listening') {
      const fixed = A().load().lang && A().load().lang !== 'auto';
      return `Listening · ${langName(A().voice.lang())}${fixed ? '' : ' (auto)'}`;
    }
    if (kind === 'thinking') return 'Thinking…';
    return A().voice.supported ? 'Mic off · type, or press V' : 'Type to chat';
  }

  function setState(kind, text) {
    if (!hud) return;
    hud.dataset.state = kind; // idle | listening | thinking | doing | error
    const icon = { listening: 'ph-microphone', thinking: 'ph-brain', doing: 'ph-lightning', error: 'ph-warning' }[kind] || 'ph-chat-circle-dots';
    hud.querySelector('.vb-state').innerHTML = `<i class="ph-fill ${icon}"></i>`;
    hud.querySelector('#bcStatus').textContent = text ?? statusText(kind);
    position(); // the pill's width follows its text; keep it clear of the buddy
  }

  function syncHud() {
    if (!hud) return;
    const on = A().voice.on;
    const mic = hud.querySelector('#bcMic');
    mic.setAttribute('aria-pressed', String(on));
    mic.classList.toggle('is-on', on);
    hud.querySelector('#bcName').textContent = pet()?.name?.() || 'Pip';
    if (on) {
      openChat();
      startMeter();
    } else stopMeter();
    if (!busy) setState(on ? 'listening' : 'idle');
  }

  // Live words as they are recognised; the final sentence becomes your chat message.
  function heard(text, final) {
    if (!hud || !text) return;
    lastClip = null;
    if (final) {
      lastHeardText = text;
      capMe('heard', text);
      return void say('me', text);
    }
    openChat();
    capMe('live', `${text}…`);
  }

  // The buddy answers: in the chat, with a face to match, and out loud when talk-back is on.
  // opts.ai: a real conversational reply, worth the AI voice (it has a small daily quota);
  // quick confirmations use the browser voice.
  function reply(text, mood = 'happy', lang, opts = {}) {
    if (!text) return;
    say('pip', text);
    if (cap && !cap.hidden) {
      capPip(text);
      capLater();
    }
    if (mood) pet()?.react(mood, 900);
    A().speak(text, lang, mood, { ai: Boolean(opts.ai) });
  }

  /* ---- microphone level meter (Web Audio, local only) ---- */
  let meter = null;
  async function startMeter() {
    if (meter || !navigator.mediaDevices?.getUserMedia) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const bars = [...hud.querySelectorAll('.vb-meter i')];
      meter = { stream, ctx, raf: 0 };
      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let peak = 0;
        for (const v of data) peak = Math.max(peak, Math.abs(v - 128));
        const level = Math.min(1, peak / 50);
        bars.forEach((b, i) => {
          const h = Math.max(0.15, Math.min(1, level * (1.2 - Math.abs(i - 2) * 0.22)));
          b.style.transform = `scaleY(${h})`;
        });
        meter.raf = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      /* the meter is a nicety; recognition still works without it */
    }
  }
  function stopMeter() {
    if (!meter) return;
    cancelAnimationFrame(meter.raf);
    meter.stream.getTracks().forEach((t) => t.stop());
    meter.ctx.close();
    meter = null;
  }

  /* ======================================================================
     Brain: plan + execute
     ====================================================================== */
  let busy = false;
  let lastLang = 'en-US';

  function context() {
    return { date: state.date, file: state.file, tab: state.tab, codeMode: state.codeMode };
  }

  const setTab = (t) => {
    showTab(t);
    return sleep(250);
  };

  // Each step returns a promise so plans run strictly in order.
  const STEPS = {
    'next-problem': () => (stepProblem(1), sleep(300)),
    'prev-problem': () => (stepProblem(-1), sleep(300)),
    'open-problem': async (arg) => {
      const q = arg.trim().toLowerCase();
      const p = state.problems.find((x) => x.id.toLowerCase() === q || x.file.toLowerCase() === q) || A().problemByName(arg);
      if (!p) throw new Error(`I couldn't find “${arg}” in this day's set`);
      selectProblem(p.file);
      await sleep(350);
    },
    'open-day': async (arg) => {
      const a = arg.trim().toLowerCase();
      const days = state.days.map((d) => d.date);
      let target = a;
      if (a === 'today') target = days.find((d) => d === localTodayIso()) || days[0];
      else if (a === 'latest') target = days[0];
      else if (a === 'yesterday') {
        const y = new Date(Date.now() - 86400000);
        target = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, '0')}-${String(y.getDate()).padStart(2, '0')}`;
      }
      if (!days.includes(target)) throw new Error(`there is no practice set for ${arg}`);
      await loadDay(target, { keepTab: state.tab });
    },
    'tab-story': () => setTab('story'),
    'tab-walkthrough': () => setTab('walkthrough'),
    'tab-diagrams': () => setTab('diagrams'),
    'tab-visualize': () => setTab('visualize'),
    'tab-code': () => setTab('code'),
    'tab-tests': () => setTab('tests'),
    'next-tab': () => (A().ACTIONS['next-tab'].run(), sleep(250)),
    'prev-tab': () => (A().ACTIONS['prev-tab'].run(), sleep(250)),
    search: async (arg) => {
      const box = document.getElementById('search');
      box.value = arg;
      box.dispatchEvent(new Event('input', { bubbles: true }));
    },
    'filter-todo': async () => document.querySelector('input[name=status][value=todo]')?.click(),
    'filter-all': async () => document.querySelector('input[name=status][value=all]')?.click(),
    'run-tests': async () => {
      await setTab('tests');
      await runTests();
      const run = state.runs.get(state.file);
      if (run) {
        const pass = run.results.filter((r) => r.verdict === 'AC').length;
        A().speak(`${pass} of ${run.results.length} tests passed`, lastLang);
      }
    },
    'run-custom': async (arg) => {
      await setTab('tests');
      document.getElementById('pgInput').value = arg.replace(/\\n/g, '\n');
      document.getElementById('pgExpected').value = '';
      await runPlayground({ preventDefault() {} });
    },
    'verify-day': () => verifyDay(),
    'create-attempt': async () => {
      const p = current();
      if (p.attempt) return;
      const res = await api('/api/attempt', { date: state.date, file: p.file });
      p.attempt = { path: res.path, code: res.code };
      state.codeMode = 'attempt';
      renderCode(p);
      renderTests(p);
    },
    'write-code': async (arg) => {
      const p = current();
      await setTab('code');
      setState('doing', `Writing code for ${displayName(p.name)}…`);
      const res = await api('/api/agent/code', {
        date: state.date,
        file: p.file,
        instructions: arg,
        currentCode: state.codeMode === 'attempt' && document.getElementById('editor') ? document.getElementById('editor').value : undefined,
      });
      p.attempt = { path: res.path, code: res.code };
      if (res.revealed) {
        p.locked = false;
        p.revealed = true;
      }
      state.codeMode = 'attempt';
      document.querySelector('input[name=codeMode][value=attempt]').checked = true;
      state.editorDirty = false;
      renderCode(p);
      if (res.run) {
        state.runs.set(p.file, { source: 'attempt', ...res.run });
        renderTests(p);
        const pass = res.run.results.filter((r) => r.verdict === 'AC').length;
        toast(`Code written to ${res.path} · ${pass}/${res.run.results.length} samples pass${res.backup ? ' · say “undo” to restore' : ''}`);
      }
      if (res.revealed && !res.revealed.wasSolved) refreshProgress();
    },
    'undo-code': async () => {
      const p = current();
      const res = await api('/api/agent/undo', { date: state.date, file: p.file });
      p.attempt = { path: res.path, code: res.code };
      state.codeMode = 'attempt';
      renderCode(p);
      toast('Restored your previous code.');
    },
    'save-code': () => saveAttempt(),
    'open-coach': async () => openCoach(),
    'ask-coach': async (arg) => {
      openCoach();
      await ask(arg);
    },
    hint: async () => {
      openCoach();
      askMode('hint');
    },
    explain: async () => {
      openCoach();
      askMode('explain');
    },
    review: async () => {
      openCoach();
      askMode('review');
    },
    'reveal-solution': async () => {
      await setTab('code');
      document.querySelector('input[name=codeMode][value=reference]')?.click();
      await sleep(200);
      const btn = document.querySelector('[data-reveal]');
      if (btn) await revealReference(btn);
    },
    'read-story': async () => A().readStory(),
    'generate-story': async () => {
      await setTab('story');
      const btn = document.querySelector('[data-story]');
      if (btn) await generateStory(btn);
    },
    'open-guide': async () => openGuide('welcome'),
    'start-tour': async () => tour.start(),
    'set-theme': async (arg) => {
      const want = /dark|night/i.test(arg) ? 'dark' : 'light';
      if (activeTheme() !== want) toggleTheme();
    },
    'scroll-down': async () => A().ACTIONS['scroll-down'].run(),
    'scroll-up': async () => A().ACTIONS['scroll-up'].run(),
    'scroll-top': async () => A().ACTIONS['scroll-top'].run(),
    close: async () => A().ACTIONS.close.run(),
    'toggle-pip': async () => pet()?.toggle(),
    'set-character': async (arg) => pet()?.setCharacter(/bun|rabbit/i.test(arg) ? 'bunny' : 'hamster'),
    'stop-voice': async () => A().voice.stop(),
    'set-language': async (arg) => A().voice.setLanguage(arg),
    say: async () => {},
    feel: async (arg) => pet()?.feel(arg),
    buddy: async (arg) => {
      pet()?.move(arg.trim().toLowerCase());
      await sleep(900);
    },
  };

  function localTodayIso() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  const STEP_LABEL = (s) => {
    const names = { 'open-problem': 'Open', 'open-day': 'Go to day', 'write-code': 'Write code', 'ask-coach': 'Ask coach', search: 'Search', 'run-custom': 'Run input', 'set-language': 'Language', say: 'Say' };
    return `${names[s.action] || s.action.replace(/-/g, ' ')}${s.arg && s.action !== 'say' && s.action !== 'write-code' ? ` · ${s.arg.slice(0, 40)}` : ''}`;
  };

  function renderSteps(steps, at, failed = -1) {
    if (!log || !steps.length) return;
    if (!stepsItem || !stepsItem.isConnected) {
      stepsItem = document.createElement('li');
      stepsItem.className = 'bc-msg pip bc-steps-msg';
      stepsItem.innerHTML = '<ol class="vb-steps"></ol>';
      log.append(stepsItem);
    }
    stepsItem.firstElementChild.innerHTML = steps
      .map((s, i) => `<li class="${i < at ? 'done' : i === at ? (failed === i ? 'failed' : 'now') : ''}">${escapeHtml(STEP_LABEL(s))}</li>`)
      .join('');
    if (cap && !cap.hidden) capEl('.lc-steps').innerHTML = stepsItem.firstElementChild.innerHTML;
    scrollLog();
  }

  /* ---- small talk that needs no AI: instant, works offline ---- */
  const JOKES = [
    'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
    'I told my code a joke… it threw an exception. 😆',
    'Why was the array so calm? It had everything in order. Well, after sorting. 😌',
    'A binary search walks into a bar… then the middle of the bar… then the middle of that. 🍹',
    "Why did the hamster fail the interview? Kept running in O(∞) circles on the wheel! 🐹",
    'My favourite data structure? A heap — of snacks. 🥜',
    "Recursion joke: to understand it, first understand recursion. 😄",
    'Why did the stack break up with the queue? It wanted someone who puts it first! 💔',
  ];
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const NONSTOP = /\b(keep (on )?|non ?stop|continuous(ly)?|forever|(do not|dont) stop|all the time|again and again|without stopping)/;
  const FEEL_WORDS = [[/laugh|haha|lol/, 'laugh'], [/giggl|hehe/, 'giggle'], [/cry|crying|weep/, 'cry'], [/danc/, 'dance'], [/sad/, 'sad'], [/angry|mad|grumpy/, 'angry'], [/love|heart/, 'love'], [/sleep|nap|yawn/, 'sleepy'], [/happy|smil/, 'happy'], [/shy|blush/, 'shy'], [/wav/, 'wave']];
  const feelWord = (t) => FEEL_WORDS.find(([re]) => re.test(t))?.[1] || null;
  const NONSTOP_LINES = { laugh: 'Hahaha! I can’t stop! 😂', giggle: 'Hehehe, hehehe! 🤭', cry: 'Waaah! 😭 Say “stop” to cheer me up!', dance: 'Party time, non-stop! 💃', sad: 'Sooo sad… 🥺', angry: 'Grrr, grrr! 😤', love: 'Love love love! 💕', sleepy: 'Zzz… 💤', happy: 'So happy! 😄', shy: 'Hehe… 🙈', wave: 'Hi hi hi! 👋' };
  const TALK = [
    [/^(stop|stop it|stop that|enough|be normal|calm down|relax|chill)( please)?$|^stop (laughing|crying|dancing|giggling|being sad|being angry|being mad)\b/, () => ['Okay okay… I’m calm now 😌', 'calm', null, 'stop']],
    [NONSTOP, (m, t) => {
      const mood = feelWord(t);
      return mood ? [NONSTOP_LINES[mood] || 'Here I go, non-stop!', mood, null, mood + ' nonstop'] : null;
    }],
    [/\b(tell|say|crack)\b.*\bjoke\b|\bjoke\b|make me laugh|funny/, () => [pick(JOKES), 'laugh']],
    [/^(laugh|lol|haha+|hehe+|giggle)\b/, () => ['Hehehe! 🤭', 'giggle']],
    [/\b(dance|party|groove)\b/, () => ['Watch my moves! 💃', 'dance', 'dance']],
    [/\b(jump|hop)\b/, () => ['Boing! 🐰', 'surprised', 'jump']],
    [/\b(spin|twirl|turn around)\b/, () => ['Wheee! 💫', 'happy', 'spin']],
    [/\b(come here|come closer|come to me)\b/, () => ['Coming! 🏃', 'happy', 'come-here']],
    [/\bgo (to the )?(left|right|top|bottom|center|centre|home)\b/, (m) => ['On my way!', 'happy', `go-${m[2] === 'centre' ? 'center' : m[2]}`]],
    [/^(hide|peekaboo|peek a boo|play hide and seek)$/, () => ['Peekaboo! 🙈', 'giggle', 'hide']],
    [/\b(wave|say hi|hello|hi|hey|namaste)\b$/, () => [`Hi hi! 👋 I'm ${pet()?.name?.() || 'Pip'}. What shall we solve today?`, 'wave', 'wave']],
    [/\bhow are you\b|\bhow r u\b|\bkaise ho\b/, () => ["I'm super, thanks for asking! Ready to crunch some problems? 💪", 'happy']],
    [/\b(i am|i'm|im|feeling) (sad|down|upset|tired|stuck|depressed|bored)\b/, () => ["Aww, come here… 🫂 It's okay. Let's take one tiny step together — want a hint?", 'cry']],
    [/^(cry|be sad|can you cry)\b/, () => ['Waaah… 😢 okay okay, I am fine now!', 'cry']],
    [/\b(i love you|love you|you are cute|you're cute|cutie)\b/, () => ['Aww! I love you too! 💕', 'love']],
    [/^(good job|well done|great|awesome|thank you|thanks)( so much)?( pip| bun| buddy)?$/, () => ['Hehe, thank you! You are the best! 🌟', 'proud']],
    [/\b(take a nap|nap time|good night)\b/, () => ['Yawn… a tiny nap, then back to code. 💤', 'sleepy']],
    [/^(be angry|get angry|are you angry|are you mad)\b/, () => ['Grrr! …just kidding, I could never be mad at you. 😤💛', 'angry']],
  ];
  function talkFor(raw) {
    const t = A().normalize(raw).replace(/^(hey |ok |okay )?(pip|bun|bunny|buddy)[, ]*/, '');
    for (const [re, make] of TALK) {
      const m = t.match(re);
      const out = m && make(m, t);
      if (out) return out;
    }
    return null;
  }
  const talkMatch = (raw) => Boolean(talkFor(raw));
  function smallTalk(raw) {
    const out = talkFor(raw);
    if (!out) return false;
    const [text, mood, move, feel] = out;
    if (feel) pet()?.feel(feel);
    reply(text, feel ? null : mood);
    if (move) setTimeout(() => pet()?.move(move), 150);
    return true;
  }
  function offline(raw) {
    reply(`I heard “${raw}”, but my AI brain is not set up yet, so I only know simple things: “next problem”, “run tests”, “tell me a joke”, “dance”… Add a key in Guide → Choose your AI and I can do anything!`, 'shy');
  }

  // AI ear: a "you are speaking" bubble while a sentence is being recorded. No guessed
  // words — the real transcript replaces it once the AI has heard the clip.
  let lastHeard = null;
  // AI ear: the caption shows that you are speaking, then that it is being understood.
  // No guessed words: the real transcript replaces it once the AI has heard the clip.
  function hearing(on, kept) {
    if (!hud) return;
    if (on) {
      openChat();
      capMe('speaking');
    } else if (!kept) {
      if (capEl('.lc-me').dataset.state === 'speaking') capHide();
    } else {
      capMe('sent');
      // A quick local command may win and drop the clip; never leave the caption hanging.
      setTimeout(() => !busy && capEl('.lc-me').dataset.state === 'sent' && capHide(), 6000);
    }
  }
  function dropLive() {
    liveItem?.remove();
    liveItem = null;
    if (cap && !cap.hidden && capEl('.lc-me').dataset.state !== 'heard') capHide();
  }

  const handleAudio = (clip) => handle({ audio: { data: clip.data, mime: clip.mime } });

  async function handle(input) {
    if (busy) {
      if (typeof input === 'string') reply('One moment, still on the last thing…', 'shy');
      else dropLive();
      return;
    }
    const spoken = typeof input !== 'string';
    busy = true;
    setState('thinking', spoken ? 'Listening to you…' : undefined);
    typing(true);
    if (spoken) {
      lastClip = input.audio;
      capMe('sent');
    }
    if (spoken || (cap && !cap.hidden)) capPip('', true);
    pet()?.react('think');
    let plan;
    const t0 = performance.now();
    try {
      const past = (spoken ? history : history.slice(0, -1)).slice(-8);
      const ctx = { ...context(), buddy: pet()?.el.getAttribute('aria-label')?.split('.')[0], history: past };
      plan = await api('/api/agent/plan', spoken ? { audio: input.audio, ctx } : { utterance: input, ctx });
    } catch (err) {
      busy = false;
      typing(false);
      if (spoken) dropLive();
      setState('error', 'Could not reach the AI');
      say('pip', `Sorry, my brain hiccuped: ${err.message}`, { error: true });
      pet()?.react('sad');
      return;
    }
    typing(false);
    if (spoken) {
      // Silence, a cough or background chatter: drop it quietly.
      if (!plan.heard?.trim()) {
        dropLive();
        busy = false;
        setState(A().voice.on ? 'listening' : 'idle');
        return;
      }
      say('me', plan.heard);
      lastHeard = plan.heardLang || plan.lang;
      lastHeardText = plan.heard;
      const english = /^en\b/i.test(lastHeard);
      capMe('heard', plan.heard, lastHeard, english ? '' : plan.meaning);
    }
    lastLang = plan.lang || lastLang;
    A().voice.detected(plan.lang);
    const sayStep = plan.steps.find((s) => s.action === 'say');
    const feels = plan.steps.some((s) => s.action === 'feel');
    reply(plan.reply || sayStep?.arg || '👍', feels ? null : plan.mood || 'happy', lastLang, { ai: true });
    A().log(`Voice “${spoken ? plan.heard : input}” → ${plan.steps.map((s) => s.action).join(', ') || 'chat'} (${Math.round(performance.now() - t0)} ms)`);

    const steps = plan.steps.filter((s) => s.action !== 'say' || !plan.reply);
    stepsItem = null;
    renderSteps(steps, 0);
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      setState('doing', STEP_LABEL(s));
      renderSteps(steps, i);
      try {
        await STEPS[s.action]?.(s.arg || '');
        await sleep(250);
      } catch (err) {
        renderSteps(steps, i, i);
        setState('error', 'Got stuck');
        say('pip', `I got stuck: ${err.message}`, { error: true });
        pet()?.react('sad');
        busy = false;
        return;
      }
    }
    renderSteps(steps, steps.length);
    busy = false;
    setState(A().voice.on ? 'listening' : 'idle');
    if (cap && !cap.hidden) capLater();
  }

  /* ======================================================================
     Air cursor
     ====================================================================== */
  const cursor = {
    el: null,
    on: false,
    x: innerWidth / 2,
    y: innerHeight / 2,
    pinching: false,
    pinchStart: 0,
    lastClick: 0,
    palmY: null,
    hover: null,

    settings() {
      const s = A().load();
      return { enabled: s.airCursor === true, sensitivity: s.cursorSensitivity || 1.6, smoothing: s.cursorSmoothing ?? 0.35 };
    },
    mount() {
      this.el = document.createElement('div');
      this.el.className = 'air-cursor';
      this.el.setAttribute('aria-hidden', 'true');
      this.el.innerHTML = '<span class="ac-ring"></span><span class="ac-dot"></span>';
      this.el.hidden = true;
      document.body.append(this.el);
      A().gestures.listeners.add((res) => this.frame(res));
      document.addEventListener('assistant:change', () => {
        if (!A().gestures.on) this.hide();
        this.syncSuppress();
      });
      this.syncSuppress();
    },
    // While the cursor is enabled, pointing, open palm and fist belong to the cursor.
    syncSuppress() {
      const sup = A().gestures.suppress;
      ['Pointing_Up', 'Open_Palm', 'Closed_Fist'].forEach((n) => (this.settings().enabled ? sup.add(n) : sup.delete(n)));
    },
    hide() {
      this.on = false;
      if (this.el) this.el.hidden = true;
      this.setHover(null);
    },
    setHover(target) {
      if (this.hover === target) return;
      this.hover?.classList.remove('air-hover');
      this.hover = target;
      this.hover?.classList.add('air-hover');
    },
    frame(res) {
      const cfg = this.settings();
      const lm = res.landmarks?.[0];
      if (!cfg.enabled || !lm || A().gestures.recording) return this.hide();
      this.on = true;
      this.el.hidden = false;

      // Map the middle of the camera frame to the whole screen (mirrored), so small
      // hand movements reach the edges; then smooth to remove jitter.
      const s = cfg.sensitivity;
      const tip = lm[8];
      const tx = Math.min(1, Math.max(0, (0.5 - (tip.x - 0.5) * s)));
      const ty = Math.min(1, Math.max(0, (0.5 + (tip.y - 0.5) * s)));
      const k = 1 - cfg.smoothing;
      this.x += (tx * innerWidth - this.x) * k;
      this.y += (ty * innerHeight - this.y) * k;
      this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;

      const palm = Math.hypot(lm[9].x - lm[0].x, lm[9].y - lm[0].y) || 1;
      const pinch = Math.hypot(lm[4].x - lm[8].x, lm[4].y - lm[8].y) / palm;
      const fingersUp = [8, 12, 16, 20].filter((t) => lm[t].y < lm[t - 2].y).length;
      const target = document.elementFromPoint(this.x, this.y)?.closest('button, a[href], [role=tab], input, select, textarea, label, summary, .problem-item, [data-reveal], [tabindex]:not([tabindex="-1"])');
      this.setHover(target || null);

      // Open palm (4 fingers up) moving up/down scrolls whatever is under the cursor.
      if (fingersUp >= 4 && pinch > 0.6) {
        const y = lm[0].y;
        if (this.palmY !== null) {
          const dy = (y - this.palmY) * innerHeight * 2.2;
          if (Math.abs(dy) > 2) {
            const scroller = scrollableAt(this.x, this.y);
            scroller.scrollBy({ top: dy });
          }
        }
        this.palmY = y;
        this.el.dataset.mode = 'scroll';
        return;
      }
      this.palmY = null;
      this.el.dataset.mode = 'point';

      // Pinch (thumb tip to index tip) clicks; hold the pinch to keep the press.
      const now = performance.now();
      if (pinch < 0.32) {
        if (!this.pinching) {
          this.pinching = true;
          this.pinchStart = now;
          this.el.dataset.mode = 'pinch';
          if (now - this.lastClick > 450 && target) {
            this.lastClick = now;
            click(target, this.x, this.y);
          }
        } else this.el.dataset.mode = 'pinch';
      } else if (pinch > 0.42) {
        this.pinching = false;
      }
    },
  };

  function scrollableAt(x, y) {
    for (let el = document.elementFromPoint(x, y); el && el !== document.body; el = el.parentElement) {
      const s = getComputedStyle(el);
      if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 4) return el;
    }
    return window;
  }

  function click(target, x, y) {
    const ripple = document.createElement('span');
    ripple.className = 'air-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.append(ripple);
    setTimeout(() => ripple.remove(), 500);
    if (target.matches('input:not([type=radio]):not([type=checkbox]), textarea, select')) target.focus();
    else target.click();
  }

  /* ======================================================================
     Boot
     ====================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    mountHud();
    cursor.mount();
  });

  return {
    ready: () => Boolean(state.aiReady),
    handle,
    handleAudio,
    hearing,
    talkMatch,
    heard,
    reply,
    say,
    smallTalk,
    offline,
    open: openChat,
    close: closeChat,
    LANGUAGES,
    cursor,
    STEPS,
    get busy() {
      return busy;
    },
  };
})();
window.copilot = copilot;

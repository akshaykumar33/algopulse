/**
 * Copilot — "do whatever I say", plus a proper voice bar and an air cursor.
 *
 *  - Brain: free speech in any language (or a mix) goes to /api/agent/plan, which returns
 *    a short plan of known studio actions. They run one at a time, narrated by the buddy.
 *    Nothing the model writes ever executes as code in the page — only listed actions run.
 *  - Ears: a voice bar shows the live transcript, a microphone level meter, the listening
 *    language and what the copilot is doing step by step.
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
     Voice bar (HUD)
     ====================================================================== */
  let hud;
  function mountHud() {
    hud = document.createElement('div');
    hud.className = 'voicebar';
    hud.id = 'voicebar';
    hud.hidden = true;
    hud.setAttribute('role', 'status');
    hud.innerHTML = `
      <span class="vb-state" aria-hidden="true"><i class="ph-fill ph-microphone"></i></span>
      <span class="vb-meter" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      <div class="vb-body">
        <p class="vb-text" id="vbText">Listening… say anything, in any language.</p>
        <ol class="vb-steps" id="vbSteps"></ol>
      </div>
      <label class="visually-hidden" for="vbLang">Listening language</label>
      <select class="vb-lang" id="vbLang" title="Listening language">${LANGUAGES.map(([c, n]) => `<option value="${c}">${n}</option>`).join('')}</select>
      <button class="btn btn-ghost btn-icon btn-sm" type="button" id="vbStop" aria-label="Stop listening" title="Stop listening (V)"><svg class="icon" aria-hidden="true"><use href="#i-x"/></svg></button>`;
    document.body.append(hud);
    hud.querySelector('#vbStop').addEventListener('click', () => A().voice.stop());
    hud.querySelector('#vbLang').addEventListener('change', (e) => {
      A().voice.setLanguage(e.target.value);
      A().feedback(`Listening in ${e.target.selectedOptions[0].textContent.split(' · ')[0]}`, 'wink');
    });
    document.addEventListener('assistant:change', syncHud);
    syncHud();
  }

  function setState(kind, text) {
    if (!hud) return;
    hud.dataset.state = kind; // listening | thinking | doing | error
    const icon = { listening: 'ph-microphone', thinking: 'ph-brain', doing: 'ph-lightning', error: 'ph-warning' }[kind] || 'ph-microphone';
    hud.querySelector('.vb-state').innerHTML = `<i class="ph-fill ${icon}"></i>`;
    if (text !== undefined) hud.querySelector('#vbText').textContent = text;
  }

  function syncHud() {
    if (!hud) return;
    const on = A().voice.on;
    hud.hidden = !on;
    hud.querySelector('#vbLang').value = A().load().lang || 'auto';
    hud.querySelector('#vbLang option[value=auto]').textContent = `Auto · ${A().voice.lang()}`;
    if (on) {
      startMeter();
      if (!busy) setState('listening', 'Listening… say anything, in any language.');
    } else stopMeter();
  }

  // Live words as they are recognised.
  function heard(text, final) {
    if (!hud || busy) return;
    setState('listening', final ? `“${text}”` : `${text}…`);
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
    const ol = hud?.querySelector('#vbSteps');
    if (!ol) return;
    ol.innerHTML = steps
      .map((s, i) => `<li class="${i < at ? 'done' : i === at ? (failed === i ? 'failed' : 'now') : ''}">${escapeHtml(STEP_LABEL(s))}</li>`)
      .join('');
  }

  async function handle(utterance) {
    if (busy) {
      A().feedback('One moment, still on the last thing…', 'bashful');
      return;
    }
    busy = true;
    if (hud && !hud.hidden) setState('thinking', `“${utterance}” — thinking…`);
    pet()?.react('sleepy', 800);
    let plan;
    try {
      plan = await api('/api/agent/plan', { utterance, ctx: context() });
    } catch (err) {
      busy = false;
      setState('error', err.message);
      A().feedback("Sorry, I couldn't reach my brain just now", 'surprised');
      return;
    }
    lastLang = plan.lang || lastLang;
    A().voice.detected(plan.lang);
    const sayStep = plan.steps.find((s) => s.action === 'say');
    const reply = plan.reply || sayStep?.arg || '';
    pet()?.say(reply || '👍', 3500);
    pet()?.react('delighted', 700);
    A().speak(reply, lastLang);
    A().log(`Voice “${utterance}” → ${plan.steps.map((s) => s.action).join(', ') || 'chat'}`);

    const steps = plan.steps.filter((s) => s.action !== 'say' || !plan.reply);
    renderSteps(steps, 0);
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      setState('doing', reply || STEP_LABEL(s));
      renderSteps(steps, i);
      try {
        await STEPS[s.action]?.(s.arg || '');
        await sleep(250);
      } catch (err) {
        renderSteps(steps, i, i);
        setState('error', err.message);
        A().feedback(`I got stuck: ${err.message}`, 'surprised');
        busy = false;
        return;
      }
    }
    renderSteps(steps, steps.length);
    busy = false;
    setTimeout(() => {
      if (!busy && A().voice.on) {
        setState('listening', 'Listening… say anything, in any language.');
        renderSteps([], 0);
      }
    }, 4000);
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
      return { enabled: s.airCursor !== false, sensitivity: s.cursorSensitivity || 1.6, smoothing: s.cursorSmoothing ?? 0.35 };
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
    heard,
    LANGUAGES,
    cursor,
    STEPS,
    get busy() {
      return busy;
    },
  };
})();
window.copilot = copilot;

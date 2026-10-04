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
     Pip Interactive Badges & Live Feeds ("Just Ham", zero bars)
     ====================================================================== */
  const history = [];
  let lastClip = null;
  let lastHeardText = '';
  let lastHeard = null;

  function langName(code) {
    try {
      return new Intl.DisplayNames([navigator.language || 'en'], { type: 'language' }).of(code);
    } catch {
      return code;
    }
  }

  function nativeName(code) {
    try {
      return new Intl.DisplayNames([code], { type: 'language' }).of(code);
    } catch {
      return code;
    }
  }

  function initBadges() {
    const mic = document.getElementById('pipMicBadge');
    if (!mic) {
      setTimeout(initBadges, 50);
      return;
    }
    mic.addEventListener('click', (e) => {
      e.stopPropagation();
      A().voice.toggle();
    });

    const cmd = document.getElementById('pipCmdBadge');
    if (cmd) {
      cmd.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSpotlight();
      });
    }

    const form = document.getElementById('pipCommandBadge');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('pipCmdInput');
        const text = input?.value.trim();
        if (!text) return;
        input.value = '';
        closeSpotlight();
        pet()?.say?.(`“${text}”`, 2500);
        A().interpret(text);
      });
    }

    addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const sp = document.getElementById('pipCommandBadge');
        if (sp && !sp.hidden) {
          e.preventDefault();
          closeSpotlight();
        }
        return;
      }
      if (e.key.toLowerCase() !== 'b' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest('input, textarea, select, [contenteditable]')) return;
      if ([...document.querySelectorAll('dialog')].some((d) => d.matches(':modal'))) return;
      e.preventDefault();
      toggleSpotlight();
    });

    document.addEventListener('assistant:change', syncBadges);
    syncBadges();
  }

  function openSpotlight(focus = true) {
    const sp = document.getElementById('pipCommandBadge');
    if (!sp) return;
    sp.hidden = false;
    if (focus) {
      const input = document.getElementById('pipCmdInput');
      input?.focus();
      input?.select();
    }
  }

  function closeSpotlight() {
    const sp = document.getElementById('pipCommandBadge');
    if (!sp) return;
    sp.hidden = true;
  }

  function toggleSpotlight() {
    const sp = document.getElementById('pipCommandBadge');
    if (!sp) return;
    if (sp.hidden) openSpotlight(true);
    else closeSpotlight();
  }

  const expanded = () => Boolean(document.getElementById('pipCommandBadge') && !document.getElementById('pipCommandBadge').hidden);

  function setState(kind, text) {
    const mascot = pet()?.el;
    if (mascot) mascot.dataset.state = kind;
    const dot = document.getElementById('pipStatusDot');
    if (dot) dot.className = `pip-status-dot is-${kind}`;
    const txt = document.getElementById('pipStatusText');
    if (txt) {
      const labels = {
        listening: 'Listening',
        thinking: 'Thinking…',
        doing: text || 'Running…',
        error: 'Oops',
        idle: A().voice.on ? 'Listening' : (pet()?.name?.() || 'Pip'),
        off: pet()?.name?.() || 'Pip',
      };
      txt.textContent = labels[kind] || labels.idle;
    }
    const mic = document.getElementById('pipMicBadge');
    if (mic) {
      mic.classList.toggle('is-listening', kind === 'listening' || A().voice.on);
    }
  }

  function syncBadges() {
    const on = A().voice.on;
    const mic = document.getElementById('pipMicBadge');
    if (mic) {
      mic.setAttribute('aria-pressed', String(on));
      mic.classList.toggle('is-listening', on);
    }
    if (!busy) setState(on ? 'listening' : 'idle');
  }

  function heard(text, final) {
    if (!text) return;
    lastClip = null;
    if (final) {
      lastHeardText = text;
      setState('thinking');
      pet()?.say?.(`“${text}”`, 3000);
      return void say('me', text);
    }
    setState('listening');
    pet()?.say?.(`“${text}…”`, 2000);
  }

  function say(who, text, opts = {}) {
    if (!text) return null;
    history.push({ who, text });
    if (history.length > 24) history.shift();
    if (who === 'me') {
      pet()?.say?.(`“${text}”`, 3200);
    } else {
      const actions = [];
      if (/test/i.test(text)) {
        actions.push({
          label: '<i class="ph-bold ph-play"></i> Run tests',
          run: () => STEPS['run-tests'](),
        });
      }
      if (/problem/i.test(text) || /next/i.test(text)) {
        actions.push({
          label: '<i class="ph-bold ph-caret-right"></i> Next problem',
          run: () => STEPS['next-problem'](),
        });
      }
      if (/hint/i.test(text)) {
        actions.push({
          label: '<i class="ph-bold ph-lightbulb"></i> Hint',
          run: () => STEPS['hint'](),
        });
      }
      pet()?.say?.(text, 5000, actions);
    }
    return null;
  }

  function typing(on) {
    if (on) setState('thinking');
  }

  function reply(text, mood = 'happy', lang, opts = {}) {
    if (!text) return;
    say('pip', text);
    if (mood) pet()?.react(mood, 900);
    A().speak(text, lang, mood, { ai: Boolean(opts?.ai) });
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
    if (!steps.length) return;
    if (at < steps.length) {
      const s = steps[at];
      pet()?.say?.(`Step ${at + 1}/${steps.length}: ${STEP_LABEL(s)}`, 2500);
    }
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

  function hearing(on, kept) {
    if (on) {
      setState('listening');
      pet()?.say?.('Listening to you… 🎙️', 2000);
    } else if (!kept) {
      setState(A().voice.on ? 'listening' : 'idle');
    } else {
      setState('thinking');
      pet()?.say?.('Thinking… ✨', 2000);
    }
  }

  function dropLive() {
    setState(A().voice.on ? 'listening' : 'idle');
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
      pet()?.say?.('Thinking… ✨', 2000);
    }
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
    }
    lastLang = plan.lang || lastLang;
    A().voice.detected(plan.lang);
    const sayStep = plan.steps.find((s) => s.action === 'say');
    const feels = plan.steps.some((s) => s.action === 'feel');
    reply(plan.reply || sayStep?.arg || '👍', feels ? null : plan.mood || 'happy', lastLang, { ai: true });
    A().log(`Voice “${spoken ? plan.heard : input}” → ${plan.steps.map((s) => s.action).join(', ') || 'chat'} (${Math.round(performance.now() - t0)} ms)`);

    const steps = plan.steps.filter((s) => s.action !== 'say' || !plan.reply);
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initBadges();
      cursor.mount();
    });
  } else {
    initBadges();
    cursor.mount();
  }

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
    open: (byHand) => openSpotlight(byHand),
    close: () => closeSpotlight(),
    LANGUAGES,
    cursor,
    STEPS,
    get busy() {
      return busy;
    },
  };
})();
window.copilot = copilot;

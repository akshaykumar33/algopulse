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
  const within = (p, ms, what) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(`${what} took too long`)), ms))]);

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
    lastLang = A().voice.lang() || lastLang;
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
      const show = (ms = 0) => pet()?.say?.(text, Math.max(5000, ms + 1500), actions);
      if (opts.defer) return show;
      show();
    }
    return null;
  }

  function typing(on) {
    if (on) setState('thinking');
  }

  function detectScriptLang(text) {
    if (!text) return null;
    const s = String(text);
    const SCRIPTS = [
      [/[ऀ-ॿ]/g, 'hi-IN'],
      [/[ಀ-೿]/g, 'kn-IN'],
      [/[஀-௿]/g, 'ta-IN'],
      [/[ఀ-౿]/g, 'te-IN'],
      [/[ঀ-৿]/g, 'bn-IN'],
      [/[઀-૿]/g, 'gu-IN'],
      [/[ഀ-ൿ]/g, 'ml-IN'],
      [/[਀-੿]/g, 'pa-IN'],
      [/[぀-ヿ一-龯]/g, 'ja-JP'],
      [/[가-힯]/g, 'ko-KR'],
      [/[؀-ۿ]/g, 'ar-SA'],
      [/[Ѐ-ӿ]/g, 'ru-RU']
    ];
    let best = null;
    let most = 0;
    for (const [re, code] of SCRIPTS) {
      const k = (s.match(re) || []).length;
      if (k > most) {
        most = k;
        best = code;
      }
    }
    if (best === 'hi-IN' && /\b(आहे|आहेस|आहात|काय|मला|तुला|तुझ|माझ|नाही|कसा|कशी|कसं|आणि|झाल|बघ|सांग|आपण|इथे|तिथे|खूप|छान)\b/.test(s)) return 'mr-IN';
    if (best) return best;
    if (/\b(hola|por\s+favor|gracias|buenos|buenas|siguiente|problema|abrir|abremelo|correr|ejecutar|amigos|amor|cariño|holaa|graciaas|claro|enseguida|ti)\b/i.test(s)) return 'es-ES';
    if (/\b(bonjour|merci|s'il\s+vous\s+plaît|oui|problème|ouvrir|suivant|exécuter|mon\s+amour)\b/i.test(s)) return 'fr-FR';
    if (/\b(hallo|danke|bitte|nächste|aufgabe|öffnen|ausführen|schön)\b/i.test(s)) return 'de-DE';
    if (/\b(ciao|grazie|per\s+favore|prossimo|apri|esegui|amore)\b/i.test(s)) return 'it-IT';
    if (/\b(olá|ola|obrigado|obrigada|por\s+favor|próximo|proximo|abrir|executar)\b/i.test(s)) return 'pt-BR';
    if (/\b(kya|kaise|karo|karna|chalo|bhai|batao|sawal|samjhao|dekho|chalao|likho|haan|nahi|pehle|baad|suno|bolo|namaste|shukriya|dhanyawad)\b/i.test(s)) {
      return 'hi-IN';
    }
    return null;
  }

  function pickLang(detected, lang) {
    if (!detected || !lang) return detected || lang || null;
    const base = (x) => String(x).toLowerCase().split('-')[0];
    if (base(detected) === base(lang)) return lang;
    if (detected === 'hi-IN' && /^(mr|ne|sa|kok|mai|bho)$/.test(base(lang))) return lang;
    return detected;
  }

  function reply(text, mood = 'happy', lang, opts = {}) {
    if (!text) return;
    const detected = detectScriptLang(text) || (!opts.ai && /[a-z]/i.test(text) ? 'en-US' : null);
    const targetLang = (window.buddyVoice?.resolveLangCode || ((x) => x))(pickLang(detected, lang) || lastLang || A().voice.lang() || 'en-US');
    if (A().load().talkBack === false || !window.buddyVoice) {
      say('pip', text);
      if (mood) pet()?.react(mood, 1200);
      if (A().load().talkBack !== false) A().speak(text, targetLang, mood, { ai: Boolean(opts?.ai) });
      return;
    }
    const show = say('pip', text, { defer: true });
    let shown = false;
    const once = (ms) => {
      if (shown) return;
      shown = true;
      show(ms);
    };
    pet()?.say?.('💭 …', 15000);
    setTimeout(once, 15000);
    A().speak(text, targetLang, mood, { ai: Boolean(opts?.ai), onStart: once });
  }

  /* ======================================================================
     Brain: plan + execute
     ====================================================================== */
  let busy = false;
  let lastLang = 'en-US';
  const chosen = () => {
    try {
      return localStorage.getItem('buddyChosenLang') || '';
    } catch {
      return '';
    }
  };

  function context() {
    const cur = A().voice.lang();
    return {
      date: state.date,
      file: state.file,
      tab: state.tab,
      codeMode: state.codeMode,
      userLang: cur,
      lastLang,
      chosenLang: chosen(),
    };
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
    'scroll-down': async () => A().ACTIONS['scroll-down']?.run?.(),
    'scroll-up': async () => A().ACTIONS['scroll-up']?.run?.(),
    'scroll-top': async () => A().ACTIONS['scroll-top']?.run?.(),
    'scroll-bottom': async () => A().ACTIONS['scroll-bottom']?.run?.(),
    'toggle-fullscreen': async () => A().ACTIONS['toggle-fullscreen']?.run?.(),
    zoom: async (arg) => {
      const a = (arg || '').toLowerCase();
      if (a.includes('in')) A().ACTIONS['zoom-in']?.run?.();
      else if (a.includes('out')) A().ACTIONS['zoom-out']?.run?.();
      else A().ACTIONS['zoom-reset']?.run?.();
    },
    'zoom-in': async () => A().ACTIONS['zoom-in']?.run?.(),
    'zoom-out': async () => A().ACTIONS['zoom-out']?.run?.(),
    'zoom-reset': async () => A().ACTIONS['zoom-reset']?.run?.(),
    'copy-code': async () => A().ACTIONS['copy-code']?.run?.(),
    'code-mode': async (arg) => {
      const a = (arg || '').toLowerCase();
      if (a.includes('diff')) A().ACTIONS['code-diff']?.run?.();
      else if (a.includes('ref')) A().ACTIONS['code-reference']?.run?.();
      else A().ACTIONS['code-attempt']?.run?.();
    },
    'code-attempt': async () => A().ACTIONS['code-attempt']?.run?.(),
    'code-reference': async () => A().ACTIONS['code-reference']?.run?.(),
    'code-diff': async () => A().ACTIONS['code-diff']?.run?.(),
    'open-problem-index': async (arg) => A().openProblemIndex?.(arg),
    'rag-answer': async (arg) => {
      openCoach();
      await ask(arg);
    },
    'search-rag': async (arg) => {
      openCoach();
      await ask(arg);
    },
    close: async () => A().ACTIONS.close.run(),
    'toggle-pip': async () => pet()?.toggle(),
    'set-character': async (arg) => pet()?.setCharacter(/bun|rabbit/i.test(arg) ? 'bunny' : 'hamster'),
    'stop-voice': async () => A().voice.stop(),
    'set-language': async (arg) => {
      const code = (window.buddyVoice?.resolveLangCode || ((x) => x))(arg);
      A().voice.setLanguage(code, false);
      lastLang = code;
    },
    feel: async (arg) => {
      const m = String(arg || '').trim();
      if (!m) return;
      pet()?.feel?.(m);
      pet()?.emote?.(m);
    },
    gestures: async (arg) => {
      const want = !/^(off|stop|no|false)/i.test(arg.trim());
      if (want !== A().gestures.on) await A().gestures.toggle();
    },
    'air-cursor': async (arg) => {
      A().save({ airCursor: !/^(off|stop|no|false)/i.test(arg.trim()) });
      cursor.syncSuppress();
      document.dispatchEvent(new CustomEvent('assistant:change'));
    },
    'voice-style': async (arg) => {
      const style = ['cute', 'sweet', 'bright'].find((s) => arg.toLowerCase().includes(s)) || 'cute';
      A().save({ voiceStyle: style });
      document.dispatchEvent(new CustomEvent('assistant:change'));
    },
    'talk-back': async (arg) => {
      A().save({ talkBack: !/^(off|stop|no|false|quiet|mute)/i.test(arg.trim()) });
    },
    buddy: async (arg) => {
      const m = String(arg || '').trim().toLowerCase();
      if (!m) return;
      pet()?.move?.(m);
      pet()?.emote?.(m);
      await sleep(900);
    },
    'web-search': async (arg) => {
      setState('doing', `Searching web for “${arg}”…`);
      const res = await api('/api/web/search', { query: arg, lang: lastLang });
      openCoach();
      if (res.summary) {
        window.appendCoachMessage?.('coach', `### 🌐 Web Search: "${arg}"\n\n${res.summary}\n\n**Sources:**\n${(res.results || []).map((r) => `- [${r.title}](${r.url})`).join('\n')}`);
      }
      if (res.results?.length) {
        toast(`Found ${res.results.length} live web results`);
      }
    },
    'open-url': async (arg) => {
      let url = String(arg || '').trim();
      if (!/^https?:\/\//i.test(url)) {
        const lower = url.toLowerCase();
        if (lower.includes('codeforces')) url = 'https://codeforces.com';
        else if (lower.includes('leetcode')) url = 'https://leetcode.com';
        else if (lower.includes('atcoder')) url = 'https://atcoder.jp';
        else if (lower.includes('codechef')) url = 'https://codechef.com';
        else if (lower.includes('github')) url = 'https://github.com';
        else if (lower.includes('google')) url = 'https://google.com';
        else if (lower.includes('youtube')) url = 'https://youtube.com';
        else if (/^[a-z0-9-]+(\.[a-z0-9-]+)+/i.test(url)) url = `https://${url}`;
        else url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
      window.open(url, '_blank');
      toast(`Opened browser: ${url}`);
    },
    'create-report': async (arg) => {
      setState('doing', `Generating report…`);
      const lang = lastLang || A().voice.lang() || 'en-US';
      if (window.generateAndShowReport) {
        await window.generateAndShowReport(arg, lang);
      } else {
        const res = await api('/api/report/generate', { topic: arg, lang, date: state.date });
        if (window.showReportModal) {
          window.showReportModal(res.title, res.markdown, res.lang);
        }
      }
    },
  };

  function localTodayIso() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  const STEP_LABEL = (s) => {
    const names = {
      'open-problem': 'Open',
      'open-day': 'Go to day',
      'write-code': 'Write code',
      'ask-coach': 'Ask coach',
      search: 'Search',
      'run-custom': 'Run input',
      'set-language': 'Language',
      say: 'Say',
      'scroll-bottom': 'Scroll to bottom',
      'toggle-fullscreen': 'Fullscreen',
      zoom: 'Zoom',
      'copy-code': 'Copy code',
      'code-mode': 'Code view',
      'open-problem-index': 'Problem #',
      'rag-answer': 'Knowledge search',
      'search-rag': 'Knowledge search',
      'web-search': 'Web search',
      'open-url': 'Open URL',
      'create-report': 'Generate report',
    };
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
    [/\b(come|come\s+to|follow)\s*(here|me|closer)?\b/i, () => ['Coming right to you! 🏃💖', 'happy', 'come-here']],
    [/\b(go|move|head|turn|walk|run|slide|fly)?\s*(to\s+the\s+|to\s+)?(left|right|top|up|bottom|down|center|centre|middle|home)\b/i, (m) => {
      const raw = (m[3] || m[0] || '').toLowerCase();
      const dir = raw.includes('center') || raw.includes('centre') || raw.includes('middle') ? 'center' : raw.includes('up') || raw.includes('top') ? 'top' : raw.includes('down') || raw.includes('bottom') ? 'bottom' : raw.includes('right') ? 'right' : raw.includes('home') ? 'home' : 'left';
      return ['On my way! 🏃', 'happy', `go-${dir}`];
    }],
    [/^(hide|peekaboo|peek a boo|play hide and seek)$/, () => ['Peekaboo! 🙈', 'giggle', 'hide']],
    [/\b(wave|say hi|hello|hi|hey|namaste)\b$/, () => ['Heyyy hi sweet heart! 🥰 I missed you so much! What shall we solve together today? ✨', 'love', 'wave']],
    [/\bhow (are|u) (you|doing)\b|\bhow r u\b|\bkaise ho\b/, () => ['Aww, I’m doing super wonderful now that I’m talking to you, sweet heart! 🥰 How are you doing today? ✨', 'flirt', 'jump']],
    [/\b(i am|i'm|im|feeling) (sad|down|upset|tired|stuck|depressed|bored)\b/, () => ["Aww, come here… 🫂 It's okay. Let's take one tiny step together — want a hint?", 'cry']],
    [/^(cry|be sad|can you cry)\b/, () => ['Waaah… 😢 okay okay, I am fine now!', 'cry']],
    [/\b(kiss|kisses|muah|pappi|chumma)\b/, () => ['Muah! 😘 Here is a sweet lucky kiss for your next test case! Now go ace it for me!', 'kiss', 'jump']],
    [/\b(flirt|flirting|tease|blush)\b/, () => ['Are you trying to make my little cheeks blush? You are looking extra cute today! 😉💋', 'flirt', 'sway']],
    [/\b(marry me|be mine|date me|girlfriend|boyfriend|love me)\b/, () => ['Deal! But only if you solve all your code with me forever and look at no one else! 💍💖', 'flirt', 'dance']],
    [/\b(jealous|possessive|who do you love|mine)\b/, () => ['You are MY favorite human in the entire universe! Do not you dare look at any other buddy! 😤🔒', 'possessive']],
    [/\b(pout|grumpy|angry|gussa)\b/, () => ['Hmph! 😤 I was pouting because you did not give me attention! Come boop my nose right now!', 'pout']],
    [/\b(baby|cutie|sweetie|darling|jaan|babu|shona)\b/, () => ['Hehe, yes bestie? Your little cutie baby Ham is right here listening to you! 🥺🧸💖', 'baby', 'jump']],
    [/\b(you are mine|tum mere ho)\b/, () => ['Always! And you are mine forever too, locked in! 🔒🥰', 'possessive']],
    [/\b(i love you|love you|you are cute|you're cute)\b/, () => ['Hehe, I love you more! But you better mean it, because you are mine now! 💕😘', 'flirt']],
    [/^(good job|well done|great|awesome|thank you|thanks)( so much)?( pip| bun| buddy| ham)?$/, () => ['Hehe, thank you! You are the absolute best, my genius coder! 🌟🥰', 'proud']],
    [/\b(take a nap|nap time|good night)\b/, () => ['Yawn… a tiny nap, then back to code. 💤', 'sleepy']],
    [/^(be angry|get angry|are you angry|are you mad)\b/, () => ['Hmph! …just kidding, I could never stay mad at my favorite person. 😤💛', 'pout']],
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

  const handleAudio = (clip) => handle({ audio: { data: clip.data, mime: clip.mime }, start: clip.start });

  const waiting = [];
  async function handle(input) {
    if (busy && typeof input !== 'string') {
      waiting.push(input);
      if (waiting.length > 3) waiting.shift();
      return;
    }
    await run(input);
    while (!busy && waiting.length) await run(waiting.shift());
  }

  async function run(input) {
    if (typeof input === 'string') {
      const fast = A().localCommand(input);
      if (fast) {
        say('me', input);
        fast();
        return;
      }
      if (smallTalk(input)) {
        say('me', input);
        return;
      }
    }
    if (busy) {
      if (typeof input === 'string') pet()?.say?.('One moment, still on the last thing…', 2000);
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
      plan = await within(api('/api/agent/plan', spoken ? { audio: input.audio, ctx } : { utterance: input, ctx }), 30000, 'Thinking');
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
      // Silence, a cough or background chatter — or the same sentence already ran as a
      // quick local command while the AI was listening: drop it quietly.
      if (!plan.heard?.trim() || (input.start && A().voice.localAt > input.start - 300)) {
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
        await within(Promise.resolve(STEPS[s.action]?.(s.arg || '')), 60000, STEP_LABEL(s));
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
    act: (action, arg) => STEPS[action]?.(arg),
    LANGUAGES,
    cursor,
    STEPS,
    get busy() {
      return busy;
    },
  };
})();
window.copilot = copilot;

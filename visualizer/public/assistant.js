/**
 * Hands-free studio: voice commands and hand gestures that drive the whole app, with
 * the mascot as the face of it (it listens, watches, captions and answers).
 *
 *  - Voice: the browser's SpeechRecognition (Chrome/Edge). Off until the user turns it
 *    on. Chrome sends audio to Google to transcribe — the guide says so.
 *  - Gestures: MediaPipe GestureRecognizer running locally (WASM + GPU); camera frames
 *    never leave the machine. Seven built-in hand signs, a sideways swipe, and custom
 *    gestures the user trains (k-nearest-neighbour over normalised hand landmarks).
 *  - Everything maps onto one command registry, so voice phrases, gestures and custom
 *    bindings all trigger the same actions.
 *
 * Loaded after app.js / guide.js / mascot.js; uses their globals.
 */
'use strict';

const assistant = (() => {
  const STORE = 'algopulse-assistant';
  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(STORE) || '{}');
    } catch {
      return {};
    }
  };
  const save = (patch) => {
    try {
      localStorage.setItem(STORE, JSON.stringify({ ...load(), ...patch }));
    } catch { /* private mode */ }
  };

  const pet = () => window.mascot;
  const buddy = () => (pet() ? pet().name() : 'Pip');
  // Talk-back in the reply's own language. With a Gemini key the buddy has its own AI
  // voice (cute, sweet or bright, colored by its mood); otherwise the sweetest installed
  // browser voice, pitched up.
  let speakingUntil = 0;
  let sayToken = 0;
  let aiVoiceOffUntil = 0;
  let audioCtx = null;
  let playing = null;
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
    }
  }

  const VOICES = {
    cute: { ai: 'Leda', style: 'Speak as a tiny, adorable cartoon buddy with a high, sweet, bubbly baby-like voice, playful and full of smiles', pitch: 1.48, rate: 1.12 },
    sweet: { ai: 'Aoede', style: 'Speak as a warm, sweet young lady with a soft, gentle, smiling voice', pitch: 1.25, rate: 1.02 },
    bright: { ai: 'Zephyr', style: 'Speak in a bright, cheerful, energetic voice', pitch: 1.35, rate: 1.1 },
  };
  const MOOD_STYLE = {
    laugh: 'laughing and giggling happily between the words',
    giggle: 'with cute little giggles',
    love: 'adoringly, full of love',
    sad: 'softly and a little sadly, but still sweet',
    cry: 'sniffling, teary and wobbly, then brave',
    angry: 'in a pretend-grumpy, pouty way that is still cute',
    surprised: 'amazed and excited',
    proud: 'proud and cheering',
    sleepy: 'sleepy and yawning',
    shy: 'shyly and bashfully',
  };
  const voiceStyle = () => VOICES[load().voiceStyle] || VOICES.cute;

  // Ranked for cute baby-like / cartoon mascot companion delivery across all languages
  const CUTE_CHILD = /ana|maisie|child|kid|baby|cartoon|kodomo|niñ[oa]|enfant|bambin|bebe|kiddie/i;
  // Multilingual female voice names covering Indic, Asian, and European languages
  const MULTILINGUAL_FEMALE = /(female|woman|girl|natural|neural|online|google|swara|kalpana|sapna|pallavi|shruti|aarohi|tanishaa|sobhana|dhwani|dalia|elvira|paloma|jimena|nanami|aoi|mayu|keiko|xiaoxiao|xiaoyi|yating|sunhi|heami|denise|brigitte|celeste|katja|amala|elsa|isabella|francisca|thalita|zira|aria|jenny|michelle|sonia|libby|natasha|neerja|heera|samantha|victoria|karen|moira|tessa|हिन्दी|हिंदी|ಕನ್ನಡ|தமிழ்|తెలుగు|मराठी|বাংলা|മലയാളം|ગુજરાતી|日本語|한국어|中文)/i;

  function voiceFor(lang) {
    const voices = ('speechSynthesis' in window && speechSynthesis.getVoices()) || [];
    if (!voices.length) return null;
    const want = String(lang || '').toLowerCase();
    const base = want.split('-')[0];

    // 1. Try exact locale match first (e.g. 'hi-in', 'kn-in', 'ja-jp', 'es-es')
    let pool = voices.filter((v) => v.lang.toLowerCase() === want);
    // 2. Try language family (e.g. any 'hi', any 'kn', any 'ja', any 'es')
    if (!pool.length && base) {
      pool = voices.filter((v) => v.lang.toLowerCase().startsWith(base));
    }

    const isNative = pool.length > 0;
    const list = isNative ? pool : voices;

    // Check for child/baby voice in candidate pool
    const child = list.find((v) => CUTE_CHILD.test(v.name));
    if (child) return { voice: child, kind: 'child', isNative };

    // Check for known sweet / female voices across all languages
    const sweetFemale = list.find((v) => MULTILINGUAL_FEMALE.test(v.name));
    if (sweetFemale) return { voice: sweetFemale, kind: 'female', isNative };

    // Any female/woman tagged voice
    const anyF = list.find((v) => /female|woman|girl/i.test(v.name));
    if (anyF) return { voice: anyF, kind: 'female', isNative };

    return { voice: list[0], kind: 'default', isNative };
  }
  function talking(on, untilMs) {
    if (on) speakingUntil = Date.now() + untilMs;
    else speakingUntil = Date.now() + 400;
    pet()?.talking?.(on);
  }
  function stopSpeaking() {
    window.buddyVoice?.stop();
    sayToken++;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    try {
      playing?.stop();
    } catch { /* already ended */ }
    playing = null;
    speakingUntil = 0;
    pet()?.talking?.(false);
  }
  function browserSpeak(text, lang, mood) {
    if (!('speechSynthesis' in window)) return;
    const clean = String(text).replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!clean) return;

    // Sweet procedural micro-sound from the mascot (Pip / Bun)
    const chirpName = mood === 'laugh' || mood === 'giggle' ? 'giggle'
      : mood === 'sad' || mood === 'cry' ? 'cry'
      : mood === 'love' ? 'love'
      : mood === 'proud' ? 'proud'
      : 'happy';
    pet()?.chirp?.(chirpName);

    const targetLang = lang || voice.lang() || 'en-US';
    const match = voiceFor(targetLang);
    const v = match?.voice || null;
    const kind = match?.kind || 'default';

    const u = new SpeechSynthesisUtterance(clean);
    if (v) {
      u.voice = v;
      u.lang = v.lang || targetLang;
    } else {
      u.lang = targetLang;
    }

    // Multilingual Baby Voice Acoustic Shaping:
    // - Child voices: ~1.30 pitch (already a child tone; slight lift makes it a cute baby animal)
    // - Native female voices (Hindi, Kannada, Spanish, Japanese, English, etc.): ~1.48 pitch
    // - Default/desktop voices: ~1.54 pitch (shifts adult voice into squeaky cute baby animal)
    let basePitch = kind === 'child' ? 1.30 : kind === 'female' ? 1.48 : 1.54;
    let baseRate = 1.12; // Bubbly, energetic, cute baby tempo

    const style = load().voiceStyle || 'cute';
    if (style === 'sweet') {
      basePitch = Math.max(1.15, basePitch - 0.18);
      baseRate = 1.02;
    } else if (style === 'bright') {
      basePitch = Math.min(1.6, basePitch + 0.05);
      baseRate = 1.14;
    }

    // Dynamic emotion shift for baby voice:
    const moodShift = (mood === 'laugh' || mood === 'giggle' ? 0.08
      : mood === 'sad' || mood === 'cry' ? -0.12
      : mood === 'love' ? 0.04
      : mood === 'surprised' ? 0.12
      : 0);
    const rateShift = (mood === 'laugh' || mood === 'giggle' ? 0.04
      : mood === 'sad' || mood === 'cry' ? -0.06
      : 0);

    u.pitch = Math.min(1.85, Math.max(0.85, basePitch + moodShift));
    u.rate = Math.min(1.4, Math.max(0.85, baseRate + rateShift));

    talking(true, 600 + clean.length * 75);
    u.onend = u.onerror = () => talking(false);
    speechSynthesis.speak(u);
  }
  async function aiSpeak(text, mood, token, lang) {
    const s = voiceStyle();
    const accent = window.buddyVoice?.accentStyle?.(lang) || '';
    const style = [s.style, accent, MOOD_STYLE[mood]].filter(Boolean).join(', ');
    const res = await api('/api/voice/speak', { text, voice: s.ai, style });
    if (token !== sayToken) return;
    audioCtx ||= new AudioContext();
    if (audioCtx.state === 'suspended') await audioCtx.resume();
    const bin = atob(res.pcm);
    const n = bin.length >> 1;
    const buf = audioCtx.createBuffer(1, n, 24000);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < n; i++) {
      const v = bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8);
      ch[i] = (v >= 0x8000 ? v - 0x10000 : v) / 0x8000;
    }
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    src.connect(audioCtx.destination);
    talking(true, buf.duration * 1000 + 300);
    src.onended = () => {
      if (playing === src) playing = null;
      talking(false);
    };
    playing = src;
    src.start();
  }
  // opts.ai: use the AI voice. Its free tier allows only a few lines a day, so callers ask
  // for it on real conversation replies; quick confirmations use the browser voice.
  function speak(text, lang, mood, opts = {}) {
    if (load().talkBack === false || !text) return;
    const targetLang = lang || voice.lang() || 'en-US';
    // voice.js: one continuous voice with the best engine available (AI, local neural, browser).
    if (window.buddyVoice) return void window.buddyVoice.say(text, { lang: targetLang, mood, ai: Boolean(opts.ai) });
    stopSpeaking();
    const token = sayToken;
    const clean = String(text).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').trim();
    if (!clean) return;
    // Hold the mic while the AI voice is being made, so it never hears its own reply.
    speakingUntil = Date.now() + 8000;
    if (opts.ai && load().voiceEngine !== 'browser' && state.ai?.canHear && Date.now() > aiVoiceOffUntil) {
      aiSpeak(clean, mood, token, targetLang).catch((err) => {
        // Out of voice quota: stop asking for a while and use the browser voice
        if (/quota|429|rate|exceeded/i.test(err.message)) {
          if (!aiVoiceOffUntil) toast('The AI voice is busy, so I am using the browser voice.');
          aiVoiceOffUntil = Date.now() + 30 * 60 * 1000;
        }
        if (token === sayToken) browserSpeak(clean, targetLang, mood);
      });
    } else browserSpeak(clean, targetLang, mood);
  }
  const isSpeaking = () => Boolean(window.buddyVoice?.speaking) || ('speechSynthesis' in window && speechSynthesis.speaking) || Boolean(playing) || Date.now() < speakingUntil;
  function feedback(text, reaction = 'delighted') {
    if (window.copilot?.reply) return window.copilot.reply(text, reaction, voice.lang());
    pet()?.say(text);
    pet()?.react(reaction, 700);
    speak(text, voice.lang(), reaction);
  }

  /* ======================================================================
     Command registry — the single set of actions voice and gestures share
     ====================================================================== */
  const closeTop = () => {
    const open = [...document.querySelectorAll('dialog')].filter((d) => d.open && d.matches(':modal'));
    if (open.length) {
      open[open.length - 1].close();
      return true;
    }
    return false;
  };
  const TABS_ORDER = () => visibleTabs();
  const ACTIONS = {
    'next-problem': { label: 'Next problem', run: () => stepProblem(1), say: 'Next problem' },
    'prev-problem': { label: 'Previous problem', run: () => stepProblem(-1), say: 'Previous problem' },
    'next-tab': { label: 'Next tab', run: () => { const t = TABS_ORDER(); showTab(t[(t.indexOf(state.tab) + 1) % t.length]); }, say: 'Next tab' },
    'prev-tab': { label: 'Previous tab', run: () => { const t = TABS_ORDER(); showTab(t[(t.indexOf(state.tab) - 1 + t.length) % t.length]); }, say: 'Previous tab' },
    'tab-story': { label: 'Open Story', run: () => showTab('story'), say: 'Story time' },
    'tab-walkthrough': { label: 'Open Walkthrough', run: () => showTab('walkthrough'), say: 'Walkthrough' },
    'tab-diagrams': { label: 'Open Diagrams', run: () => showTab('diagrams'), say: 'Diagrams' },
    'tab-visualize': { label: 'Open Visualize', run: () => showTab('visualize'), say: 'Visualizer' },
    'tab-code': { label: 'Open Code', run: () => showTab('code'), say: 'Your code' },
    'tab-tests': { label: 'Open Tests', run: () => showTab('tests'), say: 'Tests' },
    'run-tests': { label: 'Run sample tests', run: () => { showTab('tests'); runTests(); }, say: 'Running your tests' },
    'verify-day': { label: 'Verify the day', run: () => verifyDay(), say: 'Verifying today' },
    'open-coach': { label: 'Open the coach', run: () => openCoach(), say: 'Coach is here' },
    'open-guide': { label: 'Open the guide', run: () => openGuide('welcome'), say: 'Here is the guide' },
    'start-tour': { label: 'Start the tour', run: () => tour.start(), say: 'Let me show you around' },
    'toggle-theme': { label: 'Switch light / dark', run: () => toggleTheme(), say: 'Switched the theme' },
    'close': { label: 'Close / go back', run: () => closeTop() || picker.close({ focusButton: false }), say: 'Closed' },
    'scroll-down': { label: 'Scroll down', run: () => scrollBy({ top: innerHeight * 0.7, behavior: 'smooth' }), say: '' },
    'scroll-up': { label: 'Scroll up', run: () => scrollBy({ top: -innerHeight * 0.7, behavior: 'smooth' }), say: '' },
    'scroll-top': { label: 'Back to top', run: () => scrollTo({ top: 0, behavior: 'smooth' }), say: 'Back to top' },
    'scroll-bottom': { label: 'Scroll to bottom', run: () => scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), say: 'Bottom of the page' },
    'toggle-fullscreen': {
      label: 'Toggle fullscreen',
      run: () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
      },
      say: 'Toggled fullscreen'
    },
    'zoom-in': {
      label: 'Zoom in',
      run: () => {
        const cur = parseFloat(document.documentElement.style.zoom || '1');
        document.documentElement.style.zoom = Math.min(1.5, cur + 0.12);
      },
      say: 'Zoomed in'
    },
    'zoom-out': {
      label: 'Zoom out',
      run: () => {
        const cur = parseFloat(document.documentElement.style.zoom || '1');
        document.documentElement.style.zoom = Math.max(0.75, cur - 0.12);
      },
      say: 'Zoomed out'
    },
    'zoom-reset': {
      label: 'Reset zoom',
      run: () => { document.documentElement.style.zoom = '1'; },
      say: 'Reset zoom'
    },
    'copy-code': {
      label: 'Copy code',
      run: () => {
        const p = current();
        const code = state.codeMode === 'reference' ? (p?.reference || '') : ($('#editor')?.value ?? p?.attempt?.code ?? '');
        if (code) {
          navigator.clipboard.writeText(code).catch(() => {});
          toast('Code copied to clipboard!');
        }
      },
      say: 'Copied code to clipboard'
    },
    'code-attempt': {
      label: 'Switch to attempt code',
      run: () => {
        showTab('code');
        const el = document.querySelector('input[name="codeMode"][value="attempt"]');
        if (el) { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); }
      },
      say: 'Your attempt'
    },
    'code-reference': {
      label: 'Switch to reference solution',
      run: () => {
        showTab('code');
        const el = document.querySelector('input[name="codeMode"][value="reference"]');
        if (el) { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); }
      },
      say: 'Reference solution'
    },
    'code-diff': {
      label: 'Toggle code diff',
      run: () => {
        showTab('code');
        const el = document.querySelector('input[name="codeMode"][value="diff"]');
        if (el) { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); }
      },
      say: 'Comparing code'
    },
    'filter-todo': {
      label: 'Filter unsolved',
      run: () => {
        const el = document.querySelector('input[name="status"][value="todo"]');
        if (el) el.click();
      },
      say: 'Showing unsolved'
    },
    'filter-all': {
      label: 'Show all problems',
      run: () => {
        const el = document.querySelector('input[name="status"][value="all"]');
        if (el) el.click();
      },
      say: 'Showing all'
    },
    'hint': {
      label: 'Ask for a hint',
      run: () => { openCoach(); askMode('hint'); },
      say: 'Here is a hint'
    },
    'explain': {
      label: 'Explain problem',
      run: () => { openCoach(); askMode('explain'); },
      say: 'Explaining problem'
    },
    'review': {
      label: 'Review my code',
      run: () => { openCoach(); askMode('review'); },
      say: 'Reviewing code'
    },
    'read-story': { label: 'Read the story aloud', run: () => readStory(), say: '' },
    'toggle-pip': { label: 'Hide / show the buddy', run: () => pet()?.toggle(), say: '' },
    'stop-voice': { label: 'Stop listening', run: () => voice.stop(), say: 'Okay, I stopped listening' },
    'toggle-voice': { label: 'Mic on / off', run: () => voice.toggle(), say: '' },
    'buddy-dance': { label: 'Make the buddy dance', run: () => pet()?.feel('dance'), say: '' },
    'none': { label: '— nothing —', run: () => {}, say: '' },
  };

  function run(id, source) {
    const a = ACTIONS[id];
    if (!a || id === 'none') return false;
    try {
      a.run();
      if (a.say) feedback(a.say);
      log(`${source}: ${a.label}`);
      return true;
    } catch (err) {
      feedback("Hmm, I couldn't do that", 'surprised');
      console.warn('[assistant]', id, err);
      return false;
    }
  }

  function readStory() {
    const p = current();
    const s = p?.story;
    if (!s) {
      feedback('This problem has no story yet', 'bashful');
      return;
    }
    showTab('story');
    const plain = `${s.title}. ${s.keyIdea}. ${s.story}`.replace(/[#*_`$>|[\]()]/g, ' ').replace(/\s+/g, ' ');
    pet()?.say(s.keyIdea, 6000);
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(plain);
    u.rate = 1;
    u.pitch = 1.2;
    speechSynthesis.speak(u);
  }

  const events = [];
  function log(line) {
    events.unshift(`${new Date().toLocaleTimeString()} · ${line}`);
    events.length = Math.min(events.length, 6);
    const el = document.getElementById('assistantLog');
    if (el) el.innerHTML = events.map((e) => `<li>${escapeHtml(e)}</li>`).join('');
  }

  /* ======================================================================
     Voice Remote Control Engine
     ====================================================================== */
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // Built-in phrases → actions, tried after the user's own phrases. Order matters.
  const PHRASES = [
    [/\b(stop|quit) (listening|talking|speaking)\b|\bgo to sleep\b|\bshut up\b|\bbe quiet\b|\bmute\b/, 'stop-voice'],
    [/\bnext (tab|page)\b/, 'next-tab'],
    [/\b(previous|last|back a) (tab|page)\b/, 'prev-tab'],
    [/\b(next|forward|advance|agla|aage)( problem| question| one| sawal)?\b|\bagla sawal\b/, 'next-problem'],
    [/\b(previous|prior|back|pichhla|peeche)( problem| question| one| sawal)?\b|\bpichhla sawal\b/, 'prev-problem'],
    [/\b(run|check|test)( my| the)? (tests?|code|solution|samples?)\b|\brun it\b|\btests? chalao\b/, 'run-tests'],
    [/\bverify( the)? (day|today|all)\b/, 'verify-day'],
    [/\b(read|tell)( me)?( the)? story( aloud| out loud)?\b/, 'read-story'],
    [/\b(open |show |go to )?(the )?story\b|\bkahani\b/, 'tab-story'],
    [/\b(open |show |go to )?(the )?walkthrough\b|\bexplanation\b|\bsamjhao\b/, 'tab-walkthrough'],
    [/\b(open |show |go to )?(the )?diagrams?\b/, 'tab-diagrams'],
    [/\b(open |show |go to )?(the )?visuali[sz]e\b|\banimation\b/, 'tab-visualize'],
    [/\b(open |show |go to )?(the )?code\b|\beditor\b/, 'tab-code'],
    [/\b(open |show |go to )?(the )?tests?\b|\bplayground\b/, 'tab-tests'],
    [/\b(open |show |go to )?(the )?coach\b/, 'open-coach'],
    [/\b(open |show |go to )?(the )?guide\b|\bsettings\b/, 'open-guide'],
    [/\b(start |open )?(the )?tour\b/, 'start-tour'],
    [/\b(dark|light|night|day) mode\b|\bswitch (the )?theme\b|\btoggle theme\b/, 'toggle-theme'],
    [/\bscroll (down|niche)\b|\bpage down\b/, 'scroll-down'],
    [/\bscroll (up|upar)\b|\bpage up\b/, 'scroll-up'],
    [/\b(go to |scroll to )?(the )?top\b/, 'scroll-top'],
    [/\b(go to |scroll to )?(the )?bottom\b/, 'scroll-bottom'],
    [/\b(fullscreen|full screen|toggle fullscreen)\b/, 'toggle-fullscreen'],
    [/\bzoom in\b/, 'zoom-in'],
    [/\bzoom out\b/, 'zoom-out'],
    [/\breset zoom\b/, 'zoom-reset'],
    [/\b(close|cancel|dismiss|go back|exit)\b/, 'close'],
    [/\b(hide|show) (pip|bun|bunny|hamster|buddy)\b/, 'toggle-pip'],
    [/\b(dance|naacho)\b/, 'buddy-dance'],
    [/\bfilter (todo|unsolved)\b/, 'filter-todo'],
    [/\bshow all( problems)?\b/, 'filter-all'],
    [/\b(give me a |show me a |need a )?hint\b/, 'hint'],
    [/\bexplain( this)?( problem)?\b/, 'explain'],
    [/\breview( my)?( code)?\b/, 'review'],
  ];

  function openProblemIndex(idx) {
    const i = idx - 1;
    if (state.problems && state.problems[i]) {
      selectProblem(state.problems[i].file);
      feedback(`Opening problem ${idx}: ${displayName(state.problems[i].name)}`);
      log(`Voice: open problem ${idx}`);
      return true;
    }
    return false;
  }

  function openDayTarget(arg) {
    const days = (state.days || []).map((d) => d.date);
    if (!days.length) return false;
    let target = null;
    const a = String(arg).toLowerCase().trim();
    if (a === 'today' || a === 'latest' || a === 'current') target = days[0];
    else if (a === 'yesterday') target = days[1] || days[0];
    else if (/^\d{4}-\d{2}-\d{2}$/.test(a)) target = days.find((d) => d === a);
    else {
      const m = a.match(/\bday\s*(\d+)\b/i);
      if (m) {
        const num = parseInt(m[1], 10);
        const set = (state.days || []).find((d) => d.day === num);
        if (set) target = set.date;
      }
    }
    if (target) {
      loadDay(target);
      feedback(`Opening ${target}`);
      log(`Voice: open day ${target}`);
      return true;
    }
    return false;
  }

  function problemByName(text) {
    const t = text.toLowerCase();
    let best = null;
    for (const p of state.problems) {
      const name = displayName(p.name).toLowerCase();
      const words = name.split(/\W+/).filter((w) => w.length > 2);
      const hits = words.filter((w) => t.includes(w)).length;
      const score = t.includes(name) ? 99 : words.length ? hits / words.length : 0;
      if (score > 0.5 && (!best || score > best.score)) best = { p, score };
    }
    return best?.p || null;
  }

  // Speech engines differ on punctuation and contractions ("let's" vs "lets"), so phrases
  // are compared with both stripped.
  const normalize = (t) => String(t).toLowerCase().replace(/['’.,!?]/g, '').replace(/\s+/g, ' ').trim();

  const WAKE = /^(hey |ok |okay )?(pip|bun|bunny|buddy|ham|hamster)[, ]*/;

  // Ultra-Fast Remote Control Dispatcher: runs directly in 0ms with zero network delay!
  function localCommand(raw) {
    const text = normalize(raw);
    if (!text) return null;
    if (window.copilot?.talkMatch(raw)) return () => window.copilot.smallTalk(raw);
    const said = text.replace(WAKE, '');

    // 1. The user's own custom phrases.
    const own = (load().phrases || []).find((c) => said.includes(normalize(c.phrase)));
    if (own) return () => run(own.action, `Voice “${raw}”`);

    // 2. Problem by 1-based index (e.g. "problem 1", "first problem", "sawal 3")
    const numM = said.match(/\b(problem|question|sawal|number|no)\s*([1-9]|10)\b/i) || said.match(/\b(first|1st|second|2nd|third|3rd|fourth|4th|fifth|5th|sixth|6th|seventh|7th|eighth|8th|ninth|9th|tenth|10th|last)\s*(problem|sawal)?\b/i);
    if (numM) {
      const ordinals = { first: 1, '1st': 1, second: 2, '2nd': 2, third: 3, '3rd': 3, fourth: 4, '4th': 4, fifth: 5, '5th': 5, sixth: 6, '6th': 6, seventh: 7, '7th': 7, eighth: 8, '8th': 8, ninth: 9, '9th': 9, tenth: 10, '10th': 10, last: 10 };
      const num = numM[2] ? parseInt(numM[2], 10) : ordinals[numM[1].toLowerCase()];
      if (num) return () => openProblemIndex(num);
    }

    // 3. Day switcher ("go to day 9", "open today", "switch to yesterday")
    const dayM = said.match(/\b(go to |switch to |open )?(day\s*\d+|today|yesterday|latest)\b/i);
    if (dayM) return () => openDayTarget(dayM[2]);

    // 4. Code mode views ("show attempt", "show reference", "compare code", "copy code")
    if (/\b(show |view |switch to )?(my )?attempt( code)?\b/i.test(said)) return () => run('code-attempt', `Voice “${raw}”`);
    if (/\b(show |view |switch to )?(reference|solution|official|cheat)( code)?\b/i.test(said)) return () => run('code-reference', `Voice “${raw}”`);
    if (/\b(show |view |toggle )?diff(erence)?\b|\bcompare( code)?\b/i.test(said)) return () => run('code-diff', `Voice “${raw}”`);
    if (/\bcopy( the)? code\b/i.test(said)) return () => run('copy-code', `Voice “${raw}”`);
    if (/\b(show |filter |view )?(only )?todo( problems)?\b/i.test(said)) return () => run('filter-todo', `Voice “${raw}”`);
    if (/\b(show |filter |view )?all( problems)?\b/i.test(said)) return () => run('filter-all', `Voice “${raw}”`);

    // 5. Ask coach / hints
    const askM = said.match(/^(ask|tell)( the)? coach (.+)/) || said.match(/^(question|ask)[: ]+(.+)/);
    if (askM) {
      const q = askM[askM.length - 1];
      return () => {
        openCoach();
        ask(q);
        feedback('Asking the coach');
        log(`Voice: ask coach “${q}”`);
      };
    }

    // 6. Problem by name
    const goM = said.match(/^(go to|open|show|switch to)( problem)? (.+)/);
    const named = goM && problemByName(goM[3]);
    if (named) {
      return () => {
        selectProblem(named.file);
        feedback(`Opening ${displayName(named.name)}`);
        log(`Voice: open ${named.name}`);
      };
    }

    // 7. Search in problem list
    const searchM = said.match(/^(search|find|filter) (.+)/);
    if (searchM && !/notes|knowledge|rag/i.test(searchM[2])) {
      return () => {
        const box = document.getElementById('search');
        if (box) {
          box.value = searchM[2];
          box.dispatchEvent(new Event('input', { bubbles: true }));
        }
        feedback(`Searching ${searchM[2]}`);
        log(`Voice: search “${searchM[2]}”`);
      };
    }

    // 8. RAG Knowledge Base Voice Query
    const ragM = said.match(/\b(search (notes|knowledge|rag|guide) (for )?|what do (our )?notes say about )(.+)/i);
    if (ragM) {
      const q = ragM[ragM.length - 1];
      return async () => {
        feedback(`Searching knowledge base for ${q}…`);
        try {
          const res = await api('/api/rag/search', { query: q, k: 3 });
          if (res.results && res.results.length) {
            const top = res.results[0];
            feedback(`${top.title}: ${top.snippet}`);
            if (window.copilot?.say) {
              window.copilot.say('pip', `💡 **${top.title}** (score ${top.score}):\n\n${top.text.slice(0, 500)}…`);
            }
          } else {
            feedback(`No notes found for “${q}”`);
          }
        } catch (err) {
          feedback('Search error: ' + err.message);
        }
      };
    }

    // 9. Language and accent switching ("speak in Hindi", "talk in English", "switch accent to Indian English", "hindi me bolo")
    const langM = said.match(/\b(speak|talk|switch( to)?|change( language to)?|set language to)\s+([a-z\s]+)\b/i)
      || raw.match(/\b(हिंदी|अंग्रेजी|इंग्लिश|कन्नड़|तमिल|तेलुगू|বাংলা|मराठी)\s*(में\s*बोलो|भाषा)\b/i);
    if (langM) {
      const resolver = window.buddyVoice?.resolveLangCode;
      const target = (langM[langM.length - 1] || langM[1] || '').trim();
      const code = resolver ? resolver(target) : target;
      if (code && (code !== target || /^[a-z]{2,3}-[a-z]{2,4}$/i.test(code))) {
        return () => {
          voice.setLanguage(code);
          feedback(`Switched language to ${code}`);
        };
      }
    }

    // 10. Built-in remote control phrase patterns.
    const hit = PHRASES.find(([re]) => re.test(said));
    if (hit) return () => run(hit[1], `Voice “${raw}”`);

    // 11. Bare problem name.
    const p = problemByName(said);
    if (p) {
      return () => {
        selectProblem(p.file);
        feedback(`Opening ${displayName(p.name)}`);
      };
    }
    return null;
  }

  function interpret(raw) {
    if (!normalize(raw)) return;
    const local = localCommand(raw);
    if (local) return local();
    if (window.copilot?.ready()) return window.copilot.handle(raw);
    if (window.copilot) return window.copilot.offline(raw);
    feedback(`I heard “${raw}” — try “next problem” or “open tests”`, 'surprised');
  }

  /*
   * Two ears:
   *  - AI ear (default with a Gemini key): ear.js records each sentence and the AI hears
   *    it directly, so any language, accent or mid-sentence switch works. The browser
   *    recogniser still runs alongside, only to fire short, confident English commands
   *    ("next", "run tests") instantly without waiting for the AI.
   *  - Browser ear: Chrome's recogniser in one language (auto-picked, switchable).
   */
  const voice = {
    rec: null,
    on: false,
    mode: null,
    localAt: 0,
    pending: null,
    get supported() {
      return Boolean(Recognition) || Boolean(window.ear?.supported);
    },
    useAi() {
      return load().ear !== 'browser' && Boolean(state.ai?.canHear) && Boolean(window.ear?.supported);
    },
    async start() {
      if (this.on) return true;
      const ai = this.useAi();
      if (!ai && !Recognition) {
        toast('Voice needs Chrome or Edge, or a Gemini key for the AI ear.', 'error');
        return false;
      }
      if (ai) {
        try {
          await window.ear.start({
            blocked: () => isSpeaking() || window.copilot?.busy,
            onStart: () => window.copilot?.hearing(true),
            onEnd: (kept) => window.copilot?.hearing(false, kept),
            onClip: (clip) => this.clip(clip),
          });
        } catch (err) {
          const denied = /denied|not allowed|permission/i.test(err.message);
          toast(denied ? 'Microphone access was blocked. Allow it in the address bar, then try again.' : `Could not start the microphone: ${err.message}`, 'error');
          return false;
        }
      }
      this.mode = ai ? 'ai' : 'browser';
      this.on = true;
      if (Recognition) this.startRec();
      pet()?.listening(true);
      feedback(ai ? 'I’m all ears! Talk to me in any language — or mix them 💛' : 'I’m listening! Say “next problem” or “open tests”.', 'wink');
      syncControls();
      return true;
    },
    startRec() {
      const rec = new Recognition();
      rec.lang = this.lang();
      rec.continuous = true;
      rec.interimResults = true;
      rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          const t = r[0].transcript.trim();
          // Ignore what the mic picks up while the buddy itself is talking.
          if (!t || isSpeaking()) continue;
          if (this.mode === 'ai') {
            if (r.isFinal) this.quick(t, r[0].confidence);
            continue;
          }
          if (r.isFinal) {
            window.copilot?.heard(t, true);
            interpret(t);
          } else {
            window.copilot?.heard(t, false);
            if (!window.copilot) pet()?.say(`🎙 ${t}…`, 1500);
          }
        }
      };
      rec.onerror = (e) => {
        if (this.mode === 'ai') return; // captions are a bonus there; the AI ear carries on
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          toast('Microphone access was blocked. Allow it in the address bar, then try again.', 'error');
          this.stop();
        } else if (e.error === 'network') {
          toast('Voice needs an internet connection (Chrome transcribes speech online).', 'error');
          this.stop();
        }
      };
      // Chrome ends sessions after silence; keep listening until the user stops it.
      rec.onend = () => {
        if (this.on && this.rec === rec) {
          try {
            rec.start();
          } catch { /* already restarting */ }
        }
      };
      try {
        rec.start();
        this.rec = rec;
      } catch (err) {
        if (this.mode !== 'ai') toast(`Could not start voice: ${err.message}`, 'error');
      }
    },
    // AI ear: a short, confident English command runs at once and its clip is dropped.
    quick(text, confidence) {
      // The browser ear only knows one language, so Kannada or Hindi can come out as
      // random English words. Only very confident, very short commands skip the AI.
      const said = normalize(text).replace(WAKE, '');
      // Cute stuff ("dance for me", "keep laughing") runs instantly even in a longer sentence.
      const fun = confidence > 0.7 && looksFastish(said) && window.copilot?.talkMatch(text);
      const local = fun || (confidence > 0.85 && said.split(' ').length <= 3 && looksFast(said)) ? localCommand(text) : null;
      if (local) {
        this.localAt = performance.now();
        this.pending = null;
        window.copilot?.heard(text, true);
        local();
      } else this.flush();
    },
    // Send the sentence to the AI at once; if the browser's quick result runs a local
    // command for the same sentence meanwhile, the AI's answer is dropped (copilot.js).
    clip(c) {
      if (this.localAt > c.start - 300) return;
      window.copilot?.handleAudio(c);
    },
    flush() {},
    stop() {
      this.on = false;
      const rec = this.rec;
      this.rec = null;
      try {
        rec?.stop();
      } catch { /* not running */ }
      window.ear?.stop();
      this.pending = null;
      this.mode = null;
      pet()?.listening(false);
      syncControls();
    },
    async toggle() {
      const on = this.on ? (this.stop(), false) : await this.start();
      save({ voiceOn: Boolean(on) });
      return on;
    },
    autoLang: null,
    lang() {
      const l = load().lang;
      if (l && l !== 'auto') return l;
      if (this.autoLang) return this.autoLang;
      const all = navigator.languages?.length ? navigator.languages : [navigator.language || 'en-US'];
      const indic = all.some((x) => /-IN$|^(hi|bn|ta|te|mr|kn|ml|gu|pa|ur|or)\b/i.test(x));
      return indic ? 'en-IN' : all[0] || 'en-US';
    },
    // Browser ear, auto mode: follow the language the AI heard, so the next sentence is
    // transcribed in it. The AI ear needs no switching; it hears every language.
    detected(lang) {
      if (!lang || (load().lang && load().lang !== 'auto')) return;
      const cur = this.lang();
      const base = (x) => x.toLowerCase().split('-')[0];
      if (base(lang) === base(cur)) return;
      if (base(lang) === 'en' && cur === 'en-IN') return;
      this.autoLang = lang;
      if (this.mode === 'ai' || !this.on) return;
      let name = lang;
      try {
        name = new Intl.DisplayNames([lang], { type: 'language' }).of(lang);
      } catch { /* unknown code */ }
      toast(`Auto-detected ${name} — listening in it now.`);
      this.restart();
    },
    restart() {
      if (!this.on) return;
      this.stop();
      setTimeout(() => this.start(), 250);
    },
    // Switch the recognition language; restarts the session when listening.
    setLanguage(lang) {
      const resolver = window.buddyVoice?.resolveLangCode || ((x) => x);
      const code = resolver(lang);
      save({ lang: code });
      this.restart();
      syncControls();
      document.dispatchEvent(new CustomEvent('assistant:change'));
    },
  };

  /* ======================================================================
     Gestures
     ====================================================================== */
  const MP_VERSION = '0.10.14';
  const MP_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}`;
  const MODEL = 'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task';

  const BUILTIN = {
    Thumb_Up: { emoji: '👍', label: 'Thumbs up', action: 'run-tests' },
    Victory: { emoji: '✌️', label: 'Peace / victory', action: 'next-problem' },
    Thumb_Down: { emoji: '👎', label: 'Thumbs down', action: 'prev-problem' },
    Pointing_Up: { emoji: '☝️', label: 'Point up', action: 'open-coach' },
    Open_Palm: { emoji: '✋', label: 'Open palm', action: 'close' },
    ILoveYou: { emoji: '🤟', label: 'I love you', action: 'read-story' },
    Closed_Fist: { emoji: '✊', label: 'Fist', action: 'toggle-voice' },
    Swipe_Left: { emoji: '👈', label: 'Swipe left', action: 'prev-tab' },
    Swipe_Right: { emoji: '👉', label: 'Swipe right', action: 'next-tab' },
    Swipe_Up: { emoji: '👆', label: 'Swipe up', action: 'scroll-up' },
    Swipe_Down: { emoji: '👇', label: 'Swipe down', action: 'scroll-down' },
  };
  const bindings = () => ({ ...Object.fromEntries(Object.entries(BUILTIN).map(([k, v]) => [k, v.action])), ...(load().gestureMap || {}) });

  // Hand landmarks → translation/scale-invariant feature vector (wrist at origin,
  // scaled by palm size), so a trained pose matches anywhere in frame and at any distance.
  function features(lm) {
    const w = lm[0];
    const palm = Math.hypot(lm[9].x - w.x, lm[9].y - w.y, (lm[9].z || 0) - (w.z || 0)) || 1;
    const out = [];
    for (const p of lm) out.push((p.x - w.x) / palm, (p.y - w.y) / palm, ((p.z || 0) - (w.z || 0)) / palm);
    return out;
  }
  const dist = (a, b) => {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
    return Math.sqrt(s);
  };
  const customs = () => load().gestures || [];

  // k-NN with a per-gesture acceptance radius learned from its own samples.
  function classifyCustom(f) {
    let best = null;
    for (const g of customs()) {
      const ds = g.samples.map((s) => dist(f, s)).sort((a, b) => a - b);
      const k = ds.slice(0, 5);
      const d = k.reduce((a, b) => a + b, 0) / k.length;
      if (d <= g.radius && (!best || d < best.d)) best = { g, d };
    }
    return best;
  }

  // A chip on the buddy: the sign it sees, with a ring that fills while you hold it.
  function showLive(name, progress = 0, fired = false) {
    const host = pet()?.el;
    if (!host) return;
    let chip = host.querySelector('.gesture-chip');
    if (!name) return void chip?.remove();
    if (!chip) {
      chip = document.createElement('span');
      chip.className = 'gesture-chip';
      chip.setAttribute('aria-hidden', 'true');
      host.append(chip);
    }
    const custom = name.startsWith('custom:') ? customs().find((g) => `custom:${g.id}` === name) : null;
    chip.textContent = custom ? custom.name : BUILTIN[name]?.emoji || '✋';
    chip.classList.toggle('is-word', Boolean(custom));
    const idle = !custom && (gestures.suppress.has(name) || !bindings()[name] || bindings()[name] === 'none');
    chip.classList.toggle('is-idle', idle);
    chip.style.setProperty('--p', String(idle ? 0 : progress));
    if (fired) {
      chip.classList.add('is-fired');
      setTimeout(() => chip.classList.remove('is-fired'), 600);
    }
  }

  const gestures = {
    on: false,
    recognizer: null,
    stream: null,
    video: null,
    raf: 0,
    lastTs: -1,
    held: { name: null, since: 0 },
    cooldownUntil: 0,
    wrist: [],
    live: null, // { name, score } for the guide's live readout
    recording: null,
    listeners: new Set(),

    async start() {
      if (this.on) return true;
      if (!navigator.mediaDevices?.getUserMedia) {
        toast('This browser cannot use the camera.', 'error');
        return false;
      }
      pet()?.say('Waking up my eyes… (first time downloads a small model)', 4000);
      try {
        if (!this.recognizer) await this.build(load().gestureCpu ? 'CPU' : 'GPU');
        this.stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' }, audio: false });
      } catch (err) {
        const denied = /denied|not allowed|permission/i.test(err.message);
        toast(denied ? 'Camera access was blocked. Allow it in the address bar, then try again.' : `Could not start gestures: ${err.message}`, 'error');
        pet()?.say('');
        return false;
      }
      this.video = document.createElement('video');
      this.video.muted = true;
      this.video.playsInline = true;
      this.video.srcObject = this.stream;
      await this.video.play();
      this.video.className = 'mascot-cam';
      pet()?.el.append(this.video);
      this.on = true;
      pet()?.watching(true);
      feedback('I can see your hands now! 👍 runs tests, ✌️ next problem.', 'wink');
      this.loop();
      syncControls();
      return true;
    },

    // GPU is fastest, but some laptop graphics drivers fail inside WebGL; CPU always works.
    async build(delegate) {
      const vision = await import(`${MP_BASE}/vision_bundle.mjs`);
      const files = await vision.FilesetResolver.forVisionTasks(`${MP_BASE}/wasm`);
      const opts = (d) => ({ baseOptions: { modelAssetPath: MODEL, delegate: d }, runningMode: 'VIDEO', numHands: 1, minHandDetectionConfidence: 0.4, minHandPresenceConfidence: 0.4, minTrackingConfidence: 0.4 });
      try {
        this.recognizer = await vision.GestureRecognizer.createFromOptions(files, opts(delegate));
        this.delegate = delegate;
      } catch {
        this.recognizer = await vision.GestureRecognizer.createFromOptions(files, opts('CPU'));
        this.delegate = 'CPU';
      }
      this.errors = 0;
    },
    async fallBack(err) {
      if (this.rebuilding) return;
      this.rebuilding = true;
      try {
        if (this.delegate !== 'CPU') {
          save({ gestureCpu: true });
          this.recognizer?.close?.();
          this.recognizer = null;
          await this.build('CPU');
          toast('Your graphics chip struggled, so hand tracking switched to the CPU. Gestures work again.');
        } else {
          toast(`Hand tracking stopped: ${err?.message || 'the recogniser keeps failing'}`, 'error');
          this.stop();
        }
      } finally {
        this.rebuilding = false;
      }
    },
    votes: [],

    stop() {
      this.on = false;
      cancelAnimationFrame(this.raf);
      this.stream?.getTracks().forEach((t) => t.stop());
      this.stream = null;
      this.video?.remove();
      showLive(null);
      this.video = null;
      this.live = null;
      pet()?.watching(false);
      syncControls();
    },

    async toggle() {
      const on = this.on ? (this.stop(), false) : await this.start();
      save({ gesturesOn: Boolean(on) });
      return on;
    },

    loop() {
      if (!this.on) return;
      this.raf = requestAnimationFrame(() => this.loop());
      const v = this.video;
      if (!v || v.readyState < 2) return;
      const now = performance.now();
      if (now - this.lastTs < 66) return; // ~15 fps is plenty for gestures
      this.lastTs = now;
      if (this.rebuilding) return;
      let res;
      try {
        res = this.recognizer.recognizeForVideo(v, now);
        this.errors = 0;
      } catch (err) {
        if (++this.errors >= 8) this.fallBack(err);
        return;
      }
      const lm = res.landmarks?.[0];
      this.listeners.forEach((fn) => fn(res, v));
      if (!lm) {
        this.votes = [];
        showLive(null);
        this.live = null;
        this.held = { name: null, since: 0 };
        this.wrist = [];
        return;
      }
      const f = features(lm);

      if (this.recording) {
        this.recording.samples.push(f);
        this.recording.onProgress?.(this.recording.samples.length / this.recording.target);
        if (this.recording.samples.length >= this.recording.target) this.finishRecording();
        return;
      }

      // Swipe: the wrist travels far quickly — sideways for tabs (the camera image is
      // mirrored), up or down to scroll. The bigger movement decides the direction.
      this.wrist.push({ x: lm[0].x, y: lm[0].y, t: now });
      this.wrist = this.wrist.filter((p) => now - p.t < 450);
      const first = this.wrist[0];
      const last = this.wrist[this.wrist.length - 1];
      const dx = this.wrist.length > 3 ? last.x - first.x : 0;
      const dy = this.wrist.length > 3 ? last.y - first.y : 0;
      if (now > this.cooldownUntil && Math.max(Math.abs(dx), Math.abs(dy)) > 0.28) {
        this.fire(Math.abs(dx) >= Math.abs(dy) ? (dx < 0 ? 'Swipe_Right' : 'Swipe_Left') : dy < 0 ? 'Swipe_Up' : 'Swipe_Down');
        this.wrist = [];
        return;
      }

      // Custom gestures win over built-ins when they match confidently.
      const custom = classifyCustom(f);
      let raw = null;
      let score = 0;
      if (custom) {
        raw = `custom:${custom.g.id}`;
        score = Math.max(0, 1 - custom.d / (custom.g.radius * 1.4));
      } else {
        const top = res.gestures?.[0]?.[0];
        if (top && top.categoryName !== 'None' && top.score > 0.5) {
          raw = top.categoryName;
          score = top.score;
        }
      }
      // The recogniser flickers between neighbouring signs; a sign counts when it wins
      // 3 of the last 5 frames, so a held pose is not reset by one odd frame.
      this.votes.push(raw);
      if (this.votes.length > 5) this.votes.shift();
      const tally = {};
      for (const v of this.votes) if (v) tally[v] = (tally[v] || 0) + 1;
      const [best, count] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0] || [null, 0];
      const name = count >= 3 ? best : null;
      this.live = name ? { name, score } : null;
      const holdMs = 450;
      if (name) showLive(name, name === this.held.name && now > this.cooldownUntil ? Math.min(1, (now - this.held.since) / holdMs) : 0);
      else showLive('hand', 0);
      // A pose must be held ~0.6 s, then a 1.5 s cooldown, so it never fires twice by accident.
      if (name !== this.held.name) this.held = { name, since: now };
      else if (name && now - this.held.since > holdMs && now > this.cooldownUntil) {
        this.fire(name);
        this.held.since = now + 1e9;
      }
    },

    fire(name) {
      this.cooldownUntil = performance.now() + 1200;
      showLive(name, 1, true);
      if (name.startsWith('custom:')) {
        const g = customs().find((x) => `custom:${x.id}` === name);
        if (g) run(g.action, `Gesture “${g.name}”`);
        return;
      }
      // The air cursor owns pointing, open palm (scroll) and fist; those signs stay quiet then.
      if (this.suppress.has(name)) return;
      const action = bindings()[name];
      if (action && action !== 'none') run(action, `Gesture ${BUILTIN[name]?.emoji || ''} ${BUILTIN[name]?.label || name}`);
    },
    suppress: new Set(),

    // Training: collect ~45 frames of one held pose, then learn its acceptance radius.
    record({ name, action, onProgress, onDone }) {
      this.recording = { name, action, samples: [], target: 45, onProgress, onDone };
    },
    finishRecording() {
      const r = this.recording;
      this.recording = null;
      const centroid = r.samples[0].map((_, i) => r.samples.reduce((a, s) => a + s[i], 0) / r.samples.length);
      const spread = r.samples.map((s) => dist(s, centroid)).sort((a, b) => a - b);
      const radius = Math.max(0.35, spread[Math.floor(spread.length * 0.9)] * 2.2);
      const g = { id: Date.now().toString(36), name: r.name, action: r.action, samples: r.samples.map((s) => s.map((v) => Math.round(v * 1000) / 1000)), radius };
      save({ gestures: [...customs(), g] });
      feedback(`Learned “${r.name}”!`, 'sparkle');
      r.onDone?.(g);
    },
  };

  /* ======================================================================
     Controls: header buttons + keyboard (V = voice, W = watch/gestures)
     ====================================================================== */
  function syncControls() {
    const v = document.getElementById('btnVoice');
    const g = document.getElementById('btnGestures');
    if (v) {
      v.classList.toggle('is-on', voice.on);
      v.setAttribute('aria-pressed', String(voice.on));
      v.title = voice.on ? 'Stop voice control (V)' : 'Voice control (V)';
    }
    if (g) {
      g.classList.toggle('is-on', gestures.on);
      g.setAttribute('aria-pressed', String(gestures.on));
      g.title = gestures.on ? 'Stop gesture control (W)' : 'Gesture control (W)';
    }
    document.dispatchEvent(new CustomEvent('assistant:change'));
  }

  function bind() {
    document.getElementById('btnVoice')?.addEventListener('click', () => voice.toggle());
    document.getElementById('btnGestures')?.addEventListener('click', () => gestures.toggle());
    addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest('input, textarea, select, [contenteditable]')) return;
      if ([...document.querySelectorAll('dialog')].some((d) => d.matches(':modal'))) return;
      const k = e.key.toLowerCase();
      if (k === 'v') voice.toggle();
      if (k === 'w') gestures.toggle();
    });
    // Release camera/mic when the tab is hidden for a while; resume is one click.
    addEventListener('pagehide', () => {
      voice.stop();
      gestures.stop();
    });
    syncControls();
    resume();
  }
  // Bring voice and camera back after a reload when they were on and permission is already granted.
  async function resume() {
    const granted = async (name) => {
      try {
        return (await navigator.permissions.query({ name })).state === 'granted';
      } catch {
        return false;
      }
    };
    const cfg = load();
    // Wait for the AI status, so a returning voice session picks the AI ear when it can.
    for (let i = 0; i < 50 && !state.ai; i++) await new Promise((r) => setTimeout(r, 100));
    if (cfg.voiceOn && voice.supported && (await granted('microphone'))) voice.start();
    if (cfg.gesturesOn && (await granted('camera'))) gestures.start();
  }
  // A key added (or the status arriving late) upgrades a running browser ear to the AI ear.
  document.addEventListener('ai:status', () => {
    if (voice.on && voice.mode === 'browser' && voice.useAi()) voice.restart();
  });
  document.addEventListener('DOMContentLoaded', bind);

  const api = { ACTIONS, BUILTIN, PHRASES, voice, gestures, run, interpret, readStory, load, save, bindings, customs, features, classifyCustom, events, speak, feedback, log, isSpeaking, stopSpeaking, VOICES, localCommand, normalize, problemByName, closeTop, openProblemIndex, openDayTarget };
  if (typeof window !== 'undefined') window.assistant = api;
  return api;
})();

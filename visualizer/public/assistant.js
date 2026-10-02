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
  // Talk-back in the reply's own language, with the closest installed voice.
  let speakingUntil = 0;
  function voiceFor(lang) {
    const voices = ('speechSynthesis' in window && speechSynthesis.getVoices()) || [];
    const base = String(lang || '').toLowerCase().split('-')[0];
    return voices.find((v) => v.lang.toLowerCase() === String(lang).toLowerCase()) || voices.find((v) => v.lang.toLowerCase().startsWith(base)) || null;
  }
  function speak(text, lang) {
    if (!load().talkBack || !('speechSynthesis' in window) || !text) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voiceFor(lang || load().lang || navigator.language);
    if (v) u.voice = v;
    u.lang = v?.lang || lang || 'en-US';
    u.rate = 1.05;
    u.pitch = 1.25;
    // Echo guard: while the buddy talks (plus a short tail) the mic ignores what it hears.
    speakingUntil = Date.now() + 600 + text.length * 70;
    u.onstart = () => pet()?.talking?.(true);
    u.onend = u.onerror = () => {
      speakingUntil = Date.now() + 400;
      pet()?.talking?.(false);
    };
    speechSynthesis.speak(u);
  }
  const isSpeaking = () => ('speechSynthesis' in window && speechSynthesis.speaking) || Date.now() < speakingUntil;
  function feedback(text, reaction = 'delighted') {
    if (window.copilot && document.getElementById('buddyChat') && !document.getElementById('buddyChat').hidden) return window.copilot.reply(text, reaction);
    pet()?.say(text);
    pet()?.react(reaction, 700);
    speak(text);
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
    'toggle-theme': { label: 'Switch light / dark', run: () => toggleTheme(), say: 'Switched the lights' },
    'close': { label: 'Close / go back', run: () => closeTop() || picker.close({ focusButton: false }), say: 'Closed' },
    'scroll-down': { label: 'Scroll down', run: () => scrollBy({ top: innerHeight * 0.7, behavior: 'smooth' }), say: '' },
    'scroll-up': { label: 'Scroll up', run: () => scrollBy({ top: -innerHeight * 0.7, behavior: 'smooth' }), say: '' },
    'scroll-top': { label: 'Back to top', run: () => scrollTo({ top: 0, behavior: 'smooth' }), say: 'Back to top' },
    'read-story': { label: 'Read the story aloud', run: () => readStory(), say: '' },
    'toggle-pip': { label: 'Hide / show the buddy', run: () => pet()?.toggle(), say: '' },
    'stop-voice': { label: 'Stop listening', run: () => voice.stop(), say: 'Okay, I stopped listening' },
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
     Voice
     ====================================================================== */
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  // Built-in phrases → actions, tried after the user's own phrases. Order matters.
  const PHRASES = [
    [/\b(stop|quit) listening\b|\bgo to sleep\b/, 'stop-voice'],
    [/\bnext (tab|page)\b/, 'next-tab'],
    [/\b(previous|last|back a) (tab|page)\b/, 'prev-tab'],
    [/\bnext( problem| question| one)?\b/, 'next-problem'],
    [/\b(previous|last|go back)( problem| question| one)?\b/, 'prev-problem'],
    [/\b(run|check|test)( my| the)? (tests?|code|solution|samples?)\b|\brun it\b/, 'run-tests'],
    [/\bverify\b/, 'verify-day'],
    [/\b(read|tell)( me)?( the)? story( aloud| out loud)?\b/, 'read-story'],
    [/\bstory\b/, 'tab-story'],
    [/\bwalk ?through\b|\bexplanation\b/, 'tab-walkthrough'],
    [/\bdiagrams?\b/, 'tab-diagrams'],
    [/\bvisuali[sz]e\b|\bsimulat/, 'tab-visualize'],
    [/\bcode\b|\beditor\b/, 'tab-code'],
    [/\btests?\b|\bplayground\b/, 'tab-tests'],
    [/\bcoach\b|\bhelp me\b/, 'open-coach'],
    [/\bguide\b|\bhelp\b|\bsettings\b/, 'open-guide'],
    [/\btour\b/, 'start-tour'],
    [/\b(dark|light|night|day) mode\b|\bswitch (the )?theme\b/, 'toggle-theme'],
    [/\bscroll down\b|\bdown\b/, 'scroll-down'],
    [/\bscroll up\b|\bup\b/, 'scroll-up'],
    [/\b(go to |back to )?(the )?top\b/, 'scroll-top'],
    [/\b(close|cancel|dismiss|go back|exit)\b/, 'close'],
    [/\b(hide|show) (pip|bun|bunny|hamster|buddy)\b/, 'toggle-pip'],
  ];

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

  // Short, plain English commands run instantly from the phrase table. Anything longer,
  // multi-step, or in another language goes to the AI planner (copilot.js), which
  // understands any language, mixes, and misheard words.
  const FAST_MAX_WORDS = 5;
  const looksFast = (t) => /^[\x00-\x7F]*$/.test(t) && t.split(' ').length <= FAST_MAX_WORDS && !/\b(and|then|after|also|aur|phir)\b/.test(t);

  function interpret(raw) {
    const text = normalize(raw);
    if (!text) return;
    if (window.copilot?.smallTalk(raw)) return;
    if (window.copilot?.ready() && !looksFast(text.replace(/^(hey |ok |okay )?(pip|bun|bunny|buddy)[, ]*/, ''))) {
      return window.copilot.handle(raw);
    }
    // The buddy's name as a wake word is optional: "pip, next problem" == "next problem".
    const said = text.replace(/^(hey |ok |okay )?(pip|bun|bunny|buddy)[, ]*/, '');

    // 1. The user's own phrases.
    for (const c of load().phrases || []) {
      if (said.includes(normalize(c.phrase))) return run(c.action, `Voice “${raw}”`);
    }
    // 2. "ask coach …" sends the rest as a question.
    const askM = said.match(/^(ask|tell)( the)? coach (.+)/) || said.match(/^(question|ask)[: ]+(.+)/);
    if (askM) {
      const q = askM[askM.length - 1];
      openCoach();
      ask(q);
      feedback('Asking the coach');
      return log(`Voice: ask coach “${q}”`);
    }
    // 3. "go to / open <problem name>".
    const goM = said.match(/^(go to|open|show|switch to)( problem)? (.+)/);
    if (goM) {
      const p = problemByName(goM[3]);
      if (p) {
        selectProblem(p.file);
        feedback(`Opening ${displayName(p.name)}`);
        return log(`Voice: open ${p.name}`);
      }
    }
    // 4. "search <words>".
    const searchM = said.match(/^(search|find|look for) (.+)/);
    if (searchM) {
      const box = document.getElementById('search');
      box.value = searchM[2];
      box.dispatchEvent(new Event('input', { bubbles: true }));
      feedback(`Searching ${searchM[2]}`);
      return log(`Voice: search “${searchM[2]}”`);
    }
    // 5. Built-in phrases.
    for (const [re, action] of PHRASES) {
      if (re.test(said)) return run(action, `Voice “${raw}”`);
    }
    // 6. A bare problem name.
    const p = problemByName(said);
    if (p) {
      selectProblem(p.file);
      return feedback(`Opening ${displayName(p.name)}`);
    }
    if (window.copilot?.ready()) return window.copilot.handle(raw);
    if (window.copilot) return window.copilot.offline(raw);
    feedback(`I heard “${raw}” — try “next problem” or “open tests”`, 'surprised');
  }

  const voice = {
    rec: null,
    on: false,
    supported: Boolean(Recognition),
    start() {
      if (!Recognition) {
        toast('Voice needs Chrome or Edge (this browser has no speech recognition).', 'error');
        return false;
      }
      if (this.on) return true;
      const rec = new Recognition();
      rec.lang = this.lang();
      rec.continuous = true;
      rec.interimResults = true;
      rec.onresult = (e) => {
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          const t = r[0].transcript.trim();
          // Ignore what the mic picks up while the buddy itself is talking.
          if (isSpeaking()) continue;
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
        if (this.on) {
          try {
            rec.start();
          } catch { /* already restarting */ }
        }
      };
      try {
        rec.start();
      } catch (err) {
        toast(`Could not start voice: ${err.message}`, 'error');
        return false;
      }
      this.rec = rec;
      this.on = true;
      pet()?.listening(true);
      feedback(`I'm listening! Say “next problem” or “open tests”.`, 'wink');
      syncControls();
      return true;
    },
    stop() {
      this.on = false;
      try {
        this.rec?.stop();
      } catch { /* not running */ }
      this.rec = null;
      pet()?.listening(false);
      syncControls();
    },
    toggle() {
      const on = this.on ? (this.stop(), false) : this.start();
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
    // Auto mode: follow the language the AI heard, so the next sentence is transcribed in it.
    detected(lang) {
      if (!lang || (load().lang && load().lang !== 'auto')) return;
      const cur = this.lang();
      const base = (x) => x.toLowerCase().split('-')[0];
      if (base(lang) === base(cur)) return;
      if (base(lang) === 'en' && cur === 'en-IN') return;
      this.autoLang = lang;
      let name = lang;
      try {
        name = new Intl.DisplayNames([lang], { type: 'language' }).of(lang);
      } catch { /* unknown code */ }
      toast(`Auto-detected ${name} — listening in it now.`);
      if (this.on) {
        this.stop();
        setTimeout(() => this.start(), 250);
      }
    },
    // Switch the recognition language; restarts the session when listening.
    setLanguage(lang) {
      save({ lang });
      if (this.on) {
        this.stop();
        setTimeout(() => this.start(), 250);
      }
      syncControls();
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
    Closed_Fist: { emoji: '✊', label: 'Fist', action: 'none' },
    Swipe_Left: { emoji: '👈', label: 'Swipe left', action: 'prev-tab' },
    Swipe_Right: { emoji: '👉', label: 'Swipe right', action: 'next-tab' },
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
        if (!this.recognizer) {
          const vision = await import(`${MP_BASE}/vision_bundle.mjs`);
          const files = await vision.FilesetResolver.forVisionTasks(`${MP_BASE}/wasm`);
          const opts = { baseOptions: { modelAssetPath: MODEL, delegate: 'GPU' }, runningMode: 'VIDEO', numHands: 1 };
          try {
            this.recognizer = await vision.GestureRecognizer.createFromOptions(files, opts);
          } catch {
            opts.baseOptions.delegate = 'CPU';
            this.recognizer = await vision.GestureRecognizer.createFromOptions(files, opts);
          }
        }
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
      let res;
      try {
        res = this.recognizer.recognizeForVideo(v, now);
      } catch {
        return;
      }
      const lm = res.landmarks?.[0];
      this.listeners.forEach((fn) => fn(res, v));
      if (!lm) {
        if (this.live) showLive(null);
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

      // Swipe: the wrist travels far sideways quickly (the camera image is mirrored).
      this.wrist.push({ x: lm[0].x, t: now });
      this.wrist = this.wrist.filter((p) => now - p.t < 450);
      const dx = this.wrist.length > 3 ? this.wrist[this.wrist.length - 1].x - this.wrist[0].x : 0;
      if (Math.abs(dx) > 0.28 && now > this.cooldownUntil) {
        this.fire(dx < 0 ? 'Swipe_Right' : 'Swipe_Left');
        this.wrist = [];
        return;
      }

      // Custom gestures win over built-ins when they match confidently.
      const custom = classifyCustom(f);
      let name = null;
      let score = 0;
      if (custom) {
        name = `custom:${custom.g.id}`;
        score = Math.max(0, 1 - custom.d / (custom.g.radius * 1.4));
      } else {
        const top = res.gestures?.[0]?.[0];
        if (top && top.categoryName !== 'None' && top.score > 0.55) {
          name = top.categoryName;
          score = top.score;
        }
      }
      this.live = name ? { name, score } : null;
      const holdMs = 450;
      showLive(name, name && name === this.held.name && now > this.cooldownUntil ? Math.min(1, (now - this.held.since) / holdMs) : 0);
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
    if (cfg.voiceOn && voice.supported && (await granted('microphone'))) voice.start();
    if (cfg.gesturesOn && (await granted('camera'))) gestures.start();
  }
  document.addEventListener('DOMContentLoaded', bind);

  return { ACTIONS, BUILTIN, PHRASES, voice, gestures, run, interpret, readStory, load, save, bindings, customs, features, classifyCustom, events, speak, feedback, log, isSpeaking, normalize, problemByName, closeTop };
})();

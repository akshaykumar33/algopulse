/**
 * The buddy's voice: one continuous, cheerful voice with the best engine this PC can run.
 *
 *   1. Gemini's AI voice: most natural, any language; a small daily quota, so it is used
 *      for real conversation replies only (the caller asks for it with { ai: true }).
 *   2. Kokoro: a small neural voice that runs on this PC (English, bright cheerful
 *      female voices). It needs a graphics chip (WebGPU) to keep up with speech, so it
 *      measures itself on first use and steps aside when it is too slow.
 *   3. The best voice the browser has: neural "Natural" / "Online" voices first, then
 *      Google voices, then the old desktop voices (with a gentle pitch, since pushing
 *      those up is what makes them sound robotic).
 *
 * Text is spoken one sentence at a time, back to back, so long replies flow without the
 * browser cutting them off, and the next sentence is prepared while one is playing.
 */
'use strict';

window.buddyVoice = (() => {
  const store = () => {
    try {
      return JSON.parse(localStorage.getItem('algopulse-assistant') || '{}');
    } catch {
      return {};
    }
  };
  const pet = () => window.mascot;
  const STYLE = {
    cute: { ai: 'Leda', kokoro: 'af_bella', speed: 0.92, pitch: { natural: 1.12, google: 1.15, desktop: 1.08 }, rate: 0.92, words: 'Speak in a soft, seductive, sweetly affectionate and humanized companion voice, full of warm whispers, teasing smiles, tender giggles, and deep expression' },
    sweet: { ai: 'Aoede', kokoro: 'af_heart', speed: 0.92, pitch: { natural: 1.08, google: 1.1, desktop: 1.05 }, rate: 0.92, words: 'Speak as a warm, sweet, gentle hamster companion with a soft, smiling voice' },
    bright: { ai: 'Zephyr', kokoro: 'af_nova', speed: 1, pitch: { natural: 1.2, google: 1.22, desktop: 1.15 }, rate: 1, words: 'Speak as a bright, lively, energetic hamster companion in a friendly, enthusiastic voice' },
  };
  const MOOD = {
    laugh: 'laughing and giggling happily between the words',
    giggle: 'with cute little giggles and bubbly chuckles',
    love: 'adoringly and warmly, full of sweet love',
    flirt: 'in a playful, charming, teasing and flirty tone with a sweet giggle',
    possessive: 'in a cute, clingy, playfully possessive tone with affectionate emphasis',
    pout: 'in a cute, mock-grumpy, adorable pouting tone',
    kiss: 'blowing an affectionate kiss with a sweet, warm voice',
    baby: 'in a wide-eyed, innocent, super adorable baby-cutie voice',
    sad: 'softly and a little sadly, but still sweet',
    cry: 'sniffling, teary and wobbly, then brave',
    angry: 'in a pretend-grumpy, pouty way that is still cute',
    surprised: 'amazed and excited',
    proud: 'proud and cheering',
    sleepy: 'sleepy and yawning',
    shy: 'shyly and bashfully',
  };
  const style = () => STYLE[store().voiceStyle] || STYLE.cute;

  // Language-specific native accents for Ham's voice:
  const ACCENTS = {
    // English regional accents
    'en-IN': 'with an authentic, charming Indian English accent (natural Indian rhythm, clear cadence and warm Hinglish inflection)',
    'en-GB': 'with a charming, natural British English accent (crisp, polite British cadence)',
    'en-US': 'with a natural, friendly American English accent',
    'en-AU': 'with a friendly, casual Australian English accent',
    'en-CA': 'with a natural Canadian English accent',

    // South Asian languages & Hinglish
    'hi-IN': 'with an authentic, fluent native Hindi accent and natural, expressive pronunciation (or natural Hinglish phrasing)',
    'bn-IN': 'with an authentic, fluent native Bengali accent and sweet melodious intonation',
    'ta-IN': 'with an authentic, fluent native Tamil accent and clear, crisp pronunciation',
    'te-IN': 'with an authentic, fluent native Telugu accent and natural cadence',
    'mr-IN': 'with an authentic, fluent native Marathi accent and natural rhythm',
    'kn-IN': 'with an authentic, fluent native Kannada accent and clear pronunciation',
    'ml-IN': 'with an authentic, fluent native Malayalam accent and natural cadence',
    'gu-IN': 'with an authentic, fluent native Gujarati accent and warm inflection',
    'pa-IN': 'with an authentic, fluent native Punjabi accent and lively, energetic rhythm',
    'ur-PK': 'with an authentic, fluent native Urdu accent and polite, refined pronunciation',

    // East & Southeast Asian languages
    'ja-JP': 'with an authentic, fluent native Japanese accent and natural Tokyo pronunciation',
    'ko-KR': 'with an authentic, fluent native Korean accent and natural Seoul pronunciation',
    'zh-CN': 'with an authentic, fluent native Mandarin Chinese accent (Standard Putonghua pronunciation)',
    'zh-TW': 'with an authentic, fluent native Taiwanese Mandarin accent',
    'id-ID': 'with an authentic, fluent native Indonesian accent (Bahasa Indonesia)',

    // European & Middle Eastern languages
    'es-ES': 'with an authentic, fluent native Spanish accent and natural Iberian pronunciation',
    'es-MX': 'with an authentic, fluent native Mexican Spanish accent',
    'fr-FR': 'with an authentic, fluent native French accent and natural French cadence',
    'de-DE': 'with an authentic, fluent native German accent and clear German pronunciation',
    'it-IT': 'with an authentic, fluent native Italian accent and expressive musical cadence',
    'pt-BR': 'with an authentic, fluent native Brazilian Portuguese accent and warm melodic rhythm',
    'pt-PT': 'with an authentic, fluent native European Portuguese accent',
    'ru-RU': 'with an authentic, fluent native Russian accent and natural Russian cadence',
    'ar-SA': 'with an authentic, fluent native Arabic accent and clear Modern Standard Arabic pronunciation',
    'tr-TR': 'with an authentic, fluent native Turkish accent and natural Turkish cadence',
  };

  const LANG_MAP = {
    auto: 'auto',
    hindi: 'hi-IN', hi: 'hi-IN', 'hi-in': 'hi-IN', devanagari: 'hi-IN',
    hinglish: 'en-IN', 'indian english': 'en-IN', 'en-in': 'en-IN',
    english: 'en-US', 'en-us': 'en-US', en: 'en-US', us: 'en-US', american: 'en-US',
    british: 'en-GB', 'en-gb': 'en-GB', uk: 'en-GB',
    bengali: 'bn-IN', bn: 'bn-IN', 'bn-in': 'bn-IN', bangla: 'bn-IN',
    tamil: 'ta-IN', ta: 'ta-IN', 'ta-in': 'ta-IN',
    telugu: 'te-IN', te: 'te-IN', 'te-in': 'te-IN',
    marathi: 'mr-IN', mr: 'mr-IN', 'mr-in': 'mr-IN',
    kannada: 'kn-IN', kn: 'kn-IN', 'kn-in': 'kn-IN',
    malayalam: 'ml-IN', ml: 'ml-IN', 'ml-in': 'ml-IN',
    gujarati: 'gu-IN', gu: 'gu-IN', 'gu-in': 'gu-IN',
    punjabi: 'pa-IN', pa: 'pa-IN', 'pa-in': 'pa-IN',
    urdu: 'ur-PK', ur: 'ur-PK', 'ur-pk': 'ur-PK',
    japanese: 'ja-JP', ja: 'ja-JP', 'ja-jp': 'ja-JP', nihongo: 'ja-JP',
    korean: 'ko-KR', ko: 'ko-KR', 'ko-kr': 'ko-KR',
    chinese: 'zh-CN', zh: 'zh-CN', 'zh-cn': 'zh-CN', mandarin: 'zh-CN',
    spanish: 'es-ES', es: 'es-ES', 'es-es': 'es-ES', espanol: 'es-ES',
    french: 'fr-FR', fr: 'fr-FR', 'fr-fr': 'fr-FR', francais: 'fr-FR',
    german: 'de-DE', de: 'de-DE', 'de-de': 'de-DE', deutsch: 'de-DE',
    italian: 'it-IT', it: 'it-IT', 'it-it': 'it-IT', italiano: 'it-IT',
    russian: 'ru-RU', ru: 'ru-RU', 'ru-ru': 'ru-RU',
    portuguese: 'pt-BR', pt: 'pt-BR', 'pt-br': 'pt-BR',
    arabic: 'ar-SA', ar: 'ar-SA', 'ar-sa': 'ar-SA',
    turkish: 'tr-TR', tr: 'tr-TR', 'tr-tr': 'tr-TR',
    indonesian: 'id-ID', id: 'id-ID', 'id-id': 'id-ID',
  };

  function resolveLangCode(raw) {
    if (!raw) return 'en-US';
    const key = String(raw).trim().toLowerCase().replace(/_/g, '-');
    if (LANG_MAP[key]) return LANG_MAP[key];
    for (const [k, v] of Object.entries(LANG_MAP)) {
      if (key.includes(k)) return v;
    }
    return key;
  }

  function accentStyle(lang) {
    if (!lang) return '';
    const code = resolveLangCode(lang);
    if (ACCENTS[code]) return ACCENTS[code];
    const key = String(code).replace('_', '-');
    if (ACCENTS[key]) return ACCENTS[key];
    const lower = key.toLowerCase();
    for (const [k, v] of Object.entries(ACCENTS)) {
      if (k.toLowerCase() === lower) return v;
    }
    const base = lower.split('-')[0];
    for (const [k, v] of Object.entries(ACCENTS)) {
      if (k.toLowerCase().startsWith(base)) return v;
    }
    try {
      const name = new Intl.DisplayNames(['en'], { type: 'language' }).of(base) || base;
      return `with an authentic, fluent native ${name} accent and natural pronunciation`;
    } catch {
      return 'with fluent native pronunciation';
    }
  }

  let token = 0;
  let ctx = null;
  let source = null;
  let busyUntil = 0;
  let speaking = false;
  let aiOffUntil = 0;
  try {
    aiOffUntil = Number(localStorage.getItem('buddyVoiceOffUntil')) || 0;
  } catch { /* storage blocked */ }
  let notified = false;

  const audio = () => {
    ctx ||= new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };

  // Split into sentences (keeps Chinese/Japanese and Indic full stops too), merging
  // fragments so each chunk is a natural phrase rather than a single word.
  function sentences(text) {
    const parts = String(text).match(/[^.!?。！？।]+[.!?。！？।]*\s*/g) || [String(text)];
    const out = [];
    for (const p of parts.map((x) => x.trim()).filter(Boolean)) {
      if (out.length && (out[out.length - 1].length < 24 || p.length < 8)) out[out.length - 1] += ` ${p}`;
      else out.push(p);
    }
    return out;
  }

  // Strip stage directions like *giggles*, (smiling), [excited] so they are never spoken aloud
  const clean = (t) =>
    String(t)
      .replace(/\*[^*]+\*/g, '')
      .replace(/\([^)]+\)/g, '')
      .replace(/\[[^\]]+\]/g, '')
      .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '')
      .replace(/[*_`#>|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  function extractMood(text) {
    const m = String(text).match(/\*([^*]+)\*/);
    if (!m) return null;
    const w = m[1].toLowerCase().trim();
    if (/giggle|chuckle|snicker/i.test(w)) return 'giggle';
    if (/laugh|haha|lol/i.test(w)) return 'laugh';
    if (/cry|sob|tear/i.test(w)) return 'cry';
    if (/sad|frown|sigh/i.test(w)) return 'sad';
    if (/happy|smile|cheer/i.test(w)) return 'happy';
    if (/dance|party/i.test(w)) return 'dance';
    if (/love|heart/i.test(w)) return 'love';
    if (/wink/i.test(w)) return 'wink';
    if (/blush|shy/i.test(w)) return 'shy';
    if (/angry|mad|grump/i.test(w)) return 'angry';
    if (/think|wonder/i.test(w)) return 'think';
    if (/yawn|sleep/i.test(w)) return 'sleepy';
    if (/wave|hi|hello/i.test(w)) return 'wave';
    if (/proud|sparkle/i.test(w)) return 'proud';
    return null;
  }

  function begin(estimateMs) {
    speaking = true;
    busyUntil = Date.now() + estimateMs;
  }
  function end() {
    speaking = false;
    busyUntil = Date.now() + 400; // a short tail so the mic does not catch the last word
    pet()?.talking?.(false);
    pet()?.stopReact?.();
  }
  function stop() {
    token++;
    try {
      source?.stop();
    } catch { /* already ended */ }
    source = null;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    pet()?.talking?.(false);
    pet()?.stopReact?.();
    if (speaking) end();
    busyUntil = 0;
  }

  // Plays 24 kHz mono samples; resolves when done (or when cut off by a newer line).
  function play(samples, my, mood, rate = 24000, speed = 1) {
    return new Promise((resolve) => {
      if (my !== token) return resolve();
      const c = audio();
      const buf = c.createBuffer(1, samples.length, rate);
      buf.getChannelData(0).set(samples);
      const src = c.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = speed;
      src.connect(c.destination);
      src.onended = () => {
        if (source === src) {
          source = null;
          pet()?.talking?.(false);
          pet()?.stopReact?.();
        }
        resolve();
      };
      source = src;
      const durationMs = (buf.duration * 1000) / speed;
      busyUntil = Math.max(busyUntil, Date.now() + durationMs + 300);
      pet()?.talking?.(true);
      if (mood) pet()?.react?.(mood, durationMs);
      started(durationMs);
      src.start();
    });
  }

  /* ---------- 1. Gemini voice ---------- */
  async function gemini(text, mood, my, lang) {
    const s = style();
    const accent = accentStyle(lang);
    const stylePrompt = [s.words, accent, MOOD[mood]].filter(Boolean).join(', ');
    const res = await api('/api/voice/speak', { text, voice: s.ai, style: stylePrompt });
    const bin = atob(res.pcm);
    const n = bin.length >> 1;
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const v = bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8);
      out[i] = (v >= 0x8000 ? v - 0x10000 : v) / 0x8000;
    }
    await play(out, my, mood);
  }

  /* ---------- 2. Kokoro, in a worker so the page never stutters ---------- */
  const kokoro = {
    worker: null,
    state: 'idle', // idle | loading | ready | slow | failed
    waits: new Map(),
    seq: 0,
    usable: () => Boolean(navigator.gpu) && store().neuralVoice === true, // opt-in: ~300 MB and a GPU
    start() {
      if (this.worker || !this.usable()) return;
      this.state = 'loading';
      const src = `
        let tts;
        self.onmessage = async ({ data }) => {
          try {
            if (data.type === 'load') {
              const { KokoroTTS } = await import('https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js');
              tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'fp32', device: 'webgpu' });
              self.postMessage({ id: data.id, ok: true });
            } else {
              const t0 = performance.now();
              const a = await tts.generate(data.text, { voice: data.voice, speed: data.speed });
              self.postMessage({ id: data.id, ok: true, audio: a.audio, ms: performance.now() - t0 }, [a.audio.buffer]);
            }
          } catch (err) {
            self.postMessage({ id: data.id, ok: false, error: String(err && err.message || err) });
          }
        };`;
      this.worker = new Worker(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })), { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        const w = this.waits.get(data.id);
        this.waits.delete(data.id);
        if (w) data.ok ? w.resolve(data) : w.reject(new Error(data.error));
      };
      this.call({ type: 'load' }).then(
        () => (this.state = 'ready'),
        () => (this.state = 'failed')
      );
    },
    call(msg) {
      return new Promise((resolve, reject) => {
        const id = ++this.seq;
        this.waits.set(id, { resolve, reject });
        this.worker.postMessage({ ...msg, id });
      });
    },
    async speak(text) {
      const s = style();
      const r = await this.call({ type: 'say', text, voice: s.kokoro, speed: s.speed });
      // Keep it only if it makes speech faster than it plays (real-time factor < 0.8).
      const secs = r.audio.length / 24000;
      if (secs > 0.8 && r.ms / 1000 > secs * 0.8) this.state = 'slow';
      return r.audio;
    },
  };

  /* ---------- 3. The best browser voice ---------- */
  const NATURAL = /natural|neural|online|premium|enhanced/i;
  const CHILD = /\bana\b|maisie|child|kid/i;
  const FEMALE = /female|woman|girl|aria|jenny|sonia|libby|natasha|ana\b|michelle|emma|ava|samantha|victoria|karen|moira|tessa|swara|neerja|kalpana|sapna|pallavi|shruti|aarohi|sobhana|dhwani|nanami|xiaoxiao|sunhi|denise|elvira|dalia|zira|heera|gurpreet|gul|elsa|francisca|svetlana|zariyah|emel|gadis|ayumi|haruka|huihui|google (us|uk english female)|हिन्दी|हिंदी|ಕನ್ನಡ|தமிழ்|తెలుగు|मराठी|বাংলা|മലയാളം|ગુજરાતી|日本語|한국어|中文/i;
  const MALE = /\b(male|man|david|mark|guy|ryan|george|james|daniel|brian|eric|liam|andrew|christopher|prabhat|madhur|ravi|hemant)\b/i;
  function pickVoice(lang) {
    const all = ('speechSynthesis' in window && speechSynthesis.getVoices()) || [];
    if (!all.length) return null;
    const want = String(lang || 'en-US').toLowerCase().replace('_', '-');
    const base = want.split('-')[0];
    let pool = all.filter((v) => v.lang.toLowerCase().replace('_', '-') === want);
    if (!pool.length) pool = all.filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(base));
    if (!pool.length && want === 'en-in') {
      pool = all.filter((v) => /en-gb|hi-in/i.test(v.lang.replace('_', '-')));
    }
    if (!pool.length) return null; // better the default than a voice of another language
    const score = (v) =>
      (NATURAL.test(v.name) ? 40 : 0) +
      (/google/i.test(v.name) ? 20 : 0) +
      (CHILD.test(v.name) && store().voiceStyle !== 'sweet' ? 15 : 0) +
      (FEMALE.test(v.name) ? 10 : 0) -
      (MALE.test(v.name) ? 30 : 0) +
      (v.localService ? 0 : 3);
    const best = pool.slice().sort((a, b) => score(b) - score(a))[0];
    return { voice: best, kind: NATURAL.test(best.name) ? 'natural' : /google/i.test(best.name) ? 'google' : 'desktop' };
  }
  function browser(text, lang, mood, my) {
    return new Promise((resolve) => {
      if (my !== token || !('speechSynthesis' in window)) return resolve();
      const s = style();
      const pick = pickVoice(lang);
      const u = new SpeechSynthesisUtterance(text);
      if (pick) u.voice = pick.voice;
      u.lang = pick?.voice.lang || lang || 'en-US';
      const lift = mood === 'laugh' || mood === 'giggle' || mood === 'surprised' ? 0.06 : mood === 'sad' || mood === 'cry' ? -0.1 : 0;
      u.pitch = Math.max(0.8, Math.min(1.5, s.pitch[pick?.kind || 'desktop'] + lift));
      u.rate = s.rate;
      const durationEstimate = Math.max(1600, 800 + text.length * 85);
      busyUntil = Math.max(busyUntil, Date.now() + durationEstimate);
      // Synchronize expression & talking with the exact millisecond speech begins
      u.onstart = () => {
        started(durationEstimate);
        pet()?.talking?.(true);
        if (mood) pet()?.react?.(mood, durationEstimate);
      };
      // Chrome sometimes never fires onend; a timeout keeps the queue moving.
      const guard = setTimeout(resolve, durationEstimate + 1200);
      u.onend = u.onerror = () => {
        pet()?.talking?.(false);
        pet()?.stopReact?.();
        clearTimeout(guard);
        resolve();
      };
      speechSynthesis.speak(u);
    });
  }

  /* ---------- the queue ---------- */
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

  const missing = new Set();

  let onStart = null;
  function started(ms = 0) {
    if (ms) begin(ms + 300);
    const fn = onStart;
    onStart = null;
    fn?.(ms);
  }

  async function say(text, { lang, mood, ai = false, onStart: cb } = {}) {
    started();
    onStart = cb || null;
    const words = clean(text);
    if (!words || store().talkBack === false) return started();
    const resolvedMood = mood || extractMood(text) || 'happy';
    const detected = detectScriptLang(words);
    const targetLang = resolveLangCode(pickLang(detected, lang) || (typeof assistant !== 'undefined' ? assistant.voice.lang() : null) || 'en-US');
    stop();
    const my = token;
    try {
      // Gemini voices the whole reply in one go with the target language accent.
      if (ai && state.ai?.canHear && Date.now() > aiOffUntil && store().voiceEngine !== 'browser' && pickVoice(targetLang)?.kind !== 'natural') {
        try {
          await gemini(words, resolvedMood, my, targetLang);
          return;
        } catch (err) {
          if (/quota|429|rate|exceeded/i.test(err.message)) {
            aiOffUntil = Date.now() + 30 * 60 * 1000;
            try {
              localStorage.setItem('buddyVoiceOffUntil', String(aiOffUntil));
            } catch { /* storage blocked */ }
            if (!notified) toast('The AI voice is busy, so I am using my local voice.');
            notified = true;
          }
          if (my !== token) return;
        }
      }
      const parts = sentences(words);
      const isUsEnglish = /^(en-US|en)$/i.test(targetLang);
      if (isUsEnglish) kokoro.start();
      if (isUsEnglish && kokoro.state === 'ready') {
        try {
          // Make the next sentence while the current one plays.
          let next = kokoro.speak(parts[0]);
          for (let i = 0; i < parts.length && my === token; i++) {
            const samples = await next;
            next = i + 1 < parts.length && kokoro.state === 'ready' ? kokoro.speak(parts[i + 1]) : null;
            await play(samples, my, resolvedMood);
            if (!next && i + 1 < parts.length) {
              for (const rest of parts.slice(i + 1)) await browser(rest, targetLang, resolvedMood, my);
              break;
            }
          }
          return;
        } catch {
          kokoro.state = 'failed';
        }
      }
      const native = pickVoice(targetLang);
      if (!native || native.kind === 'desktop') {
        try {
          const fetchPart = (p) => api('/api/voice/local', { text: p, lang: targetLang, mood: resolvedMood });
          // Ask for the next sentence while the current one plays.
          let next = fetchPart(parts[0]);
          for (let i = 0; i < parts.length && my === token; i++) {
            const res = await next;
            next = i + 1 < parts.length ? fetchPart(parts[i + 1]) : null;
            const bin = atob(res.pcm);
            const out = new Float32Array(bin.length >> 1);
            for (let j = 0; j < out.length; j++) {
              const v = bin.charCodeAt(2 * j) | (bin.charCodeAt(2 * j + 1) << 8);
              out[j] = (v >= 0x8000 ? v - 0x10000 : v) / 0x8000;
            }
            await play(out, my, resolvedMood, res.rate, res.rate > 30000 ? 1 : 1.1);
          }
          return;
        } catch { /* local voice not running: fall back to the browser */ }
      }
      if (!/^en\b/i.test(targetLang) && speechSynthesis.getVoices().length && !native) {
        if (!missing.has(targetLang)) toast(`No ${targetLang} voice is installed in this browser, so I'm showing my reply as text.`);
        missing.add(targetLang);
        pet()?.react?.(resolvedMood, 1500);
        started();
        return;
      }
      for (const p of parts) {
        if (my !== token) return;
        await browser(p, targetLang, resolvedMood, my);
      }
    } finally {
      if (my === token) {
        started();
        end();
      }
    }
  }

  // Voices load late in Chrome; asking early fills the list.
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.addEventListener?.('voiceschanged', () => speechSynthesis.getVoices());
  }

  return {
    say,
    stop,
    get speaking() {
      return speaking || Date.now() < busyUntil;
    },
    get engine() {
      return kokoro.state === 'ready' ? 'neural' : 'browser';
    },
    pickVoice,
    accentStyle,
    preload(lang) {
      if (lang && !pickVoice(lang)) api('/api/voice/warm', { lang }).catch(() => {});
    },
    kokoro,
    STYLE,
    resolveLangCode,
    LANG_MAP,
  };
})();

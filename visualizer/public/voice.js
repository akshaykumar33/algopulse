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
    cute: { ai: 'Leda', kokoro: 'af_bella', speed: 0.95, pitch: { natural: 1.08, google: 1.1, desktop: 1.04 }, rate: 0.95, words: 'Speak as a bright, cheerful young lady with a cute, smiling voice' },
    sweet: { ai: 'Aoede', kokoro: 'af_heart', speed: 0.92, pitch: { natural: 1.02, google: 1.05, desktop: 1 }, rate: 0.92, words: 'Speak as a warm, sweet young lady with a soft, gentle, smiling voice' },
    bright: { ai: 'Zephyr', kokoro: 'af_nova', speed: 1, pitch: { natural: 1.1, google: 1.12, desktop: 1.05 }, rate: 1, words: 'Speak in a bright, cheerful, friendly voice' },
  };
  const MOOD = {
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
  const style = () => STYLE[store().voiceStyle] || STYLE.cute;
  // Shared delivery for every style and language: smooth, mid-pitched, unhurried, and
  // pronounced the way a native speaker of that language would say it.
  const DELIVERY = 'in a smooth, warm, charming mid-pitched tone, at a calm, unhurried pace, with fluent native pronunciation of whatever language the text is in';

  let token = 0;
  let ctx = null;
  let source = null;
  let busyUntil = 0;
  let speaking = false;
  let aiOffUntil = 0;
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
  const clean = (t) => String(t).replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').replace(/[*_`#>|]/g, ' ').replace(/\s+/g, ' ').trim();

  function begin(estimateMs) {
    speaking = true;
    busyUntil = Date.now() + estimateMs;
    pet()?.talking?.(true);
  }
  function end() {
    speaking = false;
    busyUntil = Date.now() + 400; // a short tail so the mic does not catch the last word
    pet()?.talking?.(false);
  }
  function stop() {
    token++;
    try {
      source?.stop();
    } catch { /* already ended */ }
    source = null;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (speaking) end();
    busyUntil = 0;
  }

  // Plays 24 kHz mono samples; resolves when done (or when cut off by a newer line).
  function play(samples, my) {
    return new Promise((resolve) => {
      if (my !== token) return resolve();
      const c = audio();
      const buf = c.createBuffer(1, samples.length, 24000);
      buf.getChannelData(0).set(samples);
      const src = c.createBufferSource();
      src.buffer = buf;
      src.connect(c.destination);
      src.onended = () => {
        if (source === src) source = null;
        resolve();
      };
      source = src;
      busyUntil = Math.max(busyUntil, Date.now() + buf.duration * 1000 + 300);
      src.start();
    });
  }

  /* ---------- 1. Gemini voice ---------- */
  async function gemini(text, mood, my) {
    const s = style();
    const res = await api('/api/voice/speak', { text, voice: s.ai, style: [s.words, DELIVERY, MOOD[mood]].filter(Boolean).join(', ') });
    const bin = atob(res.pcm);
    const n = bin.length >> 1;
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const v = bin.charCodeAt(2 * i) | (bin.charCodeAt(2 * i + 1) << 8);
      out[i] = (v >= 0x8000 ? v - 0x10000 : v) / 0x8000;
    }
    await play(out, my);
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
  const CHILD = /\bana\b|maisie|child|kid/i; // Edge's "Ana" is a child's voice: the cutest there is
  const FEMALE = /female|woman|girl|aria|jenny|sonia|libby|natasha|ana\b|michelle|emma|ava|samantha|victoria|karen|moira|tessa|swara|neerja|kalpana|sapna|pallavi|shruti|aarohi|sobhana|dhwani|nanami|xiaoxiao|sunhi|denise|elvira|dalia|zira|heera|google (us|uk english female)/i;
  const MALE = /\b(male|man|david|mark|guy|ryan|george|james|daniel|brian|eric|liam|andrew|christopher|prabhat|madhur|ravi|hemant)\b/i;
  function pickVoice(lang) {
    const all = ('speechSynthesis' in window && speechSynthesis.getVoices()) || [];
    if (!all.length) return null;
    const want = String(lang || 'en-US').toLowerCase();
    const base = want.split('-')[0];
    let pool = all.filter((v) => v.lang.toLowerCase().replace('_', '-') === want);
    if (!pool.length) pool = all.filter((v) => v.lang.toLowerCase().startsWith(base));
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
      busyUntil = Math.max(busyUntil, Date.now() + 800 + text.length * 80);
      // Chrome sometimes never fires onend; a timeout keeps the queue moving.
      const guard = setTimeout(resolve, 2500 + text.length * 110);
      u.onend = u.onerror = () => {
        clearTimeout(guard);
        resolve();
      };
      speechSynthesis.speak(u);
    });
  }

  /* ---------- the queue ---------- */
  async function say(text, { lang = 'en-US', mood, ai = false } = {}) {
    const words = clean(text);
    if (!words || store().talkBack === false) return;
    stop();
    const my = token;
    begin(1500 + words.length * 90);
    try {
      // Gemini voices the whole reply in one go, so it sounds like one breath.
      // A natural (neural) browser voice — Edge's Ana, Aria, Swara, Sapna… — starts
      // speaking at once with no quota, so it wins over the AI voice's 3-4 s wait.
      // The AI voice is for browsers that only have robotic voices for this language.
      const instant = pickVoice(lang)?.kind === 'natural';
      if (ai && !instant && state.ai?.canHear && Date.now() > aiOffUntil && store().voiceEngine !== 'browser') {
        try {
          await gemini(words, mood, my);
          return;
        } catch (err) {
          if (/quota|429|rate/i.test(err.message)) {
            aiOffUntil = Date.now() + 60 * 60 * 1000;
            if (!notified) toast('The AI voice is out of free quota for today, so I am using my local voice.');
            notified = true;
          }
          if (my !== token) return;
        }
      }
      const parts = sentences(words);
      const english = /^en\b/i.test(lang);
      if (english) kokoro.start();
      if (english && kokoro.state === 'ready') {
        try {
          // Make the next sentence while the current one plays.
          let next = kokoro.speak(parts[0]);
          for (let i = 0; i < parts.length && my === token; i++) {
            const samples = await next;
            next = i + 1 < parts.length && kokoro.state === 'ready' ? kokoro.speak(parts[i + 1]) : null;
            await play(samples, my);
            if (!next && i + 1 < parts.length) {
              for (const rest of parts.slice(i + 1)) await browser(rest, lang, mood, my);
              break;
            }
          }
          return;
        } catch {
          kokoro.state = 'failed';
        }
      }
      for (const p of parts) {
        if (my !== token) return;
        await browser(p, lang, mood, my);
      }
    } finally {
      if (my === token) end();
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
    kokoro,
    STYLE,
  };
})();

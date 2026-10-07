/**
 * The buddy's ear: records what you say, one sentence at a time, as a small WAV clip.
 *
 * The browser's speech recogniser hears one language per session, so it cannot follow
 * "open the next problem, ಮತ್ತೆ ಟೆಸ್ಟ್ ರನ್ ಮಾಡು". Instead the microphone is watched for
 * speech (an adaptive loudness gate), each utterance is cut out with a little lead-in,
 * downsampled to 16 kHz mono and handed to the AI, which hears every language itself.
 * Audio never goes anywhere unless the AI ear is on; nothing is stored.
 */
'use strict';

window.ear = (() => {
  const OUT_RATE = 16000;
  const HANG_MS = 900; // silence that ends a sentence
  const MIN_MS = 350; // shorter blips are clicks and coughs
  const MAX_MS = 15000;
  const PRE_MS = 300; // keep the start of the first word

  const supported = Boolean(navigator.mediaDevices?.getUserMedia && window.AudioContext);
  let ctx = null;
  let stream = null;
  let node = null;
  let opts = {};
  let frameMs = 43;
  let floor = 0.008;
  let speaking = false;
  let voiced = 0;
  let silentMs = 0;
  let pre = [];
  let chunks = [];
  let segStart = 0;

  async function start(o) {
    opts = o || {};
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } });
    ctx = new AudioContext();
    const src = ctx.createMediaStreamSource(stream);
    node = ctx.createScriptProcessor(2048, 1, 1);
    frameMs = (2048 / ctx.sampleRate) * 1000;
    node.onaudioprocess = (e) => frame(new Float32Array(e.inputBuffer.getChannelData(0)));
    src.connect(node);
    node.connect(ctx.destination); // the output buffer stays silent; this just keeps it running
  }

  function frame(buf) {
    let sum = 0;
    for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
    const rms = Math.sqrt(sum / buf.length);
    opts.onLevel?.(Math.min(1, rms * 14));
    if (opts.blocked?.()) {
      if (speaking) finish(true);
      pre = [];
      return;
    }
    if (!speaking) {
      floor = floor * 0.97 + Math.min(rms, 0.04) * 0.03;
      pre.push(buf);
      if (pre.length * frameMs > PRE_MS) pre.shift();
      if (rms > Math.max(0.014, floor * 3)) {
        if (++voiced >= 2) {
          speaking = true;
          chunks = pre.slice();
          segStart = performance.now() - chunks.length * frameMs;
          silentMs = 0;
          opts.onStart?.();
        }
      } else voiced = 0;
      return;
    }
    chunks.push(buf);
    silentMs = rms < Math.max(0.011, floor * 2) ? silentMs + frameMs : 0;
    if (silentMs >= HANG_MS || chunks.length * frameMs > MAX_MS) finish(false);
  }

  function finish(discard) {
    speaking = false;
    voiced = 0;
    const take = chunks;
    chunks = [];
    pre = [];
    const ms = take.length * frameMs - silentMs;
    const keepIt = !discard && ms >= MIN_MS;
    opts.onEnd?.(keepIt);
    if (!keepIt) return;
    // Drop most of the trailing silence; keep a short tail so the last word is whole.
    const keep = Math.max(1, take.length - Math.floor(Math.max(0, silentMs - 200) / frameMs));
    opts.onClip?.({ data: toWav(take.slice(0, keep)), mime: 'audio/wav', start: segStart, end: performance.now() });
  }

  // Float32 frames at the device rate -> 16 kHz 16-bit mono WAV, base64.
  function toWav(frames) {
    const total = frames.reduce((n, f) => n + f.length, 0);
    const all = new Float32Array(total);
    let at = 0;
    for (const f of frames) {
      all.set(f, at);
      at += f.length;
    }
    const ratio = ctx.sampleRate / OUT_RATE;
    const n = Math.floor(total / ratio);
    const bytes = new Uint8Array(44 + n * 2);
    const view = new DataView(bytes.buffer);
    const text = (o, s) => [...s].forEach((c, i) => view.setUint8(o + i, c.charCodeAt(0)));
    text(0, 'RIFF');
    view.setUint32(4, 36 + n * 2, true);
    text(8, 'WAVEfmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, OUT_RATE, true);
    view.setUint32(28, OUT_RATE * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    text(36, 'data');
    view.setUint32(40, n * 2, true);
    for (let i = 0; i < n; i++) {
      // Average each block of source samples: a cheap low-pass before decimating.
      const a = Math.floor(i * ratio);
      const b = Math.min(total, Math.floor((i + 1) * ratio));
      let s = 0;
      for (let j = a; j < b; j++) s += all[j];
      const v = Math.max(-1, Math.min(1, s / Math.max(1, b - a)));
      view.setInt16(44 + i * 2, v < 0 ? v * 0x8000 : v * 0x7fff, true);
    }
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }

  function stop() {
    if (speaking) finish(true);
    node?.disconnect();
    stream?.getTracks().forEach((t) => t.stop());
    ctx?.close();
    ctx = stream = node = null;
  }

  return {
    supported,
    start,
    stop,
    get on() {
      return Boolean(ctx);
    },
  };
})();

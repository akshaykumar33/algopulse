// End-to-end check of the studio UI in headless Chrome, over the DevTools protocol (no extra
// dependencies). It starts its own server on a spare port, drives the real page and fails
// on any page error or broken behaviour. Checks that need an AI key are skipped without one.
//
//   npm run test:ui              CHROME=path/to/chrome npm run test:ui
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT = 3400 + Math.floor(Math.random() * 400);
const DEBUG_PORT = PORT + 1000;
const BASE = `http://localhost:${PORT}`;
const CHROME = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => p && existsSync(p));
if (!CHROME) {
  console.error('No Chrome or Edge found; set CHROME=/path/to/browser');
  process.exit(2);
}

const server = spawn(process.execPath, ['apps/visualizer/server.js'], { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' });
const profile = mkdtempSync(join(tmpdir(), 'algopulse-ui-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${DEBUG_PORT}`, `--user-data-dir=${profile}`, '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--window-size=1440,900', 'about:blank'], { stdio: 'ignore' });

let failures = 0;
const results = [];
function done(code) {
  chrome.kill();
  server.kill();
  setTimeout(() => {
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch { /* Chrome may still hold files */ }
    process.exit(code);
  }, 300);
}

try {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(BASE + '/api/ai/status')).ok) break;
    } catch { /* starting */ }
    await sleep(200);
  }
  let ws;
  for (let i = 0; i < 60 && !ws; i++) {
    try {
      const page = (await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json()).find((t) => t.type === 'page');
      if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
    } catch { /* starting */ }
    if (!ws) await sleep(250);
  }
  if (ws.readyState !== 1) await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const waiting = new Map();
  let errors = [];
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && waiting.has(m.id)) {
      waiting.get(m.id)(m);
      waiting.delete(m.id);
    }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description?.split('\n')[0]);
  });
  const send = (method, params = {}) => new Promise((r) => { const n = ++id; waiting.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  const val = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description?.split('\n')[0] || 'evaluation failed');
    return r.result?.result?.value;
  };
  const key = async (k) => {
    const code = k.toUpperCase().charCodeAt(0);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, text: k, windowsVirtualKeyCode: code });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, windowsVirtualKeyCode: code });
  };
  // One named check: passes when `ok(value)` holds and the page threw nothing meanwhile.
  async function check(name, expr, ok, { skip } = {}) {
    if (skip) return results.push(`skip  ${name} (${skip})`);
    errors = [];
    let value;
    let pass;
    try {
      value = await val(expr);
      pass = ok(value) && errors.length === 0;
    } catch (err) {
      value = err.message;
      pass = false;
    }
    if (!pass) failures++;
    results.push(`${pass ? 'pass' : 'FAIL'}  ${name}${pass ? '' : `  → ${JSON.stringify(value)}${errors.length ? ` errors: ${errors.join(' | ')}` : ''}`}`);
  }

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Browser.grantPermissions', { origin: BASE, permissions: ['audioCapture', 'videoCapture'] });
  const days = (await (await fetch(BASE + '/api/days')).json()).days;
  const date = days[days.length - 1]?.date;
  const day = await (await fetch(`${BASE}/api/day?date=${date}`)).json();
  const file = day.problems[0].file;
  const ai = (await (await fetch(BASE + '/api/ai/status')).json()).canHear;
  await send('Page.navigate', { url: `${BASE}/#/${date}/${file}/story` });
  await sleep(1500);
  await val("localStorage.setItem('algopulse-toured','1'); localStorage.removeItem('algopulse-assistant'); location.reload()");
  errors = [];
  await sleep(5000);
  const loadErrors = [...errors];

  await check('page loads without errors', 'true', () => loadErrors.length === 0);
  await check('every icon renders', "[...document.querySelectorAll('i.ph, i.ph-bold, i.ph-fill, i.ph-duotone')].filter(i => getComputedStyle(i, '::before').content === 'none').length", (n) => n === 0);
  await check('all modules present', '[!!window.mascot, !!window.buddyVoice, !!window.ear, !!window.fancySelect, !!document.getElementById("gestureRemote")].every(Boolean)', Boolean);
  await check('tabs switch', "(async()=>{showTab('tests'); await new Promise(r=>setTimeout(r,300)); return state.tab})()", (t) => t === 'tests');
  await check('sample tests run and the buddy reacts', "(async()=>{await runTests(); await new Promise(r=>setTimeout(r,800)); return document.querySelector('.mascot-bubble')?.textContent || ''})()", (t) => t.length > 0);
  await check('voice starts', "(async()=>{const r=await assistant.voice.toggle(); await new Promise(r=>setTimeout(r,500)); return {on:r, mode:assistant.voice.mode}})()", (v) => v.on && v.mode === (ai ? 'ai' : 'browser'));
  await val('document.activeElement?.blur?.()');
  await key('b');
  await sleep(300);
  await check('B opens the command spotlight', "(()=>!document.getElementById('pipCommandBadge').hidden && document.activeElement?.id === 'pipCmdInput')()", Boolean);
  await check('typed "dance for me" dances', "(async()=>{const i=document.getElementById('pipCmdInput'); i.value='dance for me'; document.getElementById('pipCommandBadge').requestSubmit(); await new Promise(r=>setTimeout(r,500)); return document.querySelectorAll('.mascot-fx').length})()", (n) => n > 0);
  await check('nonstop emotion stops on "stop"', "(async()=>{copilot.smallTalk('keep laughing nonstop'); await new Promise(r=>setTimeout(r,1500)); const a=mascot.feeling(); copilot.smallTalk('stop'); return [a, mascot.feeling()]})()", ([a, b]) => a === 'laugh' && b === null);
  await check('the buddy speaks a whole reply', "(async()=>{const seen=[]; const o=mascot.talking; mascot.talking=(on)=>{seen.push(on);o(on)}; await buddyVoice.say('Hello there. Shall we solve one?', {lang:'en-US'}); mascot.talking=o; return seen})()", (s) => s.includes(true) && s[s.length - 1] === false);
  await check('gesture remote shows and hides with the camera', "(async()=>{await copilot.STEPS.gestures('on'); await new Promise(r=>setTimeout(r,2500)); const el=document.getElementById('gestureRemote'); const shown=!el.hidden && el.querySelectorAll('.rm-row').length > 5; assistant.gestures.fire('Thumb_Up'); const fired=!!el.querySelector('.is-fired'); await copilot.STEPS.gestures('off'); return shown && fired && el.hidden})()", Boolean);
  await check('voice actions change settings', "(async()=>{await copilot.STEPS['voice-style']('sweet'); return assistant.load().voiceStyle})()", (s) => s === 'sweet');
  await check('repeated navigation request is cached', `(async()=>{const ctx={date:'${date}',file:'${file}',tab:'story'}; await api('/api/agent/plan',{utterance:'go to the code tab',ctx}); const b=await api('/api/agent/plan',{utterance:'Go to the code tab.',ctx}); return !!b.cached})()`, Boolean, { skip: ai ? null : 'no AI key' });
  await check('guide voice page renders', "(async()=>{openGuide('assistant'); await new Promise(r=>setTimeout(r,800)); const b=document.getElementById('guideBody'); const ok=b.querySelectorAll('.fsel-btn').length > 3 && b.querySelectorAll('.buddy-card').length === 2; document.getElementById('guide').close(); return ok})()", Boolean);
  await val('assistant.voice.toggle()');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await sleep(800);
  await check('no sideways scroll on a phone', 'document.documentElement.scrollWidth <= innerWidth', Boolean);
  ws.close();
} catch (err) {
  failures++;
  results.push(`FAIL  harness: ${err.message}`);
}

console.log(results.join('\n'));
console.log(failures ? `\n${failures} check(s) failed` : `\nall ${results.filter((r) => r.startsWith('pass')).length} checks passed`);
done(failures ? 1 : 0);

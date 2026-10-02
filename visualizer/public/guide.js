/**
 * AlgoPulse Studio — Guide, guided tour, AI provider picker, reminders and streak.
 * Loaded after app.js; uses its helpers ($, api, toast, state, …) from the shared
 * global scope of classic scripts.
 */
'use strict';

/* ==========================================================================
   AI status + streak (called by app.js after /api/days)
   ========================================================================== */
function applyAiStatus(status) {
  state.ai = status;
  state.aiReady = Boolean(status?.active?.ready);
  $('#coachDot').classList.toggle('on', state.aiReady);
  $('#btnCoach').title = state.aiReady
    ? `AI coach · ${status.active.label} · ${status.active.model} (C)`
    : 'AI coach — choose an AI in the Guide to enable (C)';
}

function renderStreak() {
  const s = state.streak || { current: 0, best: 0 };
  const badge = $('#streakBadge');
  badge.hidden = false;
  $('.streak-count', badge).textContent = s.current;
  badge.classList.toggle('is-hot', s.current >= 3);
  badge.classList.toggle('is-cold', s.current === 0);
  const label = s.current
    ? `${s.current}-day streak (best ${s.best}). ${s.solvedToday ? 'Solved something today!' : 'Solve one today to keep it.'}`
    : `No streak yet (best ${s.best}). Solve one problem to start.`;
  badge.setAttribute('aria-label', label);
  badge.title = label;
}

/* ==========================================================================
   Game layer: player card, achievements, XP refresh
   ========================================================================== */
const QUEST_ICONS = { 'warm-up': 'ph-sun-horizon', 'hat-trick': 'ph-target', 'triple-crown': 'ph-crown', 'full-clear': 'ph-medal' };

function renderPlayer() {
  const p = state.progress;
  const el = $('#player');
  if (!p) return;
  el.hidden = false;
  const pct = Math.round((p.level.into / p.level.span) * 100);
  el.innerHTML = `
    <button class="player-head" type="button" data-open-guide="progress" aria-label="Level ${p.level.level}, ${escapeHtml(p.rank.title)}. ${p.xp} XP. Open achievements.">
      <span class="player-level rank-${p.rank.tone}">${p.level.level}</span>
      <span class="player-meta">
        <strong class="rank-text rank-${p.rank.tone}">${escapeHtml(p.rank.title)}</strong>
        <span class="player-xp">${p.xp.toLocaleString()} XP${p.xpToday ? ` · <em>+${p.xpToday} today</em>` : ''}</span>
      </span>
      <i class="ph-duotone ph-trophy" aria-hidden="true"></i>
    </button>
    <div class="xp-bar" role="progressbar" aria-label="XP to level ${p.level.level + 1}" aria-valuemin="0" aria-valuemax="${p.level.span}" aria-valuenow="${p.level.into}">
      <span style="width:${pct}%"></span>
    </div>
    <p class="xp-next">${p.level.span - p.level.into} XP to level ${p.level.level + 1}${p.nextRank ? ` · ${escapeHtml(p.nextRank.title)} at level ${p.nextRank.minLevel}` : ''}</p>
    <ul class="quests" aria-label="Today's quests">
      ${p.quests
        .map(
          (q) => `<li class="quest ${q.done ? 'is-done' : ''}" title="${escapeHtml(q.description)} · +${q.xp} XP">
            <i class="ph-duotone ${QUEST_ICONS[q.id]}" aria-hidden="true"></i>
            <span class="quest-title">${escapeHtml(q.title)}</span>
            <span class="quest-count">${q.done ? '✓' : `${q.current}/${q.target || '–'}`}</span>
          </li>`
        )
        .join('')}
    </ul>`;
}

// Re-read progress after a verify; returns what changed so the caller can celebrate.
async function refreshProgress() {
  const prev = state.progress;
  try {
    const data = await api('/api/days');
    state.streak = data.streak;
    state.progress = data.progress;
    state.ramp = data.ramp;
    renderPlayer();
    renderStreak();
  } catch {
    return { xp: 0, levelUp: false };
  }
  if (!prev) return { xp: 0, levelUp: false };
  return { xp: state.progress.xp - prev.xp, levelUp: state.progress.level.level > prev.level.level };
}

function guideProgress() {
  const p = state.progress;
  if (!p) return '<p>Progress is loading…</p>';
  const unlocked = p.achievements.filter((a) => a.unlocked).length;
  const ranks = [
    ['Newbie', 1, 'gray'], ['Pupil', 3, 'green'], ['Specialist', 6, 'cyan'], ['Expert', 10, 'blue'],
    ['Candidate Master', 15, 'violet'], ['Master', 20, 'orange'], ['Grandmaster', 30, 'red'],
  ];
  return `
    <h2 class="guide-h">Your progress</h2>
    <p class="guide-lead">Level ${p.level.level} · <strong class="rank-text rank-${p.rank.tone}">${escapeHtml(p.rank.title)}</strong> · ${p.xp.toLocaleString()} XP · ${p.solvedTotal} solved · ${unlocked}/${p.achievements.length} achievements.</p>
    <h3 class="guide-sub"><i class="ph-duotone ph-medal" aria-hidden="true"></i>Achievements</h3>
    <ul class="achievements">${p.achievements
      .map(
        (a) => `<li class="achievement ${a.unlocked ? 'is-unlocked' : ''}">
          <i class="ph-duotone ph-${a.icon}" aria-hidden="true"></i>
          <strong>${escapeHtml(a.title)}</strong>
          <span>${escapeHtml(a.description)}</span>
          <span class="achievement-progress">${a.unlocked ? 'Unlocked' : `${a.current} / ${a.target}`}</span>
        </li>`
      )
      .join('')}</ul>
    <h3 class="guide-sub"><i class="ph-duotone ph-chart-line-up" aria-hidden="true"></i>Next set's difficulty</h3>
    <p>Adaptive: a week at 70%+ steps up 100 rating; two days under 40% steps back. Unfinished days never count.</p>
    <ul class="ramp-list">${Object.entries(state.ramp || {})
      .map(([plat, r]) => `<li><strong>${{ codeforces: 'Codeforces', codechef: 'CodeChef', leetcode: 'LeetCode' }[plat]}</strong>
        <span class="pill ${r.decision === 'promote' ? 'ok' : r.decision === 'step_back' ? 'warn' : 'soft'}">${plat === 'leetcode' ? r.difficulty : r.rating}${r.decision === 'promote' ? ' ↑' : r.decision === 'step_back' ? ' ↓' : ''}</span>
        <span class="muted">${escapeHtml(r.reason)}</span></li>`)
      .join('')}</ul>
    <h3 class="guide-sub"><i class="ph-duotone ph-ranking" aria-hidden="true"></i>How XP works</h3>
    <ul class="tool-list">
      <li>Each verified solve earns <strong>10 XP + half its difficulty level</strong> (Codeforces 800 = level 0, +4 levels per 100 rating), so harder problems pay more.</li>
      <li>Daily quests add bonuses: Warm up +10, Hat-trick +25, Triple crown +40, Full clear +100.</li>
      <li>Level <em>L</em> starts at 50·<em>L</em>·(<em>L</em>−1) XP: 100, 300, 600, 1000…</li>
      <li>Everything is computed from your verified history (the <code>[x]</code> marks), so it can never drift.</li>
    </ul>
    <h3 class="guide-sub"><i class="ph-duotone ph-steps" aria-hidden="true"></i>Ranks</h3>
    <ol class="rank-ladder">${ranks
      .map(([t, lvl, tone]) => `<li class="${t === p.rank.title ? 'is-current' : ''}"><span class="rank-text rank-${tone}">${t}</span><span>level ${lvl}+</span></li>`)
      .join('')}</ol>`;
}

/* ==========================================================================
   Voice & gestures page
   ========================================================================== */
const actionOptions = (selected) =>
  Object.entries(assistant.ACTIONS)
    .map(([id, a]) => `<option value="${id}" ${id === selected ? 'selected' : ''}>${escapeHtml(a.label)}</option>`)
    .join('');

function guideAssistant() {
  const cfg = assistant.load();
  const v = assistant.voice;
  const g = assistant.gestures;
  const map = assistant.bindings();
  const examples = [
    ['“open Buttons and run my tests”', 'Several steps in one sentence'],
    ['“write a solution for this and test it” · “undo that”', 'AI writes code in your style (backed up; no XP for that problem)'],
    ['“next wala problem kholo aur hint do”', 'Mixed languages (Hinglish, Spanglish…)'],
    ['“अगला सवाल खोलो” · “abre el siguiente problema” · “次の問題を開いて”', 'Any language'],
    ['“review my code” · “explain this problem” · “give me a hint”', 'Coach modes'],
    ['“go to yesterday’s set” · “show only unsolved”', 'Moving around'],
    ['“read the story” · “dark mode” · “switch to Hindi”', 'Everything else'],
    ['“stop listening”', 'Turn the mic off'],
  ];
  const lang = cfg.lang || 'auto';
  const aiEar = v.useAi();
  const cur = copilot.cursor.settings();
  return `
    <h2 class="guide-h">Voice & gestures</h2>
    <p class="guide-lead">Just say what you want — in any language, or several mixed — and your buddy plans it and does it, step by step. With the camera on, your finger becomes a mouse.</p>

    <ol class="flow assist-steps">
      <li class="flow-step" style="--i:0"><i class="ph-duotone ph-microphone" aria-hidden="true"></i><strong>Press V</strong><span>or the mic. A chat pops up beside your buddy with everything it hears and says. Press B to type instead.</span></li>
      <li class="flow-step" style="--i:1"><i class="ph-duotone ph-chat-circle-dots" aria-hidden="true"></i><strong>Say anything</strong><span>“open Buttons and run my tests”.</span></li>
      <li class="flow-step" style="--i:2"><i class="ph-duotone ph-hand-pointing" aria-hidden="true"></i><strong>Press W</strong><span>point to move, pinch to click.</span></li>
    </ol>

    <div class="assist-grid">
      <section class="card assist-card">
        <h3 class="guide-sub"><i class="ph-duotone ph-microphone" aria-hidden="true"></i>Voice</h3>
        <p>${v.supported ? 'Talk any time while it is on. Press <kbd>V</kbd> or the mic in the header.' : '<strong>This browser cannot listen.</strong> Use Chrome or Edge, or add a Gemini key.'}</p>
        <p class="assist-ear ${aiEar ? 'is-ai' : ''}"><i class="ph-duotone ${aiEar ? 'ph-sparkle' : 'ph-browser'}" aria-hidden="true"></i>${
          aiEar
            ? '<strong>AI ear is on:</strong> Gemini hears your voice directly, so any language works — and switching or mixing mid-sentence (English → ಕನ್ನಡ, Hinglish…) too. Short English commands still run instantly.'
            : state.ai?.canHear
              ? '<strong>Browser ear:</strong> Chrome hears one language at a time. Switch to the AI ear below to follow any language and mixes.'
              : '<strong>Browser ear:</strong> Chrome hears one language at a time. Add a Gemini key (Choose your AI) to unlock the AI ear, which follows any language and mid-sentence switches.'
        }</p>
        <div class="assist-row">
          <button class="btn ${v.on ? 'btn-secondary' : 'btn-primary'}" type="button" data-assist="voice" ${v.supported ? '' : 'disabled'}>${v.on ? 'Stop listening' : 'Start listening'}</button>
          <span class="pill ${v.on ? 'ok' : 'soft'}">${v.on ? '● Listening' : 'Off'}</span>
        </div>
        ${state.ai?.canHear ? `<div class="field">
          <label for="assistEar">Ear</label>
          <select id="assistEar" data-assist-pick="ear">
            <option value="ai" ${cfg.ear !== 'browser' ? 'selected' : ''}>AI ear · any language & mixes</option>
            <option value="browser" ${cfg.ear === 'browser' ? 'selected' : ''}>Browser ear · one language, no AI cost</option>
          </select>
        </div>` : ''}
        <label class="switch"><input type="checkbox" data-assist-set="talkBack" ${cfg.talkBack !== false ? 'checked' : ''}><span>Buddy talks back (in your language)</span></label>
        <div class="field">
          <label for="assistVoice">Buddy's voice</label>
          <select id="assistVoice" data-assist-pick="voiceStyle">
            ${[['cute', 'Cute & giggly · tiny cartoon buddy'], ['sweet', 'Sweet lady · soft and warm'], ['bright', 'Bright & bubbly']].map(([k, n]) => `<option value="${k}" ${(cfg.voiceStyle || 'cute') === k ? 'selected' : ''}>${n}</option>`).join('')}
          </select>
          <span class="field-hint">${state.ai?.canHear && cfg.voiceEngine !== 'browser' ? 'Spoken by Gemini’s voice, laughing or sniffling with the buddy’s mood. Lines are cached, so repeats are instant.' : 'Uses the sweetest voice installed in your browser for each language.'}</span>
        </div>
        <label class="switch"><input type="checkbox" data-assist-set="sounds" ${cfg.sounds !== false ? 'checked' : ''}><span>Giggles & little sounds</span></label>
        ${aiEar ? '' : `<div class="field">
          <label for="assistLang">Browser ear language</label>
          <select id="assistLang" data-assist-lang>${copilot.LANGUAGES.map(([c, n]) => `<option value="${c}" ${c === lang ? 'selected' : ''}>${escapeHtml(n)}</option>`).join('')}</select>
          <span class="field-hint">Now hearing: ${escapeHtml(v.lang())}${!cfg.lang || cfg.lang === 'auto' ? ' (auto)' : ''}. You can also just ask your buddy: “talk in Kannada”.</span>
        </div>`}
      </section>

      <section class="card assist-card">
        <h3 class="guide-sub"><i class="ph-duotone ph-hand-waving" aria-hidden="true"></i>Gestures</h3>
        <p>Uses your camera; every frame is processed on this PC and never uploaded. Press <kbd>W</kbd> or the hand in the header.</p>
        <div class="assist-row">
          <button class="btn ${g.on ? 'btn-secondary' : 'btn-primary'}" type="button" data-assist="gestures">${g.on ? 'Stop camera' : 'Start camera'}</button>
          <span class="pill ${g.on ? 'ok' : 'soft'}">${g.on ? '● Watching' : 'Off'}</span>
        </div>
        <div class="field">
          <span class="field-label" id="assistCharLabel">Your buddy</span>
          <div class="buddy-cards" role="radiogroup" aria-labelledby="assistCharLabel">
            ${[['hamster', 'Pip', 'the hamster'], ['bunny', 'Bun', 'the bunny']].map(([c, n, k]) => `
            <label class="buddy-card">
              <input type="radio" name="assistChar" value="${c}" data-assist-char ${window.mascot?.character() === c ? 'checked' : ''}>
              <span class="buddy-face" style="background-image:url('mascots/${c}-directions.webp')" aria-hidden="true"></span>
              <span><strong>${n}</strong> ${k}</span>
            </label>`).join('')}
          </div>
          <span class="field-hint">Tip: right-click the buddy to swap, double-click it to chat.</span>
        </div>
      </section>
    </div>

    <section class="assist-live card" ${g.on ? '' : 'hidden'} id="assistLive">
      <div class="assist-cam"><video id="assistVideo" muted playsinline></video><canvas id="assistCanvas"></canvas></div>
      <div class="assist-live-info">
        <strong>I see:</strong> <span id="assistSeeing">no hand</span>
        <ul class="assist-log" id="assistantLog">${assistant.events.map((e) => `<li>${escapeHtml(e)}</li>`).join('')}</ul>
      </div>
    </section>

    <h3 class="guide-sub"><i class="ph-duotone ph-cursor-click" aria-hidden="true"></i>Air cursor</h3>
    <section class="card assist-card">
      <ul class="tool-list">
        <li><strong>Point</strong> with your index finger to move the blue cursor. Whatever is under it gets a blue outline.</li>
        <li><strong>Pinch</strong> thumb and index together to click. Pinch on a text box to type into it.</li>
        <li><strong>Open hand</strong> (all fingers up) moving up or down scrolls the page or the panel under the cursor.</li>
        <li>It is <strong>off by default</strong> so every sign works. While it is on, ☝️ ✋ ✊ belong to the cursor; the other signs still work: 👍 run tests · ✌️ next problem · 🤟 read the story · swipe to change tabs.</li>
        <li>A chip on your buddy shows the sign it sees; hold still until its green ring fills (about half a second) and the action fires.</li>
        <li>Tip: sit about an arm's length away, with your hand inside the middle of the camera view.</li>
      </ul>
      <label class="switch"><input type="checkbox" data-assist-set="airCursor" ${cur.enabled ? 'checked' : ''}><span>Air cursor on</span></label>
      <div class="assist-sliders">
        <div class="field"><label for="curSens">Reach — how far a small move goes (${cur.sensitivity.toFixed(1)}×)</label><input id="curSens" type="range" min="1" max="2.6" step="0.1" value="${cur.sensitivity}" data-assist-num="cursorSensitivity"></div>
        <div class="field"><label for="curSmooth">Steadiness — less jitter, a little more lag (${Math.round(cur.smoothing * 100)}%)</label><input id="curSmooth" type="range" min="0" max="0.8" step="0.05" value="${cur.smoothing}" data-assist-num="cursorSmoothing"></div>
      </div>
      <div class="practice">
        <p class="muted">Practice: point and pinch each target.</p>
        <div class="practice-row">${['🍫', '🌰', '🥕'].map((e, i) => `<button type="button" class="practice-target" data-practice="${i}" aria-label="Practice target ${i + 1}">${e}</button>`).join('')}</div>
      </div>
    </section>

    <h3 class="guide-sub"><i class="ph-duotone ph-chat-circle-text" aria-hidden="true"></i>Things you can say</h3>
    <div class="table-wrap"><table class="data-table"><tbody>${examples.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table></div>
    <p class="muted">Short English commands (“next”, “open tests”) run instantly. Anything longer, in another language, or with several steps goes to the AI, which plans it first — the chat beside your buddy shows each step as it happens. Jokes, dancing, “come here” and other small talk work even without an AI key. Problem names are matched by how they sound, so “baton” still finds Buttons.</p>

    <h3 class="guide-sub"><i class="ph-duotone ph-plus-circle" aria-hidden="true"></i>Add your own voice command</h3>
    <form class="assist-form" id="phraseForm">
      <div class="field"><label for="phraseText">When I say…</label><input id="phraseText" required maxlength="60" placeholder="e.g. let's go"></div>
      <div class="field"><label for="phraseAction">…do this</label><select id="phraseAction">${actionOptions('run-tests')}</select></div>
      <button class="btn btn-primary" type="submit">Add phrase</button>
    </form>
    <ul class="assist-list">${(cfg.phrases || [])
      .map((p, i) => `<li><span>“${escapeHtml(p.phrase)}” → ${escapeHtml(assistant.ACTIONS[p.action]?.label || p.action)}</span><button class="btn btn-ghost btn-sm" type="button" data-del-phrase="${i}" aria-label="Delete phrase ${escapeHtml(p.phrase)}">Remove</button></li>`)
      .join('') || '<li class="muted">No custom phrases yet.</li>'}</ul>

    <h3 class="guide-sub"><i class="ph-duotone ph-hand-pointing" aria-hidden="true"></i>Built-in gestures</h3>
    <p class="muted">Hold a sign for about half a second. Change what each one does:</p>
    <div class="gesture-map">${Object.entries(assistant.BUILTIN)
      .map(([k, b]) => `<label class="gesture-item"><span class="gesture-emoji" aria-hidden="true">${b.emoji}</span><span>${escapeHtml(b.label)}</span>
        <select data-gesture-map="${k}" aria-label="Action for ${escapeHtml(b.label)}">${actionOptions(map[k])}</select></label>`)
      .join('')}</div>

    <h3 class="guide-sub"><i class="ph-duotone ph-graduation-cap" aria-hidden="true"></i>Train a custom gesture</h3>
    <ol class="tool-list">
      <li>Start the camera above and make sure your hand shows in the preview.</li>
      <li>Name the gesture and pick what it should do.</li>
      <li>Press <em>Record</em> and hold the pose still for ~3 seconds (move it a little closer and farther for a sturdier match).</li>
      <li>Try it: the preview shows what it recognises. Custom gestures win over built-in ones.</li>
    </ol>
    <form class="assist-form" id="trainForm">
      <div class="field"><label for="trainName">Name</label><input id="trainName" required maxlength="30" placeholder="e.g. rock on"></div>
      <div class="field"><label for="trainAction">Action</label><select id="trainAction">${actionOptions('verify-day')}</select></div>
      <button class="btn btn-primary" type="submit" id="trainBtn" ${g.on ? '' : 'disabled'}>${g.on ? 'Record' : 'Start the camera first'}</button>
    </form>
    <div class="train-progress" id="trainProgress" hidden><span></span></div>
    <ul class="assist-list">${assistant.customs()
      .map((c) => `<li><span>✋ ${escapeHtml(c.name)} → ${escapeHtml(assistant.ACTIONS[c.action]?.label || c.action)} <span class="muted">(${c.samples.length} samples)</span></span><button class="btn btn-ghost btn-sm" type="button" data-del-gesture="${escapeHtml(c.id)}" aria-label="Delete gesture ${escapeHtml(c.name)}">Remove</button></li>`)
      .join('') || '<li class="muted">No custom gestures yet.</li>'}</ul>

    <div class="guide-note">
      <i class="ph-duotone ph-shield-check" aria-hidden="true"></i>
      <p><strong>Privacy.</strong> Both are off until you turn them on and stop when you close the tab. <em>Gestures</em> run entirely on your PC (MediaPipe in the browser); no video is stored or sent, and trained gestures are saved in this browser only. <em>Voice</em> uses your browser's speech recognition — in Chrome and Edge, audio is sent to Google/Microsoft to be transcribed. Talk-back speech is generated locally.</p>
    </div>`;
}

// The live preview + landmark overlay only runs while this page is open.
let assistantDraw = null;
function mountAssistantPanel() {
  unmountAssistantPanel();
  const g = assistant.gestures;
  const video = $('#assistVideo');
  const canvas = $('#assistCanvas');
  if (g.on && g.stream && video) {
    video.srcObject = g.stream;
    video.play().catch(() => {});
    const ctx = canvas.getContext('2d');
    const bones = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]];
    assistantDraw = (res, v) => {
      canvas.width = v.videoWidth;
      canvas.height = v.videoHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const lm = res.landmarks?.[0];
      const seeing = $('#assistSeeing');
      if (!lm) {
        if (seeing) seeing.textContent = 'no hand';
        return;
      }
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#d9975b';
      ctx.fillStyle = '#fdf3e4';
      for (const [a, b] of bones) {
        ctx.beginPath();
        ctx.moveTo(lm[a].x * canvas.width, lm[a].y * canvas.height);
        ctx.lineTo(lm[b].x * canvas.width, lm[b].y * canvas.height);
        ctx.stroke();
      }
      for (const p of lm) {
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (seeing) {
        const live = g.live;
        let label = 'a hand';
        if (g.recording) label = `recording… ${g.recording.samples.length}/${g.recording.target}`;
        else if (live?.name?.startsWith('custom:')) label = `✋ ${assistant.customs().find((c) => `custom:${c.id}` === live.name)?.name || 'custom'} (${Math.round(live.score * 100)}%)`;
        else if (live) label = `${assistant.BUILTIN[live.name]?.emoji || ''} ${assistant.BUILTIN[live.name]?.label || live.name} (${Math.round(live.score * 100)}%)`;
        seeing.textContent = label;
      }
    };
    g.listeners.add(assistantDraw);
  }
}
function unmountAssistantPanel() {
  if (assistantDraw) assistant.gestures.listeners.delete(assistantDraw);
  assistantDraw = null;
}

function bindAssistantPanel() {
  const body = $('#guideBody');
  const rerender = () => $('#guide').open && $('[data-guide-nav="assistant"]')?.getAttribute('aria-current') === 'true' && renderGuideSection('assistant');
  document.addEventListener('assistant:change', rerender);
  body.addEventListener('click', (e) => {
    const t = e.target;
    const target = t.closest('[data-practice]');
    if (target) {
      target.classList.add('is-hit');
      window.mascot?.react('sparkle', 600);
      if ($('.practice-target').every((b) => b.classList.contains('is-hit'))) toast('Nice aim! You have got the air cursor.');
    }
    const which = t.closest('[data-assist]')?.dataset.assist;
    if (which === 'voice') assistant.voice.toggle();
    if (which === 'gestures') assistant.gestures.toggle();
    const dp = t.closest('[data-del-phrase]');
    if (dp) {
      const phrases = [...(assistant.load().phrases || [])];
      phrases.splice(Number(dp.dataset.delPhrase), 1);
      assistant.save({ phrases });
      renderGuideSection('assistant');
    }
    const dg = t.closest('[data-del-gesture]');
    if (dg) {
      assistant.save({ gestures: assistant.customs().filter((c) => c.id !== dg.dataset.delGesture) });
      renderGuideSection('assistant');
    }
  });
  body.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.assistSet) {
      assistant.save({ [t.dataset.assistSet]: t.checked });
      if (t.dataset.assistSet === 'airCursor') copilot.cursor.syncSuppress();
    }
    if (t.dataset.assistPick) {
      assistant.save({ [t.dataset.assistPick]: t.value });
      if (t.dataset.assistPick === 'ear') assistant.voice.restart();
      if (t.dataset.assistPick === 'voiceStyle') assistant.speak('Hehe, hi! Do you like my voice?', 'en-US', 'giggle');
      renderGuideSection('assistant');
    }
    if (t.matches('[data-assist-lang]')) {
      assistant.voice.setLanguage(t.value);
      toast(`Listening in ${t.selectedOptions[0].textContent.split(' · ')[0]}.`);
    }
    if (t.dataset.assistNum) {
      assistant.save({ [t.dataset.assistNum]: Number(t.value) });
      renderGuideSection('assistant');
    }
    if (t.matches('[data-assist-char]')) {
      window.mascot?.setCharacter(t.value);
      window.mascot?.react('delighted', 900);
      window.mascot?.say(`Hi, I'm ${window.mascot.name()}!`);
    }
    if (t.dataset.gestureMap) assistant.save({ gestureMap: { ...(assistant.load().gestureMap || {}), [t.dataset.gestureMap]: t.value } });
  });
  body.addEventListener('submit', (e) => {
    if (e.target.id === 'phraseForm') {
      e.preventDefault();
      const phrase = $('#phraseText').value.trim();
      if (!phrase) return;
      assistant.save({ phrases: [...(assistant.load().phrases || []), { phrase, action: $('#phraseAction').value }] });
      toast(`Say “${phrase}” any time voice is on.`);
      renderGuideSection('assistant');
    }
    if (e.target.id === 'trainForm') {
      e.preventDefault();
      const name = $('#trainName').value.trim();
      if (!name || !assistant.gestures.on) return;
      const bar = $('#trainProgress');
      const btn = $('#trainBtn');
      btn.disabled = true;
      btn.textContent = 'Hold the pose…';
      bar.hidden = false;
      window.mascot?.say(`Show me “${name}” and hold still!`, 4000);
      assistant.gestures.record({
        name,
        action: $('#trainAction').value,
        onProgress: (p) => ($('#trainProgress span').style.width = `${Math.round(p * 100)}%`),
        onDone: () => {
          toast(`Learned “${name}”. Try it now!`);
          renderGuideSection('assistant');
        },
      });
    }
  });
}
document.addEventListener('DOMContentLoaded', bindAssistantPanel);

/* ==========================================================================
   Guide
   ========================================================================== */
const PROVIDER_INFO = {
  gemini: {
    icon: 'ph-google-logo',
    blurb: 'Fast and has a generous free tier. Great default.',
    cost: 'Free tier',
    keyUrl: 'https://aistudio.google.com/apikey',
    env: 'GEMINI_API_KEY=your-key\n# optional: GEMINI_MODEL=gemini-3.8-flash',
  },
  anthropic: {
    icon: 'ph-asterisk',
    blurb: 'Claude — the most careful reasoner here; best for proofs and tricky traces.',
    cost: 'Paid API',
    keyUrl: 'https://console.anthropic.com/settings/keys',
    env: 'ANTHROPIC_API_KEY=your-key\n# optional: ANTHROPIC_MODEL=claude-opus-5',
  },
  openai: {
    icon: 'ph-open-ai-logo',
    blurb: 'GPT models via the OpenAI API.',
    cost: 'Paid API',
    keyUrl: 'https://platform.openai.com/api-keys',
    env: 'OPENAI_API_KEY=your-key\nOPENAI_MODEL=a-model-your-account-can-use',
  },
  ollama: {
    icon: 'ph-desktop-tower',
    blurb: 'Runs a model on your own PC. Free, fully private, works offline — weaker on hard proofs.',
    cost: 'Free · offline',
    keyUrl: 'https://ollama.com/download',
    env: '# no key needed — install Ollama, then:\n#   ollama pull qwen2.5-coder:7b\n# optional: OLLAMA_MODEL=qwen2.5-coder:7b',
  },
};

const GUIDE_SECTIONS = [
  { id: 'welcome', icon: 'ph-hand-waving', label: 'Welcome' },
  { id: 'progress', icon: 'ph-trophy', label: 'Progress & achievements' },
  { id: 'assistant', icon: 'ph-hand-waving', label: 'Voice & gestures' },
  { id: 'ai', icon: 'ph-sparkle', label: 'Choose your AI' },
  { id: 'how', icon: 'ph-gear-six', label: 'How it works' },
  { id: 'mcp', icon: 'ph-plugs-connected', label: 'Use with Claude (MCP)' },
  { id: 'reminders', icon: 'ph-bell-ringing', label: 'Reminders & streak' },
  { id: 'data', icon: 'ph-database', label: 'Your data' },
  { id: 'keys', icon: 'ph-keyboard', label: 'Shortcuts' },
];

function copyButton(text, label = 'Copy') {
  return `<button class="btn btn-ghost btn-sm" type="button" data-copy="${escapeHtml(text)}">${icon('copy')}<span>${label}</span></button>`;
}

function guideWelcome() {
  const steps = [
    ['ph-calendar-heart', 'Pick a day', 'A fresh set arrives daily.'],
    ['ph-book-open-text', 'Read the story', 'Plain words, then a traced sample.'],
    ['ph-code', 'Write your file', 'One click from the template.'],
    ['ph-flask', 'Test it', 'Samples + your own inputs.'],
    ['ph-seal-check', 'Verify', 'Marks it solved, grows your streak.'],
  ];
  return `
    <h2 class="guide-h">Welcome to AlgoPulse Studio</h2>
    <p class="guide-lead">A cosy workbench for daily competitive programming: it explains each problem like a story, lets you write and test your solution right here, and keeps you coming back with reminders and a streak.</p>
    <ol class="flow">${steps
      .map(([ic, t, d], i) => `<li class="flow-step" style="--i:${i}"><i class="ph-duotone ${ic}" aria-hidden="true"></i><strong>${t}</strong><span>${d}</span></li>`)
      .join('')}</ol>
    <div class="guide-cta">
      <button class="btn btn-primary" type="button" data-start-tour><i class="ph-duotone ph-play-circle" aria-hidden="true"></i>Take the 60-second tour</button>
      <button class="btn btn-secondary" type="button" data-guide-nav="ai">Set up the AI coach</button>
    </div>
    <div class="guide-note">
      <i class="ph-duotone ph-lock-key" aria-hidden="true"></i>
      <p><strong>Private by design.</strong> The studio runs on your own PC (<code>npm run view</code>). Your AI key lives in <code>.env</code> on disk, the server only listens on <code>localhost</code>, and keys are never sent to the browser. Prefer nothing leaving your machine? Pick Ollama.</p>
    </div>`;
}

function guideAi() {
  const ai = state.ai || { providers: [], cache: { entries: 0, bytes: 0 } };
  const activeId = ai.active?.id;
  const cards = ai.providers
    .map((p) => {
      const info = PROVIDER_INFO[p.id];
      const isActive = p.id === activeId;
      return `
        <article class="provider ${isActive ? 'is-active' : ''}" data-provider="${p.id}">
          <header class="provider-head">
            <i class="ph-duotone ${info.icon} provider-icon" aria-hidden="true"></i>
            <div>
              <h3>${escapeHtml(p.label)}</h3>
              <p class="muted">${escapeHtml(info.blurb)}</p>
            </div>
          </header>
          <div class="provider-chips">
            <span class="pill ${p.configured ? 'ok' : 'soft'}">${p.configured ? '<i class="ph-fill ph-check-circle" aria-hidden="true"></i>Ready' : 'Not set up'}</span>
            <span class="pill soft">${escapeHtml(info.cost)}</span>
            <span class="pill soft"><code>${escapeHtml(p.model)}</code></span>
            ${isActive ? '<span class="pill ok"><i class="ph-fill ph-star" aria-hidden="true"></i>In use</span>' : ''}
          </div>
          <p class="provider-ladder"><i class="ph-duotone ph-stairs" aria-hidden="true"></i>${p.fallbacks?.length ? `Falls back to ${p.fallbacks.map((m) => `<code>${escapeHtml(m)}</code>`).join(' → ')}` : `No fallback set — add <code>${p.id.toUpperCase()}_FALLBACK_MODELS</code> to <code>.env</code>`}</p>
          <details class="provider-setup" ${!p.configured && !activeId ? 'open' : ''}>
            <summary>How to set it up</summary>
            <ol>
              <li>${p.id === 'ollama' ? `Install Ollama from <a href="${info.keyUrl}" target="_blank" rel="noopener noreferrer">ollama.com</a> and start it.` : `Create a key at <a href="${info.keyUrl}" target="_blank" rel="noopener noreferrer">${new URL(info.keyUrl).hostname}</a>.`}</li>
              <li>Add this to <code>.env</code> in the repo root (it is gitignored):
                <div class="snippet"><pre>${escapeHtml(info.env)}</pre>${copyButton(info.env)}</div>
              </li>
              <li>Restart the studio (<code>npm run view</code>), then press <em>Use this</em>.</li>
            </ol>
          </details>
          <div class="provider-actions">
            <button class="btn ${isActive ? 'btn-secondary' : 'btn-primary'} btn-sm" type="button" data-use-provider="${p.id}" ${isActive ? 'disabled' : ''}>${isActive ? 'Selected' : 'Use this'}</button>
            ${isActive ? `<button class="btn btn-secondary btn-sm" type="button" data-test-ai><i class="ph-duotone ph-plugs" aria-hidden="true"></i>Test connection</button>` : ''}
            <span class="provider-result" aria-live="polite"></span>
          </div>
        </article>`;
    })
    .join('');
  const kb = Math.round((ai.cache?.bytes || 0) / 1024);
  return `
    <h2 class="guide-h">Choose your AI</h2>
    <p class="guide-lead">Bring your own key — or none at all with Ollama. The same stories, walkthroughs and coach work on every provider.</p>
    <div class="provider-grid">${cards}</div>
    <div class="guide-note">
      <i class="ph-duotone ph-lightning" aria-hidden="true"></i>
      <p><strong>Response cache:</strong> ${ai.cache?.entries || 0} answers saved (${kb} KB) in <code>.cache/ai/</code>. Asking the same thing again is instant and free.
      <button class="btn btn-ghost btn-sm" type="button" data-clear-cache>Clear cache</button></p>
    </div>`;
}

function guideHow() {
  return `
    <h2 class="guide-h">How it works</h2>
    <p class="guide-lead">The AI never sees the problem statement, so it is never allowed to guess. Every request is grounded in files that are already verified on your disk.</p>
    <div class="diagram guide-diagram" id="howDiagram"></div>
    <dl class="how-list">
      <div><dt><i class="ph-duotone ph-anchor" aria-hidden="true"></i>Grounding</dt><dd>Each prompt carries the reference solution and the sample tests, plus rules forbidding invented constraints.</dd></div>
      <div><dt><i class="ph-duotone ph-magnifying-glass" aria-hidden="true"></i>RAG over your notes</dt><dd>The coach searches your own past walkthroughs, stories and solutions (BM25, fully local) and cites similar problems you have met.</dd></div>
      <div><dt><i class="ph-duotone ph-brackets-curly" aria-hidden="true"></i>Structured output</dt><dd>Stories come back as JSON data, not code — one built-in player animates them, so nothing the model writes ever runs in your browser.</dd></div>
      <div><dt><i class="ph-duotone ph-seal-check" aria-hidden="true"></i>Verification</dt><dd>The traced answer is checked against the real expected output; docs missing sections or with runaway tables are rejected.</dd></div>
      <div><dt><i class="ph-duotone ph-lightning" aria-hidden="true"></i>Cache</dt><dd>Every answer is cached by provider + model + prompt, so repeats cost nothing and work offline. Claude also reuses the grounding via prompt caching.</dd></div>
    </dl>`;
}

const HOW_DIAGRAM = `flowchart LR
  S["set.json + tests + reference"] --> G["Grounded prompt"]
  N["Your past notes"] -->|"BM25 RAG"| G
  G --> C{"Cached?"}
  C -->|"yes"| R["Answer"]
  C -->|"no"| P["Gemini / Claude / OpenAI / Ollama"]
  P --> V["Validate + verify vs samples"]
  V --> R
  R --> UI["Story · Walkthrough · Coach"]`;

function guideMcp() {
  const root = state.ai?.repoRoot || '<path-to-repo>';
  const desktop = JSON.stringify({ mcpServers: { algopulse: { command: 'node', args: [`${root.replace(/\\/g, '/')}/practice/mcp/server.js`] } } }, null, 2);
  return `
    <h2 class="guide-h">Use with Claude (MCP)</h2>
    <p class="guide-lead">An MCP server exposes your practice to Claude as tools, so you can say “run my tests for Only Pluses and tell me what's wrong” from Claude Code or Claude Desktop.</p>
    <h3 class="guide-sub">Claude Code</h3>
    <p>Already wired: <code>.mcp.json</code> in the repo root registers <code>algopulse</code>. Open Claude Code in this folder and approve the server when asked.</p>
    <h3 class="guide-sub">Claude Desktop</h3>
    <p>Add this to <code>claude_desktop_config.json</code> and restart Claude Desktop:</p>
    <div class="snippet"><pre>${escapeHtml(desktop)}</pre>${copyButton(desktop)}</div>
    <h3 class="guide-sub">Tools</h3>
    <ul class="tool-list">
      <li><code>list_days</code> — every day, problem and solved flag, plus your streak</li>
      <li><code>get_problem</code> — walkthrough, story, tests and your attempt (reference only on request — no spoilers)</li>
      <li><code>run_tests</code> — judge your attempt on the samples (AC / WA / RE / TLE)</li>
      <li><code>run_custom</code> — run any input, optionally judged against an expected output</li>
      <li><code>search_notes</code> — search your own notes across all days</li>
    </ul>`;
}

function guideReminders() {
  const r = reminders.load();
  const perm = 'Notification' in window ? Notification.permission : 'unsupported';
  const cmd = 'npm run remind:install -- -Time 18:30';
  return `
    <h2 class="guide-h">Reminders & streak</h2>
    <p class="guide-lead">You are on a <strong>${state.streak?.current || 0}-day streak</strong> (best ${state.streak?.best || 0}). A day counts once <em>Verify day</em> marks at least one problem solved.</p>
    <div class="reminder-grid">
      <section class="card reminder-card">
        <h3 class="guide-sub"><i class="ph-duotone ph-windows-logo" aria-hidden="true"></i>Windows reminder (recommended)</h3>
        <p>Every day at your time it builds the set, starts the studio and shows a toast with an <em>Open studio</em> button — even when no browser is open.</p>
        <div class="snippet"><pre>${cmd}</pre>${copyButton(cmd)}</div>
        <p class="muted">Test it now with <code>npm run remind</code>. Remove it with <code>npm run remind:install -- -Remove</code>.</p>
      </section>
      <section class="card reminder-card">
        <h3 class="guide-sub"><i class="ph-duotone ph-browser" aria-hidden="true"></i>Browser nudge</h3>
        <p>While a studio tab is open, get a gentle notification at your time if problems are still waiting.</p>
        <form class="reminder-form" id="reminderForm">
          <label class="switch"><input type="checkbox" name="enabled" ${r.enabled ? 'checked' : ''}><span>Nudge me daily</span></label>
          <div class="field"><label for="reminderTime">Time</label><input id="reminderTime" name="time" type="time" value="${r.time}"></div>
          <button class="btn btn-primary btn-sm" type="submit">Save</button>
          <button class="btn btn-ghost btn-sm" type="button" data-test-reminder>Send a test</button>
        </form>
        <p class="muted">Notifications: <strong>${perm}</strong>${perm === 'denied' ? ' — allow them in your browser\'s site settings.' : ''}</p>
      </section>
    </div>`;
}

function guideData() {
  const rows = [
    ['Your solutions', '<code>&lt;problem&gt;.js</code> at the repo root', 'Your git repo'],
    ['Day sets & samples', '<code>practice/days/&lt;date&gt;/set.json</code>, <code>tests/</code>', 'Your git repo'],
    ['Walkthroughs', '<code>practice/days/&lt;date&gt;/explanations/*.md</code>', 'Your git repo'],
    ['Stories & traces', '<code>practice/days/&lt;date&gt;/stories/*.json</code>', 'Your git repo'],
    ['Solved / streak', '<code>[x]</code> marks in each day\'s <code>README.md</code>', 'Your git repo'],
    ['AI keys', '<code>.env</code>', 'Your PC only (gitignored)'],
    ['AI provider choice', '<code>practice/ai/settings.local.json</code>', 'Your PC only (gitignored)'],
    ['AI answer cache', '<code>.cache/ai/</code>', 'Your PC only (gitignored)'],
    ['Theme, reminder time, tour seen', 'Browser storage', 'This browser only'],
  ];
  return `
    <h2 class="guide-h">Your data</h2>
    <p class="guide-lead">Everything is plain files you own. No accounts, no database, no telemetry. The only thing that leaves your PC is the prompt sent to the AI provider you picked — and with Ollama, not even that.</p>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th scope="col">What</th><th scope="col">Where</th><th scope="col">Lives in</th></tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
    </table></div>`;
}

function guideKeys() {
  const keys = [
    ['<kbd>J</kbd> / <kbd>K</kbd>', 'Next / previous problem'],
    ['<kbd>1</kbd> – <kbd>6</kbd>', 'Switch tabs'],
    ['<kbd>/</kbd>', 'Search problems'],
    ['<kbd>C</kbd>', 'Open the coach'],
    ['<kbd>T</kbd>', 'Toggle theme'],
    ['<kbd>G</kbd>', 'Open this guide'],
    ['<kbd>M</kbd>', 'Hide or show your buddy'],
    ['<kbd>V</kbd>', 'Voice control on / off'],
    ['<kbd>W</kbd>', 'Gesture control (camera) on / off'],
    ['<kbd>Ctrl</kbd> + <kbd>S</kbd>', 'Save your attempt'],
  ];
  return `
    <h2 class="guide-h">Shortcuts</h2>
    <dl class="keys">${keys.map(([k, d]) => `<div><dt>${k}</dt><dd>${d}</dd></div>`).join('')}</dl>`;
}

const GUIDE_RENDER = { welcome: guideWelcome, ai: guideAi, how: guideHow, mcp: guideMcp, reminders: guideReminders, progress: guideProgress, assistant: guideAssistant, data: guideData, keys: guideKeys };

function renderGuideSection(id) {
  const body = $('#guideBody');
  body.innerHTML = GUIDE_RENDER[id]();
  $$('#guideNav [data-guide-nav]').forEach((b) => b.setAttribute('aria-current', String(b.dataset.guideNav === id)));
  // On phones the section tabs scroll sideways: keep the current one in view.
  $(`#guideNav [data-guide-nav="${id}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center' });
  body.scrollTop = 0;
  motion.popIn(body);
  if (id === 'how') renderMermaid($('#howDiagram'), HOW_DIAGRAM);
  if (id === 'assistant') mountAssistantPanel();
  else unmountAssistantPanel();
}

async function openGuide(section = 'welcome') {
  const guide = $('#guide');
  if (!guide.open) guide.showModal();
  // Refresh provider status each time the AI section is shown.
  if (section === 'ai' || section === 'mcp') {
    try {
      applyAiStatus(await api('/api/ai/status'));
    } catch { /* keep last known */ }
  }
  renderGuideSection(section);
}

async function useProvider(btn, id) {
  setLoading(btn, true);
  try {
    applyAiStatus(await api('/api/ai/provider', { provider: id }));
    renderGuideSection('ai');
    const p = state.ai.active;
    toast(p.ready ? `Now using ${p.label}.` : `${p.label} selected — finish its setup below, then restart the studio.`);
    // Re-render AI-dependent views for the current problem.
    const cur = current();
    if (cur) {
      renderStory(cur);
      renderWalkthrough(cur);
      renderCoachLog();
    }
  } catch (err) {
    toast(err.message, 'error');
    setLoading(btn, false);
  }
}

async function testAi(btn) {
  const out = btn.parentElement.querySelector('.provider-result');
  setLoading(btn, true);
  out.textContent = '';
  try {
    const r = await api('/api/ai/test', {});
    out.innerHTML = r.ok
      ? `<span class="pill ok"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>Connected · ${r.ms} ms</span>`
      : `<span class="pill warn">Replied, but oddly: “${escapeHtml(r.reply)}”</span>`;
  } catch (err) {
    out.innerHTML = `<span class="pill warn">${escapeHtml(err.message)}</span>`;
  } finally {
    setLoading(btn, false);
  }
}

/* ==========================================================================
   Browser reminders (per-browser convenience → localStorage)
   ========================================================================== */
const reminders = {
  key: 'algopulse-reminder',
  timer: null,
  load() {
    try {
      return { enabled: false, time: '18:00', ...JSON.parse(localStorage.getItem(this.key) || '{}') };
    } catch {
      return { enabled: false, time: '18:00' };
    }
  },
  save(r) {
    try {
      localStorage.setItem(this.key, JSON.stringify(r));
    } catch { /* private mode: reminder lasts this session */ }
    this.schedule(r);
  },
  schedule(r = this.load()) {
    clearTimeout(this.timer);
    if (!r.enabled) return;
    const [h, m] = r.time.split(':').map(Number);
    const next = new Date();
    next.setHours(h, m, 0, 0);
    if (next <= new Date()) next.setDate(next.getDate() + 1);
    this.timer = setTimeout(() => {
      this.fire();
      this.schedule();
    }, next - new Date());
  },
  fire(force = false) {
    const left = state.problems.filter((p) => !p.done).length;
    if (!force && left === 0) return;
    const streak = state.streak?.current || 0;
    const body = left
      ? `${left} problem${left === 1 ? '' : 's'} waiting today.${streak ? ` Keep your ${streak}-day streak alive!` : ''}`
      : 'All caught up today — lovely work.';
    if ('Notification' in window && Notification.permission === 'granted') {
      const n = new Notification('AlgoPulse Studio', { body, icon: 'logo.svg', tag: 'algopulse-daily' });
      n.onclick = () => {
        window.focus();
        n.close();
      };
    } else {
      toast(body);
    }
  },
};

/* ==========================================================================
   Guided tour — spotlight + card, keyboard driven, GSAP-animated
   ========================================================================== */
const TOUR = [
  { sel: '#dayButton', title: 'Pick a day', text: 'Each day brings a fresh set. The ring beside it shows how many you have solved.' },
  { sel: () => (desktopMq.matches ? '#problemList' : '#btnOpenSidebar'), title: 'Your problems', text: 'Search by name or tag, filter to what is left, and jump between problems with J and K.' },
  { sel: '#tab-story', tab: 'story', title: 'Start with the story', text: 'An everyday analogy first, then the narrator acts out a real sample step by step — checked against the real answer.' },
  { sel: '#tab-walkthrough', tab: 'walkthrough', title: 'Go deeper', text: 'The full walkthrough: intuition, proofs with math, diagrams, complexity and edge cases.' },
  { sel: '#tab-code', tab: 'code', title: 'Write your solution', text: 'One click creates your file from the template. Edit it here or in VS Code — Ctrl+S saves.' },
  { sel: '#tab-tests', tab: 'tests', title: 'Test it right here', text: 'Run every sample, or throw any input at it in the Playground with an optional expected output.' },
  { sel: '#btnVerifyDay', title: 'Mark it solved', text: 'Verify day runs the official checker and ticks off everything that passes.' },
  { sel: '#btnCoach', title: 'Stuck? Ask the coach', text: 'Hints without spoilers, grounded in the real solution and your own past notes.' },
  { sel: '#player', title: 'Level up', text: 'Every verified solve earns XP — harder problems pay more. Finish daily quests for bonuses and climb from Newbie to Grandmaster.' },
  { sel: '#streakBadge', title: 'Keep your streak', text: 'Solve at least one problem a day. Set a reminder in the Guide so you never miss one.' },
  { sel: '#mascot', title: 'Meet Pip', text: 'Pip watches your cursor and cheers when your tests pass. Boop Pip, drag Pip anywhere, or press M to let Pip nap.' },
  { sel: '#btnVoice', title: 'Talk to your buddy', text: 'Turn on voice and just say it: “next problem”, “open tests”, “run tests”, “ask coach why greedy works”.' },
  { sel: '#btnGestures', title: 'Or wave at it', text: 'Gestures use your camera, processed only on your PC: 👍 runs tests, ✌️ next problem, swipe to change tabs. Train your own in the Guide.' },
  { sel: '#btnGuide', title: 'Help is always here', text: 'Open the Guide any time (G) to set up your AI, reminders, or connect Claude via MCP.' },
];

const tour = {
  i: 0,
  start() {
    $('#guide').open && $('#guide').close();
    $('#coach').open && $('#coach').close();
    $('#welcome')?.remove();
    const dlg = $('#tour');
    this.i = 0;
    dlg.showModal();
    this.show(true);
    try {
      localStorage.setItem('algopulse-toured', '1');
    } catch { /* ignore */ }
  },
  end() {
    $('#tour').close();
    showTab('story');
  },
  go(delta) {
    const next = this.i + delta;
    if (next < 0) return;
    if (next >= TOUR.length) return this.end();
    this.i = next;
    this.show();
  },
  show(first = false) {
    const step = TOUR[this.i];
    if (step.tab) showTab(step.tab, { animate: false });
    const sel = typeof step.sel === 'function' ? step.sel() : step.sel;
    const target = $(sel);
    if (!target || target.hidden) return this.go(1);
    target.scrollIntoView({ block: 'nearest', behavior: 'instant' });

    const pad = 8;
    const r = target.getBoundingClientRect();
    const spot = $('#tourSpot');
    const card = $('#tourCard');
    const box = { x: r.left - pad, y: r.top - pad, w: r.width + pad * 2, h: Math.min(r.height + pad * 2, innerHeight - 24) };

    $('#tourTitle').textContent = step.title;
    $('#tourText').textContent = step.text;
    $('#tourCount').textContent = `${this.i + 1} of ${TOUR.length}`;
    $('#tourPrev').disabled = this.i === 0;
    $('#tourNext').textContent = this.i === TOUR.length - 1 ? 'Finish' : 'Next';
    $('#tourDots').innerHTML = TOUR.map((_, n) => `<span class="${n === this.i ? 'on' : ''}"></span>`).join('');

    // Place the card below the target if there is room, else above; clamp to viewport.
    const cw = Math.min(340, innerWidth - 32);
    const below = box.y + box.h + 16;
    const cardH = card.offsetHeight || 190;
    const top = below + cardH < innerHeight ? below : Math.max(16, box.y - cardH - 16);
    const left = Math.min(Math.max(16, box.x + box.w / 2 - cw / 2), innerWidth - cw - 16);

    if (motion.ok()) {
      gsap.to(spot, { x: box.x, y: box.y, width: box.w, height: box.h, duration: first ? 0 : 0.45, ease: 'power3.inOut' });
      gsap.fromTo(card, { opacity: 0, y: 8 }, { opacity: 1, y: 0, left, top, width: cw, duration: 0.35, delay: first ? 0 : 0.2 });
    } else {
      Object.assign(spot.style, { transform: `translate(${box.x}px, ${box.y}px)`, width: `${box.w}px`, height: `${box.h}px` });
      Object.assign(card.style, { left: `${left}px`, top: `${top}px`, width: `${cw}px`, opacity: 1 });
    }
    $('#tourNext').focus();
  },
};

function maybeWelcome() {
  let seen = false;
  try {
    seen = localStorage.getItem('algopulse-toured') === '1';
  } catch { /* ignore */ }
  if (seen || $('#welcome')) return;
  const el = document.createElement('aside');
  el.id = 'welcome';
  el.className = 'welcome card';
  el.setAttribute('aria-label', 'Welcome');
  el.innerHTML = `
    <svg class="welcome-logo" aria-hidden="true"><use href="#i-logo"/></svg>
    <div>
      <strong>New here?</strong>
      <p class="muted">Take a 60-second tour of how everything fits together.</p>
      <div class="empty-actions" style="justify-content:flex-start">
        <button class="btn btn-primary btn-sm" type="button" data-start-tour>Start the tour</button>
        <button class="btn btn-ghost btn-sm" type="button" data-dismiss-welcome>Maybe later</button>
      </div>
    </div>`;
  document.body.append(el);
  motion.popIn(el);
}

/* ==========================================================================
   Events
   ========================================================================== */
function bindGuide() {
  $('#btnGuide').addEventListener('click', () => openGuide('welcome'));
  $('#streakBadge').addEventListener('click', () => openGuide('reminders'));
  $('#btnCloseGuide').addEventListener('click', () => $('#guide').close());
  closeOnBackdrop($('#guide'));

  $('#guideNav').addEventListener('click', (e) => {
    const b = e.target.closest('[data-guide-nav]');
    if (b) openGuide(b.dataset.guideNav);
  });

  $('#tourPrev').addEventListener('click', () => tour.go(-1));
  $('#tourNext').addEventListener('click', () => tour.go(1));
  $('#tourSkip').addEventListener('click', () => tour.end());
  $('#tour').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') tour.go(1);
    if (e.key === 'ArrowLeft') tour.go(-1);
  });
  $('#tour').addEventListener('cancel', () => showTab('story'));
  window.addEventListener('resize', () => $('#tour').open && tour.show(true));

  // Delegated actions that can appear anywhere (guide, coach, empty states, welcome card).
  document.addEventListener('click', async (e) => {
    const t = e.target;
    const openG = t.closest('[data-open-guide]');
    if (openG) {
      $('#coach').open && $('#coach').close();
      return openGuide(openG.dataset.openGuide);
    }
    const nav = t.closest('#guideBody [data-guide-nav]');
    if (nav) return openGuide(nav.dataset.guideNav);
    if (t.closest('[data-start-tour]')) return tour.start();
    if (t.closest('[data-dismiss-welcome]')) {
      try {
        localStorage.setItem('algopulse-toured', '1');
      } catch { /* ignore */ }
      return $('#welcome')?.remove();
    }
    const use = t.closest('[data-use-provider]');
    if (use) return useProvider(use, use.dataset.useProvider);
    const test = t.closest('[data-test-ai]');
    if (test) return testAi(test);
    if (t.closest('[data-clear-cache]')) {
      const { cache } = await api('/api/ai/cache/clear', {});
      state.ai.cache = cache;
      toast('AI cache cleared.');
      return renderGuideSection('ai');
    }
    const copy = t.closest('[data-copy]');
    if (copy) {
      try {
        await navigator.clipboard.writeText(copy.dataset.copy);
        toast('Copied.');
      } catch {
        toast('Clipboard is blocked in this browser.', 'error');
      }
      return;
    }
    if (t.closest('[data-test-reminder]')) {
      if ('Notification' in window && Notification.permission === 'default') await Notification.requestPermission();
      return reminders.fire(true);
    }
    // Links to other problems inside the coach close the sheet so the page is visible.
    if (t.closest('#coach a[href^="#/"]')) $('#coach').close();
  });

  document.addEventListener('submit', async (e) => {
    if (e.target.id !== 'reminderForm') return;
    e.preventDefault();
    const form = e.target;
    const r = { enabled: form.elements.enabled.checked, time: form.elements.time.value || '18:00' };
    if (r.enabled && 'Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    reminders.save(r);
    toast(r.enabled ? `Daily nudge set for ${r.time} (while a studio tab is open).` : 'Browser nudge turned off.');
    renderGuideSection('reminders');
  });

  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    if ($$('dialog').some((d) => d.matches(':modal'))) return;
    if (e.key.toLowerCase() === 'g') openGuide('welcome');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  $('#guideNav').innerHTML = GUIDE_SECTIONS.map(
    (s) => `<button type="button" data-guide-nav="${s.id}" aria-current="false"><i class="ph-duotone ${s.icon}" aria-hidden="true"></i><span>${s.label}</span></button>`
  ).join('');
  bindGuide();
  reminders.schedule();
  setTimeout(maybeWelcome, 1400);
});

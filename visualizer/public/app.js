/**
 * AlgoPulse Studio — dashboard for the daily practice sets.
 * Plain browser JS; libraries (marked, DOMPurify, KaTeX, highlight.js, Mermaid, confetti)
 * load from a CDN with `defer` ahead of this file, and every use is guarded so a blocked
 * CDN degrades to plain text instead of a blank page.
 */
'use strict';

/* ==========================================================================
   Helpers
   ========================================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const desktopMq = matchMedia('(min-width: 64rem)');

const escapeHtml = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// set.json keeps Codeforces' LaTeX escapes ("I_love_\%username\%"); show the plain title.
const displayName = (name) => String(name || '').replace(/\\(.)/g, '$1');

const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;

const normalizeOutput = (s) =>
  String(s || '').trim().split(/\r?\n/).map((l) => l.trim().split(/\s+/).join(' ')).join('\n');

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
}

async function api(path, body) {
  const init = body
    ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
    : undefined;
  const res = await fetch(path, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (HTTP ${res.status})`);
  return data;
}

function toast(message, kind = 'info') {
  const el = document.createElement('div');
  el.className = `toast ${kind === 'error' ? 'error' : ''}`;
  el.textContent = message;
  $('#toasts').append(el);
  setTimeout(() => {
    el.classList.add('is-leaving');
    el.addEventListener('animationend', () => el.remove(), { once: true });
    setTimeout(() => el.remove(), 400);
  }, kind === 'error' ? 6000 : 3200);
}

function setLoading(btn, loading) {
  btn.classList.toggle('is-loading', loading);
  btn.disabled = loading;
  btn.setAttribute('aria-busy', String(loading));
}

// Closes a modal <dialog> when the user clicks its backdrop.
function closeOnBackdrop(dialog) {
  dialog.addEventListener('click', (e) => {
    if (!dialog.matches(':modal')) return;
    const r = dialog.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dialog.close();
  });
}

/* ==========================================================================
   Motion (GSAP). Every helper is a no-op-with-final-state when GSAP is missing
   or the user prefers reduced motion — motion decorates, it never gates content.
   ========================================================================== */
const motion = {
  ok: () => Boolean(window.gsap) && !reducedMotion.matches,
  triggers: [],

  init() {
    if (!window.gsap) return;
    document.documentElement.classList.add('has-gsap');
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out', duration: 0.45 });
    if (this.ok()) {
      // Ambient drift: slow enough to read as weather, not as UI.
      gsap.to('.hero-cloud', { x: -48, duration: 16, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }
  },

  bootOut() {
    const boot = $('#boot');
    if (!boot) return;
    boot.classList.add('is-done');
    if (!this.ok()) return boot.remove();
    // Safety net: never leave the overlay up if animation frames are throttled (background tab).
    setTimeout(() => boot.remove(), 1200);
    gsap.to(boot, { opacity: 0, duration: 0.4, ease: 'power2.in', onComplete: () => boot.remove() });
    gsap.from('.topbar', { y: -12, opacity: 0, duration: 0.5, delay: 0.1 });
  },

  heroIn() {
    const title = $('#problemTitle');
    const text = title.textContent;
    title.setAttribute('aria-label', text);
    title.innerHTML = text
      .split(/(\s+)/)
      .map((w) => (w.trim() ? `<span class="word" aria-hidden="true">${escapeHtml(w)}</span>` : w))
      .join('');
    if (!this.ok()) return;
    gsap.killTweensOf('.hero .word, .hero-meta, .tag, .hero-actions > *');
    gsap.from('.hero .word', { yPercent: 70, opacity: 0, rotate: 3, stagger: 0.045, duration: 0.55, ease: 'back.out(1.7)' });
    gsap.from('.hero-meta, .tag, .hero-actions > *:not([hidden])', { y: 8, opacity: 0, stagger: 0.03, duration: 0.4, delay: 0.1 });
  },

  listIn() {
    if (!this.ok()) return;
    gsap.from('.problem-item', { x: -10, opacity: 0, stagger: { each: 0.03, amount: 0.3 }, duration: 0.4, clearProps: 'all' });
  },

  panelIn(panel, dir = 1) {
    if (!this.ok()) return;
    gsap.fromTo(panel, { opacity: 0, x: 14 * dir }, { opacity: 1, x: 0, duration: 0.3, clearProps: 'transform,opacity' });
  },

  popIn(el) {
    if (!this.ok()) return;
    gsap.fromTo(el, { opacity: 0, y: -6, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.22, clearProps: 'all' });
  },

  pop(el) {
    if (!this.ok()) return;
    gsap.fromTo(el, { scale: 0.86 }, { scale: 1, duration: 0.4, ease: 'back.out(3)', clearProps: 'transform' });
  },

  countUp(el, to) {
    const from = Number(el.textContent) || 0;
    if (!this.ok() || from === to) {
      el.textContent = to;
      return;
    }
    const obj = { v: from };
    gsap.to(obj, { v: to, duration: 0.6, ease: 'power2.out', onUpdate: () => (el.textContent = Math.round(obj.v)) });
  },

  // Sections of long documents rise in as they scroll into view (triggered early, once).
  reveal(elements) {
    this.triggers.forEach((t) => t.kill());
    this.triggers = [];
    if (!this.ok() || !window.ScrollTrigger) return;
    elements.forEach((el) => {
      const tween = gsap.from(el, {
        y: 18,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
      this.triggers.push(tween.scrollTrigger);
    });
  },

  storyIn(root) {
    if (!this.ok()) return;
    gsap.from($$('.storybook > *', root), { y: 14, opacity: 0, stagger: 0.07, duration: 0.55 });
    gsap.from($$('.trace', root), { y: 20, opacity: 0, duration: 0.6, delay: 0.25 });
  },
};

/* ==========================================================================
   State
   ========================================================================== */
const TABS = ['story', 'walkthrough', 'diagrams', 'visualize', 'code', 'tests'];

const state = {
  days: [],
  date: null,
  dayNumber: null,
  problems: [],
  file: null,
  tab: 'story',
  filter: 'all',
  runSource: 'attempt',
  editorDirty: false,
  storyPlayer: null,
  query: '',
  codeMode: 'attempt',
  aiReady: false,
  ai: null, // { active, providers, cache } from /api/days
  streak: { current: 0, best: 0, solvedToday: false },
  model: '',
  revealed: new Set(), // reference solutions the user chose to un-blur
  chats: new Map(), // file -> [{ role, text }]
  runs: new Map(), // file -> { source, file, results }
  renderToken: 0,
  diagramsRenderedFor: null,
  simulator: null,
};

const current = () => state.problems.find((p) => p.file === state.file) || null;

/* ==========================================================================
   Theme (+ Mermaid palette, which needs hex — it cannot parse OKLCH)
   ========================================================================== */
const MERMAID_THEMES = {
  light: {
    background: '#fbf6ee', mainBkg: '#f4e6d2', primaryColor: '#f4e6d2', primaryTextColor: '#3a2518',
    primaryBorderColor: '#a8835e', secondaryColor: '#e2ecd6', secondaryBorderColor: '#8aa472',
    tertiaryColor: '#fdf8f1', tertiaryBorderColor: '#cdb79c', lineColor: '#8a6a4f', textColor: '#3a2518',
    noteBkgColor: '#f8e9bd', noteTextColor: '#3a2518', noteBorderColor: '#c9a85a',
    actorBkg: '#f4e6d2', actorBorder: '#a8835e', actorTextColor: '#3a2518', signalColor: '#6b4a33',
    signalTextColor: '#3a2518', labelBoxBkgColor: '#f4e6d2', loopTextColor: '#3a2518',
    edgeLabelBackground: '#fbf6ee', clusterBkg: '#f7eee2',
  },
  dark: {
    background: '#271d17', mainBkg: '#46321f', primaryColor: '#46321f', primaryTextColor: '#f3e9da',
    primaryBorderColor: '#c8925a', secondaryColor: '#34402c', secondaryBorderColor: '#7f9a68',
    tertiaryColor: '#2f241d', tertiaryBorderColor: '#6b5443', lineColor: '#c2a282', textColor: '#f3e9da',
    noteBkgColor: '#4a3d22', noteTextColor: '#f3e9da', noteBorderColor: '#b4954c',
    actorBkg: '#46321f', actorBorder: '#c8925a', actorTextColor: '#f3e9da', signalColor: '#e0c3a0',
    signalTextColor: '#f3e9da', labelBoxBkgColor: '#46321f', loopTextColor: '#f3e9da',
    edgeLabelBackground: '#271d17', clusterBkg: '#2f241d',
  },
};

function activeTheme() {
  return document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function configureMermaid() {
  if (!window.mermaid) return;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: 'Nunito, system-ui, sans-serif',
    themeVariables: { ...MERMAID_THEMES[activeTheme()], fontFamily: 'Nunito, system-ui, sans-serif', fontSize: '15px' },
    flowchart: { curve: 'basis', padding: 14 },
    sequence: { mirrorActors: false },
  });
}

function syncThemeButton() {
  const next = activeTheme() === 'dark' ? 'light' : 'dark';
  $('#btnTheme').setAttribute('aria-label', `Switch to ${next} theme`);
}

function toggleTheme() {
  const next = activeTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('algopulse-theme', next); } catch { /* private mode */ }
  syncThemeButton();
  configureMermaid();
  // Diagrams are baked SVG — re-render them in the new palette.
  state.diagramsRenderedFor = null;
  const p = current();
  if (p) {
    renderWalkthrough(p);
    if (state.tab === 'diagrams') renderDiagrams(p);
  }
}

/* ==========================================================================
   Markdown + math + diagrams
   ========================================================================== */

// Pull $…$ / $$…$$ out before marked sees it (marked would eat the underscores),
// render with KaTeX, and splice the HTML back after sanitising.
function renderMarkdown(md) {
  // No sanitizer, no HTML: model output is untrusted text.
  if (!window.marked || !window.DOMPurify) return `<pre class="code">${escapeHtml(md)}</pre>`;
  const math = [];
  const keep = (tex, display) => {
    const html = window.katex
      ? katex.renderToString(tex.trim(), { displayMode: display, throwOnError: false, output: 'html' })
      : `<code>${escapeHtml(tex)}</code>`;
    math.push(html);
    return `MATHTOKEN${math.length - 1}END`;
  };
  const guarded = md
    .split(/(```[\s\S]*?```|`[^`\n]*`)/g)
    .map((seg, i) =>
      i % 2
        ? seg
        : seg
            .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => keep(tex, true))
            .replace(/(^|[^\\$])\$(?!\s)([^$\n]+?)(?<!\s)\$(?!\d)/g, (_, pre, tex) => pre + keep(tex, false))
    )
    .join('');
  const html = DOMPurify.sanitize(marked.parse(guarded, { gfm: true, breaks: false }));
  return html.replace(/MATHTOKEN(\d+)END/g, (_, i) => math[Number(i)]);
}

let mermaidSeq = 0;
async function renderMermaid(target, source) {
  if (!window.mermaid) {
    target.innerHTML = `<pre class="code"><code>${escapeHtml(source)}</code></pre>`;
    return;
  }
  const id = `mmd-${++mermaidSeq}`;
  try {
    const { svg } = await mermaid.render(id, source.trim());
    target.innerHTML = svg;
  } catch (err) {
    document.getElementById(id)?.remove();
    document.getElementById(`d${id}`)?.remove();
    target.innerHTML = `
      <details class="diagram-error">
        <summary>This diagram has a syntax error — show source</summary>
        <pre class="code"><code>${escapeHtml(source)}</code></pre>
        <p>${escapeHtml(String(err?.message || err).split('\n')[0])}</p>
      </details>`;
  }
}

// Post-process rendered markdown: wrap tables, draw mermaid blocks, highlight code.
async function enhance(root, token) {
  $$('table', root).forEach((t) => {
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    t.replaceWith(wrap);
    wrap.append(t);
  });
  const blocks = $$('pre > code.language-mermaid', root);
  for (const code of blocks) {
    const holder = document.createElement('div');
    holder.className = 'diagram';
    const source = code.textContent;
    code.parentElement.replaceWith(holder);
    if (token !== undefined && token !== state.renderToken) return;
    await renderMermaid(holder, source);
  }
  if (window.hljs) $$('pre > code', root).forEach((el) => hljs.highlightElement(el));
}

function extractDiagrams(md) {
  // Each block is titled by the nearest heading above it.
  const out = [];
  const re = /(^#{2,4}\s+.*$)|```mermaid\s*\n([\s\S]*?)```/gm;
  let m;
  let heading = 'Diagram';
  while ((m = re.exec(md || ''))) {
    if (m[1]) heading = m[1].replace(/^#{2,4}\s+/, '').replace(/^\d+\.\s*/, '');
    else out.push({ title: heading, source: m[2] });
  }
  return out;
}

const isPlaceholderDoc = (md) => /Identify the quantity conserved or strictly monotonic/.test(md || '');

/* ==========================================================================
   Data loading
   ========================================================================== */
async function loadDays() {
  const data = await api('/api/days');
  state.days = data.days;
  state.streak = data.streak;
  state.progress = data.progress;
  state.ramp = data.ramp;
  renderPlayer();
  applyAiStatus(data.ai);
  renderStreak();



  $('#dayButton').disabled = state.days.length === 0;
}

/* ==========================================================================
   Day picker — button + listbox (WAI-ARIA: arrows, Home/End, Enter, Escape, typeahead-free)
   ========================================================================== */
const dayFmt = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
const dayLabel = (d) => `Day ${d.day} · ${dayFmt.format(new Date(`${d.date}T00:00`))}`;

function renderDayPicker() {
  const day = state.days.find((d) => d.date === state.date);
  if (day) $('#dayLabel').textContent = `${dayLabel(day)} — ${day.completed}/${day.problemCount}`;
  $('#dayList').innerHTML = state.days
    .map((d) => {
      const pct = d.problemCount ? Math.round((d.completed / d.problemCount) * 100) : 0;
      return `
        <li class="picker-option" role="option" id="day-${d.date}" data-date="${d.date}" aria-selected="${d.date === state.date}">
          <span class="picker-day">${d.day}</span>
          <span class="picker-meta">
            <strong>${escapeHtml(dayLabel(d))}</strong>
            <span class="picker-bar" aria-hidden="true"><span style="width:${pct}%"></span></span>
          </span>
          <span class="picker-count">${d.completed}/${d.problemCount}</span>
        </li>`;
    })
    .join('');
}

const picker = {
  active: 0,
  isOpen: () => $('#dayButton').getAttribute('aria-expanded') === 'true',
  open() {
    const list = $('#dayList');
    renderDayPicker();
    list.hidden = false;
    $('#dayButton').setAttribute('aria-expanded', 'true');
    this.setActive(Math.max(0, state.days.findIndex((d) => d.date === state.date)));
    list.focus();
    motion.popIn(list);
  },
  close({ focusButton = true } = {}) {
    if (!this.isOpen()) return;
    $('#dayList').hidden = true;
    $('#dayButton').setAttribute('aria-expanded', 'false');
    if (focusButton) $('#dayButton').focus();
  },
  setActive(i) {
    const options = $$('#dayList .picker-option');
    if (!options.length) return;
    this.active = (i + options.length) % options.length;
    options.forEach((o, n) => o.classList.toggle('is-active', n === this.active));
    $('#dayList').setAttribute('aria-activedescendant', options[this.active].id);
    options[this.active].scrollIntoView({ block: 'nearest' });
  },
  choose(date) {
    this.close();
    if (date && date !== state.date) {
      loadDay(date, { keepTab: state.tab }).catch((err) => toast(err.message, 'error'));
    }
  },
  bind() {
    const button = $('#dayButton');
    const list = $('#dayList');
    button.addEventListener('click', () => (this.isOpen() ? this.close() : this.open()));
    button.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.open();
      }
    });
    list.addEventListener('keydown', (e) => {
      const keys = { ArrowDown: 1, ArrowUp: -1 };
      if (e.key in keys) {
        e.preventDefault();
        this.setActive(this.active + keys[e.key]);
      } else if (e.key === 'Home') this.setActive(0);
      else if (e.key === 'End') this.setActive(-1);
      else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.choose($$('#dayList .picker-option')[this.active]?.dataset.date);
      } else if (e.key === 'Escape' || e.key === 'Tab') this.close({ focusButton: e.key === 'Escape' });
    });
    list.addEventListener('click', (e) => this.choose(e.target.closest('.picker-option')?.dataset.date));
    document.addEventListener('pointerdown', (e) => {
      if (this.isOpen() && !e.target.closest('#dayPicker')) this.close({ focusButton: false });
    });
  },
};

async function loadDay(date, { keepFile = null, keepTab = null } = {}) {
  const data = await api(`/api/day?date=${encodeURIComponent(date)}`);
  state.date = data.date;
  state.dayNumber = data.day;
  state.problems = data.problems;
  state.diagramsRenderedFor = null;

  const file = state.problems.some((p) => p.file === keepFile) ? keepFile : state.problems[0]?.file;
  renderProgress();
  renderList();
  motion.listIn();
  if (file) selectProblem(file, { tab: keepTab || state.tab, animate: false });
  else renderNoProblems();
}

function renderProgress() {
  const done = state.problems.filter((p) => p.done).length;
  const total = state.problems.length;
  motion.countUp($('#statDone'), done);
  $('#statTotal').textContent = total;
  $('#progressRing').style.strokeDasharray = `${total ? (done / total) * 100 : 0} 100`;
  $('#dayProgress').setAttribute('aria-label', `${done} of ${total} problems solved`);

  // Keep the picker's "x/y" in sync after a verify run.
  const day = state.days.find((d) => d.date === state.date);
  if (day) day.completed = done;
  renderDayPicker();
}

/* ==========================================================================
   Problem list
   ========================================================================== */
function filteredProblems() {
  const q = state.query.trim().toLowerCase();
  return state.problems.filter((p) => {
    if (state.filter === 'done' && !p.done) return false;
    if (state.filter === 'todo' && p.done) return false;
    if (!q) return true;
    return (
      displayName(p.name).toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  });
}

function renderList() {
  const list = $('#problemList');
  list.removeAttribute('aria-busy');
  const items = filteredProblems();
  if (items.length === 0) {
    list.innerHTML = `<li class="list-empty">${state.problems.length ? 'Nothing matches that filter.' : 'No problems in this set.'}</li>`;
    return;
  }
  list.innerHTML = items
    .map((p, i) => {
      const n = state.problems.indexOf(p) + 1;
      const sub = [p.id, ...(p.tags || []).slice(0, 2)].join(' · ');
      return `
        <li>
          <button type="button" class="problem-item ${p.done ? 'is-done' : ''}" data-file="${escapeHtml(p.file)}"
                  aria-current="${p.file === state.file}" style="--i:${i}">
            <span class="problem-num">${p.done ? icon('check') + '<span class="visually-hidden">Solved: </span>' : n}</span>
            <span>
              <span class="problem-name">${escapeHtml(displayName(p.name))}</span>
              <span class="problem-sub">${escapeHtml(sub)}</span>
            </span>
            ${p.rating ? `<span class="rating" aria-label="Rating ${p.rating}">${p.rating}</span>` : ''}
          </button>
        </li>`;
    })
    .join('');
}

function markActiveInList() {
  $$('.problem-item').forEach((el) => el.setAttribute('aria-current', String(el.dataset.file === state.file)));
}

/* ==========================================================================
   Selecting a problem
   ========================================================================== */
function selectProblem(file, { tab = state.tab, animate = true } = {}) {
  const p = state.problems.find((x) => x.file === file);
  if (!p) return;
  if (file !== state.file && state.editorDirty && !confirmDiscard()) return;
  state.file = file;
  state.diagramsRenderedFor = null;
  state.renderToken++;
  markActiveInList();

  renderHero(p, animate);
  renderStory(p);
  renderWalkthrough(p);
  setupVisualizer(p);
  renderCode(p);
  resetPlayground(p);
  renderTests(p);
  renderCoachLog();

  const diagrams = extractDiagrams(p.explanation);
  $('#diagramCount').textContent = diagrams.length || '';
  $('#testCount').textContent = p.tests.length || '';

  const target = tab === 'visualize' && !SIMULATORS[p.file] ? 'story' : tab;
  showTab(target, { focus: false, animate: false });
  syncUrl();

  if (!desktopMq.matches && $('#sidebar').open) $('#sidebar').close();
}

function stepProblem(delta) {
  const list = filteredProblems().length ? filteredProblems() : state.problems;
  const idx = list.findIndex((p) => p.file === state.file);
  const next = list[(idx + delta + list.length) % list.length];
  if (next) selectProblem(next.file);
}

function renderHero(p, animate) {
  const hero = $('.hero');
  $('#problemMeta').innerHTML = [escapeHtml(p.platform), escapeHtml(p.id), p.rating ? `★ ${p.rating}` : null]
    .filter(Boolean)
    .join('<span class="sep" aria-hidden="true">·</span>');
  $('#problemTitle').textContent = displayName(p.name);
  document.title = `${displayName(p.name)} · AlgoPulse Studio`;
  $('#problemTags').innerHTML = (p.tags || []).map((t) => `<li class="tag">${escapeHtml(t)}</li>`).join('');

  const link = $('#linkProblem');
  link.hidden = !p.url;
  if (p.url) link.href = p.url;

  const badge = $('#statusBadge');
  badge.hidden = false;
  badge.className = `status-badge ${p.done ? 'done' : 'todo'}`;
  badge.innerHTML = p.done ? `${icon('check')}Solved` : 'To do';

  motion.heroIn();
  if (!animate && window.gsap) gsap.set('.hero .word, .hero-meta, .tag, .hero-actions > *', { clearProps: 'all' });
  hero.dataset.file = p.file;
}

function renderNoProblems() {
  $('#problemTitle').textContent = 'No problems in this set yet';
  $('#problemMeta').textContent = '';
  $('#explanation').innerHTML = '';
}

/* ==========================================================================
   Tabs (WAI-ARIA tabs pattern: arrows, Home/End, roving tabindex)
   ========================================================================== */
function visibleTabs() {
  return TABS.filter((t) => !$(`#tab-${t}`).hidden);
}

function showTab(name, { focus = false, animate = true } = {}) {
  if (!visibleTabs().includes(name)) name = 'story';
  // Slide in from the side the tab sits on, so the motion explains where the panel came from.
  const dir = Math.sign(TABS.indexOf(name) - TABS.indexOf(state.tab)) || 1;
  const changed = name !== state.tab;
  state.tab = name;
  for (const t of TABS) {
    const tab = $(`#tab-${t}`);
    const selected = t === name;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    $(`#panel-${t}`).hidden = !selected;
  }
  if (focus) $(`#tab-${name}`).focus();
  moveTabIndicator();
  if (animate && changed) motion.panelIn($(`#panel-${name}`), dir);
  if (name === 'diagrams') {
    const p = current();
    if (p && state.diagramsRenderedFor !== p.file) renderDiagrams(p);
  }
  if (name !== 'visualize') state.simulator?.pause();
  if (name !== 'story') state.storyPlayer?.pause();
  if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
  syncUrl();
}

function moveTabIndicator() {
  const tab = $(`#tab-${state.tab}`);
  const bar = $('#tabIndicator');
  if (!tab || tab.hidden) return;
  bar.style.width = `${tab.offsetWidth}px`;
  bar.style.transform = `translateX(${tab.offsetLeft}px)`;
}

function onTabKeydown(e) {
  const tabs = visibleTabs();
  const i = tabs.indexOf(state.tab);
  const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
  if (!(e.key in map)) return;
  e.preventDefault();
  showTab(tabs[(map[e.key] + tabs.length) % tabs.length], { focus: true });
}

/* ==========================================================================
   Story — the AI's layman story + a JSON trace, played by the acorn narrator
   ========================================================================== */
const NARRATOR_SVG = `
  <svg class="narrator-face" viewBox="0 0 56 56" aria-hidden="true">
    <path d="M9 24c0-9 8.5-15 19-15s19 6 19 15z" class="acorn-cap"/>
    <path d="M11.5 24h33c0 14-7.5 24-16.5 24S11.5 38 11.5 24z" class="acorn-nut"/>
    <path d="M28 9V4" class="acorn-stem"/>
    <circle cx="22" cy="33" r="2.2" fill="#3a2518"/><circle cx="34" cy="33" r="2.2" fill="#3a2518"/>
    <path d="M24.5 39c2 1.6 5 1.6 7 0" stroke="#3a2518" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="18.5" cy="37.5" r="2.4" fill="#e89a8a" opacity=".7"/><circle cx="37.5" cy="37.5" r="2.4" fill="#e89a8a" opacity=".7"/>
  </svg>`;

function renderStory(p) {
  state.storyPlayer?.destroy();
  state.storyPlayer = null;
  const host = $('#story');

  if (!p.story) {
    host.innerHTML = emptyState({
      title: 'No story yet',
      body: state.aiReady
        ? `Let the narrator explain <strong>${escapeHtml(displayName(p.name))}</strong> in plain words, then act it out on a real sample, step by step.`
        : 'Stories need an AI. Pick one in the Guide — free options included (Gemini free tier, or Ollama on your own PC).',
      action: state.aiReady
        ? `<button class="btn btn-primary" type="button" data-story>${icon('sparkle')}Tell me the story</button>`
        : `<button class="btn btn-primary" type="button" data-open-guide="ai">${icon('sparkle')}Choose your AI</button>`,
      art: 'ph-book-open-text',
    });
    return;
  }

  const s = p.story;
  host.innerHTML = `
    <div class="story">
      <article class="storybook">
        <div class="storybook-kicker"><i class="ph-duotone ph-feather" aria-hidden="true"></i>A little story about ${escapeHtml(displayName(p.name))}</div>
        <h2 class="storybook-title">${escapeHtml(s.title)}</h2>
        <p class="key-idea"><i class="ph-duotone ph-lightbulb-filament" aria-hidden="true"></i><span>${escapeHtml(s.keyIdea)}</span></p>
        <div class="story-text">${renderMarkdown(s.story)}</div>
        <div class="story-foot">
          ${s.verified
            ? `<span class="pill ok"><i class="ph-fill ph-seal-check" aria-hidden="true"></i>Trace matches the sample output</span>`
            : `<span class="pill warn"><i class="ph-fill ph-warning" aria-hidden="true"></i>Trace not verified — double-check it</span>`}
          <span class="pill soft"><i class="ph-duotone ph-robot" aria-hidden="true"></i>${escapeHtml(s.model || 'AI')}</span>
          ${state.aiReady ? `<button class="btn btn-ghost btn-sm" type="button" data-story>${icon('reset')}Retell</button>` : ''}
        </div>
      </article>
      <section class="card trace" aria-label="Step-by-step trace">
        <div class="trace-head">
          <h3 class="card-title"><i class="ph-duotone ph-footprints" aria-hidden="true"></i>Let's walk through it</h3>
          <code class="trace-input" title="Traced input">${escapeHtml(s.traceInput)}</code>
        </div>
        <div class="narrator">
          ${NARRATOR_SVG}
          <div class="bubble" aria-live="polite"><h3 id="traceTitle"></h3><p id="traceText"></p></div>
        </div>
        <div class="var-grid" id="traceVars"></div>
        <div class="trace-controls">
          <button class="btn btn-secondary btn-icon" type="button" data-trace="prev" aria-label="Previous step">${icon('left')}</button>
          <button class="btn btn-primary btn-icon" type="button" data-trace="play" aria-label="Play">${icon('play')}</button>
          <button class="btn btn-secondary btn-icon" type="button" data-trace="next" aria-label="Next step">${icon('right')}</button>
          <div class="trace-dots" id="traceDots" role="group" aria-label="Jump to step"></div>
          <span class="step-label" id="traceStep"></span>
        </div>
        <p class="muted">Answer printed: <strong>${escapeHtml(s.finalOutput)}</strong></p>
      </section>
    </div>`;

  state.storyPlayer = mountTracePlayer(host, s.steps);
  motion.storyIn(host);
}

function parseTraceValue(raw) {
  try {
    const v = JSON.parse(raw);
    if (Array.isArray(v)) return { kind: 'array', items: v };
    if (typeof v === 'string') return { kind: 'text', text: v };
  } catch { /* plain text */ }
  return { kind: 'scalar', text: String(raw) };
}

function mountTracePlayer(host, steps) {
  const life = new AbortController();
  const on = { signal: life.signal };
  const els = { vars: $('#traceVars', host), title: $('#traceTitle', host), text: $('#traceText', host), dots: $('#traceDots', host), step: $('#traceStep', host), play: $('[data-trace="play"]', host) };
  let i = 0;
  let timer = null;
  let previous = new Map();

  els.dots.innerHTML = steps
    .map((st, n) => `<button type="button" class="trace-dot" data-dot="${n}" aria-label="Step ${n + 1}: ${escapeHtml(st.title)}"></button>`)
    .join('');

  function draw() {
    const st = steps[i];
    const focus = new Set(st.focus || []);
    els.title.textContent = `${i + 1}. ${st.title}`;
    els.text.innerHTML = window.DOMPurify && window.marked ? DOMPurify.sanitize(marked.parseInline(st.narration)) : escapeHtml(st.narration);
    els.vars.innerHTML = (st.vars || [])
      .map((v) => {
        const val = parseTraceValue(v.value);
        const body = val.kind === 'array'
          ? `<div class="var-cells">${val.items.map((x) => `<span class="cell">${escapeHtml(typeof x === 'object' ? JSON.stringify(x) : x)}</span>`).join('')}</div>`
          : `<div class="var-value">${escapeHtml(val.text)}</div>`;
        return `<div class="var ${focus.has(v.name) ? 'is-focus' : ''} ${val.kind === 'array' && val.items.length > 6 ? 'var-wide' : ''}" data-var="${escapeHtml(v.name)}">
            <div class="var-name">${escapeHtml(v.name)}</div>${body}
          </div>`;
      })
      .join('');
    // Pop only the tiles whose value actually changed.
    (st.vars || []).forEach((v) => {
      if (previous.has(v.name) && previous.get(v.name) !== v.value) {
        const tile = els.vars.querySelector(`[data-var="${CSS.escape(v.name)}"]`);
        if (tile) motion.pop(tile);
      }
    });
    previous = new Map((st.vars || []).map((v) => [v.name, v.value]));
    $$('.trace-dot', els.dots).forEach((d, n) => {
      d.classList.toggle('is-past', n < i);
      if (n === i) d.setAttribute('aria-current', 'step');
      else d.removeAttribute('aria-current');
    });
    els.step.textContent = `${i + 1} / ${steps.length}`;
    els.play.innerHTML = icon(timer ? 'pause' : 'play');
    els.play.setAttribute('aria-label', timer ? 'Pause' : 'Play');
  }

  const go = (n) => {
    i = Math.max(0, Math.min(steps.length - 1, n));
    draw();
  };
  const pause = () => {
    clearInterval(timer);
    timer = null;
    draw();
  };
  const play = () => {
    if (i >= steps.length - 1) go(0);
    timer = setInterval(() => (i >= steps.length - 1 ? pause() : go(i + 1)), 2600);
    draw();
  };

  host.addEventListener('click', (e) => {
    const dot = e.target.closest('[data-dot]');
    const action = e.target.closest('[data-trace]')?.dataset.trace;
    if (!dot && !action) return;
    if (action === 'play') return timer ? pause() : play();
    if (timer) pause();
    if (dot) go(Number(dot.dataset.dot));
    if (action === 'next') go(i + 1);
    if (action === 'prev') go(i - 1);
  }, on);

  draw();
  return {
    pause: () => timer && pause(),
    destroy: () => {
      clearInterval(timer);
      life.abort();
    },
  };
}

async function generateStory(btn) {
  const p = current();
  if (!p) return;
  setLoading(btn, true);
  const host = $('#story');
  if (!p.story) {
    host.innerHTML = `<div class="card skeleton-block" aria-label="Writing the story"><span class="title"></span><span></span><span></span><span></span><span></span><span></span><span></span></div>`;
  }
  toast('The narrator is writing… (~30s)');
  try {
    const { story } = await api('/api/story', { date: state.date, file: p.file });
    p.story = story;
    if (current() === p) renderStory(p);
    toast(story.verified ? 'Story ready — trace checked against the sample.' : 'Story ready — the trace could not be verified, read it critically.');
  } catch (err) {
    toast(err.message, 'error');
    if (current() === p) renderStory(p);
  }
}

/* ==========================================================================
   Walkthrough
   ========================================================================== */
function renderWalkthrough(p) {
  const article = $('#explanation');
  const banner = $('#explainBanner');
  const toc = $('#toc');
  const token = state.renderToken;

  banner.innerHTML = '';
  toc.innerHTML = '';

  if (!p.explanation) {
    article.innerHTML = emptyState({
      title: 'No walkthrough yet',
      body: state.aiReady
        ? 'Generate one grounded in the reference solution and sample tests.'
        : 'Run <code>npm run explain</code> for the offline template, or set up an AI in the Guide to generate a grounded one here.',
      action: state.aiReady
        ? `<button class="btn btn-primary" type="button" data-generate>${icon('sparkle')}Generate walkthrough</button>`
        : `<button class="btn btn-secondary" type="button" data-open-guide="ai">Choose your AI</button>`,
    });
    return;
  }

  if (isPlaceholderDoc(p.explanation)) {
    banner.innerHTML = `
      <div class="banner">
        <p><strong>This is a generic template, not a real explanation.</strong> It was generated offline without knowing the problem.</p>
        ${state.aiReady
          ? `<button class="btn btn-primary btn-sm" type="button" data-generate>${icon('sparkle')}Write a real one</button>`
          : `<button class="btn btn-secondary btn-sm" type="button" data-open-guide="ai">Set up an AI</button>`}
      </div>`;
  }

  article.innerHTML = renderMarkdown(p.explanation);

  // Table of contents from the H2s.
  const heads = $$('h2', article);
  const used = new Set();
  heads.forEach((h) => {
    let id = slugify(h.textContent);
    while (used.has(id)) id += '-x';
    used.add(id);
    h.id = id;
  });
  if (heads.length > 2) {
    toc.innerHTML = `<p>On this page</p><ol>${heads
      .map((h) => `<li><a href="#${h.id}" data-toc="${h.id}">${escapeHtml(h.textContent.replace(/^\d+\.\s*/, ''))}</a></li>`)
      .join('')}</ol>`;
    observeToc(heads);
  }

  enhance(article, token).then(() => {
    if (token === state.renderToken) motion.reveal($$(':scope > h2, :scope > .diagram, :scope > pre, :scope > .table-wrap', article));
  });
}

let tocObserver = null;
function observeToc(heads) {
  tocObserver?.disconnect();
  tocObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      $$('#toc a').forEach((a) => a.classList.toggle('is-active', a.dataset.toc === visible.target.id));
    },
    { rootMargin: '-20% 0px -65% 0px' }
  );
  heads.forEach((h) => tocObserver.observe(h));
}

async function generateExplanation(btn) {
  const p = current();
  if (!p) return;
  setLoading(btn, true);
  toast(`Asking ${state.ai?.active?.label || 'the AI'} for a grounded walkthrough — this can take ~30s.`);
  try {
    const { explanation } = await api('/api/explain', { date: state.date, file: p.file });
    p.explanation = explanation;
    if (current() === p) {
      state.renderToken++;
      state.diagramsRenderedFor = null;
      renderWalkthrough(p);
      $('#diagramCount').textContent = extractDiagrams(explanation).length || '';
    }
    toast('Walkthrough saved to explanations/.');
  } catch (err) {
    toast(err.message, 'error');
    setLoading(btn, false);
  }
}

function emptyState({ title, body, action = '', art = null }) {
  const pic = art
    ? `<i class="ph-duotone ${art} empty-icon" aria-hidden="true"></i>`
    : `<svg class="empty-art" viewBox="0 0 32 32" aria-hidden="true"><use href="#i-acorn"/></svg>`;
  return `
    <div class="empty">
      ${pic}
      <h3>${title}</h3>
      <p>${body}</p>
      ${action}
    </div>`;
}

/* ==========================================================================
   Diagrams tab
   ========================================================================== */
async function renderDiagrams(p) {
  const grid = $('#diagramGrid');
  const diagrams = extractDiagrams(p.explanation);
  state.diagramsRenderedFor = p.file;
  const token = state.renderToken;

  if (diagrams.length === 0) {
    grid.innerHTML = emptyState({
      title: 'No diagrams for this problem',
      body: 'Diagrams come from the Mermaid blocks in the walkthrough. Generate a walkthrough to get some.',
    });
    return;
  }

  grid.innerHTML = diagrams
    .map(
      (d, i) => `
      <article class="card diagram-card" data-zoom="1">
        <div class="card-bar">
          <h3 class="card-title">${escapeHtml(d.title)}</h3>
          <div class="zoom-controls" role="group" aria-label="Zoom diagram ${i + 1}">
            <button class="btn btn-ghost btn-sm btn-icon" type="button" data-zoom-step="-0.2" aria-label="Zoom out">${icon('minus')}</button>
            <button class="btn btn-ghost btn-sm zoom-level" type="button" data-zoom-reset aria-label="Reset zoom">100%</button>
            <button class="btn btn-ghost btn-sm btn-icon" type="button" data-zoom-step="0.2" aria-label="Zoom in">${icon('plus')}</button>
          </div>
        </div>
        <div class="diagram-viewport" tabindex="0" aria-label="${escapeHtml(d.title)} diagram, drag to pan">
          <div class="diagram-stage"></div>
        </div>
      </article>`
    )
    .join('');

  const stages = $$('.diagram-stage', grid);
  for (let i = 0; i < stages.length; i++) {
    if (token !== state.renderToken) return;
    await renderMermaid(stages[i], diagrams[i].source);
  }
}

function zoomDiagram(card, next) {
  const z = Math.min(3, Math.max(0.4, Math.round(next * 10) / 10));
  card.dataset.zoom = z;
  $('.diagram-stage', card).style.transform = `scale(${z})`;
  $('.zoom-level', card).textContent = `${Math.round(z * 100)}%`;
}

// Drag-to-pan inside a diagram viewport.
function enablePan(root) {
  let drag = null;
  root.addEventListener('pointerdown', (e) => {
    const vp = e.target.closest('.diagram-viewport');
    if (!vp || e.button !== 0) return;
    drag = { vp, x: e.clientX, y: e.clientY, left: vp.scrollLeft, top: vp.scrollTop };
    vp.classList.add('is-dragging');
    vp.setPointerCapture(e.pointerId);
  });
  root.addEventListener('pointermove', (e) => {
    if (!drag) return;
    drag.vp.scrollLeft = drag.left - (e.clientX - drag.x);
    drag.vp.scrollTop = drag.top - (e.clientY - drag.y);
  });
  const end = () => {
    drag?.vp.classList.remove('is-dragging');
    drag = null;
  };
  root.addEventListener('pointerup', end);
  root.addEventListener('pointercancel', end);
}

/* ==========================================================================
   Visualize tab — per-problem simulators
   ========================================================================== */
const SIMULATORS = {
  onlyPluses: mountOnlyPluses,
};

function setupVisualizer(p) {
  state.simulator?.destroy();
  state.simulator = null;
  const mount = SIMULATORS[p.file];
  $('#tab-visualize').hidden = !mount;
  const host = $('#visualizer');
  host.innerHTML = '';
  if (mount) state.simulator = mount(host);
}

/**
 * Only Pluses (CF 1992A): at most 5 increments over a, b, c; maximise a·b·c.
 * Greedy "always bump the smallest" is animated step by step, and the result is
 * cross-checked against a brute force over every split, so the page proves itself.
 */
function mountOnlyPluses(host) {
  const sim = { a: 2, b: 3, c: 4, ops: 5, steps: [], i: 0, timer: null, speed: 900 };
  // Listeners live on the shared host element, so tie them to this mount's lifetime.
  const life = new AbortController();
  const on = { signal: life.signal };

  host.innerHTML = `
    <div class="viz">
      <div class="viz-grid">
        <div class="card viz-stage">
          <div class="viz-stacks" id="vizStacks" role="img" aria-label="Three stacks of chocolate squares for a, b and c"></div>
          <div class="viz-controls">
            <button class="btn btn-secondary btn-icon" type="button" data-sim="reset" aria-label="Restart">${icon('reset')}</button>
            <button class="btn btn-secondary btn-icon" type="button" data-sim="prev" aria-label="Previous step">${icon('left')}</button>
            <button class="btn btn-primary btn-icon" type="button" data-sim="play" aria-label="Play">${icon('play')}</button>
            <button class="btn btn-secondary btn-icon" type="button" data-sim="next" aria-label="Next step">${icon('right')}</button>
            <label class="visually-hidden" for="vizScrub">Step</label>
            <input type="range" id="vizScrub" min="0" value="0" step="1">
            <span class="step-label" id="vizStepLabel"></span>
            <div class="segmented speed" role="radiogroup" aria-label="Playback speed">
              <label><input type="radio" name="vizSpeed" value="1400"><span>0.5×</span></label>
              <label><input type="radio" name="vizSpeed" value="900" checked><span>1×</span></label>
              <label><input type="radio" name="vizSpeed" value="450"><span>2×</span></label>
            </div>
          </div>
        </div>
        <div class="viz-side">
          <div class="card metric">
            <div class="metric-label">Product</div>
            <div class="metric-value" id="vizProduct">0</div>
            <div class="metric-formula" id="vizFormula"></div>
            <span class="metric-gain" id="vizGain"></span>
          </div>
          <div class="card narration" aria-live="polite">
            <h3 id="vizNarrTitle"></h3>
            <p id="vizNarrBody"></p>
          </div>
          <div class="card proof" id="vizProof"></div>
        </div>
      </div>
      <form class="card viz-form" id="vizForm" novalidate>
        <h3 class="card-title">Try your own input</h3>
        <div class="viz-fields">
          ${['a', 'b', 'c'].map((k) => `
            <div class="field">
              <label for="viz-${k}">${k}</label>
              <input id="viz-${k}" name="${k}" type="number" inputmode="numeric" min="1" max="10" value="${sim[k]}" required>
            </div>`).join('')}
          <div class="field">
            <label for="viz-ops">Increments</label>
            <input id="viz-ops" name="ops" type="number" inputmode="numeric" min="0" max="10" value="${sim.ops}" required>
          </div>
        </div>
        <p class="field-hint">The problem allows up to 5 increments with 1 ≤ a, b, c ≤ 10. Values here are clamped to that range (increments up to 10 for exploring).</p>
        <div><button class="btn btn-primary" type="submit">${icon('play')}Simulate</button></div>
      </form>
    </div>`;

  const els = {
    stacks: $('#vizStacks', host),
    scrub: $('#vizScrub', host),
    stepLabel: $('#vizStepLabel', host),
    product: $('#vizProduct', host),
    formula: $('#vizFormula', host),
    gain: $('#vizGain', host),
    narrTitle: $('#vizNarrTitle', host),
    narrBody: $('#vizNarrBody', host),
    proof: $('#vizProof', host),
    play: $('[data-sim="play"]', host),
    form: $('#vizForm', host),
  };

  function build() {
    const vals = [sim.a, sim.b, sim.c];
    const steps = [{ vals: [...vals], bumped: -1, product: vals[0] * vals[1] * vals[2] }];
    for (let s = 0; s < sim.ops; s++) {
      let m = 0;
      if (vals[1] < vals[m]) m = 1;
      if (vals[2] < vals[m]) m = 2;
      vals[m]++;
      steps.push({ vals: [...vals], bumped: m, product: vals[0] * vals[1] * vals[2] });
    }
    sim.steps = steps;

    // Independent brute force over every (i, j, k) with i + j + k <= ops.
    let best = 0;
    for (let i = 0; i <= sim.ops; i++)
      for (let j = 0; i + j <= sim.ops; j++)
        for (let k = 0; i + j + k <= sim.ops; k++)
          best = Math.max(best, (sim.a + i) * (sim.b + j) * (sim.c + k));
    const greedy = steps[steps.length - 1].product;
    const ok = best === greedy;
    els.proof.classList.toggle('bad', !ok);
    els.proof.innerHTML = `${icon(ok ? 'check' : 'x')}<span>${ok
      ? `Brute force over every split of ${sim.ops} increments also finds <strong>${best}</strong> — the greedy is optimal here.`
      : `Brute force finds <strong>${best}</strong> but the greedy reached ${greedy}.`}</span>`;

    els.scrub.max = steps.length - 1;
    const maxVal = Math.max(...steps[steps.length - 1].vals);
    els.stacks.style.setProperty('--sq', `min(1.25rem, calc(16rem / ${maxVal} - 3px))`);
    sim.i = 0;
    draw(true);
  }

  function draw(full = false) {
    const step = sim.steps[sim.i];
    const names = ['a', 'b', 'c'];
    const initial = sim.steps[0].vals;
    const nextBump = sim.steps[sim.i + 1]?.bumped ?? -1;

    els.stacks.innerHTML = step.vals
      .map((v, k) => {
        const squares = Array.from({ length: v }, (_, n) => {
          const added = n >= initial[k];
          const fresh = !full && k === step.bumped && n === v - 1;
          return `<span class="square ${added ? 'added' : ''} ${fresh ? 'fresh' : ''}"></span>`;
        }).join('');
        return `
          <div class="stack ${k === nextBump ? 'is-min' : ''}">
            <span class="stack-flag">${k === nextBump ? 'smallest' : ''}</span>
            <div class="stack-bar">${squares}</div>
            <span class="stack-val">${v}</span>
            <span class="stack-name">${names[k]}</span>
          </div>`;
      })
      .join('');
    els.stacks.setAttribute('aria-label', `a = ${step.vals[0]}, b = ${step.vals[1]}, c = ${step.vals[2]}`);

    const prev = sim.steps[sim.i - 1];
    els.product.textContent = step.product.toLocaleString();
    els.formula.textContent = `${step.vals.join(' × ')} = ${step.product}`;
    els.gain.textContent = prev ? `+${step.product - prev.product} this step` : '';
    els.scrub.value = sim.i;
    els.stepLabel.textContent = `Step ${sim.i} / ${sim.steps.length - 1}`;

    if (sim.i === 0) {
      els.narrTitle.textContent = 'Starting point';
      els.narrBody.textContent = `a = ${step.vals[0]}, b = ${step.vals[1]}, c = ${step.vals[2]} with ${sim.ops} increment${sim.ops === 1 ? '' : 's'} to spend. Raising x by one adds (the other two multiplied) to the product — so the smallest number has the biggest partners and the biggest payoff.`;
    } else {
      const k = step.bumped;
      const others = step.vals.filter((_, n) => n !== k);
      els.narrTitle.textContent = `Step ${sim.i}: bump ${names[k]} (${step.vals[k] - 1} → ${step.vals[k]})`;
      els.narrBody.textContent = `${names[k]} was the smallest, so the gain is ${others.join(' × ')} = ${step.product - prev.product} — larger than bumping either other value.`;
    }
    if (sim.i === sim.steps.length - 1 && sim.i > 0) {
      els.narrTitle.textContent += ' — done';
    }

    els.play.innerHTML = icon(sim.timer ? 'pause' : 'play');
    els.play.setAttribute('aria-label', sim.timer ? 'Pause' : 'Play');
  }

  function go(i) {
    const next = Math.max(0, Math.min(sim.steps.length - 1, i));
    const forward = next === sim.i + 1;
    sim.i = next;
    draw(!forward);
  }

  function pause() {
    clearInterval(sim.timer);
    sim.timer = null;
    draw(true);
  }

  function play() {
    if (sim.i >= sim.steps.length - 1) go(0);
    sim.timer = setInterval(() => {
      if (sim.i >= sim.steps.length - 1) return pause();
      go(sim.i + 1);
    }, sim.speed);
    draw(true);
  }

  host.addEventListener('click', (e) => {
    const action = e.target.closest('[data-sim]')?.dataset.sim;
    if (!action) return;
    if (action === 'play') return sim.timer ? pause() : play();
    if (sim.timer) pause();
    if (action === 'next') go(sim.i + 1);
    if (action === 'prev') go(sim.i - 1);
    if (action === 'reset') go(0);
  }, on);

  els.scrub.addEventListener('input', () => {
    if (sim.timer) pause();
    go(Number(els.scrub.value));
  }, on);

  host.addEventListener('change', (e) => {
    if (e.target.name !== 'vizSpeed') return;
    sim.speed = Number(e.target.value);
    if (sim.timer) {
      clearInterval(sim.timer);
      sim.timer = null;
      play();
    }
  }, on);

  els.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const clamp = (name, lo, hi) => {
      const input = els.form.elements[name];
      const v = Math.round(Number(input.value));
      const ok = Number.isFinite(v) && input.value !== '';
      const out = ok ? Math.min(hi, Math.max(lo, v)) : lo;
      input.value = out;
      return out;
    };
    if (sim.timer) pause();
    sim.a = clamp('a', 1, 10);
    sim.b = clamp('b', 1, 10);
    sim.c = clamp('c', 1, 10);
    sim.ops = clamp('ops', 0, 10);
    build();
  });

  build();
  return {
    pause: () => sim.timer && pause(),
    destroy: () => {
      clearInterval(sim.timer);
      life.abort();
    },
  };
}

/* ==========================================================================
   Code tab
   ========================================================================== */
function renderCode(p) {
  const body = $('#codeBody');
  const pathEl = $('#codePath');
  const mode = state.codeMode;
  let code = null;
  let where = '';
  state.editorDirty = false;
  setSaveState('');
  $('#btnSave').hidden = true;

  if (mode === 'attempt') {
    code = p.attempt?.code ?? null;
    where = p.attempt?.path || '';
    if (code === null) {
      pathEl.textContent = '';
      body.innerHTML = emptyState({
        title: 'No attempt yet',
        body: `One click creates <code>${escapeHtml(p.file)}.js</code> at the repo root from the ${escapeHtml(p.platform)} template. Edit it here or in your editor — both stay in sync on save.`,
        action: `<div class="empty-actions">
            <button class="btn btn-primary" type="button" data-create-attempt>${icon('file-plus')}Create my file</button>
            <button class="btn btn-secondary" type="button" data-code-mode="template">Peek at the template</button>
          </div>`,
        art: 'ph-file-plus',
      });
      return;
    }
    // Your attempt is editable in place; Ctrl/Cmd+S or the Save button writes it to disk.
    pathEl.textContent = where;
    $('#btnSave').hidden = false;
    body.innerHTML = `<label class="visually-hidden" for="editor">Your solution code</label>
      <textarea class="editor" id="editor" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off"></textarea>`;
    const editor = $('#editor');
    editor.value = code;
    editor.style.height = `${Math.min(Math.max(22, code.split('\n').length * 1.65 + 2), 60)}rem`;
    return;
  } else if (mode === 'reference') {
    code = p.reference;
    where = `practice/days/${state.date}/solutions/${p.file}.js`;
    if (!code) {
      pathEl.textContent = '';
      body.innerHTML = emptyState({ title: 'No reference solution', body: 'This problem has no reference solution in the day folder yet.' });
      return;
    }
  } else {
    code = p.template;
    where = p.templatePath || '';
    if (!code) {
      body.innerHTML = emptyState({ title: 'No template found', body: 'Expected one in <code>templates/</code> or <code>cp.js</code>.' });
      return;
    }
  }

  pathEl.textContent = where;
  body.innerHTML = `<pre class="code"><code class="language-javascript">${escapeHtml(code)}</code></pre>`;
  if (window.hljs) hljs.highlightElement($('code', body));

  // The day README asks for an honest attempt first — keep the reference blurred until asked.
  if (mode === 'reference' && !p.done && !state.revealed.has(p.file)) {
    const cover = document.createElement('div');
    cover.className = 'spoiler';
    cover.innerHTML = `
      <p>Give it an honest 30–45 minutes before peeking.</p>
      <button class="btn btn-primary" type="button" data-reveal>${icon('eye')}Reveal reference</button>`;
    body.append(cover);
  }
}

const confirmDiscard = () => window.confirm('You have unsaved changes in your attempt. Discard them?');

function setSaveState(text, kind = '') {
  const el = $('#saveState');
  el.textContent = text;
  el.className = `save-state ${kind}`;
}

async function createAttempt(btn) {
  const p = current();
  if (!p) return;
  setLoading(btn, true);
  try {
    const res = await api('/api/attempt', { date: state.date, file: p.file });
    p.attempt = { path: res.path, code: res.code };
    toast(res.created ? `Created ${res.path} — happy solving!` : `${res.path} already exists.`);
    if (current() === p) {
      renderCode(p);
      renderTests(p);
      $('#editor')?.focus();
    }
  } catch (err) {
    toast(err.message, 'error');
    setLoading(btn, false);
  }
}

async function saveAttempt() {
  const p = current();
  const editor = $('#editor');
  if (!p || !editor) return;
  const btn = $('#btnSave');
  setLoading(btn, true);
  try {
    const res = await api('/api/attempt/save', { date: state.date, file: p.file, code: editor.value });
    p.attempt = { path: res.path, code: editor.value };
    state.editorDirty = false;
    setSaveState('Saved', 'saved');
  } catch (err) {
    toast(err.message, 'error');
  } finally {
    setLoading(btn, false);
  }
}

// Tab indents instead of leaving the editor (Escape then Tab still moves focus on).
function onEditorKeydown(e) {
  const ed = e.target;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    saveAttempt();
    return;
  }
  if (e.key === 'Escape') {
    ed.dataset.escaped = '1';
    return;
  }
  if (e.key === 'Tab' && !ed.dataset.escaped) {
    e.preventDefault();
    const { selectionStart: s, selectionEnd: end, value } = ed;
    ed.value = `${value.slice(0, s)}  ${value.slice(end)}`;
    ed.selectionStart = ed.selectionEnd = s + 2;
    ed.dispatchEvent(new Event('input', { bubbles: true }));
  }
  if (e.key !== 'Tab') delete ed.dataset.escaped;
}

function currentCodeText() {
  const p = current();
  if (!p) return '';
  if (state.codeMode === 'attempt') return $('#editor')?.value ?? p.attempt?.code ?? '';
  if (state.codeMode === 'reference') return state.revealed.has(p.file) || p.done ? p.reference || '' : '';
  return p.template || '';
}

/* ==========================================================================
   Tests tab
   ========================================================================== */
function renderTests(p) {
  const grid = $('#testGrid');
  const run = state.runs.get(p.file);
  const summary = $('#runSummary');
  summary.className = 'run-summary';
  summary.textContent = '';
  $('#runTarget').textContent = p.attempt
    ? `Runs ${p.attempt.path} or the reference against every sample.`
    : `No attempt yet — create ${p.file}.js at the repo root, or run the reference.`;
  state.runSource = run?.source || (p.attempt ? 'attempt' : 'reference');
  $(`input[name="runSource"][value="${state.runSource}"]`).checked = true;

  if (!p.tests.length) {
    grid.innerHTML = emptyState({ title: 'No sample tests', body: `Add them to <code>practice/days/${escapeHtml(state.date)}/tests/${escapeHtml(p.file)}.json</code>.` });
    $('#btnRun').disabled = true;
    return;
  }
  $('#btnRun').disabled = false;

  grid.innerHTML = p.tests
    .map((t, i) => {
      const r = run?.results[i];
      const expected = normalizeOutput(t.output);
      const mismatch = r && normalizeOutput(r.stdout) !== expected;
      const verdict = r
        ? `<span class="verdict ${r.verdict}">${icon(r.verdict === 'AC' ? 'check' : 'x')}${r.verdict}</span><span class="test-ms">${r.ms} ms</span>`
        : `<span class="verdict idle">not run</span>`;
      return `
        <article class="card test-card ${r ? (r.verdict === 'AC' ? 'is-pass' : 'is-fail') : ''}">
          <div class="card-bar"><h3 class="card-title">Sample ${i + 1}</h3>${verdict}</div>
          <div class="test-io">
            <div class="io"><div class="io-label">Input</div><pre>${escapeHtml(t.input.trimEnd())}</pre></div>
            <div class="io"><div class="io-label">Expected</div><pre>${escapeHtml(t.output.trimEnd())}</pre></div>
            ${r ? `<div class="io io-got"><div class="io-label">${r.verdict === 'RE' ? 'stderr' : 'Your output'}</div><pre class="${mismatch ? 'mismatch' : ''}">${escapeHtml((r.verdict === 'RE' ? r.stderr : r.stdout).trimEnd() || '(empty)')}</pre></div>` : ''}
          </div>
        </article>`;
    })
    .join('');

  if (run) {
    const passed = run.results.filter((r) => r.verdict === 'AC').length;
    const slowest = Math.max(...run.results.map((r) => r.ms));
    const all = passed === run.results.length;
    summary.classList.add(all ? 'pass' : 'fail');
    summary.textContent = `${passed}/${run.results.length} passed · slowest ${slowest} ms · ran ${run.file}${
      all && run.source === 'attempt' && !p.done ? ' — press “Verify day” to mark it solved.' : ''
    }`;
  }
}

async function runTests() {
  const p = current();
  if (!p) return;
  const btn = $('#btnRun');
  const source = state.runSource;
  setLoading(btn, true);
  try {
    if (source === 'attempt' && state.editorDirty) await saveAttempt(); // run what's on screen
    const res = await api('/api/run', { date: state.date, file: p.file, source });
    state.runs.set(p.file, { source, ...res });
    if (current() === p) renderTests(p);
    const allPass = res.results.every((r) => r.verdict === 'AC');
    if (allPass && source === 'attempt') celebrate();
  } catch (err) {
    toast(err.message, 'error');
  } finally {
    setLoading(btn, false);
  }
}

/* Playground — run any custom input against your attempt or the reference */
function resetPlayground(p) {
  $('#pgInput').value = p.tests[0]?.input.trimEnd() || '';
  $('#pgExpected').value = '';
  $('#pgResult').innerHTML = '';
}

async function runPlayground(e) {
  e.preventDefault();
  const p = current();
  if (!p) return;
  const btn = $('#pgRun');
  const out = $('#pgResult');
  setLoading(btn, true);
  try {
    if (state.runSource === 'attempt' && state.editorDirty) await saveAttempt();
    const r = await api('/api/run/custom', {
      date: state.date,
      file: p.file,
      source: state.runSource,
      input: $('#pgInput').value,
      expected: $('#pgExpected').value,
    });
    const labels = { AC: 'Accepted', WA: 'Wrong answer', RE: 'Runtime error', TLE: 'Time limit (10s)', OK: 'Ran' };
    out.innerHTML = `
      <div class="pg-result-head">
        <span class="verdict ${r.verdict}">${r.verdict === 'AC' || r.verdict === 'OK' ? icon('check') : icon('x')}${labels[r.verdict]}</span>
        <span class="test-ms">${r.ms} ms · ${escapeHtml(r.file)}</span>
      </div>
      <pre>${escapeHtml(r.stdout.trimEnd() || '(no output)')}</pre>
      ${r.stderr ? `<div class="io-label">stderr</div><pre class="mismatch">${escapeHtml(r.stderr.trimEnd())}</pre>` : ''}`;
    motion.popIn(out);
    if (r.verdict === 'AC') celebrate();
  } catch (err) {
    out.innerHTML = `<p class="run-summary fail">${escapeHtml(err.message)}</p>`;
  } finally {
    setLoading(btn, false);
  }
}

function celebrate() {
  if (reducedMotion.matches || !window.confetti) return;
  confetti({
    particleCount: 90,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#6b4226', '#d9975b', '#f4e6d2', '#8aa472', '#f0c987'],
    disableForReducedMotion: true,
  });
}

async function verifyDay() {
  const modal = $('#verifyModal');
  const out = $('#verifyOutput');
  const btn = $('#btnVerifyDay');
  out.textContent = `$ node practice/verify.js ${state.date}\n\nRunning…`;
  modal.showModal();
  setLoading(btn, true);
  try {
    if (state.editorDirty) await saveAttempt(); // verify what's on screen, and don't lose it on reload
    const res = await api('/api/verify', { date: state.date });
    out.textContent = `$ node practice/verify.js ${state.date}\n\n${res.output.trim()}`;
    const before = state.problems.filter((p) => p.done).length;
    await loadDay(state.date, { keepFile: state.file, keepTab: state.tab });
    const after = state.problems.filter((p) => p.done).length;
    const gained = await refreshProgress();
    if (after > before) {
      const xp = gained.xp > 0 ? ` +${gained.xp} XP` : '';
      toast(`${after - before} problem${after - before === 1 ? '' : 's'} marked solved.${xp}`);
      celebrate();
    }
    if (gained.levelUp) {
      toast(`Level up! You're now level ${state.progress.level.level} · ${state.progress.rank.title}.`);
      celebrate();
    }
  } catch (err) {
    out.textContent += `\n\n${err.message}`;
  } finally {
    setLoading(btn, false);
  }
}

/* ==========================================================================
   Coach
   ========================================================================== */
function renderCoachLog() {
  const p = current();
  const log = $('#coachLog');
  if (!p) return;
  $('#coachSub').textContent = `${displayName(p.name)} · ${p.id}`;

  const enabled = state.aiReady;
  $('#coachInput').disabled = !enabled;
  $('#btnAsk').disabled = !enabled;
  $$('#coachPrompts .chip-btn').forEach((b) => (b.disabled = !enabled));

  if (!enabled) {
    log.innerHTML = `
      <div class="msg coach"><div class="msg-who">Coach</div><div class="msg-body">
        <p><strong>I'm not connected to an AI yet.</strong> This app is private by design: it runs on your PC with <em>your own</em> key — or a free local model — and nothing is shared.</p>
        <p>Pick Gemini (free tier), Claude, OpenAI, or Ollama (free, fully offline) in the Guide.</p>
        <div class="empty-actions" style="justify-content:flex-start">
          <button class="btn btn-primary btn-sm" type="button" data-open-guide="ai">Choose your AI</button>
          <button class="btn btn-secondary btn-sm" type="button" data-start-tour>Watch the tour</button>
        </div>
      </div></div>`;
    return;
  }

  const history = state.chats.get(p.file) || [];
  $('#coach').classList.toggle('is-empty', history.length === 0);
  log.innerHTML = history.length
    ? ''
    : `<div class="coach-welcome">
        <svg class="coach-welcome-logo" viewBox="0 0 64 64" aria-hidden="true"><use href="#i-logo"/></svg>
        <h3>Stuck on ${escapeHtml(displayName(p.name))}?</h3>
        <p>I nudge without spoiling. I can see the verified solution and the samples, so I never guess the rules.</p>
        <div class="coach-suggest">
          <button type="button" data-q="Give me a small hint without spoiling the solution."><i class="ph-duotone ph-lightbulb" aria-hidden="true"></i><strong>Just a hint</strong><span>A nudge, no spoilers</span></button>
          <button type="button" data-q="Explain this problem like I'm 10 years old, with an everyday analogy."><i class="ph-duotone ph-baby" aria-hidden="true"></i><strong>Explain like I'm 10</strong><span>Plain words, one analogy</span></button>
          <button type="button" data-q="Why is this approach correct? Give the key invariant or exchange argument."><i class="ph-duotone ph-seal-check" aria-hidden="true"></i><strong>Why it works</strong><span>The key insight, proved</span></button>
          <button type="button" data-q="Which edge cases usually cause wrong answers here?"><i class="ph-duotone ph-warning-diamond" aria-hidden="true"></i><strong>Edge cases</strong><span>Where solutions break</span></button>
        </div>
      </div>`;
  history.forEach((m) => appendMessage(m.role, m.text, { store: false }));
}

const COACH_AVATAR = '<svg class="msg-avatar" viewBox="0 0 64 64" aria-hidden="true"><use href="#i-logo"/></svg>';

function appendMessage(role, text, { store = true } = {}) {
  const log = $('#coachLog');
  const el = document.createElement('div');
  el.className = `msg ${role}`;
  el.innerHTML = role === 'user'
    ? '<div class="msg-main"><div class="msg-body"></div></div>'
    : `${COACH_AVATAR}<div class="msg-main"><div class="msg-who">Coach</div><div class="msg-body chat-prose"></div>
        <div class="msg-actions"><button class="btn btn-ghost btn-sm" type="button" data-copy="${escapeHtml(text.replace(/<sub>[\s\S]*?<\/sub>\s*$/, '').trim())}">${icon('copy')}<span>Copy</span></button></div></div>`;
  const body = $('.msg-body', el);
  if (role === 'user') body.textContent = text;
  else {
    body.innerHTML = renderMarkdown(text);
    enhance(body);
  }
  $('#coach').classList.remove('is-empty');
  log.append(el);
  // Long answers are read from the top: bring the start of a coach reply into view.
  log.scrollTop = role === 'user' ? log.scrollHeight : Math.max(0, el.offsetTop - log.offsetTop - 12);

  if (store) {
    const p = current();
    const list = state.chats.get(p.file) || [];
    list.push({ role, text });
    state.chats.set(p.file, list);
  }
  return el;
}

async function ask(question) {
  const p = current();
  if (!p || !question.trim()) return;
  const file = p.file;
  appendMessage('user', question.trim());
  $('#coachInput').value = '';

  const typing = document.createElement('div');
  typing.className = 'msg coach';
  typing.innerHTML = `${COACH_AVATAR}<div class="msg-main"><div class="msg-who">Coach</div><div class="msg-body"><span class="typing" aria-label="Coach is thinking"><i></i><i></i><i></i><span class="typing-text">Thinking…</span></span></div></div>`;
  $('#coach').classList.remove('is-empty');
  $('#coachLog').append(typing);
  $('#coachLog').scrollTop = $('#coachLog').scrollHeight;
  $('#btnAsk').disabled = true;

  try {
    const res = await api('/api/ai/ask', { date: state.date, file, question: question.trim() });
    typing.remove();
    // RAG sources and cache status travel with the answer so the student can see why.
    const notes = res.sources?.length
      ? `\n\n---\n*From your notes:* ${res.sources.map((s) => `[${s.title.split(' — ')[0]}](#/${s.date}/${s.file}/walkthrough)`).join(' · ')}`
      : '';
    const text = `${res.answer}${notes}\n\n<sub>${res.cached ? 'Cached answer · ' : ''}${res.model}</sub>`;
    if (state.file === file) appendMessage('coach', text);
    else state.chats.get(file)?.push({ role: 'coach', text });
  } catch (err) {
    typing.remove();
    const el = appendMessage('coach', `Couldn't reach the coach: ${err.message}`, { store: false });
    el.classList.add('error');
  } finally {
    $('#btnAsk').disabled = !state.aiReady;
  }
}

function openCoach() {
  const coach = $('#coach');
  if (!coach.open) coach.showModal();
  if (state.aiReady) $('#coachInput').focus();
}

/* ==========================================================================
   Sidebar (static on desktop, modal drawer on mobile)
   ========================================================================== */
function syncSidebarMode() {
  const sidebar = $('#sidebar');
  if (desktopMq.matches) {
    if (sidebar.open && sidebar.matches(':modal')) sidebar.close();
    if (!sidebar.open) {
      // dialog.show() runs the focusing steps and would grab the search box — don't steal focus.
      const had = document.activeElement;
      sidebar.show();
      if (had && had !== document.activeElement && sidebar.contains(document.activeElement)) {
        document.activeElement.blur();
        if (had !== document.body) had.focus({ preventScroll: true });
      }
    }
  } else if (sidebar.open && !sidebar.matches(':modal')) {
    sidebar.close();
  }
}

/* ==========================================================================
   URL (#/date/file/tab) so reloads and shared links land in the same place
   ========================================================================== */
function syncUrl() {
  if (!state.date || !state.file) return;
  const hash = `#/${state.date}/${state.file}/${state.tab}`;
  if (location.hash !== hash) history.replaceState(null, '', hash);
}

function parseUrl() {
  const [, date, file, tab] = location.hash.split('/');
  return { date, file, tab: TABS.includes(tab) ? tab : null };
}

/* ==========================================================================
   Events
   ========================================================================== */
function bindEvents() {
  $('#btnTheme').addEventListener('click', toggleTheme);
  picker.bind();

  $('#problemList').addEventListener('click', (e) => {
    const item = e.target.closest('.problem-item');
    if (item) selectProblem(item.dataset.file);
  });
  $('#search').addEventListener('input', (e) => {
    state.query = e.target.value;
    renderList();
  });
  $('#sidebar').addEventListener('change', (e) => {
    if (e.target.name !== 'status') return;
    state.filter = e.target.value;
    renderList();
  });
  $('#btnOpenSidebar').addEventListener('click', () => $('#sidebar').showModal());
  $('#btnCloseSidebar').addEventListener('click', () => $('#sidebar').close());
  closeOnBackdrop($('#sidebar'));
  desktopMq.addEventListener('change', syncSidebarMode);

  $('#btnPrev').addEventListener('click', () => stepProblem(-1));
  $('#btnNext').addEventListener('click', () => stepProblem(1));

  const tablist = $('#tablist');
  tablist.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) showTab(tab.id.replace('tab-', ''));
  });
  tablist.addEventListener('keydown', onTabKeydown);
  new ResizeObserver(moveTabIndicator).observe(tablist);
  document.fonts?.ready.then(moveTabIndicator);

  // Delegated actions inside panels.
  $('#main').addEventListener('click', (e) => {
    const gen = e.target.closest('[data-generate]');
    if (gen) return generateExplanation(gen);
    const storyBtn = e.target.closest('[data-story]');
    if (storyBtn) return generateStory(storyBtn);
    const create = e.target.closest('[data-create-attempt]');
    if (create) return createAttempt(create);

    const mode = e.target.closest('[data-code-mode]');
    if (mode) {
      state.codeMode = mode.dataset.codeMode;
      $(`input[name="codeMode"][value="${state.codeMode}"]`).checked = true;
      return renderCode(current());
    }
    if (e.target.closest('[data-reveal]')) {
      state.revealed.add(state.file);
      return renderCode(current());
    }

    const card = e.target.closest('.diagram-card');
    if (card) {
      const step = e.target.closest('[data-zoom-step]');
      if (step) zoomDiagram(card, Number(card.dataset.zoom) + Number(step.dataset.zoomStep));
      if (e.target.closest('[data-zoom-reset]')) zoomDiagram(card, 1);
    }

    const tocLink = e.target.closest('[data-toc]');
    if (tocLink) {
      e.preventDefault();
      document.getElementById(tocLink.dataset.toc)?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  });
  enablePan($('#diagramGrid'));

  $('#panel-code').addEventListener('change', (e) => {
    if (e.target.name !== 'codeMode') return;
    if (state.editorDirty && !confirmDiscard()) {
      $(`input[name="codeMode"][value="${state.codeMode}"]`).checked = true;
      return;
    }
    state.codeMode = e.target.value;
    renderCode(current());
  });
  $('#panel-code').addEventListener('input', (e) => {
    if (e.target.id !== 'editor') return;
    state.editorDirty = true;
    setSaveState('Unsaved changes', 'dirty');
  });
  $('#panel-code').addEventListener('keydown', (e) => {
    if (e.target.id === 'editor') onEditorKeydown(e);
  });
  $('#btnSave').addEventListener('click', saveAttempt);
  window.addEventListener('beforeunload', (e) => {
    if (state.editorDirty) e.preventDefault();
  });

  $('#panel-tests').addEventListener('change', (e) => {
    if (e.target.name === 'runSource') state.runSource = e.target.value;
  });
  $('#playground').addEventListener('submit', runPlayground);
  $('#pgFromSample').addEventListener('click', () => {
    const t = current()?.tests[0];
    if (!t) return toast('This problem has no sample to copy.', 'error');
    $('#pgInput').value = t.input.trimEnd();
    $('#pgExpected').value = t.output.trimEnd();
  });
  $('#btnCopy').addEventListener('click', async () => {
    const text = currentCodeText();
    if (!text) return toast('Nothing to copy here.', 'error');
    try {
      await navigator.clipboard.writeText(text);
      toast('Copied to clipboard.');
    } catch {
      toast('Clipboard is blocked in this browser.', 'error');
    }
  });

  $('#btnRun').addEventListener('click', runTests);
  $('#btnVerifyDay').addEventListener('click', verifyDay);
  $('#verifyModal [data-close]').addEventListener('click', () => $('#verifyModal').close());
  closeOnBackdrop($('#verifyModal'));

  $('#btnCoach').addEventListener('click', openCoach);
  $('#btnCloseCoach').addEventListener('click', () => $('#coach').close());
  closeOnBackdrop($('#coach'));
  // Quick prompts: the chip row and the welcome suggestion cards.
  $('#coach').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-q]');
    if (chip && !chip.disabled) ask(chip.dataset.q);
  });
  $('#coachForm').addEventListener('submit', (e) => {
    e.preventDefault();
    ask($('#coachInput').value);
  });
  $('#coachInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      $('#coachForm').requestSubmit();
    }
  });

  // Keyboard shortcuts — ignored while typing or when a modal is up.
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest('input, textarea, select, [contenteditable]')) return;
    if ($$('dialog').some((d) => d.matches(':modal'))) return;
    const k = e.key.toLowerCase();
    if (k === '/') {
      e.preventDefault();
      if (!desktopMq.matches) $('#sidebar').showModal();
      $('#search').focus();
    } else if (k === 'j') stepProblem(1);
    else if (k === 'k') stepProblem(-1);
    else if (k === 'c') openCoach();
    else if (k === 't') toggleTheme();
    else if (/^[1-6]$/.test(k)) {
      const tab = visibleTabs()[Number(k) - 1];
      if (tab) showTab(tab, { focus: true });
    }
  });

  window.addEventListener('hashchange', () => {
    const { date, file, tab } = parseUrl();
    if (date && date !== state.date) loadDay(date, { keepFile: file, keepTab: tab }).catch((err) => toast(err.message, 'error'));
    else if (file && file !== state.file) selectProblem(file, { tab: tab || state.tab });
    else if (tab && tab !== state.tab) showTab(tab);
  });
}

/* ==========================================================================
   Boot
   ========================================================================== */
async function init() {
  configureMermaid();
  motion.init();
  syncThemeButton();
  syncSidebarMode();
  bindEvents();

  try {
    await loadDays();
    if (state.days.length === 0) {
      $('#problemTitle').textContent = 'No practice days yet';
      $('#problemList').innerHTML = '<li class="list-empty">Run <code>npm run pick</code> to create one.</li>';
      $('#explanation').innerHTML = emptyState({ title: 'Nothing to study yet', body: 'Run <code>npm run pick</code> to generate today\'s set, then reload.' });
      return;
    }
    const { date, file, tab } = parseUrl();
    const start = state.days.some((d) => d.date === date) ? date : state.days[0].date;
    await loadDay(start, { keepFile: file, keepTab: tab });
  } catch (err) {
    $('#problemTitle').textContent = 'Could not reach the studio server';
    $('#problemList').innerHTML = '<li class="list-empty">Offline</li>';
    $('#explanation').innerHTML = emptyState({
      title: 'The local server is not responding',
      body: `Start it with <code>npm run view</code>, then reload. (${escapeHtml(err.message)})`,
      action: '<button class="btn btn-primary" type="button" onclick="location.reload()">Retry</button>',
    });
  } finally {
    motion.bootOut();
  }
}

// DOMContentLoaded fires after every deferred script (guide.js included) has run.
document.addEventListener('DOMContentLoaded', init);

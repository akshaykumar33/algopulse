#!/usr/bin/env node

/**
 * AlgoPulse Live CLI Submission Monitor
 * 
 * Features:
 * - Accurate Session Clock & Runtime tracking (Total Elapsed Duration, Start & End times)
 * - Downward-flowing Chronological Live Stream with precise timestamps (tail -f style)
 * - Zero runaway scrolling / screen jumps (ANSI Alternate Screen Buffer on TUI mode)
 * - Side-by-side 3-Platform Cards (Codeforces, LeetCode, CodeChef)
 * - DLQ Radar & Submissions Explorer with pixel-perfect box alignment
 * - Interactive tab switching: [1] Dashboard, [2] Stream ↓, [3] DLQ, [4] Submissions
 * 
 * Usage:
 *   npm run monitor          # Fullscreen interactive TUI dashboard
 *   npm run monitor:stream   # Pure downward-flowing live event stream (tail -f)
 *   npm run monitor:once     # One-shot dashboard snapshot and exit
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '../..');
const DAYS_DIR = path.join(REPO_ROOT, 'practice', 'days');
const PAUSE_FILE = path.join(REPO_ROOT, 'practice', '.pause');

// ANSI Color Palette (Claude Code & Gemini CLI Cyberpunk Aesthetic)
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',

  // Cyber 256 Neon Colors
  cyberCyan: '\x1b[38;5;51m',
  neonGreen: '\x1b[38;5;48m',
  solarAmber: '\x1b[38;5;214m',
  laserRed: '\x1b[38;5;197m',
  neonViolet: '\x1b[38;5;141m',
  electricBlue: '\x1b[38;5;39m',
  steel: '\x1b[38;5;248m',
  slateDark: '\x1b[38;5;240m',
  slateBorder: '\x1b[38;5;238m',
  textMuted: '\x1b[38;5;243m',

  // Standard Colors mapped to vibrant tones
  black: '\x1b[30m',
  red: '\x1b[38;5;197m',
  green: '\x1b[38;5;48m',
  yellow: '\x1b[38;5;214m',
  blue: '\x1b[38;5;39m',
  magenta: '\x1b[38;5;141m',
  cyan: '\x1b[38;5;51m',
  white: '\x1b[38;5;255m',

  // Sci-Fi Pill Badges
  bgCyanPill: '\x1b[48;5;24m\x1b[38;5;51m\x1b[1m',
  bgGreenPill: '\x1b[48;5;22m\x1b[38;5;48m\x1b[1m',
  bgRedPill: '\x1b[48;5;52m\x1b[38;5;197m\x1b[1m',
  bgAmberPill: '\x1b[48;5;58m\x1b[38;5;214m\x1b[1m',
  bgVioletPill: '\x1b[48;5;54m\x1b[38;5;141m\x1b[1m',
  bgInactivePill: '\x1b[48;5;236m\x1b[38;5;245m',
  bgDark: '\x1b[48;5;235m',
  bgGray: '\x1b[48;5;237m',

  // Terminal Buffers & Cursors
  home: '\x1b[H',
  eraseDown: '\x1b[J',
  eraseLine: '\x1b[K',
  eraseScreen: '\x1b[2J',
  clearScrollback: '\x1b[3J',
  altScreenOn: '\x1b[?1049h',
  altScreenOff: '\x1b[?1049l',
  hideCursor: '\x1b[?25l',
  showCursor: '\x1b[?25h',

  // Glowing status pulse animations
  pulseGreen: (f) => ['\x1b[38;5;48m', '\x1b[38;5;51m', '\x1b[38;5;84m', '\x1b[38;5;121m'][(f || 0) % 4],
  pulseAmber: (f) => ['\x1b[38;5;214m', '\x1b[38;5;220m', '\x1b[38;5;208m', '\x1b[38;5;221m'][(f || 0) % 4],
  pulseCyan: (f) => ['\x1b[38;5;51m', '\x1b[38;5;45m', '\x1b[38;5;39m', '\x1b[38;5;87m'][(f || 0) % 4],
  pulseViolet: (f) => ['\x1b[38;5;141m', '\x1b[38;5;177m', '\x1b[38;5;135m', '\x1b[38;5;189m'][(f || 0) % 4],
  pulseRed: (f) => ['\x1b[38;5;197m', '\x1b[38;5;203m', '\x1b[38;5;161m', '\x1b[38;5;204m'][(f || 0) % 4],
};

function renderLiveSparkline(frame) {
  const waves = [
    ' ▂▃▅▆▇▆▅▃ ',
    '▂▃▅▆▇▆▅▃ ▂',
    '▃▅▆▇▆▅▃ ▂▃',
    '▅▆▇▆▅▃ ▂▃▅',
    '▆▇▆▅▃ ▂▃▅▆',
    '▇▆▅▃ ▂▃▅▆▇',
    '▆▅▃ ▂▃▅▆▇▆',
    '▅▃ ▂▃▅▆▇▆▅',
  ];
  return `${C.cyberCyan}${waves[(frame || 0) % waves.length]}${C.reset}`;
}

// Strip ANSI color sequences for accurate visual length calculations
function stripAnsi(str) {
  return String(str || '').replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '');
}

function truncateAnsiPreserving(str, maxLen) {
  str = String(str || '');
  const plain = stripAnsi(str);
  if (plain.length <= maxLen) return str;
  if (maxLen <= 1) return maxLen === 1 ? '…' : '';

  let visibleCount = 0;
  let result = '';
  let inEscape = false;
  let escapeBuf = '';

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '\x1b') {
      inEscape = true;
      escapeBuf = ch;
    } else if (inEscape) {
      escapeBuf += ch;
      if (/[a-zA-Z]/.test(ch)) {
        inEscape = false;
        result += escapeBuf;
        escapeBuf = '';
      }
    } else {
      if (visibleCount < maxLen - 1) {
        result += ch;
        visibleCount++;
      } else {
        result += '…';
        visibleCount++;
        break;
      }
    }
  }
  return result + C.reset;
}

function truncateAnsi(str, maxLen) {
  return truncateAnsiPreserving(str, maxLen);
}

function padEndAnsi(str, targetLen) {
  str = String(str || '');
  const vLen = stripAnsi(str).length;
  if (vLen >= targetLen) return str;
  return str + ' '.repeat(targetLen - vLen);
}

function padStartAnsi(str, targetLen) {
  str = String(str || '');
  const vLen = stripAnsi(str).length;
  if (vLen >= targetLen) return str;
  return ' '.repeat(targetLen - vLen) + str;
}

function padCell(str, width) {
  const truncated = truncateAnsiPreserving(str, width);
  return padEndAnsi(truncated, width);
}

function normalizeId(id) {
  if (!id) return '';
  return String(id).toLowerCase().replace(/^(cc|lc)[-_]/, '').replace(/[\/\-_]/g, '').trim();
}

function formatDuration(ms) {
  if (!ms || ms < 0 || isNaN(ms)) return '00m 00s';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  }
  return `${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
}

function formatTimeOnly(isoOrDate) {
  if (!isoOrDate) return '--:--:--';
  const d = new Date(isoOrDate);
  if (isNaN(d.getTime())) return '--:--:--';
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}

function copyToClipboard(text) {
  try {
    const cp = require('child_process');
    if (process.platform === 'win32') {
      const p = cp.spawn('clip');
      p.stdin.end(String(text || ''));
      return true;
    }
    if (process.platform === 'darwin') {
      const p = cp.spawn('pbcopy');
      p.stdin.end(String(text || ''));
      return true;
    }
    const p = cp.spawn('xclip', ['-selection', 'clipboard']);
    p.stdin.end(String(text || ''));
    return true;
  } catch {
    return false;
  }
}

function parseMouseEvent(seq) {
  const m = String(seq || '').match(/^\x1b\[<(\d+);(\d+);(\d+)([Mm])$/);
  if (!m) return null;
  return {
    button: parseInt(m[1], 10),
    col: parseInt(m[2], 10),
    row: parseInt(m[3], 10),
    isRelease: m[4] === 'm',
  };
}

function getMascotState(state, frame = 0) {
  const isRunning = state.isRunning;
  const isPaused = state.isPaused;
  const dlqCount = state.dlq.filter((d) => d.status !== 'RESOLVED').length;
  const totalAcc = state.platforms.codeforces.accepted + state.platforms.leetcode.accepted + state.platforms.codechef.accepted;

  if (isPaused) {
    const faces = ['( ∪｡∪)｡｡zZ', '( ∪_∪)｡｡zZ', '( ˘ω˘ )｡｡zZ', '( -ω- )｡｡zZ'];
    return {
      face: faces[frame % faces.length],
      mood: 'SLEEPING',
      color: C.textMuted,
      chirp: 'Pacing pause active... grab a warm tea! 🍵',
      sparkle: '💤',
    };
  }

  if (dlqCount > 0) {
    const faces = ['( •̀o•́)ง', '( •̀_•́)ง', '( •̀o•́)ง🛡️', '( •̀ω•́)ง✨'];
    return {
      face: faces[frame % faces.length],
      mood: 'DEFENDING',
      color: C.laserRed,
      chirp: 'DLQ anomaly detected! Reputation shield engaged! 🛡️',
      sparkle: '⚡',
    };
  }

  if (isRunning) {
    const faces = ['( =^･ω･^= )ﾉ', '( =^･ｪ･^= )✨', '( ˶• ֊ •˶ )੭', '( ◕ ‿ ◕ )✨'];
    const chirps = [
      'Judging submissions in real time... you got this! ✨',
      'Paws crossed for all green test cases! 🐾',
      'Hyper-drive active! Keep the streak burning! 🔥',
      'Telemetry stream flowing smoothly! ⚡',
    ];
    return {
      face: faces[frame % faces.length],
      mood: 'WORKING',
      color: C.cyberCyan,
      chirp: chirps[Math.floor(frame / 2) % chirps.length],
      sparkle: ['✨', '🌟', '💫', '💖'][frame % 4],
    };
  }

  if (totalAcc > 0) {
    const faces = ['＼(＾▽＾)／', '( ﾉ^ヮ^)ﾉ*:･ﾟ✧', '( ˶ᵔ ᵕ ᵔ˶ )💖', '( ✿◠‿◠ )✨'];
    return {
      face: faces[frame % faces.length],
      mood: 'CELEBRATING',
      color: C.neonGreen,
      chirp: `Session complete with ${totalAcc} AC solves! Pure mastery! 🎉`,
      sparkle: '🎉',
    };
  }

  const faces = ['( =^･ω･^= )', '( =^･ｪ･^= )', '( ˶• ֊ •˶ )', '( ^ ᵕ ^ )'];
  return {
    face: faces[frame % faces.length],
    mood: 'READY',
    color: C.neonViolet,
    chirp: 'Ready for today\'s mission! Press [Space] to start! 🚀',
    sparkle: '🐾',
  };
}

let cachedProgress = null;
let lastProgressLoad = 0;
function getProgressionData() {
  const now = Date.now();
  if (cachedProgress && now - lastProgressLoad < 10000) {
    return cachedProgress;
  }
  try {
    const store = require('./lib/store.js');
    cachedProgress = store.progress();
    lastProgressLoad = now;
    return cachedProgress;
  } catch {
    return null;
  }
}

function dismissSelectedDlq(state, targetDate, selectedIndex, modals = {}) {
  const activeDlq = state.dlq.filter((d) => d.status !== 'RESOLVED');
  if (activeDlq.length === 0) return null;
  const filterQuery = modals.filterQuery || '';
  const platformFilter = modals.platformFilter || null;
  const filteredDlq = activeDlq.filter((item) => {
    if (platformFilter) {
      const p = (item.platform || '').toLowerCase();
      if (!p.includes(platformFilter.toLowerCase())) return false;
    }
    if (filterQuery) {
      const q = filterQuery.toLowerCase();
      const str = `${item.platform || ''} ${item.id || ''} ${item.name || ''} ${item.initialVerdict || ''}`.toLowerCase();
      if (!str.includes(q)) return false;
    }
    return true;
  });
  const target = filteredDlq[selectedIndex] || filteredDlq[0] || activeDlq[0];
  if (!target) return null;

  target.status = 'RESOLVED';
  try {
    const dayDir = path.join(DAYS_DIR, targetDate);
    const dlqFile = path.join(dayDir, 'dlq.json');
    fs.writeFileSync(dlqFile, JSON.stringify(state.dlq, null, 2), 'utf-8');
    return target;
  } catch {
    return null;
  }
}

function triggerCopyAction(state, currentTab, selectedIndex, targetDate, modals = {}) {
  let textToCopy = '';
  const filterQuery = modals.filterQuery || '';
  const platformFilter = modals.platformFilter || null;
  const verdictFilter = modals.verdictFilter || null;

  if (currentTab === '4') {
    const subs = filterSubmissions(state.submissions, filterQuery, platformFilter, verdictFilter);
    if (subs.length > 0) {
      const idx = Math.min(subs.length - 1, Math.max(0, selectedIndex));
      const s = subs[idx];
      textToCopy = `[${(s.platform || 'Platform').toUpperCase()}] ${s.id || s.problemId || ''} - ${s.name || s.file || ''} (Verdict: ${s.verdict || 'Accepted'})`;
    }
  } else if (currentTab === '3') {
    const active = state.dlq.filter((d) => d.status !== 'RESOLVED');
    const filteredDlq = active.filter((item) => {
      if (platformFilter) {
        const p = (item.platform || '').toLowerCase();
        if (!p.includes(platformFilter.toLowerCase())) return false;
      }
      if (verdictFilter) {
        const isAcc = /accepted|correct/i.test(item.initialVerdict || '');
        if (verdictFilter === 'accepted' && !isAcc) return false;
        if (verdictFilter === 'failed' && isAcc) return false;
      }
      if (filterQuery) {
        const q = filterQuery.toLowerCase();
        const str = `${item.platform || ''} ${item.id || ''} ${item.name || ''} ${item.initialVerdict || ''}`.toLowerCase();
        if (!str.includes(q)) return false;
      }
      return true;
    });
    if (filteredDlq.length > 0) {
      const idx = Math.min(filteredDlq.length - 1, Math.max(0, selectedIndex));
      const d = filteredDlq[idx];
      textToCopy = `[${(d.platform || 'Platform').toUpperCase()}] DLQ ${d.id || ''} - ${d.name || ''} (Verdict: ${d.initialVerdict || 'Failed'}, Status: ${d.status})`;
    }
  } else if (currentTab === '2') {
    const events = filterEvents(state.streamEvents, filterQuery, platformFilter, verdictFilter);
    if (events.length > 0) {
      const idx = Math.min(events.length - 1, Math.max(0, selectedIndex));
      const ev = events[idx];
      textToCopy = `[${(ev.platform || '').toUpperCase()}] ${ev.id || ''} - ${ev.title || ''} (${ev.verdict || ''})`;
    }
  } else {
    const filteredEvents = filterEvents(state.streamEvents, filterQuery, platformFilter, verdictFilter);
    const recent = filteredEvents.slice(-3);
    if (recent.length > 0 && selectedIndex < recent.length) {
      const ev = recent[selectedIndex];
      textToCopy = `[${(ev.platform || '').toUpperCase()}] ${ev.id || ''} - ${ev.title || ''} (${ev.verdict || ''})`;
    } else {
      const cf = state.workers.codeforces.activeProblem;
      const lc = state.workers.leetcode.activeProblem;
      const cc = state.workers.codechef.activeProblem;
      const activeProb = cf || lc || cc;
      if (activeProb) {
        textToCopy = `Target: ${activeProb.title} (${activeProb.id})`;
      } else {
        const totalAcc = state.platforms.codeforces.accepted + state.platforms.leetcode.accepted + state.platforms.codechef.accepted;
        textToCopy = `AlgoPulse Session ${targetDate}: ${totalAcc}/${state.problems.length} Solved`;
      }
    }
  }

  if (textToCopy) {
    copyToClipboard(textToCopy);
    return textToCopy;
  }
  return '';
}

// CLI Arguments & Options (Claude Code & Gemini CLI Standards)
const args = process.argv.slice(2);
const isHelp = args.includes('--help') || args.includes('-h');
const isJson = args.includes('--json');
const isExport = args.includes('--export') || args.includes('-e');
const isOnce = args.includes('--once') || args.includes('-o');
const isStreamMode = args.includes('--stream') || args.includes('-s');
const isDlqTab = args.includes('--dlq') || args.includes('-d') || args.includes('-3');
const isSubmissionsTab = args.includes('--submissions') || args.includes('-t') || args.includes('-4');
const isStreamTab = args.includes('--stream-view') || args.includes('-2');
const isDashboardTab = args.includes('--dashboard') || args.includes('-1');

const dateArgIdx = args.indexOf('--date');
const customDate = dateArgIdx !== -1 ? args[dateArgIdx + 1] : null;

const filterArgIdx = args.indexOf('--filter') !== -1 ? args.indexOf('--filter') : args.indexOf('-f');
const cliFilter = filterArgIdx !== -1 ? args[filterArgIdx + 1] : '';

const platArgIdx = args.indexOf('--platform') !== -1 ? args.indexOf('--platform') : args.indexOf('-p');
const cliPlatform = platArgIdx !== -1 ? args[platArgIdx + 1] : null;

const verdArgIdx = args.indexOf('--verdict') !== -1 ? args.indexOf('--verdict') : args.indexOf('-v');
const cliVerdict = verdArgIdx !== -1 ? (args[verdArgIdx + 1] ? args[verdArgIdx + 1].toLowerCase() : null) : null;

const rateArgIdx = args.indexOf('--rate');
const cliRate = rateArgIdx !== -1 ? parseInt(args[rateArgIdx + 1], 10) : 800;

const cliBell = args.includes('--bell') || args.includes('-b');

// Determine initial tab
let initialTab = '1';
const tabArgIdx = args.indexOf('--tab');
if (tabArgIdx !== -1 && args[tabArgIdx + 1]) {
  initialTab = String(args[tabArgIdx + 1]);
} else if (isDlqTab) initialTab = '3';
else if (isSubmissionsTab) initialTab = '4';
else if (isStreamTab) initialTab = '2';

function printHelp() {
  console.log(`
${C.cyberCyan}${C.bold}◈ ALGOPULSE › TELEMETRY MISSION CONTROL [v2.5]${C.reset}
${C.textMuted}High-Performance Competitive Programming Telemetry & Auto-Pilot Engine${C.reset}

${C.bold}USAGE:${C.reset}
  node practice/monitor.js [options]
  npm run monitor [options]

${C.bold}MODES:${C.reset}
  ${C.neonGreen}(default)${C.reset}            Fullscreen interactive TUI mission control dashboard
  ${C.cyan}-s, --stream${C.reset}         Pure downward tail -f chronological event stream
  ${C.solarAmber}-o, --once${C.reset}           Capture one-shot dashboard snapshot and exit
  ${C.neonViolet}--json${C.reset}               Dump full telemetry mission state as formatted JSON
  ${C.neonViolet}-e, --export [path]${C.reset}  Export comprehensive Markdown mission report and exit

${C.bold}TAB SHORTCUTS:${C.reset}
  ${C.steel}-1, --dashboard${C.reset}      Start in Tab 01: Core Platform Dashboard
  ${C.steel}-2, --stream-view${C.reset}    Start in Tab 02: Telemetry Chronological Stream
  ${C.steel}-3, -d, --dlq${C.reset}        Start in Tab 03: Dead Letter Queue (DLQ) Radar
  ${C.steel}-4, -t, --submissions${C.reset}Start in Tab 04: Submissions Telemetry Grid

${C.bold}OPTIONS:${C.reset}
  ${C.cyan}-f, --filter <str>${C.reset}   Filter events, submissions, and anomalies by keyword
  ${C.cyan}-p, --platform <p>${C.reset}   Filter by platform (codeforces, leetcode, codechef)
  ${C.solarAmber}-v, --verdict <v>${C.reset}    Filter by verdict (accepted / ac, failed / fail)
  ${C.solarAmber}--rate <ms>${C.reset}          Set live ticker refresh interval in ms (default: 800)
  ${C.solarAmber}--date <YYYY-MM-DD>${C.reset}  Target specific session date (defaults to latest)
  ${C.laserRed}--bell${C.reset}               Enable audible terminal alerts on solves or DLQ stops
  ${C.steel}-h, --help${C.reset}           Display this help manual and exit

${C.bold}INTERACTIVE NAVIGATION & AUTO-COPY:${C.reset}
  ${C.cyan}[1-4]${C.reset} or ${C.cyan}[←/→]${C.reset}          Switch tabs (Dashboard, Stream, DLQ, Submissions)
  ${C.steel}[Tab]${C.reset} / ${C.steel}[Shift+Tab]${C.reset}     Cycle forward / backward through tabs
  ${C.cyberCyan}[↑/↓] / [k/j]${C.reset}          Move row cursor & ${C.neonGreen}DIRECTLY AUTO-COPIES${C.reset} item to clipboard
  ${C.neonGreen}[c] / [y]${C.reset}               Explicitly copy selected task ID & problem name
  ${C.laserRed}[d] / [Delete]${C.reset}          Dismiss selected anomaly from DLQ or clear search
  ${C.neonViolet}[m]${C.reset}                   Toggle SGR Mouse mode (Click & Scroll vs Native text drag)

${C.bold}FILTER HOOKS & PRESETS:${C.reset}
  ${C.solarAmber}[/]${C.reset}                  Open live search & filter hook prompt
  ${C.steel}[Tab] inside [/]${C.reset}         Cycle preset filter hooks (${C.cyberCyan}ALL › CF › LC › CC › FAIL › AC${C.reset})
  ${C.solarAmber}[v]${C.reset}                  Cycle verdict filter hook (ALL › ACCEPTED › FAILED)
  ${C.solarAmber}[p]${C.reset}                  Cycle platform filter (ALL › CODEFORCES › LEETCODE › CODECHEF)
  ${C.solarAmber}[f/l/k]${C.reset}              Directly lock platform to CF, LC, or CC
  ${C.solarAmber}[a]${C.reset}                  Reset and clear all platform, verdict & query filters

${C.bold}RUNNER & SYSTEM CONTROLS:${C.reset}
  ${C.neonGreen}[Space]${C.reset}              Pause / Resume Playwright runner queue
  ${C.laserRed}[x]${C.reset}                  Trigger Auto-Pilot LLM neural diagnosis on DLQ
  ${C.neonViolet}[i]${C.reset}                  Toggle DLQ Anomaly Inspector overlay
  ${C.cyberCyan}[?]${C.reset} or ${C.cyberCyan}[h]${C.reset}           Toggle Full Interactive Help Manual & Telemetry modal
  ${C.steel}[+]${C.reset} / ${C.steel}[-]${C.reset}            Increase / decrease ticker refresh speed
  ${C.neonGreen}[b]${C.reset}                  Toggle terminal audio bell on solves and anomalies
  ${C.neonViolet}[e]${C.reset}                  Export Markdown session report to practice/days/<date>/
  ${C.steel}[r]${C.reset}                  Force instant state reload from disk
  ${C.textMuted}[q]${C.reset} / ${C.textMuted}[Ctrl+C]${C.reset}       Clean exit and restore terminal state

${C.bold}MOUSE ACTIONS (When Mouse Mode is ON):${C.reset}
  ${C.neonGreen}Left Click Rows${C.reset}      Select row & ${C.neonGreen}DIRECTLY AUTO-COPIES${C.reset} item to clipboard
  ${C.solarAmber}Scroll Wheel Up/Down${C.reset} Navigate rows smoothly & ${C.neonGreen}DIRECTLY AUTO-COPIES${C.reset}
  ${C.cyberCyan}Right Click Row${C.reset}     Explicitly copy clicked problem title & ID to clipboard
  ${C.neonGreen}Left Click Tabs${C.reset}      Jump directly to clicked navigation tab
  ${C.neonGreen}Left Click Buttons${C.reset}   Click Pause, Retry, Filter, Copy, or Quit on Command Deck
  ${C.textMuted}Shift + Mouse Drag${C.reset}    Native terminal text selection and copy (or toggle [m] OFF)
`);
}

function exportSessionReport(targetDate, state) {
  const dayDir = path.join(DAYS_DIR, targetDate);
  if (!fs.existsSync(dayDir)) {
    try {
      fs.mkdirSync(dayDir, { recursive: true });
    } catch {}
  }
  const reportPath = path.join(dayDir, 'SESSION_REPORT.md');

  const totalProbs = state.problems.length || 30;
  const totalAcc = state.platforms.codeforces.accepted + state.platforms.leetcode.accepted + state.platforms.codechef.accepted;
  const dlqCount = state.dlq.filter((d) => d.status !== 'RESOLVED').length;
  const failedCount = state.submissions.filter((s) => !/accepted|correct/i.test(s.verdict || '')).length;
  const accuracyPct = state.submissions.length > 0 ? ((totalAcc / state.submissions.length) * 100).toFixed(1) : '100.0';

  const md = [
    `# AlgoPulse Telemetry Mission Report`,
    ``,
    `- **Date:** \`${targetDate}\``,
    `- **Duration:** \`${formatDuration(state.elapsedMs)}\` (${formatTimeOnly(state.sessionStart)} → ${formatTimeOnly(state.sessionEnd)})`,
    `- **Solved Score:** \`${totalAcc}/${totalProbs}\` (${Math.round((totalAcc / totalProbs) * 100)}%)`,
    `- **Verified Accuracy:** \`${accuracyPct}%\` (${totalAcc} Passed / ${failedCount} Failed)`,
    `- **DLQ Anomalies:** \`${dlqCount}\` active`,
    `- **Generated At:** \`${new Date().toISOString()}\``,
    ``,
    `## Platform Breakdown`,
    ``,
    `| Platform | Solved | Total | Accuracy | Status |`,
    `| :--- | :--- | :--- | :--- | :--- |`,
    `| **Codeforces** | ${state.platforms.codeforces.accepted} | ${state.platforms.codeforces.total} | ${state.platforms.codeforces.total > 0 ? Math.round((state.platforms.codeforces.accepted / state.platforms.codeforces.total) * 100) : 0}% | ${state.workers.codeforces.state} |`,
    `| **LeetCode** | ${state.platforms.leetcode.accepted} | ${state.platforms.leetcode.total} | ${state.platforms.leetcode.total > 0 ? Math.round((state.platforms.leetcode.accepted / state.platforms.leetcode.total) * 100) : 0}% | ${state.workers.leetcode.state} |`,
    `| **CodeChef** | ${state.platforms.codechef.accepted} | ${state.platforms.codechef.total} | ${state.platforms.codechef.total > 0 ? Math.round((state.platforms.codechef.accepted / state.platforms.codechef.total) * 100) : 0}% | ${state.workers.codechef.state} |`,
    ``,
    `## Verified Submissions History`,
    ``,
    `| # | Platform | Task ID | Problem Title | Verdict | Latency | Timestamp |`,
    `| :-: | :--- | :--- | :--- | :--- | :--- | :--- |`,
  ];

  if (state.submissions.length === 0) {
    md.push(`| - | - | - | *No submissions recorded* | - | - | - |`);
  } else {
    state.submissions.forEach((s, idx) => {
      const isAcc = /accepted|correct/i.test(s.verdict || '');
      const statusIcon = isAcc ? '✅ ACCEPTED' : `❌ ${s.verdict || 'FAILED'}`;
      md.push(`| ${idx + 1} | ${s.platform || 'Platform'} | \`${s.id || s.problemId || '-'}\` | ${s.name || s.file || '-'} | ${statusIcon} | ${s.time || '-'} | ${formatTimeOnly(s.timestamp)} |`);
    });
  }

  md.push(``);
  md.push(`## Dead Letter Queue (DLQ) Radar Audit`);
  md.push(``);
  md.push(`| Platform | Task ID | Problem Name | Initial Verdict | Current Status | Enqueued At |`);
  md.push(`| :--- | :--- | :--- | :--- | :--- | :--- |`);

  if (state.dlq.length === 0) {
    md.push(`| - | - | *Zero anomalies recorded* | - | - | - |`);
  } else {
    state.dlq.forEach((d) => {
      md.push(`| ${d.platform || '-'} | \`${d.id || '-'}\` | ${d.name || '-'} | ${d.initialVerdict || '-'} | \`${d.status || '-'}\` | ${formatTimeOnly(d.enqueuedAt)} |`);
    });
  }

  md.push(``);
  md.push(`---`);
  md.push(`*Generated by AlgoPulse Telemetry Mission Control CLI engine.*`);

  fs.writeFileSync(reportPath, md.join('\n'), 'utf-8');
  return reportPath;
}

function filterEvents(events, filterQuery, platformFilter, verdictFilter) {
  if (!events) return [];
  return events.filter((ev) => {
    if (platformFilter) {
      const p = (ev.platform || '').toLowerCase();
      if (!p.includes(platformFilter.toLowerCase())) return false;
    }
    if (verdictFilter) {
      const isAcc = ev.isAcc || /accepted|correct/i.test(ev.verdict || '');
      if (verdictFilter === 'accepted' && !isAcc) return false;
      if (verdictFilter === 'failed' && isAcc) return false;
    }
    if (filterQuery) {
      const q = filterQuery.toLowerCase();
      const str = `${ev.platform || ''} ${ev.id || ''} ${ev.title || ''} ${ev.verdict || ''}`.toLowerCase();
      if (!str.includes(q)) return false;
    }
    return true;
  });
}

function filterSubmissions(submissions, filterQuery, platformFilter, verdictFilter) {
  if (!submissions) return [];
  return submissions.filter((s) => {
    if (platformFilter) {
      const p = (s.platform || '').toLowerCase();
      if (!p.includes(platformFilter.toLowerCase())) return false;
    }
    if (verdictFilter) {
      const isAcc = /accepted|correct/i.test(s.verdict || '');
      if (verdictFilter === 'accepted' && !isAcc) return false;
      if (verdictFilter === 'failed' && isAcc) return false;
    }
    if (filterQuery) {
      const q = filterQuery.toLowerCase();
      const str = `${s.platform || ''} ${s.id || s.problemId || ''} ${s.name || s.file || ''} ${s.verdict || ''}`.toLowerCase();
      if (!str.includes(q)) return false;
    }
    return true;
  });
}

function getTargetDate() {
  if (customDate) return customDate;
  if (!fs.existsSync(DAYS_DIR)) return new Date().toISOString().slice(0, 10);
  const dirs = fs.readdirSync(DAYS_DIR).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
  return dirs.length > 0 ? dirs[dirs.length - 1] : new Date().toISOString().slice(0, 10);
}

// Locate runner log safely (strictly avoiding monitor's own log files)
function findRunnerLog(targetDate) {
  const dayLog = path.join(DAYS_DIR, targetDate, 'live.log');
  if (fs.existsSync(dayLog)) return dayLog;

  const globalLog = path.join(REPO_ROOT, 'logs', 'live.log');
  if (fs.existsSync(globalLog)) return globalLog;

  // Search background tasks, but ONLY pick genuine submit runner logs
  const base = path.join(process.env.USERPROFILE || 'C:\\Users\\AKKIE', '.gemini', 'antigravity-ide', 'brain');
  if (fs.existsSync(base)) {
    try {
      const candidates = [];
      const convs = fs.readdirSync(base);
      for (const conv of convs) {
        const taskDir = path.join(base, conv, '.system_generated', 'tasks');
        if (fs.existsSync(taskDir)) {
          const files = fs.readdirSync(taskDir).filter((f) => f.endsWith('.log'));
          for (const f of files) {
            const p = path.join(taskDir, f);
            try {
              const stat = fs.statSync(p);
              // Read first 1000 bytes to check if it's a submit task
              const fd = fs.openSync(p, 'r');
              const buf = Buffer.alloc(1200);
              const readBytes = fs.readSync(fd, buf, 0, 1200, 0);
              fs.closeSync(fd);
              const snippet = buf.toString('utf-8', 0, readBytes);

              // Must be submit.js output and NOT monitor.js
              if (
                (snippet.includes('Playwright Platform Submissions') || snippet.includes('Processing [')) &&
                !snippet.includes('AlgoPulse Live CLI Submission Monitor') &&
                !snippet.includes('monitor.js')
              ) {
                candidates.push({ p, mtime: stat.mtimeMs });
              }
            } catch {}
          }
        }
      }
      if (candidates.length > 0) {
        candidates.sort((a, b) => b.mtime - a.mtime);
        return candidates[0].p;
      }
    } catch {}
  }

  return null;
}

function isRunnerActive(logPath) {
  if (logPath && fs.existsSync(logPath)) {
    try {
      const stat = fs.statSync(logPath);
      // Actively modified within last 40 seconds
      if (Date.now() - stat.mtimeMs < 40000) {
        return true;
      }
    } catch {}
  }
  return false;
}

function renderProgressBar(current, total, width = 18, filledColor = C.neonGreen, frame = 0) {
  if (total <= 0) return `${C.slateDark}[${'░'.repeat(Math.max(2, width))}] 0%${C.reset}`;
  const pct = Math.min(1, Math.max(0, current / total));
  const filled = Math.round(pct * width);
  const empty = Math.max(0, width - filled);
  const pctStr = `${Math.round(pct * 100)}%`;

  let bar = '';
  if (filled > 0) {
    if (empty > 0 && current > 0 && current < total) {
      const body = '█'.repeat(Math.max(0, filled - 1));
      const pulseHead = (frame % 2 === 0) ? `${C.white}▌${C.reset}` : `${filledColor}█${C.reset}`;
      bar = `${filledColor}${body}${pulseHead}`;
    } else {
      bar = `${filledColor}${'█'.repeat(filled)}${C.reset}`;
    }
  }
  bar += `${C.slateDark}${'░'.repeat(empty)}${C.reset}`;
  return `${C.slateDark}[${C.reset}${bar}${C.slateDark}]${C.reset} ${C.bold}${filledColor}${padStartAnsi(pctStr, 4)}${C.reset}`;
}

// Parse live runner log into structured events and worker states
function parseLiveRunnerLog(logPath) {
  const result = {
    workers: {
      codeforces: { state: 'IDLE', activeProblem: null, nextProblem: null, countdown: null, lastSolved: null, lastVerdict: null },
      leetcode: { state: 'IDLE', activeProblem: null, nextProblem: null, countdown: null, lastSolved: null, lastVerdict: null },
      codechef: { state: 'IDLE', activeProblem: null, nextProblem: null, countdown: null, lastSolved: null, lastVerdict: null },
    },
    events: [],
    startTime: null,
    endTime: null,
  };

  if (!logPath || !fs.existsSync(logPath)) return result;

  try {
    const raw = fs.readFileSync(logPath, 'utf-8');
    const rawLines = raw.split(/\r?\n/);

    let activeWorker = null;
    const currentProb = { codeforces: null, leetcode: null, codechef: null };

    for (let i = 0; i < rawLines.length; i++) {
      let line = rawLines[i].trim();
      if (!line) continue;

      // Extract cooldown countdown ticks without cluttering events
      if (line.includes('⏳ Pacing pause:')) {
        const matches = [...line.matchAll(/⏳\s+Pacing pause:\s+([0-9:]+)\s+remaining/gi)];
        if (matches.length > 0) {
          const lastTick = matches[matches.length - 1][1];
          const target = activeWorker || 'codeforces';
          if (result.workers[target] && result.workers[target].state === 'COOLDOWN') {
            result.workers[target].countdown = lastTick;
          }
        }
        // Strip out the pacing pause string so the rest of the line can be processed if any
        line = line.replace(/⏳\s+Pacing pause:\s+[0-9:]+\s+remaining\s*\.{0,3}/gi, '').trim();
        if (!line) continue;
      }

      // Track platform worker context
      if (line.includes('[Codeforces]')) activeWorker = 'codeforces';
      if (line.includes('[LeetCode]')) activeWorker = 'leetcode';
      if (line.includes('[CodeChef]')) activeWorker = 'codechef';

      // Worker Problem Processing Started
      const pm = line.match(/\[(\w+)\]\s+\((\d+\/\d+)\)\s+\[Difficulty:\s+(\w+)\]\s+Processing:\s+([^(\n]+)(?:\(([^)\n]+)\))?/i);
      if (pm) {
        const plat = pm[1].toLowerCase();
        if (result.workers[plat]) {
          result.workers[plat].state = 'SUBMITTING';
          const info = {
            step: pm[2],
            tier: pm[3],
            title: pm[4].trim(),
            id: pm[5] ? pm[5].trim() : '',
          };
          result.workers[plat].activeProblem = info;
          result.workers[plat].countdown = null;
          currentProb[plat] = info;
          activeWorker = plat;

          result.events.push({
            type: 'START',
            platform: pm[1],
            text: `[${pm[1]}] (${info.step}) Processing: ${info.title} (${info.id})`,
            icon: '🚀',
            color: C.cyan,
          });
        }
        continue;
      }

      // Worker completed
      if (line.includes('Worker for') && line.includes('completed')) {
        const m = line.match(/Worker for \[?(\w+)\]?\s+completed/i);
        if (m) {
          const plat = m[1].toLowerCase();
          if (result.workers[plat]) {
            result.workers[plat].state = 'FINISHED';
            result.workers[plat].activeProblem = null;
            result.workers[plat].countdown = null;
            result.events.push({
              type: 'WORKER_FINISH',
              platform: m[1],
              text: `Worker [${m[1]}] queue completed successfully`,
              icon: '🏁',
              color: C.green,
            });
          }
        }
        continue;
      }

      // Cooldown Headers
      if (line.includes('Humanized cooldown before')) {
        const isCf = line.includes('[Codeforces]');
        const isLc = line.includes('[LeetCode]');
        const isCc = line.includes('[CodeChef]');
        const target = isCf ? 'codeforces' : isLc ? 'leetcode' : isCc ? 'codechef' : activeWorker;

        if (target && result.workers[target]) {
          result.workers[target].state = 'COOLDOWN';
          const nm = line.match(/problem\s+(\d+\/\d+)\s+\(([^)]+)\)/i);
          if (nm) {
            result.workers[target].nextProblem = { step: nm[1], title: nm[2].trim() };
          }
          activeWorker = target;
        }
        continue;
      }

      // Submission Dispatched
      if (line.includes('Submission dispatched!')) {
        const m = line.match(/\[(\w+)\]\s+Submission dispatched!\s*(.*)/i);
        const plat = m ? m[1] : (activeWorker || 'Platform');
        result.events.push({
          type: 'DISPATCH',
          platform: plat,
          text: `[${plat}] Submission dispatched to judge, awaiting verdict...`,
          icon: '•',
          color: C.yellow,
        });
        continue;
      }

      // Verdicts
      if (line.includes('Verdict:') || line.includes('Submission completed! Verdict:')) {
        const vm = line.match(/Verdict:\s+([^\n\r]+)/i);
        if (vm) {
          const verdict = vm[1].trim();
          const target = activeWorker || 'codeforces';
          if (result.workers[target]) {
            result.workers[target].lastVerdict = verdict;
            const cur = currentProb[target];
            const isAcc = /accepted|correct answer|passed/i.test(verdict);
            if (cur) {
              if (isAcc) {
                result.workers[target].lastSolved = `${cur.title} ✓`;
              } else {
                result.workers[target].lastSolved = `${cur.title} ✗`;
              }
            }
            result.events.push({
              type: 'VERDICT',
              platform: target,
              text: `[${target.toUpperCase()}] Verdict: ${verdict}${cur ? ` (${cur.title})` : ''}`,
              icon: isAcc ? '✓' : '✗',
              color: isAcc ? C.green : C.red,
            });
          }
        }
        continue;
      }

      // AI Diagnosis and Auto-Fix
      if (line.includes('AI Diagnosis:')) {
        const m = line.match(/AI Diagnosis:\s+([^\n\r]+)/i);
        if (m) {
          result.events.push({
            type: 'DIAGNOSIS',
            platform: activeWorker || 'AI',
            text: `[fix-flow] AI Diagnosis: ${m[1].trim()}`,
            icon: '🔧',
            color: C.magenta,
          });
        }
        continue;
      }

      if (line.includes('Successfully validated candidate fix')) {
        result.events.push({
          type: 'FIX_VALIDATED',
          platform: activeWorker || 'AI',
          text: `[fix-flow] Candidate fix validated locally against test suite!`,
          icon: '✓',
          color: C.green,
        });
        continue;
      }

      if (line.includes('SUCCESS!') && line.includes('ACCEPTED')) {
        result.events.push({
          type: 'FIX_SUCCESS',
          platform: activeWorker || 'AI',
          text: line.replace(/^[^\w]*/, '').trim(),
          icon: '🎉',
          color: C.green,
        });
        continue;
      }

      // DLQ Events
      if (line.includes('DLQ-ENQUEUE')) {
        const m = line.match(/Problem\s+"([^"]+)"\s+\(([^)]+)\)\s+returned non-accepted/i);
        result.events.push({
          type: 'DLQ_ENQUEUE',
          platform: activeWorker || 'DLQ',
          text: `[DLQ-ENQUEUE] ${m ? `${m[1]} (${m[2]})` : 'Problem'} moved to Dead Letter Queue`,
          icon: '⚠️',
          color: C.yellow,
        });
        continue;
      }

      if (line.includes('DLQ-HALT')) {
        const m = line.match(/Problem\s+"([^"]+)"\s+\(([^)]+)\)\s+failed DLQ retry/i);
        result.events.push({
          type: 'DLQ_HALT',
          platform: activeWorker || 'DLQ',
          text: `[DLQ-HALT] ${m ? `${m[1]} (${m[2]})` : 'Problem'} halted to protect reputation`,
          icon: '⛔',
          color: C.red,
        });
        continue;
      }
    }
  } catch {}

  return result;
}

// Load full state: curriculum, verified submissions, DLQ, live logs, elapsed timing
function loadMissionState(targetDate) {
  const dayDir = path.join(DAYS_DIR, targetDate);

  // 1. set.json (Curriculum)
  let problems = [];
  const setFile = path.join(dayDir, 'set.json');
  if (fs.existsSync(setFile)) {
    try {
      const raw = JSON.parse(fs.readFileSync(setFile, 'utf-8'));
      problems = raw.problems || [];
    } catch {}
  }

  // 2. submissions.json
  let submissions = [];
  const subFile = path.join(dayDir, 'submissions.json');
  if (fs.existsSync(subFile)) {
    try {
      submissions = JSON.parse(fs.readFileSync(subFile, 'utf-8')) || [];
    } catch {}
  }

  // 3. dlq.json
  let dlq = [];
  const dlqFile = path.join(dayDir, 'dlq.json');
  if (fs.existsSync(dlqFile)) {
    try {
      dlq = JSON.parse(fs.readFileSync(dlqFile, 'utf-8')) || [];
    } catch {}
  }

  // 4. Live runner log & active status
  const logPath = findRunnerLog(targetDate);
  const isRunning = isRunnerActive(logPath);
  const liveLogData = parseLiveRunnerLog(logPath);

  // 5. Compute Session Timings ("Long Time" tracking)
  const tsList = submissions
    .map((s) => new Date(s.timestamp).getTime())
    .filter((t) => !isNaN(t) && t > 0)
    .sort((a, b) => a - b);

  let sessionStart = tsList.length > 0 ? tsList[0] : null;
  let sessionEnd = tsList.length > 0 ? tsList[tsList.length - 1] : null;

  // If live log file exists, check mtime
  if (logPath && fs.existsSync(logPath)) {
    try {
      const stat = fs.statSync(logPath);
      if (!sessionEnd || stat.mtimeMs > sessionEnd) {
        sessionEnd = stat.mtimeMs;
      }
      if (!sessionStart || stat.birthtimeMs < sessionStart) {
        sessionStart = stat.birthtimeMs;
      }
    } catch {}
  }

  const now = Date.now();
  let elapsedMs = 0;
  if (sessionStart) {
    elapsedMs = isRunning ? Math.max(0, now - sessionStart) : Math.max(0, (sessionEnd || now) - sessionStart);
  }

  // Platforms Breakdown
  const acceptedSet = new Set();
  for (const s of submissions) {
    if (/accepted|correct answer|passed/i.test(s.verdict || '')) {
      if (s.id) acceptedSet.add(normalizeId(s.id));
      if (s.problemId) acceptedSet.add(normalizeId(s.problemId));
      if (s.file) acceptedSet.add(String(s.file).toLowerCase());
    }
  }

  const platforms = {
    codeforces: { name: 'Codeforces', color: C.cyan, total: 0, accepted: 0, pending: 0, failed: 0, problems: [] },
    leetcode: { name: 'LeetCode', color: C.yellow, total: 0, accepted: 0, pending: 0, failed: 0, problems: [] },
    codechef: { name: 'CodeChef', color: C.magenta, total: 0, accepted: 0, pending: 0, failed: 0, problems: [] },
  };

  for (const p of problems) {
    const platKey = String(p.platform || '').toLowerCase();
    const plat = platforms[platKey] || platforms.codeforces;
    plat.total++;

    const normId = normalizeId(p.id);
    const normFile = String(p.file || '').toLowerCase();
    const normName = String(p.name || '').toLowerCase().replace(/\s+/g, '');
    const isAcc = acceptedSet.has(normId) || acceptedSet.has(normFile) || acceptedSet.has(normName);

    if (isAcc) {
      plat.accepted++;
    } else {
      plat.pending++;
    }
    plat.problems.push({ ...p, isAccepted: isAcc });
  }

  // Unified Chronological Stream (Flowing Downwards)
  const streamEvents = [];

  // 1. Add all verified submission records
  for (const s of submissions) {
    const isAcc = /accepted|correct answer|passed/i.test(s.verdict || '');
    const ts = new Date(s.timestamp).getTime() || sessionStart || now;
    const timeFormatted = formatTimeOnly(s.timestamp);
    const plat = s.platform || 'Platform';

    streamEvents.push({
      timestamp: ts,
      timeStr: timeFormatted,
      platform: plat,
      title: s.name || s.id,
      id: s.id,
      verdict: s.verdict || (isAcc ? 'Accepted' : 'Failed'),
      judgeTime: s.time || '',
      icon: isAcc ? '✓' : '✕',
      isAcc,
    });
  }

  // 2. Add DLQ enqueues and halts with their recorded timestamps
  for (const d of dlq) {
    const plat = d.platform || 'Platform';
    const enqTs = d.enqueuedAt ? new Date(d.enqueuedAt).getTime() : (sessionStart ? sessionStart + 30000 : now);
    const enqTimeStr = formatTimeOnly(d.enqueuedAt || sessionStart);

    streamEvents.push({
      timestamp: enqTs,
      timeStr: enqTimeStr,
      platform: plat,
      title: d.name || d.id,
      id: d.id,
      verdict: `ENQUEUED_DLQ (${d.initialVerdict || 'Failed'})`,
      judgeTime: '',
      icon: '▲',
      isAcc: false,
    });

    if (d.status === 'HALTED_UNRESOLVED') {
      const haltTs = enqTs + 180000;
      const haltTimeStr = formatTimeOnly(haltTs);
      streamEvents.push({
        timestamp: haltTs,
        timeStr: haltTimeStr,
        platform: plat,
        title: d.name || d.id,
        id: d.id,
        verdict: 'HALTED (Reputation Defense)',
        judgeTime: '',
        icon: '■',
        isAcc: false,
      });
    }
  }

  // Sort strictly ascending by timestamp (natural chronological downward flow)
  streamEvents.sort((a, b) => a.timestamp - b.timestamp);

  return {
    date: targetDate,
    isRunning,
    isPaused: fs.existsSync(PAUSE_FILE),
    logPath,
    sessionStart,
    sessionEnd,
    elapsedMs,
    problems,
    submissions,
    dlq,
    platforms,
    workers: liveLogData.workers,
    streamEvents,
  };
}

// Format an individual telemetry event line with dynamic width and single-cell symbols
function formatStreamEvent(ev, maxW = 76) {
  const platRaw = (ev.platform || '').toLowerCase();
  const platShort = platRaw.includes('codeforces') ? 'CF' : platRaw.includes('leetcode') ? 'LC' : 'CC';
  const platCol = platShort === 'CF' ? C.cyberCyan : platShort === 'LC' ? C.solarAmber : C.neonViolet;
  const isAcc = ev.isAcc || /accepted|correct/i.test(ev.verdict || '');
  const isHalted = (ev.verdict || '').includes('HALTED');
  const isEnq = (ev.verdict || '').includes('ENQUEUED');
  const verdCol = isAcc ? C.neonGreen : isHalted ? C.laserRed : isEnq ? C.solarAmber : C.laserRed;
  const icon = isAcc ? '✓' : isHalted ? '■' : isEnq ? '▲' : '✕';

  const timeBadge = `${C.slateDark}[${ev.timeStr}]${C.reset}`;
  const iconBadge = `${verdCol}${icon}${C.reset}`;
  const platBadge = `${platCol}◈ ${platShort}${C.reset}`;
  const idStr = `${C.cyan}${ev.id || '-'}${C.reset}`;

  let verdictText = ev.verdict || (isAcc ? 'Accepted' : 'Failed');
  if (isEnq) verdictText = 'ENQUEUED_DLQ';
  if (isHalted) verdictText = 'HALTED';

  const judgeTimeStr = ev.judgeTime ? ` ${C.textMuted}[${ev.judgeTime}]${C.reset}` : '';
  const suffix = ` ${C.slateDark}──>${C.reset} ${verdCol}${verdictText}${C.reset}${judgeTimeStr}`;

  const prefix = `${timeBadge} ${iconBadge} ${platBadge} ${C.slateDark}::${C.reset} ${idStr}`;
  const prefixPlain = stripAnsi(prefix).length;
  const suffixPlain = stripAnsi(suffix).length;

  const availTitle = Math.max(4, maxW - prefixPlain - suffixPlain - 3);
  const titleStr = `${C.bold}${truncateAnsiPreserving(ev.title || '-', availTitle)}${C.reset}`;

  const fullLine = `${prefix} (${titleStr})${suffix}`;
  return padCell(fullLine, maxW);
}

// -----------------------------------------------------------------------------
// UNIFIED TUI BOX & FRAME UTILITIES
// -----------------------------------------------------------------------------

function renderBoxTop(leftTitle, rightBadge, innerW) {
  const targetTotal = innerW + 4;
  let rightPlain = stripAnsi(rightBadge || '');
  let activeRightBadge = rightBadge;

  if (rightPlain.length > 0 && (5 + stripAnsi(leftTitle || '').length + 2 + rightPlain.length + 2) > targetTotal) {
    activeRightBadge = '';
    rightPlain = '';
  }

  if (rightPlain.length > 0) {
    const availLeft = Math.max(4, targetTotal - 5 - rightPlain.length - 4);
    const safeLeft = truncateAnsiPreserving(leftTitle, availLeft);
    const leftLen = stripAnsi(safeLeft).length;
    const dashes = Math.max(0, targetTotal - (5 + leftLen + 1 + 1 + rightPlain.length + 2));
    return `  ${C.slateDark}╭─ ${C.reset}${safeLeft} ${C.slateDark}${'─'.repeat(dashes)} ${activeRightBadge}${C.slateDark}─╮${C.reset}`;
  }

  const availLeft = Math.max(4, targetTotal - 5 - 3);
  const safeLeft = truncateAnsiPreserving(leftTitle, availLeft);
  const leftLen = stripAnsi(safeLeft).length;
  const dashes = Math.max(0, targetTotal - (5 + leftLen + 3));
  return `  ${C.slateDark}╭─ ${C.reset}${safeLeft} ${C.slateDark}${'─'.repeat(dashes)}─╮${C.reset}`;
}

function renderBoxLine(content, innerW) {
  const maxContentW = Math.max(0, innerW - 4);
  const formatted = padCell(content, maxContentW);
  return `  ${C.slateDark}│${C.reset}  ${formatted}  ${C.slateDark}│${C.reset}`;
}

function renderBoxBtm(innerW) {
  return `  ${C.slateDark}╰${'─'.repeat(innerW)}╯${C.reset}`;
}

function renderNavBar(activeTab, termWidth) {
  const isCompact = termWidth < 82;
  const tabs = [
    { id: '1', key: isCompact ? '1' : '01', label: isCompact ? 'DASH' : 'DASHBOARD' },
    { id: '2', key: isCompact ? '2' : '02', label: isCompact ? 'STREAM ↓' : 'STREAM ↓' },
    { id: '3', key: isCompact ? '3' : '03', label: isCompact ? 'DLQ' : 'DLQ RADAR' },
    { id: '4', key: isCompact ? '4' : '04', label: isCompact ? 'SUBS' : 'SUBMISSIONS' },
  ];

  const renderedTabs = tabs.map((t) => {
    if (t.id === activeTab) {
      if (t.id === '3') return `${C.bgRedPill} ⬢ [ ${t.key} › ${t.label} ] ${C.reset}`;
      if (t.id === '4') return `${C.bgVioletPill} ⬢ [ ${t.key} › ${t.label} ] ${C.reset}`;
      if (t.id === '2') return `${C.bgGreenPill} ⬢ [ ${t.key} › ${t.label} ] ${C.reset}`;
      return `${C.bgCyanPill} ⬢ [ ${t.key} › ${t.label} ] ${C.reset}`;
    }
    return `${C.slateDark}⬡ [ ${C.textMuted}${t.key} › ${t.label}${C.slateDark} ]${C.reset}`;
  }).join(isCompact ? '  ' : '   ');

  const navLine = `  ${C.textMuted}NAV:${C.reset}   ${renderedTabs}`;
  if (stripAnsi(navLine).length > termWidth) {
    return truncateAnsiPreserving(navLine, termWidth);
  }
  return navLine;
}

function renderHelpModal(innerW, tickerRate = 800) {
  const isCompact = innerW < 76;
  const lineTop = renderBoxTop(`${C.cyan}${C.bold}◈ CLI HELP & SYSTEM TELEMETRY${C.reset}`, `${C.steel}[Esc/?/h to close]${C.reset}`, innerW);
  const memMb = Math.round(process.memoryUsage().rss / 1024 / 1024);

  const navHelp = isCompact
    ? `${C.bold}NAV & TABS:${C.reset}     ${C.white}[1-4]${C.reset} or ${C.white}[←/→]${C.reset} Tabs  │  ${C.white}[Tab/Shift+Tab]${C.reset} Cycle`
    : `${C.bold}NAVIGATION & TABS${C.reset}       ${C.white}[1-4]${C.reset} or ${C.white}[←/→]${C.reset} Jump/cycle tabs  │  ${C.white}[Tab/Shift+Tab]${C.reset} Cycle tabs`;

  const copyHelp = isCompact
    ? `${C.cyberCyan}${C.bold}AUTO-COPY:${C.reset}      ${C.white}[↑/↓]${C.reset} Select & ${C.neonGreen}Auto-Copies to Clipboard!${C.reset}  │  ${C.white}[c/y]${C.reset} Copy`
    : `${C.cyberCyan}${C.bold}SELECTION & AUTO-COPY${C.reset}   ${C.white}[↑/↓]${C.reset} Move cursor (▶) & ${C.neonGreen}Directly Copies to Clipboard!${C.reset}  │  ${C.white}[c/y]${C.reset} Copy`;

  const deleteHelp = isCompact
    ? `${C.laserRed}${C.bold}DISMISS/RESET:${C.reset}  ${C.white}[d/Delete]${C.reset} Dismiss DLQ Anomaly from queue  │  Clear filters`
    : `${C.laserRed}${C.bold}DISMISS & RESET${C.reset}         ${C.white}[d/Delete]${C.reset} In DLQ: dismiss active anomaly  │  Other tabs: clear filter`;

  const filterHelp = isCompact
    ? `${C.solarAmber}${C.bold}FILTER HOOKS:${C.reset}   ${C.white}[/]${C.reset} Search  │  ${C.white}[Tab]${C.reset} Cycle hooks  │  ${C.white}[v]${C.reset} Verdict  │  ${C.white}[p]${C.reset} Platform`
    : `${C.solarAmber}${C.bold}SEARCH & FILTER HOOKS${C.reset}   ${C.white}[/]${C.reset} Search  │  ${C.white}[Tab]${C.reset} Inside search to cycle presets  │  ${C.white}[v]${C.reset} Verdict  │  ${C.white}[p]${C.reset} Platform`;

  const directFilterHelp = isCompact
    ? `${C.solarAmber}${C.bold}DIRECT PRESETS:${C.reset} ${C.white}[f]${C.reset} CF Only  │  ${C.white}[l]${C.reset} LC Only  │  ${C.white}[k]${C.reset} CC Only  │  ${C.white}[a]${C.reset} Clear All`
    : `${C.solarAmber}${C.bold}DIRECT PLATFORM KEYS${C.reset}    ${C.white}[f]${C.reset} Codeforces  │  ${C.white}[l]${C.reset} LeetCode  │  ${C.white}[k]${C.reset} CodeChef  │  ${C.white}[a]${C.reset} Reset Filters`;

  const runnerHelp = isCompact
    ? `${C.neonGreen}${C.bold}RUNNER CONTROL:${C.reset} ${C.white}[Space]${C.reset} Pause/Play  │  ${C.white}[x]${C.reset} Auto-Pilot DLQ Retry  │  ${C.white}[i]${C.reset} Inspector`
    : `${C.neonGreen}${C.bold}RUNNER & AUTO-PILOT${C.reset}     ${C.white}[Space]${C.reset} Pause/Play runner  │  ${C.white}[x]${C.reset} Auto-Pilot DLQ repair  │  ${C.white}[i]${C.reset} DLQ Inspector`;

  const mouseHelp = isCompact
    ? `${C.neonViolet}${C.bold}MOUSE ACTIONS:${C.reset}  ${C.white}[Click/Scroll]${C.reset} Select & Copy  │  ${C.white}[Right-Click]${C.reset} Copy  │  ${C.white}[m]${C.reset} Toggle`
    : `${C.neonViolet}${C.bold}MOUSE & TOUCH${C.reset}           ${C.white}[Click/Scroll]${C.reset} Selects row & Auto-Copies  │  ${C.white}[Right-Click]${C.reset} Copy  │  ${C.white}[m]${C.reset} Toggle`;

  const dragHelp = isCompact
    ? `${C.neonViolet}${C.bold}TEXT DRAG:${C.reset}      Hold ${C.white}Shift + Mouse Drag${C.reset} to highlight/copy native terminal text`
    : `${C.neonViolet}${C.bold}DRAG HIGHLIGHTING${C.reset}       Hold ${C.white}Shift + Drag${C.reset} (or turn [m] OFF) for native text selection`;

  const engineHelp = isCompact
    ? `${C.steel}${C.bold}ENGINE & AUDIO:${C.reset} ${C.white}[b]${C.reset} Bell  │  ${C.white}[+/-]${C.reset} Speed  │  ${C.white}[e]${C.reset} Export  │  ${C.white}[r]${C.reset} Reload  │  ${C.white}[q]${C.reset} Quit`
    : `${C.steel}${C.bold}ENGINE & AUDIO${C.reset}          ${C.white}[b]${C.reset} Terminal Bell  │  ${C.white}[+/-]${C.reset} Ticker Speed  │  ${C.white}[e]${C.reset} Export  │  ${C.white}[r]${C.reset} Reload  │  ${C.white}[q]${C.reset} Quit`;

  const rows = [
    lineTop,
    renderBoxLine(navHelp, innerW),
    renderBoxLine(copyHelp, innerW),
    renderBoxLine(deleteHelp, innerW),
    renderBoxLine(filterHelp, innerW),
    renderBoxLine(directFilterHelp, innerW),
    renderBoxLine(runnerHelp, innerW),
    renderBoxLine(mouseHelp, innerW),
    renderBoxLine(dragHelp, innerW),
    renderBoxLine(engineHelp, innerW),
    renderBoxLine(`${C.slateDark}${'─'.repeat(Math.max(4, innerW - 8))}${C.reset}`, innerW),
    renderBoxLine(`${C.textMuted}SYS: Node ${process.version} │ PID ${process.pid} │ RSS ${memMb}MB │ TTY ${process.stdout.columns || 80}x${process.stdout.rows || 24} │ TICK ${tickerRate}ms${C.reset}`, innerW),
    renderBoxBtm(innerW),
  ];
  return rows.join('\n');
}

function renderInspectorModal(state, innerW) {
  const activeDlq = state.dlq.filter((d) => d.status !== 'RESOLVED');
  const lineTop = renderBoxTop(`${C.laserRed}${C.bold}◈ DLQ ANOMALY INSPECTOR${C.reset}`, `${C.steel}[Esc/i to close]${C.reset}`, innerW);
  const rows = [lineTop];
  if (activeDlq.length === 0) {
    rows.push(renderBoxLine(`${C.neonGreen}✓ ZERO ANOMALIES ACTIVE: All platform queues passing cleanly.${C.reset}`, innerW));
    rows.push(renderBoxLine(`${C.textMuted}No submission halts or safety threshold triggers in mission session.${C.reset}`, innerW));
  } else {
    const item = activeDlq[0];
    const plat = (item.platform || 'Platform').toUpperCase();
    rows.push(renderBoxLine(`${C.bold}ACTIVE ANOMALY:${C.reset} ${C.laserRed}▲ [${plat}] ${item.name || item.id} (${item.id || '-'})${C.reset}`, innerW));
    rows.push(renderBoxLine(`${C.textMuted}VERDICT:${C.reset}        ${C.laserRed}${item.initialVerdict || 'Failed'}${C.reset}`, innerW));
    rows.push(renderBoxLine(`${C.textMuted}DEFENSE SHIELD:${C.reset} ${item.status === 'HALTED_UNRESOLVED' ? `${C.laserRed}■ HALTED (Reputation Defense Active)` : `${C.solarAmber}▲ ENQUEUED (Ready for Retry)`}${C.reset}`, innerW));
    rows.push(renderBoxLine(`${C.textMuted}TIMESTAMP:${C.reset}      ${formatTimeOnly(item.enqueuedAt || Date.now())}`, innerW));
    rows.push(renderBoxLine(`${C.solarAmber}⚡ [ACTION] Press [x] to trigger LLM neural diagnosis & patch repair.${C.reset}`, innerW));
  }
  rows.push(renderBoxBtm(innerW));
  return rows.join('\n');
}

function renderFilterPrompt(innerW, filterInputBuffer, frame = 0, platformFilter = null, verdictFilter = null) {
  const isCompact = innerW < 76;
  const title = isCompact
    ? `${C.solarAmber}${C.bold}◈ SEARCH & FILTER HOOKS${C.reset}`
    : `${C.solarAmber}${C.bold}◈ LIVE TELEMETRY SEARCH & FILTER HOOKS${C.reset}`;
  const badge = isCompact
    ? `${C.steel}[Enter/Tab/Esc]${C.reset}`
    : `${C.steel}[Enter: Apply │ Tab: Cycle Presets │ Esc: Clear]${C.reset}`;
  const lineTop = renderBoxTop(title, badge, innerW);
  const cursor = (frame % 2 === 0) ? `${C.cyberCyan}█${C.reset}` : ' ';
  const promptContent = `${C.bold}QUERY: ›${C.reset} ${C.white}${filterInputBuffer || ''}${C.reset}${cursor}`;

  // Interactive Filter Hook Pills
  const cfHook = platformFilter === 'codeforces' ? `${C.bgCyanPill} ⬢ [CF] ${C.reset}` : `${C.slateDark}⬡ CF${C.reset}`;
  const lcHook = platformFilter === 'leetcode' ? `${C.bgAmberPill} ⬢ [LC] ${C.reset}` : `${C.slateDark}⬡ LC${C.reset}`;
  const ccHook = platformFilter === 'codechef' ? `${C.bgVioletPill} ⬢ [CC] ${C.reset}` : `${C.slateDark}⬡ CC${C.reset}`;
  const failHook = verdictFilter === 'failed' ? `${C.bgRedPill} ⬢ [FAIL ✕] ${C.reset}` : `${C.slateDark}⬡ FAIL ✕${C.reset}`;
  const accHook = verdictFilter === 'accepted' ? `${C.bgGreenPill} ⬢ [AC ✓] ${C.reset}` : `${C.slateDark}⬡ AC ✓${C.reset}`;

  const hooksLine = `${C.textMuted}HOOKS:${C.reset}  ${cfHook}  ${lcHook}  ${ccHook}  ${failHook}  ${accHook}`;
  const tipLine = isCompact
    ? `${C.textMuted}Type query, or press [Tab] to cycle preset hooks.${C.reset}`
    : `${C.textMuted}Type query to search, or press [Tab] to cycle hooks (ALL › CF › LC › CC › FAIL › AC).${C.reset}`;

  const rows = [
    lineTop,
    renderBoxLine(promptContent, innerW),
    renderBoxLine(hooksLine, innerW),
    renderBoxLine(tipLine, innerW),
    renderBoxBtm(innerW),
  ];
  return rows.join('\n');
}

function renderGamifiedHudCard(progress, state, innerW, frame = 0) {
  const mascot = getMascotState(state, frame);
  const lvlStr = progress ? `LVL ${progress.level.level} › ${progress.rank.title.toUpperCase()}` : 'LVL 16 › CANDIDATE MASTER';
  const lineTop = renderBoxTop(`${C.neonViolet}${C.bold}◈ PULSY › CYBER COMPANION & GAMIFIED HUD${C.reset}`, `${C.solarAmber}${lvlStr}${C.reset}`, innerW);

  const chirpText = truncateAnsiPreserving(`"${mascot.chirp}"`, Math.max(12, innerW - 28));
  const mascotLine = `${mascot.color}${C.bold}🐾 PULSY:${C.reset} ${mascot.color}${mascot.face} ${mascot.sparkle}${C.reset}  ${C.white}${chirpText}${C.reset}`;

  let hudLine = '';
  if (progress) {
    const xpInto = progress.level.into;
    const xpSpan = progress.level.span;
    const xpBar = renderProgressBar(xpInto, xpSpan, 10, C.neonViolet, frame);
    const streakBadge = `${C.solarAmber}${C.bold}🔥 ${progress.streak}-DAY STREAK${C.reset}`;
    const questsDone = progress.quests ? progress.quests.filter((q) => q.done).length : 0;
    const questBadge = `${C.neonGreen}QUESTS: ${questsDone}/${progress.quests ? progress.quests.length : 4} ✓${C.reset}`;
    hudLine = `${C.textMuted}XP:${C.reset} ${xpBar} ${C.slateDark}│${C.reset} ${streakBadge} ${C.slateDark}│${C.reset} ${questBadge} ${C.slateDark}│${C.reset} ${C.cyberCyan}${progress.solvedTotal} LIFETIME AC${C.reset}`;
  } else {
    hudLine = `${C.textMuted}XP: [████████░░] 80% │ 🔥 26-DAY STREAK │ QUESTS: 2/4 ✓${C.reset}`;
  }

  const rows = [
    lineTop,
    renderBoxLine(mascotLine, innerW),
    renderBoxLine(hudLine, innerW),
    renderBoxBtm(innerW),
  ];
  return rows.join('\n');
}

function renderHeader(state, activeTab, termWidth, frame = 0, notificationBanner = null, modals = {}) {
  const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const spin = state.isRunning
    ? `${C.cyberCyan}${spinnerChars[frame % spinnerChars.length]}${C.reset}`
    : `${C.slateDark}○${C.reset}`;

  const pulseDot = state.isRunning
    ? `${C.pulseGreen(frame)}${C.bold}●${C.reset}`
    : `${C.slateDark}○${C.reset}`;

  const innerW = termWidth - 4;
  const isCompact = innerW < 78;
  const brand = isCompact
    ? `${C.cyberCyan}${C.bold}◈ ALGOPULSE${C.reset}`
    : `${C.cyberCyan}${C.bold}◈ ALGOPULSE › MISSION CONTROL${C.reset}`;

  const mascot = getMascotState(state, frame);
  const mascotBadge = isCompact ? `${mascot.face}` : `${mascot.color}${mascot.face} ${mascot.sparkle}${C.reset}`;
  const verBadge = `${C.steel}[v2.5]${C.reset} ${mascotBadge}`;
  const lineTop = renderBoxTop(brand, verBadge, innerW);

  let statusBadge = '';
  if (state.isPaused) {
    statusBadge = `${C.bgAmberPill} ⏸ PAUSED ${C.reset}`;
  } else if (state.isRunning) {
    statusBadge = `${C.bgGreenPill} ${pulseDot} RUNNING ${C.reset} ${isCompact ? '' : spin + ' '}${C.neonGreen}[3W]${C.reset}`;
  } else {
    statusBadge = `${C.bgInactivePill} ✓ COMPLETED ${C.reset}`;
  }

  const durationStr = formatDuration(state.elapsedMs);
  const runtimePill = `${C.solarAmber}${C.bold}◷ ${durationStr}${C.reset}`;
  const dateStr = isCompact
    ? `${C.steel}${C.bold}${state.date}${C.reset}`
    : `${C.textMuted}DATE:${C.reset} ${C.steel}${C.bold}${state.date}${C.reset}`;

  const totalProbs = state.problems.length || 30;
  const totalAcc = state.platforms.codeforces.accepted + state.platforms.leetcode.accepted + state.platforms.codechef.accepted;
  const dlqCount = state.dlq.filter((d) => d.status !== 'RESOLVED').length;
  const scoreStr = isCompact
    ? `${C.neonGreen}${C.bold}${totalAcc}/${totalProbs}${C.reset}${dlqCount > 0 ? ` ${C.laserRed}[▲${dlqCount}]${C.reset}` : ''}`
    : `${C.textMuted}SCORE:${C.reset} ${C.neonGreen}${C.bold}${totalAcc}/${totalProbs}${C.reset}${
        dlqCount > 0 ? ` ${C.laserRed}[${dlqCount} DLQ]${C.reset}` : ''
      }`;

  const segments = [dateStr, statusBadge, runtimePill, scoreStr];
  if (!isCompact && innerW >= 82) {
    segments.push(renderLiveSparkline(frame));
  }
  if (modals.filterQuery || modals.platformFilter || modals.verdictFilter) {
    const fStr = [
      modals.platformFilter ? `PLAT:${modals.platformFilter.toUpperCase()}` : null,
      modals.verdictFilter ? `VERD:${modals.verdictFilter.toUpperCase()}` : null,
      modals.filterQuery ? `"${modals.filterQuery}"` : null,
    ].filter(Boolean).join(' ');
    segments.push(`${C.bgAmberPill} 🔍 ${fStr} ${C.reset}`);
  }

  const midSegments = segments.join(` ${C.slateDark}│${C.reset} `);
  const lineMid = renderBoxLine(midSegments, innerW);
  const lineBtm = renderBoxBtm(innerW);

  const tabsLine = renderNavBar(activeTab, termWidth);

  const rows = [lineTop, lineMid, lineBtm];
  rows.push('');
  rows.push(tabsLine);
  rows.push('');
  if (notificationBanner) {
    rows.push(`  ${notificationBanner}`);
    rows.push('');
  }
  return rows;
}

function renderFooter(state, activeTab, termWidth, modals = {}) {
  const innerW = termWidth - 4;
  const isCompact = innerW < 78;

  const tabHotKey = isCompact ? `${C.textMuted}[1-4] TABS${C.reset}` : `${C.textMuted}⬢ [1-4] TABS${C.reset}`;
  const pauseHotKey = state.isPaused
    ? `${C.neonGreen}${C.bold}[Space] RESUME${C.reset}`
    : state.isRunning
    ? `${C.solarAmber}${C.bold}[Space] PAUSE${C.reset}`
    : `${C.neonGreen}${C.bold}[Space] START${C.reset}`;

  const retryHotKey = isCompact ? `${C.bold}[x] RETRY${C.reset}` : `${C.bold}[x] RETRY DLQ${C.reset}`;
  const filterHotKey = `${C.solarAmber}[/] FILTER${C.reset}`;
  const copyHotKey = `${C.cyberCyan}[c] COPY${C.reset}`;
  const mouseHotKey = modals.mouseTrackingEnabled ? `${C.neonGreen}[m] MOUSE:ON${C.reset}` : `${C.textMuted}[m] MOUSE:OFF${C.reset}`;
  const helpHotKey = `${C.cyberCyan}[?] HELP${C.reset}`;
  const quitHotKey = `${C.textMuted}[q] QUIT${C.reset}`;

  let deckTitle = `${C.textMuted}◈ COMMAND DECK${C.reset}`;
  if (modals.filterQuery || modals.platformFilter || modals.verdictFilter) {
    const fStr = [
      modals.platformFilter ? `PLAT:${modals.platformFilter.toUpperCase()}` : null,
      modals.verdictFilter ? `VERD:${modals.verdictFilter.toUpperCase()}` : null,
      modals.filterQuery ? `"${modals.filterQuery}"` : null,
    ].filter(Boolean).join(' ');
    deckTitle = `${C.solarAmber}◈ COMMAND DECK › HOOKS: ${fStr}${C.reset}`;
  } else if (modals.bellEnabled) {
    deckTitle = `${C.neonGreen}◈ COMMAND DECK › 🔔 BELL ON${C.reset}`;
  } else {
    deckTitle = `${C.textMuted}◈ COMMAND DECK › [?] ALL COMMANDS │ [↑↓] AUTO-COPY${C.reset}`;
  }

  const lineTop = renderBoxTop(deckTitle, `${C.steel}[v2.5]${C.reset}`, innerW);
  const keys = [
    tabHotKey,
    pauseHotKey,
    retryHotKey,
    filterHotKey,
    copyHotKey,
    mouseHotKey,
    helpHotKey,
    quitHotKey,
  ].join(` ${C.slateDark}│${C.reset} `);
  const keysLine = renderBoxLine(keys, innerW);
  const lineBtm = renderBoxBtm(innerW);

  return ['', lineTop, keysLine, lineBtm].join('\n');
}

function renderSideBySideCards(state, termWidth, frame = 0) {
  const innerW = termWidth - 4;
  const avail = (innerW + 4) - 6;
  const w1 = Math.floor(avail / 3);
  const w2 = Math.floor(avail / 3);
  const w3 = avail - w1 - w2;
  const widths = [w1, w2, w3];

  const keys = ['codeforces', 'leetcode', 'codechef'];
  const isCompact = termWidth < 76;
  const titles = [
    isCompact ? `${C.cyberCyan}${C.bold}◈ CF${C.reset}` : `${C.cyberCyan}${C.bold}◈ CODEFORCES${C.reset}`,
    isCompact ? `${C.solarAmber}${C.bold}◈ LC${C.reset}` : `${C.solarAmber}${C.bold}◈ LEETCODE${C.reset}`,
    isCompact ? `${C.neonViolet}${C.bold}◈ CC${C.reset}` : `${C.neonViolet}${C.bold}◈ CODECHEF${C.reset}`,
  ];

  const topCards = widths.map((w, i) => {
    const rawTitle = titles[i];
    const maxTitleLen = Math.max(2, w - 5);
    const title = truncateAnsiPreserving(rawTitle, maxTitleLen);
    const titleLen = stripAnsi(title).length;
    const dashes = Math.max(0, w - (4 + titleLen));
    return `${C.slateDark}╭─ ${C.reset}${title}${C.slateDark}${'─'.repeat(dashes)}╮${C.reset}`;
  });

  const btmCards = widths.map((w) => `${C.slateDark}╰${'─'.repeat(w - 2)}╯${C.reset}`);

  const statusCells = keys.map((key) => {
    const w = state.workers[key] || {};
    const p = state.platforms[key];

    if (w.state === 'COOLDOWN') {
      return `${C.solarAmber}◷ COOLDOWN [${w.countdown || '03:15'}]${C.reset}`;
    }
    if (w.state === 'SUBMITTING') {
      const activePulse = (frame % 2 === 0) ? C.neonGreen : C.cyberCyan;
      return `${activePulse}▶ SUBMITTING...${C.reset}`;
    }
    if (w.state === 'AUTO_FIX') {
      return `${C.laserRed}⚡ NEURAL_FIX_ON${C.reset}`;
    }
    if (w.state === 'DLQ_RETRY') {
      return `${C.laserRed}▲ RETRYING_DLQ${C.reset}`;
    }
    if (w.state === 'FINISHED' || (p.accepted === p.total && p.total > 0)) {
      return `${C.neonGreen}${C.bold}✓ COMPLETED${C.reset}`;
    }
    return `${C.textMuted}○ STANDBY${C.reset}`;
  });

  const barCells = keys.map((key, i) => {
    const p = state.platforms[key];
    return renderProgressBar(p.accepted, p.total, widths[i] - 12, p.color, frame);
  });

  const countCells = keys.map((key) => {
    const p = state.platforms[key];
    const pct = Math.round((p.accepted / (p.total || 1)) * 100);
    return `${p.color}${p.accepted}/${p.total} ACC${C.reset} ${C.textMuted}(${pct}%)${C.reset}`;
  });

  const detailCells = keys.map((key, i) => {
    const w = state.workers[key] || {};
    const p = state.platforms[key];
    const maxChars = widths[i] - 6;
    if (w.activeProblem) {
      return `${C.bold}${truncateAnsiPreserving(`TARGET: ${w.activeProblem.title}`, maxChars)}${C.reset}`;
    }
    if (w.state === 'COOLDOWN' && w.nextProblem) {
      return `${C.textMuted}NEXT: ${truncateAnsiPreserving(w.nextProblem.title, maxChars - 6)}${C.reset}`;
    }
    if (p.accepted === p.total && p.total > 0) {
      return `${C.neonGreen}✓ 10/10 CLEARED!${C.reset}`;
    }
    const dlqCount = state.dlq.filter((d) => (d.platform || '').toLowerCase() === key && d.status !== 'RESOLVED').length;
    if (dlqCount > 0) {
      return `${C.laserRed}▲ ${dlqCount} IN DLQ (HALT)${C.reset}`;
    }
    return `${C.textMuted}[Standby / Ready]${C.reset}`;
  });

  function formatCardRow(cells) {
    return '  ' + cells.map((cell, i) => {
      const w = widths[i];
      const innerCardW = w - 4;
      const formatted = padCell(cell, innerCardW);
      return `${C.slateDark}│${C.reset} ${formatted} ${C.slateDark}│${C.reset}`;
    }).join('  ');
  }

  const rows = [];
  rows.push('  ' + topCards.join('  '));
  rows.push(formatCardRow(statusCells));
  rows.push(formatCardRow(barCells));
  rows.push(formatCardRow(countCells));
  rows.push(formatCardRow(detailCells));
  rows.push('  ' + btmCards.join('  '));

  return rows.join('\n');
}

function renderDlqTable(dlqItems, maxRows = 6, termWidth = 90, selectedIndex = 0) {
  const isNarrow = termWidth < 76;
  const isUltraNarrow = termWidth < 66;
  const wPlat = isUltraNarrow ? 4 : 6;
  const wId = isUltraNarrow ? 6 : 8;
  const wVerd = isUltraNarrow ? 10 : (isNarrow ? 12 : 16);
  const wStat = isUltraNarrow ? 8 : (isNarrow ? 10 : 12);
  const fixedOverhead = 8;
  const wTitle = Math.max(6, termWidth - (fixedOverhead + wPlat + wId + wVerd + wStat));

  const lineTop = `  ${C.slateDark}╭${'─'.repeat(wPlat)}┬${'─'.repeat(wId)}┬${'─'.repeat(wTitle)}┬${'─'.repeat(wVerd)}┬${'─'.repeat(wStat)}╮${C.reset}`;
  const lineHdr = `  ${C.slateDark}│${C.reset} ${C.steel}${padCell('PLAT', wPlat - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell(isUltraNarrow ? 'ID' : 'TASK_ID', wId - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell(isUltraNarrow ? 'TITLE' : 'ANOMALY TITLE', wTitle - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('VERDICT', wVerd - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('STATE', wStat - 2)}${C.reset} ${C.slateDark}│${C.reset}`;
  const lineMid = `  ${C.slateDark}├${'─'.repeat(wPlat)}┼${'─'.repeat(wId)}┼${'─'.repeat(wTitle)}┼${'─'.repeat(wVerd)}┼${'─'.repeat(wStat)}┤${C.reset}`;
  const lineBtm = `  ${C.slateDark}╰${'─'.repeat(wPlat)}┴${'─'.repeat(wId)}┴${'─'.repeat(wTitle)}┴${'─'.repeat(wVerd)}┴${'─'.repeat(wStat)}╯${C.reset}`;

  const rows = [lineTop, lineHdr, lineMid];

  const items = dlqItems.slice(0, maxRows);
  for (const [idx, item] of items.entries()) {
    const isSelected = (idx === selectedIndex);
    const platRaw = item.platform || 'Platform';
    const platShort = platRaw.toLowerCase().includes('codeforces') ? 'CF' : platRaw.toLowerCase().includes('leetcode') ? 'LC' : 'CC';
    const platCol = platShort === 'CF' ? C.cyberCyan : platShort === 'LC' ? C.solarAmber : C.neonViolet;
    const platPrefix = isSelected ? '▶' : '';
    const plat = padCell(`${platCol}${platPrefix}${platShort}${C.reset}`, wPlat - 2);

    const id = padCell(`${C.cyan}${item.id || '-'}${C.reset}`, wId - 2);
    const title = padCell(`${isSelected ? C.cyberCyan + C.bold : C.bold}${item.name || '-'}${C.reset}`, wTitle - 2);

    const verdTrunc = truncateAnsiPreserving(item.initialVerdict || 'Failed', wVerd - 2);
    const verd = padCell(`${C.laserRed}${verdTrunc}${C.reset}`, wVerd - 2);

    const isHalted = item.status === 'HALTED_UNRESOLVED';
    const statRaw = isUltraNarrow ? (isHalted ? '■ HALT' : '▲ RET') : (isHalted ? '■ HALTED' : '▲ RETRY');
    const statCol = isHalted ? C.laserRed : C.solarAmber;
    const stat = padCell(`${statCol}${statRaw}${C.reset}`, wStat - 2);

    rows.push(
      `  ${C.slateDark}│${C.reset} ${plat} ${C.slateDark}│${C.reset} ${id} ${C.slateDark}│${C.reset} ${title} ${C.slateDark}│${C.reset} ${verd} ${C.slateDark}│${C.reset} ${stat} ${C.slateDark}│${C.reset}`
    );
  }

  if (dlqItems.length > maxRows) {
    const rem = dlqItems.length - maxRows;
    const moreTitle = padCell(`... and ${rem} more in DLQ radar`, wTitle - 2);
    rows.push(
      `  ${C.slateDark}│${C.reset} ${padCell('-', wPlat - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wId - 2)} ${C.slateDark}│${C.reset} ${C.textMuted}${moreTitle}${C.reset} ${C.slateDark}│${C.reset} ${padCell('-', wVerd - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wStat - 2)} ${C.slateDark}│${C.reset}`
    );
  }

  rows.push(lineBtm);
  return rows.join('\n');
}

function renderDashboardView(state, frame = 0, notificationBanner = null, termWidth = 92, termRows = 24, modals = {}) {
  const out = [];

  out.push(...renderHeader(state, '1', termWidth, frame, notificationBanner, modals));

  const innerW = termWidth - 4;

  if (modals.isFilterPromptOpen) {
    out.push(renderFilterPrompt(innerW, modals.filterInputBuffer, frame, modals.platformFilter, modals.verdictFilter));
    out.push('');
  }

  if (modals.isHelpOpen) {
    out.push(renderHelpModal(innerW, modals.tickerRate));
    out.push(renderFooter(state, '1', termWidth, modals));
    return out.join('\n');
  }

  if (modals.isInspectorOpen) {
    out.push(renderInspectorModal(state, innerW));
    out.push(renderFooter(state, '1', termWidth, modals));
    return out.join('\n');
  }

  // Gamified Cutie Mascot Card (Level, XP, Streak, Daily Quests & Speech Bubble)
  out.push(renderGamifiedHudCard(getProgressionData(), state, innerW, frame));
  out.push('');

  const totalProbs = state.problems.length || 30;
  const totalAcc = state.platforms.codeforces.accepted + state.platforms.leetcode.accepted + state.platforms.codechef.accepted;
  const dlqCount = state.dlq.filter((d) => d.status !== 'RESOLVED').length;
  const pendingCount = Math.max(0, totalProbs - totalAcc - dlqCount);

  const isCompact = termWidth < 82;
  const progressLine = isCompact
    ? `  ${C.textMuted}PROGRESS:${C.reset}  ${renderProgressBar(totalAcc, totalProbs, 10, C.neonGreen, frame)}  ${C.slateDark}│${C.reset}  ${C.neonGreen}${C.bold}✓ ${totalAcc}${C.reset}  ${C.slateDark}│${C.reset}  ${dlqCount > 0 ? C.laserRed + C.bold : C.textMuted}▲ ${dlqCount}${C.reset}  ${C.slateDark}│${C.reset}  ${pendingCount > 0 ? C.solarAmber : C.textMuted}◇ ${pendingCount}${C.reset}`
    : `  ${C.textMuted}CORE_PROGRESS:${C.reset}  ${renderProgressBar(totalAcc, totalProbs, 16, C.neonGreen, frame)}  ${C.slateDark}│${C.reset}  ` +
      `${C.neonGreen}${C.bold}✓ ${totalAcc} ACC${C.reset}  ${C.slateDark}│${C.reset}  ` +
      `${dlqCount > 0 ? C.laserRed + C.bold : C.textMuted}▲ ${dlqCount} DLQ${C.reset}  ${C.slateDark}│${C.reset}  ` +
      `${pendingCount > 0 ? C.solarAmber : C.textMuted}◇ ${pendingCount} PENDING${C.reset}`;

  out.push(truncateAnsiPreserving(progressLine, termWidth));
  out.push('');

  out.push(renderSideBySideCards(state, termWidth, frame));
  out.push('');

  const streamTop = renderBoxTop(`${C.steel}◈ RECENT TELEMETRY EVENTS ↓${C.reset}`, '', innerW);
  out.push(streamTop);

  const filteredEvents = filterEvents(state.streamEvents, modals.filterQuery, modals.platformFilter, modals.verdictFilter);
  const recent = filteredEvents.slice(-3);
  if (recent.length === 0) {
    out.push(renderBoxLine(`${C.textMuted}◇ No matching submissions recorded yet${C.reset}`, innerW));
  } else {
    for (const [idx, ev] of recent.entries()) {
      const isSelected = (idx === (modals.selectedIndex || 0));
      const cursor = isSelected ? `${C.cyberCyan}${C.bold}▶${C.reset} ` : '  ';
      const line = `${cursor}${formatStreamEvent(ev, innerW - 6)}`;
      out.push(renderBoxLine(line, innerW));
    }
  }
  out.push(renderBoxBtm(innerW));

  out.push(renderFooter(state, '1', termWidth, modals));
  return out.join('\n');
}

function renderStreamView(state, termWidth = 92, termRows = 24, notificationBanner = null, frame = 0, modals = {}) {
  const out = [];

  out.push(...renderHeader(state, '2', termWidth, frame, notificationBanner, modals));

  const innerW = termWidth - 4;
  const isCompact = innerW < 78;

  if (modals.isFilterPromptOpen) {
    out.push(renderFilterPrompt(innerW, modals.filterInputBuffer, frame, modals.platformFilter, modals.verdictFilter));
    out.push('');
  }

  if (modals.isHelpOpen) {
    out.push(renderHelpModal(innerW, modals.tickerRate));
    out.push(renderFooter(state, '2', termWidth, modals));
    return out.join('\n');
  }

  if (modals.isInspectorOpen) {
    out.push(renderInspectorModal(state, innerW));
    out.push(renderFooter(state, '2', termWidth, modals));
    return out.join('\n');
  }

  const isFiltered = Boolean(modals.filterQuery || modals.platformFilter || modals.verdictFilter);
  let title = isCompact
    ? `${C.cyberCyan}${C.bold}◈ TELEMETRY STREAM ↓${C.reset}`
    : `${C.cyberCyan}${C.bold}◈ CHRONOLOGICAL TELEMETRY STREAM ↓${C.reset}`;
  if (isFiltered) {
    title += ` ${C.solarAmber}[FILTERED]${C.reset}`;
  }
  const feedTop = renderBoxTop(title, '', innerW);
  out.push(feedTop);

  const maxEvents = Math.max(5, Math.min(18, (termRows || 24) - 12));
  const filteredEvents = filterEvents(state.streamEvents, modals.filterQuery, modals.platformFilter, modals.verdictFilter);
  const eventsToShow = filteredEvents.slice(-maxEvents);
  if (eventsToShow.length === 0) {
    out.push(renderBoxLine(`${C.textMuted}◇ No matching telemetry events captured${C.reset}`, innerW));
  } else {
    for (const [idx, ev] of eventsToShow.entries()) {
      const isSelected = (idx === (modals.selectedIndex || 0));
      const cursor = isSelected ? `${C.cyberCyan}${C.bold}▶${C.reset} ` : '  ';
      const line = `${cursor}${formatStreamEvent(ev, innerW - 6)}`;
      out.push(renderBoxLine(line, innerW));
    }
  }

  out.push(renderBoxBtm(innerW));
  out.push(renderFooter(state, '2', termWidth, modals));
  return out.join('\n');
}

function renderDlqView(state, termWidth = 92, termRows = 24, notificationBanner = null, frame = 0, modals = {}) {
  const out = [];

  out.push(...renderHeader(state, '3', termWidth, frame, notificationBanner, modals));

  const innerW = termWidth - 4;

  if (modals.isFilterPromptOpen) {
    out.push(renderFilterPrompt(innerW, modals.filterInputBuffer, frame, modals.platformFilter, modals.verdictFilter));
    out.push('');
  }

  if (modals.isHelpOpen) {
    out.push(renderHelpModal(innerW, modals.tickerRate));
    out.push(renderFooter(state, '3', termWidth, modals));
    return out.join('\n');
  }

  if (modals.isInspectorOpen) {
    out.push(renderInspectorModal(state, innerW));
    out.push(renderFooter(state, '3', termWidth, modals));
    return out.join('\n');
  }

  const activeDlq = state.dlq.filter((d) => d.status !== 'RESOLVED');
  const filteredDlq = activeDlq.filter((item) => {
    if (modals.platformFilter) {
      const p = (item.platform || '').toLowerCase();
      if (!p.includes(modals.platformFilter.toLowerCase())) return false;
    }
    if (modals.verdictFilter) {
      const isAcc = /accepted|correct/i.test(item.initialVerdict || '');
      if (modals.verdictFilter === 'accepted' && !isAcc) return false;
      if (modals.verdictFilter === 'failed' && isAcc) return false;
    }
    if (modals.filterQuery) {
      const q = modals.filterQuery.toLowerCase();
      const str = `${item.platform || ''} ${item.id || ''} ${item.name || ''} ${item.initialVerdict || ''}`.toLowerCase();
      if (!str.includes(q)) return false;
    }
    return true;
  });

  const isCompact = termWidth < 76;
  const statusLine = isCompact
    ? `  ${C.textMuted}RADAR:${C.reset}  ${
        activeDlq.length === 0
          ? `${C.bgGreenPill} ✓ ZERO ANOMALIES ${C.reset}`
          : `${C.bgRedPill} ▲ ${activeDlq.length} ANOMALY ACTIVE ${C.reset}`
      }`
    : `  ${C.textMuted}RADAR_STATUS:${C.reset}  ${
        activeDlq.length === 0
          ? `${C.bgGreenPill} ✓ DEFENSE CLEAR: ZERO ANOMALIES ${C.reset}`
          : `${C.bgRedPill} ▲ ANOMALY DETECTED: ${activeDlq.length} REPUTATION SHIELD ACTIVE ${C.reset}`
      }`;
  out.push(truncateAnsiPreserving(statusLine, termWidth));
  out.push('');

  if (activeDlq.length === 0) {
    out.push(`  ${C.neonGreen}✓ All clear! Platform queues are passing judge verification cleanly.${C.reset}`);
    out.push(`  ${C.textMuted}No submission halts or safety threshold triggers in this mission.${C.reset}`);
  } else if (filteredDlq.length === 0) {
    out.push(`  ${C.textMuted}◇ No anomalies matching active filter criteria.${C.reset}`);
  } else {
    const hint = isCompact
      ? `  ${C.solarAmber}⚡ [↑/↓] Select │ [c] Copy │ [d/Del] Dismiss │ [x] Auto-Pilot${C.reset}`
      : `  ${C.solarAmber}⚡ [↑/↓] Select │ [c] Copy ID │ [d/Del] Dismiss Anomaly │ [x] LLM Neural Repair${C.reset}`;
    out.push(truncateAnsiPreserving(hint, termWidth));
    out.push('');
    const maxRows = Math.max(4, Math.min(10, (termRows || 24) - 13));
    out.push(renderDlqTable(filteredDlq, maxRows, termWidth, modals.selectedIndex || 0));
  }

  out.push(renderFooter(state, '3', termWidth, modals));
  return out.join('\n');
}

function renderSubmissionsView(state, termWidth = 92, termRows = 24, notificationBanner = null, frame = 0, modals = {}) {
  const out = [];

  out.push(...renderHeader(state, '4', termWidth, frame, notificationBanner, modals));

  const innerW = termWidth - 4;

  if (modals.isFilterPromptOpen) {
    out.push(renderFilterPrompt(innerW, modals.filterInputBuffer, frame, modals.platformFilter, modals.verdictFilter));
    out.push('');
  }

  if (modals.isHelpOpen) {
    out.push(renderHelpModal(innerW, modals.tickerRate));
    out.push(renderFooter(state, '4', termWidth, modals));
    return out.join('\n');
  }

  if (modals.isInspectorOpen) {
    out.push(renderInspectorModal(state, innerW));
    out.push(renderFooter(state, '4', termWidth, modals));
    return out.join('\n');
  }

  const filteredSubs = filterSubmissions(state.submissions, modals.filterQuery, modals.platformFilter, modals.verdictFilter);
  const totalSubs = state.submissions.length;
  const accCount = state.submissions.filter((s) => /accepted|correct/i.test(s.verdict || '')).length;
  const failedCount = state.submissions.filter((s) => !/accepted|correct/i.test(s.verdict || '')).length;
  const accuracyPct = totalSubs > 0 ? ((accCount / totalSubs) * 100).toFixed(1) : '100.0';

  const isCompact = termWidth < 82;
  const isFiltered = Boolean(modals.filterQuery || modals.platformFilter);
  const teleLine = isCompact
    ? `  ${C.textMuted}METRICS:${C.reset}  ${C.bold}${filteredSubs.length}${isFiltered ? `/${totalSubs}` : ''} TOTAL${C.reset} │ ${C.neonGreen}✓ ${accCount} ACC${C.reset} │ ${failedCount > 0 ? C.laserRed : C.textMuted}✕ ${failedCount} FAIL${C.reset} │ ${C.cyberCyan}${accuracyPct}% ACC${C.reset}`
    : `  ${C.textMuted}TELEMETRY:${C.reset}  ` +
      `${C.bgDark} TOTAL: ${C.bold}${filteredSubs.length}${isFiltered ? `/${totalSubs}` : ''}${C.reset} ${C.bgDark} │ ` +
      `${C.neonGreen}✓ VERIFIED: ${accCount}${C.reset} ${C.bgDark} │ ` +
      `${failedCount > 0 ? C.laserRed : C.textMuted}✕ FAILED: ${failedCount}${C.reset} ${C.bgDark} │ ` +
      `${C.cyberCyan}ACCURACY: ${accuracyPct}%${C.reset} ${C.bgDark}${C.reset}`;

  out.push(truncateAnsiPreserving(teleLine, termWidth));
  out.push('');

  const isUltraNarrow = termWidth < 68;
  const isNarrow = termWidth < 78;
  const wNum = isUltraNarrow ? 3 : 4;
  const wPlat = isUltraNarrow ? 5 : 6;
  const wId = isUltraNarrow ? 6 : 8;
  const wVerd = isUltraNarrow ? 10 : 14;
  const wTime = isNarrow ? 0 : 8;
  const wSub = isUltraNarrow ? 9 : 12;
  const fixedOverhead = isNarrow ? (2 + 2 + 5) : (2 + 2 + 6);
  const fixedCols = wNum + wPlat + wId + wVerd + wTime + wSub;
  const wTitle = Math.max(6, termWidth - (fixedOverhead + fixedCols));

  let lineTop, lineHdr, lineMid, lineBtm;
  if (isNarrow) {
    lineTop = `  ${C.slateDark}╭${'─'.repeat(wNum)}┬${'─'.repeat(wPlat)}┬${'─'.repeat(wId)}┬${'─'.repeat(wTitle)}┬${'─'.repeat(wVerd)}┬${'─'.repeat(wSub)}╮${C.reset}`;
    lineHdr = `  ${C.slateDark}│${C.reset} ${C.steel}${padCell('#', wNum - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('PLAT', wPlat - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('TASK_ID', wId - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('PROBLEM TITLE', wTitle - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('STATUS', wVerd - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('TIMESTAMP', wSub - 2)}${C.reset} ${C.slateDark}│${C.reset}`;
    lineMid = `  ${C.slateDark}├${'─'.repeat(wNum)}┼${'─'.repeat(wPlat)}┼${'─'.repeat(wId)}┼${'─'.repeat(wTitle)}┼${'─'.repeat(wVerd)}┼${'─'.repeat(wSub)}┤${C.reset}`;
    lineBtm = `  ${C.slateDark}╰${'─'.repeat(wNum)}┴${'─'.repeat(wPlat)}┴${'─'.repeat(wId)}┴${'─'.repeat(wTitle)}┴${'─'.repeat(wVerd)}┴${'─'.repeat(wSub)}╯${C.reset}`;
  } else {
    lineTop = `  ${C.slateDark}╭${'─'.repeat(wNum)}┬${'─'.repeat(wPlat)}┬${'─'.repeat(wId)}┬${'─'.repeat(wTitle)}┬${'─'.repeat(wVerd)}┬${'─'.repeat(wTime)}┬${'─'.repeat(wSub)}╮${C.reset}`;
    lineHdr = `  ${C.slateDark}│${C.reset} ${C.steel}${padCell('#', wNum - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('PLAT', wPlat - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('TASK_ID', wId - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('PROBLEM TITLE', wTitle - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('STATUS', wVerd - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('LATENCY', wTime - 2)}${C.reset} ${C.slateDark}│${C.reset} ${C.steel}${padCell('TIMESTAMP', wSub - 2)}${C.reset} ${C.slateDark}│${C.reset}`;
    lineMid = `  ${C.slateDark}├${'─'.repeat(wNum)}┼${'─'.repeat(wPlat)}┼${'─'.repeat(wId)}┼${'─'.repeat(wTitle)}┼${'─'.repeat(wVerd)}┼${'─'.repeat(wTime)}┼${'─'.repeat(wSub)}┤${C.reset}`;
    lineBtm = `  ${C.slateDark}╰${'─'.repeat(wNum)}┴${'─'.repeat(wPlat)}┴${'─'.repeat(wId)}┴${'─'.repeat(wTitle)}┴${'─'.repeat(wVerd)}┴${'─'.repeat(wTime)}┴${'─'.repeat(wSub)}╯${C.reset}`;
  }

  out.push(lineTop);
  out.push(lineHdr);
  out.push(lineMid);

  const maxRows = Math.max(5, Math.min(12, (termRows || 24) - 12));
  const items = filteredSubs.slice(0, maxRows);

  if (items.length === 0) {
    const emptyNotice = padCell(isFiltered ? 'No submissions match filter criteria' : 'No verified submissions recorded yet for today\'s mission', wTitle - 2);
    if (isNarrow) {
      out.push(
        `  ${C.slateDark}│${C.reset} ${padCell('-', wNum - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wPlat - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wId - 2)} ${C.slateDark}│${C.reset} ${C.textMuted}${emptyNotice}${C.reset} ${C.slateDark}│${C.reset} ${padCell('-', wVerd - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wSub - 2)} ${C.slateDark}│${C.reset}`
      );
    } else {
      out.push(
        `  ${C.slateDark}│${C.reset} ${padCell('-', wNum - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wPlat - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wId - 2)} ${C.slateDark}│${C.reset} ${C.textMuted}${emptyNotice}${C.reset} ${C.slateDark}│${C.reset} ${padCell('-', wVerd - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wTime - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wSub - 2)} ${C.slateDark}│${C.reset}`
      );
    }
  } else {
    for (const [idx, s] of items.entries()) {
      const isSelected = (idx === (modals.selectedIndex || 0));
      const isAcc = /accepted|correct/i.test(s.verdict || '');
      const num = isSelected
        ? `${C.cyberCyan}${C.bold}▶${padCell(String(idx + 1), wNum - 3)}${C.reset}`
        : `${C.textMuted}${padCell(String(idx + 1), wNum - 2)}${C.reset}`;

      const platRaw = (s.platform || '').toLowerCase();
      const platShort = platRaw.includes('codeforces') ? 'CF' : platRaw.includes('leetcode') ? 'LC' : 'CC';
      const platCol = platShort === 'CF' ? C.cyberCyan : platShort === 'LC' ? C.solarAmber : C.neonViolet;
      const plat = padCell(`${platCol}${platShort}${C.reset}`, wPlat - 2);

      const id = padCell(`${C.cyan}${s.id || s.problemId || '-'}${C.reset}`, wId - 2);
      const title = padCell(`${isSelected ? C.cyberCyan + C.bold : C.bold}${s.name || s.file || '-'}${C.reset}`, wTitle - 2);

      let verd = '';
      if (isAcc) {
        verd = padCell(`${C.neonGreen}${C.bold}✓ ACCEPTED${C.reset}`, wVerd - 2);
      } else {
        const truncated = truncateAnsiPreserving(s.verdict || 'REJECTED', wVerd - 4);
        verd = padCell(`${C.laserRed}${C.bold}✕ ${truncated}${C.reset}`, wVerd - 2);
      }

      const judgeTime = isNarrow ? '' : padCell(`${C.textMuted}${s.time || '-'}${C.reset}`, wTime - 2);
      const ts = padCell(`${C.textMuted}${formatTimeOnly(s.timestamp)}${C.reset}`, wSub - 2);

      if (isNarrow) {
        out.push(
          `  ${C.slateDark}│${C.reset} ${num} ${C.slateDark}│${C.reset} ${plat} ${C.slateDark}│${C.reset} ${id} ${C.slateDark}│${C.reset} ${title} ${C.slateDark}│${C.reset} ${verd} ${C.slateDark}│${C.reset} ${ts} ${C.slateDark}│${C.reset}`
        );
      } else {
        out.push(
          `  ${C.slateDark}│${C.reset} ${num} ${C.slateDark}│${C.reset} ${plat} ${C.slateDark}│${C.reset} ${id} ${C.slateDark}│${C.reset} ${title} ${C.slateDark}│${C.reset} ${verd} ${C.slateDark}│${C.reset} ${judgeTime} ${C.slateDark}│${C.reset} ${ts} ${C.slateDark}│${C.reset}`
        );
      }
    }
  }

  if (filteredSubs.length > maxRows) {
    const rem = filteredSubs.length - maxRows;
    const moreTitle = padCell(`... and ${rem} more telemetry records`, wTitle - 2);
    if (isNarrow) {
      out.push(
        `  ${C.slateDark}│${C.reset} ${padCell('-', wNum - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wPlat - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wId - 2)} ${C.slateDark}│${C.reset} ${C.textMuted}${moreTitle}${C.reset} ${C.slateDark}│${C.reset} ${padCell('-', wVerd - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wSub - 2)} ${C.slateDark}│${C.reset}`
      );
    } else {
      out.push(
        `  ${C.slateDark}│${C.reset} ${padCell('-', wNum - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wPlat - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wId - 2)} ${C.slateDark}│${C.reset} ${C.textMuted}${moreTitle}${C.reset} ${C.slateDark}│${C.reset} ${padCell('-', wVerd - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wTime - 2)} ${C.slateDark}│${C.reset} ${padCell('-', wSub - 2)} ${C.slateDark}│${C.reset}`
      );
    }
  }

  out.push(lineBtm);
  out.push(renderFooter(state, '4', termWidth, modals));

  return out.join('\n');
}

// -----------------------------------------------------------------------------
// PURE DOWNWARD STREAM MODE (tail -f style, zero screen clears)
// -----------------------------------------------------------------------------
function runStreamMode(targetDate) {
  console.log(`\n${C.bold}${C.cyan}╔═══════════════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}${C.cyan}║  ⚡ AlgoPulse Live Downward Stream Monitor [Date: ${targetDate}]      ║${C.reset}`);
  console.log(`${C.bold}${C.cyan}╚═══════════════════════════════════════════════════════════════════╝${C.reset}`);
  console.log(`${C.dim}Events strictly append downwards in chronological order. Press Ctrl+C to stop.${C.reset}\n`);

  const printedHashes = new Set();
  let initialReplayDone = false;

  function poll() {
    const state = loadMissionState(targetDate);

    for (const ev of state.streamEvents) {
      const hash = `${ev.timeStr}-${ev.platform}-${ev.title || ''}-${ev.verdict || ''}`;
      if (!printedHashes.has(hash)) {
        printedHashes.add(hash);
        console.log(formatStreamEvent(ev, 90));
      }
    }

    if (!initialReplayDone) {
      initialReplayDone = true;
      if (!state.isRunning) {
        console.log(`\n${C.green}───────────────────────────────────────────────────────────────────${C.reset}`);
        console.log(
          `${C.bold}🏁 Session Finished!${C.reset}  ` +
            `Total Runtime: ${C.yellow}${C.bold}${formatDuration(state.elapsedMs)}${C.reset}  ` +
            `(${formatTimeOnly(state.sessionStart)} → ${formatTimeOnly(state.sessionEnd)})`
        );
        const totalAcc = state.platforms.codeforces.accepted + state.platforms.leetcode.accepted + state.platforms.codechef.accepted;
        console.log(
          `   Scoreboard: ${C.green}✓ ${totalAcc}/${state.problems.length} Accepted${C.reset}  │  ` +
            `${state.dlq.length > 0 ? C.red + '⚠️ ' + state.dlq.length + ' in DLQ' : C.green + '✓ 0 Failures'}${C.reset}`
        );
        console.log(`${C.green}───────────────────────────────────────────────────────────────────${C.reset}\n`);
      }
    }
  }

  poll();
  const timer = setInterval(poll, 1500);

  process.on('SIGINT', () => {
    clearInterval(timer);
    console.log(`\n${C.dim}[stream] Exited cleanly.${C.reset}`);
    process.exit(0);
  });
}

// -----------------------------------------------------------------------------
// MAIN ENTRYPOINT
// -----------------------------------------------------------------------------
async function run() {
  const targetDate = getTargetDate();

  // CLI Flag 1: Help manual
  if (isHelp) {
    printHelp();
    process.exit(0);
  }

  // CLI Flag 2: Dump full state JSON
  if (isJson) {
    const state = loadMissionState(targetDate);
    console.log(JSON.stringify(state, null, 2));
    process.exit(0);
  }

  // CLI Flag 3: Export session markdown report
  if (isExport) {
    const state = loadMissionState(targetDate);
    const reportPath = exportSessionReport(targetDate, state);
    console.log(`\n${C.neonGreen}✓ AlgoPulse Session Report exported:${C.reset} ${reportPath}\n`);
    process.exit(0);
  }

  // One-shot mode: snapshot and exit
  if (isOnce) {
    const termCols = process.stdout.columns || 80;
    const termRows = process.stdout.rows || 24;
    const termWidth = Math.max(50, Math.min(92, termCols - 6));

    const state = loadMissionState(targetDate);
    const modals = {
      isHelpOpen: false,
      isInspectorOpen: false,
      isFilterPromptOpen: false,
      filterQuery: cliFilter || '',
      filterInputBuffer: '',
      platformFilter: cliPlatform || null,
      verdictFilter: cliVerdict || null,
      bellEnabled: cliBell,
      tickerRate: cliRate || 800,
      selectedIndex: 0,
      mouseTrackingEnabled: false,
    };

    if (initialTab === '2') console.log(renderStreamView(state, termWidth, termRows, null, 0, modals));
    else if (initialTab === '3') console.log(renderDlqView(state, termWidth, termRows, null, 0, modals));
    else if (initialTab === '4') console.log(renderSubmissionsView(state, termWidth, termRows, null, 0, modals));
    else console.log(renderDashboardView(state, 0, null, termWidth, termRows, modals));
    process.exit(0);
  }

  // Stream mode: pure downward flowing log
  if (isStreamMode) {
    runStreamMode(targetDate);
    return;
  }

  // Fullscreen Interactive TUI Dashboard Mode
  let currentTab = initialTab;
  let frame = 0;
  let notificationBanner = null;
  let bannerTimer = null;

  let isHelpOpen = false;
  let isInspectorOpen = false;
  let isFilterPromptOpen = false;
  let filterQuery = cliFilter || '';
  let filterInputBuffer = '';
  let platformFilter = cliPlatform || null;
  let verdictFilter = cliVerdict || null;
  let bellEnabled = cliBell;
  let tickerRate = Math.max(200, Math.min(4000, cliRate || 800));
  let tickerTimer = null;
  let lastSeenEventCount = 0;
  let selectedIndex = 0;
  let mouseTrackingEnabled = true;

  function getModalsState() {
    return {
      isHelpOpen,
      isInspectorOpen,
      isFilterPromptOpen,
      filterQuery,
      filterInputBuffer,
      platformFilter,
      verdictFilter,
      bellEnabled,
      tickerRate,
      selectedIndex,
      mouseTrackingEnabled,
    };
  }

  function autoCopySelection() {
    const state = loadMissionState(targetDate);
    const copied = triggerCopyAction(state, currentTab, selectedIndex, targetDate, getModalsState());
    if (copied) {
      setBanner(`${C.neonGreen}📋 Auto-Copied: "${copied}"${C.reset}`, 2500);
    }
  }

  function setMouseTracking(enable) {
    mouseTrackingEnabled = enable;
    if (process.stdout.isTTY) {
      if (enable) {
        process.stdout.write('\x1b[?1000h\x1b[?1002h\x1b[?1006h');
      } else {
        process.stdout.write('\x1b[?1006l\x1b[?1002l\x1b[?1000l');
      }
    }
  }

  function setBanner(msg, durationMs = 5000) {
    notificationBanner = msg;
    if (bannerTimer) clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => {
      notificationBanner = null;
      draw();
    }, durationMs);
    draw();
  }

  function switchTab(newTab) {
    if (currentTab !== newTab) {
      currentTab = newTab;
      selectedIndex = 0;
      if (process.stdout.isTTY) {
        process.stdout.write(`${C.eraseScreen}${C.home}`);
      }
      draw();
    }
  }

  const tabsList = ['1', '2', '3', '4'];
  function cycleTab(direction = 1) {
    const curIdx = tabsList.indexOf(currentTab);
    const nextIdx = (curIdx + direction + tabsList.length) % tabsList.length;
    switchTab(tabsList[nextIdx]);
  }

  function togglePlayPause() {
    const isPaused = fs.existsSync(PAUSE_FILE);

    if (isPaused) {
      try {
        fs.unlinkSync(PAUSE_FILE);
      } catch {}
      setBanner(`${C.green}${C.bold}▶ Play: Resumed submission runner! Cooldown & queue active.${C.reset}`);
      draw();
      return;
    }

    const logPath = findRunnerLog(targetDate);
    if (isRunnerActive(logPath)) {
      try {
        fs.writeFileSync(PAUSE_FILE, JSON.stringify({ pausedAt: new Date().toISOString() }), 'utf-8');
      } catch {}
      setBanner(`${C.yellow}${C.bold}⏸ Pause: Paused active runner! Cooldown & submissions frozen.${C.reset}`);
      draw();
    } else {
      launchPendingRunner();
    }
  }

  function launchPendingRunner() {
    try {
      const dayDir = path.join(DAYS_DIR, targetDate);
      const dayLog = path.join(dayDir, 'live.log');
      const outFd = fs.openSync(dayLog, 'a');

      const child = require('child_process').spawn(
        process.execPath,
        [path.join(__dirname, 'playwright', 'submit.js'), '--date', targetDate],
        {
          cwd: REPO_ROOT,
          detached: true,
          stdio: ['ignore', outFd, outFd],
        }
      );
      child.unref();
      setBanner(`${C.green}${C.bold}🚀 Play: Dispatched submission runner for ${targetDate}!${C.reset}`);
    } catch (err) {
      setBanner(`${C.red}✗ Failed to start runner: ${err.message}${C.reset}`);
    }
  }

  function launchRetryRunner() {
    const logPath = findRunnerLog(targetDate);
    if (isRunnerActive(logPath)) {
      setBanner(`${C.yellow}⚠️ Submission runner is already actively executing! Please wait for it to complete.${C.reset}`);
      return;
    }

    try {
      const dayDir = path.join(DAYS_DIR, targetDate);
      const dayLog = path.join(dayDir, 'live.log');
      const outFd = fs.openSync(dayLog, 'a');

      const child = require('child_process').spawn(
        process.execPath,
        [path.join(__dirname, 'playwright', 'submit.js'), '--date', targetDate, '--failed-only'],
        {
          cwd: REPO_ROOT,
          detached: true,
          stdio: ['ignore', outFd, outFd],
        }
      );
      child.unref();
      setBanner(`${C.green}${C.bold}🚀 Auto-Pilot Dispatched! Retrying DLQ problems with live feedback...${C.reset}`);
    } catch (err) {
      setBanner(`${C.red}✗ Failed to start retry runner: ${err.message}${C.reset}`);
    }
  }

  function resetTicker() {
    if (tickerTimer) clearInterval(tickerTimer);
    tickerTimer = setInterval(() => {
      frame++;
      draw();
    }, tickerRate);
  }

  // Cleanup handler
  function cleanupAndExit() {
    if (bannerTimer) clearTimeout(bannerTimer);
    if (tickerTimer) clearInterval(tickerTimer);
    if (process.stdout.isTTY) {
      process.stdout.write(`\x1b[?1006l\x1b[?1002l\x1b[?1000l${C.showCursor}${C.altScreenOff}`);
    }
    process.exit(0);
  }

  process.on('SIGINT', cleanupAndExit);
  process.on('SIGTERM', cleanupAndExit);

  // Setup Alternate Screen Buffer & Extended SGR Mouse Tracking
  if (process.stdout.isTTY) {
    process.stdout.write(`${C.altScreenOn}${C.hideCursor}`);
    setMouseTracking(true);
  }

  // Setup Raw Keyboard & Mouse Input
  if (process.stdin.isTTY) {
    try {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf-8');
      process.stdin.on('data', (key) => {
        // 0. Extended SGR Mouse Tracking Intercept
        const mouseEv = parseMouseEvent(key);
        if (mouseEv) {
          const { button, col, row, isRelease } = mouseEv;
          if (button === 64) {
            // Scroll wheel up -> select previous row & auto-copy
            selectedIndex = Math.max(0, selectedIndex - 1);
            autoCopySelection();
            draw();
            return;
          }
          if (button === 65) {
            // Scroll wheel down -> select next row & auto-copy
            selectedIndex++;
            autoCopySelection();
            draw();
            return;
          }
          if (button === 2 && !isRelease) {
            // Right-click: Copy selected item or clicked row
            if (row >= 10 && row <= 25) {
              selectedIndex = Math.max(0, row - 12);
            }
            autoCopySelection();
            draw();
            return;
          }
          if (button === 0 && !isRelease) {
            // Left-click
            // Tab Bar row (row 5)
            if (row >= 4 && row <= 6) {
              if (col < 28) switchTab('1');
              else if (col < 48) switchTab('2');
              else if (col < 68) switchTab('3');
              else switchTab('4');
              return;
            }
            // Table / Data rows -> Select & Auto-Copy immediately
            if (row >= 10 && row <= 25) {
              selectedIndex = Math.max(0, row - 12);
              autoCopySelection();
              draw();
              return;
            }
            // Command Deck at bottom
            const termRows = process.stdout.rows || 24;
            if (row >= termRows - 3) {
              if (col < 16) togglePlayPause();
              else if (col < 30) launchRetryRunner();
              else if (col < 44) {
                isFilterPromptOpen = true;
                filterInputBuffer = filterQuery;
                draw();
              } else if (col < 56) {
                autoCopySelection();
                draw();
              } else if (col < 70) {
                setMouseTracking(!mouseTrackingEnabled);
                setBanner(mouseTrackingEnabled ? `${C.neonGreen}🖱️ Mouse Mode: ON (Extended SGR clicks enabled)${C.reset}` : `${C.solarAmber}🖱️ Mouse Mode: OFF (Raw text drag-selection enabled)${C.reset}`, 2500);
                draw();
              } else if (col < 80) {
                isHelpOpen = !isHelpOpen;
                draw();
              } else {
                cleanupAndExit();
              }
              return;
            }
          }
          return;
        }

        // 1. Live Filter Input Buffer Mode
        if (isFilterPromptOpen) {
          if (key === '\r' || key === '\n') {
            filterQuery = filterInputBuffer.trim();
            isFilterPromptOpen = false;
            if (process.stdout.isTTY) process.stdout.write(`${C.eraseScreen}${C.home}`);
            setBanner(filterQuery ? `${C.solarAmber}◈ Filter Applied: "${filterQuery}"${C.reset}` : `${C.neonGreen}◈ Search query cleared${C.reset}`, 2500);
            draw();
            return;
          }
          if (key === '\u001b') {
            isFilterPromptOpen = false;
            filterInputBuffer = '';
            if (process.stdout.isTTY) process.stdout.write(`${C.eraseScreen}${C.home}`);
            draw();
            return;
          }
          if (key === '\t' || key === '\x1b[Z') {
            // Cycle preset hooks: ALL -> CF -> LC -> CC -> FAIL -> AC -> ALL
            if (!platformFilter && !verdictFilter) {
              platformFilter = 'codeforces';
              verdictFilter = null;
            } else if (platformFilter === 'codeforces') {
              platformFilter = 'leetcode';
              verdictFilter = null;
            } else if (platformFilter === 'leetcode') {
              platformFilter = 'codechef';
              verdictFilter = null;
            } else if (platformFilter === 'codechef') {
              platformFilter = null;
              verdictFilter = 'failed';
            } else if (verdictFilter === 'failed') {
              platformFilter = null;
              verdictFilter = 'accepted';
            } else {
              platformFilter = null;
              verdictFilter = null;
            }
            draw();
            return;
          }
          if (key === '\u0008' || key === '\x7f' || key === '\x1b[3~') {
            filterInputBuffer = filterInputBuffer.slice(0, -1);
            draw();
            return;
          }
          if (key === '\u0003') {
            cleanupAndExit();
            return;
          }
          if (key.length === 1 && key.charCodeAt(0) >= 32) {
            filterInputBuffer += key;
            draw();
            return;
          }
          return;
        }

        // 2. Modal Overlay Open (Help or DLQ Inspector)
        if (isHelpOpen || isInspectorOpen) {
          if (key === '\u001b' || key === 'q' || key === 'Q' || key === '?' || key === 'h' || key === 'H' || key === 'i' || key === 'I') {
            isHelpOpen = false;
            isInspectorOpen = false;
            if (process.stdout.isTTY) process.stdout.write(`${C.eraseScreen}${C.home}`);
            draw();
            return;
          }
          if (key === '\u0003') {
            cleanupAndExit();
            return;
          }
          return;
        }

        // 3. Normal Dashboard Hotkeys
        if (key === 'q' || key === 'Q' || key === '\u0003') {
          cleanupAndExit();
        } else if (key === '1') {
          switchTab('1');
        } else if (key === '2' || key === 's' || key === 'S') {
          switchTab('2');
        } else if (key === '3') {
          switchTab('3');
        } else if (key === '4' || key === 't' || key === 'T') {
          switchTab('4');
        } else if (key === '\x1b[C') {
          cycleTab(1);
        } else if (key === '\x1b[D') {
          cycleTab(-1);
        } else if (key === '\t') {
          cycleTab(1);
        } else if (key === '\x1b[Z') {
          cycleTab(-1);
        } else if (key === '\x1b[A' || key === 'k' || key === 'K') {
          selectedIndex = Math.max(0, selectedIndex - 1);
          autoCopySelection();
          draw();
        } else if (key === '\x1b[B' || key === 'j' || key === 'J') {
          selectedIndex++;
          autoCopySelection();
          draw();
        } else if (key === 'c' || key === 'C' || key === 'y' || key === 'Y') {
          autoCopySelection();
          draw();
        } else if (key === 'd' || key === 'D' || key === '\x1b[3~' || key === '\x1b[3;2~') {
          if (currentTab === '3') {
            const state = loadMissionState(targetDate);
            const dismissed = dismissSelectedDlq(state, targetDate, selectedIndex, getModalsState());
            if (dismissed) {
              setBanner(`${C.neonGreen}✓ Dismissed DLQ Anomaly: ${dismissed.name || dismissed.id || 'Task'}${C.reset}`, 3000);
            } else {
              setBanner(`${C.textMuted}◇ No active DLQ anomaly to dismiss${C.reset}`, 2000);
            }
            draw();
          } else if (filterQuery || platformFilter || verdictFilter) {
            filterQuery = '';
            platformFilter = null;
            verdictFilter = null;
            setBanner(`${C.neonGreen}◈ Cleared search, platform & verdict filters${C.reset}`, 2000);
            draw();
          } else {
            switchTab('3');
          }
        } else if (key === 'm' || key === 'M') {
          setMouseTracking(!mouseTrackingEnabled);
          setBanner(mouseTrackingEnabled ? `${C.neonGreen}🖱️ Mouse Mode: ON (Extended SGR clicks enabled)${C.reset}` : `${C.solarAmber}🖱️ Mouse Mode: OFF (Raw text drag-selection enabled)${C.reset}`, 2500);
          draw();
        } else if (key === '/') {
          isFilterPromptOpen = true;
          filterInputBuffer = filterQuery;
          draw();
        } else if (key === '?' || key === 'h' || key === 'H') {
          isHelpOpen = !isHelpOpen;
          draw();
        } else if (key === 'i' || key === 'I') {
          isInspectorOpen = true;
          draw();
        } else if (key === 'v' || key === 'V') {
          if (!verdictFilter) verdictFilter = 'accepted';
          else if (verdictFilter === 'accepted') verdictFilter = 'failed';
          else verdictFilter = null;
          setBanner(`${C.solarAmber}◈ Verdict Filter: ${verdictFilter ? verdictFilter.toUpperCase() : 'ALL VERDICTS'}${C.reset}`, 2500);
          draw();
        } else if (key === 'p' || key === 'P') {
          if (!platformFilter) platformFilter = 'codeforces';
          else if (platformFilter === 'codeforces') platformFilter = 'leetcode';
          else if (platformFilter === 'leetcode') platformFilter = 'codechef';
          else platformFilter = null;
          setBanner(`${C.cyberCyan}◈ Platform Filter: ${platformFilter ? platformFilter.toUpperCase() : 'ALL PLATFORMS'}${C.reset}`, 2500);
          draw();
        } else if (key === 'f' || key === 'F') {
          platformFilter = 'codeforces';
          setBanner(`${C.cyberCyan}◈ Filter locked to CODEFORCES${C.reset}`, 2500);
          draw();
        } else if (key === 'l' || key === 'L') {
          platformFilter = 'leetcode';
          setBanner(`${C.solarAmber}◈ Filter locked to LEETCODE${C.reset}`, 2500);
          draw();
        } else if (key === 'a' || key === 'A') {
          platformFilter = null;
          verdictFilter = null;
          filterQuery = '';
          setBanner(`${C.neonGreen}◈ Cleared all platform, verdict & query filters${C.reset}`, 2500);
          draw();
        } else if (key === 'b' || key === 'B') {
          bellEnabled = !bellEnabled;
          setBanner(bellEnabled ? `${C.neonGreen}🔔 Terminal Audio Bell: ENABLED${C.reset}` : `${C.textMuted}🔕 Terminal Audio Bell: MUTED${C.reset}`, 2500);
          draw();
        } else if (key === '+' || key === '=') {
          tickerRate = Math.max(200, tickerRate - 200);
          resetTicker();
          setBanner(`${C.steel}⚡ Ticker Speed Increased (${tickerRate}ms)${C.reset}`, 2000);
          draw();
        } else if (key === '-' || key === '_') {
          tickerRate = Math.min(4000, tickerRate + 200);
          resetTicker();
          setBanner(`${C.steel}⚡ Ticker Speed Decreased (${tickerRate}ms)${C.reset}`, 2000);
          draw();
        } else if (key === 'e' || key === 'E') {
          try {
            const state = loadMissionState(targetDate);
            const reportFile = exportSessionReport(targetDate, state);
            setBanner(`${C.neonGreen}📄 Exported Report: ${path.basename(reportFile)}${C.reset}`, 4000);
          } catch (err) {
            setBanner(`${C.laserRed}✗ Failed to export report: ${err.message}${C.reset}`, 3000);
          }
          draw();
        } else if (key === ' ') {
          togglePlayPause();
        } else if (key === 'x' || key === 'X') {
          launchRetryRunner();
        } else if (key === 'r' || key === 'R') {
          frame++;
          if (process.stdout.isTTY) {
            process.stdout.write(`${C.eraseScreen}${C.home}`);
          }
          draw();
        }
      });
    } catch {}
  }

  // Handle Terminal Window Resize
  if (process.stdout.on) {
    try {
      process.stdout.on('resize', () => {
        if (process.stdout.isTTY) {
          process.stdout.write(`${C.eraseScreen}${C.home}`);
        }
        draw();
      });
    } catch {}
  }

  function draw() {
    try {
      const termCols = process.stdout.columns || 80;
      const termRows = process.stdout.rows || 24;
      const termWidth = Math.max(50, Math.min(92, termCols - 6));

      const state = loadMissionState(targetDate);
      const modals = getModalsState();

      // Trigger audible terminal bell on new telemetry event
      if (bellEnabled && lastSeenEventCount > 0 && state.streamEvents.length > lastSeenEventCount) {
        process.stdout.write('\x07');
      }
      lastSeenEventCount = state.streamEvents.length;

      let content = '';
      if (currentTab === '1') content = renderDashboardView(state, frame, notificationBanner, termWidth, termRows, modals);
      else if (currentTab === '2') content = renderStreamView(state, termWidth, termRows, notificationBanner, frame, modals);
      else if (currentTab === '3') content = renderDlqView(state, termWidth, termRows, notificationBanner, frame, modals);
      else if (currentTab === '4') content = renderSubmissionsView(state, termWidth, termRows, notificationBanner, frame, modals);

      const rawLines = content.split(/\r?\n/);
      const cleanOutput = rawLines.map((line) => line + C.eraseLine).join('\n');

      process.stdout.write(`${C.home}${cleanOutput}\n${C.eraseDown}`);
    } catch (err) {
      process.stdout.write(`\rError updating monitor: ${err.message}`);
    }
  }

  draw();
  resetTicker();
}

module.exports = {
  loadMissionState,
  renderDashboardView,
  renderStreamView,
  renderDlqView,
  renderSubmissionsView,
  runStreamMode,
  formatDuration,
  formatTimeOnly,
  exportSessionReport,
  filterEvents,
  filterSubmissions,
  triggerCopyAction,
  dismissSelectedDlq,
  printHelp,
};

if (require.main === module) {
  run().catch((err) => {
    if (process.stdout.isTTY) {
      process.stdout.write(`\x1b[?1006l\x1b[?1002l\x1b[?1000l${C.showCursor}${C.altScreenOff}`);
    }
    console.error('Monitor fatal error:', err);
    process.exit(1);
  });
}


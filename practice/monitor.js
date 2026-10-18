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

const REPO_ROOT = path.resolve(__dirname, '..');
const DAYS_DIR = path.join(REPO_ROOT, 'practice', 'days');
const PAUSE_FILE = path.join(REPO_ROOT, 'practice', '.pause');

// ANSI Color Palette
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgDark: '\x1b[48;5;236m',
  bgGray: '\x1b[48;5;238m',
  home: '\x1b[H',
  eraseDown: '\x1b[J',
  eraseLine: '\x1b[K',
  altScreenOn: '\x1b[?1049h',
  altScreenOff: '\x1b[?1049l',
  hideCursor: '\x1b[?25l',
  showCursor: '\x1b[?25h',
};

// Strip ANSI color sequences for accurate visual length calculations
function stripAnsi(str) {
  return String(str || '').replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '');
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

function truncateAnsi(str, maxLen) {
  str = String(str || '');
  const plain = stripAnsi(str);
  if (plain.length <= maxLen) return str;
  return plain.slice(0, Math.max(0, maxLen - 1)) + '…';
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

// CLI Arguments
const args = process.argv.slice(2);
const isOnce = args.includes('--once') || args.includes('-o');
const isStreamMode = args.includes('--stream') || args.includes('-s');
const isDlqTab = args.includes('--dlq') || args.includes('-d');
const isSubmissionsTab = args.includes('--submissions') || args.includes('-t');
const dateArgIdx = args.indexOf('--date');
const customDate = dateArgIdx !== -1 ? args[dateArgIdx + 1] : null;

// Determine initial tab
let initialTab = '1';
if (isDlqTab) initialTab = '3';
else if (isSubmissionsTab) initialTab = '4';
else if (args.includes('--stream-view')) initialTab = '2';

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

  const globalLog = path.join(REPO_ROOT, 'practice', 'live.log');
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

function renderProgressBar(current, total, width = 20, filledColor = C.cyan) {
  if (total <= 0) return `[${'░'.repeat(width)}] 0%`;
  const pct = Math.min(1, Math.max(0, current / total));
  const filled = Math.round(pct * width);
  const empty = width - filled;
  return `${filledColor}[${'█'.repeat(filled)}${C.dim}${'░'.repeat(empty)}${C.reset}${filledColor}] ${Math.round(pct * 100)}%${C.reset}`;
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
    const platCol = plat.toLowerCase().includes('codeforces') ? C.cyan : plat.toLowerCase().includes('leetcode') ? C.yellow : C.magenta;
    const verdCol = isAcc ? C.green : C.red;
    const icon = isAcc ? '✓' : '✗';
    const judgeTime = s.time ? ` (${s.time})` : '';

    streamEvents.push({
      timestamp: ts,
      timeStr: timeFormatted,
      platform: plat,
      title: s.name || s.id,
      id: s.id,
      verdict: s.verdict || (isAcc ? 'Accepted' : 'Failed'),
      judgeTime: s.time || '',
      icon,
      formattedText: `[${C.dim}${timeFormatted}${C.reset}] ${verdCol}${icon}${C.reset} ${platCol}[${padEndAnsi(plat, 10)}]${C.reset} ${C.bold}${s.name || s.id}${C.reset} (${s.id}) -> ${verdCol}${s.verdict}${C.reset}${C.dim}${judgeTime}${C.reset}`,
    });
  }

  // 2. Add DLQ enqueues and halts with their recorded timestamps
  for (const d of dlq) {
    const plat = d.platform || 'Platform';
    const platCol = plat.toLowerCase().includes('codeforces') ? C.cyan : plat.toLowerCase().includes('leetcode') ? C.yellow : C.magenta;
    const enqTs = d.enqueuedAt ? new Date(d.enqueuedAt).getTime() : (sessionStart ? sessionStart + 30000 : now);
    const enqTimeStr = formatTimeOnly(d.enqueuedAt || sessionStart);

    streamEvents.push({
      timestamp: enqTs,
      timeStr: enqTimeStr,
      platform: plat,
      title: d.name || d.id,
      id: d.id,
      verdict: d.initialVerdict || 'Failed',
      icon: '⚠️',
      formattedText: `[${C.dim}${enqTimeStr}${C.reset}] ${C.yellow}⚠️${C.reset} ${platCol}[${padEndAnsi(plat, 10)}]${C.reset} ${C.bold}${d.name || d.id}${C.reset} (${d.id}) -> Enqueued to DLQ (${d.initialVerdict || 'Failed'})`,
    });

    if (d.status === 'HALTED_UNRESOLVED') {
      const haltTs = enqTs + 180000; // estimated/relative halt timestamp after retries
      const haltTimeStr = formatTimeOnly(haltTs);
      streamEvents.push({
        timestamp: haltTs,
        timeStr: haltTimeStr,
        platform: plat,
        title: d.name || d.id,
        id: d.id,
        verdict: 'HALTED',
        icon: '⛔',
        formattedText: `[${C.dim}${haltTimeStr}${C.reset}] ${C.red}⛔${C.reset} ${platCol}[${padEndAnsi(plat, 10)}]${C.reset} ${C.bold}${d.name || d.id}${C.reset} (${d.id}) -> DLQ Halted to protect account reputation`,
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

// -----------------------------------------------------------------------------
// RENDERERS (Exact Box Alignment, Non-overflowing, Pixel-Perfect Layout)
// -----------------------------------------------------------------------------

function renderSideBySideCards(state, termWidth) {
  const colWidth = Math.max(26, Math.floor((termWidth - 4) / 3));
  const innerW = colWidth - 2;

  const keys = ['codeforces', 'leetcode', 'codechef'];
  const titles = [
    `${C.cyan}${C.bold}🟦 CODEFORCES${C.reset}`,
    `${C.yellow}${C.bold}🟧 LEETCODE${C.reset}`,
    `${C.magenta}${C.bold}🟫 CODECHEF${C.reset}`,
  ];

  const lineTop = `┌${'─'.repeat(colWidth)}┬${'─'.repeat(colWidth)}┬${'─'.repeat(colWidth)}┐`;
  const lineMid = `├${'─'.repeat(colWidth)}┼${'─'.repeat(colWidth)}┼${'─'.repeat(colWidth)}┤`;
  const lineBtm = `└${'─'.repeat(colWidth)}┴${'─'.repeat(colWidth)}┴${'─'.repeat(colWidth)}┘`;

  const rows = [];
  rows.push(lineTop);

  // Row 1: Header Titles
  rows.push(
    `│ ${padEndAnsi(titles[0], innerW)} │ ${padEndAnsi(titles[1], innerW)} │ ${padEndAnsi(titles[2], innerW)} │`
  );
  rows.push(lineMid);

  // Row 2: Status Badges
  const statusCells = keys.map((key) => {
    const w = state.workers[key] || {};
    const p = state.platforms[key];

    if (w.state === 'COOLDOWN') {
      return `${C.yellow}⏳ Cooldown: ${w.countdown || 'active'}${C.reset}`;
    }
    if (w.state === 'SUBMITTING') {
      return `${C.green}🚀 Dispatched / In Judge${C.reset}`;
    }
    if (w.state === 'AUTO_FIX') {
      return `${C.magenta}🔧 AI Repair Active${C.reset}`;
    }
    if (w.state === 'DLQ_RETRY') {
      return `${C.red}🔄 DLQ Retrying${C.reset}`;
    }
    if (w.state === 'FINISHED' || (p.accepted === p.total && p.total > 0)) {
      return `${C.green}${C.bold}✓ Queue Finished${C.reset}`;
    }
    return `${C.dim}Idle / Ready${C.reset}`;
  });
  rows.push(
    `│ ${padEndAnsi(statusCells[0], innerW)} │ ${padEndAnsi(statusCells[1], innerW)} │ ${padEndAnsi(statusCells[2], innerW)} │`
  );

  // Row 3: Progress Bars
  const barCells = keys.map((key) => {
    const p = state.platforms[key];
    return renderProgressBar(p.accepted, p.total, innerW - 8, p.color);
  });
  rows.push(
    `│ ${padEndAnsi(barCells[0], innerW)} │ ${padEndAnsi(barCells[1], innerW)} │ ${padEndAnsi(barCells[2], innerW)} │`
  );

  // Row 4: Accepted Counts
  const countCells = keys.map((key) => {
    const p = state.platforms[key];
    const pct = Math.round((p.accepted / (p.total || 1)) * 100);
    return `${p.color}${p.accepted}/${p.total} Accepted${C.reset} ${C.dim}(${pct}%)${C.reset}`;
  });
  rows.push(
    `│ ${padEndAnsi(countCells[0], innerW)} │ ${padEndAnsi(countCells[1], innerW)} │ ${padEndAnsi(countCells[2], innerW)} │`
  );

  // Row 5: Active Problem / Completed Summary
  const detailCells = keys.map((key) => {
    const w = state.workers[key] || {};
    const p = state.platforms[key];
    if (w.activeProblem) {
      return `${C.bold}${truncateAnsi(`Active: ${w.activeProblem.title}`, innerW - 2)}${C.reset}`;
    }
    if (w.state === 'COOLDOWN' && w.nextProblem) {
      return `${C.dim}Next: ${truncateAnsi(w.nextProblem.title, innerW - 8)}${C.reset}`;
    }
    if (p.accepted === p.total && p.total > 0) {
      return `${C.green}✓ All 10/10 Passed!${C.reset}`;
    }
    const dlqCount = state.dlq.filter((d) => (d.platform || '').toLowerCase() === key && d.status !== 'RESOLVED').length;
    if (dlqCount > 0) {
      return `${C.red}⚠️ ${dlqCount} in DLQ (Halted)${C.reset}`;
    }
    return `${C.dim}(Queue complete)${C.reset}`;
  });
  rows.push(
    `│ ${padEndAnsi(detailCells[0], innerW)} │ ${padEndAnsi(detailCells[1], innerW)} │ ${padEndAnsi(detailCells[2], innerW)} │`
  );

  rows.push(lineBtm);
  return rows.join('\n');
}

// Render DLQ Table with Pixel-Perfect Alignment
function renderDlqTable(dlqItems, maxRows = 6) {
  // Columns: Platform (12), ID (14), Title (24), Verdict (14), Retry Status (16)
  // Total inner width = 12 + 14 + 24 + 14 + 16 = 80 chars + 16 chars padding/borders = 96
  const lineTop = `  ┌──────────────┬────────────────┬──────────────────────────┬────────────────┬──────────────────┐`;
  const lineHdr = `  │ Platform     │ ID             │ Title                    │ Initial Verdict│ Retry Status     │`;
  const lineMid = `  ├──────────────┼────────────────┼──────────────────────────┼────────────────┼──────────────────┤`;
  const lineBtm = `  └──────────────┴────────────────┴──────────────────────────┴────────────────┴──────────────────┘`;

  const rows = [lineTop, lineHdr, lineMid];

  const items = dlqItems.slice(0, maxRows);
  for (const item of items) {
    const plat = padEndAnsi(truncateAnsi(item.platform || 'Platform', 12), 12);
    const id = padEndAnsi(truncateAnsi(item.id || '-', 14), 14);
    const title = padEndAnsi(truncateAnsi(item.name || '-', 24), 24);
    const verd = padEndAnsi(`${C.red}${truncateAnsi(item.initialVerdict || 'Failed', 14)}${C.reset}`, 14);

    let statText = item.status === 'HALTED_UNRESOLVED' ? `${C.red}⛔ HALTED (DLQ)${C.reset}` : `${C.yellow}⏳ RETRYING${C.reset}`;
    const stat = padEndAnsi(statText, 16);

    rows.push(`  │ ${plat} │ ${id} │ ${title} │ ${verd} │ ${stat} │`);
  }

  if (dlqItems.length > maxRows) {
    const more = `... and ${dlqItems.length - maxRows} more in DLQ (Press [3] to view all)`;
    rows.push(`  │ ${padEndAnsi(C.dim + more + C.reset, 92)} │`);
  }

  rows.push(lineBtm);
  return rows.join('\n');
}

// -----------------------------------------------------------------------------
// VIEW 1: MAIN DASHBOARD
// -----------------------------------------------------------------------------
function renderDashboardView(state, frame = 0, notificationBanner = null) {
  const termWidth = Math.min(108, Math.max(86, process.stdout.columns || 96));
  const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  const spin = state.isRunning ? C.green + spinnerChars[frame % spinnerChars.length] + C.reset : C.dim + '○' + C.reset;

  const out = [];

  // 1. Header Banner
  out.push(`${C.bold}${C.cyan}╔${'═'.repeat(termWidth - 2)}╗${C.reset}`);
  out.push(
    `${C.bold}${C.cyan}║  ⚡ AlgoPulse Competitive Programming Submission Mission Control${' '.repeat(Math.max(0, termWidth - 69))}║${C.reset}`
  );
  out.push(`${C.bold}${C.cyan}╚${'═'.repeat(termWidth - 2)}╝${C.reset}`);

  // 2. Session Duration & State ("Long Time" tracking prominently displayed)
  const statusBadge = state.isPaused
    ? `${C.bgYellow}${C.black}${C.bold} ⏸️ PAUSED ${C.reset} Process paused via dashboard`
    : state.isRunning
    ? `${C.bgGreen}${C.black}${C.bold} RUNNING ${C.reset} ${spin} 3 Parallel platform workers active`
    : `${C.bgDark}${C.white}${C.bold} COMPLETED ${C.reset} Session finished`;

  const durationStr = formatDuration(state.elapsedMs);
  const startStr = formatTimeOnly(state.sessionStart);
  const endStr = state.isRunning ? 'Active now' : formatTimeOnly(state.sessionEnd);

  out.push(`  Date: ${C.bold}${state.date}${C.reset}  │  Status: ${statusBadge}`);
  out.push(
    `  ${C.bold}⏱️  Session Runtime:${C.reset} ${C.yellow}${C.bold}${durationStr}${C.reset}  │  ` +
      `Start: ${C.dim}${startStr}${C.reset}  │  End: ${C.dim}${endStr}${C.reset}`
  );

  if (notificationBanner) {
    out.push(`  ${notificationBanner}`);
  }

  // 3. Overall Progress Bar & Scoreboard
  const totalProbs = state.problems.length || 30;
  const totalAcc = state.platforms.codeforces.accepted + state.platforms.leetcode.accepted + state.platforms.codechef.accepted;
  const dlqCount = state.dlq.filter((d) => d.status !== 'RESOLVED').length;
  const pendingCount = Math.max(0, totalProbs - totalAcc - dlqCount);

  out.push(`  Overall Progress:   ${renderProgressBar(totalAcc, totalProbs, 26, C.green)}`);
  out.push(
    `  Scoreboard:         ${C.green}${C.bold}✓ ${totalAcc} Accepted${C.reset}  │  ` +
      `${dlqCount > 0 ? C.red + C.bold : C.dim}⚠️ ${dlqCount} in DLQ${C.reset}  │  ` +
      `${pendingCount > 0 ? C.yellow : C.dim}⏳ ${pendingCount} Pending${C.reset}  │  ` +
      `${C.bold}Total: ${totalProbs}${C.reset}`
  );
  out.push('');

  // 4. Side-by-Side 3-Platform Cards
  out.push(`${C.bold}📡 ACTIVE PLATFORM QUEUES (Side-by-Side):${C.reset}`);
  out.push(renderSideBySideCards(state, termWidth));
  out.push('');

  // 5. Downward Chronological Stream Preview (Last 5 events)
  out.push(`${C.bold}📜 LIVE EVENT STREAM (Chronological ↓):${C.reset}`);
  const recent = state.streamEvents.slice(-5);
  if (recent.length === 0) {
    out.push(`  ${C.dim}(No submissions recorded yet)${C.reset}`);
  } else {
    for (const ev of recent) {
      out.push(`  ${truncateAnsi(ev.formattedText, termWidth - 4)}`);
    }
  }

  // 6. Navigation Hotkeys
  const pauseHotKey = state.isPaused
    ? `${C.green}${C.bold}[Space/p] ▶️ Resume${C.reset}`
    : state.isRunning
    ? `${C.yellow}${C.bold}[Space/p] ⏸️ Pause${C.reset}`
    : `${C.green}${C.bold}[Space/p] ▶️ Play${C.reset}`;

  out.push('');
  out.push(
    `${C.dim}  Tabs: [1] Dashboard │ [2] Stream ↓ │ [3] DLQ │ [4] Submissions │ ${pauseHotKey}${C.dim} │ ${C.bold}[x] Retry DLQ${C.dim} │ [r] Refresh │ [q] Quit${C.reset}`
  );

  return out.join('\n');
}

// -----------------------------------------------------------------------------
// VIEW 2: DOWNWARD STREAM VIEW
// -----------------------------------------------------------------------------
function renderStreamView(state) {
  const termWidth = Math.min(108, Math.max(86, process.stdout.columns || 96));
  const out = [];

  out.push(`${C.bold}${C.cyan}╔${'═'.repeat(termWidth - 2)}╗${C.reset}`);
  out.push(
    `${C.bold}${C.cyan}║  📜 AlgoPulse Chronological Live Stream (Flowing Downwards ↓)${' '.repeat(Math.max(0, termWidth - 65))}║${C.reset}`
  );
  out.push(`${C.bold}${C.cyan}╚${'═'.repeat(termWidth - 2)}╝${C.reset}`);

  out.push(
    `  Date: ${C.bold}${state.date}${C.reset}  │  Runtime: ${C.yellow}${formatDuration(state.elapsedMs)}${C.reset}  │  ` +
      `Accepted: ${C.green}${state.submissions.filter((s) => /accepted|correct/i.test(s.verdict || '')).length}/${state.problems.length}${C.reset}`
  );
  out.push(`  ${C.dim}Showing full chronological event timeline from start to finish:${C.reset}\n`);

  const eventsToShow = state.streamEvents.slice(-18);
  if (eventsToShow.length === 0) {
    out.push(`  ${C.dim}(No events available yet)${C.reset}`);
  } else {
    for (const ev of eventsToShow) {
      out.push(`  ${truncateAnsi(ev.formattedText, termWidth - 4)}`);
    }
  }

  const pauseHotKey = state.isPaused
    ? `${C.green}${C.bold}[Space/p] ▶️ Resume${C.reset}`
    : state.isRunning
    ? `${C.yellow}${C.bold}[Space/p] ⏸️ Pause${C.reset}`
    : `${C.green}${C.bold}[Space/p] ▶️ Play${C.reset}`;

  out.push('');
  out.push(
    `${C.dim}  Tabs: [1] Dashboard  │  [2] Stream ↓  │  [3] DLQ Radar  │  [4] Submissions  │  ${pauseHotKey}${C.dim}  │  [r] Refresh  │  [q] Quit${C.reset}`
  );

  return out.join('\n');
}

// -----------------------------------------------------------------------------
// VIEW 3: DLQ DEEP-DIVE VIEW
// -----------------------------------------------------------------------------
function renderDlqView(state) {
  const termWidth = Math.min(108, Math.max(86, process.stdout.columns || 96));
  const out = [];

  out.push(`${C.bold}${C.red}╔${'═'.repeat(termWidth - 2)}╗${C.reset}`);
  out.push(
    `${C.bold}${C.red}║  🚨 DEAD LETTER QUEUE (DLQ) & REPAIR RADAR${' '.repeat(Math.max(0, termWidth - 45))}║${C.reset}`
  );
  out.push(`${C.bold}${C.red}╚${'═'.repeat(termWidth - 2)}╝${C.reset}`);

  const activeDlq = state.dlq.filter((d) => d.status !== 'RESOLVED');
  out.push(
    `  Active DLQ Count: ${activeDlq.length === 0 ? C.green + '0 (All Clear)' : C.red + C.bold + activeDlq.length + ' Halted to protect account reputation'}${C.reset}\n`
  );

  if (activeDlq.length === 0) {
    out.push(`  ${C.green}✓ Congratulations! Zero failed or unhandled questions in the queue.${C.reset}`);
  } else {
    out.push(renderDlqTable(activeDlq, 10));
  }

  const pauseHotKey = state.isPaused
    ? `${C.green}${C.bold}[Space/p] ▶️ Resume${C.reset}`
    : state.isRunning
    ? `${C.yellow}${C.bold}[Space/p] ⏸️ Pause${C.reset}`
    : `${C.green}${C.bold}[Space/p] ▶️ Play${C.reset}`;

  out.push('');
  out.push(
    `${C.dim}  Tabs: [1] Dashboard  │  [2] Stream ↓  │  [3] DLQ Radar  │  [4] Submissions  │  ${pauseHotKey}${C.dim}  │  ${C.bold}[x] Retry DLQ${C.dim}  │  [r] Refresh  │  [q] Quit${C.reset}`
  );

  return out.join('\n');
}

// -----------------------------------------------------------------------------
// VIEW 4: SUBMISSIONS TABLE VIEW
// -----------------------------------------------------------------------------
function renderSubmissionsView(state) {
  const termWidth = Math.min(108, Math.max(86, process.stdout.columns || 96));
  const out = [];

  out.push(`${C.bold}${C.green}╔${'═'.repeat(termWidth - 2)}╗${C.reset}`);
  out.push(
    `${C.bold}${C.green}║  📋 Verified Platform Submissions Explorer${' '.repeat(Math.max(0, termWidth - 45))}║${C.reset}`
  );
  out.push(`${C.bold}${C.green}╚${'═'.repeat(termWidth - 2)}╝${C.reset}`);

  out.push(
    `  Total: ${state.submissions.length}  │  Accepted: ${C.green}${state.submissions.filter((s) => /accepted|correct/i.test(s.verdict || '')).length}${C.reset}  │  ` +
      `Failed: ${C.red}${state.submissions.filter((s) => !/accepted|correct/i.test(s.verdict || '')).length}${C.reset}\n`
  );

  // Table header
  out.push(`  ┌────┬────────────┬──────────────┬──────────────────────────┬──────────────┬──────────┬────────────┐`);
  out.push(`  │ #  │ Platform   │ ID           │ Title                    │ Verdict      │ Time     │ Submitted  │`);
  out.push(`  ├────┼────────────┼──────────────┼──────────────────────────┼──────────────┼──────────┼────────────┤`);

  const items = state.submissions.slice(0, 15);
  for (const [idx, s] of items.entries()) {
    const isAcc = /accepted|correct/i.test(s.verdict || '');
    const num = padEndAnsi(String(idx + 1), 2);
    const plat = padEndAnsi(truncateAnsi(s.platform || 'Platform', 10), 10);
    const id = padEndAnsi(truncateAnsi(s.id || s.problemId || '-', 12), 12);
    const title = padEndAnsi(truncateAnsi(s.name || s.file || '-', 24), 24);
    const verd = padEndAnsi(
      `${isAcc ? C.green : C.red}${truncateAnsi(s.verdict || 'Failed', 12)}${C.reset}`,
      12
    );
    const judgeTime = padEndAnsi(truncateAnsi(s.time || '-', 8), 8);
    const ts = padEndAnsi(formatTimeOnly(s.timestamp), 10);

    out.push(`  │ ${num} │ ${plat} │ ${id} │ ${title} │ ${verd} │ ${judgeTime} │ ${ts} │`);
  }

  if (state.submissions.length > 15) {
    out.push(
      `  │ ${padEndAnsi(C.dim + `... and ${state.submissions.length - 15} more submissions (Scroll in interactive mode [4])` + C.reset, 96)} │`
    );
  }

  out.push(`  └────┴────────────┴──────────────┴──────────────────────────┴──────────────┴──────────┴────────────┘`);
  const pauseHotKey = state.isPaused
    ? `${C.green}${C.bold}[Space/p] ▶️ Resume${C.reset}`
    : state.isRunning
    ? `${C.yellow}${C.bold}[Space/p] ⏸️ Pause${C.reset}`
    : `${C.green}${C.bold}[Space/p] ▶️ Play${C.reset}`;

  out.push('');
  out.push(
    `${C.dim}  Tabs: [1] Dashboard  │  [2] Stream ↓  │  [3] DLQ Radar  │  [4] Submissions  │  ${pauseHotKey}${C.dim}  │  [r] Refresh  │  [q] Quit${C.reset}`
  );

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
        console.log(ev.formattedText);
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

  // One-shot mode: snapshot and exit
  if (isOnce) {
    const state = loadMissionState(targetDate);
    if (initialTab === '2') console.log(renderStreamView(state));
    else if (initialTab === '3') console.log(renderDlqView(state));
    else if (initialTab === '4') console.log(renderSubmissionsView(state));
    else console.log(renderDashboardView(state, 0));
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

  function setBanner(msg, durationMs = 6000) {
    notificationBanner = msg;
    if (bannerTimer) clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => {
      notificationBanner = null;
      draw();
    }, durationMs);
    draw();
  }

  function togglePlayPause() {
    const isPaused = fs.existsSync(PAUSE_FILE);

    if (isPaused) {
      try {
        fs.unlinkSync(PAUSE_FILE);
      } catch {}
      setBanner(`${C.green}${C.bold}▶️ Play: Resumed submission runner! Cooldown & queue active.${C.reset}`);
      draw();
      return;
    }

    const logPath = findRunnerLog(targetDate);
    if (isRunnerActive(logPath)) {
      try {
        fs.writeFileSync(PAUSE_FILE, JSON.stringify({ pausedAt: new Date().toISOString() }), 'utf-8');
      } catch {}
      setBanner(`${C.yellow}${C.bold}⏸️ Pause: Paused active runner! Cooldown & submissions frozen.${C.reset}`);
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
      setBanner(`${C.green}${C.bold}🚀 Auto-Pilot Dispatched! Retrying 5 DLQ problems with live feedback...${C.reset}`);
    } catch (err) {
      setBanner(`${C.red}✗ Failed to start retry runner: ${err.message}${C.reset}`);
    }
  }

  // Cleanup handler
  function cleanupAndExit() {
    if (bannerTimer) clearTimeout(bannerTimer);
    if (process.stdout.isTTY) {
      process.stdout.write(`${C.showCursor}${C.altScreenOff}`);
    }
    process.exit(0);
  }

  process.on('SIGINT', cleanupAndExit);
  process.on('SIGTERM', cleanupAndExit);

  // Setup Alternate Screen Buffer
  if (process.stdout.isTTY) {
    process.stdout.write(`${C.altScreenOn}${C.hideCursor}`);
  }

  // Setup Raw Keyboard Input
  if (process.stdin.isTTY) {
    try {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf-8');
      process.stdin.on('data', (key) => {
        if (key === 'q' || key === 'Q' || key === '\u0003') {
          cleanupAndExit();
        } else if (key === '1' || key === 'm' || key === 'M') {
          currentTab = '1';
          draw();
        } else if (key === '2' || key === 's' || key === 'S') {
          currentTab = '2';
          draw();
        } else if (key === '3' || key === 'd' || key === 'D') {
          currentTab = '3';
          draw();
        } else if (key === '4' || key === 't' || key === 'T') {
          currentTab = '4';
          draw();
        } else if (key === 'p' || key === 'P' || key === ' ') {
          togglePlayPause();
        } else if (key === 'x' || key === 'X' || key === 'a' || key === 'A') {
          launchRetryRunner();
        } else if (key === 'r' || key === 'R') {
          frame++;
          draw();
        }
      });
    } catch {}
  }

  function draw() {
    try {
      const state = loadMissionState(targetDate);
      let content = '';

      if (currentTab === '1') content = renderDashboardView(state, frame, notificationBanner);
      else if (currentTab === '2') content = renderStreamView(state);
      else if (currentTab === '3') content = renderDlqView(state);
      else if (currentTab === '4') content = renderSubmissionsView(state);

      // Pinned in-place overwrite (Zero jumping, Zero scroll runaway)
      process.stdout.write(`${C.home}${content}${C.eraseDown}`);
    } catch (err) {
      process.stdout.write(`\rError updating monitor: ${err.message}`);
    }
  }

  draw();
  setInterval(() => {
    frame++;
    draw();
  }, 1000);
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
};

if (require.main === module) {
  run().catch((err) => {
    if (process.stdout.isTTY) {
      process.stdout.write(`${C.showCursor}${C.altScreenOff}`);
    }
    console.error('Monitor fatal error:', err);
    process.exit(1);
  });
}

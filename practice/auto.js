#!/usr/bin/env node

/**
 * AlgoPulse Autonomous Submission & DLQ Auto-Repair Engine
 * 
 * Executes the complete competitive programming submission lifecycle:
 * 1. Pre-flight verification of solutions against test fixtures
 * 2. Intelligent dispatch of pending and DLQ retry queues
 * 3. Autonomous AI repair and local validation on failures
 * 4. Real-time chronological downward streaming to the terminal
 * 5. Instant final scoreboard verification
 * 
 * Usage:
 *   npm run auto                  # Submit pending & failed problems with live streaming
 *   npm run auto:retry            # Retry only DLQ/failed problems
 *   node practice/auto.js --date YYYY-MM-DD
 */

const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const DAYS_DIR = path.join(REPO_ROOT, 'practice', 'days');

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

const args = process.argv.slice(2);
const isRetryOnly = args.includes('--retry') || args.includes('--failed-only');
const dateIdx = args.indexOf('--date');
const customDate = dateIdx !== -1 ? args[dateIdx + 1] : null;

function getTargetDate() {
  if (customDate) return customDate;
  if (!fs.existsSync(DAYS_DIR)) return new Date().toISOString().slice(0, 10);
  const dirs = fs.readdirSync(DAYS_DIR).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
  return dirs.length > 0 ? dirs[dirs.length - 1] : new Date().toISOString().slice(0, 10);
}

async function main() {
  const targetDate = getTargetDate();
  const dayDir = path.join(DAYS_DIR, targetDate);

  console.log(`\n${C.bold}${C.cyan}╔═════════════════════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}${C.cyan}║  ⚡ AlgoPulse Autonomous Submission & Live Pipeline Engine               ║${C.reset}`);
  console.log(`${C.bold}${C.cyan}╚═════════════════════════════════════════════════════════════════════════╝${C.reset}`);
  console.log(`  Target Date: ${C.bold}${targetDate}${C.reset}  │  Mode: ${C.yellow}${isRetryOnly ? 'DLQ / Failed Cases Only' : 'Full Daily Mission'}${C.reset}\n`);

  // Step 1: Pre-flight Local Test Verification
  console.log(`[1/3] ${C.bold}Running pre-flight verification against local test suites ...${C.reset}`);
  const verifyRes = spawnSync(process.execPath, [path.join(REPO_ROOT, 'practice', 'verify.js'), targetDate], {
    cwd: REPO_ROOT,
    encoding: 'utf-8',
  });

  if (verifyRes.status !== 0) {
    console.warn(`${C.yellow}⚠️  Some local tests failed before submission:${C.reset}`);
    console.warn(verifyRes.stdout || verifyRes.stderr);
    console.log(`Continuing to submission engine with AI auto-fix enabled...\n`);
  } else {
    console.log(`${C.green}✓ All local test cases passed pre-flight validation.${C.reset}\n`);
  }

  // Step 2: Prepare Submit Runner Options
  console.log(`[2/3] ${C.bold}Dispatching Playwright platform workers (Chrome CDP Port 9222) ...${C.reset}`);
  const submitArgs = [
    path.join(REPO_ROOT, 'practice', 'playwright', 'submit.js'),
    '--date',
    targetDate,
  ];

  if (isRetryOnly) {
    submitArgs.push('--failed-only');
  }

  // Pass through flags
  for (const a of args) {
    if (a !== '--retry' && a !== '--failed-only' && a !== '--date' && a !== customDate) {
      submitArgs.push(a);
    }
  }

  // Ensure live log path exists
  const dayLog = path.join(dayDir, 'live.log');
  const globalLog = path.join(REPO_ROOT, 'practice', 'live.log');

  console.log(`[3/3] ${C.bold}Live Event Stream (Flowing Downwards ↓):${C.reset}\n`);

  // Spawn submit.js directly piping stdout/stderr into process and log files
  const child = spawn(process.execPath, submitArgs, {
    cwd: REPO_ROOT,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  const logStream = fs.createWriteStream(dayLog, { flags: 'a' });
  const globalLogStream = fs.createWriteStream(globalLog, { flags: 'w' });

  function formatStreamLine(line) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    let icon = '•';
    let col = C.reset;

    if (line.includes('Accepted') || line.includes('Correct Answer')) {
      icon = '✓';
      col = C.green;
    } else if (line.includes('Wrong Answer') || line.includes('Wrong answer') || line.includes('non-accepted')) {
      icon = '✗';
      col = C.red;
    } else if (line.includes('AI Diagnosis:') || line.includes('fix-flow')) {
      icon = '🔧';
      col = C.magenta;
    } else if (line.includes('DLQ-ENQUEUE')) {
      icon = '⚠️';
      col = C.yellow;
    } else if (line.includes('DLQ-HALT')) {
      icon = '⛔';
      col = C.red;
    } else if (line.includes('Processing:')) {
      icon = '🚀';
      col = C.cyan;
    } else if (line.includes('SUCCESS!') && line.includes('ACCEPTED')) {
      icon = '🎉';
      col = C.green;
    }

    return `[${C.dim}${timeStr}${C.reset}] ${col}${icon} ${line}${C.reset}`;
  }

  child.stdout.on('data', (data) => {
    const text = data.toString();
    try {
      logStream.write(text);
      globalLogStream.write(text);
    } catch {}

    const lines = text.split(/\r?\n/);
    for (const l of lines) {
      const trimmed = l.trim();
      if (!trimmed) continue;
      // Filter out raw pacing tick spam in downward stream
      if (trimmed.startsWith('⏳ Pacing pause:')) {
        process.stdout.write(`\r${C.yellow}${trimmed}${C.reset}   `);
      } else {
        console.log(formatStreamLine(trimmed));
      }
    }
  });

  child.stderr.on('data', (data) => {
    const text = data.toString();
    try {
      logStream.write(text);
      globalLogStream.write(text);
    } catch {}
    process.stderr.write(text);
  });

  child.on('close', (code) => {
    console.log(`\n${C.green}─────────────────────────────────────────────────────────────────────────${C.reset}`);
    console.log(`${C.bold}🏁 Autonomous Pipeline Completed with exit code ${code}.${C.reset}`);
    console.log(`   Run ${C.cyan}npm run monitor${C.reset} to inspect the updated dashboard.`);
    console.log(`${C.green}─────────────────────────────────────────────────────────────────────────${C.reset}\n`);
    process.exit(code);
  });
}

main().catch((err) => {
  console.error('Fatal error in auto runner:', err);
  process.exit(1);
});

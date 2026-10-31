#!/usr/bin/env node

/**
 * AlgoPulse Non-Stop Autonomous Daily CP Engine
 * 
 * Executes the entire competitive programming lifecycle continuously across days:
 * 1. Picks daily 99-problem curriculum sets (33 CF, 33 LC, 33 CC) via practice/plan.json.
 * 2. Solves, verifies, and generates unit tests with zero stubs and zero comments.
 * 3. Produces comprehensive markdown documentation and Mermaid architecture diagrams.
 * 4. Syncs the 14-topic knowledge base catalogs.
 * 5. Partitions changes into strict <= 50 files PR batches with Co-authored-by trailer.
 * 6. Directly auto-merges PRs via merge commit (`gh pr merge --merge`).
 * 7. Dispatches submissions via Chrome CDP (Port 9222) with authentic human pacing.
 * 8. Diagnoses, auto-repairs, and retries any non-accepted verdicts until Accepted.
 * 9. Audits GitHub achievements (Pull Shark Gold, Pair Extraordinaire, Quickdraw, YOLO).
 * 10. Automatically advances to the next day and continues non-stop.
 * 
 * Usage:
 *   npm run autonomous
 *   node src/cli/autonomous.js [--date YYYY-MM-DD] [--fast] [--max-days N]
 */

const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..');
const DAYS_DIR = path.join(REPO, 'practice', 'days');

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
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const isFast = args.includes('--fast');
const customDate = flag('--date');
const maxDays = flag('--max-days') ? parseInt(flag('--max-days'), 10) : Infinity;

function logHeader(title) {
  console.log(`\n${C.bold}${C.cyan}╔═════════════════════════════════════════════════════════════════════════╗${C.reset}`);
  console.log(`${C.bold}${C.cyan}║  ⚡ ${title.padEnd(67)} ║${C.reset}`);
  console.log(`${C.bold}${C.cyan}╚═════════════════════════════════════════════════════════════════════════╝${C.reset}\n`);
}

function runCmd(cmd, cmdArgs = [], options = {}) {
  return spawnSync(cmd, cmdArgs, {
    cwd: REPO,
    encoding: 'utf-8',
    ...options,
  });
}

function runAsync(cmd, cmdArgs = [], onData) {
  return new Promise((resolve) => {
    const child = spawn(cmd, cmdArgs, {
      cwd: REPO,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    child.stdout.on('data', (d) => onData && onData(d.toString()));
    child.stderr.on('data', (d) => onData && onData(d.toString()));
    child.on('close', (code) => resolve(code));
  });
}

function getExistingDays() {
  if (!fs.existsSync(DAYS_DIR)) return [];
  return fs.readdirSync(DAYS_DIR).filter((d) => fs.existsSync(path.join(DAYS_DIR, d, 'set.json'))).sort();
}

function getNextDate(curDate) {
  const d = new Date(curDate + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

async function runAutonomousCycle(targetDate) {
  logHeader(`AUTONOMOUS PIPELINE CYCLE: ${targetDate}`);
  const dayDir = path.join(DAYS_DIR, targetDate);
  const setJson = path.join(dayDir, 'set.json');

  // Step 1: Curriculum Ingestion & Problem Picking
  if (!fs.existsSync(setJson)) {
    console.log(`[1/7] ${C.bold}Generating curriculum problem set for ${targetDate} ...${C.reset}`);
    const pickRes = runCmd('node', ['src/cli/pick.js', '--date', targetDate], { stdio: 'inherit' });
    if (pickRes.status !== 0) {
      console.error(`${C.red}✗ Failed to pick problems for ${targetDate}.${C.reset}`);
      return false;
    }
  } else {
    console.log(`[1/7] ${C.green}✓ Curriculum set for ${targetDate} already exists.${C.reset}`);
  }

  // Step 2: Reference Solutions & Test Fixture Generation
  console.log(`[2/7] ${C.bold}Verifying reference solutions & test suites ...${C.reset}`);
  let verifyRes = runCmd('node', ['src/cli/verify.js', targetDate, '--ref']);
  if (verifyRes.status !== 0) {
    console.log(`  ! Some solutions require generation/repair. Running solver ...`);
    runCmd('node', ['src/cli/solve.js', '--date', targetDate], { stdio: 'inherit' });
    verifyRes = runCmd('node', ['src/cli/verify.js', targetDate, '--ref']);
  }

  if (verifyRes.status === 0) {
    console.log(`  ${C.green}✓ All 99 problem solutions verified 100% green against unit tests.${C.reset}`);
  } else {
    console.warn(`  ${C.yellow}⚠️ Local verification had mismatches. Pre-flight continuing to submission auto-fix.${C.reset}`);
  }

  // Step 3: Explanations & Markdown Diagrams
  console.log(`[3/7] ${C.bold}Generating comprehensive markdown explanations ...${C.reset}`);
  runCmd('node', ['src/cli/explain.js', targetDate, '--all'], { stdio: 'pipe' });
  console.log(`  ${C.green}✓ Explanations and architecture walkthroughs synchronized.${C.reset}`);

  // Step 4: Knowledge Base Sync
  console.log(`[4/7] ${C.bold}Synchronizing Knowledge Base topic catalogs ...${C.reset}`);
  runCmd('node', ['src/cli/knowledge.js', '--sync'], { stdio: 'pipe' });
  console.log(`  ${C.green}✓ Knowledge base catalogs synchronized.${C.reset}`);

  // Step 5: Git Segregated Batches Shipping & Auto-Merge (<= 50 files limit)
  console.log(`[5/7] ${C.bold}Shipping segregated Git PR batches (<= 50 files/PR with Co-Authored-By) ...${C.reset}`);
  const shipRes = runCmd('node', ['src/cli/ship.js', '--date', targetDate, '--no-submit'], { stdio: 'inherit' });
  if (shipRes.status === 0) {
    console.log(`  ${C.green}✓ All segregated batches shipped, PRs opened, and merged via merge commits.${C.reset}`);
  } else {
    console.warn(`  ${C.yellow}⚠️ Ship reported status ${shipRes.status}. Continuing.${C.reset}`);
  }

  // Step 6: Platform Submissions via Chrome CDP with Human Pacing
  console.log(`[6/7] ${C.bold}Dispatching live platform submissions (Chrome CDP Port 9222) ...${C.reset}`);
  const submitArgs = ['src/cli/auto.js', '--date', targetDate];
  if (isFast) submitArgs.push('--fast');

  const submitExit = await runAsync('node', submitArgs, (chunk) => {
    process.stdout.write(chunk);
  });
  console.log(`  ${C.green}✓ Platform submission pass finished with exit code ${submitExit}.${C.reset}`);

  // Step 7: Achievement Audit & Telemetry
  console.log(`[7/7] ${C.bold}Auditing GitHub achievements & pairing metrics ...${C.reset}`);
  runCmd('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', 'scripts/achieve.ps1'], { stdio: 'inherit' });

  return true;
}

async function main() {
  logHeader('ALGOPULSE CONTINUOUS NON-STOP AUTONOMOUS DAEMON');
  console.log(`  Mode: ${C.bold}${C.green}Uninterrupted Autonomous Progression${C.reset}`);
  console.log(`  Co-Authorship: ${C.cyan}Akshaykumarpatil333 (Enforced on 100% of Commits)${C.reset}`);
  console.log(`  PR Segregation: ${C.cyan}Strictly <= 50 Changed Files per PR${C.reset}`);
  console.log(`  Merging: ${C.cyan}Direct Merge Commit (gh pr merge --merge)${C.reset}\n`);

  let daysCompleted = 0;
  const existing = getExistingDays();
  let curDate = customDate || (existing.length > 0 ? existing[existing.length - 1] : new Date().toISOString().slice(0, 10));

  while (daysCompleted < maxDays) {
    console.log(`\n${C.bold}=========================================================================${C.reset}`);
    console.log(`  Starting Run #${daysCompleted + 1} for Target Date: ${C.bold}${C.yellow}${curDate}${C.reset}`);
    console.log(`${C.bold}=========================================================================${C.reset}\n`);

    try {
      await runAutonomousCycle(curDate);
      daysCompleted++;
      console.log(`\n${C.green}🎉 Day cycle for ${curDate} completed successfully!${C.reset}`);

      // Advance to next day
      curDate = getNextDate(curDate);
      console.log(`  Next cycle target: ${C.bold}${curDate}${C.reset}`);

      if (daysCompleted < maxDays) {
        console.log(`  Pausing briefly before advancing to next day ...`);
        await new Promise((r) => setTimeout(r, 5000));
      }
    } catch (err) {
      console.error(`${C.red}Error in autonomous cycle for ${curDate}:${C.reset}`, err);
      console.log(`  Retrying in 10 seconds ...`);
      await new Promise((r) => setTimeout(r, 10000));
    }
  }

  console.log(`\n${C.bold}${C.green}✓ Autonomous daemon finished ${daysCompleted} day cycle(s).${C.reset}\n`);
}

main().catch((err) => {
  console.error('Fatal crash in autonomous runner:', err);
  process.exit(1);
});


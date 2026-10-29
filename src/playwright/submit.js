/**
 * Playwright Day-Wise Platform Submission Engine
 * Submits solved problems for any practice day directly to Codeforces, LeetCode, and CodeChef.
 * Supports sequential single-platform runs and multi-platform parallel worker queues.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { launchBrowser, createStealthContext, launchPersistentBrowserContext, connectOverCDP, ensureCDPChrome } = require('./browser');
const { PLATFORMS, PRACTICE_DAYS_DIR, REPO_ROOT } = require('./config');
const cfEngine = require('./platforms/codeforces');
const lcEngine = require('./platforms/leetcode');
const ccEngine = require('./platforms/codechef');
const { authenticatePlatform } = require('./auth');
const { sanitizeCodeForSubmission } = require('./sanitize');
const { syncSessionsFromEnv } = require('./envAuth');

const PAUSE_FILE = path.join(REPO_ROOT, 'practice', '.pause');

function isProcessPaused() {
  return fs.existsSync(PAUSE_FILE);
}

async function waitIfPaused(tag = '[runner]') {
  if (!isProcessPaused()) return;
  console.log(`\n⏸️  ${tag} Process paused via Monitor Dashboard. Waiting for Play (Resume)...`);
  while (isProcessPaused()) {
    await new Promise((r) => setTimeout(r, 800));
  }
  console.log(`▶️  ${tag} Process resumed! Continuing execution...\n`);
}

let ai = null;
try {
  ai = require('../ai');
} catch {}

// Auto-sync session keys from .env into .auth session files
syncSessionsFromEnv();

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const existingDays = () =>
  fs.existsSync(PRACTICE_DAYS_DIR)
    ? fs.readdirSync(PRACTICE_DAYS_DIR).filter((d) => fs.existsSync(path.join(PRACTICE_DAYS_DIR, d, 'set.json'))).sort()
    : [];

function getProblemPlatform(p) {
  if (p.platform) return p.platform;
  const url = (p.url || '').toLowerCase();
  if (url.includes('leetcode.com')) return 'LeetCode';
  if (url.includes('codechef.com')) return 'CodeChef';
  return 'Codeforces';
}

function findSolutionFile(problem, dayDir) {
  const dateStr = path.basename(dayDir);
  const platKey = getProblemPlatform(problem).toLowerCase();
  const candidates = [
    path.join(dayDir, 'solutions', `${problem.file}.sh`),
    path.join(dayDir, 'solutions', `${problem.file}.sql`),
    path.join(dayDir, 'solutions', `${problem.file}.js`),
    path.join(dayDir, 'attempts', `${problem.file}.js`),
    path.join(REPO_ROOT, 'contests', platKey, dateStr, `${problem.file}.js`),
    path.join(REPO_ROOT, 'solutions', `${problem.file}.js`),
    path.join(REPO_ROOT, `${problem.file}.js`),
  ];
  return candidates.find((c) => fs.existsSync(c)) || null;
}

/**
 * Normalizes problem IDs to allow robust matching across representations
 * e.g., 'CC-BULBLIFE' -> 'bulblife', '1328/A' -> '1328a', 'LC-345' -> '345'
 */
function normalizeId(id) {
  if (!id) return '';
  return String(id).toLowerCase().replace(/^(cc|lc)[-_]/, '').replace(/[\/\-_]/g, '').trim();
}

/**
 * Checks if a historical record matches a given problem
 */
function isRecordForProblem(prob, sub) {
  if (!prob || !sub) return false;
  const probPlat = getProblemPlatform(prob).toLowerCase();
  const subPlat = String(sub.platform || '').toLowerCase();
  if (probPlat !== subPlat) return false;

  const probFile = String(prob.file || '').toLowerCase();
  const subFile = String(sub.file || '').toLowerCase();
  if (probFile && subFile && probFile === subFile) return true;

  const probId = normalizeId(prob.id);
  const subId = normalizeId(sub.id || sub.problemId);
  if (probId && subId && probId === subId) return true;

  return false;
}

/**
 * Checks if a single submission or any of its historical attempts is an accepted verdict
 */
function isVerdictAccepted(sub) {
  if (!sub) return false;
  const verdict = String(sub.verdict || '').toLowerCase();
  return (
    verdict.includes('accepted') ||
    verdict.includes('correct answer') ||
    verdict.includes('passed')
  );
}

/**
 * Checks if a problem has already been successfully solved on the platform
 */
function isProblemAccepted(problem, historicalSubmissions = []) {
  if (!Array.isArray(historicalSubmissions)) return null;

  for (const sub of historicalSubmissions) {
    if (!isRecordForProblem(problem, sub)) continue;

    // Check primary record
    if (isVerdictAccepted(sub)) {
      return sub;
    }

    // Check prior attempts inside history
    if (Array.isArray(sub.history)) {
      const acceptedHist = sub.history.find((h) => isVerdictAccepted(h));
      if (acceptedHist) {
        return {
          ...sub,
          ...acceptedHist,
          attempts: sub.attempts || sub.history.length + 1,
        };
      }
    }
  }

  return null;
}

/**
 * Resolves comprehensive problem status:
 * - status: 'ACCEPTED' | 'FAILED' | 'PENDING' | 'MISSING_CODE'
 * - attempts: number
 * - latestRecord: object | null
 * - acceptedRecord: object | null
 */
function getProblemStatus(problem, historicalSubmissions = [], dayDir = null) {
  if (dayDir && !findSolutionFile(problem, dayDir)) {
    return { status: 'MISSING_CODE', attempts: 0, latestRecord: null, acceptedRecord: null };
  }

  const accepted = isProblemAccepted(problem, historicalSubmissions);
  if (accepted) {
    return {
      status: 'ACCEPTED',
      attempts: accepted.attempts || (Array.isArray(accepted.history) ? accepted.history.length + 1 : 1),
      latestRecord: accepted,
      acceptedRecord: accepted,
    };
  }

  const match = Array.isArray(historicalSubmissions)
    ? historicalSubmissions.find((s) => isRecordForProblem(problem, s))
    : null;

  if (match) {
    const attempts = match.attempts || (Array.isArray(match.history) ? match.history.length + 1 : 1);
    const isPending = /pending|in queue|judging|testing/i.test(match.verdict || '');
    if (isPending) {
      return {
        status: 'PENDING',
        attempts,
        latestRecord: match,
        acceptedRecord: null,
      };
    }
    return {
      status: 'FAILED',
      attempts,
      latestRecord: match,
      acceptedRecord: null,
    };
  }

  return { status: 'PENDING', attempts: 0, latestRecord: null, acceptedRecord: null };
}

/**
 * Merges new submission results with historical records, deduplicating by problem
 * and preserving attempt history.
 * Invariant: If a problem was already accepted, keep accepted status primary
 * and push transient re-run failures into history.
 */
function mergeSubmissions(existing = [], updates = []) {
  const map = new Map();
  const makeKey = (r) => {
    const plat = String(r.platform || '').toLowerCase();
    const file = String(r.file || '').toLowerCase();
    const id = normalizeId(r.id || r.problemId);
    return `${plat}::${file || id}`;
  };

  // Seed map with existing records
  for (const r of existing) {
    const key = makeKey(r);
    if (!map.has(key)) {
      map.set(key, { ...r, history: Array.isArray(r.history) ? [...r.history] : [] });
    } else {
      // Deduplicate existing records if legacy array had duplicates
      const current = map.get(key);
      const isRNewAcc = isVerdictAccepted(r);
      const isCurrAcc = isVerdictAccepted(current);

      if (isRNewAcc && !isCurrAcc) {
        const { history = [], ...currWithoutHist } = current;
        map.set(key, { ...r, history: [...history, currWithoutHist] });
      } else {
        const { history = [], ...rWithoutHist } = r;
        current.history.push(rWithoutHist);
      }
    }
  }

  // Apply new updates
  for (const r of updates) {
    const key = makeKey(r);
    const prev = map.get(key);
    if (prev) {
      const history = Array.isArray(prev.history) ? [...prev.history] : [];
      const isUpdateAcc = isVerdictAccepted(r);
      const isPrevAcc = isVerdictAccepted(prev);

      if (!isUpdateAcc && isPrevAcc) {
        // Keep accepted as primary if an accidental rerun failed, but log new failed attempt in history
        const { history: _, ...updateWithoutHist } = r;
        history.push(updateWithoutHist);
        map.set(key, {
          ...prev,
          attempts: history.length + 1,
          history,
        });
      } else {
        // Update is accepted or both share same status tier: update becomes primary
        const { history: _, ...prevRecord } = prev;
        history.push(prevRecord);
        map.set(key, {
          ...r,
          attempts: history.length + 1,
          history,
        });
      }
    } else {
      map.set(key, {
        ...r,
        attempts: (r.history ? r.history.length : 0) + 1,
        history: Array.isArray(r.history) ? [...r.history] : [],
      });
    }
  }

  return Array.from(map.values()).map((r) => ({
    ...r,
    attempts: (r.history ? r.history.length : 0) + 1,
  }));
}

/**
 * Displays full tracking status dashboard for the day
 */
function printSubmissionStatus(problems, historicalSubmissions, date, dayDir) {
  console.log(`\n================================================================`);
  console.log(`📊 Submission Tracking Status for Date ${date}`);
  console.log(`================================================================\n`);

  let acceptedCount = 0;
  let failedCount = 0;
  let pendingCount = 0;
  let missingCount = 0;

  const platformStats = {};

  const rows = [];
  for (const [i, p] of problems.entries()) {
    const platName = getProblemPlatform(p);
    const platKey = platName.toLowerCase();
    if (!platformStats[platKey]) {
      platformStats[platKey] = { name: platName, total: 0, accepted: 0, failed: 0, pending: 0 };
    }
    platformStats[platKey].total++;

    const statusInfo = getProblemStatus(p, historicalSubmissions, dayDir);
    let statusBadge = '';
    let verdictText = '-';
    let urlOrDetails = '-';

    if (statusInfo.status === 'ACCEPTED') {
      acceptedCount++;
      platformStats[platKey].accepted++;
      statusBadge = '✓ ACCEPTED';
      verdictText = statusInfo.acceptedRecord?.verdict || 'Accepted';
      urlOrDetails = statusInfo.acceptedRecord?.submissionUrl || (statusInfo.acceptedRecord?.submissionId ? `#${statusInfo.acceptedRecord.submissionId}` : '-');
    } else if (statusInfo.status === 'FAILED') {
      failedCount++;
      platformStats[platKey].failed++;
      statusBadge = '✗ FAILED (RETRY)';
      verdictText = statusInfo.latestRecord?.verdict || 'Failed';
      urlOrDetails = statusInfo.latestRecord?.submissionUrl || statusInfo.latestRecord?.submissionId || '-';
    } else if (statusInfo.status === 'MISSING_CODE') {
      missingCount++;
      statusBadge = 'MISSING_CODE';
      verdictText = 'No solution file found';
    } else {
      pendingCount++;
      platformStats[platKey].pending++;
      statusBadge = '⏳ PENDING';
      verdictText = statusInfo.latestRecord?.verdict || 'Not attempted';
      urlOrDetails = statusInfo.latestRecord?.submissionUrl || (statusInfo.latestRecord?.submissionId ? `#${statusInfo.latestRecord.submissionId}` : '-');
    }

    rows.push({
      num: i + 1,
      platform: platName,
      id: p.id,
      name: p.name,
      status: statusBadge,
      attempts: statusInfo.attempts,
      verdict: verdictText,
      url: urlOrDetails,
    });
  }

  console.log(`Summary: ${problems.length} Total Problems | ✓ ${acceptedCount} Accepted | ✗ ${failedCount} Failed | ⏳ ${pendingCount} Pending\n`);

  console.log('Platform Breakdown:');
  for (const stat of Object.values(platformStats)) {
    const pct = stat.total > 0 ? Math.round((stat.accepted / stat.total) * 100) : 0;
    console.log(`  • ${stat.name.padEnd(12)}: ${stat.accepted} / ${stat.total} Accepted (${pct}%)${stat.failed > 0 ? ` [${stat.failed} failed]` : ''}`);
  }
  console.log('');

  console.log('| # | Platform | Problem ID | Title | Status | Attempts | Verdict | Details / URL |');
  console.log('|---|:---:|:---:|---|:---:|:---:|:---:|---|');
  for (const r of rows) {
    console.log(
      `| ${r.num} | ${r.platform} | ${r.id} | ${r.name} | **${r.status}** | ${r.attempts} | ${r.verdict} | ${r.url} |`
    );
  }
  console.log('\n================================================================');

  if (failedCount > 0) {
    console.log(`\n💡 To resubmit ONLY the ${failedCount} failed case(s), run:`);
    console.log(`   node src/playwright/submit.js --date ${date} --failed-only`);
    console.log(`   (Or platform specific: npm run submit:cc -- --failed-only)\n`);
  } else if (acceptedCount === problems.length) {
    console.log(`\n🎉 All ${problems.length} problems are 100% Accepted! No resubmissions required.\n`);
  }
}

async function runDryRun(problems, dayDir, date, isParallel = false, historicalSubmissions = []) {
  console.log(`\n=== DRY RUN: Day-Wise Submission Preview for ${date} ===\n`);
  console.log(`Total Problems in Set: ${problems.length}`);
  if (isParallel) {
    console.log(`Execution Strategy: Parallel Platform Workers (LeetCode, Codeforces, CodeChef in parallel)`);
  } else {
    console.log(`Execution Strategy: Sequential One-by-One Queue`);
  }

  let readyCount = 0;
  let missingCount = 0;
  let acceptedCount = 0;
  let failedCount = 0;

  console.log('\n| # | Platform | Problem ID | Title | Solution File | Attempts | Auth | Status | Action |');
  console.log('|---|:---:|:---:|---|---|:---:|:---:|:---:|:---:|');

  for (const [i, p] of problems.entries()) {
    const solPath = findSolutionFile(p, dayDir);
    const platformName = getProblemPlatform(p);
    const platKey = platformName.toLowerCase();
    const plat = PLATFORMS[platKey];
    const hasAuth = plat && fs.existsSync(plat.authFile);
    const statusInfo = getProblemStatus(p, historicalSubmissions, dayDir);

    let status = 'READY';
    let action = 'SUBMIT';

    if (!solPath) {
      status = 'MISSING_CODE';
      action = 'SKIP';
      missingCount++;
    } else if (statusInfo.status === 'ACCEPTED') {
      status = '✓ ACCEPTED';
      action = 'SKIP (ALREADY DONE)';
      acceptedCount++;
    } else if (statusInfo.status === 'FAILED') {
      status = '✗ FAILED';
      action = 'RETRY RESUBMISSION';
      failedCount++;
      readyCount++;
    } else if (!hasAuth) {
      status = 'NO_AUTH';
      action = 'PROMPT LOGIN';
      readyCount++;
    } else {
      status = '⏳ PENDING';
      action = 'SUBMIT';
      readyCount++;
    }

    const relPath = solPath ? path.relative(REPO_ROOT, solPath) : 'NOT FOUND';
    const authStatus = hasAuth ? '✓' : '✗';
    console.log(
      `| ${i + 1} | ${platformName} | ${p.id} | ${p.name} | \`${relPath}\` | ${statusInfo.attempts} | ${authStatus} | **${status}** | ${action} |`
    );
  }

  console.log(
    `\nDry run completed: ${acceptedCount} already accepted (will be skipped), ${failedCount} failed (eligible for retry), ${readyCount - failedCount} pending, ${missingCount} missing code.`
  );
  console.log(`\nNext steps:`);
  console.log(`  • To submit unaccepted/failed problems: node src/playwright/submit.js --date ${date}`);
  console.log(`  • To resubmit ONLY failed cases:        node src/playwright/submit.js --date ${date} --failed-only`);
  console.log(`  • To force resubmission of all:          node src/playwright/submit.js --date ${date} --force\n`);
}


/**
 * Organizes or mirrors day-wise solutions into platform-specific practice directories
 */
function mirrorSolutionsByPlatform(problems, dayDir, date) {
  console.log(`\n[mirror] Mirroring Day ${date} practice solutions into platform directories ...`);
  let mirrored = 0;

  for (const p of problems) {
    const solPath = findSolutionFile(p, dayDir);
    if (!solPath) continue;

    const platKey = getProblemPlatform(p).toLowerCase();
    const contestDir = path.join(REPO_ROOT, 'contests', platKey, date);
    fs.mkdirSync(contestDir, { recursive: true });
    fs.copyFileSync(solPath, path.join(contestDir, `${p.file}.js`));
    mirrored++;
  }

  console.log(`  ✓ Mirrored ${mirrored} solutions into contests/ directories\n`);
}

/**
 * Submits a single problem using the provided browser and context setup
 */
async function submitSingleProblem(prob, { dayDir, browser, persistentContext, isPersistentMode }) {
  const solPath = findSolutionFile(prob, dayDir);
  if (!solPath) {
    console.warn(`    ✗ Missing solution code for ${prob.file}. Skipping.`);
    return {
      platform: prob.platform,
      id: prob.id,
      name: prob.name,
      file: prob.file,
      verdict: 'NO_SOLUTION_FILE',
      success: false,
    };
  }

  const rawCode = fs.readFileSync(solPath, 'utf-8');
  const platKey = getProblemPlatform(prob).toLowerCase();
  const platConfig = PLATFORMS[platKey];

  if (!platConfig) {
    console.warn(`    ✗ Unsupported platform: "${prob.platform}". Skipping.`);
    return {
      platform: prob.platform,
      id: prob.id,
      name: prob.name,
      verdict: 'UNSUPPORTED_PLATFORM',
      success: false,
    };
  }

  let context = null;
  let page = null;

  if (isPersistentMode) {
    if (fs.existsSync(platConfig.authFile)) {
      try {
        const authData = JSON.parse(fs.readFileSync(platConfig.authFile, 'utf-8'));
        if (Array.isArray(authData.cookies) && authData.cookies.length > 0) {
          await persistentContext.addCookies(authData.cookies);
        }
      } catch {}
    }
    page = await persistentContext.newPage();
  } else {
    if (!fs.existsSync(platConfig.authFile)) {
      const ok = await ensurePlatformAuth(platKey, { isPersistentMode });
      if (!ok) {
        return {
          platform: prob.platform,
          id: prob.id,
          name: prob.name,
          file: prob.file,
          verdict: 'NOT_AUTHENTICATED',
          success: false,
        };
      }
    }

    context = await createStealthContext(browser, {
      storageStatePath: platConfig.authFile,
    });
    page = await context.newPage();
  }

  try {
    const code = sanitizeCodeForSubmission(rawCode, prob.platform);
    let subRes = null;
    if (platKey === 'codeforces') {
      subRes = await cfEngine.submitCodeforces(page, prob, code, { filePath: solPath });
    } else if (platKey === 'leetcode') {
      subRes = await lcEngine.submitLeetCode(page, prob, code);
    } else if (platKey === 'codechef') {
      subRes = await ccEngine.submitCodeChef(page, prob, code);
    }

    console.log(`    ✓ Submission completed! Verdict: ${subRes?.verdict || 'Submitted'}`);
    const isAcc = /accepted|correct answer|passed/i.test(subRes?.verdict || '');
    return {
      ...subRes,
      id: prob.id,
      name: prob.name,
      file: prob.file,
      timestamp: new Date().toISOString(),
      success: isAcc,
    };
  } catch (err) {
    console.error(`    ✗ Submission failed: ${err.message}`);
    return {
      platform: prob.platform,
      id: prob.id,
      name: prob.name,
      file: prob.file,
      verdict: `ERROR: ${err.message}`,
      success: false,
    };
  } finally {
    if (context) await context.close().catch(() => {});
    else if (page) { await Promise.race([page.close({ runBeforeUnload: false }), new Promise((r) => setTimeout(r, 2000))]).catch(() => {}); }
  }
}

/**
 * Ensures valid authentication exists for a platform.
 * If missing, automatically prompts the user with an interactive browser login window,
 * saves the session, and seamlessly resumes submissions!
 */
async function ensurePlatformAuth(platKey, options = {}) {
  if (options.isPersistentMode) return true;
  const platConfig = PLATFORMS[platKey];
  if (!platConfig) return false;

  if (fs.existsSync(platConfig.authFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(platConfig.authFile, 'utf-8'));
      const cookies = data.cookies || [];
      let isAuthed = false;
      if (platKey === 'leetcode') {
        isAuthed = cookies.some((c) => /leetcode_session/i.test(c.name) && c.value);
      } else if (platKey === 'codechef') {
        isAuthed = cookies.some((c) => /authtoken|remember_me|user_id|^sess/i.test(c.name) && c.value);
      } else if (platKey === 'codeforces') {
        isAuthed = cookies.some((c) => /39af5|39ce7/i.test(c.name) && c.value);
      } else {
        isAuthed = cookies.some((c) => (c.domain || '').toLowerCase().includes(platKey));
      }
      if (isAuthed) return true;
    } catch {}
  }

  console.log(`\n============================================================`);
  console.log(`[auth-required] No active session found for ${platConfig.name}.`);
  console.log(`Opening browser window for you to log in now...`);
  console.log(`Log in to your account; we will automatically save your session and continue!`);
  console.log(`============================================================\n`);

  const ok = await authenticatePlatform(platKey);
  if (ok) {
    console.log(`[submit] ✓ Successfully logged in to ${platConfig.name}! Resuming submissions...\n`);
    return true;
  } else {
    console.warn(`[submit] ✗ Login was not completed for ${platConfig.name}.\n`);
    return false;
  }
}

/**
 * Loads the day's Dead Letter Queue (DLQ) file if present
 */
function loadDLQ(dayDir) {
  if (!dayDir) return [];
  const dlqPath = path.join(dayDir, 'dlq.json');
  if (fs.existsSync(dlqPath)) {
    try {
      return JSON.parse(fs.readFileSync(dlqPath, 'utf-8'));
    } catch {}
  }
  return [];
}

/**
 * Persists the Dead Letter Queue (DLQ) to dlq.json
 */
function saveDLQ(dayDir, dlqItems) {
  if (!dayDir) return;
  const dlqPath = path.join(dayDir, 'dlq.json');
  try {
    fs.writeFileSync(dlqPath, JSON.stringify(dlqItems, null, 2) + '\n', 'utf-8');
  } catch {}
}

/**
 * Resolves difficulty tier for a problem:
 * - 'easy': CF <= 1150, LC Easy, CC <= 1150
 * - 'medium': CF 1151-1450, LC Medium, CC 1151-1450
 * - 'hard': CF > 1450, LC Hard, CC > 1450
 */
function getProblemDifficultyTier(problem) {
  if (!problem) return 'easy';
  const rating = problem.rating;

  if (typeof rating === 'string') {
    const rLower = rating.toLowerCase();
    if (rLower === 'easy') return 'easy';
    if (rLower === 'medium') return 'medium';
    if (rLower === 'hard') return 'hard';
    const num = parseInt(rating, 10);
    if (!isNaN(num)) return getNumericTier(num);
  }

  if (typeof rating === 'number') {
    return getNumericTier(rating);
  }

  return 'medium';
}

function getNumericTier(num) {
  if (num <= 1150) return 'easy';
  if (num <= 1450) return 'medium';
  return 'hard';
}

/**
 * Calculates humanized cooldown interval tailored to the question's difficulty level
 * Capped strictly between 1.0 and 3.0 minutes (60s to 180s):
 * - Easy:   ~1.0 - 1.5 mins (60s - 90s) + jitter (+/- 10s)
 * - Medium: ~1.5 - 2.3 mins (90s - 140s) + jitter (+/- 15s)
 * - Hard:   ~2.3 - 3.0 mins (140s - 180s) + jitter (+/- 10s)
 */
function calculateDifficultyCooldown(currProblem, nextProblem = null, cliArgs = process.argv.slice(2)) {
  const isFast = cliArgs.includes('--fast') || cliArgs.includes('--quick');
  if (isFast) return 3000;

  const i = cliArgs.indexOf('--cooldown');
  if (i !== -1) {
    return resolveCooldownMs(cliArgs);
  }

  const targetProb = nextProblem || currProblem;
  const tier = getProblemDifficultyTier(targetProb);

  let minSec = 65;
  let maxSec = 85;
  let jitterMax = 10;

  if (tier === 'medium') {
    minSec = 95;
    maxSec = 130;
    jitterMax = 15;
  } else if (tier === 'hard') {
    minSec = 145;
    maxSec = 170;
    jitterMax = 10;
  }

  const baseSec = minSec + Math.floor(Math.random() * (maxSec - minSec + 1));
  const jitterSec = Math.floor(Math.random() * (2 * jitterMax + 1)) - jitterMax;
  // Strictly clamp between 60s (1 min) and 180s (3 mins)
  const totalSec = Math.min(180, Math.max(60, baseSec + jitterSec));

  return totalSec * 1000;
}

/**
 * Resolves base cooldown duration from command-line arguments or defaults
 * Default: 1.0 to 3.0 minutes (~60s - 180s) for authentic human pacing.
 */
function resolveCooldownMs(cliArgs = process.argv.slice(2)) {
  const isFast = cliArgs.includes('--fast') || cliArgs.includes('--quick');
  if (isFast) {
    return 3000;
  }

  const i = cliArgs.indexOf('--cooldown');
  const rawVal = i !== -1 ? cliArgs[i + 1] : null;

  if (!rawVal) {
    // Default authentic human pacing: 1.0 to 3.0 minutes (60s - 180s)
    const minSec = 60;
    const maxSec = 180;
    const randomSec = minSec + Math.floor(Math.random() * (maxSec - minSec + 1));
    return randomSec * 1000;
  }

  const str = String(rawVal).trim().toLowerCase();
  let ms = 120000;
  if (str.endsWith('m')) {
    const mins = parseFloat(str.slice(0, -1));
    ms = Math.round(mins * 60 * 1000);
  } else if (str.endsWith('s')) {
    const secs = parseFloat(str.slice(0, -1));
    ms = Math.round(secs * 1000);
  } else {
    const num = parseFloat(str);
    if (isNaN(num)) ms = 120000;
    else if (num < 30) {
      ms = Math.round(num * 60 * 1000);
    } else if (num < 1000) {
      ms = Math.round(num * 1000);
    } else {
      ms = Math.round(num);
    }
  }
  return Math.max(1000, ms);
}

/**
 * Adds natural human variance (+/- 15s) bounded strictly within 1 to 3 minutes
 */
function getCooldownWithJitter(baseMs, isFast = false) {
  if (isFast || baseMs < 15000) return baseMs;
  const jitterSec = Math.floor(Math.random() * 31) - 15; // -15s to +15s
  return Math.min(180000, Math.max(60000, baseMs + jitterSec * 1000));
}

/**
 * Formats milliseconds into MM:SS format
 */
function formatTimeRemaining(ms) {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Interactive ticking countdown timer in terminal
 */
async function sleepWithCountdown(ms, description = 'Cooling down before next submission') {
  if (ms <= 0) return;
  let remaining = ms;

  console.log(`\n⏳ [human-pacing] ${description}`);
  console.log(`   Pacing interval: ${(ms / 60000).toFixed(1)} mins (${Math.round(ms / 1000)}s) to maintain authentic human submission pattern.`);

  return new Promise((resolve) => {
    let pausedNotified = false;
    const timer = setInterval(() => {
      if (isProcessPaused()) {
        if (!pausedNotified) {
          process.stdout.write(`\r   ⏸️  Pacing paused via Monitor Dashboard. Waiting for Play (Resume)...   `);
          pausedNotified = true;
        }
        return;
      }
      if (pausedNotified) {
        pausedNotified = false;
        process.stdout.write(`\r   ▶️  Pacing resumed! Continuing countdown...                            \n`);
      }
      remaining -= 1000;
      if (remaining <= 0) {
        clearInterval(timer);
        process.stdout.write(`\r   ✓ Cooldown complete (00:00). Proceeding now!                           \n\n`);
        resolve();
      } else {
        process.stdout.write(`\r   ⏳ Pacing pause: ${formatTimeRemaining(remaining)} remaining ...   `);
      }
    }, 1000);
  });
}

/**
 * Diagnoses a failed verdict and attempts an automated fix
 */
async function attemptProblemFix(problem, subResult, { dayDir, date }) {
  const solPath = findSolutionFile(problem, dayDir);
  if (!solPath) return false;

  const currentCode = fs.readFileSync(solPath, 'utf-8');
  const plat = getProblemPlatform(problem).toLowerCase();

  // 1. LeetCode Runtime Error signature quick-fix is handled dynamically in leetcode.js

  // 2. AI diagnosis and repair
  if (ai && ai.isReady()) {
    try {
      console.log(`    [fix-flow] Querying AI diagnosis engine with live judge verdict: "${subResult.verdict}" ...`);

      const testsPath = path.join(dayDir, 'tests', `${problem.file}.json`);
      let existingTests = [];
      if (fs.existsSync(testsPath)) {
        try { existingTests = JSON.parse(fs.readFileSync(testsPath, 'utf-8')); } catch {}
      }

      let ragContext = '';
      try {
        const rag = require('../ai/rag');
        const hits = rag.search(`${problem.name} ${(problem.tags || []).join(' ')} ${subResult.verdict}`, { k: 2, minScore: 2 });
        if (hits.length) {
          ragContext = `\nKnowledge Base Algorithmic Invariants & Known Pitfalls:\n${hits.map((h) => `- ${h.title}: ${h.snippet}`).join('\n')}\n`;
        }
      } catch {}

      const prompt = `You are a World Finals Competitive Programming Champion in JavaScript (Node.js).
A previously submitted solution for the following problem failed on ${problem.platform} with live judge verdict: "${subResult.verdict}".

Problem Details:
- Platform: ${problem.platform}
- ID: ${problem.id}
- Name: ${problem.name}
- Rating / Difficulty: ${problem.rating || 'N/A'}
- Tags: ${(problem.tags || []).join(', ') || 'N/A'}
- URL: ${problem.url || 'N/A'}
${ragContext}
CURRENT FAILING CODE:
\`\`\`javascript
${currentCode}
\`\`\`

Diagnose why this solution failed with "${subResult.verdict}". Fix the algorithmic, mathematical, or I/O bug.
CRITICAL RULES:
- STRICT NON-AI RULE: STRICTLY NO COMMENTS (no '//', no '/* */', no JSDoc) anywhere in the code. Pure logic only.
- PURE CP NAMING: Use concise human competitive programming names ('n', 'm', 'k', 'ans', 'dp', 'arr', 'vis', 'solve'). Strictly no filler variables or watermarks.
- PREVENT WRONG ANSWER (WA):
  * Numeric sorting: ALWAYS pass a comparator: 'arr.sort((a, b) => a - b)'. Never call 'arr.sort()' without a comparator on numbers!
  * Modulo arithmetic: Apply '% MOD' after multiplications and additions, and use '((a - b % MOD + MOD) % MOD)' for subtraction.
  * Indexing: Check 0-based vs 1-based indexing and exact string case.
- PREVENT RUNTIME ERROR (RE):
  * Node.js call stack limit: For deep DFS/Tree traversals (N up to 2e5), ALWAYS use iterative BFS or an explicit stack array to prevent stack overflow.
- PREVENT TIME LIMIT EXCEEDED (TLE):
  * Do NOT allocate fixed large MAX arrays inside multi-test loops ('while (t--)'). Allocate dynamically to 'n' or use a static buffer.
  * Use plain Number (< 9e15). Switch to BigInt ONLY if values exceed 9e15.
  * Buffer stdout output into an array and join with '\\n'.
- Return ONLY valid JSON:
{
  "diagnosis": "<concise explanation of bug>",
  "rule": "<generalizable takeaway/rule for future problems>",
  "solution": "<complete corrected JavaScript code>"
}`;

      const res = await ai.complete({
        system: 'You are an expert competitive programming solver fixing an erroneous submission.',
        prompt,
        cache: false,
      });

      let jsonStr = res.text.trim();
      const match = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match) jsonStr = match[1].trim();
      const parsed = JSON.parse(jsonStr);

      if (parsed.solution && typeof parsed.solution === 'string') {
        const candidateCode = parsed.solution.trim();
        console.log(`    [fix-flow] AI Diagnosis: ${parsed.diagnosis || 'Bug identified and corrected'}`);

        let testsPassed = true;
        if (existingTests.length > 0) {
          for (const [tIdx, t] of existingTests.entries()) {
            const runner = `require.main = module;\n${candidateCode}`;
            const r = spawnSync('node', ['-e', runner], {
              input: t.input,
              encoding: 'utf-8',
              timeout: 8000,
            });
            const normalize = (s) => String(s || '').trim().split(/\r?\n/).map((l) => l.trim().split(/\s+/).join(' ')).join('\n');
            if (r.status !== 0 || normalize(r.stdout) !== normalize(t.output)) {
              console.warn(`    [fix-flow] ⚠️ Candidate fix failed local test ${tIdx + 1}`);
              testsPassed = false;
              break;
            }
          }
        }

        if (testsPassed) {
          fs.writeFileSync(solPath, candidateCode + '\n', 'utf-8');
          const rootSol = path.join(REPO_ROOT, 'solutions', `${problem.file}.js`);
          if (fs.existsSync(rootSol)) fs.writeFileSync(rootSol, candidateCode + '\n', 'utf-8');
          console.log(`    [fix-flow] ✓ Successfully validated candidate fix locally!`);

          // Record mistake and lesson learned in RAG memory
          try {
            const rag = require('../ai/rag');
            rag.recordMistake({
              platform: problem.platform,
              id: problem.id,
              name: problem.name,
              file: problem.file,
              verdict: subResult.verdict,
              diagnosis: parsed.diagnosis || 'Auto-fix repair',
              rule: parsed.rule || parsed.diagnosis || '',
              tags: problem.tags || [],
            });
          } catch {}

          return true;
        }
      }
    } catch (err) {
      console.warn(`    [fix-flow] Warning during AI auto-fix: ${err.message}`);
    }
  }

  return false;
}

/**
 * Submits a problem and, if the verdict is non-accepted, initiates the auto-fix loop
 * with realistic human debugging pauses before resubmission.
 */
async function submitWithAutoFix(prob, options) {
  let res = await submitSingleProblem(prob, options);

  if (isVerdictAccepted(res)) {
    return res;
  }

  if (
    res.verdict === 'NO_SOLUTION_FILE' ||
    res.verdict === 'NOT_AUTHENTICATED' ||
    res.verdict === 'UNSUPPORTED_PLATFORM' ||
    (typeof res.verdict === 'string' && res.verdict.startsWith('ERROR:')) ||
    /pending|in queue|judging/i.test(res.verdict || '')
  ) {
    return res;
  }

  console.log(`\n⚠️  [verdict-alert] Problem "${prob.name}" (${prob.id}) returned non-accepted verdict: "${res.verdict}"!`);

  if (options.noFix) {
    console.log(`    [fix-flow] Auto-fix is disabled via --no-fix.`);
    return res;
  }

  const maxFixAttempts = options.maxFixAttempts || 2;
  let attempt = 0;
  let currentRes = res;

  while (attempt < maxFixAttempts && !isVerdictAccepted(currentRes)) {
    attempt++;
    console.log(`\n🔧 [fix-flow] Initiating fix attempt ${attempt}/${maxFixAttempts} for ${prob.name} (${prob.id}) ...`);

    const fixed = await attemptProblemFix(prob, currentRes, options);
    if (!fixed) {
      console.warn(`    [fix-flow] ✗ Automatic fix could not be generated.`);
      break;
    }

    console.log(`    [fix-flow] ✓ Fix verified! Simulating realistic debugging review time before resubmission ...`);
    const debugPauseMs = options.isFast ? 3000 : (60000 + Math.floor(Math.random() * 30000));
    await sleepWithCountdown(debugPauseMs, `Debugging & review pause for ${prob.name} before submitting fix`);

    console.log(`    [fix-flow] Resubmitting corrected code for ${prob.name} (${prob.id}) ...`);
    currentRes = await submitSingleProblem(prob, options);

    if (isVerdictAccepted(currentRes)) {
      console.log(`\n🎉 [fix-flow] SUCCESS! Problem "${prob.name}" is now ACCEPTED on ${prob.platform}!`);
      return currentRes;
    } else {
      console.warn(`\n⚠️  [fix-flow] Resubmission attempt ${attempt} returned: "${currentRes.verdict}"`);
    }
  }

  return currentRes;
}

/**
 * Worker queue that processes a single platform's problems sequentially one-by-one with difficulty-aware cooldown and DLQ
 */
async function processPlatformQueue(platKey, queue, options) {
  const platConfig = PLATFORMS[platKey];
  const tag = `[${platConfig?.name || platKey}]`;

  const isAuthed = await ensurePlatformAuth(platKey, options);
  if (!isAuthed) {
    console.warn(`    ✗ Skipping ${queue.length} problems for ${tag} due to missing authentication.`);
    return queue.map((p) => ({
      platform: p.platform,
      id: p.id,
      name: p.name,
      file: p.file,
      verdict: 'NOT_AUTHENTICATED',
      success: false,
    }));
  }

  const queueResults = [];
  const dlq = [];
  console.log(`\n================================================================`);
  console.log(`>>> Starting Worker Queue for ${tag} (${queue.length} problems in main queue)`);
  console.log(`================================================================`);

  // --- PHASE 1: MAIN QUEUE ---
  for (const [idx, prob] of queue.entries()) {
    await waitIfPaused(tag);
    const tier = getProblemDifficultyTier(prob);
    console.log(`\n${tag} (${idx + 1}/${queue.length}) [Difficulty: ${tier.toUpperCase()}] Processing: ${prob.name} (${prob.id}) ...`);
    const res = await submitWithAutoFix(prob, options);
    queueResults.push(res);

    if (options.submissionsLogPath) {
      try {
        let onDisk = [];
        if (fs.existsSync(options.submissionsLogPath)) {
          try { onDisk = JSON.parse(fs.readFileSync(options.submissionsLogPath, 'utf-8')); } catch {}
        }
        const curLog = mergeSubmissions(onDisk, queueResults);
        fs.writeFileSync(options.submissionsLogPath, JSON.stringify(curLog, null, 2) + '\n', 'utf-8');
      } catch {}
    }

    const isAccepted = isVerdictAccepted(res);
    const isQueued = /pending|in queue|judging/i.test(res.verdict || '');
    if (!isAccepted && !isQueued) {
      if (options.haltOnFail) {
        console.log(`\n⛔ ${tag} [submit] STOPPING queue: Problem "${prob.name}" (${prob.id}) was not accepted (${res.verdict || 'Failed'}).`);
        console.log(`   Worker paused to prevent spamming live judge (--halt-on-fail active).`);
        break;
      } else {
        console.log(`\n⚠️  ${tag} [DLQ-ENQUEUE] Problem "${prob.name}" (${prob.id}) returned non-accepted verdict: "${res.verdict || 'Failed'}".`);
        console.log(`   Moving to Dead Letter Queue (DLQ). Continuing remaining main queue questions...`);
        const dlqEntry = {
          platform: prob.platform,
          id: prob.id,
          name: prob.name,
          file: prob.file,
          tier,
          initialVerdict: res.verdict || 'Failed',
          enqueuedAt: new Date().toISOString(),
          attempts: 1,
          status: 'PENDING_RETRY',
          problem: prob,
        };
        dlq.push(dlqEntry);
        if (options.dayDir) {
          const currentDLQ = loadDLQ(options.dayDir).filter((x) => x.id !== prob.id);
          saveDLQ(options.dayDir, [...currentDLQ, dlqEntry]);
        }
      }
    }

    if (idx < queue.length - 1) {
      await waitIfPaused(tag);
      const nextProb = queue[idx + 1];
      const nextTier = getProblemDifficultyTier(nextProb);
      const waitMs = calculateDifficultyCooldown(prob, nextProb, process.argv.slice(2));
      await sleepWithCountdown(
        waitMs,
        `${tag} Humanized cooldown before [${nextTier.toUpperCase()}] problem ${idx + 2}/${queue.length} (${nextProb.name})`
      );
    }
  }

  // --- PHASE 2: DEAD LETTER QUEUE (DLQ) RESOLUTION ---
  if (dlq.length > 0 && !options.haltOnFail && !options.noDlq) {
    console.log(`\n================================================================`);
    console.log(`🔄 ${tag} Entering Dead Letter Queue (DLQ) Resolution Phase`);
    console.log(`   ${dlq.length} failed question(s) awaiting diagnosis, local verification, and retry.`);
    console.log(`================================================================\n`);

    for (const [dIdx, item] of dlq.entries()) {
      await waitIfPaused(tag);
      const prob = item.problem;
      const debugPauseMs = options.isFast
        ? 3000
        : Math.min(180000, Math.max(60000, Math.round(calculateDifficultyCooldown(prob, null, process.argv.slice(2)) * 0.75)));
      await sleepWithCountdown(
        debugPauseMs,
        `${tag} [DLQ] Realistic debugging & reasoning pause for ${prob.name} (${prob.id})`
      );

      console.log(`\n${tag} [DLQ-RETRY ${dIdx + 1}/${dlq.length}] Diagnosing & resolving: ${prob.name} (${prob.id}) ...`);
      const retryRes = await submitWithAutoFix(prob, options);

      // Update in queue results
      const existIdx = queueResults.findIndex((r) => r.id === prob.id || r.file === prob.file);
      if (existIdx !== -1) {
        queueResults[existIdx] = retryRes;
      } else {
        queueResults.push(retryRes);
      }

      if (options.submissionsLogPath) {
        try {
          let onDisk = [];
          if (fs.existsSync(options.submissionsLogPath)) {
            try { onDisk = JSON.parse(fs.readFileSync(options.submissionsLogPath, 'utf-8')); } catch {}
          }
          const curLog = mergeSubmissions(onDisk, queueResults);
          fs.writeFileSync(options.submissionsLogPath, JSON.stringify(curLog, null, 2) + '\n', 'utf-8');
        } catch {}
      }

      const isResolved = isVerdictAccepted(retryRes);
      if (isResolved) {
        console.log(`\n🎉 ${tag} [DLQ-RESOLVED] SUCCESS! Problem "${prob.name}" is now ACCEPTED on ${prob.platform}!`);
        item.status = 'RESOLVED';
        item.resolvedAt = new Date().toISOString();
        item.finalVerdict = retryRes.verdict;
      } else {
        console.warn(`\n⛔ ${tag} [DLQ-HALT] Problem "${prob.name}" (${prob.id}) failed DLQ retry (${retryRes.verdict}).`);
        console.warn(`   Halting further retries on this question to protect account reputation.`);
        item.status = 'HALTED_UNRESOLVED';
        item.finalVerdict = retryRes.verdict;
      }

      if (options.dayDir) {
        const allDLQ = loadDLQ(options.dayDir);
        const uIdx = allDLQ.findIndex((x) => x.id === item.id);
        if (uIdx !== -1) allDLQ[uIdx] = item;
        else allDLQ.push(item);
        saveDLQ(options.dayDir, allDLQ);
      }
    }
  }

  console.log(`\n<<< Worker for ${tag} completed (Main: ${queue.length}, DLQ: ${dlq.length}).`);
  return queueResults;
}

async function main() {
  const days = existingDays();
  if (days.length === 0) {
    console.error('[submit] No practice days found in practice/days/');
    process.exit(1);
  }

  const date = flag('--date') || days[days.length - 1];
  const dayDir = path.join(PRACTICE_DAYS_DIR, date);
  const setPath = path.join(dayDir, 'set.json');

  const dayLiveLog = path.join(dayDir, 'live.log');
  const globalLiveLog = path.join(REPO_ROOT, 'logs', 'live.log');
  const origStdoutWrite = process.stdout.write.bind(process.stdout);
  const origStderrWrite = process.stderr.write.bind(process.stderr);
  try {
    const logStream = fs.createWriteStream(dayLiveLog, { flags: 'a' });
    const globalLogStream = fs.createWriteStream(globalLiveLog, { flags: 'w' });
    process.stdout.write = (chunk, encoding, cb) => {
      origStdoutWrite(chunk, encoding, cb);
      try { logStream.write(chunk); globalLogStream.write(chunk); } catch {}
    };
    process.stderr.write = (chunk, encoding, cb) => {
      origStderrWrite(chunk, encoding, cb);
      try { logStream.write(chunk); globalLogStream.write(chunk); } catch {}
    };
  } catch {}

  if (!fs.existsSync(setPath)) {
    console.error(`[submit] No set.json found for day ${date}`);
    process.exit(1);
  }

  const set = JSON.parse(fs.readFileSync(setPath, 'utf-8'));
  const filterPlatform = flag('--platform');
  const filterProblem = flag('--problem');
  const isDryRun = args.includes('--dry-run');
  const isHeadless = args.includes('--headless');
  const shouldMirror = args.includes('--mirror');
  const isParallel = !args.includes('--sequential');
  const isFast = args.includes('--fast') || args.includes('--quick');
  const noFix = args.includes('--no-fix');
  const continueOnFail = args.includes('--continue-on-fail');
  const haltOnFail = args.includes('--halt-on-fail');
  const maxFixAttempts = parseInt(flag('--max-fix-attempts') || '2', 10);
  const baseCooldownMs = resolveCooldownMs(args);

  let problems = set.problems || [];
  if (filterPlatform) {
    problems = problems.filter((p) => getProblemPlatform(p).toLowerCase() === filterPlatform.toLowerCase());
  }
  if (filterProblem) {
    problems = problems.filter(
      (p) =>
        p.file.toLowerCase() === filterProblem.toLowerCase() ||
        String(p.id).toLowerCase() === filterProblem.toLowerCase()
    );
  }

  if (problems.length === 0) {
    console.warn(
      `[submit] No matching problems found for criteria (platform: ${filterPlatform || 'any'}, problem: ${filterProblem || 'any'}).`
    );
    return;
  }

  const mirrorAll = args.includes('--all') && shouldMirror;
  if (mirrorAll) {
    console.log(`\n[mirror] Mirroring solutions across all ${days.length} practice days into platform directories ...`);
    for (const d of days) {
      const dDir = path.join(PRACTICE_DAYS_DIR, d);
      const sPath = path.join(dDir, 'set.json');
      if (fs.existsSync(sPath)) {
        const s = JSON.parse(fs.readFileSync(sPath, 'utf-8'));
        mirrorSolutionsByPlatform(s.problems || [], dDir, d);
      }
    }
    if (isDryRun) return;
  }

  if (shouldMirror && !mirrorAll) {
    mirrorSolutionsByPlatform(problems, dayDir, date);
  }

  const submissionsLogPath = path.join(dayDir, 'submissions.json');
  let historicalSubmissions = [];
  if (fs.existsSync(submissionsLogPath)) {
    try {
      historicalSubmissions = JSON.parse(fs.readFileSync(submissionsLogPath, 'utf-8'));
    } catch {}
  }

  const isStatus = args.includes('--status');
  const isFailedOnly = args.includes('--failed-only') || args.includes('--retry');
  const forceResubmit = args.includes('--force');

  if (isStatus) {
    printSubmissionStatus(problems, historicalSubmissions, date, dayDir);
    return;
  }

  if (isDryRun) {
    await runDryRun(problems, dayDir, date, isParallel, historicalSubmissions);
    return;
  }

  // Filter problems based on status
  let pendingProblems = [];
  let retryProblems = [];
  let skippedProblems = [];
  let missingCodeProblems = [];

  for (const p of problems) {
    const statusInfo = getProblemStatus(p, historicalSubmissions, dayDir);
    if (statusInfo.status === 'MISSING_CODE') {
      missingCodeProblems.push(p);
      continue;
    }

    if (statusInfo.status === 'ACCEPTED' && !forceResubmit) {
      skippedProblems.push({ problem: p, record: statusInfo.acceptedRecord });
    } else if (statusInfo.status === 'FAILED') {
      retryProblems.push(p);
    } else {
      if (isFailedOnly) {
        skippedProblems.push({ problem: p, record: null, reason: 'Pending (skipped due to --failed-only)' });
      } else {
        pendingProblems.push(p);
      }
    }
  }

  if (skippedProblems.length > 0) {
    console.log(`\n[submit] Skipping ${skippedProblems.length} problem(s):`);
    for (const { problem: p, record: r } of skippedProblems) {
      if (r) {
        const idStr = r.submissionId ? ` (#${r.submissionId})` : '';
        console.log(`  ✓ [${p.platform}] ${p.name || p.id}: Already Accepted${idStr}`);
      } else {
        console.log(`  - [${p.platform}] ${p.name || p.id}: Pending (skipped due to --failed-only)`);
      }
    }
  }

  if (missingCodeProblems.length > 0) {
    console.warn(`\n[submit] Missing code for ${missingCodeProblems.length} problem(s) (cannot submit):`);
    for (const p of missingCodeProblems) {
      console.warn(`  ✗ [${p.platform}] ${p.name || p.id}: ${p.file}.js not found`);
    }
  }

  const toSubmit = [...retryProblems, ...pendingProblems];

  if (toSubmit.length === 0) {
    if (skippedProblems.length > 0 && retryProblems.length === 0 && pendingProblems.length === 0) {
      console.log(`\n🎉 All ${problems.length} problems for ${date} have already been successfully submitted and Accepted!`);
      console.log(`   (Pass --force to re-submit all problems anyway).\n`);
    } else {
      console.log(`\n[submit] No problems eligible for submission with current filters.`);
    }
    return;
  }

  console.log(`\n[submit] Execution Plan for Day ${set.day} (${date}):`);
  console.log(`  • Already Accepted (SKIPPED): ${skippedProblems.filter((x) => x.record).length}`);
  if (retryProblems.length > 0) {
    console.log(`  • Failed Cases (RETRYING):    ${retryProblems.length}`);
  }
  if (pendingProblems.length > 0) {
    console.log(`  • Pending Cases (SUBMITTING): ${pendingProblems.length}`);
  }
  console.log(`  • Total to Submit Now:        ${toSubmit.length}\n`);

  problems = toSubmit;

  console.log(`\n================================================================`);
  console.log(`Initiating Playwright Platform Submissions for Day ${set.day} (${date})`);
  console.log(
    `Target Problems: ${problems.length} | Strategy: ${isParallel ? 'Parallel Platforms' : 'Sequential'} | Mode: ${isHeadless ? 'Headless' : 'Headed'}`
  );
  console.log(`================================================================\n`);


  const noCdp = args.includes('--no-cdp');
  const cdpPort = parseInt(flag('--cdp-port') || '9222', 10);
  const useSystemChrome = args.includes('--use-system-chrome') || args.includes('--chrome-profile');
  const usePersistent = args.includes('--persistent');
  const useCdp = !noCdp && (!useSystemChrome && !usePersistent);
  const isPersistentMode = useSystemChrome || usePersistent || useCdp;

  let browser = null;
  let persistentContext = null;

  if (useCdp) {
    console.log(`[submit] Connecting to Chrome via CDP (port ${cdpPort}) [Standard Daily Flow] ...`);
    browser = await ensureCDPChrome({ port: cdpPort });
    persistentContext = browser.contexts()[0] || (await browser.newContext());
  } else if (isPersistentMode) {
    console.log(
      `[submit] Launching persistent Chrome context (${useSystemChrome ? 'System Chrome Profile' : 'Dedicated Automation Profile'}) ...`
    );
    persistentContext = await launchPersistentBrowserContext({
      useSystemProfile: useSystemChrome,
      headless: isHeadless,
    });
  } else {
    console.log(`[submit] Launching browser engine ...`);
    browser = await launchBrowser({ headless: isHeadless });
  }

  const workerOptions = {
    dayDir,
    date,
    browser,
    persistentContext,
    isPersistentMode,
    baseCooldownMs,
    isFast,
    noFix,
    continueOnFail,
    haltOnFail,
    maxFixAttempts,
    submissionsLogPath,
    historicalSubmissions,
  };

  let results = [];

  try {
    if (isParallel) {
      // Group problems by platform
      const queueMap = {};
      for (const prob of problems) {
        const platKey = getProblemPlatform(prob).toLowerCase();
        if (!queueMap[platKey]) queueMap[platKey] = [];
        queueMap[platKey].push(prob);
      }

      console.log(`[submit] Running ${Object.keys(queueMap).length} platform workers in PARALLEL:`);
      for (const [k, q] of Object.entries(queueMap)) {
        console.log(`  · ${PLATFORMS[k]?.name || k}: ${q.length} problems one-by-one`);
      }

      const workerPromises = Object.entries(queueMap).map(([platKey, queue]) =>
        processPlatformQueue(platKey, queue, workerOptions)
      );

      const workerOutputs = await Promise.all(workerPromises);
      results = workerOutputs.flat();
    } else {
      // Sequential single queue
      const dlq = [];
      for (const [idx, prob] of problems.entries()) {
        await waitIfPaused('[runner]');
        const tier = getProblemDifficultyTier(prob);
        console.log(`\n================================================================`);
        console.log(`[${idx + 1}/${problems.length}] [Difficulty: ${tier.toUpperCase()}] Processing [${prob.platform}] ${prob.name} (${prob.id}) ...`);
        console.log(`================================================================`);

        const res = await submitWithAutoFix(prob, workerOptions);
        results.push(res);

        // Incremental save after each submission so progress is never lost
        const incrementalLog = mergeSubmissions(historicalSubmissions, results);
        fs.writeFileSync(submissionsLogPath, JSON.stringify(incrementalLog, null, 2) + '\n', 'utf-8');

        const isAccepted = isVerdictAccepted(res);
        const isQueued = /pending|in queue|judging/i.test(res.verdict || '');
        if (!isAccepted && !isQueued) {
          if (haltOnFail) {
            console.log(`\n⛔ [submit] STOPPING: Problem "${prob.name}" (${prob.id}) was not accepted on ${prob.platform} (${res.verdict || 'Failed'}).`);
            console.log(`   To protect your live account reputation and avoid spamming failed submissions, execution has paused.`);
            break;
          } else {
            console.log(`\n⚠️  [DLQ-ENQUEUE] Problem "${prob.name}" (${prob.id}) returned non-accepted verdict: "${res.verdict || 'Failed'}".`);
            console.log(`   Moving to Dead Letter Queue (DLQ). Continuing remaining questions in queue...\n`);
            const dlqEntry = {
              platform: prob.platform,
              id: prob.id,
              name: prob.name,
              file: prob.file,
              tier,
              initialVerdict: res.verdict || 'Failed',
              enqueuedAt: new Date().toISOString(),
              attempts: 1,
              status: 'PENDING_RETRY',
              problem: prob,
            };
            dlq.push(dlqEntry);
            saveDLQ(dayDir, [...loadDLQ(dayDir).filter((x) => x.id !== prob.id), dlqEntry]);
          }
        }

        if (idx < problems.length - 1) {
          const nextProb = problems[idx + 1];
          const nextTier = getProblemDifficultyTier(nextProb);
          const waitMs = calculateDifficultyCooldown(prob, nextProb, process.argv.slice(2));
          await sleepWithCountdown(
            waitMs,
            `Humanized cooldown before [${nextTier.toUpperCase()}] problem ${idx + 2}/${problems.length} (${nextProb.name})`
          );
        }
      }

      if (dlq.length > 0 && !haltOnFail && !workerOptions.noDlq) {
        console.log(`\n================================================================`);
        console.log(`🔄 Entering Dead Letter Queue (DLQ) Resolution Phase`);
        console.log(`   ${dlq.length} failed question(s) awaiting diagnosis, local verification, and retry.`);
        console.log(`================================================================\n`);

        for (const [dIdx, item] of dlq.entries()) {
          const prob = item.problem;
          const debugPauseMs = isFast
            ? 3000
            : Math.round(calculateDifficultyCooldown(prob, null, process.argv.slice(2)) * 0.7);
          await sleepWithCountdown(debugPauseMs, `[DLQ] Realistic debugging pause for ${prob.name} (${prob.id})`);

          console.log(`\n[DLQ-RETRY ${dIdx + 1}/${dlq.length}] Diagnosing & resolving: ${prob.name} (${prob.id}) ...`);
          const retryRes = await submitWithAutoFix(prob, workerOptions);

          const existIdx = results.findIndex((r) => r.id === prob.id || r.file === prob.file);
          if (existIdx !== -1) {
            results[existIdx] = retryRes;
          } else {
            results.push(retryRes);
          }

          const incrementalLog = mergeSubmissions(historicalSubmissions, results);
          fs.writeFileSync(submissionsLogPath, JSON.stringify(incrementalLog, null, 2) + '\n', 'utf-8');

          const isResolved = isVerdictAccepted(retryRes);
          if (isResolved) {
            console.log(`\n🎉 [DLQ-RESOLVED] SUCCESS! Problem "${prob.name}" is now ACCEPTED on ${prob.platform}!`);
            item.status = 'RESOLVED';
            item.resolvedAt = new Date().toISOString();
            item.finalVerdict = retryRes.verdict;
          } else {
            console.warn(`\n⛔ [DLQ-HALT] Problem "${prob.name}" (${prob.id}) failed DLQ retry (${retryRes.verdict}).`);
            item.status = 'HALTED_UNRESOLVED';
            item.finalVerdict = retryRes.verdict;
          }

          const allDLQ = loadDLQ(dayDir);
          const uIdx = allDLQ.findIndex((x) => x.id === item.id);
          if (uIdx !== -1) allDLQ[uIdx] = item;
          else allDLQ.push(item);
          saveDLQ(dayDir, allDLQ);
        }
      }
    }
  } finally {
    if (!useCdp) {
      if (browser) await browser.close().catch(() => {});
      if (persistentContext) await persistentContext.close().catch(() => {});
    }
  }

  // Save submissions log (deduplicated by platform and problem)
  const combinedLog = mergeSubmissions(historicalSubmissions, results);
  fs.writeFileSync(submissionsLogPath, JSON.stringify(combinedLog, null, 2) + '\n', 'utf-8');
  console.log(`\n[submit] Saved submission records to: ${path.relative(REPO_ROOT, submissionsLogPath)}`);


  // Summary Table
  console.log(`\n================================================================`);
  console.log(`Submission Results Summary for Day ${set.day} (${date})`);
  console.log(`================================================================\n`);
  console.log('| # | Platform | ID | Problem | Verdict | Details |');
  console.log('|---|:---:|:---:|---|:---:|---|');

  for (const [idx, r] of results.entries()) {
    const details = [r.time, r.memory, r.runtimeBeats].filter(Boolean).join(' / ') || r.submissionUrl || '-';
    console.log(`| ${idx + 1} | ${r.platform} | ${r.id} | ${r.name || r.file} | **${r.verdict}** | ${details} |`);
  }
  console.log('\n================================================================\n');

  // DLQ Summary Table if DLQ items exist
  const dlqSummary = loadDLQ(dayDir);
  if (dlqSummary.length > 0) {
    console.log(`================================================================`);
    console.log(`Dead Letter Queue (DLQ) Tracking Summary`);
    console.log(`================================================================\n`);
    console.log('| # | Platform | ID | Problem | Tier | Initial Verdict | DLQ Status | Final Verdict |');
    console.log('|---|:---:|:---:|---|:---:|:---:|:---:|:---:|');
    for (const [idx, item] of dlqSummary.entries()) {
      console.log(`| ${idx + 1} | ${item.platform} | ${item.id} | ${item.name || item.file} | ${item.tier || '-'} | ${item.initialVerdict} | **${item.status}** | ${item.finalVerdict || item.initialVerdict} |`);
    }
    console.log('\n================================================================\n');
  }

  if (fs.existsSync(PAUSE_FILE)) {
    try { fs.unlinkSync(PAUSE_FILE); } catch {}
  }
  process.exit(0);
}

if (require.main === module) {
  main().catch((err) => {
    if (fs.existsSync(PAUSE_FILE)) {
      try { fs.unlinkSync(PAUSE_FILE); } catch {}
    }
    console.error(`[submit] Fatal error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = {
  findSolutionFile,
  getProblemPlatform,
  submitSingleProblem,
  submitWithAutoFix,
  attemptProblemFix,
  resolveCooldownMs,
  getCooldownWithJitter,
  formatTimeRemaining,
  sleepWithCountdown,
  processPlatformQueue,
  runDryRun,
  mirrorSolutionsByPlatform,
  normalizeId,
  isRecordForProblem,
  isVerdictAccepted,
  isProblemAccepted,
  getProblemStatus,
  mergeSubmissions,
  printSubmissionStatus,
  loadDLQ,
  saveDLQ,
  getProblemDifficultyTier,
  calculateDifficultyCooldown,
};


/**
 * Playwright Day-Wise Platform Submission Engine
 * Submits solved problems for any practice day directly to Codeforces, LeetCode, and CodeChef.
 * Supports sequential single-platform runs and multi-platform parallel worker queues.
 */

const fs = require('fs');
const path = require('path');
const { launchBrowser, createStealthContext, launchPersistentBrowserContext } = require('./browser');
const { PLATFORMS, PRACTICE_DAYS_DIR, REPO_ROOT } = require('./config');
const cfEngine = require('./platforms/codeforces');
const lcEngine = require('./platforms/leetcode');
const ccEngine = require('./platforms/codechef');
const { authenticatePlatform } = require('./auth');
const { sanitizeCodeForSubmission } = require('./sanitize');

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
    path.join(dayDir, 'solutions', `${problem.file}.sql`),
    path.join(dayDir, 'solutions', `${problem.file}.js`),
    path.join(dayDir, 'attempts', `${problem.file}.js`),
    path.join(REPO_ROOT, 'practice', 'platforms', platKey, dateStr, `${problem.file}.js`),
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
  if (sub.success === true) return true;
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
      verdictText = 'Not attempted';
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
    console.log(`   node practice/playwright/submit.js --date ${date} --failed-only`);
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
  console.log(`  • To submit unaccepted/failed problems: node practice/playwright/submit.js --date ${date}`);
  console.log(`  • To resubmit ONLY failed cases:        node practice/playwright/submit.js --date ${date} --failed-only`);
  console.log(`  • To force resubmission of all:          node practice/playwright/submit.js --date ${date} --force\n`);
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
    const targetDir = path.join(REPO_ROOT, 'practice', 'platforms', platKey, date);
    fs.mkdirSync(targetDir, { recursive: true });

    const targetFile = path.join(targetDir, `${p.file}.js`);
    fs.copyFileSync(solPath, targetFile);
    mirrored++;
  }

  console.log(`  ✓ Mirrored ${mirrored} solutions into practice/platforms/<platform>/${date}/\n`);
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
    return {
      ...subRes,
      id: prob.id,
      name: prob.name,
      file: prob.file,
      timestamp: new Date().toISOString(),
      success: !/wrong answer|runtime error|compile error|time limit/i.test(subRes?.verdict || ''),
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
    else if (page) await page.close().catch(() => {});
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
    return true;
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
 * Worker queue that processes a single platform's problems sequentially one-by-one with cooldown
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
  console.log(`\n>>> Starting worker for ${tag} (${queue.length} problems) ...`);

  for (const [idx, prob] of queue.entries()) {
    console.log(`\n${tag} (${idx + 1}/${queue.length}) Processing: ${prob.name} (${prob.id}) ...`);
    const res = await submitSingleProblem(prob, options);
    queueResults.push(res);

    if (idx < queue.length - 1) {
      console.log(`    ${tag} [cooldown] Waiting ${options.cooldownMs / 1000}s before next problem ...`);
      await new Promise((r) => setTimeout(r, options.cooldownMs));
    }
  }

  console.log(`\n<<< Worker for ${tag} finished all ${queue.length} problems.`);
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
  const isParallel = args.includes('--parallel');
  const cooldownMs = parseInt(flag('--cooldown') || '4000', 10);

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


  const useSystemChrome = args.includes('--use-system-chrome') || args.includes('--chrome-profile');
  const usePersistent = args.includes('--persistent');
  const isPersistentMode = useSystemChrome || usePersistent;

  let browser = null;
  let persistentContext = null;

  if (isPersistentMode) {
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
    browser,
    persistentContext,
    isPersistentMode,
    cooldownMs,
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
      for (const [idx, prob] of problems.entries()) {
        console.log(`\n[${idx + 1}/${problems.length}] Processing [${prob.platform}] ${prob.name} (${prob.id}) ...`);
        const res = await submitSingleProblem(prob, workerOptions);
        results.push(res);

        if (idx < problems.length - 1) {
          console.log(`    [cooldown] Waiting ${cooldownMs / 1000}s before next submission ...`);
          await new Promise((r) => setTimeout(r, cooldownMs));
        }
      }
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (persistentContext) await persistentContext.close().catch(() => {});
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
}

if (require.main === module) {
  main().catch((err) => {
    console.error(`[submit] Fatal error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = {
  findSolutionFile,
  getProblemPlatform,
  submitSingleProblem,
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
};


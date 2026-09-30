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

async function runDryRun(problems, dayDir, date, isParallel = false) {
  console.log(`\n=== DRY RUN: Day-Wise Submission Preview for ${date} ===\n`);
  console.log(`Total Problems in Set: ${problems.length}`);
  if (isParallel) {
    console.log(`Execution Strategy: Parallel Platform Workers (LeetCode, Codeforces, CodeChef in parallel)`);
  } else {
    console.log(`Execution Strategy: Sequential One-by-One Queue`);
  }

  let readyCount = 0;
  let missingCount = 0;

  console.log('\n| # | Platform | Problem ID | Title | Solution File | Auth Saved | Status |');
  console.log('|---|:---:|:---:|---|---|:---:|:---:|');

  for (const [i, p] of problems.entries()) {
    const solPath = findSolutionFile(p, dayDir);
    const platformName = getProblemPlatform(p);
    const platKey = platformName.toLowerCase();
    const plat = PLATFORMS[platKey];
    const hasAuth = plat && fs.existsSync(plat.authFile);

    let status = 'READY';
    if (!solPath) {
      status = 'MISSING_CODE';
      missingCount++;
    } else if (!hasAuth) {
      status = 'NO_AUTH';
      readyCount++;
    } else {
      readyCount++;
    }

    const relPath = solPath ? path.relative(REPO_ROOT, solPath) : 'NOT FOUND';
    const authStatus = hasAuth ? '✓' : '✗';
    console.log(
      `| ${i + 1} | ${platformName} | ${p.id} | ${p.name} | \`${relPath}\` | ${authStatus} | **${status}** |`
    );
  }

  console.log(`\nDry run completed: ${readyCount} code files located, ${missingCount} missing code files.`);
  console.log(`To perform actual submissions, run without --dry-run:\n  node practice/playwright/submit.js --date ${date}\n`);
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
    let subRes = null;
    if (platKey === 'codeforces') {
      subRes = await cfEngine.submitCodeforces(page, prob, rawCode, { filePath: solPath });
    } else if (platKey === 'leetcode') {
      subRes = await lcEngine.submitLeetCode(page, prob, rawCode);
    } else if (platKey === 'codechef') {
      subRes = await ccEngine.submitCodeChef(page, prob, rawCode);
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

  if (isDryRun) {
    await runDryRun(problems, dayDir, date, isParallel);
    return;
  }

  console.log(`\n================================================================`);
  console.log(`Initiating Playwright Platform Submissions for Day ${set.day} (${date})`);
  console.log(
    `Target Problems: ${problems.length} | Strategy: ${isParallel ? 'Parallel Platforms' : 'Sequential'} | Mode: ${isHeadless ? 'Headless' : 'Headed'}`
  );
  console.log(`================================================================\n`);

  const submissionsLogPath = path.join(dayDir, 'submissions.json');
  let historicalSubmissions = [];
  if (fs.existsSync(submissionsLogPath)) {
    try {
      historicalSubmissions = JSON.parse(fs.readFileSync(submissionsLogPath, 'utf-8'));
    } catch {}
  }

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

  // Save submissions log
  const combinedLog = [...historicalSubmissions, ...results];
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
};

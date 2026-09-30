/**
 * Playwright Day-Wise Platform Submission Engine
 * Submits solved problems for any practice day directly to Codeforces, LeetCode, and CodeChef.
 */

const fs = require('fs');
const path = require('path');
const { launchBrowser, createStealthContext, launchPersistentBrowserContext } = require('./browser');
const { PLATFORMS, PRACTICE_DAYS_DIR, REPO_ROOT } = require('./config');
const cfEngine = require('./platforms/codeforces');
const lcEngine = require('./platforms/leetcode');
const ccEngine = require('./platforms/codechef');

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
  const candidates = [
    path.join(dayDir, 'solutions', `${problem.file}.js`),
    path.join(dayDir, 'attempts', `${problem.file}.js`),
    path.join(REPO_ROOT, 'solutions', `${problem.file}.js`),
    path.join(REPO_ROOT, `${problem.file}.js`),
  ];
  return candidates.find((c) => fs.existsSync(c)) || null;
}

async function runDryRun(problems, dayDir, date) {
  console.log(`\n=== DRY RUN: Day-Wise Submission Preview for ${date} ===\n`);
  console.log(`Total Problems in Set: ${problems.length}`);

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
 * Organizes or mirrors day-wise solutions into platform-specific contest/archive folders
 */
function mirrorSolutionsByPlatform(problems, dayDir, date) {
  console.log(`\n[mirror] Mirroring Day ${date} solutions into platform directories ...`);
  let mirrored = 0;

  for (const p of problems) {
    const solPath = findSolutionFile(p, dayDir);
    if (!solPath) continue;

    const platKey = getProblemPlatform(p).toLowerCase();
    const targetDir = path.join(REPO_ROOT, 'contests', platKey, date);
    fs.mkdirSync(targetDir, { recursive: true });

    const targetFile = path.join(targetDir, `${p.file}.js`);
    fs.copyFileSync(solPath, targetFile);
    mirrored++;
  }

  console.log(`  ✓ Mirrored ${mirrored} solutions into contests/<platform>/${date}/\n`);
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
  const cooldownMs = parseInt(flag('--cooldown') || '4000', 10);

  let problems = set.problems || [];
  if (filterPlatform) {
    problems = problems.filter((p) => (p.platform || '').toLowerCase() === filterPlatform.toLowerCase());
  }
  if (filterProblem) {
    problems = problems.filter(
      (p) =>
        p.file.toLowerCase() === filterProblem.toLowerCase() ||
        String(p.id).toLowerCase() === filterProblem.toLowerCase()
    );
  }

  if (problems.length === 0) {
    console.warn(`[submit] No matching problems found for criteria (platform: ${filterPlatform || 'any'}, problem: ${filterProblem || 'any'}).`);
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
    await runDryRun(problems, dayDir, date);
    return;
  }

  console.log(`\n================================================================`);
  console.log(`Initiating Playwright Platform Submissions for Day ${set.day} (${date})`);
  console.log(`Target Problems: ${problems.length} | Mode: ${isHeadless ? 'Headless' : 'Headed'}`);
  console.log(`================================================================\n`);

  const results = [];
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

  try {
    for (const [idx, prob] of problems.entries()) {
      console.log(`\n[${idx + 1}/${problems.length}] Processing [${prob.platform}] ${prob.name} (${prob.id}) ...`);

      const solPath = findSolutionFile(prob, dayDir);
      if (!solPath) {
        console.warn(`    ✗ Missing solution code for ${prob.file}. Skipping.`);
        results.push({
          platform: prob.platform,
          id: prob.id,
          name: prob.name,
          file: prob.file,
          verdict: 'NO_SOLUTION_FILE',
          success: false,
        });
        continue;
      }

      const rawCode = fs.readFileSync(solPath, 'utf-8');
      const platKey = (prob.platform || '').toLowerCase();
      const platConfig = PLATFORMS[platKey];

      if (!platConfig) {
        console.warn(`    ✗ Unsupported platform: "${prob.platform}". Skipping.`);
        results.push({
          platform: prob.platform,
          id: prob.id,
          name: prob.name,
          verdict: 'UNSUPPORTED_PLATFORM',
          success: false,
        });
        continue;
      }

      let context = null;
      let page = null;

      if (isPersistentMode) {
        page = await persistentContext.newPage();
      } else {
        // Check auth file
        if (!fs.existsSync(platConfig.authFile)) {
          console.warn(
            `    ✗ No saved session for ${platConfig.name}. Please authenticate first via: npm run submit:auth -- --platform ${platKey}`
          );
          results.push({
            platform: prob.platform,
            id: prob.id,
            name: prob.name,
            verdict: 'NOT_AUTHENTICATED',
            success: false,
          });
          continue;
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

        console.log(`    ✓ Submission completed! Verdict: ${subRes.verdict || 'Submitted'}`);
        results.push({
          ...subRes,
          id: prob.id,
          name: prob.name,
          file: prob.file,
          timestamp: new Date().toISOString(),
          success: !/wrong answer|runtime error|compile error|time limit/i.test(subRes.verdict || ''),
        });
      } catch (err) {
        console.error(`    ✗ Submission failed: ${err.message}`);
        results.push({
          platform: prob.platform,
          id: prob.id,
          name: prob.name,
          file: prob.file,
          verdict: `ERROR: ${err.message}`,
          success: false,
        });
      } finally {
        if (context) await context.close().catch(() => {});
        else if (page) await page.close().catch(() => {});
      }

      // Cooldown delay between submissions
      if (idx < problems.length - 1) {
        console.log(`    [cooldown] Waiting ${cooldownMs / 1000}s before next submission ...`);
        await new Promise((r) => setTimeout(r, cooldownMs));
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
  runDryRun,
  mirrorSolutionsByPlatform,
};

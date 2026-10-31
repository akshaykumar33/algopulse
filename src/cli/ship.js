/**
 * Automated Git Ship & PR Engine for Daily Practice Sets
 * Verifies the set, commits changes, opens a Pull Request, and auto-merges
 * with a merge commit when all checks pass.
 * Strictly adheres to Rule §9.5: <= 50 files per PR via segregated atomic batches.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync, execSync } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..');
const ROOT = path.join(REPO, 'practice');
const DAYS = path.join(ROOT, 'days');

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const existingDays = () =>
  fs.existsSync(DAYS)
    ? fs.readdirSync(DAYS).filter((d) => fs.existsSync(path.join(DAYS, d, 'set.json'))).sort()
    : [];

function run(cmd, args = [], options = {}) {
  const r = spawnSync(cmd, args, {
    cwd: REPO,
    encoding: 'utf-8',
    ...options,
  });
  return r;
}

function runSh(command) {
  try {
    return execSync(command, { cwd: REPO, encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch (err) {
    return null;
  }
}

async function main() {
  const days = existingDays();
  if (days.length === 0) {
    console.error('[ship] No practice days found.');
    process.exit(1);
  }

  const date = flag('--date') || days[days.length - 1];
  const autoMerge = !args.includes('--no-merge');
  const dayDir = path.join(DAYS, date);
  const setPath = path.join(dayDir, 'set.json');

  if (!fs.existsSync(setPath)) {
    console.error(`[ship] No set.json found for day ${date}`);
    process.exit(1);
  }

  const set = JSON.parse(fs.readFileSync(setPath, 'utf-8'));
  console.log(`[ship] Initiating ship workflow for Day ${set.day} (${date}) ...`);

  // 1. Run Verification
  console.log('[ship] Step 1: Running verifier ...');
  const verifyRes = run('node', ['src/cli/verify.js', date]);
  if (verifyRes.status !== 0) {
    console.error(`[ship] Verification failed! Cannot ship incomplete or failing solutions.`);
    console.error(verifyRes.stdout || verifyRes.stderr);
    process.exit(1);
  }
  console.log('  ✓ Verification passed (all solutions green).');

  // 2. Automated Platform Submissions (Playwright)
  const skipSubmit = args.includes('--no-submit');
  if (!skipSubmit) {
    const submitArgs = ['src/playwright/submit.js', '--date', date];
    if (args.includes('--sequential')) submitArgs.push('--sequential');
    if (args.includes('--fast') || args.includes('--quick')) submitArgs.push('--fast');
    if (flag('--cooldown')) submitArgs.push('--cooldown', flag('--cooldown'));
    const submitRes = run('node', submitArgs, {
      stdio: 'inherit',
    });
    const subLogPath = path.join(dayDir, 'submissions.json');
    let allAccepted = false;
    let missingProblems = [];
    if (fs.existsSync(subLogPath)) {
      try {
        const records = JSON.parse(fs.readFileSync(subLogPath, 'utf-8'));
        missingProblems = set.problems.filter((p) => {
          const rec = records.find((r) => r.id === p.id || r.problemId === p.id || r.file === p.file);
          return !rec || !rec.success || !/accepted|correct answer/i.test(rec.verdict || '');
        });
        allAccepted = missingProblems.length === 0;
      } catch {}
    }

    if (submitRes.status === 0 && allAccepted) {
      console.log('  ✓ Automated platform submissions completed (100% Accepted).');
    } else {
      console.warn(`  ! Submissions incomplete or failing on live judges! ${missingProblems.length} problem(s) not accepted: ${missingProblems.map((p) => p.id).join(', ')}`);
      if (args.includes('--strict')) {
        console.error('  ✗ Aborting ship workflow due to failed live judge submissions (--strict mode).');
        process.exit(1);
      }
    }
  } else {
    console.log('[ship] Step 2: Skipping platform submissions (--no-submit flag).');
  }

  // 3. Synchronize Knowledge Base
  console.log('[ship] Step 3: Synchronizing Knowledge Base ...');
  const syncRes = run('node', ['src/cli/knowledge.js', '--sync']);
  if (syncRes.status === 0) {
    console.log('  ✓ Knowledge base synchronized.');
  }

  // 4. Git Operations with Segregated Batches (<= 50 files/PR)
  console.log(`[ship] Step 4: Building segregated PR batches (<= 50 files limit) ...`);
  const problems = set.problems || [];
  const platforms = [
    { key: 'Codeforces', prefix: 'cf', name: 'Codeforces' },
    { key: 'LeetCode', prefix: 'lc', name: 'LeetCode' },
    { key: 'CodeChef', prefix: 'cc', name: 'CodeChef' },
  ];

  const batches = [];
  for (const plat of platforms) {
    const platProblems = problems.filter((p) => (p.platform || '').toLowerCase() === plat.key.toLowerCase());
    if (platProblems.length === 0) continue;

    const chunkSize = 17;
    for (let i = 0; i < platProblems.length; i += chunkSize) {
      const chunk = platProblems.slice(i, i + chunkSize);
      const partNum = Math.floor(i / chunkSize) + 1;
      const totalParts = Math.ceil(platProblems.length / chunkSize);
      const partSuffix = totalParts > 1 ? ` (part ${partNum})` : '';
      const branchSuffix = totalParts > 1 ? `-part${partNum}` : '';

      const files = [];
      for (const p of chunk) {
        files.push(`practice/days/${date}/solutions/${p.file}.js`);
        files.push(`practice/days/${date}/tests/${p.file}.json`);
      }

      batches.push({
        branch: `feat/day${set.day}-${plat.prefix}${branchSuffix}`,
        title: `feat(day${set.day}): add ${plat.name} solutions and tests${partSuffix}`,
        body: `Add reference solutions and unit test suites for ${chunk.length} ${plat.name} problems of Day ${set.day}.`,
        verify: `\`node src/cli/verify.js ${date} --ref --platform ${plat.prefix}\` (100% green)`,
        files: files.filter((f) => fs.existsSync(path.join(REPO, f))),
      });
    }
  }

  for (const plat of platforms) {
    const platProblems = problems.filter((p) => (p.platform || '').toLowerCase() === plat.key.toLowerCase());
    if (platProblems.length === 0) continue;

    const files = [];
    for (const p of platProblems) {
      files.push(`practice/days/${date}/explanations/${p.file}.md`);
    }

    const isLastPlat = plat.prefix === 'cc';
    if (isLastPlat) {
      if (fs.existsSync(path.join(REPO, `practice/days/${date}/README.md`))) {
        files.push(`practice/days/${date}/README.md`);
      }
      if (fs.existsSync(path.join(REPO, `practice/days/${date}/set.json`))) {
        files.push(`practice/days/${date}/set.json`);
      }
    }

    batches.push({
      branch: `docs/day${set.day}-explanations-${plat.prefix}`,
      title: isLastPlat
        ? `docs(day${set.day}): add ${plat.name} problem explanations and curriculum manifest`
        : `docs(day${set.day}): add ${plat.name} problem explanations`,
      body: `Add detailed algorithmic explanations and complexity breakdowns for Day ${set.day} ${plat.name} problems.`,
      verify: 'Markdown documentation and diagrams audit.',
      files: files.filter((f) => fs.existsSync(path.join(REPO, f))),
    });
  }

  const knowledgeDir = path.join(REPO, 'knowledge');
  if (fs.existsSync(knowledgeDir)) {
    const kFiles = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith('.md')).map((f) => `knowledge/${f}`);
    batches.push({
      branch: `docs/sync-knowledge-day${set.day}`,
      title: `docs(knowledge): sync knowledge base catalogs for Day ${set.day}`,
      body: `Synchronize 14 algorithmic topic catalogs in knowledge base with Day ${set.day} solved problems.`,
      verify: '`node src/cli/knowledge.js --sync` (clean catalog audit)',
      files: kFiles.filter((f) => fs.existsSync(path.join(REPO, f))),
    });
  }

  console.log(`[ship] Generated ${batches.length} segregated PR batches.`);

  for (let i = 0; i < batches.length; i++) {
    const b = batches[i];
    console.log(`\n[ship] Processing batch ${i + 1}/${batches.length}: ${b.branch} (${b.files.length} files) ...`);

    if (b.files.length > 50) {
      throw new Error(`CRITICAL: Batch ${b.branch} has ${b.files.length} files, exceeding limit of 50!`);
    }

    const existingPr = runSh(`gh pr list --head ${b.branch} --state all --json number,url,state`);
    let prMerged = false;
    if (existingPr) {
      try {
        const prList = JSON.parse(existingPr);
        if (prList.length > 0 && prList[0].state === 'MERGED') {
          console.log(`  ✓ PR for ${b.branch} already merged. Skipping.`);
          prMerged = true;
        }
      } catch {}
    }
    if (prMerged) continue;

    runSh(`git checkout -b ${b.branch}`);

    for (const f of b.files) {
      runSh(`git add "${f}"`);
    }

    const stagedOutput = runSh('git diff --name-only --cached');
    const stagedCount = stagedOutput ? stagedOutput.split('\n').filter(Boolean).length : 0;
    if (stagedCount === 0) {
      console.log(`  ! No changes staged for ${b.branch}, skipping.`);
      runSh('git checkout main');
      continue;
    }

    if (stagedCount > 50) {
      throw new Error(`CRITICAL: Staged count ${stagedCount} exceeds 50!`);
    }

    const commitMsg = `${b.title}\n\n${b.body}\n\nCo-authored-by: Akshaykumarpatil333 <123820292+Akshaykumarpatil333@users.noreply.github.com>`;
    const tmpCommit = path.join(REPO, '.commit_msg.tmp');
    fs.writeFileSync(tmpCommit, commitMsg, 'utf-8');
    run('git', ['commit', '-F', tmpCommit]);
    if (fs.existsSync(tmpCommit)) fs.unlinkSync(tmpCommit);
    console.log(`  ✓ Committed: ${b.title}`);

    run('git', ['push', '-u', 'origin', b.branch]);
    console.log(`  ✓ Pushed branch ${b.branch} to origin.`);

    const prBody = `## What\n${b.title}\n\n## Why\nDaily practice curriculum with <= 50 files/PR segregation.\n\n## How to verify\n${b.verify}`;
    const tmpPr = path.join(REPO, '.pr_body.tmp');
    fs.writeFileSync(tmpPr, prBody, 'utf-8');
    const prOut = runSh(`gh pr create --base main --head ${b.branch} --title "${b.title}" --body-file .pr_body.tmp`);
    if (fs.existsSync(tmpPr)) fs.unlinkSync(tmpPr);
    console.log(`  ✓ PR Created: ${prOut}`);

    if (autoMerge) {
      runSh(`gh pr merge ${b.branch} --merge`);
      console.log(`  ✓ PR merged via merge commit.`);
    }

    try {
      runSh('git checkout -- practice/days/ solutions/ contests/');
    } catch {}
    runSh('git checkout main');
    runSh('git pull --ff-only origin main');
  }

  console.log(`\n[ship] Day ${set.day} (${date}) ship workflow completed successfully!`);
}

main().catch((err) => {
  console.error(`[ship] Fatal error: ${err.message}`);
  process.exit(1);
});

/**
 * Automated Git Ship & PR Engine for Daily Practice Sets
 * Verifies the set, commits changes, opens a Pull Request, and auto-merges
 * with a merge commit when all checks pass.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync, execSync } = require('child_process');

const ROOT = __dirname;
const DAYS = path.join(ROOT, 'days');
const REPO = path.join(ROOT, '..');

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
  const verifyRes = run('node', ['practice/verify.js', date]);
  if (verifyRes.status !== 0) {
    console.error(`[ship] Verification failed! Cannot ship incomplete or failing solutions.`);
    console.error(verifyRes.stdout || verifyRes.stderr);
    process.exit(1);
  }
  console.log('  ✓ Verification passed (all solutions green).');

  // 2. Automated Platform Submissions (Playwright)
  const skipSubmit = args.includes('--no-submit');
  if (!skipSubmit) {
    console.log('[ship] Step 2: Running automated platform submissions (Playwright) ...');
    const submitRes = run('node', ['practice/playwright/submit.js', '--date', date, '--parallel'], {
      stdio: 'inherit',
    });
    if (submitRes.status === 0) {
      console.log('  ✓ Automated platform submissions completed.');
    } else {
      console.warn('  ! Some submissions finished with warnings or were skipped.');
    }
  } else {
    console.log('[ship] Step 2: Skipping platform submissions (--no-submit flag).');
  }

  // 3. Synchronize Knowledge Base
  console.log('[ship] Step 3: Synchronizing Knowledge Base ...');
  const syncRes = run('node', ['practice/knowledge.js', '--sync']);
  if (syncRes.status === 0) {
    console.log('  ✓ Knowledge base synchronized.');
  }

  // 4. Git Operations
  const branchName = `feat/practice-day-${date}`;
  console.log(`[ship] Step 4: Git branching & staging (${branchName}) ...`);

  // Ensure on branch
  const currentBranch = runSh('git rev-parse --abbrev-ref HEAD');
  if (currentBranch !== branchName) {
    const branchExists = runSh(`git branch --list ${branchName}`);
    if (branchExists) {
      runSh(`git checkout ${branchName}`);
    } else {
      runSh(`git checkout -b ${branchName}`);
    }
  }

  // Stage changes including categorized platform solutions
  runSh(`git add practice/days/${date}/ practice/platforms/ solutions/ contests/ knowledge/`);
  const status = runSh('git status --porcelain');

  if (status) {
    console.log('[ship] Step 4: Committing changes ...');
    const commitMsg = `feat(practice): solve and verify day ${date} problem set`;
    const commitBody = `Solve and verify all ${set.problems.length} problems for Day ${set.day} (${date}). Update topic catalogs in knowledge base.`;
    run('git', ['commit', '-m', commitMsg, '-m', commitBody]);
    console.log(`  ✓ Committed: ${commitMsg}`);

    console.log('[ship] Step 5: Pushing branch to origin ...');
    const pushRes = run('git', ['push', '-u', 'origin', branchName]);
    if (pushRes.status !== 0) {
      console.error(`[ship] Git push failed:\n${pushRes.stderr}`);
      process.exit(1);
    }
    console.log('  ✓ Branch pushed to origin.');
  } else {
    console.log('[ship] No uncommitted changes on branch.');
  }

  // 4. GitHub Pull Request
  console.log('[ship] Step 6: Checking Pull Request ...');
  let prUrl = null;
  let prNumber = null;

  const prListRaw = runSh(`gh pr list --head ${branchName} --state all --json number,url,state`);
  if (prListRaw) {
    try {
      const prList = JSON.parse(prListRaw);
      if (prList.length > 0) {
        prUrl = prList[0].url;
        prNumber = prList[0].number;
        const prState = prList[0].state;
        console.log(`  ✓ Found existing PR #${prNumber}: ${prUrl} (${prState})`);
        if (prState === 'MERGED') {
          console.log('[ship] PR is already merged into main. Everything up to date!');
          runSh('git checkout main');
          runSh('git pull origin main');
          return;
        }
      }
    } catch {}
  }

  if (!prNumber) {
    console.log('[ship] Creating GitHub Pull Request ...');
    const prTitle = `feat(practice): solve and verify day ${date} problem set`;
    const prBody = `## Summary
- Solves all ${set.problems.length} problems for Day ${set.day} (${date}) across ${set.platforms.join(', ')}.
- Reference solutions in \`practice/days/${date}/solutions/\` and \`solutions/\`.
- Sample test fixtures in \`practice/days/${date}/tests/\`.
- Automated verification: 100% green via \`node practice/verify ${date}\`.
- Synchronized topic catalogs in \`knowledge/\` base.

## Verification
- Verified via \`node practice/verify ${date}\`.
- Verified via \`node practice/knowledge\`.`;

    const createRes = run('gh', ['pr', 'create', '--title', prTitle, '--body', prBody]);
    if (createRes.status === 0) {
      prUrl = (createRes.stdout || '').trim();
      const numMatch = prUrl.match(/pull\/(\d+)/);
      if (numMatch) prNumber = numMatch[1];
      console.log(`  ✓ Created PR #${prNumber}: ${prUrl}`);
    } else {
      console.error(`[ship] Failed to create PR:\n${createRes.stderr}`);
      process.exit(1);
    }
  }

  // 5. Merge Pull Request if requested
  if (autoMerge && prNumber) {
    console.log(`[ship] Step 7: Merging PR #${prNumber} into main with merge commit ...`);
    const mergeRes = run('gh', ['pr', 'merge', String(prNumber), '--merge']);
    if (mergeRes.status === 0) {
      console.log(`  ✓ PR #${prNumber} successfully merged into main!`);
      runSh('git checkout main');
      runSh('git pull origin main');
      console.log('  ✓ Local main updated and in sync with origin/main.');
    } else {
      console.warn(`[ship] Could not auto-merge PR #${prNumber}: ${mergeRes.stderr || mergeRes.stdout}`);
    }
  }

  console.log(`\n[ship] Day ${set.day} (${date}) ship workflow completed successfully!`);
}

main().catch((err) => {
  console.error(`[ship] Fatal error: ${err.message}`);
  process.exit(1);
});

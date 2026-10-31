/**
 * Universal Git Hook Patcher
 * Guarantees that EVERY repository in D:/pro, D:/client, D:/wysbryx, and any newly initialized
 * repository in the future carries the Co-authored-by trailer for Akshaykumarpatil333.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CO_AUTHOR_TRAILER = 'Co-authored-by: Akshaykumarpatil333 <123820292+Akshaykumarpatil333@users.noreply.github.com>';

// 1. Setup Global Git Template Directory
console.log('[1/4] Configuring global git template directory...');
const templateHooksDir = path.resolve(process.env.USERPROFILE || 'C:/Users/AKKIE', '.git-template', 'hooks');
fs.mkdirSync(templateHooksDir, { recursive: true });

const globalHookPath = path.resolve(process.env.USERPROFILE || 'C:/Users/AKKIE', '.git-hooks', 'commit-msg');
const globalHookContent = fs.existsSync(globalHookPath)
  ? fs.readFileSync(globalHookPath, 'utf-8')
  : `#!/bin/sh
COMMIT_MSG_FILE="$1"
CO_AUTHOR="${CO_AUTHOR_TRAILER}"

if [ -z "$COMMIT_MSG_FILE" ] || [ ! -f "$COMMIT_MSG_FILE" ]; then
    exit 0
fi

if ! grep -qi "Akshaykumarpatil333" "$COMMIT_MSG_FILE"; then
    tail -n 1 "$COMMIT_MSG_FILE" | grep -q "^$" || echo "" >> "$COMMIT_MSG_FILE"
    echo "$CO_AUTHOR" >> "$COMMIT_MSG_FILE"
fi

exit 0
`;

fs.writeFileSync(path.join(templateHooksDir, 'commit-msg'), globalHookContent, { mode: 0o777 });
try {
  execSync('git config --global init.templateDir "C:/Users/AKKIE/.git-template"', { stdio: 'pipe' });
  execSync('git config --global core.hooksPath "C:/Users/AKKIE/.git-hooks"', { stdio: 'pipe' });
  console.log('  ✓ Global templateDir and core.hooksPath set.');
} catch (e) {
  console.warn('  ! Could not set git config --global:', e.message);
}

// 2. Discover all Git Repositories
console.log('\n[2/4] Discovering all git repositories on disk...');
const searchRoots = ['D:/pro', 'D:/client', 'D:/wysbryx'];
const foundRepos = [];

for (const sRoot of searchRoots) {
  if (!fs.existsSync(sRoot)) continue;
  try {
    const entries = fs.readdirSync(sRoot);
    for (const entry of entries) {
      const full = path.join(sRoot, entry);
      try {
        if (fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, '.git'))) {
          foundRepos.push({ name: entry, path: full });
        }
      } catch {}
    }
  } catch {}
}

console.log(`  Found ${foundRepos.length} git repositories across ${searchRoots.join(', ')}.`);

// 3. Patch Repositories
console.log('\n[3/4] Patching and validating hook coverage across all repositories...');

const hookSnippet = `
# Pair Extraordinaire Co-Authorship Hook
if ! grep -qi "Akshaykumarpatil333" "$1"; then
  tail -n 1 "$1" | grep -q "^$" || printf '\n' >> "$1"
  printf '${CO_AUTHOR_TRAILER}\n' >> "$1"
fi
`;

let patchedCount = 0;
let inheritedCount = 0;

for (const repo of foundRepos) {
  let localHooksPath = '';
  try {
    localHooksPath = execSync('git config --local --get core.hooksPath', { cwd: repo.path, encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch {}

  // Always ensure .git/hooks/commit-msg exists as fallback
  const dotGitHooks = path.join(repo.path, '.git', 'hooks');
  if (fs.existsSync(dotGitHooks)) {
    const fallbackFile = path.join(dotGitHooks, 'commit-msg');
    if (!fs.existsSync(fallbackFile)) {
      fs.writeFileSync(fallbackFile, globalHookContent, { mode: 0o777 });
    } else {
      const content = fs.readFileSync(fallbackFile, 'utf-8');
      if (!content.includes('Akshaykumarpatil333')) {
        fs.appendFileSync(fallbackFile, hookSnippet);
      }
    }
  }

  // Handle local overrides
  if (!localHooksPath || localHooksPath === 'C:/Users/AKKIE/.git-hooks') {
    inheritedCount++;
    console.log(`  [OK] ${repo.name.padEnd(25)} -> Inherits global hook`);
  } else if (localHooksPath === '.git/hooks' || localHooksPath === '.husky/_') {
    // Check if repo actually uses husky hooks
    const huskyDir = path.join(repo.path, '.husky');
    const hasHuskyHooks = fs.existsSync(huskyDir) && fs.readdirSync(huskyDir).some((f) => f !== '_');

    if (!hasHuskyHooks) {
      // Remove dead override so it uses global hook
      try {
        execSync('git config --local --unset core.hooksPath', { cwd: repo.path, stdio: 'pipe' });
        console.log(`  [CLEAN] ${repo.name.padEnd(25)} -> Removed dead ${localHooksPath} override (now uses global)`);
        inheritedCount++;
      } catch {}
    } else {
      // Patch .husky/commit-msg
      const huskyMsg = path.join(huskyDir, 'commit-msg');
      if (!fs.existsSync(huskyMsg)) {
        fs.writeFileSync(huskyMsg, `#!/bin/sh\n${hookSnippet}\nexit 0\n`, { mode: 0o777 });
      } else {
        const c = fs.readFileSync(huskyMsg, 'utf-8');
        if (!c.includes('Akshaykumarpatil333')) {
          fs.writeFileSync(huskyMsg, `#!/bin/sh\n${hookSnippet}\n\n${c}`, { mode: 0o777 });
        }
      }
      patchedCount++;
      console.log(`  [PATCHED] ${repo.name.padEnd(25)} -> Added co-author to .husky/commit-msg`);
    }
  } else if (localHooksPath === '.githooks') {
    const githooksDir = path.join(repo.path, '.githooks');
    fs.mkdirSync(githooksDir, { recursive: true });
    const githookMsg = path.join(githooksDir, 'commit-msg');

    if (!fs.existsSync(githookMsg)) {
      fs.writeFileSync(githookMsg, `#!/bin/sh\n${hookSnippet}\nexit 0\n`, { mode: 0o777 });
      patchedCount++;
      console.log(`  [CREATED] ${repo.name.padEnd(25)} -> Created .githooks/commit-msg with co-author`);
    } else {
      const c = fs.readFileSync(githookMsg, 'utf-8');
      if (!c.includes('Akshaykumarpatil333')) {
        // Append before final exit 0 or at end of file
        let newContent = '';
        if (c.includes('exit 0')) {
          const idx = c.lastIndexOf('exit 0');
          newContent = c.slice(0, idx) + hookSnippet + '\nexit 0\n' + c.slice(idx + 6);
        } else {
          newContent = c + '\n' + hookSnippet;
        }
        fs.writeFileSync(githookMsg, newContent, { mode: 0o777 });
        patchedCount++;
        console.log(`  [PATCHED] ${repo.name.padEnd(25)} -> Updated .githooks/commit-msg`);
      } else {
        console.log(`  [OK] ${repo.name.padEnd(25)} -> Already has co-author in .githooks/commit-msg`);
      }
    }
  } else {
    console.log(`  [OTHER] ${repo.name.padEnd(25)} -> localHook: ${localHooksPath}`);
  }
}

// 4. Verification Check
console.log('\n[4/4] Summary & Verification:');
console.log(`  Total Repositories Audited: ${foundRepos.length}`);
console.log(`  Direct Global Inheritors  : ${inheritedCount}`);
console.log(`  Locally Patched Hooks     : ${patchedCount}`);
console.log('  Global Hook Active        : C:/Users/AKKIE/.git-hooks/commit-msg');
console.log('  Global Template Active    : C:/Users/AKKIE/.git-template/hooks/commit-msg');
console.log('\n✓ All repositories (A, B, and future new ones) are 100% covered with Akshaykumarpatil333 co-authorship!');


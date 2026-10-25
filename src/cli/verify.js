const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO = path.resolve(__dirname, '..', '..');
const ROOT = path.join(REPO, 'practice');
const DAYS = path.join(ROOT, 'days');

const args = process.argv.slice(2);
const useRef = args.includes('--ref');
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};

const filterPlatform = flag('--platform');
const days = fs.readdirSync(DAYS).filter((d) => fs.existsSync(path.join(DAYS, d, 'set.json'))).sort();
const date = args.find((a) => !a.startsWith('--')) || days[days.length - 1];
const dir = path.join(DAYS, date);

if (!fs.existsSync(path.join(dir, 'set.json'))) {
  console.error(`[verify] No set for ${date}`);
  process.exit(1);
}

const normalize = (s) => s.trim().split(/\r?\n/).map((l) => l.trim().split(/\s+/).join(' ')).join('\n');
const set = JSON.parse(fs.readFileSync(path.join(dir, 'set.json'), 'utf-8'));
let failed = 0;

const problemsToVerify = filterPlatform
  ? set.problems.filter((p) => (p.platform || 'Codeforces').toLowerCase() === filterPlatform.toLowerCase())
  : set.problems;

console.log(`[verify] Verifying Day ${set.day} (${date}) [${useRef ? 'Reference Solutions' : 'Active Practice Attempts'}] ...`);

const readmePath = path.join(dir, 'README.md');
let readmeLines = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf-8').split(/\r?\n/) : null;
let readmeChanged = false;

for (const p of problemsToVerify) {
  let file = null;
  if (useRef) {
    file = path.join(dir, 'solutions', `${p.file}.js`);
  } else {
    const candidates = [
      path.join(dir, 'attempts', `${p.file}.js`),
      path.join(REPO, 'solutions', `${p.file}.js`),
      path.join(REPO, `${p.file}.js`),
    ];
    file = candidates.find((c) => fs.existsSync(c)) || candidates[0];
  }

  const testsFile = path.join(dir, 'tests', `${p.file}.json`);
  const platMap = { codeforces: 'CF', leetcode: 'LC', codechef: 'CC' };
  const plat = platMap[(p.platform || 'CF').toLowerCase()] || (p.platform || 'CF').slice(0, 2).toUpperCase();
  const label = `[${plat}] ${p.id.padEnd(10)} ${p.file}`;

  if (!fs.existsSync(file)) {
    console.log(`  ·  ${label}  (not attempted)`);
    continue;
  }
  if (!fs.existsSync(testsFile)) {
    console.log(`  ?  ${label}  (no tests yet)`);
    continue;
  }

  const tests = JSON.parse(fs.readFileSync(testsFile, 'utf-8'));
  let passed = 0;
  let firstFailure = null;
  let slowest = 0;
  for (const [i, t] of tests.entries()) {
    const start = Date.now();
    const r = spawnSync('node', [file], { input: t.input, encoding: 'utf-8', timeout: 10000, maxBuffer: 64 * 1024 * 1024 });
    slowest = Math.max(slowest, Date.now() - start);
    if (r.status === 0 && normalize(r.stdout || '') === normalize(t.output ?? t.expected ?? '')) passed++;
    else if (!firstFailure) firstFailure = { i, t, r };
  }

  if (passed === tests.length) {
    console.log(`  ✓  ${label}  ${passed}/${tests.length}  (${slowest}ms)`);
    // Auto-update remarks in README.md: mark problem as [x]
    if (readmeLines) {
      readmeLines = readmeLines.map((line) => {
        if ((line.includes(`\`${p.file}.js\``) || line.includes(`${p.id}`)) && line.includes('[ ]')) {
          readmeChanged = true;
          return line.replace('[ ]', '[x]');
        }
        return line;
      });
    }
  } else {
    failed++;
    const { i, t, r } = firstFailure;
    const verdict = r.error ? 'TLE/crash' : r.status !== 0 ? 'Runtime error' : 'Wrong answer';
    console.log(`  ✗  ${label}  ${passed}/${tests.length}  ${verdict} on test ${i + 1}`);
    console.log(`       input:    ${JSON.stringify(t.input.length > 200 ? t.input.slice(0, 200) + '…' : t.input)}`);
    console.log(`       expected: ${JSON.stringify(normalize(t.output).slice(0, 200))}`);
    console.log(`       got:      ${JSON.stringify(normalize(r.stdout || '').slice(0, 200) || (r.stderr || '').split('\n')[0])}`);
  }
}

if (readmeChanged && readmeLines) {
  fs.writeFileSync(readmePath, readmeLines.join('\n'), 'utf-8');
  console.log(`[verify] Automatically updated completed remarks in ${path.relative(REPO, readmePath)}`);
}

process.exit(failed ? 1 : 0);

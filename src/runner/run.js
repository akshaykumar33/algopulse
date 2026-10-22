const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..', '..');

// Ignored directory names for recursive searching
const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.cache',
  '.claude',
  'practice',
  'src',
  'apps',
  'docker',
  'tools',
  'scripts',
  'logs',
  'fixtures',
]);

/**
 * Recursively retrieves candidate .js files from a directory
 */
const getCandidateFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  const results = [];

  const traverse = (currentDir) => {
    let entries = [];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name) && !entry.name.startsWith('.')) {
          traverse(path.join(currentDir, entry.name));
        }
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        if (
          entry.name !== 'run.js' &&
          entry.name !== 'cp.js' &&
          entry.name !== 'leetcode.js' &&
          entry.name !== 'lc.js' &&
          !entry.name.startsWith('_')
        ) {
          try {
            const fullPath = path.join(currentDir, entry.name);
            results.push({
              name: entry.name,
              fullPath,
              time: fs.statSync(fullPath).mtimeMs,
            });
          } catch {
            // stat failed, ignore
          }
        }
      }
    }
  };

  traverse(dir);
  return results;
};

// Determine target file from CLI arguments
let target = process.argv[2];

if (!target) {
  // Find the most recently modified .js file across contests/, solutions/, stress/, and root
  const rootFiles = fs.readdirSync(REPO_ROOT, { withFileTypes: true })
    .filter(d => d.isFile() && d.name.endsWith('.js') && d.name !== 'run.js' && d.name !== 'cp.js' && d.name !== 'leetcode.js' && d.name !== 'lc.js' && !d.name.startsWith('_'))
    .map(d => ({ name: d.name, fullPath: path.join(REPO_ROOT, d.name), time: fs.statSync(path.join(REPO_ROOT, d.name)).mtimeMs }));

  const contestFiles = getCandidateFiles(path.join(REPO_ROOT, 'contests'));
  const solutionFiles = getCandidateFiles(path.join(REPO_ROOT, 'solutions'));
  const stressFiles = getCandidateFiles(path.join(REPO_ROOT, 'stress'));

  const allFiles = [...rootFiles, ...contestFiles, ...solutionFiles, ...stressFiles].sort((a, b) => b.time - a.time);

  if (allFiles.length > 0) {
    target = allFiles[0].fullPath;
    console.log(`[runner] No file specified. Auto-detected latest: ${path.relative(REPO_ROOT, target)}`);
  } else {
    target = 'cp.js';
    console.log(`[runner] No file specified. Defaulting to template: ${target}`);
  }
}

// Resolve targetPath
let targetPath = null;

// Case 1: Target was already resolved to a full path
if (path.isAbsolute(target) && fs.existsSync(target)) {
  targetPath = target;
} else {
  const targetWithExt = target.endsWith('.js') ? target : `${target}.js`;
  const targetBase = path.basename(targetWithExt);

  // Case 2: Direct path relative to cwd or known search directories
  const directPaths = [
    path.resolve(process.cwd(), target),
    path.resolve(process.cwd(), targetWithExt),
    path.resolve(REPO_ROOT, target),
    path.resolve(REPO_ROOT, targetWithExt),
    path.resolve(REPO_ROOT, 'contests', target),
    path.resolve(REPO_ROOT, 'contests', targetWithExt),
    path.resolve(REPO_ROOT, 'solutions', target),
    path.resolve(REPO_ROOT, 'solutions', targetWithExt),
    path.resolve(REPO_ROOT, 'stress', target),
    path.resolve(REPO_ROOT, 'stress', targetWithExt),
    path.resolve(REPO_ROOT, 'templates', target),
    path.resolve(REPO_ROOT, 'templates', targetWithExt),
  ];

  for (const p of directPaths) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      targetPath = p;
      break;
    }
  }

  // Case 3: Recursive search across contests, solutions, stress, templates, root
  if (!targetPath) {
    const searchDirs = [
      path.join(REPO_ROOT, 'contests'),
      path.join(REPO_ROOT, 'solutions'),
      path.join(REPO_ROOT, 'stress'),
      path.join(REPO_ROOT, 'templates'),
      REPO_ROOT,
    ];

    const matches = [];
    for (const sDir of searchDirs) {
      const candidates = getCandidateFiles(sDir);
      for (const cand of candidates) {
        if (cand.name.toLowerCase() === targetBase.toLowerCase()) {
          matches.push(cand);
        }
      }
    }

    if (matches.length > 0) {
      // Pick the most recently modified matching file
      matches.sort((a, b) => b.time - a.time);
      targetPath = matches[0].fullPath;
    }
  }
}

if (!targetPath) {
  console.error(`[runner] Error: File "${target}" not found across root, contests/, solutions/, stress/, or templates/`);
  process.exit(1);
}

const inputPath = path.join(REPO_ROOT, 'input.txt');
const outputPath = path.join(REPO_ROOT, 'output.txt');

if (!fs.existsSync(inputPath)) {
  fs.writeFileSync(inputPath, '');
  console.log(`[runner] Created empty input.txt`);
}

const inputData = fs.readFileSync(inputPath);

console.log(`[runner] Running ${path.basename(targetPath)} (${path.relative(REPO_ROOT, targetPath)}) with input.txt -> output.txt ...`);
const startTime = Date.now();

const result = spawnSync('node', [targetPath], {
  input: inputData,
  encoding: 'utf-8',
  maxBuffer: 50 * 1024 * 1024,
});

const elapsed = Date.now() - startTime;

if (result.error) {
  console.error(`[runner] Execution error:`, result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`[runner] Process exited with code ${result.status}`);
  if (result.stderr) {
    console.error(`[runner] Error details:\n${result.stderr}`);
  }
  process.exit(result.status);
}

fs.writeFileSync(outputPath, result.stdout || '');

console.log(`[runner] Completed in ${elapsed}ms! Output saved to output.txt.`);
console.log('---------------- OUTPUT ----------------');
process.stdout.write(result.stdout || '(no output)\n');
console.log('----------------------------------------');

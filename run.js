const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Determine target file
let target = process.argv[2];

const getCandidateFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.js') && f !== 'run.js' && f !== 'cp.js' && f !== 'leetcode.js' && f !== 'lc.js' && !f.startsWith('_'))
    .map(f => ({ name: f, fullPath: path.join(dir, f), time: fs.statSync(path.join(dir, f)).mtimeMs }));
};

if (!target) {
  // Find the most recently modified .js file across solutions/ and root
  const rootFiles = getCandidateFiles(__dirname);
  const solutionFiles = getCandidateFiles(path.join(__dirname, 'solutions'));
  const allFiles = [...rootFiles, ...solutionFiles].sort((a, b) => b.time - a.time);

  if (allFiles.length > 0) {
    target = allFiles[0].name;
    console.log(`[runner] No file specified. Auto-detected latest: ${target}`);
  } else {
    target = 'cp.js';
    console.log(`[runner] No file specified. Defaulting to template: ${target}`);
  }
} else {
  if (!target.endsWith('.js')) {
    target += '.js';
  }
}

// Search order: root -> solutions/ -> stress/ -> templates/
let targetPath = null;
const searchPaths = [
  path.resolve(__dirname, target),
  path.resolve(__dirname, 'solutions', target),
  path.resolve(__dirname, 'stress', target),
  path.resolve(__dirname, 'templates', target),
];

for (const p of searchPaths) {
  if (fs.existsSync(p)) {
    targetPath = p;
    break;
  }
}

if (!targetPath) {
  console.error(`[runner] Error: File "${target}" not found in root, solutions/, or stress/`);
  process.exit(1);
}

const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'output.txt');

if (!fs.existsSync(inputPath)) {
  fs.writeFileSync(inputPath, '');
  console.log(`[runner] Created empty input.txt`);
}

const inputData = fs.readFileSync(inputPath);

console.log(`[runner] Running ${path.basename(targetPath)} (${path.relative(__dirname, targetPath)}) with input.txt -> output.txt ...`);
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

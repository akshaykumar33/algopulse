const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

function solveReference(n, arr) {
  const count = new Map();
  let maxFreq = 0;
  for (let i = 0; i < n; i++) {
    const val = arr[i];
    const c = (count.get(val) || 0) + 1;
    count.set(val, c);
    if (c > maxFreq) maxFreq = c;
  }

  const ans = [];
  for (let k = 1; k <= maxFreq; k++) {
    const currentLevel = [];
    for (const [val, freq] of count.entries()) {
      if (freq >= k) {
        currentLevel.push(val);
      }
    }
    currentLevel.sort((a, b) => b - a);
    for (let i = 0; i < currentLevel.length; i++) {
      ans.push(currentLevel[i]);
    }
  }
  return ans;
}

function verifyProperties(n, arr, res) {
  if (res.length !== n) return false;
  const countOrig = new Map();
  for (const x of arr) countOrig.set(x, (countOrig.get(x) || 0) + 1);

  const countRes = new Map();
  for (const x of res) countRes.set(x, (countRes.get(x) || 0) + 1);

  for (const [k, v] of countOrig.entries()) {
    if (countRes.get(k) !== v) return false;
  }
  return true;
}

function runStress() {
  console.log('=== Phase 1: Small Exhaustive & Randomized Tests ===');
  const targetScript = fs.existsSync(path.join(__dirname, '..', 'solutions', 'fashionableArray.js'))
    ? path.join(__dirname, '..', 'solutions', 'fashionableArray.js')
    : path.join(__dirname, '..', 'fashionableArray.js');

  const testCases = [];
  // Small edge cases
  testCases.push([1]);
  testCases.push([2, 2]);
  testCases.push([1, 2, 3]);
  testCases.push([3, 2, 1]);
  testCases.push([1, 1, 2, 2, 2, 3]);

  // Randomized tests
  for (let t = 0; t < 1000; t++) {
    const n = Math.floor(Math.random() * 20) + 1;
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * 10) + 1);
    }
    testCases.push(arr);
  }

  let inputStr = `${testCases.length}\n`;
  for (const tc of testCases) {
    inputStr += `${tc.length}\n${tc.join(' ')}\n`;
  }

  const proc = spawnSync('node', [targetScript], {
    input: inputStr,
    encoding: 'utf-8',
    maxBuffer: 50 * 1024 * 1024,
  });

  if (proc.status !== 0) {
    console.error('Execution error:', proc.stderr);
    process.exit(1);
  }

  const lines = proc.stdout.trim().split(/\r?\n/).filter(line => line.length > 0);
  if (lines.length !== testCases.length) {
    console.error(`Mismatched output lines: expected ${testCases.length}, got ${lines.length}`);
    process.exit(1);
  }

  for (let i = 0; i < testCases.length; i++) {
    const actual = lines[i].split(' ').map(Number);
    const expected = solveReference(testCases[i].length, testCases[i]);

    if (!verifyProperties(testCases[i].length, testCases[i], actual)) {
      console.error(`Property check failed on case ${i}:`, testCases[i]);
      process.exit(1);
    }

    if (actual.length !== expected.length) {
      console.error(`Length mismatch on case ${i}`);
      process.exit(1);
    }
    for (let j = 0; j < actual.length; j++) {
      if (actual[j] !== expected[j]) {
        console.error(`Mismatch on case ${i} index ${j}: actual=${actual[j]}, expected=${expected[j]}`);
        process.exit(1);
      }
    }
  }

  console.log(`Passed all ${testCases.length} randomized and property verification trials.`);

  console.log('\n=== Phase 2: Worst-Case Scale Benchmark ===');
  const maxN = 200000;
  const largeArr = new Int32Array(maxN);
  for (let i = 0; i < maxN; i++) {
    largeArr[i] = (i % 1000) + 1;
  }
  const largeInput = `1\n${maxN}\n${largeArr.join(' ')}\n`;

  const start = Date.now();
  const procLarge = spawnSync('node', [targetScript], {
    input: largeInput,
    encoding: 'utf-8',
    maxBuffer: 50 * 1024 * 1024,
  });
  const elapsed = Date.now() - start;

  if (procLarge.status !== 0) {
    console.error('Scale test execution error:', procLarge.stderr);
    process.exit(1);
  }

  console.log(`Worst-case execution for N=${maxN}: ${elapsed}ms`);
  console.log('All stress tests successfully completed!');
}

runStress();

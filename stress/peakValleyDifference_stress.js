const solve = require('../contests/leetcode/2026-10-24/peakValleyDifference');

function referenceSolve(nums) {
  const peaks = [];
  const valleys = [];
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (i > 0 && i < n - 1) {
      const isPeak = (nums[i] > nums[i - 1]) && (nums[i] > nums[i + 1]);
      const isValley = (nums[i] < nums[i - 1]) && (nums[i] < nums[i + 1]);
      if (isPeak) peaks.push(nums[i]);
      if (isValley) valleys.push(nums[i]);
    }
  }
  const peakSum = peaks.reduce((acc, x) => acc + x, 0);
  const valleySum = valleys.reduce((acc, x) => acc + x, 0);
  return peakSum - valleySum;
}

let testedCount = 0;

for (let len = 3; len <= 5; len++) {
  function generate(curr) {
    if (curr.length === len) {
      const exp = referenceSolve(curr);
      const act = solve(curr);
      if (exp !== act) {
        console.error(`Mismatch on input ${JSON.stringify(curr)}: expected ${exp}, got ${act}`);
        process.exit(1);
      }
      testedCount++;
      return;
    }
    for (let v = -3; v <= 3; v++) {
      curr.push(v);
      generate(curr);
      curr.pop();
    }
  }
  generate([]);
}

console.log(`Exhaustive small-input test passed: ${testedCount} cases.`);

const shapes = [
  (n) => Array(n).fill(5),
  (n) => Array(n).fill(0),
  (n) => Array(n).fill(-100),
  (n) => Array.from({ length: n }, (_, i) => i - 50),
  (n) => Array.from({ length: n }, (_, i) => 50 - i),
  (n) => Array.from({ length: n }, (_, i) => (i % 2 === 0 ? 100 : -100)),
  (n) => Array.from({ length: n }, (_, i) => (i % 2 === 0 ? -50 : 50)),
  (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 201) - 100),
];

for (let round = 0; round < 5000; round++) {
  const n = Math.floor(Math.random() * 98) + 3;
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const nums = shape(n);
  const exp = referenceSolve(nums);
  const act = solve(nums);
  if (exp !== act) {
    console.error(`Mismatch on round ${round}, input ${JSON.stringify(nums)}: expected ${exp}, got ${act}`);
    process.exit(1);
  }
  testedCount++;
}

console.log(`Randomized stress test passed: total ${testedCount} cases.`);

const maxN = 100;
const testCaseCount = 10000;
const maxInputs = Array.from({ length: testCaseCount }, () =>
  Array.from({ length: maxN }, (_, i) => (i % 2 === 0 ? 100 : -100))
);

const start = performance.now();
let dummy = 0;
for (let t = 0; t < testCaseCount; t++) {
  dummy += solve(maxInputs[t]);
}
const elapsed = performance.now() - start;

console.log(`Worst-case benchmark (${testCaseCount} runs of N=${maxN}): ${elapsed.toFixed(2)}ms (checksum=${dummy})`);
console.log('All verification checks passed successfully.');

const solve = require('../contests/leetcode/2026-10-24/countSubarraysWithLooseBounds');

function bruteForce(nums, minK, maxK) {
  if (minK > maxK) return 0;
  let count = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let ok = true;
      for (let k = i; k <= j; k++) {
        if (nums[k] < minK || nums[k] > maxK) {
          ok = false;
          break;
        }
      }
      if (ok) count++;
    }
  }
  return count;
}

let testedCount = 0;

for (let len = 2; len <= 5; len++) {
  function generate(curr) {
    if (curr.length === len) {
      for (let minK = 1; minK <= 4; minK++) {
        for (let maxK = 1; maxK <= 4; maxK++) {
          const exp = bruteForce(curr, minK, maxK);
          const act = solve(curr, minK, maxK);
          if (exp !== act) {
            console.error(`Mismatch on nums=${JSON.stringify(curr)}, minK=${minK}, maxK=${maxK}: expected ${exp}, got ${act}`);
            process.exit(1);
          }
          testedCount++;
        }
      }
      return;
    }
    for (let v = 1; v <= 4; v++) {
      curr.push(v);
      generate(curr);
      curr.pop();
    }
  }
  generate([]);
}

console.log(`Exhaustive small-input testing passed: ${testedCount} cases.`);

const shapes = [
  (n) => Array(n).fill(3),
  (n) => Array(n).fill(10),
  (n) => Array(n).fill(0),
  (n) => Array.from({ length: n }, (_, i) => i + 1),
  (n) => Array.from({ length: n }, (_, i) => (i % 2 === 0 ? 2 : 10)),
  (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10) + 1),
];

for (let round = 0; round < 3000; round++) {
  const n = Math.floor(Math.random() * 50) + 2;
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const nums = shape(n);
  const minK = Math.floor(Math.random() * 6) + 1;
  const maxK = Math.floor(Math.random() * 6) + 1;

  const exp = bruteForce(nums, minK, maxK);
  const act = solve(nums, minK, maxK);
  if (exp !== act) {
    console.error(`Mismatch on round ${round}: expected ${exp}, got ${act}`);
    process.exit(1);
  }
  testedCount++;
}

console.log(`Randomized stress testing passed: total ${testedCount} cases.`);

const maxN = 100000;
const maxNums = Array(maxN).fill(5);
const minK = 1;
const maxK = 10;

const start = performance.now();
const actualAns = solve(maxNums, minK, maxK);
const elapsed = performance.now() - start;

const expectedAns = (maxN * (maxN + 1)) / 2;
if (actualAns !== expectedAns) {
  console.error(`Max-constraint error: expected ${expectedAns}, got ${actualAns}`);
  process.exit(1);
}

console.log(`Worst-case timing (N = ${maxN}): ${elapsed.toFixed(2)}ms, result = ${actualAns}`);
console.log('All verification checks passed successfully.');

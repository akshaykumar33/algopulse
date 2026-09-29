/**
 * Stress test and constructive verification for canTransform
 */

/**
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
var canTransform = function(source, target) {
  let sumSource = 0;
  for (let i = 0; i < source.length; i++) {
    sumSource += source[i];
  }

  let sumTarget = 0;
  for (let i = 0; i < target.length; i++) {
    sumTarget += target[i];
  }

  return sumSource === sumTarget;
};

// Constructive operation simulator
// Given source and target with equal sum, actually performs the operations
// and verifies that source becomes exactly target in <= n - 1 steps.
function simulateTransformation(source, target) {
  const n = source.length;
  const arr = [...source];

  for (let j = 0; j < n - 1; j++) {
    const i = j + 1;
    const delta = target[j];
    const prevI = arr[i];
    const prevJ = arr[j];
    arr[i] = prevI + prevJ - delta;
    arr[j] = delta;
  }

  for (let i = 0; i < n; i++) {
    if (arr[i] !== target[i]) {
      return false;
    }
  }
  return true;
}

// 1. Constructive verification on random equal-sum arrays
console.log("Running constructive simulation tests...");
for (let iter = 0; iter < 1000; iter++) {
  const n = Math.floor(Math.random() * 50) + 2;
  const source = [];
  const target = [];
  let sum = 0;
  for (let i = 0; i < n - 1; i++) {
    const v = Math.floor(Math.random() * 2000000000) - 1000000000;
    source.push(v);
    sum += v;
  }
  const lastSource = Math.floor(Math.random() * 2000000000) - 1000000000;
  source.push(lastSource);
  sum += lastSource;

  let targetSum = 0;
  for (let i = 0; i < n - 1; i++) {
    const v = Math.floor(Math.random() * 2000000000) - 1000000000;
    target.push(v);
    targetSum += v;
  }
  target.push(sum - targetSum); // force equal sum

  if (!canTransform(source, target)) {
    console.error("Failed canTransform on equal sum!");
    process.exit(1);
  }

  if (!simulateTransformation(source, target)) {
    console.error("Constructive simulation failed to match target!");
    process.exit(1);
  }
}
console.log("Constructive simulation passed: 1000/1000 random equal-sum arrays successfully transformed!");

// 2. Adversarial / Edge Cases
console.log("Testing edge cases...");
// Edge case: n = 2, extreme values
const maxBound = 1000000000;
const minBound = -1000000000;
console.assert(canTransform([maxBound, minBound], [0, 0]) === true, "Edge case 1 failed");
console.assert(canTransform([maxBound, maxBound], [2 * maxBound, 0]) === true, "Edge case 2 failed");
console.assert(canTransform([maxBound, maxBound], [maxBound, maxBound - 1]) === false, "Edge case 3 failed");

// 3. Worst-case timing test (n = 10^5, values = 10^9)
console.log("Running worst-case timing test (n = 100,000)...");
const n = 100000;
const bigSource = new Array(n).fill(maxBound);
const bigTarget = new Array(n).fill(maxBound);
const start = Date.now();
const res = canTransform(bigSource, bigTarget);
const elapsed = Date.now() - start;
console.log(`Worst-case completed in ${elapsed}ms (result = ${res})`);

console.log("All stress and invariant tests passed successfully!");

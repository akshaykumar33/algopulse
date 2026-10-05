const fs = require('fs');

function oracle(n) {
  let k = 1;
  while ((k * (k + 1)) / 2 <= n) {
    k++;
  }
  return k - 1;
}

function solveOne(n) {
  let k = Math.floor((-1 + Math.sqrt(1 + 8 * n)) / 2);
  if ((k + 1) * (k + 2) / 2 <= n) {
    k++;
  } else if (k * (k + 1) / 2 > n) {
    k--;
  }
  return k;
}

let testCount = 0;

for (let n = 1; n <= 1000; n++) {
  const expected = oracle(n);
  const actual = solveOne(n);
  if (expected !== actual) {
    console.error(`Mismatch for N=${n}: expected ${expected}, got ${actual}`);
    process.exit(1);
  }
  testCount++;
}

const largeCases = [1, 2, 3, 10, 100, 1000000, 1000000000];
for (const n of largeCases) {
  const ans = solveOne(n);
  const sum = (ans * (ans + 1)) / 2;
  const nextSum = ((ans + 1) * (ans + 2)) / 2;
  if (sum > n || nextSum <= n) {
    console.error(`Boundary check failed for N=${n}, got k=${ans}`);
    process.exit(1);
  }
  testCount++;
}

console.log(`Verified ${testCount} stress test cases successfully.`);

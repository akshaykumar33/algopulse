const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Ground-truth recursive state-space search simulating the exact problem operations
function bruteForceMaxCoins(a, x) {
  const memo = new Map();

  function dfs(arr, currX) {
    // Key: arr joined by comma + '|' + currX
    const key = arr.join(',') + '|' + currX;
    if (memo.has(key)) return memo.get(key);

    let maxGain = 0;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      if (arr[i] > 0) {
        const g = gcd(arr[i], currX);
        if (g !== 1) {
          // Perform move
          const nextArr = [...arr];
          nextArr[i] -= g;
          const gain = g + dfs(nextArr, g);
          if (gain > maxGain) {
            maxGain = gain;
          }
        }
      }
    }

    memo.set(key, maxGain);
    return maxGain;
  }

  return dfs(a, x);
}

// Sieve for optimal solution
const MAX = 300000;
const spf = new Int32Array(MAX + 1);
for (let i = 2; i <= MAX; i++) {
  if (spf[i] === 0) {
    for (let j = i; j <= MAX; j += i) {
      if (spf[j] === 0) spf[j] = i;
    }
  }
}

function solveOptimal(a, x) {
  if (x <= 1) return 0;

  const primes = [];
  let temp = x;
  while (temp > 1) {
    const p = spf[temp];
    primes.push(p);
    while (temp % p === 0) temp = Math.floor(temp / p);
  }

  let maxCoins = 0;
  for (let j = 0; j < primes.length; j++) {
    const p = primes[j];
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] % p === 0) {
        sum += a[i];
      }
    }
    if (sum > maxCoins) maxCoins = sum;
  }
  return maxCoins;
}

console.log('=== Phase 1: Exhaustive State-Space Verification ===');
let exhaustiveCount = 0;
// Test small n = 1..3, small values 1..12, various x
for (let n = 1; n <= 3; n++) {
  for (let x = 1; x <= 12; x++) {
    // Generate some interesting array combinations
    const testArrays = [
      [2, 3, 4].slice(0, n),
      [6, 6, 6].slice(0, n),
      [4, 9, 6].slice(0, n),
      [5, 7, 11].slice(0, n),
      [12, 8, 4].slice(0, n),
      [1, 1, 1].slice(0, n),
    ];
    for (const arr of testArrays) {
      const expected = bruteForceMaxCoins(arr, x);
      const actual = solveOptimal(arr, x);
      if (expected !== actual) {
        console.error(`MISMATCH on arr=[${arr.join(',')}], x=${x}: expected ${expected}, got ${actual}`);
        process.exit(1);
      }
      exhaustiveCount++;
    }
  }
}
console.log(`Passed ${exhaustiveCount} exhaustive state-space trials.`);

console.log('\n=== Phase 2: Randomized Game-Tree Stress Tests ===');
let randomCount = 0;
const numRandomTrials = 1000;
for (let trial = 0; trial < numRandomTrials; trial++) {
  const n = Math.floor(Math.random() * 3) + 1; // n in 1..3
  const x = Math.floor(Math.random() * 30) + 1; // x in 1..30
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * 20) + 1); // a_i in 1..20
  }

  const expected = bruteForceMaxCoins(arr, x);
  const actual = solveOptimal(arr, x);

  if (expected !== actual) {
    console.error(`MISMATCH on trial ${trial}: arr=[${arr.join(',')}], x=${x}: expected ${expected}, got ${actual}`);
    process.exit(1);
  }
  randomCount++;
}
console.log(`Passed ${randomCount} randomized game-tree simulations.`);

console.log('\n=== Phase 3: Worst-Case Scale Benchmark ===');
// Max bounds: sum(N) = 300,000, x = 30030 (2*3*5*7*11*13), max values 300,000
const N = 300000;
const bigX = 30030; // 6 prime factors
const bigArr = new Int32Array(N);
for (let i = 0; i < N; i++) {
  bigArr[i] = 300000;
}

const startTime = Date.now();
const bigAns = solveOptimal(bigArr, bigX);
const elapsed = Date.now() - startTime;
console.log(`Worst-case execution for N=${N}, x=${bigX} (6 prime factors): ${elapsed}ms (Result: ${bigAns})`);
console.log('All stress tests successfully completed!');

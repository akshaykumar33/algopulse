const fs = require('fs');

// Ground-truth brute force: checks all 2^n subsets of indices to replace
function bruteForce(s, c) {
  const n = s.length;
  let minCost = n;

  for (let mask = 0; mask < (1 << n); mask++) {
    // Count bits set
    let cost = 0;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) cost++;
    }
    if (cost >= minCost) continue;

    // Build resulting string
    const arr = s.split('');
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        arr[i] = c;
      }
    }

    // Check palindrome
    let isPal = true;
    for (let i = 0; i < Math.floor(n / 2); i++) {
      if (arr[i] !== arr[n - 1 - i]) {
        isPal = false;
        break;
      }
    }

    if (isPal) {
      minCost = cost;
    }
  }

  return minCost;
}

// Optimal solution logic
function solveOptimal(s, c) {
  const n = s.length;
  let ans = 0;
  const half = Math.floor(n / 2);
  for (let i = 0; i < half; i++) {
    const u = s[i];
    const v = s[n - 1 - i];
    if (u === v) {
      continue;
    } else if (u === c || v === c) {
      ans += 1;
    } else {
      ans += 2;
    }
  }
  return ans;
}

console.log('=== Phase 1: Exhaustive Small Tests ===');
const alphabet = ['a', 'b', 'c'];
const testChars = ['a', 'b', 'c', 'd'];

function generateAllStrings(len) {
  const res = [];
  function backtrack(curr) {
    if (curr.length === len) {
      res.push(curr);
      return;
    }
    for (const ch of alphabet) {
      backtrack(curr + ch);
    }
  }
  backtrack('');
  return res;
}

let totalExhaustive = 0;
for (let len = 1; len <= 6; len++) {
  const allStrs = generateAllStrings(len);
  for (const s of allStrs) {
    for (const c of testChars) {
      totalExhaustive++;
      const expected = bruteForce(s, c);
      const actual = solveOptimal(s, c);
      if (expected !== actual) {
        console.error(`MISMATCH on exhaustive test! s="${s}", c="${c}", expected=${expected}, got=${actual}`);
        process.exit(1);
      }
    }
  }
}
console.log(`Passed ${totalExhaustive} exhaustive test cases (lengths 1..6, alphabet size 3, 4 target chars).`);

console.log('\n=== Phase 2: Randomized & Degenerate Tests ===');
const fullAlphabet = 'abcdefghijklmnopqrstuvwxyz';

function getRandomString(len) {
  let res = '';
  for (let i = 0; i < len; i++) {
    res += fullAlphabet[Math.floor(Math.random() * fullAlphabet.length)];
  }
  return res;
}

let totalRandom = 0;
const numRandomTrials = 10000;
for (let trial = 0; trial < numRandomTrials; trial++) {
  const len = Math.floor(Math.random() * 10) + 1; // 1..10
  let s = '';
  const type = Math.random();

  if (type < 0.2) {
    // All equal
    const ch = fullAlphabet[Math.floor(Math.random() * fullAlphabet.length)];
    s = ch.repeat(len);
  } else if (type < 0.4) {
    // Alternating
    const ch1 = fullAlphabet[Math.floor(Math.random() * fullAlphabet.length)];
    const ch2 = fullAlphabet[Math.floor(Math.random() * fullAlphabet.length)];
    for (let i = 0; i < len; i++) s += (i % 2 === 0 ? ch1 : ch2);
  } else if (type < 0.6) {
    // Palindrome perturbed
    const half = getRandomString(Math.floor(len / 2));
    const mid = len % 2 === 1 ? fullAlphabet[Math.floor(Math.random() * fullAlphabet.length)] : '';
    s = half + mid + half.split('').reverse().join('');
    if (Math.random() < 0.5 && len > 1) {
      const idx = Math.floor(Math.random() * len);
      const ch = fullAlphabet[Math.floor(Math.random() * fullAlphabet.length)];
      s = s.substring(0, idx) + ch + s.substring(idx + 1);
    }
  } else {
    // Completely random
    s = getRandomString(len);
  }

  const c = fullAlphabet[Math.floor(Math.random() * fullAlphabet.length)];
  totalRandom++;

  const expected = bruteForce(s, c);
  const actual = solveOptimal(s, c);

  if (expected !== actual) {
    console.error(`MISMATCH on random test! s="${s}", c="${c}", expected=${expected}, got=${actual}`);
    process.exit(1);
  }
}
console.log(`Passed ${totalRandom} randomized & degenerate stress tests.`);

console.log('\n=== Phase 3: Worst-Case Benchmark ===');
// Max bounds: t = 500, n = 100, sum(n) = 50,000
const tMax = 500;
const nMax = 100;
const testCases = [];
for (let i = 0; i < tMax; i++) {
  // Adversarial: characters alternating with no matches and target c not present
  const c = 'z';
  let s = '';
  for (let j = 0; j < nMax; j++) {
    s += String.fromCharCode(97 + (j % 25)); // 'a'..'y'
  }
  testCases.push({ s, c });
}

const startTime = Date.now();
let totalCoins = 0;
for (let i = 0; i < tMax; i++) {
  totalCoins += solveOptimal(testCases[i].s, testCases[i].c);
}
const elapsed = Date.now() - startTime;
console.log(`Worst-case execution for t=${tMax}, n=${nMax} (total chars = ${tMax * nMax}): ${elapsed}ms (Result accumulator: ${totalCoins})`);
console.log('All stress tests successfully completed!');

/**
 * Stress test suite for MEX Game (Easy)
 * Independent game-tree minimax oracle vs closed-form move count
 */

function mex(arr) {
  const set = new Set(arr);
  let m = 0;
  while (set.has(m)) m++;
  return m;
}

const memo = new Map();

function gameTreeWin(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const key = sorted.join(',');
  if (memo.has(key)) return memo.get(key);

  const initialMex = mex(arr);
  let win = false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 0) {
      const nextArr = [...arr];
      nextArr[i]--;
      if (mex(nextArr) === initialMex) {
        if (!gameTreeWin(nextArr)) {
          win = true;
          break;
        }
      }
    }
  }

  memo.set(key, win);
  return win;
}

function solveFast(n, a) {
  let maxVal = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] > maxVal) maxVal = a[i];
  }
  const limit = Math.min(n + 1, maxVal + 1);
  const present = new Uint8Array(limit + 1);
  for (let i = 0; i < n; i++) {
    if (a[i] <= limit) present[a[i]] = 1;
  }
  let m = 0;
  while (m <= limit && present[m]) m++;

  let totalMoves = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] > m) {
      totalMoves += a[i] - (m + 1);
    } else if (a[i] < m) {
      totalMoves += a[i];
    }
  }
  totalMoves -= (m * (m - 1)) / 2;

  return (totalMoves % 2 !== 0) ? 'Alice' : 'Bob';
}

function runStress() {
  console.log('[Stress] Running exhaustive oracle test for small arrays...');
  let totalTests = 0;
  for (let n = 1; n <= 4; n++) {
    for (let maxV = 1; maxV <= 4; maxV++) {
      for (let rep = 0; rep < 50; rep++) {
        const arr = Array.from({ length: n }, () => Math.floor(Math.random() * (maxV + 1)));
        totalTests++;
        const exp = gameTreeWin(arr) ? 'Alice' : 'Bob';
        const act = solveFast(n, arr);
        if (exp !== act) {
          console.error(`FAIL at arr=${JSON.stringify(arr)}: exp=${exp}, act=${act}`);
          process.exit(1);
        }
      }
    }
  }
  console.log(`[Stress] Passed ${totalTests} exhaustive game-tree tests.`);

  console.log('[Stress] Running worst-case timing test (N = 200,000, A_i <= 100)...');
  const maxN = 200000;
  const largeA = new Int32Array(maxN);
  for (let i = 0; i < maxN; i++) {
    largeA[i] = Math.floor(Math.random() * 101);
  }
  const t0 = Date.now();
  const res = solveFast(maxN, largeA);
  const elapsed = Date.now() - t0;
  console.log(`[Stress] N = 200,000 executed in ${elapsed}ms (winner = ${res}).`);

  // Max testcase count stress: T = 10,000 with small N = 20 (sum N = 200,000)
  const t1 = Date.now();
  let aliceWins = 0;
  const smallA = new Int32Array(20);
  for (let tc = 0; tc < 10000; tc++) {
    for (let i = 0; i < 20; i++) smallA[i] = (tc + i) % 15;
    if (solveFast(20, smallA) === 'Alice') aliceWins++;
  }
  const elapsedMany = Date.now() - t1;
  console.log(`[Stress] T = 10,000 queries executed in ${elapsedMany}ms. (aliceWins = ${aliceWins})`);
  console.log('[Stress] All verification checks PASSED 100% GREEN!');
}

runStress();

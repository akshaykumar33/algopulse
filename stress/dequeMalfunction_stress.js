const fs = require('fs');
const { execFileSync } = require('child_process');
const path = require('path');

const targetSolution = fs.existsSync(path.resolve(__dirname, '..', 'solutions', 'dequeMalfunction.js'))
  ? path.resolve(__dirname, '..', 'solutions', 'dequeMalfunction.js')
  : path.resolve(__dirname, '..', 'dequeMalfunction.js');

function brute(n, b) {
  const m = b.length;
  const occ = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < m; i++) if (b[i] >= 1 && b[i] <= n) occ[b[i]].push(i);
  for (let v = 1; v <= n; v++) if (occ[v].length === 0) return -1;

  let bestRec = 0;
  const choice = new Int32Array(n + 1);
  const arr = [];

  function rec(v) {
    if (v > n) {
      arr.length = 0;
      for (let k = 1; k <= n; k++) arr.push([choice[k], k]);
      arr.sort((x, y) => x[0] - y[0]);
      let mn = Infinity, mx = -Infinity, cnt = 0;
      for (const [, val] of arr) {
        if (val < mn || val > mx) cnt++;
        if (val < mn) mn = val;
        if (val > mx) mx = val;
      }
      if (cnt > bestRec) bestRec = cnt;
      return;
    }
    for (const i of occ[v]) { choice[v] = i; rec(v + 1); }
  }
  rec(1);
  return n - bestRec;
}

function runFile(cases) {
  let inp = cases.length + '\n';
  for (const [n, b] of cases) inp += n + ' ' + b.length + '\n' + b.join(' ') + '\n';
  const out = execFileSync('node', [targetSolution], { input: inp, maxBuffer: 1 << 28 })
    .toString().trim();
  return out === '' ? [] : out.split('\n').map(Number);
}

// --- retained sample ---
{
  const got = runFile([[6, [1, 6, 2, 5, 1, 5, 3, 4]]]);
  console.log('sample 9 (expect 3):', got[0], got[0] === 3 ? 'OK' : 'MISMATCH');
}

// --- randomized stress ---
let seed = 12345;
function rnd(k) { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed % k; }

let mismatches = 0, total = 0;
for (let round = 0; round < 400; round++) {
  const cases = [];
  for (let c = 0; c < 30; c++) {
    const n = 1 + rnd(5);
    const m = 1 + rnd(9);
    const b = [];
    for (let i = 0; i < m; i++) b.push(1 + rnd(n));
    cases.push([n, b]);
  }
  const got = runFile(cases);
  for (let c = 0; c < cases.length; c++) {
    const exp = brute(cases[c][0], cases[c][1]);
    total++;
    if (got[c] !== exp) {
      mismatches++;
      if (mismatches <= 5) {
        console.log('MISMATCH n=' + cases[c][0], 'b=[' + cases[c][1] + ']', 'got', got[c], 'exp', exp);
      }
    }
  }
}
console.log('random stress: ' + total + ' cases, ' + mismatches + ' mismatches');

// --- exhaustive small ---
let e = 0, em = 0;
for (let n = 1; n <= 4; n++) {
  for (let m = 1; m <= 6; m++) {
    const cases = [];
    const totalCombos = Math.pow(n, m);
    if (totalCombos > 4096) continue;
    for (let code = 0; code < totalCombos; code++) {
      const b = []; let x = code;
      for (let i = 0; i < m; i++) { b.push(1 + (x % n)); x = Math.floor(x / n); }
      cases.push([n, b]);
    }
    for (let s = 0; s < cases.length; s += 500) {
      const chunk = cases.slice(s, s + 500);
      const got = runFile(chunk);
      for (let c = 0; c < chunk.length; c++) {
        const exp = brute(chunk[c][0], chunk[c][1]);
        e++;
        if (got[c] !== exp) {
          em++;
          if (em <= 5) console.log('EXH MISMATCH n=' + chunk[c][0], 'b=[' + chunk[c][1] + ']', 'got', got[c], 'exp', exp);
        }
      }
    }
  }
}
console.log('exhaustive: ' + e + ' cases, ' + em + ' mismatches');

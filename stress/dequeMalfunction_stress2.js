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
  function rec(v) {
    if (v > n) {
      const arr = [];
      for (let k = 1; k <= n; k++) arr.push([choice[k], k]);
      arr.sort((x, y) => x[0] - y[0]);
      let mn = Infinity, mx = -Infinity, cnt = 0;
      for (const p of arr) {
        if (p[1] < mn || p[1] > mx) cnt++;
        if (p[1] < mn) mn = p[1];
        if (p[1] > mx) mx = p[1];
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
  const out = execFileSync('node', [targetSolution], { input: inp, maxBuffer: 1 << 28 }).toString().trim();
  return out === '' ? [] : out.split('\n').map(Number);
}

let seed = 987654321;
function rnd(k) { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed % k; }

// medium n, guaranteed-complete b (exercises the non -1 path deeply)
let tot = 0, mis = 0;
for (let round = 0; round < 250; round++) {
  const cases = [];
  for (let c = 0; c < 20; c++) {
    const n = 2 + rnd(7);            // 2..8
    const extra = rnd(7);            // 0..6 duplicates
    const b = [];
    for (let v = 1; v <= n; v++) b.push(v);
    for (let i = 0; i < extra; i++) b.push(1 + rnd(n));
    for (let i = b.length - 1; i > 0; i--) { const j = rnd(i + 1); const t = b[i]; b[i] = b[j]; b[j] = t; }
    cases.push([n, b]);
  }
  const got = runFile(cases);
  for (let c = 0; c < cases.length; c++) {
    const exp = brute(cases[c][0], cases[c][1]);
    tot++;
    if (got[c] !== exp) { mis++; if (mis <= 5) console.log('MISMATCH n=' + cases[c][0], 'b=[' + cases[c][1] + ']', 'got', got[c], 'exp', exp); }
  }
}
console.log('complete-b stress (n<=8): ' + tot + ' cases, ' + mis + ' mismatches');

// heavy-duplicate structured cases (sorted, reverse-sorted, zigzag)
tot = 0; mis = 0;
const shapes = [];
for (let n = 2; n <= 8; n++) {
  const asc = []; for (let v = 1; v <= n; v++) asc.push(v);
  const desc = asc.slice().reverse();
  const zig = []; for (let i = 0; i < n; i++) zig.push(i % 2 ? n - (i >> 1) : 1 + (i >> 1));
  shapes.push([n, asc], [n, desc], [n, zig],
    [n, asc.concat(desc)], [n, desc.concat(asc)], [n, zig.concat(asc)],
    [n, asc.concat(asc)], [n, desc.concat(desc)]);
}
{
  const got = runFile(shapes);
  for (let c = 0; c < shapes.length; c++) {
    const exp = brute(shapes[c][0], shapes[c][1]);
    tot++;
    if (got[c] !== exp) { mis++; console.log('SHAPE MISMATCH n=' + shapes[c][0], 'b=[' + shapes[c][1] + ']', 'got', got[c], 'exp', exp); }
  }
}
console.log('structured shapes: ' + tot + ' cases, ' + mis + ' mismatches');

// n=1 and missing-value edge cases
{
  const edge = [[1, [1]], [1, [1, 1, 1]], [2, [1]], [2, [2]], [2, [1, 2]], [2, [2, 1]], [3, [1, 3]], [3, [3, 1, 2]]];
  const got = runFile(edge);
  let bad = 0;
  for (let c = 0; c < edge.length; c++) {
    const exp = brute(edge[c][0], edge[c][1]);
    if (got[c] !== exp) { bad++; console.log('EDGE MISMATCH', JSON.stringify(edge[c]), 'got', got[c], 'exp', exp); }
  }
  console.log('edge cases: ' + edge.length + ' cases, ' + bad + ' mismatches');
}

const { execSync } = require('child_process');
const g = (x, y) => y ? g(y, x % y) : x;
const cases = [];
for (let it = 0; it < 4000; it++) {
  const a = 2 + Math.floor(Math.random() * (Math.random() < 0.5 ? 50 : 3000));
  const b = a + Math.floor(Math.random() * 60);
  cases.push([a, b]);
}
cases.push([2184, 2200]);
const out = execSync('node contests/codeforces/2026-11-06/disgustingGcdChecker.js', { input: `${cases.length}\n` + cases.map(c => c.join(' ')).join('\n') }).toString().trim().split(/\r?\n/);
let p = 0;
for (const [a, b] of cases) {
  const d = new Map([[a, 0]]), q = [a];
  while (q.length) { const u = q.shift(); for (let v = u + 1; v <= b; v++) if (!d.has(v) && g(u, v) === 1) { d.set(v, d.get(u) + 1); q.push(v); } }
  const k = +out[p++];
  if (k !== d.get(b)) throw ['k', a, b, k, d.get(b)];
  if (k === 0) { if (out[p] !== undefined && out[p] === '') p++; continue; }
  const xs = out[p++].split(' ').map(Number);
  let cur = a;
  for (const x of xs) { if (x < 1 || g(cur, x) !== 1) throw ['op', a, b]; cur += x; }
  if (cur !== b || xs.length !== k) throw ['end', a, b];
}
console.log('ok', cases.length);

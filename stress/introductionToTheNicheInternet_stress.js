const { execSync } = require('child_process');
const cntP = p => { let s = 0, c = 0; p.forEach((x, i) => { if (x * i >= s) c++; s += x; }); return c; };
const perms = a => a.length <= 1 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p]));
const cases = [];
for (let it = 0; it < 2000; it++) {
  const n = 1 + Math.floor(Math.random() * 6);
  const a = Array.from({ length: n }, () => Math.floor(Math.random() * 7) - 3);
  cases.push([n, 1 + Math.floor(Math.random() * n), a]);
}
const out = execSync('node contests/codeforces/2026-11-06/introductionToTheNicheInternet.js', { input: `${cases.length}\n` + cases.map(([n, k, a]) => `${n} ${k}\n${a.join(' ')}`).join('\n') }).toString().trim().split(/\r?\n/);
let p = 0;
for (const [n, k, a] of cases) {
  const ok = perms(a).some(q => cntP(q) === k);
  const ans = out[p++];
  if (ans === 'NO') { if (ok) { console.log('FAIL NO', n, k, a); process.exit(1); } continue; }
  const q = out[p++].split(' ').map(Number);
  if (!ok || cntP(q) !== k || [...q].sort((x, y) => x - y).join() !== [...a].sort((x, y) => x - y).join()) { console.log('FAIL', n, k, a, q); process.exit(1); }
}
console.log('ok', cases.length);

const { execSync } = require('child_process');
const f = (n, A) => { let cur = new Set(A), tot = 0; for (let i = 1; i < n; i++) { cur = new Set([...cur].map(x => (x + 1) % (n - i))); let m = 0; while (cur.has(m)) m++; tot += m; } return tot; };
const cases = [];
for (let n = 1; n <= 8; n++) for (let mask = 0; mask < 1 << n; mask++) cases.push([n, mask]);
for (let k = 0; k < 300; k++) { const n = 9 + Math.floor(Math.random() * 4); cases.push([n, Math.floor(Math.random() * (1 << n)) & (Math.random() < 0.5 ? 0 : -1)]); }
const out = execSync('node contests/codeforces/2026-11-06/funTimes.js', { input: `${cases.length}\n` + cases.map(([n, m]) => `${n}\n${Array.from({ length: n }, (_, i) => (m >> i) & 1).join('')}`).join('\n') }).toString().trim().split(/\r?\n/);
cases.forEach(([n, mask], k) => {
  let tot = 0;
  for (let sup = 0; sup < 1 << n; sup++) if ((sup & mask) === mask) { const A = []; for (let i = 0; i < n; i++) if (sup >> i & 1) A.push(i); tot += f(n, A); }
  if (String(tot % 1000000007) !== out[k]) { console.log('FAIL', n, mask, tot, out[k]); process.exit(1); }
});
console.log('ok', cases.length);

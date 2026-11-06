const { execSync } = require('child_process');
const g = (a, b) => b ? g(b, a % b) : a;
const cases = [];
for (let it = 0; it < 3000; it++) {
  const n = 2 + Math.floor(Math.random() * 8);
  const big = Math.random() < 0.5 ? 30 : 100000;
  cases.push(Array.from({ length: n }, () => 2 + Math.floor(Math.random() * (big - 1))));
}
const out = execSync('node contests/codeforces/2026-11-06/disgustingGcdConstructive.js', { input: `${cases.length}\n` + cases.map(a => `${a.length}\n${a.join(' ')}`).join('\n') }).toString().trim().split(/\r?\n/);
cases.forEach((a, k) => {
  const b = out[k].split(' ').map(Number);
  let ops = 0, sx = 0, sa = a.reduce((s, v) => s + v, 0);
  for (let i = 0; i < a.length; i++) {
    if (b[i] < a[i]) throw a;
    if (b[i] > a[i]) { ops++; sx += b[i] - a[i]; if (g(a[i], b[i] - a[i]) !== 1) throw ['gcd', a, b]; }
    for (let j = i + 1; j < a.length; j++) { const d = g(b[i], b[j]); if (d > 1 && d < Math.min(b[i], b[j])) throw ['disg', a, b]; }
  }
  if (ops > a.length + 10 || sx > sa) throw ['budget', a, b];
});
console.log('ok', cases.length);

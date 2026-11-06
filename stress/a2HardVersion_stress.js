const { execSync } = require('child_process');
for (let it = 0; it < 3000; it++) {
  const n = 2 + Math.floor(Math.random() * 10);
  const a = Array.from({ length: n }, () => Math.floor(Math.random() * 6));
  const v = a.map(e => 2 ** e);
  let best = 0n, T = v.reduce((s, e) => s + e, 0);
  for (let m = 0; m < 1 << n; m++) { let s = 0; for (let i = 0; i < n; i++) if (m >> i & 1) s += v[i]; const r = BigInt(s) * BigInt(T - s); if (r > best) best = r; }
  const out = execSync('node contests/codeforces/2026-11-06/a2HardVersion.js', { input: `1\n${n}\n${a.join(' ')}\n` }).toString().trim();
  if (out !== best.toString()) { console.log('FAIL', a, out, best); process.exit(1); }
}
console.log('ok');

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const [n, q] = input[0].trim().split(/\s+/).map(Number);
  const a = input[1].trim().split(/\s+/).map(BigInt);
  const b = input[2].trim().split(/\s+/).map(BigInt);
  const pref = new Array(n + 1);
  pref[0] = 0n;
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + a[i] * b[i];
  }
  const out = [];
  for (let i = 3; i < 3 + q; i++) {
    const [l, r] = input[i].trim().split(/\s+/).map(Number);
    out.push((pref[r] - pref[l - 1]).toString());
  }
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function power(base, exp, mod) {
  let res = 1n;
  let b = base % mod;
  let e = exp;
  while (e > 0n) {
    if (e & 1n) res = (res * b) % mod;
    b = (b * b) % mod;
    e >>= 1n;
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const mod = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    const d = BigInt(tokens[pos++]);
    for (let i = 0; i < n; i++) pos++;

    const num = (d + 1n) % mod;
    const den = (2n * d) % mod;
    const inv = power(den, mod - 2n, mod);
    const ans = (num * inv) % mod;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

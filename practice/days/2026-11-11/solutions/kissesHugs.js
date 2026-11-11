const fs = require('fs');

function modPow(base, exp, mod) {
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
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const mod = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(tokens[ptr++]);
    const e1 = (n + 1n) >> 1n;
    const e2 = (n + 2n) >> 1n;
    const ans = (modPow(2n, e1, mod) + modPow(2n, e2, mod) - 2n + mod) % mod;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

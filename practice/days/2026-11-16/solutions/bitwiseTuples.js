const fs = require('fs');

function modPow(base, exp, mod) {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp /= 2n;
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const mod = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const m = BigInt(input[ptr++]);
    const term = (modPow(2n, n, mod) - 1n + mod) % mod;
    const ans = modPow(term, m, mod);
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();

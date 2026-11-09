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
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const mod = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let maxVal = -1;
    let cnt = 0;

    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      if (v > maxVal) {
        maxVal = v;
        cnt = 1;
      } else if (v === maxVal) {
        cnt++;
      }
    }

    const ans = (modPow(2n, BigInt(cnt), mod) - 1n + mod) % mod;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

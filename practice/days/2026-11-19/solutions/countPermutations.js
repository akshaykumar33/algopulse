const fs = require('fs');

function power(base, exp, mod) {
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
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const mod = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    if (n <= 2n) {
      out.push('0');
    } else {
      let ans = (power(2n, n - 1n, mod) - 2n) % mod;
      if (ans < 0n) ans += mod;
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();

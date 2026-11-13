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
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const mod = 1000000007n;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const p = modPow(3n, n, mod);
    let ans;
    if (n % 2n === 0n) {
      ans = (p + 3n) % mod;
    } else {
      ans = (p - 3n + mod) % mod;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

function main() {}

solve();

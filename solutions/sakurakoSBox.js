const fs = require('fs');

const MOD = 1000000007n;

function power(base, exp) {
  let res = 1n;
  base = base % MOD;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % MOD;
    base = (base * base) % MOD;
    exp = exp / 2n;
  }
  return res;
}

function modInverse(n) {
  return power(n, MOD - 2n);
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++].trim(), 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    while (lineIdx < input.length && !input[lineIdx].trim()) lineIdx++;
    if (lineIdx >= input.length) break;
    const n = BigInt(input[lineIdx++].trim());
    const a = input[lineIdx++].trim().split(/\s+/).map(BigInt);

    let sum = 0n;
    let sumSq = 0n;

    for (let i = 0; i < a.length; i++) {
      const v = a[i] % MOD;
      sum = (sum + v) % MOD;
      sumSq = (sumSq + v * v) % MOD;
    }

    let p = ((sum * sum - sumSq) % MOD + MOD) % MOD;
    p = (p * modInverse(2n)) % MOD;

    let q = (n * (n - 1n) / 2n) % MOD;
    const ans = (p * modInverse(q)) % MOD;

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();


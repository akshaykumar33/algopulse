const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const MOD = 1000000007n;

  const maxN = 100005;
  const pow2 = new BigInt64Array(maxN + 1);
  pow2[0] = 1n;
  for (let i = 1; i <= maxN; i++) {
    pow2[i] = (pow2[i - 1] * 2n) % MOD;
  }

  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const A0 = BigInt(input[ptr++]);

    let P = (2n * A0) % MOD;
    let totalScore = 0n;

    for (let i = 1; i <= n; i++) {
      const Ai = BigInt(input[ptr++]);
      const contrib = (Ai * pow2[n - i]) % MOD;
      totalScore = (totalScore + contrib * P) % MOD;
      const addP = (pow2[i] * Ai) % MOD;
      P = (P + addP) % MOD;
    }

    out.push(totalScore.toString());
  }

  console.log(out.join('\n'));
}

solve();

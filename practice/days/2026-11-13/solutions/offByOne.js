const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const MOD = 998244353;
  const out = [];

  const maxN = 4005;
  const fact = new Int32Array(maxN);
  fact[0] = 1;
  for (let i = 1; i < maxN; i++) {
    fact[i] = Number((BigInt(fact[i - 1]) * BigInt(i)) % BigInt(MOD));
  }

  let dp0 = new Int32Array(maxN);
  let dp1 = new Int32Array(maxN);
  let next0 = new Int32Array(maxN);
  let next1 = new Int32Array(maxN);

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];

    dp0.fill(0, 0, n + 2);
    dp1.fill(0, 0, n + 2);
    dp0[1] = 1;

    for (let i = 1; i < n; i++) {
      next0.fill(0, 0, i + 2);
      next1.fill(0, 0, i + 2);
      const isOne = s.charCodeAt(i - 1) === 49;

      for (let k = 1; k <= i; k++) {
        const w0 = dp0[k];
        const w1 = dp1[k];
        if (w0 === 0 && w1 === 0) continue;

        if (isOne) {
          let v = w0 + w1;
          if (v >= MOD) v -= MOD;
          let cur = next1[k] + v;
          if (cur >= MOD) cur -= MOD;
          next1[k] = cur;
        } else {
          let v = w0 + w1;
          if (v >= MOD) v -= MOD;
          let cur1 = next1[k] - v;
          if (cur1 < 0) cur1 += MOD;
          next1[k] = cur1;

          let fin = w0 + (w1 << 1);
          if (fin >= MOD) fin %= MOD;
          let cur0 = next0[k + 1] + fin;
          if (cur0 >= MOD) cur0 -= MOD;
          next0[k + 1] = cur0;
        }
      }

      let tmp0 = dp0; dp0 = next0; next0 = tmp0;
      let tmp1 = dp1; dp1 = next1; next1 = tmp1;
    }

    let totalAns = 0n;
    for (let k = 1; k <= n; k++) {
      let C_k = dp0[k] + (dp1[k] << 1);
      if (C_k >= MOD) C_k %= MOD;
      totalAns = (totalAns + BigInt(C_k) * BigInt(fact[k])) % BigInt(MOD);
    }

    out.push(Number(totalAns));
  }

  console.log(out.join('\n'));
}

function main() {}

solve();

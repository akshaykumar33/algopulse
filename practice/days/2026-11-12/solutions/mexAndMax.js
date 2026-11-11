const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 998244353n;
  const pow2 = new Array(105);
  pow2[0] = 1n;
  for (let i = 1; i < 105; i++) {
    pow2[i] = (pow2[i - 1] * 2n) % MOD;
  }
  const cnt = new Int32Array(105);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    cnt.fill(0, 0, n + 2);
    for (let i = 0; i < n; i++) {
      cnt[parseInt(tokens[ptr++], 10)]++;
    }

    let pref = 1n;
    let ans = 0n;
    for (let k = 0; k <= n; k++) {
      if (k + 1 <= n) {
        const wNext = (pow2[cnt[k + 1]] - 1n + MOD) % MOD;
        ans = (ans + pref * wNext) % MOD;
      }
      const wCur = (pow2[cnt[k]] - 1n + MOD) % MOD;
      pref = (pref * wCur) % MOD;
      ans = (ans + pref) % MOD;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

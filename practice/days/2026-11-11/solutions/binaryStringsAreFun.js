const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const MOD = 998244353;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let ans = 1;
    let cur = 1;
    for (let i = 1; i < n; i++) {
      if (s[i] === s[i - 1]) {
        cur = (cur * 2) % MOD;
      } else {
        cur = 1;
      }
      ans += cur;
      if (ans >= MOD) ans -= MOD;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

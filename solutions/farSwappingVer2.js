const fs = require('fs');
const buf = fs.readFileSync(0);
let pos = 0;
const len = buf.length;

function nextInt() {
  while (pos < len && buf[pos] <= 32) pos++;
  if (pos >= len) return 0;
  let res = 0;
  while (pos < len && buf[pos] > 32) {
    res = res * 10 + (buf[pos] - 48);
    pos++;
  }
  return res;
}

const MOD = 998244353;

function solve() {
  const t = nextInt();
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const p = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) p[nextInt()] = i;
    let dp = new Int32Array(n + 2);
    let ndp = new Int32Array(n + 2);
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
      if (p[i - 1] < p[i]) {
        let pref = 0;
        for (let j = 1; j <= i; j++) {
          ndp[j] = pref;
          pref += dp[j];
          if (pref >= MOD) pref -= MOD;
        }
      } else {
        let suf = 0;
        ndp[i] = 0;
        for (let j = i - 1; j >= 1; j--) {
          suf += dp[j];
          if (suf >= MOD) suf -= MOD;
          ndp[j] = suf;
        }
      }
      const tmp = dp;
      dp = ndp;
      ndp = tmp;
    }
    let ans = 0;
    for (let j = 1; j <= n; j++) {
      ans += dp[j];
      if (ans >= MOD) ans -= MOD;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');
function solve() {
  const maxN = 1000000;
  const ans = new BigInt64Array(maxN + 1);
  const dp = [];
  let cur = 1;
  let r = 1;
  while (cur <= maxN) {
    dp[r] = new BigInt64Array(r + 2);
    for (let c = 1; c <= r; c++) {
      if (cur <= maxN) {
        const val = BigInt(cur);
        const upLeft = (r > 1 && c > 1) ? dp[r - 1][c - 1] : 0n;
        const upRight = (r > 1 && c <= r - 1) ? dp[r - 1][c] : 0n;
        const upUp = (r > 2 && c > 1 && c <= r - 1) ? dp[r - 2][c - 1] : 0n;
        dp[r][c] = val * val + upLeft + upRight - upUp;
        ans[cur] = dp[r][c];
        cur++;
      }
    }
    r++;
  }
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    out.push(ans[n].toString());
  }
  console.log(out.join('\n'));
}
solve();

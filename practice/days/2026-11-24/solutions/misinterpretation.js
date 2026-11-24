const fs = require('fs');

function solve() {
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
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const MOD = 1000000007n;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const vis = new Uint8Array(n);
    let cycles = 0;
    for (let p = 0; p < n; p++) {
      if (vis[p]) continue;
      cycles++;
      let cur = p;
      while (!vis[cur]) {
        vis[cur] = 1;
        cur = 2 * cur;
        if (cur < n || n % 2 === 1) {
          cur++;
        }
        cur %= n;
      }
    }
    let res = 1n;
    let base = 26n;
    let exp = BigInt(cycles);
    while (exp > 0n) {
      if (exp & 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1n;
    }
    out.push(res.toString());
  }
  console.log(out.join('\n'));
}

solve();

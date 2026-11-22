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
  const T = nextInt();
  if (T === null) return;
  const MAX = 100005;
  const spf = new Int32Array(MAX);
  for (let i = 2; i < MAX; i++) {
    if (spf[i] === 0) {
      for (let j = i; j < MAX; j += i) {
        if (spf[j] === 0) spf[j] = i;
      }
    }
  }
  const MOD = 1000000007n;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const p = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) p[i] = nextInt();
    const vis = new Uint8Array(n + 1);
    const maxPower = new Map();
    for (let i = 1; i <= n; i++) {
      if (!vis[i]) {
        let cur = i, len = 0;
        while (!vis[cur]) {
          vis[cur] = 1;
          cur = p[cur];
          len++;
        }
        let temp = len;
        while (temp > 1) {
          const pr = spf[temp];
          let cnt = 0;
          while (temp % pr === 0) {
            cnt++;
            temp = Math.floor(temp / pr);
          }
          if (!maxPower.has(pr) || maxPower.get(pr) < cnt) {
            maxPower.set(pr, cnt);
          }
        }
      }
    }
    let ans = 1n;
    for (const [prime, power] of maxPower.entries()) {
      let pVal = 1n;
      for (let i = 0; i < power; i++) pVal = (pVal * BigInt(prime)) % MOD;
      ans = (ans * pVal) % MOD;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
solve();
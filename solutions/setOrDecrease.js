const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = BigInt(nextInt());
    const a = [];
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      const v = nextInt();
      a.push(v);
      sum += BigInt(v);
    }
    if (sum <= k) {
      out.push(0);
      continue;
    }
    a.sort((x, y) => x - y);
    const pref = new Array(n + 1);
    pref[0] = 0n;
    for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + BigInt(a[i]);
    const a0 = BigInt(a[0]);
    let ans = sum - k;
    for (let m = 0; m < n; m++) {
      const remSum = pref[n - m] - pref[1];
      const target = k - remSum;
      const count = BigInt(m + 1);
      let x;
      if (target >= 0n) {
        x = target / count;
      } else {
        x = (target - count + 1n) / count;
      }
      let dec = a0 - x;
      if (dec < 0n) dec = 0n;
      const steps = dec + BigInt(m);
      if (steps < ans) ans = steps;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0, sign = 1;
    if (buf[pos] === 45) { sign = -1; pos++; }
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt(), k = nextInt();
    const a = new Int32Array(n);
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      sum += BigInt(a[i]);
    }
    let maxKadane = 0n, curKadane = 0n;
    for (let i = 0; i < n; i++) {
      curKadane += BigInt(a[i]);
      if (curKadane < 0n) curKadane = 0n;
      if (curKadane > maxKadane) maxKadane = curKadane;
    }
    let maxPref = 0n, curPref = 0n;
    for (let i = 0; i < n; i++) {
      curPref += BigInt(a[i]);
      if (curPref > maxPref) maxPref = curPref;
    }
    let maxSuff = 0n, curSuff = 0n;
    for (let i = n - 1; i >= 0; i--) {
      curSuff += BigInt(a[i]);
      if (curSuff > maxSuff) maxSuff = curSuff;
    }
    if (k === 1) {
      out.push(maxKadane.toString());
    } else {
      let cand1 = maxKadane;
      let cand2 = maxSuff + maxPref;
      let cand3 = maxSuff + BigInt(k - 2) * sum + maxPref;
      let ans = cand1;
      if (cand2 > ans) ans = cand2;
      if (sum > 0n && cand3 > ans) ans = cand3;
      out.push(ans.toString());
    }
  }
  console.log(out.join('\n'));
}
solve();
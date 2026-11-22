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
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const A = new BigInt64Array(n);
    const B = new BigInt64Array(n);
    let low = 0n;
    for (let i = 0; i < n; i++) {
      A[i] = nextBigInt();
      if (A[i] > low) low = A[i];
    }
    for (let i = 0; i < n; i++) B[i] = nextBigInt();
    let high = 4000000000n;
    function ok(M) {
      let S = 0n, R = 0n;
      for (let i = 0; i < n; i++) {
        if (A[i] > M) return false;
        if (A[i] + B[i] > M) {
          const send = A[i] + B[i] - M;
          if (send > B[i]) return false;
          S += send;
        } else {
          R += (M - A[i] - B[i]) / 2n;
        }
      }
      if (S > R) return false;
      for (let i = 0; i < n; i++) {
        let send = 0n, rec = 0n;
        if (A[i] + B[i] > M) send = A[i] + B[i] - M;
        else rec = (M - A[i] - B[i]) / 2n;
        if (send > R - rec) return false;
      }
      return true;
    }
    let ans = high;
    while (low <= high) {
      const mid = (low + high) / 2n;
      if (ok(mid)) {
        ans = mid;
        high = mid - 1n;
      } else {
        low = mid + 1n;
      }
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
solve();
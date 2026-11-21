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
  const T = tVal;
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = nextInt(), q = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    a.sort();
    const pref = new BigInt64Array(n + 1);
    for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + BigInt(a[i]);
    const sums = new Set();
    function split(l, r) {
      const sum = pref[r + 1] - pref[l];
      sums.add(sum);
      if (a[l] === a[r]) return;
      const mid = (a[l] + a[r]) >> 1;
      let lo = l, hi = r, p = l;
      while (lo <= hi) {
        const m = (lo + hi) >> 1;
        if (a[m] <= mid) {
          p = m;
          lo = m + 1;
        } else {
          hi = m - 1;
        }
      }
      if (p < l || p >= r) return;
      split(l, p);
      split(p + 1, r);
    }
    split(0, n - 1);
    for (let i = 0; i < q; i++) {
      const s = BigInt(nextInt());
      out.push(sums.has(s) ? 'Yes' : 'No');
    }
  }
  console.log(out.join('\n'));
}
solve();
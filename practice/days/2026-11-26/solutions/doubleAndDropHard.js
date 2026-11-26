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

  const t = nextInt();
  if (t === null) return;

  const mod = 998244353;
  const p2 = new Int32Array(5005);
  p2[0] = 1;
  for (let i = 1; i < 5005; i++) p2[i] = (2 * p2[i - 1]) % mod;

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    a.sort();

    let ans = 0;
    for (let i = 0; i < n; i++) {
      ans = (ans + Number((BigInt(a[i]) * BigInt(p2[n - 1])) % BigInt(mod))) % mod;
      for (let j = 0; j <= i; j++) {
        if (2 * a[j] <= a[i]) {
          let target = a[i] - a[j];
          let low = 0, high = n;
          while (low < high) {
            let mid = (low + high) >> 1;
            if (a[mid] <= target) low = mid + 1;
            else high = mid;
          }
          let l = low;
          let ways = p2[j];
          if (l < i) ways = Number((BigInt(ways) * BigInt(p2[i - l])) % BigInt(mod));
          ans = (ans - Number((BigInt(ways) * BigInt(a[i] - a[j])) % BigInt(mod))) % mod;
        } else {
          let target = a[i] - a[j];
          let low = 0, high = n;
          while (low < high) {
            let mid = (low + high) >> 1;
            if (a[mid] <= target) low = mid + 1;
            else high = mid;
          }
          let r = low;
          let ways = p2[r];
          if (j < i) ways = Number((BigInt(ways) * BigInt(p2[i - j - 1])) % BigInt(mod));
          ans = (ans - Number((BigInt(a[j]) * BigInt(ways)) % BigInt(mod))) % mod;
        }
        ans = (ans + mod) % mod;
      }
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

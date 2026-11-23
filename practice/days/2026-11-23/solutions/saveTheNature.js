const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  function gcd(a, b) {
    while (b) { const r = a % b; a = b; b = r; }
    return a;
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const p = new Float64Array(n);
    for (let i = 0; i < n; i++) p[i] = nextInt();
    let x = nextInt(), a = nextInt();
    let y = nextInt(), b = nextInt();
    const k = BigInt(nextInt());
    if (x < y) {
      let tmp = x; x = y; y = tmp;
      tmp = a; a = b; b = tmp;
    }
    p.sort();
    p.reverse();
    const g = gcd(a, b);
    const lcm = (a / g) * b;
    let low = 1, high = n, ans = -1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      const cab = Math.floor(mid / lcm);
      const ca = Math.floor(mid / a) - cab;
      const cb = Math.floor(mid / b) - cab;
      let total = 0n;
      let idx = 0;
      for (let i = 0; i < cab; i++) {
        total += BigInt(Math.floor(p[idx++] / 100)) * BigInt(x + y);
      }
      for (let i = 0; i < ca; i++) {
        total += BigInt(Math.floor(p[idx++] / 100)) * BigInt(x);
      }
      for (let i = 0; i < cb; i++) {
        total += BigInt(Math.floor(p[idx++] / 100)) * BigInt(y);
      }
      if (total >= k) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();

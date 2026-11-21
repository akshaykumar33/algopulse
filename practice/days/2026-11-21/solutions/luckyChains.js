const fs = require('fs');
function solve() {
  const MAXV = 10000000;
  const spf = new Int32Array(MAXV + 1);
  for (let i = 2; i <= MAXV; i++) {
    if (spf[i] === 0) {
      for (let j = i; j <= MAXV; j += i) {
        if (spf[j] === 0) spf[j] = i;
      }
    }
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
  const tVal = nextInt();
  if (tVal === null) return;
  const T = tVal;
  const out = [];
  function gcd(a, b) {
    while (b) { const tmp = a % b; a = b; b = tmp; }
    return a;
  }
  for (let t = 0; t < T; t++) {
    const x = nextInt();
    const y = nextInt();
    const d = y - x;
    if (d === 1) {
      out.push(-1);
      continue;
    }
    if (gcd(x, y) > 1) {
      out.push(0);
      continue;
    }
    let temp = d;
    let minK = Infinity;
    while (temp > 1) {
      const p = spf[temp];
      while (temp % p === 0) temp = Math.floor(temp / p);
      const rem = x % p;
      const k = (p - rem) % p;
      if (k < minK) minK = k;
    }
    out.push(minK);
  }
  console.log(out.join('\n'));
}
solve();
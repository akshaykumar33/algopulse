const fs = require('fs');
const MAX_PRIME = 31622;
const isPr = new Uint8Array(MAX_PRIME + 1).fill(1);
isPr[0] = isPr[1] = 0;
const primes = [];
for (let p = 2; p <= MAX_PRIME; p++) {
  if (isPr[p]) {
    primes.push(p);
    for (let j = p * p; j <= MAX_PRIME; j += p) isPr[j] = 0;
  }
}
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
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const seen = new Set();
    let hasShared = false;
    for (let i = 0; i < n; i++) {
      let v = nextInt();
      if (hasShared) continue;
      for (let j = 0; j < primes.length && primes[j] * primes[j] <= v; j++) {
        const p = primes[j];
        if (v % p === 0) {
          if (seen.has(p)) hasShared = true;
          seen.add(p);
          while (v % p === 0) v = Math.floor(v / p);
        }
      }
      if (v > 1) {
        if (seen.has(v)) hasShared = true;
        seen.add(v);
      }
    }
    out.push(hasShared ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
solve();
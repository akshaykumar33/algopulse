const fs = require('fs');

function buildPrimes(limit) {
  const isComp = new Uint8Array(limit + 1);
  const primes = [];
  for (let i = 2; i * i <= limit; i++) {
    if (!isComp[i]) {
      for (let j = i * i; j <= limit; j += i) isComp[j] = 1;
    }
  }
  for (let i = 2; i <= limit; i++) {
    if (!isComp[i]) primes.push(i);
  }
  return primes;
}

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  const len = buf.length;
  let ptr = 0;

  function nextInt() {
    while (ptr < len && buf.charCodeAt(ptr) <= 32) ptr++;
    let res = 0;
    while (ptr < len) {
      const c = buf.charCodeAt(ptr);
      if (c <= 32) break;
      res = res * 10 + (c - 48);
      ptr++;
    }
    return res;
  }

  while (ptr < len && buf.charCodeAt(ptr) <= 32) ptr++;
  if (ptr >= len) return;

  const primes = buildPrimes(1400000);
  const t = nextInt();
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const res = new Array(n);
    for (let i = 0; i < n; i++) {
      const b = nextInt();
      res[i] = primes[b - 1];
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

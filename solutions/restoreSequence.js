const fs = require('fs');

const MAX = 1400000;
const isPrime = new Uint8Array(MAX);
isPrime.fill(1);
isPrime[0] = isPrime[1] = 0;
for (let p = 2; p * p < MAX; p++) {
  if (isPrime[p]) {
    for (let i = p * p; i < MAX; i += p) {
      isPrime[i] = 0;
    }
  }
}
const primes = new Int32Array(100005);
let primeCount = 1;
for (let i = 2; i < MAX && primeCount <= 100000; i++) {
  if (isPrime[i]) {
    primes[primeCount++] = i;
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const b = nextInt();
      a[i] = primes[b];
    }
    out.push(a.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

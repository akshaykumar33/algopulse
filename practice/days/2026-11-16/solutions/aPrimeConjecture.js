const fs = require('fs');

const MAX = 1000000;
const isPrime = new Uint8Array(MAX + 1);
isPrime.fill(1);
isPrime[0] = 0;
isPrime[1] = 0;
for (let p = 2; p * p <= MAX; p++) {
  if (isPrime[p]) {
    for (let i = p * p; i <= MAX; i += p) {
      isPrime[i] = 0;
    }
  }
}

const primes100 = [];
const primes1000 = [];
for (let i = 2; i <= 1000; i++) {
  if (isPrime[i]) {
    primes1000.push(i);
    if (i <= 100) primes100.push(i);
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  const out = [];

  for (let idx = 0; idx < input.length; idx++) {
    const n = parseInt(input[idx], 10);
    if (n === 0) break;

    let found = false;
    for (let i = 0; i < primes100.length; i++) {
      const p3 = primes100[i];
      const p3c = p3 * p3 * p3;
      if (p3c >= n) break;

      for (let j = 0; j < primes1000.length; j++) {
        const p2 = primes1000[j];
        const p2s = p2 * p2;
        if (p3c + p2s >= n) break;

        const p1 = n - p3c - p2s;
        if (p1 <= MAX && isPrime[p1]) {
          out.push(p1 + " " + p2 + " " + p3);
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found) {
      out.push("0 0 0");
    }
  }
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  // Precompute SPF (Smallest Prime Factor) sieve up to MAX = 300,000
  const MAX = 300000;
  const spf = new Int32Array(MAX + 1);
  for (let i = 2; i <= MAX; i++) {
    if (spf[i] === 0) {
      for (let j = i; j <= MAX; j += i) {
        if (spf[j] === 0) {
          spf[j] = i;
        }
      }
    }
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const x = nextInt();
    if (n === null || x === null) break;

    // Extract distinct prime factors of x
    const primes = [];
    let temp = x;
    while (temp > 1) {
      const p = spf[temp];
      primes.push(p);
      while (temp % p === 0) {
        temp = Math.floor(temp / p);
      }
    }

    const numPrimes = primes.length;
    const sums = new Float64Array(numPrimes); // Float64Array handles safe integers up to 2^53 - 1

    for (let i = 0; i < n; i++) {
      const a_i = nextInt();
      for (let j = 0; j < numPrimes; j++) {
        if (a_i % primes[j] === 0) {
          sums[j] += a_i;
        }
      }
    }

    let maxCoins = 0;
    for (let j = 0; j < numPrimes; j++) {
      if (sums[j] > maxCoins) {
        maxCoins = sums[j];
      }
    }

    out.push(maxCoins);
  }

  console.log(out.join('\n'));
}

solve();

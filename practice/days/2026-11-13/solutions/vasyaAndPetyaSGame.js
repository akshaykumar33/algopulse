const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = parseInt(input, 10);

  const isPrime = new Uint8Array(n + 1).fill(1);
  isPrime[0] = 0;
  if (n >= 1) isPrime[1] = 0;

  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= n; i += p) {
        isPrime[i] = 0;
      }
    }
  }

  const res = [];
  for (let p = 2; p <= n; p++) {
    if (isPrime[p]) {
      let q = p;
      while (q <= n) {
        res.push(q);
        q *= p;
      }
    }
  }

  console.log(res.length);
  if (res.length > 0) {
    console.log(res.join(' '));
  } else {
    console.log('');
  }
}

solve();

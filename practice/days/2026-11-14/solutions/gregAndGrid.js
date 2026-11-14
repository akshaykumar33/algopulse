const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const limit = n + m;
  const isPrime = new Uint8Array(limit + 1);
  isPrime.fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;
  for (let p = 2; p * p <= limit; p++) {
    if (isPrime[p]) {
      for (let i = p * p; i <= limit; i += p) {
        isPrime[i] = 0;
      }
    }
  }
  let cnt = 0;
  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) cnt++;
  }
  console.log(cnt);
}

solve();

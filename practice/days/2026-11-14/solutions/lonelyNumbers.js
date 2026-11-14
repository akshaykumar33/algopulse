const fs = require('fs');

function solve() {
  const MAX = 1000000;
  const isPrime = new Uint8Array(MAX + 1);
  isPrime.fill(1);
  isPrime[0] = isPrime[1] = 0;

  for (let i = 2; i * i <= MAX; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= MAX; j += i) isPrime[j] = 0;
    }
  }

  const primeCount = new Int32Array(MAX + 1);
  for (let i = 1; i <= MAX; i++) {
    primeCount[i] = primeCount[i - 1] + isPrime[i];
  }

  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
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
    const sqrtN = Math.floor(Math.sqrt(n));
    const ans = 1 + (primeCount[n] - primeCount[sqrtN]);
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();

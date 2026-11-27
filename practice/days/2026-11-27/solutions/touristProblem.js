const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const a = new Array(n);
  for (let i = 0; i < n; i++) a[i] = BigInt(tokens[ptr++]);
  a.sort((x, y) => (x > y ? 1 : x < y ? -1 : 0));
  let sumA = 0n;
  for (let i = 0; i < n; i++) sumA += a[i];
  let diffSum = 0n;
  for (let i = 0; i < n; i++) {
    diffSum += a[i] * (2n * BigInt(i) - BigInt(n) + 1n);
  }
  const num = sumA + 2n * diffSum;
  const den = BigInt(n);
  function gcd(x, y) {
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  }
  const g = gcd(num, den);
  console.log((num / g) + ' ' + (den / g));
}

const fs = require('fs');
function isPrime(n) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}

function nextPrime(n) {
  let p = n < 2n ? 2n : n;
  while (!isPrime(p)) p++;
  return p;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const x = BigInt(input[ptr++]);
    const p1 = nextPrime(x);
    const p2 = nextPrime(p1 + 1n);
    out.push((p1 * p2).toString());
  }
  console.log(out.join('\n'));
}
solve();
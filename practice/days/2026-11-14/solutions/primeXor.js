const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  function isPrime(n) {
    if (n < 2) return false;
    if (n === 2 || n === 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }

  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(input[ptr++], 10);
    const y = parseInt(input[ptr++], 10);
    const z = x ^ y;

    let res = null;
    // Candidate 1: A = 2
    let b = 2 ^ x, c = 2 ^ z;
    if (isPrime(b) && isPrime(c) && b !== 2 && c !== 2 && b !== c) {
      res = [2, b, c];
    }
    // Candidate 2: B = 2
    if (!res) {
      let a = 2 ^ x, c = 2 ^ y;
      if (isPrime(a) && isPrime(c) && a !== 2 && c !== 2 && a !== c) {
        res = [a, 2, c];
      }
    }
    // Candidate 3: C = 2
    if (!res) {
      let a = 2 ^ z, b = 2 ^ y;
      if (isPrime(a) && isPrime(b) && a !== 2 && b !== 2 && a !== b) {
        res = [a, b, 2];
      }
    }

    res.sort((a, b) => a - b);
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

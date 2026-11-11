const fs = require('fs');

function gcd(a, b) {
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const x = parseInt(tokens[ptr++], 10);
  let bestA = 1;
  let bestB = x;

  for (let d = 1; d * d <= x; d++) {
    if (x % d === 0) {
      const q = x / d;
      if (gcd(d, q) === 1) {
        bestA = d;
        bestB = q;
      }
    }
  }

  console.log(bestA + ' ' + bestB);
}

solve();

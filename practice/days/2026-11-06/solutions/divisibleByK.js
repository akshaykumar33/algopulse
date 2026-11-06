const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let k = BigInt(input[ptr++]);

    for (let i = 0; i < n; i++) {
      const a = BigInt(input[ptr++]);
      if (k > 1n) {
        const g = gcd(a, k);
        k /= g;
      }
    }

    out.push(k === 1n ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();


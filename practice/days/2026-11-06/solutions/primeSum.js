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
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);

    if (a === 1n || b === 1n) {
      out.push('-1');
    } else if (gcd(a, b) > 1n) {
      out.push('0');
    } else {
      out.push('1');
    }
  }

  console.log(out.join('\n'));
}

solve();


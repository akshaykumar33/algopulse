const fs = require('fs');

function gcd(a, b) {
  while (b) {
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
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    const c = parseInt(input[ptr++], 10);

    if (a === b) {
      out.push('0');
      continue;
    }
    if (gcd(a, c) === gcd(b, c)) {
      out.push('1');
      continue;
    }
    if (gcd(a, c + 1) === gcd(b, c + 1)) {
      out.push('2');
      continue;
    }
    out.push('3');
  }
  console.log(out.join('\n'));
}

solve();

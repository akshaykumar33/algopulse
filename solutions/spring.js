const fs = require('fs');

function gcd(a, b) {
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    const c = BigInt(input[ptr++]);
    const m = BigInt(input[ptr++]);

    const lab = lcm(a, b);
    const lac = lcm(a, c);
    const lbc = lcm(b, c);
    const labc = lcm(lab, c);

    const cabc = m / labc;
    const cab = m / lab - cabc;
    const cac = m / lac - cabc;
    const cbc = m / lbc - cabc;

    const ca = m / a - cab - cac - cabc;
    const cb = m / b - cab - cbc - cabc;
    const cc = m / c - cac - cbc - cabc;

    const ansA = 6n * ca + 3n * cab + 3n * cac + 2n * cabc;
    const ansB = 6n * cb + 3n * cab + 3n * cbc + 2n * cabc;
    const ansC = 6n * cc + 3n * cac + 3n * cbc + 2n * cabc;

    out.push(`${ansA} ${ansB} ${ansC}`);
  }

  console.log(out.join('\n'));
}

solve();

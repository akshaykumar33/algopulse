const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[idx++]);
    const m = BigInt(input[idx++]);
    const total = (n * (n + 1n)) / 2n;
    if (m > total || (total - m) % 2n !== 0n) {
      out.push('No');
      continue;
    }
    const sb = (total - m) / 2n;
    const sa = (total + m) / 2n;
    if (gcd(sa, sb) === 1n) {
      out.push('Yes');
    } else {
      out.push('No');
    }
  }
  console.log(out.join('\n'));
}

solve();

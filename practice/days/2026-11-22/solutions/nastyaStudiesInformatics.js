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
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 4 || input[0] === '') return;
  const l = parseInt(input[0], 10);
  const r = parseInt(input[1], 10);
  const x = parseInt(input[2], 10);
  const y = parseInt(input[3], 10);
  if (y % x !== 0) {
    console.log(0);
    return;
  }
  const P = y / x;
  let count = 0;
  for (let d = 1; d * d <= P; d++) {
    if (P % d === 0) {
      const d2 = P / d;
      if (gcd(d, d2) === 1) {
        const a = d * x;
        const b = d2 * x;
        if (a >= l && a <= r && b >= l && b <= r) {
          count += (d === d2 ? 1 : 2);
        }
      }
    }
  }
  console.log(count);
}
solve();
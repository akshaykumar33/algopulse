const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);
  if (input.length === 0 || isNaN(input[0])) return;
  const t = input[0];
  function gcd(a, b) {
    while (b) { const r = a % b; a = b; b = r; }
    return a;
  }
  const out = [];
  for (let tc = 1; tc <= t; tc++) {
    const ang = input[tc];
    const g = gcd(ang, 180);
    const k0 = ang / g;
    const n0 = 180 / g;
    if (n0 - k0 >= 2) {
      out.push(n0);
    } else {
      out.push(2 * n0);
    }
  }
  console.log(out.join('\n'));
}

solve();

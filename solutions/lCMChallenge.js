const fs = require('fs');

function gcd(a, b) {
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

function solve() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;
  const n = BigInt(s);
  const lo = n > 6n ? n - 6n : 1n;
  let ans = 0n;
  for (let a = lo; a <= n; a++) {
    for (let b = a; b <= n; b++) {
      const ab = lcm(a, b);
      for (let c = b; c <= n; c++) {
        const cur = lcm(ab, c);
        if (cur > ans) ans = cur;
      }
    }
  }
  console.log(ans.toString());
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = parseInt(input, 10);
  if (n >= 0) {
    console.log(n);
    return;
  }
  const opt1 = Math.trunc(n / 10);
  const opt2 = Math.trunc(n / 100) * 10 + (n % 10);
  let ans = Math.max(n, opt1, opt2);
  if (Object.is(ans, -0) || ans === 0) ans = 0;
  console.log(ans);
}

solve();

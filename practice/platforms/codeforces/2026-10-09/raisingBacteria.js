const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  let x = Number(input);
  let ans = 0;
  while (x > 0) {
    ans += x & 1;
    x >>= 1;
  }
  console.log(ans);
}

solve();

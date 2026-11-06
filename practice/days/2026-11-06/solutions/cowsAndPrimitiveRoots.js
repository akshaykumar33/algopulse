const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const p = parseInt(input, 10);

  let n = p - 1;
  let ans = n;

  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) {
      while (n % d === 0) {
        n = Math.floor(n / d);
      }
      ans -= Math.floor(ans / d);
    }
  }

  if (n > 1) {
    ans -= Math.floor(ans / n);
  }

  console.log(ans);
}

solve();


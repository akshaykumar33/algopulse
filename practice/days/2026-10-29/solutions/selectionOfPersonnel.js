const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = BigInt(input[0]);

  function comb(n, k) {
    let num = 1n;
    let den = 1n;
    for (let i = 1n; i <= k; i++) {
      num *= n - i + 1n;
      den *= i;
    }
    return num / den;
  }

  const ans = comb(n, 5n) + comb(n, 6n) + comb(n, 7n);
  console.log(ans.toString());
}

solve();

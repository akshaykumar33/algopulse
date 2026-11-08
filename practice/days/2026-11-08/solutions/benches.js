const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = BigInt(input[0]);
  const c5 = (n * (n - 1n) * (n - 2n) * (n - 3n) * (n - 4n)) / 120n;
  const ans = 120n * c5 * c5;
  console.log(ans.toString());
}

solve();

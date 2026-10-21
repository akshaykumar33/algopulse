const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = BigInt(input);
  const ans = (1n << (n + 1n)) - 2n;
  console.log(ans.toString());
}

solve();

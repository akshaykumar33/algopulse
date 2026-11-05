const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const m = BigInt(tokens[0]);
  const b = BigInt(tokens[1]);
  let maxBananas = 0n;
  for (let y = 0n; y <= b; y++) {
    const x = (b - y) * m;
    const count = (x + 1n) * (y + 1n) * (x + y) / 2n;
    if (count > maxBananas) maxBananas = count;
  }
  console.log(maxBananas.toString());
}
solve();

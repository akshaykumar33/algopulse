const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = BigInt(input);

  const p = [2n, 3n, 5n, 7n];
  let ans = 0n;

  for (let mask = 0; mask < 16; mask++) {
    let prod = 1n;
    let bits = 0;
    for (let i = 0; i < 4; i++) {
      if ((mask >> i) & 1) {
        prod *= p[i];
        bits++;
      }
    }
    const count = n / prod;
    if (bits % 2 === 0) ans += count;
    else ans -= count;
  }

  console.log(ans.toString());
}

solve();

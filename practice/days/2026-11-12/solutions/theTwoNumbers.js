const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(tokens[ptr++]);
    let ans = 0n;
    if (n === 2n) {
      ans = 0n;
    } else if (n % 2n === 1n) {
      const k = n / 2n;
      ans = k * (k + 1n) - 1n;
    } else if (n % 4n === 0n) {
      const k = n / 2n;
      ans = (k - 1n) * (k + 1n) - 1n;
    } else {
      const k = n / 2n;
      ans = (k - 2n) * (k + 2n) - 1n;
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

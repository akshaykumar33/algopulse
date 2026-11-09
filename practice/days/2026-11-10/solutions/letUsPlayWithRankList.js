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
    const s = BigInt(tokens[ptr++]);
    const diff = s - n;

    let low = 1n;
    let high = n;
    let bestK = 1n;

    while (low <= high) {
      const mid = (low + high) / 2n;
      if (mid * (mid - 1n) / 2n <= diff) {
        bestK = mid;
        low = mid + 1n;
      } else {
        high = mid - 1n;
      }
    }

    out.push((n - bestK).toString());
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);

    let low = 1n;
    let high = 2000000n;
    let ans = 1n;

    while (low <= high) {
      const mid = (low + high) / 2n;
      const sum = mid + (mid * (mid * mid - 1n)) / 6n;
      if (sum <= n) {
        ans = mid;
        low = mid + 1n;
      } else {
        high = mid - 1n;
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();


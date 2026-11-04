const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = BigInt(input[ptr++]);

    let low = 2n;
    let high = 200000n;
    let i = 2n;

    while (low <= high) {
      const mid = (low + high) / 2n;
      const count = ((mid - 1n) * mid) / 2n;
      if (count >= k) {
        i = mid;
        high = mid - 1n;
      } else {
        low = mid + 1n;
      }
    }

    const prevCount = ((i - 2n) * (i - 1n)) / 2n;
    const rem = k - prevCount;

    const idx1 = n - Number(i);
    const idx2 = n - Number(rem);

    const s = new Array(n).fill('a');
    s[idx1] = 'b';
    s[idx2] = 'b';
    out.push(s.join(''));
  }

  console.log(out.join('\n'));
}

solve();

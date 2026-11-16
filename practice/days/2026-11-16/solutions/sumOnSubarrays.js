const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = new Int32Array(n).fill(-1000);

    let r = 0;
    while ((r + 1) * (r + 2) / 2 <= k) {
      r++;
    }
    for (let i = 0; i < r; i++) {
      a[i] = 2;
    }
    const rem = k - (r * (r + 1) / 2);
    if (r < n && rem > 0) {
      a[r] = -(2 * (r - rem) + 1);
    }
    out.push(a.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

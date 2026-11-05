const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const cnt = new Array(n + 1).fill(0);
    for (let i = 0; i < m; i++) {
      cnt[parseInt(input[ptr++], 10)]++;
    }

    let low = 1;
    let high = 2 * m;
    let ans = high;

    while (low <= high) {
      const mid = (low + high) >> 1;
      let extra = 0;
      let needed = 0;

      for (let i = 1; i <= n; i++) {
        if (cnt[i] > mid) {
          needed += cnt[i] - mid;
        } else {
          extra += Math.floor((mid - cnt[i]) / 2);
        }
      }

      if (extra >= needed) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

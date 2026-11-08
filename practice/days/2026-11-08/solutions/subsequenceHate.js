const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[ptr++];
    const n = s.length;
    let total0 = 0;
    let total1 = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') total0++;
      else total1++;
    }

    let ans = Math.min(total0, total1);
    let c0 = 0;
    let c1 = 0;

    for (let i = 0; i < n; i++) {
      if (s[i] === '0') c0++;
      else c1++;

      const costA = c1 + (total0 - c0);
      const costB = c0 + (total1 - c1);
      const m = Math.min(costA, costB);
      if (m < ans) ans = m;
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

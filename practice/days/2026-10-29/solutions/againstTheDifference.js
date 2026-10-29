const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n + 1);
    const pos = new Map();
    const dp = new Int32Array(n + 1);

    for (let i = 1; i <= n; i++) {
      const x = parseInt(input[ptr++], 10);
      a[i] = x;
      let list = pos.get(x);
      if (!list) {
        list = [];
        pos.set(x, list);
      }
      list.push(i);

      let best = dp[i - 1];
      if (list.length >= x) {
        const startIdx = list[list.length - x];
        const cand = dp[startIdx - 1] + x;
        if (cand > best) best = cand;
      }
      dp[i] = best;
    }
    out.push(dp[n].toString());
  }
  console.log(out.join('\n'));
}

solve();

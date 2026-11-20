const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const special = new Set();
    for (let i = 0; i < k; i++) {
      const u = input[ptr++];
      const v = input[ptr++];
      special.add(u + ',' + v);
    }
    const dp = new Int32Array(m + 1);
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const cost = special.has(i + ',' + j) ? 2 : 1;
        const prev = dp[j] > dp[j - 1] ? dp[j] : dp[j - 1];
        dp[j] = prev + cost;
      }
    }
    out.push(dp[m]);
  }
  console.log(out.join('\n'));
}
solve();
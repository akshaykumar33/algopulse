const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
    const dp = new Array(n);
    let maxPts = -2e9;
    for (let i = n - 1; i >= 0; i--) {
      dp[i] = a[i] + (i + k < n ? dp[i + k] : 0);
      if (dp[i] > maxPts) maxPts = dp[i];
    }
    out.push(maxPts);
  }
  console.log(out.join('\n'));
}
solve();
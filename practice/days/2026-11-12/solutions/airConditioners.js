const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const q = parseInt(tokens[ptr++], 10);
  const INF = 3000000000;
  let cap = 300005;
  let dp = new Float64Array(cap);
  let pos = new Int32Array(cap);
  const out = [];

  for (let tc = 0; tc < q; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    if (n > cap) {
      cap = n;
      dp = new Float64Array(cap);
      pos = new Int32Array(cap);
    }
    for (let i = 0; i < n; i++) dp[i] = INF;
    for (let i = 0; i < k; i++) pos[i] = parseInt(tokens[ptr++], 10) - 1;
    for (let i = 0; i < k; i++) {
      const temp = parseInt(tokens[ptr++], 10);
      dp[pos[i]] = temp;
    }
    for (let i = 1; i < n; i++) {
      if (dp[i - 1] + 1 < dp[i]) dp[i] = dp[i - 1] + 1;
    }
    for (let i = n - 2; i >= 0; i--) {
      if (dp[i + 1] + 1 < dp[i]) dp[i] = dp[i + 1] + 1;
    }
    const row = new Array(n);
    for (let i = 0; i < n; i++) row[i] = dp[i];
    out.push(row.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

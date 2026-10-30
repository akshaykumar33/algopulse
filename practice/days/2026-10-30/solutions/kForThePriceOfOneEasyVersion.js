const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const p = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
    a.sort();

    const dp = new Int32Array(n + 1);
    dp[0] = 0;
    dp[1] = a[0];

    for (let i = 2; i <= n; i++) {
      dp[i] = dp[i - 2] + a[i - 1];
    }

    let maxItems = 0;
    for (let i = 1; i <= n; i++) {
      if (dp[i] <= p) maxItems = i;
    }

    out.push(maxItems);
  }
  console.log(out.join('\n'));
}

solve();

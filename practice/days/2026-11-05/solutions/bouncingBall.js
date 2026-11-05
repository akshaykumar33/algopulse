const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const p = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    const x = parseInt(input[ptr++], 10);
    const y = parseInt(input[ptr++], 10);

    const dp = new Int32Array(n + 1);
    for (let i = n; i >= 1; i--) {
      const isZero = s[i - 1] === '0' ? 1 : 0;
      if (i + k > n) {
        dp[i] = isZero;
      } else {
        dp[i] = isZero + dp[i + k];
      }
    }

    let minCost = Infinity;
    for (let i = p; i <= n; i++) {
      const cost = (i - p) * y + dp[i] * x;
      if (cost < minCost) {
        minCost = cost;
      }
    }

    out.push(minCost);
  }

  console.log(out.join('\n'));
}

solve();


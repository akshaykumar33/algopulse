const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const A = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      A[i] = parseInt(input[ptr++], 10);
    }

    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = -Infinity;

    for (let i = 1; i <= n; i++) {
      let best = Infinity;
      if (dp[i - 1] <= A[i - 1]) {
        best = Math.min(best, A[i - 1]);
      }
      if (i >= 2 && dp[i - 2] !== Infinity) {
        const a = A[i - 2];
        const b = A[i - 1];
        const xMin = Math.max(1, Math.ceil((a - b) / 2));
        if (xMin <= a - dp[i - 2]) {
          best = Math.min(best, b + xMin);
        }
      }
      dp[i] = best;
    }

    out.push(dp[n] !== Infinity ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();

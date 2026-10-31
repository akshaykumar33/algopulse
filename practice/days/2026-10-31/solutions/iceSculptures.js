const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const t = [];
  for (let i = 0; i < n; i++) {
    t.push(parseInt(tokens[ptr++], 10));
  }

  let ans = -Infinity;

  for (let d = 1; d <= Math.floor(n / 3); d++) {
    if (n % d === 0) {
      const k = n / d;
      if (k >= 3) {
        for (let start = 0; start < d; start++) {
          let sum = 0;
          for (let j = 0; j < k; j++) {
            sum += t[start + j * d];
          }
          if (sum > ans) ans = sum;
        }
      }
    }
  }

  console.log(ans);
}

solve();

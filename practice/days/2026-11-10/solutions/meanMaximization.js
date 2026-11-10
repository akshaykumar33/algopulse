const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let sum = 0;
    let maxVal = -Infinity;

    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      sum += val;
      if (val > maxVal) {
        maxVal = val;
      }
    }

    const remMean = (sum - maxVal) / (n - 1);
    const ans = maxVal + remMean;
    out.push(ans.toFixed(6));
  }

  console.log(out.join('\n'));
}

solve();

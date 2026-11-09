const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const cnt = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
      cnt[parseInt(tokens[ptr++], 10)]++;
    }

    const freq = [];
    for (let i = 1; i <= n; i++) {
      if (cnt[i] > 0) freq.push(cnt[i]);
    }
    freq.sort((a, b) => b - a);

    let maxK = 0;
    let sum = 0;
    for (let d = 1; d <= freq.length; d++) {
      sum += freq[d - 1];
      const cur = Math.floor(sum / d) * d;
      if (cur > maxK) maxK = cur;
    }

    out.push(maxK);
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const freq = new Map();
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      freq.set(v, (freq.get(v) || 0) + 1);
    }

    let oddCount = 0;
    let totalZeros = freq.get(0) || 0;

    for (const [val, count] of freq.entries()) {
      if (val === 0) continue;
      if (count % 2 === 1) oddCount++;
      totalZeros += Math.floor(count / 2);
    }

    const ans = oddCount + (totalZeros > 0 ? 1 : 0);
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();

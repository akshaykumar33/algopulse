const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const p = new BigInt64Array(n + 1);
    for (let i = 1; i <= n; i++) {
      const v = BigInt(input[ptr++]);
      p[i] = p[i - 1] + v;
    }

    let maxGain = 0n;
    let maxG = -1000000000000000000n;

    for (let r = 1; r <= n; r++) {
      const l = BigInt(r);
      const g = p[r - 1] + l - l * l;
      if (g > maxG) maxG = g;

      const f = l * l + l - p[r];
      const gain = f + maxG;
      if (gain > maxGain) maxGain = gain;
    }

    const ans = p[n] + maxGain;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

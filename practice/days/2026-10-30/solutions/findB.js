const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const q = parseInt(tokens[ptr++], 10);

    const pref = new Array(n + 1);
    const ones = new Int32Array(n + 1);
    pref[0] = 0n;

    for (let i = 1; i <= n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      pref[i] = pref[i - 1] + BigInt(val);
      ones[i] = ones[i - 1] + (val === 1 ? 1 : 0);
    }

    for (let qi = 0; qi < q; qi++) {
      const l = parseInt(tokens[ptr++], 10);
      const r = parseInt(tokens[ptr++], 10);
      const m = r - l + 1;
      if (m === 1) {
        out.push('NO');
        continue;
      }

      const sumA = pref[r] - pref[l - 1];
      const cntOnes = ones[r] - ones[l - 1];
      const minSum = BigInt(cntOnes) * 2n + BigInt(m - cntOnes);

      if (sumA >= minSum) {
        out.push('YES');
      } else {
        out.push('NO');
      }
    }
  }
  console.log(out.join('\n'));
}

solve();

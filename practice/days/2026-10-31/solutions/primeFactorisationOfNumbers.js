const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const out = [];

  const MAX = 200001;
  const spf = new Int32Array(MAX);
  for (let i = 2; i < MAX; i++) {
    if (spf[i] === 0) {
      for (let j = i; j < MAX; j += i) {
        if (spf[j] === 0) spf[j] = i;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    let val = parseInt(tokens[ptr++], 10);
    const factors = [];
    while (val > 1) {
      const p = spf[val] || val;
      factors.push(p);
      val = Math.floor(val / p);
    }
    factors.sort((a, b) => a - b);
    out.push(factors.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

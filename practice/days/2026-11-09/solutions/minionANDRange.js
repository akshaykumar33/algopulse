const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const pref = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      pref[i] = pref[i - 1] + (val % 2 === 0 ? 1 : 0);
    }

    const q = parseInt(tokens[ptr++], 10);
    for (let j = 0; j < q; j++) {
      const l = parseInt(tokens[ptr++], 10);
      const r = parseInt(tokens[ptr++], 10);
      if (pref[r] - pref[l - 1] > 0) {
        out.push('EVEN');
      } else {
        out.push('ODD');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();

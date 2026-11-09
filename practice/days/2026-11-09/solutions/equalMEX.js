const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = 2 * n;
    const cnt = new Int32Array(n + 2);
    for (let i = 0; i < m; i++) {
      const v = parseInt(tokens[ptr++], 10);
      if (v <= n + 1) cnt[v]++;
    }

    let ok = true;
    for (let i = 0; i <= n + 1; i++) {
      if (cnt[i] === 0) break;
      if (cnt[i] === 1) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

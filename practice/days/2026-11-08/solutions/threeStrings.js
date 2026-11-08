const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = tokens[ptr++];
    const b = tokens[ptr++];
    const c = tokens[ptr++];
    const n = a.length;
    const m = b.length;

    let prev = new Int32Array(m + 1);
    prev[0] = 0;
    for (let j = 0; j < m; j++) {
      const cost = (b[j] === c[j] ? 0 : 1);
      prev[j + 1] = prev[j] + cost;
    }

    for (let i = 1; i <= n; i++) {
      const curr = new Int32Array(m + 1);
      curr[0] = prev[0] + (a[i - 1] === c[i - 1] ? 0 : 1);
      for (let j = 1; j <= m; j++) {
        const fromA = prev[j] + (a[i - 1] === c[i + j - 1] ? 0 : 1);
        const fromB = curr[j - 1] + (b[j - 1] === c[i + j - 1] ? 0 : 1);
        curr[j] = fromA < fromB ? fromA : fromB;
      }
      prev = curr;
    }

    out.push(prev[m]);
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const colCount = new Int32Array(m);
    for (let i = 0; i < n; i++) {
      const row = tokens[ptr++];
      for (let j = 0; j < m; j++) {
        if (row[j] === '1') colCount[j]++;
      }
    }
    let ans = 0;
    for (let j = 0; j < m; j++) {
      const c = colCount[j];
      ans += Math.floor((c * (c - 1)) / 2);
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();


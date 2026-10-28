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
    let oddCount = 0;
    for (let i = 0; i < m; i++) {
      const v = Math.abs(parseInt(tokens[ptr++], 10));
      if (v % 2 === 1) oddCount++;
    }

    out.push(oddCount % 2 === 0 ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();


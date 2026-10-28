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
    const fed = new Array(n + 1).fill(0);

    let fair = true;
    for (let i = 0; i < m; i++) {
      const c = parseInt(tokens[ptr++], 10);
      let minFed = fed[1];
      for (let j = 2; j <= n; j++) {
        if (fed[j] < minFed) minFed = fed[j];
      }

      if (fed[c] > minFed) {
        fair = false;
      }
      fed[c]++;
    }

    out.push(fair ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();


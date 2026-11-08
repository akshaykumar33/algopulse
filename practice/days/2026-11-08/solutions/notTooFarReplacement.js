const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const pool = [];
    for (let i = 0; i < n; i++) {
      pool.push(parseInt(tokens[ptr++], 10));
    }
    let v = parseInt(tokens[ptr++], 10);

    pool.sort((a, b) => a - b);

    let changed = true;
    while (changed) {
      changed = false;
      let targetIdx = -1;
      for (let i = 0; i < pool.length; i++) {
        if (pool[i] > v && pool[i] <= 2 * v) {
          targetIdx = i;
          break;
        }
      }

      if (targetIdx !== -1) {
        const nextV = pool[targetIdx];
        pool[targetIdx] = v;
        v = nextV;
        pool.sort((a, b) => a - b);
        changed = true;
      }
    }

    let sum = 0;
    for (let i = 0; i < pool.length; i++) {
      sum += pool[i];
    }
    out.push(sum);
  }

  console.log(out.join('\n'));
}

solve();

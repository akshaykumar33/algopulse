const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const m = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    const range = x * y;
    const covered = new Uint8Array(101);

    for (let i = 0; i < m; i++) {
      const pos = parseInt(tokens[ptr++], 10);
      const left = Math.max(1, pos - range);
      const right = Math.min(100, pos + range);
      for (let h = left; h <= right; h++) {
        covered[h] = 1;
      }
    }

    let safe = 0;
    for (let h = 1; h <= 100; h++) {
      if (!covered[h]) safe++;
    }
    out.push(safe);
  }
  console.log(out.join('\n'));
}

solve();

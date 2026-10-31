const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const diff = Math.abs(a - b);
    if (diff === 1) {
      const mn = Math.min(a, b);
      const mx = Math.max(a, b);
      let count = 0;
      if (mn > 1) count++;
      if (mx < n) count++;
      out.push(count);
    } else if (diff === 2) {
      out.push(1);
    } else {
      out.push(0);
    }
  }

  console.log(out.join('\n'));
}

solve();


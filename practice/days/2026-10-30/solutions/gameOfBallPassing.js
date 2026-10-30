const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let sum = 0;
    let max = 0;
    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      sum += val;
      if (val > max) max = val;
    }
    if (sum === 0) {
      out.push(0);
    } else if (2 * max <= sum) {
      out.push(1);
    } else {
      out.push(2 * max - sum);
    }
  }
  console.log(out.join('\n'));
}

solve();

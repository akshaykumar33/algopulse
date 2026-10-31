const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    let sum = 0;
    let minVal = Infinity;
    for (let j = 0; j < n; j++) {
      const w = parseInt(tokens[ptr++], 10);
      sum += w;
      if (w < minVal) {
        minVal = w;
      }
    }
    out.push(sum - n * minVal);
  }
  console.log(out.join('\n'));
}

solve();

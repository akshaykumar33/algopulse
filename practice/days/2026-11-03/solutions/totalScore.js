const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const scores = [];
    for (let j = 0; j < n; j++) {
      scores.push(parseInt(tokens[ptr++], 10));
    }
    for (let j = 0; j < k; j++) {
      const s = tokens[ptr++];
      let total = 0;
      for (let p = 0; p < n; p++) {
        if (s[p] === '1') {
          total += scores[p];
        }
      }
      out.push(total);
    }
  }
  console.log(out.join('\n'));
}

solve();

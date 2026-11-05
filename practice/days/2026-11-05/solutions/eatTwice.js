const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const maxval = new Map();
    for (let j = 0; j < n; j++) {
      const d = parseInt(tokens[ptr++], 10);
      const c = parseInt(tokens[ptr++], 10);
      if (!maxval.has(d) || maxval.get(d) < c) {
        maxval.set(d, c);
      }
    }
    const vals = Array.from(maxval.values());
    vals.sort((a, b) => b - a);
    out.push(vals[0] + vals[1]);
  }
  console.log(out.join('\n'));
}
solve();

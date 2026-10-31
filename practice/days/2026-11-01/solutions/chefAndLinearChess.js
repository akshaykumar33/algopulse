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
    let ans = -1;
    let minSteps = Infinity;
    for (let j = 0; j < n; j++) {
      const p = parseInt(tokens[ptr++], 10);
      if (k % p === 0) {
        const steps = (k - p) / p;
        if (steps < minSteps) {
          minSteps = steps;
          ans = p;
        }
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
solve();

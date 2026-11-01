const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const p = new Array(n);
    let l = 1, r = n;
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        p[i] = l++;
      } else {
        p[i] = r--;
      }
    }
    out.push(p.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let dup = 0;
    for (let i = 0; i < n - 2; i++) {
      if (s[i] === s[i + 2]) {
        dup++;
      }
    }
    out.push((n - 1) - dup);
  }
  console.log(out.join('\n'));
}

solve();

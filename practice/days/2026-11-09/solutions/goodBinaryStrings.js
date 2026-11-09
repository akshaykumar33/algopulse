const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const n = s.length;
    if (s[0] === s[n - 1]) {
      out.push(n - 2);
    } else {
      out.push(2);
    }
  }

  console.log(out.join('\n'));
}

solve();

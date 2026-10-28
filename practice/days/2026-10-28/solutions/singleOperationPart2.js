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

    let ans = n;
    for (let i = 1; i < n; i++) {
      if (s[i] === '1') {
        ans = i;
        break;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();


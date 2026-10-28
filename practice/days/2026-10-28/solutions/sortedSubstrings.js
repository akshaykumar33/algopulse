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

    let count = 0;
    for (let i = 0; i < n - 1; i++) {
      if (s[i] === '1' && s[i + 1] === '0') {
        count++;
      }
    }

    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();


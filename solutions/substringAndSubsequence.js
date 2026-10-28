const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = tokens[ptr++];
    const b = tokens[ptr++];

    let maxMatch = 0;
    for (let start = 0; start < b.length; start++) {
      let cur = start;
      for (let i = 0; i < a.length; i++) {
        if (cur < b.length && a[i] === b[cur]) {
          cur++;
        }
      }
      const matched = cur - start;
      if (matched > maxMatch) {
        maxMatch = matched;
      }
    }

    out.push(a.length + b.length - maxMatch);
  }

  console.log(out.join('\n'));
}

solve();


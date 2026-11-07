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

    let hasEven = false;
    let hasOdd = false;

    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        if (i % 2 === 0) hasEven = true;
        else hasOdd = true;
      }
    }

    out.push(hasEven && hasOdd ? 1 : 2);
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const names = [];
  const vals = [];

  for (let i = 0; i < n; i++) {
    names.push(tokens[ptr++]);
    vals.push(parseInt(tokens[ptr++], 10));
  }

  const q = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let j = 0; j < q; j++) {
    const prefix = tokens[ptr++];
    let bestVal = -Infinity;
    let bestName = 'NO';

    for (let i = 0; i < n; i++) {
      if (names[i].startsWith(prefix) && vals[i] > bestVal) {
        bestVal = vals[i];
        bestName = names[i];
      }
    }

    out.push(bestName);
  }

  console.log(out.join('\n'));
}

solve();

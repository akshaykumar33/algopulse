const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);

    if (c < a && c < b) {
      out.push('Alice');
    } else if (b < a && b < c) {
      out.push('Bob');
    } else {
      out.push('Draw');
    }
  }

  console.log(out.join('\n'));
}

solve();

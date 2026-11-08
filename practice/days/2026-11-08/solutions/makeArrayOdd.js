const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);
    let even = 0;

    for (let i = 0; i < n; i++) {
      const a = parseInt(tokens[ptr++], 10);
      if ((a & 1) === 0) {
        even++;
      }
    }

    if (even === 0) {
      out.push(0);
    } else if ((x & 1) === 1) {
      out.push(Math.floor((even + 1) / 2));
    } else {
      if (even === n) {
        out.push(-1);
      } else {
        out.push(even);
      }
    }
  }

  console.log(out.join('\n'));
}

solve();

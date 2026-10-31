const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let minAbs = Infinity;
    for (let i = 0; i < n; i++) {
      const v = Math.abs(parseInt(tokens[ptr++], 10));
      if (v < minAbs) minAbs = v;
    }

    if (minAbs === 0) {
      out.push(-1);
    } else {
      out.push(minAbs - 1);
    }
  }

  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    const counts = new Map();
    for (let i = 0; i < n; i++) {
      const x = parseInt(tokens[ptr++], 10);
      counts.set(x, (counts.get(x) || 0) + 1);
    }

    const u = Array.from(counts.keys()).sort((x, y) => x - y);
    const m = u.length;

    let nearest_false = Infinity;
    let possible = false;

    for (let i = m - 1; i >= 0; i--) {
      let w = false;
      if (nearest_false <= u[i] + k) {
        w = true;
      } else {
        w = (counts.get(u[i]) % 2 === 0);
        if (!w) {
          nearest_false = u[i];
        }
      }
      if (w) possible = true;
    }

    out.push(possible ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

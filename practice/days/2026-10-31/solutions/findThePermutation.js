const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const mat = [];
    for (let i = 0; i < n; i++) {
      mat.push(tokens[ptr++]);
    }

    const p = [];
    for (let i = 1; i <= n; i++) p.push(i);

    p.sort((u, v) => {
      if (u < v) {
        return mat[u - 1][v - 1] === '1' ? -1 : 1;
      } else {
        return mat[v - 1][u - 1] === '1' ? 1 : -1;
      }
    });

    out.push(p.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

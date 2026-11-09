const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const n = parseInt(tokens[0], 10);
  const p = [];
  for (let i = 0; i < n; i++) {
    p.push(parseInt(tokens[1 + i], 10));
  }

  const grid = Array.from({ length: n }, () => new Int32Array(n));

  for (let i = 0; i < n; i++) {
    let r = i;
    let c = i;
    let rem = p[i];

    while (rem > 0) {
      grid[r][c] = p[i];
      rem--;
      if (rem === 0) break;

      if (c > 0 && grid[r][c - 1] === 0) {
        c--;
      } else {
        r++;
      }
    }
  }

  const out = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j <= i; j++) {
      row.push(grid[i][j]);
    }
    out.push(row.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

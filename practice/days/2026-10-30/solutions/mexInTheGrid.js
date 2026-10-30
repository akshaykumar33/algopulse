const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const grid = Array.from({ length: n }, () => new Int32Array(n));
    let r = Math.floor((n - 1) / 2);
    let c = Math.floor((n - 1) / 2);
    let val = 0;
    grid[r][c] = val++;

    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let dirIdx = 0;
    let stepLen = 1;

    while (val < n * n) {
      for (let rep = 0; rep < 2; rep++) {
        const [dr, dc] = dirs[dirIdx];
        for (let s = 0; s < stepLen; s++) {
          r += dr;
          c += dc;
          if (r >= 0 && r < n && c >= 0 && c < n) {
            grid[r][c] = val++;
          }
        }
        dirIdx = (dirIdx + 1) % 4;
      }
      stepLen++;
    }

    for (let i = 0; i < n; i++) {
      out.push(grid[i].join(' '));
    }
  }
  console.log(out.join('\n'));
}

solve();

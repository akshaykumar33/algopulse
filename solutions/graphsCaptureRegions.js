const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const grid = new Array(n);
    for (let i = 0; i < n; i++) {
      grid[i] = tokens[ptr++].split('');
    }

    const q = [];
    for (let i = 0; i < n; i++) {
      if (grid[i][0] === 'O') {
        grid[i][0] = 'S';
        q.push(i, 0);
      }
      if (grid[i][n - 1] === 'O') {
        grid[i][n - 1] = 'S';
        q.push(i, n - 1);
      }
    }
    for (let j = 1; j < n - 1; j++) {
      if (grid[0][j] === 'O') {
        grid[0][j] = 'S';
        q.push(0, j);
      }
      if (grid[n - 1][j] === 'O') {
        grid[n - 1][j] = 'S';
        q.push(n - 1, j);
      }
    }

    let head = 0;
    while (head < q.length) {
      const r = q[head++];
      const c = q[head++];

      const nr1 = r - 1, nc1 = c;
      if (nr1 >= 0 && grid[nr1][nc1] === 'O') {
        grid[nr1][nc1] = 'S';
        q.push(nr1, nc1);
      }
      const nr2 = r + 1, nc2 = c;
      if (nr2 < n && grid[nr2][nc2] === 'O') {
        grid[nr2][nc2] = 'S';
        q.push(nr2, nc2);
      }
      const nr3 = r, nc3 = c - 1;
      if (nc3 >= 0 && grid[nr3][nc3] === 'O') {
        grid[nr3][nc3] = 'S';
        q.push(nr3, nc3);
      }
      const nr4 = r, nc4 = c + 1;
      if (nc4 < n && grid[nr4][nc4] === 'O') {
        grid[nr4][nc4] = 'S';
        q.push(nr4, nc4);
      }
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === 'O') {
          grid[i][j] = 'X';
        } else if (grid[i][j] === 'S') {
          grid[i][j] = 'O';
        }
      }
      out.push(grid[i].join(''));
    }
  }
  console.log(out.join('\n'));
}

solve();

const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);

  const grid = [];
  for (let i = 0; i < n; i++) {
    grid.push(input[ptr++]);
  }

  if (k === 1) {
    let dots = 0;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        if (grid[r][c] === '.') dots++;
      }
    }
    console.log(dots);
    return;
  }

  let ans = 0;

  for (let r = 0; r < n; r++) {
    let len = 0;
    for (let c = 0; c < m; c++) {
      if (grid[r][c] === '.') {
        len++;
        if (len >= k) ans++;
      } else {
        len = 0;
      }
    }
  }

  for (let c = 0; c < m; c++) {
    let len = 0;
    for (let r = 0; r < n; r++) {
      if (grid[r][c] === '.') {
        len++;
        if (len >= k) ans++;
      } else {
        len = 0;
      }
    }
  }

  console.log(ans);
}

solve();

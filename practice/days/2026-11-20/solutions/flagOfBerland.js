const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);

  const grid = [];
  for (let i = 0; i < n; i++) {
    grid.push(input[ptr++]);
  }

  function checkHorizontal() {
    if (n % 3 !== 0) return false;
    const h = n / 3;
    const c1 = grid[0][0];
    const c2 = grid[h][0];
    const c3 = grid[2 * h][0];
    if (c1 === c2 || c2 === c3 || c1 === c3) return false;

    for (let i = 0; i < n; i++) {
      const exp = i < h ? c1 : (i < 2 * h ? c2 : c3);
      for (let j = 0; j < m; j++) {
        if (grid[i][j] !== exp) return false;
      }
    }
    return true;
  }

  function checkVertical() {
    if (m % 3 !== 0) return false;
    const w = m / 3;
    const c1 = grid[0][0];
    const c2 = grid[0][w];
    const c3 = grid[0][2 * w];
    if (c1 === c2 || c2 === c3 || c1 === c3) return false;

    for (let j = 0; j < m; j++) {
      const exp = j < w ? c1 : (j < 2 * w ? c2 : c3);
      for (let i = 0; i < n; i++) {
        if (grid[i][j] !== exp) return false;
      }
    }
    return true;
  }

  if (checkHorizontal() || checkVertical()) {
    console.log('YES');
  } else {
    console.log('NO');
  }
}

solve();

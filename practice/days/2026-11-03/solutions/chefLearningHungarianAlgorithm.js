const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const grid = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(parseInt(tokens[ptr++], 10));
    }
    grid.push(row);
  }

  for (let i = 0; i < n; i++) {
    let minVal = Infinity;
    for (let j = 0; j < n; j++) {
      if (grid[i][j] < minVal) {
        minVal = grid[i][j];
      }
    }
    for (let j = 0; j < n; j++) {
      grid[i][j] -= minVal;
    }
  }

  for (let j = 0; j < n; j++) {
    let minVal = Infinity;
    for (let i = 0; i < n; i++) {
      if (grid[i][j] < minVal) {
        minVal = grid[i][j];
      }
    }
    for (let i = 0; i < n; i++) {
      grid[i][j] -= minVal;
    }
  }

  let zerosRow = new Array(n).fill(false);
  let zerosCol = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        zerosRow[i] = true;
        zerosCol[j] = true;
      }
    }
  }

  let ok = true;
  for (let i = 0; i < n; i++) {
    if (!zerosRow[i] || !zerosCol[i]) {
      ok = false;
      break;
    }
  }

  console.log(ok ? 'YES' : 'NO');
}

solve();

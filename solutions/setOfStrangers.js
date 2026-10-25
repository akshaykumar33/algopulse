const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const grid = [];
    for (let r = 0; r < n; r++) {
      const row = new Int32Array(m);
      for (let c = 0; c < m; c++) {
        row[c] = parseInt(input[ptr++], 10);
      }
      grid.push(row);
    }

    const costMap = new Map();
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < m; c++) {
        const color = grid[r][c];
        if (!costMap.has(color)) costMap.set(color, 1);

        if (r + 1 < n && grid[r + 1][c] === color) {
          costMap.set(color, 2);
        }
        if (c + 1 < m && grid[r][c + 1] === color) {
          costMap.set(color, 2);
        }
      }
    }

    let sumCost = 0;
    let maxCost = 0;
    for (const cost of costMap.values()) {
      sumCost += cost;
      if (cost > maxCost) maxCost = cost;
    }

    out.push(sumCost - maxCost);
  }

  console.log(out.join('\n'));
}

solve();

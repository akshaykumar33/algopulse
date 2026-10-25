const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (lineIdx >= input.length) break;
    const [n, m] = input[lineIdx++].trim().split(/\s+/).map(Number);
    const grid = [];
    let ones = 0;
    for (let r = 0; r < n; r++) {
      const row = input[lineIdx++].trim();
      grid.push(row);
      for (let c = 0; c < m; c++) {
        if (row[c] === '1') ones++;
      }
    }

    if (ones === 0) {
      out.push(0);
      continue;
    }

    let minOnesInL = 3;
    for (let r = 0; r < n - 1; r++) {
      for (let c = 0; c < m - 1; c++) {
        const c1 = grid[r][c] === '1' ? 1 : 0;
        const c2 = grid[r][c + 1] === '1' ? 1 : 0;
        const c3 = grid[r + 1][c] === '1' ? 1 : 0;
        const c4 = grid[r + 1][c + 1] === '1' ? 1 : 0;
        const sum4 = c1 + c2 + c3 + c4;
        const l1 = sum4 - c1;
        const l2 = sum4 - c2;
        const l3 = sum4 - c3;
        const l4 = sum4 - c4;
        const minL = Math.min(l1, l2, l3, l4);
        if (minL < minOnesInL) minOnesInL = minL;
      }
    }

    if (minOnesInL <= 1) {
      out.push(ones);
    } else if (minOnesInL === 2) {
      out.push(ones - 1);
    } else {
      out.push(ones - 2);
    }
  }

  console.log(out.join('\n'));
}

solve();

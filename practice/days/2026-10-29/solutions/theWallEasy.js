const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;

  const R = parseInt(input[0], 10);
  const C = parseInt(input[1], 10);

  const grid = input.slice(2, 2 + R);
  const hasBrick = new Array(C).fill(false);

  for (let r = 0; r < R; r++) {
    const row = grid[r];
    for (let c = 0; c < C; c++) {
      if (row[c] === 'B') {
        hasBrick[c] = true;
      }
    }
  }

  let count = 0;
  let inSegment = false;

  for (let c = 0; c < C; c++) {
    if (hasBrick[c]) {
      if (!inSegment) {
        count++;
        inSegment = true;
      }
    } else {
      inSegment = false;
    }
  }

  console.log(count);
}

solve();
